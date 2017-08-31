var $ = require('jquery')
const OK = 1
const ERROR = 0;

(function ($) {
  var SetSchedules = function (elem) {
    this.userId = localStorage.getItem('userId')
    this.eLoading = $(elem.loading + ':eq(0)')
    this.eSchedulesInfo = $(elem.schedulesInfo)
    this.eCourseName = $(elem.courseName)
    this.eTeacherName = $(elem.teacherName)
    this.eClass = $(elem.class)
    this.eDate = $(elem.date)
    this.eWeek = $(elem.week)
    this.eSection = $(elem.section)
    this.eClassroom = $(elem.classroom)
    this.eCourseNameGroup = $(elem.courseNameGroup)
    this.eTeacherNameGroup = $(elem.teacherNameGroup)
    this.eClassGroup = $(elem.classGroup)
    this.eDateGroup = $(elem.dateGroup)
    this.eWeekGroup = $(elem.weekGroup)
    this.eSectionGroup = $(elem.sectionGroup)
    this.eClassroomGroup = $(elem.classroomGroup)
    this.eCourseNameAlert = $(elem.courseNameAlert)
    this.eTeacherNameAlert = $(elem.teacherNameAlert)
    this.eClassAlert = $(elem.classAlert)
    this.eDateAlert = $(elem.dateAlert)
    this.eWeekAlert = $(elem.weekAlert)
    this.eSectionAlert = $(elem.sectionAlert)
    this.eClassroomAlert = $(elem.classroomAlert)
    this.eSchedulesAlert = $(elem.schedulesAlert)
    this.eSubmitAlert = $(elem.submitAlert)
    this.eSubmitBtn = $(elem.submitBtn)
    this.eImportBtn = $(elem.importBtn)
  }

  SetSchedules.prototype.init = function () {
    this.eCourseName.on('blur', $.proxy(this.checkCourseName, this))
    this.eTeacherName.on('blur', $.proxy(this.checkTeacherName, this))
    this.eClass.on('blur', $.proxy(this.checkClass, this))
    this.eDate.on('blur', $.proxy(this.checkDate, this))
    this.eWeek.on('blur', $.proxy(this.checkWeek, this))
    this.eSection.on('blur', $.proxy(this.checkSection, this))
    this.eClassroom.on('blur', $.proxy(this.checkClassroom, this))
    this.eSubmitBtn.on('click', $.proxy(this.postSchedules, this))
  }

  SetSchedules.prototype.checkCourseName = function () {
    if (this.eCourseName.val().length === 0) {
      this.eCourseNameAlert.text('不能为空')
      this.eCourseNameAlert.fadeIn()
      this.eCourseNameGroup.addClass('has-error')
      return false
    } else {
      this.eCourseNameAlert.fadeOut()
      this.eCourseNameGroup.removeClass('has-error')
    }
    return true
  }

  SetSchedules.prototype.checkTeacherName = function () {
    if (this.eTeacherName.val().length === 0) {
      this.eTeacherNameAlert.text('不能为空')
      this.eTeacherNameAlert.fadeIn()
      this.eTeacherNameGroup.addClass('has-error')
      return false
    } else {
      this.eTeacherNameAlert.fadeOut()
      this.eTeacherNameGroup.removeClass('has-error')
    }
    return true
  }

  SetSchedules.prototype.checkClass = function () {
    var reg = /^.+\d{5}$/
    if (this.eClass.val().length === 0) {
      this.eClassAlert.text('不能为空')
      this.eClassAlert.fadeIn()
      this.eClassGroup.addClass('has-error')
      return false
    } else if (!reg.test(this.eClass.val())) {
      this.eClassAlert.text('输入不符合规则！请输入：例：软件工程14207')
      this.eClassAlert.fadeIn()
      this.eClassGroup.addClass('has-error')
      return false
    } else {
      this.eClassAlert.fadeOut()
      this.eClassGroup.removeClass('has-error')
    }
    return true
  }

  SetSchedules.prototype.checkDate = function () {
    var reg = /^\d{1,2}[-|\\/]\d{1,2}$/
    if (this.eDate.val().length === 0) {
      this.eDateAlert.text('不能为空')
      this.eDateAlert.fadeIn()
      this.eDateGroup.addClass('has-error')
      return false
    } else if (!reg.test(this.eDate.val())) {
      this.eDateAlert.text('输入不符合规则！请输入：例：1-16/1/16')
      this.eDateAlert.fadeIn()
      this.eDateGroup.addClass('has-error')
      return false
    } else {
      this.eDateAlert.fadeOut()
      this.eDateGroup.removeClass('has-error')
    }
    return true
  }

  SetSchedules.prototype.checkWeek = function () {
    var reg = /^\d{1}(,\d{1}){0,6}$/
    if (this.eWeek.val().length === 0) {
      this.eWeekAlert.text('不能为空')
      this.eWeekAlert.fadeIn()
      this.eWeekGroup.addClass('has-error')
      return false
    } else if (!reg.test(this.eWeek.val())) {
      this.eWeekAlert.text('输入不符合规则！请输入：例：1/1,2/2,3,5')
      this.eWeekAlert.fadeIn()
      this.eWeekGroup.addClass('has-error')
      return false
    } else {
      this.eWeekAlert.fadeOut()
      this.eWeekGroup.removeClass('has-error')
    }
    return true
  }

  SetSchedules.prototype.checkSection = function () {
    var reg = /^\d{1}(,\d{1}){0,7}$/
    if (this.eSection.val().length === 0) {
      this.eSectionAlert.text('不能为空')
      this.eSectionAlert.fadeIn()
      this.eSectionGroup.addClass('has-error')
      return false
    } else if (!reg.test(this.eSection.val())) {
      this.eSectionAlert.text('输入不符合规则！请输入：例：1/1,2/3,4,5')
      this.eSectionAlert.fadeIn()
      this.eSectionGroup.addClass('has-error')
      return false
    } else {
      this.eSectionAlert.fadeOut()
      this.eSectionGroup.removeClass('has-error')
    }
    return true
  }

  SetSchedules.prototype.checkClassroom = function () {
    var reg = /^[a-zA-Z]{1}\d{4}$/
    if (this.eClassroom.val().length === 0) {
      this.eClassroomAlert.text('不能为空')
      this.eClassroomAlert.fadeIn()
      this.eClassroomGroup.addClass('has-error')
      return false
    } else if (!reg.test(this.eClassroom.val())) {
      this.eClassroomAlert.text('输入不符合规则！请输入：例：A4101/a4101')
      this.eClassroomAlert.fadeIn()
      this.eClassroomGroup.addClass('has-error')
      return false
    } else {
      this.eClassroomAlert.fadeOut()
      this.eClassroomGroup.removeClass('has-error')
    }
    return true
  }

  SetSchedules.prototype.postSchedules = function () {
    if (this.checkCourseName() && this.checkTeacherName() && this.checkClass() && this.checkDate() && this.checkWeek() && this.checkSection() && this.checkClassroom()) {
      var data = this.eSchedulesInfo.serialize()
      this.eSubmitBtn.addClass('disabled')
      this.eSubmitBtn.text('修改中')
      $.ajax({
        url: '/api/submitSchedules',
        type: 'POST',
        data: data,
        success: $.proxy(this.submitSuccess, this),
        error: $.proxy(this.submitError, this),
        timeout: 10000,
        xhrFields: {
          withCredentials: true
        }
      })
    }
  }

  SetSchedules.prototype.submitSuccess = function (res) {
    if (res.code === OK) {
      this.eCourseName.val('')
      this.eTeacherName.val('')
      this.eClass.val('')
      this.eDate.val('')
      this.eWeek.val('')
      this.eSection.val('')
      this.eClassroom.val('')
      this.eSubmitBtn.removeClass('disabled')
      this.eSubmitBtn.text('提交')
      this.eSubmitAlert.text('提交成功')
      this.eSubmitAlert.fadeIn()
      setTimeout($.proxy(function () {
        this.eSubmitAlert.fadeOut()
      }, this), 2000)
    } else if (res.code === ERROR) {
      this.eSubmitBtn.removeClass('disabled')
      this.eSubmitBtn.text('提交')
      this.eSubmitAlert.text('res.msg')
      this.eSubmitAlert.fadeIn()
      setTimeout($.proxy(function () {
        this.eSubmitAlert.fadeOut()
      }, this), 2000)
    }
  }

  SetSchedules.prototype.submitError = function () {
    console.log(this.eSubmitAlert)
    this.eSubmitBtn.removeClass('disabled')
    this.eSubmitBtn.text('提交')
    this.eSubmitAlert.text('网络错误')
    this.eSubmitAlert.fadeIn()
    setTimeout($.proxy(function () {
      this.eSubmitAlert.fadeOut()
    }, this), 2000)
  }

  module.exports = SetSchedules
}($))
