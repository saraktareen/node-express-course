const authorize = (req,res,next) =>{
    const {user} = req.query;
    if(user === 'john'){
        req.user = {name: 'john' , id:3}
        next()
    }
    else{
        res.status(401).send('Unauthorized')
    }
    console.log('authorize')
    next()
}

module.exports = authorize

//Authorizes like this http://localhost:5000/?user=john