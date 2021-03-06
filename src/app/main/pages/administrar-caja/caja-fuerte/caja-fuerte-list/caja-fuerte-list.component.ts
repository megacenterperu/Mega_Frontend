import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';
import { CajaFuerteEditComponent } from '../caja-fuerte-edit/caja-fuerte-edit.component';
import { caja } from 'src/app/core/model/caja.model';
import { TOKEN_NAME } from 'src/config/auth.config';
import * as decode from 'jwt-decode';

@Component({
  selector: 'ms-caja-fuerte-list',
  templateUrl: './caja-fuerte-list.component.html',
  styleUrls: ['./caja-fuerte-list.component.scss']
})
export class CajaFuerteListComponent implements OnInit {

  maxFecha: Date = new Date();
  form: FormGroup;
  montoInicioTurno: number = 0;
  total: number = 0;
  lista: any[] = [];
  displayedColumns: string[] = ["fechaCierre", "montoInicioTurno", "montoTotalRegistrado", "montoTotalDia", "conteoFinTurno", "estadoCaja", "acciones"];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    var tzoffset = (this.maxFecha).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
    this.form = this.formBuilder.group({
      fechaConsulta: [localISOTime, Validators.compose([Validators.required])]
    });
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 4000 });
    });
    this.buscar();
  }

  buscar() {
    if (this.form.valid) {
      this.dataService.cajas().buscar(this.form.value).subscribe(data => this.setData(data));
      this.dataService.cajas().buscarMontoInicioTurnoPorFecha(this.form.value).subscribe(data => {
        if(data){
          this.montoInicioTurno = data.montoInicioTurno | 0;
        }else{
          this.dataService.providers().mensaje.next('No realizo la apertura de caja')
        }
        
      }, error => {
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
    this.total = this.getTotalCost(r);
  }

  getTotalCost(data) {
    if (data) {
      return data.map(t => t.montoTotalRegistrado).reduce((total, montos) => total + montos, 0) | 0;
    } else {
      return 0;
    }
  }

  openDialog(id: caja) {
    let tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
    const decodedToken = decode(tk.access_token);
    let roles = decodedToken.authorities;
    if (roles == "USER") {
      this.dataService.providers().mensaje.next("Acceso Denegado!, Por favor, verifica tus permisos !");
    } else {
      const dialogRef = this.dialog.open(CajaFuerteEditComponent, {
        data: id
      });
      dialogRef.afterClosed().subscribe(result => {
        //console.log(`Dialog result: ${result}`);
      });
    }
  }
}
