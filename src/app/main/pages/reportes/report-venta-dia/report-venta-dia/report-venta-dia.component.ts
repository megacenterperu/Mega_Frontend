import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/core/data/data.service';
import { Chart } from 'chart.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'ms-report-venta-dia',
  templateUrl: './report-venta-dia.component.html',
  styleUrls: ['./report-venta-dia.component.scss']
})
export class ReportVentaDiaComponent implements OnInit {

  chart: any;
  tipo: string;
  pdfSrc: string = '';

  selectedFiles: FileList;
  currentFileUpload: File;

  labelFile: string;

  imagenData: any;
  imagenEstado: boolean = false;   

  form: FormGroup;
  maxFecha: Date = new Date();

  constructor(private dataService: DataService, private sanitization: DomSanitizer, private formBuilder: FormBuilder, private snackBar:MatSnackBar) { }

  ngOnInit() {
    var tzoffset = (this.maxFecha).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
    this.form = this.formBuilder.group({
      fechaConsulta: [ localISOTime, Validators.compose([Validators.required])],
      fechaSgte: [ localISOTime, Validators.compose([Validators.required])]   
    }); 
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Mensaje', { duration: 3000 });
    }); 

    this.tipo = "line";
    this.dibujar();
  }

  dibujar() {
    if (this.form.valid){
      this.dataService.ventas().getAllResumenVentaDia(this.form.value).subscribe(data => {
        //console.log(data);
        let MontoTatal = data.map(res => res.monto);
        //let cantidadN = data.map(res => res.monto + 1);
        //let cantidadA = data.map(res => res.monto + 2);
        let fechas = data.map(res => res.fecha);
        this.chart = new Chart('canvas', {
          type: this.tipo,
          data: {
            labels: fechas,
            datasets: [
              {
                label: 'Monto Tatal',
                data: MontoTatal,
                borderColor: "#3cba9f",
                fill: true,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.9)',
                  'rgba(54, 162, 235, 0.9)',
                  'rgba(255, 206, 86, 0.9)',
                  'rgba(75, 192, 192, 0.9)',
                  'rgba(153, 102, 0, 0.9)',
                  'rgba(255, 159, 64, 0.9)',
                  'rgba(0, 255, 255, 0.9)',
                  'rgba(124,252,0, 0.9)',
                  'rgba(255,105,180, 0.9)',
                ],
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });
      });
    }else{
      this.dataService.providers().mensaje.next('Ingrese el campo fecha inicio y final')
    }
  }

  cambiar(tipo: string) {
    this.tipo = tipo;
    if (this.chart) {
      this.chart.destroy();
    }
    this.dibujar();
  }

  generarReporte(){
    this.dataService.proformas().generarReporte().subscribe(data => {
      let reader = new FileReader();
      reader.onload = (e:any)=>{
     //   console.log(e.target.result);
        this.pdfSrc = e.target.result; 
      }
      reader.readAsArrayBuffer(data);
    });   
  }

  descargarReporte(){
    this.dataService.proformas().descargarReporte();
    //hola
  }

  Print(){
    this.dataService.proformas().generarReporte().subscribe((response) => {
      var blob = new Blob([response], {type: 'application/pdf'});
      const blobUrl = URL.createObjectURL(blob);
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        document.body.appendChild(iframe);
        iframe.contentWindow.print();
    });
  }

}
