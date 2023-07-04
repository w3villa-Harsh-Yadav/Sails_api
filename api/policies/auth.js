module.exports = async function(req,res,proceed){

    if(req.get('token')=="auth"){
        return proceed();
    }

    sails.log.warn('User not authenticated')
    res.status(403).json({
        status:false,
        msg:'User not authenticated'
    })
}
