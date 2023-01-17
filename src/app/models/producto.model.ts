import { BpModel } from './bp.model';
import { PuModel } from './pu.model';
import { CategoriaModel } from './categoria.model';
export class ProductoModel {
    id_producto: number;
    codigo: string;
    producto: string;
    descripcion: string;
    preciov: number;
    precioc: number;
    datasheet: string;
    updated_at: Date;
    id_categoria: number;
    moneda: string;
    bp: BpModel[];
    pu: PuModel[];
    categoria: CategoriaModel[];

    constructor() {
        this.id_producto = null;
        this.codigo = null;
        this.producto = null;
        this.descripcion = null;
        this.preciov = null;
        this.precioc = null;
        this.datasheet = null;
        this.updated_at = null;
        this.id_categoria = null;
        this.moneda = null;
        this.bp = [];
        this.pu = [];
        this.categoria = [];
    }

}
