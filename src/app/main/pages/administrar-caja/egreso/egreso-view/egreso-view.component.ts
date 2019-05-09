import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'ms-egreso-view',
  templateUrl: './egreso-view.component.html',
  styleUrls: ['./egreso-view.component.scss']
})
export class EgresoViewComponent implements OnInit {

  form: FormGroup;
  total: number = 0;
  lista: any[]=[];
  displayedColumns: string[] = ["fecha","tipoPago", "descripcion","benificiario","monto"];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  maxFecha: Date = new Date();

  constructor(private dataService:DataService,private formBuilder: FormBuilder, private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      fechaConsulta: [ new Date(), Validators.compose([Validators.required])]     
    });    
  }

  buscar() { 
    if (this.form.valid) {     
      this.dataService.egresos().buscarEgresoFechaConsulta(this.form.value).subscribe(data => this.setData(data));
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
      return data.map(t => t.monto).reduce((total, montos) => total + montos, 0)|0;
    } else {
      return 0;
    }
  }

}
