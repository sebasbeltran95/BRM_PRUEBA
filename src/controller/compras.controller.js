import { conexion } from "../db.js";

export const crear_compra = async(req, res) => {
    const { n_cliente, productos_comrpados, cantidad_producto, predcio_total } = req.body;
    try {
        const [rows] = await conexion.query(
            "insert into compras(n_cliente,productos_comrpados,cantidad_producto,predcio_total) values(?,?,?,?)", [n_cliente, productos_comrpados, cantidad_producto, predcio_total]
        );
        res.json({
            id: rows.insertId,
            n_cliente,
            productos_comrpados,
            cantidad_producto,
            predcio_total
        });
    } catch (error) {
        return res.status(500).json({
            message: "algo fallo",
        });
    }
};

export const total_compra = async(req, res) => {
    try {
        const [rows] = await conexion.query("select * from compras");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "algo fallo",
        });
    }
};

export const buscar_compra = async(req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await conexion.query(
            "select * from compras where id = ?", [id]
        );

        if (rows.length <= 0)
            return res.status(404).json({
                message: "compra no encontrada",
            });

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: "algo fallo",
        });
    }
};

export const actualzar_compra = async(req, res) => {
    const { id } = req.params;
    const { n_cliente, productos_comrpados, cantidad_producto, predcio_total } = req.body;
    try {
        const [result] = await conexion.query(
            "update compras set n_cliente = ifnull(?,n_cliente), productos_comrpados = ifnull(?,productos_comrpados), cantidad_producto = ifnull(?,cantidad_producto), predcio_total = ifnull(?,predcio_total) where id = ?", [n_cliente, productos_comrpados, cantidad_producto, predcio_total, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({
                message: "compra no encontrada",
            });

        const [rows] = await conexion.query("select * from compras where id = ?", [
            id,
        ]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: "algo fallo",
        });
    }
};

export const eliminar_compras = async(req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await conexion.query("delete from compras where id = ?", [
            id,
        ]);
        if (rows.affectedRows === 0)
            return res.status(404).json({
                message: "compras no encontrada",
            });
        res.status(200).json({
            message: "compra eliminado",
        });
    } catch (error) {
        return res.status(500).json({
            message: "algo fallo",
        });
    }
};