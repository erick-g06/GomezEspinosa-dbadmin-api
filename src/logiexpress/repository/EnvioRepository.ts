import { AppDataSource } from "../../config/data-source.js";
import { Envio } from "../entity/Envio.js";

export class EnvioRepository {
    private repository = AppDataSource.getRepository(Envio);

    async findById(id: number): Promise<Envio | null> {
        return await this.repository.findOne({
            where: { idEnvio: id },
            relations: { paquetes: true, auditorias: true },
        });
    }

    // Envíos activos (REGISTRADO o EN_TRANSITO) con su cliente y paquetes, usando QueryBuilder
    async findActivos(): Promise<Envio[]> {
        return await this.repository
            .createQueryBuilder("envio")
            .leftJoinAndSelect("envio.cliente", "cliente")
            .leftJoinAndSelect("envio.paquetes", "paquetes")
            .where("envio.estado_global IN (:...estados)", { estados: ["REGISTRADO", "EN_TRANSITO"] })
            .orderBy("envio.fecha_registro", "DESC")
            .getMany();
    }

    // Historial de envíos de un cliente
    async findByCliente(idCliente: number): Promise<Envio[]> {
        return await this.repository.find({
            where: { idCliente },
            relations: { paquetes: true, direccionOrigen: true, direccionDestino: true },
            order: { fechaRegistro: "DESC" },
        });
    }

    async create(envioData: Partial<Envio>): Promise<Envio> {
        const envio = this.repository.create(envioData);
        return await this.repository.save(envio);
    }

    // Al cambiar el costo se dispara el trigger after_update_envio_costo
    async updateCosto(id: number, costoTotal: number): Promise<Envio | null> {
        await this.repository.update(id, { costoTotal });
        return await this.findById(id);
    }
}

export const envioRepository = new EnvioRepository();
