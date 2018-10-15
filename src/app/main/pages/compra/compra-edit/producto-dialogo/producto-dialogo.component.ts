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
  displayedColumns: string[] = ['codProducto', 'nombre', 'marcaProducto', 'stock', 'precioCompra', 'acciones'];
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

  update(el: any, precioCompra: string) {
    if (precioCompra == null) { return; }
    console.log(precioCompra);
    // copy and mutate
    // const copy = this.dataSource.Data().slice()
    //   el.precioCompra = precioCompra;
    //  this.dataSource.update(copy);
  }

  updat(data) {
    this.dataService.providers().dialogo.next(data);
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
      this.dataService.providers().dialogo.next(data);
    });
  }

  cerrar() {
    this.dialogRef.close();
  }
}
