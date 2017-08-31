var $ = require('jquery')
var Chart = require('chart.js')

const OK = 1
const ERROR = 0;

(function ($) {
  var Statistic = function (elem) {
    this.userId = localStorage.getItem('userId')
    this.resData = null
    this.eLoading = $(elem.loading + ':eq(0)')
    this.eLoadingAlert = $(elem.loadingAlert)
    this.eStatisticsForm = $(elem.statisticsForm)
    this.eCourseSelect = $(elem.courseSelect)
    this.eClassGroup = $(elem.classGroup)
    this.eClassSelectLabel = $(elem.classSelectLabel)
    this.eClassSelect = $(elem.classSelect)
    this.eStatisticsButton = $(elem.statisticsButton)
    this.eStatisticsAlert = $(elem.statisticsAlert)
    this.eChart = $(elem.chart)
    this.eTimeStart = $(elem.timeStart)
    this.eTimeEnd = $(elem.timeEnd)
  }

  Statistic.prototype.init = function () {
    $.proxy(this.getCourse(), this)
  }

  Statistic.prototype.getCourse = function () {
    var data = 'userId=' + this.userId
    $.ajax({
      url: 'api/getCourse',
      type: 'POST',
      data: data,
      success: $.proxy(this.getCourseSuccess, this),
      error: $.proxy(this.getCourseError, this),
      timeout: 10000,
      xhrFields: {
        withCredentials: true
      }
    })
  }

  Statistic.prototype.getCourseSuccess = function (res) {
    this.eLoading.css('display', 'none')
    if (res.code === OK) {
      this.eStatisticsForm.css('display', 'block')
      this.eStatisticsButton.parent().css('display', 'block')
      this.resData = res.data
      var course = ''
      var classes = '<option value="%">全部</option>'
      window.Object.keys(res.data).forEach(function (courses, index) {
        course += '<option value="' + res.data[courses].courseId + '">' + courses + '</option>'
        if (index === 0) {
          res.data[courses].classes.forEach(function (className) {
            classes += '<option value="' + className + '">' + className + '</option>'
          })
        }
      })
      this.eCourseSelect.html(course)
      this.eClassSelect.html(classes)

      this.eCourseSelect.on('change', $.proxy(this.changeSelect, this))
      this.eStatisticsButton.on('click', $.proxy(this.getStatistic, this))
    } else if (res.code === ERROR) {
      this.eLoadingAlert.text(res.msg)
      this.eLoadingAlert.fadeIn()
    }
  }

  Statistic.prototype.getCourseError = function () {
    this.eLoading.css('display', 'none')
    this.eLoadingAlert.text('网路错误，请刷新重试')
    this.eLoadingAlert.fadeIn()
  }

  Statistic.prototype.changeSelect = function () {
    var classes = '<option value="%">全部</option>'
    this.resData[this.eCourseSelect.find(':selected').text()].classes.forEach(function (className) {
      classes += '<option value="' + className + '">' + className + '</option>'
    })
    this.eClassSelect.html(classes)
  }

  Statistic.prototype.getStatistic = function () {
    if (this.checkDate()) {
      this.eStatisticsButton.text('统计中')
      this.eStatisticsButton.addClass('disabled')
      var data = this.eStatisticsForm.serialize()
      data += '&userId=' + this.userId
      $.ajax({
        url: 'api/getStatistic',
        type: 'POST',
        data: data,
        success: $.proxy(this.getStatisticSuccess, this),
        error: $.proxy(this.getStatisticError, this),
        timeout: 10000,
        xhrFields: {
          withCredentials: true
        }
      })
    }
  }

  Statistic.prototype.getStatisticSuccess = function (res) {
    this.eStatisticsButton.text('确定')
    this.eStatisticsButton.removeClass('disabled')
    if (res.code === OK) {
      this.eChart.parent().fadeIn()
      var data = []
      window.Object.keys(res.data).forEach(function (item) {
        data.push(res.data[item])
      })
      var config = {
        data: {
          datasets: [{
            data: data,
            backgroundColor: [
              'red',
              'orange',
              'yellow',
              'green',
              'blue',
              'gray'
            ],
            label: '统计图' // for legend
          }],
          labels: [
            '正常',
            '迟到',
            '旷课',
            '病假',
            '事假',
            '早退'
          ]
        },
        options: {
          responsive: true,
          legend: {
            position: 'right'
          },
          title: {
            display: true,
            text: '统计图'
          },
          scale: {
            ticks: {
              beginAtZero: true
            },
            reverse: false
          },
          animation: {
            animateRotate: true,
            animateScale: true
          }
        }
      }
      Chart.PolarArea(this.eChart, config)
    } else if (res.code === ERROR) {
      this.eStatisticsAlert.text(res.msg)
      this.eStatisticsAlert.fadeIn()
      setTimeout($.proxy(function () {
        this.eStatisticsAlert.fadeOut()
      }, this), 2000)
    }
  }

  Statistic.prototype.getStatisticError = function () {
    this.eStatisticsButton.text('确定')
    this.eStatisticsButton.removeClass('disabled')
    this.eStatisticsAlert.text('网络错误，请刷新重试')
    this.eStatisticsAlert.fadeIn()
    setTimeout($.proxy(function () {
      this.eStatisticsAlert.fadeOut()
    }, this), 2000)
  }

  Statistic.prototype.checkDate = function () {
    if (this.eTimeStart.val().length === 0 || this.eTimeEnd.val().length === 0) {
      this.eStatisticsAlert.text('请输入开始时间和结束时间！')
      this.eStatisticsAlert.fadeIn()
      setTimeout($.proxy(function () {
        this.eStatisticsAlert.fadeOut()
      }, this), 2000)
      return false
    }
    return true
  }

  module.exports = Statistic
}($))
