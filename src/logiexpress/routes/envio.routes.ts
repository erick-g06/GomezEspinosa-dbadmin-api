import { Router } from "express";
import {
    createEnvio,
    updateCostoEnvio,
    createRastreo,
    getEnviosActivos,
} from "../controllers/envio.controller.js";

const router = Router();

router.post("/", createEnvio);                  
router.put("/:id/costo", updateCostoEnvio);     
router.post("/:id/rastreo", createRastreo);    
router.get("/", getEnviosActivos);              

export default router;
