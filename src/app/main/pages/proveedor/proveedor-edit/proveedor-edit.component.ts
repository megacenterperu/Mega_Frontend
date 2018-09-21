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

}
