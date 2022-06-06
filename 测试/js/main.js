var livePlayer = {
    'winHeight': '',
    'winWidth': '',
    'isUserFullScreen': false,
    'isDocFullScreen': false,

    init: function () {
        this.winHeight = $(window).height();
        this.winWidth = $(window).width();

        this.playerSize();

        $('.infobox').width($(window).width() - 30);

        if (this.isPortrait()) {
            $('.docfullbtn2').show();

            if (this.isDocFullScreen) {
                $('#ppts').css({
                    'height': this.winHeight,
                    'width': this.winWidth,
                    'padding-top': ''
                });
                $('#drawPanel,#dpa').css({
                    'margin-top': ''
                });
            } else {
                this.exitFullscreen();
            }

        } else {
            if (!this.isiPad()) {
                this.fullscreen();
            }

            $('.docfullbtn2').hide();
            if (this.isDocFullScreen) {
                $('#ppts').css({
                    'height': this.winHeight,
                    'width': this.winWidth,
                    'text-align': 'center',
                    'padding-top': 40
                });
                $('#drawPanel,#dpa').css({
                    'margin-top': 40
                });
            }
        }
    },

    playerSize: function () {
        $('#webPlayer').css({
            'width': '100%',
            'height': '100%'
        });
    },

    topHalfHeight: function () {
        var h;
        if (livePlayer.isiPad() && !this.isPortrait()) {
            h = this.winHeight / 2; // iPad---横屏
        } else {
            h = this.winWidth * 9 / 16;
        }
        $('#topHalf').height(h);
        return h;
    },

    chatQaFold: function (hasAnimate) {
        var that = this;
        var bottomHalf = $('#bottomHalf');
        var headerHeight = 5;
        if ($('.toolbar').hasClass('toolbar-show')) {
            headerHeight = 2 * headerHeight;
        }
        var animateTime = hasAnimate ? 200 : 0;
        bottomHalf.find('.slider-bd').each(function () {
            var self = $(this);
            // var topBtmHeight = (self.siblings('.slider-ft').length == 1) ? 75 : 35;
            var initBtmHeight = self.siblings('.slider-ft').length;
            var topBtmHeight = (initBtmHeight == 0 || initBtmHeight == 1) ? 75 : 35;

            self.css({
                'height': that.winHeight - that.topHalfHeight() - topBtmHeight - headerHeight - wechatTabBar,
                'transition-duration': animateTime + 'ms',
                '-webkit-transition-duration': animateTime + 'ms',
                '-moz-transition-duration': animateTime + 'ms'
            });
        });
        setTimeout(function () {
            bottomHalf.removeClass('section-bottom-unfold');
        }, animateTime);
        $('#foldBtn').removeClass('icon-cam-off');
    },

    fullscreen: function () {
        $('#topHalf').css({
            'height': this.winHeight - 0,
            'z-index': '99'
        });
    },

    exitFullscreen: function () {
        $('#topHalf').css({
            'height': this.topHalfHeight(),
            'z-index': '1'
        });
    },

    isiPhone: function () {
        return /iphone/i.test(navigator.userAgent);
    },
    isiPad: function () {
        return /iPad/i.test(navigator.userAgent);
    },
    isUcOrQqBrowser: function () {
        return /ucbrowser/i.test(navigator.userAgent) || /mqqbrowser/i.test(navigator.userAgent);
    },
    isPortrait: function () {
        return window.isPortrait;
    }
};
var opts = {
    'roomId': $('#roomId').val(),
    'userId': $('#userId').val(),
    'viewerId': $('#viewerId').val(),
    'recordId': $('#recordId').val(),
    'upId': $('#upId').val()
};
var ua = navigator.userAgent.toLowerCase();
var isWeixin = ua.indexOf('micromessenger') != -1;
var wechatTabBar = 0;
function isIOS(){
    return /iphone/gi.test(navigator.userAgent);
}

function isIphoneXMore() {
    return /iphone/gi.test(navigator.userAgent) && (screen.height >= 812 && screen.width >= 375)
}

$(function () {
    livePlayer.init();
    if (isWeixin && isIOS()) {
        if (window.name == "") {
            console.log("首次被加载");
            wechatTabBar = isIphoneXMore() ? 83 : 49;
            window.name = "isReload"; // 在首次进入页面时我们可以给window.name设置一个固定值 
        } else if (window.name == "isReload") {
            console.log("页面被刷新");
            wechatTabBar = 0;
        }
    }
    livePlayer.chatQaFold(false);
    // var report = new ReportLog(opts , 1 , 10 , $('#live_video')[0] , false);
    TouchSlide({
        slideCell: '#bottomHalf',
        titCell: '.tabs li',
        mainCell: '.slider-container',
        defaultIndex: window.tabDefaultIndex,
        startFun: function (i, c) {
            // console.log(i,c)
            // if (i === 1) {
            //     $('#chat_input').removeAttr('disabled');
            //     $('#qaV').attr('disabled', 'disabled');
            //     $('#qaV').blur();
            // } else if (i === 2) {
            //     $('#chat_input').attr('disabled', 'disabled');
            //     $('#chat_input').blur();
            //     $('#qaV').removeAttr('disabled');
            // } else {
            //     $('#chat_input').attr('disabled', 'disabled');
            //     $('#qaV').attr('disabled', 'disabled');
            //     $('#chat_input').blur();
            //     $('#qaV').blur();
            // }
        },
        endFun: function (i, c) {
            // console.log(i,c)

        }
    });

    $('#chat_input').focus(function () {
        $('#qaV').attr('tabIndex', '-1');
        $(this).attr('tabIndex', '1');
    });

    $('#qaV').focus(function () {
        $('#chat_input').attr('tabIndex', '-1');
        $(this).attr('tabIndex', '1');
    });


    if ($('#noppt').is(':visible')) {
        $('.docfullbtn').hide();
    }

    // 文档全屏
    $('.docfullbtn').bind('touchend', function (e) {
        e.stopPropagation();

        $('.gboxw').hide();
        $(this).hide();
        $('.video-box').css({
            'width': 1,
            'height': 1
        });
        $('.mask, .docfullbtn2').show();
        $('.section-bottom').css('z-index', 100);
        $('#ppts').css({
            'background': '#000',
            'height': $(window).height(),
            'width': $('#ppts').width()
        });
        livePlayer.isDocFullScreen = true;
    });

    // 取消文档全屏
    $('.docfullbtn2').bind('touchend', function (e) {
        e.stopPropagation();
        $('.video-box').css({
            'width': '100%',
            'height': '100%'
        });

        $('.gboxw, .docfullbtn').show();
        $('.mask').hide();
        $(this).hide();
        $('.section-bottom').css('z-index', 9);

        livePlayer.isDocFullScreen = false;
        if (livePlayer.isPortrait()) {
            livePlayer.exitFullscreen();
        }
        $('#ppts').css({
            'display': 'block',
            'background': '#f7f7f7',
            'padding-top': 0,
            'height': livePlayer.winHeight - 40 - $('#topHalf').height()
        });

    });

    $('.mask').bind('touchend', function () {
        if (livePlayer.isPortrait()) {
            $('.docfullbtn2').toggle(300);
        }
    });

    $('#ppts').bind('touchend', function () {
        if ($('#noppt').is(':hidden')) {
            $('.docfullbtn').toggle(300);
        }
    });

});

function bodyRollEvent() {
    setTimeout(function () {
        livePlayer.init();
    }, 500);
    $(document).bind('touchmove', function (e) {
        e.preventDefault();
    });
}

$(function () {
    var selScrollable = '.allow-roll';

    bodyRollEvent();

    $('body').on('touchstart', selScrollable, function (e) {
        if (e.currentTarget.scrollTop === 0) {
            e.currentTarget.scrollTop = 1;
        } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
            e.currentTarget.scrollTop -= 1;
        }
    });

    $('body').on('touchmove', selScrollable, function (e) {
        if ($(this)[0].scrollHeight > $(this).innerHeight()) {
            e.stopPropagation();
        }
    });

    $('.video-box').on('touchmove', function (e) {
        e.stopPropagation();
    });

    $(document).on('touchmove', '.question-survey, .mask', function (e) {
        e.stopPropagation();
    });

    $('#chat_container').width($(window).width()).css('overflow', 'hidden');
});

var menu = false;
$('.menu').bind('touchend', function (e) {
    e.stopPropagation();
    menu = !menu;
    if (menu) {
        $('.menuwrap').show();
        $(this).addClass('active');
        $('.menubox').animate({
            right: 0
        }, 100);
    } else {
        $(this).removeClass('active');
        $('.menuwrap').hide();
        $('.menubox').animate({
            right: '-140px'
        }, 100);
    }
});

$('.menubox').bind('touchend', function (e) {
    e.stopPropagation();
});

$(document).bind('touchend', function () {
    $('.menu').removeClass('active');
    $('.menuwrap').hide();
    $('.menubox').animate({
        right: '-140px'
    }, 100);
    menu = false;
});

// 当前为竖屏
window.isPortrait = !!window.matchMedia('(orientation: portrait)').matches;
window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', function () {
    if (window.orientation === 180 || window.orientation === 0) {
        window.isPortrait = true;
    }
    if (window.orientation === 90 || window.orientation === -90) {
        window.isPortrait = false;
    }

    setTimeout(function () {
        livePlayer.init();
        if (livePlayer.isDocFullScreen) {
            // 文档全屏，由横屏切换到竖屏
            if (window.isPortrait && $.DrawingBoard) {
                $.DrawingBoard.resizePresentation($('#drawPanel').width(), $('#drawPanel').height());
            }
            $('#dpa').css('height', $('#drawPanel').height());
        }
    }, 300);

    $(window).scrollTop(0);
}, false);