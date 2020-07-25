import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data/data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'ms-producto-mas-vendido',
  templateUrl: './producto-mas-vendido.component.html',
  styleUrls: ['./producto-mas-vendido.component.scss']
})
export class ProductoMasVendidoComponent implements OnInit {

  chart: any;
  tipo: string;
  pdfSrc: string = '';

  selectedFiles: FileList;
  currentFileUpload: File;

  labelFile: string;

  imagenData: any;
  imagenEstado: boolean = false; 

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.tipo = "line";
    this.dibujar();
  }

  dibujar() {
    this.dataService.ventas().getAllProductoMasVendido().subscribe(data => {
      //console.log(data);
      let MontoTatal = data.map(res => res.cantidad);
      //let cantidadN = data.map(res => res.monto + 1);
      //let cantidadA = data.map(res => res.monto + 2);
      let fechas = data.map(res => res.nomProducto);

      this.chart = new Chart('canvas', {
        type: this.tipo,
        data: {
          labels: fechas,
          datasets: [
            {
              label: 'Veces vendidos',
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
      delete this.chart;
    }
    this.dibujar();
  }

}
