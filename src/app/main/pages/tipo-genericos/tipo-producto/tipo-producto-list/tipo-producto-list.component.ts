import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { DataService } from "../../../../../core/data/data.service";

@Component({
  selector: "ms-tipo-producto-list",
  templateUrl: "./tipo-producto-list.component.html",
  styleUrls: ["./tipo-producto-list.component.scss"]
})
export class TipoProductoListComponent implements OnInit {
  lista: any[] = [];
  displayedColumns: string[] = [  
    "descripcion",
    "acciones"
  ];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService
      .tipoProductos()
      .getAll()
      .subscribe(data => {
        console.log(data);
        let r = data;
        this.cantidad = JSON.parse(JSON.stringify(data)).length;
        this.dataSource = new MatTableDataSource(r);
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
