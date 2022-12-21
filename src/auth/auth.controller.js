const {comparePassword} = require('../utils/crypto')
const {findUserByEmail} = require('../users/users.controllers')

const checkUserCredentials =async (email,password)=>{
    try{
        const user = await findUserByEmail(email)
        const verifiedPassword = comparePassword(password,user.password)
        if(verifiedPassword){
            return user
        }
        return null
    }
    catch(error){
        return null
    }
}

module.exports = {checkUserCredentials}