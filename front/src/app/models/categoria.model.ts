export class CategoriaModel{
    id_categoria: number;
	categoria: string;
	descripcion: string;
    updated_at: Date;
    
    constructor(){
        this.id_categoria= null;
        this.categoria= null;
        this.descripcion= null;
        this.updated_at= null;
    }
}
