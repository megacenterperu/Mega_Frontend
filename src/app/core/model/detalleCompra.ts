import { Producto } from './producto.model';
import { Compra } from "./compra.model";

export class DetalleCompra{

    public idDetalleCompra:number;
    public precioItem: number;
    public cantidaditem:number;
    public importeTotalItem:number;
    public compra:Compra;
    public producto:Producto;

}