import { map, startWith } from 'rxjs/operators';
import { USER_DATA } from 'src/config/auth.config';
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Observable } from "rxjs";
import { DataService } from "src/app/core/data/data.service";
import { MatDialog } from '@angular/material';
import { DolenciaDialogComponent } from './dolencia-dialog/dolencia-dialog.component';
import { DolenciaProducto } from 'src/app/core/model/dolencia.model';

@Component({
  selector: "ms-producto-edit",
  templateUrl: "./producto-edit.component.html",
  styleUrls: ["./producto-edit.component.scss"],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class ProductoEditComponent implements OnInit {

  fecha: Date = new Date();

  id: number;
  form: FormGroup;
  edicion: boolean = false;

  lstunidadmedidas: any[] = [];
  lstColorProducto: any[] = [];
  tipoProductos: any[];
  lsttipoProductos: any[] = [];
  lstorganizacions: any[] = [];
  lsttipoAfectacion: any[] = [];

  myControlDolencia: FormControl = new FormControl();
  filteredOptions: Observable<any[]>;

  listestados: string[] = ['NUEVO', 'SEGUNDA', 'SERVICIO'];
  @ViewChild('firstname') firstname: any;//ElementRef

  @ViewChild('firstname2') firstname2: any;//ElementRef

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.firstname.nativeElement.focus();
    this.initFormBuilder();
    this.listarUnidadMedida();
    this.listarColorProducto();
    this.listarTipoProducto();
    this.listarOrganizacion();
    this.listaTipoAfectacionIgv();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.loadDataFrom();
    });
    
    this.filteredOptions = this.myControlDolencia.valueChanges
    .pipe(
      startWith(null),
      map(val => this.filter(val))
      
    );
    this.dataService.providers().dialogo.subscribe(data => {
      //this.form.patchValue({ dolenciaProducto: data });
      this.listarColorProducto();
      //console.log(data);
    });
  }

  initFormBuilder() {
    var tzoffset = (this.fecha).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()

    this.form = this.formBuilder.group({
      idProducto: [null],
      codProducto: [null, Validators.compose([Validators.required])],
      nombre: [null, Validators.compose([Validators.required])],
      marcaProducto: [null, Validators.compose([Validators.required])],
      stock: [null, Validators.compose([Validators.required])],
      precioCompra: [null, Validators.compose([Validators.required])],
      porcentajeUtelidad: [0],
      precioVenta: [null, Validators.compose([Validators.required])],
      unidadMedida: [null, Validators.compose([Validators.required])],
      tipoProducto: [null, Validators.compose([Validators.required])],
      //dolenciaProducto: [null, Validators.compose([Validators.required])],
      dolenciaProducto: this.myControlDolencia,
      tipoAfectacionIgv: [null, Validators.compose([Validators.required])],
      sucursal: [null, Validators.compose([Validators.required])],
      fechaVencimiento: [localISOTime, Validators.compose([Validators.required])],
      presentacion: [null, Validators.compose([Validators.required])],
      numeroLote: [null, Validators.compose([Validators.required])],
      area: [null, Validators.compose([Validators.required])],
      laboratorio: [null, Validators.compose([Validators.required])],
      estadoProducto: [null, Validators.compose([Validators.required])],

      cantidadPaquete: [null],
      precioCompraPaquete: [null]

    });

    this.form.get("porcentajeUtelidad").valueChanges.subscribe(value => {  
      // double pv = (productos.getPrecioCompra()*(productos.getPorcentajeUtelidad()/100))+productos.getPrecioCompra();   
      const pc = this.form.get('precioCompra').value || 0;
      const pv = (pc*(value/100))+parseFloat(pc);
      this.form.patchValue({
        precioVenta: +pv.toFixed(2)
      });      
      //console.log(pv);
    });

    this.form.get("cantidadPaquete").valueChanges.subscribe(value => {   
      const pcp = this.form.get('precioCompraPaquete').value || 0;
      const pcu = (pcp/value);
      if (value!=null) {
        this.form.patchValue({
          precioCompra: +pcu.toFixed(2),
          stock:value
        }); 
      }
      //console.log(+pcu.toFixed(2));
    });
  }

  private loadDataFrom() {
    if (this.edicion) {
      this.dataService.productos().findById(this.id).subscribe(data => {
        data.fechaVencimiento = new Date(data.fechaVencimiento);
        this.form.patchValue(data);
      });
      
    }
  }

  listarUnidadMedida() {
    this.dataService.unidadMedidas().getAll().subscribe(data => {
      this.lstunidadmedidas = data;
    });
  }

  compareUnidadMedida(x: any, y: any): boolean {
    return x && y ? x.idUnidadmedida === y.idUnidadmedida : x === y;
  }

  filter(val: any) {
    if (val != null && val.idDolenciaProducto > 0) {
      return this.lstColorProducto.filter(option =>
        option.dolenciaPropiedad.toLowerCase().includes(val.dolenciaPropiedad.toLowerCase()));
    } else {
      return this.lstColorProducto.filter(option =>
        option.dolenciaPropiedad.toLowerCase().includes(val.toLowerCase()));
    }
  }

  displayFn(val: DolenciaProducto) {
    return val ? `${val.dolenciaPropiedad}` : val;
  }

  seleccionarPaciente(e) {
    //console.log('q es '+e);
  }

  listarColorProducto() {
    this.dataService.dolenciaProductos().getAllfindByIdSucursal().subscribe(data => {
      this.lstColorProducto = data;
    });
  }

  compareColorProducto(x: any, y: any): boolean {
    return x && y ? x.idDolenciaProducto === y.idDolenciaProducto : x === y;
  }

  listarTipoProducto() {
    this.dataService.tipoProductos().getAllfindByIdSucursal().subscribe(data => {
      this.tipoProductos = data;
      this.lsttipoProductos = data;
    });
  }

  buscarTipoProducto(event) {
    this.lsttipoProductos = this.tipoProductos.filter(bank => bank.descripcion.toLowerCase().indexOf(event.target.value) > -1);
  }

  compareTipoProducto(x: any, y: any): boolean {
    return x && y ? x.idTipoproducto === y.idTipoproducto : x === y;
  }

  listarOrganizacion() {
    this.dataService.sucursales().getAllfindByIdSucursal().subscribe(data => {
      this.lstorganizacions = data;
    });
  }

  compareOrganizacion(x: any, y: any): boolean {
    return x && y ? x.idSocursal === y.idSocursal : x === y;
  }

  listaTipoAfectacionIgv() {
    this.dataService.tipoAfectaciones().getAll().subscribe(data => {
      this.lsttipoAfectacion = data;
      let selected = this.lsttipoAfectacion.filter(d => { return d.isdefaultTipoAfectacion; })
     
      if (selected) {
        this.form.patchValue({ tipoAfectacionIgv: selected[0] });
      }
    });
  }

  compareTipoAfectacionIgv(x: any, y: any): boolean {
    return x && y ? x.idTipoAfectacion === y.idTipoAfectacion : x === y;
  }

  compareestadoProducto(x: any, y: any): boolean {
    return x && y ? x.estadoProducto === y.estadoProducto : x === y;
  }

  cancel() {
    if (this.edicion) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  operar() {
    if (this.edicion) {
      this.dataService.productos().update(this.form.value).subscribe(data => {
        const user = JSON.parse(sessionStorage.getItem(USER_DATA));
        this.dataService.productos().findByIdSucursal(user.idSucursal).subscribe(cat => {
          this.dataService.providers().cambio.next(cat);
          this.dataService.providers().mensaje.next("Se Actualizo con éxito!");
        });
      });
    } else {
      this.dataService.productos().create(this.form.value).subscribe(data => {
        const user = JSON.parse(sessionStorage.getItem(USER_DATA));
        this.dataService.productos().findByIdSucursal(user.idSucursal).subscribe(cate => {
          this.dataService.providers().cambio.next(cate);
          this.dataService.providers().mensaje.next("Se Registro con éxito!");
        });
      });
    }
    this.cancel();
  }

  openDialogDolencia() {
    let dolenciaProducto =  new DolenciaProducto();
    let dialogRef = this.dialog.open(DolenciaDialogComponent, {
      data: dolenciaProducto
    });

    dialogRef.afterClosed().subscribe(result => {
      this.firstname2.nativeElement.focus();
    });
  }

  handleKeyboardEvents(event: KeyboardEvent) {
    const key = event.which || event.keyCode;
    //console.log(key)
    switch (key) {
      case 113:
        if (this.form.invalid) {
          this.dataService.providers().mensaje.next('Existen campos obligatorios !Verificar¡')
        } else {
          event.preventDefault();
          this.operar();
        }
        break;

      case 114:
        event.preventDefault();
        this.cancel();
        break;

      default:
        break;
    }
  }
}
