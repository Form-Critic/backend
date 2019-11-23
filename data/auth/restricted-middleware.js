const jwt = require('jsonwebtoken')
//const Users = require('model needs to imported here')

module.exports = (req, res, next) =>{
	const token = req.headers.authorization
	if (token){
		const secret = process.env.JWT_SECRET || "is it secret, is it safe"
		
		jwt.verify(token, secret, (err, decodedToken)=>{
		  if(err){
			  console.log(err)
			res.status(401).json({message: "invalid credentials"})
		  } else{
			req.decodedJwt = decodedToken
			console.log(decodedToken)
			next()
		  }
		})
	  }else{
	  res.status(401).json({ you: 'shall not pass!' });}
}
