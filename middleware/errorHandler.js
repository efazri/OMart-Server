module.exports = function errorHandler(err, req, res, next) {
    
    if(err.name === `email/password is wrong`) {
        res.status(400).json({ error: err.name })
    } else if ( err.name === `unauthorized access`) {
        res.status(401).json({ error: err.name })
    } else if (err.name === 'forbidden') {
        res.status(403).json({ error : err.name })
    } else if ( err.errors ){
        res.status(400).json({ error: err.errors[0].message })
    }
}