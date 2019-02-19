import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';
import { DetalleDialogProformaComponent } from './detalle-dialog-proforma/detalle-dialog-proforma.component';
import { Proforma } from 'src/app/core/model/Proforma';

@Component({
  selector: 'ms-proforma-list',
  templateUrl: './proforma-list.component.html',
  styleUrls: ['./proforma-list.component.scss']
})
export class ProformaListComponent implements OnInit {

  lista: any[] = [];
  displayedColumns: string[] = ['fecha', 'cliente.persona.nombre', 'numeroProforma', 'acuenta','saldo','total', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService, private snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.proformas().getAll().subscribe(data =>this.setData(data));
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

  PrintDetalle(){
    this.dataService.proformas().generarReporteImprimir().subscribe((response) => {
      var blob = new Blob([response], {type: 'application/pdf'});
      const blobUrl = URL.createObjectURL(blob);
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        document.body.appendChild(iframe);
        iframe.contentWindow.print();
    });
  }

  print(id) {
    this.dataService.proformas().pdf(id).subscribe((response) => {
      var blob = new Blob([response], {type: 'application/pdf'});
      const blobUrl = URL.createObjectURL(blob);
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        document.body.appendChild(iframe);
        iframe.contentWindow.print();
    });
  }

  openDialog(id:Proforma) {
    const dialogRef = this.dialog.open(DetalleDialogProformaComponent,{
      width: '820px',
      data:id
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    console.log("id: "+id);
  }

}
