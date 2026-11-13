import { AppDataSource } from "../../config/data-source.js";
import { Almacen } from "../entity/Almacen.js";

export class AlmacenRepository {
    private repository = AppDataSource.getRepository(Almacen);

    async findById(id: number): Promise<Almacen | null> {
        return await this.repository.findOneBy({ idAlmacen: id });
    }
}

export const almacenRepository = new AlmacenRepository();
