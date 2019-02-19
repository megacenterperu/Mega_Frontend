import { Cliente } from "./cliente.model";

export class Proforma{
    public idProforma:number;
    public numeroProforma:string;
    public acuenta:number;
    public saldo:number;
    public total:number;
    public cliente:Cliente;
    public estadoProforma:string;
}