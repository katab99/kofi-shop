const getCoffeeListMW = require("../middlewares/coffee/getCoffeeListMW")
const getCoffeeMW = require("../middlewares/coffee/getCoffeeMW")
const saveCoffeeMW = require("../middlewares/coffee/saveCoffeeMW")
const deleteCoffeeMW = require("../middlewares/coffee/deleteCoffeeMW")

const getTableListMW = require("../middlewares/table/getTableListMW")
const getTableMW = require("../middlewares/table/getTableMW")
const createTableMW = require("../middlewares/table/createTableMW")
const saveTableMW = require("../middlewares/table/saveTableMW")
const deleteTableMW = require("../middlewares/table/deleteTableMW")
const setTableToDefaultMW = require("../middlewares/table/setTableToDefaultMW")
const saveCoffeeToTableMW = require("../middlewares/table/saveCoffeeToTableMW")
const deleteCoffeeFromTableMW = require("../middlewares/table/deleteCoffeeFromTableMW")

const renderMW = require("../middlewares/renderMW")

// routing
module.exports = (app) => {
    const objectRepository = {}

    app.get('/',
        renderMW(objectRepository, 'index')
    )

    app.get('/coffee',
        getCoffeeListMW(objectRepository),
        renderMW(objectRepository, 'coffee-list')
    )

    app.use('/coffee/delete/:coffeeId',
        deleteCoffeeMW(objectRepository),
        // TODO : redirect to route -> /coffee
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

    app.get('/table/:tableId',
        getTableMW(objectRepository),
        renderMW(objectRepository, 'table')
    )

    // TODO : add new table route
    app.use('/table/new',
        createTableMW(objectRepository),
        // ...
    )

    app.use('/table/delete/:tableId',
        deleteTableMW(objectRepository),
        // TODO : redirect to route -> /table
    )

    app.use('/table/addOrder/:tableId/:coffeeId',
        getTableMW(objectRepository),
        getCoffeeListMW(objectRepository),
        saveCoffeeToTableMW(objectRepository),
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
