import { conexion } from "../db.js";

export const register = async(req, res) => {
    const { email, nombre, password } = req.body

    try {
        const registro = await conexion.query('INSERT INTO usuarios (email, nombre, password) VALUES (?,?,?)', [email, nombre, password])
        res.status(200).json({
            message: "usuario agregado"
        })
    } catch (error) {
        console.log(error)
    }
}

export const login = async(req, res) => {
    const { nombre, password } = req.body;

    try {
        const login = await conexion.query('SELECT * FROM usuarios WHERE nombre = ? && password = ?', [nombre, password]);
        res.json(login[0])
    } catch (error) {
        console.log(error)
    }
}