import { USER_DATA } from 'src/config/auth.config';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Rol } from 'src/app/core/model/rol';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'ms-usuario-rol-asignar',
  templateUrl: './usuario-rol-asignar.component.html',
  styleUrls: ['./usuario-rol-asignar.component.scss']
})
export class UsuarioRolAsignarComponent implements OnInit {

  id: number;
  form: FormGroup;
  rolesActuales: Rol[] = [];
  allRoles: Rol[] = [];
  rol: Rol;
  asignacion: boolean = false;

  constructor(private dataService: DataService,private route: ActivatedRoute,private router: Router,private formBuilder: FormBuilder,private snackBar:MatSnackBar) { }

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
      idUsuario: [null],
      username: [null],
      rol: [null],
      roles: this.formBuilder.array([], Validators.compose([])),
      personal: this.formBuilder.group({
        idPersonal: [null],
        fechaIngreso: [new Date(), Validators.compose([Validators.required])],
        sueldo: [null, Validators.compose([Validators.required])]
      }),
      persona:this.formBuilder.group({
        idPersona: [null],
        nombre:[null, Validators.compose([Validators.required])]
      })
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
      this.dataService.usuarios().findById(this.id).subscribe(data =>{
        this.form.patchValue(data);
        this.rolesActuales=data.roles;
        this.buildData(data.personal.persona);
      });
      this.dataService.roles().getAll().subscribe(data =>{
        this.allRoles=data;
      });
    }
  }

  buildData(data) {
    this.form.controls.persona.patchValue({
      idPersona: data.idPersona,
      nombre:data.nombre
    });
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
          //this.dataService.providers().mensaje.next("El Rol seleccionado ya fue asignado");
        }
      } else {
        this.snackBar.open('El Rol seleccionado ya fue asignado', 'Aviso', { duration: 2000 });
        //this.dataService.providers().mensaje.next("El Rol seleccionado ya fue asignado");
      }
    } else {
      this.snackBar.open('Seleccione un rol para agregar', 'Aviso', { duration: 2000 });
      //this.dataService.providers().mensaje.next("Seleccione un rol para agregar");
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
    this.dataService.usuarioroles().create(this.form.value).subscribe(data =>{
      const user = JSON.parse(sessionStorage.getItem(USER_DATA));
      this.dataService.usuarios().findByIdSucursal(user.idSucursal).subscribe(listrol =>{
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
