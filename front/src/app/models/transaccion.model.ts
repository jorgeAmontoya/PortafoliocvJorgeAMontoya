import { BpModel } from './bp.model';
import { PuModel } from './pu.model';

export class TransaccionModel {
    id_transaccion_inv: number;
    consecutivo: string;
    fecha: Date;
    cliente: string;
    cantidad: number;
    referencia_destino: string;
    total_descuento: string;
    iva: string;
    updated_at: Date;
    documento_destino: string;
    numero_documento: string;
    id_producto: number;
    id_bodega_producto: number;
    id_bodega: number;
    id_bodega_destino: number;
    id_tipo_transaccion: number;
    id_concepto_pago: number;
    id_centro_costos: number;
    codigo_bodega: number | undefined;
    codigo_bodega_destino: number | undefined;

    bp: BpModel[];
    pu: PuModel[];

    constructor() {
        this.id_transaccion_inv = null;
        this.consecutivo = null;
        this.fecha = null;
        this.cliente = null;
        this.cantidad = null;
        this.documento_destino = null;
        this.numero_documento = null;

        this.referencia_destino = null;
        this.total_descuento = null;
        this.iva = null;
        this.updated_at = null;

        this.id_producto = null;
        this.id_bodega_producto = null;
        this.id_tipo_transaccion = null;
        this.id_concepto_pago = null;
        this.id_centro_costos = null;
        this.bp = [];
        this.pu = [];
    }

}