import { USER_DATA } from 'src/config/auth.config';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { DialogConfirmationComponent } from '../../dialog-confirmation/dialog-confirmation.component';
import { DataService } from 'src/app/core/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ms-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class ProductoListComponent implements OnInit {

  dialogRef: MatDialogRef<DialogConfirmationComponent>;
  SelectFocus: string;
  lista: any[] = [];
  displayedColumns: string[] = ["codProducto", "nombre", "stock", "unidadMedida.codUnidadmedida", "precioCompra", "precioVenta", "fechaVencimiento", "area", "acciones"];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    this.dataService.productos().findByIdSucursal(user.idSucursal).subscribe(data => {
      this.setData(data)
      this.dataSource.filterPredicate = (dato, filter: string) => {
        const dataStr = dato.codProducto.toLowerCase() + dato.nombre.toLowerCase() + dato.dolenciaProducto.descripcion.toLowerCase() + dato.area.toLowerCase() + dato.tipoProducto.descripcion.toLowerCase();
        return dataStr.indexOf(filter) !== -1;
      };
    });
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, "Mensaje", { duration: 3000 });
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

  /* setData(data) {
     let r = data;
     this.cantidad = JSON.parse(JSON.stringify(data)).length;
     this.dataSource = new MatTableDataSource(r);
     this.dataSource.filterPredicate = this.customFilterPredicate();
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   }
 
   applyFilter(filterValue: string) {
     let filter = {
       codProducto: filterValue.trim().toLowerCase(),
       nombre: filterValue.trim().toLowerCase(),
       marcaProducto: filterValue.trim().toLowerCase(),
       topFilter: true
     }
     this.dataSource.filter = JSON.stringify(filter)
   }
 
   customFilterPredicate() {
     const myFilterPredicate = function (data: any, filter: string): boolean {
       let searchString = JSON.parse(filter);
       let nameFound = data.codProducto.toString().trim().toLowerCase().indexOf(searchString.codProducto.toLowerCase()) !== -1
       let positionFound = data.nombre.toString().trim().toLowerCase().indexOf(searchString.nombre.toLowerCase()) !== -1
       let marcaProductoFound = data.marcaProducto.toString().trim().toLowerCase().indexOf(searchString.marcaProducto.toLowerCase()) !== -1;
       if (searchString.topFilter) {
         return nameFound || positionFound || marcaProductoFound
       } else {
         return nameFound && positionFound && marcaProductoFound
       }
     }
     return myFilterPredicate;
   }*/

  eliminar(id) {
    this.dialogRef = this.dialog.open(DialogConfirmationComponent, {
      disableClose: false
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.productos().delete(id).subscribe(r => {
          this.snackBar.open("Producto Eliminado", 'Mensaje', { duration: 3000 });
          this.dataService.productos().getAll().subscribe(data => this.setData(data));
        });
      }
      this.dialogRef = null;
    });
  }

  selectRow(event) {
    this.SelectFocus = event.idProducto;
  }

  descargarExcel() {
    this.dataService.productos().getAllExcel().subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'Productos.xls';
      a.click();
      //console.log(url);
      return url;
    });
  }


  getEstado(fecha) {
    let now = new Date();
    let fechaVencimient = new Date(fecha);
    let estado = '';
   
    const nowAllDay = (fechaVencimient.getFullYear() - now.getFullYear()) * 360 + (fechaVencimient.getMonth() - now.getMonth()) * 30 + (fechaVencimient.getDay() - now.getDay());
    if (nowAllDay <= 0) {
      estado = 'MALO';
    } else if (nowAllDay <= 62) {
      estado = 'MEDIO'
    } else {
      estado = 'BUENO';
    }
    return estado;
  }

  handleKeyboardEvents(event: KeyboardEvent) {
    const key = event.which || event.keyCode;
    switch (key) {
      case 112:
        event.preventDefault();
        this.router.navigate(['./nuevo'], { relativeTo: this.route });
        break;

      default:
        break;
    }
  }
}
