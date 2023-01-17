export class BpModel {
    id_bodega_producto: number;
    id_producto: number;
    producto: string;
    id_bodega: number;
    bodega: string;
    cantidad: number;
    minstock: number;
    estado: boolean;
    sector: number;
    ubicacion: string;
    updated_at: Date;

    constructor() {
        this.id_bodega_producto = null;
        this.id_producto = null;
        this.producto = null;
        this.id_bodega = null;
        this.bodega = null;
        this.cantidad = null;
        this.minstock = null;
        this.estado = null;
        this.sector = null;
        this.ubicacion = null;
        this.updated_at = null;
    }
}
