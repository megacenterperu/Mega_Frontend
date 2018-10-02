import { ActivatedRoute, Router, Params } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { DataService } from "../../../../../core/data/data.service";

@Component({
  selector: "ms-tipo-documento-edit",
  templateUrl: "./tipo-documento-edit.component.html",
  styleUrls: ["./tipo-documento-edit.component.scss"]
})
export class TipoDocumentoEditComponent implements OnInit {
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
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;   
      this.loadDataFrom();   
    });
  }

  initFormBuilder() {
    this.form = this.formBuilder.group({
      idTipodocumento: [null],
      abreviatura: [null,Validators.compose([Validators.required, Validators.maxLength(20)])],
      denominacion: [null, Validators.compose([Validators.required])]
    });
  }

  private loadDataFrom(){
    if(this.edicion){
      this.dataService.tipoDocumentos().findById(this.id).subscribe(data =>{
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
      this.dataService.tipoDocumentos().update(this.form.value).subscribe(data =>{
        console.log(data);
        this.dataService.tipoDocumentos().getAll().subscribe(td =>{
          this.dataService.providers().cambio.next(td);
          this.dataService.providers().mensaje.next("se Actualizo con éxito!");
        });
      });
    }else{
      this.dataService.tipoDocumentos().create(this.form.value).subscribe(data =>{
        console.log(data);
        this.dataService.tipoDocumentos().getAll().subscribe(tipodoc =>{
          this.dataService.providers().cambio.next(tipodoc);
          this.dataService.providers().mensaje.next("Se Registro con éxito!");
        });
      });
    }
    this.cancel();
  }

}


