import { Cliente } from 'src/app/core/model/cliente.model';
import { startWith, map } from 'rxjs/operators';
import { Params } from '@angular/router';

import { Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './../../../../core/data/data.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { VentaDialogoComponent } from './venta-dialogo/venta-dialogo.component';
import { ClienteventaDialoComponent } from './clienteventa-dialo/clienteventa-dialo.component';


@Component({
  selector: 'ms-venta-edit',
  templateUrl: './venta-edit.component.html',
  styleUrls: ['./venta-edit.component.scss']
})
export class VentaEditComponent implements OnInit {
  maxDate: Date = new Date();
  cli:Cliente;
  id: number;
  form: FormGroup;
  edicion: boolean = false;
  clientes: any[] = [];
  tipocomprobantes: any[] = [];
  tipopagos: any[] = [];
  filteredOptions: Observable<any[]>;
  myControlCliente: FormControl = new FormControl();
  displayedColumns: string[] = ['codProducto', 'nombre', 'unidadMedida', 'cantidad', 'precio', 'importeTotalItem', 'acciones'];

  redundancia:boolean=false;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
     private snackBar:MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initFormBuilder();
    this.listaClientes();
    this.listaTipoComprobante();
    this.listaTipoPago();
    this.dataService.providers().dialogo.subscribe(data => {
      let item=this.detalleVenta.value.filter((test, index, array) =>
      index === array.findIndex((findTest) =>
      findTest.producto.idProducto === data.producto.idProducto));
      if(item.length>0){
        this.dataService.providers().mensaje.next('El producto ya fue agreagado')
         return;
        }            
      const formGroup = this.addDetalleFormControl();
      formGroup.patchValue({
        precio: +data.precio,
        cantidad: data.cantidad,
        importeTotalItem: +data.importeTotalItem.toFixed(2),
        producto: data.producto,
        productoT: data.producto,
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

  initFormBuilder() {
    var tzoffset = (this.maxDate).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
    this.form = this.formBuilder.group({
      idVenta: [null],
      fecha: [localISOTime, Validators.compose([Validators.required])],
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

    //this.form.get('tipopago').setValue(this.tipopagos.filter((item,i)=>i%2===0));
    /*this.dataService.tipopagos().getAll().subscribe(data => {
      this.tipopagos = data;
      this.form.get('tipopago').setValue(this.tipopagos.filter((item)=>item));
      console.log(this.tipopagos.filter((item)=>item));
    });*/
    
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
      producto: [null, Validators.compose([Validators.required])],
      estado:['DESPACHADO']
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
      const producto=formGroup.value;
      const precio = formGroup.get("precio").value || 0;
      let cantidad = value || 0;
      if(producto.producto){ 
        const stock= producto.producto.stock;
        if(cantidad>stock && !this.redundancia){
          cantidad=stock;
          this.redundancia=true;
        }else{ this.redundancia=false;}
      }  
      let subTotalv = parseFloat(precio) * parseFloat(cantidad);
      if(this.redundancia){
        this.dataService.providers().mensaje.next('Stock del producto insuficiente como maximo tiene ('+cantidad+') Productos') 
        formGroup.patchValue({
          importeTotalItem: +subTotalv.toFixed(2),
          cantidad:+cantidad,
          importeTotal: +subTotalv.toFixed(2)
        });
      }else{
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
    this.detalleVenta.controls.forEach(fromControl => {
      const precio = fromControl.get("precio").value || 0;
      const cantidad = fromControl.get("cantidad").value || 0;
      total = total + parseFloat(precio) * parseFloat(cantidad);
    });
    const neto = total/1.18;
    const igv = neto * 0.18;
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
      let selected= this.tipocomprobantes.filter(d=>{return d.isdefaultTipocomprobante;})
      if(selected) { 
         this.form.patchValue({tipocomprobante:selected[0]});
        }
    });
  }

  listaTipoPago() {
    this.dataService.tipopagos().getAll().subscribe(data => {
      this.tipopagos = data;  
      let selected= this.tipopagos.filter(d=>{return d.isdefaultTipopago;})
      if(selected) { 
         this.form.patchValue({tipopago:selected[0]});
        }
    });
  }

  AgregarProducto() {
    const dialogRef = this.dialog.open(VentaDialogoComponent,{width: '900px'});

    dialogRef.afterClosed().subscribe(result => {
    //  console.log(`Dialog result: ${result}`);
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
      data: cli
    });

    dialogRef.afterClosed().subscribe(result => {
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
        //console.log('data',data.text());
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
          cantidad: 1,
          importeTotalItem: +data.precioVenta.toFixed(2),
          importeTotal: +data.precioVenta.toFixed(2),
          producto: data,
          productoT: data,
          unidadMedida: data.unidadMedida.descripcion
        } 
        let item=this.detalleVenta.value.filter((test, index, array) =>
        index === array.findIndex((findTest) =>
        findTest.producto.idProducto === data.idProducto));
        if(item.length>0){
          this.dataService.providers().mensaje.next('El producto ya fue agreagado')
           return;
          }
          const formGroup = this.addDetalleFormControl();
          formGroup.patchValue(detalle); 
          this.form.patchValue({ search: "" });
        },error => {
          this.dataService.providers().mensaje.next('Producto no encontrado')
        });
      }
    }
}
