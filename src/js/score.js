require('../assets/css/style.css')
require('../less/loading.less')
require('../less/teacherAttendance.less')
var $ = require('jquery')
var Score = require('./searchScore')

$(function () {
  var elem = {}
  elem.loading = '.loading'
  elem.panelTable = '#panelTable'
  elem.panelFooter = '#panelFooter'
  elem.exportsButton = '#exportsButton'
  elem.backButton = '#backButton'
  elem.exportsAlert = '#exportsAlert'
  elem.courseAlert = '#courseAlert'
  var score = new Score(elem)
  score.init()
})
