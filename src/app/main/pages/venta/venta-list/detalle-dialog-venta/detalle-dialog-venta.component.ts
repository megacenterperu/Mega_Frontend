import { Inject } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'ms-detalle-dialog-venta',
  templateUrl: './detalle-dialog-venta.component.html',
  styleUrls: ['./detalle-dialog-venta.component.scss']
})
export class DetalleDialogVentaComponent implements OnInit {
  lista: any[] = [];
  displayedColumns: string[] = ['cantidad','producto.codProducto', 'producto.unidadMedida.codUnidadmedida', 'producto.nombre','producto.marcaProducto', 'precio','importeTotal'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService, public dialogRef: MatDialogRef<DetalleDialogVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.dataService.ventas().getAllDetalle(this.data.idVenta).subscribe(data => this.setData(data));
  }

  setData(data) {
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
  }

}
