import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';
import { CajaFuerteEditComponent } from '../caja-fuerte-edit/caja-fuerte-edit.component';
import { caja } from 'src/app/core/model/caja.model';

@Component({
  selector: 'ms-caja-fuerte-list',
  templateUrl: './caja-fuerte-list.component.html',
  styleUrls: ['./caja-fuerte-list.component.scss']
})
export class CajaFuerteListComponent implements OnInit {

  form: FormGroup;
  montoInicioTurno:number=0;
  total: number = 0;
  lista: any[]=[];
  displayedColumns: string[] = ["fechaCierre", "montoInicioTurno","montoTotalRegistrado","montoTotalDia","conteoFinTurno","estadoCaja","acciones"];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private dataService:DataService,private formBuilder: FormBuilder, private snackBar:MatSnackBar,public dialog: MatDialog) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      fechaConsulta: [ new Date(), Validators.compose([Validators.required])]     
    }); 
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 4000 });
      });  
    this.buscar();
  }

  buscar() { 
    if (this.form.valid) {     
      this.dataService.cajas().buscar(this.form.value).subscribe(data => this.setData(data));
      this.dataService.cajas().buscarMontoInicioTurnoPorFecha(this.form.value).subscribe(data=>{
        this.montoInicioTurno=data.montoInicioTurno|0;
          },error=>{     
          console.error(error);
          });
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
      return data.map(t => t.montoTotalRegistrado).reduce((total, montos) => total + montos, 0)|0;
    } else {
      return 0;
    }
  }

  openDialog(id:caja) {
    const dialogRef = this.dialog.open(CajaFuerteEditComponent,{
    data:id
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
