import winston from 'winston'

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'magenta',
        error: 'red',
        warning: 'yellow',
        info: 'green',
        http: 'blue',
        debug: 'white'
    }
}

const logger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({ 
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelsOptions.colors}),
                winston.format.simple()
            ) 
        }),
        new winston.transports.File({
            filename: './errors.log', 
            level: 'error',
            format: winston.format.simple()
        })
    ]
})

export const addLogger = (req, res, next) => {
    req.logger = logger
    next()
}