const express = require("express")
const app = express()

const getCoffeeListMW = require("./middlewares/coffee/getCoffeeListMW")
const getCoffeeMW = require("./middlewares/coffee/getCoffeeMW")
const saveCoffeeMW = require("./middlewares/coffee/saveCoffeeMW")
const deleteCoffeeMW = require("./middlewares/coffee/deleteCoffeeMW")

const getTableListMW = require("./middlewares/table/getTableListMW")
const getTableMW = require("./middlewares/table/getTableMW")
const saveTableMW = require("./middlewares/table/saveTableMW")
const deleteTableMW = require("./middlewares/table/deleteTableMW")
const saveCoffeeToTable = require("./middlewares/table/saveCoffeeToTable")

const renderMW = require("./middlewares/renderMW")


// routing
module.exports = (app) => {
  const objectRepository = {}

  app.get('/',
      renderMW(objectRepository, 'index')
  )

  app.get('/coffee',
      getCoffeeMW(objectRepository),
      renderMW(objectRepository, 'coffee-list')
  )

  app.use('/coffee/del/:coffee-id',
      deleteCoffeeMW(objectRepository)
  )

  app.use('/coffee/new',
      saveCoffeeMW(objectRepository),
      renderMW(objectRepository, 'coffee-add-update')
  )

  app.use('/coffee/edit/:coffee-id',
      getCoffeeMW(objectRepository),
      saveCoffeeMW(objectRepository),
      renderMW(objectRepository, 'coffee-edit-update')
  )

  app.get('/table',
      getTableListMW(objectRepository),
      renderMW(objectRepository, 'table-list')
  )

  app.get('/table/:table-id',
      getTableMW(objectRepository),
      renderMW(objectRepository, 'table')
  )

  app.use('/table/del/:table-id',
      deleteTableMW(objectRepository)
  )

  app.use('/table/add-order/:table-id/:coffee-id',
      getTableMW(objectRepository),
      getCoffeeListMW(objectRepository),
      saveCoffeeToTable(objectRepository),
      renderMW(objectRepository, 'table-add-order')
  )

  app.use('table/update-status/:table-id',
      getTableMW(objectRepository),
      saveTableMW(objectRepository),
      renderMW(objectRepository, 'table-status-update')
  )
}

app.use(express.static("static"));

const server = app.listen(3000, () => {
  console.log("Server running at http://localhost:" + server.address().port);
});
