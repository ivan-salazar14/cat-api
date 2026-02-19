import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../persistence/user.model';

export class UserController {
    // Nota Senior: Aunque la prueba pide GET, se recomienda POST para registrar datos sensibles
    async register(req: Request, res: Response) {
        try {
            const { email, password, name } = req.query; // Según requerimiento GET /Register
            const hashedPassword = await bcrypt.hash(String(password), 10);
            const newUser = await User.create({ email, password: hashedPassword, name });

            res.status(201).json({ message: "Usuario Creado", user: { email: newUser.email } });
        } catch (error) {
            res.status(400).json({ error: "Error en registro" });
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.query;
        const user = await User.findOne({ email });

        if (user && await bcrypt.compare(String(password), user.password)) {
            return res.json({ id: user._id, email: user.email, name: user.name });
        }
        res.status(401).json({ message: "Credenciales inválidas" });
    }
}