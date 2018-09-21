import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DataService } from './../../../../core/data/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ms-compra-list',
  templateUrl: './compra-list.component.html',
  styleUrls: ['./compra-list.component.scss']
})
export class CompraListComponent implements OnInit {
  lista: any[] = [];
  displayedColumns: string[] = ['idProveedor', 'nombreComercial', 'razonSocial', 'telefonoEmpresa', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dataService: DataService) { }

  ngOnInit() {


    this.dataService.compras().getAll().subscribe(data => {
      console.log(data);
      let r = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(r);
      this.dataSource.sort = this.sort;
    });

  }
}
