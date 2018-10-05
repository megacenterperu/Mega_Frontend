import { MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../../../core/data/data.service';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoDialogoComponent } from './producto-dialogo/producto-dialogo.component';
import { Producto } from '../../../../core/model/producto.model';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'ms-compra-edit',
  templateUrl: './compra-edit.component.html',
  styleUrls: ['./compra-edit.component.scss']
})
export class CompraEditComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  detalleCompra: any[] = [];
  proveedores: any[] = [];
  tipoComprobantes: any[] = [];
  sucursales: any[] = [];
  filteredOptions: Observable<any[]>;
  myControlProveedor: FormControl = new FormControl();


  lista: any[] = [];
  displayedColumns: string[] = ['codProducto', 'nombre', 'marcaProducto', 'stock', 'precioVenta', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.initFormBuilder();
    this.dataService.providers().dialogo.subscribe(data => {
      this.lista.push(data);
      this.setData(this.lista);
    });
  }
  setData(data) {
    if (data) {
      let r = data;
      this.cantidad = JSON.parse(JSON.stringify(data)).length;
      this.dataSource = new MatTableDataSource(r);
      this.dataSource.sort = this.sort;
    }
  }
  eliminar(index) {
    this.lista.splice(index, 1);
    this.setData(this.lista);
  }

  initFormBuilder() {
    this.form = this.formBuilder.group({
      idCompra: [null],
      fecha: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      montoTotal: [null, Validators.compose([Validators.required])],
      numeroComprobante: [null, Validators.compose([Validators.maxLength(20)])],
      tipoComprobante: [null, Validators.compose([Validators.required])],
      sucursal: [null, Validators.compose([Validators.required])],
      proveedor: this.myControlProveedor,
    });
  }

  agregarDetalle() {

  }

  listaProveedor() {
    this.dataService.proveedores().getAll().subscribe(data => {
      this.proveedores = data
    });
  }
  listaSucrusal() {
    this.dataService.sucursales().getAll().subscribe(data => {
      this.sucursales = data
    });
  }

  listaTipoComprobante() {
    this.dataService.tipocomprobantes().getAll().subscribe(data => {
      this.tipoComprobantes = data
    });
  }

  cancel() {
    if (this.edicion) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../'], { relativeTo: this.route })
    }
  }


  AgregarProducto() {
    let producto = new Producto();
    let dialogRef = this.dialog.open(ProductoDialogoComponent, {
      width: '900px',
      disableClose: true,
      data: producto
    });
  }


  save() {
    if (this.edicion) {
      //update
      this.dataService.compras().update(this.form.value).subscribe(data => {
        this.dataService.compras().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se modifico')
        });
      });
    } else {
      //insert
      this.dataService.compras().create(this.form.value).subscribe(data => {
        this.dataService.compras().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se registro');
        });
      });
    }
    this.cancel();
  }
}
