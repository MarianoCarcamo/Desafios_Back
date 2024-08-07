import EErrors from "../../services/errors/enums.js"

export default (error, req, res, next) => {
    console.log(error.cause)
    switch (error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            res.send({status:"Error", error: error.name})
            break
        default: 
            res.send({status:"Error", error:"Error no identificado"})
            break
    }
}