/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/// t: current time, b: begInnIng value, c: change In value, d: duration
function imgpreload(e, t) {
    t instanceof Function && (t = {
        all: t
    });
    typeof e == "string" && (e = [e]);
    var n = [],
        r = e.length,
        i = 0;
    for (i; i < r; i++) {
        var s = new Image;
        $(s).bind("load", null, function() {
            n.push(this);
            t.each instanceof Function && t.each.call(this);
            n.length >= r && t.all instanceof Function && t.all.call(n)
        });
        s.src = e[i]
    }
}

function NewWindows(e, t) {
    var t = t || location.host;
    $(document).on("click", e, function() {
        var e = new RegExp(t),
            n = $(this).attr("href");
        if (!e.test(n) && n[0] != "/") {
            window.open($(this).attr("href"));
            return !1
        }
    })
}

function validEmail(e) {
    var t = new RegExp(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/);
    return t.test(e)
}

function isNumber(e) {
    return !isNaN(parseFloat(e)) && isFinite(e)
}

function wrapFix(e) {
    e.removeClass("wrap-end wrap-start");
    e.each(function() {
        var e = $(this).find("a"),
            t = e.text();
        e.html(t.replace(/( )/ig, "&nbsp;"))
    });
    var t = [];
    e.each(function() {
        t.push($(this).offset().top)
    });
    $.each(t, function(n, r) {
        if (r < t[n + 1]) {
            e.eq(n).addClass("wrap-end");
            e.eq(n + 1).addClass("wrap-start")
        }
    });
    e.last().addClass("wrap-end")
}

function emails(e) {
    e.each(function() {
        var e = $(this).text().replace(/(\[ATSIGN\])/, "@"),
            t = $(this).attr("data-email");
        t && t != undefined && t != null && t != "" ? $(this).replaceWith('<a href="mailto:' + t.replace(
            /(\[ATSIGN\])/, "@") + '" class="email">' + $(this).text() + "</a>") : $(this).replaceWith(
            '<a href="mailto:' + e + '" class="email">' + e + "</a>")
    })
}

function hydrateEmails(e) {
    e.each(function() {
        var e = $(this).html(),
            t = e.replace(/([a-zA-Z0-9]{1,})(\(AT\))([a-zA-Z0-9\.]{1,})/gi, function(e, t, n, r) {
                return '<a href="mailto:' + t + "@" + r + '">' + t + "@" + r + "</a>"
            });
        $(this).html(t)
    })
}

function clearSelection() {
    if (document.selection && document.selection.empty) document.selection.empty();
    else if (window.getSelection) {
        var e = window.getSelection();
        e.removeAllRanges()
    }
}

function defaultText() {
    $(".defaultText").unbind("focus,blur").focus(function() {
        $(this).val() == $(this)[0].defaultValue && $(this).val("")
    }).blur(function() {
        $(this).val() == "" && $(this).val($(this)[0].defaultValue)
    })
}

function onYouTubePlayerAPIReady() {
    $(document).ready(function() {
        $(".video iframe").each(function(e) {
            var t = $(this).attr("id");
            players.push(new YT.Player(t, {}))
        })
    })
}
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(e, t, n, r, i) {
        return jQuery.easing[jQuery.easing.def](e, t, n, r, i)
    },
    easeInQuad: function(e, t, n, r, i) {
        return r * (t /= i) * t + n
    },
    easeOutQuad: function(e, t, n, r, i) {
        return -r * (t /= i) * (t - 2) + n
    },
    easeInOutQuad: function(e, t, n, r, i) {
        return (t /= i / 2) < 1 ? r / 2 * t * t + n : -r / 2 * (--t * (t - 2) - 1) + n
    },
    easeInCubic: function(e, t, n, r, i) {
        return r * (t /= i) * t * t + n
    },
    easeOutCubic: function(e, t, n, r, i) {
        return r * ((t = t / i - 1) * t * t + 1) + n
    },
    easeInOutCubic: function(e, t, n, r, i) {
        return (t /= i / 2) < 1 ? r / 2 * t * t * t + n : r / 2 * ((t -= 2) * t * t + 2) + n
    },
    easeInQuart: function(e, t, n, r, i) {
        return r * (t /= i) * t * t * t + n
    },
    easeOutQuart: function(e, t, n, r, i) {
        return -r * ((t = t / i - 1) * t * t * t - 1) + n
    },
    easeInOutQuart: function(e, t, n, r, i) {
        return (t /= i / 2) < 1 ? r / 2 * t * t * t * t + n : -r / 2 * ((t -= 2) * t * t * t - 2) + n
    },
    easeInQuint: function(e, t, n, r, i) {
        return r * (t /= i) * t * t * t * t + n
    },
    easeOutQuint: function(e, t, n, r, i) {
        return r * ((t = t / i - 1) * t * t * t * t + 1) + n
    },
    easeInOutQuint: function(e, t, n, r, i) {
        return (t /= i / 2) < 1 ? r / 2 * t * t * t * t * t + n : r / 2 * ((t -= 2) * t * t * t * t + 2) +
            n
    },
    easeInSine: function(e, t, n, r, i) {
        return -r * Math.cos(t / i * (Math.PI / 2)) + r + n
    },
    easeOutSine: function(e, t, n, r, i) {
        return r * Math.sin(t / i * (Math.PI / 2)) + n
    },
    easeInOutSine: function(e, t, n, r, i) {
        return -r / 2 * (Math.cos(Math.PI * t / i) - 1) + n
    },
    easeInExpo: function(e, t, n, r, i) {
        return t == 0 ? n : r * Math.pow(2, 10 * (t / i - 1)) + n
    },
    easeOutExpo: function(e, t, n, r, i) {
        return t == i ? n + r : r * (-Math.pow(2, -10 * t / i) + 1) + n
    },
    easeInOutExpo: function(e, t, n, r, i) {
        return t == 0 ? n : t == i ? n + r : (t /= i / 2) < 1 ? r / 2 * Math.pow(2, 10 * (t - 1)) + n : r /
            2 * (-Math.pow(2, -10 * --t) + 2) + n
    },
    easeInCirc: function(e, t, n, r, i) {
        return -r * (Math.sqrt(1 - (t /= i) * t) - 1) + n
    },
    easeOutCirc: function(e, t, n, r, i) {
        return r * Math.sqrt(1 - (t = t / i - 1) * t) + n
    },
    easeInOutCirc: function(e, t, n, r, i) {
        return (t /= i / 2) < 1 ? -r / 2 * (Math.sqrt(1 - t * t) - 1) + n : r / 2 * (Math.sqrt(1 - (t -= 2) *
            t) + 1) + n
    },
    easeInElastic: function(e, t, n, r, i) {
        var s = 1.70158,
            o = 0,
            u = r;
        if (t == 0) return n;
        if ((t /= i) == 1) return n + r;
        o || (o = i * .3);
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u);
        return -(u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o)) + n
    },
    easeOutElastic: function(e, t, n, r, i) {
        var s = 1.70158,
            o = 0,
            u = r;
        if (t == 0) return n;
        if ((t /= i) == 1) return n + r;
        o || (o = i * .3);
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u);
        return u * Math.pow(2, -10 * t) * Math.sin((t * i - s) * 2 * Math.PI / o) + r + n
    },
    easeInOutElastic: function(e, t, n, r, i) {
        var s = 1.70158,
            o = 0,
            u = r;
        if (t == 0) return n;
        if ((t /= i / 2) == 2) return n + r;
        o || (o = i * .3 * 1.5);
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u);
        return t < 1 ? -0.5 * u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) + n :
            u * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) * .5 + r + n
    },
    easeInBack: function(e, t, n, r, i, s) {
        s == undefined && (s = 1.70158);
        return r * (t /= i) * t * ((s + 1) * t - s) + n
    },
    easeOutBack: function(e, t, n, r, i, s) {
        s == undefined && (s = 1.20158);
        return r * ((t = t / i - 1) * t * ((s + 1) * t + s) + 1) + n
    },
    easeInOutBack: function(e, t, n, r, i, s) {
        s == undefined && (s = 1.70158);
        return (t /= i / 2) < 1 ? r / 2 * t * t * (((s *= 1.525) + 1) * t - s) + n : r / 2 * ((t -= 2) * t *
            (((s *= 1.525) + 1) * t + s) + 2) + n
    },
    easeInBounce: function(e, t, n, r, i) {
        return r - jQuery.easing.easeOutBounce(e, i - t, 0, r, i) + n
    },
    easeOutBounce: function(e, t, n, r, i) {
        return (t /= i) < 1 / 2.75 ? r * 7.5625 * t * t + n : t < 2 / 2.75 ? r * (7.5625 * (t -= 1.5 / 2.75) *
            t + .75) + n : t < 2.5 / 2.75 ? r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : r * (7.5625 *
            (t -= 2.625 / 2.75) * t + .984375) + n
    },
    easeInOutBounce: function(e, t, n, r, i) {
        return t < i / 2 ? jQuery.easing.easeInBounce(e, t * 2, 0, r, i) * .5 + n : jQuery.easing.easeOutBounce(
            e, t * 2 - i, 0, r, i) * .5 + r * .5 + n
    }
});
typeof jQuery != "undefined" && function(e) {
    e.imgpreload = imgpreload;
    e.fn.imgpreload = function(t) {
        t = e.extend({}, e.fn.imgpreload.defaults, t instanceof Function ? {
            all: t
        } : t);
        this.each(function() {
            var n = this;
            imgpreload(e(this).attr("src"), function() {
                t.each instanceof Function && t.each.call(n)
            })
        });
        var n = [];
        this.each(function() {
            n.push(e(this).attr("src"))
        });
        var r = this;
        imgpreload(n, function() {
            t.all instanceof Function && t.all.call(r)
        });
        return this
    };
    e.fn.imgpreload.defaults = {
        each: null,
        all: null
    }
}(jQuery);
var w = document.documentElement,
    loggedin = !1,
    retina = window.devicePixelRatio > 1 ? !0 : !1;
retina && (w.className += " retina");
var is_mobile = !1;
n = navigator.userAgent || navigator.vendor || window.opera;
if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i
    .test(n) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
    .test(n.substr(0, 4))) {
    is_mobile = !0;
    w.className += " mobile_detection is_mobile"
} else w.className += " mobile_detection is_desktop"; if (!window.console) {
    window.console = {};
    window.console.log = function() {}
}
$(document).on("click", ".share", function(e) {
    clearSelection();
    window.open($(this).attr("href"), "webintent", "width=750,height=600");
    return !1
});
Array.prototype.unique = function() {
    var e = this.concat();
    for (var t = 0; t < e.length; ++t)
        for (var n = t + 1; n < e.length; ++n) e[t] === e[n] && e.splice(n--, 1);
    return e
};
(function(e) {
    function c() {
        l.screen.width = t.width();
        l.screen.height = t.height();
        l.document.height = n.height();
        l.document.height = n.height();
        e(".block:not(.intro):not(.video) .inner").css({
            height: l.screen.height + "px"
        });
        if (l.screen.width < 768) {
            i.addClass("show_message");
            e("#message_target").html(
                '<div id="tslogo"></div><p>Please increase the size of your browser to view this site.<br />Screen too small? </p>'
            )
        } else i.removeClass("show_message")
    }

    function h(e) {
        return '<a href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(e + " - #Syria") +
            "&amp;url=" + encodeURIComponent("http://unhcr.jo/Living-in-the-shadow") +
            '" class="tweetable share"><span></span>' + e + "</a>"
    }

    function p(t) {
        var n = e("#" + t);
        if (n.length > 0) {
            var r = n.closest(".block_wrapper");
            d(u.index(r))
        }
    }

    function d(t) {
        var n = u.eq(t);
        n.hasClass("blue") ? i.removeClass("black").addClass("blue") : n.hasClass("black") ? i.removeClass(
            "blue").addClass("black") : i.removeClass("black blue");
        u.not(n).hide();
        i.addClass("loading");
        if (n.find(".block").hasClass("video")) {
            i.removeClass("loading");
            n.fadeIn(1500);
            n.find(".block").fadeIn(1500);
            Modernizr.touch || players[n.data("video_count")].playVideo()
        } else {
            n.find(".block").hasClass("whiteblue") && n.css({
                background: "#fff"
            });
            var r = n.attr("data-image");
            e.imgpreload(r, function() {
                i.removeClass("loading");
                n.fadeIn(1500, function() {});
                n.find(".block").delay(1200).fadeIn(3e3)
            });
            e.each(players, function() {
                this.stopVideo()
            })
        }
    }
    var t = !1,
        n = !1,
        r = !1,
        i = !1,
        s = !1,
        o = !1,
        u = !1,
        a = !1,
        f = 0,
        l = {
            screen: {
                width: 0,
                height: 0
            },
            document: {
                width: 0,
                height: 0
            }
        };
    history.navigationMode = "compatible";
    e(document).ready(function() {
        t = e(window);
        n = e(document);
        r = e("html");
        i = e("body");
        s = e("#nav_button");
        o = e("#nav");
        if (e("#woman-alone-section").length > 0) i.removeClass("black").addClass("blue");
        else {
            u = e(".block_wrapper");
            var f = 0;
            u.each(function(t) {
                if (e(this).hasClass("video")) {
                    e(this).data("video_count", f);
                    f++
                }
                if (!e(this).hasClass("last")) {
                    var n = e(
                        '<div class="next">CLICK TO NAVIGATE<span class="red_arrow"></span><div>'
                    );
                    n.data("index", t + 1).click(function() {
                        d(e(this).data("index"))
                    });
                    e(this).find(".block .inner").append(n)
                }
            });
            var l = window.location.toString().split("#");
            l.length > 1 ? p(l[1]) : d(0)
        }
        e("#nav ul ul a").click(function() {
            var t = e(this).attr("href").split("#")[1],
                n = e("#" + t);
            if (n.length > 0) {
                s.click();
                p(t)
            }
        });
        e(".underlined_subheading h2").wrapInner("<span></span>");
        var v = !1;
        t.resize(function() {
            v = !0
        });
        setInterval(function() {
            if (v) {
                v = !1;
                c()
            }
        }, 25);
        c();
        defaultText();
        s.click(function() {
            if (!s.hasClass("open")) {
                clearTimeout(a);
                o.addClass("open");
                s.addClass("open");
                o.css({
                    height: "300px"
                })
            } else {
                o.removeClass("open");
                s.removeClass("open");
                a = setTimeout(function() {
                    o.css({
                        height: "0px"
                    })
                }, 1e3)
            }
        });
        e("#share_tool").click(function() {
            clearSelection();
            e(this).toggleClass("open")
        });
        e(".body_text .tweetable").each(function() {
            var t = e(this).text(),
                n = e(this).attr("title") != undefined && e(this).attr("title") != "" ? e(this).attr(
                    "title") : e(this).text();
            e(this).replaceWith(h(t))
        })
    })
})(jQuery);
