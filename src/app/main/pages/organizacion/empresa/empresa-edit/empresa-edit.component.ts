import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/data/data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'ms-empresa-edit',
  templateUrl: './empresa-edit.component.html',
  styleUrls: ['./empresa-edit.component.scss']
})
export class EmpresaEditComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  lstorganizacions: any[]=[];
  filteredOptions: Observable<any[]>;

  constructor(private dataService: DataService,private route: ActivatedRoute,private router: Router,private formBuilder: FormBuilder) { }

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
      idOrganizacion:[null],
      razonSocial:[null,Validators.compose([Validators.required])],
      nombreComercial:[null,Validators.compose([Validators.required])],
      ruc:[null,Validators.compose([Validators.required])],
      direccion:[null,Validators.compose([Validators.required])],
      email:[null,Validators.compose([Validators.required])],
      telefono:[null,Validators.compose([Validators.required])]
    });
  }

  private loadDataFrom(){
    if(this.edicion){
      this.dataService.organizaciones().findById(this.id).subscribe(data =>{
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
      this.dataService.organizaciones().update(this.form.value).subscribe(data =>{
      //  console.log(data);
        this.dataService.organizaciones().getAll().subscribe(cat =>{
          this.dataService.providers().cambio.next(cat);
          this.dataService.providers().mensaje.next("Se Actualizo con éxito!");
        });
      });
    }else{
      this.dataService.organizaciones().create(this.form.value).subscribe(data =>{
      //  console.log(data);
        this.dataService.organizaciones().getAll().subscribe(cate =>{
          this.dataService.providers().cambio.next(cate);
          this.dataService.providers().mensaje.next("Se Registro con éxito!");
        });
      });
    }
    this.cancel();
  }

  getConsulta() {
    let ruc=this.form.get('ruc').value;
    var rucs=new String(ruc);
      if(rucs.length > 8){
        this.dataService.organizaciones().getRuc(this.form.value.ruc).subscribe(data=>{
          this.form.patchValue({
            ruc:data.ruc,
            razonSocial:data.razonSocial,
            nombreComercial:data.nombreComercial,
            direccion:data.direccion+' '+data.departamento+' - '+data.provincia+' - '+data.distrito
          });
        },error => {
          this.dataService.providers().mensaje.next('RUC invalido o no encontrado')
        });
      }
  }

}
