import { DataService } from 'src/app/core/data/data.service';
import { USER_DATA } from 'src/config/auth.config';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'ms-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.scss']
})
export class ClienteEditComponent implements OnInit {
  startDate: Date = new Date();
  maxDate: Date = new Date();
  id: number;
  form: FormGroup;
  edicion: boolean = false;
  isdefaultCliente: boolean = false;
  tipodocumentos: any[] = [];
  filteredOptions: Observable<any[]>;

  constructor(
    private dataService: DataService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.estadoSeleccion();
    this.initFormBuilder();
    this.loadTipodocumento();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.loadDataFrom();
    });
  }

  onKeydown(event) {
    this.getConsulta();
  }
  
  validar(event) {
    let ruc = this.form.controls.persona.get('numeroDocumento').value;
    let tipoDoc = this.form.controls.persona.get('tipoDocumeto').value.abreviatura;
    var rucs = new String(ruc);
    if (rucs.length == 11 && tipoDoc == 'RUC') {

    } else if (rucs.length == 8 && tipoDoc == 'DNI' && ruc != '00000000' || rucs.length == 8 && ruc == '00000000' && tipoDoc == 'SINDOC') {

    } else {
      this.form.controls.persona.patchValue({ tipoDocumeto: null });
      this.dataService.providers().mensaje.next('Tipo Documento invalido');
    }
  }

  initFormBuilder() {
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    var tzoffset = (this.maxDate).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
    this.form = this.formBuilder.group({
      cliente: this.formBuilder.group({
        idCliente: [null],
        //fechaIngreso: [localISOTime],
        //codigoAlumno: [null], 
        idSucursal: [user.idSucursal],
        isdefaultCliente: [!this.isdefaultCliente]
      }),
      persona: this.formBuilder.group({
        idPersona: [null],
        nombre: [null, Validators.compose([Validators.required])],
        //nombre: ['', [Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g)]],
        numeroDocumento: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(11)])],
        telfMovil: [null],
        direccion: [null],
        email: [null],
        tipoDocumeto: [null, Validators.compose([Validators.required])]
      })
    });
  }

  private loadDataFrom() {
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    if (this.edicion) {
      this.dataService.clientes().findById(this.id).subscribe(data => {
        this.form.controls.cliente.patchValue({
          idCliente: data.idCliente,
          //fechaIngreso: new Date(data.fechaIngreso),
          //codigoAlumno:data.codigoAlumno,
          idSucursal: user.idSucursal,
          isdefaultCliente: data.isdefaultCliente
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
    const tipoDocumeto = this.tipodocumentos.find(t => t.idTipodocumento == data.tipoDocumeto.idTipodocumento);
    this.form.controls.persona.get('tipoDocumeto').setValue(tipoDocumeto);
  }

  estadoSeleccion() {
    if (this.isdefaultCliente = !null) {
      this.isdefaultCliente = true;
    } else {
      this.isdefaultCliente = false;
    }
  }

  loadTipodocumento() {
    this.dataService.tipoDocumentos().getAll().subscribe(data => {
      this.tipodocumentos = data;
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
    if (this.edicion) {
      //update
      this.dataService.clientes().update(this.form.value).subscribe(data => {
        this.dataService.clientes().getAllfindByIdSucursal().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se modifico')
        });
      });
    } else {
      //insert
      //console.log(this.cambiarNombre(this.form.value.persona.nombre));
      this.dataService.clientes().create(this.form.value).subscribe(data => {
        this.dataService.clientes().getAllfindByIdSucursal().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se registro');
        });
      });
    }
    this.cancel();
  }

  cambiarNombre(nombre) {
    let regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
    return regex.exec(nombre)[0];
  }

  getConsulta() {
    let ruc = this.form.controls.persona.get('numeroDocumento').value;
    var rucs = new String(ruc);
    if (rucs.length > 8) {
      this.dataService.clientes().getRuc(this.form.value.persona.numeroDocumento).subscribe(data => {
        this.form.controls.persona.patchValue({
          nombre: data.razonSocial,
          numeroDocumento: data.ruc,
          telfMovil: data.telfMovil,
          direccion: data.direccion + ' ' + data.departamento + ' - ' + data.provincia + ' - ' + data.distrito,
          email: data.email
        });
      }, error => {
        this.dataService.providers().mensaje.next('RUC invalido o no encontrado')
      });
    } else {
      this.dataService.clientes().getDni(this.form.value.persona.numeroDocumento).subscribe(data => {
        this.form.controls.persona.patchValue({
          nombre: data.nombres + ' ' + data.apellidoPaterno + ' ' + data.apellidoMaterno,
          numeroDocumento: data.dni,
          telfMovil: data.telfMovil,
          direccion: data.direccion,
          email: data.email
        });
      }, error => {
        this.dataService.providers().mensaje.next('Dni invalido o no encontrado')
      });
    }
  }

}
