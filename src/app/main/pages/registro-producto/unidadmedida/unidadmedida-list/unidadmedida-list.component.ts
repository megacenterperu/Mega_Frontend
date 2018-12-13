import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from '../../../../../core/data/data.service';

@Component({
  selector: 'ms-unidadmedida-list',
  templateUrl: './unidadmedida-list.component.html',
  styleUrls: ['./unidadmedida-list.component.scss']
})
export class UnidadmedidaListComponent implements OnInit {

  lista: any[]=[];
  displayedColumns: string[] = ["codUnidadmedida","descripcion", "acciones"];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService:DataService, private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.dataService.unidadMedidas().getAll().subscribe(data =>this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, "Mensaje", { duration: 3000 });
    });
  }

  setData(data) {
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(id) {
    if(confirm('¿Seguro que quieres Eliminar?')){
      this.dataService.unidadMedidas().delete(id).subscribe(datas => {
        this.snackBar.open("Categoria Eliminado", "Mensaje", {duration: 3000});
        this.dataService.unidadMedidas().getAll().subscribe(data => this.setData(data));
      });
    }
  }

}
