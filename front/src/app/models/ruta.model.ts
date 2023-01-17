import { RrModel } from './rr.model';
export class RutaModel{
    id_ruta: number;
	ruta: string;
    descripcion: string;
    rr: RrModel[];

    constructor(){
        this.id_ruta = null;
    	this.ruta = null;
        this.descripcion = null;
        this.rr = [];
    }
}