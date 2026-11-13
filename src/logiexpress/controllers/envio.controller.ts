import { Request, Response } from "express";
import { envioRepository } from "../repository/EnvioRepository.js";
import { historialRastreoRepository } from "../repository/HistorialRastreoRepository.js";


export const createEnvio = async (req: Request, res: Response) => {
    const { idCliente, idDireccionOrigen, idDireccionDestino, nombreDestinatario, costoTotal, paquetes } = req.body;

    if (!idCliente || !idDireccionOrigen || !idDireccionDestino || !nombreDestinatario || costoTotal === undefined) {
        return res.status(400).json({ message: "Faltan datos del envío" });
    }
    if (!Array.isArray(paquetes) || paquetes.length === 0) {
        return res.status(400).json({ message: "El envío debe traer al menos un paquete" });
    }

    try {
        const envio = await envioRepository.create({
            idCliente,
            idDireccionOrigen,
            idDireccionDestino,
            nombreDestinatario,
            costoTotal,
            paquetes,
        });
        res.status(201).json(envio);
    } catch (error: any) {
        res.status(400).json({ message: "No se pudo registrar el envío", error: error.message });
    }
};

// Endpoint 2: PUT /api/envios/:id/costo
// Cambia el costo total -> MySQL ejecuta el trigger after_update_envio_costo (auditoría)
export const updateCostoEnvio = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { costoTotal } = req.body;

    if (costoTotal === undefined) {
        return res.status(400).json({ message: "Falta el costoTotal" });
    }

    const existe = await envioRepository.findById(id);
    if (!existe) {
        return res.status(404).json({ message: "Envío no encontrado" });
    }

    try {
        // La respuesta incluye "auditorias" para ver el registro que guardó el trigger
        const envio = await envioRepository.updateCosto(id, costoTotal);
        res.json(envio);
    } catch (error: any) {
        res.status(400).json({ message: "No se pudo actualizar el costo", error: error.message });
    }
};

// Endpoint 4: POST /api/envios/:id/rastreo
// Agrega un registro de rastreo -> si es ENTREGADO, el trigger after_insert_historial_rastreo
// cambia el estado global del envío
export const createRastreo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { ubicacionActual, estadoEvento, observaciones } = req.body;

    if (!ubicacionActual || !estadoEvento) {
        return res.status(400).json({ message: "Faltan ubicacionActual o estadoEvento" });
    }

    const existe = await envioRepository.findById(id);
    if (!existe) {
        return res.status(404).json({ message: "Envío no encontrado" });
    }

    try {
        const rastreo = await historialRastreoRepository.create({
            idEnvio: id,
            ubicacionActual,
            estadoEvento,
            observaciones,
        });

        // Se vuelve a consultar el envío para ver el estado que dejó el trigger
        const envio = await envioRepository.findById(id);
        res.status(201).json({ rastreo, estadoGlobalEnvio: envio?.estadoGlobal });
    } catch (error: any) {
        res.status(400).json({ message: "No se pudo registrar el rastreo", error: error.message });
    }
};

// Endpoint 5: GET /api/envios
// Envíos activos con su cliente y paquetes
export const getEnviosActivos = async (req: Request, res: Response) => {
    const envios = await envioRepository.findActivos();
    res.json(envios);
};
