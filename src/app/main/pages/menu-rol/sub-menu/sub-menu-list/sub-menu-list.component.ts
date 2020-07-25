import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'ms-sub-menu-list',
  templateUrl: './sub-menu-list.component.html',
  styleUrls: ['./sub-menu-list.component.scss']
})
export class SubMenuListComponent implements OnInit {

  lista: any[] = [];
  displayedColumns = ['id','title','type','icon','url', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  pageIndex: number = 0;
  pageSize: number = 5;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService:DataService, private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.dataService.subMenus().menuEdicionCambio.subscribe(data => {
      this.lista = JSON.parse(JSON.stringify(data)).content;
      this.dataSource = new MatTableDataSource(this.lista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;   
    });
    this.dataService.subMenus().getAllPageable(this.pageIndex,this.pageSize).subscribe(data => {
      let r = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(r);
      this.dataSource.sort = this.sort;
    });

    this.dataService.providers().mensaje.subscribe(data => {        
      this.snackBar.open(data, 'Aviso', { duration: 3000 });
    }); 
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  mostrarMas(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.dataService.subMenus().getAllPageable(e.pageIndex, e.pageSize).subscribe(data => {
      let signos = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(signos);
      this.dataSource.sort = this.sort;
    });
  }

}
