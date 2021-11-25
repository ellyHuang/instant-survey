module.exports = (req, res, next) => {
    if(req.user.credits <= 1){
        res.status(403).send({ error: 'WARNING : Please top up your account to send out the survey!' })
    }

    next();
}