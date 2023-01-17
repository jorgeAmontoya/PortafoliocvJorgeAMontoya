export class ConceptoPagoModel {
    id_concepto_pago: number;
    concepto_pago: string;
    definicion_cp: string;
    updated_at: Date;

    constructor() {
        this.id_concepto_pago = null;
        this.concepto_pago = null;
        this.definicion_cp = null;
        this.updated_at = null;
    }
}
