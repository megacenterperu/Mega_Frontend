import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/data/data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'ms-personal-admim-edit',
  templateUrl: './personal-admim-edit.component.html',
  styleUrls: ['./personal-admim-edit.component.scss']
})
export class PersonalAdmimEditComponent implements OnInit {

  maxDate: Date = new Date();
  id: number;
  form: FormGroup;
  edicion: boolean = false;
  tipodocumentos: any[] = [];
  lstorganizacions: any[]=[];
  filteredOptions: Observable<any[]>;
  myControlsucursal: FormControl = new FormControl();
  
  constructor(private dataService: DataService,private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initFormBuilder();
    this.loadTipodocumento();
    this.listarOrganizacion();
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.edicion = params["id"] != null;
      this.loadDataFrom();
    });

    this.filteredOptions = this.myControlsucursal.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
      );
  }

  initFormBuilder() {
    this.form = this.formBuilder.group({
      personal: this.formBuilder.group({
        idPersonal: [null],
        fechaIngreso: [new Date(), Validators.compose([Validators.required])],
        sueldo: [null, Validators.compose([Validators.required])],
        sucursal:this.myControlsucursal
      }),
      persona: this.formBuilder.group({
        idPersona: [null],
        nombre: [null,Validators.compose([Validators.required])],
        numeroDocumento: [null,Validators.compose([Validators.required])],
        telfMovil: [null, Validators.compose([Validators.required])],
        direccion: [null, Validators.compose([Validators.required])],
        email: [null],
        tipoDocumeto: [null, Validators.compose([Validators.required])]
      })
    });
  }

  private loadDataFrom() {
    if (this.edicion) {
      this.dataService.personales().findById(this.id).subscribe(data => {
          this.form.controls.personal.patchValue({
            idPersonal: data.idPersonal,
            fechaIngreso: new Date(data.fechaIngreso),
            sueldo: parseFloat(data.sueldo || 0),
            sucursal:data.sucursal
          });
          this.buildData(data.persona);
        });
    }
  }

  buildData(data) {
    this.form.controls.persona.patchValue({
      idPersona: data.idPersona,
      nombre: data.nombre,
      numeroDocumento: data.numeroDocumento,
      telfMovil: data.telfMovil,
      direccion: data.direccion,
      email: data.email
    });
    const tipoDocumeto = this.tipodocumentos.find(
      t => t.idTipodocumento == data.tipoDocumeto.idTipodocumento
    );
    this.form.controls.persona.get("tipoDocumeto").setValue(tipoDocumeto);
  }

  loadTipodocumento() {
    this.dataService.tipoDocumentos().getAll().subscribe(data => {
        this.tipodocumentos = data;
      });
  }

  compareTipoDocumento(x: any, y: any): boolean {
    return x && y ? x.idTipodocumento === y.idTipodocumento : x === y;
  }

  listarOrganizacion() {
    this.dataService.sucursales().getAll().subscribe(data => {
      this.lstorganizacions = data;
    });
  }

  filter(val: any) {
    if (val != null && val.idSocursal > 0) {
      return this.lstorganizacions.filter(option =>
        option.nombre.toLowerCase().includes(val.nombre.toLowerCase()) || option.ruc.includes(val.ruc));
    } else {
      return this.lstorganizacions.filter(option =>
        option.nombre.toLowerCase().includes(val.toLowerCase()) || option.ruc.includes(val));
    }
  }

  displayFn(val: any) {
    return val ? `${val.nombre}` : val;
  }

  compareOrganizacion(x: any, y: any): boolean {
    return x && y ? x.idSocursal === y.idSocursal : x === y;
  }

  cancel() {
    if (this.edicion) {
      this.router.navigate(["../../"], { relativeTo: this.route });
    } else {
      this.router.navigate(["../"], { relativeTo: this.route });
    }
  }

  save() {
    if (this.edicion) {
      //update
      this.dataService.personales().update(this.form.value).subscribe(data => {
        this.dataService.personales().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next("Se Actualizo con éxito!");
        });
      });
    } else {
      //insert
      this.dataService.personales().create(this.form.value).subscribe(data => {
        this.dataService.personales().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next("Se Registro con éxito!");
        });
      });
    }
    this.cancel();
  }

}
