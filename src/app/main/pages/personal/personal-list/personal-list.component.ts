import { filter } from 'rxjs/operators';
import { DataService } from 'src/app/core/data/data.service';
import { USER_DATA } from 'src/config/auth.config';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';

@Component({
  selector: 'ms-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.scss']
})
export class PersonalListComponent implements OnInit {

  SelectFocus: string;
  lista: any[] = [];
  idSucursal;
  displayedColumns: string[] = ['persona.nombre','persona.telfMovil', 'persona.numeroDocumento', 'persona.direccion','fechaIngreso','sucursal.nombre', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataService.perfiles().perfilCambio.subscribe(response => {
      this.idSucursal = response.idSucursal;
      this.dataService.personales().findByIdSucursal(this.idSucursal).subscribe(data =>this.setData(data));
    });
    const d= this.dataService.logins().getUserData();
    if(d){
      this.idSucursal = d.idSucursal;
      this.dataService.personales().findByIdSucursal(this.idSucursal).subscribe(data =>{
        this.setData(data)
        this.dataSource.filterPredicate=(dato, filter: string)=>{
          const dataStr = dato.persona.nombre.toLowerCase()+dato.persona.numeroDocumento.toLowerCase();
        return dataStr.indexOf(filter) !== -1;
        };
      });
      this.dataService.providers().cambio.subscribe(data => this.setData(data));
      this.dataService.providers().mensaje.subscribe(data => {
        this.snackBar.open(data, 'Mensaje', { duration: 3000 });
      });
    }
  }

  setData(data) {
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(id) {
    if(confirm('¿Seguro que quieres Eliminar?')){
      this.dataService.personales().delete(id).subscribe(r => {
        const user = JSON.parse(sessionStorage.getItem(USER_DATA));
        this.snackBar.open("Cliente Eliminado", 'Mensaje', { duration: 3000 });
          this.dataService.personales().findByIdSucursal(user.idSucursal).subscribe(data => this.setData(data));
      });
    }
  }

  selectRow(event) {
    this.SelectFocus=event.idPersonal;
  }

}
