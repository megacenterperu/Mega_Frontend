import { USER_DATA } from 'src/config/auth.config';
import { Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'ms-clienteventa-dialo',
  templateUrl: './clienteventa-dialo.component.html',
  styleUrls: ['./clienteventa-dialo.component.scss']
})
export class ClienteventaDialoComponent implements OnInit {
  id: number;
  form: FormGroup;
  isdefaultCliente: boolean = false;
  edicion: boolean = false;
  tipodocumentos: any[] = [];
  filteredOptions: Observable<any[]>;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ClienteventaDialoComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {
    this.estadoSeleccion();
    this.initFormBuilder();
    this.loadTipodocumento();
  }

  initFormBuilder() {
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    this.form = this.formBuilder.group({
      cliente: this.formBuilder.group({
        idCliente: [null],
        idSucursal: [user.idSucursal],
        isdefaultCliente: [!this.isdefaultCliente]
      }),
      persona: this.formBuilder.group({
        idPersona: [null],
        nombre: [null, Validators.compose([Validators.required])],
        numeroDocumento: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(11)])],
        telfMovil: [null],
        direccion: [null],
        email: [null],
        tipoDocumeto: [null, Validators.compose([Validators.required])]
      })
    });
    this.form.controls.persona.get("nombre").valueChanges.subscribe(value => {
      let tipoDoc = this.form.controls.persona.get('tipoDocumeto').value;
      if (tipoDoc != null) {
        this.validar(event);
      } else {
        this.dataService.providers().mensaje.next('Seleccione Tipo Documento valido');
      }
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

  save() {
    if (this.edicion) {
      //update
      this.dataService.clientes().update(this.form.value).subscribe(data => {
        this.dataService.clientes().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('Se modifico')
        });
      });
    } else {
      //insert
      this.dataService.clientes().create(this.form.value).subscribe(data => {
        this.dataService.clientes().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('Se registro');
        });
      });
    }
    this.dialogRef.close();
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
