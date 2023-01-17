import { PuModel } from './pu.model';
import { RolModel } from './rol.model';
import { BodegaModel } from './bodega.model';

export class UsuarioModel {
    id_usuario: number;
	nombre: string;
	correo: string;
	contrasena: string;
	updated_at: Date;
	id_rol: number;
    id_bodega: number;
    pu: PuModel[];
    rol: RolModel[];
    bodega: BodegaModel[];
    
    constructor() {
        this.id_usuario = null;
    	this.nombre = null;
    	this.correo = null;
    	this.contrasena = null;
    	this.updated_at = null;
    	this.id_rol = null;
        this.id_bodega = null;
        this.pu = [];
        this.rol = [];
        this.bodega = [];
    }
}