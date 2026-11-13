import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Envio } from "./Envio.js";


@Entity("auditoria_envios")
export class AuditoriaEnvio {
    @PrimaryGeneratedColumn({ name: "id_auditoria" })
    idAuditoria!: number;

    @Column({ type: "int", name: "id_envio" })
    idEnvio!: number;

    @Column({ type: "decimal", precision: 10, scale: 2, name: "costo_anterior" })
    costoAnterior!: number;

    @Column({ type: "decimal", precision: 10, scale: 2, name: "costo_nuevo" })
    costoNuevo!: number;

    @Column({ type: "varchar", length: 100 })
    usuario!: string;

    @Column({ type: "datetime", name: "fecha_modificacion", default: () => "CURRENT_TIMESTAMP" })
    fechaModificacion!: Date;

    @ManyToOne(() => Envio, (envio) => envio.auditorias)
    @JoinColumn({ name: "id_envio" })
    envio!: Envio;
}
