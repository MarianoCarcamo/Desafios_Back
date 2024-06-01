import passport from 'passport'
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'
import dotenv from 'dotenv'
import userService from '../dao/models/user.model.js'
import { createHash, isValidPassword } from '../utils.js'

dotenv.config()

const ADMIN = {
    first_name: "Coder",
    last_name: "House",
    age: 20,
    email:"adminCoder@coder.com",
    password: "adminCod3r123",
    rol: "admin"
}

const localStrategy = local.Strategy

const initializePassport = () => {

    //Estrategias por terceros
    passport.use('github', new GitHubStrategy({
        clientID:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        callbbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userService.findOne({email: profile._json.email})
            if(!user) {
                let newUser = {
                    first_name:profile._json.name,
                    last_name:"",
                    age:89,
                    email:profile._json.email,
                    password:""
                }
                let result = await userService.create(newUser)
                done(null,result)
            } else {
                done(null,user)
            }
        } catch (error) {
            return done(error)
        }
    }))

    //Estrategias locales
    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async ( req, username, password, done) => {
            const { first_name ,last_name, email, age} = req.body
            try {
                let user = await userService.findOne({email: username})
                if (user) {
                    console.log("El usuario ya existe")
                    return done(null, false)
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    rol:"usuario"
                }
                let result = await userService.create(newUser)
                return done(null,result)
            } catch (error) {
                return done("Error al obtener el usuario" + error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null,user.email)
    })

    passport.deserializeUser( async(email, done) => {
        if(email === ADMIN.email) {
            done(null,ADMIN)
        } else {
            done(null,await userService.findOne({email}))
        }
    })

    passport.use('login', new localStrategy({usernameField:'email'}, async(username,password,done) => {
        try {
            if(username === ADMIN.email && password === ADMIN.password) return done(null,ADMIN)
            const user = await userService.findOne({email:username})
            if(!user){
                return done(null,false)
            }
            if(!isValidPassword(user,password)) return done(null,false)
            return done(null,user)
        } catch (error) {
            done(error)
        }
    }))
}

export default initializePassport