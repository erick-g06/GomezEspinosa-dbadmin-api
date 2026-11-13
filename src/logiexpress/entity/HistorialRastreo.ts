import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Envio } from "./Envio.js";

@Entity("historial_rastreo")
export class HistorialRastreo {
    @PrimaryGeneratedColumn({ name: "id_rastreo" })
    idRastreo!: number;

    @Column({ type: "int", name: "id_envio" })
    idEnvio!: number;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    fecha!: Date;

    @Column({ type: "varchar", length: 150, name: "ubicacion_actual" })
    ubicacionActual!: string;

    @Column({
        type: "enum",
        enum: ["REGISTRADO", "EN_TRANSITO", "EN_ALMACEN", "EN_REPARTO", "ENTREGADO"],
        name: "estado_evento",
    })
    estadoEvento!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    observaciones!: string | null;


    @ManyToOne(() => Envio, (envio) => envio.historial)
    @JoinColumn({ name: "id_envio" })
    envio!: Envio;
}
