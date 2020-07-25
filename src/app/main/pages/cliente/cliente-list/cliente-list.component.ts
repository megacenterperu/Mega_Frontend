import { DataService } from 'src/app/core/data/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';

@Component({
  selector: 'ms-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {

  lista: any[] = [];
  idSucursal;
  displayedColumns: string[] = ['persona.nombre', 'persona.numeroDocumento', 'persona.direccion', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataService.clientes().getAllfindByIdSucursal().subscribe(data =>{
      this.setData(data)
      this.dataSource.filterPredicate=(dato, filter: string)=>{
        const dataStr = dato.persona.nombre.toLowerCase() + dato.persona.numeroDocumento.toLowerCase();
        return dataStr.indexOf(filter) !== -1;
      };
    });
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Mensaje', { duration: 3000 });
    });
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
    if(confirm('¿Seguro que quieres Eliminar?')){
      this.dataService.clientes().delete(id).subscribe(r => {
        this.snackBar.open("Cliente Eliminado", 'Mensaje', { duration: 3000 });
          this.dataService.clientes().getAllfindByIdSucursal().subscribe(data => this.setData(data));
      });
    }
  }
}
