import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'ms-compra-list-mes',
  templateUrl: './compra-list-mes.component.html',
  styleUrls: ['./compra-list-mes.component.scss']
})
export class CompraListMesComponent implements OnInit {

  form: FormGroup;
  total: number = 0;
  lista: any[]=[];
  displayedColumns: string[] = ["stockAnterior","cantidadItem", "stockActual",'codigoProducto','descripcionProducto','marcaProducto','colorProducto','precioItem','importeTotalItem'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
      this.dataService.compras().listarCompraProductoMes(this.form.value).subscribe(data => this.setData(data));
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

  getTotalCost(data) {
    if (data) {
      return data.map(t => t.importeTotalItem).reduce((total, montos) => total + montos, 0)|0;
    } else {
      return 0;
    }
  }

  print() {
    if (this.form.valid) {
      this.dataService.compras().reportCompraProductoMes(this.form.value).subscribe((response) => {
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
