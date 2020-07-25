import { TOKEN_NAME, USER_DATA } from 'src/config/auth.config';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialogRef } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';
import * as decode from 'jwt-decode';

@Component({
  selector: 'ms-producto-venta-dialog',
  templateUrl: './producto-venta-dialog.component.html',
  styleUrls: ['./producto-venta-dialog.component.scss']
})
export class ProductoVentaDialogComponent implements OnInit {

  SelectFocus: string;
  
  codProductoFilter = new FormControl();
  productoFilter = new FormControl();
  marcaFilter = new FormControl();

  lista: any[] = [];
  displayedColumns: string[] = ['codProducto', 'unidadMedida.codUnidadmedida', 'nombre', 'marcaProducto','laboratorio', 'tipoAfectacionIgv.descripcion', 'stock', 'cantidad', 'precioVenta', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  filteredValues = { codProducto: '', nombre: '', marcaProducto: '', colorProducto: '', topFilter: false };
  tienePermiso: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<ProductoVentaDialogComponent>, private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    this.hasPermision();
    this.dataService.productos().findByIdSucursal(user.idSucursal).subscribe(data => this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 4000 });
    });
  }

  hasPermision() {
    let tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
    const decodedToken = decode(tk.access_token);
    let roles = decodedToken.authorities;
    if (roles == "USER") {
      this.tienePermiso = false;
    } else {
      this.tienePermiso = true;
    }
  }

  setData(data) {
    if (data) {
      data.forEach(element => { element.cantidad = 1; });
      let r = data;
      this.cantidad = JSON.parse(JSON.stringify(data)).length;
      this.dataSource = new MatTableDataSource(r);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  agregar(data) {
    const stock = data.stock;
    const cantidadItem = data.cantidad;
    if (cantidadItem > stock) {
      this.dataService.providers().mensaje.next("NO TIENE STOCK SUFICIENTE");
    } else {
      this.dataService.productos().findById(data.idProducto).subscribe(r => {
        let detalle = {
          precio: data.precioVenta,
          cantidad: data.cantidad,
          importeTotalItem: data.precioVenta * data.cantidad,
          producto: r
        }
        this.dataService.providers().dialogo.next(detalle);
      });
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  selectRow(event) {
    this.SelectFocus = event.idProducto;
  }
}
