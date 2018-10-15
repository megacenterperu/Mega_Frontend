import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'ms-producto-dialog',
  templateUrl: './producto-dialog.component.html',
  styleUrls: ['./producto-dialog.component.scss']
})
export class ProductoDialogComponent implements OnInit {
  detalle:any[]=[];
  displayedColumns: string[] = ['codProducto', 'nombre', 'marcaProducto', 'stock','cantidad', 'precioVenta', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<ProductoDialogComponent>
  ) { }

  ngOnInit() {
    this.dataService.productos().getAll().subscribe(data => this.setData(data));
  }

  setData(data) {
    if(!data) return;
    //this.detalle=data;
    data.forEach(element => { element.cantidad=1;    });
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort;
  }
 
  agregar(data) {
    this.dataService.productos().findById(data.idProducto).subscribe(r => {
    let detalle={
      producto:r,
      cantidaditem:data.cantidad,
      precioitem:data.precioVenta      
    }      
      this.dataService.providers().dialogo.next(detalle);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  } 

  cerrar() {
    this.dialogRef.close();
  }

}
