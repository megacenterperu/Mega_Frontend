import { startWith, map } from 'rxjs/operators';
import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Producto } from 'src/app/core/model/producto.model';
import { ProductoDialogComponent } from './producto-dialog/producto-dialog.component';
import { ClienteDialogComponent } from './cliente-dialog/cliente-dialog.component';
import { Cliente } from 'src/app/core/model/cliente.model';

@Component({
  selector: 'ms-proforma-edit',
  templateUrl: './proforma-edit.component.html',
  styleUrls: ['./proforma-edit.component.scss']
})

export class ProformaEditComponent implements OnInit {
  id: number;
  form: FormGroup;
  edicion: boolean = false;
  clientes: any[] = [];
  tipocomprobantes: any[] = [];
  filteredOptions: Observable<any[]>;
  myControlCliente: FormControl = new FormControl();
  lista: any[] = [];
  displayedColumns: string[] = ["producto.codProducto", "producto.nombre", "producto.marcaProducto", "cantidaditem", "precioitem", 'importetotalitem', "acciones"];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initFormBuilder();
    this.generateNumber();
    this.listaClientes();
    this.dataService.providers().dialogo.subscribe(data => {
      const formGroup = this.addDetalleFormControl();
      formGroup.patchValue({
        cantidaditem: data.cantidaditem,
        precioitem: data.precioitem,
        producto: data.producto,
        //importetotalitem: +parseFloat(data.cantidaditem) * parseFloat(data.precioitem)
      });
      this.setData(this.detalleProforma.value);
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

  setData(data) {
    console.log(data);
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminar(index) {
    this.detalleProforma.removeAt(index);
    this.setData(this.detalleProforma.value);
  }

  initFormBuilder() {
    this.form = this.formBuilder.group({
      idProforma: [null],
      fecha: [new Date(), Validators.compose([Validators.required])],
      fechaProforma:[{ value: new Date(), disabled: true }, Validators.compose([Validators.required])],
      numeroProforma: [null, Validators.compose([Validators.required])],
      numero: [{ value: '', disabled: true }, Validators.compose([Validators.required])],
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
      console.log("SaldoTotal is "+SaldoTotal.toFixed(2))
    });
  }

  addDetalleFormControl(): FormGroup {
    const formGroup = this.formBuilder.group({
      idDetalle: [null],
      cantidaditem: [0, Validators.compose([Validators.required])],
      precioitem: [0, Validators.compose([Validators.required])],
      importetotalitem: [0, Validators.compose([Validators.required])],
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
        importetotalitem: Total.toFixed(2)
      });
      this.setData(this.detalleProforma.value);
    });
    formGroup.get("cantidaditem").valueChanges.subscribe(value => {
      const precio = formGroup.get("precioitem").value || 0;
      let Total = parseFloat(precio) * parseFloat(value);
      formGroup.patchValue({
        importetotalitem: Total.toFixed(2)
      });
      this.setData(this.detalleProforma.value);
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
      let ImporteTotal = parseFloat(precio) * parseFloat(cantidad);

      MontoTotal += ImporteTotal;

    });
    this.form.patchValue({
      total: +MontoTotal.toFixed(2)
    });
    console.log("MontoTotal is "+MontoTotal.toFixed(2))
  }

  get detalleProforma(): FormArray {
    return this.form.get('detalleProforma') as FormArray;
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
    let producto = new Producto();
    let dialogRef = this.dialog.open(ProductoDialogComponent, {
      width: '900px',
      disableClose: true,
      data: producto
    });
  }

  openDialog(cliente: Cliente): void {
    let cli = cliente != null ? cliente : new Cliente();
    let dialogRef = this.dialog.open(ClienteDialogComponent, {
      width: '250px',   
      disableClose: true,   
      data: cli      
    });
  }

  /*openDialog() {
    let cliente = new Cliente();
    let dialogRef = this.dialog.open(ClienteDialogComponent, {
      width: '250px',   
      disableClose: true,   
      data: cliente      
    });
  }*/

  buscarProducto($event) {
    if ($event.key === "Enter") {
      this.dataService.productos().findProductoByCodProducto($event.target.value)
        .subscribe(data => {
          let detalle = {
            precioitem: data.precioVenta,
            cantidaditem: 1,
            importetotalitem: data.precioVenta,
            producto: data
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
          this.dataService.providers().mensaje.next('se modifico')
        });
      });
    } else {
      //insert
      this.dataService.proformas().create(this.form.value).subscribe(data => {
        this.dataService.proformas().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('Proforma Generado con exito');
        });
      });
    }
    this.cancel();
  }
}


