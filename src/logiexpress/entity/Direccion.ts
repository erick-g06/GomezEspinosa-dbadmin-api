import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Cliente } from "./Cliente.js";

@Entity("direcciones")
export class Direccion {
    @PrimaryGeneratedColumn({ name: "id_direccion" })
    idDireccion!: number;

    @Column({ type: "int", name: "id_cliente" })
    idCliente!: number;

    @Column({ type: "varchar", length: 100, name: "nombre_calle" })
    nombreCalle!: string;

    @Column({ type: "varchar", length: 100, name: "nombre_colonia", nullable: true })
    nombreColonia!: string | null;

    @Column({ type: "varchar", length: 80 })
    ciudad!: string;

    @Column({ type: "varchar", length: 10, name: "codigo_postal" })
    codigoPostal!: string;

    @ManyToOne(() => Cliente, (cliente) => cliente.direcciones)
    @JoinColumn({ name: "id_cliente" })
    cliente!: Cliente;
}
