require('../assets/css/style.css')
require('../less/loading.less')
require('../less/teacherAttendance.less')
var $ = require('jquery')
var Search = require('./search')

$(function () {
  var elem = {}
  elem.loading = '.loading'
  elem.panelTable = '#panelTable'
  elem.searchForm = '#searchForm'
  elem.searchKeyGroup = '#searchKeyGroup'
  elem.searchKey = '#searchKey'
  elem.searchButton = '#searchButton'
  elem.backButton = '#backButton'
  elem.searchKeyAlert = '#searchKeyAlert'
  elem.searchAlert = '#searchAlert'
  var search = new Search(elem)
  search.init()
})
