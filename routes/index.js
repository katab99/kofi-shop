const getCoffeeListMW = require("../middlewares/coffee/getCoffeeListMW")
const getCoffeeMW = require("../middlewares/coffee/getCoffeeMW")
const saveCoffeeMW = require("../middlewares/coffee/saveCoffeeMW")
const deleteCoffeeMW = require("../middlewares/coffee/deleteCoffeeMW")

const getTableListMW = require("../middlewares/table/getTableListMW")
const getTableMW = require("../middlewares/table/getTableMW")
const defaultTableMW = require("../middlewares/table/defaultTableMW")

const getOrderListMW = require("../middlewares/table/getOrderListMW")

const saveTableMW = require("../middlewares/table/saveTableMW")
const deleteTableMW = require("../middlewares/table/deleteTableMW")
const setTableToDefaultMW = require("../middlewares/table/setTableToDefaultMW")
const addOrderMW = require("../middlewares/table/addOrderMW")
const deleteCoffeeFromTableMW = require("../middlewares/table/deleteCoffeeFromTableMW")

const renderMW = require("../middlewares/renderMW")

//models
const CoffeeModel = require("../models/coffee")
const TableModel = require("../models/table")

// routing
module.exports = (app) => {
    const objectRepository = {
        CoffeeModel : CoffeeModel,
        TableModel : TableModel,
    }

    app.get('/',
        renderMW(objectRepository, 'index')
    )

    app.get('/coffee',
        getCoffeeListMW(objectRepository),
        renderMW(objectRepository, 'coffee-list')
    )

    app.use('/coffee/delete/:coffeeId',
        getCoffeeMW(objectRepository),
        deleteCoffeeMW(objectRepository),
    )

    app.use('/coffee/new',
        saveCoffeeMW(objectRepository),
        renderMW(objectRepository, 'coffee-add-update')
    )

    app.use('/coffee/edit/:coffeeId',
        getCoffeeMW(objectRepository),
        saveCoffeeMW(objectRepository),
        renderMW(objectRepository, 'coffee-add-update')
    )

    app.get('/table',
        getTableListMW(objectRepository),
        renderMW(objectRepository, 'table-list')
    )

    app.use('/table/new',
        getTableListMW(objectRepository),
        defaultTableMW(objectRepository),
    )

    app.use('/table/delete/:tableId',
        getTableMW(objectRepository),
        deleteTableMW(objectRepository),
    )

    app.get('/table/:tableId',
        getTableMW(objectRepository),
        getOrderListMW(objectRepository),
        renderMW(objectRepository, 'table')
    )

    app.use('/table/addOrder/:tableId',
        getTableMW(objectRepository),
        getCoffeeListMW(objectRepository),
        addOrderMW(objectRepository),
        //TODO
        renderMW(objectRepository, 'table-add-order')
    )

    app.use('/table/updateStatus/:tableId',
        getTableMW(objectRepository),
        saveTableMW(objectRepository),
        renderMW(objectRepository, 'table-status-update')
    )

    // TODO : add delete item route
    app.use('/table/delete/:tableId/:coffeeId',
        getTableMW(objectRepository),
        getCoffeeMW(objectRepository),
        deleteCoffeeFromTableMW(objectRepository),
        // ...
        )

    // TODO : add clear table route - sets the table to default state
    app.use('/table/clear/:tableId/',
        setTableToDefaultMW(objectRepository),
        // ...
        )
}
