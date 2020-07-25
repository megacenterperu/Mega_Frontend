import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/core/data/data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'ms-report-venta-mes',
  templateUrl: './report-venta-mes.component.html',
  styleUrls: ['./report-venta-mes.component.scss']
})
export class ReportVentaMesComponent implements OnInit {

  chart: any;
  tipo: string;
  pdfSrc: string = '';

  selectedFiles: FileList;
  currentFileUpload: File;

  labelFile: string;

  imagenData: any;
  imagenEstado: boolean = false; 
  

  constructor(private dataService: DataService, private sanitization: DomSanitizer) { }

  ngOnInit() {
    this.tipo = "line";
    this.dibujar();
  }

  dibujar() {
    this.dataService.ventas().getAllResumenVentaMes().subscribe(data => {
      //console.log(data);
      let MontoTatal = data.map(res => res.montototal);
      //let cantidadN = data.map(res => res.monto + 1);
      //let cantidadA = data.map(res => res.monto + 2);
      let fechas = data.map(res => res.mes);

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
