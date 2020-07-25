import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/core/data/data.service';
import { startWith, map } from 'rxjs/operators';
import { MatSelect } from '@angular/material';

@Component({
  selector: 'ms-usuario-admin-edit',
  templateUrl: './usuario-admin-edit.component.html',
  styleUrls: ['./usuario-admin-edit.component.scss']
})
export class UsuarioAdminEditComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  personales: any[];
  lstPersonal: any[]=[];
  lstRol: any[]=[];
  filteredOptions: Observable<any[]>;
  myControlPersonal: FormControl = new FormControl();
  hide = true;
  @ViewChild('singleSelect') singleSelect: MatSelect; 

  constructor(private dataService: DataService,private route: ActivatedRoute,private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initFormBuilder();
    this.listarPersonal();
    this.listarRol();
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
      this.edicion=params['id'] !=null;
      this.loadDataFrom();
    });

    /*this.filteredOptions = this.myControlPersonal.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
      );*/
  }
  
  initFormBuilder(){
    this.form=this.formBuilder.group({
      idUsuario:[null],
      username:[null,Validators.compose([Validators.required])],
      password:[null,Validators.compose([Validators.required])],     
      personal:[null,Validators.compose([Validators.required])],
      idRol:[null,Validators.compose([Validators.required])],
      //roles: this.formBuilder.array(null,Validators.compose([Validators.required]))
    });
  }

  private loadDataFrom(){
    if(this.edicion){
      this.dataService.usuarios().findById(this.id).subscribe(data =>{
        this.form.patchValue(data);
      });
    }
  }

  listarPersonal() {
    this.dataService.personales().getAll().subscribe(data => {
      this.personales = data;
      this.lstPersonal = data;
    });
  }

  buscarPersonal(event) {
    this.lstPersonal = this.personales.filter(bank =>
      bank.persona.nombre.toLowerCase().indexOf(event.target.value) > -1 ||
      bank.persona.numeroDocumento.indexOf(event.target.value) > -1
    );
  }

  /*filter(val: any) {
    if (val != null && val.idPersonal > 0) {
      return this.lstPersonal.filter(option =>
        option.persona.nombre.toLowerCase().includes(val.persona.nombre.toLowerCase()) || option.persona.numeroDocumento.includes(val.persona.numeroDocumento));
    } else {
      return this.lstPersonal.filter(option =>
        option.persona.nombre.toLowerCase().includes(val.toLowerCase()) || option.persona.numeroDocumento.includes(val));
    }
  }

  displayFn(val: any) {
    return val ? `${val.idPersonal}` : val;
  }*/

  comparePersonal(x: any, y: any): boolean {
    return x && y ? x.idPersonal === y.idPersonal : x === y;
  }

  listarRol(){
    this.dataService.roles().getAll().subscribe(data =>{
      this.lstRol=data;
    });
  }

  compareRol(x: any, y: any): boolean{
    return x && y ? x.idRol === y.idRol : x === y;
  }

  cancel(){
    if(this.edicion){
      this.router.navigate(['../../'],{relativeTo: this.route});
    }else{
      this.router.navigate(['../'],{ relativeTo: this.route});
    }
  }

  operar(){
    if(this.edicion){
   //   console.log(this.form.value);
      /*this.dataService.usuarios().update(this.form.value).subscribe(data =>{
        this.dataService.usuarios().getAll().subscribe(cat =>{
          this.dataService.providers().cambio.next(cat);
          this.dataService.providers().mensaje.next("Se Actualizo con éxito!");
        });
      });*/
    }else{
      this.dataService.usuarios().create(this.form.value).subscribe(data =>{
        this.dataService.usuarios().getAll().subscribe(user =>{
          this.dataService.usuarios().usuarioCambio.next(user);
          //this.dataService.providers().cambio.next(user);
          this.dataService.providers().mensaje.next("Se Registro con éxito!");
        });
      });
    }
    this.cancel();
  }

}
