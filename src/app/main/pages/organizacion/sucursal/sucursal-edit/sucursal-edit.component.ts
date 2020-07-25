import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DataService } from 'src/app/core/data/data.service';

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
      emprRazonsocial:[null,Validators.compose([Validators.required])],
      nombre:[null,Validators.compose([Validators.required])],
      emprLocal:['0000',Validators.compose([Validators.required])],
      ruc:[null,Validators.compose([Validators.required])],
      telefono:[null,Validators.compose([Validators.required])],
      teleMovil:[null,Validators.compose([Validators.required])],
      sloganEntidad:[null,Validators.compose([Validators.required])],
      direccion:[null,Validators.compose([Validators.required])],

      emprDepartamento:[null,Validators.compose([Validators.required])],
      emprProvincia:[null,Validators.compose([Validators.required])],
      emprDistrito:[null,Validators.compose([Validators.required])],
      emprUbigeo:['050101',Validators.compose([Validators.required])],
      emprPais:['PE'],

      rutaSeguridad:[null],
      rutaTokenCrea:[null],
      rutaTokenCierra:[null],
      rutaTokenFuerza:[null],
      rutaFact:[null],
      usuarioToken:[null],
      claveToken:[null],

      mensajeAutorizacionTicket:[null,Validators.compose([Validators.required])],
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

  compareOrganizacion(x: any, y: any): boolean {
    return x && y ? x.idOrganizacion === y.idOrganizacion : x === y;
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
      //  console.log(data);
        this.dataService.sucursales().getAll().subscribe(cat =>{
          this.dataService.providers().cambio.next(cat);
          this.dataService.providers().mensaje.next("se Actualizo con éxito!");
        });
      });
    }else{
      this.dataService.sucursales().create(this.form.value).subscribe(data =>{
      //  console.log(data);
        this.dataService.sucursales().getAll().subscribe(cate =>{
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
            emprRazonsocial:data.razonSocial,
            nombre:data.nombreComercial,
            direccion:data.direccion+' '+data.departamento+' - '+data.provincia+' - '+data.distrito,
            emprDepartamento:data.departamento,
            emprProvincia:data.provincia,
            emprDistrito:data.distrito
          });
        },error => {
          this.dataService.providers().mensaje.next('RUC invalido o no encontrado')
        });
      }
  }

}
