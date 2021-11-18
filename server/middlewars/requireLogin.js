module.exports = (req, res, next) => {
    if(! req.user){
        res.status(401).send({ error: 'WARNING : You must be logged in before you charge for credits !' })
    }

    next();
}