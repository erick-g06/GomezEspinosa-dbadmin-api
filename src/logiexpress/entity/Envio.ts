import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Cliente } from "./Cliente.js";
import { Direccion } from "./Direccion.js";
import { Paquete } from "./Paquete.js";
import { HistorialRastreo } from "./HistorialRastreo.js";
import { AuditoriaEnvio } from "./AuditoriaEnvio.js";

@Entity("envios")
export class Envio {
    @PrimaryGeneratedColumn({ name: "id_envio" })
    idEnvio!: number;

    @Column({ type: "int", name: "id_cliente" })
    idCliente!: number;

    @Column({ type: "int", name: "id_direccion_origen" })
    idDireccionOrigen!: number;

    @Column({ type: "int", name: "id_direccion_destino" })
    idDireccionDestino!: number;

    @Column({ type: "varchar", length: 100, name: "nombre_destinatario" })
    nombreDestinatario!: string;

    @Column({ type: "decimal", precision: 10, scale: 2, name: "costo_total" })
    costoTotal!: number;

    @Column({ type: "datetime", name: "fecha_registro", default: () => "CURRENT_TIMESTAMP" })
    fechaRegistro!: Date;

    @Column({
        type: "enum",
        enum: ["REGISTRADO", "EN_TRANSITO", "ENTREGADO", "CANCELADO"],
        name: "estado_global",
        default: "REGISTRADO",
    })
    estadoGlobal!: string;


    @ManyToOne(() => Cliente, (cliente) => cliente.envios)
    @JoinColumn({ name: "id_cliente" })
    cliente!: Cliente;


    @ManyToOne(() => Direccion)
    @JoinColumn({ name: "id_direccion_origen" })
    direccionOrigen!: Direccion;


    @ManyToOne(() => Direccion)
    @JoinColumn({ name: "id_direccion_destino" })
    direccionDestino!: Direccion;

   
    @OneToMany(() => Paquete, (paquete) => paquete.envio, { cascade: true })
    paquetes!: Paquete[];

   
    @OneToMany(() => HistorialRastreo, (rastreo) => rastreo.envio)
    historial!: HistorialRastreo[];

   
    @OneToMany(() => AuditoriaEnvio, (auditoria) => auditoria.envio)
    auditorias!: AuditoriaEnvio[];
}
