require('../assets/css/style.css')
require('../less/loading.less')
require('../less/teacherAttendance.less')
var $ = require('jquery')
var Attendance = require('./searchTeacherAttendance')

$(function () {
  var elem = {}
  elem.loading = '.loading'
  elem.panelTable = '#panelTable'
  elem.panelFooter = '#panelFooter'
  elem.backButton = '#backButton'
  elem.courseAlert = '#courseAlert'
  var attendance = new Attendance(elem)
  attendance.init()
})
