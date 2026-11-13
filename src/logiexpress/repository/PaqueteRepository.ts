import { AppDataSource } from "../../config/data-source.js";
import { Paquete } from "../entity/Paquete.js";

export class PaqueteRepository {
    private repository = AppDataSource.getRepository(Paquete);

    // Al insertar se dispara el trigger before_insert_paquete_almacen
    async create(paqueteData: Partial<Paquete>): Promise<Paquete> {
        const paquete = this.repository.create(paqueteData);
        return await this.repository.save(paquete);
    }
}

export const paqueteRepository = new PaqueteRepository();
