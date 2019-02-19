import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/data/data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'ms-egreso-edit',
  templateUrl: './egreso-edit.component.html',
  styleUrls: ['./egreso-edit.component.scss']
})
export class EgresoEditComponent implements OnInit {
  id: number;
  form: FormGroup;
  edicion: boolean = false;

  fecha: Date = new Date();
  maxDate: Date = new Date();
  
  constructor(private dataService: DataService,
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
    var tzoffset = (this.fecha).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
    this.form=this.formBuilder.group({
      idEgreso:[null],
      fecha:[localISOTime,Validators.compose([Validators.required])],
      tipoPago:['EFECTIVO'],
      descripcion:[null,Validators.compose([Validators.required])],
      benificiario:[null,Validators.compose([Validators.required])],
      monto:[null,Validators.compose([Validators.required])],
      estadoEgreso:[0]
    });
  }

  private loadDataFrom(){
    if(this.edicion){
      this.dataService.egresos().findById(this.id).subscribe(data =>{
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
      this.dataService.egresos().update(this.form.value).subscribe(data =>{
        console.log(data);
        this.dataService.egresos().getAll().subscribe(cat =>{
          this.dataService.providers().cambio.next(cat);
          this.dataService.providers().mensaje.next("se Actualizo con éxito!");
        });
      });
    }else{
      this.dataService.egresos().create(this.form.value).subscribe(data =>{
        console.log(data);
        this.dataService.egresos().getAll().subscribe(cate =>{
          this.dataService.providers().cambio.next(cate);
          this.dataService.providers().mensaje.next("Se Registro con éxito!");
        });
      });
    }
    this.cancel();
  }
}
