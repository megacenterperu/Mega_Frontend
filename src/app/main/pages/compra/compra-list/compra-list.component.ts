import { DetalleDialogoCompraComponent } from './detalle-dialogo-compra/detalle-dialogo-compra.component';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Compra } from 'src/app/core/model/compra.model';
import { DataService } from 'src/app/core/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ms-compra-list',
  templateUrl: './compra-list.component.html',
  styleUrls: ['./compra-list.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class CompraListComponent implements OnInit {
  lista: any[] = [];
  displayedColumns: string[] = ['proveedor.razonSocial', 'sucursal.nombre', 'fecha','tipocomprobante.descripcion', 'numeroComprobante', 'montoTotal', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.compras().getAllfindByIdSucursal().subscribe(data => this.setData(data));
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
    if(confirm('¿Seguro que quieres Eliminar?')){
      this.dataService.compras().delete(id).subscribe(r => {
        this.snackBar.open("Compra Eliminado", 'Aviso', { duration: 2000 });
        this.dataService.compras().getAllfindByIdSucursal().subscribe(data => this.setData(data));
      });
    }
  }

  verDetalle(id:Compra) {
    const dialogRef = this.dialog.open(DetalleDialogoCompraComponent,{
      width: '820px',
      data:id
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  handleKeyboardEvents(event: KeyboardEvent) {
    const key = event.which || event.keyCode;
    //console.log(key)
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
