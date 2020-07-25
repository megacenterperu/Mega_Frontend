import { ActivatedRoute, Router, Params } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/core/data/data.service";

@Component({
  selector: "ms-categoria-edit",
  templateUrl: "./categoria-edit.component.html",
  styleUrls: ["./categoria-edit.component.scss"]
})
export class CategoriaEditComponent implements OnInit {
  id: number;
  form: FormGroup;
  edicion: boolean = false;

  constructor(
    private dataService: DataService,private route: ActivatedRoute,private router: Router,private formBuilder: FormBuilder
  ) {}

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
      idDolenciaProducto:[null],
      dolenciaPropiedad:[null,Validators.compose([Validators.required])],
      descripcion:[null,Validators.compose([Validators.required])]
    });
  }

  private loadDataFrom(){
    if(this.edicion){
      this.dataService.dolenciaProductos().findById(this.id).subscribe(data =>{
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
      this.dataService.dolenciaProductos().update(this.form.value).subscribe(data =>{
        this.dataService.dolenciaProductos().getAllfindByIdSucursal().subscribe(cat =>{
          this.dataService.providers().cambio.next(cat);
          this.dataService.providers().mensaje.next("Se Actualizo con éxito!");
        });
      });
    }else{
      this.dataService.dolenciaProductos().create(this.form.value).subscribe(data =>{
        this.dataService.dolenciaProductos().getAllfindByIdSucursal().subscribe(cate =>{
          this.dataService.providers().cambio.next(cate);
          this.dataService.providers().mensaje.next("Se Registro con éxito!");
        });
      });
    }
    this.cancel();
  }

}
