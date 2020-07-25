import { startWith, map } from 'rxjs/operators';
import { TOKEN_NAME } from 'src/config/auth.config';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/core/model/cliente.model';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/data/data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import * as decode from 'jwt-decode';
import { ProductoVentaDialogComponent } from './producto-venta-dialog/producto-venta-dialog.component';
import { ClienteVentaDialogComponent } from './cliente-venta-dialog/cliente-venta-dialog.component';
import { CobroDialogComponent } from './cobro-dialog/cobro-dialog.component';

@Component({
  selector: 'ms-venta-directa-edit',
  templateUrl: './venta-directa-edit.component.html',
  styleUrls: ['./venta-directa-edit.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class VentaDirectaEditComponent implements OnInit {

  monto: number;
  maxDate: Date = new Date();
  cli: Cliente;
  id: number;
  form: FormGroup;
  edicion: boolean = false;
  clientes: any[] = [];
  defaultClient: boolean = true;
  tipocomprobantes: any[] = [];
  tipopagos: any[] = [];
  filteredOptions: Observable<any[]>;
  myControlCliente: FormControl = new FormControl();
  displayedColumns: string[] = ['codProducto', 'nombre', 'unidadMedida', 'cantidad', 'tipoAfectacionIgv', 'precioT', 'importeTotalItem', 'acciones'];

  redundancia: boolean = false;
  tienePermiso: boolean = false;
  @ViewChild('firstname') firstname: any;//ElementRef

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.firstname.nativeElement.focus();
    this.initFormBuilder();
    this.listaClientes();
    this.listaTipoComprobante();
    this.listaTipoPago();
    this.hasPermision();
    this.dataService.providers().dialogo.subscribe(data => {
      let item = this.detalleVenta.value.filter((test, index, array) =>
        index === array.findIndex((findTest) =>
          findTest.producto.idProducto === data.producto.idProducto));
      if (item.length > 0) {
        this.dataService.providers().mensaje.next('El producto ya fue agreagado')
        return;
      }
      const formGroup = this.addDetalleFormControl();
      formGroup.patchValue({
        precio: +data.precio,
        precioT: +data.precio,
        cantidad: data.cantidad,
        importeTotalItem: +data.importeTotalItem.toFixed(2),
        producto: data.producto,
        productoT: data.producto,
        tipoAfectacionIgv: data.producto.tipoAfectacionIgv.descripcion,
        itemAfectacion: data.producto.tipoAfectacionIgv.codigoTipo,
        unidadMedida: data.producto.unidadMedida.descripcion
      });
    });
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 4000 });
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.loadDataFrom();
    });

    this.filteredOptions = this.myControlCliente.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  eliminar(index) {
    this.detalleVenta.removeAt(index);
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

  initFormBuilder() {
    var tzoffset = (this.maxDate).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
    this.form = this.formBuilder.group({
      idVenta: [null],
      fecha: [localISOTime, Validators.compose([Validators.required])],
      pagoMensual: [localISOTime],
      subTotal: [0, Validators.compose([Validators.required])],
      docuAnticipoTotal: [0, Validators.compose([Validators.required])],
      docuInafecta: [0, Validators.compose([Validators.required])],
      docuExonerada: [0, Validators.compose([Validators.required])],
      docuGratuita: [0, Validators.compose([Validators.required])],
      docuDescuento: [0, Validators.compose([Validators.required])],
      docuOtrostributos: [0, Validators.compose([Validators.required])],
      docuIsc: [0, Validators.compose([Validators.required])],
      igv: [0, Validators.compose([Validators.required])],
      docuOtroscargos: [0, Validators.compose([Validators.required])],
      montoTotal: [0, Validators.compose([Validators.required])],
      tipocomprobante: [null, Validators.compose([Validators.required])],
      tipopago: [null, Validators.compose([Validators.required])],
      numeroComprobante: [null],
      serieComprobante: [null],
      estadoVenta: [0],
      cliente: this.myControlCliente,
      search: [null],//temporal
      detalleVenta: this.formBuilder.array([], Validators.compose([Validators.required]))
    });

    this.detalleVenta.valueChanges.subscribe(value => {
      this.calcularVentaTotales();
    });
  }

  addDetalleFormControl(): FormGroup {
    const formGroup = this.formBuilder.group({
      idDetalleVenta: [null],
      itemMoneda: [null],
      cantidad: [0, Validators.compose([Validators.required])],
      itemAfectacion: [null, Validators.compose([Validators.required])],
      itemTipoPrecioVenta: [null],//Código de tipo de precio - Catálogo No. 16, por defecto ''01'' Precio unitario (incluye el IGV)
      itemPventa: [null],//Precio de venta unitario sin IGV o valor de venta
      precio: [0, Validators.compose([Validators.required])],
      precioT: [{ value: 0, disabled: !this.tienePermiso }, Validators.compose([Validators.required])],
      importeTotalItem: [{ value: '', disabled: true }, Validators.compose([Validators.required])],
      importeTotal: [null, Validators.compose([Validators.required])],
      itemTiIgv: [null],
      productoT: this.formBuilder.group({
        codProducto: [{ value: '', disabled: true }],
        nombre: [{ value: '', disabled: true }]
      }),
      tipoAfectacionIgv: [{ value: '', disabled: true }],
      unidadMedida: [{ value: '', disabled: true }],
      producto: [null, Validators.compose([Validators.required])],
      estado: ['DESPACHADO']
    });
    this.detalleChange(formGroup);
    this.detalleVenta.push(formGroup);
    return formGroup;
  }

  detalleChange(formGroup: FormGroup) {
    formGroup.get("precioT").valueChanges.subscribe(value => {
      const precio = value || 0;
      const cantidad = formGroup.get("cantidad").value || 0;
      let subTotalv = parseFloat(precio) * parseFloat(cantidad);
      formGroup.patchValue({
        precio: +precio,
        importeTotalItem: +subTotalv.toFixed(2),
        importeTotal: +subTotalv.toFixed(2)
      });
    });
    formGroup.get("cantidad").valueChanges.subscribe(value => {
      const producto = formGroup.value;
      const precio = formGroup.get("precio").value || 0;
      let cantidad = value || 0;
      if (producto.producto) {
        const stock = producto.producto.stock;
        if (cantidad > stock && !this.redundancia) {
          cantidad = stock;
          this.redundancia = true;
        } else { this.redundancia = false; }
      }
      let subTotalv = parseFloat(precio) * parseFloat(cantidad);
      if (this.redundancia) {
        this.dataService.providers().mensaje.next('Stock del producto insuficiente como maximo tiene (' + cantidad + ') Productos')
        formGroup.patchValue({
          importeTotalItem: +subTotalv.toFixed(2),
          cantidad: +cantidad,
          importeTotal: +subTotalv.toFixed(2)
        });
      } else {
        formGroup.patchValue({
          importeTotalItem: +subTotalv.toFixed(2),
          importeTotal: +subTotalv.toFixed(2)
        });
      }
    });
  }

  get detalleVenta(): FormArray {
    return this.form.get('detalleVenta') as FormArray;
  }

  calcularVentaTotales() {
    let total = 0;
    let totalExonerada = 0;
    let totalInafecta = 0;
    this.detalleVenta.controls.forEach(fromControl => {
      const tipoIgv = fromControl.get('tipoAfectacionIgv').value;
      const precio = fromControl.get("precio").value || 0;
      const cantidad = fromControl.get("cantidad").value || 0;
      if (tipoIgv == 'Exonerado' || tipoIgv == 'EXONERADO' || tipoIgv == 'Exonerado - Operación Onerosa') {
        totalExonerada = totalExonerada + parseFloat(precio) * parseFloat(cantidad);
      } else if (tipoIgv == 'Inafecto' || tipoIgv == 'INAFECTO' || tipoIgv == 'Inafecto - Operación Onerosa') {
        totalInafecta = totalInafecta + parseFloat(precio) * parseFloat(cantidad);
      } else {
        total = total + parseFloat(precio) * parseFloat(cantidad);
      }
    });
    const neto = total / 1.18;
    const igv = neto * 0.18;
    const montoTotalGE = totalExonerada + totalInafecta + total;
    this.form.patchValue({
      docuExonerada: +totalExonerada.toFixed(2),
      docuInafecta: +totalInafecta.toFixed(2),
      montoTotal: +montoTotalGE.toFixed(2),
      subTotal: +neto.toFixed(2),
      igv: +igv.toFixed(2)
    });
  }

  private loadDataFrom() {
    if (this.edicion) {
      this.dataService.ventas().findById(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  listaClientes() {
    this.dataService.clientes().getAllfindByIdSucursal().subscribe(data => {
      this.clientes = data;
      if (this.defaultClient) {
        this.defaultClient = false;
        let selected = this.clientes.filter(d => { return d.isdefaultCliente; })
        if (selected) {
          this.myControlCliente.setValue(selected[0]);
        }
      }
    });
  }

  filter(val: any) {
    if (val != null && val.idCliente > 0) {
      this.listaClientes();
      return this.clientes.filter(option =>
        option.persona.nombre.toLowerCase().includes(val.persona.nombre.toLowerCase()) || option.persona.numeroDocumento.includes(val.persona.numeroDocumento));
    } else {
      this.listaClientes();
      return this.clientes.filter(option =>
        option.persona.nombre.toLowerCase().includes(val.toLowerCase()) || option.persona.numeroDocumento.includes(val));
    }
  }

  displayFn(val: any) {
    return val ? `${val.persona.nombre}` : val;
  }

  listaTipoComprobante() {
    this.dataService.tipocomprobantes().getAll().subscribe(data => {
      this.tipocomprobantes = data;
      let selected = this.tipocomprobantes.filter(d => { return d.isdefaultTipocomprobante; })
      if (selected) {
        this.form.patchValue({ tipocomprobante: selected[0] });
      }
    });
  }

  listaTipoPago() {
    this.dataService.tipopagos().getAll().subscribe(data => {
      this.tipopagos = data;
      let selected = this.tipopagos.filter(d => { return d.isdefaultTipopago; })
      if (selected) {
        this.form.patchValue({ tipopago: selected[0] });
      }
    });
  }

  AgregarProducto() {
    const dialogRef = this.dialog.open(ProductoVentaDialogComponent, { width: '1100px' });

    dialogRef.afterClosed().subscribe(result => {
      //  console.log(`Dialog result: ${result}`);
    });
  }

  cancel() {
    if (this.edicion) {
      console.log('soy 2');
    } else {
      this.firstname.nativeElement.focus();
      this.initFormBuilder();
      this.listaClientes();
      this.listaTipoComprobante();
      this.listaTipoPago();
      this.hasPermision();
      let selected = this.clientes.filter(d => { return d.isdefaultCliente; })
      this.myControlCliente.setValue(selected[0]);
    }
  }

  openDialog(cliente: Cliente): void {
    let cli = cliente != null ? cliente : new Cliente();
    let dialogRef = this.dialog.open(ClienteVentaDialogComponent, {
      data: cli
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openDialogPago() {
    let total = 0;
    let totalExonerada = 0;
    let totalInafecta = 0;
    this.detalleVenta.controls.forEach(fromControl => {
      const tipoIgv = fromControl.get('tipoAfectacionIgv').value;
      const precio = fromControl.get("precio").value || 0;
      const cantidad = fromControl.get("cantidad").value || 0;
      if (tipoIgv == 'Exonerado' || tipoIgv == 'EXONERADO' || tipoIgv == 'Exonerado - Operación Onerosa') {
        totalExonerada = totalExonerada + parseFloat(precio) * parseFloat(cantidad);
      } else if (tipoIgv == 'Inafecto' || tipoIgv == 'INAFECTO' || tipoIgv == 'Inafecto - Operación Onerosa') {
        totalInafecta = totalInafecta + parseFloat(precio) * parseFloat(cantidad);
      } else {
        total = total + parseFloat(precio) * parseFloat(cantidad);
      }
    });
    const montoTotalGE = totalExonerada + totalInafecta + total;
    const dialogRef = this.dialog.open(CobroDialogComponent, {
      data: montoTotalGE
      //disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save();
      }
      //this.dialogRef = null;
    });
  }

  save() {
    if (!this.detalleVenta.valid) return;
    if (this.edicion) {
      this.dataService.ventas().update(this.form.value).subscribe(data => {
        this.dataService.ventas().getAllfindByIdSucursal().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se modifico')
        });
      });
    } else {
      this.dataService.ventas().create(this.form.value).subscribe(data => {
        if (data.idVenta) {
          this.print(data.idVenta);
        }
        this.dataService.ventas().getAllfindByIdSucursal().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se registro');
        });
      });
    }
    this.cancel();
  }

  print(id) {
    this.dataService.ventas().pdf(id).subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = blobUrl;
      document.body.appendChild(iframe);
      iframe.contentWindow.print();
    });
  }

  buscarProducto($event) {
    if ($event.key === "Enter") {
      this.dataService.productos().findProductoByCodProducto($event.target.value).subscribe(data => {
        let detalle = {
          precio: +data.precioVenta.toFixed(2),
          precioT: +data.precioVenta.toFixed(2),
          cantidad: 1,
          importeTotalItem: +data.precioVenta.toFixed(2),
          importeTotal: +data.precioVenta.toFixed(2),
          producto: data,
          productoT: data,
          tipoAfectacionIgv: data.tipoAfectacionIgv.descripcion,
          itemAfectacion: data.tipoAfectacionIgv.codigoTipo,
          unidadMedida: data.unidadMedida.descripcion
        }
        let item = this.detalleVenta.value.filter((test, index, array) =>
          index === array.findIndex((findTest) =>
            findTest.producto.idProducto === data.idProducto));
        if (item.length > 0) {
          this.dataService.providers().mensaje.next('El producto ya fue agreagado')
          return;
        }
        const formGroup = this.addDetalleFormControl();
        formGroup.patchValue(detalle);
        this.form.patchValue({ search: "" });
      }, error => {
        this.dataService.providers().mensaje.next('Producto no encontrado')
      });
    }
  }

    handleKeyboardEvents(event: KeyboardEvent) {
    const key = event.which || event.keyCode;

    switch (key) {
      case 112:
        this.dialog.closeAll()
        event.preventDefault();
        this.AgregarProducto();
        break;

      case 113:
        this.dialog.closeAll()
        if (this.form.invalid) {
          this.dataService.providers().mensaje.next('Ingrese detalle del CPE')
        } else {
          event.preventDefault();
          this.openDialogPago();
        }
        break;

      case 114:
        this.dialog.closeAll()
        event.preventDefault();
        this.openDialog(this.cli);
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
