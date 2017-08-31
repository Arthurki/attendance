var $ = require('jquery')

const OK = 1
const ERROR = 0;

(function ($) {
  var Score = function (elem) {
    this.id = null
    this.userId = localStorage.getItem('userId')
    this.teacherId = localStorage.getItem('teacherId')
    this.attendanceId = null
    this.eDataTable = null
    this.eLoading = $(elem.loading + ':eq(0)')
    this.ePanelTable = $(elem.panelTable)
    this.ePanelFooter = $(elem.panelFooter)
    this.eExportsButton = $(elem.exportsButton)
    this.eBackButton = $(elem.backButton)
    this.eCourseAlert = $(elem.courseAlert)
    this.eExportsAlert = $(elem.exportsAlert)
  }

  Score.prototype.init = function () {
    $.proxy(this.getClassCourse(), this)
  }

  Score.prototype.getClassCourse = function () {
    var data = 'userId=' + this.userId + '&teacherId=' + this.teacherId
    $.ajax({
      url: 'api/getClassCourseList',
      type: 'POST',
      data: data,
      success: $.proxy(this.getClassCourseSuccess, this),
      error: $.proxy(this.getClassCourseError, this),
      timeout: 10000,
      xhrFields: {
        withCredentials: true
      }
    })
  }

  Score.prototype.getClassCourseSuccess = function (res) {
    if (res.code === OK) {
      var template = '<table class="table table-bordered table-hover" id="dataTable"><thead><tr><th>ID</th><th>课程</th><th>班级</th><th>教师</th><th>时间</th><th>教室</th></tr></thead><tbody>'
      var tr = ''
      if (res.data.length <= 0) {
        tr = '<tr class="course"><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td></tr>'
      } else {
        for (var i = 0; i < res.data.length; i++) {
          tr += '<tr class="course"><td>' + res.data[i].id + '</td><td>' + res.data[i].courseName + '</td><td>' + res.data[i].class + '</td><td>' + res.data[i].teacherName + '</td><td>' + res.data[i].date + '周&nbsp;&nbsp;星期' + res.data[i].week + '&nbsp;&nbsp;' + res.data[i].section + '节' + '</td><td>' + res.data[i].classroom + '</td></tr>'
        }
      }
      template = template + tr + '</tbody>'

      this.eLoading.css('display', 'none')
      this.ePanelTable.append($(template))
      this.eDataTable = $('#dataTable')

      $('.course').on('click', $.proxy(this.getStudentsScore, this))
    } else if (res.code === ERROR) {
      this.eLoading.css('display', 'none')
      this.eCourseAlert.text(res.msg)
      this.eCourseAlert.fadeIn()
    }
  }

  Score.prototype.getClassCourseError = function () {
    this.eLoading.css('display', 'none')
    this.eCourseAlert.text('网络错误,请刷新重试')
    this.eCourseAlert.fadeIn()
  }

  Score.prototype.getStudentsScore = function (e) {
    this.eLoading.css('display', 'block')
    this.eDataTable.css('display', 'none')
    this.id = $(e.currentTarget).find('td:eq(0)').text()
    var data = 'userId=' + this.userId + '&scheduleId=' + this.id
    $.ajax({
      url: 'api/getStudentsScore',
      type: 'POST',
      data: data,
      success: $.proxy(this.getStudentsScoreSuccess, this),
      error: $.proxy(this.getStudentsScoreError, this),
      timeout: 10000,
      xhrFields: {
        withCredentials: true
      }
    })
  }

  Score.prototype.getStudentsScoreSuccess = function (res) {
    this.eLoading.css('display', 'none')
    if (res.code === OK) {
      this.attendanceId = res.data.attendanceId
      var template = '<thead><tr><th>班级</th><th>学号</th><th>姓名</th><th>分数</th></tr></thead><tbody>'
      var tr = ''
      if (res.data.length === 0) {
        tr = '<tr><td>无</td><td>无</td><td>无</td><td>无</td></tr>'
      } else {
        for (var i = 0; i < res.data.length; i++) {
          tr += '<tr><td>' + res.data[i].class + '</td><td>' + res.data[i].studentId + '</td><td>' + res.data[i].name + '</td><td>' + (res.data[i].score ? res.data[i].score : 100) + '</td></tr>'
        }
      }
      template = template + tr + '</tbody>'

      this.eDataTable.html(template)
      this.eDataTable.removeAttr('style')
      this.ePanelFooter.css('display', 'block')
      this.eBackButton.on('click', $.proxy(this.back, this))
    } else if (res.code === ERROR) {
      this.eDataTable.removeAttr('style')
      this.eCourseAlert.text(res.msg)
      this.eCourseAlert.fadeIn()
      setTimeout($.proxy(function () {
        this.eCourseAlert.fadeOut()
      }, this), 2000)
    }
  }

  Score.prototype.getStudentsScoreError = function () {
    this.eLoading.css('display', 'none')
    this.eDataTable.removeAttr('style')
    this.eCourseAlert.text('网络错误,请刷新重试')
    this.eCourseAlert.fadeIn()
  }

  Score.prototype.back = function () {
    window.location.reload()
  }

  module.exports = Score
}($))
