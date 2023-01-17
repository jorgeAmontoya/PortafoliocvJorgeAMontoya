import { BpModel } from './bp.model';
export class BodegaModel {
    id_bodega: number;
    bodega: string;
    descripcion: string;
    updated_at: Date;
    bp: BpModel[];
    codigo_bodega: string |undefined ;

    constructor() {
        this.id_bodega = null;
        this.bodega = null;
        this.descripcion = null;
        this.updated_at = null;
        this.bp = [];
    }
}
