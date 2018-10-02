import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from '../../../../../core/data/data.service';

@Component({
  selector: 'ms-tipo-documento-list',
  templateUrl: './tipo-documento-list.component.html',
  styleUrls: ['./tipo-documento-list.component.scss']
})
export class TipoDocumentoListComponent implements OnInit {

  lista: any[] = [];
  displayedColumns: string[] = [  
    "abreviatura","denominacion",
    "acciones"
  ];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private dataService:DataService, private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.dataService.tipoDocumentos().getAll().subscribe(data => this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
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
    this.dataService.tipoDocumentos().delete(id).subscribe(r =>{
      this.snackBar.open("Tipo Eliminado",'Mensaje',{duration:3000});
      this.dataService.tipoDocumentos().getAll().subscribe(data => this.setData(data));
    });
  }
}
