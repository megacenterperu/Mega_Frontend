import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataService } from "../../../../../core/data/data.service";
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: "ms-tipo-producto-edit",
  templateUrl: "./tipo-producto-edit.component.html",
  styleUrls: ["./tipo-producto-edit.component.scss"]
})
export class TipoProductoEditComponent implements OnInit {
  id: number;
  form: FormGroup;
  edicion: boolean = false;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
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
      idTipoproducto:[null],
      descripcion:[null,Validators.compose([Validators.required])]
    });
  }

  private loadDataFrom(){
    if(this.edicion){
      this.dataService.tipoProductos().findById(this.id).subscribe(data =>{
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
      this.dataService.tipoProductos().update(this.form.value).subscribe(data =>{
        //console.log(data);
        this.dataService.tipoProductos().getAllfindByIdSucursal().subscribe(tp =>{
          this.dataService.providers().cambio.next(tp);
          this.dataService.providers().mensaje.next("se Actualizo con éxito!");
        });
      });
    }else{
      this.dataService.tipoProductos().create(this.form.value).subscribe(data =>{
      //  console.log(data);
        this.dataService.tipoProductos().getAllfindByIdSucursal().subscribe(tdoc =>{
          this.dataService.providers().cambio.next(tdoc);
          this.dataService.providers().mensaje.next("Se Registro con éxito!");
        });
      });
    }
    this.cancel();
  }
}
