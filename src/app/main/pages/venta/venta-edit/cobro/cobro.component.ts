import { Venta } from 'src/app/core/model/venta.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/data/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ms-cobro',
  templateUrl: './cobro.component.html',
  styleUrls: ['./cobro.component.scss']
})
export class CobroComponent implements OnInit {

  montoTotal: number;
  form: FormGroup;
  edicion: boolean = false;

  constructor(private dataService: DataService,private route: ActivatedRoute,private formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<CobroComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
    this.initFormBuilder();
  }

  initFormBuilder(){
    this.form=this.formBuilder.group({
      montoTotal:[{ value: this.data, disabled: true },Validators.compose([Validators.required])],
      pagoMontoEfectivo:[null,Validators.compose([Validators.required])],
      montoVuelto:[null,Validators.compose([Validators.required])],
      montoVueltoT:[{ value: '', disabled: true },Validators.compose([Validators.required])]
    });
    this.form.get("pagoMontoEfectivo").valueChanges.subscribe(value => {     
      const montoTotal = this.form.get('montoTotal').value || 0;
      if(montoTotal<=parseFloat(value)){
        const MontoCambio = parseFloat(value)-parseFloat(montoTotal);
        this.form.patchValue({
          montoVuelto: +MontoCambio.toFixed(2),
          montoVueltoT: +MontoCambio.toFixed(2)
        }); 
      }else{
        this.form.patchValue({montoVuelto: null}); 
      }     
    });
  }

}
