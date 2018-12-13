import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../../../../../core/data/data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'ms-sucursal-edit',
  templateUrl: './sucursal-edit.component.html',
  styleUrls: ['./sucursal-edit.component.scss']
})
export class SucursalEditComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  lstorganizacions: any[]=[];
  filteredOptions: Observable<any[]>;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initFormBuilder();
    this.listarOrganizacion();
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
      this.edicion=params['id'] !=null;
      this.loadDataFrom();
    });
  }

  initFormBuilder(){
    this.form=this.formBuilder.group({
      idSocursal:[null],
      nombre:[null,Validators.compose([Validators.required])],
      direccion:[null,Validators.compose([Validators.required])],
      organizacion:[null,Validators.compose([Validators.required])]
    });
  }

  private loadDataFrom(){
    if(this.edicion){
      this.dataService.sucursales().findById(this.id).subscribe(data =>{
        this.form.patchValue(data);
      });
    }
  }

  listarOrganizacion() {
    this.dataService.organizaciones().getAll().subscribe(data => {
      this.lstorganizacions = data;
    });
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
      this.dataService.sucursales().update(this.form.value).subscribe(data =>{
        console.log(data);
        this.dataService.sucursales().getAll().subscribe(cat =>{
          this.dataService.providers().cambio.next(cat);
          this.dataService.providers().mensaje.next("se Actualizo con éxito!");
        });
      });
    }else{
      this.dataService.sucursales().create(this.form.value).subscribe(data =>{
        console.log(data);
        this.dataService.sucursales().getAll().subscribe(cate =>{
          this.dataService.providers().cambio.next(cate);
          this.dataService.providers().mensaje.next("Se Registro con éxito!");
        });
      });
    }
    this.cancel();
  }

}
