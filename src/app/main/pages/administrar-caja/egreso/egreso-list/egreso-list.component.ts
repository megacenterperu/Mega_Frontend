import { USER_DATA, TOKEN_NAME } from 'src/config/auth.config';
import * as decode from 'jwt-decode';
import { Component, OnInit, ViewChild } from "@angular/core";
import {MatTableDataSource,MatPaginator,MatSort,MatSnackBar} from "@angular/material";
import { DataService } from "src/app/core/data/data.service";

@Component({
  selector: "ms-egreso-list",
  templateUrl: "./egreso-list.component.html",
  styleUrls: ["./egreso-list.component.scss"]
})
export class EgresoListComponent implements OnInit {
  tienePermiso:boolean=false;
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();
  total: number = 0;
  lista: any[] = [];
  displayedColumns: string[] = ["fecha","tipoPago","descripcion","benificiario","monto","acciones"];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService,private snackBar: MatSnackBar) {}

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    this.hasPermision();
    this.dataService.egresos().findByIdSucursal(user.idSucursal).subscribe(data => this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, "Mensaje", { duration: 3000 });
    });
  }

  setData(data) {
    //let permite declarar variables limitando su alcance al bloque, declaración, o expresión donde se está usando y
    //var define una variable global o local en una función sin importar el ámbito del bloque.
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort;
    this.total =this.getTotalCost(r);
     
  }

  getTotalCost(data) {
    if (data) {
      return data.map(t => t.monto).reduce((total, montos) => total + montos, 0)|0;
    } else {
      return 0;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    this.total =this.getTotalCost(this.dataSource.filteredData);
  }

  hasPermision(){
    let tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
    const decodedToken = decode(tk.access_token);
    let roles = decodedToken.authorities;
    if(roles=="USER"){
      this.tienePermiso=false;
    }else{
      this.tienePermiso=true;
    }
  }

  eliminar(id) {
    if (confirm("¿Seguro que quieres Eliminar?")) {
      const user = JSON.parse(sessionStorage.getItem(USER_DATA));
      if(this.tienePermiso){
        this.dataService.egresos().delete(id).subscribe(datas => {
          this.snackBar.open("Categoria Eliminado", "Mensaje", {duration: 3000});
          this.dataService.egresos().findByIdSucursal(user.idSucursal).subscribe(data => this.setData(data));
        });
      }else{
        this.dataService.egresos().findByIdSucursal(user.idSucursal).subscribe(cat =>{
          this.dataService.providers().cambio.next(cat);
          this.dataService.providers().mensaje.next("Acceso Denegado!, Por favor, verifica tus permisos !");
        });
      }
    }
  }
}
