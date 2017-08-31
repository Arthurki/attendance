var $ = require('jquery')
const OK = 1
const ERROR = 0;

(function ($) {
  var PwdChange = function (elem) {
    this.userId = localStorage.getItem('userId')
    this.eChangeForm = $(elem.changeForm)
    this.eOldPwd = $(elem.oldPwd)
    this.eNewPwd1 = $(elem.newPwd1)
    this.eNewPwd2 = $(elem.newPwd2)
    this.eOldPwdGroup = $(elem.oldPwdGroup)
    this.eNewPwdGroup1 = $(elem.newPwdGroup1)
    this.eNewPwdGroup2 = $(elem.newPwdGroup2)
    this.eOldPwdAlert = $(elem.oldPwdAlert)
    this.eNewPwd1Alert = $(elem.newPwd1Alert)
    this.eNewPwd2Alert = $(elem.newPwd2Alert)
    this.eChangePwdAlert = $(elem.changePwdAlert)
    this.eChangePwdBtn = $(elem.changePwdBtn)
  }

  PwdChange.prototype.init = function () {
    this.eOldPwd.on('blur', this.checkPwd.bind(undefined, this.eOldPwd, this.eOldPwdAlert, this.eOldPwdGroup))
    this.eNewPwd1.on('blur', this.checkPwd.bind(undefined, this.eNewPwd1, this.eNewPwd1Alert, this.eNewPwdGroup1))
    this.eNewPwd2.on('blur', $.proxy(this.checkSamePwd, this))
    this.eChangePwdBtn.on('click', $.proxy(this.postChange, this))
  }

  PwdChange.prototype.checkPwd = function (ele, eleAlert, eleGroup) {
    if (ele.val().length === 0) {
      eleAlert.text('密码不能为空')
      eleAlert.fadeIn()
      eleGroup.addClass('has-error')
      return false
    } else if (ele.val().length < 6) {
      eleAlert.text('密码不能少于6位')
      eleAlert.fadeIn()
      eleGroup.addClass('has-error')
      return false
    } else {
      eleAlert.fadeOut()
      eleGroup.removeClass('has-error')
    }
    return true
  }

  PwdChange.prototype.checkSamePwd = function () {
    if (this.eNewPwd2.val() !== this.eNewPwd1.val()) {
      this.eNewPwd2Alert.text('两次密码不一致')
      this.eNewPwd2Alert.fadeIn()
      this.eNewPwdGroup2.addClass('has-error')
      return false
    } else {
      this.eNewPwd2Alert.fadeOut()
      this.eNewPwdGroup2.removeClass('has-error')
    }
    return true
  }

  PwdChange.prototype.postChange = function () {
    if (this.checkPwd(this.eOldPwd, this.eOldPwdAlert, this.eOldPwdGroup) && this.checkPwd(this.eNewPwd1, this.eNewPwd1Alert, this.eNewPwdGroup1) && this.checkSamePwd()) {
      var data = this.eChangeForm.serialize()
      data += '&userId=' + this.userId
      this.eChangePwdBtn.addClass('disabled')
      this.eChangePwdBtn.text('修改中')
      $.ajax({
        url: '/api/updatePassword',
        type: 'POST',
        data: data,
        success: $.proxy(this.changeSuccess, this),
        error: $.proxy(this.changeError, this),
        timeout: 10000,
        xhrFields: {
          withCredentials: true
        }
      })
    }
  }

  PwdChange.prototype.changeSuccess = function (res) {
    if (res.code === OK) {
      this.eOldPwd.val('')
      this.eNewPwd1.val('')
      this.eNewPwd2.val('')
      this.eChangePwdBtn.text('修改')
      this.eChangePwdBtn.removeClass('disabled')
      this.eChangePwdAlert.text('修改成功')
      this.eChangePwdAlert.fadeIn()
      setTimeout($.proxy(function () {
        this.eChangePwdAlert.fadeOut()
      }, this), 2000)
    } else if (res.code === ERROR) {
      this.eChangePwdBtn.text('修改')
      this.eChangePwdBtn.removeClass('disabled')
      this.eChangePwdAlert.text(res.msg)
      this.eChangePwdAlert.fadeIn()
      setTimeout($.proxy(function () {
        this.eChangePwdAlert.fadeOut()
      }, this), 2000)
    }
  }

  PwdChange.prototype.changeError = function () {
    this.eChangePwdBtn.text('修改')
    this.eChangePwdBtn.removeClass('disabled')
    this.eChangePwdAlert.text('网络错误')
    this.eChangePwdAlert.fadeIn()
    setTimeout($.proxy(function () {
      this.eChangePwdAlert.fadeOut()
    }, this), 2000)
  }

  module.exports = PwdChange
}($))
