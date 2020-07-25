import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';
import { DetalleDialogGuiaComponent } from './detalle-dialog-guia/detalle-dialog-guia.component';

@Component({
  selector: 'ms-guia-list',
  templateUrl: './guia-list.component.html',
  styleUrls: ['./guia-list.component.scss']
})
export class GuiaListComponent implements OnInit {

  SelectFocus: string;
  lista: any[] = [];
  displayedColumns: string[] = ['cliente.persona.nombre', 'direccionPuntoLlegada', 'fechaEntregaBienes', 'motivoTraslado.descripcion','numeroGuia','observacion', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService, private snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.guias().getAllfindByIdSucursal().subscribe(data =>this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Mensaje', { duration: 3000 });
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

  print(id) {
    this.dataService.guias().pdfGuia(id).subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = blobUrl;
      document.body.appendChild(iframe);
      iframe.contentWindow.print();
    });
  }

  selectRow(event) {
    this.SelectFocus=event.idGuia;
  }

  openDialog(id:any) {
    const dialogRef = this.dialog.open(DetalleDialogGuiaComponent,{
      width: '820px',
      data:id
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  /*openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }*/

}
