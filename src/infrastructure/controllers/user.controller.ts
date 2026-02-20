import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../persistence/user.model';

export class UserController {
    // Nota Senior: Aunque la prueba pide GET, se recomienda POST para registrar datos sensibles
    async register(req: Request, res: Response) {
        try {
            const body = req.body || {};
            const query = req.query || {};
            const email = body.email || query.email;
            const password = body.password || query.password;
            const name = body.name || query.name;

            console.log(`Registering user: ${email}`);

            if (!email || !password) {
                return res.status(400).json({ error: "Email and password are required" });
            }

            const hashedPassword = await bcrypt.hash(String(password), 10);
            const newUser = await User.create({
                email: String(email),
                password: hashedPassword,
                name: String(name || '')
            });

            console.log(`User created successfully: ${newUser.email}`);
            res.status(201).json({ message: "Usuario Creado", user: { email: newUser.email } });
        } catch (error) {
            console.error(`Registration error:`, error);
            res.status(400).json({ error: "Error en registro (the email might already be in use)" });
        }
    }

    async login(req: Request, res: Response) {
        const body = req.body || {};
        const query = req.query || {};
        const email = body.email || query.email;
        const password = body.password || query.password;

        console.log(`Login attempt for: ${email}`);

        const user = await User.findOne({ email: String(email || '') });

        if (!user) {
            console.log(`User not found: ${email}`);
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const isMatch = await bcrypt.compare(String(password || ''), user.password as string);
        console.log(`Password match for ${email}: ${isMatch}`);

        if (isMatch) {
            return res.json({ id: user._id, email: user.email, name: user.name });
        }

        res.status(401).json({ message: "Credenciales inválidas" });
    }
}