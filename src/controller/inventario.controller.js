import { conexion } from "../db.js";

export const crear_producto = async(req, res) => {
    const { nombre, n_lote, precio, cantidad } = req.body;
    try {
        const [rows] = await conexion.query(
            "insert into inventario(nombre,n_lote,precio,cantidad) values(?,?,?,?)", [nombre, n_lote, precio, cantidad]
        );
        res.json({
            id: rows.insertId,
            nombre,
            n_lote,
            precio,
            cantidad,
        });
    } catch (error) {
        return res.status(500).json({
            message: "algo fallo",
        });
    }
};

export const total_productos = async(req, res) => {
    try {
        const [rows] = await conexion.query("select * from inventario");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "algo fallo",
        });
    }
};

export const buscar_producto = async(req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await conexion.query(
            "select * from inventario where id = ?", [id]
        );

        if (rows.length <= 0)
            return res.status(404).json({
                message: "producto no encontrado",
            });

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: "algo fallo",
        });
    }
};

export const actualzar_producto = async(req, res) => {
    const { id } = req.params;
    const { nombre, n_lote, precio, cantidad } = req.body;
    try {
        const [result] = await conexion.query(
            "update inventario set nombre = ifnull(?,nombre), n_lote = ifnull(?,n_lote), precio = ifnull(?,precio), cantidad = ifnull(?,cantidad) where id = ?", [nombre, n_lote, precio, cantidad, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({
                message: "producto no encontrado",
            });

        const [rows] = await conexion.query("select * from inventario where id = ?", [
            id,
        ]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: "algo fallo",
        });
    }
};

export const eliminar = async(req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await conexion.query("delete from inventario where id = ?", [
            id,
        ]);
        if (rows.affectedRows === 0)
            return res.status(404).json({
                message: "producto no encontrado",
            });
        res.status(200).json({
            message: "producto eliminado",
        });
    } catch (error) {
        return res.status(500).json({
            message: "algo fallo",
        });
    }
};