import { startWith, map } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/core/model/producto.model';
import { ProductoDialogComponent } from './producto-dialog/producto-dialog.component';

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

  lista:any[]=[];
  displayedColumns: string[] = ["producto.codProducto","producto.nombre","producto.marcaProducto","cantidaditem","precioitem",'importetotalitem', "acciones"];
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
    this.listaClientes();
    this.calcularSaldo();
    this.dataService.providers().dialogo.subscribe(data => {
      const formGroup = this.addDetalleFormControl();
      formGroup.patchValue({
        cantidaditem:data.cantidaditem,
        precioitem:data.precioitem,
        producto:data.producto,
        importetotalitem:+parseFloat(data.cantidaditem)*parseFloat(data.precioitem)
      }); 
      this.setData(this.detalleProforma.value);
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
    this.dataSource.paginator=this.paginator;
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
      numeroProforma: [null, Validators.compose([Validators.required])],
      acuenta: [0, Validators.compose([Validators.required])],
      saldo: [0, Validators.compose([Validators.required])],
      total: [0, Validators.compose([Validators.required])],
      cliente: this.myControlCliente,
      estadoProforma: [null],
      detalleProforma:this.formBuilder.array([], Validators.compose([])),
    });
    this.detalleProforma.valueChanges.subscribe(value => {
      this.calcularTotales();
    });
  }

  addDetalleFormControl(): FormGroup {
    const formGroup = this.formBuilder.group({
      idDetalle: [null],
      cantidaditem: [null, Validators.compose([Validators.required])],
      precioitem: [null, Validators.compose([Validators.required])],
      importetotalitem: [null, Validators.compose([Validators.required])],
      producto: [null, Validators.compose([Validators.required])]     
    });
    this.detalleProforma.push(formGroup);
    return formGroup;
  }

  calcularTotales() {
    let total = 0;
    this.detalleProforma.controls.forEach(formControl => {
      const precio = formControl.get("precioitem").value || 0;
      const cantidad = formControl.get("cantidaditem").value || 0;
      let ImporteTotal = parseFloat(precio) * parseFloat(cantidad);

      total += ImporteTotal;
      
    });
    this.form.patchValue({
      total: +total.toFixed(2)
    });
  }

  calcularSaldo(){
    let saldo=0;
    const ImporteTotal=this.form.get('total').value ||0;
    const Acuenta=this.form.get('acuenta').value || 0;
    let SaldoTotal=parseFloat(ImporteTotal)-parseFloat(Acuenta);
    saldo=SaldoTotal;
    this.form.patchValue({
      saldo:saldo.toFixed(2)
    });
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
        option.persona.nombre.toLowerCase().includes(val.toLowerCase())  || option.persona.numeroDocumento.includes(val));
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

  save(){
    //console.log(this.form.value);
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


