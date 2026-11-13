import { AppDataSource } from "../../config/data-source.js";
import { HistorialRastreo } from "../entity/HistorialRastreo.js";

export class HistorialRastreoRepository {
    private repository = AppDataSource.getRepository(HistorialRastreo);

    // Al insertar se dispara el trigger after_insert_historial_rastreo
    async create(rastreoData: Partial<HistorialRastreo>): Promise<HistorialRastreo> {
        const rastreo = this.repository.create(rastreoData);
        return await this.repository.save(rastreo);
    }
}

export const historialRastreoRepository = new HistorialRastreoRepository();
