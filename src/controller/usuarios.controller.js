import { conexion } from "../db.js";

export const crear_usuarios = async(req, res) => {
    const { nombre, n_lote, precio, cantidad } = req.body;
    try {
        const [rows] = await conexion.query(
            "insert into inventario(nombre,n_lote,precio,cantidad) values(?,?,?,?)", [nombre, n_lote, precio, cantidad]
        );
        res.json({
            id: rows.insertId,
            nombre,
            email,
            password,
            rol,
        });
    } catch (error) {
        return res.status(500).json({
            message: "algo fallo",
        });
    }
};