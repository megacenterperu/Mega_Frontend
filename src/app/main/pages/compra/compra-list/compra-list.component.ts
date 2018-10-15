import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from './../../../../core/data/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ms-compra-list',
  templateUrl: './compra-list.component.html',
  styleUrls: ['./compra-list.component.scss']
})
export class CompraListComponent implements OnInit {
  lista: any[] = [];
  displayedColumns: string[] = ['proveedor.nombreComercial', 'sucursal.nombre', 'fecha', 'montoTotal', 'guiaRemision', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dataService: DataService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.dataService.compras().getAll().subscribe(data => this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

  }

  setData(data) {
    if (data) {
      let r = data;
      this.cantidad = JSON.parse(JSON.stringify(data)).length;
      this.dataSource = new MatTableDataSource(r);
      this.dataSource.sort = this.sort;
    }
  }
}
