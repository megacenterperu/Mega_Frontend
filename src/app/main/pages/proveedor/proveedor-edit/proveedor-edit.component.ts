import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ms-proveedor-edit',
  templateUrl: './proveedor-edit.component.html',
  styleUrls: ['./proveedor-edit.component.scss']
})
export class ProveedorEditComponent implements OnInit {
  id: number;
 // proveedor: Proveedor;
  form: FormGroup;
  edicion: boolean = false;

  ngOnInit() {
  }

  //private initForm() {
    //if (this.edicion) {
    //  this.pacienteService.listarPacientePorId(this.id).subscribe(data => {
     //   let id = data.idPaciente;
      //  let nombres = data.nombres;
      //  let apellidos = data.apellidos;
       // let dni = data.dni;
       // let direccion = data.direccion;
        //let telefono = data.telefono;

       // this.form = new FormGroup({
        //  'id': new FormControl(id),
        //  'nombres': new FormControl(nombres),
        //  'apellidos': new FormControl(apellidos),
        //  'dni': new FormControl(dni),
       //   'direccion': new FormControl(direccion),
     //     'telefono': new FormControl(telefono)
     //   });
    //  });
   // }
  //}
}
