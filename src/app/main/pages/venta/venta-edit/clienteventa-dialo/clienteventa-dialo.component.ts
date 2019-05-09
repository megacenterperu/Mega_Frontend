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
  edicion: boolean = false;
  tipodocumentos:any[] = [];
  filteredOptions: Observable<any[]>;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ClienteventaDialoComponent>,@Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  

  ngOnInit() {
    this.initFormBuilder();
    this.loadTipodocumento();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.loadDataFrom();
    });
  }

  initFormBuilder() {
    this.form = this.formBuilder.group({
      cliente: this.formBuilder.group({
        idCliente: [null]      
      }),
      persona: this.formBuilder.group({
        idPersona: [null],
        nombre: [null, Validators.compose([Validators.required])],
        numeroDocumento: [null, Validators.compose([Validators.required])],
        telfMovil: [null],
        direccion: [null],
        email: [null],
        tipoDocumeto: [null, Validators.compose([Validators.required])]
      })
    });
  }

  private loadDataFrom() {
    if (this.edicion) {
      this.dataService.clientes().findById(this.id).subscribe(data => {
        this.form.controls.cliente.patchValue({
          idCliente:data.idCliente
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
    let ruc=this.form.controls.persona.get('numeroDocumento').value;
    var rucs=new String(ruc);
    if(rucs.length > 8){
      this.dataService.clientes().getRuc(this.form.value.persona.numeroDocumento).subscribe(data=>{
        this.form.controls.persona.patchValue({
          nombre:data.razonSocial,
          numeroDocumento:data.ruc,
          telfMovil: data.telfMovil,
          direccion:data.direccion,
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
