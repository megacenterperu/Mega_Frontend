import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'ms-report-list-proforma',
  templateUrl: './report-list-proforma.component.html',
  styleUrls: ['./report-list-proforma.component.scss']
})
export class ReportListProformaComponent implements OnInit {

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

  }

  generarReporte(){
    this.dataService.proformas().generarReporte().subscribe(data => {
      let reader = new FileReader();
      reader.onload = (e:any)=>{
        console.log(e.target.result);
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
