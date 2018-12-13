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

  myControlPersona: FormControl = new FormControl();
  filteredOptions: Observable<any[]>;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initFormBuilder();
    this.listarPersonas();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.loadDataFrom();
    });
    this.filteredOptions = this.myControlPersona.valueChanges
      .pipe(
        startWith( ''),       
        map(val => this.filter(val))
      );
  }

  initFormBuilder() {
    this.form = this.formBuilder.group({
      idProveedor: [null],
      nombreComercial: [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
      razonSocial: [null, Validators.compose([Validators.required])],
      telfEmpresa: [null, Validators.compose([Validators.maxLength(20)])],
      persona: this.myControlPersona
    });
  }

  private loadDataFrom() {
    if (this.edicion) {
      this.dataService.proveedores().findById(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  filter(val: any) { 
    if (val != null && val.idPersona > 0) {
      return this.personas.filter(option =>
        option.nombre.toLowerCase().includes(val.nombre.toLowerCase()) || option.numeroDocumento.includes(val.numeroDocumento));
    } else {
      return this.personas.filter(option =>
        option.nombre.toLowerCase().includes(val.toLowerCase())  || option.numeroDocumento.includes(val));
    }
  }
  listarPersonas() {
    this.dataService.personas().getAll().subscribe(data => {
      this.personas = data;
    });
  }

  displayFn(val: any) {
    return val ? `${val.nombre}` : val;
  }

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
          this.dataService.providers().mensaje.next('se modifico')
        });
      });      
    } else {
      //insert
      this.dataService.proveedores().create(this.form.value).subscribe(data => {
        this.dataService.proveedores().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se registro');
        });
      });
    }
    this.cancel();
  }
}
