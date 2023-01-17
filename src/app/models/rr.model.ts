export class RrModel {
    id_rol_ruta: number;           
    id_rol: number;
    rol: string;                
    id_ruta: number;
    ruta: string;               
    updated_at: Date;
    
    constructor(){
        this.id_rol_ruta = null;
        this.id_rol = null;
        this.rol = null;     
        this.ruta = null;     
        this.id_ruta = null;    
        this.updated_at = null;
    }
}
