/*
* hello
 */



module.exports = function (objectRepository) {
    return async function (req, res, next) {
        try{
            if((typeof req.body.state === 'undefined') ){
                return next()
            }

            res.locals.table.state = req.body.state
            await res.locals.table.save()
            return res.redirect(`/table/${res.locals.table._id}`)
        }catch (err){
            return next(err)
        }
    }
}