var $ = require('jquery')

const OK = 1
const ERROR = 0;

(function ($) {
  var Search = function (elem) {
    this.userId = localStorage.getItem('userId')
    this.attendanceId = null
    this.courseTable = null
    this.attendanceTable = null
    this.eLoading = $(elem.loading + ':eq(0)')
    this.ePanelTable = $(elem.panelTable)
    this.eSearchForm = $(elem.searchForm)
    this.eSearchKeyGroup = $(elem.searchKeyGroup)
    this.eSearchKey = $(elem.searchKey)
    this.eSearchButton = $(elem.searchButton)
    this.eBackButton = $(elem.backButton)
    this.eSearchKeyAlert = $(elem.searchKeyAlert)
    this.eSearchAlert = $(elem.searchAlert)
  }

  Search.prototype.init = function () {
    this.eSearchKey.on('blur', $.proxy(this.checkKey, this))
    this.eSearchButton.on('click', $.proxy(this.searchAttendance, this))
  }

  Search.prototype.checkKey = function () {
    if (this.eSearchKey.val().length === 0) {
      this.eSearchKeyAlert.text('关键字不能为空')
      this.eSearchKeyAlert.fadeIn()
      this.eSearchKeyGroup.addClass('has-error')
      return false
    } else {
      this.eSearchKeyAlert.fadeOut()
      this.eSearchKeyGroup.removeClass('has-error')
      return true
    }
  }

  Search.prototype.searchAttendance = function () {
    if (this.checkKey()) {
      this.eSearchButton.text('搜索中')
      this.eSearchButton.addClass('disabled')
      var data = this.eSearchForm.serialize()
      data += '&userId=' + this.userId
      $.ajax({
        url: 'api/searchAttendance',
        type: 'POST',
        data: data,
        success: $.proxy(this.searchAttendanceSuccess, this),
        error: $.proxy(this.searchAttendanceError, this),
        timeout: 10000,
        xhrFields: {
          withCredentials: true
        }
      })
    }
  }

  Search.prototype.searchAttendanceSuccess = function (res) {
    this.eSearchButton.text('搜索')
    this.eSearchButton.removeClass('disabled')
    if (res.code === OK) {
      this.eSearchButton.parent().css('display', 'none')
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

      this.eSearchForm.css('display', 'none')
      this.ePanelTable.append($(template))
      this.eDataTable = $('#dataTable')
      this.courseTable = template
      this.eBackButton.parent().css('display', 'block')

      $('.course').on('click', $.proxy(this.searchScheduleTime, this))
      this.eBackButton.on('click', $.proxy(this.back, this))
    } else if (res.code === ERROR) {
      this.eSearchButton.removeClass('disabled')
      this.eSearchAlert.text(res.msg)
      this.eSearchAlert.fadeIn()
      setTimeout($.proxy(function () {
        this.eSearchAlert.fadeOut()
      }, this), 2000)
    }
  }

  Search.prototype.searchAttendanceError = function () {
    this.eSearchButton.text('搜索')
    this.eSearchButton.removeClass('disabled')
    this.eSearchAlert.text('网络错误，请刷新重试')
    this.eSearchAlert.fadeIn()
  }

  Search.prototype.searchScheduleTime = function (e) {
    this.eLoading.css('display', 'block')
    this.eDataTable.css('display', 'none')
    var id = $(e.currentTarget).find('td:eq(0)').text()
    var data = 'userId=' + this.userId + '&id=' + id
    $.ajax({
      url: 'api/getAttendance',
      type: 'POST',
      data: data,
      success: $.proxy(this.searchScheduleTimeSuccess, this),
      error: $.proxy(this.searchScheduleTimeError, this),
      timeout: 10000,
      xhrFields: {
        withCredentials: true
      }
    })
  }

  Search.prototype.searchScheduleTimeSuccess = function (res) {
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
      this.attendanceTable = this.eDataTable
      this.eDataTable.removeAttr('style')
    } else if (res.code === ERROR) {
      this.eDataTable.removeAttr('style')
      this.eSearchAlert.text(res.msg)
      this.eSearchAlert.fadeIn()
      setTimeout($.proxy(function () {
        this.eSearchAlert.fadeOut()
      }, this), 2000)
    }
  }

  Search.prototype.searchScheduleTimeError = function () {
    this.eDataTable.removeAttr('style')
    this.eSearchAlert.text('网络错误，请刷新重试')
    this.eSearchAlert.fadeIn()
  }

  Search.prototype.back = function () {
    if (this.courseTable !== null && this.attendanceTable === null) {
      window.location.reload()
    } else if (this.courseTable !== null && this.attendanceTable !== null) {
      this.attendanceTable = null
      this.eDataTable.remove()
      this.ePanelTable.append($(this.courseTable))
      this.eDataTable = $('#dataTable')
      $('.course').on('click', $.proxy(this.searchScheduleTime, this))
    }
  }

  module.exports = Search
}($))
