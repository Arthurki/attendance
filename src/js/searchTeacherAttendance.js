var $ = require('jquery')

const OK = 1
const ERROR = 0;

(function ($) {
  var Attendance = function (elem) {
    this.userId = localStorage.getItem('userId')
    this.teacherId = localStorage.getItem('teacherId')
    this.attendanceId = null
    this.eDataTable = null
    this.eLoading = $(elem.loading + ':eq(0)')
    this.ePanelTable = $(elem.panelTable)
    this.ePanelFooter = $(elem.panelFooter)
    this.eBackButton = $(elem.backButton)
    this.eCourseAlert = $(elem.courseAlert)
  }

  Attendance.prototype.init = function () {
    $.proxy(this.getClassCourse(), this)
  }

  Attendance.prototype.getClassCourse = function () {
    var data = 'userId=' + this.userId + '&teacherId=' + this.teacherId
    $.ajax({
      url: 'api/getAllClassCourse',
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

  Attendance.prototype.getClassCourseSuccess = function (res) {
    if (res.code === OK) {
      var template = '<table class="table table-bordered table-hover" id="dataTable"><thead><tr><th>ID</th><th>课程</th><th>班级</th><th>教师</th><th>时间</th><th>教室</th><th>时间</th><th>状态</th></tr></thead><tbody>'
      var tr = ''
      if (res.data.length <= 0) {
        tr = '<tr class="course"><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td><td>无</td></tr>'
      } else {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].lock === 0) {
            tr += '<tr class="course"><td>' + res.data[i].id + '</td><td>' + res.data[i].courseName + '</td><td>' + res.data[i].class + '</td><td>' + res.data[i].teacherName + '</td><td>' + res.data[i].date + '周&nbsp;&nbsp;星期' + res.data[i].week + '&nbsp;&nbsp;' + res.data[i].section + '节' + '</td><td>' + res.data[i].classroom + '</td><td>' + res.data[i].time + '</td><td>未审核</td></tr>'
          } else {
            tr += '<tr class="course warning"><td>' + res.data[i].id + '</td><td>' + res.data[i].courseName + '</td><td>' + res.data[i].class + '</td><td>' + res.data[i].teacherName + '</td><td>' + res.data[i].date + '周&nbsp;&nbsp;星期' + res.data[i].week + '&nbsp;&nbsp;' + res.data[i].section + '节' + '</td><td>' + res.data[i].classroom + '</td><td>' + res.data[i].time + '</td><td>已审核</td></tr>'
          }
        }
      }
      template = template + tr + '</tbody>'

      this.eLoading.css('display', 'none')
      this.ePanelTable.append($(template))
      this.eDataTable = $('#dataTable')

      $('.course').on('click', $.proxy(this.getAttendance, this))
    } else if (res.code === ERROR) {
      this.eLoading.css('display', 'none')
      this.eCourseAlert.text(res.msg)
      this.eCourseAlert.fadeIn()
    }
  }

  Attendance.prototype.getClassCourseError = function () {
    this.eLoading.css('display', 'none')
    this.eCourseAlert.text('网络错误,请刷新重试')
    this.eCourseAlert.fadeIn()
  }

  Attendance.prototype.getAttendance = function (e) {
    this.eLoading.css('display', 'block')
    this.eDataTable.css('display', 'none')
    var id = $(e.currentTarget).find('td:eq(0)').text()
    var data = 'userId=' + this.userId + '&id=' + id
    $.ajax({
      url: 'api/getAttendance',
      type: 'POST',
      data: data,
      success: $.proxy(this.getAttendanceSuccess, this),
      error: $.proxy(this.getAttendanceError, this),
      timeout: 10000,
      xhrFields: {
        withCredentials: true
      }
    })
  }

  Attendance.prototype.getAttendanceSuccess = function (res) {
    this.eLoading.css('display', 'none')
    if (res.code === OK) {
      this.attendanceId = res.data.attendanceId
      var template = '<thead><tr><th>班级</th><th>学号</th><th>姓名</th><th>状态</th></tr></thead><tbody>'
      var tr = ''
      if (res.data.students.length === 0) {
        tr = '<tr><td>无</td><td>无</td><td>无</td><td>无</td></tr>'
      } else {
        for (var i = 0; i < res.data.students.length; i++) {
          tr += '<tr><td>' + res.data.students[i].class + '</td><td>' + res.data.students[i].studentId + '</td><td>' + res.data.students[i].name + '</td><td>' + '<select class="form-control" disabled>'
          for (var j = 1; j <= 6; j++) {
            if (j === 1) {
              if (j === res.data.students[i].stateId) {
                tr += '<option value="1" selected="selected">正常</option>'
              } else {
                tr += '<option value="1">正常</option>'
              }
            } else if (j === 2) {
              if (j === res.data.students[i].stateId) {
                tr += '<option value="2" selected="selected">迟到</option>'
              } else {
                tr += '<option value="2">迟到</option>'
              }
            } else if (j === 3) {
              if (j === res.data.students[i].stateId) {
                tr += '<option value="3" selected="selected">旷课</option>'
              } else {
                tr += '<option value="3">旷课</option>'
              }
            } else if (j === 4) {
              if (j === res.data.students[i].stateId) {
                tr += '<option value="4" selected="selected">事假</option>'
              } else {
                tr += '<option value="4">事假</option>'
              }
            } else if (j === 5) {
              if (j === res.data.students[i].stateId) {
                tr += '<option value="5" selected="selected">病假</option>'
              } else {
                tr += '<option value="5">病假</option>'
              }
            } else if (j === 6) {
              if (j === res.data.students[i].stateId) {
                tr += '<option value="6" selected="selected">早退</option>'
              } else {
                tr += '<option value="6">早退</option>'
              }
            }
          }
          tr += '</select></td></tr>'
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

  Attendance.prototype.getAttendanceError = function () {
    this.eLoading.css('display', 'none')
    this.eDataTable.removeAttr('style')
    this.eCourseAlert.text('网络错误,请刷新重试')
    this.eCourseAlert.fadeIn()
  }

  Attendance.prototype.back = function () {
    window.location.reload()
  }

  module.exports = Attendance
}($))
