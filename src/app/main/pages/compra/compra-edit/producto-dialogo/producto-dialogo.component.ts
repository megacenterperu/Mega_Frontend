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
  cantidadItem: number;
  precioItem: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<ProductoDialogoComponent>,
  ) { }

  ngOnInit() {
    this.dataService.productos().getAll().subscribe(data => this.setData(data));
  }

  updatePrecio(el: any, precio: number) {
    if (precio == null) { return; }
    this.precioItem = precio;
  }

  updateCantidad(el: any, cantidad: number) {
    if (cantidad == null) { return; }
    this.cantidadItem = cantidad;
  }

  setData(data) {
    if (data) {
      let r = data;
      this.cantidad = JSON.parse(JSON.stringify(data)).length;
      this.dataSource = new MatTableDataSource(r);
      this.dataSource.sort = this.sort;
    }
  }
  agregar(id) {
    this.dataService.productos().findById(id).subscribe(data => {
      let detalle = {
        precioItem: this.precioItem,
        cantidaditem: this.cantidadItem,
        importeTotalItem: this.precioItem * this.cantidadItem,
        producto: data
      }
      this.dataService.providers().dialogo.next(detalle);
    });
  }

  cerrar() {
    this.dialogRef.close();
  }
}
