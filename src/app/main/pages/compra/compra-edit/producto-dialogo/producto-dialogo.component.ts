import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef } from '@angular/material';
import { DataService } from './../../../../../core/data/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ms-producto-dialogo',
  templateUrl: './producto-dialogo.component.html',
  styleUrls: ['./producto-dialogo.component.scss']
})
export class ProductoDialogoComponent implements OnInit {
  lista: any[] = [];
  displayedColumns: string[] = ['codProducto', 'nombre', 'marcaProducto', 'cantidaditem', 'precioCompra', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<ProductoDialogoComponent>,
  ) { }

  ngOnInit() {
    this.dataService.productos().getAll().subscribe(data => this.setData(data));
  }

  setData(data) {
    if (data) {
      data.forEach(element => { element.cantidaditem = 1; });
      let r = data;
      this.cantidad = JSON.parse(JSON.stringify(data)).length;
      this.dataSource = new MatTableDataSource(r);
      this.dataSource.sort = this.sort;
    }

  }
  agregar(data) {
    this.dataService.productos().findById(data.idProducto).subscribe(r => {
      let detalle = {
        precioItem: data.precioCompra,
        cantidaditem: data.cantidaditem,
        importeTotalItem: data.precioCompra * data.cantidaditem,
        producto: r
      }
      this.dataService.providers().dialogo.next(detalle);
    });
  }

  cerrar() {
    this.dialogRef.close();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
