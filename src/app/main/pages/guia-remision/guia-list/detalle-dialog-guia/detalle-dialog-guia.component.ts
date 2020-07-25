import { MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';
import { Proforma } from 'src/app/core/model/Proforma';

@Component({
  selector: 'ms-detalle-dialog-guia',
  templateUrl: './detalle-dialog-guia.component.html',
  styleUrls: ['./detalle-dialog-guia.component.scss']
})
export class DetalleDialogGuiaComponent implements OnInit {

  lista: any[] = [];
  displayedColumns: string[] = ['producto.codProducto','producto.nombre', 'serieProducto', 'producto.unidadMedida.codUnidadmedida','cantidadItem', 'pesoItem'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<DetalleDialogGuiaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.dataService.guias().getAllDetalle(this.data.idGuia).subscribe(data => this.setData(data));
  }
  setData(data) {
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
  }

}
