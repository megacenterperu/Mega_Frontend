import { ViewChild } from '@angular/core';
import { MatSort, MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DataService } from 'src/app/core/data/data.service';
import { RolEditComponent } from '../rol-edit/rol-edit.component';
import { Rol } from 'src/app/core/model/rol';

@Component({
  selector: 'ms-rol-list',
  templateUrl: './rol-list.component.html',
  styleUrls: ['./rol-list.component.scss']
})
export class RolListComponent implements OnInit {

  roles:Rol;
  lista: any[] = [];
  displayedColumns: string[] = ['idRol',"nombre","descripcion", "acciones"];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private dataService:DataService, private snackBar:MatSnackBar,
    private dialog: MatDialog ) { }

  ngOnInit() {
    this.dataService.roles().getAll().subscribe(data => this.setData(data));
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

  openDialog(id:any): void{
    let roles= id != null ? id:new Rol();
    const dialogRef = this.dialog.open(RolEditComponent,{
      data:roles
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  eliminar(id) {
    if(confirm('¿Seguro que quieres Eliminar?')){
    this.dataService.roles().delete(id).subscribe(datas => {
        this.snackBar.open("Rol Eliminado", "Mensaje", {duration: 3000});
        this.dataService.categorias().getAll().subscribe(data => this.setData(data));
      });
    }
  }

}
