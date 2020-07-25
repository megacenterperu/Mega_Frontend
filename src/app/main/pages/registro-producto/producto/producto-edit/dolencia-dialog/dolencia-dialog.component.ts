import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/data/data.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'ms-dolencia-dialog',
  templateUrl: './dolencia-dialog.component.html',
  styleUrls: ['./dolencia-dialog.component.scss']
})
export class DolenciaDialogComponent implements OnInit {

  form: FormGroup;
  
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DolenciaDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
    
  ) { }

  ngOnInit() {
    this.initFormBuilder();
  }

  initFormBuilder(){
    this.form=this.formBuilder.group({
      idDolenciaProducto:[null],
      dolenciaPropiedad:[null,Validators.compose([Validators.required])],
      descripcion:[null,Validators.compose([Validators.required])]
    });
  }

  operar(){
    this.dataService.dolenciaProductos().create(this.form.value).subscribe(data =>{
      this.dataService.providers().dialogo.next(data);
      //console.log(data);
    });
    this.dialogRef.close();
  }

}
