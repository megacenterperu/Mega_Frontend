
import { Susursal } from './sucursal.model';
import { Proveedor } from './proveedor.model';


export class Compra{

    public idCompra:number;
    public fecha :string;
    public montoTotal:number;
    public guiaRemision:number;    
    public proveedor:Proveedor;
    public susursal: Susursal;
   


}
