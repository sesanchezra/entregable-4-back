const bcrypt = require('bcryptjs')

const hashPassword = (plainPassword)=>{
    return bcrypt.hashSync(plainPassword,10)
}

const comparePassword = (plainPassword,hashedPassword) =>{
    return bcrypt.compareSync(plainPassword,hashedPassword)
}


module.exports={
    hashPassword,
    comparePassword
}