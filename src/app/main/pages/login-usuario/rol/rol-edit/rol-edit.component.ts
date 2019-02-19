import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'ms-rol-edit',
  templateUrl: './rol-edit.component.html',
  styleUrls: ['./rol-edit.component.scss']
})
export class RolEditComponent implements OnInit {

  id: number;
  form: FormGroup;

  constructor(private dataService: DataService,
    public dialogRef: MatDialogRef<RolEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
      this.initFormBuilder();
      this.id=this.data.idRol;  
      this.loadDataFrom();
  }

  initFormBuilder(){
    this.form=this.formBuilder.group({
      idRol:[null],
      nombre:[null,Validators.compose([Validators.required])],
      descripcion:[null,Validators.compose([Validators.required])],
    });
  }

  private loadDataFrom(){
      this.dataService.roles().findById(this.id).subscribe(data =>{
        this.form.patchValue(data);
      });
  }

  operar(){
    if(this.id != null && this.data.idRol > 0){
      this.dataService.roles().update(this.form.value).subscribe(data =>{
        this.dataService.roles().getAll().subscribe(cat =>{
          this.dataService.providers().cambio.next(cat);
          this.dataService.providers().mensaje.next("se Actualizo con éxito!");
        });
      });
    }else{
     this.dataService.roles().create(this.form.value).subscribe(data =>{
        this.dataService.roles().getAll().subscribe(cate =>{
          this.dataService.providers().cambio.next(cate);
          this.dataService.providers().mensaje.next("Se Registro con éxito!");
        });
      });
    }
    this.dialogRef.close();
  }
}
