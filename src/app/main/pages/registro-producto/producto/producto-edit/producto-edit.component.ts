import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataService } from "../../../../../core/data/data.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "ms-producto-edit",
  templateUrl: "./producto-edit.component.html",
  styleUrls: ["./producto-edit.component.scss"]
})
export class ProductoEditComponent implements OnInit {
  id: number;
  form: FormGroup;
  edicion: boolean = false;
  lstunidadmedidas: any[]=[];
  lstcategorias: any[]=[];
  lsttipoProductos: any[]=[];
  lstorganizacions: any[]=[];
  filteredOptions: Observable<any[]>;

  listestados: string[] = ['NUEVO', 'SEGUNDA', 'SERVICIO'];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initFormBuilder();
    this.listarUnidadMedida();
    this.listarCategoria();
    this.listarTipoProducto();
    this.listarOrganizacion();
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
      this.edicion=params['id'] !=null;
      this.loadDataFrom();
    });
  }

  initFormBuilder(){
    this.form=this.formBuilder.group({
      idProducto:[null],
      codProducto:[null,Validators.compose([Validators.required])],
      nombre:[null,Validators.compose([Validators.required])],
      marcaProducto:[null,Validators.compose([Validators.required])],
      stock:[null,Validators.compose([Validators.required])],
      precioCompra:[null,Validators.compose([Validators.required])],
      precioVenta:[null,Validators.compose([Validators.required])],
      unidadMedida:[null,Validators.compose([Validators.required])],
      categoria:[null,Validators.compose([Validators.required])],
      tipoProducto:[null,Validators.compose([Validators.required])],
      organizacion:[null,Validators.compose([Validators.required])]
    });
  }

  private loadDataFrom(){
    if(this.edicion){
      this.dataService.productos().findById(this.id).subscribe(data =>{
        this.form.patchValue(data);
      });
    }
  }

  listarUnidadMedida() {
    this.dataService.unidadMedidas().getAll().subscribe(data => {
      this.lstunidadmedidas = data;
    });
  }

  compareUnidadMedida(x: any, y: any): boolean {
    return x && y ? x.idUnidadmedida === y.idUnidadmedida : x === y;
  }

  listarCategoria() {
    this.dataService.categorias().getAll().subscribe(data => {
      this.lstcategorias = data;
    });
  }

  compareCategoria(x: any, y: any): boolean {
    return x && y ? x.idCategoria === y.idCategoria : x === y;
  }

  listarTipoProducto() {
    this.dataService.tipoProductos().getAll().subscribe(data => {
      this.lsttipoProductos = data;
    });
  }

  compareTipoProducto(x: any, y: any): boolean {
    return x && y ? x.idTipoproducto === y.idTipoproducto : x === y;
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
      this.dataService.productos().update(this.form.value).subscribe(data =>{
        console.log(data);
        this.dataService.productos().getAll().subscribe(cat =>{
          this.dataService.providers().cambio.next(cat);
          this.dataService.providers().mensaje.next("Se Actualizo con éxito!");
        });
      });
    }else{
      this.dataService.productos().create(this.form.value).subscribe(data =>{
        console.log(data);
        this.dataService.productos().getAll().subscribe(cate =>{
          this.dataService.providers().cambio.next(cate);
          this.dataService.providers().mensaje.next("Se Registro con éxito!");
        });
      });
    }
    this.cancel();
  }
}
