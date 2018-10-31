import { ViewChild } from '@angular/core';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DataService } from './../../../../core/data/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-venta-list',
  templateUrl: './venta-list.component.html',
  styleUrls: ['./venta-list.component.scss']
})
export class VentaListComponent implements OnInit {
  lista: any[] = [];
  displayedColumns: string[] = ['cliente.nombre', 'fecha', 'montoTotal', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dataService: DataService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  setData(data) {
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
 
  eliminar(id) {
    this.dataService.compras().delete(id).subscribe(r => {
      this.snackBar.open("Proveedor Eliminado", 'Aviso', { duration: 2000 });
      this.dataService.compras().getAll().subscribe(data => this.setData(data));
    });
  }
}
