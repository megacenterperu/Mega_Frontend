import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/core/model/cliente.model';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/data/data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ProductoDialogComponent } from './producto-dialog/producto-dialog.component';
import { startWith, map } from 'rxjs/operators';
import { ClienteDialogComponent } from './cliente-dialog/cliente-dialog.component';

@Component({
  selector: 'ms-guia-edit',
  templateUrl: './guia-edit.component.html',
  styleUrls: ['./guia-edit.component.scss']
})
export class GuiaEditComponent implements OnInit {

  cli:Cliente;
  maxDate: Date = new Date();
  id: number;
  form: FormGroup;
  edicion: boolean = false;
  clientes: any[] = [];
  motivotraslados: any[] = [];
  tipotransportes: any[] = [];
  filteredOptions: Observable<any[]>;
  myControlCliente: FormControl = new FormControl();
  lista: any[] = [];
  displayedColumns: string[] = ["codProducto", "nombre", "serieProducto","unidadMedida", "cantidadItem", 'pesoItem', "acciones"];
  redundancia:boolean=false;

  constructor(private dataService: DataService,private route: ActivatedRoute,
    public dialog: MatDialog,private router: Router,
    private formBuilder: FormBuilder,private snackBar:MatSnackBar
  ) { }

  ngOnInit() {
    this.initFormBuilder();
    this.listaMotivoTraslado();
    this.listaTipoTransporte();
    this.listaClientes();
    this.dataService.providers().dialogo.subscribe(data => {
      let item=this.detalleGuia.value.filter((test, index, array) =>
      index === array.findIndex((findTest) =>
      findTest.producto.idProducto === data.producto.idProducto));
      if(item.length>0){
        this.dataService.providers().mensaje.next('El producto ya fue agreagado')
        return;
      }
      const formGroup = this.addDetalleFormControl();
      formGroup.patchValue({
        cantidadItem: data.cantidadItem,
        pesoItem: data.pesoItem,
        producto: data.producto,
        productoT: data.producto,
        unidadMedida: data.producto.unidadMedida.descripcion
        //importetotalitem: +parseFloat(data.cantidaditem) * parseFloat(data.precioitem)
      });
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.loadDataFrom();
    });

    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 4000 });
    }); 
    
    this.filteredOptions = this.myControlCliente.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
      );
      
  }

  eliminar(index) {
    this.detalleGuia.removeAt(index);
  }

  initFormBuilder() {
    var tzoffset = (this.maxDate).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
    this.form = this.formBuilder.group({
      idGuia: [null],
      motivoTraslado: [null, Validators.compose([Validators.required])],
      cliente: this.myControlCliente,
      tipoTransporte: [null, Validators.compose([Validators.required])],
      ubigeoPuntoPartida: [null],
      direccionPuntoPartida: [null],
      docPuntoLlegada:[null],
      ubigeoPuntoLlegada:[null],
      direccionPuntoLlegada: [null, Validators.compose([Validators.required])],
      tipoDocTransportista: [null],
      numDocTransportista: [null],
      razonSocialTransportista: [null],
      fechaEntregaBienes: [localISOTime, Validators.compose([Validators.required])],
      //fecha:[{value:new Date(), disabled: true }, Validators.compose([Validators.required])],
      observacion: [null],
      numeroGuia: [null],    
      detalleGuia: this.formBuilder.array([], Validators.compose([Validators.required])),
    });
    this.detalleGuia.valueChanges.subscribe(value => {
      //this.calcularTotales();
    });
  }

  get detalleGuia(): FormArray {
    return this.form.get('detalleGuia') as FormArray;
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
      this.dataService.guias().findById(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  displayFn(val: any) {
    return val ? `${val.persona.nombre}` : val;
  }

  listaClientes() {
    this.dataService.clientes().getAllfindByIdSucursal().subscribe(data => {
      this.clientes = data;
    });
  }

  listaMotivoTraslado() {
    this.dataService.motivotrastados().getAll().subscribe(data => {
      this.motivotraslados = data;
      /*let selected= this.motivotraslados.filter(d=>{return d.isdefaultTipocomprobante;})
      if(selected) { 
         this.form.patchValue({tipocomprobante:selected[0]});
        }*/
    });
  }
  
  listaTipoTransporte() {
    this.dataService.tipotransportes().getAll().subscribe(data => {
      this.tipotransportes = data;
      /*let selected= this.motivotraslados.filter(d=>{return d.isdefaultTipocomprobante;})
      if(selected) { 
         this.form.patchValue({tipocomprobante:selected[0]});
        }*/
    });
  }
  
  addDetalleFormControl(): FormGroup {
    const formGroup = this.formBuilder.group({
      idDetalle: [null],
      cantidadItem: [0, Validators.compose([Validators.required])],
      pesoItem: [null, Validators.compose([Validators.required])],
      productoT: this.formBuilder.group({
        codProducto: [{ value: '', disabled: true }],
        nombre: [{ value: '', disabled: true }]
        //marcaProducto: [{ value: '', disabled: true }]
      }),
      serieProducto:[null],
      unidadMedida: [{ value: '', disabled: true }],
      producto: [null, Validators.compose([Validators.required])]
    });
    //this.detalleChange(formGroup);
    this.detalleGuia.push(formGroup);
    return formGroup;
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

  cancel() {
    if (this.edicion) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../'], { relativeTo: this.route })
    }
  }

  save() {
    if (!this.detalleGuia.valid) return;
    if (this.edicion) {
      //update
      /*this.dataService.proformas().update(this.form.value).subscribe(data => {
        this.dataService.proformas().getAllfindByIdSucursal().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('Se modifico')
        });
      });*/
    } else {
      //insert
      this.dataService.guias().create(this.form.value).subscribe(data => {
        if (data.idGuia) {
          this.print(data.idGuia);
        }
        this.dataService.guias().getAllfindByIdSucursal().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('Proforma Generado con exito');
        });
      });
    }
    this.cancel();
  }

  print(id) {
    this.dataService.guias().pdfGuia(id).subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = blobUrl;
      document.body.appendChild(iframe);
      iframe.contentWindow.print();
    });
  }

  getConsulta() {
    let ruc=this.form.get('docPuntoLlegada').value;
    var rucs=new String(ruc);
      if(rucs.length > 8){
        this.dataService.clientes().getRuc(this.form.value.docPuntoLlegada).subscribe(data=>{
          this.form.patchValue({
            docPuntoLlegada:data.ruc,
            direccionPuntoLlegada:data.direccion+' '+data.departamento+' - '+data.provincia+' - '+data.distrito,
            ubigeoPuntoLlegada:data.departamento+' - '+data.provincia+' - '+data.distrito
          });
        },error => {
          this.dataService.providers().mensaje.next('RUC invalido o no encontrado')
        });
      }else{
        this.dataService.providers().mensaje.next('ingrese su RUC valido')
      }
    }

}
