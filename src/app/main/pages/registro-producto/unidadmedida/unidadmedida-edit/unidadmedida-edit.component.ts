import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../core/data/data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ms-unidadmedida-edit',
  templateUrl: './unidadmedida-edit.component.html',
  styleUrls: ['./unidadmedida-edit.component.scss']
})
export class UnidadmedidaEditComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion: boolean = false;

  constructor(    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initFormBuilder();
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
      this.edicion=params['id'] !=null;
      this.loadDataFrom();
    });
  }

  initFormBuilder(){
    this.form=this.formBuilder.group({
      idUnidadmedida:[null],
      codUnidadmedida:[null,Validators.compose([Validators.required])],
      descripcion:[null,Validators.compose([Validators.required])]
    });
  }

  private loadDataFrom(){
    if(this.edicion){
      this.dataService.unidadMedidas().findById(this.id).subscribe(data =>{
        this.form.patchValue(data);
      });
    }
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
      this.dataService.unidadMedidas().update(this.form.value).subscribe(data =>{
       // console.log(data);
        this.dataService.unidadMedidas().getAll().subscribe(cat =>{
          this.dataService.providers().cambio.next(cat);
          this.dataService.providers().mensaje.next("se Actualizo con éxito!");
        });
      });
    }else{
      this.dataService.unidadMedidas().create(this.form.value).subscribe(data =>{
    //    console.log(data);
        this.dataService.unidadMedidas().getAll().subscribe(cate =>{
          this.dataService.providers().cambio.next(cate);
          this.dataService.providers().mensaje.next("Se Registro con éxito!");
        });
      });
    }
    this.cancel();
  }

}
