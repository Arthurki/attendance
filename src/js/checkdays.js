require('../assets/css/style.css')
require('../less/loading.less')
var $ = require('jquery')
var DaysCheck = require('./dayscheck')

$(function () {
  var elem = {}
  elem.loading = '.loading'
  elem.defaultDays = '#defaultDays'
  elem.defaultDaysGroup = '#defaultDaysGroup'
  elem.changeDaysBtn = '#changeDaysBtn'
  elem.changeDaysAlert = '#changeDaysAlert'
  var checkdays = new DaysCheck(elem)
  checkdays.init()
})
