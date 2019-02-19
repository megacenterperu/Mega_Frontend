import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data/data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.scss']
})
export class UsuarioEditComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  lstPersonal: any[]=[];
  lstRol: any[]=[];
  filteredOptions: Observable<any[]>;
  hide = true;
  
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
  }

  initFormBuilder(){
    this.form=this.formBuilder.group({
      idUsuario:[null],
      username:[null,Validators.compose([Validators.required])],
      password:[null,Validators.compose([Validators.required])],     
      idPersonal:[null,Validators.compose([Validators.required])],
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
      this.lstPersonal = data;
    });
  }

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
      console.log(this.form.value);
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
