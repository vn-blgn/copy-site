function UpdateRegisterForm(n, t) {
  var i, r;
  $.fancybox.showLoading();
  i = QueryString.refcode;
  (i == undefined || i == null) && (i = "");
  i = getCookie("refcode");
  (i == undefined || i == null) && (i = "");
  i == "" &&
    ((r = QueryString.refcode), r != undefined && r != null && (i = r));
  $.get(
    "/Home/GetRegisterFormByBrokerId?brokerId=" +
      n +
      "&refcode=" +
      i +
      "&winguid=" +
      t,
    function (n) {
      $("#" + t)
        .parent()
        .show();
      $("#" + t).html(n);
      $.fancybox.hideLoading();
      $("body").animate(
        {
          scrollTop: $("#" + t).offset().top - 50,
        },
        "500",
        "swing",
        function () {}
      );
    }
  );
}
function getCookie(n) {
  var t = " " + document.cookie,
    u = " " + n + "=",
    f = null,
    i = 0,
    r = 0;
  return (
    t.length > 0 &&
      ((i = t.indexOf(u)),
      i != -1 &&
        ((i += u.length),
        (r = t.indexOf(";", i)),
        r == -1 && (r = t.length),
        (f = unescape(t.substring(i, r))))),
    f
  );
}
function setCookie(n, t, i) {
  var r, u, f, e, o;
  i = i || {};
  r = i.expires;
  typeof r == "number" &&
    r &&
    ((u = new Date()), u.setTime(u.getTime() + r * 1e3), (r = i.expires = u));
  r && r.toUTCString && (i.expires = r.toUTCString());
  t = encodeURIComponent(t);
  f = n + "=" + t;
  for (e in i) (f += "; " + e), (o = i[e]), o !== !0 && (f += "=" + o);
  document.cookie = f;
}
function submitForm(n) {
  var t = !0,
    i = n;
  $.each($("#Client_details" + i + " .req"), function (n, i) {
    $(i).val() == "" && (t = !1);
  });
  t == !0
    ? ($(".atomLoader").show(),
      $(".button.signup").prop("disabled", !0),
      $.each($(".reg-form"), function (n, t) {
        $(t).find('input[name="Email"]').val().length > 0 &&
          ((email = $(t).find('input[name="Email"]').val()),
          (name = $(t).find('input[name="FirstName"]').val()));
      }),
      $("#Client_details" + i).submit())
    : alert("Р’СЃРµ РїРѕР»СЏ РѕР±СЏР·Р°С‚РµР»СЊРЅС‹!!!");
}
function ClientDetailsOnSuccess(n) {
  n.success == !0
    ? ((window.onbeforeunload = null),
      n.approve == !0
        ? setTimeout(function () {
            window.location = "/approve";
          }, 1e3)
        : setTimeout(function () {
            window.location = "/";
          }, 1e3))
    : ($(".atomLoader").hide(),
      $(".button.signup").prop("disabled", !1),
      $("input.cool").each(function () {
        $(this).val() && $(this).siblings("label").addClass("active");
      }),
      setTimeout(function () {
        $("input:-webkit-autofill").each(function () {
          $(this).siblings("label").css("transition", "all 0.3s");
          $(this).siblings("label").addClass("active");
        });
      }, 500));
}
function sendFroms(n, t) {
  if (!validateEmail(n)) {
    alert("Email РёРјРµРµС‚ РЅРµРІРµСЂРЅС‹Р№ С„РѕСЂРјР°С‚!");
    return;
  }
  if (t.length == 0) {
    alert("Name РѕР±СЏР·Р°С‚РµР»СЊРЅРѕРµ РїРѕР»Рµ!");
    return;
  }
  var i = "";
  i =
    "*** Р’РЅРёРјР°РЅРёРµ!  \n\nРџСЂРѕРІРµСЂСЊС‚Рµ РІР°С€ e-mail вЂ“ РїРёСЃСЊРјРѕ СЃ РІРёРґРµРѕ-РёРЅСЃС‚СЂСѓРєС†РёРµР№ РґРѕР»Р¶РЅРѕ РїСЂРёР№С‚Рё РІ С‚РµС‡РµРЅРёРµ 2-5 РјРёРЅСѓС‚.  \n\nРџРѕСЃР»Рµ СЌС‚РѕРіРѕ:\n1. Р”РѕР±Р°РІСЊС‚Рµ Р°РґСЂРµСЃ РѕС‚РїСЂР°РІРёС‚РµР»СЏ РІ РєРѕРЅС‚Р°РєС‚С‹. \n2. Р•СЃР»Рё РїРёСЃСЊРјРѕ СЃР»СѓС‡Р°Р№РЅРѕ РїРѕРїР°Р»Рѕ РІ РїР°РїРєСѓ В«РЎРїР°РјВ», РЅР°Р¶РјРёС‚Рµ РЅР° РєРЅРѕРїРєСѓ В«РќРµ РЎРїР°РјВ», С‡С‚РѕР±С‹ РІ РґР°Р»СЊРЅРµР№С€РµРј РЅРµ РїРѕС‚РµСЂСЏС‚СЊ РІР°Р¶РЅС‹Рµ РїРёСЃСЊРјР° РѕС‚ Quantum System.\n";
  alert(i);
  window.onbeforeunload = null;
  $(".atomLoader").show();
  $.get(
    subscriptionRefCodeUrl,
    {
      refcode: getCookie("refcode"),
      urlRef: document.referrer,
      email: n,
      name: t,
    },
    function () {
      var i =
        location.protocol +
        "//" +
        location.host +
        "/registration?email=" +
        n +
        "&name=" +
        t;
      window.location = i;
    }
  );
}
function validateEmail(n) {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    n
  );
}
function breakGlass(n) {
  if (n === "reverse") {
    $(".piece").each(function () {
      TweenLite.to($(this), speed, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        opacity: 1,
        z: 0,
      });
    });
    return;
  }
  $(".piece").each(function () {
    var t = getRandomArbitrary(-250, 250),
      i = getRandomArbitrary(-250, 250),
      r = getRandomArbitrary(-720, 720),
      u = getRandomArbitrary(-720, 720),
      f = getRandomArbitrary(-500, 500);
    n
      ? TweenLite.from($(this), speed, {
          x: t,
          y: i,
          rotationX: u,
          rotationY: r,
          opacity: 0,
          z: f,
        })
      : TweenLite.to($(this), speed, {
          x: t,
          y: i,
          rotationX: u,
          rotationY: r,
          opacity: 0,
          z: f,
        });
  });
}
function getRandomArbitrary(n, t) {
  return Math.random() * (t - n) + n;
}
function showUsers(n, t) {
  var o = $(".users .user").length,
    i,
    r,
    e,
    u,
    f,
    s;
  if (o == 0)
    for (r = 0; r < n; r++)
      (i = newUser(t)),
        (u = i[0]),
        (f = i[1]),
        $(".users").append(u),
        (t[r] = f);
  else
    (e = getRandom(0, o)),
      (i = newUser(t)),
      (u = i[0]),
      (f = i[1]),
      ($(".users .slick-slide > div")[e].outerHTML = u),
      (t[e] = f);
  s = getRandom(3, 8) * 1e3;
  setTimeout(function () {
    showUsers(1, t);
  }, s);
}
function newUser(n) {
  for (var i = names.length, t = getRandom(0, i), r, u; include(n, t); )
    t = getRandom(0, i);
  return (
    (r = getRandom(100, 600)),
    (u =
      "<div><div class='user'><img src='/Content/Images/users/" +
      t +
      ".jpg' class='img-responsive center-block avatar' alt='" +
      names[t] +
      "' /><div class='name'>" +
      names[t] +
      "</div><div class='pay'> РўРѕР»СЊРєРѕ С‡С‚Рѕ Р·Р°СЂР°Р±РѕС‚Р°Р»(Р°): <span>" +
      r +
      "$</span> </div></div></div>"),
    [u, t]
  );
}
function getRandom(n, t) {
  return Math.floor(Math.random() * (t - n)) + n;
}
function countDownOnline(n) {
  $(".online .pin").text(n);
  n = n < 245 ? n + getRandom(-1, 3) : n - getRandom(1, 3);
  var t = getRandom(6, 9) * 1e3;
  setTimeout(function () {
    countDownOnline(n);
  }, t);
}
function countDownSlots(n) {
  $(".slots .pin").text(n);
  n = n > 5 ? n - getRandom(1, 3) : n - getRandom(-2, 2);
  n < 2 && (n = 1);
  var t = getRandom(6, 9) * 1e3;
  setTimeout(function () {
    countDownSlots(n);
  }, t);
}
function include(n, t) {
  return n.indexOf(t) != -1;
}
function pad(n, t) {
  for (var i = "" + n; i.length < t; ) i = "0" + i;
  return i;
}
function formatTime(n) {
  var t = parseInt(n / 6e3),
    i = parseInt(n / 100) - t * 60,
    r = pad(n - i * 100 - t * 6e3, 2);
  return (
    "<b>" +
    (t > 0 ? pad(t, 2) : "00") +
    "</b>:<b>" +
    pad(i, 2) +
    "</b>:<b>" +
    r +
    "</b>"
  );
}
var i, slidebars, _gsScope, PrevY, names;
(function (n) {
  window.console || (window.console = {});
  window.console.log || (window.console.log = function () {});
  n.fn.euCookieLawPopup = function () {
    var t = this;
    t.params = {
      cookiePolicyUrl: "/Home/Agreement",
      popupPosition: "bottom",
      colorStyle: "default",
      compactStyle: !0,
      popupTitle: "РЎР°Р№С‚ РёСЃРїРѕР»СЊР·СѓРµС‚ С„Р°Р№Р»С‹-cookies.",
      popupText:
        "РџСЂРѕРґРѕР»Р¶Р°СЏ РїРѕР»СЊР·РѕРІР°С‚СЊСЃСЏ РЅР°С€РёРј СЃР°Р№С‚РѕРј, РІС‹ РїРѕРґС‚РІРµСЂР¶РґР°РµС‚Рµ СЃРѕРіР»Р°СЃРёРµ РЅР° РёСЃРїРѕР»СЊР·РѕРІР°РЅРёРµ cookies.",
      buttonContinueTitle: "РЇ РїРѕРЅРёРјР°СЋ",
      buttonLearnmoreTitle: "РЈР·РЅР°С‚СЊ РїРѕРґСЂРѕР±РЅРµРµ",
      buttonLearnmoreOpenInNewWindow: !0,
      agreementExpiresInDays: 30,
      autoAcceptCookiePolicy: !1,
      htmlMarkup: null,
    };
    t.vars = {
      INITIALISED: !1,
      HTML_MARKUP: null,
      COOKIE_NAME: "EU_COOKIE_LAW_CONSENT",
    };
    var u = function (i, r, u) {
        if (i) {
          var f = n(i).attr("class") ? n(i).attr("class") : "";
          f.indexOf("eupopup-top") > -1
            ? (t.params.popupPosition = "top")
            : f.indexOf("eupopup-fixedtop") > -1
            ? (t.params.popupPosition = "fixedtop")
            : f.indexOf("eupopup-bottomright") > -1
            ? (t.params.popupPosition = "bottomright")
            : f.indexOf("eupopup-bottomleft") > -1
            ? (t.params.popupPosition = "bottomleft")
            : f.indexOf("eupopup-bottom") > -1
            ? (t.params.popupPosition = "bottom")
            : f.indexOf("eupopup-block") > -1 &&
              (t.params.popupPosition = "block");
          f.indexOf("eupopup-color-default") > -1
            ? (t.params.colorStyle = "default")
            : f.indexOf("eupopup-color-inverse") > -1 &&
              (t.params.colorStyle = "inverse");
          f.indexOf("eupopup-style-compact") > -1 &&
            (t.params.compactStyle = !0);
        }
        r && (t.params.htmlMarkup = r);
        u &&
          (typeof u.cookiePolicyUrl != "undefined" &&
            (t.params.cookiePolicyUrl = u.cookiePolicyUrl),
          typeof u.popupPosition != "undefined" &&
            (t.params.popupPosition = u.popupPosition),
          typeof u.colorStyle != "undefined" &&
            (t.params.colorStyle = u.colorStyle),
          typeof u.popupTitle != "undefined" &&
            (t.params.popupTitle = u.popupTitle),
          typeof u.popupText != "undefined" &&
            (t.params.popupText = u.popupText),
          typeof u.buttonContinueTitle != "undefined" &&
            (t.params.buttonContinueTitle = u.buttonContinueTitle),
          typeof u.buttonLearnmoreTitle != "undefined" &&
            (t.params.buttonLearnmoreTitle = u.buttonLearnmoreTitle),
          typeof u.buttonLearnmoreOpenInNewWindow != "undefined" &&
            (t.params.buttonLearnmoreOpenInNewWindow =
              u.buttonLearnmoreOpenInNewWindow),
          typeof u.agreementExpiresInDays != "undefined" &&
            (t.params.agreementExpiresInDays = u.agreementExpiresInDays),
          typeof u.autoAcceptCookiePolicy != "undefined" &&
            (t.params.autoAcceptCookiePolicy = u.autoAcceptCookiePolicy),
          typeof u.htmlMarkup != "undefined" &&
            (t.params.htmlMarkup = u.htmlMarkup));
      },
      f = function () {
        if (t.params.htmlMarkup) return t.params.htmlMarkup;
        return (
          '<div class="eupopup-container eupopup-container-' +
          t.params.popupPosition +
          (t.params.compactStyle ? " eupopup-style-compact" : "") +
          " eupopup-color-" +
          t.params.colorStyle +
          '"><div class="eupopup-head">' +
          t.params.popupTitle +
          '</div><div class="eupopup-body">' +
          t.params.popupText +
          '</div><div class="eupopup-buttons"><a href="#" class="eupopup-button eupopup-button_1">' +
          t.params.buttonContinueTitle +
          '</a><a href="' +
          t.params.cookiePolicyUrl +
          '"' +
          (t.params.buttonLearnmoreOpenInNewWindow ? " target=_blank " : "") +
          ' class="eupopup-button eupopup-button_2">' +
          t.params.buttonLearnmoreTitle +
          '</a><div class="clearfix"></div></div><a href="#" class="eupopup-closebutton">x</a></div>'
        );
      },
      i = function (i) {
        var r = new Date(),
          f = t.params.agreementExpiresInDays * 864e5,
          u;
        r.setTime(r.getTime() + f);
        u = "expires=" + r.toGMTString();
        document.cookie = t.vars.COOKIE_NAME + "=" + i + "; " + u + ";path=/";
        n(document).trigger("user_cookie_consent_changed", {
          consent: i,
        });
      },
      e = function () {
        for (
          var n, r = !1, u = document.cookie.split(";"), i = 0;
          i < u.length;
          i++
        )
          (n = u[i].trim()),
            n.indexOf(t.vars.COOKIE_NAME) == 0 &&
              (r = n.substring(t.vars.COOKIE_NAME.length + 1, n.length));
        return r;
      },
      r = function () {
        n(".eupopup-container").animate(
          {
            opacity: 0,
            height: 0,
          },
          200,
          function () {
            n(".eupopup-container").hide(0);
          }
        );
      };
    return {
      init: function (o) {
        if ((u(n(".eupopup").first(), n(".eupopup-markup").html(), o), e())) {
          n(document).trigger("user_cookie_already_accepted", {
            consent: !0,
          });
          return;
        }
        t.vars.INITIALISED ||
          ((t.vars.INITIALISED = !0),
          (t.vars.HTML_MARKUP = f()),
          n(".eupopup-block").length > 0
            ? n(".eupopup-block").append(t.vars.HTML_MARKUP)
            : n("BODY").append(t.vars.HTML_MARKUP),
          n(".eupopup-button_1").click(function () {
            return i(!0), r(), !1;
          }),
          n(".eupopup-closebutton").click(function () {
            return i(!0), r(), !1;
          }),
          n(".eupopup-container").show(),
          t.params.autoAcceptCookiePolicy && i(!0));
      },
    };
  };
  n(document).ready(function () {
    n(".eupopup").length > 0 &&
      n(document).euCookieLawPopup().init({
        popupTitle: "",
        popupText:
          "РЎР°Р№С‚ РёСЃРїРѕР»СЊР·СѓРµС‚ С„Р°Р№Р»С‹-cookies. РџСЂРѕРґРѕР»Р¶Р°СЏ РїРѕР»СЊР·РѕРІР°С‚СЊСЃСЏ РЅР°С€РёРј СЃР°Р№С‚РѕРј, РІС‹ РїРѕРґС‚РІРµСЂР¶РґР°РµС‚Рµ СЃРѕРіР»Р°СЃРёРµ РЅР° РёСЃРїРѕР»СЊР·РѕРІР°РЅРёРµ cookies.",
      });
  });
  n(document).bind("user_cookie_consent_changed", function (t, i) {
    console.log("User cookie consent changed: " + n(i).attr("consent"));
  });
})(jQuery),
  (function (n) {
    function t(n, i, r) {
      return this.constructor != t || this.init
        ? new t(n, i, r)
        : (this.set(n, i, r), this);
    }
    n.timer = t;
    t.prototype.set = function (n, t, i) {
      return (
        (this.init = !0),
        typeof n == "object" &&
          (n.time && (t = n.time),
          n.autostart && (i = n.autostart),
          (n = n.action)),
        typeof n == "function" && (this.action = n),
        isNaN(t) || (this.intervalTime = t),
        i && this.isReadyToStart() && ((this.isActive = !0), this.setTimer()),
        this
      );
    };
    t.prototype.isReadyToStart = function () {
      var n = !this.active,
        t = typeof this.action == "function",
        i = !isNaN(this.intervalTime);
      return n && t && i;
    };
    t.prototype.once = function (n) {
      function i() {
        t.action();
      }
      var t = this;
      return isNaN(n) ? (t.action(), this) : (setTimeout(i, n), this);
    };
    t.prototype.play = function (n) {
      return (
        this.isReadyToStart() &&
          (n ? this.setTimer() : this.setTimer(this.remaining),
          (this.isActive = !0)),
        this
      );
    };
    t.prototype.pause = function () {
      return (
        this.isActive &&
          ((this.isActive = !1),
          (this.remaining -= new Date() - this.last),
          this.clearTimer()),
        this
      );
    };
    t.prototype.stop = function () {
      return (
        (this.isActive = !1),
        (this.remaining = this.intervalTime),
        this.clearTimer(),
        this
      );
    };
    t.prototype.toggle = function (n) {
      return (
        this.isActive ? this.pause() : n ? this.play(!0) : this.play(), this
      );
    };
    t.prototype.reset = function () {
      return (this.isActive = !1), this.play(!0), this;
    };
    t.prototype.clearTimer = function () {
      return clearTimeout(this.timeoutObject), this;
    };
    t.prototype.setTimer = function (n) {
      function i() {
        t.execute();
      }
      var t = this;
      return (
        isNaN(n) && (n = this.intervalTime),
        (this.remaining = n),
        (this.last = new Date()),
        this.clearTimer(),
        (this.timeoutObject = setTimeout(i, n)),
        this
      );
    };
    t.prototype.execute = function () {
      if (this.isActive)
        try {
          this.action();
        } finally {
          this.setTimer();
        }
      return this;
    };
  })(jQuery);
var QueryString = (function () {
    for (
      var n,
        u,
        t = {},
        f = window.location.search.substring(1),
        r = f.split("&"),
        i = 0;
      i < r.length;
      i++
    )
      (n = r[i].split("=")),
        typeof t[n[0]] == "undefined"
          ? (t[n[0]] = n[1])
          : typeof t[n[0]] == "string"
          ? ((u = [t[n[0]], n[1]]), (t[n[0]] = u))
          : t[n[0]].push(n[1]);
    return t;
  })(),
  email = "",
  name = "";
var pieces = 100,
  speed = 1,
  pieceW = 58,
  pieceH = 58;
for (i = pieces - 1; i >= 0; i--)
  $("#popup").prepend(
    '<div class="piece" style="width:' +
      pieceW +
      "px; height:" +
      pieceH +
      'px"></div>'
  );
(function (n) {
  "use strict";
  typeof define == "function" && define.amd
    ? define(["jquery"], n)
    : typeof exports != "undefined"
    ? (module.exports = n(require("jquery")))
    : n(jQuery);
})(function (n) {
  "use strict";
  var t = window.Slick || {};
  t = (function () {
    function i(i, r) {
      var u = this,
        f;
      u.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: n(i),
        appendDots: n(i),
        arrows: !0,
        asNavFor: null,
        prevArrow:
          '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
        nextArrow:
          '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (t, i) {
          return n(
            '<button type="button" data-role="none" role="button" tabindex="0" />'
          ).text(i + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3,
      };
      u.initials = {
        animating: !1,
        dragging: !1,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: !1,
        slideOffset: 0,
        swipeLeft: null,
        $list: null,
        touchObject: {},
        transformsEnabled: !1,
        unslicked: !1,
      };
      n.extend(u, u.initials);
      u.activeBreakpoint = null;
      u.animType = null;
      u.animProp = null;
      u.breakpoints = [];
      u.breakpointSettings = [];
      u.cssTransitions = !1;
      u.focussed = !1;
      u.interrupted = !1;
      u.hidden = "hidden";
      u.paused = !0;
      u.positionProp = null;
      u.respondTo = null;
      u.rowCount = 1;
      u.shouldClick = !0;
      u.$slider = n(i);
      u.$slidesCache = null;
      u.transformType = null;
      u.transitionType = null;
      u.visibilityChange = "visibilitychange";
      u.windowWidth = 0;
      u.windowTimer = null;
      f = n(i).data("slick") || {};
      u.options = n.extend({}, u.defaults, r, f);
      u.currentSlide = u.options.initialSlide;
      u.originalSettings = u.options;
      typeof document.mozHidden != "undefined"
        ? ((u.hidden = "mozHidden"),
          (u.visibilityChange = "mozvisibilitychange"))
        : typeof document.webkitHidden != "undefined" &&
          ((u.hidden = "webkitHidden"),
          (u.visibilityChange = "webkitvisibilitychange"));
      u.autoPlay = n.proxy(u.autoPlay, u);
      u.autoPlayClear = n.proxy(u.autoPlayClear, u);
      u.autoPlayIterator = n.proxy(u.autoPlayIterator, u);
      u.changeSlide = n.proxy(u.changeSlide, u);
      u.clickHandler = n.proxy(u.clickHandler, u);
      u.selectHandler = n.proxy(u.selectHandler, u);
      u.setPosition = n.proxy(u.setPosition, u);
      u.swipeHandler = n.proxy(u.swipeHandler, u);
      u.dragHandler = n.proxy(u.dragHandler, u);
      u.keyHandler = n.proxy(u.keyHandler, u);
      u.instanceUid = t++;
      u.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
      u.registerBreakpoints();
      u.init(!0);
    }
    var t = 0;
    return i;
  })();
  t.prototype.activateADA = function () {
    var n = this;
    n.$slideTrack
      .find(".slick-active")
      .attr({
        "aria-hidden": "false",
      })
      .find("a, input, button, select")
      .attr({
        tabindex: "0",
      });
  };
  t.prototype.addSlide = t.prototype.slickAdd = function (t, i, r) {
    var u = this;
    if (typeof i == "boolean") (r = i), (i = null);
    else if (i < 0 || i >= u.slideCount) return !1;
    u.unload();
    typeof i == "number"
      ? i === 0 && u.$slides.length === 0
        ? n(t).appendTo(u.$slideTrack)
        : r
        ? n(t).insertBefore(u.$slides.eq(i))
        : n(t).insertAfter(u.$slides.eq(i))
      : r === !0
      ? n(t).prependTo(u.$slideTrack)
      : n(t).appendTo(u.$slideTrack);
    u.$slides = u.$slideTrack.children(this.options.slide);
    u.$slideTrack.children(this.options.slide).detach();
    u.$slideTrack.append(u.$slides);
    u.$slides.each(function (t, i) {
      n(i).attr("data-slick-index", t);
    });
    u.$slidesCache = u.$slides;
    u.reinit();
  };
  t.prototype.animateHeight = function () {
    var n = this,
      t;
    n.options.slidesToShow === 1 &&
      n.options.adaptiveHeight === !0 &&
      n.options.vertical === !1 &&
      ((t = n.$slides.eq(n.currentSlide).outerHeight(!0)),
      n.$list.animate(
        {
          height: t,
        },
        n.options.speed
      ));
  };
  t.prototype.animateSlide = function (t, i) {
    var u = {},
      r = this;
    r.animateHeight();
    r.options.rtl === !0 && r.options.vertical === !1 && (t = -t);
    r.transformsEnabled === !1
      ? r.options.vertical === !1
        ? r.$slideTrack.animate(
            {
              left: t,
            },
            r.options.speed,
            r.options.easing,
            i
          )
        : r.$slideTrack.animate(
            {
              top: t,
            },
            r.options.speed,
            r.options.easing,
            i
          )
      : r.cssTransitions === !1
      ? (r.options.rtl === !0 && (r.currentLeft = -r.currentLeft),
        n({
          animStart: r.currentLeft,
        }).animate(
          {
            animStart: t,
          },
          {
            duration: r.options.speed,
            easing: r.options.easing,
            step: function (n) {
              n = Math.ceil(n);
              r.options.vertical === !1
                ? ((u[r.animType] = "translate(" + n + "px, 0px)"),
                  r.$slideTrack.css(u))
                : ((u[r.animType] = "translate(0px," + n + "px)"),
                  r.$slideTrack.css(u));
            },
            complete: function () {
              i && i.call();
            },
          }
        ))
      : (r.applyTransition(),
        (t = Math.ceil(t)),
        (u[r.animType] =
          r.options.vertical === !1
            ? "translate3d(" + t + "px, 0px, 0px)"
            : "translate3d(0px," + t + "px, 0px)"),
        r.$slideTrack.css(u),
        i &&
          setTimeout(function () {
            r.disableTransition();
            i.call();
          }, r.options.speed));
  };
  t.prototype.getNavTarget = function () {
    var i = this,
      t = i.options.asNavFor;
    return t && t !== null && (t = n(t).not(i.$slider)), t;
  };
  t.prototype.asNavFor = function (t) {
    var r = this,
      i = r.getNavTarget();
    i !== null &&
      typeof i == "object" &&
      i.each(function () {
        var i = n(this).slick("getSlick");
        i.unslicked || i.slideHandler(t, !0);
      });
  };
  t.prototype.applyTransition = function (n) {
    var t = this,
      i = {};
    i[t.transitionType] =
      t.options.fade === !1
        ? t.transformType + " " + t.options.speed + "ms " + t.options.cssEase
        : "opacity " + t.options.speed + "ms " + t.options.cssEase;
    t.options.fade === !1 ? t.$slideTrack.css(i) : t.$slides.eq(n).css(i);
  };
  t.prototype.autoPlay = function () {
    var n = this;
    n.autoPlayClear();
    n.slideCount > n.options.slidesToShow &&
      (n.autoPlayTimer = setInterval(
        n.autoPlayIterator,
        n.options.autoplaySpeed
      ));
  };
  t.prototype.autoPlayClear = function () {
    var n = this;
    n.autoPlayTimer && clearInterval(n.autoPlayTimer);
  };
  t.prototype.autoPlayIterator = function () {
    var n = this,
      t = n.currentSlide + n.options.slidesToScroll;
    n.paused ||
      n.interrupted ||
      n.focussed ||
      (n.options.infinite === !1 &&
        (n.direction === 1 && n.currentSlide + 1 === n.slideCount - 1
          ? (n.direction = 0)
          : n.direction === 0 &&
            ((t = n.currentSlide - n.options.slidesToScroll),
            n.currentSlide - 1 == 0 && (n.direction = 1))),
      n.slideHandler(t));
  };
  t.prototype.buildArrows = function () {
    var t = this;
    t.options.arrows === !0 &&
      ((t.$prevArrow = n(t.options.prevArrow).addClass("slick-arrow")),
      (t.$nextArrow = n(t.options.nextArrow).addClass("slick-arrow")),
      t.slideCount > t.options.slidesToShow
        ? (t.$prevArrow
            .removeClass("slick-hidden")
            .removeAttr("aria-hidden tabindex"),
          t.$nextArrow
            .removeClass("slick-hidden")
            .removeAttr("aria-hidden tabindex"),
          t.htmlExpr.test(t.options.prevArrow) &&
            t.$prevArrow.prependTo(t.options.appendArrows),
          t.htmlExpr.test(t.options.nextArrow) &&
            t.$nextArrow.appendTo(t.options.appendArrows),
          t.options.infinite !== !0 &&
            t.$prevArrow
              .addClass("slick-disabled")
              .attr("aria-disabled", "true"))
        : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1",
          }));
  };
  t.prototype.buildDots = function () {
    var t = this,
      i,
      r;
    if (t.options.dots === !0 && t.slideCount > t.options.slidesToShow) {
      for (
        t.$slider.addClass("slick-dotted"),
          r = n("<ul />").addClass(t.options.dotsClass),
          i = 0;
        i <= t.getDotCount();
        i += 1
      )
        r.append(n("<li />").append(t.options.customPaging.call(this, t, i)));
      t.$dots = r.appendTo(t.options.appendDots);
      t.$dots
        .find("li")
        .first()
        .addClass("slick-active")
        .attr("aria-hidden", "false");
    }
  };
  t.prototype.buildOut = function () {
    var t = this;
    t.$slides = t.$slider
      .children(t.options.slide + ":not(.slick-cloned)")
      .addClass("slick-slide");
    t.slideCount = t.$slides.length;
    t.$slides.each(function (t, i) {
      n(i)
        .attr("data-slick-index", t)
        .data("originalStyling", n(i).attr("style") || "");
    });
    t.$slider.addClass("slick-slider");
    t.$slideTrack =
      t.slideCount === 0
        ? n('<div class="slick-track"/>').appendTo(t.$slider)
        : t.$slides.wrapAll('<div class="slick-track"/>').parent();
    t.$list = t.$slideTrack
      .wrap('<div aria-live="polite" class="slick-list"/>')
      .parent();
    t.$slideTrack.css("opacity", 0);
    (t.options.centerMode === !0 || t.options.swipeToSlide === !0) &&
      (t.options.slidesToScroll = 1);
    n("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading");
    t.setupInfinite();
    t.buildArrows();
    t.buildDots();
    t.updateDots();
    t.setSlideClasses(typeof t.currentSlide == "number" ? t.currentSlide : 0);
    t.options.draggable === !0 && t.$list.addClass("draggable");
  };
  t.prototype.buildRows = function () {
    var n = this,
      t,
      i,
      r,
      f,
      c,
      u,
      e,
      o,
      s,
      h;
    if (
      ((f = document.createDocumentFragment()),
      (u = n.$slider.children()),
      n.options.rows > 1)
    ) {
      for (
        e = n.options.slidesPerRow * n.options.rows,
          c = Math.ceil(u.length / e),
          t = 0;
        t < c;
        t++
      ) {
        for (
          o = document.createElement("div"), i = 0;
          i < n.options.rows;
          i++
        ) {
          for (
            s = document.createElement("div"), r = 0;
            r < n.options.slidesPerRow;
            r++
          )
            (h = t * e + (i * n.options.slidesPerRow + r)),
              u.get(h) && s.appendChild(u.get(h));
          o.appendChild(s);
        }
        f.appendChild(o);
      }
      n.$slider.empty().append(f);
      n.$slider
        .children()
        .children()
        .children()
        .css({
          width: 100 / n.options.slidesPerRow + "%",
          display: "inline-block",
        });
    }
  };
  t.prototype.checkResponsive = function (t, i) {
    var r = this,
      f,
      u,
      e,
      o = !1,
      s = r.$slider.width(),
      h = window.innerWidth || n(window).width();
    if (
      (r.respondTo === "window"
        ? (e = h)
        : r.respondTo === "slider"
        ? (e = s)
        : r.respondTo === "min" && (e = Math.min(h, s)),
      r.options.responsive &&
        r.options.responsive.length &&
        r.options.responsive !== null)
    ) {
      u = null;
      for (f in r.breakpoints)
        r.breakpoints.hasOwnProperty(f) &&
          (r.originalSettings.mobileFirst === !1
            ? e < r.breakpoints[f] && (u = r.breakpoints[f])
            : e > r.breakpoints[f] && (u = r.breakpoints[f]));
      u !== null
        ? r.activeBreakpoint !== null
          ? (u !== r.activeBreakpoint || i) &&
            ((r.activeBreakpoint = u),
            r.breakpointSettings[u] === "unslick"
              ? r.unslick(u)
              : ((r.options = n.extend(
                  {},
                  r.originalSettings,
                  r.breakpointSettings[u]
                )),
                t === !0 && (r.currentSlide = r.options.initialSlide),
                r.refresh(t)),
            (o = u))
          : ((r.activeBreakpoint = u),
            r.breakpointSettings[u] === "unslick"
              ? r.unslick(u)
              : ((r.options = n.extend(
                  {},
                  r.originalSettings,
                  r.breakpointSettings[u]
                )),
                t === !0 && (r.currentSlide = r.options.initialSlide),
                r.refresh(t)),
            (o = u))
        : r.activeBreakpoint !== null &&
          ((r.activeBreakpoint = null),
          (r.options = r.originalSettings),
          t === !0 && (r.currentSlide = r.options.initialSlide),
          r.refresh(t),
          (o = u));
      t || o === !1 || r.$slider.trigger("breakpoint", [r, o]);
    }
  };
  t.prototype.changeSlide = function (t, i) {
    var r = this,
      u = n(t.currentTarget),
      f,
      e,
      o,
      s;
    u.is("a") && t.preventDefault();
    u.is("li") || (u = u.closest("li"));
    o = r.slideCount % r.options.slidesToScroll != 0;
    f = o ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll;
    switch (t.data.message) {
      case "previous":
        e = f === 0 ? r.options.slidesToScroll : r.options.slidesToShow - f;
        r.slideCount > r.options.slidesToShow &&
          r.slideHandler(r.currentSlide - e, !1, i);
        break;
      case "next":
        e = f === 0 ? r.options.slidesToScroll : f;
        r.slideCount > r.options.slidesToShow &&
          r.slideHandler(r.currentSlide + e, !1, i);
        break;
      case "index":
        s =
          t.data.index === 0
            ? 0
            : t.data.index || u.index() * r.options.slidesToScroll;
        r.slideHandler(r.checkNavigable(s), !1, i);
        u.children().trigger("focus");
        break;
      default:
        return;
    }
  };
  t.prototype.checkNavigable = function (n) {
    var u = this,
      t,
      i,
      r;
    if (((t = u.getNavigableIndexes()), (i = 0), n > t[t.length - 1]))
      n = t[t.length - 1];
    else
      for (r in t) {
        if (n < t[r]) {
          n = i;
          break;
        }
        i = t[r];
      }
    return n;
  };
  t.prototype.cleanUpEvents = function () {
    var t = this;
    t.options.dots &&
      t.$dots !== null &&
      n("li", t.$dots)
        .off("click.slick", t.changeSlide)
        .off("mouseenter.slick", n.proxy(t.interrupt, t, !0))
        .off("mouseleave.slick", n.proxy(t.interrupt, t, !1));
    t.$slider.off("focus.slick blur.slick");
    t.options.arrows === !0 &&
      t.slideCount > t.options.slidesToShow &&
      (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide),
      t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide));
    t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler);
    t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler);
    t.$list.off("touchend.slick mouseup.slick", t.swipeHandler);
    t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler);
    t.$list.off("click.slick", t.clickHandler);
    n(document).off(t.visibilityChange, t.visibility);
    t.cleanUpSlideEvents();
    t.options.accessibility === !0 &&
      t.$list.off("keydown.slick", t.keyHandler);
    t.options.focusOnSelect === !0 &&
      n(t.$slideTrack).children().off("click.slick", t.selectHandler);
    n(window).off(
      "orientationchange.slick.slick-" + t.instanceUid,
      t.orientationChange
    );
    n(window).off("resize.slick.slick-" + t.instanceUid, t.resize);
    n("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault);
    n(window).off("load.slick.slick-" + t.instanceUid, t.setPosition);
    n(document).off("ready.slick.slick-" + t.instanceUid, t.setPosition);
  };
  t.prototype.cleanUpSlideEvents = function () {
    var t = this;
    t.$list.off("mouseenter.slick", n.proxy(t.interrupt, t, !0));
    t.$list.off("mouseleave.slick", n.proxy(t.interrupt, t, !1));
  };
  t.prototype.cleanUpRows = function () {
    var n = this,
      t;
    n.options.rows > 1 &&
      ((t = n.$slides.children().children()),
      t.removeAttr("style"),
      n.$slider.empty().append(t));
  };
  t.prototype.clickHandler = function (n) {
    var t = this;
    t.shouldClick === !1 &&
      (n.stopImmediatePropagation(), n.stopPropagation(), n.preventDefault());
  };
  t.prototype.destroy = function (t) {
    var i = this;
    i.autoPlayClear();
    i.touchObject = {};
    i.cleanUpEvents();
    n(".slick-cloned", i.$slider).detach();
    i.$dots && i.$dots.remove();
    i.$prevArrow &&
      i.$prevArrow.length &&
      (i.$prevArrow
        .removeClass("slick-disabled slick-arrow slick-hidden")
        .removeAttr("aria-hidden aria-disabled tabindex")
        .css("display", ""),
      i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove());
    i.$nextArrow &&
      i.$nextArrow.length &&
      (i.$nextArrow
        .removeClass("slick-disabled slick-arrow slick-hidden")
        .removeAttr("aria-hidden aria-disabled tabindex")
        .css("display", ""),
      i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove());
    i.$slides &&
      (i.$slides
        .removeClass(
          "slick-slide slick-active slick-center slick-visible slick-current"
        )
        .removeAttr("aria-hidden")
        .removeAttr("data-slick-index")
        .each(function () {
          n(this).attr("style", n(this).data("originalStyling"));
        }),
      i.$slideTrack.children(this.options.slide).detach(),
      i.$slideTrack.detach(),
      i.$list.detach(),
      i.$slider.append(i.$slides));
    i.cleanUpRows();
    i.$slider.removeClass("slick-slider");
    i.$slider.removeClass("slick-initialized");
    i.$slider.removeClass("slick-dotted");
    i.unslicked = !0;
    t || i.$slider.trigger("destroy", [i]);
  };
  t.prototype.disableTransition = function (n) {
    var t = this,
      i = {};
    i[t.transitionType] = "";
    t.options.fade === !1 ? t.$slideTrack.css(i) : t.$slides.eq(n).css(i);
  };
  t.prototype.fadeSlide = function (n, t) {
    var i = this;
    i.cssTransitions === !1
      ? (i.$slides.eq(n).css({
          zIndex: i.options.zIndex,
        }),
        i.$slides.eq(n).animate(
          {
            opacity: 1,
          },
          i.options.speed,
          i.options.easing,
          t
        ))
      : (i.applyTransition(n),
        i.$slides.eq(n).css({
          opacity: 1,
          zIndex: i.options.zIndex,
        }),
        t &&
          setTimeout(function () {
            i.disableTransition(n);
            t.call();
          }, i.options.speed));
  };
  t.prototype.fadeSlideOut = function (n) {
    var t = this;
    t.cssTransitions === !1
      ? t.$slides.eq(n).animate(
          {
            opacity: 0,
            zIndex: t.options.zIndex - 2,
          },
          t.options.speed,
          t.options.easing
        )
      : (t.applyTransition(n),
        t.$slides.eq(n).css({
          opacity: 0,
          zIndex: t.options.zIndex - 2,
        }));
  };
  t.prototype.filterSlides = t.prototype.slickFilter = function (n) {
    var t = this;
    n !== null &&
      ((t.$slidesCache = t.$slides),
      t.unload(),
      t.$slideTrack.children(this.options.slide).detach(),
      t.$slidesCache.filter(n).appendTo(t.$slideTrack),
      t.reinit());
  };
  t.prototype.focusHandler = function () {
    var t = this;
    t.$slider
      .off("focus.slick blur.slick")
      .on("focus.slick blur.slick", "*:not(.slick-arrow)", function (i) {
        i.stopImmediatePropagation();
        var r = n(this);
        setTimeout(function () {
          t.options.pauseOnFocus &&
            ((t.focussed = r.is(":focus")), t.autoPlay());
        }, 0);
      });
  };
  t.prototype.getCurrent = t.prototype.slickCurrentSlide = function () {
    var n = this;
    return n.currentSlide;
  };
  t.prototype.getDotCount = function () {
    var n = this,
      i = 0,
      r = 0,
      t = 0;
    if (n.options.infinite === !0)
      while (i < n.slideCount)
        ++t,
          (i = r + n.options.slidesToScroll),
          (r +=
            n.options.slidesToScroll <= n.options.slidesToShow
              ? n.options.slidesToScroll
              : n.options.slidesToShow);
    else if (n.options.centerMode === !0) t = n.slideCount;
    else if (n.options.asNavFor)
      while (i < n.slideCount)
        ++t,
          (i = r + n.options.slidesToScroll),
          (r +=
            n.options.slidesToScroll <= n.options.slidesToShow
              ? n.options.slidesToScroll
              : n.options.slidesToShow);
    else
      t =
        1 +
        Math.ceil(
          (n.slideCount - n.options.slidesToShow) / n.options.slidesToScroll
        );
    return t - 1;
  };
  t.prototype.getLeft = function (n) {
    var t = this,
      f,
      r,
      u = 0,
      i;
    return (
      (t.slideOffset = 0),
      (r = t.$slides.first().outerHeight(!0)),
      t.options.infinite === !0
        ? (t.slideCount > t.options.slidesToShow &&
            ((t.slideOffset = t.slideWidth * t.options.slidesToShow * -1),
            (u = r * t.options.slidesToShow * -1)),
          t.slideCount % t.options.slidesToScroll != 0 &&
            n + t.options.slidesToScroll > t.slideCount &&
            t.slideCount > t.options.slidesToShow &&
            (n > t.slideCount
              ? ((t.slideOffset =
                  (t.options.slidesToShow - (n - t.slideCount)) *
                  t.slideWidth *
                  -1),
                (u = (t.options.slidesToShow - (n - t.slideCount)) * r * -1))
              : ((t.slideOffset =
                  (t.slideCount % t.options.slidesToScroll) *
                  t.slideWidth *
                  -1),
                (u = (t.slideCount % t.options.slidesToScroll) * r * -1))))
        : n + t.options.slidesToShow > t.slideCount &&
          ((t.slideOffset =
            (n + t.options.slidesToShow - t.slideCount) * t.slideWidth),
          (u = (n + t.options.slidesToShow - t.slideCount) * r)),
      t.slideCount <= t.options.slidesToShow && ((t.slideOffset = 0), (u = 0)),
      t.options.centerMode === !0 && t.options.infinite === !0
        ? (t.slideOffset +=
            t.slideWidth * Math.floor(t.options.slidesToShow / 2) -
            t.slideWidth)
        : t.options.centerMode === !0 &&
          ((t.slideOffset = 0),
          (t.slideOffset +=
            t.slideWidth * Math.floor(t.options.slidesToShow / 2))),
      (f =
        t.options.vertical === !1
          ? n * t.slideWidth * -1 + t.slideOffset
          : n * r * -1 + u),
      t.options.variableWidth === !0 &&
        ((i =
          t.slideCount <= t.options.slidesToShow || t.options.infinite === !1
            ? t.$slideTrack.children(".slick-slide").eq(n)
            : t.$slideTrack
                .children(".slick-slide")
                .eq(n + t.options.slidesToShow)),
        (f =
          t.options.rtl === !0
            ? i[0]
              ? (t.$slideTrack.width() - i[0].offsetLeft - i.width()) * -1
              : 0
            : i[0]
            ? i[0].offsetLeft * -1
            : 0),
        t.options.centerMode === !0 &&
          ((i =
            t.slideCount <= t.options.slidesToShow || t.options.infinite === !1
              ? t.$slideTrack.children(".slick-slide").eq(n)
              : t.$slideTrack
                  .children(".slick-slide")
                  .eq(n + t.options.slidesToShow + 1)),
          (f =
            (t.options.rtl === !0
              ? i[0]
                ? (t.$slideTrack.width() - i[0].offsetLeft - i.width()) * -1
                : 0
              : i[0]
              ? i[0].offsetLeft * -1
              : 0) +
            (t.$list.width() - i.outerWidth()) / 2))),
      f
    );
  };
  t.prototype.getOption = t.prototype.slickGetOption = function (n) {
    var t = this;
    return t.options[n];
  };
  t.prototype.getNavigableIndexes = function () {
    var n = this,
      t = 0,
      i = 0,
      u = [],
      r;
    for (
      n.options.infinite === !1
        ? (r = n.slideCount)
        : ((t = n.options.slidesToScroll * -1),
          (i = n.options.slidesToScroll * -1),
          (r = n.slideCount * 2));
      t < r;

    )
      u.push(t),
        (t = i + n.options.slidesToScroll),
        (i +=
          n.options.slidesToScroll <= n.options.slidesToShow
            ? n.options.slidesToScroll
            : n.options.slidesToShow);
    return u;
  };
  t.prototype.getSlick = function () {
    return this;
  };
  t.prototype.getSlideCount = function () {
    var t = this,
      i,
      r;
    return (
      (r =
        t.options.centerMode === !0
          ? t.slideWidth * Math.floor(t.options.slidesToShow / 2)
          : 0),
      t.options.swipeToSlide === !0
        ? (t.$slideTrack.find(".slick-slide").each(function (u, f) {
            if (f.offsetLeft - r + n(f).outerWidth() / 2 > t.swipeLeft * -1)
              return (i = f), !1;
          }),
          Math.abs(n(i).attr("data-slick-index") - t.currentSlide) || 1)
        : t.options.slidesToScroll
    );
  };
  t.prototype.goTo = t.prototype.slickGoTo = function (n, t) {
    var i = this;
    i.changeSlide(
      {
        data: {
          message: "index",
          index: parseInt(n),
        },
      },
      t
    );
  };
  t.prototype.init = function (t) {
    var i = this;
    n(i.$slider).hasClass("slick-initialized") ||
      (n(i.$slider).addClass("slick-initialized"),
      i.buildRows(),
      i.buildOut(),
      i.setProps(),
      i.startLoad(),
      i.loadSlider(),
      i.initializeEvents(),
      i.updateArrows(),
      i.updateDots(),
      i.checkResponsive(!0),
      i.focusHandler());
    t && i.$slider.trigger("init", [i]);
    i.options.accessibility === !0 && i.initADA();
    i.options.autoplay && ((i.paused = !1), i.autoPlay());
  };
  t.prototype.initADA = function () {
    var t = this;
    t.$slides
      .add(t.$slideTrack.find(".slick-cloned"))
      .attr({
        "aria-hidden": "true",
        tabindex: "-1",
      })
      .find("a, input, button, select")
      .attr({
        tabindex: "-1",
      });
    t.$slideTrack.attr("role", "listbox");
    t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function (i) {
      n(this).attr({
        role: "option",
        "aria-describedby": "slick-slide" + t.instanceUid + i + "",
      });
    });
    t.$dots !== null &&
      t.$dots
        .attr("role", "tablist")
        .find("li")
        .each(function (i) {
          n(this).attr({
            role: "presentation",
            "aria-selected": "false",
            "aria-controls": "navigation" + t.instanceUid + i + "",
            id: "slick-slide" + t.instanceUid + i + "",
          });
        })
        .first()
        .attr("aria-selected", "true")
        .end()
        .find("button")
        .attr("role", "button")
        .end()
        .closest("div")
        .attr("role", "toolbar");
    t.activateADA();
  };
  t.prototype.initArrowEvents = function () {
    var n = this;
    if (n.options.arrows === !0 && n.slideCount > n.options.slidesToShow) {
      n.$prevArrow.off("click.slick").on(
        "click.slick",
        {
          message: "previous",
        },
        n.changeSlide
      );
      n.$nextArrow.off("click.slick").on(
        "click.slick",
        {
          message: "next",
        },
        n.changeSlide
      );
    }
  };
  t.prototype.initDotEvents = function () {
    var t = this;
    if (t.options.dots === !0 && t.slideCount > t.options.slidesToShow)
      n("li", t.$dots).on(
        "click.slick",
        {
          message: "index",
        },
        t.changeSlide
      );
    if (t.options.dots === !0 && t.options.pauseOnDotsHover === !0)
      n("li", t.$dots)
        .on("mouseenter.slick", n.proxy(t.interrupt, t, !0))
        .on("mouseleave.slick", n.proxy(t.interrupt, t, !1));
  };
  t.prototype.initSlideEvents = function () {
    var t = this;
    if (t.options.pauseOnHover) {
      t.$list.on("mouseenter.slick", n.proxy(t.interrupt, t, !0));
      t.$list.on("mouseleave.slick", n.proxy(t.interrupt, t, !1));
    }
  };
  t.prototype.initializeEvents = function () {
    var t = this;
    t.initArrowEvents();
    t.initDotEvents();
    t.initSlideEvents();
    t.$list.on(
      "touchstart.slick mousedown.slick",
      {
        action: "start",
      },
      t.swipeHandler
    );
    t.$list.on(
      "touchmove.slick mousemove.slick",
      {
        action: "move",
      },
      t.swipeHandler
    );
    t.$list.on(
      "touchend.slick mouseup.slick",
      {
        action: "end",
      },
      t.swipeHandler
    );
    t.$list.on(
      "touchcancel.slick mouseleave.slick",
      {
        action: "end",
      },
      t.swipeHandler
    );
    t.$list.on("click.slick", t.clickHandler);
    n(document).on(t.visibilityChange, n.proxy(t.visibility, t));
    if (t.options.accessibility === !0)
      t.$list.on("keydown.slick", t.keyHandler);
    if (t.options.focusOnSelect === !0)
      n(t.$slideTrack).children().on("click.slick", t.selectHandler);
    n(window).on(
      "orientationchange.slick.slick-" + t.instanceUid,
      n.proxy(t.orientationChange, t)
    );
    n(window).on("resize.slick.slick-" + t.instanceUid, n.proxy(t.resize, t));
    n("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault);
    n(window).on("load.slick.slick-" + t.instanceUid, t.setPosition);
    n(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition);
  };
  t.prototype.initUI = function () {
    var n = this;
    n.options.arrows === !0 &&
      n.slideCount > n.options.slidesToShow &&
      (n.$prevArrow.show(), n.$nextArrow.show());
    n.options.dots === !0 &&
      n.slideCount > n.options.slidesToShow &&
      n.$dots.show();
  };
  t.prototype.keyHandler = function (n) {
    var t = this;
    n.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
      (n.keyCode === 37 && t.options.accessibility === !0
        ? t.changeSlide({
            data: {
              message: t.options.rtl === !0 ? "next" : "previous",
            },
          })
        : n.keyCode === 39 &&
          t.options.accessibility === !0 &&
          t.changeSlide({
            data: {
              message: t.options.rtl === !0 ? "previous" : "next",
            },
          }));
  };
  t.prototype.lazyLoad = function () {
    function f(i) {
      n("img[data-lazy]", i).each(function () {
        var i = n(this),
          r = n(this).attr("data-lazy"),
          u = document.createElement("img");
        u.onload = function () {
          i.animate(
            {
              opacity: 0,
            },
            100,
            function () {
              i.attr("src", r).animate(
                {
                  opacity: 1,
                },
                200,
                function () {
                  i.removeAttr("data-lazy").removeClass("slick-loading");
                }
              );
              t.$slider.trigger("lazyLoaded", [t, i, r]);
            }
          );
        };
        u.onerror = function () {
          i.removeAttr("data-lazy")
            .removeClass("slick-loading")
            .addClass("slick-lazyload-error");
          t.$slider.trigger("lazyLoadError", [t, i, r]);
        };
        u.src = r;
      });
    }
    var t = this,
      e,
      r,
      i,
      u;
    t.options.centerMode === !0
      ? t.options.infinite === !0
        ? ((i = t.currentSlide + (t.options.slidesToShow / 2 + 1)),
          (u = i + t.options.slidesToShow + 2))
        : ((i = Math.max(0, t.currentSlide - (t.options.slidesToShow / 2 + 1))),
          (u = 2 + (t.options.slidesToShow / 2 + 1) + t.currentSlide))
      : ((i = t.options.infinite
          ? t.options.slidesToShow + t.currentSlide
          : t.currentSlide),
        (u = Math.ceil(i + t.options.slidesToShow)),
        t.options.fade === !0 && (i > 0 && i--, u <= t.slideCount && u++));
    e = t.$slider.find(".slick-slide").slice(i, u);
    f(e);
    t.slideCount <= t.options.slidesToShow
      ? ((r = t.$slider.find(".slick-slide")), f(r))
      : t.currentSlide >= t.slideCount - t.options.slidesToShow
      ? ((r = t.$slider.find(".slick-cloned").slice(0, t.options.slidesToShow)),
        f(r))
      : t.currentSlide === 0 &&
        ((r = t.$slider
          .find(".slick-cloned")
          .slice(t.options.slidesToShow * -1)),
        f(r));
  };
  t.prototype.loadSlider = function () {
    var n = this;
    n.setPosition();
    n.$slideTrack.css({
      opacity: 1,
    });
    n.$slider.removeClass("slick-loading");
    n.initUI();
    n.options.lazyLoad === "progressive" && n.progressiveLazyLoad();
  };
  t.prototype.next = t.prototype.slickNext = function () {
    var n = this;
    n.changeSlide({
      data: {
        message: "next",
      },
    });
  };
  t.prototype.orientationChange = function () {
    var n = this;
    n.checkResponsive();
    n.setPosition();
  };
  t.prototype.pause = t.prototype.slickPause = function () {
    var n = this;
    n.autoPlayClear();
    n.paused = !0;
  };
  t.prototype.play = t.prototype.slickPlay = function () {
    var n = this;
    n.autoPlay();
    n.options.autoplay = !0;
    n.paused = !1;
    n.focussed = !1;
    n.interrupted = !1;
  };
  t.prototype.postSlide = function (n) {
    var t = this;
    t.unslicked ||
      (t.$slider.trigger("afterChange", [t, n]),
      (t.animating = !1),
      t.setPosition(),
      (t.swipeLeft = null),
      t.options.autoplay && t.autoPlay(),
      t.options.accessibility === !0 && t.initADA());
  };
  t.prototype.prev = t.prototype.slickPrev = function () {
    var n = this;
    n.changeSlide({
      data: {
        message: "previous",
      },
    });
  };
  t.prototype.preventDefault = function (n) {
    n.preventDefault();
  };
  t.prototype.progressiveLazyLoad = function (t) {
    t = t || 1;
    var i = this,
      e = n("img[data-lazy]", i.$slider),
      r,
      u,
      f;
    e.length
      ? ((r = e.first()),
        (u = r.attr("data-lazy")),
        (f = document.createElement("img")),
        (f.onload = function () {
          r.attr("src", u).removeAttr("data-lazy").removeClass("slick-loading");
          i.options.adaptiveHeight === !0 && i.setPosition();
          i.$slider.trigger("lazyLoaded", [i, r, u]);
          i.progressiveLazyLoad();
        }),
        (f.onerror = function () {
          t < 3
            ? setTimeout(function () {
                i.progressiveLazyLoad(t + 1);
              }, 500)
            : (r
                .removeAttr("data-lazy")
                .removeClass("slick-loading")
                .addClass("slick-lazyload-error"),
              i.$slider.trigger("lazyLoadError", [i, r, u]),
              i.progressiveLazyLoad());
        }),
        (f.src = u))
      : i.$slider.trigger("allImagesLoaded", [i]);
  };
  t.prototype.refresh = function (t) {
    var i = this,
      r,
      u;
    u = i.slideCount - i.options.slidesToShow;
    !i.options.infinite && i.currentSlide > u && (i.currentSlide = u);
    i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0);
    r = i.currentSlide;
    i.destroy(!0);
    n.extend(i, i.initials, {
      currentSlide: r,
    });
    i.init();
    t ||
      i.changeSlide(
        {
          data: {
            message: "index",
            index: r,
          },
        },
        !1
      );
  };
  t.prototype.registerBreakpoints = function () {
    var t = this,
      u,
      f,
      i,
      r = t.options.responsive || null;
    if (n.type(r) === "array" && r.length) {
      t.respondTo = t.options.respondTo || "window";
      for (u in r)
        if (
          ((i = t.breakpoints.length - 1),
          (f = r[u].breakpoint),
          r.hasOwnProperty(u))
        ) {
          while (i >= 0)
            t.breakpoints[i] &&
              t.breakpoints[i] === f &&
              t.breakpoints.splice(i, 1),
              i--;
          t.breakpoints.push(f);
          t.breakpointSettings[f] = r[u].settings;
        }
      t.breakpoints.sort(function (n, i) {
        return t.options.mobileFirst ? n - i : i - n;
      });
    }
  };
  t.prototype.reinit = function () {
    var t = this;
    if (
      ((t.$slides = t.$slideTrack
        .children(t.options.slide)
        .addClass("slick-slide")),
      (t.slideCount = t.$slides.length),
      t.currentSlide >= t.slideCount &&
        t.currentSlide !== 0 &&
        (t.currentSlide = t.currentSlide - t.options.slidesToScroll),
      t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
      t.registerBreakpoints(),
      t.setProps(),
      t.setupInfinite(),
      t.buildArrows(),
      t.updateArrows(),
      t.initArrowEvents(),
      t.buildDots(),
      t.updateDots(),
      t.initDotEvents(),
      t.cleanUpSlideEvents(),
      t.initSlideEvents(),
      t.checkResponsive(!1, !0),
      t.options.focusOnSelect === !0)
    )
      n(t.$slideTrack).children().on("click.slick", t.selectHandler);
    t.setSlideClasses(typeof t.currentSlide == "number" ? t.currentSlide : 0);
    t.setPosition();
    t.focusHandler();
    t.paused = !t.options.autoplay;
    t.autoPlay();
    t.$slider.trigger("reInit", [t]);
  };
  t.prototype.resize = function () {
    var t = this;
    n(window).width() !== t.windowWidth &&
      (clearTimeout(t.windowDelay),
      (t.windowDelay = window.setTimeout(function () {
        t.windowWidth = n(window).width();
        t.checkResponsive();
        t.unslicked || t.setPosition();
      }, 50)));
  };
  t.prototype.removeSlide = t.prototype.slickRemove = function (n, t, i) {
    var r = this;
    if (
      (typeof n == "boolean"
        ? ((t = n), (n = t === !0 ? 0 : r.slideCount - 1))
        : (n = t === !0 ? --n : n),
      r.slideCount < 1 || n < 0 || n > r.slideCount - 1)
    )
      return !1;
    r.unload();
    i === !0
      ? r.$slideTrack.children().remove()
      : r.$slideTrack.children(this.options.slide).eq(n).remove();
    r.$slides = r.$slideTrack.children(this.options.slide);
    r.$slideTrack.children(this.options.slide).detach();
    r.$slideTrack.append(r.$slides);
    r.$slidesCache = r.$slides;
    r.reinit();
  };
  t.prototype.setCSS = function (n) {
    var t = this,
      i = {},
      r,
      u;
    t.options.rtl === !0 && (n = -n);
    r = t.positionProp == "left" ? Math.ceil(n) + "px" : "0px";
    u = t.positionProp == "top" ? Math.ceil(n) + "px" : "0px";
    i[t.positionProp] = n;
    t.transformsEnabled === !1
      ? t.$slideTrack.css(i)
      : ((i = {}),
        t.cssTransitions === !1
          ? ((i[t.animType] = "translate(" + r + ", " + u + ")"),
            t.$slideTrack.css(i))
          : ((i[t.animType] = "translate3d(" + r + ", " + u + ", 0px)"),
            t.$slideTrack.css(i)));
  };
  t.prototype.setDimensions = function () {
    var n = this,
      t;
    n.options.vertical === !1
      ? n.options.centerMode === !0 &&
        n.$list.css({
          padding: "0px " + n.options.centerPadding,
        })
      : (n.$list.height(
          n.$slides.first().outerHeight(!0) * n.options.slidesToShow
        ),
        n.options.centerMode === !0 &&
          n.$list.css({
            padding: n.options.centerPadding + " 0px",
          }));
    n.listWidth = n.$list.width();
    n.listHeight = n.$list.height();
    n.options.vertical === !1 && n.options.variableWidth === !1
      ? ((n.slideWidth = Math.ceil(n.listWidth / n.options.slidesToShow)),
        n.$slideTrack.width(
          Math.ceil(
            n.slideWidth * n.$slideTrack.children(".slick-slide").length
          )
        ))
      : n.options.variableWidth === !0
      ? n.$slideTrack.width(5e3 * n.slideCount)
      : ((n.slideWidth = Math.ceil(n.listWidth)),
        n.$slideTrack.height(
          Math.ceil(
            n.$slides.first().outerHeight(!0) *
              n.$slideTrack.children(".slick-slide").length
          )
        ));
    t = n.$slides.first().outerWidth(!0) - n.$slides.first().width();
    n.options.variableWidth === !1 &&
      n.$slideTrack.children(".slick-slide").width(n.slideWidth - t);
  };
  t.prototype.setFade = function () {
    var t = this,
      i;
    t.$slides.each(function (r, u) {
      i = t.slideWidth * r * -1;
      t.options.rtl === !0
        ? n(u).css({
            position: "relative",
            right: i,
            top: 0,
            zIndex: t.options.zIndex - 2,
            opacity: 0,
          })
        : n(u).css({
            position: "relative",
            left: i,
            top: 0,
            zIndex: t.options.zIndex - 2,
            opacity: 0,
          });
    });
    t.$slides.eq(t.currentSlide).css({
      zIndex: t.options.zIndex - 1,
      opacity: 1,
    });
  };
  t.prototype.setHeight = function () {
    var n = this,
      t;
    n.options.slidesToShow === 1 &&
      n.options.adaptiveHeight === !0 &&
      n.options.vertical === !1 &&
      ((t = n.$slides.eq(n.currentSlide).outerHeight(!0)),
      n.$list.css("height", t));
  };
  t.prototype.setOption = t.prototype.slickSetOption = function () {
    var t = this,
      u,
      f,
      e,
      i,
      o = !1,
      r;
    if (
      (n.type(arguments[0]) === "object"
        ? ((e = arguments[0]), (o = arguments[1]), (r = "multiple"))
        : n.type(arguments[0]) === "string" &&
          ((e = arguments[0]),
          (i = arguments[1]),
          (o = arguments[2]),
          arguments[0] === "responsive" && n.type(arguments[1]) === "array"
            ? (r = "responsive")
            : typeof arguments[1] != "undefined" && (r = "single")),
      r === "single")
    )
      t.options[e] = i;
    else if (r === "multiple")
      n.each(e, function (n, i) {
        t.options[n] = i;
      });
    else if (r === "responsive")
      for (f in i)
        if (n.type(t.options.responsive) !== "array")
          t.options.responsive = [i[f]];
        else {
          for (u = t.options.responsive.length - 1; u >= 0; )
            t.options.responsive[u].breakpoint === i[f].breakpoint &&
              t.options.responsive.splice(u, 1),
              u--;
          t.options.responsive.push(i[f]);
        }
    o && (t.unload(), t.reinit());
  };
  t.prototype.setPosition = function () {
    var n = this;
    n.setDimensions();
    n.setHeight();
    n.options.fade === !1 ? n.setCSS(n.getLeft(n.currentSlide)) : n.setFade();
    n.$slider.trigger("setPosition", [n]);
  };
  t.prototype.setProps = function () {
    var n = this,
      t = document.body.style;
    n.positionProp = n.options.vertical === !0 ? "top" : "left";
    n.positionProp === "top"
      ? n.$slider.addClass("slick-vertical")
      : n.$slider.removeClass("slick-vertical");
    (t.WebkitTransition !== undefined ||
      t.MozTransition !== undefined ||
      t.msTransition !== undefined) &&
      n.options.useCSS === !0 &&
      (n.cssTransitions = !0);
    n.options.fade &&
      (typeof n.options.zIndex == "number"
        ? n.options.zIndex < 3 && (n.options.zIndex = 3)
        : (n.options.zIndex = n.defaults.zIndex));
    t.OTransform !== undefined &&
      ((n.animType = "OTransform"),
      (n.transformType = "-o-transform"),
      (n.transitionType = "OTransition"),
      t.perspectiveProperty === undefined &&
        t.webkitPerspective === undefined &&
        (n.animType = !1));
    t.MozTransform !== undefined &&
      ((n.animType = "MozTransform"),
      (n.transformType = "-moz-transform"),
      (n.transitionType = "MozTransition"),
      t.perspectiveProperty === undefined &&
        t.MozPerspective === undefined &&
        (n.animType = !1));
    t.webkitTransform !== undefined &&
      ((n.animType = "webkitTransform"),
      (n.transformType = "-webkit-transform"),
      (n.transitionType = "webkitTransition"),
      t.perspectiveProperty === undefined &&
        t.webkitPerspective === undefined &&
        (n.animType = !1));
    t.msTransform !== undefined &&
      ((n.animType = "msTransform"),
      (n.transformType = "-ms-transform"),
      (n.transitionType = "msTransition"),
      t.msTransform === undefined && (n.animType = !1));
    t.transform !== undefined &&
      n.animType !== !1 &&
      ((n.animType = "transform"),
      (n.transformType = "transform"),
      (n.transitionType = "transition"));
    n.transformsEnabled =
      n.options.useTransform && n.animType !== null && n.animType !== !1;
  };
  t.prototype.setSlideClasses = function (n) {
    var t = this,
      u,
      i,
      r,
      f;
    i = t.$slider
      .find(".slick-slide")
      .removeClass("slick-active slick-center slick-current")
      .attr("aria-hidden", "true");
    t.$slides.eq(n).addClass("slick-current");
    t.options.centerMode === !0
      ? ((u = Math.floor(t.options.slidesToShow / 2)),
        t.options.infinite === !0 &&
          (n >= u && n <= t.slideCount - 1 - u
            ? t.$slides
                .slice(n - u, n + u + 1)
                .addClass("slick-active")
                .attr("aria-hidden", "false")
            : ((r = t.options.slidesToShow + n),
              i
                .slice(r - u + 1, r + u + 2)
                .addClass("slick-active")
                .attr("aria-hidden", "false")),
          n === 0
            ? i
                .eq(i.length - 1 - t.options.slidesToShow)
                .addClass("slick-center")
            : n === t.slideCount - 1 &&
              i.eq(t.options.slidesToShow).addClass("slick-center")),
        t.$slides.eq(n).addClass("slick-center"))
      : n >= 0 && n <= t.slideCount - t.options.slidesToShow
      ? t.$slides
          .slice(n, n + t.options.slidesToShow)
          .addClass("slick-active")
          .attr("aria-hidden", "false")
      : i.length <= t.options.slidesToShow
      ? i.addClass("slick-active").attr("aria-hidden", "false")
      : ((f = t.slideCount % t.options.slidesToShow),
        (r = t.options.infinite === !0 ? t.options.slidesToShow + n : n),
        t.options.slidesToShow == t.options.slidesToScroll &&
        t.slideCount - n < t.options.slidesToShow
          ? i
              .slice(r - (t.options.slidesToShow - f), r + f)
              .addClass("slick-active")
              .attr("aria-hidden", "false")
          : i
              .slice(r, r + t.options.slidesToShow)
              .addClass("slick-active")
              .attr("aria-hidden", "false"));
    t.options.lazyLoad === "ondemand" && t.lazyLoad();
  };
  t.prototype.setupInfinite = function () {
    var t = this,
      i,
      r,
      u;
    if (
      (t.options.fade === !0 && (t.options.centerMode = !1),
      t.options.infinite === !0 &&
        t.options.fade === !1 &&
        ((r = null), t.slideCount > t.options.slidesToShow))
    ) {
      for (
        u =
          t.options.centerMode === !0
            ? t.options.slidesToShow + 1
            : t.options.slidesToShow,
          i = t.slideCount;
        i > t.slideCount - u;
        i -= 1
      )
        (r = i - 1),
          n(t.$slides[r])
            .clone(!0)
            .attr("id", "")
            .attr("data-slick-index", r - t.slideCount)
            .prependTo(t.$slideTrack)
            .addClass("slick-cloned");
      for (i = 0; i < u; i += 1)
        (r = i),
          n(t.$slides[r])
            .clone(!0)
            .attr("id", "")
            .attr("data-slick-index", r + t.slideCount)
            .appendTo(t.$slideTrack)
            .addClass("slick-cloned");
      t.$slideTrack
        .find(".slick-cloned")
        .find("[id]")
        .each(function () {
          n(this).attr("id", "");
        });
    }
  };
  t.prototype.interrupt = function (n) {
    var t = this;
    n || t.autoPlay();
    t.interrupted = n;
  };
  t.prototype.selectHandler = function (t) {
    var i = this,
      u = n(t.target).is(".slick-slide")
        ? n(t.target)
        : n(t.target).parents(".slick-slide"),
      r = parseInt(u.attr("data-slick-index"));
    if ((r || (r = 0), i.slideCount <= i.options.slidesToShow)) {
      i.setSlideClasses(r);
      i.asNavFor(r);
      return;
    }
    i.slideHandler(r);
  };
  t.prototype.slideHandler = function (n, t, i) {
    var u,
      f,
      s,
      o,
      h = null,
      r = this,
      e;
    if (
      ((t = t || !1), r.animating !== !0 || r.options.waitForAnimate !== !0) &&
      (r.options.fade !== !0 || r.currentSlide !== n) &&
      !(r.slideCount <= r.options.slidesToShow)
    ) {
      if (
        (t === !1 && r.asNavFor(n),
        (u = n),
        (h = r.getLeft(u)),
        (o = r.getLeft(r.currentSlide)),
        (r.currentLeft = r.swipeLeft === null ? o : r.swipeLeft),
        r.options.infinite === !1 &&
          r.options.centerMode === !1 &&
          (n < 0 || n > r.getDotCount() * r.options.slidesToScroll))
      ) {
        r.options.fade === !1 &&
          ((u = r.currentSlide),
          i !== !0
            ? r.animateSlide(o, function () {
                r.postSlide(u);
              })
            : r.postSlide(u));
        return;
      }
      if (
        r.options.infinite === !1 &&
        r.options.centerMode === !0 &&
        (n < 0 || n > r.slideCount - r.options.slidesToScroll)
      ) {
        r.options.fade === !1 &&
          ((u = r.currentSlide),
          i !== !0
            ? r.animateSlide(o, function () {
                r.postSlide(u);
              })
            : r.postSlide(u));
        return;
      }
      if (
        (r.options.autoplay && clearInterval(r.autoPlayTimer),
        (f =
          u < 0
            ? r.slideCount % r.options.slidesToScroll != 0
              ? r.slideCount - (r.slideCount % r.options.slidesToScroll)
              : r.slideCount + u
            : u >= r.slideCount
            ? r.slideCount % r.options.slidesToScroll != 0
              ? 0
              : u - r.slideCount
            : u),
        (r.animating = !0),
        r.$slider.trigger("beforeChange", [r, r.currentSlide, f]),
        (s = r.currentSlide),
        (r.currentSlide = f),
        r.setSlideClasses(r.currentSlide),
        r.options.asNavFor &&
          ((e = r.getNavTarget()),
          (e = e.slick("getSlick")),
          e.slideCount <= e.options.slidesToShow &&
            e.setSlideClasses(r.currentSlide)),
        r.updateDots(),
        r.updateArrows(),
        r.options.fade === !0)
      ) {
        i !== !0
          ? (r.fadeSlideOut(s),
            r.fadeSlide(f, function () {
              r.postSlide(f);
            }))
          : r.postSlide(f);
        r.animateHeight();
        return;
      }
      i !== !0
        ? r.animateSlide(h, function () {
            r.postSlide(f);
          })
        : r.postSlide(f);
    }
  };
  t.prototype.startLoad = function () {
    var n = this;
    n.options.arrows === !0 &&
      n.slideCount > n.options.slidesToShow &&
      (n.$prevArrow.hide(), n.$nextArrow.hide());
    n.options.dots === !0 &&
      n.slideCount > n.options.slidesToShow &&
      n.$dots.hide();
    n.$slider.addClass("slick-loading");
  };
  t.prototype.swipeDirection = function () {
    var i,
      r,
      u,
      n,
      t = this;
    return ((i = t.touchObject.startX - t.touchObject.curX),
    (r = t.touchObject.startY - t.touchObject.curY),
    (u = Math.atan2(r, i)),
    (n = Math.round((u * 180) / Math.PI)),
    n < 0 && (n = 360 - Math.abs(n)),
    n <= 45 && n >= 0)
      ? t.options.rtl === !1
        ? "left"
        : "right"
      : n <= 360 && n >= 315
      ? t.options.rtl === !1
        ? "left"
        : "right"
      : n >= 135 && n <= 225
      ? t.options.rtl === !1
        ? "right"
        : "left"
      : t.options.verticalSwiping === !0
      ? n >= 35 && n <= 135
        ? "down"
        : "up"
      : "vertical";
  };
  t.prototype.swipeEnd = function () {
    var n = this,
      i,
      t;
    if (
      ((n.dragging = !1),
      (n.interrupted = !1),
      (n.shouldClick = n.touchObject.swipeLength > 10 ? !1 : !0),
      n.touchObject.curX === undefined)
    )
      return !1;
    if (
      (n.touchObject.edgeHit === !0 &&
        n.$slider.trigger("edge", [n, n.swipeDirection()]),
      n.touchObject.swipeLength >= n.touchObject.minSwipe)
    ) {
      t = n.swipeDirection();
      switch (t) {
        case "left":
        case "down":
          i = n.options.swipeToSlide
            ? n.checkNavigable(n.currentSlide + n.getSlideCount())
            : n.currentSlide + n.getSlideCount();
          n.currentDirection = 0;
          break;
        case "right":
        case "up":
          i = n.options.swipeToSlide
            ? n.checkNavigable(n.currentSlide - n.getSlideCount())
            : n.currentSlide - n.getSlideCount();
          n.currentDirection = 1;
      }
      t != "vertical" &&
        (n.slideHandler(i),
        (n.touchObject = {}),
        n.$slider.trigger("swipe", [n, t]));
    } else
      n.touchObject.startX !== n.touchObject.curX &&
        (n.slideHandler(n.currentSlide), (n.touchObject = {}));
  };
  t.prototype.swipeHandler = function (n) {
    var t = this;
    if (
      t.options.swipe !== !1 &&
      (!("ontouchend" in document) || t.options.swipe !== !1) &&
      (t.options.draggable !== !1 || n.type.indexOf("mouse") === -1)
    ) {
      t.touchObject.fingerCount =
        n.originalEvent && n.originalEvent.touches !== undefined
          ? n.originalEvent.touches.length
          : 1;
      t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold;
      t.options.verticalSwiping === !0 &&
        (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold);
      switch (n.data.action) {
        case "start":
          t.swipeStart(n);
          break;
        case "move":
          t.swipeMove(n);
          break;
        case "end":
          t.swipeEnd(n);
      }
    }
  };
  t.prototype.swipeMove = function (n) {
    var t = this,
      f,
      e,
      r,
      u,
      i;
    if (
      ((i = n.originalEvent !== undefined ? n.originalEvent.touches : null),
      !t.dragging || (i && i.length !== 1))
    )
      return !1;
    if (
      ((f = t.getLeft(t.currentSlide)),
      (t.touchObject.curX = i !== undefined ? i[0].pageX : n.clientX),
      (t.touchObject.curY = i !== undefined ? i[0].pageY : n.clientY),
      (t.touchObject.swipeLength = Math.round(
        Math.sqrt(Math.pow(t.touchObject.curX - t.touchObject.startX, 2))
      )),
      t.options.verticalSwiping === !0 &&
        (t.touchObject.swipeLength = Math.round(
          Math.sqrt(Math.pow(t.touchObject.curY - t.touchObject.startY, 2))
        )),
      (e = t.swipeDirection()),
      e !== "vertical")
    ) {
      if (
        (n.originalEvent !== undefined &&
          t.touchObject.swipeLength > 4 &&
          n.preventDefault(),
        (u =
          (t.options.rtl === !1 ? 1 : -1) *
          (t.touchObject.curX > t.touchObject.startX ? 1 : -1)),
        t.options.verticalSwiping === !0 &&
          (u = t.touchObject.curY > t.touchObject.startY ? 1 : -1),
        (r = t.touchObject.swipeLength),
        (t.touchObject.edgeHit = !1),
        t.options.infinite === !1 &&
          ((t.currentSlide === 0 && e === "right") ||
            (t.currentSlide >= t.getDotCount() && e === "left")) &&
          ((r = t.touchObject.swipeLength * t.options.edgeFriction),
          (t.touchObject.edgeHit = !0)),
        (t.swipeLeft =
          t.options.vertical === !1
            ? f + r * u
            : f + r * (t.$list.height() / t.listWidth) * u),
        t.options.verticalSwiping === !0 && (t.swipeLeft = f + r * u),
        t.options.fade === !0 || t.options.touchMove === !1)
      )
        return !1;
      if (t.animating === !0) return (t.swipeLeft = null), !1;
      t.setCSS(t.swipeLeft);
    }
  };
  t.prototype.swipeStart = function (n) {
    var t = this,
      i;
    if (
      ((t.interrupted = !0),
      t.touchObject.fingerCount !== 1 || t.slideCount <= t.options.slidesToShow)
    )
      return (t.touchObject = {}), !1;
    n.originalEvent !== undefined &&
      n.originalEvent.touches !== undefined &&
      (i = n.originalEvent.touches[0]);
    t.touchObject.startX = t.touchObject.curX =
      i !== undefined ? i.pageX : n.clientX;
    t.touchObject.startY = t.touchObject.curY =
      i !== undefined ? i.pageY : n.clientY;
    t.dragging = !0;
  };
  t.prototype.unfilterSlides = t.prototype.slickUnfilter = function () {
    var n = this;
    n.$slidesCache !== null &&
      (n.unload(),
      n.$slideTrack.children(this.options.slide).detach(),
      n.$slidesCache.appendTo(n.$slideTrack),
      n.reinit());
  };
  t.prototype.unload = function () {
    var t = this;
    n(".slick-cloned", t.$slider).remove();
    t.$dots && t.$dots.remove();
    t.$prevArrow &&
      t.htmlExpr.test(t.options.prevArrow) &&
      t.$prevArrow.remove();
    t.$nextArrow &&
      t.htmlExpr.test(t.options.nextArrow) &&
      t.$nextArrow.remove();
    t.$slides
      .removeClass("slick-slide slick-active slick-visible slick-current")
      .attr("aria-hidden", "true")
      .css("width", "");
  };
  t.prototype.unslick = function (n) {
    var t = this;
    t.$slider.trigger("unslick", [t, n]);
    t.destroy();
  };
  t.prototype.updateArrows = function () {
    var n = this,
      t;
    t = Math.floor(n.options.slidesToShow / 2);
    n.options.arrows === !0 &&
      n.slideCount > n.options.slidesToShow &&
      !n.options.infinite &&
      (n.$prevArrow
        .removeClass("slick-disabled")
        .attr("aria-disabled", "false"),
      n.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
      n.currentSlide === 0
        ? (n.$prevArrow
            .addClass("slick-disabled")
            .attr("aria-disabled", "true"),
          n.$nextArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"))
        : n.currentSlide >= n.slideCount - n.options.slidesToShow &&
          n.options.centerMode === !1
        ? (n.$nextArrow
            .addClass("slick-disabled")
            .attr("aria-disabled", "true"),
          n.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"))
        : n.currentSlide >= n.slideCount - 1 &&
          n.options.centerMode === !0 &&
          (n.$nextArrow
            .addClass("slick-disabled")
            .attr("aria-disabled", "true"),
          n.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false")));
  };
  t.prototype.updateDots = function () {
    var n = this;
    n.$dots !== null &&
      (n.$dots
        .find("li")
        .removeClass("slick-active")
        .attr("aria-hidden", "true"),
      n.$dots
        .find("li")
        .eq(Math.floor(n.currentSlide / n.options.slidesToScroll))
        .addClass("slick-active")
        .attr("aria-hidden", "false"));
  };
  t.prototype.visibility = function () {
    var n = this;
    n.options.autoplay && (n.interrupted = document[n.hidden] ? !0 : !1);
  };
  n.fn.slick = function () {
    for (
      var i = this,
        r = arguments[0],
        f = Array.prototype.slice.call(arguments, 1),
        e = i.length,
        u,
        n = 0;
      n < e;
      n++
    )
      if (
        (typeof r == "object" || typeof r == "undefined"
          ? (i[n].slick = new t(i[n], r))
          : (u = i[n].slick[r].apply(i[n].slick, f)),
        typeof u != "undefined")
      )
        return u;
    return i;
  };
});
slidebars = function () {
  var e = $("[canvas]"),
    n = {},
    t = !1,
    u = !1,
    o = ["top", "right", "bottom", "left"],
    s = ["reveal", "push", "overlay", "shift"],
    f = function (t) {
      var i = $(),
        r = "0px, 0px",
        u = 1e3 * parseFloat(n[t].element.css("transitionDuration"), 10);
      return (
        ("reveal" === n[t].style ||
          "push" === n[t].style ||
          "shift" === n[t].style) &&
          (i = i.add(e)),
        ("push" === n[t].style ||
          "overlay" === n[t].style ||
          "shift" === n[t].style) &&
          (i = i.add(n[t].element)),
        n[t].active &&
          ("top" === n[t].side
            ? (r = "0px, " + n[t].element.css("height"))
            : "right" === n[t].side
            ? (r = "-" + n[t].element.css("width") + ", 0px")
            : "bottom" === n[t].side
            ? (r = "0px, -" + n[t].element.css("height"))
            : "left" === n[t].side &&
              (r = n[t].element.css("width") + ", 0px")),
        {
          elements: i,
          amount: r,
          duration: u,
        }
      );
    },
    h = function (t, r, u, f) {
      return i(t)
        ? !1
        : void (n[t] = {
            id: t,
            side: r,
            style: u,
            element: f,
            active: !1,
          });
    },
    i = function (t) {
      return n.hasOwnProperty(t) ? !0 : !1;
    },
    r;
  this.init = function (n) {
    return t
      ? !1
      : (u ||
          ($("[off-canvas]").each(function () {
            var n = $(this).attr("off-canvas").split(" ", 3);
            return n && n[0] && -1 !== o.indexOf(n[1]) && -1 !== s.indexOf(n[2])
              ? void h(n[0], n[1], n[2], $(this))
              : !1;
          }),
          (u = !0)),
        (t = !0),
        this.css(),
        $(r).trigger("init"),
        void ("function" == typeof n && n()));
  };
  this.exit = function (n) {
    if (!t) return !1;
    var i = function () {
      t = !1;
      $(r).trigger("exit");
      "function" == typeof n && n();
    };
    this.getActiveSlidebar() ? this.close(i) : i();
  };
  this.css = function (u) {
    var f, e;
    if (!t) return !1;
    for (f in n)
      i(f) &&
        ((e =
          "top" === n[f].side || "bottom" === n[f].side
            ? n[f].element.css("height")
            : n[f].element.css("width")),
        ("push" === n[f].style ||
          "overlay" === n[f].style ||
          "shift" === n[f].style) &&
          n[f].element.css("margin-" + n[f].side, "-" + e));
    this.getActiveSlidebar() && this.open(this.getActiveSlidebar());
    $(r).trigger("css");
    "function" == typeof u && u();
  };
  this.open = function (u, e) {
    if (!t || !u || !i(u)) return !1;
    var o = function () {
      n[u].active = !0;
      n[u].element.css("display", "block");
      $(r).trigger("opening", [n[u].id]);
      var t = f(u);
      t.elements.css({
        "transition-duration": t.duration + "ms",
        transform: "translate(" + t.amount + ")",
      });
      setTimeout(function () {
        $(r).trigger("opened", [n[u].id]);
        "function" == typeof e && e();
      }, t.duration);
    };
    this.getActiveSlidebar() && this.getActiveSlidebar() !== u
      ? this.close(o)
      : o();
  };
  this.close = function (u, e) {
    if (("function" == typeof u && ((e = u), (u = null)), !t) || (u && !i(u)))
      return !1;
    if ((u || (u = this.getActiveSlidebar()), u && n[u].active)) {
      n[u].active = !1;
      $(r).trigger("closing", [n[u].id]);
      var o = f(u);
      o.elements.css("transform", "");
      setTimeout(function () {
        o.elements.css("transition-duration", "");
        n[u].element.css("display", "");
        $(r).trigger("closed", [n[u].id]);
        "function" == typeof e && e();
      }, o.duration);
    }
  };
  this.toggle = function (r, u) {
    return t && r && i(r)
      ? void (n[r].active
          ? this.close(r, function () {
              "function" == typeof u && u();
            })
          : this.open(r, function () {
              "function" == typeof u && u();
            }))
      : !1;
  };
  this.isActive = function () {
    return t;
  };
  this.isActiveSlidebar = function (r) {
    return t && r && i(r) ? n[r].active : !1;
  };
  this.getActiveSlidebar = function () {
    var u, r;
    if (!t) return !1;
    u = !1;
    for (r in n)
      if (i(r) && n[r].active) {
        u = n[r].id;
        break;
      }
    return u;
  };
  this.getSlidebars = function () {
    var r, u;
    if (!t) return !1;
    r = [];
    for (u in n) i(u) && r.push(n[u].id);
    return r;
  };
  this.getSlidebar = function (r) {
    return t && r && r && i(r) ? n[r] : !1;
  };
  this.events = {};
  r = this.events;
  $(window).on("resize", this.css.bind(this));
};
_gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  _gsScope._gsDefine(
    "TweenMax",
    ["core.Animation", "core.SimpleTimeline", "TweenLite"],
    function (n, t, i) {
      var s = function (n) {
          for (var i = [], r = n.length, t = 0; t !== r; i.push(n[t++]));
          return i;
        },
        l = function (n, t, i) {
          var u,
            r,
            f = n.cycle;
          for (u in f)
            (r = f[u]),
              (n[u] =
                "function" == typeof r ? r.call(t[i], i) : r[i % r.length]);
          delete n.cycle;
        },
        r = function (n, t, u) {
          i.call(this, n, t, u);
          this._cycle = 0;
          this._yoyo = this.vars.yoyo === !0;
          this._repeat = this.vars.repeat || 0;
          this._repeatDelay = this.vars.repeatDelay || 0;
          this._dirty = !0;
          this.render = r.prototype.render;
        },
        f = 1e-10,
        e = i._internals,
        a = e.isSelector,
        v = e.isArray,
        u = (r.prototype = i.to({}, 0.1, {})),
        y = [],
        o,
        h,
        c;
      return (
        (r.version = "1.18.0"),
        (u.constructor = r),
        (u.kill()._gc = !1),
        (r.killTweensOf = r.killDelayedCallsTo = i.killTweensOf),
        (r.getTweensOf = i.getTweensOf),
        (r.lagSmoothing = i.lagSmoothing),
        (r.ticker = i.ticker),
        (r.render = i.render),
        (u.invalidate = function () {
          return (
            (this._yoyo = this.vars.yoyo === !0),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            this._uncache(!0),
            i.prototype.invalidate.call(this)
          );
        }),
        (u.updateTo = function (n, t) {
          var u,
            h = this.ratio,
            f = this.vars.immediateRender || n.immediateRender,
            e,
            o,
            s,
            r;
          t &&
            this._startTime < this._timeline._time &&
            ((this._startTime = this._timeline._time),
            this._uncache(!1),
            this._gc
              ? this._enabled(!0, !1)
              : this._timeline.insert(this, this._startTime - this._delay));
          for (u in n) this.vars[u] = n[u];
          if (this._initted || f)
            if (t) (this._initted = !1), f && this.render(0, !0, !0);
            else if (
              (this._gc && this._enabled(!0, !1),
              this._notifyPluginsOfEnabled &&
                this._firstPT &&
                i._onPluginEvent("_onDisable", this),
              this._time / this._duration > 0.998)
            )
              (e = this._time),
                this.render(0, !0, !1),
                (this._initted = !1),
                this.render(e, !0, !1);
            else if (this._time > 0 || f)
              for (
                this._initted = !1,
                  this._init(),
                  s = 1 / (1 - h),
                  r = this._firstPT;
                r;

              )
                (o = r.s + r.c), (r.c *= s), (r.s = o - r.c), (r = r._next);
          return this;
        }),
        (u.render = function (n, t, i) {
          this._initted ||
            (0 === this._duration && this.vars.repeat && this.invalidate());
          var c,
            h,
            o,
            y,
            r,
            l,
            a,
            p,
            k = this._dirty ? this.totalDuration() : this._totalDuration,
            w = this._time,
            v = this._totalTime,
            b = this._cycle,
            u = this._duration,
            s = this._rawPrevTime;
          if (
            (n >= k
              ? ((this._totalTime = k),
                (this._cycle = this._repeat),
                this._yoyo && 0 != (1 & this._cycle)
                  ? ((this._time = 0),
                    (this.ratio = this._ease._calcEnd
                      ? this._ease.getRatio(0)
                      : 0))
                  : ((this._time = u),
                    (this.ratio = this._ease._calcEnd
                      ? this._ease.getRatio(1)
                      : 1)),
                this._reversed ||
                  ((c = !0),
                  (h = "onComplete"),
                  (i = i || this._timeline.autoRemoveChildren)),
                0 === u &&
                  (this._initted || !this.vars.lazy || i) &&
                  (this._startTime === this._timeline._duration && (n = 0),
                  (0 === n || 0 > s || s === f) &&
                    s !== n &&
                    ((i = !0), s > f && (h = "onReverseComplete")),
                  (this._rawPrevTime = p = !t || n || s === n ? n : f)))
              : 1e-7 > n
              ? ((this._totalTime = this._time = this._cycle = 0),
                (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
                (0 !== v || (0 === u && s > 0)) &&
                  ((h = "onReverseComplete"), (c = this._reversed)),
                0 > n &&
                  ((this._active = !1),
                  0 === u &&
                    (this._initted || !this.vars.lazy || i) &&
                    (s >= 0 && (i = !0),
                    (this._rawPrevTime = p = !t || n || s === n ? n : f))),
                this._initted || (i = !0))
              : ((this._totalTime = this._time = n),
                0 !== this._repeat &&
                  ((y = u + this._repeatDelay),
                  (this._cycle = (this._totalTime / y) >> 0),
                  0 !== this._cycle &&
                    this._cycle === this._totalTime / y &&
                    this._cycle--,
                  (this._time = this._totalTime - this._cycle * y),
                  this._yoyo &&
                    0 != (1 & this._cycle) &&
                    (this._time = u - this._time),
                  this._time > u
                    ? (this._time = u)
                    : 0 > this._time && (this._time = 0)),
                this._easeType
                  ? ((r = this._time / u),
                    (l = this._easeType),
                    (a = this._easePower),
                    (1 === l || (3 === l && r >= 0.5)) && (r = 1 - r),
                    3 === l && (r *= 2),
                    1 === a
                      ? (r *= r)
                      : 2 === a
                      ? (r *= r * r)
                      : 3 === a
                      ? (r *= r * r * r)
                      : 4 === a && (r *= r * r * r * r),
                    (this.ratio =
                      1 === l
                        ? 1 - r
                        : 2 === l
                        ? r
                        : 0.5 > this._time / u
                        ? r / 2
                        : 1 - r / 2))
                  : (this.ratio = this._ease.getRatio(this._time / u))),
            w === this._time && !i && b === this._cycle)
          )
            return (
              v !== this._totalTime &&
                this._onUpdate &&
                (t || this._callback("onUpdate")),
              void 0
            );
          if (!this._initted) {
            if ((this._init(), !this._initted || this._gc)) return;
            if (
              !i &&
              this._firstPT &&
              ((this.vars.lazy !== !1 && this._duration) ||
                (this.vars.lazy && !this._duration))
            )
              return (
                (this._time = w),
                (this._totalTime = v),
                (this._rawPrevTime = s),
                (this._cycle = b),
                e.lazyTweens.push(this),
                (this._lazy = [n, t]),
                void 0
              );
            this._time && !c
              ? (this.ratio = this._ease.getRatio(this._time / u))
              : c &&
                this._ease._calcEnd &&
                (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
          }
          for (
            this._lazy !== !1 && (this._lazy = !1),
              this._active ||
                (!this._paused &&
                  this._time !== w &&
                  n >= 0 &&
                  (this._active = !0)),
              0 === v &&
                (2 === this._initted && n > 0 && this._init(),
                this._startAt &&
                  (n >= 0
                    ? this._startAt.render(n, t, i)
                    : h || (h = "_dummyGS")),
                this.vars.onStart &&
                  (0 !== this._totalTime || 0 === u) &&
                  (t || this._callback("onStart"))),
              o = this._firstPT;
            o;

          )
            o.f
              ? o.t[o.p](o.c * this.ratio + o.s)
              : (o.t[o.p] = o.c * this.ratio + o.s),
              (o = o._next);
          this._onUpdate &&
            (0 > n &&
              this._startAt &&
              this._startTime &&
              this._startAt.render(n, t, i),
            t || ((this._totalTime !== v || c) && this._callback("onUpdate")));
          this._cycle !== b &&
            (t ||
              this._gc ||
              (this.vars.onRepeat && this._callback("onRepeat")));
          h &&
            (!this._gc || i) &&
            (0 > n &&
              this._startAt &&
              !this._onUpdate &&
              this._startTime &&
              this._startAt.render(n, t, i),
            c &&
              (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
              (this._active = !1)),
            !t && this.vars[h] && this._callback(h),
            0 === u &&
              this._rawPrevTime === f &&
              p !== f &&
              (this._rawPrevTime = 0));
        }),
        (r.to = function (n, t, i) {
          return new r(n, t, i);
        }),
        (r.from = function (n, t, i) {
          return (
            (i.runBackwards = !0),
            (i.immediateRender = 0 != i.immediateRender),
            new r(n, t, i)
          );
        }),
        (r.fromTo = function (n, t, i, u) {
          return (
            (u.startAt = i),
            (u.immediateRender =
              0 != u.immediateRender && 0 != i.immediateRender),
            new r(n, t, u)
          );
        }),
        (r.staggerTo = r.allTo = function (n, t, u, f, e, o, h) {
          f = f || 0;
          var b,
            c,
            p,
            w,
            d = u.delay || 0,
            g = [],
            nt = function () {
              u.onComplete &&
                u.onComplete.apply(u.onCompleteScope || this, arguments);
              e.apply(h || u.callbackScope || this, o || y);
            },
            tt = u.cycle,
            k = u.startAt && u.startAt.cycle;
          for (
            v(n) ||
              ("string" == typeof n && (n = i.selector(n) || n),
              a(n) && (n = s(n))),
              n = n || [],
              0 > f && ((n = s(n)), n.reverse(), (f *= -1)),
              b = n.length - 1,
              p = 0;
            b >= p;
            p++
          ) {
            c = {};
            for (w in u) c[w] = u[w];
            if ((tt && l(c, n, p), k)) {
              k = c.startAt = {};
              for (w in u.startAt) k[w] = u.startAt[w];
              l(c.startAt, n, p);
            }
            c.delay = d;
            p === b && e && (c.onComplete = nt);
            g[p] = new r(n[p], t, c);
            d += f;
          }
          return g;
        }),
        (r.staggerFrom = r.allFrom = function (n, t, i, u, f, e, o) {
          return (
            (i.runBackwards = !0),
            (i.immediateRender = 0 != i.immediateRender),
            r.staggerTo(n, t, i, u, f, e, o)
          );
        }),
        (r.staggerFromTo = r.allFromTo = function (n, t, i, u, f, e, o, s) {
          return (
            (u.startAt = i),
            (u.immediateRender =
              0 != u.immediateRender && 0 != i.immediateRender),
            r.staggerTo(n, t, u, f, e, o, s)
          );
        }),
        (r.delayedCall = function (n, t, i, u, f) {
          return new r(t, 0, {
            delay: n,
            onComplete: t,
            onCompleteParams: i,
            callbackScope: u,
            onReverseComplete: t,
            onReverseCompleteParams: i,
            immediateRender: !1,
            useFrames: f,
            overwrite: 0,
          });
        }),
        (r.set = function (n, t) {
          return new r(n, 0, t);
        }),
        (r.isTweening = function (n) {
          return i.getTweensOf(n, !0).length > 0;
        }),
        (o = function (n, t) {
          for (var u = [], f = 0, r = n._first; r; )
            r instanceof i
              ? (u[f++] = r)
              : (t && (u[f++] = r), (u = u.concat(o(r, t))), (f = u.length)),
              (r = r._next);
          return u;
        }),
        (h = r.getAllTweens = function (t) {
          return o(n._rootTimeline, t).concat(o(n._rootFramesTimeline, t));
        }),
        (r.killAll = function (n, i, r, u) {
          null == i && (i = !0);
          null == r && (r = !0);
          for (
            var o, f, s = h(0 != u), c = s.length, l = i && r && u, e = 0;
            c > e;
            e++
          )
            (f = s[e]),
              (l ||
                f instanceof t ||
                ((o = f.target === f.vars.onComplete) && r) ||
                (i && !o)) &&
                (n
                  ? f.totalTime(f._reversed ? 0 : f.totalDuration())
                  : f._enabled(!1, !1));
        }),
        (r.killChildTweensOf = function (n, t) {
          if (null != n) {
            var f,
              o,
              h,
              u,
              l,
              c = e.tweenLookup;
            if (
              ("string" == typeof n && (n = i.selector(n) || n),
              a(n) && (n = s(n)),
              v(n))
            )
              for (u = n.length; --u > -1; ) r.killChildTweensOf(n[u], t);
            else {
              f = [];
              for (h in c)
                for (o = c[h].target.parentNode; o; )
                  o === n && (f = f.concat(c[h].tweens)), (o = o.parentNode);
              for (l = f.length, u = 0; l > u; u++)
                t && f[u].totalTime(f[u].totalDuration()),
                  f[u]._enabled(!1, !1);
            }
          }
        }),
        (c = function (n, i, r, u) {
          i = i !== !1;
          r = r !== !1;
          u = u !== !1;
          for (var e, f, o = h(u), c = i && r && u, s = o.length; --s > -1; )
            (f = o[s]),
              (c ||
                f instanceof t ||
                ((e = f.target === f.vars.onComplete) && r) ||
                (i && !e)) &&
                f.paused(n);
        }),
        (r.pauseAll = function (n, t, i) {
          c(!0, n, t, i);
        }),
        (r.resumeAll = function (n, t, i) {
          c(!1, n, t, i);
        }),
        (r.globalTimeScale = function (t) {
          var r = n._rootTimeline,
            u = i.ticker.time;
          return arguments.length
            ? ((t = t || f),
              (r._startTime = u - ((u - r._startTime) * r._timeScale) / t),
              (r = n._rootFramesTimeline),
              (u = i.ticker.frame),
              (r._startTime = u - ((u - r._startTime) * r._timeScale) / t),
              (r._timeScale = n._rootTimeline._timeScale = t),
              t)
            : r._timeScale;
        }),
        (u.progress = function (n) {
          return arguments.length
            ? this.totalTime(
                this.duration() *
                  (this._yoyo && 0 != (1 & this._cycle) ? 1 - n : n) +
                  this._cycle * (this._duration + this._repeatDelay),
                !1
              )
            : this._time / this.duration();
        }),
        (u.totalProgress = function (n) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * n, !1)
            : this._totalTime / this.totalDuration();
        }),
        (u.time = function (n, t) {
          return arguments.length
            ? (this._dirty && this.totalDuration(),
              n > this._duration && (n = this._duration),
              this._yoyo && 0 != (1 & this._cycle)
                ? (n =
                    this._duration -
                    n +
                    this._cycle * (this._duration + this._repeatDelay))
                : 0 !== this._repeat &&
                  (n += this._cycle * (this._duration + this._repeatDelay)),
              this.totalTime(n, t))
            : this._time;
        }),
        (u.duration = function (t) {
          return arguments.length
            ? n.prototype.duration.call(this, t)
            : this._duration;
        }),
        (u.totalDuration = function (n) {
          return arguments.length
            ? -1 === this._repeat
              ? this
              : this.duration(
                  (n - this._repeat * this._repeatDelay) / (this._repeat + 1)
                )
            : (this._dirty &&
                ((this._totalDuration =
                  -1 === this._repeat
                    ? 999999999999
                    : this._duration * (this._repeat + 1) +
                      this._repeatDelay * this._repeat),
                (this._dirty = !1)),
              this._totalDuration);
        }),
        (u.repeat = function (n) {
          return arguments.length
            ? ((this._repeat = n), this._uncache(!0))
            : this._repeat;
        }),
        (u.repeatDelay = function (n) {
          return arguments.length
            ? ((this._repeatDelay = n), this._uncache(!0))
            : this._repeatDelay;
        }),
        (u.yoyo = function (n) {
          return arguments.length ? ((this._yoyo = n), this) : this._yoyo;
        }),
        r
      );
    },
    !0
  );
  _gsScope._gsDefine(
    "TimelineLite",
    ["core.Animation", "core.SimpleTimeline", "TweenLite"],
    function (n, t, i) {
      var u = function (n) {
          t.call(this, n);
          this._labels = {};
          this.autoRemoveChildren = this.vars.autoRemoveChildren === !0;
          this.smoothChildTiming = this.vars.smoothChildTiming === !0;
          this._sortChildren = !0;
          this._onUpdate = this.vars.onUpdate;
          var r,
            u,
            i = this.vars;
          for (u in i)
            (r = i[u]),
              f(r) &&
                -1 !== r.join("").indexOf("{self}") &&
                (i[u] = this._swapSelfInParams(r));
          f(i.tweens) && this.add(i.tweens, 0, i.align, i.stagger);
        },
        e = 1e-10,
        o = i._internals,
        y = (u._internals = {}),
        p = o.isSelector,
        f = o.isArray,
        h = o.lazyTweens,
        c = o.lazyRender,
        s = _gsScope._gsDefine.globals,
        l = function (n) {
          var t,
            i = {};
          for (t in n) i[t] = n[t];
          return i;
        },
        a = function (n, t, i) {
          var u,
            r,
            f = n.cycle;
          for (u in f)
            (r = f[u]),
              (n[u] =
                "function" == typeof r ? r.call(t[i], i) : r[i % r.length]);
          delete n.cycle;
        },
        w = (y.pauseCallback = function () {}),
        v = function (n) {
          for (var i = [], r = n.length, t = 0; t !== r; i.push(n[t++]));
          return i;
        },
        r = (u.prototype = new t());
      return (
        (u.version = "1.18.0"),
        (r.constructor = u),
        (r.kill()._gc = r._forcingPlayhead = r._hasPause = !1),
        (r.to = function (n, t, r, u) {
          var f = (r.repeat && s.TweenMax) || i;
          return t ? this.add(new f(n, t, r), u) : this.set(n, r, u);
        }),
        (r.from = function (n, t, r, u) {
          return this.add(((r.repeat && s.TweenMax) || i).from(n, t, r), u);
        }),
        (r.fromTo = function (n, t, r, u, f) {
          var e = (u.repeat && s.TweenMax) || i;
          return t ? this.add(e.fromTo(n, t, r, u), f) : this.set(n, u, f);
        }),
        (r.staggerTo = function (n, t, r, f, e, o, s, h) {
          var c,
            y,
            w = new u({
              onComplete: o,
              onCompleteParams: s,
              callbackScope: h,
              smoothChildTiming: this.smoothChildTiming,
            }),
            b = r.cycle;
          for (
            "string" == typeof n && (n = i.selector(n) || n),
              n = n || [],
              p(n) && (n = v(n)),
              f = f || 0,
              0 > f && ((n = v(n)), n.reverse(), (f *= -1)),
              y = 0;
            n.length > y;
            y++
          )
            (c = l(r)),
              c.startAt &&
                ((c.startAt = l(c.startAt)),
                c.startAt.cycle && a(c.startAt, n, y)),
              b && a(c, n, y),
              w.to(n[y], t, c, y * f);
          return this.add(w, e);
        }),
        (r.staggerFrom = function (n, t, i, r, u, f, e, o) {
          return (
            (i.immediateRender = 0 != i.immediateRender),
            (i.runBackwards = !0),
            this.staggerTo(n, t, i, r, u, f, e, o)
          );
        }),
        (r.staggerFromTo = function (n, t, i, r, u, f, e, o, s) {
          return (
            (r.startAt = i),
            (r.immediateRender =
              0 != r.immediateRender && 0 != i.immediateRender),
            this.staggerTo(n, t, r, u, f, e, o, s)
          );
        }),
        (r.call = function (n, t, r, u) {
          return this.add(i.delayedCall(0, n, t, r), u);
        }),
        (r.set = function (n, t, r) {
          return (
            (r = this._parseTimeOrLabel(r, 0, !0)),
            null == t.immediateRender &&
              (t.immediateRender = r === this._time && !this._paused),
            this.add(new i(n, 0, t), r)
          );
        }),
        (u.exportRoot = function (n, t) {
          n = n || {};
          null == n.smoothChildTiming && (n.smoothChildTiming = !0);
          var r,
            o,
            f = new u(n),
            e = f._timeline;
          for (
            null == t && (t = !0),
              e._remove(f, !0),
              f._startTime = 0,
              f._rawPrevTime = f._time = f._totalTime = e._time,
              r = e._first;
            r;

          )
            (o = r._next),
              (t && r instanceof i && r.target === r.vars.onComplete) ||
                f.add(r, r._startTime - r._delay),
              (r = o);
          return e.add(f, 0), f;
        }),
        (r.add = function (r, e, o, s) {
          var l, v, a, h, c, y;
          if (
            ("number" != typeof e && (e = this._parseTimeOrLabel(e, 0, !0, r)),
            !(r instanceof n))
          ) {
            if (r instanceof Array || (r && r.push && f(r))) {
              for (
                o = o || "normal", s = s || 0, l = e, v = r.length, a = 0;
                v > a;
                a++
              )
                f((h = r[a])) &&
                  (h = new u({
                    tweens: h,
                  })),
                  this.add(h, l),
                  "string" != typeof h &&
                    "function" != typeof h &&
                    ("sequence" === o
                      ? (l = h._startTime + h.totalDuration() / h._timeScale)
                      : "start" === o && (h._startTime -= h.delay())),
                  (l += s);
              return this._uncache(!0);
            }
            if ("string" == typeof r) return this.addLabel(r, e);
            if ("function" != typeof r)
              throw (
                "Cannot add " +
                r +
                " into the timeline; it is not a tween, timeline, function, or string."
              );
            r = i.delayedCall(0, r);
          }
          if (
            (t.prototype.add.call(this, r, e),
            (this._gc || this._time === this._duration) &&
              !this._paused &&
              this._duration < this.duration())
          )
            for (c = this, y = c.rawTime() > r._startTime; c._timeline; )
              y && c._timeline.smoothChildTiming
                ? c.totalTime(c._totalTime, !0)
                : c._gc && c._enabled(!0, !1),
                (c = c._timeline);
          return this;
        }),
        (r.remove = function (t) {
          var r, i;
          if (t instanceof n)
            return (
              this._remove(t, !1),
              (r = t._timeline = t.vars.useFrames
                ? n._rootFramesTimeline
                : n._rootTimeline),
              (t._startTime =
                (t._paused ? t._pauseTime : r._time) -
                (t._reversed
                  ? t.totalDuration() - t._totalTime
                  : t._totalTime) /
                  t._timeScale),
              this
            );
          if (t instanceof Array || (t && t.push && f(t))) {
            for (i = t.length; --i > -1; ) this.remove(t[i]);
            return this;
          }
          return "string" == typeof t
            ? this.removeLabel(t)
            : this.kill(null, t);
        }),
        (r._remove = function (n, i) {
          t.prototype._remove.call(this, n, i);
          var r = this._last;
          return (
            r
              ? this._time > r._startTime + r._totalDuration / r._timeScale &&
                ((this._time = this.duration()),
                (this._totalTime = this._totalDuration))
              : (this._time = this._totalTime = this._duration = this._totalDuration = 0),
            this
          );
        }),
        (r.append = function (n, t) {
          return this.add(n, this._parseTimeOrLabel(null, t, !0, n));
        }),
        (r.insert = r.insertMultiple = function (n, t, i, r) {
          return this.add(n, t || 0, i, r);
        }),
        (r.appendMultiple = function (n, t, i, r) {
          return this.add(n, this._parseTimeOrLabel(null, t, !0, n), i, r);
        }),
        (r.addLabel = function (n, t) {
          return (this._labels[n] = this._parseTimeOrLabel(t)), this;
        }),
        (r.addPause = function (n, t, r, u) {
          var f = i.delayedCall(0, w, r, u || this);
          return (
            (f.vars.onComplete = f.vars.onReverseComplete = t),
            (f.data = "isPause"),
            (this._hasPause = !0),
            this.add(f, n)
          );
        }),
        (r.removeLabel = function (n) {
          return delete this._labels[n], this;
        }),
        (r.getLabelTime = function (n) {
          return null != this._labels[n] ? this._labels[n] : -1;
        }),
        (r._parseTimeOrLabel = function (t, i, r, u) {
          var e;
          if (u instanceof n && u.timeline === this) this.remove(u);
          else if (u && (u instanceof Array || (u.push && f(u))))
            for (e = u.length; --e > -1; )
              u[e] instanceof n && u[e].timeline === this && this.remove(u[e]);
          if ("string" == typeof i)
            return this._parseTimeOrLabel(
              i,
              r && "number" == typeof t && null == this._labels[i]
                ? t - this.duration()
                : 0,
              r
            );
          if (
            ((i = i || 0),
            "string" == typeof t && (isNaN(t) || null != this._labels[t]))
          ) {
            if (((e = t.indexOf("=")), -1 === e))
              return null == this._labels[t]
                ? r
                  ? (this._labels[t] = this.duration() + i)
                  : i
                : this._labels[t] + i;
            i = parseInt(t.charAt(e - 1) + "1", 10) * Number(t.substr(e + 1));
            t =
              e > 1
                ? this._parseTimeOrLabel(t.substr(0, e - 1), 0, r)
                : this.duration();
          } else null == t && (t = this.duration());
          return Number(t) + i;
        }),
        (r.seek = function (n, t) {
          return this.totalTime(
            "number" == typeof n ? n : this._parseTimeOrLabel(n),
            t !== !1
          );
        }),
        (r.stop = function () {
          return this.paused(!0);
        }),
        (r.gotoAndPlay = function (n, t) {
          return this.play(n, t);
        }),
        (r.gotoAndStop = function (n, t) {
          return this.pause(n, t);
        }),
        (r.render = function (n, t, i) {
          this._gc && this._enabled(!0, !1);
          var r,
            s,
            a,
            f,
            l,
            u,
            v = this._dirty ? this.totalDuration() : this._totalDuration,
            o = this._time,
            p = this._startTime,
            w = this._timeScale,
            y = this._paused;
          if (n >= v)
            (this._totalTime = this._time = v),
              this._reversed ||
                this._hasPausedChild() ||
                ((s = !0),
                (f = "onComplete"),
                (l = !!this._timeline.autoRemoveChildren),
                0 === this._duration &&
                  (0 === n ||
                    0 > this._rawPrevTime ||
                    this._rawPrevTime === e) &&
                  this._rawPrevTime !== n &&
                  this._first &&
                  ((l = !0),
                  this._rawPrevTime > e && (f = "onReverseComplete"))),
              (this._rawPrevTime =
                this._duration || !t || n || this._rawPrevTime === n ? n : e),
              (n = v + 0.0001);
          else if (1e-7 > n)
            if (
              ((this._totalTime = this._time = 0),
              (0 !== o ||
                (0 === this._duration &&
                  this._rawPrevTime !== e &&
                  (this._rawPrevTime > 0 ||
                    (0 > n && this._rawPrevTime >= 0)))) &&
                ((f = "onReverseComplete"), (s = this._reversed)),
              0 > n)
            )
              (this._active = !1),
                this._timeline.autoRemoveChildren && this._reversed
                  ? ((l = s = !0), (f = "onReverseComplete"))
                  : this._rawPrevTime >= 0 && this._first && (l = !0),
                (this._rawPrevTime = n);
            else {
              if (
                ((this._rawPrevTime =
                  this._duration || !t || n || this._rawPrevTime === n ? n : e),
                0 === n && s)
              )
                for (r = this._first; r && 0 === r._startTime; )
                  r._duration || (s = !1), (r = r._next);
              n = 0;
              this._initted || (l = !0);
            }
          else {
            if (this._hasPause && !this._forcingPlayhead && !t) {
              if (n >= o)
                for (r = this._first; r && n >= r._startTime && !u; )
                  r._duration ||
                    "isPause" !== r.data ||
                    r.ratio ||
                    (0 === r._startTime && 0 === this._rawPrevTime) ||
                    (u = r),
                    (r = r._next);
              else
                for (r = this._last; r && r._startTime >= n && !u; )
                  r._duration ||
                    ("isPause" === r.data && r._rawPrevTime > 0 && (u = r)),
                    (r = r._prev);
              u &&
                ((this._time = n = u._startTime),
                (this._totalTime =
                  n + this._cycle * (this._totalDuration + this._repeatDelay)));
            }
            this._totalTime = this._time = this._rawPrevTime = n;
          }
          if ((this._time !== o && this._first) || i || l || u) {
            if (
              (this._initted || (this._initted = !0),
              this._active ||
                (!this._paused &&
                  this._time !== o &&
                  n > 0 &&
                  (this._active = !0)),
              0 === o &&
                this.vars.onStart &&
                0 !== this._time &&
                (t || this._callback("onStart")),
              this._time >= o)
            )
              for (r = this._first; r && ((a = r._next), !this._paused || y); )
                (r._active ||
                  (r._startTime <= this._time && !r._paused && !r._gc)) &&
                  (u === r && this.pause(),
                  r._reversed
                    ? r.render(
                        (r._dirty ? r.totalDuration() : r._totalDuration) -
                          (n - r._startTime) * r._timeScale,
                        t,
                        i
                      )
                    : r.render((n - r._startTime) * r._timeScale, t, i)),
                  (r = a);
            else
              for (r = this._last; r && ((a = r._prev), !this._paused || y); ) {
                if (r._active || (o >= r._startTime && !r._paused && !r._gc)) {
                  if (u === r) {
                    for (u = r._prev; u && u.endTime() > this._time; )
                      u.render(
                        u._reversed
                          ? u.totalDuration() -
                              (n - u._startTime) * u._timeScale
                          : (n - u._startTime) * u._timeScale,
                        t,
                        i
                      ),
                        (u = u._prev);
                    u = null;
                    this.pause();
                  }
                  r._reversed
                    ? r.render(
                        (r._dirty ? r.totalDuration() : r._totalDuration) -
                          (n - r._startTime) * r._timeScale,
                        t,
                        i
                      )
                    : r.render((n - r._startTime) * r._timeScale, t, i);
                }
                r = a;
              }
            this._onUpdate &&
              (t || (h.length && c(), this._callback("onUpdate")));
            f &&
              (this._gc ||
                ((p === this._startTime || w !== this._timeScale) &&
                  (0 === this._time || v >= this.totalDuration()) &&
                  (s &&
                    (h.length && c(),
                    this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                    (this._active = !1)),
                  !t && this.vars[f] && this._callback(f))));
          }
        }),
        (r._hasPausedChild = function () {
          for (var n = this._first; n; ) {
            if (n._paused || (n instanceof u && n._hasPausedChild())) return !0;
            n = n._next;
          }
          return !1;
        }),
        (r.getChildren = function (n, t, r, u) {
          u = u || -9999999999;
          for (var e = [], f = this._first, o = 0; f; )
            u > f._startTime ||
              (f instanceof i
                ? t !== !1 && (e[o++] = f)
                : (r !== !1 && (e[o++] = f),
                  n !== !1 &&
                    ((e = e.concat(f.getChildren(!0, t, r))), (o = e.length)))),
              (f = f._next);
          return e;
        }),
        (r.getTweensOf = function (n, t) {
          var r,
            u,
            f = this._gc,
            e = [],
            o = 0;
          for (
            f && this._enabled(!0, !0), r = i.getTweensOf(n), u = r.length;
            --u > -1;

          )
            (r[u].timeline === this || (t && this._contains(r[u]))) &&
              (e[o++] = r[u]);
          return f && this._enabled(!1, !0), e;
        }),
        (r.recent = function () {
          return this._recent;
        }),
        (r._contains = function (n) {
          for (var t = n.timeline; t; ) {
            if (t === this) return !0;
            t = t.timeline;
          }
          return !1;
        }),
        (r.shiftChildren = function (n, t, i) {
          i = i || 0;
          for (var u, r = this._first, f = this._labels; r; )
            r._startTime >= i && (r._startTime += n), (r = r._next);
          if (t) for (u in f) f[u] >= i && (f[u] += n);
          return this._uncache(!0);
        }),
        (r._kill = function (n, t) {
          if (!n && !t) return this._enabled(!1, !1);
          for (
            var i = t ? this.getTweensOf(t) : this.getChildren(!0, !0, !1),
              r = i.length,
              u = !1;
            --r > -1;

          )
            i[r]._kill(n, t) && (u = !0);
          return u;
        }),
        (r.clear = function (n) {
          var t = this.getChildren(!1, !0, !0),
            i = t.length;
          for (this._time = this._totalTime = 0; --i > -1; )
            t[i]._enabled(!1, !1);
          return n !== !1 && (this._labels = {}), this._uncache(!0);
        }),
        (r.invalidate = function () {
          for (var t = this._first; t; ) t.invalidate(), (t = t._next);
          return n.prototype.invalidate.call(this);
        }),
        (r._enabled = function (n, i) {
          if (n === this._gc)
            for (var r = this._first; r; ) r._enabled(n, !0), (r = r._next);
          return t.prototype._enabled.call(this, n, i);
        }),
        (r.totalTime = function () {
          this._forcingPlayhead = !0;
          var t = n.prototype.totalTime.apply(this, arguments);
          return (this._forcingPlayhead = !1), t;
        }),
        (r.duration = function (n) {
          return arguments.length
            ? (0 !== this.duration() &&
                0 !== n &&
                this.timeScale(this._duration / n),
              this)
            : (this._dirty && this.totalDuration(), this._duration);
        }),
        (r.totalDuration = function (n) {
          if (!arguments.length) {
            if (this._dirty) {
              for (var f, r, i = 0, t = this._last, u = 999999999999; t; )
                (f = t._prev),
                  t._dirty && t.totalDuration(),
                  t._startTime > u && this._sortChildren && !t._paused
                    ? this.add(t, t._startTime - t._delay)
                    : (u = t._startTime),
                  0 > t._startTime &&
                    !t._paused &&
                    ((i -= t._startTime),
                    this._timeline.smoothChildTiming &&
                      (this._startTime += t._startTime / this._timeScale),
                    this.shiftChildren(-t._startTime, !1, -9999999999),
                    (u = 0)),
                  (r = t._startTime + t._totalDuration / t._timeScale),
                  r > i && (i = r),
                  (t = f);
              this._duration = this._totalDuration = i;
              this._dirty = !1;
            }
            return this._totalDuration;
          }
          return (
            0 !== this.totalDuration() &&
              0 !== n &&
              this.timeScale(this._totalDuration / n),
            this
          );
        }),
        (r.paused = function (t) {
          if (!t)
            for (var i = this._first, r = this._time; i; )
              i._startTime === r &&
                "isPause" === i.data &&
                (i._rawPrevTime = 0),
                (i = i._next);
          return n.prototype.paused.apply(this, arguments);
        }),
        (r.usesFrames = function () {
          for (var t = this._timeline; t._timeline; ) t = t._timeline;
          return t === n._rootFramesTimeline;
        }),
        (r.rawTime = function () {
          return this._paused
            ? this._totalTime
            : (this._timeline.rawTime() - this._startTime) * this._timeScale;
        }),
        u
      );
    },
    !0
  );
  _gsScope._gsDefine(
    "TimelineMax",
    ["TimelineLite", "TweenLite", "easing.Ease"],
    function (n, t, i) {
      var f = function (t) {
          n.call(this, t);
          this._repeat = this.vars.repeat || 0;
          this._repeatDelay = this.vars.repeatDelay || 0;
          this._cycle = 0;
          this._yoyo = this.vars.yoyo === !0;
          this._dirty = !0;
        },
        u = 1e-10,
        e = t._internals,
        o = e.lazyTweens,
        s = e.lazyRender,
        h = new i(null, null, 1, 0),
        r = (f.prototype = new n());
      return (
        (r.constructor = f),
        (r.kill()._gc = !1),
        (f.version = "1.18.0"),
        (r.invalidate = function () {
          return (
            (this._yoyo = this.vars.yoyo === !0),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            this._uncache(!0),
            n.prototype.invalidate.call(this)
          );
        }),
        (r.addCallback = function (n, i, r, u) {
          return this.add(t.delayedCall(0, n, r, u), i);
        }),
        (r.removeCallback = function (n, t) {
          if (n)
            if (null == t) this._kill(null, n);
            else
              for (
                var i = this.getTweensOf(n, !1),
                  r = i.length,
                  u = this._parseTimeOrLabel(t);
                --r > -1;

              )
                i[r]._startTime === u && i[r]._enabled(!1, !1);
          return this;
        }),
        (r.removePause = function (t) {
          return this.removeCallback(n._internals.pauseCallback, t);
        }),
        (r.tweenTo = function (n, i) {
          i = i || {};
          var f,
            e,
            r,
            u = {
              ease: h,
              useFrames: this.usesFrames(),
              immediateRender: !1,
            };
          for (e in i) u[e] = i[e];
          return (
            (u.time = this._parseTimeOrLabel(n)),
            (f =
              Math.abs(Number(u.time) - this._time) / this._timeScale || 0.001),
            (r = new t(this, f, u)),
            (u.onStart = function () {
              r.target.paused(!0);
              r.vars.time !== r.target.time() &&
                f === r.duration() &&
                r.duration(
                  Math.abs(r.vars.time - r.target.time()) / r.target._timeScale
                );
              i.onStart && r._callback("onStart");
            }),
            r
          );
        }),
        (r.tweenFromTo = function (n, t, i) {
          i = i || {};
          n = this._parseTimeOrLabel(n);
          i.startAt = {
            onComplete: this.seek,
            onCompleteParams: [n],
            callbackScope: this,
          };
          i.immediateRender = i.immediateRender !== !1;
          var r = this.tweenTo(t, i);
          return r.duration(
            Math.abs(r.vars.time - n) / this._timeScale || 0.001
          );
        }),
        (r.render = function (n, t, i) {
          this._gc && this._enabled(!0, !1);
          var r,
            v,
            w,
            l,
            a,
            b,
            f,
            k = this._dirty ? this.totalDuration() : this._totalDuration,
            e = this._duration,
            c = this._time,
            d = this._totalTime,
            nt = this._startTime,
            tt = this._timeScale,
            h = this._rawPrevTime,
            g = this._paused,
            y = this._cycle;
          if (n >= k)
            this._locked ||
              ((this._totalTime = k), (this._cycle = this._repeat)),
              this._reversed ||
                this._hasPausedChild() ||
                ((v = !0),
                (l = "onComplete"),
                (a = !!this._timeline.autoRemoveChildren),
                0 === this._duration &&
                  (0 === n || 0 > h || h === u) &&
                  h !== n &&
                  this._first &&
                  ((a = !0), h > u && (l = "onReverseComplete"))),
              (this._rawPrevTime =
                this._duration || !t || n || this._rawPrevTime === n ? n : u),
              this._yoyo && 0 != (1 & this._cycle)
                ? (this._time = n = 0)
                : ((this._time = e), (n = e + 0.0001));
          else if (1e-7 > n)
            if (
              (this._locked || (this._totalTime = this._cycle = 0),
              (this._time = 0),
              (0 !== c ||
                (0 === e &&
                  h !== u &&
                  (h > 0 || (0 > n && h >= 0)) &&
                  !this._locked)) &&
                ((l = "onReverseComplete"), (v = this._reversed)),
              0 > n)
            )
              (this._active = !1),
                this._timeline.autoRemoveChildren && this._reversed
                  ? ((a = v = !0), (l = "onReverseComplete"))
                  : h >= 0 && this._first && (a = !0),
                (this._rawPrevTime = n);
            else {
              if (
                ((this._rawPrevTime =
                  e || !t || n || this._rawPrevTime === n ? n : u),
                0 === n && v)
              )
                for (r = this._first; r && 0 === r._startTime; )
                  r._duration || (v = !1), (r = r._next);
              n = 0;
              this._initted || (a = !0);
            }
          else if (
            (0 === e && 0 > h && (a = !0),
            (this._time = this._rawPrevTime = n),
            this._locked ||
              ((this._totalTime = n),
              0 !== this._repeat &&
                ((b = e + this._repeatDelay),
                (this._cycle = (this._totalTime / b) >> 0),
                0 !== this._cycle &&
                  this._cycle === this._totalTime / b &&
                  this._cycle--,
                (this._time = this._totalTime - this._cycle * b),
                this._yoyo &&
                  0 != (1 & this._cycle) &&
                  (this._time = e - this._time),
                this._time > e
                  ? ((this._time = e), (n = e + 0.0001))
                  : 0 > this._time
                  ? (this._time = n = 0)
                  : (n = this._time))),
            this._hasPause && !this._forcingPlayhead && !t)
          ) {
            if (((n = this._time), n >= c))
              for (r = this._first; r && n >= r._startTime && !f; )
                r._duration ||
                  "isPause" !== r.data ||
                  r.ratio ||
                  (0 === r._startTime && 0 === this._rawPrevTime) ||
                  (f = r),
                  (r = r._next);
            else
              for (r = this._last; r && r._startTime >= n && !f; )
                r._duration ||
                  ("isPause" === r.data && r._rawPrevTime > 0 && (f = r)),
                  (r = r._prev);
            f &&
              ((this._time = n = f._startTime),
              (this._totalTime =
                n + this._cycle * (this._totalDuration + this._repeatDelay)));
          }
          if (this._cycle !== y && !this._locked) {
            var p = this._yoyo && 0 != (1 & y),
              it = p === (this._yoyo && 0 != (1 & this._cycle)),
              rt = this._totalTime,
              ut = this._cycle,
              ft = this._rawPrevTime,
              et = this._time;
            if (
              ((this._totalTime = y * e),
              y > this._cycle ? (p = !p) : (this._totalTime += e),
              (this._time = c),
              (this._rawPrevTime = 0 === e ? h - 0.0001 : h),
              (this._cycle = y),
              (this._locked = !0),
              (c = p ? 0 : e),
              this.render(c, t, 0 === e),
              t ||
                this._gc ||
                (this.vars.onRepeat && this._callback("onRepeat")),
              it && ((c = p ? e + 0.0001 : -0.0001), this.render(c, !0, !1)),
              (this._locked = !1),
              this._paused && !g)
            )
              return;
            this._time = et;
            this._totalTime = rt;
            this._cycle = ut;
            this._rawPrevTime = ft;
          }
          if (!((this._time !== c && this._first) || i || a || f))
            return (
              d !== this._totalTime &&
                this._onUpdate &&
                (t || this._callback("onUpdate")),
              void 0
            );
          if (
            (this._initted || (this._initted = !0),
            this._active ||
              (!this._paused &&
                this._totalTime !== d &&
                n > 0 &&
                (this._active = !0)),
            0 === d &&
              this.vars.onStart &&
              0 !== this._totalTime &&
              (t || this._callback("onStart")),
            this._time >= c)
          )
            for (r = this._first; r && ((w = r._next), !this._paused || g); )
              (r._active ||
                (r._startTime <= this._time && !r._paused && !r._gc)) &&
                (f === r && this.pause(),
                r._reversed
                  ? r.render(
                      (r._dirty ? r.totalDuration() : r._totalDuration) -
                        (n - r._startTime) * r._timeScale,
                      t,
                      i
                    )
                  : r.render((n - r._startTime) * r._timeScale, t, i)),
                (r = w);
          else
            for (r = this._last; r && ((w = r._prev), !this._paused || g); ) {
              if (r._active || (c >= r._startTime && !r._paused && !r._gc)) {
                if (f === r) {
                  for (f = r._prev; f && f.endTime() > this._time; )
                    f.render(
                      f._reversed
                        ? f.totalDuration() - (n - f._startTime) * f._timeScale
                        : (n - f._startTime) * f._timeScale,
                      t,
                      i
                    ),
                      (f = f._prev);
                  f = null;
                  this.pause();
                }
                r._reversed
                  ? r.render(
                      (r._dirty ? r.totalDuration() : r._totalDuration) -
                        (n - r._startTime) * r._timeScale,
                      t,
                      i
                    )
                  : r.render((n - r._startTime) * r._timeScale, t, i);
              }
              r = w;
            }
          this._onUpdate &&
            (t || (o.length && s(), this._callback("onUpdate")));
          l &&
            (this._locked ||
              this._gc ||
              ((nt === this._startTime || tt !== this._timeScale) &&
                (0 === this._time || k >= this.totalDuration()) &&
                (v &&
                  (o.length && s(),
                  this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                  (this._active = !1)),
                !t && this.vars[l] && this._callback(l))));
        }),
        (r.getActive = function (n, t, i) {
          null == n && (n = !0);
          null == t && (t = !0);
          null == i && (i = !1);
          for (
            var u,
              f = [],
              e = this.getChildren(n, t, i),
              o = 0,
              s = e.length,
              r = 0;
            s > r;
            r++
          )
            (u = e[r]), u.isActive() && (f[o++] = u);
          return f;
        }),
        (r.getLabelAfter = function (n) {
          n || (0 !== n && (n = this._time));
          for (var i = this.getLabelsArray(), r = i.length, t = 0; r > t; t++)
            if (i[t].time > n) return i[t].name;
          return null;
        }),
        (r.getLabelBefore = function (n) {
          null == n && (n = this._time);
          for (var t = this.getLabelsArray(), i = t.length; --i > -1; )
            if (n > t[i].time) return t[i].name;
          return null;
        }),
        (r.getLabelsArray = function () {
          var n,
            t = [],
            i = 0;
          for (n in this._labels)
            t[i++] = {
              time: this._labels[n],
              name: n,
            };
          return (
            t.sort(function (n, t) {
              return n.time - t.time;
            }),
            t
          );
        }),
        (r.progress = function (n, t) {
          return arguments.length
            ? this.totalTime(
                this.duration() *
                  (this._yoyo && 0 != (1 & this._cycle) ? 1 - n : n) +
                  this._cycle * (this._duration + this._repeatDelay),
                t
              )
            : this._time / this.duration();
        }),
        (r.totalProgress = function (n, t) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * n, t)
            : this._totalTime / this.totalDuration();
        }),
        (r.totalDuration = function (t) {
          return arguments.length
            ? -1 === this._repeat
              ? this
              : this.duration(
                  (t - this._repeat * this._repeatDelay) / (this._repeat + 1)
                )
            : (this._dirty &&
                (n.prototype.totalDuration.call(this),
                (this._totalDuration =
                  -1 === this._repeat
                    ? 999999999999
                    : this._duration * (this._repeat + 1) +
                      this._repeatDelay * this._repeat)),
              this._totalDuration);
        }),
        (r.time = function (n, t) {
          return arguments.length
            ? (this._dirty && this.totalDuration(),
              n > this._duration && (n = this._duration),
              this._yoyo && 0 != (1 & this._cycle)
                ? (n =
                    this._duration -
                    n +
                    this._cycle * (this._duration + this._repeatDelay))
                : 0 !== this._repeat &&
                  (n += this._cycle * (this._duration + this._repeatDelay)),
              this.totalTime(n, t))
            : this._time;
        }),
        (r.repeat = function (n) {
          return arguments.length
            ? ((this._repeat = n), this._uncache(!0))
            : this._repeat;
        }),
        (r.repeatDelay = function (n) {
          return arguments.length
            ? ((this._repeatDelay = n), this._uncache(!0))
            : this._repeatDelay;
        }),
        (r.yoyo = function (n) {
          return arguments.length ? ((this._yoyo = n), this) : this._yoyo;
        }),
        (r.currentLabel = function (n) {
          return arguments.length
            ? this.seek(n, !0)
            : this.getLabelBefore(this._time + 1e-8);
        }),
        f
      );
    },
    !0
  ),
    (function () {
      var h = 180 / Math.PI,
        n = [],
        t = [],
        i = [],
        f = {},
        c = _gsScope._gsDefine.globals,
        u = function (n, t, i, r) {
          this.a = n;
          this.b = t;
          this.c = i;
          this.d = r;
          this.da = r - n;
          this.ca = i - n;
          this.ba = t - n;
        },
        l =
          ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
        e = function (n, t, i, r) {
          var e = {
              a: n,
            },
            u = {},
            f = {},
            o = {
              c: r,
            },
            s = (n + t) / 2,
            a = (t + i) / 2,
            h = (i + r) / 2,
            c = (s + a) / 2,
            l = (a + h) / 2,
            v = (l - c) / 8;
          return (
            (e.b = s + (n - s) / 4),
            (u.b = c + v),
            (e.c = u.a = (e.b + u.b) / 2),
            (u.c = f.a = (c + l) / 2),
            (f.b = l - v),
            (o.b = h + (r - h) / 4),
            (f.c = o.a = (f.b + o.b) / 2),
            [e, u, f, o]
          );
        },
        a = function (r, u, f, o, s) {
          for (
            var y,
              c,
              nt,
              h,
              p,
              b,
              g,
              tt,
              l,
              k,
              d,
              it,
              rt = r.length - 1,
              w = 0,
              a = r[0].a,
              v = 0;
            rt > v;
            v++
          )
            (h = r[w]),
              (y = h.a),
              (c = h.d),
              (nt = r[w + 1].d),
              s
                ? ((k = n[v]),
                  (d = t[v]),
                  (it = (0.25 * (d + k) * u) / (o ? 0.5 : i[v] || 0.5)),
                  (p = c - (c - y) * (o ? 0.5 * u : 0 !== k ? it / k : 0)),
                  (b = c + (nt - c) * (o ? 0.5 * u : 0 !== d ? it / d : 0)),
                  (g =
                    c - (p + (((b - p) * ((3 * k) / (k + d) + 0.5)) / 4 || 0))))
                : ((p = c - 0.5 * (c - y) * u),
                  (b = c + 0.5 * (nt - c) * u),
                  (g = c - (p + b) / 2)),
              (p += g),
              (b += g),
              (h.c = tt = p),
              (h.b = 0 !== v ? a : (a = h.a + 0.6 * (h.c - h.a))),
              (h.da = c - y),
              (h.ca = tt - y),
              (h.ba = a - y),
              f
                ? ((l = e(y, a, tt, c)),
                  r.splice(w, 1, l[0], l[1], l[2], l[3]),
                  (w += 4))
                : w++,
              (a = b);
          h = r[w];
          h.b = a;
          h.c = a + 0.4 * (h.d - a);
          h.da = h.d - h.a;
          h.ca = h.c - h.a;
          h.ba = a - h.a;
          f &&
            ((l = e(h.a, a, h.c, h.d)), r.splice(w, 1, l[0], l[1], l[2], l[3]));
        },
        v = function (i, r, f, e) {
          var c,
            o,
            l,
            s,
            v,
            a,
            h = [];
          if (e)
            for (i = [e].concat(i), o = i.length; --o > -1; )
              "string" == typeof (a = i[o][r]) &&
                "=" === a.charAt(1) &&
                (i[o][r] = e[r] + Number(a.charAt(0) + a.substr(2)));
          if (((c = i.length - 2), 0 > c))
            return (h[0] = new u(i[0][r], 0, 0, i[-1 > c ? 0 : 1][r])), h;
          for (o = 0; c > o; o++)
            (l = i[o][r]),
              (s = i[o + 1][r]),
              (h[o] = new u(l, 0, 0, s)),
              f &&
                ((v = i[o + 2][r]),
                (n[o] = (n[o] || 0) + (s - l) * (s - l)),
                (t[o] = (t[o] || 0) + (v - s) * (v - s)));
          return (h[o] = new u(i[o][r], 0, 0, i[o + 1][r])), h;
        },
        o = function (r, u, e, o, s, h) {
          var c,
            y,
            w,
            p,
            g,
            nt,
            k,
            tt,
            d = {},
            b = [],
            it = h || r[0];
          s = "string" == typeof s ? "," + s + "," : l;
          null == u && (u = 1);
          for (y in r[0]) b.push(y);
          if (r.length > 1) {
            for (tt = r[r.length - 1], k = !0, c = b.length; --c > -1; )
              if (((y = b[c]), Math.abs(it[y] - tt[y]) > 0.05)) {
                k = !1;
                break;
              }
            k &&
              ((r = r.concat()),
              h && r.unshift(h),
              r.push(r[1]),
              (h = r[r.length - 3]));
          }
          for (n.length = t.length = i.length = 0, c = b.length; --c > -1; )
            (y = b[c]),
              (f[y] = -1 !== s.indexOf("," + y + ",")),
              (d[y] = v(r, y, f[y], h));
          for (c = n.length; --c > -1; )
            (n[c] = Math.sqrt(n[c])), (t[c] = Math.sqrt(t[c]));
          if (!o) {
            for (c = b.length; --c > -1; )
              if (f[y])
                for (w = d[b[c]], nt = w.length - 1, p = 0; nt > p; p++)
                  (g = w[p + 1].da / t[p] + w[p].da / n[p]),
                    (i[p] = (i[p] || 0) + g * g);
            for (c = i.length; --c > -1; ) i[c] = Math.sqrt(i[c]);
          }
          for (c = b.length, p = e ? 4 : 1; --c > -1; )
            (y = b[c]),
              (w = d[y]),
              a(w, u, e, o, f[y]),
              k && (w.splice(0, p), w.splice(w.length - p, p));
          return d;
        },
        y = function (n, t, i) {
          t = t || "soft";
          var o,
            a,
            v,
            w,
            f,
            y,
            r,
            c,
            s,
            e,
            h,
            b = {},
            l = "cubic" === t ? 3 : 2,
            k = "soft" === t,
            p = [];
          if ((k && i && (n = [i].concat(n)), null == n || l + 1 > n.length))
            throw "invalid Bezier data";
          for (s in n[0]) p.push(s);
          for (y = p.length; --y > -1; ) {
            for (
              s = p[y], b[s] = f = [], e = 0, c = n.length, r = 0;
              c > r;
              r++
            )
              (o =
                null == i
                  ? n[r][s]
                  : "string" == typeof (h = n[r][s]) && "=" === h.charAt(1)
                  ? i[s] + Number(h.charAt(0) + h.substr(2))
                  : Number(h)),
                k && r > 1 && c - 1 > r && (f[e++] = (o + f[e - 2]) / 2),
                (f[e++] = o);
            for (c = e - l + 1, e = 0, r = 0; c > r; r += l)
              (o = f[r]),
                (a = f[r + 1]),
                (v = f[r + 2]),
                (w = 2 === l ? 0 : f[r + 3]),
                (f[e++] = h =
                  3 === l
                    ? new u(o, a, v, w)
                    : new u(o, (2 * a + o) / 3, (2 * a + v) / 3, v));
            f.length = e;
          }
          return b;
        },
        p = function (n, t, i) {
          for (
            var e, s, o, a, v, y, r, u, h, f, c, p = 1 / i, l = n.length;
            --l > -1;

          )
            for (
              f = n[l],
                o = f.a,
                a = f.d - o,
                v = f.c - o,
                y = f.b - o,
                e = s = 0,
                u = 1;
              i >= u;
              u++
            )
              (r = p * u),
                (h = 1 - r),
                (e = s - (s = (r * r * a + 3 * h * (r * v + h * y)) * r)),
                (c = l * i + u - 1),
                (t[c] = (t[c] || 0) + e * e);
        },
        w = function (n, t) {
          t = t >> 0 || 6;
          var s,
            i,
            h,
            r,
            f = [],
            c = [],
            u = 0,
            e = 0,
            a = t - 1,
            l = [],
            o = [];
          for (s in n) p(n[s], f, t);
          for (h = f.length, i = 0; h > i; i++)
            (u += Math.sqrt(f[i])),
              (r = i % t),
              (o[r] = u),
              r === a &&
                ((e += u),
                (r = (i / t) >> 0),
                (l[r] = o),
                (c[r] = e),
                (u = 0),
                (o = []));
          return {
            length: e,
            lengths: c,
            segments: l,
          };
        },
        r = _gsScope._gsDefine.plugin({
          propName: "bezier",
          priority: -1,
          version: "1.3.4",
          API: 2,
          global: !0,
          init: function (n, t, i) {
            var c;
            this._target = n;
            t instanceof Array &&
              (t = {
                values: t,
              });
            this._func = {};
            this._round = {};
            this._props = [];
            this._timeRes =
              null == t.timeResolution ? 6 : parseInt(t.timeResolution, 10);
            var r,
              a,
              f,
              e,
              l,
              s = t.values || [],
              h = {},
              v = s[0],
              u = t.autoRotate || i.vars.orientToBezier;
            this._autoRotate = u
              ? u instanceof Array
                ? u
                : [["x", "y", "rotation", u === !0 ? 0 : Number(u) || 0]]
              : null;
            for (r in v) this._props.push(r);
            for (f = this._props.length; --f > -1; )
              (r = this._props[f]),
                this._overwriteProps.push(r),
                (a = this._func[r] = "function" == typeof n[r]),
                (h[r] = a
                  ? n[
                      r.indexOf("set") ||
                      "function" != typeof n["get" + r.substr(3)]
                        ? r
                        : "get" + r.substr(3)
                    ]()
                  : parseFloat(n[r])),
                l || (h[r] !== s[0][r] && (l = h));
            if (
              (((this._beziers =
                "cubic" !== t.type &&
                "quadratic" !== t.type &&
                "soft" !== t.type
                  ? o(
                      s,
                      isNaN(t.curviness) ? 1 : t.curviness,
                      !1,
                      "thruBasic" === t.type,
                      t.correlate,
                      l
                    )
                  : y(s, t.type, h)),
              (this._segCount = this._beziers[r].length),
              this._timeRes) &&
                ((c = w(this._beziers, this._timeRes)),
                (this._length = c.length),
                (this._lengths = c.lengths),
                (this._segments = c.segments),
                (this._l1 = this._li = this._s1 = this._si = 0),
                (this._l2 = this._lengths[0]),
                (this._curSeg = this._segments[0]),
                (this._s2 = this._curSeg[0]),
                (this._prec = 1 / this._curSeg.length)),
              (u = this._autoRotate))
            )
              for (
                this._initialRotations = [],
                  u[0] instanceof Array || (this._autoRotate = u = [u]),
                  f = u.length;
                --f > -1;

              ) {
                for (e = 0; 3 > e; e++)
                  (r = u[f][e]),
                    (this._func[r] =
                      "function" == typeof n[r]
                        ? n[
                            r.indexOf("set") ||
                            "function" != typeof n["get" + r.substr(3)]
                              ? r
                              : "get" + r.substr(3)
                          ]
                        : !1);
                r = u[f][2];
                this._initialRotations[f] = this._func[r]
                  ? this._func[r].call(this._target)
                  : this._target[r];
              }
            return (this._startRatio = i.vars.runBackwards ? 1 : 0), !0;
          },
          set: function (n) {
            var c,
              d,
              t,
              e,
              i,
              r,
              o,
              p,
              a,
              u,
              l = this._segCount,
              g = this._func,
              w = this._target,
              it = n !== this._startRatio,
              f,
              b,
              k,
              v,
              y,
              nt,
              tt,
              s;
            if (this._timeRes) {
              if (
                ((a = this._lengths),
                (u = this._curSeg),
                (n *= this._length),
                (t = this._li),
                n > this._l2 && l - 1 > t)
              ) {
                for (p = l - 1; p > t && n >= (this._l2 = a[++t]); );
                this._l1 = a[t - 1];
                this._li = t;
                this._curSeg = u = this._segments[t];
                this._s2 = u[(this._s1 = this._si = 0)];
              } else if (this._l1 > n && t > 0) {
                for (; t > 0 && (this._l1 = a[--t]) >= n; );
                0 === t && this._l1 > n ? (this._l1 = 0) : t++;
                this._l2 = a[t];
                this._li = t;
                this._curSeg = u = this._segments[t];
                this._s1 = u[(this._si = u.length - 1) - 1] || 0;
                this._s2 = u[this._si];
              }
              if (
                ((c = t),
                (n -= this._l1),
                (t = this._si),
                n > this._s2 && u.length - 1 > t)
              ) {
                for (p = u.length - 1; p > t && n >= (this._s2 = u[++t]); );
                this._s1 = u[t - 1];
                this._si = t;
              } else if (this._s1 > n && t > 0) {
                for (; t > 0 && (this._s1 = u[--t]) >= n; );
                0 === t && this._s1 > n ? (this._s1 = 0) : t++;
                this._s2 = u[t];
                this._si = t;
              }
              r = (t + (n - this._s1) / (this._s2 - this._s1)) * this._prec;
            } else
              (c = 0 > n ? 0 : n >= 1 ? l - 1 : (l * n) >> 0),
                (r = (n - c * (1 / l)) * l);
            for (d = 1 - r, t = this._props.length; --t > -1; )
              (e = this._props[t]),
                (i = this._beziers[e][c]),
                (o = (r * r * i.da + 3 * d * (r * i.ca + d * i.ba)) * r + i.a),
                this._round[e] && (o = Math.round(o)),
                g[e] ? w[e](o) : (w[e] = o);
            if (this._autoRotate)
              for (s = this._autoRotate, t = s.length; --t > -1; )
                (e = s[t][2]),
                  (nt = s[t][3] || 0),
                  (tt = s[t][4] === !0 ? 1 : h),
                  (i = this._beziers[s[t][0]]),
                  (f = this._beziers[s[t][1]]),
                  i &&
                    f &&
                    ((i = i[c]),
                    (f = f[c]),
                    (b = i.a + (i.b - i.a) * r),
                    (v = i.b + (i.c - i.b) * r),
                    (b += (v - b) * r),
                    (v += (i.c + (i.d - i.c) * r - v) * r),
                    (k = f.a + (f.b - f.a) * r),
                    (y = f.b + (f.c - f.b) * r),
                    (k += (y - k) * r),
                    (y += (f.c + (f.d - f.c) * r - y) * r),
                    (o = it
                      ? Math.atan2(y - k, v - b) * tt + nt
                      : this._initialRotations[t]),
                    g[e] ? w[e](o) : (w[e] = o));
          },
        }),
        s = r.prototype;
      r.bezierThrough = o;
      r.cubicToQuadratic = e;
      r._autoCSS = !0;
      r.quadraticToCubic = function (n, t, i) {
        return new u(n, (2 * t + n) / 3, (2 * t + i) / 3, i);
      };
      r._cssRegister = function () {
        var t = c.CSSPlugin;
        if (t) {
          var n = t._internals,
            i = n._parseToProxy,
            u = n._setPluginRatio,
            f = n.CSSPropTween;
          n._registerComplexSpecialProp("bezier", {
            parser: function (n, t, e, o, s, h) {
              t instanceof Array &&
                (t = {
                  values: t,
                });
              h = new r();
              var l,
                v,
                a,
                p = t.values,
                y = p.length - 1,
                w = [],
                c = {};
              if (0 > y) return s;
              for (l = 0; y >= l; l++)
                (a = i(n, p[l], o, s, h, y !== l)), (w[l] = a.end);
              for (v in t) c[v] = t[v];
              return (
                (c.values = w),
                (s = new f(n, "bezier", 0, 0, a.pt, 2)),
                (s.data = a),
                (s.plugin = h),
                (s.setRatio = u),
                0 === c.autoRotate && (c.autoRotate = !0),
                !c.autoRotate ||
                  c.autoRotate instanceof Array ||
                  ((l = c.autoRotate === !0 ? 0 : Number(c.autoRotate)),
                  (c.autoRotate =
                    null != a.end.left
                      ? [["left", "top", "rotation", l, !1]]
                      : null != a.end.x
                      ? [["x", "y", "rotation", l, !1]]
                      : !1)),
                c.autoRotate &&
                  (o._transform || o._enableTransforms(!1),
                  (a.autoRotate = o._target._gsTransform)),
                h._onInitTween(a.proxy, c, o._tween),
                s
              );
            },
          });
        }
      };
      s._roundProps = function (n, t) {
        for (var i = this._overwriteProps, r = i.length; --r > -1; )
          (n[i[r]] || n.bezier || n.bezierThrough) && (this._round[i[r]] = t);
      };
      s._kill = function (n) {
        var t,
          i,
          r = this._props;
        for (t in this._beziers)
          if (t in n)
            for (
              delete this._beziers[t], delete this._func[t], i = r.length;
              --i > -1;

            )
              r[i] === t && r.splice(i, 1);
        return this._super._kill.call(this, n);
      };
    })();
  _gsScope._gsDefine(
    "plugins.CSSPlugin",
    ["plugins.TweenPlugin", "TweenLite"],
    function (n, t) {
      var ft,
        wt,
        f,
        fi,
        r = function () {
          n.call(this, "css");
          this._overwriteProps.length = 0;
          this.setRatio = r.prototype.setRatio;
        },
        nu = _gsScope._gsDefine.globals,
        a = {},
        i = (r.prototype = new n("css")),
        br,
        yt,
        kr,
        dr,
        gr,
        pt;
      i.constructor = r;
      r.version = "1.18.0";
      r.API = 2;
      r.defaultTransformPerspective = 0;
      r.defaultSkewType = "compensated";
      r.defaultSmoothOrigin = !0;
      i = "px";
      r.suffixMap = {
        top: i,
        right: i,
        bottom: i,
        left: i,
        width: i,
        height: i,
        fontSize: i,
        padding: i,
        margin: i,
        perspective: i,
        lineHeight: "",
      };
      var ei,
        di,
        bt,
        kt,
        gi,
        it,
        dt = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
        oi = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
        si = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
        hi = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
        gt = /(?:\d|\-|\+|=|#|\.)*/g,
        ci = /opacity *= *([^)]*)/i,
        tu = /opacity:([^;]*)/i,
        iu = /alpha\(opacity *=.+?\)/i,
        ru = /^(rgb|hsl)/,
        nr = /([A-Z])/g,
        tr = /-([a-z])/gi,
        uu = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
        ir = function (n, t) {
          return t.toUpperCase();
        },
        fu = /(?:Left|Right|Width)/i,
        eu = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
        ou = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
        p = /,(?=[^\)]*(?:\(|$))/gi,
        d = Math.PI / 180,
        rt = 180 / Math.PI,
        ni = {},
        v = document,
        li = function (n) {
          return v.createElementNS
            ? v.createElementNS("http://www.w3.org/1999/xhtml", n)
            : v.createElement(n);
        },
        g = li("div"),
        ai = li("img"),
        w = (r._internals = {
          _specialProps: a,
        }),
        b = navigator.userAgent,
        tt = (function () {
          var t = b.indexOf("Android"),
            n = li("a");
          return (
            (bt =
              -1 !== b.indexOf("Safari") &&
              -1 === b.indexOf("Chrome") &&
              (-1 === t || Number(b.substr(t + 8, 1)) > 3)),
            (gi = bt && 6 > Number(b.substr(b.indexOf("Version/") + 8, 1))),
            (kt = -1 !== b.indexOf("Firefox")),
            (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(b) ||
              /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(b)) &&
              (it = parseFloat(RegExp.$1)),
            n
              ? ((n.style.cssText = "top:1px;opacity:.55;"),
                /^0.55/.test(n.style.opacity))
              : !1
          );
        })(),
        rr = function (n) {
          return ci.test(
            "string" == typeof n
              ? n
              : (n.currentStyle ? n.currentStyle.filter : n.style.filter) || ""
          )
            ? parseFloat(RegExp.$1) / 100
            : 1;
        },
        ur = function (n) {
          window.console && console.log(n);
        },
        fr = "",
        vi = "",
        et = function (n, t) {
          t = t || g;
          var r,
            i,
            u = t.style;
          if (void 0 !== u[n]) return n;
          for (
            n = n.charAt(0).toUpperCase() + n.substr(1),
              r = ["O", "Moz", "ms", "Ms", "Webkit"],
              i = 5;
            --i > -1 && void 0 === u[r[i] + n];

          );
          return i >= 0
            ? ((vi = 3 === i ? "ms" : r[i]),
              (fr = "-" + vi.toLowerCase() + "-"),
              vi + n)
            : null;
        },
        ot = v.defaultView ? v.defaultView.getComputedStyle : function () {},
        u = (r.getStyle = function (n, t, i, r, u) {
          var f;
          return tt || "opacity" !== t
            ? (!r && n.style[t]
                ? (f = n.style[t])
                : (i = i || ot(n))
                ? (f =
                    i[t] ||
                    i.getPropertyValue(t) ||
                    i.getPropertyValue(t.replace(nr, "-$1").toLowerCase()))
                : n.currentStyle && (f = n.currentStyle[t]),
              null == u ||
              (f && "none" !== f && "auto" !== f && "auto auto" !== f)
                ? f
                : u)
            : rr(n);
        }),
        k = (w.convertToPixels = function (n, i, f, e, o) {
          if ("px" === e || !e) return f;
          if ("auto" === e || !f) return 0;
          var s,
            h,
            a,
            l = fu.test(i),
            c = n,
            y = g.style,
            p = 0 > f;
          if ((p && (f = -f), "%" === e && -1 !== i.indexOf("border")))
            s = (f / 100) * (l ? n.clientWidth : n.clientHeight);
          else {
            if (
              ((y.cssText =
                "border:0 solid red;position:" +
                u(n, "position") +
                ";line-height:0;"),
              "%" !== e && c.appendChild && "v" !== e.charAt(0) && "rem" !== e)
            )
              y[l ? "borderLeftWidth" : "borderTopWidth"] = f + e;
            else {
              if (
                ((c = n.parentNode || v.body),
                (h = c._gsCache),
                (a = t.ticker.frame),
                h && l && h.time === a)
              )
                return (h.width * f) / 100;
              y[l ? "width" : "height"] = f + e;
            }
            c.appendChild(g);
            s = parseFloat(g[l ? "offsetWidth" : "offsetHeight"]);
            c.removeChild(g);
            l &&
              "%" === e &&
              r.cacheWidths !== !1 &&
              ((h = c._gsCache = c._gsCache || {}),
              (h.time = a),
              (h.width = 100 * (s / f)));
            0 !== s || o || (s = k(n, i, f, e, !0));
          }
          return p ? -s : s;
        }),
        er = (w.calculateOffset = function (n, t, i) {
          if ("absolute" !== u(n, "position", i)) return 0;
          var r = "left" === t ? "Left" : "Top",
            f = u(n, "margin" + r, i);
          return (
            n["offset" + r] - (k(n, t, parseFloat(f), f.replace(gt, "")) || 0)
          );
        }),
        st = function (n, t) {
          var r,
            u,
            f,
            i = {};
          if ((t = t || ot(n, null)))
            if ((r = t.length))
              for (; --r > -1; )
                (f = t[r]),
                  (-1 === f.indexOf("-transform") || lr === f) &&
                    (i[f.replace(tr, ir)] = t.getPropertyValue(f));
            else
              for (r in t)
                (-1 === r.indexOf("Transform") || h === r) && (i[r] = t[r]);
          else if ((t = n.currentStyle || n.style))
            for (r in t)
              "string" == typeof r &&
                void 0 === i[r] &&
                (i[r.replace(tr, ir)] = t[r]);
          return (
            tt || (i.opacity = rr(n)),
            (u = ut(n, t, !1)),
            (i.rotation = u.rotation),
            (i.skewX = u.skewX),
            (i.scaleX = u.scaleX),
            (i.scaleY = u.scaleY),
            (i.x = u.x),
            (i.y = u.y),
            y &&
              ((i.z = u.z),
              (i.rotationX = u.rotationX),
              (i.rotationY = u.rotationY),
              (i.scaleZ = u.scaleZ)),
            i.filters && delete i.filters,
            i
          );
        },
        yi = function (n, t, i, r, u) {
          var e,
            f,
            o,
            s = {},
            h = n.style;
          for (f in i)
            "cssText" !== f &&
              "length" !== f &&
              isNaN(f) &&
              (t[f] !== (e = i[f]) || (u && u[f])) &&
              -1 === f.indexOf("Origin") &&
              ("number" == typeof e || "string" == typeof e) &&
              ((s[f] =
                "auto" !== e || ("left" !== f && "top" !== f)
                  ? ("" !== e && "auto" !== e && "none" !== e) ||
                    "string" != typeof t[f] ||
                    "" === t[f].replace(hi, "")
                    ? e
                    : 0
                  : er(n, f)),
              void 0 !== h[f] && (o = new bi(h, f, h[f], o)));
          if (r) for (f in r) "className" !== f && (s[f] = r[f]);
          return {
            difs: s,
            firstMPT: o,
          };
        },
        su = {
          width: ["Left", "Right"],
          height: ["Top", "Bottom"],
        },
        hu = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
        cu = function (n, t, i) {
          var r = parseFloat("width" === t ? n.offsetWidth : n.offsetHeight),
            f = su[t],
            e = f.length;
          for (i = i || ot(n, null); --e > -1; )
            (r -= parseFloat(u(n, "padding" + f[e], i, !0)) || 0),
              (r -= parseFloat(u(n, "border" + f[e] + "Width", i, !0)) || 0);
          return r;
        },
        ht = function (n, t) {
          if ("contain" === n || "auto" === n || "auto auto" === n)
            return n + " ";
          (null == n || "" === n) && (n = "0 0");
          var u = n.split(" "),
            i =
              -1 !== n.indexOf("left")
                ? "0%"
                : -1 !== n.indexOf("right")
                ? "100%"
                : u[0],
            r =
              -1 !== n.indexOf("top")
                ? "0%"
                : -1 !== n.indexOf("bottom")
                ? "100%"
                : u[1];
          return (
            null == r
              ? (r = "center" === i ? "50%" : "0")
              : "center" === r && (r = "50%"),
            ("center" === i ||
              (isNaN(parseFloat(i)) && -1 === (i + "").indexOf("="))) &&
              (i = "50%"),
            (n = i + " " + r + (u.length > 2 ? " " + u[2] : "")),
            t &&
              ((t.oxp = -1 !== i.indexOf("%")),
              (t.oyp = -1 !== r.indexOf("%")),
              (t.oxr = "=" === i.charAt(1)),
              (t.oyr = "=" === r.charAt(1)),
              (t.ox = parseFloat(i.replace(hi, ""))),
              (t.oy = parseFloat(r.replace(hi, ""))),
              (t.v = n)),
            t || n
          );
        },
        ct = function (n, t) {
          return "string" == typeof n && "=" === n.charAt(1)
            ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2))
            : parseFloat(n) - parseFloat(t);
        },
        c = function (n, t) {
          return null == n
            ? t
            : "string" == typeof n && "=" === n.charAt(1)
            ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) + t
            : parseFloat(n);
        },
        lt = function (n, t, i, r) {
          var f,
            o,
            u,
            e,
            s,
            h = 1e-6;
          return (
            null == n
              ? (e = t)
              : "number" == typeof n
              ? (e = n)
              : ((f = 360),
                (o = n.split("_")),
                (s = "=" === n.charAt(1)),
                (u =
                  (s
                    ? parseInt(n.charAt(0) + "1", 10) *
                      parseFloat(o[0].substr(2))
                    : parseFloat(o[0])) *
                    (-1 === n.indexOf("rad") ? 1 : rt) -
                  (s ? 0 : t)),
                o.length &&
                  (r && (r[i] = t + u),
                  -1 !== n.indexOf("short") &&
                    ((u %= f),
                    u !== u % (f / 2) && (u = 0 > u ? u + f : u - f)),
                  -1 !== n.indexOf("_cw") && 0 > u
                    ? (u = ((u + 9999999999 * f) % f) - (0 | (u / f)) * f)
                    : -1 !== n.indexOf("ccw") &&
                      u > 0 &&
                      (u = ((u - 9999999999 * f) % f) - (0 | (u / f)) * f)),
                (e = t + u)),
            h > e && e > -h && (e = 0),
            e
          );
        },
        at = {
          aqua: [0, 255, 255],
          lime: [0, 255, 0],
          silver: [192, 192, 192],
          black: [0, 0, 0],
          maroon: [128, 0, 0],
          teal: [0, 128, 128],
          blue: [0, 0, 255],
          navy: [0, 0, 128],
          white: [255, 255, 255],
          fuchsia: [255, 0, 255],
          olive: [128, 128, 0],
          yellow: [255, 255, 0],
          orange: [255, 165, 0],
          gray: [128, 128, 128],
          purple: [128, 0, 128],
          green: [0, 128, 0],
          red: [255, 0, 0],
          pink: [255, 192, 203],
          cyan: [0, 255, 255],
          transparent: [255, 255, 255, 0],
        },
        pi = function (n, t, i) {
          return (
            (n = 0 > n ? n + 1 : n > 1 ? n - 1 : n),
            0 |
              (255 *
                (1 > 6 * n
                  ? t + 6 * (i - t) * n
                  : 0.5 > n
                  ? i
                  : 2 > 3 * n
                  ? t + 6 * (i - t) * (2 / 3 - n)
                  : t) +
                0.5)
          );
        },
        ti = (r.parseColor = function (n, t) {
          var i, u, r, f, o, h, e, s, c, l, a;
          if (n)
            if ("number" == typeof n) i = [n >> 16, 255 & (n >> 8), 255 & n];
            else {
              if (
                ("," === n.charAt(n.length - 1) &&
                  (n = n.substr(0, n.length - 1)),
                at[n])
              )
                i = at[n];
              else if ("#" === n.charAt(0))
                4 === n.length &&
                  ((u = n.charAt(1)),
                  (r = n.charAt(2)),
                  (f = n.charAt(3)),
                  (n = "#" + u + u + r + r + f + f)),
                  (n = parseInt(n.substr(1), 16)),
                  (i = [n >> 16, 255 & (n >> 8), 255 & n]);
              else if ("hsl" === n.substr(0, 3))
                if (((i = a = n.match(dt)), t)) {
                  if (-1 !== n.indexOf("=")) return n.match(oi);
                } else
                  (o = (Number(i[0]) % 360) / 360),
                    (h = Number(i[1]) / 100),
                    (e = Number(i[2]) / 100),
                    (r = 0.5 >= e ? e * (h + 1) : e + h - e * h),
                    (u = 2 * e - r),
                    i.length > 3 && (i[3] = Number(n[3])),
                    (i[0] = pi(o + 1 / 3, u, r)),
                    (i[1] = pi(o, u, r)),
                    (i[2] = pi(o - 1 / 3, u, r));
              else i = n.match(dt) || at.transparent;
              i[0] = Number(i[0]);
              i[1] = Number(i[1]);
              i[2] = Number(i[2]);
              i.length > 3 && (i[3] = Number(i[3]));
            }
          else i = at.black;
          return (
            t &&
              !a &&
              ((u = i[0] / 255),
              (r = i[1] / 255),
              (f = i[2] / 255),
              (s = Math.max(u, r, f)),
              (c = Math.min(u, r, f)),
              (e = (s + c) / 2),
              s === c
                ? (o = h = 0)
                : ((l = s - c),
                  (h = e > 0.5 ? l / (2 - s - c) : l / (s + c)),
                  (o =
                    s === u
                      ? (r - f) / l + (f > r ? 6 : 0)
                      : s === r
                      ? (f - u) / l + 2
                      : (u - r) / l + 4),
                  (o *= 60)),
              (i[0] = 0 | (o + 0.5)),
              (i[1] = 0 | (100 * h + 0.5)),
              (i[2] = 0 | (100 * e + 0.5))),
            i
          );
        }),
        or = function (n, t) {
          for (
            var i, f, e = n.match(l) || [], u = 0, o = e.length ? "" : n, r = 0;
            e.length > r;
            r++
          )
            (i = e[r]),
              (f = n.substr(u, n.indexOf(i, u) - u)),
              (u += f.length + i.length),
              (i = ti(i, t)),
              3 === i.length && i.push(1),
              (o +=
                f +
                (t
                  ? "hsla(" + i[0] + "," + i[1] + "%," + i[2] + "%," + i[3]
                  : "rgba(" + i.join(",")) +
                ")");
          return o;
        },
        l = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
      for (i in at) l += "|" + i + "\\b";
      l = RegExp(l + ")", "gi");
      r.colorStringFilter = function (n) {
        var t,
          i = n[0] + n[1];
        l.lastIndex = 0;
        l.test(i) &&
          ((t = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla(")),
          (n[0] = or(n[0], t)),
          (n[1] = or(n[1], t)));
      };
      t.defaultStringFilter || (t.defaultStringFilter = r.colorStringFilter);
      var sr = function (n, t, i, r) {
          if (null == n)
            return function (n) {
              return n;
            };
          var e,
            s = t ? (n.match(l) || [""])[0] : "",
            f = n.split(s).join("").match(si) || [],
            h = n.substr(0, n.indexOf(f[0])),
            c = ")" === n.charAt(n.length - 1) ? ")" : "",
            o = -1 !== n.indexOf(" ") ? " " : ",",
            u = f.length,
            a = u > 0 ? f[0].replace(dt, "") : "";
          return u
            ? (e = t
                ? function (n) {
                    var w, v, t, y;
                    if ("number" == typeof n) n += a;
                    else if (r && p.test(n)) {
                      for (
                        y = n.replace(p, "|").split("|"), t = 0;
                        y.length > t;
                        t++
                      )
                        y[t] = e(y[t]);
                      return y.join(",");
                    }
                    if (
                      ((w = (n.match(l) || [s])[0]),
                      (v = n.split(w).join("").match(si) || []),
                      (t = v.length),
                      u > t--)
                    )
                      for (; u > ++t; ) v[t] = i ? v[0 | ((t - 1) / 2)] : f[t];
                    return (
                      h +
                      v.join(o) +
                      o +
                      w +
                      c +
                      (-1 !== n.indexOf("inset") ? " inset" : "")
                    );
                  }
                : function (n) {
                    var s, l, t;
                    if ("number" == typeof n) n += a;
                    else if (r && p.test(n)) {
                      for (
                        l = n.replace(p, "|").split("|"), t = 0;
                        l.length > t;
                        t++
                      )
                        l[t] = e(l[t]);
                      return l.join(",");
                    }
                    if (((s = n.match(si) || []), (t = s.length), u > t--))
                      for (; u > ++t; ) s[t] = i ? s[0 | ((t - 1) / 2)] : f[t];
                    return h + s.join(o) + c;
                  })
            : function (n) {
                return n;
              };
        },
        wi = function (n) {
          return (
            (n = n.split(",")),
            function (t, i, r, u, f, e, o) {
              var s,
                h = (i + "").split(" ");
              for (o = {}, s = 0; 4 > s; s++)
                o[n[s]] = h[s] = h[s] || h[((s - 1) / 2) >> 0];
              return u.parse(t, o, f, e);
            }
          );
        },
        bi =
          ((w._setPluginRatio = function (n) {
            this.plugin.setRatio(n);
            for (
              var r,
                t,
                u,
                e,
                f = this.data,
                o = f.proxy,
                i = f.firstMPT,
                s = 1e-6;
              i;

            )
              (r = o[i.v]),
                i.r ? (r = Math.round(r)) : s > r && r > -s && (r = 0),
                (i.t[i.p] = r),
                (i = i._next);
            if ((f.autoRotate && (f.autoRotate.rotation = o.rotation), 1 === n))
              for (i = f.firstMPT; i; ) {
                if (((t = i.t), t.type)) {
                  if (1 === t.type) {
                    for (e = t.xs0 + t.s + t.xs1, u = 1; t.l > u; u++)
                      e += t["xn" + u] + t["xs" + (u + 1)];
                    t.e = e;
                  }
                } else t.e = t.s + t.xs0;
                i = i._next;
              }
          }),
          function (n, t, i, r, u) {
            this.t = n;
            this.p = t;
            this.v = i;
            this.r = u;
            r && ((r._prev = this), (this._next = r));
          }),
        o =
          ((w._parseToProxy = function (n, t, i, r, u, f) {
            var c,
              e,
              o,
              s,
              v,
              h = r,
              l = {},
              a = {},
              y = i._transform,
              p = ni;
            for (
              i._transform = null,
                ni = t,
                r = v = i.parse(n, t, r, u),
                ni = p,
                f &&
                  ((i._transform = y),
                  h && ((h._prev = null), h._prev && (h._prev._next = null)));
              r && r !== h;

            ) {
              if (
                1 >= r.type &&
                ((e = r.p),
                (a[e] = r.s + r.c),
                (l[e] = r.s),
                f || ((s = new bi(r, "s", e, s, r.r)), (r.c = 0)),
                1 === r.type)
              )
                for (c = r.l; --c > 0; )
                  (o = "xn" + c),
                    (e = r.p + "_" + o),
                    (a[e] = r.data[o]),
                    (l[e] = r[o]),
                    f || (s = new bi(r, o, e, s, r.rxp[o]));
              r = r._next;
            }
            return {
              proxy: l,
              end: a,
              firstMPT: s,
              pt: v,
            };
          }),
          (w.CSSPropTween = function (n, t, i, r, u, f, e, s, h, c, l) {
            this.t = n;
            this.p = t;
            this.s = i;
            this.c = r;
            this.n = e || t;
            n instanceof o || fi.push(this.n);
            this.r = s;
            this.type = f || 0;
            h && ((this.pr = h), (ft = !0));
            this.b = void 0 === c ? i : c;
            this.e = void 0 === l ? i + r : l;
            u && ((this._next = u), (u._prev = this));
          })),
        ii = function (n, t, i, r, u, f) {
          var e = new o(n, t, i, r - i, u, -1, f);
          return (e.b = i), (e.e = e.xs0 = r), e;
        },
        ri = (r.parseComplex = function (n, t, i, r, u, f, e, s, h, c) {
          i = i || f || "";
          e = new o(n, t, 0, 0, e, c ? 2 : 1, null, !1, s, i, r);
          r += "";
          var y,
            d,
            g,
            a,
            v,
            ut,
            ft,
            it,
            w,
            et,
            nt,
            b,
            ot,
            k = i.split(", ").join(",").split(" "),
            rt = r.split(", ").join(",").split(" "),
            st = k.length,
            ht = ei !== !1;
          for (
            (-1 !== r.indexOf(",") || -1 !== i.indexOf(",")) &&
              ((k = k.join(" ").replace(p, ", ").split(" ")),
              (rt = rt.join(" ").replace(p, ", ").split(" ")),
              (st = k.length)),
              st !== rt.length && ((k = (f || "").split(" ")), (st = k.length)),
              e.plugin = h,
              e.setRatio = c,
              l.lastIndex = 0,
              y = 0;
            st > y;
            y++
          )
            if (((a = k[y]), (v = rt[y]), (it = parseFloat(a)), it || 0 === it))
              e.appendXtra(
                "",
                it,
                ct(v, it),
                v.replace(oi, ""),
                ht && -1 !== v.indexOf("px"),
                !0
              );
            else if (u && l.test(a))
              (b = "," === v.charAt(v.length - 1) ? ")," : ")"),
                (ot = -1 !== v.indexOf("hsl") && tt),
                (a = ti(a, ot)),
                (v = ti(v, ot)),
                (w = a.length + v.length > 6),
                w && !tt && 0 === v[3]
                  ? ((e["xs" + e.l] += e.l ? " transparent" : "transparent"),
                    (e.e = e.e.split(rt[y]).join("transparent")))
                  : (tt || (w = !1),
                    ot
                      ? e
                          .appendXtra(
                            w ? "hsla(" : "hsl(",
                            a[0],
                            ct(v[0], a[0]),
                            ",",
                            !1,
                            !0
                          )
                          .appendXtra("", a[1], ct(v[1], a[1]), "%,", !1)
                          .appendXtra(
                            "",
                            a[2],
                            ct(v[2], a[2]),
                            w ? "%," : "%" + b,
                            !1
                          )
                      : e
                          .appendXtra(
                            w ? "rgba(" : "rgb(",
                            a[0],
                            v[0] - a[0],
                            ",",
                            !0,
                            !0
                          )
                          .appendXtra("", a[1], v[1] - a[1], ",", !0)
                          .appendXtra("", a[2], v[2] - a[2], w ? "," : b, !0),
                    w &&
                      ((a = 4 > a.length ? 1 : a[3]),
                      e.appendXtra(
                        "",
                        a,
                        (4 > v.length ? 1 : v[3]) - a,
                        b,
                        !1
                      ))),
                (l.lastIndex = 0);
            else if ((ut = a.match(dt))) {
              if (((ft = v.match(oi)), !ft || ft.length !== ut.length))
                return e;
              for (g = 0, d = 0; ut.length > d; d++)
                (nt = ut[d]),
                  (et = a.indexOf(nt, g)),
                  e.appendXtra(
                    a.substr(g, et - g),
                    Number(nt),
                    ct(ft[d], nt),
                    "",
                    ht && "px" === a.substr(et + nt.length, 2),
                    0 === d
                  ),
                  (g = et + nt.length);
              e["xs" + e.l] += a.substr(g);
            } else e["xs" + e.l] += e.l ? " " + a : a;
          if (-1 !== r.indexOf("=") && e.data) {
            for (b = e.xs0 + e.data.s, y = 1; e.l > y; y++)
              b += e["xs" + y] + e.data["xn" + y];
            e.e = b + e["xs" + y];
          }
          return e.l || ((e.type = -1), (e.xs0 = e.e)), e.xfirst || e;
        }),
        s = 9;
      for (i = o.prototype, i.l = i.pr = 0; --s > 0; )
        (i["xn" + s] = 0), (i["xs" + s] = "");
      i.xs0 = "";
      i._next = i._prev = i.xfirst = i.data = i.plugin = i.setRatio = i.rxp = null;
      i.appendXtra = function (n, t, i, r, u, f) {
        var e = this,
          s = e.l;
        return (
          (e["xs" + s] += f && s ? " " + n : n || ""),
          i || 0 === s || e.plugin
            ? (e.l++,
              (e.type = e.setRatio ? 2 : 1),
              (e["xs" + e.l] = r || ""),
              s > 0
                ? ((e.data["xn" + s] = t + i),
                  (e.rxp["xn" + s] = u),
                  (e["xn" + s] = t),
                  e.plugin ||
                    ((e.xfirst = new o(
                      e,
                      "xn" + s,
                      t,
                      i,
                      e.xfirst || e,
                      0,
                      e.n,
                      u,
                      e.pr
                    )),
                    (e.xfirst.xs0 = 0)),
                  e)
                : ((e.data = {
                    s: t + i,
                  }),
                  (e.rxp = {}),
                  (e.s = t),
                  (e.c = i),
                  (e.r = u),
                  e))
            : ((e["xs" + s] += t + (r || "")), e)
        );
      };
      var hr = function (n, t) {
          t = t || {};
          this.p = t.prefix ? et(n) || n : n;
          a[n] = a[this.p] = this;
          this.format =
            t.formatter || sr(t.defaultValue, t.color, t.collapsible, t.multi);
          t.parser && (this.parse = t.parser);
          this.clrs = t.color;
          this.multi = t.multi;
          this.keyword = t.keyword;
          this.dflt = t.defaultValue;
          this.pr = t.priority || 0;
        },
        e = (w._registerComplexSpecialProp = function (n, t, i) {
          "object" != typeof t &&
            (t = {
              parser: i,
            });
          var r,
            e,
            u = n.split(","),
            f = t.defaultValue;
          for (i = i || [f], r = 0; u.length > r; r++)
            (t.prefix = 0 === r && t.prefix),
              (t.defaultValue = i[r] || f),
              (e = new hr(u[r], t));
        }),
        lu = function (n) {
          if (!a[n]) {
            var t = n.charAt(0).toUpperCase() + n.substr(1) + "Plugin";
            e(n, {
              parser: function (n, i, r, u, f, e, o) {
                var s = nu.com.greensock.plugins[t];
                return s
                  ? (s._cssRegister(), a[r].parse(n, i, r, u, f, e, o))
                  : (ur("Error: " + t + " js file not loaded."), f);
              },
            });
          }
        };
      i = hr.prototype;
      i.parseComplex = function (n, t, i, r, u, f) {
        var e,
          o,
          s,
          a,
          c,
          l,
          h = this.keyword;
        if (
          (this.multi &&
            (p.test(i) || p.test(t)
              ? ((o = t.replace(p, "|").split("|")),
                (s = i.replace(p, "|").split("|")))
              : h && ((o = [t]), (s = [i]))),
          s)
        ) {
          for (a = s.length > o.length ? s.length : o.length, e = 0; a > e; e++)
            (t = o[e] = o[e] || this.dflt),
              (i = s[e] = s[e] || this.dflt),
              h &&
                ((c = t.indexOf(h)),
                (l = i.indexOf(h)),
                c !== l &&
                  (-1 === l
                    ? (o[e] = o[e].split(h).join(""))
                    : -1 === c && (o[e] += " " + h)));
          t = o.join(", ");
          i = s.join(", ");
        }
        return ri(n, this.p, t, i, this.clrs, this.dflt, r, this.pr, u, f);
      };
      i.parse = function (n, t, i, r, e, o) {
        return this.parseComplex(
          n.style,
          this.format(u(n, this.p, f, !1, this.dflt)),
          this.format(t),
          e,
          o
        );
      };
      r.registerSpecialProp = function (n, t, i) {
        e(n, {
          parser: function (n, r, u, f, e, s) {
            var h = new o(n, u, 0, 0, e, 2, u, !1, i);
            return (h.plugin = s), (h.setRatio = t(n, r, f._tween, u)), h;
          },
          priority: i,
        });
      };
      r.useSVGTransformAttr = bt || kt;
      var nt,
        cr = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(
          ","
        ),
        h = et("transform"),
        lr = fr + "transform",
        vt = et("transformOrigin"),
        y = null !== et("perspective"),
        ui = (w.Transform = function () {
          this.perspective = parseFloat(r.defaultTransformPerspective) || 0;
          this.force3D =
            r.defaultForce3D !== !1 && y ? r.defaultForce3D || "auto" : !1;
        }),
        au = window.SVGElement,
        ar = function (n, t, i) {
          var r,
            u = v.createElementNS("http://www.w3.org/2000/svg", n),
            f = /([a-z])([A-Z])/g;
          for (r in i)
            u.setAttributeNS(null, r.replace(f, "$1-$2").toLowerCase(), i[r]);
          return t.appendChild(u), u;
        },
        vr = v.documentElement,
        vu = (function () {
          var t,
            n,
            r,
            i = it || (/Android/i.test(b) && !window.chrome);
          return (
            v.createElementNS &&
              !i &&
              ((t = ar("svg", vr)),
              (n = ar("rect", t, {
                width: 100,
                height: 50,
                x: 100,
              })),
              (r = n.getBoundingClientRect().width),
              (n.style[vt] = "50% 50%"),
              (n.style[h] = "scaleX(0.5)"),
              (i = r === n.getBoundingClientRect().width && !(kt && y)),
              vr.removeChild(t)),
            i
          );
        })(),
        yr = function (n, t, i, u, f) {
          var h,
            l,
            a,
            v,
            y,
            p,
            o,
            w,
            b,
            k,
            d,
            c,
            g,
            nt,
            s = n._gsTransform,
            e = wr(n, !0);
          s && ((g = s.xOrigin), (nt = s.yOrigin));
          (!u || 2 > (h = u.split(" ")).length) &&
            ((o = n.getBBox()),
            (t = ht(t).split(" ")),
            (h = [
              (-1 !== t[0].indexOf("%")
                ? (parseFloat(t[0]) / 100) * o.width
                : parseFloat(t[0])) + o.x,
              (-1 !== t[1].indexOf("%")
                ? (parseFloat(t[1]) / 100) * o.height
                : parseFloat(t[1])) + o.y,
            ]));
          i.xOrigin = v = parseFloat(h[0]);
          i.yOrigin = y = parseFloat(h[1]);
          u &&
            e !== ki &&
            ((p = e[0]),
            (o = e[1]),
            (w = e[2]),
            (b = e[3]),
            (k = e[4]),
            (d = e[5]),
            (c = p * b - o * w),
            (l = v * (b / c) + y * (-w / c) + (w * d - b * k) / c),
            (a = v * (-o / c) + y * (p / c) - (p * d - o * k) / c),
            (v = i.xOrigin = h[0] = l),
            (y = i.yOrigin = h[1] = a));
          s &&
            (f || (f !== !1 && r.defaultSmoothOrigin !== !1)
              ? ((l = v - g),
                (a = y - nt),
                (s.xOffset += l * e[0] + a * e[2] - l),
                (s.yOffset += l * e[1] + a * e[3] - a))
              : (s.xOffset = s.yOffset = 0));
          n.setAttribute("data-svg-origin", h.join(" "));
        },
        pr = function (n) {
          return !!(
            au &&
            "function" == typeof n.getBBox &&
            n.getCTM &&
            (!n.parentNode || (n.parentNode.getBBox && n.parentNode.getCTM))
          );
        },
        ki = [1, 0, 0, 1, 0, 0],
        wr = function (n, t) {
          var f,
            r,
            i,
            e,
            o,
            c = n._gsTransform || new ui(),
            l = 1e5;
          if (
            (h
              ? (r = u(n, lr, null, !0))
              : n.currentStyle &&
                ((r = n.currentStyle.filter.match(eu)),
                (r =
                  r && 4 === r.length
                    ? [
                        r[0].substr(4),
                        Number(r[2].substr(4)),
                        Number(r[1].substr(4)),
                        r[3].substr(4),
                        c.x || 0,
                        c.y || 0,
                      ].join(",")
                    : "")),
            (f = !r || "none" === r || "matrix(1, 0, 0, 1, 0, 0)" === r),
            (c.svg || (n.getBBox && pr(n))) &&
              (f &&
                -1 !== (n.style[h] + "").indexOf("matrix") &&
                ((r = n.style[h]), (f = 0)),
              (i = n.getAttribute("transform")),
              f &&
                i &&
                (-1 !== i.indexOf("matrix")
                  ? ((r = i), (f = 0))
                  : -1 !== i.indexOf("translate") &&
                    ((r =
                      "matrix(1,0,0,1," +
                      i.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") +
                      ")"),
                    (f = 0)))),
            f)
          )
            return ki;
          for (
            i = (r || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], s = i.length;
            --s > -1;

          )
            (e = Number(i[s])),
              (i[s] = (o = e - (e |= 0))
                ? (0 | (o * l + (0 > o ? -0.5 : 0.5))) / l + e
                : e);
          return t && i.length > 6 ? [i[0], i[1], i[4], i[5], i[12], i[13]] : i;
        },
        ut = (w.getTransform = function (n, i, e, o) {
          if (n._gsTransform && e && !o) return n._gsTransform;
          var c,
            wt,
            gt,
            ni,
            ut,
            it,
            s = e ? n._gsTransform || new ui() : new ui(),
            ei = 0 > s.scaleX,
            ti = 2e-5,
            ft = 1e5,
            oi = y
              ? parseFloat(u(n, vt, i, !1, "0 0 0").split(" ")[2]) ||
                s.zOrigin ||
                0
              : 0,
            si = parseFloat(r.defaultTransformPerspective) || 0;
          if (
            ((s.svg = !(!n.getBBox || !pr(n))),
            s.svg &&
              (yr(
                n,
                u(n, vt, f, !1, "50% 50%") + "",
                s,
                n.getAttribute("data-svg-origin")
              ),
              (nt = r.useSVGTransformAttr || vu)),
            (c = wr(n)),
            c !== ki)
          ) {
            if (16 === c.length) {
              var bt,
                et,
                kt,
                l,
                a,
                d = c[0],
                w = c[1],
                dt = c[2],
                hi = c[3],
                ht = c[4],
                b = c[5],
                g = c[6],
                ci = c[7],
                ot = c[8],
                k = c[9],
                p = c[10],
                ii = c[12],
                ri = c[13],
                st = c[14],
                tt = c[11],
                v = Math.atan2(g, p);
              s.zOrigin &&
                ((st = -s.zOrigin),
                (ii = ot * st - c[12]),
                (ri = k * st - c[13]),
                (st = p * st + s.zOrigin - c[14]));
              s.rotationX = v * rt;
              v &&
                ((l = Math.cos(-v)),
                (a = Math.sin(-v)),
                (bt = ht * l + ot * a),
                (et = b * l + k * a),
                (kt = g * l + p * a),
                (ot = ht * -a + ot * l),
                (k = b * -a + k * l),
                (p = g * -a + p * l),
                (tt = ci * -a + tt * l),
                (ht = bt),
                (b = et),
                (g = kt));
              v = Math.atan2(ot, p);
              s.rotationY = v * rt;
              v &&
                ((l = Math.cos(-v)),
                (a = Math.sin(-v)),
                (bt = d * l - ot * a),
                (et = w * l - k * a),
                (kt = dt * l - p * a),
                (k = w * a + k * l),
                (p = dt * a + p * l),
                (tt = hi * a + tt * l),
                (d = bt),
                (w = et),
                (dt = kt));
              v = Math.atan2(w, d);
              s.rotation = v * rt;
              v &&
                ((l = Math.cos(-v)),
                (a = Math.sin(-v)),
                (d = d * l + ht * a),
                (et = w * l + b * a),
                (b = w * -a + b * l),
                (g = dt * -a + g * l),
                (w = et));
              s.rotationX &&
                Math.abs(s.rotationX) + Math.abs(s.rotation) > 359.9 &&
                ((s.rotationX = s.rotation = 0), (s.rotationY += 180));
              s.scaleX = (0 | (Math.sqrt(d * d + w * w) * ft + 0.5)) / ft;
              s.scaleY = (0 | (Math.sqrt(b * b + k * k) * ft + 0.5)) / ft;
              s.scaleZ = (0 | (Math.sqrt(g * g + p * p) * ft + 0.5)) / ft;
              s.skewX = 0;
              s.perspective = tt ? 1 / (0 > tt ? -tt : tt) : 0;
              s.x = ii;
              s.y = ri;
              s.z = st;
              s.svg &&
                ((s.x -= s.xOrigin - (s.xOrigin * d - s.yOrigin * ht)),
                (s.y -= s.yOrigin - (s.yOrigin * w - s.xOrigin * b)));
            } else if (
              !(
                (y &&
                  !o &&
                  c.length &&
                  s.x === c[4] &&
                  s.y === c[5] &&
                  (s.rotationX || s.rotationY)) ||
                (void 0 !== s.x && "none" === u(n, "display", i))
              )
            ) {
              var fi = c.length >= 6,
                ct = fi ? c[0] : 1,
                lt = c[1] || 0,
                at = c[2] || 0,
                pt = fi ? c[3] : 1;
              s.x = c[4] || 0;
              s.y = c[5] || 0;
              gt = Math.sqrt(ct * ct + lt * lt);
              ni = Math.sqrt(pt * pt + at * at);
              ut = ct || lt ? Math.atan2(lt, ct) * rt : s.rotation || 0;
              it = at || pt ? Math.atan2(at, pt) * rt + ut : s.skewX || 0;
              Math.abs(it) > 90 &&
                270 > Math.abs(it) &&
                (ei
                  ? ((gt *= -1),
                    (it += 0 >= ut ? 180 : -180),
                    (ut += 0 >= ut ? 180 : -180))
                  : ((ni *= -1), (it += 0 >= it ? 180 : -180)));
              s.scaleX = gt;
              s.scaleY = ni;
              s.rotation = ut;
              s.skewX = it;
              y &&
                ((s.rotationX = s.rotationY = s.z = 0),
                (s.perspective = si),
                (s.scaleZ = 1));
              s.svg &&
                ((s.x -= s.xOrigin - (s.xOrigin * ct + s.yOrigin * at)),
                (s.y -= s.yOrigin - (s.xOrigin * lt + s.yOrigin * pt)));
            }
            s.zOrigin = oi;
            for (wt in s) ti > s[wt] && s[wt] > -ti && (s[wt] = 0);
          }
          return (
            e &&
              ((n._gsTransform = s),
              s.svg &&
                (nt && n.style[h]
                  ? t.delayedCall(0.001, function () {
                      yt(n.style, h);
                    })
                  : !nt &&
                    n.getAttribute("transform") &&
                    t.delayedCall(0.001, function () {
                      n.removeAttribute("transform");
                    }))),
            s
          );
        }),
        yu = function (n) {
          var o,
            y,
            t = this.data,
            nt = -t.rotation * d,
            ft = nt + t.skewX * d,
            e = 1e5,
            h = (0 | (Math.cos(nt) * t.scaleX * e)) / e,
            u = (0 | (Math.sin(nt) * t.scaleX * e)) / e,
            f = (0 | (Math.sin(ft) * -t.scaleY * e)) / e,
            c = (0 | (Math.cos(ft) * t.scaleY * e)) / e,
            b = this.t.style,
            g = this.t.currentStyle,
            w,
            v,
            et,
            ot;
          if (g) {
            y = u;
            u = -f;
            f = -y;
            o = g.filter;
            b.filter = "";
            var i,
              r,
              l = this.t.offsetWidth,
              a = this.t.offsetHeight,
              tt = "absolute" !== g.position,
              p =
                "progid:DXImageTransform.Microsoft.Matrix(M11=" +
                h +
                ", M12=" +
                u +
                ", M21=" +
                f +
                ", M22=" +
                c,
              rt = t.x + (l * t.xPercent) / 100,
              ut = t.y + (a * t.yPercent) / 100;
            if (
              (null != t.ox &&
                ((i = (t.oxp ? 0.01 * l * t.ox : t.ox) - l / 2),
                (r = (t.oyp ? 0.01 * a * t.oy : t.oy) - a / 2),
                (rt += i - (i * h + r * u)),
                (ut += r - (i * f + r * c))),
              tt
                ? ((i = l / 2),
                  (r = a / 2),
                  (p +=
                    ", Dx=" +
                    (i - (i * h + r * u) + rt) +
                    ", Dy=" +
                    (r - (i * f + r * c) + ut) +
                    ")"))
                : (p += ", sizingMethod='auto expand')"),
              (b.filter =
                -1 !== o.indexOf("DXImageTransform.Microsoft.Matrix(")
                  ? o.replace(ou, p)
                  : p + " " + o),
              (0 === n || 1 === n) &&
                1 === h &&
                0 === u &&
                0 === f &&
                1 === c &&
                ((tt && -1 === p.indexOf("Dx=0, Dy=0")) ||
                  (ci.test(o) && 100 !== parseFloat(RegExp.$1)) ||
                  (-1 === o.indexOf("gradient(" && o.indexOf("Alpha")) &&
                    b.removeAttribute("filter"))),
              !tt)
            )
              for (
                ot = 8 > it ? 1 : -1,
                  i = t.ieOffsetX || 0,
                  r = t.ieOffsetY || 0,
                  t.ieOffsetX = Math.round(
                    (l - ((0 > h ? -h : h) * l + (0 > u ? -u : u) * a)) / 2 + rt
                  ),
                  t.ieOffsetY = Math.round(
                    (a - ((0 > c ? -c : c) * a + (0 > f ? -f : f) * l)) / 2 + ut
                  ),
                  s = 0;
                4 > s;
                s++
              )
                (v = hu[s]),
                  (w = g[v]),
                  (y =
                    -1 !== w.indexOf("px")
                      ? parseFloat(w)
                      : k(this.t, v, parseFloat(w), w.replace(gt, "")) || 0),
                  (et =
                    y !== t[v]
                      ? 2 > s
                        ? -t.ieOffsetX
                        : -t.ieOffsetY
                      : 2 > s
                      ? i - t.ieOffsetX
                      : r - t.ieOffsetY),
                  (b[v] =
                    (t[v] = Math.round(
                      y - et * (0 === s || 2 === s ? 1 : ot)
                    )) + "px");
          }
        },
        pu = (w.set3DTransformRatio = w.setTransformRatio = function (n) {
          var c,
            l,
            tt,
            a,
            v,
            it,
            lt,
            at,
            rt,
            vt,
            yt,
            ut,
            ht,
            i,
            f,
            e,
            u,
            gt,
            g,
            o,
            s,
            pt,
            ft,
            t = this.data,
            wt = this.t.style,
            r = t.rotation,
            bt = t.rotationX,
            dt = t.rotationY,
            b = t.scaleX,
            k = t.scaleY,
            et = t.scaleZ,
            p = t.x,
            w = t.y,
            ot = t.z,
            ct = t.svg,
            st = t.perspective,
            ni = t.force3D;
          if (
            !(
              ((((1 !== n && 0 !== n) ||
                "auto" !== ni ||
                (this.tween._totalTime !== this.tween._totalDuration &&
                  this.tween._totalTime)) &&
                ni) ||
                ot ||
                st ||
                dt ||
                bt) &&
              (!nt || !ct) &&
              y
            )
          )
            return (
              r || t.skewX || ct
                ? ((r *= d),
                  (pt = t.skewX * d),
                  (ft = 1e5),
                  (c = Math.cos(r) * b),
                  (a = Math.sin(r) * b),
                  (l = Math.sin(r - pt) * -k),
                  (v = Math.cos(r - pt) * k),
                  pt &&
                    "simple" === t.skewType &&
                    ((u = Math.tan(pt)),
                    (u = Math.sqrt(1 + u * u)),
                    (l *= u),
                    (v *= u),
                    t.skewY && ((c *= u), (a *= u))),
                  ct &&
                    ((p +=
                      t.xOrigin - (t.xOrigin * c + t.yOrigin * l) + t.xOffset),
                    (w +=
                      t.yOrigin - (t.xOrigin * a + t.yOrigin * v) + t.yOffset),
                    nt &&
                      (t.xPercent || t.yPercent) &&
                      ((i = this.t.getBBox()),
                      (p += 0.01 * t.xPercent * i.width),
                      (w += 0.01 * t.yPercent * i.height)),
                    (i = 1e-6),
                    i > p && p > -i && (p = 0),
                    i > w && w > -i && (w = 0)),
                  (g =
                    (0 | (c * ft)) / ft +
                    "," +
                    (0 | (a * ft)) / ft +
                    "," +
                    (0 | (l * ft)) / ft +
                    "," +
                    (0 | (v * ft)) / ft +
                    "," +
                    p +
                    "," +
                    w +
                    ")"),
                  ct && nt
                    ? this.t.setAttribute("transform", "matrix(" + g)
                    : (wt[h] =
                        (t.xPercent || t.yPercent
                          ? "translate(" +
                            t.xPercent +
                            "%," +
                            t.yPercent +
                            "%) matrix("
                          : "matrix(") + g))
                : (wt[h] =
                    (t.xPercent || t.yPercent
                      ? "translate(" +
                        t.xPercent +
                        "%," +
                        t.yPercent +
                        "%) matrix("
                      : "matrix(") +
                    b +
                    ",0,0," +
                    k +
                    "," +
                    p +
                    "," +
                    w +
                    ")"),
              void 0
            );
          if (
            (kt &&
              ((i = 0.0001),
              i > b && b > -i && (b = et = 2e-5),
              i > k && k > -i && (k = et = 2e-5),
              !st || t.z || t.rotationX || t.rotationY || (st = 0)),
            r || t.skewX)
          )
            (r *= d),
              (f = c = Math.cos(r)),
              (e = a = Math.sin(r)),
              t.skewX &&
                ((r -= t.skewX * d),
                (f = Math.cos(r)),
                (e = Math.sin(r)),
                "simple" === t.skewType &&
                  ((u = Math.tan(t.skewX * d)),
                  (u = Math.sqrt(1 + u * u)),
                  (f *= u),
                  (e *= u),
                  t.skewY && ((c *= u), (a *= u)))),
              (l = -e),
              (v = f);
          else {
            if (!(dt || bt || 1 !== et || st || ct))
              return (
                (wt[h] =
                  (t.xPercent || t.yPercent
                    ? "translate(" +
                      t.xPercent +
                      "%," +
                      t.yPercent +
                      "%) translate3d("
                    : "translate3d(") +
                  p +
                  "px," +
                  w +
                  "px," +
                  ot +
                  "px)" +
                  (1 !== b || 1 !== k ? " scale(" + b + "," + k + ")" : "")),
                void 0
              );
            c = v = 1;
            l = a = 0;
          }
          rt = 1;
          tt = it = lt = at = vt = yt = 0;
          ut = st ? -1 / st : 0;
          ht = t.zOrigin;
          i = 1e-6;
          o = ",";
          s = "0";
          r = dt * d;
          r &&
            ((f = Math.cos(r)),
            (e = Math.sin(r)),
            (lt = -e),
            (vt = ut * -e),
            (tt = c * e),
            (it = a * e),
            (rt = f),
            (ut *= f),
            (c *= f),
            (a *= f));
          r = bt * d;
          r &&
            ((f = Math.cos(r)),
            (e = Math.sin(r)),
            (u = l * f + tt * e),
            (gt = v * f + it * e),
            (at = rt * e),
            (yt = ut * e),
            (tt = l * -e + tt * f),
            (it = v * -e + it * f),
            (rt *= f),
            (ut *= f),
            (l = u),
            (v = gt));
          1 !== et && ((tt *= et), (it *= et), (rt *= et), (ut *= et));
          1 !== k && ((l *= k), (v *= k), (at *= k), (yt *= k));
          1 !== b && ((c *= b), (a *= b), (lt *= b), (vt *= b));
          (ht || ct) &&
            (ht && ((p += tt * -ht), (w += it * -ht), (ot += rt * -ht + ht)),
            ct &&
              ((p += t.xOrigin - (t.xOrigin * c + t.yOrigin * l) + t.xOffset),
              (w += t.yOrigin - (t.xOrigin * a + t.yOrigin * v) + t.yOffset)),
            i > p && p > -i && (p = s),
            i > w && w > -i && (w = s),
            i > ot && ot > -i && (ot = 0));
          g =
            t.xPercent || t.yPercent
              ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix3d("
              : "matrix3d(";
          g +=
            (i > c && c > -i ? s : c) +
            o +
            (i > a && a > -i ? s : a) +
            o +
            (i > lt && lt > -i ? s : lt);
          g +=
            o +
            (i > vt && vt > -i ? s : vt) +
            o +
            (i > l && l > -i ? s : l) +
            o +
            (i > v && v > -i ? s : v);
          bt || dt
            ? ((g +=
                o +
                (i > at && at > -i ? s : at) +
                o +
                (i > yt && yt > -i ? s : yt) +
                o +
                (i > tt && tt > -i ? s : tt)),
              (g +=
                o +
                (i > it && it > -i ? s : it) +
                o +
                (i > rt && rt > -i ? s : rt) +
                o +
                (i > ut && ut > -i ? s : ut) +
                o))
            : (g += ",0,0,0,0,1,0,");
          g += p + o + w + o + ot + o + (st ? 1 + -ot / st : 1) + ")";
          wt[h] = g;
        });
      for (
        i = ui.prototype,
          i.x = i.y = i.z = i.skewX = i.skewY = i.rotation = i.rotationX = i.rotationY = i.zOrigin = i.xPercent = i.yPercent = i.xOffset = i.yOffset = 0,
          i.scaleX = i.scaleY = i.scaleZ = 1,
          e(
            "transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",
            {
              parser: function (n, t, i, e, s, l, a) {
                if (e._lastParsedTransform === a) return s;
                e._lastParsedTransform = a;
                var p,
                  b,
                  ct,
                  d,
                  k,
                  ft,
                  et,
                  tt,
                  at,
                  yt,
                  ot = n._gsTransform,
                  st = n.style,
                  pt = 1e-6,
                  wt = cr.length,
                  w = a,
                  it = {},
                  rt = "transformOrigin";
                if (
                  (a.display
                    ? ((d = u(n, "display")),
                      (st.display = "block"),
                      (p = ut(n, f, !0, a.parseTransform)),
                      (st.display = d))
                    : (p = ut(n, f, !0, a.parseTransform)),
                  (e._transform = p),
                  "string" == typeof w.transform && h)
                )
                  (d = g.style),
                    (d[h] = w.transform),
                    (d.display = "block"),
                    (d.position = "absolute"),
                    v.body.appendChild(g),
                    (b = ut(g, null, !1)),
                    v.body.removeChild(g),
                    b.perspective || (b.perspective = p.perspective),
                    null != w.xPercent &&
                      (b.xPercent = c(w.xPercent, p.xPercent)),
                    null != w.yPercent &&
                      (b.yPercent = c(w.yPercent, p.yPercent));
                else if ("object" == typeof w) {
                  if (
                    ((b = {
                      scaleX: c(
                        null != w.scaleX ? w.scaleX : w.scale,
                        p.scaleX
                      ),
                      scaleY: c(
                        null != w.scaleY ? w.scaleY : w.scale,
                        p.scaleY
                      ),
                      scaleZ: c(w.scaleZ, p.scaleZ),
                      x: c(w.x, p.x),
                      y: c(w.y, p.y),
                      z: c(w.z, p.z),
                      xPercent: c(w.xPercent, p.xPercent),
                      yPercent: c(w.yPercent, p.yPercent),
                      perspective: c(w.transformPerspective, p.perspective),
                    }),
                    (tt = w.directionalRotation),
                    null != tt)
                  )
                    if ("object" == typeof tt) for (d in tt) w[d] = tt[d];
                    else w.rotation = tt;
                  "string" == typeof w.x &&
                    -1 !== w.x.indexOf("%") &&
                    ((b.x = 0), (b.xPercent = c(w.x, p.xPercent)));
                  "string" == typeof w.y &&
                    -1 !== w.y.indexOf("%") &&
                    ((b.y = 0), (b.yPercent = c(w.y, p.yPercent)));
                  b.rotation = lt(
                    ("rotation" in w)
                      ? w.rotation
                      : ("shortRotation" in w)
                      ? w.shortRotation + "_short"
                      : ("rotationZ" in w)
                      ? w.rotationZ
                      : p.rotation,
                    p.rotation,
                    "rotation",
                    it
                  );
                  y &&
                    ((b.rotationX = lt(
                      ("rotationX" in w)
                        ? w.rotationX
                        : ("shortRotationX" in w)
                        ? w.shortRotationX + "_short"
                        : p.rotationX || 0,
                      p.rotationX,
                      "rotationX",
                      it
                    )),
                    (b.rotationY = lt(
                      ("rotationY" in w)
                        ? w.rotationY
                        : ("shortRotationY" in w)
                        ? w.shortRotationY + "_short"
                        : p.rotationY || 0,
                      p.rotationY,
                      "rotationY",
                      it
                    )));
                  b.skewX = null == w.skewX ? p.skewX : lt(w.skewX, p.skewX);
                  b.skewY = null == w.skewY ? p.skewY : lt(w.skewY, p.skewY);
                  (ct = b.skewY - p.skewY) &&
                    ((b.skewX += ct), (b.rotation += ct));
                }
                for (
                  y &&
                    null != w.force3D &&
                    ((p.force3D = w.force3D), (et = !0)),
                    p.skewType = w.skewType || p.skewType || r.defaultSkewType,
                    ft =
                      p.force3D ||
                      p.z ||
                      p.rotationX ||
                      p.rotationY ||
                      b.z ||
                      b.rotationX ||
                      b.rotationY ||
                      b.perspective,
                    ft || null == w.scale || (b.scaleZ = 1);
                  --wt > -1;

                )
                  (i = cr[wt]),
                    (k = b[i] - p[i]),
                    (k > pt || -pt > k || null != w[i] || null != ni[i]) &&
                      ((et = !0),
                      (s = new o(p, i, p[i], k, s)),
                      (i in it) && (s.e = it[i]),
                      (s.xs0 = 0),
                      (s.plugin = l),
                      e._overwriteProps.push(s.n));
                return (
                  (k = w.transformOrigin),
                  p.svg &&
                    (k || w.svgOrigin) &&
                    ((at = p.xOffset),
                    (yt = p.yOffset),
                    yr(n, ht(k), b, w.svgOrigin, w.smoothOrigin),
                    (s = ii(
                      p,
                      "xOrigin",
                      (ot ? p : b).xOrigin,
                      b.xOrigin,
                      s,
                      rt
                    )),
                    (s = ii(
                      p,
                      "yOrigin",
                      (ot ? p : b).yOrigin,
                      b.yOrigin,
                      s,
                      rt
                    )),
                    (at !== p.xOffset || yt !== p.yOffset) &&
                      ((s = ii(
                        p,
                        "xOffset",
                        ot ? at : p.xOffset,
                        p.xOffset,
                        s,
                        rt
                      )),
                      (s = ii(
                        p,
                        "yOffset",
                        ot ? yt : p.yOffset,
                        p.yOffset,
                        s,
                        rt
                      ))),
                    (k = nt ? null : "0px 0px")),
                  (k || (y && ft && p.zOrigin)) &&
                    (h
                      ? ((et = !0),
                        (i = vt),
                        (k = (k || u(n, i, f, !1, "50% 50%")) + ""),
                        (s = new o(st, i, 0, 0, s, -1, rt)),
                        (s.b = st[i]),
                        (s.plugin = l),
                        y
                          ? ((d = p.zOrigin),
                            (k = k.split(" ")),
                            (p.zOrigin =
                              (k.length > 2 && (0 === d || "0px" !== k[2])
                                ? parseFloat(k[2])
                                : d) || 0),
                            (s.xs0 = s.e =
                              k[0] + " " + (k[1] || "50%") + " 0px"),
                            (s = new o(p, "zOrigin", 0, 0, s, -1, s.n)),
                            (s.b = d),
                            (s.xs0 = s.e = p.zOrigin))
                          : (s.xs0 = s.e = k))
                      : ht(k + "", p)),
                  et &&
                    (e._transformType =
                      (p.svg && nt) || (!ft && 3 !== this._transformType)
                        ? 2
                        : 3),
                  s
                );
              },
              prefix: !0,
            }
          ),
          e("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset",
          }),
          e("borderRadius", {
            defaultValue: "0px",
            parser: function (n, t, i, r, e) {
              t = this.format(t);
              var tt,
                l,
                d,
                h,
                o,
                s,
                p,
                a,
                it,
                rt,
                c,
                v,
                g,
                w,
                b,
                nt,
                y = [
                  "borderTopLeftRadius",
                  "borderTopRightRadius",
                  "borderBottomRightRadius",
                  "borderBottomLeftRadius",
                ],
                ut = n.style;
              for (
                it = parseFloat(n.offsetWidth),
                  rt = parseFloat(n.offsetHeight),
                  tt = t.split(" "),
                  l = 0;
                y.length > l;
                l++
              )
                this.p.indexOf("border") && (y[l] = et(y[l])),
                  (o = h = u(n, y[l], f, !1, "0px")),
                  -1 !== o.indexOf(" ") &&
                    ((h = o.split(" ")), (o = h[0]), (h = h[1])),
                  (s = d = tt[l]),
                  (p = parseFloat(o)),
                  (v = o.substr((p + "").length)),
                  (g = "=" === s.charAt(1)),
                  g
                    ? ((a = parseInt(s.charAt(0) + "1", 10)),
                      (s = s.substr(2)),
                      (a *= parseFloat(s)),
                      (c = s.substr((a + "").length - (0 > a ? 1 : 0)) || ""))
                    : ((a = parseFloat(s)), (c = s.substr((a + "").length))),
                  "" === c && (c = wt[i] || v),
                  c !== v &&
                    ((w = k(n, "borderLeft", p, v)),
                    (b = k(n, "borderTop", p, v)),
                    "%" === c
                      ? ((o = 100 * (w / it) + "%"), (h = 100 * (b / rt) + "%"))
                      : "em" === c
                      ? ((nt = k(n, "borderLeft", 1, "em")),
                        (o = w / nt + "em"),
                        (h = b / nt + "em"))
                      : ((o = w + "px"), (h = b + "px")),
                    g &&
                      ((s = parseFloat(o) + a + c),
                      (d = parseFloat(h) + a + c))),
                  (e = ri(ut, y[l], o + " " + h, s + " " + d, !1, "0px", e));
              return e;
            },
            prefix: !0,
            formatter: sr("0px 0px 0px 0px", !1, !0),
          }),
          e("backgroundPosition", {
            defaultValue: "0 0",
            parser: function (n, t, i, r, e, o) {
              var c,
                b,
                h,
                v,
                y,
                l,
                p = "background-position",
                a = f || ot(n, null),
                s = this.format(
                  (a
                    ? it
                      ? a.getPropertyValue(p + "-x") +
                        " " +
                        a.getPropertyValue(p + "-y")
                      : a.getPropertyValue(p)
                    : n.currentStyle.backgroundPositionX +
                      " " +
                      n.currentStyle.backgroundPositionY) || "0 0"
                ),
                w = this.format(t);
              if (
                (-1 !== s.indexOf("%")) != (-1 !== w.indexOf("%")) &&
                ((l = u(n, "backgroundImage").replace(uu, "")),
                l && "none" !== l)
              ) {
                for (
                  c = s.split(" "),
                    b = w.split(" "),
                    ai.setAttribute("src", l),
                    h = 2;
                  --h > -1;

                )
                  (s = c[h]),
                    (v = -1 !== s.indexOf("%")),
                    v !== (-1 !== b[h].indexOf("%")) &&
                      ((y =
                        0 === h
                          ? n.offsetWidth - ai.width
                          : n.offsetHeight - ai.height),
                      (c[h] = v
                        ? (parseFloat(s) / 100) * y + "px"
                        : 100 * (parseFloat(s) / y) + "%"));
                s = c.join(" ");
              }
              return this.parseComplex(n.style, s, w, e, o);
            },
            formatter: ht,
          }),
          e("backgroundSize", {
            defaultValue: "0 0",
            formatter: ht,
          }),
          e("perspective", {
            defaultValue: "0px",
            prefix: !0,
          }),
          e("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0,
          }),
          e("transformStyle", {
            prefix: !0,
          }),
          e("backfaceVisibility", {
            prefix: !0,
          }),
          e("userSelect", {
            prefix: !0,
          }),
          e("margin", {
            parser: wi("marginTop,marginRight,marginBottom,marginLeft"),
          }),
          e("padding", {
            parser: wi("paddingTop,paddingRight,paddingBottom,paddingLeft"),
          }),
          e("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function (n, t, i, r, e, o) {
              var c, s, h;
              return (
                9 > it
                  ? ((s = n.currentStyle),
                    (h = 8 > it ? " " : ","),
                    (c =
                      "rect(" +
                      s.clipTop +
                      h +
                      s.clipRight +
                      h +
                      s.clipBottom +
                      h +
                      s.clipLeft +
                      ")"),
                    (t = this.format(t).split(",").join(h)))
                  : ((c = this.format(u(n, this.p, f, !1, this.dflt))),
                    (t = this.format(t))),
                this.parseComplex(n.style, c, t, e, o)
              );
            },
          }),
          e("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0,
          }),
          e("autoRound,strictUnits", {
            parser: function (n, t, i, r, u) {
              return u;
            },
          }),
          e("border", {
            defaultValue: "0px solid #000",
            parser: function (n, t, i, r, e, o) {
              return this.parseComplex(
                n.style,
                this.format(
                  u(n, "borderTopWidth", f, !1, "0px") +
                    " " +
                    u(n, "borderTopStyle", f, !1, "solid") +
                    " " +
                    u(n, "borderTopColor", f, !1, "#000")
                ),
                this.format(t),
                e,
                o
              );
            },
            color: !0,
            formatter: function (n) {
              var t = n.split(" ");
              return (
                t[0] +
                " " +
                (t[1] || "solid") +
                " " +
                (n.match(l) || ["#000"])[0]
              );
            },
          }),
          e("borderWidth", {
            parser: wi(
              "borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth"
            ),
          }),
          e("float,cssFloat,styleFloat", {
            parser: function (n, t, i, r, u) {
              var f = n.style,
                e = ("cssFloat" in f) ? "cssFloat" : "styleFloat";
              return new o(f, e, 0, 0, u, -1, i, !1, 0, f[e], t);
            },
          }),
          br = function (n) {
            var f,
              i = this.t,
              t = i.filter || u(this.data, "filter") || "",
              r = 0 | (this.s + this.c * n);
            100 === r &&
              (-1 === t.indexOf("atrix(") &&
              -1 === t.indexOf("radient(") &&
              -1 === t.indexOf("oader(")
                ? (i.removeAttribute("filter"), (f = !u(this.data, "filter")))
                : ((i.filter = t.replace(iu, "")), (f = !0)));
            f ||
              (this.xn1 && (i.filter = t = t || "alpha(opacity=" + r + ")"),
              -1 === t.indexOf("pacity")
                ? (0 === r && this.xn1) ||
                  (i.filter = t + " alpha(opacity=" + r + ")")
                : (i.filter = t.replace(ci, "opacity=" + r)));
          },
          e("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function (n, t, i, r, e, s) {
              var h = parseFloat(u(n, "opacity", f, !1, "1")),
                c = n.style,
                l = "autoAlpha" === i;
              return (
                "string" == typeof t &&
                  "=" === t.charAt(1) &&
                  (t =
                    ("-" === t.charAt(0) ? -1 : 1) * parseFloat(t.substr(2)) +
                    h),
                l &&
                  1 === h &&
                  "hidden" === u(n, "visibility", f) &&
                  0 !== t &&
                  (h = 0),
                tt
                  ? (e = new o(c, "opacity", h, t - h, e))
                  : ((e = new o(c, "opacity", 100 * h, 100 * (t - h), e)),
                    (e.xn1 = l ? 1 : 0),
                    (c.zoom = 1),
                    (e.type = 2),
                    (e.b = "alpha(opacity=" + e.s + ")"),
                    (e.e = "alpha(opacity=" + (e.s + e.c) + ")"),
                    (e.data = n),
                    (e.plugin = s),
                    (e.setRatio = br)),
                l &&
                  ((e = new o(
                    c,
                    "visibility",
                    0,
                    0,
                    e,
                    -1,
                    null,
                    !1,
                    0,
                    0 !== h ? "inherit" : "hidden",
                    0 === t ? "hidden" : "inherit"
                  )),
                  (e.xs0 = "inherit"),
                  r._overwriteProps.push(e.n),
                  r._overwriteProps.push(i)),
                e
              );
            },
          }),
          yt = function (n, t) {
            t &&
              (n.removeProperty
                ? (("ms" === t.substr(0, 2) || "webkit" === t.substr(0, 6)) &&
                    (t = "-" + t),
                  n.removeProperty(t.replace(nr, "-$1").toLowerCase()))
                : n.removeAttribute(t));
          },
          kr = function (n) {
            if (((this.t._gsClassPT = this), 1 === n || 0 === n)) {
              this.t.setAttribute("class", 0 === n ? this.b : this.e);
              for (var t = this.data, i = this.t.style; t; )
                t.v ? (i[t.p] = t.v) : yt(i, t.p), (t = t._next);
              1 === n &&
                this.t._gsClassPT === this &&
                (this.t._gsClassPT = null);
            } else
              this.t.getAttribute("class") !== this.e &&
                this.t.setAttribute("class", this.e);
          },
          e("className", {
            parser: function (n, t, i, r, u, e, s) {
              var c,
                y,
                l,
                a,
                h,
                v = n.getAttribute("class") || "",
                p = n.style.cssText;
              if (
                ((u = r._classNamePT = new o(n, i, 0, 0, u, 2)),
                (u.setRatio = kr),
                (u.pr = -11),
                (ft = !0),
                (u.b = v),
                (y = st(n, f)),
                (l = n._gsClassPT))
              ) {
                for (a = {}, h = l.data; h; ) (a[h.p] = 1), (h = h._next);
                l.setRatio(1);
              }
              return (
                (n._gsClassPT = u),
                (u.e =
                  "=" !== t.charAt(1)
                    ? t
                    : v.replace(RegExp("\\s*\\b" + t.substr(2) + "\\b"), "") +
                      ("+" === t.charAt(0) ? " " + t.substr(2) : "")),
                n.setAttribute("class", u.e),
                (c = yi(n, y, st(n), s, a)),
                n.setAttribute("class", v),
                (u.data = c.firstMPT),
                (n.style.cssText = p),
                (u = u.xfirst = r.parse(n, c.difs, u, e))
              );
            },
          }),
          dr = function (n) {
            if (
              (1 === n || 0 === n) &&
              this.data._totalTime === this.data._totalDuration &&
              "isFromStart" !== this.data.data
            ) {
              var i,
                t,
                r,
                u,
                f,
                e = this.t.style,
                o = a.transform.parse;
              if ("all" === this.e) (e.cssText = ""), (u = !0);
              else
                for (
                  i = this.e.split(" ").join("").split(","), r = i.length;
                  --r > -1;

                )
                  (t = i[r]),
                    a[t] &&
                      (a[t].parse === o
                        ? (u = !0)
                        : (t = "transformOrigin" === t ? vt : a[t].p)),
                    yt(e, t);
              u &&
                (yt(e, h),
                (f = this.t._gsTransform),
                f &&
                  (f.svg && this.t.removeAttribute("data-svg-origin"),
                  delete this.t._gsTransform));
            }
          },
          e("clearProps", {
            parser: function (n, t, i, r, u) {
              return (
                (u = new o(n, i, 0, 0, u, 2)),
                (u.setRatio = dr),
                (u.e = t),
                (u.pr = -10),
                (u.data = r._tween),
                (ft = !0),
                u
              );
            },
          }),
          i = "bezier,throwProps,physicsProps,physics2D".split(","),
          s = i.length;
        s--;

      )
        lu(i[s]);
      return (
        (i = r.prototype),
        (i._firstPT = i._lastParsedTransform = i._transform = null),
        (i._onInitTween = function (n, t, i) {
          if (!n.nodeType) return !1;
          this._target = n;
          this._tween = i;
          this._vars = t;
          ei = t.autoRound;
          ft = !1;
          wt = t.suffixMap || r.suffixMap;
          f = ot(n, "");
          fi = this._overwriteProps;
          var l,
            s,
            e,
            v,
            w,
            b,
            p,
            y,
            k,
            c = n.style;
          if (
            (di &&
              "" === c.zIndex &&
              ((l = u(n, "zIndex", f)),
              ("auto" === l || "" === l) && this._addLazySet(c, "zIndex", 0)),
            "string" == typeof t &&
              ((v = c.cssText),
              (l = st(n, f)),
              (c.cssText = v + ";" + t),
              (l = yi(n, l, st(n)).difs),
              !tt && tu.test(t) && (l.opacity = parseFloat(RegExp.$1)),
              (t = l),
              (c.cssText = v)),
            (this._firstPT = s = t.className
              ? a.className.parse(
                  n,
                  t.className,
                  "className",
                  this,
                  null,
                  null,
                  t
                )
              : this.parse(n, t, null)),
            this._transformType)
          ) {
            for (
              k = 3 === this._transformType,
                h
                  ? bt &&
                    ((di = !0),
                    "" === c.zIndex &&
                      ((p = u(n, "zIndex", f)),
                      ("auto" === p || "" === p) &&
                        this._addLazySet(c, "zIndex", 0)),
                    gi &&
                      this._addLazySet(
                        c,
                        "WebkitBackfaceVisibility",
                        this._vars.WebkitBackfaceVisibility ||
                          (k ? "visible" : "hidden")
                      ))
                  : (c.zoom = 1),
                e = s;
              e && e._next;

            )
              e = e._next;
            y = new o(n, "transform", 0, 0, null, 2);
            this._linkCSSP(y, null, e);
            y.setRatio = h ? pu : yu;
            y.data = this._transform || ut(n, f, !0);
            y.tween = i;
            y.pr = -1;
            fi.pop();
          }
          if (ft) {
            for (; s; ) {
              for (b = s._next, e = v; e && e.pr > s.pr; ) e = e._next;
              (s._prev = e ? e._prev : w) ? (s._prev._next = s) : (v = s);
              (s._next = e) ? (e._prev = s) : (w = s);
              s = b;
            }
            this._firstPT = v;
          }
          return !0;
        }),
        (i.parse = function (n, t, i, r) {
          var e,
            d,
            h,
            c,
            v,
            s,
            y,
            l,
            p,
            w,
            b = n.style;
          for (e in t)
            (s = t[e]),
              (d = a[e]),
              d
                ? (i = d.parse(n, s, e, this, i, r, t))
                : ((v = u(n, e, f) + ""),
                  (p = "string" == typeof s),
                  "color" === e ||
                  "fill" === e ||
                  "stroke" === e ||
                  -1 !== e.indexOf("Color") ||
                  (p && ru.test(s))
                    ? (p ||
                        ((s = ti(s)),
                        (s =
                          (s.length > 3 ? "rgba(" : "rgb(") +
                          s.join(",") +
                          ")")),
                      (i = ri(b, e, v, s, !0, "transparent", i, 0, r)))
                    : !p || (-1 === s.indexOf(" ") && -1 === s.indexOf(","))
                    ? ((h = parseFloat(v)),
                      (y = h || 0 === h ? v.substr((h + "").length) : ""),
                      ("" === v || "auto" === v) &&
                        ("width" === e || "height" === e
                          ? ((h = cu(n, e, f)), (y = "px"))
                          : "left" === e || "top" === e
                          ? ((h = er(n, e, f)), (y = "px"))
                          : ((h = "opacity" !== e ? 0 : 1), (y = ""))),
                      (w = p && "=" === s.charAt(1)),
                      w
                        ? ((c = parseInt(s.charAt(0) + "1", 10)),
                          (s = s.substr(2)),
                          (c *= parseFloat(s)),
                          (l = s.replace(gt, "")))
                        : ((c = parseFloat(s)),
                          (l = p ? s.replace(gt, "") : "")),
                      "" === l && (l = e in wt ? wt[e] : y),
                      (s = c || 0 === c ? (w ? c + h : c) + l : t[e]),
                      y !== l &&
                        "" !== l &&
                        (c || 0 === c) &&
                        h &&
                        ((h = k(n, e, h, y)),
                        "%" === l
                          ? ((h /= k(n, e, 100, "%") / 100),
                            t.strictUnits !== !0 && (v = h + "%"))
                          : "em" === l || "rem" === l
                          ? (h /= k(n, e, 1, l))
                          : "px" !== l && ((c = k(n, e, c, l)), (l = "px")),
                        w && (c || 0 === c) && (s = c + h + l)),
                      w && (c += h),
                      (!h && 0 !== h) || (!c && 0 !== c)
                        ? void 0 !== b[e] &&
                          (s || ("NaN" != s + "" && null != s))
                          ? ((i = new o(
                              b,
                              e,
                              c || h || 0,
                              0,
                              i,
                              -1,
                              e,
                              !1,
                              0,
                              v,
                              s
                            )),
                            (i.xs0 =
                              "none" !== s ||
                              ("display" !== e && -1 === e.indexOf("Style"))
                                ? s
                                : v))
                          : ur("invalid " + e + " tween value: " + t[e])
                        : ((i = new o(
                            b,
                            e,
                            h,
                            c - h,
                            i,
                            0,
                            e,
                            ei !== !1 && ("px" === l || "zIndex" === e),
                            0,
                            v,
                            s
                          )),
                          (i.xs0 = l)))
                    : (i = ri(b, e, v, s, !0, null, i, 0, r))),
              r && i && !i.plugin && (i.plugin = r);
          return i;
        }),
        (i.setRatio = function (n) {
          var r,
            u,
            i,
            t = this._firstPT,
            f = 1e-6;
          if (
            1 !== n ||
            (this._tween._time !== this._tween._duration &&
              0 !== this._tween._time)
          )
            if (
              n ||
              (this._tween._time !== this._tween._duration &&
                0 !== this._tween._time) ||
              this._tween._rawPrevTime === -1e-6
            )
              for (; t; ) {
                if (
                  ((r = t.c * n + t.s),
                  t.r ? (r = Math.round(r)) : f > r && r > -f && (r = 0),
                  t.type)
                )
                  if (1 === t.type)
                    if (((i = t.l), 2 === i))
                      t.t[t.p] = t.xs0 + r + t.xs1 + t.xn1 + t.xs2;
                    else if (3 === i)
                      t.t[t.p] =
                        t.xs0 + r + t.xs1 + t.xn1 + t.xs2 + t.xn2 + t.xs3;
                    else if (4 === i)
                      t.t[t.p] =
                        t.xs0 +
                        r +
                        t.xs1 +
                        t.xn1 +
                        t.xs2 +
                        t.xn2 +
                        t.xs3 +
                        t.xn3 +
                        t.xs4;
                    else if (5 === i)
                      t.t[t.p] =
                        t.xs0 +
                        r +
                        t.xs1 +
                        t.xn1 +
                        t.xs2 +
                        t.xn2 +
                        t.xs3 +
                        t.xn3 +
                        t.xs4 +
                        t.xn4 +
                        t.xs5;
                    else {
                      for (u = t.xs0 + r + t.xs1, i = 1; t.l > i; i++)
                        u += t["xn" + i] + t["xs" + (i + 1)];
                      t.t[t.p] = u;
                    }
                  else
                    -1 === t.type
                      ? (t.t[t.p] = t.xs0)
                      : t.setRatio && t.setRatio(n);
                else t.t[t.p] = r + t.xs0;
                t = t._next;
              }
            else
              for (; t; )
                2 !== t.type ? (t.t[t.p] = t.b) : t.setRatio(n), (t = t._next);
          else
            for (; t; ) {
              if (2 !== t.type)
                if (t.r && -1 !== t.type)
                  if (((r = Math.round(t.s + t.c)), t.type)) {
                    if (1 === t.type) {
                      for (i = t.l, u = t.xs0 + r + t.xs1, i = 1; t.l > i; i++)
                        u += t["xn" + i] + t["xs" + (i + 1)];
                      t.t[t.p] = u;
                    }
                  } else t.t[t.p] = r + t.xs0;
                else t.t[t.p] = t.e;
              else t.setRatio(n);
              t = t._next;
            }
        }),
        (i._enableTransforms = function (n) {
          this._transform = this._transform || ut(this._target, f, !0);
          this._transformType =
            (this._transform.svg && nt) || (!n && 3 !== this._transformType)
              ? 2
              : 3;
        }),
        (gr = function () {
          this.t[this.p] = this.e;
          this.data._linkCSSP(this, this._next, null, !0);
        }),
        (i._addLazySet = function (n, t, i) {
          var r = (this._firstPT = new o(n, t, 0, 0, this._firstPT, 2));
          r.e = i;
          r.setRatio = gr;
          r.data = this;
        }),
        (i._linkCSSP = function (n, t, i, r) {
          return (
            n &&
              (t && (t._prev = n),
              n._next && (n._next._prev = n._prev),
              n._prev
                ? (n._prev._next = n._next)
                : this._firstPT === n && ((this._firstPT = n._next), (r = !0)),
              i
                ? (i._next = n)
                : r || null !== this._firstPT || (this._firstPT = n),
              (n._next = t),
              (n._prev = i)),
            n
          );
        }),
        (i._kill = function (t) {
          var i,
            f,
            r,
            u = t;
          if (t.autoAlpha || t.alpha) {
            u = {};
            for (f in t) u[f] = t[f];
            u.opacity = 1;
            u.autoAlpha && (u.visibility = 1);
          }
          return (
            t.className &&
              (i = this._classNamePT) &&
              ((r = i.xfirst),
              r && r._prev
                ? this._linkCSSP(r._prev, i._next, r._prev._prev)
                : r === this._firstPT && (this._firstPT = i._next),
              i._next && this._linkCSSP(i._next, i._next._next, r._prev),
              (this._classNamePT = null)),
            n.prototype._kill.call(this, u)
          );
        }),
        (pt = function (n, t, i) {
          var e, u, r, f;
          if (n.slice) for (u = n.length; --u > -1; ) pt(n[u], t, i);
          else
            for (e = n.childNodes, u = e.length; --u > -1; )
              (r = e[u]),
                (f = r.type),
                r.style && (t.push(st(r)), i && i.push(r)),
                (1 !== f && 9 !== f && 11 !== f) ||
                  !r.childNodes.length ||
                  pt(r, t, i);
        }),
        (r.cascadeTo = function (n, i, r) {
          var u,
            f,
            e,
            h,
            o = t.to(n, i, r),
            l = [o],
            c = [],
            a = [],
            s = [],
            v = t._internals.reservedProps;
          for (
            n = o._targets || o.target,
              pt(n, c, s),
              o.render(i, !0, !0),
              pt(n, a),
              o.render(0, !0, !0),
              o._enabled(!0),
              u = s.length;
            --u > -1;

          )
            if (((f = yi(s[u], c[u], a[u])), f.firstMPT)) {
              f = f.difs;
              for (e in r) v[e] && (f[e] = r[e]);
              h = {};
              for (e in f) h[e] = c[u][e];
              l.push(t.fromTo(s[u], i, h, f));
            }
          return l;
        }),
        n.activate([r]),
        r
      );
    },
    !0
  ),
    (function () {
      var t = _gsScope._gsDefine.plugin({
          propName: "roundProps",
          version: "1.5",
          priority: -1,
          API: 2,
          init: function (n, t, i) {
            return (this._tween = i), !0;
          },
        }),
        i = function (n) {
          for (; n; ) n.f || n.blob || (n.r = 1), (n = n._next);
        },
        n = t.prototype;
      n._onInitAllProps = function () {
        for (
          var f,
            n,
            r,
            t = this._tween,
            e = t.vars.roundProps.join
              ? t.vars.roundProps
              : t.vars.roundProps.split(","),
            u = e.length,
            o = {},
            s = t._propLookup.roundProps;
          --u > -1;

        )
          o[e[u]] = 1;
        for (u = e.length; --u > -1; )
          for (f = e[u], n = t._firstPT; n; )
            (r = n._next),
              n.pg
                ? n.t._roundProps(o, !0)
                : n.n === f &&
                  (2 === n.f && n.t
                    ? i(n.t._firstPT)
                    : (this._add(n.t, f, n.s, n.c),
                      r && (r._prev = n._prev),
                      n._prev
                        ? (n._prev._next = r)
                        : t._firstPT === n && (t._firstPT = r),
                      (n._next = n._prev = null),
                      (t._propLookup[f] = s))),
              (n = r);
        return !1;
      };
      n._add = function (n, t, i, r) {
        this._addTween(n, t, i, i + r, t, !0);
        this._overwriteProps.push(t);
      };
    })(),
    (function () {
      _gsScope._gsDefine.plugin({
        propName: "attr",
        API: 2,
        version: "0.5.0",
        init: function (n, t) {
          var i;
          if ("function" != typeof n.setAttribute) return !1;
          for (i in t)
            this._addTween(
              n,
              "setAttribute",
              n.getAttribute(i) + "",
              t[i] + "",
              i,
              !1,
              i
            ),
              this._overwriteProps.push(i);
          return !0;
        },
      });
    })();
  _gsScope._gsDefine.plugin({
    propName: "directionalRotation",
    version: "0.2.1",
    API: 2,
    init: function (n, t) {
      "object" != typeof t &&
        (t = {
          rotation: t,
        });
      this.finals = {};
      var r,
        f,
        e,
        s,
        i,
        o,
        u = t.useRadians === !0 ? 2 * Math.PI : 360,
        h = 1e-6;
      for (r in t)
        "useRadians" !== r &&
          ((o = (t[r] + "").split("_")),
          (f = o[0]),
          (e = parseFloat(
            "function" != typeof n[r]
              ? n[r]
              : n[
                  r.indexOf("set") ||
                  "function" != typeof n["get" + r.substr(3)]
                    ? r
                    : "get" + r.substr(3)
                ]()
          )),
          (s = this.finals[r] =
            "string" == typeof f && "=" === f.charAt(1)
              ? e + parseInt(f.charAt(0) + "1", 10) * Number(f.substr(2))
              : Number(f) || 0),
          (i = s - e),
          o.length &&
            ((f = o.join("_")),
            -1 !== f.indexOf("short") &&
              ((i %= u), i !== i % (u / 2) && (i = 0 > i ? i + u : i - u)),
            -1 !== f.indexOf("_cw") && 0 > i
              ? (i = ((i + 9999999999 * u) % u) - (0 | (i / u)) * u)
              : -1 !== f.indexOf("ccw") &&
                i > 0 &&
                (i = ((i - 9999999999 * u) % u) - (0 | (i / u)) * u)),
          (i > h || -h > i) &&
            (this._addTween(n, r, e, e + i, r), this._overwriteProps.push(r)));
      return !0;
    },
    set: function (n) {
      var t;
      if (1 !== n) this._super.setRatio.call(this, n);
      else
        for (t = this._firstPT; t; )
          t.f ? t.t[t.p](this.finals[t.p]) : (t.t[t.p] = this.finals[t.p]),
            (t = t._next);
    },
  })._autoCSS = !0;
  _gsScope._gsDefine(
    "easing.Back",
    ["easing.Ease"],
    function (n) {
      var f,
        u,
        s,
        a = _gsScope.GreenSockGlobals || _gsScope,
        p = a.com.greensock,
        v = 2 * Math.PI,
        y = Math.PI / 2,
        r = p._class,
        t = function (t, i) {
          var u = r("easing." + t, function () {}, !0),
            f = (u.prototype = new n());
          return (f.constructor = u), (f.getRatio = i), u;
        },
        h = n.register || function () {},
        e = function (n, t, i, u) {
          var f = r(
            "easing." + n,
            {
              easeOut: new t(),
              easeIn: new i(),
              easeInOut: new u(),
            },
            !0
          );
          return h(f, n), f;
        },
        c = function (n, t, i) {
          this.t = n;
          this.v = t;
          i &&
            ((this.next = i),
            (i.prev = this),
            (this.c = i.v - t),
            (this.gap = i.t - n));
        },
        l = function (t, i) {
          var u = r(
              "easing." + t,
              function (n) {
                this._p1 = n || 0 === n ? n : 1.70158;
                this._p2 = 1.525 * this._p1;
              },
              !0
            ),
            f = (u.prototype = new n());
          return (
            (f.constructor = u),
            (f.getRatio = i),
            (f.config = function (n) {
              return new u(n);
            }),
            u
          );
        },
        w = e(
          "Back",
          l("BackOut", function (n) {
            return (n -= 1) * n * ((this._p1 + 1) * n + this._p1) + 1;
          }),
          l("BackIn", function (n) {
            return n * n * ((this._p1 + 1) * n - this._p1);
          }),
          l("BackInOut", function (n) {
            return 1 > (n *= 2)
              ? 0.5 * n * n * ((this._p2 + 1) * n - this._p2)
              : 0.5 * ((n -= 2) * n * ((this._p2 + 1) * n + this._p2) + 2);
          })
        ),
        o = r(
          "easing.SlowMo",
          function (n, t, i) {
            t = t || 0 === t ? t : 0.7;
            null == n ? (n = 0.7) : n > 1 && (n = 1);
            this._p = 1 !== n ? t : 0;
            this._p1 = (1 - n) / 2;
            this._p2 = n;
            this._p3 = this._p1 + this._p2;
            this._calcEnd = i === !0;
          },
          !0
        ),
        i = (o.prototype = new n());
      return (
        (i.constructor = o),
        (i.getRatio = function (n) {
          var t = n + (0.5 - n) * this._p;
          return this._p1 > n
            ? this._calcEnd
              ? 1 - (n = 1 - n / this._p1) * n
              : t - (n = 1 - n / this._p1) * n * n * n * t
            : n > this._p3
            ? this._calcEnd
              ? 1 - (n = (n - this._p3) / this._p1) * n
              : t + (n - t) * (n = (n - this._p3) / this._p1) * n * n * n
            : this._calcEnd
            ? 1
            : t;
        }),
        (o.ease = new o(0.7, 0.7)),
        (i.config = o.config = function (n, t, i) {
          return new o(n, t, i);
        }),
        (f = r(
          "easing.SteppedEase",
          function (n) {
            n = n || 1;
            this._p1 = 1 / n;
            this._p2 = n + 1;
          },
          !0
        )),
        (i = f.prototype = new n()),
        (i.constructor = f),
        (i.getRatio = function (n) {
          return (
            0 > n ? (n = 0) : n >= 1 && (n = 0.999999999),
            ((this._p2 * n) >> 0) * this._p1
          );
        }),
        (i.config = f.config = function (n) {
          return new f(n);
        }),
        (u = r(
          "easing.RoughEase",
          function (t) {
            t = t || {};
            for (
              var i,
                r,
                u,
                f,
                h,
                e,
                l = t.taper || "none",
                a = [],
                w = 0,
                v = 0 | (t.points || 20),
                o = v,
                y = t.randomize !== !1,
                b = t.clamp === !0,
                p = t.template instanceof n ? t.template : null,
                s = "number" == typeof t.strength ? 0.4 * t.strength : 0.4;
              --o > -1;

            )
              (i = y ? Math.random() : (1 / v) * o),
                (r = p ? p.getRatio(i) : i),
                "none" === l
                  ? (u = s)
                  : "out" === l
                  ? ((f = 1 - i), (u = f * f * s))
                  : "in" === l
                  ? (u = i * i * s)
                  : 0.5 > i
                  ? ((f = 2 * i), (u = 0.5 * f * f * s))
                  : ((f = 2 * (1 - i)), (u = 0.5 * f * f * s)),
                y
                  ? (r += Math.random() * u - 0.5 * u)
                  : o % 2
                  ? (r += 0.5 * u)
                  : (r -= 0.5 * u),
                b && (r > 1 ? (r = 1) : 0 > r && (r = 0)),
                (a[w++] = {
                  x: i,
                  y: r,
                });
            for (
              a.sort(function (n, t) {
                return n.x - t.x;
              }),
                e = new c(1, 1, null),
                o = v;
              --o > -1;

            )
              (h = a[o]), (e = new c(h.x, h.y, e));
            this._prev = new c(0, 0, 0 !== e.t ? e : e.next);
          },
          !0
        )),
        (i = u.prototype = new n()),
        (i.constructor = u),
        (i.getRatio = function (n) {
          var t = this._prev;
          if (n > t.t) {
            for (; t.next && n >= t.t; ) t = t.next;
            t = t.prev;
          } else for (; t.prev && t.t >= n; ) t = t.prev;
          return (this._prev = t), t.v + ((n - t.t) / t.gap) * t.c;
        }),
        (i.config = function (n) {
          return new u(n);
        }),
        (u.ease = new u()),
        e(
          "Bounce",
          t("BounceOut", function (n) {
            return 1 / 2.75 > n
              ? 7.5625 * n * n
              : 2 / 2.75 > n
              ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75
              : 2.5 / 2.75 > n
              ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375
              : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
          }),
          t("BounceIn", function (n) {
            return 1 / 2.75 > (n = 1 - n)
              ? 1 - 7.5625 * n * n
              : 2 / 2.75 > n
              ? 1 - (7.5625 * (n -= 1.5 / 2.75) * n + 0.75)
              : 2.5 / 2.75 > n
              ? 1 - (7.5625 * (n -= 2.25 / 2.75) * n + 0.9375)
              : 1 - (7.5625 * (n -= 2.625 / 2.75) * n + 0.984375);
          }),
          t("BounceInOut", function (n) {
            var t = 0.5 > n;
            return (
              (n = t ? 1 - 2 * n : 2 * n - 1),
              (n =
                1 / 2.75 > n
                  ? 7.5625 * n * n
                  : 2 / 2.75 > n
                  ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75
                  : 2.5 / 2.75 > n
                  ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375
                  : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375),
              t ? 0.5 * (1 - n) : 0.5 * n + 0.5
            );
          })
        ),
        e(
          "Circ",
          t("CircOut", function (n) {
            return Math.sqrt(1 - (n -= 1) * n);
          }),
          t("CircIn", function (n) {
            return -(Math.sqrt(1 - n * n) - 1);
          }),
          t("CircInOut", function (n) {
            return 1 > (n *= 2)
              ? -0.5 * (Math.sqrt(1 - n * n) - 1)
              : 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
          })
        ),
        (s = function (t, i, u) {
          var f = r(
              "easing." + t,
              function (n, t) {
                this._p1 = n >= 1 ? n : 1;
                this._p2 = (t || u) / (1 > n ? n : 1);
                this._p3 = (this._p2 / v) * (Math.asin(1 / this._p1) || 0);
                this._p2 = v / this._p2;
              },
              !0
            ),
            e = (f.prototype = new n());
          return (
            (e.constructor = f),
            (e.getRatio = i),
            (e.config = function (n, t) {
              return new f(n, t);
            }),
            f
          );
        }),
        e(
          "Elastic",
          s(
            "ElasticOut",
            function (n) {
              return (
                this._p1 *
                  Math.pow(2, -10 * n) *
                  Math.sin((n - this._p3) * this._p2) +
                1
              );
            },
            0.3
          ),
          s(
            "ElasticIn",
            function (n) {
              return -(
                this._p1 *
                Math.pow(2, 10 * (n -= 1)) *
                Math.sin((n - this._p3) * this._p2)
              );
            },
            0.3
          ),
          s(
            "ElasticInOut",
            function (n) {
              return 1 > (n *= 2)
                ? -0.5 *
                    this._p1 *
                    Math.pow(2, 10 * (n -= 1)) *
                    Math.sin((n - this._p3) * this._p2)
                : 0.5 *
                    this._p1 *
                    Math.pow(2, -10 * (n -= 1)) *
                    Math.sin((n - this._p3) * this._p2) +
                    1;
            },
            0.45
          )
        ),
        e(
          "Expo",
          t("ExpoOut", function (n) {
            return 1 - Math.pow(2, -10 * n);
          }),
          t("ExpoIn", function (n) {
            return Math.pow(2, 10 * (n - 1)) - 0.001;
          }),
          t("ExpoInOut", function (n) {
            return 1 > (n *= 2)
              ? 0.5 * Math.pow(2, 10 * (n - 1))
              : 0.5 * (2 - Math.pow(2, -10 * (n - 1)));
          })
        ),
        e(
          "Sine",
          t("SineOut", function (n) {
            return Math.sin(n * y);
          }),
          t("SineIn", function (n) {
            return -Math.cos(n * y) + 1;
          }),
          t("SineInOut", function (n) {
            return -0.5 * (Math.cos(Math.PI * n) - 1);
          })
        ),
        r(
          "easing.EaseLookup",
          {
            find: function (t) {
              return n.map[t];
            },
          },
          !0
        ),
        h(a.SlowMo, "SlowMo", "ease,"),
        h(u, "RoughEase", "ease,"),
        h(f, "SteppedEase", "ease,"),
        w
      );
    },
    !0
  );
});
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function (n, t) {
    "use strict";
    var ot = (n.GreenSockGlobals = n.GreenSockGlobals || n),
      ct,
      o,
      at,
      ft,
      c;
    if (!ot.TweenLite) {
      var s,
        f,
        i,
        u,
        h,
        kt = function (n) {
          for (var r = n.split("."), i = ot, t = 0; r.length > t; t++)
            i[r[t]] = i = i[r[t]] || {};
          return i;
        },
        y = kt("com.greensock"),
        e = 1e-10,
        dt = function (n) {
          for (var i = [], r = n.length, t = 0; t !== r; i.push(n[t++]));
          return i;
        },
        gt = function () {},
        d = (function () {
          var n = Object.prototype.toString,
            t = n.call([]);
          return function (i) {
            return (
              null != i &&
              (i instanceof Array ||
                ("object" == typeof i && !!i.push && n.call(i) === t))
            );
          };
        })(),
        g = {},
        ni = function (i, r, u, f) {
          this.sc = g[i] ? g[i].sc : [];
          g[i] = this;
          this.gsClass = null;
          this.func = u;
          var e = [];
          this.check = function (o) {
            for (var c, l, a, h, v, s = r.length, y = s; --s > -1; )
              (c = g[r[s]] || new ni(r[s], [])).gsClass
                ? ((e[s] = c.gsClass), y--)
                : o && c.sc.push(this);
            if (0 === y && u)
              for (
                l = ("com.greensock." + i).split("."),
                  a = l.pop(),
                  h = kt(l.join("."))[a] = this.gsClass = u.apply(u, e),
                  f &&
                    ((ot[a] = h),
                    (v = "undefined" != typeof module && module.exports),
                    !v && "function" == typeof define && define.amd
                      ? define((n.GreenSockAMDPath
                          ? n.GreenSockAMDPath + "/"
                          : "") + i.split(".").pop(), [], function () {
                          return h;
                        })
                      : i === t && v && (module.exports = h)),
                  s = 0;
                this.sc.length > s;
                s++
              )
                this.sc[s].check();
          };
          this.check(!0);
        },
        st = (n._gsDefine = function (n, t, i, r) {
          return new ni(n, t, i, r);
        }),
        l = (y._class = function (n, t, i) {
          return (
            (t = t || function () {}),
            st(
              n,
              [],
              function () {
                return t;
              },
              i
            ),
            t
          );
        });
      st.globals = ot;
      var ti = [0, 0, 1, 1],
        ci = [],
        a = l(
          "easing.Ease",
          function (n, t, i, r) {
            this._func = n;
            this._type = i || 0;
            this._power = r || 0;
            this._params = t ? ti.concat(t) : ti;
          },
          !0
        ),
        tt = (a.map = {}),
        ht = (a.register = function (n, t, i, r) {
          for (
            var o,
              u,
              e,
              f,
              s = t.split(","),
              h = s.length,
              c = (i || "easeIn,easeOut,easeInOut").split(",");
            --h > -1;

          )
            for (
              u = s[h],
                o = r ? l("easing." + u, null, !0) : y.easing[u] || {},
                e = c.length;
              --e > -1;

            )
              (f = c[e]),
                (tt[u + "." + f] = tt[f + u] = o[f] = n.getRatio
                  ? n
                  : n[f] || new n());
        });
      for (
        i = a.prototype,
          i._calcEnd = !1,
          i.getRatio = function (n) {
            if (this._func)
              return (
                (this._params[0] = n), this._func.apply(null, this._params)
              );
            var i = this._type,
              r = this._power,
              t = 1 === i ? 1 - n : 2 === i ? n : 0.5 > n ? 2 * n : 2 * (1 - n);
            return (
              1 === r
                ? (t *= t)
                : 2 === r
                ? (t *= t * t)
                : 3 === r
                ? (t *= t * t * t)
                : 4 === r && (t *= t * t * t * t),
              1 === i ? 1 - t : 2 === i ? t : 0.5 > n ? t / 2 : 1 - t / 2
            );
          },
          s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
          f = s.length;
        --f > -1;

      )
        (i = s[f] + ",Power" + f),
          ht(new a(null, null, 1, f), i, "easeOut", !0),
          ht(
            new a(null, null, 2, f),
            i,
            "easeIn" + (0 === f ? ",easeNone" : "")
          ),
          ht(new a(null, null, 3, f), i, "easeInOut");
      tt.linear = y.easing.Linear.easeIn;
      tt.swing = y.easing.Quad.easeInOut;
      ct = l("events.EventDispatcher", function (n) {
        this._listeners = {};
        this._eventTarget = n || this;
      });
      i = ct.prototype;
      i.addEventListener = function (n, t, i, r, f) {
        f = f || 0;
        var s,
          o,
          e = this._listeners[n],
          c = 0;
        for (
          null == e && (this._listeners[n] = e = []), o = e.length;
          --o > -1;

        )
          (s = e[o]),
            s.c === t && s.s === i
              ? e.splice(o, 1)
              : 0 === c && f > s.pr && (c = o + 1);
        e.splice(c, 0, {
          c: t,
          s: i,
          up: r,
          pr: f,
        });
        this !== u || h || u.wake();
      };
      i.removeEventListener = function (n, t) {
        var i,
          r = this._listeners[n];
        if (r)
          for (i = r.length; --i > -1; )
            if (r[i].c === t) return r.splice(i, 1), void 0;
      };
      i.dispatchEvent = function (n) {
        var r,
          i,
          t,
          u = this._listeners[n];
        if (u)
          for (r = u.length, i = this._eventTarget; --r > -1; )
            (t = u[r]),
              t &&
                (t.up
                  ? t.c.call(t.s || i, {
                      type: n,
                      target: i,
                    })
                  : t.c.call(t.s || i));
      };
      var it = n.requestAnimationFrame,
        lt = n.cancelAnimationFrame,
        rt =
          Date.now ||
          function () {
            return new Date().getTime();
          },
        ut = rt();
      for (s = ["ms", "moz", "webkit", "o"], f = s.length; --f > -1 && !it; )
        (it = n[s[f] + "RequestAnimationFrame"]),
          (lt =
            n[s[f] + "CancelAnimationFrame"] ||
            n[s[f] + "CancelRequestAnimationFrame"]);
      l("Ticker", function (n, t) {
        var r,
          a,
          f,
          s,
          c,
          i = this,
          y = rt(),
          o = t !== !1 && it,
          l = 500,
          p = 33,
          w = "tick",
          v = function (n) {
            var t,
              e,
              u = rt() - ut;
            u > l && (y += u - p);
            ut += u;
            i.time = (ut - y) / 1e3;
            t = i.time - c;
            (!r || t > 0 || n === !0) &&
              (i.frame++, (c += t + (t >= s ? 0.004 : s - t)), (e = !0));
            n !== !0 && (f = a(v));
            e && i.dispatchEvent(w);
          };
        ct.call(i);
        i.time = i.frame = 0;
        i.tick = function () {
          v(!0);
        };
        i.lagSmoothing = function (n, t) {
          l = n || 1 / e;
          p = Math.min(t, l, 0);
        };
        i.sleep = function () {
          null != f &&
            (o && lt ? lt(f) : clearTimeout(f),
            (a = gt),
            (f = null),
            i === u && (h = !1));
        };
        i.wake = function () {
          null !== f ? i.sleep() : i.frame > 10 && (ut = rt() - l + 5);
          a =
            0 === r
              ? gt
              : o && it
              ? it
              : function (n) {
                  return setTimeout(n, 0 | (1e3 * (c - i.time) + 1));
                };
          i === u && (h = !0);
          v(2);
        };
        i.fps = function (n) {
          return arguments.length
            ? ((r = n),
              (s = 1 / (r || 60)),
              (c = this.time + s),
              i.wake(),
              void 0)
            : r;
        };
        i.useRAF = function (n) {
          return arguments.length ? (i.sleep(), (o = n), i.fps(r), void 0) : o;
        };
        i.fps(n);
        setTimeout(function () {
          o && 5 > i.frame && i.useRAF(!1);
        }, 1500);
      });
      i = y.Ticker.prototype = new y.events.EventDispatcher();
      i.constructor = y.Ticker;
      o = l("core.Animation", function (n, t) {
        if (
          ((this.vars = t = t || {}),
          (this._duration = this._totalDuration = n || 0),
          (this._delay = Number(t.delay) || 0),
          (this._timeScale = 1),
          (this._active = t.immediateRender === !0),
          (this.data = t.data),
          (this._reversed = t.reversed === !0),
          p)
        ) {
          h || u.wake();
          var i = this.vars.useFrames ? k : p;
          i.add(this, i._time);
          this.vars.paused && this.paused(!0);
        }
      });
      u = o.ticker = new y.Ticker();
      i = o.prototype;
      i._dirty = i._gc = i._initted = i._paused = !1;
      i._totalTime = i._time = 0;
      i._rawPrevTime = -1;
      i._next = i._last = i._onUpdate = i._timeline = i.timeline = null;
      i._paused = !1;
      at = function () {
        h && rt() - ut > 2e3 && u.wake();
        setTimeout(at, 2e3);
      };
      at();
      i.play = function (n, t) {
        return null != n && this.seek(n, t), this.reversed(!1).paused(!1);
      };
      i.pause = function (n, t) {
        return null != n && this.seek(n, t), this.paused(!0);
      };
      i.resume = function (n, t) {
        return null != n && this.seek(n, t), this.paused(!1);
      };
      i.seek = function (n, t) {
        return this.totalTime(Number(n), t !== !1);
      };
      i.restart = function (n, t) {
        return this.reversed(!1)
          .paused(!1)
          .totalTime(n ? -this._delay : 0, t !== !1, !0);
      };
      i.reverse = function (n, t) {
        return (
          null != n && this.seek(n || this.totalDuration(), t),
          this.reversed(!0).paused(!1)
        );
      };
      i.render = function () {};
      i.invalidate = function () {
        return (
          (this._time = this._totalTime = 0),
          (this._initted = this._gc = !1),
          (this._rawPrevTime = -1),
          (this._gc || !this.timeline) && this._enabled(!0),
          this
        );
      };
      i.isActive = function () {
        var t,
          n = this._timeline,
          i = this._startTime;
        return (
          !n ||
          (!this._gc &&
            !this._paused &&
            n.isActive() &&
            (t = n.rawTime()) >= i &&
            i + this.totalDuration() / this._timeScale > t)
        );
      };
      i._enabled = function (n, t) {
        return (
          h || u.wake(),
          (this._gc = !n),
          (this._active = this.isActive()),
          t !== !0 &&
            (n && !this.timeline
              ? this._timeline.add(this, this._startTime - this._delay)
              : !n && this.timeline && this._timeline._remove(this, !0)),
          !1
        );
      };
      i._kill = function () {
        return this._enabled(!1, !1);
      };
      i.kill = function (n, t) {
        return this._kill(n, t), this;
      };
      i._uncache = function (n) {
        for (var t = n ? this : this.timeline; t; )
          (t._dirty = !0), (t = t.timeline);
        return this;
      };
      i._swapSelfInParams = function (n) {
        for (var t = n.length, i = n.concat(); --t > -1; )
          "{self}" === n[t] && (i[t] = this);
        return i;
      };
      i._callback = function (n) {
        var t = this.vars;
        t[n].apply(
          t[n + "Scope"] || t.callbackScope || this,
          t[n + "Params"] || ci
        );
      };
      i.eventCallback = function (n, t, i, r) {
        if ("on" === (n || "").substr(0, 2)) {
          var u = this.vars;
          if (1 === arguments.length) return u[n];
          null == t
            ? delete u[n]
            : ((u[n] = t),
              (u[n + "Params"] =
                d(i) && -1 !== i.join("").indexOf("{self}")
                  ? this._swapSelfInParams(i)
                  : i),
              (u[n + "Scope"] = r));
          "onUpdate" === n && (this._onUpdate = t);
        }
        return this;
      };
      i.delay = function (n) {
        return arguments.length
          ? (this._timeline.smoothChildTiming &&
              this.startTime(this._startTime + n - this._delay),
            (this._delay = n),
            this)
          : this._delay;
      };
      i.duration = function (n) {
        return arguments.length
          ? ((this._duration = this._totalDuration = n),
            this._uncache(!0),
            this._timeline.smoothChildTiming &&
              this._time > 0 &&
              this._time < this._duration &&
              0 !== n &&
              this.totalTime(this._totalTime * (n / this._duration), !0),
            this)
          : ((this._dirty = !1), this._duration);
      };
      i.totalDuration = function (n) {
        return (
          (this._dirty = !1),
          arguments.length ? this.duration(n) : this._totalDuration
        );
      };
      i.time = function (n, t) {
        return arguments.length
          ? (this._dirty && this.totalDuration(),
            this.totalTime(n > this._duration ? this._duration : n, t))
          : this._time;
      };
      i.totalTime = function (n, t, i) {
        if ((h || u.wake(), !arguments.length)) return this._totalTime;
        if (this._timeline) {
          if (
            (0 > n && !i && (n += this.totalDuration()),
            this._timeline.smoothChildTiming)
          ) {
            this._dirty && this.totalDuration();
            var f = this._totalDuration,
              r = this._timeline;
            if (
              (n > f && !i && (n = f),
              (this._startTime =
                (this._paused ? this._pauseTime : r._time) -
                (this._reversed ? f - n : n) / this._timeScale),
              r._dirty || this._uncache(!1),
              r._timeline)
            )
              for (; r._timeline; )
                r._timeline._time !==
                  (r._startTime + r._totalTime) / r._timeScale &&
                  r.totalTime(r._totalTime, !0),
                  (r = r._timeline);
          }
          this._gc && this._enabled(!0, !1);
          (this._totalTime !== n || 0 === this._duration) &&
            (v.length && nt(), this.render(n, t, !1), v.length && nt());
        }
        return this;
      };
      i.progress = i.totalProgress = function (n, t) {
        var i = this.duration();
        return arguments.length
          ? this.totalTime(i * n, t)
          : i
          ? this._time / i
          : this.ratio;
      };
      i.startTime = function (n) {
        return arguments.length
          ? (n !== this._startTime &&
              ((this._startTime = n),
              this.timeline &&
                this.timeline._sortChildren &&
                this.timeline.add(this, n - this._delay)),
            this)
          : this._startTime;
      };
      i.endTime = function (n) {
        return (
          this._startTime +
          (0 != n ? this.totalDuration() : this.duration()) / this._timeScale
        );
      };
      i.timeScale = function (n) {
        if (!arguments.length) return this._timeScale;
        if (
          ((n = n || e), this._timeline && this._timeline.smoothChildTiming)
        ) {
          var t = this._pauseTime,
            i = t || 0 === t ? t : this._timeline.totalTime();
          this._startTime = i - ((i - this._startTime) * this._timeScale) / n;
        }
        return (this._timeScale = n), this._uncache(!1);
      };
      i.reversed = function (n) {
        return arguments.length
          ? (n != this._reversed &&
              ((this._reversed = n),
              this.totalTime(
                this._timeline && !this._timeline.smoothChildTiming
                  ? this.totalDuration() - this._totalTime
                  : this._totalTime,
                !0
              )),
            this)
          : this._reversed;
      };
      i.paused = function (n) {
        if (!arguments.length) return this._paused;
        var t,
          r,
          i = this._timeline;
        return (
          n != this._paused &&
            i &&
            (h || n || u.wake(),
            (t = i.rawTime()),
            (r = t - this._pauseTime),
            !n &&
              i.smoothChildTiming &&
              ((this._startTime += r), this._uncache(!1)),
            (this._pauseTime = n ? t : null),
            (this._paused = n),
            (this._active = this.isActive()),
            !n &&
              0 !== r &&
              this._initted &&
              this.duration() &&
              ((t = i.smoothChildTiming
                ? this._totalTime
                : (t - this._startTime) / this._timeScale),
              this.render(t, t === this._totalTime, !0))),
          this._gc && !n && this._enabled(!0, !1),
          this
        );
      };
      ft = l("core.SimpleTimeline", function (n) {
        o.call(this, 0, n);
        this.autoRemoveChildren = this.smoothChildTiming = !0;
      });
      i = ft.prototype = new o();
      i.constructor = ft;
      i.kill()._gc = !1;
      i._first = i._last = i._recent = null;
      i._sortChildren = !1;
      i.add = i.insert = function (n, t) {
        var i, r;
        if (
          ((n._startTime = Number(t || 0) + n._delay),
          n._paused &&
            this !== n._timeline &&
            (n._pauseTime =
              n._startTime + (this.rawTime() - n._startTime) / n._timeScale),
          n.timeline && n.timeline._remove(n, !0),
          (n.timeline = n._timeline = this),
          n._gc && n._enabled(!0, !0),
          (i = this._last),
          this._sortChildren)
        )
          for (r = n._startTime; i && i._startTime > r; ) i = i._prev;
        return (
          i
            ? ((n._next = i._next), (i._next = n))
            : ((n._next = this._first), (this._first = n)),
          n._next ? (n._next._prev = n) : (this._last = n),
          (n._prev = i),
          (this._recent = n),
          this._timeline && this._uncache(!0),
          this
        );
      };
      i._remove = function (n, t) {
        return (
          n.timeline === this &&
            (t || n._enabled(!1, !0),
            n._prev
              ? (n._prev._next = n._next)
              : this._first === n && (this._first = n._next),
            n._next
              ? (n._next._prev = n._prev)
              : this._last === n && (this._last = n._prev),
            (n._next = n._prev = n.timeline = null),
            n === this._recent && (this._recent = this._last),
            this._timeline && this._uncache(!0)),
          this
        );
      };
      i.render = function (n, t, i) {
        var u,
          r = this._first;
        for (this._totalTime = this._time = this._rawPrevTime = n; r; )
          (u = r._next),
            (r._active || (n >= r._startTime && !r._paused)) &&
              (r._reversed
                ? r.render(
                    (r._dirty ? r.totalDuration() : r._totalDuration) -
                      (n - r._startTime) * r._timeScale,
                    t,
                    i
                  )
                : r.render((n - r._startTime) * r._timeScale, t, i)),
            (r = u);
      };
      i.rawTime = function () {
        return h || u.wake(), this._totalTime;
      };
      var r = l(
          "TweenLite",
          function (t, i, u) {
            if (
              (o.call(this, i, u),
              (this.render = r.prototype.render),
              null == t)
            )
              throw "Cannot tween a null target.";
            this.target = t = "string" != typeof t ? t : r.selector(t) || t;
            var s,
              f,
              h,
              l =
                t.jquery ||
                (t.length &&
                  t !== n &&
                  t[0] &&
                  (t[0] === n || (t[0].nodeType && t[0].style && !t.nodeType))),
              c = this.vars.overwrite;
            if (
              ((this._overwrite = c =
                null == c
                  ? ei[r.defaultOverwrite]
                  : "number" == typeof c
                  ? c >> 0
                  : ei[c]),
              (l || t instanceof Array || (t.push && d(t))) &&
                "number" != typeof t[0])
            )
              for (
                this._targets = h = dt(t),
                  this._propLookup = [],
                  this._siblings = [],
                  s = 0;
                h.length > s;
                s++
              )
                (f = h[s]),
                  f
                    ? "string" != typeof f
                      ? f.length &&
                        f !== n &&
                        f[0] &&
                        (f[0] === n ||
                          (f[0].nodeType && f[0].style && !f.nodeType))
                        ? (h.splice(s--, 1),
                          (this._targets = h = h.concat(dt(f))))
                        : ((this._siblings[s] = et(f, this, !1)),
                          1 === c &&
                            this._siblings[s].length > 1 &&
                            bt(f, this, null, 1, this._siblings[s]))
                      : ((f = h[s--] = r.selector(f)),
                        "string" == typeof f && h.splice(s + 1, 1))
                    : h.splice(s--, 1);
            else
              (this._propLookup = {}),
                (this._siblings = et(t, this, !1)),
                1 === c &&
                  this._siblings.length > 1 &&
                  bt(t, this, null, 1, this._siblings);
            (this.vars.immediateRender ||
              (0 === i &&
                0 === this._delay &&
                this.vars.immediateRender !== !1)) &&
              ((this._time = -e), this.render(-this._delay));
          },
          !0
        ),
        vt = function (t) {
          return (
            t &&
            t.length &&
            t !== n &&
            t[0] &&
            (t[0] === n || (t[0].nodeType && t[0].style && !t.nodeType))
          );
        },
        li = function (n, t) {
          var i,
            r = {};
          for (i in n)
            wt[i] ||
              (i in t &&
                "transform" !== i &&
                "x" !== i &&
                "y" !== i &&
                "width" !== i &&
                "height" !== i &&
                "className" !== i &&
                "border" !== i) ||
              !(!w[i] || (w[i] && w[i]._autoCSS)) ||
              ((r[i] = n[i]), delete n[i]);
          n.css = r;
        };
      i = r.prototype = new o();
      i.constructor = r;
      i.kill()._gc = !1;
      i.ratio = 0;
      i._firstPT = i._targets = i._overwrittenProps = i._startAt = null;
      i._notifyPluginsOfEnabled = i._lazy = !1;
      r.version = "1.18.0";
      r.defaultEase = i._ease = new a(null, null, 1, 1);
      r.defaultOverwrite = "auto";
      r.ticker = u;
      r.autoSleep = 120;
      r.lagSmoothing = function (n, t) {
        u.lagSmoothing(n, t);
      };
      r.selector =
        n.$ ||
        n.jQuery ||
        function (t) {
          var i = n.$ || n.jQuery;
          return i
            ? ((r.selector = i), i(t))
            : "undefined" == typeof document
            ? t
            : document.querySelectorAll
            ? document.querySelectorAll(t)
            : document.getElementById("#" === t.charAt(0) ? t.substr(1) : t);
        };
      var v = [],
        yt = {},
        ii = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        ri = function (n) {
          for (var i, t = this._firstPT, r = 1e-6; t; )
            (i = t.blob ? (n ? this.join("") : this.start) : t.c * n + t.s),
              t.r ? (i = Math.round(i)) : r > i && i > -r && (i = 0),
              t.f ? (t.fp ? t.t[t.p](t.fp, i) : t.t[t.p](i)) : (t.t[t.p] = i),
              (t = t._next);
        },
        ui = function (n, t, i, r) {
          var l,
            v,
            a,
            e,
            y,
            c,
            f,
            u = [n, t],
            s = 0,
            o = "",
            h = 0;
          for (
            u.start = n,
              i && (i(u), (n = u[0]), (t = u[1])),
              u.length = 0,
              l = n.match(ii) || [],
              v = t.match(ii) || [],
              r && ((r._next = null), (r.blob = 1), (u._firstPT = r)),
              y = v.length,
              e = 0;
            y > e;
            e++
          )
            (f = v[e]),
              (c = t.substr(s, t.indexOf(f, s) - s)),
              (o += c || !e ? c : ","),
              (s += c.length),
              h ? (h = (h + 1) % 5) : "rgba(" === c.substr(-5) && (h = 1),
              f === l[e] || e >= l.length
                ? (o += f)
                : (o && (u.push(o), (o = "")),
                  (a = parseFloat(l[e])),
                  u.push(a),
                  (u._firstPT = {
                    _next: u._firstPT,
                    t: u,
                    p: u.length - 1,
                    s: a,
                    c:
                      ("=" === f.charAt(1)
                        ? parseInt(f.charAt(0) + "1", 10) *
                          parseFloat(f.substr(2))
                        : parseFloat(f) - a) || 0,
                    f: 0,
                    r: h && 4 > h,
                  })),
              (s += f.length);
          return (o += t.substr(s)), o && u.push(o), (u.setRatio = ri), u;
        },
        fi = function (n, t, i, u, f, e, o, s) {
          var v,
            l,
            c = "get" === i ? n[t] : i,
            a = typeof n[t],
            y = "string" == typeof u && "=" === u.charAt(1),
            h = {
              t: n,
              p: t,
              s: c,
              f: "function" === a,
              pg: 0,
              n: f || t,
              r: e,
              pr: 0,
              c: y
                ? parseInt(u.charAt(0) + "1", 10) * parseFloat(u.substr(2))
                : parseFloat(u) - c || 0,
            };
          return (
            "number" !== a &&
              ("function" === a &&
                "get" === i &&
                ((l =
                  t.indexOf("set") ||
                  "function" != typeof n["get" + t.substr(3)]
                    ? t
                    : "get" + t.substr(3)),
                (h.s = c = o ? n[l](o) : n[l]())),
              "string" == typeof c && (o || isNaN(c))
                ? ((h.fp = o),
                  (v = ui(c, u, s || r.defaultStringFilter, h)),
                  (h = {
                    t: v,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: 2,
                    pg: 0,
                    n: f || t,
                    pr: 0,
                  }))
                : y || (h.c = parseFloat(u) - parseFloat(c) || 0)),
            h.c
              ? ((h._next = this._firstPT) && (h._next._prev = h),
                (this._firstPT = h),
                h)
              : void 0
          );
        },
        pt = (r._internals = {
          isArray: d,
          isSelector: vt,
          lazyTweens: v,
          blobDif: ui,
        }),
        w = (r._plugins = {}),
        b = (pt.tweenLookup = {}),
        ai = 0,
        wt = (pt.reservedProps = {
          ease: 1,
          delay: 1,
          overwrite: 1,
          onComplete: 1,
          onCompleteParams: 1,
          onCompleteScope: 1,
          useFrames: 1,
          runBackwards: 1,
          startAt: 1,
          onUpdate: 1,
          onUpdateParams: 1,
          onUpdateScope: 1,
          onStart: 1,
          onStartParams: 1,
          onStartScope: 1,
          onReverseComplete: 1,
          onReverseCompleteParams: 1,
          onReverseCompleteScope: 1,
          onRepeat: 1,
          onRepeatParams: 1,
          onRepeatScope: 1,
          easeParams: 1,
          yoyo: 1,
          immediateRender: 1,
          repeat: 1,
          repeatDelay: 1,
          data: 1,
          paused: 1,
          reversed: 1,
          autoCSS: 1,
          lazy: 1,
          onOverwrite: 1,
          callbackScope: 1,
          stringFilter: 1,
        }),
        ei = {
          none: 0,
          all: 1,
          auto: 2,
          concurrent: 3,
          allOnStart: 4,
          preexisting: 5,
          true: 1,
          false: 0,
        },
        k = (o._rootFramesTimeline = new ft()),
        p = (o._rootTimeline = new ft()),
        oi = 30,
        nt = (pt.lazyRender = function () {
          var n,
            t = v.length;
          for (yt = {}; --t > -1; )
            (n = v[t]),
              n &&
                n._lazy !== !1 &&
                (n.render(n._lazy[0], n._lazy[1], !0), (n._lazy = !1));
          v.length = 0;
        });
      p._startTime = u.time;
      k._startTime = u.frame;
      p._active = k._active = !0;
      setTimeout(nt, 1);
      o._updateRoot = r.render = function () {
        var i, t, n;
        if (
          (v.length && nt(),
          p.render((u.time - p._startTime) * p._timeScale, !1, !1),
          k.render((u.frame - k._startTime) * k._timeScale, !1, !1),
          v.length && nt(),
          u.frame >= oi)
        ) {
          oi = u.frame + (parseInt(r.autoSleep, 10) || 120);
          for (n in b) {
            for (t = b[n].tweens, i = t.length; --i > -1; )
              t[i]._gc && t.splice(i, 1);
            0 === t.length && delete b[n];
          }
          if (
            ((n = p._first),
            (!n || n._paused) &&
              r.autoSleep &&
              !k._first &&
              1 === u._listeners.tick.length)
          ) {
            for (; n && n._paused; ) n = n._next;
            n || u.sleep();
          }
        }
      };
      u.addEventListener("tick", o._updateRoot);
      var et = function (n, t, i) {
          var r,
            f,
            u = n._gsTweenID;
          if (
            (b[u || (n._gsTweenID = u = "t" + ai++)] ||
              (b[u] = {
                target: n,
                tweens: [],
              }),
            t && ((r = b[u].tweens), (r[(f = r.length)] = t), i))
          )
            for (; --f > -1; ) r[f] === t && r.splice(f, 1);
          return b[u].tweens;
        },
        si = function (n, t, i, u) {
          var e,
            o,
            f = n.vars.onOverwrite;
          return (
            f && (e = f(n, t, i, u)),
            (f = r.onOverwrite),
            f && (o = f(n, t, i, u)),
            e !== !1 && o !== !1
          );
        },
        bt = function (n, t, i, r, u) {
          var o, s, f, y;
          if (1 === r || r >= 4) {
            for (y = u.length, o = 0; y > o; o++)
              if ((f = u[o]) !== t) f._gc || (f._kill(null, n, t) && (s = !0));
              else if (5 === r) break;
            return s;
          }
          var h,
            c = t._startTime + e,
            l = [],
            a = 0,
            v = 0 === t._duration;
          for (o = u.length; --o > -1; )
            (f = u[o]) === t ||
              f._gc ||
              f._paused ||
              (f._timeline !== t._timeline
                ? ((h = h || hi(t, 0, v)), 0 === hi(f, h, v) && (l[a++] = f))
                : c >= f._startTime &&
                  f._startTime + f.totalDuration() / f._timeScale > c &&
                  (((v || !f._initted) && 2e-10 >= c - f._startTime) ||
                    (l[a++] = f)));
          for (o = a; --o > -1; )
            if (
              ((f = l[o]),
              2 === r && f._kill(i, n, t) && (s = !0),
              2 !== r || (!f._firstPT && f._initted))
            ) {
              if (2 !== r && !si(f, t)) continue;
              f._enabled(!1, !1) && (s = !0);
            }
          return s;
        },
        hi = function (n, t, i) {
          for (
            var u = n._timeline, f = u._timeScale, r = n._startTime;
            u._timeline;

          ) {
            if (((r += u._startTime), (f *= u._timeScale), u._paused))
              return -100;
            u = u._timeline;
          }
          return (
            (r /= f),
            r > t
              ? r - t
              : (i && r === t) || (!n._initted && 2 * e > r - t)
              ? e
              : (r += n.totalDuration() / n._timeScale / f) > t + e
              ? 0
              : r - t - e
          );
        };
      if (
        ((i._init = function () {
          var e,
            h,
            n,
            u,
            f,
            t = this.vars,
            s = this._overwrittenProps,
            c = this._duration,
            o = !!t.immediateRender,
            i = t.ease;
          if (t.startAt) {
            this._startAt &&
              (this._startAt.render(-1, !0), this._startAt.kill());
            f = {};
            for (u in t.startAt) f[u] = t.startAt[u];
            if (
              ((f.overwrite = !1),
              (f.immediateRender = !0),
              (f.lazy = o && t.lazy !== !1),
              (f.startAt = f.delay = null),
              (this._startAt = r.to(this.target, 0, f)),
              o)
            )
              if (this._time > 0) this._startAt = null;
              else if (0 !== c) return;
          } else if (t.runBackwards && 0 !== c)
            if (this._startAt)
              this._startAt.render(-1, !0),
                this._startAt.kill(),
                (this._startAt = null);
            else {
              0 !== this._time && (o = !1);
              n = {};
              for (u in t) (wt[u] && "autoCSS" !== u) || (n[u] = t[u]);
              if (
                ((n.overwrite = 0),
                (n.data = "isFromStart"),
                (n.lazy = o && t.lazy !== !1),
                (n.immediateRender = o),
                (this._startAt = r.to(this.target, 0, n)),
                o)
              ) {
                if (0 === this._time) return;
              } else
                this._startAt._init(),
                  this._startAt._enabled(!1),
                  this.vars.immediateRender && (this._startAt = null);
            }
          if (
            ((this._ease = i = i
              ? i instanceof a
                ? i
                : "function" == typeof i
                ? new a(i, t.easeParams)
                : tt[i] || r.defaultEase
              : r.defaultEase),
            t.easeParams instanceof Array &&
              i.config &&
              (this._ease = i.config.apply(i, t.easeParams)),
            (this._easeType = this._ease._type),
            (this._easePower = this._ease._power),
            (this._firstPT = null),
            this._targets)
          )
            for (e = this._targets.length; --e > -1; )
              this._initProps(
                this._targets[e],
                (this._propLookup[e] = {}),
                this._siblings[e],
                s ? s[e] : null
              ) && (h = !0);
          else
            h = this._initProps(
              this.target,
              this._propLookup,
              this._siblings,
              s
            );
          if (
            (h && r._onPluginEvent("_onInitAllProps", this),
            s &&
              (this._firstPT ||
                ("function" != typeof this.target && this._enabled(!1, !1))),
            t.runBackwards)
          )
            for (n = this._firstPT; n; )
              (n.s += n.c), (n.c = -n.c), (n = n._next);
          this._onUpdate = t.onUpdate;
          this._initted = !0;
        }),
        (i._initProps = function (t, i, r, u) {
          var f, h, c, e, s, o;
          if (null == t) return !1;
          yt[t._gsTweenID] && nt();
          this.vars.css ||
            (t.style &&
              t !== n &&
              t.nodeType &&
              w.css &&
              this.vars.autoCSS !== !1 &&
              li(this.vars, t));
          for (f in this.vars)
            if (((o = this.vars[f]), wt[f]))
              o &&
                (o instanceof Array || (o.push && d(o))) &&
                -1 !== o.join("").indexOf("{self}") &&
                (this.vars[f] = o = this._swapSelfInParams(o, this));
            else if (
              w[f] &&
              (e = new w[f]())._onInitTween(t, this.vars[f], this)
            ) {
              for (
                this._firstPT = s = {
                  _next: this._firstPT,
                  t: e,
                  p: "setRatio",
                  s: 0,
                  c: 1,
                  f: 1,
                  n: f,
                  pg: 1,
                  pr: e._priority,
                },
                  h = e._overwriteProps.length;
                --h > -1;

              )
                i[e._overwriteProps[h]] = this._firstPT;
              (e._priority || e._onInitAllProps) && (c = !0);
              (e._onDisable || e._onEnable) &&
                (this._notifyPluginsOfEnabled = !0);
              s._next && (s._next._prev = s);
            } else
              i[f] = fi.call(
                this,
                t,
                f,
                "get",
                o,
                f,
                0,
                null,
                this.vars.stringFilter
              );
          return u && this._kill(u, t)
            ? this._initProps(t, i, r, u)
            : this._overwrite > 1 &&
              this._firstPT &&
              r.length > 1 &&
              bt(t, this, i, this._overwrite, r)
            ? (this._kill(i, t), this._initProps(t, i, r, u))
            : (this._firstPT &&
                ((this.vars.lazy !== !1 && this._duration) ||
                  (this.vars.lazy && !this._duration)) &&
                (yt[t._gsTweenID] = !0),
              c);
        }),
        (i.render = function (n, t, i) {
          var h,
            s,
            u,
            y,
            c = this._time,
            f = this._duration,
            o = this._rawPrevTime;
          if (n >= f)
            (this._totalTime = this._time = f),
              (this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
              this._reversed ||
                ((h = !0),
                (s = "onComplete"),
                (i = i || this._timeline.autoRemoveChildren)),
              0 === f &&
                (this._initted || !this.vars.lazy || i) &&
                (this._startTime === this._timeline._duration && (n = 0),
                (0 === n || 0 > o || (o === e && "isPause" !== this.data)) &&
                  o !== n &&
                  ((i = !0), o > e && (s = "onReverseComplete")),
                (this._rawPrevTime = y = !t || n || o === n ? n : e));
          else if (1e-7 > n)
            (this._totalTime = this._time = 0),
              (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
              (0 !== c || (0 === f && o > 0)) &&
                ((s = "onReverseComplete"), (h = this._reversed)),
              0 > n &&
                ((this._active = !1),
                0 === f &&
                  (this._initted || !this.vars.lazy || i) &&
                  (o >= 0 && (o !== e || "isPause" !== this.data) && (i = !0),
                  (this._rawPrevTime = y = !t || n || o === n ? n : e))),
              this._initted || (i = !0);
          else if (((this._totalTime = this._time = n), this._easeType)) {
            var r = n / f,
              l = this._easeType,
              a = this._easePower;
            (1 === l || (3 === l && r >= 0.5)) && (r = 1 - r);
            3 === l && (r *= 2);
            1 === a
              ? (r *= r)
              : 2 === a
              ? (r *= r * r)
              : 3 === a
              ? (r *= r * r * r)
              : 4 === a && (r *= r * r * r * r);
            this.ratio =
              1 === l ? 1 - r : 2 === l ? r : 0.5 > n / f ? r / 2 : 1 - r / 2;
          } else this.ratio = this._ease.getRatio(n / f);
          if (this._time !== c || i) {
            if (!this._initted) {
              if ((this._init(), !this._initted || this._gc)) return;
              if (
                !i &&
                this._firstPT &&
                ((this.vars.lazy !== !1 && this._duration) ||
                  (this.vars.lazy && !this._duration))
              )
                return (
                  (this._time = this._totalTime = c),
                  (this._rawPrevTime = o),
                  v.push(this),
                  (this._lazy = [n, t]),
                  void 0
                );
              this._time && !h
                ? (this.ratio = this._ease.getRatio(this._time / f))
                : h &&
                  this._ease._calcEnd &&
                  (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
            }
            for (
              this._lazy !== !1 && (this._lazy = !1),
                this._active ||
                  (!this._paused &&
                    this._time !== c &&
                    n >= 0 &&
                    (this._active = !0)),
                0 === c &&
                  (this._startAt &&
                    (n >= 0
                      ? this._startAt.render(n, t, i)
                      : s || (s = "_dummyGS")),
                  this.vars.onStart &&
                    (0 !== this._time || 0 === f) &&
                    (t || this._callback("onStart"))),
                u = this._firstPT;
              u;

            )
              u.f
                ? u.t[u.p](u.c * this.ratio + u.s)
                : (u.t[u.p] = u.c * this.ratio + u.s),
                (u = u._next);
            this._onUpdate &&
              (0 > n &&
                this._startAt &&
                n !== -0.0001 &&
                this._startAt.render(n, t, i),
              t || ((this._time !== c || h) && this._callback("onUpdate")));
            s &&
              (!this._gc || i) &&
              (0 > n &&
                this._startAt &&
                !this._onUpdate &&
                n !== -0.0001 &&
                this._startAt.render(n, t, i),
              h &&
                (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                (this._active = !1)),
              !t && this.vars[s] && this._callback(s),
              0 === f &&
                this._rawPrevTime === e &&
                y !== e &&
                (this._rawPrevTime = 0));
          }
        }),
        (i._kill = function (n, t, i) {
          if (
            ("all" === n && (n = null),
            null == n && (null == t || t === this.target))
          )
            return (this._lazy = !1), this._enabled(!1, !1);
          t =
            "string" != typeof t
              ? t || this._targets || this.target
              : r.selector(t) || t;
          var f,
            s,
            o,
            u,
            e,
            c,
            l,
            a,
            h,
            v =
              i &&
              this._time &&
              i._startTime === this._startTime &&
              this._timeline === i._timeline;
          if ((d(t) || vt(t)) && "number" != typeof t[0])
            for (f = t.length; --f > -1; ) this._kill(n, t[f], i) && (c = !0);
          else {
            if (this._targets) {
              for (f = this._targets.length; --f > -1; )
                if (t === this._targets[f]) {
                  e = this._propLookup[f] || {};
                  this._overwrittenProps = this._overwrittenProps || [];
                  s = this._overwrittenProps[f] = n
                    ? this._overwrittenProps[f] || {}
                    : "all";
                  break;
                }
            } else {
              if (t !== this.target) return !1;
              e = this._propLookup;
              s = this._overwrittenProps = n
                ? this._overwrittenProps || {}
                : "all";
            }
            if (e) {
              if (
                ((l = n || e),
                (a =
                  n !== s &&
                  "all" !== s &&
                  n !== e &&
                  ("object" != typeof n || !n._tempKill)),
                i && (r.onOverwrite || this.vars.onOverwrite))
              ) {
                for (o in l) e[o] && (h || (h = []), h.push(o));
                if ((h || !n) && !si(this, i, t, h)) return !1;
              }
              for (o in l)
                (u = e[o]) &&
                  (v && (u.f ? u.t[u.p](u.s) : (u.t[u.p] = u.s), (c = !0)),
                  u.pg && u.t._kill(l) && (c = !0),
                  (u.pg && 0 !== u.t._overwriteProps.length) ||
                    (u._prev
                      ? (u._prev._next = u._next)
                      : u === this._firstPT && (this._firstPT = u._next),
                    u._next && (u._next._prev = u._prev),
                    (u._next = u._prev = null)),
                  delete e[o]),
                  a && (s[o] = 1);
              !this._firstPT && this._initted && this._enabled(!1, !1);
            }
          }
          return c;
        }),
        (i.invalidate = function () {
          return (
            this._notifyPluginsOfEnabled &&
              r._onPluginEvent("_onDisable", this),
            (this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null),
            (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
            (this._propLookup = this._targets ? {} : []),
            o.prototype.invalidate.call(this),
            this.vars.immediateRender &&
              ((this._time = -e), this.render(-this._delay)),
            this
          );
        }),
        (i._enabled = function (n, t) {
          if ((h || u.wake(), n && this._gc)) {
            var i,
              f = this._targets;
            if (f)
              for (i = f.length; --i > -1; )
                this._siblings[i] = et(f[i], this, !0);
            else this._siblings = et(this.target, this, !0);
          }
          return (
            o.prototype._enabled.call(this, n, t),
            this._notifyPluginsOfEnabled && this._firstPT
              ? r._onPluginEvent(n ? "_onEnable" : "_onDisable", this)
              : !1
          );
        }),
        (r.to = function (n, t, i) {
          return new r(n, t, i);
        }),
        (r.from = function (n, t, i) {
          return (
            (i.runBackwards = !0),
            (i.immediateRender = 0 != i.immediateRender),
            new r(n, t, i)
          );
        }),
        (r.fromTo = function (n, t, i, u) {
          return (
            (u.startAt = i),
            (u.immediateRender =
              0 != u.immediateRender && 0 != i.immediateRender),
            new r(n, t, u)
          );
        }),
        (r.delayedCall = function (n, t, i, u, f) {
          return new r(t, 0, {
            delay: n,
            onComplete: t,
            onCompleteParams: i,
            callbackScope: u,
            onReverseComplete: t,
            onReverseCompleteParams: i,
            immediateRender: !1,
            lazy: !1,
            useFrames: f,
            overwrite: 0,
          });
        }),
        (r.set = function (n, t) {
          return new r(n, 0, t);
        }),
        (r.getTweensOf = function (n, t) {
          if (null == n) return [];
          n = "string" != typeof n ? n : r.selector(n) || n;
          var i, u, f, e;
          if ((d(n) || vt(n)) && "number" != typeof n[0]) {
            for (i = n.length, u = []; --i > -1; )
              u = u.concat(r.getTweensOf(n[i], t));
            for (i = u.length; --i > -1; )
              for (e = u[i], f = i; --f > -1; ) e === u[f] && u.splice(i, 1);
          } else
            for (u = et(n).concat(), i = u.length; --i > -1; )
              (u[i]._gc || (t && !u[i].isActive())) && u.splice(i, 1);
          return u;
        }),
        (r.killTweensOf = r.killDelayedCallsTo = function (n, t, i) {
          "object" == typeof t && ((i = t), (t = !1));
          for (var u = r.getTweensOf(n, t), f = u.length; --f > -1; )
            u[f]._kill(i, n);
        }),
        (c = l(
          "plugins.TweenPlugin",
          function (n, t) {
            this._overwriteProps = (n || "").split(",");
            this._propName = this._overwriteProps[0];
            this._priority = t || 0;
            this._super = c.prototype;
          },
          !0
        )),
        (i = c.prototype),
        (c.version = "1.18.0"),
        (c.API = 2),
        (i._firstPT = null),
        (i._addTween = fi),
        (i.setRatio = ri),
        (i._kill = function (n) {
          var i,
            r = this._overwriteProps,
            t = this._firstPT;
          if (null != n[this._propName]) this._overwriteProps = [];
          else for (i = r.length; --i > -1; ) null != n[r[i]] && r.splice(i, 1);
          for (; t; )
            null != n[t.n] &&
              (t._next && (t._next._prev = t._prev),
              t._prev
                ? ((t._prev._next = t._next), (t._prev = null))
                : this._firstPT === t && (this._firstPT = t._next)),
              (t = t._next);
          return !1;
        }),
        (i._roundProps = function (n, t) {
          for (var i = this._firstPT; i; )
            (n[this._propName] ||
              (null != i.n && n[i.n.split(this._propName + "_").join("")])) &&
              (i.r = t),
              (i = i._next);
        }),
        (r._onPluginEvent = function (n, t) {
          var f,
            r,
            u,
            e,
            o,
            i = t._firstPT;
          if ("_onInitAllProps" === n) {
            for (; i; ) {
              for (o = i._next, r = u; r && r.pr > i.pr; ) r = r._next;
              (i._prev = r ? r._prev : e) ? (i._prev._next = i) : (u = i);
              (i._next = r) ? (r._prev = i) : (e = i);
              i = o;
            }
            i = t._firstPT = u;
          }
          for (; i; )
            i.pg && "function" == typeof i.t[n] && i.t[n]() && (f = !0),
              (i = i._next);
          return f;
        }),
        (c.activate = function (n) {
          for (var t = n.length; --t > -1; )
            n[t].API === c.API && (w[new n[t]()._propName] = n[t]);
          return !0;
        }),
        (st.plugin = function (n) {
          if (!(n && n.propName && n.init && n.API))
            throw "illegal plugin definition.";
          var i,
            r = n.propName,
            e = n.priority || 0,
            o = n.overwriteProps,
            u = {
              init: "_onInitTween",
              set: "setRatio",
              kill: "_kill",
              round: "_roundProps",
              initAll: "_onInitAllProps",
            },
            t = l(
              "plugins." + r.charAt(0).toUpperCase() + r.substr(1) + "Plugin",
              function () {
                c.call(this, r, e);
                this._overwriteProps = o || [];
              },
              n.global === !0
            ),
            f = (t.prototype = new c(r));
          f.constructor = t;
          t.API = n.API;
          for (i in u) "function" == typeof n[i] && (f[u[i]] = n[i]);
          return (t.version = n.version), c.activate([t]), t;
        }),
        (s = n._gsQueue))
      ) {
        for (f = 0; s.length > f; f++) s[f]();
        for (i in g)
          g[i].func ||
            n.console.log(
              "GSAP encountered missing dependency: com.greensock." + i
            );
      }
      h = !1;
    }
  })(
    "undefined" != typeof module &&
      module.exports &&
      "undefined" != typeof global
      ? global
      : this || window,
    "TweenMax"
  );
PrevY = 0;
names = [
  "Р’РёС‚Р°Р»РёР№",
  "РљРѕРЅСЃС‚Р°РЅС‚РёРЅ",
  "РђРЅРґСЂРµР№",
  "Р’Р°Р»РµРЅС‚РёРЅ",
  "Р“РµРѕСЂРіРёР№",
  "РќРёРєРѕР»Р°Р№",
  "Р”Р°РЅРёР»Р°",
  "Р’СЏС‡РµСЃР»Р°РІ",
  "РђР»РµРєСЃРµР№",
  "РќРёРєРѕР»Р°Р№",
  "Р РѕРјР°РЅ",
  "РЎС‚РµРїР°РЅ",
  "Р•РіРѕСЂ",
  "РќРёРєРёС‚Р°",
  "Р¤С‘РґРѕСЂ",
  "РђР»РµРєСЃР°РЅРґСЂ",
  "Р“СЂРёРіРѕСЂРёР№",
  "Р СѓСЃР»Р°РЅ",
  "Р СѓСЃР»Р°РЅ",
  "РЇСЂРѕСЃР»Р°РІ",
  "Р‘РѕРіРґР°РЅ",
  "РђРЅР°С‚РѕР»РёР№",
  "Р”РјРёС‚СЂРёР№",
  "Р¤РёР»РёРїРї",
  "РџС‘С‚СЂ",
  "РЎРµРјС‘РЅ",
  "РЇРЅ",
  "РђР»РµРєСЃР°РЅРґСЂ",
  "РџР°РІРµР»",
  "РЎРµРјС‘РЅ",
  "РР»СЊРґР°СЂ",
  "РЎС‚РµРїР°РЅ",
  "РСЂРёРє",
  "РўРёРјРѕС„РµР№",
  "РЎС‚Р°РЅРёСЃР»Р°РІ",
  "Р’Р°Р»РµРЅС‚РёРЅ",
  "РРІР°РЅ",
  "Р РѕРјР°РЅ",
  "РќРёРєРёС‚Р°",
  "РР»СЊСЏ",
  "Р’Р°Р»РµСЂРёР№",
  "РўРёРјРѕС„РµР№",
  "РЎРІСЏС‚РѕСЃР»Р°РІ",
  "Р’Р»Р°РґРёРјРёСЂ",
  "РЎС‚Р°РЅРёСЃР»Р°РІ",
  "РђРЅР°С‚РѕР»РёР№",
  "Р’Р°Р»РµСЂРёР№",
  "РЇСЂРѕСЃР»Р°РІ",
  "РќРёРєРѕР»Р°Р№",
  "Р‘РѕСЂРёСЃ",
  "РРіРѕСЂСЊ",
  "РћР»РµРі",
  "РџС‘С‚СЂ",
  "Р•РіРѕСЂ",
  "Р’Р°Р»РµСЂРёР№",
  "Р’Р°СЃРёР»РёР№",
  "Р’СЏС‡РµСЃР»Р°РІ",
  "Р›РµРѕРЅРёРґ",
  "Р“РµРЅРЅР°РґРёР№",
  "РњР°РєСЃРёРј",
  "РђСЂС‚С‘Рј",
  "РЇРєРѕРІ",
  "Р РѕРјР°РЅ",
  "РњРёС…Р°РёР»",
  "РЎРµСЂРіРµР№",
  "РњРёС…Р°РёР»",
  "РРґСѓР°СЂРґ",
  "РћР»РµРі",
  "Р›РµРѕРЅРёРґ",
  "РР»СЊСЏ",
  "Р’Р°Р»РµРЅС‚РёРЅ",
  "Р’Р°СЃРёР»РёР№",
  "РЎС‚РµРїР°РЅ",
  "Р СѓСЃР»Р°РЅ",
  "РџС‘С‚СЂ",
  "Р›РµРІ",
  "РђРЅС‚РѕРЅ",
  "Р”Р°РЅРёРёР»",
  "РђСЂРєР°РґРёР№",
  "РђСЂС‚С‘Рј",
  "Р РѕРјР°РЅ",
  "РђРЅР°С‚РѕР»РёР№",
  "РўРёРјСѓСЂ",
  "РџР°РІРµР»",
  "РњРёС…Р°РёР»",
  "Р СѓСЃС‚Р°Рј",
  "Р’Р»Р°РґРёСЃР»Р°РІ",
  "РђРЅРґСЂРµР№",
  "РњРёС…Р°РёР»",
  "РђР»РµРєСЃРµР№",
  "Р РѕР±РµСЂС‚",
  "РЇРєРѕРІ",
  "Р¤РёР»РёРїРї",
  "РЎРµСЂРіРµР№",
  "Р›РµРІ",
  "Р“Р»РµР±",
  "РњР°РєСЃРёРј",
  "РђР»РµРєСЃР°РЅРґСЂ",
  "РњРёС…Р°РёР»",
  "Р’РёРєС‚РѕСЂ",
  "Р”РµРЅРёСЃ",
  "РЎРµСЂРіРµР№",
  "Р’Р°СЃРёР»РёР№",
  "Р›РµРѕРЅРёРґ",
  "РР»СЊСЏ",
  "РђР»РµРєСЃРµР№",
  "Р’Р°Р»РµСЂРёР№",
  "РќРёРєРёС‚Р°",
  "РћР»СЊРіР°",
  "РСЂРёРЅР°",
  "Р’РёРєС‚РѕСЂРёСЏ",
  "РђР»С‘РЅР°",
  "РђР»РёРЅР°",
  "Р’РµСЂРѕРЅРёРєР°",
  "Р›СЋР±РѕРІСЊ",
  "РђР»РµРІС‚РёРЅР°",
  "РњР°СЂРіР°СЂРёС‚Р°",
  "Р›РёР»РёСЏ",
  "РђРЅРіРµР»РёРЅР°",
  "РўР°РёСЃРёСЏ",
  "РђРЅРЅР°",
  "РњР°СЂРёСЏ",
  "Р®Р»РёСЏ",
  "РњР°СЂРёСЏ",
  "РђРЅРЅР°",
  "РђР»РµРєСЃР°РЅРґСЂР°",
  "Р•Р»РёР·Р°РІРµС‚Р°",
  "Р’РµСЂРѕРЅРёРєР°",
  "Р•РєР°С‚РµСЂРёРЅР°",
  "Р’Р°Р»РµСЂРёСЏ",
  "РђР»РёРЅР°",
  "РњР°СЂРёРЅР°",
  "РџРѕР»РёРЅР°",
  "РњР°СЂРіР°СЂРёС‚Р°",
  "Р®Р»РёСЏ",
  "РќР°С‚Р°Р»СЊСЏ",
  "РЎРІРµС‚Р»Р°РЅР°",
  "РСЂРёРЅР°",
  "РЇРЅР°",
  "РњР°СЂРёРЅР°",
  "РћР»СЊРіР°",
  "РўР°С‚СЊСЏРЅР°",
  "РРЅРЅР°",
  "РЎРІРµС‚Р»Р°РЅР°",
  "Р›Р°СЂРёСЃР°",
  "Р’РµСЂР°",
  "Р•РІРіРµРЅРёСЏ",
  "РР»РµРѕРЅРѕСЂР°",
  "Р•Р»РµРЅР°",
  "РђРЅС‚РѕРЅРёРЅР°",
  "РЎРІРµС‚Р»Р°РЅР°",
  "Р’Р°Р»РµРЅС‚РёРЅР°",
  "РђР»РµРєСЃР°РЅРґСЂР°",
  "Р›СЋР±РѕРІСЊ",
  "РћР»СЊРіР°",
  "РљСЂРёСЃС‚РёРЅР°",
  "Р’РёРєС‚РѕСЂ",
  "РЎРµСЂРіРµР№",
  "РђРЅР°С‚РѕР»РёР№",
  "РђРЅС‚РѕРЅ",
  "Р’РёС‚Р°Р»РёР№",
  "Р“Р»РµР±",
  "РђР»РµРєСЃР°РЅРґСЂ",
  "РњР°СЂРє",
  "РђР»РµРєСЃРµР№",
  "РџР°РІРµР»",
  "РќРёРєРѕР»Р°Р№",
  "Р”Р°РІРёРґ",
  "РњР°РєСЃРёРј",
  "РћР»РµРі",
  "РђР»РµРєСЃР°РЅРґСЂ",
  "РђСЂС‚РµРј",
  "Р’Р°СЃРёР»РёР№",
  "РњР°С‚РІРµР№",
  "РђСЂСЃРµРЅ",
  "Р“СЂРёРіРѕСЂРёР№",
  "РРІР°РЅ",
  "Р’РёС‚Р°Р»РёР№",
  "Р›РµРІ",
  "Р’Р»Р°РґРёСЃР»Р°РІ",
  "РРІР°РЅ",
  "РЎРµСЂРіРµР№",
  "Р’СЏС‡РµСЃР»Р°РІ",
  "РќРёРєРёС‚Р°",
  "РЎРІСЏС‚РѕСЃР»Р°РІ",
  "Р”РјРёС‚СЂРёР№",
  "РЎС‚РµРїР°РЅ",
  "Р•РІРіРµРЅРёР№",
  "РђР»РµРєСЃРµР№",
  "РР»СЊСЏ",
  "РЎРµСЂРіРµР№",
  "Р•РІРіРµРЅРёР№",
  "РњРёС…Р°РёР»",
  "Р“РµРѕСЂРіРёР№",
];
window.onYouTubeIframeAPIReady = function () {
  var n, t, i, r;
  $("#mainScreenVideo").length &&
    ((n = new YT.Player($("#mainScreenVideo")[0])),
    console.log($("#mainScreenVideo").parent().find(".yt_over").length),
    $("#mainScreenVideo")
      .parent()
      .find(".yt_over")
      .click(function () {
        n.getPlayerState() == YT.PlayerState.PLAYING
          ? n.pauseVideo()
          : n.playVideo();
      }));
  $("#main-video").length &&
    ((t = new YT.Player($("#main-video")[0])),
    console.log($("#main-video").parent().find(".yt_over").length),
    $("#main-video")
      .parent()
      .find(".yt_over")
      .click(function () {
        t.getPlayerState() == YT.PlayerState.PLAYING
          ? t.pauseVideo()
          : t.playVideo();
      }));
  $("#workScreenVideo").length &&
    ((i = new YT.Player($("#workScreenVideo")[0])),
    console.log($("#workScreenVideo").parent().find(".yt_over").length),
    $("#workScreenVideo")
      .parent()
      .find(".yt_over")
      .click(function () {
        i.getPlayerState() == YT.PlayerState.PLAYING
          ? i.pauseVideo()
          : i.playVideo();
      }));
  $("#modalScreenVideo").length &&
    ((r = new YT.Player($("#modalScreenVideo")[0])),
    console.log($("#modalScreenVideo").parent().find(".yt_over").length),
    $("#modalScreenVideo")
      .parent()
      .find(".yt_over")
      .click(function () {
        r.getPlayerState() == YT.PlayerState.PLAYING
          ? r.pauseVideo()
          : r.playVideo();
      }));
};
$(document).ready(function () {
  var r = getRandom(105, 115),
    n,
    t,
    i;
  countDownOnline(r);
  n = 20;
  countDownSlots(n);
  $(".video-review").click(function () {
    $("#VideoModal iframe").attr("src", $(this).data("url"));
    $("#VideoModal").modal("show");
  });
  $("#VideoModal").on("hidden.bs.modal", function () {
    $("#VideoModal iframe").attr("src", "");
  });
  t = [0];
  showUsers(4, t);
  $(".users").slick({
    infinite: !0,
    arrows: !1,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: !1,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
  i = new (function () {
    var t = $("#countdown1"),
      r,
      u = 70,
      n = 6e4,
      f = function () {
        n >= 0 &&
          (r.html(formatTime(n)), t && t.html(formatTime(n)), (n -= u / 10));
      },
      e = function () {
        r = $("#countdown");
        i.Timer = $.timer(f, u, !0);
      };
    this.resetStopwatch = function () {
      n = 0;
      this.Timer.stop().once();
    };
    $(e);
  })();
  $(".button.subscribe").click(function (n) {
    n.preventDefault();
  });
  $("#SubscribeModal .close").click(function () {
    setCookie("modal", "false", {
      expires: new Date(new Date().getTime() + 3e3),
      path: "/",
    });
    $("#popup").css("display", "block");
    $("#SubscribeModal").modal("hide");
    breakGlass(!1);
    setTimeout(function () {
      $("#wrap").hide();
    }, 500);
  });
  $("#SubscribeModal") && breakGlass();
});
$(document).mousemove(function (n) {
  var t = n.pageY;
  t < 10 && t < PrevY && $("#SubscribeModal").length > 0 && !getCookie("modal")
    ? (console.log,
      $("#wrap").css("display", "block"),
      breakGlass("reverse"),
      setTimeout(function () {
        $(function () {
          $("#SubscribeModal").modal({
            keyboard: !1,
            backdrop: "static",
          });
        });
        $("#SubscribeModal").modal("show");
        $("#popup").css("display", "none");
      }, 800),
      (PrevY = 0))
    : (PrevY = t);
});
