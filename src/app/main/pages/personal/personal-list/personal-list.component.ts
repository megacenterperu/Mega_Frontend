import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from '../../../../core/data/data.service';

@Component({
  selector: 'ms-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.scss']
})
export class PersonalListComponent implements OnInit {

  lista: any[] = [];
  displayedColumns: string[] = ['persona.nombre','persona.telfMovil', 'persona.numeroDocumento', 'persona.direccion','fechaIngreso', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataService.personales().getAll().subscribe(data =>this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Mensaje', { duration: 3000 });
    });
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
        this.snackBar.open("Cliente Eliminado", 'Mensaje', { duration: 3000 });
          this.dataService.personales().getAll().subscribe(data => this.setData(data));
      });
    }
  }

}
