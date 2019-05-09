import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'ms-utilidad-list-mes',
  templateUrl: './utilidad-list-mes.component.html',
  styleUrls: ['./utilidad-list-mes.component.scss']
})
export class UtilidadListMesComponent implements OnInit {

  form: FormGroup;
  total: number = 0;
  totalEgreso: number = 0;
  lista: any[]=[];
  displayedColumns: string[] = ["cantidad","nombreProducto", "precioCompra",'precioVentaUnitario','utilidadUnitaria','utilidadNeta'];
  displayedColumnsegreso: string[] = ["fecha","tipoPago", "descripcion","benificiario","monto"];
  dataSource: MatTableDataSource<any>;
  dataSourceEgreso: MatTableDataSource<any>;
  cantidad: number;
  cantidadEgreso: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginatorEgreso: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort) sortEgreso: MatSort;

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
      this.dataService.ventas().listarUtilidadMes(this.form.value).subscribe(data => this.setData(data));
      this.dataService.egresos().buscarEgresoFechaConsultaMes(this.form.value).subscribe(dataegreso => this.setDataEgreso(dataegreso));
    } else {    
     this.dataService.providers().mensaje.next('Ingrese el campo fecha inicio y final')
    }
  }

  setData(data) {
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.sort = this.sort;
    this.total =this.getTotalCost(r);
  }

  setDataEgreso(dataegreso) {
    let r = dataegreso;
    this.cantidad = JSON.parse(JSON.stringify(dataegreso)).length;
    this.dataSourceEgreso = new MatTableDataSource(r);
    this.dataSourceEgreso.sort = this.sortEgreso;
    this.totalEgreso =this.getTotalCostEgreso(r);
  }

  getTotalCost(data) {
    if (data) {
      return data.map(t => t.utilidadNeta).reduce((total, montos) => total + montos, 0)|0;
    } else {
      return 0;
    }
  }

  getTotalCostEgreso(data) {
    if (data) {
      return data.map(t => t.monto).reduce((total, montos) => total + montos, 0)|0;
    } else {
      return 0;
    }
  }

  print() {
    if (this.form.valid) {
      this.dataService.ventas().reportUtilidadMes(this.form.value).subscribe((response) => {
        var blob = new Blob([response], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        document.body.appendChild(iframe);
        iframe.contentWindow.print();
      });
    }else{
      this.dataService.providers().mensaje.next('Todos los campos son requeridos')
    }
  }

}
