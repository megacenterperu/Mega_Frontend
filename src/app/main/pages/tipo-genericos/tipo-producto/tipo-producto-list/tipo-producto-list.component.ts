import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from "@angular/material";
import { DataService } from "../../../../../core/data/data.service";

@Component({
  selector: "ms-tipo-producto-list",
  templateUrl: "./tipo-producto-list.component.html",
  styleUrls: ["./tipo-producto-list.component.scss"]
})
export class TipoProductoListComponent implements OnInit {
  lista: any[] = [];
  displayedColumns: string[] = ["descripcion","acciones"];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService, private snackBar:MatSnackBar) {}

  ngOnInit() {
    this.dataService.tipoProductos().getAll().subscribe(data => this.setData(data));
    this.dataService.providers().cambio.subscribe(data =>this.setData(data));
    this.dataService.providers().mensaje.subscribe(data =>{
      this.snackBar.open(data,'Mensaje',{duration:3000});
    });
  }

  setData(data){
    let r =data;
    this.cantidad=JSON.parse(JSON.stringify(data)).length;
    this.dataSource=new MatTableDataSource(r);
    this.dataSource.sort=this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(id){
    this.dataService.tipoProductos().delete(id).subscribe(tipop =>{
      this.snackBar.open('Tipo de Producto Eliminado','Mensaje',{duration:3000});
      this.dataService.tipoProductos().getAll().subscribe(data => this.setData(data));
    });
  }
}
