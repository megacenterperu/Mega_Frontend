import { Params } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../../../core/data/data.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
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
  proveedores: any[] = [];
  tipocomprobantes: any[] = [];
  sucursales: any[] = [];
  filteredOptions: Observable<any[]>;
  myControlProveedor: FormControl = new FormControl();
  displayedColumns: string[] = ['codProducto', 'nombre', 'marcaProducto', 'cantidaditem', 'precioItem', 'importeTotalItem', 'acciones'];
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
        precioItem: +data.precioItem.toFixed(2),
        cantidaditem: data.cantidaditem,
        importeTotalItem: +data.importeTotalItem.toFixed(2),
        producto: data.producto,
        productoT: data.producto
      });
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.loadDataFrom();
    });
    this.filteredOptions = this.myControlProveedor.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  eliminar(index) {
    this.detalleCompra.removeAt(index);
  }

  initFormBuilder() {
    this.form = this.formBuilder.group({
      idCompra: [null],
      fecha: [new Date(), Validators.compose([Validators.required])],
      montoTotal: [0, Validators.compose([Validators.required])],
      neto: [0, Validators.compose([Validators.required])],
      igv: [0, Validators.compose([Validators.required])],
      numeroComprobante: [null, Validators.compose([Validators.maxLength(20)])],
      tipocomprobante: [null, Validators.compose([Validators.required])],
      sucursal: [null, Validators.compose([Validators.required])],
      guiaRemision: [null, Validators.compose([Validators.required])],
      proveedor: this.myControlProveedor,
      search: [null],//temporal
      detalleCompra: this.formBuilder.array([], Validators.compose([]))
    });

    this.detalleCompra.valueChanges.subscribe(value => {
      this.calcularTotales();
    });
  }

  addDetalleFormControl(): FormGroup {
    const formGroup = this.formBuilder.group({
      idDetalleCompra: [null],
      precioItem: [0, Validators.compose([Validators.required])],
      cantidaditem: [0, Validators.compose([Validators.required])],
      importeTotal: [{ value: '', disabled: true }, Validators.compose([Validators.required])],
      importeTotalItem: [null, Validators.compose([Validators.required])],
      productoT: this.formBuilder.group({
        codProducto: [{ value: '', disabled: true }],
        nombre: [{ value: '', disabled: true }],
        marcaProducto: [{ value: '', disabled: true }]
      }),
      producto: [null, Validators.compose([Validators.required])]
    });
    this.detalleChange(formGroup);
    this.detalleCompra.push(formGroup);
    return formGroup;
  }

  detalleChange(formGroup: FormGroup) {
    formGroup.get("precioItem").valueChanges.subscribe(value => {
      const precio = value || 0;
      const cantidad = formGroup.get("cantidaditem").value || 0;
      let subTotal = parseFloat(precio) * parseFloat(cantidad);
      formGroup.patchValue({
        importeTotalItem: +subTotal.toFixed(2),
        importeTotal: +subTotal.toFixed(2)
      });
    });
    formGroup.get("cantidaditem").valueChanges.subscribe(value => {
      const precio = formGroup.get("precioItem").value || 0;
      const cantidad = value || 0;
      let subTotal = parseFloat(precio) * parseFloat(cantidad);
      formGroup.patchValue({
        importeTotalItem: +subTotal.toFixed(2),
        importeTotal: +subTotal.toFixed(2)
      });
    });
  }

  calcularTotales() {
    let total = 0;
    let igv = 0;
    let neto = 0;
    this.detalleCompra.controls.forEach(formControl => {
      const precio = formControl.get("precioItem").value || 0;
      const cantidad = formControl.get("cantidaditem").value || 0;
      let subTotal = parseFloat(precio) * parseFloat(cantidad);
      const igvItem = subTotal * 0.18;
      neto += subTotal;
      igv += igvItem;
      const totalItem = subTotal + igv;
      total += totalItem;

    });
    this.form.patchValue({
      montoTotal: +total.toFixed(2),
      neto: +neto.toFixed(2),
      igv: +igv.toFixed(2)
    });
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

  private loadDataFrom() {
    if (this.edicion) {
      this.dataService.compras().findById(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
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
    if (!this.detalleCompra.valid) return;
    if (this.edicion) {
      this.dataService.compras().update(this.form.value).subscribe(data => {
        this.dataService.compras().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se modifico')
        });
      });
    } else {
      this.dataService.compras().create(this.form.value).subscribe(data => {
        this.dataService.compras().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se registro');
        });
      });
    }
    this.cancel();
  }

  buscarProducto($event) {
    if ($event.key === "Enter") {
      this.dataService.productos().findProductoByCodProducto($event.target.value)
        .subscribe(data => {
          let detalle = {
            precioItem: +data.precioCompra.toFixed(2),
            cantidaditem: 1,
            importeTotalItem: +data.precioCompra.toFixed(2),
            importeTotal: +data.precioCompra.toFixed(2),
            producto: data,
            productoT: data
          }
          this.dataService.providers().dialogo.next(detalle);
          this.form.patchValue({ search: "" });
        },
          error => {
            this.dataService.providers().mensaje.next('Producto no encontrado')
          });
    }
  }
}

