/**
 * Created by apple on 16/7/8.
 */
 var touserid = ''
 var touserName = ''
 $(function () {
 
   var maxMessageCount = 100, maxMessageLength = 300
 
   // 开始直播
   DWLive.onLiveStart = function (j) {
     // console.log(j);
   }
 
   // 停止直播
   DWLive.onLiveEnd = function (j) {
     // console.log(j);
   }
 
   // 在线人数
   DWLive.onUserCountMessage = function (j) {
     // console.log(j);
   }
 
   // 接收公聊
   DWLive.onPublicChatMessage = function (j) {
     var msg = JSON.parse(j)
     var adminClass = ''
     var adminText = ''
     if (msg.groupId === DWLive.groupId || !DWLive.groupId || !msg.groupId) {
       if (msg.userrole == 'publisher' || msg.userrole == 'teacher' || msg.userrole == 'host') {
         adminClass = 'admin'
         adminText = '<span>管理</span>'
       }
       var name = escapeHTML(msg['username']), msgStr = showEm(msg['msg']
         || ''), userId = msg['userid'], divEl, chatId = msg['chatId'], status = msg['status']
       if (name == DWLive.viewername) {
         divEl = '<li class="message msg-send"><div class="msg-info"><span class="user-name ' + adminClass + '">' + adminText
           + name
           + ':</span><span class="msg-time">' + msg.time + '</span></div><div class="msg-content">'
           + msgStr + '</div></li>'
       } else {
         divEl = '<li  class="message message-received"chatId="' + chatId + '" status="' + status + '"><div class="msg-info"><span class="user-name ' + adminClass + '">' + adminText
           + name
           + ':</span><span class="msg-time">' + msg.time + '</span></div><div class="msg-content">'
           + msgStr + '</div></li>'
       }
       $('#chat_container').append(divEl)
       var messageCount = $('#chat_container').children().length
       var overCount = messageCount - maxMessageCount
       if (overCount > 0) {
         $('#chat_container > div:lt(' + overCount + ')')
           .remove()
       }
       //大量聊天数据优化
       var rc = $('#chat_container').children().length - 500
       if (rc > 0) {
         $('#chat_container > li:lt(' + rc + ')').remove()
       }
     }
 
 
     $('#chat_container').parent().scrollTop($('#chat_container').height())
 
   }
   //聊天控制
   DWLive.onPublicChatLogManage = function (j) {
     var chatInfo = JSON.parse(j)
     var status = chatInfo.status
     var chatIds = chatInfo.chatIds
     $.each(chatIds, function (index, data) {
       var cId = '[chatId=' + data + ']'
       $(cId).attr('status', status)
     })
   }
   // 接收私聊
   DWLive.onPrivateChatMessage = function (s) {
     var j = JSON.parse(s)
     $('#chat_container')
       .append(
         '<li class="message msg-send pchat"><div class="msg-info"><span class="user-name">我对讲师说:</span><span class="msg-time">' + j.time + '</span></div><div class="msg-content">'
         + showEm(j.msg) + '</div></li>')
     $('#chat_container').parent().scrollTop($('#chat_container').height())
   }
 
   // 接收私聊回复
   DWLive.onPrivateAnswer = function (s) {
     var j = JSON.parse(s)
     $('#chat_container')
       .append(
         '<li class="message message-received pchat"><div class="msg-info"><span class="user-name">讲师('
         + j.fromusername
         + ')对我说:</span><span class="msg-time">' + j.time + '</span></div><div class="msg-content">'
         + showEm(j.msg) + '</div></li>')
     $('#chat_container').parent().scrollTop($('#chat_container').height())
 
   }
 
 
   // 提问
   DWLive.onQuestion = function (s) {
     console.log('------question.questionUserAvatar---->>', s)
     var j = JSON.parse(s)
     if (!j) {
       return
     }
     if (j.action !== 'question') {
       return
     }
     var v = j.value
     if (!v) {
       return
     }
     var qid = v.id,
       qc = v.content,
       quid = v.userId,
       quname = v.userName
     if (!$('#questionInfo').length) {
       return
     }
 
 
     // if(!q){
     //     return;
     // }
     if (v.groupId === DWLive.groupId || !DWLive.groupId || !v.groupId) {
       var q = $('#questionInfo #' + qid)
       if (!q.length) {
         $('#questionInfo').append('<li style="display:none;" id="' + qid + '"></li>')
         q = $('#questionInfo #' + qid)
       }
       var self = ''
       if (quname == DWLive.viewername) {
         self = 'self'
       }
 
       q.append('<p class="qaask"><span class="askname ' + self + '">' + $.escapeHTML(quname) + '：</span><span class="askmsg">' + $.escapeHTML(qc) + '</span></p>')
       if (quname == DWLive.viewername) {
         q.show()
         q.attr('self', '1')
       }
     }
     $('#questionInfo').parent().scrollTop($('#questionInfo').height())
   }
 
   // 接收回答
   DWLive.onAnswer = function (s) {
     var j = JSON.parse(s)
     if (!j) {
       return
     }
     if (j.action !== 'answer') {
       return
     }
     var v = j.value
     if (!v) {
       return
     }
     var qid = v.questionId,
       qc = v.content,
       quid = v.userId,
       quname = v.userName,
       questionUserId = v.questionUserId,
       isPrivate = v.isPrivate
 
     if (questionUserId != DWLive.viewerid && isPrivate) {
       return
     }
     if (!$('#questionInfo').length) {
       return
     }
     var q = $('#questionInfo #' + qid)
     // if (!q.length) {
     //     return;
     //     // $('#questionInfo').append('<li style="display:none;" id="' + qid + '"></li>');
     //     // q = $('#questionInfo #' + qid);
     // }
     if (v.groupId === DWLive.groupId || !DWLive.groupId || !v.groupId) {
       if (!q) return
       q.append('<p class="qaanswer"><span class="icon08"></span><span class="answername">' + $.escapeHTML(quname) + '：</span><span class="answermsg">' + $.escapeHTML(qc) + '</span></p>')
       q.attr('isAnswer', '1')
 
       if (!$('.myask').hasClass('askactive')) {
         q.show()
       } else {
         if (!$('.qare').hasClass('on')) {
           $('.qare').addClass('showt')
         }
       }
     }
     $('#questionInfo').parent().scrollTop($('#questionInfo').height())
   }
 
   // 禁言
   DWLive.onInformation = function (j) {
     alert('您已经被禁言！')
   }
   DWLive.onOnlineTeachers = function (l) {
     var list = l.teachers;
     for (var i = 0; i < list.length; i++) {
       var data = list[i]
       if (data.role === 'publisher') {
         touserid = data.id;
         touserName = data.name;
       }
     }
   }
 
   $('#chatlistbtn').click(function () {
     var f = $(this).attr('for')
     if (f === 'all') {
       $('#chatlistbtn').addClass('askactive')
       $(this).attr('for', 'tearch')
       $('#chat_input').attr('placeholder', '私聊模式,您的发言仅管理员可见')
     } else {
       $('#chatlistbtn').removeClass('askactive')
       $(this).attr('for', 'all')
       $('#chat_input').attr('placeholder', '公聊模式,您的发言所有人可见')
     }
   })
 
   $('.myask').click(function (e) {
     $(this).toggleClass('askactive')
     if ($(this).hasClass('askactive')) {
       $('#questionInfo li').hide()
       $('#questionInfo li[self="1"]').show()
     } else {
       $('#questionInfo li[isAnswer="1"]').show()
     }
 
     return false
   })
 
   // 展示公告
   $('.gboxw .gbtn').click(function () {
     $('.gboxw .gbox').show()
     $('.gboxw .gbtn').hide()
   })
 
   // 隐藏公告
   $('.gboxw .closegbox').click(function () {
     $('.gboxw .gbox').hide()
     $('.gboxw .gbtn').show()
   })
 
   // 发布公告
   DWLive.onAnnouncementRelease = function (j) {
     $('.gbox div').html(j)
     $('.gbtn').click()
   }
 
   DWLive.onAnnouncementShow = function (j) {
     $('.gbox div').html(j)
   }
 
   // 删除公告
   DWLive.onAnnouncementRemove = function () {
     $('.gbox div').html('暂无公告')
   }
 
 })
 
 function chatSend() {
 
   var msg = $.trim($('#chat_input').val())
   if(msg.replace(/(^s*)|(s*$)/g, "").length ==0){
       
   } else {
       DWLive.sendPublicChatMsg(msg)
       $('#chat_input').val('')
   }
 
 /*  if ($('#chatlistbtn').attr('for') === 'all') {
 
     DWLive.sendPublicChatMsg(msg) // 发送公聊
 
   } else {
 
     if (!touserid) return
     DWLive.sendPrivateChatMsg(touserid, touserName, msg) // 发送私聊
 
   }*/
 
 
 }
 
 function qaSend() {
   var qa = $('#qaV')
   var msg = $.trim(qa.val())
 
   if (!msg) {
     alert('请输入您的问题！')
     return
   }
 
   if (msg.length > 300) {
     alert('问题不能超过300个字符')
     return
   }
 
   DWLive.sendQuestionMsg(msg) // 发送问题
 
   // qa.val("").focus();
   qa.val('')
 }
 
 
 function showEm(str) {
   if (!$.trim(str)) {
     return ''
   }
   str = str.replace(/\</g, '&lt;')
   str = str.replace(/\>/g, '&gt;')
   str = str.replace(/\n/g, '<br/>')
   str = str.replace(/\[em_([0-9]*)\]/g, '<img src="http://view.csslcloud.net/img/em/$1.gif" border="0" />')
   str = str.replace(/\[em2_([0-9]*)\]/g, '<img src="http://view.csslcloud.net/img/em2/$1.png" border="0" />')
 
   var nmsg = ''
   $.each(str.split(' '), function (i, n) {
     n = $.trim(n)
     if (n.indexOf('[uri_') == 0 && n.indexOf(']') == n.length - 1 && n.length > 6) {
       var u = n.substring(5, n.length - 1) + ' '
       nmsg += '<a target="_blank" style="color: #2f53ff" href="' + u + '">' + u + '</a>' + ' '
     } else {
       nmsg += n + ' '
     }
   })
 
   return nmsg
 }
 
 function escapeHTML(str) {
   if (!str) {
     return ''
   }
   var HTMLREGEXP = /\<|\>|\"|\'|\&|\s/g
   return str.replace(HTMLREGEXP, function (s) {
     switch (s) {
       case '&':
         return '&amp;'
       case '<':
         return '&lt;'
       case '>':
         return '&gt;'
       case '"':
         return '&quot;'
       case '\'':
         return '&#39;'
       case ' ':
         return '&nbsp;'
       default:
         return ''
     }
   })
 }
 
 
 // 签到
 DWLive.onStartRollCall = function (data) {
   if (window.ROLLCALL_INTERVAL_TIMER > 0) {
     clearInterval(window.ROLLCALL_INTERVAL_TIMER)
     window.ROLLCALL_INTERVAL_TIMER = -1
   }
   var rid = data.rollcallId,
     pid = data.publisherId,
     time = data.duration
   $('.signtxt').html('签到倒计时: <span id="signtime">00:00</span>').css('margin-top', '75px')
   $('.signbtn button').show()
   $('#signtime').text(timeFormat(time))
   $('.video-box').css({ 'width': 1, 'height': 1 })
   $('.sign').show()
   $('.signbtn button').click(function () {
     DWLive.answerRollcall(rid, pid)
     $('.sign').hide()
 
     $('.video-box').css({ 'width': '100%', 'height': '100%' })
     if ($('.vote').is(':visible') || $('.mask').is(':visible')) {
       $('.video-box').css({ 'width': 1, 'height': 1 })
     }
     if (window.ROLLCALL_INTERVAL_TIMER > 0) {
       clearInterval(window.ROLLCALL_INTERVAL_TIMER)
       window.ROLLCALL_INTERVAL_TIMER = -1
     }
   })
 
   window.ROLLCALL_INTERVAL_TIMER = setInterval(function () {
     if (time > 1) {
       time--
       $('#signtime').text(timeFormat(time))
     } else {
       $('.signtxt').html('签到结束').css('margin-top', '90px')
       $('.signbtn button').hide()
       setTimeout(function () {
         $('.sign').hide()
         $('.video-box').css({ 'width': '100%', 'height': '100%' })
         if ($('.vote').is(':visible') || $('.mask').is(':visible')) {
           $('.video-box').css({ 'width': 1, 'height': 1 })
         }
       }, 2000)
       if (window.ROLLCALL_INTERVAL_TIMER > 0) {
         clearInterval(window.ROLLCALL_INTERVAL_TIMER)
         window.ROLLCALL_INTERVAL_TIMER = -1
       }
     }
   }, 1000)
 }
 
 function timeFormat(time) {
   var t = parseInt(time),
     h, i, s
   h = Math.floor(t / 3600)
   h = h ? (h + ':') : ''
   i = h ? Math.floor(t % 3600 / 60) : Math.floor(t / 60)
   s = Math.floor(t % 60)
   i = i > 9 ? i : '0' + i
   s = s > 9 ? s : '0' + s
   return (h + i + ':' + s)
 }
 
 var win = false,
   stop = false
 // 开始抽奖
 DWLive.onStartLottery = function () {
   stop = false
   $('.lottery').show()
   $('.video-box').css({ 'width': 1, 'height': 1 })
   $('.lotterybox').hide()
   if (win == true) {
     $('.lotteryh3').html('恭喜您中奖啦')
   } else {
     $('.lotteryh3').html('正在抽奖')
   }
 }
 
 // 中奖
 DWLive.onWinLottery = function (data) {
   var code = data.lotteryCode,
     name = data.viewerName
   $('.video-box').css({ 'width': 1, 'height': 1 })
   if (data.viewerId == DWLive.viewerid) {
     $('.lotterynum').html(code)
     $('.lotterybox').hide()
     $('.lotterynum, .lotterytext, .lottery').show()
     $('.lotteryh3').html('恭喜您中奖啦')
     $('.lotterynum, .lotterytext').css('z-index', 9)
     win = true
   } else {
     $('.lotteryname').html(name)
     $('.lotterybox, .lottery').show()
     if (win == true) {
       $('.lotteryh3').html('恭喜您中奖啦')
     } else {
       $('.lotteryh3').html('哎呀，就差一点')
     }
     setTimeout(function () {
       $('.lotterybox').hide()
       if (win == true) {
         $('.lotteryh3').html('恭喜您中奖啦')
       } else {
         $('.lotteryh3').html('正在抽奖')
       }
     }, 2000)
   }
 }
 
 $('.lotteryclose').click(function () {
   if (win == true) {
     if (stop == true) {
       $('.lottery').hide()
       $('.video-box').css({ 'width': '100%', 'height': '100%' })
       if ($('.vote').is(':visible') || $('.mask').is(':visible')) {
         $('.video-box').css({ 'width': 1, 'height': 1 })
       }
     }
     $('.lotterynum, .lotterytext').hide()
     $('.lotteryh3').html('正在抽奖')
     win = false
   } else {
     $('.lottery').hide()
     $('.video-box').css({ 'width': '100%', 'height': '100%' })
     if ($('.vote').is(':visible') || $('.mask').is(':visible')) {
       $('.video-box').css({ 'width': 1, 'height': 1 })
     }
   }
 })
 
 // 结束抽奖
 DWLive.onStopLottery = function () {
   stop = true
   if (win == false) {
     setTimeout(function () {
       $('.lottery').hide()
       $('.video-box').css({ 'width': '100%', 'height': '100%' })
       if ($('.vote').is(':visible') || $('.mask').is(':visible')) {
         $('.video-box').css({ 'width': 1, 'height': 1 })
       }
     }, 2000)
   }
 }
 
 // 答题
 var option = ''
 window.voteOptions = []
 DWLive.onStartVote = function (data) {
   option = ''
   window.voteOptions = []
 
   var voteid = data.voteId
   var pid = data.publisherId
   var count = data.voteCount
   var voteType = data.voteType
 
   if (count == 5) {
     $('.vote-option').append('<li>A<span></span></li><li>B<span></span></li><li>C<span></span></li><li>D<span></span></li><li>E<span></span></li>')
     $('.vote-option').css('padding-left', 10)
     $('.vote-option li').css('margin-right', 7)
     $('.vote-option li:last-child').css('margin-right', 0)
     $('#vote1').append('<div class="votebtn"><button>提交</button></div>')
   }
   if (count == 4) {
     $('.vote-option').append('<li>A<span></span></li><li>B<span></span></li><li>C<span></span></li><li>D<span></span></li>')
     $('.vote-option').css('padding-left', 28)
     $('.vote-option li').css('margin-right', 15)
     $('#vote1').append('<div class="votebtn"><button>提交</button></div>')
   }
   if (count == 3) {
     $('.vote-option').append('<li>A<span></span></li><li>B<span></span></li><li>C<span></span></li>')
     $('.vote-option').css('padding-left', 50)
     $('.vote-option li').css('margin-right', 25)
     $('#vote1').append('<div class="votebtn"><button>提交</button></div>')
   }
   if (count == 2) {
     $('.vote-option').append('<li>A<span></span></li><li>B<span></span></li>')
     $('.vote-option li').eq(0).addClass('vote-r')
     $('.vote-option li').eq(1).addClass('vote-w')
     $('.vote-option').css('padding-left', 80)
     $('.vote-option li').css('margin-right', 40)
     $('#vote1').append('<div class="votebtn"><button>提交</button></div>')
   }
   $('.vote-option li:last-child').addClass('last-item')
   $('.vote').show()
   $('#vote1').show()
   $('#vote2').hide()
   $('.vote-list').empty()
   $('.video-box').css({ 'width': 1, 'height': 1 })
 
   $('.vote-option li').click(function () {
     var index = $('.vote-option li').index(this)
 
     if (voteType == 1) { // 多选题
       if ($(this).hasClass('active')) {
         $(this).removeClass('active')
       } else {
         $(this).addClass('active')
       }
 
       window.voteOptions = []
       $('.vote-option li').each(function (index, data) {
         if ($(data).hasClass('active')) {
           window.voteOptions.push(index)
         }
       })
     } else {
       $(this).addClass('active').siblings().removeClass('active')
     }
 
     $('.votebtn button').css('opacity', 1)
     option = index
   })
   $('.votebtn button').click(function () {
     if ($('.vote-option li').hasClass('active')) {
       var j = {
         'voteId': voteid,
         'publisherId': pid
       }
 
       if (voteType == 1) { // 多选题
         j.voteOption = voteOptions
       } else {
         j.voteOption = option
       }
 
       DWLive.replyVote(voteid, j.voteOption, pid)
 
       $('.vote').hide()
       $('.vote-option').empty()
       $('.votebtn button').css('opacity', 0.6)
       $('.video-box').css({ 'width': '100%', 'height': '100%' })
       if ($('.mask').is(':visible')) {
         $('.video-box').css({ 'width': 1, 'height': 1 })
       }
       $('.votebtn').remove()
     }
   })
   $('.vote-close').click(function () {
     $('.vote').hide()
     $('.vote-option, .vote-list').empty()
     $('.votebtn button').css('opacity', 0.6)
     $('.video-box').css({ 'width': '100%', 'height': '100%' })
     if ($('.mask').is(':visible')) {
       $('.video-box').css({ 'width': 1, 'height': 1 })
     }
     option = ''
     window.voteOptions = []
     $('.votebtn').remove()
   })
 }
 
 // 结束答题
 DWLive.onStopVote = function () {
   $('.vote').hide()
   $('.vote-option, .vote-list').empty()
   $('.votebtn button').css('opacity', 0.6)
   $('.video-box').css({ 'width': '100%', 'height': '100%' })
   if ($('.mask').is(':visible')) {
     $('.video-box').css({ 'width': 1, 'height': 1 })
   }
   $('.votebtn').remove()
 }
 
 // 答题统计
 DWLive.onVoteResult = function (data) {
   // 选项个数
   var count = data.voteCount
   // 正确答案 数字或者数组
   var coption = data.correctOption
   // 多选题目
   var isMultiple = !((typeof coption) === 'number')
   // 判断题目
   var isJudge = count == 2
 
   var statisics = data.statisics
   var zcount = ''
 
   // 总回答人数
   var answerCount = data.answerCount
 
   // 正确内容
   var correctAnswer = ''
   var selfAnswer = ''
 
   if (isMultiple) {
     var ccs = []
     $.each(coption, function (index, o) {
       if (o >= 0 && o < 26) {
         ccs.push(String.fromCharCode(65 + o))
       }
     })
     correctAnswer = ccs.join(',')
 
     var ccs2 = []
     $.each(voteOptions, function (index, o) {
       if (o >= 0 && o < 26) {
         ccs2.push(String.fromCharCode(65 + o))
       }
     })
     selfAnswer = ccs2.join(',')
   } else if (isJudge) {
     if (coption == 0) {
       correctAnswer = '<i class="vote-ricon"></i>'
     } else if (coption == 1) {
       correctAnswer = '<i class="vote-wicon"></i>'
     }
 
     if ($.isNumeric(option) && option == 0) {
       selfAnswer = '<i class="vote-ricon"></i>'
     } else if ($.isNumeric(option) && option == 1) {
       selfAnswer = '<i class="vote-wicon"></i>'
     }
   } else {
     if ($.isNumeric(coption) && coption >= 0 && coption < 26) {
       correctAnswer = String.fromCharCode(65 + coption)
     }
     if ($.isNumeric(option) && option >= 0 && option < 26) {
       selfAnswer = String.fromCharCode(65 + option)
     }
   }
 
   switch (count) {
     case 2:
       var li = '<li>'
         + '<span class="spanl">√:</span>'
         + '<div class="vote-bar">'
         + '<div class="vote-in"></div>'
         + '</div>'
         + '<span class="color1">' + statisics[0].count + '人</span>'
         + '<span>(' + statisics[0].percent + '%)</span>'
         + '</li>'
         + '<li class="last-item">'
         + '<span class="spanl">X:</span>'
         + '<div class="vote-bar">'
         + '<div class="vote-in"></div>'
         + '</div>'
         + '<span class="color1">' + statisics[1].count + '人</span>'
         + '<span>(' + statisics[1].percent + '%)</span>'
         + '</li>'
       $('.vote-list').append(li)
       zcount = statisics[0].count + statisics[1].count
       break
     case 3:
       var li = '<li>'
         + '<span class="spanl">A:</span>'
         + '<div class="vote-bar">'
         + '<div class="vote-in"></div>'
         + '</div>'
         + '<span class="color1">' + statisics[0].count + '人</span>'
         + '<span>(' + statisics[0].percent + '%)</span>'
         + '</li>'
         + '<li>'
         + '<span class="spanl">B:</span>'
         + '<div class="vote-bar">'
         + '<div class="vote-in"></div>'
         + '</div>'
         + '<span class="color1">' + statisics[1].count + '人</span>'
         + '<span>(' + statisics[1].percent + '%)</span>'
         + '</li>'
         + '<li class="last-item">'
         + '<span class="spanl">C:</span>'
         + '<div class="vote-bar">'
         + '<div class="vote-in"></div>'
         + '</div>'
         + '<span class="color1">' + statisics[2].count + '人</span>'
         + '<span>(' + statisics[2].percent + '%)</span>'
         + '</li>'
       $('.vote-list').append(li)
       zcount = statisics[0].count + statisics[1].count + statisics[2].count
       break
     case 4:
       var li = '<li>'
         + '<span class="spanl">A:</span>'
         + '<div class="vote-bar">'
         + '<div class="vote-in"></div>'
         + '</div>'
         + '<span class="color1">' + statisics[0].count + '人</span>'
         + '<span>(' + statisics[0].percent + '%)</span>'
         + '</li>'
         + '<li>'
         + '<span class="spanl">B:</span>'
         + '<div class="vote-bar">'
         + '<div class="vote-in"></div>'
         + '</div>'
         + '<span class="color1">' + statisics[1].count + '人</span>'
         + '<span>(' + statisics[1].percent + '%)</span>'
         + '</li>'
         + '<li>'
         + '<span class="spanl">C:</span>'
         + '<div class="vote-bar">'
         + '<div class="vote-in"></div>'
         + '</div>'
         + '<span class="color1">' + statisics[2].count + '人</span>'
         + '<span>(' + statisics[2].percent + '%)</span>'
         + '</li>'
         + '<li class="last-item">'
         + '<span class="spanl">D:</span>'
         + '<div class="vote-bar">'
         + '<div class="vote-in"></div>'
         + '</div>'
         + '<span class="color1">' + statisics[3].count + '人</span>'
         + '<span>(' + statisics[3].percent + '%)</span>'
         + '</li>'
       $('.vote-list').append(li)
       zcount = statisics[0].count + statisics[1].count + statisics[2].count + statisics[3].count
       break
     case 5:
       var li = '<li>'
         + '<span class="spanl">A:</span>'
         + '<div class="vote-bar">'
         + '<div class="vote-in"></div>'
         + '</div>'
         + '<span class="color1">' + statisics[0].count + '人</span>'
         + '<span>(' + statisics[0].percent + '%)</span>'
         + '</li>'
         + '<li>'
         + '<span class="spanl">B:</span>'
         + '<div class="vote-bar">'
         + '<div class="vote-in"></div>'
         + '</div>'
         + '<span class="color1">' + statisics[1].count + '人</span>'
         + '<span>(' + statisics[1].percent + '%)</span>'
         + '</li>'
         + '<li>'
         + '<span class="spanl">C:</span>'
         + '<div class="vote-bar">'
         + '<div class="vote-in"></div>'
         + '</div>'
         + '<span class="color1">' + statisics[2].count + '人</span>'
         + '<span>(' + statisics[2].percent + '%)</span>'
         + '</li>'
         + '<li>'
         + '<span class="spanl">D:</span>'
         + '<div class="vote-bar">'
         + '<div class="vote-in"></div>'
         + '</div>'
         + '<span class="color1">' + statisics[3].count + '人</span>'
         + '<span>(' + statisics[3].percent + '%)</span>'
         + '</li>'
         + '<li class="last-item">'
         + '<span class="spanl">E:</span>'
         + '<div class="vote-bar">'
         + '<div class="vote-in"></div>'
         + '</div>'
         + '<span class="color1">' + statisics[4].count + '人</span>'
         + '<span>(' + statisics[4].percent + '%)</span>'
         + '</li>'
       $('.vote-list').append(li)
       zcount = statisics[0].count + statisics[1].count + statisics[2].count + statisics[3].count + statisics[4].count
       break
   }
   for (var i = 0; i < statisics.length; i++) {
     $('.vote-in').eq(i).css('width', statisics[i].percent * 1.2)
   }
 
   if (isMultiple) {
     // 为了兼容老客户端，单选题和判断的回答人数扔计算得出
     zcount = answerCount
   }
 
   $('#vote-count').html(zcount)
   // 自己选择的答案
   $('#yansw em').html(selfAnswer)
   // 正确答案
   $('#cansw em').html(correctAnswer)
   if ($('#yansw em').html() == $('#cansw em').html()) {
     $('#yansw').addClass('vote-righta')
   } else {
     $('#yansw').removeClass('vote-righta')
   }
   $('.vote').show()
   $('#vote2').show()
   $('#vote1').hide()
   $('.votebtn').remove()
   $('.video-box').css({ 'width': 1, 'height': 1 })
   option = ''
   window.voteOptions = []
   $('.vote-close').click(function () {
     $('.vote').hide()
     $('.vote-list').empty()
     $('.video-box').css({ 'width': '100%', 'height': '100%' })
     if ($('.mask').is(':visible')) {
       $('.video-box').css({ 'width': 1, 'height': 1 })
     }
     option = ''
     window.voteOptions = []
   })
 }
 
 window.on_cc_live_db_flip = function (j) {
   $('#noppt').hide()
   $('#drawPanel').show()
 }
 
 // 广播信息添加
 DWLive.onBroadcastMsg = function (data) {
   var h = '<li class="message message-received msg-admin" id="' + data.id + '">' +
     '<div class="msg-info">' +
     '<span class="user-name ">' +
     '<span class="name-tip">系统消息</span>:' +
     '</span>' +
     // '<span class="msg-time">11:15:39</span>' +
     '</div>' +
     '<div class="msg-content">' + data.content + '</div>' +
     '</li>'
   $('#chat_container').append(h)
   $('#chat_container').parent().scrollTop($('#chat_container').height())
 }
 
 // 广播信息删除
 DWLive.removeBroadcastMsg = function (data) {
   $('#' + data.id).remove();
 }
 
 // 发布问题
 DWLive.onQaPublish = function (data) {
   var $q = $('#questionInfo #' + data.value.questionId).attr('isAnswer', '1')
   // 只看自己的问答
   if (!$('.myask').hasClass('askactive')) {
     $q.show()
   }
 }
 
 window.on_cc_live_ban_delete_chat = function (data) {
   var viewerId = data.viewerId
   if (viewerId == DWLive.viewerid) {
     return false
   }
   $('#chat_container > li').each(function (index, item) {
     if ($(item).attr('uid') == viewerId) {
       $(item).remove()
     }
   })
 }
 