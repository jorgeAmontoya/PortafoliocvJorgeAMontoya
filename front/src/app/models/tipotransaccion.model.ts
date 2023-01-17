export class TipoTransaccionModel {
    id_tipo_transaccion: number;
    transaccion: number;
    codigo_concepto: string;
    definicion: string;
    updated_at: Date;

    constructor() {
        this.id_tipo_transaccion = null;
        this.transaccion = null;
        this.codigo_concepto = null;
        this.definicion = null;
        this.updated_at = null;
    }
}
