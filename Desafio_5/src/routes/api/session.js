import { Router } from 'express';
import User from '../../dao/models/user.model.js';
import { createHash, isValidPassword } from '../../utils.js';

const router = Router();

const ADMIN = {
    first_name: "Coder",
    last_name: "House",
    age: 20,
    email:"adminCoder@coder.com",
    password: "adminCod3r123",
    rol: "admin"
}

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const newUser = new User({ first_name, last_name, email, age, password: createHash(password) });
        newUser.rol = "usuario"
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        res.status(500).send('Error al registrar usuario');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if( !email || !password ) return res.status(400).send({status:"error", error:"Datos incompletos"})
    try {
        if (email === ADMIN.email && password === ADMIN.password) {
            req.session.user = ADMIN
        } else {
            const user = await User.findOne({ email }, {email:1, first_name:1, last_name:1, password:1});
            if (!user) return res.status(404).send('Usuario no encontrado');
            if ( !isValidPassword(user, password) ) return res.status(403).send({status:"error", error: "Contraseña incorrecta"});
                delete user.password
            req.session.user = {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                age: user.age,
                rol: user.rol
            };
        }
        res.redirect('/products');

    } catch (err) {
        res.status(500).send('Error al iniciar sesión');
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/login');
    });
});

export default router;