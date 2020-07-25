import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/data/data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'ms-proveedor-dialog',
  templateUrl: './proveedor-dialog.component.html',
  styleUrls: ['./proveedor-dialog.component.scss']
})
export class ProveedorDialogComponent implements OnInit {

  id: number;
  personas: any[] = [];
  form: FormGroup;
  edicion: boolean = false;
  tipodocumentos: any[] = [];
  myControlPersona: FormControl = new FormControl();

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar:MatSnackBar,
    public dialogRef: MatDialogRef<ProveedorDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
    this.initFormBuilder();
    this.loadTipodocumento();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.loadDataFrom();
    });
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 4000 });
    }); 
  }

  initFormBuilder() {
    this.form = this.formBuilder.group({
      persona: this.formBuilder.group({
        idPersona: [null],
        nombre: [null,Validators.compose([Validators.required])],
        numeroDocumento: [null, Validators.compose([Validators.required, Validators.maxLength(11)])],
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
    });
  }

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

  save() {
    if (this.edicion) {
      this.dataService.proveedores().update(this.form.value).subscribe(data => {
        this.dataService.proveedores().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('Se Actualizo con éxito!')
        });
      });      
    } else {
      this.dataService.proveedores().create(this.form.value).subscribe(data => {
        this.dataService.proveedores().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('Se Registro con éxito!');
        });
      });
    }
    this.dialogRef.close();
  }

  getConsulta() {
    let ruc=this.form.controls.persona.get('numeroDocumento').value;
    var rucs=new String(ruc);
      if(rucs.length > 8){
        this.dataService.proveedores().getRuc(this.form.value.persona.numeroDocumento).subscribe(data=>{
          this.form.controls.persona.patchValue({
            numeroDocumento:data.ruc,
            direccion:data.direccion+' '+data.departamento+' - '+data.provincia+' - '+data.distrito
          });
          this.form.controls.proveedor.patchValue({
            nombreComercial:data.nombreComercial,
            razonSocial:data.razonSocial
          });
          
        },error => {
          this.dataService.providers().mensaje.next('RUC invalido o no encontrado')
        });
      }
  }

}
