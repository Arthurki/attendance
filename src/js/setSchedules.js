require('../assets/css/style.css')
require('../less/loading.less')
var $ = require('jquery')
var SetSchedules = require('./schedulesSet')

$(function () {
  var elem = {}
  elem.schedulesInfo = '#schedulesInfo'
  elem.loading = '.loading'
  elem.courseName = '#courseName'
  elem.teacherName = '#teacherName'
  elem.class = '#class'
  elem.date = '#date'
  elem.week = '#week'
  elem.section = '#section'
  elem.classroom = '#classroom'
  elem.courseNameGroup = '#courseNameGroup'
  elem.teacherNameGroup = '#teacherNameGroup'
  elem.classGroup = '#classGroup'
  elem.dateGroup = '#dateGroup'
  elem.weekGroup = '#weekGroup'
  elem.sectionGroup = '#sectionGroup'
  elem.classroomGroup = '#classroomGroup'
  elem.courseNameAlert = '#courseNameAlert'
  elem.teacherNameAlert = '#teacherNameAlert'
  elem.classAlert = '#classAlert'
  elem.dateAlert = '#dateAlert'
  elem.weekAlert = '#weekAlert'
  elem.sectionAlert = '#sectionAlert'
  elem.classroomAlert = '#classroomAlert'
  elem.schedulesAlert = '#schedulesAlert'
  elem.submitAlert = '#submitAlert'
  elem.submitBtn = '#submit'
  elem.importBtn = '#import'
  var schedules = new SetSchedules(elem)
  schedules.init()
})
