export class PuModel {
    id_producto_usuario: number;
    id_bodega_producto: number;
    id_usuario: number;   
    producto: string;
    nombre: string;
    correo: string;
	notificacion: string; 
    updated_at: Date;
    
    constructor(){
        this.id_producto_usuario = null;
        this.id_bodega_producto = null;
        this.id_usuario = null;
        this.producto = null;
        this.nombre = null;
        this.correo = null;
    	this.notificacion = null; 
        this.updated_at = null;
    }

}
