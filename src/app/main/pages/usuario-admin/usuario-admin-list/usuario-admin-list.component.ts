import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'ms-usuario-admin-list',
  templateUrl: './usuario-admin-list.component.html',
  styleUrls: ['./usuario-admin-list.component.scss']
})
export class UsuarioAdminListComponent implements OnInit {

  SelectFocus: string;
  lista: any[] = [];
  displayedColumns = ['personal.persona.nombre','personal.persona.numeroDocumento','username','enabled', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  pageIndex: number = 0;
  pageSize: number = 5;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private dataService:DataService, private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.dataService.usuarios().usuarioCambio.subscribe(data =>{
      this.lista = data;
      this.dataSource = new MatTableDataSource(this.lista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.dataService.usuarios().getAllPageable(this.pageIndex, this.pageSize).subscribe(data => {
      let r = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(r);
      this.dataSource.sort = this.sort;
      
      this.dataSource.filterPredicate=(dato, filter: string)=>{
        const dataStr = dato.personal.persona.nombre.toLowerCase()+dato.personal.persona.numeroDocumento.toLowerCase()+dato.username.toLowerCase();
        return dataStr.indexOf(filter) !== -1;
      };
    });

    this.dataService.providers().mensaje.subscribe(data => {        
      this.snackBar.open(data, 'Aviso', { duration: 3000 });
    }); 
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  mostrarMas(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.dataService.usuarios().getAllPageable(e.pageIndex, e.pageSize).subscribe(data => {
      let signos = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(signos);
      this.dataSource.sort = this.sort;
    });
  }

  eliminar(id){
    if(confirm('¿Seguro que quieres Eliminar?')){
      this.dataService.usuarios().delete(id).subscribe(usu =>{
        this.snackBar.open('Cuenta de Usuario Eliminado','Mensaje',{duration:3000});
        this.dataService.usuarios().getAll().subscribe(data => this.setData(data));
      });
    }
  }

  setData(data){
    this.lista = data;
    this.dataSource = new MatTableDataSource(this.lista);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  selectRow(event) {
    this.SelectFocus=event.idUsuario;
  }

}
