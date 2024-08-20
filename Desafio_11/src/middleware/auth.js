export const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next()
    } else {
        res.redirect('/login')
    }
}

export const isNotAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return next()
    } else {
        res.redirect('/profile')
    }
}

export const isAdmin = (req, res, next) => {
    if (req.session.user.rol === 'admin') {
        return next()
    } else {
        res.send({ error: 'Acceso denegado' })
    }
}

export const isNotAdmin = (req, res, next) => {
    if (req.session.user.rol !== 'Admin') {
        return next()
    } else {
        res.send({ error: 'Acceso denegado' })
    }
}
