import { startWith, map } from 'rxjs/operators';
import { MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../../../core/data/data.service';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
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
  detalle: any[] = [];
  proveedores: any[] = [];
  tipocomprobantes: any[] = [];
  sucursales: any[] = [];
  filteredOptions: Observable<any[]>;
  myControlProveedor: FormControl = new FormControl();

  displayedColumns: string[] = ['codProducto', 'nombre', 'marcaProducto', 'cantidaditem', 'precioItem', 'importeTotalItem', 'acciones'];
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
    this.listaProveedors();
    this.listaSucrusal();
    this.listaTipoComprobante();
    this.dataService.providers().dialogo.subscribe(data => {
      const formGroup = this.addDetalleFormControl();
      formGroup.patchValue({
        precioItem: data.precioItem,
        cantidaditem: data.cantidaditem,
        importeTotalItem: data.importeTotalItem,
        producto: data.producto
      });
      this.detalle.push(data);
      this.setData();
    });
    this.filteredOptions = this.myControlProveedor.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }


  setData() {
    if (this.detalle) {
      let r = this.detalle;
      this.cantidad = JSON.parse(JSON.stringify(this.detalle)).length;
      this.dataSource = new MatTableDataSource(r);
      this.dataSource.sort = this.sort;
    }
  }

  eliminar(index) {
    this.detalleCompra.removeAt(index);
    this.detalle.splice(index, 1);
    this.setData();
  }

  initFormBuilder() {
    this.form = this.formBuilder.group({
      idCompra: [null],
      fecha: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      montoTotal: [null, Validators.compose([Validators.required])],
      numeroComprobante: [null, Validators.compose([Validators.maxLength(20)])],
      tipoComprobante: [null, Validators.compose([Validators.required])],
      sucursal: [null, Validators.compose([Validators.required])],
      guiaRemision: [null, Validators.compose([Validators.required])],
      proveedor: this.myControlProveedor,
      detalleCompra: this.formBuilder.array([], Validators.compose([]))
    });
  }

  addDetalleFormControl(): FormGroup {
    const formGroup = this.formBuilder.group({
      idDetalleCompra: [null, Validators.compose([Validators.required])],
      precioItem: [0, Validators.compose([Validators.required])],
      cantidaditem: [0, Validators.compose([Validators.required])],
      importeTotalItem: [0, Validators.compose([Validators.required])],
      producto: [null, Validators.compose([Validators.required])]
    });

    this.detalleCompra.push(formGroup);
    return formGroup;
  }

  get detalleCompra(): FormArray {
    return this.form.get('detalleCompra') as FormArray;
  }

  filter(val: any) {
    if (val != null && val.idProveedor > 0) {
      return this.proveedores.filter(option =>
        option.nombreComercial.toLowerCase().includes(val.nombreComercial.toLowerCase()) || option.razonSocial.includes(val.razonSocial));
    } else {
      return this.proveedores.filter(option =>
        option.nombreComercial.toLowerCase().includes(val.toLowerCase()) || option.razonSocial.includes(val));
    }
  }

  listaProveedors() {
    this.dataService.proveedores().getAll().subscribe(data => {
      this.proveedores = data
    });
  }

  displayFn(val: any) {
    return val ? `${val.nombreComercial}` : val;
  }
  listaSucrusal() {
    this.dataService.sucursales().getAll().subscribe(data => {
      this.sucursales = data
    });
  }

  listaTipoComprobante() {
    this.dataService.tipocomprobantes().getAll().subscribe(data => {
      this.tipocomprobantes = data
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
