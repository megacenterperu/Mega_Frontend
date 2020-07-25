import { TOKEN_NAME } from 'src/config/auth.config';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';
import * as decode from 'jwt-decode';

@Component({
  selector: 'ms-caja-list',
  templateUrl: './caja-list.component.html',
  styleUrls: ['./caja-list.component.scss']
})
export class CajaListComponent implements OnInit {

  tienePermiso: boolean = false;

  form: FormGroup;
  fecha: Date = new Date();
  maxFecha: Date = new Date();

  total: number = 0;
  totalEgreso: number = 0;
  lista: any[] = [];
  displayedColumns: string[] = ["fecha", "numeroComprobante", "tipocomprobante.descripcion", "estadoComprobante", "tipopago.nombre", "cliente.persona.nombre", "montoTotal"];
  displayedColumnsegreso: string[] = ["fecha", "tipoPago", "descripcion", "benificiario", "monto"];
  dataSource: MatTableDataSource<any>;
  dataSourceEgreso: MatTableDataSource<any>;
  cantidad: number;
  cantidadEgreso: number;
  montoInicioTurno: number = 0;
  montoTotalDia: number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginatorEgreso: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort) sortEgreso: MatSort;

  constructor(private dataService: DataService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit() {
    var tzoffset = (this.maxFecha).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
    this.form = this.formBuilder.group({
      fechaConsulta: [localISOTime, Validators.compose([Validators.required])],
    });
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 4000 });
    });
    this.hasPermision();
    this.buscar();
  }

  buscar() {
    if (this.form.valid) {
      this.dataService.ventas().buscarVentaFecha(this.form.value).subscribe(data => this.setData(data));
      this.dataService.egresos().buscar(this.form.value).subscribe(dataegreso => this.setDataEgreso(dataegreso));
      this.dataService.cajaFuertes().buscar(this.form.value).subscribe(data => {
        if (data) {
          this.montoInicioTurno = data.montoInicioTurno | 0;
        } else {
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

  setDataEgreso(dataegreso) {
    let r = dataegreso;
    this.cantidad = JSON.parse(JSON.stringify(dataegreso)).length;
    this.dataSourceEgreso = new MatTableDataSource(r);
    this.dataSourceEgreso.sort = this.sortEgreso;
    this.totalEgreso = this.getTotalCostEgreso(r);
  }

  getTotalCost(data) {
    if (data) {
      return data.map(t => t.montoTotal).reduce((total, montos) => total + montos, 0) | 0;
    } else {
      return 0;
    }
  }
  getTotalCostEgreso(data) {
    if (data) {
      return data.map(t => t.monto).reduce((total, montos) => total + montos, 0) | 0;
    } else {
      return 0;
    }
  }

  hasPermision() {
    let tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
    const decodedToken = decode(tk.access_token);
    let roles = decodedToken.authorities;
    if (roles == "USER") {
      this.tienePermiso = false;
    } else {
      this.tienePermiso = true;
    }
  }

  saveCaja() {
    var tzoffset = (this.fecha).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
    const caja = {
      fechaCierre: localISOTime,
      montoTotalRegistrado: (this.total - this.totalEgreso),
      montoInicioTurno: this.montoInicioTurno,
      montoTotalDia: this.total - this.totalEgreso + this.montoInicioTurno,
      conteoFinTurno: this.montoTotalDia,
      estadoCaja: "CUADRE CORRECTO"
    };
    const montoTotalDia = this.total - this.totalEgreso + this.montoInicioTurno;
    const conteoFinTurno = this.montoTotalDia;
    if (montoTotalDia <= conteoFinTurno) {
      this.dataService.cajas().create(caja).subscribe(r => {
        this.dataService.ventas().buscarVentaFecha(this.form.value).subscribe(data => this.setData(data));
        this.dataService.egresos().buscar(this.form.value).subscribe(dataegreso => this.setDataEgreso(dataegreso));
        this.dataService.cajaFuertes().buscar(this.form.value).subscribe(data => {
          if (data) {
            this.montoInicioTurno = data.montoInicioTurno | 0;
            this.dataService.providers().cambio.next(data);
            this.montoTotalDia = 0;
            this.dataService.providers().mensaje.next("El proceso de cierre de caja fuerte se realizó con éxito!");
          } else {

          }
        });
      },
        error => {
          console.log("error!!!");
        });
    } else {
      this.dataService.providers().mensaje.next("CUADRE INCORRECTO");
    }
  }
  
}
