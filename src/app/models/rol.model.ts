import { RrModel } from './rr.model';

export class RolModel{
    id_rol: number;
    rol: string;
    descripcion: string;
    can_delete: boolean;
    can_update: boolean;
    can_create: boolean;
    can_delete_user: boolean;
    can_update_user: boolean;
    can_create_user: boolean;
    can_delete_himsel: boolean;
    can_assign_rol: boolean;
    can_change_correo: boolean;
    updated_at: Date;
    rr: RrModel[];
    
    constructor(){
        this.id_rol = null;
        this.rol = null;
        this.descripcion = null;
        this.can_delete = null;
        this.can_update = null;
        this.can_create = null;
        this.can_delete_user = null;
        this.can_update_user = null;
        this.can_create_user = null;
        this.can_delete_himsel = null;
        this.can_assign_rol = null;
        this.can_change_correo = null;
        this.updated_at = null;
        this.rr = [];
    }

}