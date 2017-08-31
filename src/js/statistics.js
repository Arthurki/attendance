require('../assets/css/style.css')
require('../less/loading.less')
var $ = require('jquery')
var Statistic = require('./statistic')

$(function () {
  var elem = {}
  elem.loading = '.loading'
  elem.loadingAlert = '#loadingAlert'
  elem.statisticsForm = '#statisticsForm'
  elem.courseSelect = '#courseSelect'
  elem.classGroup = '#classGroup'
  elem.classSelectLabel = '#classSelectLabel'
  elem.classSelect = '#classSelect'
  elem.statisticsButton = '#statisticsButton'
  elem.statisticsAlert = '#statisticsAlert'
  elem.chart = '#chart'
  elem.timeStart = '#timeStart'
  elem.timeEnd = '#timeEnd'
  var statistic = new Statistic(elem)
  statistic.init()
})
