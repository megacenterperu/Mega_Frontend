import { Component, OnInit, ViewChild } from "@angular/core";
import {MatTableDataSource,MatPaginator,MatSort,MatSnackBar} from "@angular/material";
import { DataService } from "../../../../../core/data/data.service";

@Component({
  selector: "ms-categoria-list",
  templateUrl: "./categoria-list.component.html",
  styleUrls: ["./categoria-list.component.scss"]
})
export class CategoriaListComponent implements OnInit {
  lista: any[] = [];
  displayedColumns: string[] = ['idCategoria',"descripcion", "acciones"];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private dataService:DataService, private snackBar:MatSnackBar ) {}

  ngOnInit() {
    this.dataService.categorias().getAll().subscribe(data => this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, "Mensaje", { duration: 3000 });
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
    this.dataService.categorias().delete(id).subscribe(datas => {
        this.snackBar.open("Categoria Eliminado", "Mensaje", {duration: 3000});
        this.dataService.categorias().getAll().subscribe(data => this.setData(data));
      });
    }
  }
}
