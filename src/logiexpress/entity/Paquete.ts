import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Envio } from "./Envio.js";
import { Almacen } from "./Almacen.js";

@Entity("paquetes")
export class Paquete {
    @PrimaryGeneratedColumn({ name: "id_paquete" })
    idPaquete!: number;

    @Column({ type: "int", name: "id_envio" })
    idEnvio!: number;


    @Column({ type: "int", name: "id_almacen", nullable: true })
    idAlmacen!: number | null;

    @Column({ type: "decimal", precision: 6, scale: 2 })
    peso!: number;

    @Column({ type: "decimal", precision: 6, scale: 2 })
    largo!: number;

    @Column({ type: "decimal", precision: 6, scale: 2 })
    ancho!: number;

    @Column({ type: "decimal", precision: 6, scale: 2 })
    alto!: number;

    @Column({ type: "varchar", length: 150 })
    contenido!: string;


    @ManyToOne(() => Envio, (envio) => envio.paquetes)
    @JoinColumn({ name: "id_envio" })
    envio!: Envio;

    
    @ManyToOne(() => Almacen, (almacen) => almacen.paquetes)
    @JoinColumn({ name: "id_almacen" })
    almacen!: Almacen | null;
}
