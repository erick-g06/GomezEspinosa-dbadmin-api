import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Paquete } from "./Paquete.js";

@Entity("almacenes")
export class Almacen {
    @PrimaryGeneratedColumn({ name: "id_almacen" })
    idAlmacen!: number;

    @Column({ type: "varchar", length: 100, name: "nombre_almacen" })
    nombreAlmacen!: string;

    @Column({ type: "varchar", length: 150 })
    ubicacion!: string;

    @Column({ type: "int", name: "capacidad_maxima" })
    capacidadMaxima!: number;

    @OneToMany(() => Paquete, (paquete) => paquete.almacen)
    paquetes!: Paquete[];
}
