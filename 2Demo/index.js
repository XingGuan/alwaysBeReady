(window.webpackJsonp = window.webpackJsonp || []).push([
    [0], {
        "./src/css/common.less": function (e, n, t) {},
        "./src/css/index.less": function (e, n, t) {},
        "./src/js/index.js": function (e, n, t) {
            "use strict";
            t.r(n);
            t("./node_modules/core-js/modules/es6.array.find.js"), t("./node_modules/core-js/modules/es6.regexp.replace.js"), t("./node_modules/core-js/modules/es6.array.sort.js"), t("./node_modules/core-js/modules/es7.array.includes.js"), t("./node_modules/core-js/modules/es6.string.repeat.js"), t("./src/css/index.less"), t("./src/css/common.less"), t("./node_modules/regenerator-runtime/runtime.js"), t("./node_modules/core-js/modules/es6.promise.js"), t("./node_modules/core-js/modules/es6.object.to-string.js"), t("./node_modules/core-js/modules/es6.regexp.constructor.js"), t("./node_modules/core-js/modules/es6.function.name.js");

            function _(e) {
                return "https://static.ws.126.net/163/f2e/news/2021_pet/static/" + e
            }

            function i(e, n) {
                var t = document.createElement("script");
                t.src = e, t.onload = function () {
                    n && n(), t.parentNode.removeChild(t)
                };
                var i = document.getElementsByTagName("script")[0];
                i.parentNode.insertBefore(t, i)
            }
            /debug/gi.test(location.hash) && i("//cdn.jsdelivr.net/npm/eruda", function () {
                window.eruda.init()
            }), i("//static.ws.126.net/163/frontend/libs/antanalysis.min.js"), i("//static.ws.126.net/163/frontend/antnest/NTM-MMKAJZQA-35.js"), i("//hm.baidu.com/hm.js?fbbd5a62f1db722ba672bc37a9bf6b05"), i("//analytics.163.com/ntes.js", function () {
                setTimeout(function () {
                    window._ntes_nacc = "mapp", neteaseTracker(), i("//static.ws.126.net/utf8/3g/util/analysis.min.js", function () {
                        setTimeout(function () {
                            window._ntes_sps_modelid = "news2021_pet", neteaseAnalysis({
                                type: "special",
                                spst: 5,
                                modelid: _ntes_sps_modelid
                            })
                        }, 20)
                    })
                }, 20)
            });
            t("./node_modules/core-js/modules/es6.object.assign.js");
            var o = t("./node_modules/@newsapp-activity/newsapp-share/dist/newsapp-share.esm.js"),
                a = t("./node_modules/@mf2e/js-bridge/dist/js-bridge.esm.js");
            window.jsBridge = a;
            var s = {
                    title: "谁是我的最佳宠物伴侣呢？",
                    desc: "它眼中的我如此独特，永远熠熠生辉",
                    imgUrl: _("share.jpg"),
                    link: function (e) {
                        if (e) {
                            var n = document.createElement("a");
                            return n.href = e, n.href
                        }
                        return window.location.href.replace(/([?#]).*/, "")
                    }(),
                    onlyImg: !1,
                    shareDone: function () {
                        ! function e(n, t) {
                            window.NTESAntAnalysis ? window.NTESAntAnalysis.sendData({
                                projectid: "NTM-MMKAJZQA-35",
                                val_nm: "c-ntm",
                                val_act: n,
                                info: t
                            }) : window.addEventListener("NTMReady", function () {
                                e(n, t)
                            })
                        }("sharedone")
                    }
                },
                d = {};

            function l(e) {
                var n = this,
                    t = arguments,
                    i = 0 < arguments.length && void 0 !== e ? e : {},
                    a = i.shareDone;
                i.shareDone = function () {
                    a && a.apply(n, t), s.shareDone.apply(n, t)
                }, d = Object.assign({}, s, i), o.a.config(d)
            }
            l();
            t("./node_modules/core-js/modules/es7.symbol.async-iterator.js"), t("./node_modules/core-js/modules/es6.symbol.js"), t("./node_modules/core-js/modules/es6.regexp.match.js"), t("./node_modules/core-js/modules/es6.regexp.search.js");
            var g = t("./node_modules/pixi.js/lib/index.js");

            function c(e, n, t, i, a, o, s) {
                try {
                    var d = e[o](s),
                        l = d.value
                } catch (e) {
                    return void t(e)
                }
                d.done ? n(l) : Promise.resolve(l).then(i, a)
            }

            function r(e) {
                return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                    return typeof e
                } : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }
            var u = t("./node_modules/@tweenjs/tween.js/dist/tween.esm.js");

            function p(e) {
                var n = new g.Graphics;
                return n.beginFill(e.color), n.drawRect(0, 0, e.width, e.height), n.position.set(e.x ? e.x : 0, e.y ? e.y : 0), n.endFill(), n
            }

            function w(e, n, t) {
                return new u.default.Tween(e).to(n, t)
            }

            function h() {
                return (h = function (d) {
                    return function () {
                        var e = this,
                            s = arguments;
                        return new Promise(function (n, t) {
                            var i = d.apply(e, s);

                            function a(e) {
                                c(i, n, t, a, o, "next", e)
                            }

                            function o(e) {
                                c(i, n, t, a, o, "throw", e)
                            }
                            a(void 0)
                        })
                    }
                }(regeneratorRuntime.mark(function e(n) {
                    var t, i, a, o, s, d, l, c, r, u, p, h, m;
                    return regeneratorRuntime.wrap(function (e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return m = function (e) {
                                    for (var n = 0, t = 0; t < e.length; t++) {
                                        var i = e.charCodeAt(t);
                                        1 <= i && i <= 126 || 65376 <= i && i <= 65439 ? n++ : n += 2
                                    }
                                    return n
                                }, h = function (e) {
                                    return new Promise(function (n) {
                                        $.ajax({
                                            type: "GET",
                                            url: "https://gw.m.163.com/nc-node/api/v2/checkValidate?",
                                            data: {
                                                text: e
                                            },
                                            dataType: "jsonp",
                                            jsonp: "callback",
                                            success: function (e) {
                                                n(e)
                                            },
                                            error: function (e) {
                                                alert(JSON.stringify(e))
                                            }
                                        })
                                    })
                                }, p = function (e) {
                                    for (var n = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'，、？%+_]"), t = "", i = 0; i < e.length; i++) t += e.substr(i, 1).replace(n, "");
                                    return t
                                }, u = function () {
                                    if ("" === (l = p(l))) return new Promise(function (e, n) {
                                        e(!1)
                                    });
                                    var e = p(l);
                                    return RegExp(/维尼/).test(e) ? new Promise(function (e, n) {
                                        e(!0)
                                    }) : new Promise(function (n, e) {
                                        h(l).then(function (e) {
                                            n(!1 === e)
                                        })
                                    })
                                }, r = function () {
                                    var t = !1;
                                    return "" === l && (t = !0), new Promise(function (e, n) {
                                        e(t)
                                    })
                                }, c = function () {
                                    var e = m(l),
                                        t = !1;
                                    return i < e && (t = !0), new Promise(function (e, n) {
                                        e(t)
                                    })
                                }, t = n.checkText, i = n.maxLength, a = n.noName, o = n.longName, s = n.wrongName, d = n.success, l = t.replace(/(^\s*)|(\s*$)/g, ""), e.next = 10, r();
                            case 10:
                                if (e.sent) return a(), e.abrupt("return", !1);
                                e.next = 14;
                                break;
                            case 14:
                                return e.next = 16, c();
                            case 16:
                                if (e.sent) return o(), e.abrupt("return", !1);
                                e.next = 20;
                                break;
                            case 20:
                                return e.next = 22, u();
                            case 22:
                                if (e.sent) return s(), e.abrupt("return", !1);
                                e.next = 26;
                                break;
                            case 26:
                                d(t.replace(/(^\s*)|(\s*$)/g, ""));
                            case 27:
                            case "end":
                                return e.stop()
                        }
                    }, e)
                }))).apply(this, arguments)
            }

            function x(e, n) {
                return .5 < Math.random() ? -1 : 1
            }
            g.extras.AnimatedSprite.prototype.fadeIn = g.Container.prototype.fadeIn = g.Sprite.prototype.fadeIn = function () {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 300,
                    n = this;
                n.alpha = 0, w(n, {
                    alpha: 1
                }, e).onStart(function () {
                    n.visible = !0
                }).start()
            }, g.extras.AnimatedSprite.prototype.fadeOut = g.Container.prototype.fadeOut = g.Sprite.prototype.fadeOut = function () {
                var e = this;
                w(e, {
                    alpha: 0
                }, 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 300).onComplete(function () {
                    e.visible = !1
                }).start()
            }, g.extras.AnimatedSprite.prototype.show = g.Container.prototype.show = g.Sprite.prototype.show = function () {
                this.alpha = 1, this.visible = !0
            }, g.extras.AnimatedSprite.prototype.hide = g.Container.prototype.hide = g.Sprite.prototype.hide = function () {
                this.alpha = 0, this.visible = !1
            }, Array.prototype.remove = function (e) {
                -1 !== this.indexOf(e) && this.splice(this.indexOf(e), 1)
            };
            var m, f, X = [{
                    type: ["I", "N", "T", "J"],
                    pet: "狗子",
                    says: ["XX说什么都对！"],
                    quality: [0, 1, 4],
                    text: ["XX会提前规划好一切的出游计划", "不会被奇怪的舆论和谣言左右判断，XX说的每句话都掷地有声", "认真工作时的XX是世界上最有魅力的人", "专注又理性，XX可是专业领域内的绝对行家", "XX偶尔也是一个天马行空的理想主义者"]
                }, {
                    type: ["I", "N", "T", "P"],
                    pet: "鱼儿",
                    says: ["XX什么都跟我说，因为7秒后我就会忘记"],
                    quality: [1, 3, 5],
                    text: ["XX常常会问“这是为什么呢”，然后自己回答了自己的问题", "天生的人间修正带，XX善于发现话语逻辑间的纰漏", "脑回路清奇，XX的想法总是人群中让人耳目一新的那个", "不喜欢一成不变的XX，喜欢游走于各种新鲜事物中", "XX也会纠结，经常在自我迷恋和自我怀疑中反复横跳"],
                    special: "美人鱼",
                    special_says: ["嘻嘻，我唱歌贼好听"]
                }, {
                    type: ["E", "N", "T", "J"],
                    pet: "老虎",
                    says: ["我只是一头温顺的大猫咪"],
                    quality: [4, 1, 2],
                    text: ["出现突发性情况，XX是人群中最笃定和镇静的存在", "XX有一种让人下意识崇拜和依赖的领袖魅力", "XX坚定地相信，世界上没有绝对不能达成的目标", "不轻易表露自己的脆弱，XX拥有着超强自愈力", "关注未来和趋势，XX对各种挑战都胸有成竹"],
                    special: "小恐龙",
                    special_says: ["我家住在6500万年前的大明湖畔"]
                }, {
                    type: ["E", "N", "T", "P"],
                    pet: "柯尔鸭",
                    says: ["对不起，可爱真的可以为所欲为鸭"],
                    quality: [3, 4, 0],
                    text: ["洞察世界的角度清奇，XX总能打破思维和认识的僵局", "XX的朋友们非常羡慕ta的洒脱和直率", "不在乎陌生人的目光，XX有着强大自信的小宇宙", "欢乐喜剧人XX，定期生产10万+的有趣笑梗", "XX的奇奇怪怪是人群中独一份的可爱"],
                    special: "小怪兽",
                    special_says: ["凹凸曼在哪儿呢？"]
                }, {
                    type: ["I", "N", "F", "J"],
                    pet: "猫咪",
                    says: ["只需要静静陪着XX，我就能获得无限罐头"],
                    quality: [0, 2, 3],
                    text: ["对周围事物有着博爱的同情心，XX很容易代入各种角色", "XX是一个迷人又神秘的深海宝藏", "表面和平不是XX追求的理想，ta喜欢从根本上解决问题", "外向型社恐，XX需要一定的独处时间来恢复日常社交能量值", "不轻易表露自己的脆弱，XX拥有着超强自愈力"]
                }, {
                    type: ["I", "N", "F", "P"],
                    pet: "鹦鹉",
                    says: ["XX为啥总能听懂我说的鸟语？"],
                    quality: [0, 1, 4],
                    text: ["XX能在最坏的情况下，找到积极乐观的可能性", "表面上腼腆而安静，XX的内心却有着追求美好事物的热情火焰", "语言天赋极佳，XX能够洞察人际沟通中的隐藏情绪", "XX享受哲学与思辨，喜欢构造理想中的乌托邦", "知性而温柔，XX的润物细无声让人如沐春风"]
                }, {
                    type: ["E", "N", "F", "J"],
                    pet: "孔雀",
                    says: ["给您表演一个「我想开了」"],
                    quality: [2, 3, 4],
                    text: ["XX的正义感爆棚，在ta身边安全感十足", "细心敏感又热情洋溢的XX，是人群中最贴心的活雷锋", "说到做到，XX说的每句话都掷地有声", "每个人都想和真诚坦率的XX成为好朋友", "XX以帮助别人为乐，让身边人幸福起来是ta的快乐源泉"]
                }, {
                    type: ["E", "N", "F", "P"],
                    pet: "香香猪",
                    says: ["XX和我都是人见人爱的香饽饽"],
                    quality: [0, 3, 4],
                    text: ["有XX参加的聚会，欢乐气氛绝对冲顶", "XX能够非常快速地get到朋友们的言外之意", "工作中一丝不苟的XX，转头会在舞池里挥洒自由", "XX有一种迅速与陌生人建立起情感羁绊的超能力", "每个人都想和真实热忱的XX成为好朋友"]
                }, {
                    type: ["I", "S", "T", "J"],
                    pet: "大熊猫",
                    says: ["信任XX，所以给ta挠肚皮的机会", "每天三顿竹子，XX会按时按点喂我"],
                    quality: [1, 2, 5],
                    text: ["XX时刻把「责任」二字刻在脑门上，拥有超强的自我管理能力", "正直友善、踏实可靠的XX深受领导长辈们青睐", "行动节奏有条不紊，XX总能在DDL之前完成所有目标", "不轻易表露感性，XX的真实情绪只有少数亲友能悉知", "宁缺毋滥，XX会非常慎重地选择终身伴侣"]
                }, {
                    type: ["I", "S", "F", "J"],
                    pet: "大象",
                    says: ["下次驮着XX出门旅游去"],
                    quality: [3, 5, 2],
                    text: ["XX习惯于照顾大部分人的感受，但关键时候会强悍护短", "稳健又耐心，XX能快速解开纠结在一起的耳机线", "正直友善、踏实可靠的XX深受领导长辈们青睐", "敏感细腻，XX擅长把礼物送到朋友的心坎里", "时而安静内敛，时而热情待人，XX变换自如"]
                }, {
                    type: ["E", "S", "T", "J"],
                    pet: "猫头鹰",
                    says: ["半夜陪XX干活儿，是我最大的浪漫"],
                    quality: [0, 1, 2],
                    text: ["诚实果敢，XX坚信越努力越幸运", "不轻易表露感性，XX的真实情绪只有少数亲友能悉知", "XX是妥妥的工作狂人，摸鱼是不可能摸鱼的", "面对突发情况，XX总是有条不紊、不慌不忙", "XX言出必行，已承诺的事情一定会完成"],
                    special: "机器人",
                    special_says: ["我可以24小时陪XX干活儿"]
                }, {
                    type: ["E", "S", "F", "J"],
                    pet: "兔子",
                    says: ["XX经常来窝里听我的吃草ASMR"],
                    quality: [0, 4, 1],
                    text: ["有XX参加的聚会，气氛总是愉快又尽兴", "观察力敏锐，XX总能第一时间知道身边人的动向", "人群中最受欢迎的存在，人们会不由自主地想对XX表达善意", "稳健又耐心，XX能快速解开纠结在一起的耳机线", "乐于助人，XX是愿意倾听和奉献的最佳好友"]
                }, {
                    type: ["I", "S", "T", "P"],
                    pet: "变色龙",
                    says: ["XX每天都让我给ta点颜色瞧瞧"],
                    quality: [2, 3, 4],
                    text: ["XX想要体验每天都不一样的人生", "天生巧手，XX能从创造和拆卸中获得成就感", "眼神清澈透明，但XX的天马行空不容易被读懂", "XX的脑洞约等于黑洞，不会随波逐流地从众", "好奇心旺盛，XX会被极有趣的新奇装置吸引注意力"],
                    special: "凹凸曼",
                    special_says: ["小怪兽在哪儿呢？"]
                }, {
                    type: ["I", "S", "F", "P"],
                    pet: "马儿",
                    says: ["让我们红尘做伴，活得潇潇洒洒"],
                    quality: [3, 4, 0],
                    text: ["随心而动，追求感性的XX是握不住的沙", "传统思维框不住，XX喜欢新鲜多元的视角", "XX内心蕴藏着对生活极大的激情，面对挑战从不妥协", "XX倾向于从根本解决矛盾，然后立刻释怀，从不记仇", "XX喜欢每个时刻、每个身份的自己"]
                }, {
                    type: ["E", "S", "T", "P"],
                    pet: "梅花鹿",
                    says: ["XX，可以不要往我的鹿角上挂东西吗？"],
                    quality: [2, 3, 4],
                    text: ["幽默风趣的XX可以和所有人谈笑风生", "可以为了向往的光束大胆冒险，XX不会胆怯", "XX能够非常快速地get到朋友们的言外之意", "XX是掌握真理的少数人", "悉知一切人情世故，但XX会选择另一种恣意人生"]
                }, {
                    type: ["E", "S", "F", "P"],
                    pet: "羊驼",
                    says: ["每次出门XX都嘱咐我不要随地吐口水"],
                    quality: [3, 4, 0],
                    text: ["随心而动，率性洒脱的XX是握不住的沙", "朋友对于XX来说，是家人般的存在", "聚光灯下的天选之子，XX是派对中最迷人清澈的水晶", "活力满满，XX对新鲜事物拥有无尽热情", "XX不在意陌生人的目光，喜欢陶醉在恣意世界中"]
                }],
                y = t("./node_modules/html2canvas/dist/html2canvas.js"),
                v = t.n(y),
                b = t("./node_modules/@tweenjs/tween.js/dist/tween.esm.js"),
                j = (m = navigator.userAgent.toLowerCase(), f = navigator.userAgent, {
                    isMobile: /iphone|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(m) && !/pc=1/.test(location.search),
                    isWeiXin: "micromessenger" == m.match(/MicroMessenger/i),
                    isWeiBo: "weibo" == m.match(/WeiBo/i),
                    isNewsApp: "newsapp" == m.match(/newsapp/i),
                    isQQ: "qq" == m.match(/QQ/i),
                    isAndroid: -1 < f.indexOf("Android") || -1 < f.indexOf("Adr"),
                    isiOS: !!f.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                    isiphoneX: /iphone/gi.test(f) && (812 == screen.height && 375 == screen.width || 896 == screen.height && 414 == screen.width)
                }),
                S = Math.PI;

            function q() {
                WeixinJSBridge.invoke("setFontSizeCallback", {
                    fontSize: 0
                }), WeixinJSBridge.on("menu:setfont", function () {
                    WeixinJSBridge.invoke("setFontSizeCallback", {
                        fontSize: 0
                    })
                })
            }
            j.isMobile || ($(".common-container").html(" ").css({
                background: "#fff"
            }), $(".common-container").append('<div class="pc_qr_code" style="padding-top: 200px;"></div>'), new QRCode($(".pc_qr_code")[0], {
                width: 200,
                height: 200,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.L
            }).makeCode(window.location.href), $(".common-container").css({
                width: "100%"
            }), $(".pc_qr_code img").css({
                border: "2px solid #fff",
                margin: "0 auto"
            }), $(".pc_qr_code").append("<p style='display: block;color: #333;text-align: center;font-size: 20px;margin-top: 50px;'>为了更好的体验，请使用手机扫描二维码浏览</p>")), "object" == ("undefined" == typeof WeixinJSBridge ? "undefined" : r(WeixinJSBridge)) && "function" == typeof WeixinJSBridge.invoke ? q() : document.addEventListener ? document.addEventListener("WeixinJSBridgeReady", q, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", q), document.attachEvent("onWeixinJSBridgeReady", q));
            var A, T, I, C, N, E, M, k = (A = ["wp.m.163.com"], T = ["2021_pet"], I = parseInt(Math.random() * A.length), C = parseInt(Math.random() * T.length), "https://" + A[I] + "/163/page/news/" + T[C] + "/index.html?spss=qrcode");

            function O() {
                document.removeEventListener("WeixinJSBridgeReady", O), document.removeEventListener("YixinJSBridgeReady", O), E.play()
            }

            function J() {
                document.removeEventListener("WeixinJSBridgeReady", J), document.removeEventListener("YixinJSBridgeReady", J);
                for (var e = 0; e < M.length; e++) {
                    var n = document.getElementById(M[e]);
                    n.play(), n.pause()
                }
            }
            N = "bgm", E = document.getElementById(N), document.addEventListener("WeixinJSBridgeReady", O, !1), document.addEventListener("YixinJSBridgeReady", O, !1), M = ["start_door", "click", "q1_bottle", "q2_a", "q2_b", "q3_a", "q3_b", "q3_c", "q4_1", "q4_2", "q4_3", "q4_4", "q5_in", "q7_door", "q7_click"], document.addEventListener("WeixinJSBridgeReady", J, !1), document.addEventListener("YixinJSBridgeReady", J, !1);
            var D, F = g.Container,
                B = (g.autoDetectRenderer, g.loader),
                R = B.resources,
                L = (g.Texture, g.Text, g.Sprite),
                Q = (g.Rectangle, g.Graphics, window.innerWidth),
                P = window.innerHeight,
                U = new F,
                W = new F;
            window.onload = function () {
                Q = window.innerWidth, P = window.innerHeight, D = j.isiOS ? new g.CanvasRenderer(Q, P, {
                    transparent: !0,
                    antialias: !0,
                    resolution: 1
                }) : new g.WebGLRenderer(Q, P, {
                    transparent: !0,
                    antialias: !0,
                    resolution: 1
                }), $("#main").append(D.view), new QRCode($("#end .end_qrcode")[0], {
                    width: 92,
                    height: 92,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.L
                }).makeCode(k), B.add(K).add(Z).add(ae).add(oe).add(z).add(G).add(Y).add(_e).add(H).add(se).add(we).add(de).add(le).add(ce).add(re).add(V).add(Xe).add(ue).add(pe).add(he).add(me).add(fe).add(ee).add(je).add(ye).add(ne).add(qe).add(te).add(Te).add(ve).add(ie).add(Fe).on("progress", function (e, n) {
                    ! function (e) {
                        var n = parseInt(e % 10),
                            t = Math.floor(e / 10);
                        $(".loading_num .num").eq(1).removeClass().addClass("num").addClass("n" + t), $(".loading_num .num").eq(2).removeClass().addClass("num").addClass("n" + n), 100 === e && ($(".loading_num .num").eq(0).css({
                            display: "inline-block"
                        }), $(".loading_num .num").eq(1).removeClass().addClass("num").addClass("n0"), $(".loading_num .num").eq(2).removeClass().addClass("num").addClass("n0"))
                    }(parseInt(e.progress))
                }).load(Re)
            };
            for (var K = _("main.json"), Z = _("start/start_main.json"), z = _("q1/q1_main.json"), G = _("q1/q1_a.json"), Y = _("q1/q1_b.json"), H = _("q2/q2_main.json"), V = _("q3/q3_main_1.json"), ee = _("q4/q4_main.json"), ne = _("q5/q5_main.json"), te = _("q6/q6_main_1.json"), ie = _("q7/q7_main_1.json"), ae = [_("start/start_circle1.json"), _("start/start_circle2.json")], oe = [_("start/start_title1.json"), _("start/start_title2.json")], se = _("q2/smoke.json"), de = _("q2/q2_a_1.json"), le = _("q2/q2_a_2.json"), ce = _("q2/q2_b_1.json"), re = _("q2/q2_b_2.json"), ue = _("q3/q3_a.json"), pe = _("q3/q3_b.json"), he = _("q3/q3_c.json"), me = _("q3/q3_ab.json"), fe = _("q3/q3_c2.json"), ye = _("q4/q4_title.json"), ve = _("q6/q6_title.json"), _e = [], ge = 0; ge < 5; ge++) _e.push(_("q1/q1_in" + (ge + 1) + ".json"));
            for (var we = [], xe = 0; xe < 3; xe++) we.push(_("q2/q2_in" + (xe + 1) + ".json"));
            for (var Xe = [], be = 0; be < 3; be++) Xe.push(_("q3/q3_in" + (be + 1) + ".json"));
            for (var je = [], Se = 0; Se < 5; Se++) je.push(_("q4/q4_in" + (Se + 1) + ".json"));
            for (var qe = [], Ae = 0; Ae < 3; Ae++) qe.push(_("q5/q5_in" + (Ae + 1) + ".json"));
            for (var Te = [], Ie = 0; Ie < 6; Ie++) Te.push(_("q6/q6_in" + (Ie + 1) + ".json"));
            for (var Ce, Ne, $e, Ee, Me, ke, Oe, Je, De, Fe = [], Be = 0; Be < 2; Be++) Fe.push(_("q7/q7_door" + (Be + 1) + ".json"));

            function Re() {
                $(".loading_num .num").eq(0).css({
                    display: "inline-block"
                }), $(".loading_num .num").eq(1).removeClass().addClass("num").addClass("n0"), $(".loading_num .num").eq(2).removeClass().addClass("num").addClass("n0");
                var e = W.bg = p({
                    color: 15921906,
                    width: 750,
                    height: P,
                    x: 0,
                    y: 0
                });
                e.alpha = 0, W.addChild(e), U.addChild(W), (Ne = new F).visible = !1, Ne.init = function () {
                        var t = We("title.png", z),
                            e = this.inAni = Ue({
                                eachNum: [11, 13, 8, 8, 8, 1],
                                json: [_e[0], _e[1], _e[2], _e[3], _e[4], z],
                                url: "q1_in_",
                                animationSpeed: .2,
                                width: 750,
                                height: 1500,
                                position: {
                                    x: 0,
                                    y: (P - 1500) / 2
                                },
                                loop: !1
                            }),
                            n = this.ballAni = Ue({
                                eachNum: [50],
                                json: [z],
                                url: "q1_ball_",
                                animationSpeed: .2,
                                position: {
                                    x: 350.5,
                                    y: P / 2 - 496
                                },
                                loop: !1
                            }),
                            i = new F,
                            a = new F,
                            o = Ue({
                                eachNum: [60],
                                json: [G],
                                url: "a_",
                                animationSpeed: .2,
                                position: {
                                    x: 215.5,
                                    y: 0
                                }
                            }),
                            s = Ue({
                                eachNum: [60],
                                json: [G],
                                url: "a_select_",
                                animationSpeed: .2,
                                position: {
                                    x: 215.5,
                                    y: 0
                                }
                            });
                        s.visible = !1, a.addChild(o, s);
                        var d = new F,
                            l = Ue({
                                eachNum: [60],
                                json: [Y],
                                url: "b_",
                                animationSpeed: .2,
                                position: {
                                    x: 76,
                                    y: 163
                                }
                            }),
                            c = Ue({
                                eachNum: [60],
                                json: [Y],
                                url: "b_select_",
                                animationSpeed: .2,
                                position: {
                                    x: 76,
                                    y: 163
                                }
                            });
                        c.visible = !1, d.addChild(l, c);
                        var r = new F;
                        r.pivot.set(125, 125), r.shake = function () {
                            w(r, {
                                rotation: -.05 * S
                            }, 167).start(), r.tween = w(r, {
                                rotation: 0
                            }, 167).delay(167).start()
                        }, r.startShake = function () {
                            r.timer = setInterval(function () {
                                r.shake(), setTimeout(function () {
                                    r.tween.stop(), r.shake()
                                }, 250)
                            }, 2e3)
                        };
                        var u = We("c.png", z),
                            p = We("c_select.png", z);
                        p.visible = !1, r.position.set(543, 228), r.addChild(u, p);
                        var h = We("plus.png", z);
                        h.position.set(360, 110), i.addChild(a, d, r, h), i.y = P - 400, i.visible = !1, a.interactive = !0, a.buttonMode = !0, a.on("tap", function () {
                            Ne.select(0)
                        }), d.interactive = !0, d.buttonMode = !0, d.on("tap", function () {
                            Ne.select(1)
                        }), r.interactive = !0, r.buttonMode = !0, r.on("tap", function () {
                            Ne.select(2)
                        }), Ne.selectIndex = 0;
                        var m = !1;
                        Ne.select = function (e) {
                            m || (m = !0, 0 === (Ne.selectIndex = e) && (s.fadeIn(), s.gotoAndPlay(o.currentFrame)), 1 === e && (c.fadeIn(), c.gotoAndPlay(l.currentFrame)), 2 === e && p.fadeIn(), setTimeout(function () {
                                Ne.moveOut()
                            }, 500), $("#click")[0].play(), $("#click")[0].onended = function () {
                                $("#click")[0].src = _("click.mp3") + "?" + +new Date
                            })
                        }, this.addChild(e, t, i, n), Ne.moveIn = function () {
                            Ne.visible = !0, Ne.inAni.play(), n.play(), o.play(), l.play(), r.startShake(), w(n, {
                                x: 361,
                                y: 253
                            }, 3e3).delay(1e3).start(), t.alpha = 0, t.pivot.set(750, 359), t.position.set(850, 409), t.scale.set(.8), w(t, {
                                x: 750,
                                y: 359
                            }, 1e3).onUpdate(function (e, n) {
                                t.scale.set(.8 + .2 * n)
                            }).onStart(function () {
                                t.fadeIn(300)
                            }).delay(3e3).start(), setTimeout(function () {
                                i.fadeIn(500), De.fadeIn(500), $("#q1_bottle")[0].play()
                            }, 4300), window.NTESAntAnalysis && window.NTESAntAnalysis.sendData({
                                projectid: "NTM-MMKAJZQA-35",
                                val_nm: "c-ntm",
                                val_act: "goto_question_1"
                            })
                        }, Ne.moveOut = function () {
                            t.fadeOut(), i.fadeOut(), setTimeout(function () {
                                n.visible = !1, Ne.inAni.visible = !1, $e.moveIn()
                            }, 300)
                        }
                    }, Ne.init(), W.addChild(Ne), ($e = new F).visible = !1, $e.init = function () {
                        var t = We("title.png", H);
                        t.alpha = 0;
                        var e = this.inAni = Ue({
                                eachNum: [8, 8, 8, 1],
                                json: [we[0], we[1], we[2], H],
                                url: "q2_in_",
                                animationSpeed: .2,
                                width: 750,
                                height: 1500,
                                type: ".jpg",
                                position: {
                                    x: 0,
                                    y: (P - 1500) / 2
                                },
                                loop: !1
                            }),
                            n = this.ballAni = Ue({
                                eachNum: [26],
                                json: [H],
                                url: "q2_ball_",
                                animationSpeed: .2,
                                position: {
                                    x: 25,
                                    y: 253
                                },
                                loop: !1
                            }),
                            s = this.waterAni = Ue({
                                eachNum: [30],
                                json: [H],
                                url: "water_",
                                animationSpeed: .2,
                                position: {
                                    x: 182,
                                    y: 673 + (P - 1500) / 2
                                },
                                loop: !1
                            });
                        s.visible = !1;
                        var d = this.smokeAni = Ue({
                            eachNum: [28],
                            json: [se],
                            url: "smoke_",
                            width: 496,
                            height: 634,
                            animationSpeed: .2,
                            position: {
                                x: 166,
                                y: 233 + (P - 1500) / 2
                            },
                            loop: !1
                        });
                        d.visible = !1;
                        var i = new F,
                            l = new F,
                            c = new F;
                        c.visible = !1;
                        var a = new F,
                            r = new F,
                            u = new F;
                        u.visible = !1;
                        for (var o = 0; o < 5; o++) {
                            var p = Ue({
                                eachNum: [60],
                                json: [1 === o || 2 === o ? le : de],
                                url: "a_" + (o + 1) + "_",
                                animationSpeed: .2
                            });
                            l.addChild(p);
                            var h = Ue({
                                eachNum: [60],
                                json: [3 === o || 4 === o ? re : ce],
                                url: "b_" + (o + 1) + "_",
                                animationSpeed: .2
                            });
                            r.addChild(h)
                        }
                        for (var m = 0; m < 5; m++) l.children[m].play(), r.children[m].play();
                        var f = new g.Graphics;
                        f.beginFill(16724736), f.lineStyle(4, 16767232, 1), f.moveTo(0, 0), f.lineTo(145, 41), f.lineTo(274, 126), f.lineTo(538, 321), f.lineTo(750, 369), f.lineTo(750, 454), f.lineTo(561, 440), f.lineTo(482, 395), f.lineTo(226, 202), f.lineTo(0, 92), f.closePath(), f.endFill(), f.alpha = 0, f.interactive = !0, f.buttonMode = !0, f.on("tap", function () {
                            $e.select(1)
                        }), i.position.set(0, P - 530), i.addChild(l, c, f);
                        var y = new g.Graphics;
                        y.beginFill(16724736), y.lineStyle(4, 16767232, 1), y.moveTo(0, 310), y.lineTo(258, 294), y.lineTo(397, 221), y.lineTo(550, 40), y.lineTo(750, 0), y.lineTo(750, 84), y.lineTo(617, 125), y.lineTo(377, 353), y.lineTo(197, 395), y.lineTo(0, 396), y.closePath(), y.endFill(), y.alpha = 0, y.interactive = !0, y.buttonMode = !0, y.on("tap", function () {
                            $e.select(0)
                        }), a.position.set(0, P - 642), a.addChild(r, u, y), i.hide(), i.alpha = 0, a.hide(), a.alpha = 0, this.addChild(e, s, d, n, t, a, i), $e.selectIndex = 0;
                        var v = !1;
                        $e.select = function (e) {
                            if (!v) {
                                v = !0, $e.selectIndex = e;
                                for (var n = 0; n < 5; n++) r.children[n].stop();
                                for (var t = r.children[0].currentFrame, i = 0; i < 5; i++) l.children[i].stop();
                                var a = l.children[0].currentFrame;
                                if (0 === e) {
                                    d.play(), d.fadeIn(500);
                                    var o = _("q2/select/as_" + t + ".png");
                                    B.add(o).load(function () {
                                        var e = new L(B.resources[o].texture);
                                        u.addChild(e), u.fadeIn(800), setTimeout(function () {
                                            d.fadeOut(500)
                                        }, 2e3), setTimeout(function () {
                                            $e.moveOut()
                                        }, 2e3)
                                    }), $("#q2_a")[0].play()
                                }
                                1 === e && (s.play(), s.fadeIn(500), o = _("q2/select/bs_" + a + ".png"), B.add(o).load(function () {
                                    var e = new L(B.resources[o].texture);
                                    c.addChild(e), setTimeout(function () {
                                        s.fadeOut(500)
                                    }, 1e3), setTimeout(function () {
                                        $e.moveOut()
                                    }, 1200), c.fadeIn(800)
                                }), $("#q2_b")[0].play())
                            }
                        }, $e.moveIn = function () {
                            $e.visible = !0, $e.inAni.play(), t.scale.set(1.2), w({
                                alpha: t.alpha = 0
                            }, {
                                alpha: 1
                            }, 800).onUpdate(function (e, n) {
                                t.scale.set(1.2 - .2 * n)
                            }).onStart(function () {
                                t.fadeIn()
                            }).delay(1100).start(), w(n, {
                                x: 30,
                                y: 186
                            }, 1e3).delay(1e3).start(), setTimeout(function () {
                                De.goto(1)
                            }, 1500), setTimeout(function () {
                                a.fadeIn(800), i.fadeIn(800)
                            }, 2e3), n.play(), window.NTESAntAnalysis && window.NTESAntAnalysis.sendData({
                                projectid: "NTM-MMKAJZQA-35",
                                val_nm: "c-ntm",
                                val_act: "goto_question_2"
                            })
                        }, $e.moveOut = function () {
                            t.fadeOut(), a.fadeOut(), i.fadeOut(), setTimeout(function () {
                                n.visible = !1, $e.inAni.visible = !1, Ee.moveIn()
                            }, 300)
                        }
                    }, $e.init(), W.addChild($e), (Ee = new F).visible = !1, Ee.init = function () {
                        var e = We("title.png", V);
                        e.position.set(530, -252);
                        var n = this.inAni = Ue({
                                eachNum: [8, 8, 8, 1],
                                json: [Xe[0], Xe[1], Xe[2], V],
                                url: "q3_in_",
                                animationSpeed: .2,
                                width: 750,
                                height: 1500,
                                type: ".jpg",
                                position: {
                                    x: 0,
                                    y: (P - 1500) / 2
                                },
                                loop: !1
                            }),
                            t = this.ballAni = Ue({
                                eachNum: [25],
                                json: [V],
                                url: "q3_ball_",
                                animationSpeed: .2,
                                position: {
                                    x: 30,
                                    y: 12
                                },
                                loop: !1
                            });
                        this.addChild(n, e, t);
                        var i = new F;
                        i.hide();
                        var a = new F,
                            o = Ue({
                                eachNum: [44, 15],
                                json: [ue, me],
                                url: "a_",
                                animationSpeed: .2
                            }),
                            s = new F;
                        o.play(), s.visible = !1, a.position.set(275, 0), a.addChild(o, s);
                        var d = new F,
                            l = Ue({
                                eachNum: [40, 20],
                                json: [pe, me],
                                url: "b_",
                                animationSpeed: .2
                            });
                        l.play();
                        var c = new F;
                        c.visible = !1, d.position.set(275, 279), d.addChild(l, c);
                        var r = new F,
                            u = Ue({
                                eachNum: [40, 20],
                                json: [he, fe],
                                url: "c_",
                                animationSpeed: .2
                            }),
                            p = new F;
                        u.play(), p.visible = !1, r.position.set(275, 541), r.addChild(u, p), i.addChild(a, d, r), i.y = 300 + (P - 1034) / 2;
                        var h = new F,
                            m = Ue({
                                eachNum: [38],
                                json: [V],
                                url: "select_a_",
                                animationSpeed: .2,
                                position: {
                                    x: 71,
                                    y: 656 + (P - 1500) / 2
                                },
                                loop: !1
                            }),
                            f = Ue({
                                eachNum: [44],
                                json: [V],
                                url: "select_c_",
                                position: {
                                    x: 109,
                                    y: 633 + (P - 1500) / 2
                                },
                                animationSpeed: .2,
                                loop: !1
                            }),
                            y = We("select_b.png", V);
                        y.position.set(21, 551 + (P - 1500) / 2), y.visible = !1, h.addChild(m, y, f), this.addChild(h, i), a.interactive = !0, a.buttonMode = !0, a.on("tap", function () {
                            Ee.select(0)
                        }), d.interactive = !0, d.buttonMode = !0, d.on("tap", function () {
                            Ee.select(1)
                        }), r.interactive = !0, r.buttonMode = !0, r.on("tap", function () {
                            Ee.select(2)
                        }), Ee.selectIndex = 0;
                        var v = !1;
                        Ee.select = function (e) {
                            if (!v) {
                                if (v = !0, Ee.selectIndex = e, o.stop(), l.stop(), u.stop(), 0 === e) {
                                    var n = _("q3/select/as_" + o.currentFrame + ".png");
                                    B.add(n).load(function () {
                                        var e = new L(B.resources[n].texture);
                                        s.addChild(e), s.fadeIn(800), m.play(), setTimeout(function () {
                                            Ee.moveOut()
                                        }, 2e3)
                                    }), $("#q3_a")[0].play()
                                }
                                1 === e && (n = _("q3/select/bs_" + l.currentFrame + ".png"), B.add(n).load(function () {
                                    var e = new L(B.resources[n].texture);
                                    c.addChild(e), c.fadeIn(800), y.fadeIn(1e3), setTimeout(function () {
                                        Ee.moveOut()
                                    }, 1500)
                                }), $("#q3_b")[0].play()), 2 === e && (n = _("q3/select/cs_" + u.currentFrame + ".png"), B.add(n).load(function () {
                                    var e = new L(B.resources[n].texture);
                                    p.addChild(e), p.fadeIn(800), f.play(), setTimeout(function () {
                                        Ee.moveOut()
                                    }, 1500)
                                }), $("#q3_c")[0].play())
                            }
                        }, Ee.moveIn = function () {
                            Ee.visible = !0, Ee.inAni.play(), w(e, {
                                x: 0,
                                y: 0
                            }, 1350).delay(600).start(), w({
                                x: 30,
                                y: 12
                            }, {
                                x: 33,
                                y: 60 + (P - 1500) / 2
                            }, 800).onUpdate(function (e) {
                                t.x = e.x, t.y = e.y
                            }).start(), w({
                                y: 60 + (P - 1500) / 2
                            }, {
                                y: 80
                            }, 500).onUpdate(function (e) {
                                t.y = e.y
                            }).delay(1500).start(), setTimeout(function () {
                                De.goto(2)
                            }, 1500), setTimeout(function () {
                                i.fadeIn(800)
                            }, 2e3), t.play(), window.NTESAntAnalysis && window.NTESAntAnalysis.sendData({
                                projectid: "NTM-MMKAJZQA-35",
                                val_nm: "c-ntm",
                                val_act: "goto_question_3"
                            })
                        }, Ee.moveOut = function () {
                            i.fadeOut(), h.fadeOut(), setTimeout(function () {
                                t.visible = !1, Ee.inAni.visible = !1, Ee.hide(), Me.moveIn()
                            }, 300)
                        }
                    }, Ee.init(), W.addChild(Ee), (Me = new F).visible = !1, Me.init = function () {
                        var e = this.inAni = Ue({
                                eachNum: [8, 8, 8, 8, 5],
                                json: je,
                                url: "q4_in_",
                                animationSpeed: .2,
                                width: 750,
                                height: 1500,
                                type: ".jpg",
                                position: {
                                    x: 0,
                                    y: (P - 1500) / 2
                                },
                                loop: !1
                            }),
                            n = Ue({
                                eachNum: [18],
                                json: [ye],
                                url: "q3_out_",
                                animationSpeed: .2,
                                loop: !1
                            }),
                            t = new F,
                            i = Ue({
                                eachNum: [14],
                                json: [ye],
                                url: "q4_in1_",
                                animationSpeed: .2,
                                loop: !1
                            }),
                            a = Ue({
                                eachNum: [14],
                                json: [ye],
                                url: "q4_in2_",
                                animationSpeed: .2,
                                loop: !1
                            });
                        t.hide(), t.addChild(i, a), t.x = 113;
                        var o = this.ballAni = Ue({
                            eachNum: [37],
                            json: [ee],
                            url: "q4_ball_",
                            animationSpeed: .2,
                            position: {
                                x: 23,
                                y: 21
                            },
                            loop: !1
                        });
                        this.addChild(e, n, t, o);
                        var s = We("light.png", ee);
                        s.position.set(96, 406 + (P - 1500) / 2), s.hide();
                        var d = Ue({
                            eachNum: [36],
                            json: [ee],
                            url: "flower_smell_",
                            animationSpeed: .2,
                            position: {
                                x: 0,
                                y: (P - 1500) / 2
                            },
                            loop: !1
                        });
                        d.hide(), this.addChild(s, d);
                        var l = new F;
                        l.hide();
                        for (var c = function (e) {
                                var n = new F,
                                    t = We((0 === e ? "a" : 1 === e ? "b" : 2 === e ? "c" : "d") + ".png", ee),
                                    i = We((0 === e ? "a" : 1 === e ? "b" : 2 === e ? "c" : "d") + "_select.png", ee);
                                i.hide(), n.addChild(t, i), n.x = (750 - t.width) / 2, n.y = 0 === e ? 0 : 1 === e ? 123 : 2 === e ? 239 : 354, l.addChild(n), n.interactive = !0, n.buttonMode = !0, n.on("tap", function () {
                                    Me.select(e), i.fadeIn()
                                })
                            }, r = 0; r < 4; r++) c(r);
                        l.position.set(0, P - 600), P < 1300 && l.position.set(0, P - 550), this.addChild(l), Me.selectIndex = 0;
                        var u = !1;
                        Me.select = function (e) {
                            u || (u = !0, 2 === (Me.selectIndex = e) && (s.fadeIn(500), setTimeout(function () {
                                s.fadeOut()
                            }, 1500)), 1 === e && (d.fadeIn(500), d.play(), setTimeout(function () {
                                d.fadeOut(500)
                            }, 1500)), setTimeout(function () {
                                Me.moveOut()
                            }, 1500), $("#q4_" + (e + 1))[0].play())
                        }, Me.moveIn = function () {
                            Me.visible = !0, Me.inAni.play(), n.play(), Me.inAni.onFrameChange = function () {
                                23 === Me.inAni.currentFrame && (t.show(), i.play(), a.play())
                            }, o.play(), w({
                                y: 21,
                                x: 23
                            }, {
                                x: 19,
                                y: 21 + (P - 1500) / 2
                            }, 1500).onUpdate(function (e) {
                                o.y = e.y, o.x = e.x
                            }).start(), w({
                                y: 21 + (P - 1500) / 2
                            }, {
                                y: 21
                            }, 1500).delay(1500).onUpdate(function (e) {
                                o.y = e.y
                            }).start(), setTimeout(function () {
                                De.goto(3), l.fadeIn()
                            }, 2500), window.NTESAntAnalysis && window.NTESAntAnalysis.sendData({
                                projectid: "NTM-MMKAJZQA-35",
                                val_nm: "c-ntm",
                                val_act: "goto_question_4"
                            })
                        }, Me.moveOut = function () {
                            l.fadeOut(), setTimeout(function () {
                                o.visible = !1, Me.inAni.visible = !1, Me.hide(), ke.moveIn()
                            }, 300)
                        }
                    }, Me.init(), W.addChild(Me), (ke = new F).visible = !1, ke.init = function () {
                        var e = this.inAni = Ue({
                                eachNum: [8, 8, 8, 1],
                                json: [qe[0], qe[1], qe[2], ne],
                                url: "q5_in_",
                                animationSpeed: .2,
                                width: 750,
                                height: 1500,
                                type: ".jpg",
                                position: {
                                    x: 0,
                                    y: (P - 1500) / 2
                                },
                                loop: !1
                            }),
                            n = new F,
                            t = We("q4_in1_13.png", ye),
                            i = We("q4_in2_13.png", ye);
                        n.addChild(t, i), n.pivot.set(378, 271), n.position.set(491, 271);
                        var a = We("title.png", ne);
                        a.hide();
                        for (var o = new F, s = [{
                                x: 250,
                                y: 80
                            }, {
                                x: 77,
                                y: 103
                            }, {
                                x: 172,
                                y: 0
                            }, {
                                x: 0,
                                y: 37
                            }], d = [{
                                x: 21,
                                y: 53
                            }, {
                                x: 144,
                                y: 55
                            }, {
                                x: 47,
                                y: 55
                            }, {
                                x: 112,
                                y: 55
                            }], l = 0; l < 4; l++) {
                            var c = We("message_" + (l + 1) + ".png", ne);
                            c.pivot.set(d[l].x, d[l].y), c.position.set(s[l].x + d[l].x, s[l].y + d[l].y), c.scale.set(0), o.addChild(c)
                        }
                        o.position.set(140, 686 + (P - 1500) / 2), o.showMessage = function () {
                            o.children.forEach(function (n, e) {
                                w({
                                    scale: 0
                                }, {
                                    scale: 1
                                }, 600).onUpdate(function (e) {
                                    n.scale.set(e.scale)
                                }).easing(b.default.Easing.Back.Out).delay(200 * e).start()
                            })
                        };
                        for (var r = new F, u = function (e) {
                                var n = new F;
                                n.targetX = 260, n.x = 100, n.hide();
                                var t = We((0 === e ? "a" : 1 === e ? "b" : 2 === e ? "c" : "d") + ".png", ne),
                                    i = n.itemAfter = We((0 === e ? "a" : 1 === e ? "b" : 2 === e ? "c" : "d") + "s.png", ne);
                                i.visible = !1, n.y = 63 * e, n.addChild(t, i), r.addChild(n), n.interactive = !0, n.buttonMode = !0, n.on("tap", function () {
                                    ke.select(e)
                                })
                            }, p = 0; p < 4; p++) u(p);
                        r.moveIn = function () {
                            r.children.forEach(function (e, n) {
                                setTimeout(function () {
                                    w(e, {
                                        x: e.targetX
                                    }, 2500).easing(b.default.Easing.Cubic.InOut).onStart(function () {
                                        e.fadeIn(2e3)
                                    }).repeat(1 / 0).yoyo(!0).start()
                                }, 450 * n)
                            })
                        }, r.position.set(0, P - 390), P < 1300 && r.position.set(0, P - 340);
                        var h = this.ballAni = Ue({
                            eachNum: [25],
                            json: [ne],
                            url: "q5_ball_",
                            animationSpeed: .2,
                            position: {
                                x: 19,
                                y: 21
                            },
                            loop: !1
                        });
                        this.addChild(e, h, n, a, o, r), ke.selectIndex = 0;
                        var m = !1;
                        ke.select = function (e) {
                            m || (m = !0, ke.selectIndex = e, r.children[e].itemAfter.fadeIn(500), setTimeout(function () {
                                ke.moveOut()
                            }, 1e3), $("#click")[0].play(), $("#click")[0].onended = function () {
                                $("#click")[0].src = _("click.mp3") + "?" + +new Date
                            })
                        }, ke.moveIn = function () {
                            ke.visible = !0, ke.inAni.play(), h.play(), w({
                                scale: 1,
                                x: 491,
                                y: 271
                            }, {
                                scale: 2,
                                x: 641,
                                y: 171
                            }, 1e3).onUpdate(function (e) {
                                n.scale.set(e.scale), n.position.set(e.x, e.y)
                            }).onComplete(function () {
                                n.hide()
                            }).delay(200).start(), setTimeout(function () {
                                a.fadeIn(300)
                            }, 2e3), setTimeout(function () {
                                De.goto(4), $("#q5_in")[0].play(), o.showMessage()
                            }, 2e3), setTimeout(function () {
                                r.moveIn()
                            }, 2500), window.NTESAntAnalysis && window.NTESAntAnalysis.sendData({
                                projectid: "NTM-MMKAJZQA-35",
                                val_nm: "c-ntm",
                                val_act: "goto_question_5"
                            })
                        }, ke.moveOut = function () {
                            r.fadeOut(), setTimeout(function () {
                                h.visible = !1, ke.inAni.visible = !1, ke.hide(), Oe.moveIn()
                            }, 300)
                        }
                    }, ke.init(), W.addChild(ke), (Oe = new F).visible = !1, Oe.init = function () {
                        var e = this.inAni = Ue({
                                eachNum: [8, 8, 8, 8, 4, 1],
                                json: Te,
                                url: "q6_in_",
                                animationSpeed: .2,
                                width: 750,
                                height: 1500,
                                type: ".jpg",
                                position: {
                                    x: 0,
                                    y: (P - 1500) / 2
                                },
                                loop: !1
                            }),
                            n = new F;
                        n.y = (P - 1500) / 2, n.hide();
                        var t = We("q6_bg.jpg", te),
                            i = We("door_0.png", Fe[0]);
                        n.addChild(t, i), e.onFrameChange = function () {
                            32 <= e.currentFrame && (e.width = 750, e.height = 1500), 20 === e.currentFrame && s.play()
                        };
                        for (var a = this.ballAni = Ue({
                                eachNum: [37],
                                json: [te],
                                url: "q6_ball_",
                                animationSpeed: .2,
                                position: {
                                    x: 19,
                                    y: 11
                                },
                                loop: !1
                            }), o = Ue({
                                eachNum: [16],
                                json: [ve],
                                url: "q5_out_",
                                animationSpeed: .2,
                                loop: !1
                            }), s = Ue({
                                eachNum: [17],
                                json: [ve],
                                url: "q6_in_",
                                animationSpeed: .2,
                                loop: !1
                            }), d = new F, l = function (e) {
                                var n = new F;
                                n.y = (P - 1500) / 2;
                                var t = n.ani = Ue({
                                        eachNum: [37],
                                        json: [te],
                                        url: (0 === e ? "a" : 1 === e ? "b" : 2 === e ? "c" : "d") + "_in_",
                                        animationSpeed: .2,
                                        loop: !1
                                    }),
                                    i = n.clickArea = p(0 === e ? {
                                        color: 15987699,
                                        width: 229,
                                        height: 87,
                                        x: 191,
                                        y: 466
                                    } : 1 === e ? {
                                        color: 15987699,
                                        width: 227,
                                        height: 87,
                                        x: 280,
                                        y: 621
                                    } : 2 === e ? {
                                        color: 15987699,
                                        width: 225,
                                        height: 86,
                                        x: 370,
                                        y: 775
                                    } : {
                                        color: 15987699,
                                        width: 236,
                                        height: 94,
                                        x: 305,
                                        y: 922
                                    });
                                i.alpha = 0, i.hide();
                                var a = n.iconSelect = We("select_" + (e + 1) + ".png", te),
                                    o = n.iconBgSelect = We("select_bg_" + (e + 1) + ".png", te),
                                    s = [{
                                        x: 231,
                                        y: 487
                                    }, {
                                        x: 240,
                                        y: 430
                                    }, {
                                        x: 233,
                                        y: 423
                                    }, {
                                        x: 256,
                                        y: 487
                                    }];
                                o.x = s[e].x, o.y = s[e].y, a.hide(), o.hide(), i.interactive = !0, i.buttonMode = !0, i.on("tap", function () {
                                    Oe.select(e)
                                }), n.addChild(t, i, a, o), d.addChild(n)
                            }, c = 0; c < 4; c++) l(c);
                        this.addChild(e, n, o, s, a, d), Oe.selectIndex = 0;
                        var r = !1;
                        Oe.select = function (t) {
                            r || (r = !0, Oe.selectIndex = t, d.children.forEach(function (e, n) {
                                n === t ? (e.iconSelect.fadeIn(800), e.iconBgSelect.fadeIn(800)) : e.fadeOut()
                            }), setTimeout(function () {
                                Oe.moveOut()
                            }, 1500), $("#click")[0].play(), $("#click")[0].onended = function () {
                                $("#click")[0].src = _("click.mp3") + "?" + +new Date
                            })
                        }, Oe.moveIn = function () {
                            Oe.visible = !0, Oe.inAni.play(), a.play(), d.children.forEach(function (e) {
                                e.ani.play()
                            }), o.play(), setTimeout(function () {
                                e.hide(), n.show()
                            }, 3500), setTimeout(function () {
                                De.goto(5)
                            }, 2e3), setTimeout(function () {
                                d.children.forEach(function (e, n) {
                                    e.clickArea.visible = !0
                                })
                            }, 3e3), w({
                                y: 11
                            }, {
                                y: 0 + (P - 1500) / 2
                            }, 1500).onUpdate(function (e) {
                                a.y = e.y
                            }).start(), w({
                                y: 0 + (P - 1500) / 2
                            }, {
                                y: 11
                            }, 1500).delay(1500).onUpdate(function (e) {
                                a.y = e.y
                            }).start(), window.NTESAntAnalysis && window.NTESAntAnalysis.sendData({
                                projectid: "NTM-MMKAJZQA-35",
                                val_nm: "c-ntm",
                                val_act: "goto_question_6"
                            })
                        }, Oe.moveOut = function () {
                            i.hide(), a.hide(), s.fadeOut(), Je.moveIn()
                        }
                    }, Oe.init(), W.addChild(Oe), (Je = new F).visible = !1, Je.init = function () {
                        var d = this,
                            l = We("select_finish.png", ie);
                        l.visible = !1, l.position.set(340, 1114 + (P - 1500) / 2), l.interactive = !0, l.buttonMode = !0, l.on("tap", function () {
                            Je.moveOut(), $("#click")[0].play(), $("#click")[0].onended = function () {
                                $("#click")[0].src = _("click.mp3") + "?" + +new Date
                            }
                        }), this.addChild(l);
                        var e = this.inAni = Ue({
                                eachNum: [17, 8],
                                json: Fe,
                                url: "door_",
                                animationSpeed: .2,
                                position: {
                                    x: 0,
                                    y: (P - 1500) / 2
                                },
                                loop: !1
                            }),
                            n = this.ballAni = Ue({
                                eachNum: [11],
                                json: [ie],
                                url: "q7_ball_",
                                animationSpeed: .2,
                                position: {
                                    x: 163,
                                    y: 36
                                },
                                loop: !1
                            }),
                            t = We("title.png", ie);
                        t.hide(), this.addChild(e, t, n), this.initIcons = function () {
                            for (var o = d.iconBox = new F, s = [{
                                    x: 288,
                                    y: 429,
                                    width: 66,
                                    height: 75
                                }, {
                                    x: 433,
                                    y: 417,
                                    width: 58,
                                    height: 67
                                }, {
                                    x: 559,
                                    y: 448,
                                    width: 68,
                                    height: 79
                                }, {
                                    x: 366,
                                    y: 510,
                                    width: 76,
                                    height: 76
                                }, {
                                    x: 249,
                                    y: 590,
                                    width: 102,
                                    height: 114
                                }, {
                                    x: 423,
                                    y: 622,
                                    width: 58,
                                    height: 77
                                }, {
                                    x: 493,
                                    y: 619,
                                    width: 77,
                                    height: 82
                                }, {
                                    x: 530,
                                    y: 554,
                                    width: 65,
                                    height: 75
                                }, {
                                    x: 274,
                                    y: 764,
                                    width: 67,
                                    height: 71
                                }, {
                                    x: 388,
                                    y: 708,
                                    width: 85,
                                    height: 134
                                }, {
                                    x: 499,
                                    y: 778,
                                    width: 59,
                                    height: 58
                                }, {
                                    x: 553,
                                    y: 687,
                                    width: 66,
                                    height: 92
                                }, {
                                    x: 255,
                                    y: 887,
                                    width: 83,
                                    height: 39
                                }, {
                                    x: 364,
                                    y: 824,
                                    width: 64,
                                    height: 88
                                }, {
                                    x: 531,
                                    y: 840,
                                    width: 78,
                                    height: 85
                                }, {
                                    x: 294,
                                    y: 969,
                                    width: 92,
                                    height: 48
                                }, {
                                    x: 437,
                                    y: 895,
                                    width: 79,
                                    height: 87
                                }, {
                                    x: 540,
                                    y: 948,
                                    width: 64,
                                    height: 64
                                }], e = (d.selectedData = [], function (e) {
                                    var n = new F,
                                        t = s[e],
                                        i = p({
                                            color: 15987699,
                                            width: t.width,
                                            height: t.height,
                                            x: t.x,
                                            y: t.y
                                        });
                                    i.alpha = 0;
                                    var a = n.iconSelectSpirite = We("select_icon_" + e + ".png", ie);
                                    a.alpha = 0, n.addChild(i, a), i.interactive = !0, i.buttonMode = !0, o.addChild(n), n.select = !1, n.index = e, i.on("tap", function () {
                                        n.select ? (n.select = !1, d.selectedData.remove(n.index), n.tween && n.tween.stop(), n.tween = w(a, {
                                            alpha: 0
                                        }, 300).start(), 0 === d.selectedData.length && (l.visible = !1)) : ($("#q7_click")[0].play(), $("#q7_click")[0].onended = function () {
                                            $("#q7_click")[0].src = _("q7_click.mp3") + "?" + +new Date
                                        }, n.select = !0, d.selectedData.push(n.index), 1 <= d.selectedData.length && !1 === l.visible && (l.visible = !0), n.tween && n.tween.stop(), n.tween = w(a, {
                                            alpha: 1
                                        }, 300).start())
                                    })
                                }), n = 0; n < 18; n++) e(n);
                            d.addChild(o), o.shine = function () {
                                o.children.forEach(function (e, n) {
                                    var t = e.iconSelectSpirite;
                                    t.alpha = 0, setTimeout(function () {
                                        e.tween = w({
                                            alpha: 0
                                        }, {
                                            alpha: 1
                                        }, 800).onUpdate(function (e) {
                                            t.alpha = e.alpha
                                        }).easing(b.default.Easing.Quadratic.In).start(), setTimeout(function () {
                                            e.select || (e.tween = w({
                                                alpha: 1
                                            }, {
                                                alpha: 0
                                            }, 800).onUpdate(function (e) {
                                                t.alpha = e.alpha
                                            }).easing(b.default.Easing.Quadratic.In).start())
                                        }, 800)
                                    }, 1200 * Math.random())
                                })
                            }, o.position.set(0, (P - 1500) / 2)
                        }, Je.moveIn = function () {
                            Je.show(), e.play(), n.play(), setTimeout(function () {
                                    t.fadeIn(), De.goto(6)
                                }, 500), setTimeout(function () {
                                    $("#q7_door")[0].play()
                                }, 1500), setTimeout(function () {
                                    Je.iconBox.shine()
                                }, 1500),
                                function () {
                                    if (!Le) {
                                        Le = !0;
                                        var i = [{
                                            selectIndex: Ne.selectIndex
                                        }, {
                                            selectIndex: $e.selectIndex
                                        }, {
                                            selectIndex: Ee.selectIndex
                                        }, {
                                            selectIndex: Me.selectIndex
                                        }, {
                                            selectIndex: ke.selectIndex
                                        }, {
                                            selectIndex: Oe.selectIndex
                                        }];
                                        i.forEach(function (e, n) {
                                            window.NTESAntAnalysis && window.NTESAntAnalysis.sendData({
                                                projectid: "NTM-MMKAJZQA-35",
                                                val_nm: "c-ntm",
                                                val_act: "question_" + n + "_select_" + e.selectIndex
                                            })
                                        });
                                        var a = [
                                                [{
                                                    type: "N"
                                                }, {
                                                    type: "N"
                                                }, {
                                                    type: "S"
                                                }],
                                                [{
                                                    type: "N"
                                                }, {
                                                    type: "S"
                                                }],
                                                [{
                                                    type: "S"
                                                }, {
                                                    type: "N"
                                                }, {
                                                    type: "S"
                                                }],
                                                [{
                                                    type: "T"
                                                }, {
                                                    type: "F"
                                                }, {
                                                    type: "F"
                                                }, {
                                                    type: "T"
                                                }],
                                                [{
                                                    type: "E"
                                                }, {
                                                    type: "I"
                                                }, {
                                                    type: "I"
                                                }, {
                                                    type: "E"
                                                }],
                                                [{
                                                    type: "J"
                                                }, {
                                                    type: "P"
                                                }, {
                                                    type: "J"
                                                }, {
                                                    type: "P"
                                                }]
                                            ],
                                            o = [];
                                        i.forEach(function (e, n) {
                                            var t = a[n][e.selectIndex];
                                            o.push(t.type)
                                        });
                                        var t, n = 0,
                                            s = 0;
                                        o.forEach(function (e) {
                                            "S" === e && n++, "N" === e && s++
                                        });
                                        for (var e = 0; e < 3; e++) o.includes("S") && o.remove("S"), o.includes("N") && o.remove("N");
                                        s < n ? o.push("S") : o.push("N");
                                        var d = 0;
                                        X.forEach(function (i, e) {
                                            var a = [!1, !1, !1, !1];
                                            o.forEach(function (n, e) {
                                                var t = !1;
                                                i.type.forEach(function (e) {
                                                    n === e && (t = !0)
                                                }), t && (a[e] = !0)
                                            });
                                            var n = !0;
                                            a.forEach(function (e) {
                                                !1 === e && (n = !1)
                                            }), n && (t = i, d = e)
                                        });
                                        var l = t.pet,
                                            c = t.says;
                                        if (t.special) {
                                            var r = Math.random() <= .2;
                                            r && (l = t.special, c = t.special_says);
                                            var u, p = JSON.parse(localStorage.getItem("pet_2021"));
                                            p ? (p.data.forEach(function (e) {
                                                var t = !1;
                                                e.finalIndex === d && (t = !0, e.select.forEach(function (e, n) {
                                                    e.selectIndex !== i[n].selectIndex && (t = !1)
                                                })), t && (u = e)
                                            }), u ? (l = u.pet, c = u.petSays, r = u.isChooseSpecial) : p.data.push({
                                                pet: l,
                                                petSays: c,
                                                finalIndex: d,
                                                select: i,
                                                isChooseSpecial: r
                                            })) : p = {
                                                data: [{
                                                    pet: l,
                                                    petSays: c,
                                                    finalIndex: d,
                                                    select: i,
                                                    isChooseSpecial: r
                                                }]
                                            }, localStorage.setItem("pet_2021", JSON.stringify(p))
                                        }
                                        for (var h = t.text.sort(x), m = t.quality, f = 0; f < 3; f++) {
                                            var y = h[f].replace("XX", Pe);
                                            $(".pet_words .words").eq(f).find("p").text(y)
                                        }
                                        $(".user_name").text(Pe), r ? ($(".pet_eng").hide(), $(".character").css({
                                            top: 45
                                        }), $(".pet_name").addClass("pet_special_" + d), $(".pet_img").addClass("pet_special_" + d), $("#end").addClass("color3")) : ($(".pet_eng").addClass("pet_eng_" + d), $(".pet_name").addClass("pet_name_" + d), $(".pet_img").addClass("pet_img_" + d), 0 !== d && 4 !== d && 10 !== d && 14 !== d || $("#end").addClass("color2")), window.NTESAntAnalysis && window.NTESAntAnalysis.sendData({
                                            projectid: "NTM-MMKAJZQA-35",
                                            val_nm: "c-ntm",
                                            val_act: "result_" + d + "_" + l
                                        }), $(".pet_see").text(l + "眼中的「" + Pe + "」"), $(".pet_says p").text(c[parseInt(Math.random(c.length))].replace("XX", Pe));
                                        var v = $(".pet_says p").height();
                                        $(".pet_says p").css({
                                            "margin-top": (157 - v) / 2
                                        }), m.forEach(function (e, n) {
                                            $(".quality_item").eq(n).addClass("quality_" + e)
                                        })
                                    }
                                }(), window.NTESAntAnalysis && window.NTESAntAnalysis.sendData({
                                    projectid: "NTM-MMKAJZQA-35",
                                    val_nm: "c-ntm",
                                    val_act: "goto_question_7"
                                })
                        }, Je.moveOut = function () {
                            ! function () {
                                if (!Qe) {
                                    Qe = !0, Je.selectedData.forEach(function (e) {
                                        window.NTESAntAnalysis && window.NTESAntAnalysis.sendData({
                                            projectid: "NTM-MMKAJZQA-35",
                                            val_nm: "c-ntm",
                                            val_act: "icon_select_" + e
                                        })
                                    });
                                    var e = Je.selectedData[parseInt(Math.random() * Je.selectedData.length)];
                                    $(".character").addClass("char_" + e), $(".tap_save").css({
                                        "z-index": 100
                                    });
                                    var a = !1,
                                        o = !1;
                                    setTimeout(function () {
                                        o = !0, a && ($(".tap_save").fadeIn(800), setTimeout(function () {
                                            $(".touch_save_guide").fadeIn()
                                        }, 1e3))
                                    }, 1800), window.NTESAntAnalysis && window.NTESAntAnalysis.sendData({
                                        projectid: "NTM-MMKAJZQA-35",
                                        val_nm: "c-ntm",
                                        val_act: "goto_end"
                                    }), $(".goto_end").fadeIn(function () {
                                        var t = $(".goto_end_loading .loading_inner"),
                                            i = $(".goto_end_loading .goto_end_head");
                                        w({
                                            percent: 0
                                        }, {
                                            percent: 100
                                        }, 1500).onUpdate(function (e, n) {
                                            t.width(402 * n), i.css({
                                                transform: "translate3d(" + -402 * (1 - n) + "px,0,0)"
                                            })
                                        }).start()
                                    }), setTimeout(function () {
                                        v()($(".end_main")[0], {
                                            useCORS: !0,
                                            scale: 1.5
                                        }).then(function (e) {
                                            $("#end").hide(), $(".save_canvas").append(e);
                                            var n = $(".save_canvas canvas")[0],
                                                t = new Image;
                                            t.src = n.toDataURL("image/png"), $(".tap_save").append(t);
                                            var i = new Image;
                                            i.src = n.toDataURL("image/png"), $(".touch_save_guide").append(i), a = !0, o && ($(".tap_save").fadeIn(800), setTimeout(function () {
                                                $(".touch_save_guide").fadeIn()
                                            }, 1e3))
                                        })
                                    }, 500)
                                }
                            }()
                        }, this.initIcons()
                    }, Je.init(), W.addChild(Je),
                    function () {
                        (De = new F).visible = !1, De.position.set(36, P - 53);
                        var e = We("guide_dot.png"),
                            n = new F;
                        n.y = 6, n.x = 24;
                        for (var t = 0; t < 7; t++) {
                            var i = We("guide_" + (t + 1) + ".png");
                            i.scale.set(1 / 2.1), i.pivot.set(33, 25), i.x = 24 * t + 33, n.addChild(i)
                        }
                        n.children[0].scale.set(1), n.children[0].pivot.x = 0, n.children[0].x -= 33;
                        var o = We("guide_icon.png");
                        o.pivot.set(13, 0), o.position.set(40.5, 8), De.addChild(e, n, o), De.goto = function (t) {
                            var i = n.children[t - 1],
                                a = n.children[t];
                            w({
                                scale: 1 / 2.1
                            }, {
                                scale: 1
                            }, 500).onUpdate(function (e, n) {
                                i.scale.set(1 + 1 / 2.1 - e.scale), a.scale.set(e.scale), o.x = 24 * n + 16.5 + 24 * t
                            }).onComplete(function () {
                                a.pivot.x = 0, a.x -= 33
                            }).start()
                        }, W.addChild(De)
                    }(), (Ce = new F).init = function () {
                        var e = new F,
                            i = We("bg.jpg", Z);
                        i.y = (P - 1500) / 2;
                        var a = We("logo.png", Z);
                        a.position.set(41, P - 77);
                        var o = We("noise.png", Z);
                        o.position.set(474, 28);
                        var s = this.startCircle = Ue({
                            eachNum: [21, 15],
                            json: ae,
                            position: {
                                x: 152.5,
                                y: 568.5 + (P - 1500) / 2
                            },
                            url: "circle_",
                            animationSpeed: .2
                        });
                        s.play();
                        var d = this.startEyes = Ue({
                            eachNum: [36],
                            json: [Z],
                            url: "start_eyes_",
                            position: {
                                x: 360,
                                y: 500 + (P - 1500) / 2
                            },
                            animationSpeed: .2
                        });
                        d.play();
                        var l = this.startTitle = Ue({
                            eachNum: [16, 17],
                            json: oe,
                            url: "start_title_",
                            animationSpeed: .2,
                            loop: !1
                        });
                        P < 1300 && l.scale.set(.9), e.addChild(i, a, o, s, d, l);
                        var c = this.loadingBallAni = Ue({
                            eachNum: [17],
                            json: [Z],
                            url: "loading_ball_",
                            animationSpeed: .2,
                            loop: !1
                        });
                        c.position.set(256.5, P / 2 - 287 - 78), this.addChild(e, c), e.alpha = 0, Ce.moveIn = function () {
                            c.play(), setTimeout(function () {
                                e.fadeIn(800), $(".name_box").fadeIn(800, function () {
                                    $("#loading").remove(), W.bg.alpha = 1, D.transparent = !1
                                })
                            }, 800)
                        }, Ce.moveOut = function () {
                            d.stop(), $("#start_door")[0].play();
                            var e = d.currentFrame,
                                n = 6;
                            6 < e && (n = 42);
                            var t = Math.min(600, 30 * (n - e));
                            w({
                                frame: e
                            }, {
                                frame: n
                            }, t).onUpdate(function (e) {
                                d.gotoAndStop(e.frame)
                            }).easing(b.default.Easing.Quadratic.In).onComplete(function () {
                                d.visible = !1, i.visible = !1, c.visible = !1, l.play(), Ne.moveIn()
                            }).onStart(function () {
                                $(".name_box").fadeOut(t), o.fadeOut(t), s.fadeOut(t), a.fadeOut(t)
                            }).start()
                        }
                    }, Ce.init(), W.addChild(Ce), Ke(),
                    function () {
                        $("#name_input").on("blur", function () {
                            setTimeout(function () {
                                var e = document.documentElement.scrollTop || document.body.scrollTop || 0;
                                window.scrollTo(0, Math.max(e - 1, 0))
                            }, 50), "" === $("#name_input")[0].value && $(".name_placeholder").show()
                        }), $("#name_input").on("focus", function () {
                            $(".name_alert,.name_placeholder").hide()
                        }), $(".name_placeholder,.name_alert").bind("click", function () {
                            $("#name_input")[0].focus()
                        }), $(".confirm").bind("click", function () {
                            n || ($("#bgm")[0].paused && $("#bgm")[0].play(), function (e) {
                                h.apply(this, arguments)
                            }({
                                checkText: $("#name_input")[0].value,
                                maxLength: 12,
                                noName: function () {
                                    $(".name_no").show(), $(".name_placeholder").hide()
                                },
                                longName: function () {
                                    $(".name_long").show(), $(".name_placeholder").hide()
                                },
                                wrongName: function () {
                                    $(".name_wrong").show(), $(".name_placeholder").hide()
                                },
                                success: function (e) {
                                    Pe = e, n = !0, $(".input_cover").show(), window.NTESAntAnalysis && window.NTESAntAnalysis.sendData({
                                        projectid: "NTM-MMKAJZQA-35",
                                        val_nm: "c-ntm",
                                        val_act: "start"
                                    }), Ce.moveOut()
                                }
                            }))
                        });
                        var n = !1
                    }(), window.NTESAntAnalysis && window.NTESAntAnalysis.sendData({
                        projectid: "NTM-MMKAJZQA-35",
                        val_nm: "c-ntm",
                        val_act: "loaded"
                    }), setTimeout(function () {
                        $(".loading_head").hide(), Ce.moveIn()
                    }, 100), $("#end").css({
                        display: "block"
                    })
            }
            var Le = !1;
            var Qe = !1;
            var Pe = "";

            function Ue(e) {
                for (var n = e.eachNum, t = e.json, i = e.url, a = e.animationSpeed, o = e.startIndex, s = e.reverse, d = e.loop, l = e.position, c = e.width, r = e.height, u = e.type, p = [], h = o || 0, m = 0; m < n.length; m++)
                    for (var f = 0; f < n[m]; f++) p.push(R[t[m]].textures[i + h + (u || ".png")]), h++;
                s && p.reverse();
                var y = new g.extras.AnimatedSprite(p);
                return !1 === d && (y.loop = !1), a && (y.animationSpeed = a), l && (y.position = l), c && (y.width = c), r && (y.height = r), y
            }

            function We(e, n) {
                return new L(R[n || K].textures[e])
            }

            function Ke() {
                requestAnimationFrame(Ke), b.default.update(), D.render(U)
            }
        },
        0: function (e, n, t) {
            e.exports = t("./src/js/index.js")
        }
    },
    [
        [0, 1, 2]
    ]
]);