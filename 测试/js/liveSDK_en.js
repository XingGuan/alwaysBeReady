!
function(e) {
	var t = {};
	function i(n) {
		if (t[n]) return t[n].exports;
		var o = t[n] = {
			i: n,
			l: !1,
			exports: {}
		};
		return e[n].call(o.exports, o, o.exports, i),
		o.l = !0,
		o.exports
	}
	i.m = e,
	i.c = t,
	i.d = function(e, t, n) {
		i.o(e, t) || Object.defineProperty(e, t, {
			enumerable: !0,
			get: n
		})
	},
	i.r = function(e) {
		"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
			value: "Module"
		}),
		Object.defineProperty(e, "__esModule", {
			value: !0
		})
	},
	i.t = function(e, t) {
		if (1 & t && (e = i(e)), 8 & t) return e;
		if (4 & t && "object" == typeof e && e && e.__esModule) return e;
		var n = Object.create(null);
		if (i.r(n), Object.defineProperty(n, "default", {
			enumerable: !0,
			value: e
		}), 2 & t && "string" != typeof e) for (var o in e) i.d(n, o,
		function(t) {
			return e[t]
		}.bind(null, o));
		return n
	},
	i.n = function(e) {
		var t = e && e.__esModule ?
		function() {
			return e.
		default
		}:
		function() {
			return e
		};
		return i.d(t, "a", t),
		t
	},
	i.o = function(e, t) {
		return Object.prototype.hasOwnProperty.call(e, t)
	},
	i.p = "",
	i(i.s = 0)
} ([function(e, t) { !
	function() {
		var e = "3.7.1",
		t = function() {
			return !! (window.ActiveXObject || "ActiveXObject" in window)
		},
		i = function() {
			var e = new Date;
			return e.getMonth() + "_" + e.getDay() + "_" + e.getHours() + "_" + e.getMinutes() + "_" + e.getSeconds()
		},
		n = function() {
			return 0 == f.delay
		}; !
		function() {
			function t(e) {
				console.log && console.log(e)
			}
			function i(e) {
				console.warn && console.warn(e)
			}
			function n(e, t) {
				for (var i = e.split("."), n = t.split("."), o = 0, a = i.length, r = !1; o < a - 1;) {
					var s = parseInt(i[o]),
					c = parseInt(n[o]);
					if (s > c) {
						r = !0;
						break
					}
					if (s < c) {
						r = !1;
						break
					}
					o++
				}
				return r
			}
			var o = "//view.csslcloud.net/version/version.json?v=" + (new Date).getTime(),
			a = null;
			try {
				window.XMLHttpRequest ? a = new XMLHttpRequest: window.ActiveXObject && (a = new ActiveXObject("Microsoft.XMLHTTP")),
				a && (a.open("GET", o, !0), a.onreadystatechange = function() {
					if (4 === a.readyState && 200 === a.status) {
						var o = JSON.parse(a.responseText);
						o &&
						function(o) {
							var a = o.h5 ? o.h5: {};
							if (a.lowyerVersion && n(a.lowyerVersion.v, e)) {
								a.lowyerVersion.expiration;
								var r = a.errorMsg;
								if (t(r), Error) throw new Error(r);
								i(r)
							} else if (a.latestVersion && n(a.latestVersion.v, e)) i(a.notify)
						} (o)
					}
				},
				a.send())
			} catch(e) {
				t("访问版本信息失败")
			}
		} ();
		var o = {
			retry: 0,
			isFrist: !0,
			ccTrackTimer: null,
			ccTrackCount: 0,
			catonDuration: 0,
			isCaton: !1,
			catonCount: 0,
			HEART_BEAT: 6e4,
			isEnd: !1,
			ccTrackTiming: 0,
			init: function() {
				try {
					ccTrack.init({
						business: "2001",
						roleid: s.viewerid,
						userid: s.viewerid,
						roomid: s.roomid,
						platform: D.isMobile() ? "h5-pc": "h5-m",
						is_low_delay: n(),
						scene_type: 0,
						event_ver: "2.1",
						appVer: e,
						appid: s.userid,
						livestarttime: s.liveCountdown ? 0 : (new Date).getTime() + 1e3 * s.liveCountdown
					})
				} catch(e) {
					console.log("init error", e)
				}
				this.join()
			},
			join: function() {
				try {
					var e = {
						event: "join",
						code: 200,
						rid: (new Date).getTime()
					};
					ccTrack.tragger(e)
				} catch(e) {}
			},
			pusherSucces: function() {
				try {
					var e = {
						event: "pusher",
						code: 200,
						rid: (new Date).getTime()
					};
					ccTrack.tragger(e)
				} catch(e) {}
			},
			pusherReconnect: function() {
				this.retry++;
				try {
					var e = {
						event: "pusher",
						code: 201,
						rid: (new Date).getTime(),
						retry: this.retry
					};
					ccTrack.tragger(e)
				} catch(e) {}
			},
			pusherReconnecting: function() {
				try {
					var e = {
						event: "pusher",
						code: 402,
						rid: (new Date).getTime()
					};
					ccTrack.tragger(e)
				} catch(e) {}
			},
			pusherFailed: function() {
				try {
					var e = {
						event: "pusher",
						code: 401,
						rid: (new Date).getTime()
					};
					ccTrack.tragger(e)
				} catch(e) {}
			},
			pusherDisconnect: function() {
				try {
					var e = {
						event: "pusher",
						code: 400,
						rid: (new Date).getTime()
					};
					ccTrack.tragger(e)
				} catch(e) {}
			},
			ccTrackTimerFoo: function() {
				var e = this;
				e.ccTrackTimer && (clearInterval(e.ccTrackTimer), e.ccTrackTimer = null),
				e.ccTrackTimer = setInterval(function() {
					if (e.isEnd) return clearInterval(e.ccTrackTimer),
					void(e.ccTrackTimer = null);
					try {
						e.ccTrackCount = e.ccTrackCount + 1,
						e.isCaton && (e.catonDuration = e.catonDuration + ((new Date).getTime() - e.catonTime)),
						e.catonDuration >= 6e4 && (e.isCaton = !1);
						var t = {
							event: "heartbeat",
							code: 200,
							blocktimes: e.catonCount,
							blockduration: e.catonDuration >= 6e4 ? 0 : e.catonDuration,
							rid: (new Date).getTime(),
							num: e.ccTrackCount,
							heartinter: 60,
							cdn: e.ccTrackCDN
						};
						e.catonCount = 0,
						e.catonDuration = 0,
						e.ccTrackTiming = (new Date).getTime(),
						ccTrack.tragger(t)
					} catch(e) {
						console.log("ccTrackTimer:", e)
					}
				},
				e.HEART_BEAT)
			},
			setUrl: function(e) {
				this.ccTrackCDN = /^http(s)?:\/\/(.*?)\//.exec(e)[2]
			},
			endLive: function() {
				this.isEnd = !0,
				this.isFrist = !0
			},
			bindVideoEvent: function(e) {
				var t = this;
				this.isEnd = !1;
				var i = e;
				try {
					i.removeEventListener("waiting",
					function() {}),
					i.removeEventListener("play",
					function() {}),
					i.removeEventListener("canplay",
					function() {}),
					i.removeEventListener("ended",
					function() {})
				} catch(e) {}
				i.addEventListener("canplay",
				function() {
					t.startPlayTime = (new Date).getTime(),
					t.isCaton && (t.isCaton = !1, 0 === t.catonCount ? (t.catonCount = t.catonCount + 1, t.catonDuration = t.catonDuration + ((new Date).getTime() - t.ccTrackTiming)) : t.catonDuration = t.catonDuration + ((new Date).getTime() - t.catonTime))
				}),
				i.addEventListener("play",
				function() {
					var e = (new Date).getTime();
					if (t.isFrist) {
						t.ccTrackTimerFoo(),
						t.isFrist = !1;
						try {
							var i = {
								event: "play",
								et: e - t.startPlayTime,
								code: 200,
								rid: (new Date).getTime(),
								cdn: t.ccTrackCDN
							};
							ccTrack.tragger(i)
						} catch(e) {}
					}
				}),
				i.addEventListener("waiting",
				function() {
					t.isSeeking || (t.catonCount = t.catonCount + 1, t.isCaton = !0, t.catonTime = (new Date).getTime())
				}),
				i.addEventListener("playing",
				function() {}),
				i.addEventListener("seeking",
				function() {
					t.isSeeking = !0
				},
				!1),
				i.addEventListener("seeked",
				function() {
					t.isSeeking = !1
				},
				!1),
				i.addEventListener("ended",
				function() {},
				!1),
				i.onerror = function() {
					try {
						var e = {
							event: "play",
							code: 400,
							rid: (new Date).getTime()
						};
						ccTrack.tragger(e)
					} catch(e) {}
				}
			},
			pusherPageChange: function(e) {
				try {
					const t = {
						event: "pageChange",
						code: 200,
						data: {
							url: e.value.url,
							pusherSendTime: e.pusherSendTime,
							socketId: window.socketId
						}
					};
					ccTrack.tragger(t)
				} catch(e) {}
			},
			pageChangeFailed: function(e) {
				try {
					const t = {
						event: "dpview",
						code: 400,
						data: {
							url: e.completeURI,
							pusherTime: e.time,
							socketId: window.socketId
						}
					};
					ccTrack.tragger(t)
				} catch(e) {}
			}
		},
		a = function(e, t, i) {
			$.ajax({
				url: e,
				type: "GET",
				dataType: "jsonp",
				data: t,
				xhrFields: {
					withCredentials: !0
				},
				success: function(e) {
					"function" == typeof i ? i && i(e) : console.log && console.log("onQuestionnairePublish is undefined")
				},
				error: function(e) {
					"function" == typeof i ? i({
						errorCode: 1,
						msg: "request error",
						result: e
					}) : console.log && console.log("onQuestionnairePublish is undefined")
				}
			})
		},
		r = {
			DocModeType: {
				NormalMode: 0,
				FreeMode: 1
			},
			isDPReady: !1,
			dpc: {},
			fastMode: !0,
			init: function() {
				this.dpc = new Dpc({
					roomId: s.roomid,
					acountId: s.userid,
					token: d.options.key,
					type: 1,
					isOpenWaterMark: parseInt(s.fileProcess, 10)
				}),
				$("#drawPanel").css({
					height: "100%",
					width: "100%"
				})
			},
			appendDrawPanel: function() {
				var e = '<iframe id="dpa" allow-scripts allowfullscreen allowusermedia frameborder="0" style="width: 100%;height:100%;"></iframe>';
				"isMobile" == D.isMobile() && (e = '<iframe id="dpa" allow-scripts allowfullscreen allowusermedia frameborder="0" style="width: 100%;height:100%;pointer-events: none;"></iframe>'),
				$("#drawPanel").append(e),
				"function" == typeof window.on_cc_live_db_flip && window.on_cc_live_db_flip()
			},
			destroy: function() {
				this.dpc && this.dpc.dispose && this.dpc.dispose(),
				$("#dpa").remove()
			},
			pageChange: function(e) {
				this.isDPReady && this.fastMode && this.dpc.pageChange(e)
			},
			animationChange: function(e) {
				this.isDPReady && this.fastMode && this.dpc.animationChange(e)
			},
			history: function(e) {
				this.isDPReady && this.fastMode && this.dpc.history(e)
			},
			draw: function(e) {
				this.isDPReady && this.fastMode && this.dpc.draw(e)
			},
			clear: function() {
				this.isDPReady && this.fastMode && this.dpc.clear()
			},
			reload: function() {
				this.isDPReady && this.fastMode && this.dpc.reload()
			},
			setDocMode: function(e) {
				this.isDPReady && this.fastMode && this.dpc.setFreeDocMode(e)
			},
			getDocs: function(e) {
				this.isDPReady && this.fastMode && this.dpc.getDocs(s.roomid, s.userid, e)
			},
			changePageTo: function(e, t) {
				this.isDPReady && this.fastMode && this.dpc.changePageTo(e, t)
			},
			showMarquee: function(e) {
				this.isDPReady && this.fastMode && this.dpc.openMarquee(e)
			},
			closeMarquee: function() {
				this.isDPReady && this.fastMode && this.dpc.closeMarquee()
			},
			openBarrage: function(e) {
				this.isDPReady && this.fastMode && this.dpc.openBarrage()
			},
			insertBarrage: function(e) {
				if (this.isDPReady && this.fastMode) {
					var t;
					try {
						t = JSON.parse(e)
					} catch(i) {
						t = {
							type: "text",
							content: e
						}
					}
					this.dpc.insertBarrage(t)
				}
			},
			closeBarrage: function() {
				this.isDPReady && this.fastMode && this.dpc.closeBarrage()
			},
			docAdapt: function(e) {
				if (this.isDPReady && this.fastMode) {
					var t = e ? "1": "2";
					this.dpc.setDisplayMode(t)
				}
			}
		};
		window.isRequesting = !1,
		window.isLoadAgoraRTC = !1,
		window.isLoadAliyunRtc = !1;
		var s = {
			DocModeType: {
				NormalMode: 0,
				FreeMode: 1
			},
			MediaScaleMode: {
				scale43: "4:3",
				scale169: "16:9",
				scaleFull: "full",
				scaleNormal: "normal"
			},
			init: function(e) {
				var t, i, n, o;
				void 0 === e && (e = {}),
				this.userid = $.trim(e.userid),
				this.roomid = $.trim(e.roomid),
				this.groupid = $.trim(e.groupid),
				this.viewername = $.trim(e.viewername),
				this.viewertoken = $.trim(e.viewertoken),
				this.forcibly = $.trim(e.forcibly),
				this.viewercustomua = $.trim(e.viewercustomua),
				this.language = $.trim(e.language),
				this.viewercustominfo = $.trim(e.viewercustominfo),
				this.ua = $.trim(e.ua),
				this.viewerid = $.trim(e.viewerid),
				this.upid = $.trim(e.upid),
				this.isPCH5Live = !1,
				e.pcH5Live && (this.isPCH5Live = "true" === $.trim(e.pcH5Live.toString())),
				t = "lang",
				i = this.language,
				n = 1e5,
				(o = new Date).setDate(o.getDate() + n),
				document.cookie = t + "=" + i + "; expires=" + o.toDateString(),
				"string" == typeof e.fastMode ? "false" === e.fastMode ? this.fastMode = !1 : this.fastMode = !0 : "boolean" == typeof e.fastMode ? this.fastMode = e.fastMode: this.fastMode = !0,
				r.fastMode = this.fastMode,
				this.forceNew = !1,
				"boolean" == typeof e.forceNew && (this.forceNew = e.forceNew);
				var a = this,
				c = ["//static.csslcloud.net/js/socket.io.js", "//static.csslcloud.net/js/report.js", "//class.csslcloud.net/cctrack/ccTrack.js"];
				window.isLoadAliyunRtc || (c.push("//view.csslcloud.net/js/aliyun-rts-sdk.js"), window.isLoadAliyunRtc = !0),
				navigator.appVersion.indexOf("MSIE") >= 0 || "isMobile" == D.isMobile() || window.isLoadAgoraRTC || (c.push("//static.csslcloud.net/js/AgoraRTCSDK-2.7.1.js"), window.isLoadAgoraRTC = !0);
				var u = document.getElementById("drawPanel");
				if (r.fastMode && u && c.push("//image.csslcloud.net/live/1.0.8/web/js/dpc.js?v=" + (new Date).getTime()), "isMobile" == D.isMobile()) $("#drawPanel").length > 0 && (r.fastMode || c.push("//static.csslcloud.net/js/module/drawingBoard-2.0.0.js"));
				else {
					if (!
					function() {
						var e = !0;
						if (navigator.appVersion.indexOf("MSIE") >= 0) try {
							new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
						} catch(t) {
							e = !1
						} else navigator.plugins["Shockwave Flash"] || (e = !1);
						return e
					} () && ("function" == typeof s.onNotSupportFlash && s.onNotSupportFlash(), "18452D400D6B81D5" == this.userid)) {
						var d = $("#" + f.id).parent().height(),
						l = $("#" + f.id).parent().width();
						$("#" + f.id).append('<div style="z-index: 999999;"><p style="color: #0e0e0e; width: 260px;">您还没有安装flash播放器,请点击<a href="http://www.adobe.com/go/getflash" style="color: red;" target="_blank">这里</a>安装</p></div>').parent().css("z-index", "999999");
						var h = $($("#" + f.id + " div p")[0]).height(),
						p = $($("#" + f.id + " div p")[0]).width();
						$("#" + f.id + " div").css({
							"margin-left": (l - p - 60) / 2 + "px",
							"margin-top": (d - h) / 2 + "px"
						}),
						setInterval(function() {
							$("#" + f.id).parent().show()
						},
						3e3)
					}
					c.push("//static.csslcloud.net/js/swfobject.js", "//static.csslcloud.net/js/json3.min.js")
				}
				a.loadScript(c,
				function() {
					if (a.login(function() {
						a.history = new w
					}), $("#drawPanel").css({
						height: "100%",
						width: "100%"
					}), "isMobile" == D.isMobile() && $.DrawingBoard) {
						$("#drawPanel").append('<canvas id="drawPanel" width="1200" height="1200" style="position: absolute;z-index:2;top:0;left: 0"></canvas><iframe id="dpa" src="" frameborder="0" style="position: absolute;top:0;left: 0"></iframe>'),
						$("div#drawPanel").remove(),
						$.DrawingBoard.config()
					}
				})
			},
			login: function(t) {
				$.ajax({
					url: "//view.csslcloud.net/api/room/login",
					type: "GET",
					dataType: "jsonp",
					data: {
						roomid: this.roomid,
						userid: this.userid,
						groupid: this.groupid,
						viewername: this.viewername,
						viewertoken: this.viewertoken,
						forcibly: this.forcibly,
						viewercustomua: this.viewercustomua,
						viewercustominfo: this.viewercustominfo,
						version: e,
						service: 2,
						client: 4
					},
					success: function(e) {
						if (e.success) {
							var i = "https:" === window.location.protocol,
							n = e.datas.pusherNode.primary;
							if (i && n && n.indexOf(":")) {
								var a = n.split(":");
								if (2 == a.length) {
									var u = parseInt(a[1]);
									if (!isNaN(u)) {
										var l = u + 400;
										n = a[0] + ":" + l
									}
								}
							}
							var p = document.location.protocol + "//" + n + "/" + e.datas.pusher.nsp,
							g = e.datas.viewer.key;
							d.options.pusherUrl = p,
							d.options.key = g,
							s.viewerid = e.datas.viewer.id,
							s.sessionId = e.datas.viewer.key,
							s.viewername = e.datas.viewer.name,
							s.isBan = e.datas.room.isBan,
							s.liveId = e.datas.liveId,
							s.upid = e.datas.upId,
							s.multiQuality = e.datas.room.multiQuality,
							s.documentDisplayMode = e.datas.room.documentDisplayMode,
							s.isBarrage = e.datas.room.barrage,
							s.liveCountdown = e.datas.room.liveCountdown,
							s.groupId = e.datas.viewer.groupId,
							s.fileProcess = e.datas.fileProcess,
							s.rtsFlag = e.datas.room.rtsFlag;
							var v = document.getElementById("drawPanel");
							r.fastMode && v && ($("#documentDisplayMode").length <= 0 && $("body").append("<input id='documentDisplayMode' type='hidden' value=''>"), $("#documentDisplayMode").val(s.documentDisplayMode), r.isDPReady = !0, r.appendDrawPanel(), r.init(), window.on_hdLive_drawPanel_complete && window.on_hdLive_drawPanel_complete()),
							t();
							var m = e.datas.room.delayTime,
							w = e.datas.room.foreignPublish;
							f.delay = m,
							m <= 0 && 5e3,
							f.foreignPublish = w,
							f.openHostMode = e.datas.room.openHostMode,
							f.dvr = e.datas.room.dvr,
							f.barrageData = e.datas.room.barrage,
							f.warmVideoId = e.datas.room.encryptWarmVideoId,
							f.viewerid = e.datas.viewer.id;
							var y = e.datas.room.playerBackgroundImageUri;
							if (y)(i = "https:" === window.location.protocol) && (y = y.replace(/http:/g, "https:"));
							else y = "";
							f.backgroundImageUri = y,
							"function" == typeof s.playerBackgroundImageUri && s.playerBackgroundImageUri(y);
							var I = e.datas.room.playerBackgroundHint;
							I || (I = ""),
							f.backgroundHint = I,
							"function" == typeof s.playerBackgroundHint && s.playerBackgroundHint(I);
							var b = e.datas.announcement;
							"function" == typeof s.onAnnouncementShow && b && s.onAnnouncementShow(b);
							var T = e.datas.room.desc;
							"function" == typeof s.onLiveDesc && s.onLiveDesc(T);
							var k = e.datas.room.showUserCount;
							"function" == typeof s.showUserCount && s.showUserCount(k);
							var P = e.datas.viewer.marquee;
							if ("function" == typeof s.getMarquee && s.getMarquee(P), "function" == typeof s.onLoginSuccess) {
								var M = {
									desc: e.datas.template.desc,
									type: e.datas.template.type,
									name: e.datas.template.name,
									id: e.datas.template.id
								},
								L = {
									id: e.datas.viewer.id,
									groupId: e.datas.viewer.groupId,
									name: e.datas.viewer.name
								},
								C = {
									live: e.datas.live,
									template: M,
									viewer: L
								};
								s.onLoginSuccess(C)
							}
							var R = e.datas.live;
							switch ("function" == typeof s.onLiveTime && s.onLiveTime(R), d.init(), o.init(), c.init(), "isMobile" == D.isMobile() ? D.init() : f.init(), e.datas.template.type) {
							case 6:
								S.init(),
								s.sendPublicChatMsg = s.sendPrivateChatMsg = function() {
									return ! 1
								};
								break;
							case 5:
								_.init(),
								S.init(),
								h.init();
								break;
							case 4:
								_.init(),
								h.init(),
								s.sendQuestionMsg = function() {
									return ! 1
								};
								break;
							case 3:
								_.init(),
								s.sendQuestionMsg = function() {
									return ! 1
								};
								break;
							case 2:
								_.init(),
								S.init();
								break;
							default:
								_.init(),
								S.init(),
								h.init()
							}
						} else "function" == typeof s.onLoginError && s.onLoginError(e)
					}
				})
			},
			logout: function(e) {
				e && ($.ajax({
					url: "//view.csslcloud.net/api/live/logout",
					type: "GET",
					dataType: "jsonp",
					timeout: 5e3,
					xhrFields: {
						withCredentials: !0
					},
					success: function(t) {
						"function" == typeof e.success && e.success(t)
					},
					error: function(t, i, n) {
						"function" == typeof e.error && e.error({
							errorcode: "100",
							msg: "退出失败",
							info: n
						})
					}
				}), d.socket && d.socket.disconnect())
			},
			getScript: function(e, t) {
				var i = !1,
				n = document.createElement("script");
				n.src = e,
				n.onload = n.onreadystatechange = function() {
					i || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (i = !0, t && t())
				},
				document.body.appendChild(n)
			},
			loadScript: function(e, t) {
				if ("string" == typeof e) {
					var i = e; (e = []).push(i)
				}
				var n = this,
				o = function(e, t) {
					n.getScript(e.shift(),
					function() {
						e.length ? o(e, t) : t && t()
					})
				};
				o(e, t)
			},
			changeNickname: function(e) {
				if (!e || "string" != typeof e || e.length > 20) return ! 1;
				d.socket.emit("change_nickname", e)
			},
			destroy: function() {
				r && r.destroy(),
				d && d.destroy(),
				y.interaction && y.interaction.disconnectInteraction(u.viewerId),
				f && f.isReady && f.destroy(),
				window.live && window.live.interaction && (window.live.interaction.hangupInteraction && window.live.interaction.hangupInteraction(), window.live.interaction.leaveAgoraRTC()),
				D.isRtsStream && (D.isRtsStream = !1, D.aliRts = null)
			},
			sendPublicChatMsg: function(e) { ! e || e.length > 300 || d.socket.emit("chat_message", e)
			},
			sendPrivateChatMsg: function(e, t, i) {
				var n = (new Date).getHours(),
				o = (new Date).getMinutes(),
				a = (new Date).getSeconds();
				o = o > 9 ? o: "0" + o,
				a = a > 9 ? a: "0" + a;
				var r = {
					fromuserid: this.viewerid,
					fromusername: this.viewername,
					touserid: e,
					tousername: t,
					msg: $.trim(i),
					time: n + ":" + o + ":" + a
				};
				d.socket.emit("private_chat", JSON.stringify(r))
			},
			sendQuestionMsg: function(e) {
				if (e && !(e.length > 300)) {
					var t = {
						action: "question",
						value: {
							userId: this.viewerid,
							userName: this.viewername,
							content: e
						}
					};
					try {
						d.socket.emit("question", JSON.stringify(t))
					} catch(e) {}
				}
			},
			barrage: function(e, t) {
				if ("isMobile" != D.isMobile()) {
					var i = $.trim(e);
					i && (i = e.replace(/\[em2?_([0-9]*)\]/g, ""), f.barrage({
						txt: i,
						color: null == t ? 16777215 : t
					}))
				}
			},
			getLine: function() {
				return "isMobile" == D.isMobile() ? D.getLine() : f.getLine()
			},
			getCurrentLine: function() {
				return "isMobile" == D.isMobile() ? D.getCurrentLine() : f.getCurrentLine()
			},
			changeQuality: function(e, t) {
				return "isMobile" == D.isMobile() ? D.changeQuality(e, t) : f.changeQuality(e, t)
			},
			getQualityIndex: function() {
				return "isMobile" == D.isMobile() ? D.getQualityIndex() : f.getQualityIndex()
			},
			changeLine: function(e) {
				"isMobile" == D.isMobile() ? D.changeLine(e) : f.changeLine(e)
			},
			onlyAudio: function() {
				"isMobile" == D.isMobile() ? D.onlyAudio() : f.onlyAudio()
			},
			play: function() {
				"isMobile" == D.isMobile() && D.play()
			},
			changeVideoScale: function(e) {
				"isMobile" != D.isMobile() && f.changeVideoScale(e)
			},
			setSound: function(e) {
				"isMobile" != D.isMobile() && f.setSound(e)
			},
			answerRollcall: function(e, t) {
				var i = {
					rollcallId: e,
					userId: this.viewerid,
					userName: this.viewername,
					publisherId: t
				};
				d.socket.emit("answer_rollcall", JSON.stringify(i))
			},
			replyVote: function(e, t, i) {
				var n = {
					voteId: e,
					voteOption: t,
					publisherId: i
				};
				d.socket.emit("reply_vote", JSON.stringify(n))
			},
			docBarrage: function(e, t) {
				$.trim(e) && h.barrage({
					txt: e,
					color: null == t ? 16777215 : t
				})
			},
			openBarrage: function(e) {
				f.openBarrage(e)
			},
			openDocBarrage: function(e) {
				"isMobile" != D.isMobile() && r.fastMode && r.openBarrage(e)
			},
			insertDocBarrage: function(e) {
				"isMobile" != D.isMobile() && r.fastMode && r.insertBarrage(e)
			},
			closeDocBarrage: function() {
				"isMobile" != D.isMobile() && r.fastMode && r.closeBarrage()
			},
			showControl: function(e) {
				"isMobile" == D.isMobile() ? D.showControl(e) : f.showControl(e)
			},
			switchFullScreen: function(e) {
				"isMobile" == D.isMobile() ? D.switchFullScreen(e) : f.switchFullScreen(e)
			},
			livePlayerInit: function() {
				f.init()
			},
			openSound: function() {
				"isMobile" == D.isMobile() ? D.setMuted(!1) : f.openSound()
			},
			closeSound: function() {
				"isMobile" == D.isMobile() ? D.setMuted(!0) : f.closeSound()
			},
			docAdapt: function(e) {
				r.fastMode ? r.docAdapt(e) : y.adapt = e
			},
			requestInteraction: function(e) {
				window.isRequesting || (window.isRequesting = !0, navigator.appVersion.indexOf("MSIE") >= 0 || y.interaction.requestInteraction(e))
			},
			hangupInteraction: function() {
				y.interaction.hangupInteraction()
			},
			enterInteractionRoom: function(e) {
				var t = void 0;
				try {
					d.socket.emit("speak_enter")
				} catch(e) {
					t = e
				} finally {
					"function" == typeof e && e(t)
				}
			},
			sendInteractionMessage: function(e, t, i, n, o) {
				var a = "audio";
				e.video && (a = "audiovideo");
				var r = {
					type: a,
					fromname: this.viewername,
					fromid: this.viewerid,
					fromrole: "student",
					toid: t,
					event: i,
					data: JSON.stringify(n)
				},
				s = void 0;
				try {
					d.socket.emit("speak_message", JSON.stringify(r))
				} catch(e) {
					s = e
				} finally {
					"function" == typeof o && o(s)
				}
			},
			showMarquee: function(e) {
				f.showMarquee(e)
			},
			closeMarquee: function() {
				f.closeMarquee()
			},
			showMarqueeDoc: function(e) {
				r.fastMode ? r.showMarquee(e) : h.showMarquee(e)
			},
			closeMarqueeDoc: function() {
				r.fastMode && r.closeMarquee()
			},
			setDocMode: function(e) {
				r.fastMode && r.setDocMode(e)
			},
			getDocs: function(e) {
				r.fastMode && r.getDocs(e)
			},
			changePageTo: function(e, t) {
				r.fastMode && r.changePageTo(e, t)
			},
			submitQuestionnaire: function(e, t) {
				if (e) {
					var i = {
						questionnaireid: e.questionnaireId,
						answers: JSON.stringify({
							subjectsAnswer: e.subjectsAnswer
						})
					};
					$.ajax({
						url: "//eva.csslcloud.net/api/questionnaire/submit",
						type: "GET",
						dataType: "jsonp",
						timeout: 5e3,
						data: i,
						xhrFields: {
							withCredentials: !0
						},
						success: function(e) {
							t ? t(e) : console.log && console.log("no callback")
						},
						error: function(e, i, n) {
							t && t({
								errorCode: 1,
								msg: "request was aborted",
								result: n
							})
						}
					})
				}
			},
			commitLottery: function(e, t) {
				c.commitLottery(e, t)
			},
			getPublishingQuestionnaire: function() {
				a("//eva.csslcloud.net/api/questionnaire/info", {},
				s.onQuestionnairePublish)
			},
			getPracticeInfo: function(e, t) {
				var i = {
					practiceId: e,
					sessionId: d.options.key
				};
				a("//eva.csslcloud.net/api/practice/info", i, t)
			},
			getPracticeInfomation: function(e, t) {
				var i = {
					practiceId: e,
					sessionId: d.options.key,
					mark: 1
				};
				a("//eva.csslcloud.net/api/practice/info", i, t)
			},
			submitPracticeInfo: function(e, t, i) {
				var n = {
					practiceId: e,
					options: t,
					sessionId: d.options.key
				};
				a("//eva.csslcloud.net/api/practice/submit", n, i)
			},
			getPracticeStatisInfo: function(e, t) {
				var i = {
					practiceId: e,
					sessionId: d.options.key
				};
				a("//eva.csslcloud.net/api/practice/statis", i, t)
			},
			getPracticeRanking: function(e, t) {
				var i = {
					practiceId: e,
					sessionId: d.options.key
				};
				a("//eva.csslcloud.net/api/practice/ranking", i, t)
			},
			getHdInquirePunchInformation: function(e) {
				this.httpRequest({
					url: "//view.csslcloud.net/servlet/punch/viewer",
					data: {
						sessionId: d.options.key
					},
					success: function(t) {
						"function" == typeof e && e(t)
					},
					error: function(t) {
						e && e(t)
					}
				})
			},
			hdCommitPunch: function(e, t) {
				this.httpRequest({
					url: "//view.csslcloud.net/servlet/punch/commit",
					data: {
						punchId: e,
						sessionId: d.options.key
					},
					success: function(e) {
						t && t(e)
					},
					error: function(e) {
						t && t(e)
					}
				})
			},
			httpRequest: function(e) {
				$.ajax({
					url: e.url || "",
					data: e.data || {},
					type: e.type || "GET",
					dataType: e.dataType || "json",
					timeout: e.timeout || 5e3,
					success: function(t) {
						"function" == typeof e.success && e.success(t)
					},
					error: function(t) {
						"function" == typeof e.error && e.error(t)
					},
					fail: function(t) {
						"function" == typeof e.fail && e.fail(t)
					}
				})
			},
			clipVideoImage: function() {
				if (this.isPCH5Live || D.isMobile()) {
					var e = document.createElement("canvas"),
					t = e.getContext("2d"),
					i = document.querySelector("#" + f.id + " video");
					return i ? (e.width = i.videoWidth, e.height = i.videoHeight, t.drawImage(i, 0, 0, i.videoWidth, i.videoHeight), e.toDataURL()) : ""
				}
			}
		};
		window.DWLive = s;
		var c = {
			init: function() {
				this.queryLotteryStatus()
			},
			create: function() {
				this.queryLotteryStatus()
			},
			cancel: function() {
				s.onLottery({
					lotteryStatus: 1,
					haveLottery: !0
				})
			},
			complete: function() {
				this.queryLotteryUserInfo()
			},
			queryLotteryStatus: function() {
				var e = this;
				I("/api/lottery/student/status", {
					accountId: s.userid,
					roomId: s.roomid
				},
				function(t) {
					if (t.success && t.data.haveLottery) {
						var i = t.data;
						if ("function" == typeof s.onLottery) {
							e.lotteryId = t.data.lotteryId,
							e.lotteryType = i.lotteryType;
							var n = {
								lotteryId: i.lotteryId,
								lotteryStatus: i.lotteryStatus,
								haveLottery: !0,
								lotteryType: i.lotteryType
							};
							s.onLottery(n)
						}
					} else "function" == typeof s.onLottery && s.onLottery({
						haveLottery: !1
					})
				})
			},
			queryLotteryUserInfo: function() {
				var e = this;
				I("/api/lottery/query/own", {
					accountId: s.userid,
					roomId: s.roomid,
					lotteryId: e.lotteryId
				},
				function(t) {
					if (t.success) {
						var i = t.data;
						e.isWinner = i.isWinner,
						e.collectTemplateInfo = i.isWinner ? i.collectTemplate: [];
						var n = {
							lotteryId: e.lotteryId,
							haveLottery: !0,
							lotteryStatus: 2,
							lotteryType: e.lotteryType,
							LotteryWinInfo: {
								LotteryCollectTemplate: i.collectTemplate || [],
								isWinner: i.isWinner,
								ownUserInfo: {
									userAvatar: i.isWinner ? i.ownUserInfo.userAvatar: "",
									userName: i.isWinner ? i.ownUserInfo.userName: "",
									userId: i.isWinner ? i.ownUserInfo.userId: "",
									prizeCode: i.isWinner ? i.ownUserInfo.prizeCode: ""
								},
								LotteryPrize: i.prize,
								LotteryUserInfo: i.userInfos
							}
						};
						s.onLottery(n)
					}
				})
			},
			commitLottery: function(e, t) {
				var i = e.collectInfos.find(function(e) {
					return 1 === e.index
				});
				if ("" !== i.value && " " !== i.value) {
					var n = e.collectInfos.find(function(e) {
						return 2 === e.index
					}); ! n || /^[1][3,4,5,7,8,9][0-9]{9}$/.test(n.value) ? b("/api/lottery/collect?accountId=" + s.userid + "&roomId=" + s.roomid, e,
					function(e) {
						e.success ? t && t.onSuccess && t.onSuccess("提交成功") : t && t.onError && t.onError("提交失败")
					}) : t && t.onError && t.onError("请输入正确的电话号码")
				} else t && t.onError && t.onError("姓名不能未空")
			}
		},
		u = {
			init: function() {
				this.userId = s.userid,
				this.roomId = s.roomid,
				this.groupId = s.groupId,
				this.liveId = s.liveId,
				this.viewerId = s.viewerid,
				this.upId = s.upid
			}
		},
		d = {
			options: {
				pusherUrl: "",
				key: "",
				maxMessageCount: 300,
				userId: "",
				roomId: "",
				livePlayerId: "",
				drawPanel: ""
			},
			drawjson: [],
			pagechangedata: [],
			publishStreamTimer: 0,
			endStreamTimer: 0,
			init: function() {
				var e = "isMobile" == D.isMobile() ? 1 : 0;
				this.timeIntervalID = -1,
				s.forceNew ? (this.socket = io.connect(this.options.pusherUrl + "?sessionid=" + d.options.key + "&platform=1&terminal=" + e, {
					forceNew: !0
				}), A("forceNew: true")) : (this.socket = io.connect(this.options.pusherUrl, {
					query: {
						sessionid: d.options.key,
						platform: 1,
						terminal: e
					},
					secure: !0,
					transports: ["websocket"]
				}), A("forceNew: false")),
				this.bind()
			},
			destroy: function() {
				this.hangupInteraction(),
				this.cancelRequestInteraction(),
				this.socket && this.socket.disconnect(),
				-1 != this.timeIntervalID && clearInterval(this.timeIntervalID)
			},
			bind: function() {
				var e = !1,
				t = this;
				this.socket.on("connect",
				function() {
					window.socketId = t.socket.io.engine.id,
					o.pusherSucces(),
					"function" == typeof window.onSocketConnect && window.onSocketConnect()
				}),
				this.socket.on("disconnect",
				function() {
					o.pusherDisconnect(),
					"function" == typeof window.onSocketDisconnect && window.onSocketDisconnect(),
					window.isRequesting = !1
				}),
				this.socket.on("reconnect_failed",
				function() {
					o.pusherFailed()
				}),
				this.socket.on("reconnecting",
				function() {
					o.pusherReconnecting()
				}),
				this.socket.on("reconnect",
				function() {
					o.pusherReconnect()
				}),
				this.socket.on("page_change",
				function(e) {
					var t = e;
					if (e && "string" == typeof e && (t = JSON.parse(e), d.pagechangedata.push(t)), "function" == typeof window.on_cc_live_dw_page_change && window.on_cc_live_dw_page_change(e), "function" == typeof s.onPageChange) {
						var i = JSON.parse(e),
						n = {
							docId: i.value.docid,
							docName: i.value.fileName,
							docTotalPage: i.value.totalPage,
							pageNum: i.value.page
						};
						s.onPageChange(n)
					}
					o.pusherPageChange(t)
				}),
				this.socket.on("change_nickname",
				function(e) {
					s.viewername = e,
					"function" == typeof s.onChangeNickname && s.onChangeNickname(e)
				}),
				this.socket.on("animation_change",
				function(e) {
					"function" == typeof window.on_cc_live_dw_animation_change && window.on_cc_live_dw_animation_change(e)
				}),
				this.socket.on("draw",
				function(e) {
					e && "string" == typeof e && d.drawjson.push(JSON.parse(e)),
					"function" == typeof window.on_cc_live_dw_draw && window.on_cc_live_dw_draw(e)
				}),
				this.socket.on("room_user_count",
				function(e) {
					"function" == typeof s.onUserCountMessage && s.onUserCountMessage(e)
				}),
				this.socket.on("publish_stream",
				function(e) {
					this.publishStreamTimer && clearTimeout(this.publishStreamTimer),
					this.publishStreamTimer = setTimeout(function() {
						f && (f.isPublishing = 1),
						f && f.start && f.start(),
						"function" == typeof s.onLiveStart && s.onLiveStart(e)
					},
					q())
				}),
				this.socket.on("end_stream",
				function(e) {
					this.endStreamTimer && clearTimeout(this.endStreamTimer),
					this.endStreamTimer = setTimeout(function() {
						f && (f.isPublishing = 0),
						f && f.end && f.end(),
						h && h.clear && h.clear(),
						r.clear(),
						"function" == typeof s.onLiveEnd && s.onLiveEnd(e)
					},
					q())
				}),
				this.socket.on("kick_out",
				function(e) {
					d.socket.disconnect(),
					"function" == typeof s.onKickOut && s.onKickOut(e),
					"function" == typeof s.onKickOutMobile && s.onKickOutMobile(e),
					D.isIPad() || D.isIPhone() || D.isAndroid() || D.isWindowsPhone() || f.isH5Video() || f.getFlash()._kickOff && f.getFlash()._kickOff()
				}),
				this.socket.on("announcement",
				function(e) {
					"release" == (e = F(e)).action ? "function" == typeof s.onAnnouncementRelease && s.onAnnouncementRelease(e.announcement) : "remove" == e.action && "function" == typeof s.onAnnouncementRemove && s.onAnnouncementRemove(e)
				}),
				this.socket.on("ban_chat_broadcast",
				function(e) {
					e = F(e),
					"function" == typeof s.HDBanChatBroadcastWithData && s.HDBanChatBroadcastWithData(e)
				}),
				this.socket.on("in_remind",
				function(e) {
					var t = {
						userId: (e = F(e)).userId,
						userName: e.userName,
						userRole: e.userRole,
						groupId: e.groupId,
						clientType: e.clientType,
						prefixContent: e.prefixContent,
						suffixContent: e.suffixContent,
						remindAction: 1
					};
					"function" == typeof s.HDUserRemindWithAction && s.HDUserRemindWithAction(t)
				}),
				this.socket.on("out_remind",
				function(e) {
					var t = {
						userId: (e = F(e)).userId,
						userName: e.userName,
						userRole: e.userRole,
						groupId: e.groupId,
						clientType: e.clientType,
						prefixContent: e.prefixContent,
						suffixContent: e.suffixContent,
						remindAction: 0
					};
					"function" == typeof s.HDUserRemindWithAction && s.HDUserRemindWithAction(t)
				}),
				this.socket.on("start_rollcall",
				function(e) {
					e = F(e),
					"function" == typeof s.onStartRollCall && s.onStartRollCall(e)
				}),
				this.socket.on("start_punch",
				function(e) {
					e = F(e),
					"function" == typeof s.onHdLiveStartPunch && s.onHdLiveStartPunch(e)
				}),
				this.socket.on("stop_punch",
				function(e) {
					e = F(e),
					"function" == typeof s.onHdLiveStopPunch && s.onHdLiveStopPunch(e)
				}),
				this.socket.on("start_lottery",
				function(e) {
					e = F(e),
					"function" == typeof s.onStartLottery && s.onStartLottery(e)
				}),
				this.socket.on("win_lottery",
				function(e) {
					e = F(e),
					"function" == typeof s.onWinLottery && s.onWinLottery(e)
				}),
				this.socket.on("stop_lottery",
				function(e) {
					e = F(e),
					"function" == typeof s.onStopLottery && s.onStopLottery(e)
				}),
				this.socket.on("start_vote",
				function(e) {
					e = F(e),
					"function" == typeof s.onStartVote && s.onStartVote(e)
				}),
				this.socket.on("stop_vote",
				function(e) {
					e = F(e),
					"function" == typeof s.onStopVote && s.onStopVote(e)
				}),
				this.socket.on("vote_result",
				function(e) {
					e = F(e),
					"function" == typeof s.onVoteResult && s.onVoteResult(e)
				}),
				this.socket.on("ban_stream",
				function(e) {
					e = F(e),
					s.isBan = 1,
					"isMobile" == D.isMobile() ? D.ban() : f.banLive(),
					"function" == typeof s.onBanStream && s.onBanStream(e)
				}),
				this.socket.on("unban_stream",
				function(e) {
					e = F(e),
					s.isBan = 0,
					"isMobile" == D.isMobile() ? D.unban() : f.unbanLive(),
					"function" == typeof s.onUnBanStream && s.onUnBanStream(e)
				}),
				window.isSpeakThirdParty = !1,
				this.socket.on("room_setting",
				function(t) {
					if (t = F(t), "function" == typeof s.onRoomSetting && (window.allowSpeakThirdParty = t.allow_speak_third_party, "true" == t.allow_speak_interaction && (window.isSpeakThirdParty = !1), "true" == window.allowSpeakThirdParty.status && (window.isSpeakThirdParty = !0, t.allow_speak_interaction = "true"), window.isSpeakThirdParty, s.onRoomSetting(t)), t.layout_video_main != e) {
						var i = t.layout_video_main;
						"function" == typeof s.onSwitchVideoDoc && s.onSwitchVideoDoc(i),
						e = i
					}
				}),
				this.socket.on("silence_user_chat_message",
				function(e) {
					"function" == typeof s.onSilenceUserChatMessage && s.onSilenceUserChatMessage(F(e))
				}),
				this.socket.on("ban_delete_chat",
				function(e) {
					"function" == typeof s.onBanDeleteChat && s.onBanDeleteChat(F(e))
				}),
				this.socket.on("accept_speak",
				function(e) {
					"function" == typeof window.on_cc_live_accept_interaction && window.on_cc_live_accept_interaction(F(e))
				}),
				this.socket.on("speak_message",
				function(e) {
					window.isSpeakThirdParty || "function" != typeof window.on_cc_live_interaction_message || window.on_cc_live_interaction_message(F(e))
				}),
				this.socket.on("speak_peer_list",
				function(e) {
					"function" == typeof window.on_cc_live_interaction_chatusers && window.on_cc_live_interaction_chatusers(F(e))
				}),
				this.socket.on("speak_disconnect",
				function(e) {
					"function" == typeof window.on_cc_live_interaction_disconnect_self && window.on_cc_live_interaction_disconnect_self(F(e))
				}),
				this.socket.on("speak_disconnect_third_party",
				function(e) {
					"function" == typeof window.on_cc_live_interaction_disconnect_self && window.on_cc_live_interaction_disconnect_self(F(e))
				}),
				this.socket.on("broadcast_msg",
				function(e) {
					"function" == typeof s.onBroadcastMsg && s.onBroadcastMsg(F(e).value)
				}),
				this.socket.on("broadcast_action",
				function(e) {
					"function" == typeof s.removeBroadcastMsg && s.removeBroadcastMsg(F(e))
				}),
				this.socket.on("publish_question",
				function(e) {
					"function" == typeof s.onQaPublish && s.onQaPublish(F(e))
				}),
				this.socket.on("questionnaire_publish",
				function(e) {
					e = F(e),
					"function" == typeof s.onQuestionnairePublish && s.onQuestionnairePublish(e)
				}),
				this.socket.on("questionnaire_publish_stop",
				function(e) {
					e = F(e),
					"function" == typeof s.onQuestionnairePublishStop && s.onQuestionnairePublishStop(e)
				}),
				this.socket.on("practice_publish",
				function(e) {
					e = F(e),
					"function" == typeof s.onPracticePublish && s.onPracticePublish(e)
				}),
				this.socket.on("practice_stop",
				function(e) {
					e = F(e),
					"function" == typeof s.onPracticePublishStop && s.onPracticePublishStop(e)
				}),
				this.socket.on("practice_close",
				function(e) {
					e = F(e),
					"function" == typeof s.onPracticeClose && s.onPracticeClose(e)
				}),
				this.socket.on("prize_send",
				function(e) {
					e = F(e),
					"function" == typeof s.onPrizeSend && s.onPrizeSend(e)
				}),
				this.socket.on("questionnaire_publish_statis",
				function(e) {
					e = F(e),
					"function" == typeof s.onQuestionnairePublishStatis && s.onQuestionnairePublishStatis(e)
				}),
				this.socket.on("lottery_create",
				function(e) {
					c.create(e)
				}),
				this.socket.on("lottery_cancel",
				function(e) {
					c.cancel(e)
				}),
				this.socket.on("lottery_complete",
				function(e) {
					c.complete(e)
				}),
				this.socket.on("room_teachers",
				function(e) {
					"function" == typeof s.onOnlineTeachers && s.onOnlineTeachers(F(e))
				}),
				this.socket.on("external_questionnaire_publish",
				function(e) {
					"function" == typeof s.onExternalQuestionnairePublish && s.onExternalQuestionnairePublish(F(e))
				}),
				this.socket.on("ban_chat",
				function(e) {
					"function" == typeof s.onBanChat && s.onBanChat(F(e))
				}),
				this.socket.on("unban_chat",
				function(e) {
					"function" == typeof s.onUnBanChat && s.onUnBanChat(F(e))
				}),
				this.socket.on("switch_source",
				function(e) {
					"function" == typeof s.onSwitchSource && s.onSwitchSource(e)
				});
				t = this;
				setTimeout(function() {
					try {
						t.socket.emit("room_user_count")
					} catch(e) {}
					try {
						t.socket.emit("room_teachers")
					} catch(e) {}
				},
				1500),
				this.timeIntervalID = setInterval(function() {
					try {
						t.socket.emit("room_user_count")
					} catch(e) {}
					try {
						t.socket.emit("room_teachers")
					} catch(e) {}
				},
				15e3)
			},
			requestInteraction: function(e, t) {
				var i = "audio";
				e.video && (i += "video");
				var n = {
					viewerId: s.viewerid,
					viewerName: s.viewername,
					type: i
				},
				o = void 0;
				try {
					this.socket.emit("request_speak", JSON.stringify(n))
				} catch(e) {
					o = e
				} finally {
					"function" == typeof t && t(o)
				}
			},
			cancelRequestInteraction: function(e, t) {
				var i = {
					viewerId: s.viewerid,
					viewerName: s.viewername,
					type: window.live.interaction.local.type
				};
				A("interaction", "取消申请：" + JSON.stringify(i));
				var n = void 0;
				try {
					this.socket.emit("cancel_request_speak", JSON.stringify(i))
				} catch(e) {
					n = e
				} finally {
					"function" == typeof t && t(n)
				}
			},
			hangupInteraction: function(e, t) {
				var i = {
					viewerId: s.viewerid,
					viewerName: s.viewername,
					type: e
				};
				A("interaction", "挂断事件：" + JSON.stringify(i));
				var n = void 0;
				try {
					window.isSpeakThirdParty ? this.socket.emit("hangup_interaction_third_party", JSON.stringify(i)) : this.socket.emit("hangup_interaction", JSON.stringify(i))
				} catch(e) {
					n = e
				} finally {
					"function" == typeof t && t(n)
				}
			}
		},
		l = function(e) {
			try {
				window.PeerConnection = window.PeerConnection || window.webkitPeerConnection00 || window.webkitRTCPeerConnection || window.mozRTCPeerConnection,
				window.URL = window.URL || window.webkitURL || window.msURL || window.oURL,
				window.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia,
				window.nativeRTCIceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate,
				window.nativeRTCSessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription
			} catch(e) {}
			this.usersPcs = {
				length: 0
			},
			this.local = {
				type: {
					video: !1,
					audio: !1
				},
				video: {},
				audio: {}
			},
			this.isRequesting = !1,
			this.client = null,
			this.localStream = null,
			this.initAgoraRTC = function(e) {
				if (AgoraRTC.checkSystemRequirements() || AgoraRTC.Logger.error("Your browser does not support WebRTC!"), AgoraRTC && AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.ERROR), window.atob) {
					var t = s.userid,
					i = s.roomid,
					n = s.sessionId,
					o = e.channelId,
					a = window.atob(this.hex2str(e.appId)),
					r = e.viewToken,
					c = e.videosize,
					u = {
						agora: {
							appId: a,
							viewToken: r,
							channelId: o,
							type: this.local.type,
							ui: 0,
							videoSize: c
						},
						tokens: {
							accountId: t,
							roomId: i,
							sessionId: n,
							channelId: o,
							ui: 0
						}
					};
					this.joinAgoraRTC(u)
				}
			},
			this.hex2str = function(e) {
				var t, i = e.trim(),
				n = "0x" === i.substr(0, 2).toLowerCase() ? i.substr(2) : i,
				o = n.length;
				if (o % 2 != 0) return alert("Illegal Format ASCII Code!"),
				"";
				for (var a = [], r = 0; r < o; r += 2) t = parseInt(n.substr(r, 2), 16),
				a.push(String.fromCharCode(t));
				return a.join("")
			},
			this.joinAgoraRTC = function(e) {
				AgoraRTC.checkSystemRequirements() || AgoraRTC.Logger.error("Your browser does not support WebRTC!");
				var t = this;
				AgoraRTC.Logger.enableLogUpload(),
				t.client = AgoraRTC.createClient({
					mode: "live",
					codec: "h264"
				}),
				t.client.init(e.agora.appId,
				function() {
					t.client.join(e.agora.viewToken, e.agora.channelId, e.agora.uid,
					function(i) {
						t.localStream = AgoraRTC.createStream({
							streamID: i,
							video: e.agora.type.video,
							audio: e.agora.type.audio,
							cameraId: t.cameraId,
							microphoneId: t.microphoneId,
							screen: !1
						});
						var n = e.agora.videoSize.split("x");
						t.localStream.setVideoEncoderConfiguration({
							resolution: {
								width: parseInt(n[0]),
								height: parseInt(n[1])
							}
						}),
						t.localStream.on("accessAllowed",
						function() {}),
						t.localStream.on("accessDenied",
						function() {}),
						t.localStream.on("player-status-change",
						function(e) {
							"video" == e.mediaType && "aborted" == e.status && t.localStream.close()
						}),
						t.localStream.init(function() {
							$("#agora_local").length || $("#interactionLocalVideo").after('<div id="agora_local"></div>'),
							t.localStream.play("agora_local"),
							t.client.publish(t.localStream,
							function(e) {}),
							t.client.on("stream-published",
							function(e) {})
						},
						function(e) {})
					},
					function(e) {})
				},
				function(e) {}),
				t.client.on("stream-added",
				function(e) {
					var i = e.stream;
					t.client.subscribe(i,
					function(e) {})
				}),
				t.client.on("stream-subscribed",
				function(e) {
					var t = e.stream;
					$("#videoInteractions").append('<div id="interactionRemoteVideo' + t.getId() + '" style="height: 100%; width: 100%;" autoplay></div>'),
					t.play("interactionRemoteVideo" + t.getId(), {
						fit: "contain"
					})
				}),
				t.client.on("first-video-frame-decode",
				function(e) {
					"function" == typeof window.on_cc_live_interaction_remote_media && window.on_cc_live_interaction_remote_media(t.local.type),
					$("#agora_local").hide(),
					$("#livePlayer").hide(),
					window.isRequesting = !1
				})
			},
			this.leaveAgoraRTC = function() {
				this.client && ($("#livePlayer").show(), f.openSound(), this.localStream && this.localStream.close(), this.client && (this.client.leave(function() {
					$("#videoInteractions").empty(),
					$("#audioInteractions").empty(),
					$("#interactionLocalVideo")[0].src = "",
					$("#agora_local").html("")
				},
				function(e) {}), window.isRequesting = !1))
			},
			this.cameraId = "",
			this.microphoneId = "",
			this.getDevices = function() {
				var e = this;
				AgoraRTC.getDevices(function(t) {
					for (var i = 0; i !== t.length; ++i) {
						var n = t[i];
						"audioinput" !== n.kind || e.microphoneId || (e.microphoneId = n.deviceId),
						"videoinput" !== n.kind || e.cameraId || (e.cameraId = n.deviceId)
					}
				})
			},
			this.requestInteraction = function(e, t) {
				A("Interaction", "请求互动"),
				window.isSpeakThirdParty && this.getDevices(),
				this.local.type = e,
				this.isRequesting = !0,
				this.setRequestTimeoutTimer(),
				this.createLocalMedia(function(i) {
					i ? "function" == typeof window.on_cc_live_interaction_error && window.on_cc_live_interaction_error(y.interaction.local.type, i, "创建音视频信息出错") : d.requestInteraction(e, t)
				})
			},
			this.setCallingTimer = function() {
				y.interaction.interactionTime = 0,
				y.interaction.interactionTimeInterval = setInterval(function() {
					if (++y.interaction.interactionTime, "function" == typeof window.on_cc_live_interaction_interval) {
						var e = y.interaction.local.type,
						t = y.interaction.interactionTime;
						window.on_cc_live_interaction_interval(e, t)
					}
				},
				1e3)
			},
			this.clearCallingTimer = function() {
				y.interaction.interactionTime = 0,
				clearInterval(y.interaction.interactionTimeInterval)
			},
			this.setRequestTimeoutTimer = function() {
				y.interaction.REQUEST_INTERACTION_TIMEOUT = setTimeout(function() {
					y.interaction.REQUEST_INTERACTION_TIMEOUT = -1,
					y.interaction.hangupInteraction(s.viewerid),
					y.interaction.stopLocalStream(),
					y.interaction.isRequesting = !1,
					$("#interactionLocalVideo")[0] && ($("#interactionLocalVideo")[0].src = ""),
					"function" == typeof window.on_cc_live_interaction_request_timeout && window.on_cc_live_interaction_request_timeout(y.interaction.local.type)
				},
				6e4),
				window.isRequesting = !1
			},
			this.clearRequestTimeoutTimer = function() {
				y.interaction.REQUEST_INTERACTION_TIMEOUT > 0 && (clearTimeout(y.interaction.REQUEST_INTERACTION_TIMEOUT), y.interaction.REQUEST_INTERACTION_TIMEOUT = -1)
			},
			this.stopLocalStream = function() {
				if (y.interaction.local.video.stream) try {
					y.interaction.local.video.stream.getTracks().forEach(function(e) {
						e.stop()
					})
				} catch(e) {}
				if (y.interaction.local.audio.stream) try {
					y.interaction.local.audio.stream.getTracks().forEach(function(e) {
						e.stop()
					})
				} catch(e) {}
			},
			this.cancelInteraction = function() {
				y.interaction.isRequesting = !1,
				"function" == typeof window.on_cc_live_interaction_cancal && window.on_cc_live_interaction_cancal(y.interaction.local.type)
			},
			this.disconnectInteraction = function(e) {
				s.openSound(),
				this.clearRequestTimeoutTimer(),
				e == s.viewerid ? $.each(y.interaction.usersPcs,
				function(e, t) {
					var i = t.pc;
					if (null == i) return ! 0;
					if (i.close(), i = null, y.interaction.usersPcs[e]) {
						delete y.interaction.usersPcs[e];
						var n = y.interaction.usersPcs.length - 1;
						y.interaction.usersPcs.length = n < 0 ? 0 : n
					}
				}) : $.each(y.interaction.usersPcs,
				function(t, i) {
					var n = i.pc;
					if (!n) return ! 0;
					if (t != e) return ! 0;
					if (n.close(), n = null, y.interaction.usersPcs[t]) {
						delete y.interaction.usersPcs[t];
						var o = y.interaction.usersPcs.length - 1;
						y.interaction.usersPcs.length = o < 0 ? 0 : o
					}
				}),
				0 == y.interaction.usersPcs.length && this.stopLocalStream(),
				y.interaction.isInteractioning = !1,
				y.interaction.isRequesting = !1
			},
			this.createLocalAudioAndVideoMedia = function(e) {
				var t = this;
				getUserMedia.call(navigator, {
					video: !0,
					audio: !0
				},
				function(i) {
					t.local.video.stream = i,
					e && "function" == typeof e && e(i)
				},
				function(t) {
					A("Interaction", "getUserMedia error: " + t),
					e && "function" == typeof e && e(t)
				})
			},
			this.createLocalAudioMedia = function(e) {
				var t = this;
				getUserMedia.call(navigator, {
					video: !1,
					audio: !0
				},
				function(i) {
					t.local.audio.stream = i,
					e && "function" == typeof e && e(i)
				},
				function(t) {
					A("Interaction", "getUserMedia error: " + t),
					e && "function" == typeof e && e(t)
				})
			},
			this.createLocalMedia = function(e) {
				var t = this,
				i = t.local.type;
				getUserMedia.call(navigator, i,
				function(n) {
					i.video ? t.local.video.stream = n: t.local.audio.stream = n;
					var o = $("#interactionLocalVideo")[0];
					o && (o.srcObject = n, o.volume = 0),
					"function" == typeof window.on_cc_live_interaction_local_media && window.on_cc_live_interaction_local_media(i, n),
					e && "function" == typeof e && e()
				},
				function(t) {
					A("Interaction", "getUserMedia error: " + t),
					e && "function" == typeof e && e(t)
				})
			},
			this.iceServers = {
				iceServers: [{
					url: "stun:turn.csslcloud.net:3478",
					credential: "bokecc",
					username: "cc"
				},
				{
					url: "turn:turn.csslcloud.net:3478",
					credential: "bokecc",
					username: "cc"
				}],
				offerExtmapAllowMixed: !1
			},
			this.createAnswerPeerConnection = function(e) {
				var t = new PeerConnection(this.iceServers);
				"audio" == e.type ? (y.interaction.local.audio.stream || this.createLocalAudioMedia(), t.addStream(y.interaction.local.audio.stream)) : (y.interaction.local.video.stream || this.createLocalAudioAndVideoMedia(), t.addStream(y.interaction.local.video.stream)),
				t.onaddstream = function(t) {
					"function" == typeof window.on_cc_live_interaction_remote_media_self && window.on_cc_live_interaction_remote_media_self(y.interaction.local.type, e, t.stream)
				},
				t.createAnswer(function(i) {
					t.setLocalDescription(i),
					s.sendInteractionMessage(y.interaction.local.type, e.id, "answer", i)
				},
				function(e) {
					A("Interaction", "Failure callback: " + e)
				}),
				t.onicecandidate = function(t) {
					null !== t.candidate && s.sendInteractionMessage(y.interaction.local.type, e.id, "", t.candidate)
				},
				y.interaction.usersPcs[e.id] = {
					pc: t,
					user: e
				},
				y.interaction.usersPcs.length += 1
			},
			this.createOfferPeerConnection = function(e) {
				var t = new PeerConnection(this.iceServers),
				i = y.interaction.local.type;
				i.video ? t.addStream(y.interaction.local.video.stream) : t.addStream(y.interaction.local.audio.stream),
				t.onaddstream = function(t) {
					"function" == typeof window.on_cc_live_interaction_remote_media_self && window.on_cc_live_interaction_remote_media_self(y.interaction.local.type, e, t.stream)
				},
				t.oniceconnectionstatechange = function(e) {
					A("Interaction", "iceConnectionState ..." + t.iceConnectionState),
					"failed" == t.iceConnectionState && (A("Interaction", "iceConnectionState failed"), y.interaction.hangupInteraction(), "function" == typeof window.on_cc_live_interaction_disconnect_self && window.on_cc_live_interaction_disconnect_self({
						disconnectid: s.viewerid
					}))
				},
				t.createOffer(function(n) {
					t.setLocalDescription(n),
					s.sendInteractionMessage(i, e.id, "offer", n)
				},
				function(e) {
					"function" == typeof window.on_cc_live_interaction_error && window.on_cc_live_interaction_error(y.interaction.local.type, e, "createOfferPeerConnection")
				}),
				t.onicecandidate = function(t) {
					null !== t.candidate && s.sendInteractionMessage(i, e.id, "", t.candidate)
				},
				y.interaction.usersPcs[e.id] = {
					pc: t,
					user: e
				},
				y.interaction.usersPcs.length += 1
			},
			this.id = e.interaction.id,
			this.isSupportInteraction = function() {
				return window.isSpeakThirdParty ? !!AgoraRTC.checkSystemRequirements() || (AgoraRTC.Logger.error("Your browser does not support WebRTC!"), !1) : "https:" === window.location.protocol && !!(PeerConnection && URL && getUserMedia && nativeRTCIceCandidate && nativeRTCSessionDescription)
			},
			this.hangupInteraction = function(e) {
				this.isInteractioning ? d.hangupInteraction(this.type, e) : this.isRequesting ? (d.cancelRequestInteraction(this.type, e), this.stopLocalStream(), this.cancelInteraction()) : (this.stopLocalStream(), this.cancelInteraction())
			}
		},
		f = {
			id: "livePlayer",
			swfUrl: "//zeus.csslcloud.net/flash/Player.swf",
			isReady: !1,
			isPublishing: 0,
			delay: "",
			foreignPublish: "",
			init: function() {
				var e = {
					userid: s.userid,
					roomid: s.roomid,
					foreignPublish: this.foreignPublish,
					warmvideoid: this.warmVideoId,
					openhostmode: this.openHostMode,
					dvr: this.dvr,
					barrage: this.barrageData,
					backgroundImageUri: this.backgroundImageUri,
					backgroundHint: this.backgroundHint,
					countDownTime: s.liveCountdown,
					openMultiQuality: s.multiQuality,
					language: s.language || "",
					type: "liveplayer",
					upid: s.upid,
					viewerid: this.viewerid,
					ua: 1
				},
				o = this.delay;
				o > 0 && (e.buffer = o);
				var a = {
					allowFullscreen: "true",
					allowScriptAccess: "always",
					wmode: "transparent"
				};
				if (s.isPCH5Live) {
					s.roomid,
					s.userid;
					if (t()) swfobject.embedSWF(this.swfUrl, this.id, "100%", "100%", "10.0.0", "/flash/expressInstall.swf", e, a),
					s.on_hd_live_player_type && s.on_hd_live_player_type("flash");
					else {
						var r = document.getElementById("livePlayer");
						$(".flashtip").remove();
						var c = document.createElement("script");
						c.src = "js/hdLivePlayer.js?v=" + i(),
						document.body.appendChild(c),
						c.onload = function() {
							if (hdPcLivePlayer.isSuppoted()) {
								var t = {
									roomid: e.roomid,
									userid: e.userid,
									element: r,
									backgroundHint: e.backgroundHint,
									countDownTime: e.countDownTime,
									bacgroundImageUri: e.backgroundImageUri,
									warmVideoId: e.warmvideoid,
									upid: e.upid,
									viewerid: e.viewerid,
									isLowDelay: n(),
									barrage: 1 == parseInt(e.barrage, 10),
									isBan: s.isBan,
									sessionid: s.sessionId
								};
								hdPcLivePlayer.config(t),
								window.UNKNOWSTATUSASKLX = !0,
								window._swfOk(),
								s.on_hd_live_player_type && s.on_hd_live_player_type("h5")
							} else swfobject.embedSWF(this.swfUrl, this.id, "100%", "100%", "10.0.0", "/flash/expressInstall.swf", e, a),
							s.on_hd_live_player_type && s.on_hd_live_player_type("flash")
						}
					}
					window.hd_h5Live_create_error = function() {
						hdH5LiveVideo = null,
						swfobject.embedSWF(this.swfUrl, this.id, "100%", "100%", "10.0.0", "/flash/expressInstall.swf", e, a),
						s.on_hd_live_player_type && s.on_hd_live_player_type("flash")
					}.bind(this),
					window.UNKNOWSTATUSASKLX = !1,
					s.isBan && "function" == typeof window.on_cc_live_room_ban && window.on_cc_live_room_ban(this.banReason)
				} else swfobject.embedSWF(this.swfUrl, this.id, "100%", "100%", "10.0.0", "/flash/expressInstall.swf", e, a),
				s.on_hd_live_player_type && s.on_hd_live_player_type("flash")
			},
			getH5player: function() {
				return hdPcLivePlayer.player()
			},
			getFlash: function() {
				if (this.isReady && swfobject && swfobject.getObjectById) return swfobject.getObjectById(this.id)
			},
			getPlayerTime: function() {
				var e = parseInt("function" == typeof this.getFlash()._time ? this.getFlash()._time() : 0);
				return isNaN(e) || e < 0 ? 0 : e
			},
			isH5Video: function() {
				return ! this.getFlash() && "undefined" != typeof hdPcLivePlayer || ("undefined" == typeof hdPcLivePlayer && this.getFlash(), !1)
			},
			start: function() {
				if ("isMobile" == D.isMobile()) {
					if (s.isBan) return $("#livePlayer").css({
						"text-align": "center",
						color: "white",
						"font-size": "18px",
						"line-height": "232px"
					}),
					void $("#livePlayer").html("<p>直播已封禁，请联系管理员</p>");
					D.init()
				} else {
					if (this.isH5Video()) {
						if (s.isBan) return;
						return this.isPublishing = 1,
						void this.getH5player().startLive()
					}
					if (!this.getFlash()) return;
					this.isPublishing = 1,
					this.getFlash()._streamStart()
				}
			},
			changeQuality: function(e, t) {
				this.isH5Video() && this.getH5player().changeStream(e, t)
			},
			getQualityIndex: function() {
				if (this.isH5Video()) return this.getH5player().streamIndex
			},
			end: function() {
				if ("isMobile" == D.isMobile()) D.end();
				else {
					if (this.isH5Video()) {
						if (s.isBan) return;
						return this.isPublishing = 0,
						void this.getH5player().endLive()
					}
					if (!this.getFlash()) return;
					this.isPublishing = 0,
					this.getFlash()._streamEnd && this.getFlash()._streamEnd()
				}
			},
			barrage: function(e) {
				e && (this.isH5Video() ? this.getH5player().sendBarrage({
					type: "text",
					content: e.txt,
					css: {
						font: "微软雅黑",
						size: "14",
						color: e.color
					}
				}) : this.getFlash() && this.getFlash()._jsTOASbarrage && this.getFlash()._jsTOASbarrage(e))
			},
			destroy: function() {
				this.end(),
				$(this.id).remove()
			},
			getCurrentLine: function() {
				if (this.isH5Video) return this.getH5player().hostIndex
			},
			getLine: function() {
				if (this.isH5Video()) {
					for (var e = [], t = this.getH5player().lines.length, i = this.getH5player().hostIndex, n = 0; n < t; n++) {
						var o = {
							selected: i == n,
							name: "线路_" + (n + 1)
						};
						e.push(o)
					}
					return e
				}
				var a = this.getFlash().getLine ? this.getFlash().getLine() : 0;
				return a && (a = JSON.parse(a)),
				a
			},
			changeLine: function(e) {
				if (this.isH5Video()) return this.getH5player().changeLines(e);
				this.getFlash().changeLine && this.getFlash().changeLine(e)
			},
			changeVideoScale: function(e) {
				this.getFlash()._showScreenScale && this.getFlash()._showScreenScale(e)
			},
			onlyAudio: function() {
				this.isH5Video() || this.getFlash()._onlyAudio && this.getFlash()._onlyAudio()
			},
			setSound: function(e) {
				if (this.isH5Video()) {
					if (this.getH5player().setVolume) return this.getH5player().setVolume(e);
					if (this.getH5player().setSound) return this.getH5player().setSound(e)
				}
				this.getFlash()._SetSound && this.getFlash()._SetSound(e)
			},
			openSound: function() {
				this.isH5Video() ? this.getH5player().setMuted(!1) : this.getFlash() && this.getFlash && this.getFlash()._onSound()
			},
			closeSound: function() {
				this.isH5Video() ? this.getH5player().setMuted(!0) : this.getFlash() && this.getFlash && this.getFlash()._unSound()
			},
			openBarrage: function(e) {
				if (this.isH5Video()) return this.getH5player().openBarrage(e);
				this.getFlash() && this.getFlash()._barrage && this.getFlash()._barrage(e)
			},
			showControl: function(e) {
				if (this.isH5Video()) return this.getH5player().showControl(e);
				this.getFlash() && this.getFlash()._ShowControl && this.getFlash()._ShowControl(e)
			},
			switchFullScreen: function(e) {
				if (this.isH5Video()) return this.getH5player().switchFullScreen(e);
				this.getFlash()
			},
			banLive: function() {
				s.isBan = !0,
				this.isH5Video() ? this.getH5player().banLive() : this.getFlash() && this.getFlash()._banLive && this.getFlash()._banLive()
			},
			unbanLive: function() {
				s.isBan = !1,
				this.isH5Video() ? this.getH5player().unBanLive() : this.getFlash() && this.getFlash()._unbanLive && this.getFlash()._unbanLive()
			},
			showMarquee: function(e) {
				if (e) return this.isH5Video() ? this.getH5player().openMarquee(JSON.parse(e)) : void(this.getFlash() && this.getFlash()._showMarqueePlugin && this.getFlash()._showMarqueePlugin(e))
			},
			closeMarquee: function() {
				if (this.isH5Video()) return this.getH5player().closeMarquee();
				this.getFlash() && this.getFlash()._closeMarqueePlugin && this.getFlash()._closeMarqueePlugin({
					name: "PluginForMarquee"
				})
			}
		};
		window._onStart = function() {},
		window.cc_callback_onHDReceivedVideoQuality = function(e) {
			s.onHDReceivedVideoQuality && s.onHDReceivedVideoQuality(e)
		};
		var h = {
			id: "drawPanel",
			isReady: !1,
			isProcessing: !1,
			getWidth: function() {
				return "100%"
			},
			getHeight: function() {
				return "100%"
			},
			swfUrl: "//zeus.csslcloud.net/flash/Player.swf",
			init: function() {
				D.isIPad() || D.isIPhone() || D.isAndroid() || D.isWindowsPhone() || r.fastMode || swfobject.embedSWF(this.swfUrl, this.id, this.getWidth(), this.getHeight(), "10.0.0", "/flash/expressInstall.swf", {
					type: "drawpanel"
				},
				{
					allowFullscreen: "true",
					allowScriptAccess: "always",
					wmode: "transparent"
				},
				{})
			},
			getSwf: function() {
				if (this.isReady) return swfobject.getObjectById(this.id)
			},
			clear: function() {
				var e = this.getSwf();
				e && (e._streamEnd(), d.pagechangedata = [], d.drawjson = [])
			},
			draw: function(e) {
				var t = this.getSwf();
				t && t.draw(e)
			},
			draws: function(e) {
				var t, i = this.getSwf();
				i && (t = e, setTimeout(function() {
					i.drawList(t)
				}))
			},
			filp: function(e) {
				var t = this.getSwf();
				if (t) {
					var i = s.documentDisplayMode;
					this.displayMode = 1 == i ? "auto": 2 == i ? "width": "auto",
					void 0 !== y.adapt && (this.displayMode = y.adapt ? "auto": "width");
					var n = JSON.parse(e),
					o = n.url;
					"https:" === window.location.protocol && (n.url = o.replace(/http:/g, "https:")),
					t.filp(JSON.stringify(n), this.displayMode)
				}
			},
			animationFilp: function(e) {
				var t = this.getSwf();
				t && t.animation(e)
			},
			barrage: function(e) {
				e && this.getSwf() && this.getSwf()._jsTOASbarrage && this.getSwf()._jsTOASbarrage(e)
			},
			showMarquee: function(e) {
				e && this.getSwf() && this.getSwf().showMarqueeLight(e)
			}
		},
		p = [],
		g = [],
		v = [],
		m = !1,
		w = function() {
			$.ajax({
				url: "//view.csslcloud.net/api/view/info?userid=" + s.userid + "&roomid=" + s.roomid,
				type: "GET",
				dataType: "jsonp",
				success: function(e) {
					if (e.success && e.datas) {
						var t = e.datas.meta;
						if (t && (f.isPublishing = t.isPublishing, 1 == t.isPublishing)) {
							for (var i = t.answer ? t.answer: [], n = t.question ? t.question: [], o = t.broadcast ? t.broadcast: [], a = 0; a < i.length; a++) for (var c = i[a], u = 0; u < n.length; u++) { (d = n[u]).encryptId == c.encryptId && (c.questionUserId = d.questionUserId)
							}
							if (n && n.length) for (a = 0; a < n.length; a++) {
								var d = n[a];
								"function" == typeof s.onQuestion && s.onQuestion(JSON.stringify({
									action: "question",
									value: {
										id: d.encryptId,
										content: d.content,
										userId: d.questionUserId,
										groupId: d.groupId,
										userName: d.questionUserName,
										isPublish: d.isPublish,
										triggerTime: d.triggerTime,
										userAvatar: d.questionUserAvatar
									}
								}))
							}
							if (i && i.length) for (a = 0; a < i.length; a++) {
								c = i[a];
								"function" == typeof s.onAnswer && s.onAnswer(JSON.stringify({
									action: "answer",
									value: {
										questionId: c.encryptId,
										isPrivate: c.isPrivate,
										content: c.content,
										userId: c.answerUserId,
										groupId: c.groupId,
										userName: c.answerUserName,
										questionUserId: c.questionUserId,
										triggerTime: c.triggerTime,
										userAvatar: c.userAvatar
									}
								}))
							}
							if (o && o.length) for (a = 0; a < o.length; a++) {
								var l = o[a];
								"function" == typeof s.onBroadcastMsg && s.onBroadcastMsg({
									content: l.content,
									time: l.time,
									id: l.id
								})
							}
							"isMobile" == D.isMobile() && $.DrawingBoard && $.DrawingBoard.history(t),
							r.history(t);
							var h = t.chatLog;
							if (h && h.length) {
								var w = [];
								for (a = 0; a < h.length; a++) {
									var y = h[a];
									w.push({
										userid: y.userId,
										username: y.userName,
										userrole: y.userRole,
										useravatar: y.userAvatar,
										groupId: y.groupId,
										msg: y.content,
										time: y.time,
										chatId: y.chatId,
										status: y.status,
										usercustommark: y.userCustomMark
									})
								}
								if ("function" == typeof s.onPublicChatMessage) for (var _ = 0; _ < w.length; _++) s.onPublicChatMessage(JSON.stringify(w[_]))
							}
							if (!r.fastMode) {
								var S = t.pageChange;
								if (S && S.length) {
									S.sort(function(e, t) {
										return parseInt(e.time) - parseInt(t.time)
									});
									var I = S.pop();
									g.push(JSON.stringify({
										fileName: I.docName,
										totalPage: I.docTotalPage,
										docid: I.encryptDocId,
										url: I.url,
										page: I.pageNum,
										time: I.time,
										useSDK: I.useSDK
									}))
								}
								var b = t.animation;
								if (b && b.length) {
									b.sort(function(e, t) {
										return parseInt(e.time) - parseInt(t.time)
									});
									var T = b.pop();
									v.push(JSON.stringify({
										fileName: T.docName,
										totalPage: T.docTotalPage,
										docid: T.encryptDocId,
										url: T.url,
										page: T.pageNum,
										time: T.time,
										step: T.step
									}))
								}
								var k = t.draw;
								if (k && k.length) for (a = 0; a < k.length; a++) p.push(k[a].data)
							}
							m = !0
						}
					}
				}
			})
		},
		y = new
		function(e) {
			this.interaction = new l(e)
		} ({
			interaction: {
				id: "interactionPlayer",
				width: "100%",
				height: "100%"
			}
		});
		window.live = y,
		window.on_drampanel_ready = function() {
			h.isReady = !0,
			setTimeout(function() { !
				function e() {
					if (m) {
						if (!r.fastMode && (p.length && (h.draws(p), p = []), g.length)) {
							var t = g.pop();
							if (!t) return;
							if (h.filp(t), v.length) {
								var i = v.pop(),
								n = F(i),
								o = F(t);
								o.docid == n.docid && o.time <= n.time && h.animationFilp(i)
							}
							g = []
						}
					} else setTimeout(function() {
						e()
					},
					3e3)
				} ()
			},
			1500)
		},
		window.on_cc_live_dw_draw = function(e) {
			setTimeout(function() {
				r.draw(e)
			},
			x()),
			setTimeout(function() {
				var t = F(e);
				h.draw(JSON.stringify(t.value.data))
			},
			x()),
			"isMobile" == D.isMobile() && setTimeout(function() {
				$.DrawingBoard && $.DrawingBoard.db(e)
			},
			x())
		},
		window.on_cc_live_dw_page_change = function(e) {
			setTimeout(function() {
				r.pageChange(e)
			},
			x()),
			setTimeout(function() {
				var t = F(e);
				h.filp(JSON.stringify(t.value))
			},
			x()),
			"isMobile" == D.isMobile() && setTimeout(function() {
				$.DrawingBoard && $.DrawingBoard.db(e)
			},
			x())
		},
		window.on_cc_live_dw_animation_change = function(e) {
			setTimeout(function() {
				r.animationChange(e)
			},
			x()),
			setTimeout(function() {
				var t = F(e);
				h.animationFilp(JSON.stringify(t.value))
			},
			x()),
			"isMobile" == D.isMobile() && setTimeout(function() {
				$.DrawingBoard && $.DrawingBoard.db(e)
			},
			x())
		},
		window.messageFromDp = function(e) {
			"dpImageLoadError" === e.action && o.pageChangeFailed(e.page)
		},
		window.addEventListener ? window.addEventListener("message",
		function(e) {
			messageFromDp(F(e.data))
		}) : window.attachEvent("onmessage",
		function(e) {
			messageFromDp(F(e.data))
		});
		var _ = {
			init: function() {
				d.socket.on("chat_message",
				function(e) {
					"function" == typeof s.onPublicChatMessage && s.onPublicChatMessage(e)
				}),
				d.socket.on("chat_log_manage",
				function(e) {
					"function" == typeof s.onPublicChatLogManage && s.onPublicChatLogManage(e)
				}),
				d.socket.on("notification",
				function(e) {
					"function" == typeof s.onNotification && s.onNotification(e)
				}),
				d.socket.on("information",
				function(e) {
					"function" == typeof s.onInformation && s.onInformation(e)
				}),
				d.socket.on("private_chat_self",
				function(e) {
					"function" == typeof s.onPrivateChatMessage && s.onPrivateChatMessage(e)
				}),
				d.socket.on("private_chat",
				function(e) {
					"function" == typeof s.onPrivateAnswer && s.onPrivateAnswer(e)
				}),
				d.socket.on("room_context",
				function(e) {}),
				d.socket.on("custom_message",
				function(e) {
					"function" == typeof s.onCustomChatMessage && s.onCustomChatMessage(e)
				})
			}
		},
		S = {
			init: function() {
				d.socket.on("question",
				function(e) {
					"function" == typeof s.onQuestion && s.onQuestion(e),
					"function" == typeof s.onQuestionSend && s.onQuestionSend(e)
				}),
				d.socket.on("answer",
				function(e) {
					"function" == typeof s.onAnswer && s.onAnswer(e),
					"function" == typeof s.onAnswerSend && s.onAnswerSend(e)
				})
			}
		},
		I = function(e, t, i) {
			var n = "//view.csslcloud.net" + e;
			$.ajax({
				url: n,
				type: "GET",
				dataType: "json",
				data: t,
				headers: {
					"X-HD-Token": s.sessionId
				},
				success: function(e) {
					i && i(e)
				},
				error: function(t) {
					console.log("error", e, t)
				}
			})
		},
		b = function(e, t, i) {
			var n = "//view.csslcloud.net" + e;
			$.ajax({
				url: n,
				headers: {
					"X-HD-Token": s.sessionId,
					"Content-Type": "application/json"
				},
				data: JSON.stringify(t),
				type: "POST",
				dataType: "json",
				success: function(e) {
					i && i(e)
				},
				error: function(e) {
					console.log(e)
				}
			})
		},
		T = {
			code: 404,
			msg: "清晰度不存在～"
		},
		k = {
			code: 404,
			msg: "线路不存在～"
		},
		P = {
			code: 500,
			msg: "切换失败，请重试～"
		},
		M = {
			code: 200,
			msg: "切换成功～"
		},
		L = {
			code: 200,
			msg: "切换成功～"
		},
		C = "canplay",
		R = "waiting",
		D = {
			src: "",
			audio: !1,
			line: 0,
			controls: !0,
			baseURL: "//view.csslcloud.net",
			isRtsStream: !1,
			init: function() {
				var e = this;
				if (s.isBan) return $("#livePlayer").css({
					"text-align": "center",
					color: "white",
					"font-size": "18px",
					"line-height": "232px"
				}),
				void $("#livePlayer").html("<p>直播已封禁，请联系管理员</p>");
				I("/api/live/record", {
					accountId: s.userid,
					roomId: s.roomid,
					sessionId: s.sessionId
				},
				function(t) {
					var i;
					t.success && 1 === t.data.live.status ? (u.init(), i = e.controls ? '<video id="player_live" style="display: none" webkit-playsinline x5-video-player-type="h5-page" playsinline controls autoplay x-webkit-airplay="allow" x5-playsinline width="100%" height="100%" ></video>': '<video id="player_live" style="display: none" webkit-playsinline x5-video-player-type="h5-page" playsinline autoplay x-webkit-airplay="allow" x5-playsinline width="100%" height="100%"></video>', $("#" + f.id).html(i), e.video = document.getElementById("player_live"), s.rtsFlag ? e.getRTSHosts() : e.getH5PlayerHosts()) : ($("#livePlayer").css({
						"text-align": "center",
						color: "white",
						"font-size": "18px",
						"line-height": "232px"
					}), $("#livePlayer").html("<p>Waiting...</p>"))
				})
			},
			getH5PlayerHosts: function() {
				var e = this;
				I("/api/live/play", {
					accountId: s.userid,
					roomId: s.roomid,
					sessionId: s.sessionId,
					types: "hls",
					platform: 1,
					terminal: 1
				},
				function(t) {
					if (t.success && t.data.stream.length > 0) {
						e.videoStreams = t.data.stream[0].videos,
						e.audioStreams = t.data.stream[0].audios,
						e.currentQualityStream = e.videoStreams[0],
						e.currentQualityCode = e.videoStreams[0].quality,
						e.currentLines = e.currentQualityStream.videoStream,
						e.currentLineIndex = 0,
						e.currentLine = e.currentLines[0],
						e.initPlayer();
						var i = JSON.parse(JSON.stringify(e.videoStreams)).map(function(e) {
							return delete e.videoStream,
							e
						});
						s.onHDReceivedVideoQuality && s.onHDReceivedVideoQuality(i)
					}
				})
			},
			getRTSHosts: function() {
				var e = this;
				I("/api/live/play", {
					accountId: s.userid,
					roomId: s.roomid,
					sessionId: s.sessionId,
					types: "rts",
					platform: 1,
					terminal: 1
				},
				function(t) {
					if (t.success && t.data.stream.length > 0) {
						e.rtsStreams = t.data.stream[0],
						e.rtsVideoLine = e.rtsStreams.videos[0].videoStream[0],
						e.currentLines = e.rtsStreams.videos[0].videoStream,
						e.rtsAudioLine = e.rtsStreams.audios[0],
						e.currentLineIndex = 0,
						e.currentQualityCode = e.rtsStreams.videos[0].quality,
						e.initRtsPlayer();
						var i = JSON.parse(JSON.stringify(e.rtsStreams.videos)).map(function(e) {
							return delete e.videoStream,
							e
						});
						s.onHDReceivedVideoQuality && s.onHDReceivedVideoQuality(i)
					}
				})
			},
			initRtsPlayer: function() {
				var e = this;
				e.aliRts = new AliRTS,
				e.bindRTSEvent(),
				e.aliRts.isSupport({
					isReceiveVideo: !0
				}).then(function() {
					s.onLiveStarting && s.onLiveStarting(),
					e.isRtsStream = !0;
					$("#livePlayer").append('<div class="video-big-playBtn" style="display:flex; justify-content: center; align-items: center; width: 100%; height:100%;"><div id="rtsPlayBtn" style="width: 60px; height: 60px; background: url(//view.csslcloud.net/images/big-play-btn.png) no-repeat; background-size: 60px"></div></div>'),
					$("#rtsPlayBtn").on("click",
					function() {
						$("#rtsPlayBtn").hide(),
						e.play()
					})
				}).
				catch(function() {
					e.getH5PlayerHosts()
				})
			},
			bindRTSEvent: function() {
				this.aliRts.on("onError",
				function(e) {
					10201 === e.errorCode && window.rtsPlayOnError && window.rtsPlayOnError()
				}),
				this.aliRts.on("onPlayEvent",
				function(e) {
					e.event === C || e.event === R || e.event
				})
			},
			getLine: function() {
				return this.currentLines
			},
			getCurrentLine: function() {
				return this.currentLineIndex
			},
			initPlayer: function() {
				$("#player_live").show(),
				this.video.src = this.currentLine,
				o.setUrl(this.currentLine),
				o.bindVideoEvent(this.video),
				s.onLiveStarting && s.onLiveStarting(),
				s.on_hd_live_player_type && s.on_hd_live_player_type("h5"),
				s.onPlayerLoad && s.onPlayerLoad(this.video),
				s.onKickOutMobile = function() {
					$("#" + f.id).html("")
				},
				this.report || (this.report = new ReportLog(u, 1, 11, this.video, !0))
			},
			showControl: function(e) {
				this.controls = e,
				this.video.controls = e
			},
			switchFullScreen: function(e) {
				var t = $("#player_live")[0];
				e ? t.requestFullscreen ? t.requestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.msRequestFullscreen ? t.msRequestFullscreen() : t.webkitSupportsFullscreen && t.webkitEnterFullscreen() : t.exitFullscreen ? t.exitFullscreen() : t.msExitFullscreen ? t.msExitFullscreen() : t.mozExitFullScreen ? t.mozExitFullScreen() : t.webkitExitFullscreen ? t.webkitExitFullscreen() : document.mozCancelFullScreen && document.mozCancelFullScreen()
			},
			ban: function() {
				$("#livePlayer").css({
					"text-align": "center",
					color: "white",
					"font-size": "18px",
					"line-height": "232px"
				}),
				o.endLive(),
				$("#livePlayer").html("<p>直播已封禁，请联系管理员</p>")
			},
			unban: function() {
				$("#livePlayer").css({
					"text-align": "",
					color: "",
					"font-size": "",
					"line-height": ""
				}),
				this.init()
			},
			end: function() {
				this.isRtsStream && this.aliRts.stopLiveStream(),
				$("#livePlayer").css({
					"text-align": "center",
					color: "white",
					"font-size": "18px",
					"line-height": "232px"
				}),
				o.endLive(),
				$("#livePlayer").html("Live has ended")
			},
			appendDoc: function(e) {
				"https:" === window.location.protocol && (e = e.replace(/http:/g, "https:"));
				var t = '<img src="' + e + '" />';
				$("#" + h.id).html(t)
			},
			changeQuality: function(e, t) {
				if (!this.isRtsStream && !D.audio) if (this.videoStreams.find(function(t) {
					return t.quality === e
				})) {
					this.currentQualityCode = e,
					this.currentQualityStream = this.videoStreams.find(function(e) {
						return e.quality === this.currentQualityCode
					}),
					this.currentLines = this.currentQualityStream.videoStream,
					this.currentLines[this.currentLineIndex] || (this.currentLineIndex = 0);
					try {
						this.currentLine = this.currentLines[this.currentLineIndex],
						o.setUrl(this.currentLine),
						$("#" + f.id).find("video").attr("src", this.currentLine),
						t && t(M)
					} catch(e) {
						t && t(P)
					}
				} else t && t(T)
			},
			getQualityIndex: function() {
				if (!this.isRtsStream) return this.currentQualityCode
			},
			changeLine: function(e, t) {
				if (!this.isRtsStream) {
					if (D.audio) {
						if (!this.audioStreams[e]) return t && t(k);
						audio.src = "",
						audio.src = this.audioStreams[e],
						audio.play()
					} else {
						if (!this.currentLines[e]) return t && t(k);
						this.currentLine = this.currentLines[e],
						o.setUrl(this.currentLine),
						$("#" + f.id).find("video").attr("src", this.currentLine)
					}
					t && t(L),
					this.currentLineIndex = e
				}
			},
			play: function() {
				var e = this;
				s.rtsFlag && this.isRtsStream ? ($("#player_live").show(), e.aliRts.muteLiveStream(!1), e.aliRts.isSupport({
					isReceiveVideo: !0
				}).then(function() {
					e.aliRts.startLiveStream(e.rtsVideoLine, e.video).then(function() {}).
					catch(function() {
						alert("播放失败，请刷新页面重试")
					})
				}).
				catch(function() {
					this.isRtsStream = !1,
					e.getH5PlayerHosts()
				})) : this.video.play()
			},
			onlyAudio: function() {
				var e = this,
				t = $("#" + f.id).find("video");
				e.video = document.getElementById("player_live"),
				t.show(),
				D.audio = !D.audio,
				this.isRtsStream ? D.audio ? (e.aliRts.stopLiveStream(), e.aliRts.isSupport({
					isReceiveVideo: !1
				}).then(function() {
					e.aliRts.startLiveStream(e.rtsAudioLine + "@subvideo=no", e.video).then().
					catch(function() {
						alert("播放失败，请刷新页面重试")
					})
				}).
				catch(function() {
					e.aliRts.stopLiveStream(),
					alert("浏览器不支持RTS音频播放")
				})) : (e.aliRts.stopLiveStream(), e.aliRts.isSupport({
					isReceiveVideo: !0
				}).then(function() {
					e.aliRts.startLiveStream(e.rtsVideoLine, e.video).then().
					catch(function() {
						alert("播放失败，请刷新页面重试")
					})
				}).
				catch(function() {
					alert("播放失败，请刷新页面重试")
				})) : D.audio ? (audio = new Audio, audio.src = this.audioStreams[this.currentLineIndex], audio.play()) : (audio.src = "", t.attr("src", this.currentLines[this.currentLineIndex]), t.play())
			},
			setMuted: function(e) {
				this.isRtsStream ? this.aliRts.muteLiveStream(e) : this.video.muted = e
			},
			isMobile: function() {
				if (this.isIPad() || this.isIPhone() || this.isAndroid() || this.isWindowsPhone()) return "isMobile"
			},
			isIPad: function() {
				return null != navigator.userAgent.match(/iPad/i)
			},
			isIPhone: function() {
				return null != navigator.userAgent.match(/iPhone/i)
			},
			isAndroid: function() {
				return null != navigator.userAgent.match(/Android/i)
			},
			isWindowsPhone: function() {
				return null != navigator.userAgent.match(/Windows Phone/i)
			}
		};
		window.on_cc_live_accept_interaction = function(e) {
			f && f.closeSound(),
			y.interaction.clearRequestTimeoutTimer(),
			window.isSpeakThirdParty && y.interaction.initAgoraRTC(e),
			s.enterInteractionRoom(),
			y.interaction.isInteractioning = !0,
			y.interaction.setCallingTimer(),
			"function" == typeof window.on_cc_live_interaction_accept && window.on_cc_live_interaction_accept(y.interaction.local.type, F(e))
		},
		window.on_cc_live_interaction_disconnect_self = function(e) {
			if (window.isSpeakThirdParty) {
				y.interaction.leaveAgoraRTC();
				var t = y.interaction.local.type;
				"function" == typeof window.on_cc_live_interaction_disconnect && window.on_cc_live_interaction_disconnect(e, t)
			}
			var i = e.disconnectid,
			n = !!y.interaction.usersPcs[i];
			if (i == s.viewerid || n) {
				if (i != s.viewerid && n && s.hangupInteraction(), y.interaction.clearCallingTimer(), y.interaction.disconnectInteraction(i), i == s.viewerid || 0 == y.interaction.usersPcs.length) {
					y.interaction.stopLocalStream();
					t = y.interaction.local.type;
					$("#videoInteractions").empty(),
					$("#audioInteractions").empty(),
					$("#interactionLocalVideo")[0] && ($("#interactionLocalVideo")[0].src = ""),
					t.video && ($("#livePlayer").show(), f.openSound()),
					window.isSpeakThirdParty || "function" != typeof window.on_cc_live_interaction_disconnect || window.on_cc_live_interaction_disconnect(e, t)
				}
				window.isRequesting = !1
			}
		},
		window.on_cc_live_interaction_remote_media_self = function(e, t, i) {
			if ("function" == typeof window.on_cc_live_interaction_remote_media && window.on_cc_live_interaction_remote_media(e, t, i), window.isRequesting = !1, e.video) {
				$("#livePlayer").hide();
				var n = "interactionRemoteVideo" + t.id;
				$("#" + n).length < 1 && ($("#videoInteractions").append('<video cc-data="0" id="' + n + '" style="height: 100%; width: 100%;" autoplay></video>'), $("#" + n)[0].srcObject = i)
			} else {
				n = "interactionRemoteAudio" + t.id;
				$("#" + n).length < 1 && ($("#audioInteractions").append('<audio cc-data="2" id="' + n + '" autoplay controls></audio>'), $("#" + n)[0].srcObject = i)
			}
		},
		window.on_cc_live_interaction_chatusers = function(e) {
			e = F(e),
			$.each(e,
			function(e, t) {
				return t.id == s.viewerid || ("publisher" == t.role && !t.isMainSpeaker || void y.interaction.createOfferPeerConnection(t))
			})
		},
		window.on_cc_live_interaction_message = function(e) {
			e = F(e);
			A("Interaction", "rtc互动信息:" + JSON.stringify(e));
			var t = e.toid,
			i = e.fromid,
			n = e.fromname,
			o = e.type,
			a = e.data;
			"string" == typeof a && (a = JSON.parse(a));
			var r = e.event;
			if ("offer" === r) {
				if (a.type = r, y.interaction.createAnswerPeerConnection({
					id: i,
					name: n,
					type: o
				}), !(s = y.interaction.usersPcs[i].pc)) return;
				s.setRemoteDescription(new nativeRTCSessionDescription(a)),
				s.createAnswer(function() {},
				function(e) {
					A("Interaction", "Failure callback: " + e)
				})
			} else if ("answer" === r) {
				if (! (s = y.interaction.usersPcs[i].pc)) return;
				a.type = r,
				A("Interaction", "answer spark_message信息:" + a),
				s.setRemoteDescription(new nativeRTCSessionDescription(a)),
				s.receivedAnswer = !0,
				!s.hasAddIce && s.RTCICE && s.addIceCandidate(s.RTCICE)
			} else {
				var s, c = y.interaction.usersPcs[i];
				if (c || (c = y.interaction.usersPcs[t]), !(s = c ? c.pc: null)) return;
				var u = new RTCIceCandidate(a);
				s.receivedAnswer ? (s.hasAddIce = !0, s.addIceCandidate(u)) : (s.hasAddIce = !1, s.RTCICE = u)
			}
		},
		window.isDebug = !1;
		var A = function(e, t) {
			window.isDebug && console && "function" == typeof console.log && console.log(e, t)
		};
		function F(e) {
			if ("string" == typeof e) try {
				return JSON.parse(e)
			} catch(e) {
				return {}
			}
			return e
		}
		function x() {
			var e = f.delay;
			return (isNaN(e) || e < 0) && (e = 0),
			e *= 1e3,
			"isMobile" == D.isMobile() ? 0 === e ? 5e3: 1e4: 0 === e ? 1300 : 3e3
		}
		function q() {
			var e = f.delay;
			return (isNaN(e) || e < 0) && (e = 0),
			"isMobile" == D.isMobile() ? 0 === e ? 5e3: 1e4: 0 === e ? 1300 : 3e3
		}
		s.isSupportInteraction = window.live.interaction.isSupportInteraction,
		window.onunload = function() {
			window.live.interaction.hangupInteraction()
		},
		window.onbeforeunload = function() {
			window.live.interaction.hangupInteraction()
		},
		window._swfInit = function() {
			"function" == typeof window.on_cc_live_player_ready && window.on_cc_live_player_ready()
		},
		window._swfOk = function(e) {
			"function" == typeof window.on_cc_swf_loading_completed && window.on_cc_swf_loading_completed(e),
			f.isReady = !0
		}
	} (window)
}]);