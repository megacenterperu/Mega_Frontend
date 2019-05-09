import { Observable } from 'rxjs';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { DataService } from './../../../../core/data/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { startWith, map, filter } from 'rxjs/operators';

@Component({
  selector: 'ms-proveedor-edit',
  templateUrl: './proveedor-edit.component.html',
  styleUrls: ['./proveedor-edit.component.scss']
})
export class ProveedorEditComponent implements OnInit {

  id: number;
  personas: any[] = [];
  form: FormGroup;
  edicion: boolean = false;
  tipodocumentos: any[] = [];
  myControlPersona: FormControl = new FormControl();

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initFormBuilder();
    this.loadTipodocumento();
    //this.listarPersonas();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.loadDataFrom();
    });
    /*this.filteredOptions = this.myControlPersona.valueChanges
      .pipe(
        startWith( ''),       
        map(val => this.filter(val))
      );*/
  }

  initFormBuilder() {
    this.form = this.formBuilder.group({
      persona: this.formBuilder.group({
        idPersona: [null],
        nombre: [null,Validators.compose([Validators.required])],
        numeroDocumento: [null,Validators.compose([Validators.required])],
        telfMovil: [null, Validators.compose([Validators.required])],
        direccion: [null, Validators.compose([Validators.required])],
        email: [null],
        tipoDocumeto: [null, Validators.compose([Validators.required])]
      }),
      proveedor: this.formBuilder.group({
        idProveedor: [null],
        nombreComercial: [null, Validators.compose([Validators.required])],
        razonSocial: [null, Validators.compose([Validators.required])],
        telfEmpresa: [null],
        paginaWeb: [null]
      })
      /*idProveedor: [null],
      nombreComercial: [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
      razonSocial: [null, Validators.compose([Validators.required])],
      telfEmpresa: [null, Validators.compose([Validators.maxLength(20)])],
      persona: this.myControlPersona*/
    });
  }
  
  /*private loadDataFrom() {
    if (this.edicion) {
      this.dataService.proveedores().findById(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }*/

  private loadDataFrom() {
    if (this.edicion) {
      this.dataService.proveedores().findById(this.id).subscribe(data => {
          this.form.controls.proveedor.patchValue({
            idProveedor: data.idProveedor,
            nombreComercial:data.nombreComercial,
            razonSocial:data.razonSocial,
            telfEmpresa:data.telfEmpresa,
            paginaWeb:data.paginaWeb
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

  /*filter(val: any) { 
    if (val != null && val.idPersona > 0) {
      return this.personas.filter(option =>
        option.nombre.toLowerCase().includes(val.nombre.toLowerCase()) || option.numeroDocumento.includes(val.numeroDocumento));
    } else {
      return this.personas.filter(option =>
        option.nombre.toLowerCase().includes(val.toLowerCase())  || option.numeroDocumento.includes(val));
    }
  }*/

  /*listarPersonas() {
    this.dataService.personas().getAll().subscribe(data => {
      this.personas = data;
    });
  }*/

  /*displayFn(val: any) {
    return val ? `${val.nombre}` : val;
  }*/

  cancel(){
    if (this.edicion) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    }else{
      this.router.navigate(['../'], { relativeTo: this.route })
    }
  }
  save() {
    if (this.edicion) {
      //update
      this.dataService.proveedores().update(this.form.value).subscribe(data => {
        this.dataService.proveedores().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('Se Actualizo con éxito!')
        });
      });      
    } else {
      //insert
      this.dataService.proveedores().create(this.form.value).subscribe(data => {
        this.dataService.proveedores().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('Se Registro con éxito!');
        });
      });
    }
    this.cancel();
  }
}
