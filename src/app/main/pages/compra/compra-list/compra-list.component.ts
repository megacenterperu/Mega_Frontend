import { DetalleDialogoCompraComponent } from './detalle-dialogo-compra/detalle-dialogo-compra.component';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from './../../../../core/data/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Compra } from 'src/app/core/model/compra.model';

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
  constructor(private dataService: DataService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.compras().getAll().subscribe(data => this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

  }

  setData(data) {
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.paginator = this.paginator;
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

  verDetalle(d: Compra) {
    let dialogRef = this.dialog.open(DetalleDialogoCompraComponent, {
      width: '1000px',
      disableClose: true,
      data: d
    });
  }
}
