import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { DataService } from '../../../../../core/data/data.service';
import { DialogConfirmationComponent } from '../../dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'ms-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.scss']
})
export class ProductoListComponent implements OnInit {

  dialogRef: MatDialogRef<DialogConfirmationComponent>;

  lista:any[]=[];
  displayedColumns: string[] = ["codProducto","nombre","marcaProducto","stock","precioCompra","precioVenta","unidadMedida.codUnidadmedida", "acciones"];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService:DataService, private snackBar:MatSnackBar,public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.productos().getAll().subscribe(data =>this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, "Mensaje", { duration: 3000 });
    });
  }

  setData(data) {
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(id) {
    this.dialogRef = this.dialog.open(DialogConfirmationComponent, {
      disableClose: false
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dataService.productos().delete(id).subscribe(r => {
          this.snackBar.open("Producto Eliminado", 'Mensaje', { duration: 3000 });
          this.dataService.productos().getAll().subscribe(data => this.setData(data));
        });
      }
      this.dialogRef = null;
    });
  }

}
