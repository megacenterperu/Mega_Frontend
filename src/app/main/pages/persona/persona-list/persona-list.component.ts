import { DataService } from './../../../../core/data/data.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ms-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.scss']
})
export class PersonaListComponent implements OnInit {
  lista: any[] = [];
  displayedColumns: string[] = ['nombre', 'numeroDocumento', 'telfMovil', 'direccion', 'email', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.personas().getAll().subscribe(data => {
      console.log(data);
      let r = data;
      this.cantidad = JSON.parse(JSON.stringify(data)).length;
      this.dataSource = new MatTableDataSource(r);
      this.dataSource.sort = this.sort;
    })

  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
