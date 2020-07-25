import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Rol } from 'src/app/core/model/rol';
import { DataService } from 'src/app/core/data/data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'ms-submenu-rol-asignar',
  templateUrl: './submenu-rol-asignar.component.html',
  styleUrls: ['./submenu-rol-asignar.component.scss']
})
export class SubmenuRolAsignarComponent implements OnInit {

  id: number;
  form: FormGroup;
  rolesActuales: Rol[] = [];
  allRoles: Rol[] = [];
  rol: Rol;
  asignacion: boolean = false;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.initFormBuilder();
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
      this.asignacion=params['id'] !=null;
      this.loadDataFrom();
    });
  }

  initFormBuilder(){
    this.form=this.formBuilder.group({
      idSubMenu: [null],
      title: [null],
      rol: [null],
      roles: this.formBuilder.array([], Validators.compose([])),
    });
  }

  addDetalleFormControl(): FormGroup {
    const formGroup = this.formBuilder.group({
      idRol: [null, Validators.compose([Validators.required])],
      nombre: [null, Validators.compose([Validators.maxLength(20)])]
    });
    this.roles.push(formGroup);
    return formGroup;
  }

  removeDetalleFormControl(index) {
    this.roles.removeAt(index);
  }

  get roles(): FormArray {
    return this.form.get('roles') as FormArray;
  }

  private loadDataFrom(){
    if(this.asignacion){
      this.dataService.subMenus().findById(this.id).subscribe(data =>{
        this.form.patchValue(data);
        this.rolesActuales=data.roles;
      });
      this.dataService.roles().getAll().subscribe(data =>{
        this.allRoles=data;
      });
    }
  }

  changeRol(data) {
    this.rol = data;
  }

  agregar() {
    if (this.rol) {
      const localRol = this.rolesActuales.find(r => r.idRol === this.rol.idRol);
      if (!localRol) {
        const addRol = this.roles.controls.find(r => r.value.idRol === this.rol.idRol);
        if (!addRol) {
          const formGroup = this.addDetalleFormControl();
          formGroup.patchValue(this.rol);
          this.rol = null;
          this.form.patchValue({ rol: null });
        } else {
          this.snackBar.open('El Rol seleccionado ya fue asignado', 'Aviso', { duration: 2000 });
        }
      } else {
        this.snackBar.open('El Rol seleccionado ya fue asignado', 'Aviso', { duration: 2000 });
      }
    } else {
      this.snackBar.open('Seleccione un rol para agregar', 'Aviso', { duration: 2000 });
    }
  }

  cancel(){
    if(this.asignacion){
      this.router.navigate(['../../'],{relativeTo: this.route});
    }else{
      this.router.navigate(['../'],{ relativeTo: this.route});
    }
  }

  save() {
    if(this.asignacion){
     this.dataService.submenuroles().create(this.form.value).subscribe(data =>{
       this.dataService.menus().getAll().subscribe(listrol =>{
         this.dataService.providers().cambio.next(listrol);
         this.dataService.providers().mensaje.next("Se Registro correctamente!");
       });
     });
   }else{
     /*this.dataService.usuarios().create(this.form.value).subscribe(data =>{
       console.log(data);
       this.dataService.usuarios().getAll().subscribe(cate =>{
         this.dataService.providers().cambio.next(cate);
         this.dataService.providers().mensaje.next("Se Registro con éxito!");
       });
     });*/
   }
    this.cancel();
  }

}
