require('../assets/css/style.css')
var $ = require('jquery')
var PwdChange = require('./pwdchange')

$(function () {
  var elem = {}
  elem.changeForm = '#changepwdForm'
  elem.oldPwd = '#oldPassword'
  elem.newPwd1 = '#newPassword1'
  elem.newPwd2 = '#newPassword2'
  elem.oldPwdGroup = '#oldPasswordGroup'
  elem.newPwdGroup1 = '#newPasswordGroup1'
  elem.newPwdGroup2 = '#newPasswordGroup2'
  elem.oldPwdAlert = '#oldPasswordAlert'
  elem.newPwd1Alert = '#newPassword1Alert'
  elem.newPwd2Alert = '#newPassword2Alert'
  elem.changePwdAlert = '#changeAlert'
  elem.changePwdBtn = '#changepwdButton'
  var changepwd = new PwdChange(elem)
  changepwd.init()
})
