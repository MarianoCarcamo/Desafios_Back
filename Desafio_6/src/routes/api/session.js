import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post('/register', passport.authenticate('register',{failureRedirect: 'failregister'}), async (req, res) => {
    res.redirect('/login')
})

router.get('/failregister', (req, res) => {
    console.log("Estrategia fallida")
    res.send({ error: "FALLO"})
})

router.post('/login',passport.authenticate('login',{failureRedirect: 'faillogin'}), async (req, res) => {
    if( !req.user ) return res.status(400).send({status:"error", error:"Datos incompletos"})
    try {
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            rol: req.user.rol
        };
        res.redirect('/products');
    } catch (err) {
        res.status(500).send('Error al iniciar sesión');
    }
});

router.get('/faillogin', (req,res) => {
    res.send({error:"Login Failed"})
})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/login');
    });
});

router.get('/github', passport.authenticate('github', {scope:'user.email'}), async (req, res) => {
})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req, res) =>{
    req.session.user = req.user
    res.redirect('/products')
})

export default router;