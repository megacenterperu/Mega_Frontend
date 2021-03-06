import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'ms-producto-dialog',
  templateUrl: './producto-dialog.component.html',
  styleUrls: ['./producto-dialog.component.scss']
})
export class ProductoDialogComponent implements OnInit {

  detalle:any[]=[];
  displayedColumns: string[] = ['codProducto', 'nombre', 'marcaProducto', 'stock','cantidad', 'pesoItemProducto', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<ProductoDialogComponent>,private snackBar:MatSnackBar
  ) { }

  ngOnInit() {
    this.dataService.productos().getAllfindByIdSucursal().subscribe(data => this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 4000 });
    }); 
  }

  setData(data) {
    if(!data) return;
    data.forEach(element => {element.cantidad=1;});
    data.forEach(element => {element.pesoItemProducto='KG';});
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort;
  }

  agregar(data) {
    this.dataService.productos().findById(data.idProducto).subscribe(r => {
    let detalle={
      cantidadItem:data.cantidad,
      pesoItem:data.pesoItemProducto,
      //importetotalitem: data.precioVenta * data.cantidad,
      producto:r      
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
