export class UpdateTransaccionViewModel {
    id_transaccion_inv: number;
    //consecutivo: string;
    nombre_producto: string;
    fecha: Date;
    cliente: string;
    cantidad: number;
    documento_destino: string;
    numero_documento: string;
    referencia_destino: string;
    total_descuento: string;
    iva: string;
    //updated_at: Date;
    definicion_tipo:string;
    producto: string;
    precio: number;
    //id_bodega_producto: number;
    bodega: string;
    bodega_destino: string;
    tipo_transaccion: number;
    codigo_concepto: string;
    concepto_pago: string;
    centro_costos: string;
    id_concepto_pago:number;

    constructor() {
        this.id_transaccion_inv = null;
        //this.consecutivo = null;
        this.nombre_producto = null;
        this.fecha = null;
        this.cliente = null;
        this.cantidad = null;
        this.documento_destino = null;
        this.numero_documento = null;
        this.referencia_destino = null;
        this.total_descuento = null;
        this.iva = null;
        this.definicion_tipo =null;
        //this.updated_at = null;

        this.producto = null;
        this.precio = null;
        //this.id_bodega_producto = null;
        this.bodega= null;
        this.bodega_destino = null;
        this.tipo_transaccion = null;
        this.codigo_concepto = null;
        this.concepto_pago = null;
        this.centro_costos = null;
        this.id_concepto_pago= null;
    }

}