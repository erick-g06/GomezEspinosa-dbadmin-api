import { Request, Response } from "express";
import { almacenRepository } from "../repository/AlmacenRepository.js";
import { envioRepository } from "../repository/EnvioRepository.js";
import { paqueteRepository } from "../repository/PaqueteRepository.js";


export const createPaqueteEnAlmacen = async (req: Request, res: Response) => {
    const idAlmacen = Number(req.params.id);
    const { idEnvio, peso, largo, ancho, alto, contenido } = req.body;

    if (!idEnvio || !peso || !largo || !ancho || !alto || !contenido) {
        return res.status(400).json({ message: "Faltan datos del paquete" });
    }

    const almacen = await almacenRepository.findById(idAlmacen);
    if (!almacen) {
        return res.status(404).json({ message: "Almacén no encontrado" });
    }

    const envio = await envioRepository.findById(idEnvio);
    if (!envio) {
        return res.status(404).json({ message: "Envío no encontrado" });
    }

    try {
        const paquete = await paqueteRepository.create({
            idEnvio,
            idAlmacen,
            peso,
            largo,
            ancho,
            alto,
            contenido,
        });
        res.status(201).json(paquete);
    } catch (error: any) {
        //el trigger cuando el almacén ya no tiene lugar
        if (error.driverError?.sqlState === "45000") {
            return res.status(400).json({ message: error.driverError.sqlMessage });
        }
        res.status(500).json({ message: "No se pudo agregar el paquete", error: error.message });
    }
};
