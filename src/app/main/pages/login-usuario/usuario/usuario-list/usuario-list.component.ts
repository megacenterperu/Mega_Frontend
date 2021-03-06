import { USER_DATA} from 'src/config/auth.config';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'ms-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {

  lista: any[] = [];
  displayedColumns = ['personal.persona.nombre','username','enabled', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService:DataService, private snackBar:MatSnackBar) { }

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    /*this.dataService.usuarios().usuarioCambio.subscribe(data =>{
      this.lista = data;
      this.dataSource = new MatTableDataSource(this.lista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });*/

    /*this.dataService.usuarios().findByIdSucursal(user.idSucursal).subscribe(data => {
      let r = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(r);
      this.dataSource.sort = this.sort;
    });*/

    this.dataService.usuarios().findByIdSucursal(user.idSucursal).subscribe(data =>this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, "Mensaje", { duration: 3000 });
    });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  /*mostrarMas(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.dataService.usuarios().getAllPageable(e.pageIndex, e.pageSize).subscribe(data => {
      let signos = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(signos);
      this.dataSource.sort = this.sort;
    });
  }*/

  eliminar(id){
    if(confirm('¿Seguro que quieres Eliminar?')){
      const user = JSON.parse(sessionStorage.getItem(USER_DATA));
      this.dataService.usuarios().delete(id).subscribe(usu =>{
        this.snackBar.open('Cuenta de Usuario Eliminado','Mensaje',{duration:3000});
        this.dataService.usuarios().findByIdSucursal(user.idSucursal).subscribe(data => this.setData(data));
      });
    }
  }

  /*setData(data){
    this.lista = data;
    this.dataSource = new MatTableDataSource(this.lista);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }*/

  setData(data) {
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort;
  }
}
