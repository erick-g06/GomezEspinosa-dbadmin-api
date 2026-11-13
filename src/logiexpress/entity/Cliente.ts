import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Direccion } from "./Direccion.js";
import { Envio } from "./Envio.js";

@Entity("clientes")
export class Cliente {
    @PrimaryGeneratedColumn({ name: "id_cliente" })
    idCliente!: number;

    @Column({ type: "varchar", length: 100 })
    nombre!: string;

    @Column({ type: "varchar", length: 100 })
    apellido!: string;

    @Column({ type: "varchar", length: 100, unique: true })
    email!: string;

    @Column({ type: "enum", enum: ["ACTIVO", "INACTIVO"], default: "ACTIVO" })
    estado!: string;

    @Column({ type: "decimal", precision: 10, scale: 2, name: "limite_credito", default: 0 })
    limiteCredito!: number;

    @OneToMany(() => Direccion, (direccion) => direccion.cliente)
    direcciones!: Direccion[];

    @OneToMany(() => Envio, (envio) => envio.cliente)
    envios!: Envio[];
}
