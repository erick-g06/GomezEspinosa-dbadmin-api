import { Request, Response } from "express";
import { clienteRepository } from "../repository/ClienteRepository.js";
import { envioRepository } from "../repository/EnvioRepository.js";


export const getEnviosDeCliente = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const cliente = await clienteRepository.findById(id);
    if (!cliente) {
        return res.status(404).json({ message: "Cliente no encontrado" });
    }

    const envios = await envioRepository.findByCliente(id);
    res.json({ cliente, envios });
};
