var $ = require('jquery')
const OK = 1
const ERROR = 0;

(function ($) {
  var DaysCheck = function (elem) {
    this.userId = localStorage.getItem('userId')
    this.getDefaultDays = 0
    this.eLoading = $(elem.loading + ':eq(0)')
    this.eDefaultDays = $(elem.defaultDays)
    this.eDefaultDaysGroup = $(elem.defaultDaysGroup)
    this.echangeDaysBtn = $(elem.changeDaysBtn)
    this.echangeDaysAlert = $(elem.changeDaysAlert)
  }

  DaysCheck.prototype.init = function () {
    $.proxy(this.getDays(), this)
    this.echangeDaysBtn.on('click', $.proxy(this.changeDefaultDays, this))
  }

  DaysCheck.prototype.getDays = function () {
    var data = 'userId=' + this.userId
    $.ajax({
      url: '/api/checkday',
      type: 'POST',
      data: data,
      success: $.proxy(this.getDaysSuccess, this),
      error: $.proxy(this.getDaysError, this),
      timeout: 10000,
      xhrFields: {
        withCredentials: true
      }
    })
  }

  DaysCheck.prototype.getDaysSuccess = function (res) {
    if (res.code === OK) {
      this.getDefaultDays = parseInt(res.data)
      this.eDefaultDays.val(this.getDefaultDays)
      this.eLoading.fadeOut()
      this.eDefaultDaysGroup.fadeIn()
      this.echangeDaysBtn.fadeIn()
    } else if (res.code === ERROR) {
      this.echangeDaysAlert.text(res.msg)
      this.echangeDaysAlert.fadeIn()
      setTimeout($.proxy(function () {
        this.echangeDaysAlert.fadeOut()
      }, this), 2000)
    }
  }

  DaysCheck.prototype.getDaysError = function () {
    this.eLoading.css('display', 'none')
    this.echangeDaysAlert.text('网络错误')
    this.echangeDaysAlert.fadeIn()
  }

  DaysCheck.prototype.changeDefaultDays = function () {
    if (this.getDefaultDays === parseInt(this.eDefaultDays.val())) {
      this.echangeDaysAlert.text('审核时间未修改')
      this.echangeDaysAlert.fadeIn()
      setTimeout($.proxy(function () {
        this.echangeDaysAlert.fadeOut()
      }, this), 2000)
      return false
    } else {
      console.log(this.echangeDaysBtn)
      this.echangeDaysAlert.fadeOut()
      var data = 'userId=' + this.userId
      data += '&lockTime=' + this.eDefaultDays.val()
      this.echangeDaysBtn.addClass('disabled')
      this.echangeDaysBtn.text('设置中')
      $.ajax({
        url: '/api/updateCheckDay',
        type: 'POST',
        data: data,
        success: $.proxy(this.postDaysSuccess, this),
        error: $.proxy(this.postDaysError, this),
        timeout: 10000
      })
    }
    return true
  }

  DaysCheck.prototype.postDaysSuccess = function (res) {
    if (res.code === OK) {
      this.echangeDaysBtn.text('修改')
      this.echangeDaysBtn.removeClass('disabled')
      this.echangeDaysAlert.text('设置成功')
      this.echangeDaysAlert.fadeIn()
      setTimeout($.proxy(function () {
        this.echangeDaysAlert.fadeOut()
      }, this), 2000)
    } else if (res.code === ERROR) {
      this.echangeDaysBtn.text('修改')
      this.echangeDaysBtn.removeClass('disabled')
      this.echangeDaysAlert.text(res.msg)
      this.echangeDaysAlert.fadeIn()
      setTimeout($.proxy(function () {
        this.echangeDaysAlert.fadeOut()
      }, this), 2000)
    }
  }

  DaysCheck.prototype.postDaysError = function () {
    this.echangeDaysBtn.text('修改')
    this.echangeDaysBtn.removeClass('disabled')
    this.echangeDaysAlert.text('网络错误')
    this.echangeDaysAlert.fadeIn()
    setTimeout($.proxy(function () {
      this.echangeDaysAlert.fadeOut()
    }, this), 2000)
  }

  module.exports = DaysCheck
}($))
