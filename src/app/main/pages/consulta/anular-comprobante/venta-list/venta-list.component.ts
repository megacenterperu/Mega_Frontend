import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogConfirmationComponent } from '../../dialog-confirmation/dialog-confirmation.component';
@Component({
  selector: 'ms-venta-list',
  templateUrl: './venta-list.component.html',
  styleUrls: ['./venta-list.component.scss']
})
export class VentaListComponent implements OnInit {

  dialogRef: MatDialogRef<DialogConfirmationComponent>;

  form: FormGroup;
  fecha: Date = new Date();
  maxFecha: Date = new Date();

  lista: any[] = [];
  displayedColumns: string[] = ['cliente.nombre', 'fecha','descripcion', 'numeroComprobante', 'montoTotal', 'acciones'];
  displayedColumnsdetalle: string[] = ['cantidad','producto.unidadMedida.codUnidadmedida', 'producto.nombre', 'producto.marcaProducto', 'precio','importeTotal'];
  dataSource: MatTableDataSource<any>;
  dataSourceDetalle: MatTableDataSource<any>;
  cantidad: number;
  cantidadDetalle: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginatorDetalle: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort) sortDetalle: MatSort;

  constructor(private dataService: DataService,private formBuilder: FormBuilder, private snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit() {
    var tzoffset = (this.maxFecha).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
    this.form = this.formBuilder.group({
      fechaConsulta: [localISOTime, Validators.compose([Validators.required])],    
    }); 

    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Mensaje', { duration: 3000 });
    });
    this.buscar();
  }

  buscar() { 
    if (this.form.valid) {     
      this.dataService.ventas().buscarVentaFechaPorAnular(this.form.value).subscribe(data => this.setData(data));
    } else { 
      this.dataService.providers().mensaje.next("ingrese la fecha de Consulta");   
    }
  }

  setData(data) {
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(id) {
    if (id>0 ) {
      this.dataService.ventas().getAllDetalle(id).subscribe(datadetalle => this.setDataDetalle(datadetalle));
    }else{
      this.setDataDetalle([]);
    }
  }

  setDataDetalle(datadetalle) {
    let r = datadetalle;
    this.cantidadDetalle = JSON.parse(JSON.stringify(datadetalle)).length;
    this.dataSourceDetalle = new MatTableDataSource(r);
    this.dataSourceDetalle.sort = this.sortDetalle;
  }

  operar(row){
    if(row.idVenta>0 && row.idVenta!=null){
      this.dialogRef = this.dialog.open(DialogConfirmationComponent, {
        disableClose: false
      });
      this.dialogRef.afterClosed().subscribe(result => {
        if(result){
          const anularComproante={
            idAnulacion:null,
            venta:row,
            fechaEmision:row.fecha,
            tipoComprobante:row.tipocomprobante.codTipocomprobante,
            serieComprobante:row.serieComprobante,
            numeroComprobante:row.numeroComprobante,
            importeTotal:row.montoTotal
          }
          this.dataService.anularComprobantes().create(anularComproante).subscribe(data =>{
            this.dataService.ventas().buscarVentaFechaPorAnular(this.form.value).subscribe(data=>this.setData(data));
            this.setDataDetalle([]);
            this.dataService.providers().mensaje.next("Se Realizo con éxito el proceso de anulación del comprobante!");
          });
        }
        this.dialogRef = null;
      });
    }else{
      console.log("NOSE");
    }
  }

}
