const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const jwt_secret = require('../../config').api.jwtSecret
const passport = require('passport')

const {findUserById} =require('../users/users.controllers')

const options={
    jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: jwt_secret
}

passport.use(
    new JwtStrategy(options,async (tokenDecoded,done) =>{
        try{
            const user = await findUserById(tokenDecoded.id)
            if(!user){
                return done(null,false)
            }
            return done(null,tokenDecoded)
        }
        catch(error){
            return done(error,false)
        }
    }

    )
)

module.exports = passport