/**
 * Create or update a table to default parameters.
 */
const requireOption = require('../requireOption')

module.exports = function (objectRepository) {
    const tableModel = requireOption(objectRepository, 'TableModel')

    // to give the smallest available number to the table
    function setTableNum(tableList){
        const tableNums = tableList.map(item => item.num)

        if (tableNums.length === 0 || Math.min(...tableNums) !== 1){
            return 1
        }

        const maxTableNum = Math.max(...tableNums)

        for(let i = 0; i < maxTableNum; i++){
            if(tableNums[i+1] - tableNums[i] !== 1){
                return tableNums[i] + 1
            }
        }
        return maxTableNum + 1
    }


    return async function (req, res, next) {
        try{
            if(typeof res.locals.table === 'undefined'){
                res.locals.table = new tableModel()
            }

            res.locals.table.num = setTableNum(res.locals.tableList)
            res.locals.table.state = 'empty'
            res.locals.table._orders = []

            await res.locals.table.save()
            return res.redirect('/table')
        } catch(err){
            return next(err)
        }
    }
}