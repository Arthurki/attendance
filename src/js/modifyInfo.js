require('../assets/css/style.css')
require('../less/loading.less')
require('../less/teacherAttendance.less')
var $ = require('jquery')
var Attendance = require('./modifyAttendance')

$(function () {
  var elem = {}
  elem.loading = '.loading'
  elem.panelTable = '#panelTable'
  elem.panelFooter = '#panelFooter'
  elem.submitButton = '#submitButton'
  elem.backButton = '#backButton'
  elem.courseAlert = '#courseAlert'
  elem.submitAlert = '#submitAlert'
  var attendance = new Attendance(elem)
  attendance.init()
})
