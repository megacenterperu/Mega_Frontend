import { Compra } from 'src/app/core/model/compra.model';
import { ViewChild, Inject } from '@angular/core';
import { DataService } from './../../../../../core/data/data.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MatPaginator, MatSort, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ms-detalle-dialogo-compra',
  templateUrl: './detalle-dialogo-compra.component.html',
  styleUrls: ['./detalle-dialogo-compra.component.scss']
})
export class DetalleDialogoCompraComponent implements OnInit {
  lista: any[] = [];
  form: FormGroup;
  displayedColumns: string[] = ['producto.codProducto', 'producto.nombre', 'producto.marcaProducto', 'cantidaditem', 'precioItem', 'importeTotalItem' ];
  dataSource: MatTableDataSource<any>;
  cantidad: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) private data: Compra,
    public dialogRef: MatDialogRef<DetalleDialogoCompraComponent>
  ) { }

  ngOnInit() {
    this.dataService.compras().getAllDetalle(this.data.idCompra).subscribe(data => this.setData(data));
  }

  setData(data) {
    console.log(data);
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);

  }


  cerrar() {
    this.dialogRef.close();
  }

}
