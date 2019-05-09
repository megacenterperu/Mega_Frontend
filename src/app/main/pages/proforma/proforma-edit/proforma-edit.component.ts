import { startWith, map } from 'rxjs/operators';
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductoDialogComponent } from './producto-dialog/producto-dialog.component';
import { ClienteDialogComponent } from './cliente-dialog/cliente-dialog.component';
import { Cliente } from 'src/app/core/model/cliente.model';

@Component({
  selector: 'ms-proforma-edit',
  templateUrl: './proforma-edit.component.html',
  styleUrls: ['./proforma-edit.component.scss']
})

export class ProformaEditComponent implements OnInit {

  cli:Cliente;
  maxDate: Date = new Date();
  id: number;
  form: FormGroup;
  edicion: boolean = false;
  clientes: any[] = [];
  tipocomprobantes: any[] = [];
  filteredOptions: Observable<any[]>;
  myControlCliente: FormControl = new FormControl();
  lista: any[] = [];
  displayedColumns: string[] = ["codProducto", "nombre", "marcaProducto", "cantidaditem", "precioitem", 'importetotalitem', "acciones"];
  redundancia:boolean=false;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar:MatSnackBar
  ) { }

  ngOnInit() {
    this.initFormBuilder();
    this.generateNumber();
    this.listaClientes();
    this.dataService.providers().dialogo.subscribe(data => {
      let item=this.detalleProforma.value.filter((test, index, array) =>
      index === array.findIndex((findTest) =>
      findTest.producto.idProducto === data.producto.idProducto));
      if(item.length>0){
        this.dataService.providers().mensaje.next('El producto ya fue agreagado')
        return;
      }
      const formGroup = this.addDetalleFormControl();
      formGroup.patchValue({
        cantidaditem: data.cantidaditem,
        precioitem: +data.precioitem,
        importetotalitem: +data.importetotalitem.toFixed(2),
        producto: data.producto,
        productoT: data.producto
        //importetotalitem: +parseFloat(data.cantidaditem) * parseFloat(data.precioitem)
      });
      //this.setData(this.detalleProforma.value);
    });
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 4000 });
    }); 
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.loadDataFrom();
    });

    this.filteredOptions = this.myControlCliente.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
  }

  eliminar(index) {
    this.detalleProforma.removeAt(index);
  }

  initFormBuilder() {
    var tzoffset = (this.maxDate).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
    this.form = this.formBuilder.group({
      idProforma: [null],
      fecha: [localISOTime, Validators.compose([Validators.required])],
      fechaProforma:[{value:new Date(), disabled: true }, Validators.compose([Validators.required])],
      numeroProforma: [null],
      numero: [{ value: '', disabled: true }],
      acuenta: [0, Validators.compose([Validators.required])],
      saldo: [0, Validators.compose([Validators.required])],
      saldoProforma:[{ value: '0.00', disabled: true }, Validators.compose([Validators.required])],
      total: [0, Validators.compose([Validators.required])],
      cliente: this.myControlCliente,
      estadoProforma: [null],
      detalleProforma: this.formBuilder.array([], Validators.compose([])),
    });
    this.detalleProforma.valueChanges.subscribe(value => {
      this.calcularTotales();
    });
    
    this.form.get("acuenta").valueChanges.subscribe(value => {
      const ImporteTotal = this.form.get('total').value || 0;
      const SaldoTotal = parseFloat(ImporteTotal) - parseFloat(value);
      this.form.patchValue({
        saldo: +SaldoTotal.toFixed(2),
        saldoProforma: +SaldoTotal.toFixed(2)
      });
    });
  }

  addDetalleFormControl(): FormGroup {
    const formGroup = this.formBuilder.group({
      idDetalle: [null],
      cantidaditem: [0, Validators.compose([Validators.required])],
      precioitem: [0, Validators.compose([Validators.required])],
      importeTotal: [{ value: '', disabled: true }, Validators.compose([Validators.required])],
      importetotalitem: [0, Validators.compose([Validators.required])],
      productoT: this.formBuilder.group({
        codProducto: [{ value: '', disabled: true }],
        nombre: [{ value: '', disabled: true }],
        marcaProducto: [{ value: '', disabled: true }]
      }),
      producto: [null, Validators.compose([Validators.required])]
    });
    this.detalleChange(formGroup);
    this.detalleProforma.push(formGroup);
    return formGroup;
  }

  detalleChange(formGroup: FormGroup) {
    formGroup.get("precioitem").valueChanges.subscribe(value => {
      const cantidad = formGroup.get("cantidaditem").value || 0;
      let Total = parseFloat(value) * parseFloat(cantidad);
      formGroup.patchValue({
        importetotalitem: +Total.toFixed(2),
        importeTotal: +Total.toFixed(2)
      });
      //this.setData(this.detalleProforma.value);
    });
    formGroup.get("cantidaditem").valueChanges.subscribe(value => {
      const precio = formGroup.get("precioitem").value || 0;
      let Total = parseFloat(precio) * parseFloat(value);
      formGroup.patchValue({
        importetotalitem: +Total.toFixed(2),
        importeTotal: +Total.toFixed(2)
      });
      //this.setData(this.detalleProforma.value);
    });
  }

  generateNumber(){
    this.dataService.proformas().getNumero().subscribe(data=>{
    this.form.patchValue({numeroProforma:data.numeroProforma,numero:data.numeroProforma});
    },error=>{     
    console.error(error);
    });
  }

  calcularTotales() {
    let MontoTotal = 0;
    this.detalleProforma.controls.forEach(formControl => {
      const precio = formControl.get("precioitem").value || 0;
      const cantidad = formControl.get("cantidaditem").value || 0;
      let ImporteTotalNeto = parseFloat(precio) * parseFloat(cantidad);

      MontoTotal += ImporteTotalNeto;

    });
    this.form.patchValue({
      total: +MontoTotal.toFixed(2)
    });
  }

  get detalleProforma(): FormArray {
    return this.form.get('detalleProforma') as FormArray;
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

  private loadDataFrom() {
    if (this.edicion) {
      this.dataService.proformas().findById(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  displayFn(val: any) {
    return val ? `${val.persona.nombre}` : val;
  }

  listaClientes() {
    this.dataService.clientes().getAll().subscribe(data => {
      this.clientes = data
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
    const dialogRef = this.dialog.open(ProductoDialogComponent,{width: '900px'});
    dialogRef.afterClosed().subscribe(result => {
    //  console.log(`Dialog result: ${result}`);
    });
  }

  openDialog(cliente: Cliente): void {
    let cli = cliente != null ? cliente : new Cliente();
    let dialogRef = this.dialog.open(ClienteDialogComponent, {
      data: cli
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  buscarProducto($event) {
    if ($event.key === "Enter") {
      this.dataService.productos().findProductoByCodProducto($event.target.value)
        .subscribe(data => {
          let detalle = {
            precioitem: +data.precioVenta.toFixed(2),
            cantidaditem: 1,
            importetotalitem: +data.precioVenta.toFixed(2),
            importeTotal: +data.precioVenta.toFixed(2),
            producto: data
          }
          let item=this.detalleProforma.value.filter((test, index, array) =>
          index === array.findIndex((findTest) =>
          findTest.producto.idProducto === data.idProducto));
          if(item.length>0){
            this.dataService.providers().mensaje.next('El producto ya fue agreagado')
            return;
          }
          this.dataService.providers().dialogo.next(detalle);
        },
        error => {
          this.dataService.providers().mensaje.next('Producto no encontrado')
        });
      }
    }

  save() {
    if (!this.detalleProforma.valid) return;
    if (this.edicion) {
      //update
      this.dataService.proformas().update(this.form.value).subscribe(data => {
        this.dataService.proformas().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('Se modifico')
        });
      });
    } else {
      //insert
      this.dataService.proformas().create(this.form.value).subscribe(data => {
        if (data.idProforma) {
          this.print(data.idProforma);
        }
        this.dataService.proformas().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('Proforma Generado con exito');
        });
      });
    }
    this.cancel();
  }

  print(id) {
    this.dataService.proformas().pdf(id).subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = blobUrl;
      document.body.appendChild(iframe);
      iframe.contentWindow.print();
    });
  }
}


