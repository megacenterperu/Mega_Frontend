import { ViewChild, Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';
import { Proforma } from 'src/app/core/model/Proforma';

@Component({
  selector: 'ms-detalle-dialog-proforma',
  templateUrl: './detalle-dialog-proforma.component.html',
  styleUrls: ['./detalle-dialog-proforma.component.scss']
})
export class DetalleDialogProformaComponent implements OnInit {
  lista: any[] = [];
  displayedColumns: string[] = ['cantidaditem','producto.codProducto', 'producto.unidadMedida.codUnidadmedida', 'producto.nombre','producto.marcaProducto', 'precioitem','importetotalitem'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService,
    public dialogRef: MatDialogRef<DetalleDialogProformaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proforma) { }

  ngOnInit() {
    this.dataService.proformas().getAllDetalle(this.data.idProforma).subscribe(data => this.setData(data));
  }
  setData(data) {
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
  }

}
