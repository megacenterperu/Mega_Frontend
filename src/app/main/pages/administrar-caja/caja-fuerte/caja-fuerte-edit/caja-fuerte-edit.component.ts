import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { caja } from 'src/app/core/model/caja.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ms-caja-fuerte-edit',
  templateUrl: './caja-fuerte-edit.component.html',
  styleUrls: ['./caja-fuerte-edit.component.scss'],
  providers:[DatePipe]
})
export class CajaFuerteEditComponent implements OnInit {
  id: number;
  form: FormGroup;
  edicion: boolean = false;
 
  fecha: Date = new Date();

  constructor(private dataService: DataService,private route: ActivatedRoute,private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CajaFuerteEditComponent>,@Inject(MAT_DIALOG_DATA) public data:caja,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.initFormBuilder();
    this.id=this.data.idCaja;  
    this.loadDataFrom();    
  }

  initFormBuilder(){
    var tzoffset = (this.fecha).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
    this.form=this.formBuilder.group({
      idCajaFuerte:[null],
      caja: [null,Validators.compose([Validators.required])],
      fechaCierre:[localISOTime,Validators.compose([Validators.required])],
      montoTotalDia:[null,Validators.compose([Validators.required])],
      montoInicioTurno:[null,Validators.compose([Validators.required])],
      montoTotalCaja:[null,Validators.compose([Validators.required])],
      fechaInicioTurno:[new Date(),Validators.compose([Validators.required])],
    });
    this.form.get("montoInicioTurno").valueChanges.subscribe(value => {     
      const ImporteTotaldia = this.form.get('montoTotalDia').value || 0;
      const MontoCaja = parseFloat(ImporteTotaldia) - parseFloat(value);
      this.form.patchValue({
        montoTotalCaja: +MontoCaja.toFixed(2)
      });      
    });
    this.form.get("montoTotalDia").valueChanges.subscribe(value => {     
      const montoInicioTurno = this.form.get('montoInicioTurno').value || 0;
      const MontoCaja = parseFloat(value)- parseFloat(montoInicioTurno) ;
      this.form.patchValue({
        montoTotalCaja: +MontoCaja.toFixed(2)
      });      
    });
  }

  private loadDataFrom(){    
      this.dataService.cajas().findById(this.id).subscribe(data =>{
        this.form.patchValue(data); 
        this.form.controls.caja.patchValue(data)   ;
        this.form.patchValue({
          montoTotalCaja: +(data.montoTotalDia-data.montoInicioTurno).toFixed(2)
        });    
      });    
  }

  operar(){
    const fechaCierre = this.datePipe.transform(this.form.value.fechaCierre, 'yyyy-MM-dd');
    const fechaInicioTurno = this.datePipe.transform(this.form.value.fechaInicioTurno, 'yyyy-MM-dd');
    if(fechaCierre===fechaInicioTurno){
      this.dataService.providers().mensaje.next("LA FECHA DE INICIO DE TURNO ES IGUAL A LA FECHA DE CIERRE");
    }else if(this.data !=null && this.data.idCaja>0){
      this.dataService.cajaFuertes().create(this.form.value).subscribe(data =>{
        this.dataService.providers().mensaje.next("Se Registro con éxito!")
        },error => {
        this.dataService.providers().mensaje.next('YA ESTA CERRADO LA CAJA QUE ENTENTA CERRAR')
        });
        this.dialogRef.close();
    }
  }
  
}
