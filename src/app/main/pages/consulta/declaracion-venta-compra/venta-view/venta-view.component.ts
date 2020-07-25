import { ViewChild, ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/data/data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'ms-venta-view',
  templateUrl: './venta-view.component.html',
  styleUrls: ['./venta-view.component.scss']
})
export class VentaViewComponent implements OnInit {

  total: number = 0;
  form: FormGroup;
  displayedColumns: string[] = ['fecha','serieComprobante','numeroComprobante','cliente.persona.numeroDocumento', 'cliente.persona.nombre', 'tipocambio.idTipocambio','tipocambio.nombre', 'montoTotal'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;

  @ViewChild('TABLE') table: ElementRef;

  maxFecha: Date = new Date();

  constructor(private dataService:DataService,private formBuilder: FormBuilder, private snackBar:MatSnackBar) { }

  ngOnInit() {
    var tzoffset = (this.maxFecha).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
    this.form = this.formBuilder.group({
      fechaConsulta: [ localISOTime, Validators.compose([Validators.required])],
      fechaSgte: [ null, Validators.compose([Validators.required])]  
    }); 
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Mensaje', { duration: 3000 });
    });
  }

  buscar() { 
    if (this.form.valid) {     
      this.dataService.ventas().buscarVentaFechaPorDeclarar(this.form.value).subscribe(data => this.setData(data));
    } else {    
     this.dataService.providers().mensaje.next('Ingrese el campo fecha inicio y final')
    }
  }

  setData(data) {
    if (data) {
      let r = data;
      this.cantidad = JSON.parse(JSON.stringify(data)).length;
      this.dataSource = new MatTableDataSource(r);
      this.total =this.getTotalCost(r);
    }
  }

  getTotalCost(data) {
    if (data) {
      return data.map(t => t.montoTotal).reduce((total, montos) => total + montos, 0)|0;
    } else {
      return 0;
    }
  }
  
  /*ExportTOExcel(){
    if (this.form.valid) {
      const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'FACTURAS');
      /* save to file
      XLSX.writeFile(wb,'20601358825-MEGACENTER-PERU.xlsx');
    }else {    
      this.dataService.providers().mensaje.next('Ingrese el campo fecha inicio y final')
     }
  }*/

  descargarExcel(){
    if (this.form.valid) {
      this.dataService.ventas().getAllExcel(this.form.value).subscribe(data => {
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.href = url;
        a.download = '20601358825-MEGACENTER-PERU.xls';
        a.click();
        return url;
      });
    }else{
      this.dataService.providers().mensaje.next('Todos los campos son requeridos')
    }
  }
  
}
