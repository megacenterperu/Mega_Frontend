import { ViewChild } from '@angular/core';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { DataService } from 'src/app/core/data/data.service';
import { Venta } from 'src/app/core/model/venta.model';
import { DetalleDialogVentaComponent } from './detalle-dialog-venta/detalle-dialog-venta.component';

@Component({
  selector: 'ms-venta-list',
  templateUrl: './venta-list.component.html',
  styleUrls: ['./venta-list.component.scss']
})
export class VentaListComponent implements OnInit {
  dialogRef: MatDialogRef<DialogConfirmationComponent>;
  lista: any[] = [];
  displayedColumns: string[] = ['cliente.nombre', 'fecha', 'montoTotal','descripcion', 'numeroComprobante','estadoComprobante', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dataService: DataService, private snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.ventas().getAll().subscribe(data => this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Mensaje', { duration: 3000 });
    });
  }

  setData(data) {
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.paginator = this.paginator;
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
        this.dataService.ventas().delete(id).subscribe(r => {
          this.snackBar.open("Venta Eliminado", 'Aviso', { duration: 2000 });
          this.dataService.ventas().getAll().subscribe(data => this.setData(data));
        });
      }
      this.dialogRef = null;
    });
  }

  print(id) {
    this.dataService.ventas().pdf(id).subscribe((response) => {
      var blob = new Blob([response], {type: 'application/pdf'});
      const blobUrl = URL.createObjectURL(blob);
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        document.body.appendChild(iframe);
        iframe.contentWindow.print();
    });
  }

  openDialog(id:Venta) {
    const dialogRef = this.dialog.open(DetalleDialogVentaComponent,{
      width: '820px',
      data:id
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
