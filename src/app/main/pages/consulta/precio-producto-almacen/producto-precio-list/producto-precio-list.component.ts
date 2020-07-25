import { USER_DATA } from 'src/config/auth.config';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'ms-producto-precio-list',
  templateUrl: './producto-precio-list.component.html',
  styleUrls: ['./producto-precio-list.component.scss']
})
export class ProductoPrecioListComponent implements OnInit {

  form: FormGroup;
  total: number = 0;
  lista: any[]=[];
  displayedColumns: string[] = ["codProducto","nombreProducto", "marcaProducto",'stock','precioCompra','importeCompra'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService:DataService,private formBuilder: FormBuilder, private snackBar:MatSnackBar) { }

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    this.dataService.productos().listPrecioProductoAlamacen(user.idSucursal).subscribe(data => this.setData(data));
  }

  setData(data) {
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort;
    this.total =this.getTotalCost(r);
  }

  getTotalCost(data) {
    if (data) {
      return data.map(t => t.importeCompra).reduce((total, montos) => total + montos, 0)|0;
    } else {
      return 0;
    }
  }

}
