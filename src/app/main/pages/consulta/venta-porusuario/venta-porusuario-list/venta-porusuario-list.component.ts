import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'ms-venta-porusuario-list',
  templateUrl: './venta-porusuario-list.component.html',
  styleUrls: ['./venta-porusuario-list.component.scss']
})
export class VentaPorusuarioListComponent implements OnInit {

  form: FormGroup;
  total: number = 0;
  lista: any[]=[];
  displayedColumns: string[] = ["fecha","tipocomprobante.descripcion", "numeroComprobante",'subTotal','igv','montoTotal'];
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
      fechaConsulta: [localISOTime, Validators.compose([Validators.required])],
      nombreCompletoPersonal: [null, Validators.compose([Validators.required])]    
    }); 
  }

  buscar() { 
    if (this.form.valid) {     
      this.dataService.ventas().listVentaPorUsuario(this.form.value).subscribe(data => this.setData(data));
    } else {    
     console.log("ingrese el campo fecha...");
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
      return data.map(t => t.montoTotal).reduce((total, montos) => total + montos, 0)|0;
    } else {
      return 0;
    }
  }

}
