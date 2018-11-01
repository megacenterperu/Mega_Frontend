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
  displayedColumns: string[] = ['codProducto','unidadMedida.codUnidadmedida', 'nombre' , 'cantidad', 'precio', 'importeTotalItem', 'acciones'];

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initFormBuilder();
    this.listaClientes();
    this.listaTipoComprobante()
    this.dataService.providers().dialogo.subscribe(data => {
      const formGroup = this.addDetalleFormControl();
    formGroup.patchValue({
      precio: +data.precio.toFixed(2),
      cantidad: data.cantidad,
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
      cliente: this.myControlCliente,
      detalleVenta:this.formBuilder.array([],Validators.compose([]))
    });
    this.detalleVenta.valueChanges.subscribe(value => {
      this.calcularVentaTotales();
    });
  }

  addDetalleFormControl() : FormGroup{
  const formGroup=this.formBuilder.group({
    idDetalleVenta:[null],
    cantidad:[0, Validators.compose([Validators.required])],
    precio:[0, Validators.compose([Validators.required])],
    importeTotal:[{ value: '', disabled: true }, Validators.compose([Validators.required])],
    importeTotalItem: [null, Validators.compose([Validators.required])],
    productoT: this.formBuilder.group({
      codProducto: [{ value: '', disabled: true }],
      nombre: [{ value: '', disabled: true }],
      unidadMedida: [{ value: '', disabled: true }]
    }),
    producto: [null, Validators.compose([Validators.required])]    
  });
  this.detalleChange(formGroup);
  this.detalleVenta.push(formGroup);
  return formGroup;
  }

  detalleChange(formGroup:FormGroup){
formGroup.get("precio").valueChanges.subscribe(value =>{
  const precio=value||0;
  const cantidad=formGroup.get("cantidad").value||0;
  let subTotalv=parseFloat(precio)*parseFloat(cantidad);
  formGroup.patchValue({
    importeTotalItem:+subTotalv.toFixed(2),
    importeTotal:+subTotalv.toFixed(2)
  });
});
formGroup.get("cantidad").valueChanges.subscribe(value =>{
  const precio=formGroup.get("precio").value||0;
  const cantidad=value||0;
  let subTotalv=parseFloat(precio)*parseFloat(cantidad);
  formGroup.patchValue({
    importeTotalItem:+subTotalv.toFixed(2),
    importeTotal:+subTotalv.toFixed(2)
});
});
  }

  get detalleVenta(): FormArray {
    return this.form.get('detalleVenta') as FormArray;
  }

  calcularVentaTotales(){
    let total=0;
    let igv=0;
    let neto =0;
    this.detalleVenta.controls.forEach(fromControl =>{
      const precio=fromControl.get("precio").value ||0;
      const cantidad=fromControl.get("cantidad").value ||0;
      let subTotal=parseFloat(precio)*parseFloat(cantidad);
      const igvItem= subTotal*0.18;
      neto+=subTotal;
      igv +=igvItem;
      const totalItem=subTotal + igv;
      total += totalItem;
    });
    this.form.patchValue({
      montoTotal:+total.toFixed(2),
      subTotal: +neto.toFixed(2),
      igv:+igv.toFixed(2)
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
      this.clientes=data;
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
            productoT: data
          }
          this.dataService.providers().dialogo.next(detalle);
        },
          error => {
            this.dataService.providers().mensaje.next('Producto no encontrado')
          });
    }
  }
}
