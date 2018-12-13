import { Params } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../core/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-persona-edit',
  templateUrl: './persona-edit.component.html',
  styleUrls: ['./persona-edit.component.scss']
})
export class PersonaEditComponent implements OnInit {
  id: number;
  form: FormGroup;
  edicion: boolean = false;
  tipodocumentos: any[] = [];
  filteredOptions: Observable<any[]>;


  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initFormBuilder();
    this.listarTipoDocumento();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.loadDataFrom();
    });
  }

  initFormBuilder() {
    this.form = this.formBuilder.group({
      idPersona: [null],
      nombre: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      numeroDocumento: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(12)])],
      telfMovil: [null, Validators.compose([Validators.required, Validators.maxLength(9)])],
      direccion: [null, Validators.compose([Validators.maxLength(20)])],
      email: [null, Validators.compose([Validators.maxLength(20)])],
      tipoDocumeto: [null, Validators.compose([Validators.required])]
    });
  }

  private loadDataFrom() {
    if (this.edicion) {
      this.dataService.personas().findById(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  listarTipoDocumento() {
    this.dataService.tipoDocumentos().getAll().subscribe(data => {
      this.tipodocumentos = data;
    });
  }

  compareTipoDocumento(x: any, y: any): boolean {
    return x && y ? x.idTipodocumento === y.idTipodocumento : x === y;
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
      this.dataService.personas().update(this.form.value).subscribe(data => {
        this.dataService.personas().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se modifico')
        });
      });
    } else {
      //insert
      this.dataService.personas().create(this.form.value).subscribe(data => {
        this.dataService.personas().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se registro');
        });
      });
    }
    this.cancel();
  }
}