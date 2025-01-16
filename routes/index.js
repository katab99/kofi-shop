const getCoffeeListMW = require("../middlewares/coffee/getCoffeeListMW")
const getCoffeeMW = require("../middlewares/coffee/getCoffeeMW")
const saveCoffeeMW = require("../middlewares/coffee/saveCoffeeMW")
const deleteCoffeeMW = require("../middlewares/coffee/deleteCoffeeMW")

const getTableListMW = require("../middlewares/table/getTableListMW")
const getTableMW = require("../middlewares/table/getTableMW")
const defaultTableMW = require("../middlewares/table/defaultTableMW")

const getOrderListMW = require("../middlewares/table/getOrderListMW")
const addOrderMW = require("../middlewares/table/addOrderMW")
const deleteOrderMW = require("../middlewares/table/deleteOrderMW")

const saveTableMW = require("../middlewares/table/saveTableMW")
const deleteTableMW = require("../middlewares/table/deleteTableMW")
const setTableToDefaultMW = require("../middlewares/table/setTableToDefaultMW")
const updateTableStateMW = require("../middlewares/table/updateTableStateMW")

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
        renderMW(objectRepository, 'table-add-order')
    )

    app.use('/table/updateStatus/:tableId',
        getTableMW(objectRepository),
        updateTableStateMW(objectRepository),
        renderMW(objectRepository, 'table-status-update')
    )

    app.use('/table/deleteOrder/:tableId/:coffeeId',
        getTableMW(objectRepository),
        getCoffeeMW(objectRepository),
        deleteOrderMW(objectRepository),
    )

    app.use('/table/clear/:tableId/',
        getTableMW(objectRepository),
        setTableToDefaultMW(objectRepository),
        )
}
