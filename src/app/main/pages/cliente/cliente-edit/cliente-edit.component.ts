import { startWith, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../../../../core/data/data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'ms-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.scss']
})
export class ClienteEditComponent implements OnInit {

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
    private formBuilder: FormBuilder) { }

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
      idCliente: [null],
      persona: this.myControlPersona
    });
  }

  private loadDataFrom() {
    if (this.edicion) {
      this.dataService.clientes().findById(this.id).subscribe(data => {
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
      this.dataService.clientes().update(this.form.value).subscribe(data => {
        this.dataService.clientes().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se modifico')
        });
      });      
    } else {
      //insert
      this.dataService.clientes().create(this.form.value).subscribe(data => {
        this.dataService.clientes().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se registro');
        });
      });
    }
    this.cancel();
  }

}
