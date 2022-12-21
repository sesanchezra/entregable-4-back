const authControllers = require('../auth/auth.controller')
const jwt = require('jsonwebtoken')
const jwt_secret = require('../../config').api.jwtSecret

const postLogin = (req,res)=>{
    const {email,password }=req.body

    if(email && password){
        authControllers.checkUserCredentials(email,password)
            .then((data)=>{
                if(data){
                    const token = jwt.sign({
                        id: data.id,
                        email: data.email,
                        role: data.role
                    },jwt_secret)
                    
                    res.status(200).json({
                        message: 'Correct Credentials',
                        token: token
                    })
                }
                else{
                    res.status(401).json({message: 'Invalid Credentials'})

                }
            }

            )
            .catch((error)=> {
                res.status(400).json({message: error.message})
            }
            )
    }
    else{
        res.status(400).json({
            message: 'Missing data',
            fields:{
                email:"example@gmail.com",
                password:"password" 
            }
        })

    }
}

module.exports={
    postLogin
}