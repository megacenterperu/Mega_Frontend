import { Cliente } from 'src/app/core/model/cliente.model';
import { startWith, map } from 'rxjs/operators';
import { Params } from '@angular/router';

import { Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './../../../../core/data/data.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/core/model/producto.model';
import { VentaDialogoComponent } from './venta-dialogo/venta-dialogo.component';
import { ClienteventaDialoComponent } from './clienteventa-dialo/clienteventa-dialo.component';


@Component({
  selector: 'ms-venta-edit',
  templateUrl: './venta-edit.component.html',
  styleUrls: ['./venta-edit.component.scss']
})
export class VentaEditComponent implements OnInit {
  id: number;
  form: FormGroup;
  edicion: boolean = false;
  clientes: any[] = [];
  tipocomprobantes: any[] = [];
  tipopagos: any[] = [];
  filteredOptions: Observable<any[]>;
  myControlCliente: FormControl = new FormControl();
  displayedColumns: string[] = ['codProducto', 'nombre', 'unidadMedida', 'cantidad', 'precio', 'importeTotalItem', 'acciones'];

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initFormBuilder();
    this.listaClientes();
    this.listaTipoComprobante();
    this.listaTipoPago();
    this.dataService.providers().dialogo.subscribe(data => {
      const formGroup = this.addDetalleFormControl();
      formGroup.patchValue({
        precio: +data.precio.toFixed(2),
        cantidad: data.cantidad,
        importeTotalItem: +data.importeTotalItem.toFixed(2),
        producto: data.producto,
        productoT: data.producto,
        unidadMedida: data.producto.unidadMedida.descripcion
      });
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
  initFormBuilder() {
    this.form = this.formBuilder.group({
      idVenta: [null],
      fecha: [new Date(), Validators.compose([Validators.required])],
      montoTotal: [0, Validators.compose([Validators.required])],
      subTotal: [0, Validators.compose([Validators.required])],
      igv: [0, Validators.compose([Validators.required])],
      tipocomprobante: [null, Validators.compose([Validators.required])],
      tipopago: [null, Validators.compose([Validators.required])],
      numeroComprobante: [null],
      serieComprobante: [null],
      estadoVenta: [0],
      cliente: this.myControlCliente,
      search: [null],//temporal
      detalleVenta: this.formBuilder.array([], Validators.compose([]))

    });
    this.detalleVenta.valueChanges.subscribe(value => {
      this.calcularVentaTotales();
    });
  }

  addDetalleFormControl(): FormGroup {
    const formGroup = this.formBuilder.group({
      idDetalleVenta: [null],
      cantidad: [0, Validators.compose([Validators.required])],
      precio: [0, Validators.compose([Validators.required])],
      importeTotalItem: [{ value: '', disabled: true }, Validators.compose([Validators.required])],
      importeTotal: [null, Validators.compose([Validators.required])],
      productoT: this.formBuilder.group({
        codProducto: [{ value: '', disabled: true }],
        nombre: [{ value: '', disabled: true }]
      }),
      unidadMedida: [{ value: '', disabled: true }],
      producto: [null, Validators.compose([Validators.required])]
    });
    this.detalleChange(formGroup);
    this.detalleVenta.push(formGroup);
    return formGroup;
  }

  detalleChange(formGroup: FormGroup) {
    formGroup.get("precio").valueChanges.subscribe(value => {
      const precio = value || 0;
      const cantidad = formGroup.get("cantidad").value || 0;
      let subTotalv = parseFloat(precio) * parseFloat(cantidad);
      formGroup.patchValue({
        importeTotalItem: +subTotalv.toFixed(2),
        importeTotal: +subTotalv.toFixed(2)
      });
    });
    formGroup.get("cantidad").valueChanges.subscribe(value => {
      const precio = formGroup.get("precio").value || 0;
      const cantidad = value || 0;
      let subTotalv = parseFloat(precio) * parseFloat(cantidad);
      formGroup.patchValue({
        importeTotalItem: +subTotalv.toFixed(2),
        importeTotal: +subTotalv.toFixed(2)
      });
    });
  }

  get detalleVenta(): FormArray {
    return this.form.get('detalleVenta') as FormArray;
  }

  calcularVentaTotales() {
    let total = 0;
    this.detalleVenta.controls.forEach(fromControl => {
      const precio = fromControl.get("precio").value || 0;
      const cantidad = fromControl.get("cantidad").value || 0;
      total = total + parseFloat(precio) * parseFloat(cantidad);
    });
    const igv = total * 0.18;
    const neto = total - igv;
    this.form.patchValue({
      montoTotal: +total.toFixed(2),
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
    this.dataService.clientes().getAll().subscribe(data => {
      this.clientes = data;
    });
  }
  filter(val: any) {
    if (val != null && val.idCliente > 0) {
      return this.clientes.filter(option =>
        option.persona.nombre.toLowerCase().includes(val.persona.nombre.toLowerCase()) || option.persona.numeroDocumento.includes(val.persona.numeroDocumento));
    } else {
      return this.clientes.filter(option =>
        option.persona.nombre.toLowerCase().includes(val.toLowerCase()) || option.persona.numeroDocumento.includes(val));
    }
  }

  displayFn(val: any) {
    return val ? `${val.persona.nombre}` : val;
  }

  listaTipoComprobante() {
    this.dataService.tipocomprobantes().getAll().subscribe(data => {
      this.tipocomprobantes = data
    });
  }

  listaTipoPago() {
    this.dataService.tipopagos().getAll().subscribe(data => {
      this.tipopagos = data;
    });
  }

  AgregarProducto() {
    let producto = new Producto();
    let dialogRef = this.dialog.open(VentaDialogoComponent, {
      width: '900px',
      disableClose: true,
      data: producto
    });
  }

  cancel() {
    if (this.edicion) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../'], { relativeTo: this.route })
    }
  }
  openDialog(cliente: Cliente): void {
    let cli = cliente != null ? cliente : new Cliente();
    let dialogRef = this.dialog.open(ClienteventaDialoComponent, {
      width: '250px',
      disableClose: true,
      data: cli
    });
  }

  save() {
    if (!this.detalleVenta.valid) return;
    if (this.edicion) {
      this.dataService.ventas().update(this.form.value).subscribe(data => {
        this.dataService.ventas().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se modifico')
        });
      });
    } else {
      this.dataService.ventas().create(this.form.value).subscribe(data => {
        if (data.idVenta) {
          this.print(data.idVenta);
        }
        this.dataService.ventas().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se registro');
        });
        console.log(data);
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
      this.dataService.productos().findProductoByCodProducto($event.target.value)
        .subscribe(data => {
          let detalle = {
            precio: +data.precioVenta.toFixed(2),
            cantidad: 1,
            importeTotalItem: +data.precioVenta.toFixed(2),
            importeTotal: +data.precioVenta.toFixed(2),
            producto: data,
            productoT: data,
            unidadMedida: data.unidadMedida.descripcion
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
