import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'ms-venta-dialogo',
  templateUrl: './venta-dialogo.component.html',
  styleUrls: ['./venta-dialogo.component.scss']
})
export class VentaDialogoComponent implements OnInit {

  lista: any[] = [];
  displayedColumns: string[] = ['codProducto','unidadMedida.codUnidadmedida',  'nombre','stock', 'cantidad', 'precioVenta', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<VentaDialogoComponent>,private snackBar:MatSnackBar
    
  ) { }

  ngOnInit() {
    this.dataService.productos().getAll().subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 4000 });
      }); 
  }

  setData(data) {
    if (data) {
      data.forEach(element => { element.cantidad = 1; });
      let r = data;
      this.cantidad = JSON.parse(JSON.stringify(data)).length;
      this.dataSource = new MatTableDataSource(r);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  agregar(data) {
    const stock=data.stock;
    const cantidadItem=data.cantidad;
    if(cantidadItem>stock){
      this.dataService.providers().mensaje.next("NO TIENE STOCK SUFICIENTE");
    }else{
      this.dataService.productos().findById(data.idProducto).subscribe(r => {
        let detalle = {
          precio: data.precioVenta,
          cantidad: data.cantidad,
          importeTotalItem: data.precioVenta * data.cantidad,
          producto: r
        }
        this.dataService.providers().dialogo.next(detalle);
      });
    }
  }

  /*cerrar() {
    this.dialogRef.close();
  }*/

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
