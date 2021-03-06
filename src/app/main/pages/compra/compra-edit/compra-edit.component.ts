import { Params } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductoDialogoComponent } from './producto-dialogo/producto-dialogo.component';
import { MatDialog } from '@angular/material';
import { Proveedor } from 'src/app/core/model/proveedor.model';
import { ProveedorDialogComponent } from './proveedor-dialog/proveedor-dialog.component';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'ms-compra-edit',
  templateUrl: './compra-edit.component.html',
  styleUrls: ['./compra-edit.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class CompraEditComponent implements OnInit {

  maxDate: Date = new Date();
  prov: Proveedor;
  id: number;
  form: FormGroup;
  edicion: boolean = false;
  proveedores: any[] = [];
  tipocomprobantes: any[] = [];
  sucursales: any[] = [];
  filteredOptions: Observable<any[]>;
  myControlProveedor: FormControl = new FormControl();
  displayedColumns: string[] = ['codProducto', 'nombre', 'marcaProducto', 'cantidaditem', 'precioItem', 'precioVentaItem', 'importeTotalItem', 'acciones'];
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
      let item = this.detalleCompra.value.filter((test, index, array) =>
        index === array.findIndex((findTest) =>
          findTest.producto.idProducto === data.producto.idProducto));
      if (item.length > 0) {
        this.dataService.providers().mensaje.next('El producto ya fue agreagado')
        return;
      }
      const formGroup = this.addDetalleFormControl();
      formGroup.patchValue({
        precioItem: +data.precioItem,
        precioVentaItem: data.precioVentaItem,
        cantidaditem: data.cantidaditem,
        importeTotalItem: +data.importeTotalItem.toFixed(2),
        producto: data.producto,
        productoT: data.producto
      });
    });
    /*this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 4000 });
    });*/

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
    var tzoffset = (this.maxDate).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
    this.form = this.formBuilder.group({
      idCompra: [null],
      fecha: [localISOTime, Validators.compose([Validators.required])],
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
      precioVentaItem: [0, Validators.compose([Validators.required])],
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
    /*let igv = 0;
    let neto = 0;*/
    this.detalleCompra.controls.forEach(formControl => {
      const precio = formControl.get("precioItem").value || 0;
      const cantidad = formControl.get("cantidaditem").value || 0;
      total = total + parseFloat(precio) * parseFloat(cantidad);
      /*const igvItem = total * 0.18;
      neto += subTotal;
      igv += igvItem;
      const totalItem = subTotal + igv;
      total += totalItem;*/

    });
    const neto = total / 1.18;
    const igv = neto * 0.18;
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
      this.listaProveedors();
      return this.proveedores.filter(option =>
        option.razonSocial.toLowerCase().includes(val.razonSocial.toLowerCase()) || option.persona.numeroDocumento.includes(val.persona.numeroDocumento));
    } else {
      this.listaProveedors();
      return this.proveedores.filter(option =>
        option.razonSocial.toLowerCase().includes(val.toLowerCase()) || option.persona.numeroDocumento.includes(val));
    }
  }

  displayFn(val: any) {
    return val ? `${val.razonSocial}` : val;
  }

  /*filter(val: any) {
    if (val != null && val.idCliente > 0) {
      this.listaClientes();
      return this.clientes.filter(option =>
        option.persona.nombre.toLowerCase().includes(val.persona.nombre.toLowerCase()) || option.persona.numeroDocumento.includes(val.persona.numeroDocumento));
    } else {
      this.listaClientes();
      return this.clientes.filter(option =>
        option.persona.nombre.toLowerCase().includes(val.toLowerCase()) || option.persona.numeroDocumento.includes(val));
    }
  }*/

  private loadDataFrom() {
    if (this.edicion) {
      this.dataService.compras().findById(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  listaProveedors() {
    this.dataService.proveedores().getAllfindByIdSucursal().subscribe(data => {
      this.proveedores = data
    });
  }

  listaSucrusal() {
    this.dataService.sucursales().getAllfindByIdSucursal().subscribe(data => {
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
    const dialogRef = this.dialog.open(ProductoDialogoComponent, { width: '950px' });
    dialogRef.afterClosed().subscribe(result => {
      //  console.log(`Dialog result: ${result}`);
    });
  }

  openDialog(proveedor: Proveedor): void {
    let prov = proveedor != null ? proveedor : new Proveedor();
    let dialogRef = this.dialog.open(ProveedorDialogComponent, {
      data: prov
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  save() {
    if (!this.detalleCompra.valid) return;
    if (this.edicion) {
      this.dataService.compras().update(this.form.value).subscribe(data => {
        this.dataService.compras().getAllfindByIdSucursal().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se modifico')
        });
      });
    } else {
      this.dataService.compras().create(this.form.value).subscribe(data => {
        this.dataService.compras().getAllfindByIdSucursal().subscribe(p => {
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
            precioVentaItem: +data.precioVenta.toFixed(2),
            cantidaditem: 1,
            importeTotalItem: +data.precioCompra.toFixed(2),
            importeTotal: +data.precioCompra.toFixed(2),
            producto: data,
            productoT: data
          }
          let item = this.detalleCompra.value.filter((test, index, array) =>
            index === array.findIndex((findTest) =>
              findTest.producto.idProducto === data.idProducto));
          if (item.length > 0) {
            this.dataService.providers().mensaje.next('El producto ya fue agreagado')
            return;
          }
          this.dataService.providers().dialogo.next(detalle);
          this.form.patchValue({ search: "" });
        },
          error => {
            this.dataService.providers().mensaje.next('Producto no encontrado')
          });
    }
  }

  handleKeyboardEvents(event: KeyboardEvent) {
    const key = event.which || event.keyCode;
    //console.log(key)
    switch (key) {
      case 112:
        event.preventDefault();
        this.AgregarProducto();
        break;

      case 113:        
        //this.dialog.closeAll()
        if (this.form.invalid) {
          this.dataService.providers().mensaje.next('Ingrese detalle del COMPRA')
        } else {
          event.preventDefault();
          this.save();
          //this.openDialogPago();
        }
        break;

      case 114:
        event.preventDefault();
        this.openDialog(this.prov);
        break;

      case 115:
        event.preventDefault();
        this.cancel();
        break;

      default:
        break;
    }
  }
}

