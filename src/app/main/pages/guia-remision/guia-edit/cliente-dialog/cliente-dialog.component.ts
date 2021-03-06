import { USER_DATA } from 'src/config/auth.config';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/data/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'ms-cliente-dialog',
  templateUrl: './cliente-dialog.component.html',
  styleUrls: ['./cliente-dialog.component.scss']
})
export class ClienteDialogComponent implements OnInit {

  id: number; 
  form: FormGroup;
  isdefaultCliente: boolean = false;
  edicion: boolean = false;
  tipodocumentos:any[] = [];
  filteredOptions: Observable<any[]>;

  constructor(private dataService: DataService, private route: ActivatedRoute, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ClienteDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any
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

  initFormBuilder() {
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    this.form = this.formBuilder.group({
      cliente: this.formBuilder.group({
        idCliente: [null],
        idSucursal: [user.idSucursal],
        isdefaultCliente:[!this.isdefaultCliente]        
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
  }

  private loadDataFrom() {
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    if (this.edicion) {
      this.dataService.clientes().findById(this.id).subscribe(data => {
        this.form.controls.cliente.patchValue({
          idCliente:data.idCliente,
          idSucursal:user.idSucursal,
          isdefaultCliente:data.isdefaultCliente
        });
        this.buildData(data.persona);       
      });     
    }
  }

  buildData(data) {
    this.form.controls.persona.patchValue({
      idPersona: data.idPersona,
      nombre:data.nombre,
      numeroDocumento:data.numeroDocumento,
      telfMovil: data.telfMovil,
      direccion:data.direccion,
      email:data.email
    });
   const tipoDocumeto=this.tipodocumentos.find(t=>t.idTipodocumento==data.tipoDocumeto.idTipodocumento);
    this.form.controls.persona.get('tipoDocumeto').setValue(tipoDocumeto);
  }

  estadoSeleccion(){
    if(this.isdefaultCliente=!null){
      this.isdefaultCliente=true;
    }else{
      this.isdefaultCliente=false;
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
        this.dataService.clientes().getAllfindByIdSucursal().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se modifico')
        });
      });      
    } else {
      //insert
      this.dataService.clientes().create(this.form.value).subscribe(data => {
        this.dataService.clientes().getAllfindByIdSucursal().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se registro');
        });
      });
    }
    this.dialogRef.close();
  }

  getConsulta() {
    let ruc=this.form.controls.persona.get('numeroDocumento').value;
    var rucs=new String(ruc);
    if(rucs.length > 8){
      this.dataService.clientes().getRuc(this.form.value.persona.numeroDocumento).subscribe(data=>{
        this.form.controls.persona.patchValue({
          nombre:data.razonSocial,
          numeroDocumento:data.ruc,
          telfMovil: data.telfMovil,
          direccion:data.direccion+' '+data.departamento+' - '+data.provincia+' - '+data.distrito,
          email:data.email
        });
      },error => {
        this.dataService.providers().mensaje.next('RUC invalido o no encontrado')
      });
    }else{
      this.dataService.clientes().getDni(this.form.value.persona.numeroDocumento).subscribe(data=>{
        this.form.controls.persona.patchValue({
          nombre:data.nombres+' '+data.apellidoPaterno+' '+data.apellidoMaterno,
          numeroDocumento:data.dni,
          telfMovil: data.telfMovil,
          direccion:data.direccion,
          email:data.email
        });
      },error => {
        this.dataService.providers().mensaje.next('Dni invalido o no encontrado')
      });
    }
  }

}
