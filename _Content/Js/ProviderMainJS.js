(function ($) {

        $(function () {

            var jcarousel = $('.jcarousel');



            jcarousel

                .on('jcarousel:reload jcarousel:create', function () {

                    var carousel = $(this),

                        width = carousel.innerWidth();



                    if (width >= 600) {

                        width = width / 4;

                    } else if (width >= 350) {

                        width = width / 4;

                    }



                    carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');

                })

                .jcarousel({

                    wrap: 'circular'

                });



            $('.jcarousel-control-prev')

                .jcarouselControl({

                    target: '-=1'

                });



            $('.jcarousel-control-next')

                .jcarouselControl({

                    target: '+=1'

                });



            $('.jcarousel-pagination')

                .on('jcarouselpagination:active', 'a', function () {

                    $(this).addClass('active');

                })

                .on('jcarouselpagination:inactive', 'a', function () {

                    $(this).removeClass('active');

                })

                .on('click', function (e) {

                    e.preventDefault();

                })

                .jcarouselPagination({

                    perPage: 1,

                    item: function (page) {

                        return '<a href="#' + page + '">' + page + '</a>';

                    }

                });

        });

    })(jQuery);



/*! jCarousel - v0.3.9 - 2018-07-30

* http://sorgalla.com/jcarousel/

* Copyright (c) 2006-2018 Jan Sorgalla; Licensed MIT */



    !function (t) { "use strict"; var i = t.jCarousel = {}; i.version = "0.3.9"; var s = /^([+\-]=)?(.+)$/; i.parseTarget = function (t) { var i = !1, e = "object" != typeof t ? s.exec(t) : null; return e ? (t = parseInt(e[2], 10) || 0, e[1] && (i = !0, "-=" === e[1] && (t *= -1))) : "object" != typeof t && (t = parseInt(t, 10) || 0), { target: t, relative: i } }, i.detectCarousel = function (t) { for (var i; t.length > 0;) { if ((i = t.filter("[data-jcarousel]")).length > 0) return i; if ((i = t.find("[data-jcarousel]")).length > 0) return i; t = t.parent() } return null }, i.base = function (s) { return { version: i.version, _options: {}, _element: null, _carousel: null, _init: t.noop, _create: t.noop, _destroy: t.noop, _reload: t.noop, create: function () { return this._element.attr("data-" + s.toLowerCase(), !0).data(s, this), !1 === this._trigger("create") ? this : (this._create(), this._trigger("createend"), this) }, destroy: function () { return !1 === this._trigger("destroy") ? this : (this._destroy(), this._trigger("destroyend"), this._element.removeData(s).removeAttr("data-" + s.toLowerCase()), this) }, reload: function (t) { return !1 === this._trigger("reload") ? this : (t && this.options(t), this._reload(), this._trigger("reloadend"), this) }, element: function () { return this._element }, options: function (i, s) { if (0 === arguments.length) return t.extend({}, this._options); if ("string" == typeof i) { if (void 0 === s) return void 0 === this._options[i] ? null : this._options[i]; this._options[i] = s } else this._options = t.extend({}, this._options, i); return this }, carousel: function () { return this._carousel || (this._carousel = i.detectCarousel(this.options("carousel") || this._element), this._carousel || t.error('Could not detect carousel for plugin "' + s + '"')), this._carousel }, _trigger: function (i, e, r) { var n, o = !1; return r = [this].concat(r || []), (e || this._element).each(function () { n = t.Event((s + ":" + i).toLowerCase()), t(this).trigger(n, r), n.isDefaultPrevented() && (o = !0) }), !o } } }, i.plugin = function (s, e) { var r = t[s] = function (i, s) { this._element = t(i), this.options(s), this._init(), this.create() }; return r.fn = r.prototype = t.extend({}, i.base(s), e), t.fn[s] = function (i) { var e = Array.prototype.slice.call(arguments, 1), n = this; return "string" == typeof i ? this.each(function () { var r = t(this).data(s); if (!r) return t.error("Cannot call methods on " + s + ' prior to initialization; attempted to call method "' + i + '"'); if (!t.isFunction(r[i]) || "_" === i.charAt(0)) return t.error('No such method "' + i + '" for ' + s + " instance"); var o = r[i].apply(r, e); return o !== r && void 0 !== o ? (n = o, !1) : void 0 }) : this.each(function () { var e = t(this).data(s); e instanceof r ? e.reload(i) : new r(this, i) }), n }, r } }(jQuery), function (t, i) { "use strict"; var s = t(i), e = function (t) { return parseFloat(t) || 0 }; t.jCarousel.plugin("jcarousel", { animating: !1, tail: 0, inTail: !1, resizeState: null, resizeTimer: null, lt: null, vertical: !1, rtl: !1, circular: !1, underflow: !1, relative: !1, _options: { list: function () { return this.element().children().eq(0) }, items: function () { return this.list().children() }, animation: 400, transitions: !1, wrap: null, vertical: null, rtl: null, center: !1 }, _list: null, _items: null, _target: t(), _first: t(), _last: t(), _visible: t(), _fullyvisible: t(), _init: function () { var t = this; return t.resizeState = s.width() + "x" + s.height(), this.onWindowResize = function () { t.resizeTimer && clearTimeout(t.resizeTimer), t.resizeTimer = setTimeout(function () { var i = s.width() + "x" + s.height(); i !== t.resizeState && (t.resizeState = i, t.reload()) }, 100) }, this }, _create: function () { this._reload(), s.on("resize.jcarousel", this.onWindowResize) }, _destroy: function () { s.off("resize.jcarousel", this.onWindowResize) }, _reload: function () { this.vertical = this.options("vertical"), null == this.vertical && (this.vertical = e(this.list().height()) > e(this.list().width())), this.rtl = this.options("rtl"), null == this.rtl && (this.rtl = function (i) { if ("rtl" === ("" + i.attr("dir")).toLowerCase()) return !0; var s = !1; return i.parents("[dir]").each(function () { if (/rtl/i.test(t(this).attr("dir"))) return s = !0, !1 }), s }(this._element)), this.lt = this.vertical ? "top" : "left", this.relative = "relative" === this.list().css("position"), this._list = null, this._items = null; var i = this.index(this._target) >= 0 ? this._target : this.closest(); this.circular = "circular" === this.options("wrap"), this.underflow = !1; var s = { left: 0, top: 0 }; return i.length > 0 && (this._prepare(i), this.list().find("[data-jcarousel-clone]").remove(), this._items = null, this.underflow = this._fullyvisible.length >= this.items().length, this.circular = this.circular && !this.underflow, s[this.lt] = this._position(i) + "px"), this.move(s), this }, list: function () { if (null === this._list) { var i = this.options("list"); this._list = t.isFunction(i) ? i.call(this) : this._element.find(i) } return this._list }, items: function () { if (null === this._items) { var i = this.options("items"); this._items = (t.isFunction(i) ? i.call(this) : this.list().find(i)).not("[data-jcarousel-clone]") } return this._items }, index: function (t) { return this.items().index(t) }, closest: function () { var i, s = this, r = this.list().position()[this.lt], n = t(), o = !1, l = this.vertical ? "bottom" : this.rtl && !this.relative ? "left" : "right"; return this.rtl && this.relative && !this.vertical && (r += e(this.list().width()) - this.clipping()), this.items().each(function () { if (n = t(this), o) return !1; var a = s.dimension(n); if ((r += a) >= 0) { if (i = a - e(n.css("margin-" + l)), !(Math.abs(r) - a + i / 2 <= 0)) return !1; o = !0 } }), n }, target: function () { return this._target }, first: function () { return this._first }, last: function () { return this._last }, visible: function () { return this._visible }, fullyvisible: function () { return this._fullyvisible }, hasNext: function () { if (!1 === this._trigger("hasnext")) return !0; var t = this.options("wrap"), i = this.items().length - 1, s = this.options("center") ? this._target : this._last; return !!(i >= 0 && !this.underflow && (t && "first" !== t || this.index(s) < i || this.tail && !this.inTail)) }, hasPrev: function () { if (!1 === this._trigger("hasprev")) return !0; var t = this.options("wrap"); return !!(this.items().length > 0 && !this.underflow && (t && "last" !== t || this.index(this._first) > 0 || this.tail && this.inTail)) }, clipping: function () { return e(this._element["inner" + (this.vertical ? "Height" : "Width")]()) }, dimension: function (t) { return e(t["outer" + (this.vertical ? "Height" : "Width")](!0)) }, scroll: function (i, s, e) { if (this.animating) return this; if (!1 === this._trigger("scroll", null, [i, s])) return this; t.isFunction(s) && (e = s, s = !0); var r = t.jCarousel.parseTarget(i); if (r.relative) { var n, o, l, a, h, u, c, f, d = this.items().length - 1, _ = Math.abs(r.target), p = this.options("wrap"); if (r.target > 0) { var g = this.index(this._last); if (g >= d && this.tail) this.inTail ? "both" === p || "last" === p ? this._scroll(0, s, e) : t.isFunction(e) && e.call(this, !1) : this._scrollTail(s, e); else if (n = this.index(this._target), this.underflow && n === d && ("circular" === p || "both" === p || "last" === p) || !this.underflow && g === d && ("both" === p || "last" === p)) this._scroll(0, s, e); else if (l = n + _, this.circular && l > d) { for (f = d, h = this.items().get(-1); f++ < l;)h = this.items().eq(0), (u = this._visible.index(h) >= 0) && h.after(h.clone(!0).attr("data-jcarousel-clone", !0)), this.list().append(h), u || ((c = {})[this.lt] = this.dimension(h), this.moveBy(c)), this._items = null; this._scroll(h, s, e) } else this._scroll(Math.min(l, d), s, e) } else if (this.inTail) this._scroll(Math.max(this.index(this._first) - _ + 1, 0), s, e); else if (o = this.index(this._first), n = this.index(this._target), l = (a = this.underflow ? n : o) - _, a <= 0 && (this.underflow && "circular" === p || "both" === p || "first" === p)) this._scroll(d, s, e); else if (this.circular && l < 0) { for (f = l, h = this.items().get(0); f++ < 0;) { h = this.items().eq(-1), (u = this._visible.index(h) >= 0) && h.after(h.clone(!0).attr("data-jcarousel-clone", !0)), this.list().prepend(h), this._items = null; var m = this.dimension(h); (c = {})[this.lt] = -m, this.moveBy(c) } this._scroll(h, s, e) } else this._scroll(Math.max(l, 0), s, e) } else this._scroll(r.target, s, e); return this._trigger("scrollend"), this }, moveBy: function (t, i) { var s = this.list().position(), r = 1, n = 0; return this.rtl && !this.vertical && (r = -1, this.relative && (n = e(this.list().width()) - this.clipping())), t.left && (t.left = e(s.left) + n + e(t.left) * r + "px"), t.top && (t.top = e(s.top) + n + e(t.top) * r + "px"), this.move(t, i) }, move: function (i, s) { s = s || {}; var e = this.options("transitions"), r = !!e, n = !!e.transforms, o = !!e.transforms3d, l = s.duration || 0, a = this.list(); if (!r && l > 0) a.animate(i, s); else { var h = s.complete || t.noop, u = {}; if (r) { var c = { transitionDuration: a.css("transitionDuration"), transitionTimingFunction: a.css("transitionTimingFunction"), transitionProperty: a.css("transitionProperty") }, f = h; h = function () { t(this).css(c), f.call(this) }, u = { transitionDuration: (l > 0 ? l / 1e3 : 0) + "s", transitionTimingFunction: e.easing || s.easing, transitionProperty: l > 0 ? n || o ? "all" : i.left ? "left" : "top" : "none", transform: "none" } } o ? u.transform = "translate3d(" + (i.left || 0) + "," + (i.top || 0) + ",0)" : n ? u.transform = "translate(" + (i.left || 0) + "," + (i.top || 0) + ")" : t.extend(u, i), r && l > 0 && a.one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", h), a.css(u), l <= 0 && a.each(function () { h.call(this) }) } }, _scroll: function (i, s, r) { if (this.animating) return t.isFunction(r) && r.call(this, !1), this; if ("object" != typeof i ? i = this.items().eq(i) : void 0 === i.jquery && (i = t(i)), 0 === i.length) return t.isFunction(r) && r.call(this, !1), this; this.inTail = !1, this._prepare(i); var n = this._position(i); if (n === e(this.list().position()[this.lt])) return t.isFunction(r) && r.call(this, !1), this; var o = {}; return o[this.lt] = n + "px", this._animate(o, s, r), this }, _scrollTail: function (i, s) { if (this.animating || !this.tail) return t.isFunction(s) && s.call(this, !1), this; var r = this.list().position()[this.lt]; this.rtl && this.relative && !this.vertical && (r += e(this.list().width()) - this.clipping()), this.rtl && !this.vertical ? r += this.tail : r -= this.tail, this.inTail = !0; var n = {}; return n[this.lt] = r + "px", this._update({ target: this._target.next(), fullyvisible: this._fullyvisible.slice(1).add(this._visible.last()) }), this._animate(n, i, s), this }, _animate: function (i, s, e) { if (e = e || t.noop, !1 === this._trigger("animate")) return e.call(this, !1), this; this.animating = !0; var r = this.options("animation"), n = t.proxy(function () { this.animating = !1; var t = this.list().find("[data-jcarousel-clone]"); t.length > 0 && (t.remove(), this._reload()), this._trigger("animateend"), e.call(this, !0) }, this), o = "object" == typeof r ? t.extend({}, r) : { duration: r }, l = o.complete || t.noop; return !1 === s ? o.duration = 0 : void 0 !== t.fx.speeds[o.duration] && (o.duration = t.fx.speeds[o.duration]), o.complete = function () { n(), l.call(this) }, this.move(i, o), this }, _prepare: function (i) { var s, r, n, o = this.index(i), l = o, a = this.dimension(i), h = this.clipping(), u = this.vertical ? "bottom" : this.rtl ? "left" : "right", c = this.options("center"), f = { target: i, first: i, last: i, visible: i, fullyvisible: a <= h ? i : t() }; if (c && (a /= 2, h /= 2), a < h) for (; ;) { if (0 === (s = this.items().eq(++l)).length) { if (!this.circular) break; if (s = this.items().eq(0), i.get(0) === s.get(0)) break; if ((r = this._visible.index(s) >= 0) && s.after(s.clone(!0).attr("data-jcarousel-clone", !0)), this.list().append(s), !r) { var d = {}; d[this.lt] = this.dimension(s), this.moveBy(d) } this._items = null } if (0 === (n = this.dimension(s))) break; if (a += n, f.last = s, f.visible = f.visible.add(s), a - e(s.css("margin-" + u)) <= h && (f.fullyvisible = f.fullyvisible.add(s)), a >= h) break } if (!this.circular && !c && a < h) for (l = o; !(--l < 0 || 0 === (s = this.items().eq(l)).length || 0 === (n = this.dimension(s)) || (a += n, f.first = s, f.visible = f.visible.add(s), a - e(s.css("margin-" + u)) <= h && (f.fullyvisible = f.fullyvisible.add(s)), a >= h));); return this._update(f), this.tail = 0, c || "circular" === this.options("wrap") || "custom" === this.options("wrap") || this.index(f.last) !== this.items().length - 1 || (a -= e(f.last.css("margin-" + u))) > h && (this.tail = a - h), this }, _position: function (t) { var i = this._first, s = e(i.position()[this.lt]), r = this.options("center"), n = r ? this.clipping() / 2 - this.dimension(i) / 2 : 0; return this.rtl && !this.vertical ? (this.relative ? s -= e(this.list().width()) - this.dimension(i) : s -= this.clipping() - this.dimension(i), s += n) : s -= n, !r && (this.index(t) > this.index(i) || this.inTail) && this.tail ? (s = this.rtl && !this.vertical ? s - this.tail : s + this.tail, this.inTail = !0) : this.inTail = !1, -s }, _update: function (i) { var s, e = this, r = { target: this._target, first: this._first, last: this._last, visible: this._visible, fullyvisible: this._fullyvisible }, n = this.index(i.first || r.first) < this.index(r.first), o = function (s) { var o = [], l = []; i[s].each(function () { r[s].index(this) < 0 && o.push(this) }), r[s].each(function () { i[s].index(this) < 0 && l.push(this) }), n ? o = o.reverse() : l = l.reverse(), e._trigger(s + "in", t(o)), e._trigger(s + "out", t(l)), e["_" + s] = i[s] }; for (s in i) o(s); return this } }) }(jQuery, window), function (t) { "use strict"; t.jcarousel.fn.scrollIntoView = function (i, s, e) { var r, n = t.jCarousel.parseTarget(i), o = this.index(this._fullyvisible.first()), l = this.index(this._fullyvisible.last()); if ((r = n.relative ? n.target < 0 ? Math.max(0, o + n.target) : l + n.target : "object" != typeof n.target ? n.target : this.index(n.target)) < o) return this.scroll(r, s, e); if (r >= o && r <= l) return t.isFunction(e) && e.call(this, !1), this; for (var a, h = this.items(), u = this.clipping(), c = this.vertical ? "bottom" : this.rtl ? "left" : "right", f = 0; 0 !== (a = h.eq(r)).length;) { if ((f += this.dimension(a)) >= u) { f - (parseFloat(a.css("margin-" + c)) || 0) !== u && r++; break } if (r <= 0) break; r-- } return this.scroll(r, s, e) } }(jQuery), function (t) { "use strict"; t.jCarousel.plugin("jcarouselControl", { _options: { target: "+=1", event: "click", method: "scroll" }, _active: null, _init: function () { this.onDestroy = t.proxy(function () { this._destroy(), this.carousel().one("jcarousel:createend", t.proxy(this._create, this)) }, this), this.onReload = t.proxy(this._reload, this), this.onEvent = t.proxy(function (i) { i.preventDefault(); var s = this.options("method"); t.isFunction(s) ? s.call(this) : this.carousel().jcarousel(this.options("method"), this.options("target")) }, this) }, _create: function () { this.carousel().one("jcarousel:destroy", this.onDestroy).on("jcarousel:reloadend jcarousel:scrollend", this.onReload), this._element.on(this.options("event") + ".jcarouselcontrol", this.onEvent), this._reload() }, _destroy: function () { this._element.off(".jcarouselcontrol", this.onEvent), this.carousel().off("jcarousel:destroy", this.onDestroy).off("jcarousel:reloadend jcarousel:scrollend", this.onReload) }, _reload: function () { var i, s = t.jCarousel.parseTarget(this.options("target")), e = this.carousel(); if (s.relative) i = e.jcarousel(s.target > 0 ? "hasNext" : "hasPrev"); else { var r = "object" != typeof s.target ? e.jcarousel("items").eq(s.target) : s.target; i = e.jcarousel("target").index(r) >= 0 } return this._active !== i && (this._trigger(i ? "active" : "inactive"), this._active = i), this } }) }(jQuery), function (t) { "use strict"; t.jCarousel.plugin("jcarouselPagination", { _options: { perPage: null, item: function (t) { return '<a href="#' + t + '">' + t + "</a>" }, event: "click", method: "scroll" }, _carouselItems: null, _pages: {}, _items: {}, _currentPage: null, _init: function () { this.onDestroy = t.proxy(function () { this._destroy(), this.carousel().one("jcarousel:createend", t.proxy(this._create, this)) }, this), this.onReload = t.proxy(this._reload, this), this.onScroll = t.proxy(this._update, this) }, _create: function () { this.carousel().one("jcarousel:destroy", this.onDestroy).on("jcarousel:reloadend", this.onReload).on("jcarousel:scrollend", this.onScroll), this._reload() }, _destroy: function () { this._clear(), this.carousel().off("jcarousel:destroy", this.onDestroy).off("jcarousel:reloadend", this.onReload).off("jcarousel:scrollend", this.onScroll), this._carouselItems = null }, _reload: function () { var i = this.options("perPage"); if (this._pages = {}, this._items = {}, t.isFunction(i) && (i = i.call(this)), null == i) this._pages = this._calculatePages(); else for (var s, e = parseInt(i, 10) || 0, r = this._getCarouselItems(), n = 1, o = 0; 0 !== (s = r.eq(o++)).length;)this._pages[n] ? this._pages[n] = this._pages[n].add(s) : this._pages[n] = s, o % e == 0 && n++; this._clear(); var l = this, a = this.carousel().data("jcarousel"), h = this._element, u = this.options("item"), c = this._getCarouselItems().length; t.each(this._pages, function (i, s) { var e = l._items[i] = t(u.call(l, i, s)); e.on(l.options("event") + ".jcarouselpagination", t.proxy(function () { var t = s.eq(0); if (a.circular) { var e = a.index(a.target()), r = a.index(t); parseFloat(i) > parseFloat(l._currentPage) ? r < e && (t = "+=" + (c - e + r)) : r > e && (t = "-=" + (e + (c - r))) } a[this.options("method")](t) }, l)), h.append(e) }), this._update() }, _update: function () { var i, s = this.carousel().jcarousel("target"); t.each(this._pages, function (t, e) { if (e.each(function () { if (s.is(this)) return i = t, !1 }), i) return !1 }), this._currentPage !== i && (this._trigger("inactive", this._items[this._currentPage]), this._trigger("active", this._items[i])), this._currentPage = i }, items: function () { return this._items }, reloadCarouselItems: function () { return this._carouselItems = null, this }, _clear: function () { this._element.empty(), this._currentPage = null }, _calculatePages: function () { for (var t, i, s = this.carousel().data("jcarousel"), e = this._getCarouselItems(), r = s.clipping(), n = 0, o = 0, l = 1, a = {}; 0 !== (t = e.eq(o++)).length;)n + (i = s.dimension(t)) > r && (l++ , n = 0), n += i, a[l] ? a[l] = a[l].add(t) : a[l] = t; return a }, _getCarouselItems: function () { return this._carouselItems || (this._carouselItems = this.carousel().jcarousel("items")), this._carouselItems } }) }(jQuery), function (t, i) { "use strict"; var s, e; t.each({ hidden: "visibilitychange", mozHidden: "mozvisibilitychange", msHidden: "msvisibilitychange", webkitHidden: "webkitvisibilitychange" }, function (t, r) { if (void 0 !== i[t]) return s = t, e = r, !1 }), t.jCarousel.plugin("jcarouselAutoscroll", { _options: { target: "+=1", interval: 3e3, autostart: !0, method: "scroll" }, _timer: null, _started: !1, _init: function () { this.onDestroy = t.proxy(function () { this._destroy(), this.carousel().one("jcarousel:createend", t.proxy(this._create, this)) }, this), this.onAnimateEnd = t.proxy(this._start, this), this.onVisibilityChange = t.proxy(function () { i[s] ? this._stop() : this._start() }, this) }, _create: function () { this.carousel().one("jcarousel:destroy", this.onDestroy), t(i).on(e, this.onVisibilityChange), this.options("autostart") && this.start() }, _destroy: function () { this._stop(), this.carousel().off("jcarousel:destroy", this.onDestroy), t(i).off(e, this.onVisibilityChange) }, _start: function () { if (this._stop(), this._started) return this.carousel().one("jcarousel:animateend", this.onAnimateEnd), this._timer = setTimeout(t.proxy(function () { this.carousel().jcarousel(this.options("method"), this.options("target")) }, this), this.options("interval")), this }, _stop: function () { return this._timer && (this._timer = clearTimeout(this._timer)), this.carousel().off("jcarousel:animateend", this.onAnimateEnd), this }, start: function () { return this._started = !0, this._start(), this }, stop: function () { return this._started = !1, this._stop(), this } }) }(jQuery, document);
var emailId;

function sanitiseHTML(val) {
    var sanitisediv = document.createElement("div");
    sanitisediv.innerHTML = val;
    return $(sanitisediv).text();
}


$(window).on('load', function () {
    $('#covidAlert').modal('show');

    $("#updates-events h4 a").click(function () {
        if ($(this).parent().next('div').hasClass('show')) {
            $(this).children('span').html('+');
        }
        else {
            $(this).children('span').html('-');
        }
    });

    $("#coronaModal").modal('show')
    var fadevar = localStorage.getItem('stateChanged');
    if (fadevar == "true") {
        stateSwitchPopup();
    }
    $(".mainNav .nav-item a").each(function () {
        var link = $(this).attr("href");
        link = link.split("index.html");
        var finalSplit = link[4];
        $(this).parent("li").addClass(finalSplit);
    });

    /* highlight active menu */
    var loc = window.location.pathname;
    if (loc.indexOf('/pages/home') > -1) {
        $(".pagelayout").addClass("homepage");

    } else if (loc.includes('/members/ky/en-US/Health-Care-Professionals/home')) {
        $(".alert").hide();
    } else if (/\/brokers([^\w]|$)/.test(window.location.pathname)) {
        $("#navbarCollapse li.brokers").addClass("selected");
    } else if (/\/hp([^\w]|$)/.test(window.location.pathname)) {
        $("#navbarCollapse li.hp").addClass("selected");
    } else if (/\/mem([^\w]|$)/.test(loc)) {
        $("#navbarCollapse li.mem").addClass("selected");
    } else if (/\/health-care-professionals([^\w]|$)/.test(loc)) {
        $("#navbarCollapse li.health-care-professionals").addClass("selected");
    } else if (/\/abtmolina([^\w]|$)/.test(loc)) {
        $('#navbarCollapse li.abtmolina').addClass('selected');
    }

    /*banner classes changes*/
    if (loc.indexOf('/pages/home') > -1) {
        $(".pagelayout").addClass("homepage");
    } else if (loc.toLowerCase().indexOf('/hp/marketplace/molina-marketplace') > -1) {
        $(".brokerWelcomeItem").addClass("brokerWCItem");
        $(".brokerItemDivider").addClass("broketItmDvdr");
    } else if (loc.toLowerCase().indexOf('/hp/duals/coverd/disability-and-senior-access-services') > -1) {
        $(".Artical_contentPrivacyPractices .bridgeAccess").css({
            "margin-top": "-35px"
        });
    } else if (loc.toLowerCase().indexOf('hp/marketplace/marketplace.aspx') > -1) {
        $(".brokerBanner.left .brokerBannerText h2").first().addClass("rtMedCov");
        $(".brokerBanner.left .brokerBannerText").first().addClass("rtMedCovparent");
    } else if (loc.indexOf('brokers/Marketplace') > -1) {
        $(".brokerBanner.right .brokerBannerText").addClass("lftComMedCov");
        $(".brokerBanner.left .brokerBannerText").addClass("rtComMedCov");
        $(".brokerBannerText .brokerBannerBTN").addClass("comBrkrBtn");
    }

    /* View Plans 2020 ID->#viewplanBan2020 based class-->.vwplnBan addition */
    $('#viewplanBan2020').closest('.banner').addClass('vwplnBan');

    /*State label updation*/

    $('#dd-country').msDropDown().data("dd").set("selectedIndex", $('#dd-country option[selected]').index());
    $('#dd-language').msDropDown().data("dd").set("selectedIndex", $('#dd-language option[selected]').index());

});

$(document).ready(function () {

    var pageurl = location.href;
    var Quat = pageurl.split('?')[1];

    if (Quat == "#Q1") {
        $('div#Q1').show();
        $('div#Q2,div#Q3,div#Q4').hide();
    }
    if (Quat == "#Q2") {
        $('div#Q2').show();
        $('div#Q1,div#Q3,div#Q4').hide();
    }
    if (Quat == "#Q3") {
        $('div#Q3').show();
        $('div#Q1,div#Q2,div#Q4').hide();
    }
    if (Quat == "#Q4") {
        $('div#Q4').show();
        $('div#Q1,div#Q2,div#Q3').hide();
    }


    $('.lang-info ul.tabs li a,.lang-info ul li a').on('click', function () { if ($('.lang-info ul.tabs li a,.lang-info ul li a').not(this).hasClass('active')) { $('.lang-info ul.tabs li a,.lang-info ul li a').removeClass('active') } })

    if (/\/ar-us([^\w]|$)/.test(window.location.pathname.toString().toLowerCase())) {
        $('.PageBannerLeftHandSideBanner .brokerBanner .brokerBannerBTN').css({ 'float': 'right', 'margin': '0' });
        $('.news.container .item,.helpbox .linkblog a,.Medicare .mainBanner .content > h2,.Medicare .mainBanner .content > div,.Medicare .mainBanner .content > p,.landing-module-wrapper .landing-module > div,.landing-module-wrapper .landing-module > h2,.newmember h2,.newmember p').css('direction', 'rtl');
    }

    /*Remove LOB POPUPS if Duplicates*/
    if ($("div.modal[id*='MedicareAlert']").length > 1) {
        $("div.modal[id*='MedicareAlert']").not(':last').remove();
    }
    if ($("div.modal[id*='internalAlert']").length > 1) {
        $("div.modal[id*='internalAlert']").not(':last').remove();
    }
    if ($("div.modal[id*='siteLeavingAlert']").length > 1) {
        $("div.modal[id*='siteLeavingAlert']").not(':last').remove();
    }
    /*End*/
    /* email validation */

    $('#emailModel #emailinput').focusout(function () {
        emailvalidation();
    });

    function emailvalidation() {
        var isValidEmail = false;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var emailVal = $('#emailinput').val();
        if (emailVal == '') {
            $('.errortxt .emailnotentered').show();
        } else if (!emailReg.test(emailVal)) {
            $('.errortxt .emailerrormessage').show();
            $('.errortxt .emailnotentered').hide();
            isValidEmail = false;
            return isValidEmail;
        } else {
            $('.errortxt .emailerrormessage').hide();
            $('.errortxt .emailnotentered').hide();
            isValidEmail = true;
            return isValidEmail;
        }
    }

    function captchavalidation() {
        var recaptcha = $("#emailModel #captcha_element input").val();
        var isValidCaptcha = false;
        if (recaptcha !== '') {
            $('#emailModel .captcha-wrapper .captchaerror').hide();
            isValidCaptcha = true;
            return isValidCaptcha;
        } else {
            $('#emailModel .captcha-wrapper .captchaerror').show();
            return isValidCaptcha;
        }
    }

    $('.emailthis.open_share_link_email_popup').on('click', function () {
        $('#emailModel #thankyoupopup').hide();
        $('#emailModel #emailBody').show();
        $('#emailModel #emailinput').val('');
        var absoluteURL = Encoder.htmlEncode(window.location.href);
        $("#emailModel .urlcntrn .url").html(absoluteURL);
        $('#emailModel .emailerrormessage,#emailModel .emailnotentered,#emailModel .captchaerror').hide();
    })

    $("#sendEmail").on('click', function () {
        event.preventDefault();
        var isValidEmail = emailvalidation();
        var isValidCaptcha = captchavalidation();
        if (isValidEmail && isValidCaptcha) {
            var emailtxt = $('#emailinput').val();
            var subjecttxt = $('#subjectinput').val();
            var BodyText = $('.url').text()

            $.ajax({
                url: "/api/sitecore/SendEmail/SendEmailAction",
                type: 'POST',
                data: {
                    email: emailtxt,
                    subject: subjecttxt,
                    BodyText: BodyText
                },
                success: function (data) {
                    $("#emailBody").hide();
                    $("#thankyoupopup").show();
                },
                error: function (xhr) { }
            });
        }
    });

    $('#pay-by-mail .ln-popup-close').click(function () {
        $('#pay-by-mail').modal('hide');
    });

    $('#community-resource select').msDropdown({
        visibleRows: 6
    });

    $('#dropdowncommunityresource').change(function () {
        var selectedCountry = $(this).children("option:selected").val();
        $('#hlinkDownload').attr('href', selectedCountry);
    })

    $('.video-container .video-block').on('click', function () {
        $(this).find('img').css('display', 'none');
        $(this).find('iframe').css('display', 'block');
    });

    $("#searchInputText").autocomplete({
        source: function (request, response) {
            var param = { term: $('#searchInputText').val() };
            $.ajax({
                url: '/api/Sitecore/PublicSiteSearch/GetSuggestion',
                data: JSON.stringify(param),
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    var input = JSON.parse(data);
                    response($.map(input, function (item) {
                        return {
                            label: item,
                            value: item
                        }
                    }));
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest + errorThrown);
                }
            });
        },
        minLength: 3
    });


    $(window).keyup(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 9 && $('.header-skip:focus').length) {
            $('.header-skip').addClass('focus');
        } else {
            $('.header-skip').removeClass('focus');
        }
    });


    $('.click-nav .clicker').on('click', function () {
        $(this).toggleClass('active');
        $(this).parent().toggleClass('active')
        $('.signin-dropdown').slideToggle(500);
        $('.signin-dropdown li').click(function () {
            $(this).parent().css('display', 'none');
        })
    });

    $('.close-medicare-ID-info').click(function () { $(this).parent().css('visibility', 'hidden') });
    var clicked = false;
    $('.titledivcntrnfaq .blockdivcntrnfaq').click(function () { clicked = true; if (clicked) { $(this).show() } });

    if ($('.MainContentRight #main-content').children().hasClass('banner') &&
        $('.MainContentRight #main-content').next().children().hasClass('sidebar-right-clearfix')) {
        $('.MainContentRight #sidebar-right #signIn_IFrame').css('min-height', '430px');
        $('.MainContentRight #main-content').next().children().addClass('sidebarPosition');
        $('.MainContentRight .medicare-ID-error').addClass('inthreecolumn');
        var topValue = $('.MainContentRight #main-content .banner').height() +
            ($('.MainContentRight #main-content').children().hasClass('medicare-ID-error') ? medicareheight = medicareheight() + parseInt(80) : 0) +
            ($('.MainContentRight #main-content').children().hasClass('medicare-ID-info') ? $('.MainContentRight .medicare-ID-info').height() : 0) + parseInt(26);
        $('.MainContentRight #sidebar-right').css('top', topValue);
        setTimeout(rightcolumnheight(topValue), 5000);
    }

    function medicareheight() {
        var medicarediv = $(".MainContentRight .medicare-ID-error");
        for (var i = 0; i < medicarediv.length; i++) {
            var medicareheight = 0;
            medicareheight = medicareheight + medicarediv.eq(i).height();
            console.log(medicareheight + medicarediv.eq(i).height())
        }
        return medicareheight;
    }

    function rightcolumnheight(topValue) {
        var maincontentheight = $('.MainContentRight #main-content').height();
        var sidebarheight = $('.MainContentRight #sidebar-right').height();
        var leftcontentheight = $('.MainContentRight .landing-module-wrapper').height();
        if (leftcontentheight < sidebarheight) {
            console.log('less height');
            var rightcolumnheight = sidebarheight + topValue + parseInt(50);
            $('.MainContentRight #main-content').css('height', rightcolumnheight);
        }
    }

    $('.ms-rtestate-read.ms-reusableTextView > img').on('click', function () {
        var sibling = $(this).closest('p').next();
        $(sibling).css({ 'display': $(sibling).css('display') === 'none' ? 'block' : 'none' });
        $(this).attr('src').indexOf('plus') != -1 ? $(this).attr('src', '/-/media/Molina/PublicWebsite/Images/members/common/en-us/minus.ashx') :
            $(this).attr('src', '/-/media/Molina/PublicWebsite/Images/members/common/en-us/plus.ashx');
    });
    $('.s4-wpTopTable p > img').on('click', function () {
        var sibling = $(this).parent('p').next();

        $(sibling).css({ 'display': $(sibling).css('display') === 'none' ? 'block' : 'none' });

        $(this).attr('src').indexOf('plus') != -1 ? $(this).attr('src', '/-/media/Molina/PublicWebsite/Images/members/common/en-us/minus.ashx') :

            $(this).attr('src', '/-/media/Molina/PublicWebsite/Images/members/common/en-us/plus.ashx');

    });
    $('.state-specific-links').click(function () {
        return confirm("You are now leaving the Molina Healthcare Website.  Any links to other non-Molina web sites are solely for your convenience in obtaining related information. Such inclusion or mention does not constitute or imply a recommendation or endorsement by Molina. Molina does not control the contents of these web sites and does not guarantee the accuracy or completeness of any such information.");
    });

    $('.pdf-select-wrapper .open-pdf').on('click', function () {
        if (!$(this).attr('href')) {
            alert('Please select any state to navigate.');
        }
    });

    //404 Page Prev Page Redirection
    $('.Error404 .gobackprevpage').attr('href', 'javascript:history.go(-1)');

    $('#contact-accordion .card-body form').css({
        "width": "600px",
        "margin": "0px 0px 0px 80px"
    });

    /*View plan toggle*/
    $('.tog-viewplans').on("click", function () {
        $(".CurrentYear p span").toggle();
        $(".viewplan-content").toggle();
    });

    /**recruiter form**/
    $("a.recruiter-form").click(function () {
        $('#recruiter-form').modal('toggle');
    });
    $(".close").attr("data-dismiss", "modal");
    $(".contactclosebutton").attr("data-dismiss", "modal");

    $(".MainContentRight.Medicare .text.container:eq(0)").addClass("iFrame1");
    $(".MainContentRight.Medicare .text.container:eq(1)").addClass("iFrame2");

    /*** toggle market place for**/
    $(".MainContentRight.Medicare .PageBannerLeftHandSideBanner .brokerBannerText .brokerBannerBTN").click(function () {
        $(".MainContentRight.Medicare .text.container.iFrame1").toggle();
    });

    /*** toggle market place for**/
    $(".MainContentRight.Medicare .pay-online-guest a.ln-pay-now").click(function (e) {
        event.preventDefault();
        $(".MainContentRight.Medicare .text.container.iFrame2").toggle();
        $(".MainContentRight.Medicare .PageBannerLeftHandSideBanner, .MainContentRight.Medicare .banner, .MainContentRight.Medicare .pay-online-guest, .MainContentRight.Medicare .other-payment-wrap, .MainContentRight.Medicare .text.container.iFrame1, .MainContentRight.Medicare .banner").hide();
    });

    /***show the active menu tree***/
    $(".nav-side-menu #menu-content li.active").parentsUntil(".menu-content").addClass("ShowParent");
    $(".ShowParent").addClass("show");
    $(".ShowParent.sub-menu").prev().removeClass("collapsed");


    if ($(".nav-side-menu #menu-content li.active").parent().prev().hasClass("submenu-level1")) {
        $(".nav-side-menu #menu-content li.active").parent().prev().css("background-color", "#0096A5");
    } else if ($(".nav-side-menu #menu-content li.active").parent().prev().hasClass("submenu-level2")) {
        $(".nav-side-menu #menu-content li.active").parent().prev().css("background", "#3ca4ab");
    } else if ($(".nav-side-menu #menu-content li.active").parent().prev().hasClass("submenu-level3")) {
        //$(".nav-side-menu #menu-content li.active").parent().prev().css("background", "#328587");
    } else if ($(".nav-side-menu #menu-content li.active").parent().prev().hasClass("submenu-level4")) {
        $(".nav-side-menu #menu-content li.active").parent().prev().css("background", "#989B98");
    }


    if ($(".submenudd-level4").hasClass("active")) {
        $(".submenudd-level4.ShowParent.show").prev("li").css("background", "#989B98");
    }
    if ($("li.submenu-level3,li.submenu-level2,li.submenu-level1").hasClass("active")) {
        var currentLink = $("li.submenu-level3.active,li.submenu-level2.active,li.submenu-level1.active");
        $(currentLink).toggleClass("collapsed");
        $(currentLink).next().toggleClass("show");
    }

    // New Conditions added on 19 - June - 2020
    if ($('#menu-content .sub-menu.submenudd-level3.ShowParent').hasClass('show')) {
        $('#menu-content .sub-menu.submenudd-level3.ShowParent').prev('li').addClass('active');
    }
    $('#menu-content li.submenu-level3').on('click', function () {
        $(this).toggleClass('active');
        $(this).toggleClass('collapsed');
    });
    $('.menu-list #menu-content li.submenu-level1.active').on('click', function () {
        $(this).removeClass('active');
        $(this).addClass('collapsed');
    });

    /*Mobile view*/
    var isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
    $(window).on("resize", function (event) {
        var width = $(this).width();
        if (width < 768) {
            $(".globalToolbox").insertAfter(".secondary-header");
            $("#main-navigation").insertBefore(".secondary-header");
            $(".globalToolbox").insertAfter(".provider-header");
            $("#provider-navigation").insertBefore(".provider-header");
            $('#main-navigation').css('z-index', 'inherit');
            $('.navbar.navbar-expand-md .navbar-nav .nav-item a').on('click', function () {
                $('.navbar-collapse').removeClass('show');
                $('.navbar-toggler').removeClass('active').addClass('collpased');
                $('.navbar.navbar-expand-md').removeClass('bgnone');
                $('.navbar-brand.d-block').removeClass('visibilityhidden');
                $('#main-navigation').css('z-index', '-1');
            });
            $('a[data-dismiss="modal"]').on('click', function () {
                $('#main-navigation').removeAttr('style');
            });
        } else {
            $(".globalToolbox").insertBefore(".secondary-header");
            $("#main-navigation").insertAfter(".secondary-header");
            $(".globalToolbox").insertBefore(".provider-header");
            $("#provider-navigation").insertAfter(".provider-header");
            $('#main-navigation').css('z-index', '3');
        }

    });

    if ($(window).width() < 768 || isMobile) {
        $('.navbar.navbar-expand-md .navbar-nav .nav-item a').on('click', function () {
            $('.navbar-collapse').removeClass('show');
            $('.navbar-toggler').removeClass('active').addClass('collpased');
            $('.navbar.navbar-expand-md').removeClass('bgnone');
            $('.navbar-brand.d-block').removeClass('visibilityhidden');
            $('#main-navigation').css('z-index', '-1');
        });
        $('a[data-dismiss="modal"]').on('click', function () {
            $('#main-navigation').removeAttr('style');
        });
    }

    if ($(window).width() < 768 || isMobile) {
        $(".globalToolbox").insertAfter(".secondary-header");
        $("#main-navigation").insertBefore(".secondary-header");
        $(".globalToolbox").insertAfter(".provider-header");
        $("#provider-navigation").insertBefore(".provider-header");
    } else {
        $(".globalToolbox").insertBefore(".secondary-header");
        $("#main-navigation").insertAfter(".secondary-header");
        $(".globalToolbox").insertBefore(".provider-header");
        $("#provider-navigation").insertAfter(".provider-header");
    }

    /*FAq-Accordian */

    $('ul.faq_accordion li.titledivcntrnfaq .accordion_header').click(function () {
        if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active');
            $(this).next().hide();
        } else {
            if ($(this).closest('ul').hasClass('accordions-single-expanded')) {
                $(this).closest('ul').find('.blockdivcntrnfaq ').hide();
                $(this).closest('ul').find('li.titledivcntrnfaq').removeClass('active');
            }
            $(this).parent().addClass('active');
            $(this).next().show();
        }
    });


    $('ul.faq_accordion1 li.titledivcntrnfaq .blockdivcntrnfaq,ul.faq_accordion li.titledivcntrnfaq .blockdivcntrnfaq').first().show();
    $('ul.faq_accordion1 li.titledivcntrnfaq,ul.faq_accordion li.titledivcntrnfaq').first().addClass('active');

    $('ul.faq_accordion1 li.titledivcntrnfaq').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).find('.blockdivcntrnfaq ').hide();
        } else {
            $(this).addClass('active');
            $(this).find('.blockdivcntrnfaq ').show();
        }
    });

    /*ViewPlan accordian*/
    $(".tbtn").click(function () {
        $(this).parents("tbody").find(".toggler").toggleClass("toggler1");
        $(this).parents("tbody").find(".tbtnexpanded").addClass("tbtncollapsed");

        $(this).parents("tbody").find(".tbtncollapsed").toggleClass("tbtnexpanded");
    });

    /*Accordian-static page */
    $(function () {
        $(".pageContent .accordion").accordion({
            collapsible: true,
            heightStyle: "content",
            active: false
        });
    });


    $(".pdf-select-wrapper .open-pdf").click(function () {
        if ($('.pdf-select-wrapper select').val() === '') {
            alert("Please select any option to navigate.");
            return false;
        }
    });

    /*Navigation*/
    $('.headerContainer .navigation .main-menu').click(function () {
        $(this).addClass('menu-open');
        $(this).siblings().removeClass('menu-open');
        $(this).siblings().find('.mega').removeClass('d-block');
        $(this).find('.mega').addClass('d-block');
    });

    /*GlobalToolbox*/
    // bind change event to select

    $("#main-navigation #main-menu ul li.first-level-nav:nth-child(1)").addClass('otherState');
    $("#main-navigation #main-menu ul li.first-level-nav:nth-child(2)").addClass('otherState');
    $("#main-navigation #main-menu ul li.first-level-nav:nth-child(3)").addClass('otherState');

    //other state popup for first 3 menus
    if ($("#main-navigation #main-menu ul li.first-level-nav").hasClass("otherState")) {
        $("#main-navigation #main-menu ul li.first-level-nav:nth-child(-n+3)").attr('data-toggle', 'modal').attr('data-target', '#OtherStatePop');
    } else {
        $("#main-navigation #main-menu ul li.first-level-nav:nth-child(-n+3)").removeAttr("data-target", "data-toggle", "id");
    }

    //sidenav color change onhover
    $(".nav-side-menu li").hover(
        function () {
            $(this).addClass("hover");
        },
        function () {
            $(this).removeClass("hover");
        }
    );

    /*Carousel */
    $('#carouselExampleIndicators').find('.carousel-item').first().addClass('active');
    $(function () {
        /* Initialize Carousel */
        var paused = false;
        $('#carouselExampleIndicators').carousel({
            interval: 3500,
            pause: false
        });
        $('#carouselExampleIndicators').hover(
            function () {
                $(this).carousel('pause');
            },
            function () {
                $(this).carousel('cycle');
            }
        );

        /* Play trigger */
        $('.contrlbutton .pausebtn').click(function () {
            var state = (paused) ? 'cycle' : 'pause';
            paused = (paused) ? false : true;
            $('#carouselExampleIndicators').carousel(state);
            $(this).toggleClass('playbtn');
        });
    });

    /*Medicare Advantage alert */
    var externalAnchor = $("a.externalAdvantageLink");
    $(externalAnchor).attr('data-toggle', 'modal').attr('data-target', '#shopPlansAlert');



    /*InstaMed Alert*/
    var instamedAnchor = $("a.instamed-popup");
    $(instamedAnchor).attr('data-toggle', 'modal').attr('data-target', '#instamed-alert');
    $(instamedAnchor).click(function () {
        var internalLink = $(this).attr('href');
        $("#instamed-alert .get-ex-link").attr('href', internalLink);
        if ($(this).attr('target')) {
            var targetvalue = $(this).attr('target');
            $('#instamed-alert .confirmation-box .get-ex-link').attr('target', targetvalue);
        }
        $("a.get-ex-link").click(function () {
            $('#instamed-alert').modal('hide');
        });
    });

    var ourPlansAnchor = $("a.ourPlanspopup");
    $(ourPlansAnchor).attr('data-toggle', 'modal').attr('data-target', '#ourPlansAlert');

    /*ChatBot Scripts*/
    $('#floating-bot-image').on('click', function () {
        var loc = window.location.pathname;
        if (loc.toLowerCase().indexOf('es-us/index.html') > -1) {
            $("#chatbot iframe").attr('src', 'https://ai-chatbot.molinahealthcare.com/?source=PWS&amp;locale=es_US');
        } else {
            $("#chatbot iframe").attr('src', 'https://ai-chatbot.molinahealthcare.com/?source=PWS&amp;locale=en_US');
        }

        $('#chatbot').css('display', 'block');
    });
    $('#chatbot-close-image').on('click', function () {
        $('#chatbot').css('display', 'none');
        $("#chatbot iframe").attr('src', '');
    });


    /*End*/
    $('.decreaseType').click(function () {

        var originalCon = parseInt($('#main-content div').css('font-size'));
        var originalH3 = parseInt($('#main-content h3').css('font-size'));
        var originalHeading = parseInt($('#main-content h2').not('.modal').css('font-size'));
        var originalAnchor = parseInt($('#main-content a').not('.modal').css('font-size'));
        if (parseInt($('#main-content h2').not('.modal').next('h2').css('font-size')) > originalHeading) {
            originalHeading = parseInt($('#main-content h2').not('.modal').next('h2').css('font-size'));
        }
        curSize = parseInt($('#main-content div').css('font-size')) - 1;
        headingSize = parseInt($('#main-content h2').not('.modal').css('font-size')) - 2;
        headingH3Size = parseInt($('#main-content h3').not('.modal').css('font-size')) - 1;
        anchorSize = parseInt($('#main-content a').not('.modal').css('font-size')) - 1;
        if (!(originalHeading > 23 || originalCon > 17 || originalH3 > 19)) {
            if (headingSize >= 16) {
                $('#main-content h2').attr('style', "font-size:" + headingSize + 'px!important');
            }
        }
        if (anchorSize >= 13) {
            $('#main-content a').attr('style', "font-size:" + anchorSize + 'px!important');
        }

        if (curSize >= 12) {
            $('#main-content ul, #main-content ul li,#main-content ol,#main-content ol li,#main-content span,#main-content p,#main-content div,#main-content h4,#main-content h4 a,#main-content table,#main-content table th,#main-content table td, .globalContactUsLeftNavZoom').attr('style', "font-size:" + curSize + 'px!important');
        }
        if (headingH3Size >= 14) {
            $('#main-content h3').attr('style', "font-size:" + headingH3Size + 'px!important');
        }

    });

    $('.increaseType').click(function () {

        var originalCon = parseInt($('#main-content div').css('font-size'));
        var originalH3 = parseInt($('#main-content h3').css('font-size'));
        var originalHeading = parseInt($('#main-content h2').not('.modal').css('font-size'));
        var originalAnchor = parseInt($('#main-content a').not('.modal').css('font-size'));
        if (parseInt($('#main-content h2').not('.modal').next('h2').css('font-size')) > originalHeading) {
            originalHeading = parseInt($('#main-content h2').not('.modal').next('h2').css('font-size'));
        }

        curSize = parseInt($('#main-content div').css('font-size')) + 1;
        headingSize = parseInt($('#main-content h2').not('.modal').css('font-size')) + 2;
        headingH3Size = parseInt($('#main-content h3').not('.modal').css('font-size')) + 1;
        anchorSize = parseInt($('#main-content a').not('.modal').css('font-size')) + 1;
        if (!(originalHeading > 23 || originalCon > 17 || originalH3 > 19)) {
            if (headingSize <= 23) {
                $('#main-content h2').attr('style', "font-size:" + headingSize + 'px!important');
            }
        }

        if (anchorSize <= 18) {
            $('#main-content a').attr('style', "font-size:" + anchorSize + 'px!important');
        }
        if (curSize <= 17) {

            $('#main-content ul,#main-content ul li,#main-content ol,#main-content ol li,#main-content span,#main-content p,#main-content div,#main-content h4,#main-content table,#main-content h4 a,#main-content table th,#main-content table td, .globalContactUsLeftNavZoom').attr('style', "font-size:" + curSize + 'px!important');

        }
        if (headingH3Size <= 19) {

            $('#main-content h3').attr('style', "font-size:" + headingH3Size + 'px!important');
        }

    });


    $("ul.benefits_accordion").accordion({
        collapsible: true,
        heightStyle: "content",
        active: false
    });

    $(".benefits_inner_accordion").accordion({
        collapsible: true,
        heightStyle: "content"
    });

    $("ul.benefits_accordion.accordions-first-expanded").accordion({
        collapsible: true,
        heightStyle: "content"
    });

    $("ul.benefits_accordion.accordions-first-expanded .benefits_inner_accordion").accordion({
        collapsible: true,
        heightStyle: "content",
        active: false
    });

    $("ul.benefits_accordion.accordions-first-expanded li.middle_li a.benefits_accordion_header").eq(0).trigger('click');

    $("#sidebar ul li a").each(function () {
        $(this).hover(function () {
            $(this).next().show();
            $(this).next().hover(function () {
                $(this).show()
            }, function () {
                $(this).hide()
            })
        }, function () {
            $(this).next().hide()
        })
    })


    $('.submit-contactform').prop('disabled', true);
    $('.firstnametxtfield,.lastnametxtfield,.telephonetxtfield,.zipcodetxtfield,.emailtxtfield').blur(function () {
        if ($('.firstnametxtfield').val() && $('.lastnametxtfield').val() && $('.telephonetxtfield').val() && $('.zipcodetxtfield').val() && $('.emailtxtfield').val()) {
            $('.submit-contactform').prop('disabled', false);
            $('.submit-contactform').addClass('enabled');
        } else {
            $('.submit-contactform').prop('disabled', true);
            $('.submit-contactform').removeClass('enabled');
        }
    });


    $('.stateddlSelector select').msDropdown({
        visibleRows: 6
    });

    $('#dd-language').msDropdown({
        visibleRows: 6,
        on: {
            create: function () {
                $("#dd-language > option").each(function () {
                    if ($(this).text().trim().length >= 25) {
                        $('#dd-language_msdd').css('width', '300px');
                        $('.stateSelector label').css({ 'width': '120px', 'margin': '0' })
                        $('.stateSelector').css('padding', '0');
                        $('.stateddlSelector').css('margin', '0');
                        $('.typeTool').css({ 'margin': '0', 'padding': '0' })
                    }
                    return;
                })
            }
        }
    });

    $('.states').on('click', function () {
        var stateName = $(this).attr('id');
        $('#USServiceArea').css('display', 'none');
        $('#' + stateName + 'ServiceArea').css('display', 'block');
    });

    $(".SubmitAvalon").click(function () {
        var r, u;
        if (event.preventDefault(), validateForm($(".moduleform"))) {
            $(".hide-error-field").hide();
            var n = {},
                t = {},
                i = new Date,
                f = i.getDate() + "/" + (i.getMonth() + 1) + "/" + i.getFullYear(),
                e = i.getHours() + ":" + i.getMinutes(),
                o = f + " " + e;
            t = collectFormData(".moduleform");
            n.PersonName = t.PersonName;
            if (t.PersonName == undefined) {
                n.PersonName = t.FirstName;
            }
            n.FirstName = t.FirstName;
            n.LastName = t.LastName;
            n.Phone = t.PhoneNumber;
            n.Email = t.Email !== undefined ? t.Email : "";
            n.ZipCode = t.Zip !== undefined ? t.Zip : "";
            n.BestTime = t.BestTime !== undefined ? t.BestTime : "";
            n.FormID = 0;
            n.URL = window.location.href;
            n.CreatedDate = o;
            r = $('#g-recaptcha-response').val();
            u = $(".emailitem-hdn").attr("email-template-id");
            $.ajax({
                type: "POST",
                url: "/api/Sitecore/AvalonAppointment/AskQuestionAPI",
                data: JSON.stringify({
                    AskQuestionJsonInput: n,
                    CaptchaResponse: r,
                    EmailtemplateID: u
                }),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (n) {
                    $("#contactusform-submission-alert").length > 0 ? $("#contactusform-submission-alert").modal("show") : $(".side-module-form.thankyou").length > 0 ? ($(".side-module-form").hide(), $(".side-module-form.thankyou").show()) : n.ThankYouPageURL != null && window.location.assign(n.ThankYouPageURL);
                    n.success == "true" && ($("#contactusform-submission-alert").length > 0 ? $("#contactusform-submission-alert").modal("show") : $(".side-module-form.thankyou").length > 0 ? ($(".side-module-form").hide(), $(".side-module-form.thankyou").show()) : n.ThankYouPageURL != null && window.location.assign(n.ThankYouPageURL))
                },
                error: function () {
                    $("#contactusform-submission-alert").length > 0 ? $("#contactusform-submission-alert").modal("show") : $(".side-module-form.thankyou").length > 0 ? ($(".side-module-form").hide(), $(".side-module-form.thankyou").show()) : data.ThankYouPageURL != null && window.location.assign(data.ThankYouPageURL)
                }
            })
        } else $(".hide-error-field").show()
    });

});

/*facebook & twitter & google*/
function facebookurl() {
    var e = document.getElementsByClassName("fb-small"),
        o = window.location.href.replace("#", ""),
        t = 550,
        n = 450,
        i = screen.height,
        s = screen.width,
        h = Math.round(s / 2 - t / 2),
        r = 0,
        u = document,
        f = "";
    i > n && (r = Math.round(i / 2 - n / 2));
    window.shareWin = window.open(encodeURI("https://www.facebook.com/login.php?skip_api_login=" + o) + "&t=" + e + "", "", "left=" + h + ",top=" + r + ",width=" + t + ",height=" + n + ",personalbar=0,toolbar=0,scrollbars=1,resizable=1");
    f = u.createElement("script");
    u.getElementsByTagName("head")[0].appendChild(f)
}

function twitterurl() {
    var e = document.getElementsByClassName("twitter-small"),
        e = window.location.href.replace("#", ""),
        t = 550,
        n = 465,
        i = screen.height,
        o = screen.width,
        s = Math.round(o / 2 - t / 2),
        r = 0,
        u = document,
        f = "";
    i > n && (r = Math.round(i / 2 - n / 2));
    window.shareWin = window.open(encodeURI("https://twitter.com/intent/tweet?url=" + e), "", "left=" + s + ",top=" + r + ",width=" + t + ",height=" + n + ",personalbar=0,toolbar=0,scrollbars=1,resizable=1");
    f = u.createElement("script");
    u.getElementsByTagName("head")[0].appendChild(f)
}

function gplusurl() {
    var e = document.getElementsByClassName("googleplus-small"),
        e = document.URL.replace("#", ""),
        t = 550,
        n = 465,
        i = screen.height,
        o = screen.width,
        s = Math.round(o / 2 - t / 2),
        r = 0,
        u = document,
        f = "";
    i > n && (r = Math.round(i / 2 - n / 2));
    window.shareWin = window.open(encodeURI("https://plus.google.com/share?url=" + e), "", "left=" + s + ",top=" + r + ",width=" + t + ",height=" + n + ",personalbar=0,toolbar=0,scrollbars=1,resizable=1");
    f = u.createElement("script");
    u.getElementsByTagName("head")[0].appendChild(f)
}

//module form
var onloadCallback = function () {
    var recaptcha = document.getElementById("captcha_element");

    if (recaptcha) {
        grecaptcha.render('captcha_element', {
            'sitekey': '6LdETLUUAAAAAJeMufpj7wsjBWmww_1dfhk1GvfB',
            'callback': function (response) {
                response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
                $("[data-sc-field-key='recaptcha-validation']").addClass("hide-error-field");
            }
        });
    }

    var contactusrecaptcha = document.getElementById("ContactUsForm");

    if (contactusrecaptcha) {
        grecaptcha.render('ContactUsForm', {
            'sitekey': '6LdETLUUAAAAAJeMufpj7wsjBWmww_1dfhk1GvfB',
            'callback': function (response) {
                response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
                $("[data-sc-field-key='recaptcha-validation']").addClass("hide-error-field");
            }
        });
    }

    var moduleFormrecaptcha = document.getElementById("ModuleForm");
    if (moduleFormrecaptcha) {
        grecaptcha.render('ModuleForm', {
            'sitekey': '6LdETLUUAAAAAJeMufpj7wsjBWmww_1dfhk1GvfB',
            'callback': function (response) {
                response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
                $("[data-sc-field-key='recaptcha-validation']").addClass("hide-error-field");
            }
        });
    }
};
var onRecaptchaLoadCallback = function () {
    var recaptcha = document.getElementById("captcha_element");
    if (recaptcha) {
        var sitekey = recaptcha.dataset.sitekey;
        onRecatchaReady("captcha_element", sitekey);
    }
    var contactusrecaptcha = document.getElementById("ContactUsForm");
    if (contactusrecaptcha) {
        var sitekey = contactusrecaptcha.dataset.sitekey;
        onRecatchaReady("ContactUsForm", sitekey);
    }
    var moduleFormrecaptcha = document.getElementById("ModuleForm");
    if (moduleFormrecaptcha) {
        var sitekey = moduleFormrecaptcha.dataset.sitekey;
        onRecatchaReady("ModuleForm", sitekey);
    }
};
var onRecatchaReady = function (ele, sitekey) {
    var clientId = grecaptcha.render(ele, {
        'sitekey': sitekey,
        'badge': 'inline',
        'size': 'invisible'
    });
    grecaptcha.ready(function () {
        grecaptcha.execute(clientId, {
            action: 'submit'
        })
            .then(function (token) {
                $('#' + ele + '-g-recaptcha-response').val(token);
                $("[data-sc-field-key='recaptcha-validation']").addClass("hide-error-field");
            });
    });
}


$("#dd-country").on("change", function () {
    if ($(this).val() == "OtherStates") {
        /****appending the Id to url****/

    } else {
        $("#main-navigation #main-menu ul li.first-level-nav:nth-child(-n+3)").removeAttr("data-target", "data-toggle", "id");
    }
});

$("#main-navigation #main-menu ul li a").click(function () {
    var menuTarget = $(this).attr("id");
    var Onclickurl = $(this).attr("href");

    $("#currentclickurl").attr("value", Onclickurl);
    if (($("#main-navigation #main-menu ul li.first-level-nav").hasClass("otherState"))) {
        var dummyurl = $("#main-navigation #main-menu ul li.first-level-nav a").attr("href");
    }
});


/*print*/

function printSpecial() {

    if (document.getElementById != null) {
        var cssPath = [];
        var htmlBody = '';
        var htmlHead = '<META content=IE=edge,chrome=1 http-equiv=X-UA-Compatible>\n';

        if (document.getElementsByTagName != null) {
            var linkTags = document.getElementsByTagName("link");
            for (index = 0; index < linkTags.length; index++) {
                var href = linkTags[index].getAttribute("href");
                cssPath.push(href);
            }

            var styleTags = document.getElementsByTagName("style");
            for (index = 0; index < styleTags.length; index++) {
                htmlHead += '\n<style type="text/css">' + styleTags[index].innerHTML + '</style>';
            }

            htmlHead += '\n#main-content a:link:after, #main-content a:visited:after,.headerlogo a:link:after, .headerlogo a:visited:after {content: "" !important;}';
            htmlHead += '\n</style>';
            htmlBody += '\n<div class="header header-popup clearfix">';
            htmlBody += '\n</div>\n</div>';
        }
        var printReadyElem = document.getElementById("main-content");
        if (printReadyElem != null) {
            htmlBody += printReadyElem.innerHTML;
        } else {
            alert("Could not find the printReady function");
            return;
        }

        if (navigator.appVersion.search('Trident') < 0) {
            var printWindow = window.open('', '', 'left=15,top=25,width=1050,height=600,scrollbars=1');
            printWindow.document.head.innerHTML = htmlHead;
            for (i = 0; i < cssPath.length; i++) {
                var fileref = printWindow.document.createElement("link");
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", window.location.origin + '/' + sanitiseHTML(cssPath[i]));
                printWindow.document.getElementsByTagName("head")[0].appendChild(fileref);
            }
            printWindow.document.body.innerHTML = htmlBody;
            var imgtag = printWindow.document.getElementsByTagName("img");
            var i;
            for (i = 0; i < imgtag.length; i++) {
                var cur = imgtag[i].getAttribute("src");
                var pattr = /^http/gi;
                if (!cur.match(pattr)) {
                    imgtag[i].setAttribute("src", window.location.origin + cur);
                }
            }
            printWindow.document.close();
            printWindow.focus();
            setTimeout(function () {
                printWindow.print();
                printWindow.close();
            }, 1000);
            return false;
        } else if (navigator.appVersion.search('Trident') >= 0) {
            for (i = 0; i < cssPath.length; i++) {
                if (cssPath[i].indexOf("print.html") == -1) {
                    htmlHead += '\n<link rel="stylesheet" type="text/css" href="' + cssPath[i] + '"/>';
                }
            }
            var html = '<HTML><HEAD>' + htmlHead + '</HEAD><BODY>' + htmlBody + '</BODY></HTML>';
            var printWin = window.open("", "", 'left=15,top=25,width=1050,height=600,scrollbars=1');
            printWin.document.open();
            printWin.document.write(html);
            printWin.document.close();
            printWin.focus();
            printWin.print();
        }
    }
};

$(document).ready(function () {

    $('.ms-rte-wpbox .s4-wpTopTable area').hover(function () {
        var hoverdivID = $(this).attr('id') + "Status";
        var id = $(this).attr('id');
        if (id.match('rw')) {

            $('#imgMapContainer' + ' #' + hoverdivID).css('display', 'block');
        }
        else {
            $('#adults' + ' #' + hoverdivID).css('display', 'block');
        }
    },
        function () {
            var id = $(this).attr('id');
            var hoverdivID = $(this).attr('id') + "Status";
            if (id.match('rw')) {

                $('#imgMapContainer' + ' #' + hoverdivID).css('display', 'none');
            }
            else {
                $('#adults' + ' #' + hoverdivID).css('display', 'none');
            }
        }
    );

    /*Left Right Image Banner Learn More Button - Content Re-Sizing*/
    var rtBannerText = $('.brokerBannerText').height();
    var rtBannerTextImg = $('.brokerBanner.right img').height();
    if ((rtBannerTextImg + 48) <= rtBannerText) {
        $('.brokerBanner.right img').css('margin-bottom', '40px');
    }
    var ltBannerText = $('.brokerBannerText').height();
    var ltBannerTextImg = $('.brokerBanner.left img').height();
    if (ltBannerTextImg < ltBannerText) {
        $('.brokerBanner.left img').css('margin-bottom', '40px');
    }


    /*External popup generic code */
    $('.pagelayout').find('a.externalLink').each(function () {
        if ($(this).not('a[href*="www."], a[href*="http://"], a[href*="https://"]')) {
            $(this).removeClass('externalLink');
            $(this).removeAttr('data-target data-modal data-toggle');
            $(this).attr('target', '_self');
        }
    });

    $('.pagelayout').find('a[href*="www."], a[href*="http://"], a[href*="https://"]').not('a[href*="molinahealthcare"],a.instamed-popup,a[href*="pay.instamed"],a[href*="mymolina.com"],a[href*="molinamarketplace.com"], a[href*="lms.psychhub.com"]').each(function () {
        if ($(this).attr('class')) {
            $(this).addClass('externalLink');
            $(this).attr({ 'data-toggle': 'modal', 'data-target': '#siteLeavingAlert', 'target': '_blank' });
        } else {
            $(this).attr({ 'class': 'externalLink', 'data-toggle': 'modal', 'data-target': '#siteLeavingAlert', 'target': '_blank' });
        }
        $("a.externalLink").click(function () {
            $('#covidAlert').modal('hide');
            var externallink = $(this).attr('href');
            $('#siteLeavingAlert .confirmation-box .get-ex-link').attr('target', '_blank');
            $("#siteLeavingAlert .get-ex-link").attr('href', externallink);
            $("#siteLeavingAlert .get-ex-link").click(function () {
                $('#siteLeavingAlert').modal('hide');
            });
        });
    });

    $('.pagelayout').find('a[href*= "molinahealthcare"], a[href*= "mymolina.com"], a[href*="molinamarketplace.com"]').each(function () {
        $(this).removeClass('externalLink');
        $(this).removeAttr('data-target data-modal data-toggle');
        $(this).attr('target', '_blank');
    });

    $('.pagelayout').find('a[href*="lms.psychhub.com"]').each(function () {
        if ($(this).attr('class')) {
            $(this).addClass('externalLink');
            $(this).attr({ 'data-toggle': 'modal', 'data-target': '#LeavingAlertPsy', 'target': '_blank' });
        } else {
            $(this).attr({ 'class': 'externalLink', 'data-toggle': 'modal', 'data-target': '#LeavingAlertPsy', 'target': '_blank' });
        }
        $("a.externalLink").click(function () {
            var externallink = $(this).attr('href');
            $('#LeavingAlertPsy .confirmation-box .get-ex-link').attr('target', '_blank');
            $("#LeavingAlertPsy .get-ex-link").attr('href', externallink);
            $("#LeavingAlertPsy .get-ex-link").click(function () {
                $('#LeavingAlertPsy').modal('hide');
            });
        });
    });

    /*LOB PopUP*/
    $('.pagelayout').find('a').not('.modal a, a[data-toggle="modal"],a[href*="()"],a[href*="#"],a[href=""],a[href*="/media/"],a[href*="/PDF/"],a:not([href]),a.externalLink,a.instamed-popup, a[href*="pay.instamed"]').click(function (e) {
        $this = $(this);
        var loc = window.location.pathname;
        var hrefUrl = $this.attr('href');
        console.log(hrefUrl);
        if ((loc.toLowerCase().indexOf('medicare') > -1) && (hrefUrl.toLowerCase().indexOf('medicare') == -1)) {
            console.log('out of medicare lob');
            e.preventDefault();
            $('#MedicareAlert .get-ex-link').attr('href', hrefUrl);
            $('#MedicareAlert').modal('show');
            if ($(this).is('a[href*="molinahealthcare"],a[href*="mymolina.com"]')) {
                $('#MedicareAlert .confirmation-box .get-ex-link').attr('target', '_blank');
            } else {
                $('#MedicareAlert .confirmation-box .get-ex-link').attr('target', '_self');
            }
            $('#MedicareAlert .get-ex-link').on('click', function () {
                $('#MedicareAlert').modal('hide');
            });
        }
        if (((loc.toLowerCase().indexOf('duals') > -1) && (hrefUrl.toLowerCase().indexOf('duals') == -1)) || ((loc.toLowerCase().indexOf('/mycare') > -1) && (hrefUrl.toLowerCase().indexOf('/mycare') == -1))) {
            console.log('out of duals lob');
            e.preventDefault();
            $('#internalAlert .get-ex-link').attr('href', hrefUrl);
            $('#internalAlert').modal('show');
            if ($(this).is('a[href*="molinahealthcare"],a[href*="mymolina.com"]')) {
                $('#internalAlert .confirmation-box .get-ex-link').attr('target', '_blank');
            } else {
                $('#internalAlert .confirmation-box .get-ex-link').attr('target', '_self');
            }
            $('#internalAlert .get-ex-link').on('click', function () {
                $('#internalAlert').modal('hide');
            });
        }
    });
    /*End*/

    /*Broker banner content height*/
    $('.PageBannerLeftHandSideBanner .col-md-12.col-sm-12').each(function () {
        if (($('.PageBannerLeftHandSideBanner .brokerBanner.left .brokerBannerText').height() > 300) ||
            ($('.PageBannerLeftHandSideBanner .brokerBanner.right .brokerBannerText').height() > 300)) {
            $('.PageBannerLeftHandSideBanner .brokerBanner.left').parent().css('margin-bottom', '50px');
            $('.PageBannerLeftHandSideBanner .brokerBanner.right').parent().css('margin-bottom', '50px');
        }
    });

    /* Banner content height  */
    var bannerHeight = $('.MainContentRight  .banner  .mainBanner  .content').height();
    if (bannerHeight > 195) {
        var extraheight = bannerHeight - 192;
        var mainBannerheight = 202 + extraheight + 10 + 'px';
        $('.MainContentRight  .banner  .mainBanner').css('min-height', mainBannerheight);
    }
    /* Mobile logo navigation */
    var providerNavUrl = $('.provider-header h1 > a').attr('href')
    $('#provider-navigation .navbar.provider > a.navbar-brand').attr('href', providerNavUrl);

    var membersNavUrl = $('.secondary-header h1 > a#image').attr('href')
    $('#main-navigation .navbar > a.navbar-brand').attr('href', membersNavUrl);

    SurveyInfoInput = {};
    var host = window.location.host;
    $(".googleMap").click(function () {
        if ($(this).hasClass("active")) {
            if (map != null) {
                google.maps.event.trigger(map, 'resize');
                map.setCenter(mapCenter);
            }
        }
    });
    $('.moduleform select').msDropdown({
        visibleRows: 6
    });

    $(".submit-ask-question").click(function () {
        event.preventDefault();
        if (validateForm($(this).closest('form'))) {
            $(this).closest('form').find('.form-error-summary').hide();
            var AskQuestionInputInfo = {},
                today = new Date(),
                date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(),
                time = today.getHours() + ":" + today.getMinutes(),
                CreateddateTime = date + ' ' + time;
            AskQuestionInputInfo = collectFormData($(this).closest('form'));
            AskQuestionInputInfo.FormID = 0;
            AskQuestionInputInfo.URL = window.location.href;
            AskQuestionInputInfo.LOB = $('.aq-lob').val();
            AskQuestionInputInfo.CreatedDate = CreateddateTime;
            var Response = $(this).closest('form').find(".g-recaptcha-response").val();
            var Emailtemplate = $(".emailitem-hdn").attr("email-template-id");
            console.table(AskQuestionInputInfo);
            $.ajax({
                type: "POST",
                url: "/api/Sitecore/AvalonAppointment/AskQuestionAPI",
                data: JSON.stringify({
                    AskQuestionJsonInput: AskQuestionInputInfo,
                    CaptchaResponse: Response,
                    EmailtemplateID: Emailtemplate
                }),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (getCookie('SelectedLanguageCodeCookie').toLowerCase() === 'es-us') {
                        alert("Gracias por enviar su información. Un representante de Molina se comunicará con usted a la brevedad.")
                    } else {
                        alert("Thank you for submitting your information. A Molina representative will contact you shortly.");
                    }
                },
                error: function () {
                    if (getCookie('SelectedLanguageCodeCookie').toLowerCase() === 'es-us') {
                        alert("Algo salió mal, por favor intente mas tarde.")
                    } else {
                        alert("Something went wrong, please try later.")

                    }
                }
            });
        } else {
            $(this).closest('form').find('.form-error-summary').show();
        }
    });

    $(".contactus-submit-btn").click(function () {
        event.preventDefault();
        var IsValidFormInput = false;
        var nameReg = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (nameReg.test($('[data-sc-field-name="PersonName"]').val())) {
            $('[data-sc-field-name="PersonName"]').val($('[data-sc-field-key="firstname-validation"]').html()).addClass('invalid-red');
        } else {
            valid.fName = true;
        }

        if (nameReg.test($('[data-sc-field-name="LastName"]').val())) {
            $('[data-sc-field-name="LastName"]').val($('[data-sc-field-key="lastname-validation"]').html()).addClass('invalid-red');

        } else {
            valid.lName = true;
        }
        if ($('[data-sc-field-name="ZipCode"]').val().length < 5) {
            $('[data-sc-field-name="ZipCode"]').val($('[data-sc-field-key="zipcode-validation"]').html()).addClass('invalid-red');

        } else {
            valid.zip = true;
        }

        if ($('[data-sc-field-name="Phone"]').val().length < 14) {
            $('[data-sc-field-name="Phone"]').val($('[data-sc-field-key="phone-validation-error"]').html()).addClass('invalid-red');

        } else {
            valid.phone = true;
        }
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        if (!emailReg.test($('[data-sc-field-name="Email"]').val())) {
            $('[data-sc-field-name="Email"]').val($('[data-sc-field-key="email-validation"]').html()).addClass('invalid-red');

        } else {
            valid.email = true;
        }

        if ($(".side-module-form").find('.g-recaptcha-response').val().length) {

            var recaptcha = $(".side-module-form").find('.g-recaptcha-response').val();

            if (!recaptcha) {
                $('#ContactUsForm.g-recaptcha').addClass("recaptcha-border");
                valid.captcha = false;
            } else {

                $('#ContactUsForm.g-recaptcha').removeClass("recaptcha-border");
                valid.captcha = true;
            }
        }


        if (valid.fName && valid.lName && valid.email && valid.phone && valid.captcha) {
            today = new Date(),
                date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(),
                time = today.getHours() + ":" + today.getMinutes(),
                CreateddateTime = date + ' ' + time;
            AskQuestionInputInfo = ContactusFormInput;
            AskQuestionInputInfo.FormID = 0;
            AskQuestionInputInfo.URL = window.location.href;
            AskQuestionInputInfo.CreatedDate = CreateddateTime;
            var Response = $(".side-module-form").find('.g-recaptcha-response').val();
            var Emailtemplate = $(".emailitem-hdn").attr("email-template-id");

            $.ajax({
                type: "POST",
                url: "/api/Sitecore/AvalonAppointment/AskQuestionAPI",
                data: JSON.stringify({
                    AskQuestionJsonInput: AskQuestionInputInfo,
                    CaptchaResponse: Response,
                    EmailtemplateID: Emailtemplate
                }),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    $(".side-module-form").hide();
                    $(".side-module-form.thankyou").show();
                    if (data.success == "true") {
                        $(".side-module-form").hide();
                        $(".side-module-form.thankyou").show();
                    }

                },
                error: function () {

                    alert("something went wrong");

                }
            });


        }

    });

    $("#searchsubmit").click(function () {
        $("#searchInputText-error").removeClass("show-error-field").addClass("hide-error-field");
        var searchtext = Encoder.htmlEncode($('#searchInputText').val().trim());
        if (!searchtext) {
            $("#searchInputText-error").addClass("show-error-field").removeClass("hide-error-field");
        } else {
            window.location.assign('/pages/search?key=' + searchtext);
        }
    });

    $('#searchInputText').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('#searchsubmit').click();
        }
    });



    $(".pearls_package").click(function () {
        $(".pearls_package_content").toggle();
        $(".pearls_package img").toggle();
    });
    $(".molina_coding_tips").click(function () {
        $(".molina_coding_tips_content").toggle();
        $(".molina_coding_tips img").toggle();
    });

    /* Js For Feedbackpopup start */

    function GetStateName(statecode) {
        var StateName;
        if (statecode == 'ca') {
            StateName = 'California';
        }
        if (statecode == 'fl') {
            StateName = 'Florida';
        }
        if (statecode == 'id') {
            StateName = 'Idaho';
        }
        if (statecode == 'il') {
            StateName = 'Illinois';
        }
        if (statecode == 'mi') {
            StateName = 'Michigan';
        }
        if (statecode == 'ms') {
            StateName = 'Mississippi';
        }
        if (statecode == 'nw') {
            StateName = 'New Mexico';
        }
        if (statecode == 'ny') {
            StateName = 'New York';
        }
        if (statecode == 'oh') {
            StateName = 'Ohio';
        }
        if (statecode == 'pr') {
            StateName = 'Puerto Rico';
        }
        if (statecode == 'sc') {
            StateName = 'South Carolina';
        }
        if (statecode == 'tx') {
            StateName = 'Texas';
        }
        if (statecode == 'ut') {
            StateName = 'Utah';
        }
        if (statecode == 'wa') {
            StateName = 'Washington';
        }
        if (statecode == 'wi') {
            StateName = 'Wisconsin';
        }
        if (statecode == 'os') {
            StateName = 'Other States';
        }
        return StateName;
    }

    $(".FeedbackPopupSubmit").click(function () {
        event.preventDefault();
        var IsFormValidate = true;

        if ($('.Information input:checked').val()) {
            $("[data-sc-field-key='lblMandatoryField']").css("display", "none");

        } else {
            $("[data-sc-field-key='lblMandatoryField']").css("display", "block");
            IsFormValidate = false;
        }

        if ($('.Easeofuse input:checked').val()) {
            $("[data-sc-field-key='lblMandatoryField']").css("display", "none");

        } else {
            $("[data-sc-field-key='lblMandatoryField']").css("display", "block");
            IsFormValidate = false;
        }

        if ($('.Satisfaction input:checked').val()) {
            $("[data-sc-field-key='lblMandatoryField']").css("display", "none");

        } else {
            $("[data-sc-field-key='lblMandatoryField']").css("display", "block");
            IsFormValidate = false;
        }

        if ($("[data-sc-field-name='VisitReasonlist']").val() == $(".VisitReasonlist option:first").val()) {
            $("[data-sc-field-key='lblMandatoryField']").css("display", "block");
            IsFormValidate = false;
        } else {
            $("[data-sc-field-key='lblMandatoryField']").css("display", "none");
        }

        if ($("[data-sc-field-name='IAmlist']").val() == $(".IAmlist option:first").val()) {
            $("[data-sc-field-key='lblMandatoryField']").css("display", "block");
            IsFormValidate = false;
        } else {
            $("[data-sc-field-key='lblMandatoryField']").css("display", "none");
        }

        var recaptcha = $(".g-recaptcha-response");
        if (recaptcha) {
            var recaptchaResponse = $('.g-recaptcha-response').val();
            if (recaptchaResponse.length == 0) {
                $("[data-sc-field-key='captchaValid']").css("display", "block");
                IsFormValidate = false;
            } else {
                $("[data-sc-field-key='captchaValid']").css("display", "none");
            }
        }

        if (IsFormValidate == false) {
            return false;
        } else {
            SurveyInfoInput.InformationLevel = $('.Information input:checked').val();
            SurveyInfoInput.EaseLevel = $('.Easeofuse input:checked').val()
            SurveyInfoInput.WebSatisfactionLevel = $('.Satisfaction input:checked').val()
            SurveyInfoInput.VisitReason = $(".VisitReasonlist").val();
            SurveyInfoInput.IAm = $(".IAmlist").val();
            SurveyInfoInput.PageURL = window.location.href;
            SurveyInfoInput.State = GetStateName(document.getElementById("selStateCodeHdn").value);
            var recaptchaResponse = $('.g-recaptcha-response').val();
            $.ajax({
                type: "POST",
                url: "/api/Sitecore/SurveyInfo/SurveyInfoAPI",
                data: JSON.stringify({
                    SurveyInfo: SurveyInfoInput,
                    Response: recaptchaResponse
                }),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.success == "true") {
                        alert($(".display-success-msg").text());
                        $('.FeedbackPopUp').modal('hide');
                    }
                    if (data.success == "false") {
                        alert($(".display-failure-msg").text());
                        $('.FeedbackPopUp').modal('hide');
                    }
                },
                error: function () {
                    alert($(".display-failure-msg").text());
                    $('.FeedbackPopUp').modal('hide');
                }
            });
        }
    });

    $("span.contactusfeedback").click(function () {
        window.open(Encoder.htmlEncode(window.location.hostname) + '/members/common/en-US/abtmolina/compinfo/contactus.aspx', '_blank');
    });



    /*Updating dropdown values-common Medicare page */
    $('.pdf-select-wrapper select').change(function () {
        $(this).parent().parent().find(".open-pdf").attr("href", $(this).val());
    });
    /* End */
});

! function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        p = /^http:/.test(d.location) ? 'http' : 'https';
    if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + "://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
    }
}(document, "script", "twitter-wjs");

$(function () {
    maskPhone();
});

function maskPhone() {
    $("[data-sc-field-key='phone-validation']").usPhoneFormat({
        format: '(xxx) xxx-xxxx',
    });
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    return pattern.test(emailAddress);
}

function isValidPhoneNumber(phoneNumber) {
    var pattern = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
    return pattern.test(phoneNumber);
}

function isValidZipcode(zipCode) {
    var pattern = new RegExp(/(^\d{5}$)/);
    return pattern.test(zipCode);
}

/* googlemap*/
function zoomLocation(a, b) {
    var map = "https://maps.google.com/maps?ll=" + a + "," + b + "&amp;z=14&amp;t=m&amp;hl=en-US&amp;gl=US&amp;mapclient=apiv3&output=embed";
    $('.map-contanier #gmap_canvas').attr('src', map);
}

(function ($) {
    $.fn.usPhoneFormat = function (options) {
        var params = $.extend({
            format: 'xxx-xxx-xxxx',
            international: false,
        }, options);

        if (params.format === 'xxx-xxx-xxxx') {
            $(this).bind('paste', function (e) {
                e.preventDefault();
                var inputValue = e.originalEvent.clipboardData.getData('Text');
                if (!$.isNumeric(inputValue)) {
                    return false;
                } else {
                    inputValue = String(inputValue.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
                    $(this).val(inputValue);
                    $(this).val('');
                    inputValue = inputValue.substring(0, 12);
                    $(this).val(inputValue);
                }
            });
            $(this).on('keypress', function (e) {
                if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                    return false;
                }
                var curchr = this.value.length;
                var curval = $(this).val();
                if (curchr == 3) {
                    $(this).val(curval + "-");
                } else if (curchr == 7) {
                    $(this).val(curval + "-");
                }
                $(this).attr('maxlength', '12');
            });

        } else if (params.format === '(xxx) xxx-xxxx') {
            $(this).on('keypress', function (e) {
                if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                    return false;
                }
                var curchr = this.value.length;
                var curval = $(this).val();
                if (curchr == 3) {
                    $(this).val('(' + curval + ')' + " ");
                } else if (curchr == 9) {
                    $(this).val(curval + "-");
                }
                $(this).attr('maxlength', '14');
            });
            $(this).bind('paste', function (e) {
                e.preventDefault();
                var inputValue = e.originalEvent.clipboardData.getData('Text');
                if (!$.isNumeric(inputValue)) {
                    return false;
                } else {
                    inputValue = String(inputValue.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"));
                    $(this).val(inputValue);
                    $(this).val('');
                    inputValue = inputValue.substring(0, 14);
                    $(this).val(inputValue);
                }
            });

        }
    }
}(jQuery));

function openFeedbackPopup() {
    $('.FeedbackPopUp').modal('toggle');
}

$(document).ready(function () {

    $('.molinanews-formdiv #yearSelDD, .molinanews-formdiv #stateSelDD, .molinanews-formdiv #businessTypeSelDD').msDropdown({
        visibleRows: 6
    });

    var redirectURLData = {},
        stateLanguageMapping = window.stateLanguageMapping || {
            ca: []
        },
        selectedIndex = 0,
        pageLoaded = true;
    for (var i = 0; i < stateLanguageMapping.ca.length; i++) {
        if (window.selectedValue && window.selectedValue === stateLanguageMapping.ca[i].value) {
            selectedIndex = i;
            break;
        }
    }

    if (window.showPlanPopUp) {
        $('#state-select-modal').modal('show');
    } else {
        $('#BecomeaMember, #Members, #HealthCareProfessionals').click(function () {
            redirectURLData.bussLine = $(this).prop('id');
        });
    }

    function updateLangDropDown() {
        var selIdx = pageLoaded ? selectedIndex : 0;
        pageLoaded = false;
        $('.ssm-lang-dd-cntr').empty();
        var selectedState = Encoder.htmlEncode($('.ssm-state-dd').val()),
            langDDId = "#select-lang-dd-" + selectedState;
        $(".ssm-lang-dd-cntr").append("<div id=select-lang-dd-" + Encoder.htmlEncode(selectedState) + "></div>");
        $(langDDId).msDropDown({
            byJson: {
                data: stateLanguageMapping[selectedState],
                width: 170,
                selectedIndex: selIdx
            }
        }).data("dd");
    }
    $('#state-select-modal').on('show.bs.modal', function (e) {
        pageLoaded = true;
        $('.ssm-state-dd').msDropDown().data("dd").set("selectedIndex", 0);
        updateLangDropDown();
        pageLoaded = false;
    });
    if ($('.ssm-state-dd').length) {
        $('.ssm-state-dd').msDropdown({
            visibleRows: 6,
            on: {
                change: updateLangDropDown,
                create: updateLangDropDown
            }
        });
    }

    $('.ssm-submit').click(function () {
        redirectURLData.state = $('.ssm-state-dd').val();
        redirectURLData.lang = $('.ssm-lang-dd-cntr select').val();
        //console.table(redirectURLData);
        $.ajax({
            type: "POST",
            url: window.stateOrPlanRedirectURl,
            data: JSON.stringify({
                redirectURLData: redirectURLData
            }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                window.location.assign(data.redirectionURl);
                console.log('success');
            },
            error: function () {
                console.log('Failure');
            }
        });
    });

    $('.benefits_accordion li').on('click', '.benefits_accordion_header', function () {
        if (($('.benefits_accordion >li> a').not(this)) && ($('.benefits_accordion >li> a').hasClass('ui-accordion-header-collapsed'))) {
            $('.benefits_accordion> li> a').not(this).parent().css('border-bottom', '1px solid #dadada');
        }
    });
});

function OnMembersStateSelectEvent(selectedState) {
    var currentUrl = Encoder.htmlEncode(window.location.href);
    var selStateCodeHdn = Encoder.htmlEncode(document.getElementById("selStateCodeHdn").value);
    var selectedLanguage = Encoder.htmlEncode(document.getElementById("dd-language").value);
    var regEx = new RegExp("/" + selStateCodeHdn + "/", "ig");
    var updatedUrl = currentUrl.replace(regEx, "/" + selectedState + "/");
    if (selectedState == "os") {
        //window.location.href = window.location.protocol + "//" + window.location.hostname + "/" + selectedLanguage + "/pages/home.aspx";
        var osUrl = Encoder.htmlEncode(window.location.protocol) + "//" + Encoder.htmlEncode(window.location.hostname);
        updateSelectedStateCodeCookie = "SelectedStateCodeCookie=" + "os" + "; path=/";
        updateSelectedStateNameCookie = "SelectedStateNameCookie=" + "Other States" + "; path=/";
        document.cookie = updateSelectedStateCodeCookie;
        document.cookie = updateSelectedStateNameCookie;
        window.location.href = osUrl;

    }
    else if (selectedState == "pr") {
        var protocol = ["https:" === window.location.protocol ? "https://" : "http://"];
        var vitalHostName = [Encoder.htmlEncode(window.location.hostname) === "www.molinahealthcare.com" ? "www.molinavital.com/" : Encoder.htmlEncode(window.location.hostname) + "/molinavital/"];
        var lang = [selectedLanguage === null ? "" : selectedLanguage.split("-")[0]];
        lang = [lang === "" || lang === null ? "en" : lang];
        window.location.href = protocol + vitalHostName + selectedLanguage.split("-")[0] + "/pages/home.aspx";

    }
    else if (selectedState == "ky") {
        kyRedirectionURL = "/members/" + selectedState + "/" + selectedLanguage + "/pages/home.aspx";
        window.location.assign(kyRedirectionURL);

    }

    else if (updatedUrl.indexOf("/" + selectedState + "/") != -1 && updatedUrl.indexOf("/members/common") == -1) {
        localStorage.setItem('stateChanged', 'true');
        window.location.href = updatedUrl.split("/" + selectedState + "/")[0] + "/" + selectedState + "/" + selectedLanguage + "/pages/home.aspx";
        console.log("alert");

    }
    else {
        window.location.href = Encoder.htmlEncode(window.location.protocol) + "//" + Encoder.htmlEncode(window.location.hostname) + "/members/" + selectedState + "/" + selectedLanguage + "/pages/home.aspx";
        console.log("test");

    }
}

function OnMembersLanguageSelectEvent(selectedLanguage) {
    var currentUrl = Encoder.htmlEncode(window.location.href.substring(-1)) === '#' ? Encoder.htmlEncode(window.location.href.slice(0, -1)) : Encoder.htmlEncode(window.location.href);
    var selLanguageId = document.getElementById("selLangCodeHdn").value;
    var regEx = new RegExp("/" + selLanguageId + "/", "ig");
    window.location.href = currentUrl.replace(regEx, "/" + selectedLanguage + "/");
}

function stateSwitchPopup() {
    $(".FadeAwayPopup").show();
    setTimeout(function () {
        $(".FadeAwayPopup").fadeOut("slow");
        localStorage.setItem('stateChanged', 'false');
    }, 5000);
    $('.FadeAwayPopup  .canceltxt').on('click', function () {
        window.history.go(-1);
        $(".FadeAwayPopup").hide();
        localStorage.setItem('stateChanged', 'false');
    });
    $('.FadeAwayPopup  .cancelbtn').on('click', function () {
        $('.FadeAwayPopup').fadeOut("slow");
        localStorage.setItem('stateChanged', 'false');
    });
}

function OnStateSelectEvent(selectedState) {
    var selectedLanguage = "";
    var currentUrl = Encoder.htmlEncode(window.location.href.substring(-1)) === '#' ? Encoder.htmlEncode(window.location.href.slice(0, -1)) : Encoder.htmlEncode(window.location.href);
    var selStateCodeHdn = Encoder.htmlEncode(document.getElementById("selStateCodeHdn").value);
    if (selStateCodeHdn == "pr") {
        selectedLanguage = "medicaid";
    }
    else {
        selectedLanguage = Encoder.htmlEncode(document.getElementById("dd-language").value);
    }

    var regEx = new RegExp("/" + selStateCodeHdn + "/", "ig");
    var updatedUrl = currentUrl.replace(regEx, "/" + selectedState + "/");
    if (window.location.href.indexOf("/providers/common") === -1) {
        if (selectedState == "os") {
            window.location.href = Encoder.htmlEncode(window.location.protocol) + "//" + Encoder.htmlEncode(window.location.hostname) + "/" + selectedLanguage + "/home.aspx";
        }
        else if (selectedState == "pr") {
            window.location.href = Encoder.htmlEncode(window.location.protocol) + "//" + Encoder.htmlEncode(window.location.hostname) + "/providers/pr/en-us/pages/home.aspx";
        }
        else if (updatedUrl.indexOf("/" + selectedState + "/") != -1) {
            window.location.href = updatedUrl.split("/" + selectedState + "/")[0] + "/" + selectedState + "/" + selectedLanguage + "/home.aspx";
        }
        else {
            window.location.href = updatedUrl;
        }
    }
    else {
        var commonselectedState = Encoder.htmlEncode($("#dd-country").val()),
            commonselectedPlan = (selStateCodeHdn == "pr" ? "medicaid" : Encoder.htmlEncode($("#dd-language").val())),
            updateStateCookie = "ProvidersCommonStateCookie=" + commonselectedState,
            updatePlanCookie = "ProvidersCommonPlanCookie=" + commonselectedPlan;
        document.cookie = updateStateCookie;
        document.cookie = updatePlanCookie;
        window.location.assign(currentUrl);


    }
}

function OnLanguageSelectEvent(selectedLanguage) {
    var currentUrl = Encoder.htmlEncode(window.location.href.substring(-1)) === '#' ? Encoder.htmlEncode(window.location.href.slice(0, -1)) : Encoder.htmlEncode(window.location.href);
    var selLanguageId = document.getElementById("selLangCodeHdn").value;
    if (window.location.href.indexOf("/providers/common") === -1) {
        var regEx = new RegExp("/" + selLanguageId + "/", "ig");
        if (selectedLanguage == "medicare") {
            window.location.href = "index662e.html";
        }
        else {
            window.location.href = currentUrl.replace(regEx, "/" + selectedLanguage + "/");
        }


    }
    else {
        var commonselectedState = Encoder.htmlEncode($("#dd-country").val()),
            commonselectedPlan = Encoder.htmlEncode($("#dd-language").val()),
            updateStateCookie = "ProvidersCommonStateCookie=" + commonselectedState,
            updatetestStateCookie = "ProvidersCommontestStateCookie=" + commonselectedState,
            updatePlanCookie = "ProvidersCommonPlanCookie=" + commonselectedPlan,
            updatetestPlanCookie = "ProvidersCommontestPlanCookie=" + commonselectedPlan;
        document.cookie = updateStateCookie;
        document.cookie = updatePlanCookie;
        document.cookie = updatetestStateCookie;
        document.cookie = updatetestPlanCookie;
        if (currentUrl.indexOf("/providers/common/medicare/medicare") === -1) {
            if (selectedLanguage == "medicare") {
                window.location.href = "index662e.html";
            }
            else {
                var regEx = new RegExp("/" + selLanguageId + "/", "ig");
                window.location.assign(currentUrl.replace(regEx, "/" + selectedLanguage + "/"));
            }
        }
        else if (currentUrl.indexOf("/providers/common/medicare/medicare") !== -1) {
            if (selectedLanguage == "medicare") {
                window.location.href = "index662e.html";
            }
            else {
                var medicareRedirectURL = "/providers/" + commonselectedState + "/" + commonselectedPlan + "/home.aspx";
                window.location.assign(medicareRedirectURL);
            }
        }
        else {
            window.location.href = currentUrl;
        }
    }
}


/*Binding language tab for tem page*/
function openLanguage(evt, languageName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(languageName).style.display = "block";
    evt.currentTarget.className += " active";
}


$(document).ready(function () {
    $('a#EnglishLink').click(function () {
        openLanguage(event, 'English');
    });

    $('a#SpanishLink').click(function () {
        openLanguage(event, 'Español');
    });

    $('a#CambodianLink').click(function () {
        openLanguage(event, 'ភាសាខ្មែរ');
    });

    $('a#FarsiLink').click(function () {
        openLanguage(event, 'فارسی');
    });

    $('a#KoreanLink').click(function () {
        openLanguage(event, '한국어');
    });

    $('a#RussianLink').click(function () {
        openLanguage(event, 'русский');
    });

    $('a#ChineseLink').click(function () {
        openLanguage(event, '中文');
    });

    $('a#ArmenianLink').click(function () {
        openLanguage(event, 'Հայերեն');
    });

    $('a#VietLink').click(function () {
        openLanguage(event, 'Việt');
    });

    $('a#TagalogLink').click(function () {
        openLanguage(event, 'Tagalog');
    });

    $('a#ArabicLink').click(function () {
        openLanguage(event, 'العربية');
    });

    $('.pagelayout .mainContent').find('img.playYouTubeVideo').each(function () {
        if (($(this).attr('width')) && ($(this).attr('height'))) {
            var width = $(this).attr('width');
            var height = $(this).attr('height');
            var videoURL = $(this).attr('data-video-url');
            $("<iframe src='" + videoURL + "' frameborder='0' allowfullscreen></iframe>").insertAfter(this);
            $('.youTubeVideoContainer iframe').attr({ 'width': width, 'height': height });
            $('.youTubeVideoContainer iframe').hide();
        } else {
            var srcpath = $(this).attr('src');
            var split_wh = srcpath.split('?');
            var split_wh_array = split_wh[1].split('&');
            var height = split_wh_array[0].split('=');
            var width = split_wh_array[1].split('=');
            var iframewidth = width[1] + 'px';
            var iframeheight = height[1] + 'px';
            var videoURL = $(this).parent('.youTubeVideoContainer').attr('data-video-url');
            $("<iframe src='" + videoURL + "' frameborder='0' allowfullscreen></iframe>").insertAfter(this);
            $('.youTubeVideoContainer iframe').attr({ 'width': iframewidth, 'height': iframeheight });
            $('.youTubeVideoContainer iframe').hide();
        }
    });

    $('img.playYouTubeVideo').on('click', function () {
        $(this).hide();
        $(this).next('iframe').show();
    });
});


//Main Navigation Bootstrap Changes
$(document).ready(function () {

    var isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
    var is_iPad = navigator.userAgent.match(/iPad/i) != null;
    $('.dropdown-menu').hover(function () {
        $(this).parent().toggleClass('hover');
    });
    $('.navbar-toggler').on('click', function () {
        $('.navbar-collapse').toggleClass('right');
        $(this).toggleClass('active');
        $('.navbar-brand').toggleClass('visibilityhidden');
        $('.navbar.navbar-expand-md').toggleClass('bgnone');
        $('body').toggleClass('fixedPosition');
        $('.navbar-collapse').removeClass('submenu-view');
        $('.nav-item.dropdown,.dropdown-menu').removeClass('show');
    });
    $('.nav-link.dropdown-toggle').click(function (e) {
        e.stopPropagation();
    });
    $('.nav-item.dropdown .arrow').click(function (e) {
        e.stopPropagation();
        if ($(this).parent().hasClass('show')) {
            e.stopPropagation();
            $(this).parents().find('.navbar-collapse').addClass('animate-in-2').removeClass('submenu-view').removeClass('animate-out-2');
            $(this).next().removeClass('show');
            $(this).parent().removeClass('show');
        } else {
            e.preventDefault();
            $(this).parents().find('.navbar-collapse').addClass('animate-out-2').removeClass('animate-in-2');
            $(this).parent().addClass('show');
            $(this).next().addClass('show');
            if ($(this).parent().hasClass('dropdown')) {
                $(this).parents().find('.navbar-collapse').addClass('submenu-view');
            } else { return false; }
            return false;
        }
    });
    function is_touch_device() {
        return !!('ontouchstart' in window);
    }
    if (is_touch_device() && is_iPad) {
        $(".navbar-nav li.dropdown a.nav-link").click(function (e) {
            var $this = $(this);
            if ($this.hasClass('clicked')) {
                return;
            } else {
                $this.addClass('clicked');
                e.preventDefault();
                setTimeout(function () {
                    $this.removeClass('clicked');
                }, 500);
            }
        });
    }

    $(window).on("resize", function (event) {
        var width = $(this).width();
        if (width > 767 && width < 1025) {
            $(".navbar-nav li.dropdown a.nav-link").click(function (e) {
                var $this = $(this);
                if ($this.hasClass('clicked')) {
                    return;
                } else {
                    $this.addClass('clicked');
                    e.preventDefault();
                    setTimeout(function () {
                        $this.removeClass('clicked');
                    }, 500);
                }
            });
        }
    })
});


$(document).ready(function () {

    /* script for sticky header in provider and readmore/less toggle*/
    var mn = $(".inPageNav");
    mns = "main-nav-scrolled";
    $('.inPageNav').removeClass("main-nav-scrolled");
    hdr = $('.inPageNav').height() + 295;

    $(window).scroll(function () {
        if ($(this).scrollTop() > hdr) {
            mn.addClass(mns);

        } else if ($(this).scrollTop() < hdr) {
            mn.removeClass(mns);
        }
    });

    $('.reimbPolicy .subsectionContent tr td a').click(function () {
        var displayId = $(this).attr('id');
        var toggleId = displayId.replace('display', 'toggle');
        if ($('#' + toggleId).css('display') == 'block') {
            $('#' + toggleId).css('display', 'none');
            $('#' + displayId).html("Read More");
        }
        else {
            $('#' + toggleId).css('display', 'block');
            $('#' + displayId).html("Read Less");
        }
    });

    $('.side-module-form [data-sc-field-name="PersonName"]').focusout(function (event) {
        validateInputs();
    });

    $('.side-module-form [data-sc-field-name="LastName"]').focusout(function (event) {
        validateInputs();
    });

    $('.side-module-form [data-sc-field-name="Phone"]').focusout(function (event) {
        validateInputs();
    });

    $('.side-module-form [data-sc-field-name="ZipCode"]').focusout(function (event) {
        validateInputs();
    });
    $('.side-module-form [data-sc-field-name="Email"]').focusout(function (event) {
        validateInputs();
    });


    $('.side-module-form [data-sc-field-name="ZipCode"]').focus(function () {
        if ($('[data-sc-field-name="ZipCode"]').hasClass('invalid-red'))
            $('[data-sc-field-name="ZipCode"]').val('').removeClass('invalid-red');
    });

    $('.side-module-form [data-sc-field-name="ZipCode"]').keypress(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;
    });
    $('.side-module-form [data-sc-field-name="Phone"]').focus(function () {
        if ($('[data-sc-field-name="Phone"]').hasClass('invalid-red'))
            $('[data-sc-field-name="Phone"]').val('').removeClass('invalid-red');
    });

    $('.side-module-form [data-sc-field-name="Email"]').focus(function () {
        if ($('[data-sc-field-name="Email"]').hasClass('invalid-red'))
            $('[data-sc-field-name="Email"]').val('').removeClass('invalid-red');
    });

    $('.side-module-form [data-sc-field-name="PersonName"]').focus(function () {
        if ($('[data-sc-field-name="PersonName"]').hasClass('invalid-red'))
            $('[data-sc-field-name="PersonName"]').val('').removeClass('invalid-red');
    });
    $('.side-module-form [data-sc-field-name="LastName"]').focus(function () {
        if ($('[data-sc-field-name="LastName"]').hasClass('invalid-red'))
            $('[data-sc-field-name="LastName"]').val('').removeClass('invalid-red');
    });


    $('.provider-pdf-form-wrapper select,.mpws-form.contact-form .form-field-select select').msDropdown({
        visibleRows: 6
    });

    $('#selectCounty,#select_CDC,#select_CDT,#select_CDO,#select_Contact,#select_CDB,#select_CDCC,#select_CDTC').msDropdown({
        visibleRows: 6
    });

    $('#selectCounty_msddHolder #selectCounty').change(function () {
        var selectedCountry = $(this).children("option:selected").val();
        console.log(selectedCountry);
        if (selectedCountry === 'CDC') {
            $('.nybehhlth .CDC').show();
            $('.nybehhlth .CDT,.nybehhlth .CDO,.nybehhlth .CDTC,.nybehhlth .CDCC,.nybehhlth .CDB').hide();
        } else if (selectedCountry === 'CDT') {
            $('.nybehhlth .CDT').show();
            $('.nybehhlth .CDC,.nybehhlth .CDO,.nybehhlth .CDTC,.nybehhlth .CDCC,.nybehhlth .CDB').hide();
        } else if (selectedCountry === 'CDO') {
            $('.nybehhlth .CDO').show();
            $('.nybehhlth .CDC,.nybehhlth .CDT,.nybehhlth .CDTC,.nybehhlth .CDCC,.nybehhlth .CDB').hide();
        }
        else if (selectedCountry === 'CDB') {
            $('.nybehhlth .CDB').show();
            $('.nybehhlth .CDC,.nybehhlth .CDT,.nybehhlth .CDTC,.nybehhlth .CDCC').hide();
        }
        else if (selectedCountry === 'CDTC') {
            $('.nybehhlth .CDTC').show();
            $('.nybehhlth .CDC,.nybehhlth .CDT,.nybehhlth .CDO,.nybehhlth .CDCC').hide();
        }
        else if (selectedCountry === 'CDCC') {
            $('.nybehhlth .CDCC').show();
            $('.nybehhlth .CDC,.nybehhlth .CDT,.nybehhlth .CDTC,.nybehhlth .CDO').hide();
        }
    });

    $('.nybehhlth .container select,.nybehhlth2 select,.drpCounties #selectCounty').change(function () {
        window.open(Encoder.htmlEncode($(this).children("option:selected").val()));
    });

    $('.providerNav .nav-link.dropdown-toggle').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).parent().addClass('clicked');
        $(this).next().next().css('display', 'block');
    });

    $(document).on('blur', '.providerNav .nav-link.dropdown-toggle', function () {
        $(this).parent().removeClass('clicked');
        $(this).next().next().removeAttr('style');
    });

    $(".mainNav.navbar-nav li.nav-item").on('click', function (e) { $(this).addClass('navigate'); })
});


$(document).on('click', function (e) {
    var container = $('.signin');
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('.signin-dropdown').slideUp(500);
    }
});


var valid = {
    fName: false,
    lName: false,
    zip: false,
    email: false,
    phone: false,
    captcha: false
};
var ContactusFormInput = {};

function validateInputs() {
    var disableButton = false;

    ContactusFormInput.PersonName = $('[data-sc-field-name="PersonName"]').val();
    ContactusFormInput.LastName = $('[data-sc-field-name="LastName"]').val();
    ContactusFormInput.Phone = $('[data-sc-field-name="Phone"]').val();
    ContactusFormInput.ZipCode = $('[data-sc-field-name="ZipCode"]').val();
    ContactusFormInput.Email = $('[data-sc-field-name="Email"]').val();

    if (ContactusFormInput.PersonName.length == 0 || ContactusFormInput.LastName.length == 0 || ContactusFormInput.Phone.length == 0 || ContactusFormInput.ZipCode.length == 0 || ContactusFormInput.Email.length == 0) {
        disableButton = true;
        $(".contactus-submit-btn").attr('disabled', 'disabled').removeClass('enabled');

    }

    else {
        $(".contactus-submit-btn").addClass('enabled');
        $(".contactus-submit-btn").removeAttr('disabled')
    }
};
$(document).ready(function () {

    $(".eNewsletters").on('click', function () {
        event.preventDefault();
        var email = $("#NewsletterEmailInput").val();
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        $('#enewsletterform .error,#enewsletterform .emailerror').hide();
        $('#enewsletterform  input').removeAttr('style');
        $('#enewsletterform  input').each(function () {
            if ($(this).val() == '') {
                $(this).prev().show();
                $('#invalid_email').attr('display', 'none!important');
                $(this).css('border-color', 'red');
            }
        });
        if (email != '') {
            if (regex.test(email)) {
                var ReqKeys = "ca=e0b594f5-c0f3-4055-8afd-a7c829101838&list=1151589634&source=EFD&required=list,email,first_name,last_name,company";
                var EmailInput = "&email=" + $("#NewsletterEmailInput").val();
                var FirstnameInput = "&first_name=" + $("#FirstnameInput").val();
                var LastNameInput = "&last_name=" + $("#LastNameInput").val();
                var CompNameInput = "&company=" + $("#CompNameInput").val();
                var ReqData = ReqKeys + EmailInput + FirstnameInput + LastNameInput + CompNameInput;
                $.ajax({
                    type: "POST",
                    url: "https://visitor2.constantcontact.com/api/signup",
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    host: location.hostname,
                    contentLength: ReqData.length,
                    data: ReqData,
                    success: function () {
                        $('#success_message').show();
                        $('#enewsletterform').hide();
                    },
                    error: function () {
                        alert("error");
                    }
                })
            }
            else {
                $('#invalid_email').attr('style', 'display:block!important;color:red');
                $('#NewsletterEmailInput').css('border-color', 'red');
            }
        }
    });
});

$(document).ready(function () {

    if ($("#UMPega").length) {
        if (location.hash.toLocaleLowerCase() == '#prior%20authorization') {
            $("#UMPega").removeClass('collapse');
            $("#UMPega").addClass('expand');
        }
    }
});

$(document).ready(function () {
    if ($(".financialhardshipform").length) {
        //$("[data-val-required]").attr("required", "required");
        $("[data-sc-field-name]").each(function () {
            $(this).attr("maxlength", $(this).attr("data-val-length-max"));
        });
        $(this).find('.form-field-error').hide();

        var multipleCancelButton = new Choices('#Preferredway', {
            removeItemButton: true,
            maxItemCount: 4,
            searchResultLimit: 4,
            renderChoiceLimit: 4
        });

        $('.add-btn').attr("title", $('.sc-tooltip').text());
        $('#btnScFromValidate').click(function (event) {
            event.preventDefault();
            var $this = $(event.target), //submit btn
                $scope = $this.closest("form").parent("div");
            if (!$scope.find(".field-validation-error").length) {
                var isValidForm = true;
                isValidForm = validateFormscform($this.closest("form"));
                if (isValidForm) {
                    var OptIntoTextPrimaryPhone = $.trim($('#optinPrimaryPhone')[0].checked) || "";
                    var OptIntoTextSecondaryPhone = $.trim($('#optinSecondaryPhone')[0].checked) || "";
                    if (OptIntoTextPrimaryPhone == 'true' || OptIntoTextSecondaryPhone == 'true') {
                        $('#scformAlert').modal('show');
                    } else {
                        submitScForm();
                    }
                }
                else {
                    $scope.find(".fhsfailure-form").removeClass('d-none');
                    $scope.find(".input-validation-error:eq(0)").focus();
                }
            }
            return false;
        });
        $("#scformOkbtn").click(function (event) {
            submitScForm();
        });
        function submitScForm() {
            event.preventDefault();
            var $this = $(event.target), //submit btn
                $scope = $('#scform').parent("div");
                $('#processing').toggle();
            if (!$scope.find(".field-validation-error").length) {
                var isValidForm = true;
                isValidForm = validateFormscform($('#scform'));
                if (isValidForm) {
                    var ajaxUrl = "api/Sitecore/ALS/AddDualsMemberInfo.html";
                    var bestTime = $('[data-sc-field-name="bestTime"]').find(":selected").val() || "";
                    if (bestTime.toLowerCase() == 'other') {
                        bestTime = $('#bestTimeOther').val();
                    }
                    var prefWay = $('[data-sc-field-name="Preferredway"]').find(":selected").text().trim() || "";
                    prefWay = prefWay.split('\n').join(',').replace(/ /g, '');
                    jsonInput = {
                        MemberFirstName: $.trim($scope.find('[data-sc-field-name="memberFirstName"]').val()) || "",
                        MemberLastName: $.trim($scope.find('[data-sc-field-name="memberLastName"]').val()) || "",
                        MemberHealthPlanId: $.trim($scope.find('[data-sc-field-name="memberHealthPlanId"]').val()) || "",
                        AddressLine1: $.trim($scope.find('[data-sc-field-name=addressLine1]').val()) || "",
                        AddressLine2: $.trim($scope.find('[data-sc-field-name=addressLine2]').val()) || "",
                        City: $.trim($scope.find('[data-sc-field-name=mailingCity]').val()) || "",
                        State: $.trim($('[data-sc-field-name="State"]').find(":selected").val()) || "",
                        Zipcode: $.trim($scope.find('[data-sc-field-name=MailingZip]').val()) || "",
                        PrimaryPhone: $.trim($scope.find('[data-sc-field-name=primaryPhone]').val()) || "",
                        OptIntoTextPrimaryPhone: $.trim($('#optinPrimaryPhone')[0].checked) || "",
                        SecondaryPhone: $.trim($scope.find('[data-sc-field-name=secondaryPhone]').val()) || "",
                        OptIntoTextSecondaryPhone: $.trim($('#optinSecondaryPhone')[0].checked) || "",
                        Email: $.trim($scope.find('[data-sc-field-name=emailAddress]').val()) || "",
                        OptIntoTextEmail: null,
                        PreferredWayToReach: null,
                        BestTimeToReach: bestTime
                    };
                    var items = [];
                    for (var i = 1; i <= sectionCount; i++) {
                        var $itemScope = $scope.find('[data-sc-field-key=ScreeningItem' + i + ']');

                        var itemObj = {};
                        itemObj.Screening = $.trim($itemScope.find('[data-sc-field-name="Screening"]').find(":selected").val()) || "";
                        itemObj.AppointmentDate = $.trim($itemScope.find('[data-sc-field-name="appointmentDate"]').val()) || "";
                        itemObj.ProviderName = $.trim($itemScope.find('[data-sc-field-name="officerName"]').val()) || "";

                        items[i - 1] = itemObj;
                    }
                    jsonInput.ScreeningItem = items;
                    $scope.find(".fhssuccess-form, .fhsfailure-form").addClass('d-none');
                    var ajaxObj = {};
                    ajaxObj.args = {};
                    ajaxObj.args.data = JSON.stringify({
                        jsonInput: jsonInput,
                        apiKey: $.trim($scope.find('[data-sc-field-key="apikey"]').val()) || "",

                    });
                    ajaxObj.args.headers = { "Accept": "application/json", "Content-Type": "application/json" };
                    ajaxObj.args.url = ajaxUrl;
                    $.ajax({
                        type: "POST",
                        url: ajaxObj.args.url,
                        data: ajaxObj.args.data,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (data && data.success && (data.success == "true" || data.success == "")) {

                                var url = $scope.find(".fhssuccess-form").text().trim();
                                location.href = window.location.origin + url;
                            } else {
                                $('#scformAlert').modal('hide');
                                $scope.find(".fhsfailure-form").removeClass('d-none');

                            }
                        },
                        error: function () {
                            $('#scformAlert').modal('hide');
                            $scope.find(".fhsfailure-form").removeClass('d-none');
                        }
                    })



                }
            } else {
                $scope.find(".fhsfailure-form").removeClass('d-none');
                $scope.find(".input-validation-error:eq(0)").focus();
            }
            return false;
        }
        var sectionMaxCount = 6;
        var sectionCount = 1;
        var innrHtml = '';
        $(".add-btn").click(function (event) {
            event.preventDefault();
            var $this = $(event.target), //submit btn
                $scope = $this.closest("form").parent("div");
            var item = parseInt($.trim($scope.find('[data-sc-field-key=maxitem]').val()));
            if (item > 1) {
                sectionMaxCount = item;
            }
            if (sectionMaxCount >= sectionCount) {
                if (sectionCount == 1) {
                    innrHtml = $(".rowscreeningsection")[0].innerHTML;
                }
                sectionCount++;
                var convertedHtml = innrHtml.replace('ScreeningItem1', 'ScreeningItem' + sectionCount);
                $(".rowscreeningsection").append(convertedHtml);
                $(".remove-btn").removeClass("d-none");

            } else {
                $(".add-btn").hide();
            }

        });
        $(".remove-btn").click(function (event) {
            event.preventDefault();
            if (sectionCount > 1) {
                var $this = $(event.target),
                    $scope = $this.closest("form").parent("div");
                $scope.find('[data-sc-field-key=ScreeningItem' + sectionCount + ']').remove();
                sectionCount = sectionCount - 1;
            }

            if (sectionCount == 1) {
                $this = $(event.target);
                $(".remove-btn").addClass("d-none");
            }
        });

        $("#bestTime").change(function () {
            if ($(this).val().toLowerCase() == "other") {
                $('#bestTimeOther').show();
            } else {
                $('#bestTimeOther').hide();
                // $('#errorbestTime').hide();
            }
        });


        function validateInput() {
            $('.financialhardshipform  input').each(function () {
                if ($(this).val() == '' && $(this).hasClass('js-required')) {
                    $(this).next().next().show();
                    $(this).focus();
                    return;
                } else {
                    $(this).next().next().hide();
                }
            });

            //var preferedway = $('[data-sc-field-name="Preferredway"]').find(":selected").text().trim().replace('\n', ',') || "";
            //var bestTimeToReach = $('[data-sc-field-name="bestTime"]').find(":selected").text().trim().replace('\n', ',') || "";
            //if (!preferedway || preferedway == 'Nothing selected' || preferedway == '') {
            //    $('#errorPreferredway').show();
            //} else {
            //    $('#errorPreferredway').hide();
            //}
            //if (!bestTimeToReach || bestTimeToReach == 'Nothing selected' || bestTimeToReach == '') {

            //    $('#errorbestTime').show();
            //} else {
            //    if (bestTimeToReach.toLowerCase() == 'other' && $('#bestTimeOther').val() == '') {
            //        $('#errorbestTime').show();
            //    } else {
            //        $('#errorbestTime').hide();
            //    }
            //}

        }

        function validateFormscform($context) {
            $context.closest('form').find('.js-validate').trigger('change');
            validateInput();
            if (!validateCaptchascForm($context.closest('form')) || $('.form-field-error:visible').length) {
                return false;
            } else {
                return true;
            }
        }
        function validateCaptchascForm($context) {
            var recaptcha,
                recaptchaResponse;
            if ($context) {
                recaptcha = $($context).find(".g-recaptcha-response");

            }
            if (recaptcha) {
                recaptcha = $(".g-recaptcha-response");
            }
            if (recaptcha) {
                var recaptchaResponse = $(recaptcha).val();
                if (recaptchaResponse.length === 0) {
                    $(recaptcha).parent().find('.form-field-error').show();
                    return false;
                } else {
                    $(recaptcha).parent().find('.form-field-error').hide();
                    return true;
                }
            }
        }
    }



});
/*Cookie*/
// --- Config --- //
//var purecookieTitle = "Cookies."; // Title
var purecookieDesc = "We use cookies on our website. Cookies are used to improve the use of our website and analytic purposes. By using our website, you consent to our use of cookies in accordance with our Privacy Policy. "; // Description
var purecookieLink = '<a href="https://www.molinahealthcare.com/members/common/en-US/Pages/terms_privacy.aspx" target="_blank"> Read more </a>.'; // Cookiepolicy link
var purecookieButton = "I agree"; // Button text
// ---        --- //


function pureFadeIn(elem, display) {
    var el = document.getElementById(elem);
    if (el != undefined) {
        el.style.opacity = 0;
        el.style.display = display || "block";

        (function fade() {

            var val = parseFloat(el.style.opacity);
            if (!((val += .02) > 1)) {
                el.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    }
};
function pureFadeOut(elem) {
    var el = document.getElementById(elem);
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .02) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

function cookieConsent() {
    if (!getCookie('purecookieDismiss')) {        
        pureFadeIn("cookieConsentContainer");
    }
}

function purecookieDismiss() {
    setCookie('purecookieDismiss', '1', 7);
    pureFadeOut("cookieConsentContainer");
}

window.onload = function () { cookieConsent(); };
/*! choices.js v7.0.0 | (c) 2019 Josh Johnson | https://github.com/jshjohnson/Choices#readme */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Choices=t():e.Choices=t()}(window,function(){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="public/assets/scripts/index.html",i(i.s=9)}([function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.diff=t.cloneObject=t.existsInArray=t.isIE11=t.fetchFromObject=t.getWindowHeight=t.dispatchEvent=t.sortByScore=t.sortByAlpha=t.calcWidthOfInput=t.strToEl=t.sanitise=t.isScrolledIntoView=t.getAdjacentEl=t.findAncestorByAttrName=t.wrap=t.isElement=t.isType=t.getType=t.generateId=t.generateChars=t.getRandomNumber=void 0;var n=function(e,t){return Math.floor(Math.random()*(t-e)+e)};t.getRandomNumber=n;var o=function(e){for(var t="",i=0;i<e;i++){t+=n(0,36).toString(36)}return t};t.generateChars=o;t.generateId=function(e,t){var i=e.id||e.name&&"".concat(e.name,"-").concat(o(2))||o(4);return i=i.replace(/(:|\.|\[|\]|,)/g,""),i="".concat(t,"-").concat(i)};var r=function(e){return Object.prototype.toString.call(e).slice(8,-1)};t.getType=r;var s=function(e,t){return null!=t&&r(t)===e};t.isType=s;t.isElement=function(e){return e instanceof Element};t.wrap=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.createElement("div");return e.nextSibling?e.parentNode.insertBefore(t,e.nextSibling):e.parentNode.appendChild(t),t.appendChild(e)};t.findAncestorByAttrName=function(e,t){for(var i=e;i;){if(i.hasAttribute(t))return i;i=i.parentElement}return null};t.getAdjacentEl=function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;if(e&&t){var n=e.parentNode.parentNode,o=Array.from(n.querySelectorAll(t)),r=o.indexOf(e);return o[r+(i>0?1:-1)]}};t.isScrolledIntoView=function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;if(e)return i>0?t.scrollTop+t.offsetHeight>=e.offsetTop+e.offsetHeight:e.offsetTop>=t.scrollTop};var a=function(e){return s("String",e)?e.replace(/&/g,"&amp;").replace(/>/g,"&rt;").replace(/</g,"&lt;").replace(/"/g,"&quot;"):e};t.sanitise=a;var c,l=(c=document.createElement("div"),function(e){var t=e.trim();c.innerHTML=t;for(var i=c.children[0];c.firstChild;)c.removeChild(c.firstChild);return i});t.strToEl=l;t.calcWidthOfInput=function(e,t){var i=e.value||e.placeholder,n=e.offsetWidth;if(i){var o=l("<span>".concat(a(i),"</span>"));if(o.style.position="absolute",o.style.padding="0",o.style.top="-9999px",o.style.left="-9999px",o.style.width="auto",o.style.whiteSpace="pre",document.body.contains(e)&&window.getComputedStyle){var r=window.getComputedStyle(e);r&&(o.style.fontSize=r.fontSize,o.style.fontFamily=r.fontFamily,o.style.fontWeight=r.fontWeight,o.style.fontStyle=r.fontStyle,o.style.letterSpacing=r.letterSpacing,o.style.textTransform=r.textTransform,o.style.padding=r.padding)}document.body.appendChild(o),requestAnimationFrame(function(){i&&o.offsetWidth!==e.offsetWidth&&(n=o.offsetWidth+4),document.body.removeChild(o),t.call(void 0,"".concat(n,"px"))})}else t.call(void 0,"".concat(n,"px"))};t.sortByAlpha=function(e,t){var i="".concat(e.label||e.value).toLowerCase(),n="".concat(t.label||t.value).toLowerCase();return i<n?-1:i>n?1:0};t.sortByScore=function(e,t){return e.score-t.score};t.dispatchEvent=function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=new CustomEvent(t,{detail:i,bubbles:!0,cancelable:!0});return e.dispatchEvent(n)};t.getWindowHeight=function(){var e=document.body,t=document.documentElement;return Math.max(e.scrollHeight,e.offsetHeight,t.clientHeight,t.scrollHeight,t.offsetHeight)};t.fetchFromObject=function e(t,i){var n=i.indexOf(".");return n>-1?e(t[i.substring(0,n)],i.substr(n+1)):t[i]};t.isIE11=function(){return!(!navigator.userAgent.match(/Trident/)||!navigator.userAgent.match(/rv[ :]11/))};t.existsInArray=function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"value";return e.some(function(e){return s("String",t)?e[i]===t.trim():e[i]===t})};t.cloneObject=function(e){return JSON.parse(JSON.stringify(e))};t.diff=function(e,t){var i=Object.keys(e).sort(),n=Object.keys(t).sort();return i.filter(function(e){return n.indexOf(e)<0})}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SCROLLING_SPEED=t.KEY_CODES=t.ACTION_TYPES=t.EVENTS=t.DEFAULT_CONFIG=t.DEFAULT_CLASSNAMES=void 0;var n=i(0),o={containerOuter:"choices",containerInner:"choices__inner",input:"choices__input",inputCloned:"choices__input--cloned",list:"choices__list",listItems:"choices__list--multiple",listSingle:"choices__list--single",listDropdown:"choices__list--dropdown",item:"choices__item",itemSelectable:"choices__item--selectable",itemDisabled:"choices__item--disabled",itemChoice:"choices__item--choice",placeholder:"choices__placeholder",group:"choices__group",groupHeading:"choices__heading",button:"choices__button",activeState:"is-active",focusState:"is-focused",openState:"is-open",disabledState:"is-disabled",highlightedState:"is-highlighted",hiddenState:"is-hidden",flippedState:"is-flipped",loadingState:"is-loading",noResults:"has-no-results",noChoices:"has-no-choices"};t.DEFAULT_CLASSNAMES=o;var r={items:[],choices:[],silent:!1,renderChoiceLimit:-1,maxItemCount:-1,addItems:!0,addItemFilterFn:null,removeItems:!0,removeItemButton:!1,editItems:!1,duplicateItemsAllowed:!0,delimiter:",",paste:!0,searchEnabled:!0,searchChoices:!0,searchFloor:1,searchResultLimit:4,searchFields:["label","value"],position:"auto",resetScrollPosition:!0,shouldSort:!0,shouldSortItems:!1,sortFn:n.sortByAlpha,placeholder:!0,placeholderValue:null,searchPlaceholderValue:null,prependValue:null,appendValue:null,renderSelectedChoices:"auto",loadingText:"Loading...",noResultsText:"No results found",noChoicesText:"No choices to choose from",itemSelectText:"Press to select",uniqueItemText:"Only unique values can be added",customAddItemText:"Only values matching specific conditions can be added",addItemText:function(e){return'Press Enter to add <b>"'.concat((0,n.sanitise)(e),'"</b>')},maxItemText:function(e){return"Only ".concat(e," values can be added")},itemComparer:function(e,t){return e===t},fuseOptions:{includeScore:!0},callbackOnInit:null,callbackOnCreateTemplates:null,classNames:o};t.DEFAULT_CONFIG=r;t.EVENTS={showDropdown:"showDropdown",hideDropdown:"hideDropdown",change:"change",choice:"choice",search:"search",addItem:"addItem",removeItem:"removeItem",highlightItem:"highlightItem",highlightChoice:"highlightChoice"};t.ACTION_TYPES={ADD_CHOICE:"ADD_CHOICE",FILTER_CHOICES:"FILTER_CHOICES",ACTIVATE_CHOICES:"ACTIVATE_CHOICES",CLEAR_CHOICES:"CLEAR_CHOICES",ADD_GROUP:"ADD_GROUP",ADD_ITEM:"ADD_ITEM",REMOVE_ITEM:"REMOVE_ITEM",HIGHLIGHT_ITEM:"HIGHLIGHT_ITEM",CLEAR_ALL:"CLEAR_ALL"};t.KEY_CODES={BACK_KEY:46,DELETE_KEY:8,ENTER_KEY:13,A_KEY:65,ESC_KEY:27,UP_KEY:38,DOWN_KEY:40,PAGE_UP_KEY:33,PAGE_DOWN_KEY:34};t.SCROLLING_SPEED=4},function(e,t,i){"use strict";(function(e,n){var o,r=i(7);o="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:n;var s=Object(r.a)(o);t.a=s}).call(this,i(3),i(14)(e))},function(e,t){var i;i=function(){return this}();try{i=i||new Function("return this")()}catch(e){"object"==typeof window&&(i=window)}e.exports=i},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(0);function o(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var r=function(){function e(t){var i=t.element,o=t.classNames;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),Object.assign(this,{element:i,classNames:o}),!(0,n.isElement)(i))throw new TypeError("Invalid element passed");this.isDisabled=!1}var t,i,r;return t=e,(i=[{key:"conceal",value:function(){this.element.classList.add(this.classNames.input),this.element.classList.add(this.classNames.hiddenState),this.element.tabIndex="-1";var e=this.element.getAttribute("style");e&&this.element.setAttribute("data-choice-orig-style",e),this.element.setAttribute("aria-hidden","true"),this.element.setAttribute("data-choice","active")}},{key:"reveal",value:function(){this.element.classList.remove(this.classNames.input),this.element.classList.remove(this.classNames.hiddenState),this.element.removeAttribute("tabindex");var e=this.element.getAttribute("data-choice-orig-style");e?(this.element.removeAttribute("data-choice-orig-style"),this.element.setAttribute("style",e)):this.element.removeAttribute("style"),this.element.removeAttribute("aria-hidden"),this.element.removeAttribute("data-choice"),this.element.value=this.element.value}},{key:"enable",value:function(){this.element.removeAttribute("disabled"),this.element.disabled=!1,this.isDisabled=!1}},{key:"disable",value:function(){this.element.setAttribute("disabled",""),this.element.disabled=!0,this.isDisabled=!0}},{key:"triggerEvent",value:function(e,t){(0,n.dispatchEvent)(this.element,e,t)}},{key:"value",get:function(){return this.element.value}}])&&o(t.prototype,i),r&&o(t,r),e}();t.default=r},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.TEMPLATES=void 0;var n,o=(n=i(27))&&n.__esModule?n:{default:n},r=i(0);function s(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var a={containerOuter:function(e,t,i,n,o,s){var a=n?'tabindex="0"':"",c=i?'role="listbox"':"",l="";return i&&o&&(c='role="combobox"',l='aria-autocomplete="list"'),(0,r.strToEl)('\n      <div\n        class="'.concat(e.containerOuter,'"\n        data-type="').concat(s,'"\n        ').concat(c,"\n        ").concat(a,"\n        ").concat(l,'\n        aria-haspopup="true"\n        aria-expanded="false"\n        dir="').concat(t,'"\n        >\n      </div>\n    '))},containerInner:function(e){return(0,r.strToEl)('\n      <div class="'.concat(e.containerInner,'"></div>\n    '))},itemList:function(e,t){var i,n=(0,o.default)(e.list,(s(i={},e.listSingle,t),s(i,e.listItems,!t),i));return(0,r.strToEl)('\n      <div class="'.concat(n,'"></div>\n    '))},placeholder:function(e,t){return(0,r.strToEl)('\n      <div class="'.concat(e.placeholder,'">\n        ').concat(t,"\n      </div>\n    "))},item:function(e,t,i){var n,a,c=t.active?'aria-selected="true"':"",l=t.disabled?'aria-disabled="true"':"",u=(0,o.default)(e.item,(s(n={},e.highlightedState,t.highlighted),s(n,e.itemSelectable,!t.highlighted),s(n,e.placeholder,t.placeholder),n));return i?(u=(0,o.default)(e.item,(s(a={},e.highlightedState,t.highlighted),s(a,e.itemSelectable,!t.disabled),s(a,e.placeholder,t.placeholder),a)),(0,r.strToEl)('\n        <div\n          class="'.concat(u,'"\n          data-item\n          data-id="').concat(t.id,'"\n          data-value="').concat(t.value,"\"\n          data-custom-properties='").concat(t.customProperties,"'\n          data-deletable\n          ").concat(c,"\n          ").concat(l,"\n          >\n          ").concat(t.label,'\x3c!--\n       --\x3e<button\n            type="button"\n            class="').concat(e.button,'"\n            data-button\n            aria-label="Remove item: \'').concat(t.value,"'\"\n            >\n            Remove item\n          </button>\n        </div>\n      "))):(0,r.strToEl)('\n      <div\n        class="'.concat(u,'"\n        data-item\n        data-id="').concat(t.id,'"\n        data-value="').concat(t.value,'"\n        ').concat(c,"\n        ").concat(l,"\n        >\n        ").concat(t.label,"\n      </div>\n    "))},choiceList:function(e,t){var i=t?"":'aria-multiselectable="true"';return(0,r.strToEl)('\n      <div\n        class="'.concat(e.list,'"\n        dir="ltr"\n        role="listbox"\n        ').concat(i,"\n        >\n      </div>\n    "))},choiceGroup:function(e,t){var i=t.disabled?'aria-disabled="true"':"",n=(0,o.default)(e.group,s({},e.itemDisabled,t.disabled));return(0,r.strToEl)('\n      <div\n        class="'.concat(n,'"\n        data-group\n        data-id="').concat(t.id,'"\n        data-value="').concat(t.value,'"\n        role="group"\n        ').concat(i,'\n        >\n        <div class="').concat(e.groupHeading,'">').concat(t.value,"</div>\n      </div>\n    "))},choice:function(e,t,i){var n,a=t.groupId>0?'role="treeitem"':'role="option"',c=(0,o.default)(e.item,e.itemChoice,(s(n={},e.itemDisabled,t.disabled),s(n,e.itemSelectable,!t.disabled),s(n,e.placeholder,t.placeholder),n));return(0,r.strToEl)('\n      <div\n        class="'.concat(c,'"\n        data-select-text="').concat(i,'"\n        data-choice\n        data-id="').concat(t.id,'"\n        data-value="').concat(t.value,'"\n        ').concat(t.disabled?'data-choice-disabled aria-disabled="true"':"data-choice-selectable",'\n        id="').concat(t.elementId,'"\n        ').concat(a,"\n        >\n        ").concat(t.label,"\n      </div>\n    "))},input:function(e){var t=(0,o.default)(e.input,e.inputCloned);return(0,r.strToEl)('\n      <input\n        type="text"\n        class="'.concat(t,'"\n        autocomplete="off"\n        autocapitalize="off"\n        spellcheck="false"\n        role="textbox"\n        aria-autocomplete="list"\n        >\n    '))},dropdown:function(e){var t=(0,o.default)(e.list,e.listDropdown);return(0,r.strToEl)('\n      <div\n        class="'.concat(t,'"\n        aria-expanded="false"\n        >\n      </div>\n    '))},notice:function(e,t){var i,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=(0,o.default)(e.item,e.itemChoice,(s(i={},e.noResults,"no-results"===n),s(i,e.noChoices,"no-choices"===n),i));return(0,r.strToEl)('\n      <div class="'.concat(a,'">\n        ').concat(t,"\n      </div>\n    "))},option:function(e){return(0,r.strToEl)('\n      <option value="'.concat(e.value,'" ').concat(e.active?"selected":""," ").concat(e.disabled?"disabled":""," ").concat(e.customProperties?"data-custom-properties=".concat(e.customProperties):"",">").concat(e.label,"</option>\n    "))}};t.TEMPLATES=a;var c=a;t.default=c},function(e,t,i){"use strict";i.r(t);var n=i(8),o="object"==typeof self&&self&&self.Object===Object&&self,r=(n.a||o||Function("return this")()).Symbol,s=Object.prototype,a=s.hasOwnProperty,c=s.toString,l=r?r.toStringTag:void 0;var u=function(e){var t=a.call(e,l),i=e[l];try{e[l]=void 0;var n=!0}catch(e){}var o=c.call(e);return n&&(t?e[l]=i:delete e[l]),o},h=Object.prototype.toString;var d=function(e){return h.call(e)},f="[object Null]",p="[object Undefined]",v=r?r.toStringTag:void 0;var m=function(e){return null==e?void 0===e?p:f:v&&v in Object(e)?u(e):d(e)};var g=function(e,t){return function(i){return e(t(i))}}(Object.getPrototypeOf,Object);var _=function(e){return null!=e&&"object"==typeof e},y="[object Object]",b=Function.prototype,E=Object.prototype,S=b.toString,I=E.hasOwnProperty,O=S.call(Object);var C=function(e){if(!_(e)||m(e)!=y)return!1;var t=g(e);if(null===t)return!0;var i=I.call(t,"constructor")&&t.constructor;return"function"==typeof i&&i instanceof i&&S.call(i)==O},T=i(2),w={INIT:"@@redux/INIT"};function k(e,t,i){var n;if("function"==typeof t&&void 0===i&&(i=t,t=void 0),void 0!==i){if("function"!=typeof i)throw new Error("Expected the enhancer to be a function.");return i(k)(e,t)}if("function"!=typeof e)throw new Error("Expected the reducer to be a function.");var o=e,r=t,s=[],a=s,c=!1;function l(){a===s&&(a=s.slice())}function u(){return r}function h(e){if("function"!=typeof e)throw new Error("Expected listener to be a function.");var t=!0;return l(),a.push(e),function(){if(t){t=!1,l();var i=a.indexOf(e);a.splice(i,1)}}}function d(e){if(!C(e))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(void 0===e.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(c)throw new Error("Reducers may not dispatch actions.");try{c=!0,r=o(r,e)}finally{c=!1}for(var t=s=a,i=0;i<t.length;i++){(0,t[i])()}return e}return d({type:w.INIT}),(n={dispatch:d,subscribe:h,getState:u,replaceReducer:function(e){if("function"!=typeof e)throw new Error("Expected the nextReducer to be a function.");o=e,d({type:w.INIT})}})[T.a]=function(){var e,t=h;return(e={subscribe:function(e){if("object"!=typeof e)throw new TypeError("Expected the observer to be an object.");function i(){e.next&&e.next(u())}return i(),{unsubscribe:t(i)}}})[T.a]=function(){return this},e},n}function A(e,t){var i=t&&t.type;return"Given action "+(i&&'"'+i.toString()+'"'||"an action")+', reducer "'+e+'" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'}function L(e){for(var t=Object.keys(e),i={},n=0;n<t.length;n++){var o=t[n];0,"function"==typeof e[o]&&(i[o]=e[o])}var r=Object.keys(i);var s=void 0;try{!function(e){Object.keys(e).forEach(function(t){var i=e[t];if(void 0===i(void 0,{type:w.INIT}))throw new Error('Reducer "'+t+"\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");if(void 0===i(void 0,{type:"@@redux/PROBE_UNKNOWN_ACTION_"+Math.random().toString(36).substring(7).split("").join(".")}))throw new Error('Reducer "'+t+"\" returned undefined when probed with a random type. Don't try to handle "+w.INIT+' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.')})}(i)}catch(e){s=e}return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1];if(s)throw s;for(var n=!1,o={},a=0;a<r.length;a++){var c=r[a],l=i[c],u=e[c],h=l(u,t);if(void 0===h){var d=A(c,t);throw new Error(d)}o[c]=h,n=n||h!==u}return n?o:e}}function x(e,t){return function(){return t(e.apply(void 0,arguments))}}function P(e,t){if("function"==typeof e)return x(e,t);if("object"!=typeof e||null===e)throw new Error("bindActionCreators expected an object or a function, instead received "+(null===e?"null":typeof e)+'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');for(var i=Object.keys(e),n={},o=0;o<i.length;o++){var r=i[o],s=e[r];"function"==typeof s&&(n[r]=x(s,t))}return n}function D(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];return 0===t.length?function(e){return e}:1===t.length?t[0]:t.reduce(function(e,t){return function(){return e(t.apply(void 0,arguments))}})}var j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e};function M(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(e){return function(i,n,o){var r,s=e(i,n,o),a=s.dispatch,c={getState:s.getState,dispatch:function(e){return a(e)}};return r=t.map(function(e){return e(c)}),a=D.apply(void 0,r)(s.dispatch),j({},s,{dispatch:a})}}}i.d(t,"createStore",function(){return k}),i.d(t,"combineReducers",function(){return L}),i.d(t,"bindActionCreators",function(){return P}),i.d(t,"applyMiddleware",function(){return M}),i.d(t,"compose",function(){return D})},function(e,t,i){"use strict";function n(e){var t,i=e.Symbol;return"function"==typeof i?i.observable?t=i.observable:(t=i("observable"),i.observable=t):t="@@observable",t}i.d(t,"a",function(){return n})},function(e,t,i){"use strict";(function(e){var i="object"==typeof e&&e&&e.Object===Object&&e;t.a=i}).call(this,i(3))},function(e,t,i){e.exports=i(10)},function(e,t,i){"use strict";var n=v(i(11)),o=v(i(12)),r=v(i(13)),s=i(20),a=i(1),c=i(5),l=i(28),u=i(29),h=i(30),d=i(31),f=i(32),p=i(0);function v(e){return e&&e.__esModule?e:{default:e}}function m(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function g(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var _=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"[data-choice]",i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),(0,p.isType)("String",t)){var n=Array.from(document.querySelectorAll(t));if(n.length>1)return this._generateInstances(n,i)}this.config=o.default.all([a.DEFAULT_CONFIG,e.userDefaults,i],{arrayMerge:function(e,t){return[].concat(t)}});var c=(0,p.diff)(this.config,a.DEFAULT_CONFIG);c.length&&console.warn("Unknown config option(s) passed",c.join(", ")),["auto","always"].includes(this.config.renderSelectedChoices)||(this.config.renderSelectedChoices="auto");var l=(0,p.isType)("String",t)?document.querySelector(t):t;return l?(this._isTextElement="text"===l.type,this._isSelectOneElement="select-one"===l.type,this._isSelectMultipleElement="select-multiple"===l.type,this._isSelectElement=this._isSelectOneElement||this._isSelectMultipleElement,this._isTextElement?this.passedElement=new s.WrappedInput({element:l,classNames:this.config.classNames,delimiter:this.config.delimiter}):this._isSelectElement&&(this.passedElement=new s.WrappedSelect({element:l,classNames:this.config.classNames})),this.passedElement?(!0===this.config.shouldSortItems&&this._isSelectOneElement&&!this.config.silent&&console.warn("shouldSortElements: Type of passed element is 'select-one', falling back to false."),this.initialised=!1,this._store=new r.default(this.render),this._initialState={},this._currentState={},this._prevState={},this._currentValue="",this._canSearch=this.config.searchEnabled,this._isScrollingOnIe=!1,this._highlightPosition=0,this._wasTap=!0,this._placeholderValue=this._generatePlaceholderValue(),this._baseId=(0,p.generateId)(this.passedElement.element,"choices-"),this._direction=this.passedElement.element.getAttribute("dir")||"ltr",this._idNames={itemChoice:"item-choice"},this._presetChoices=this.config.choices,this._presetItems=this.config.items,this.passedElement.value&&(this._presetItems=this._presetItems.concat(this.passedElement.value.split(this.config.delimiter))),this._render=this._render.bind(this),this._onFocus=this._onFocus.bind(this),this._onBlur=this._onBlur.bind(this),this._onKeyUp=this._onKeyUp.bind(this),this._onKeyDown=this._onKeyDown.bind(this),this._onClick=this._onClick.bind(this),this._onTouchMove=this._onTouchMove.bind(this),this._onTouchEnd=this._onTouchEnd.bind(this),this._onMouseDown=this._onMouseDown.bind(this),this._onMouseOver=this._onMouseOver.bind(this),this._onFormReset=this._onFormReset.bind(this),this._onAKey=this._onAKey.bind(this),this._onEnterKey=this._onEnterKey.bind(this),this._onEscapeKey=this._onEscapeKey.bind(this),this._onDirectionKey=this._onDirectionKey.bind(this),this._onDeleteKey=this._onDeleteKey.bind(this),"active"===this.passedElement.element.getAttribute("data-choice")&&console.warn("Trying to initialise Choices on element already initialised"),void this.init()):console.error("Passed element was of an invalid type")):console.error("Could not find passed element or passed element was of an invalid type")}var t,i,v;return t=e,(i=[{key:"init",value:function(){if(!this.initialised){this._createTemplates(),this._createElements(),this._createStructure(),this._initialState=(0,p.cloneObject)(this._store.state),this._store.subscribe(this._render),this._render(),this._addEventListeners(),(!this.config.addItems||this.passedElement.element.hasAttribute("disabled"))&&this.disable(),this.initialised=!0;var e=this.config.callbackOnInit;e&&(0,p.isType)("Function",e)&&e.call(this)}}},{key:"destroy",value:function(){this.initialised&&(this._removeEventListeners(),this.passedElement.reveal(),this.containerOuter.unwrap(this.passedElement.element),this._isSelectElement&&(this.passedElement.options=this._presetChoices),this.clearStore(),this.config.templates=null,this.initialised=!1)}},{key:"enable",value:function(){return this.passedElement.isDisabled&&this.passedElement.enable(),this.containerOuter.isDisabled&&(this._addEventListeners(),this.input.enable(),this.containerOuter.enable()),this}},{key:"disable",value:function(){return this.passedElement.isDisabled||this.passedElement.disable(),this.containerOuter.isDisabled||(this._removeEventListeners(),this.input.disable(),this.containerOuter.disable()),this}},{key:"highlightItem",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(!e)return this;var i=e.id,n=e.groupId,o=void 0===n?-1:n,r=e.value,s=void 0===r?"":r,c=e.label,l=void 0===c?"":c,h=o>=0?this._store.getGroupById(o):null;return this._store.dispatch((0,u.highlightItem)(i,!0)),t&&this.passedElement.triggerEvent(a.EVENTS.highlightItem,{id:i,value:s,label:l,groupValue:h&&h.value?h.value:null}),this}},{key:"unhighlightItem",value:function(e){if(!e)return this;var t=e.id,i=e.groupId,n=void 0===i?-1:i,o=e.value,r=void 0===o?"":o,s=e.label,c=void 0===s?"":s,l=n>=0?this._store.getGroupById(n):null;return this._store.dispatch((0,u.highlightItem)(t,!1)),this.passedElement.triggerEvent(a.EVENTS.highlightItem,{id:t,value:r,label:c,groupValue:l&&l.value?l.value:null}),this}},{key:"highlightAll",value:function(){var e=this;return this._store.items.forEach(function(t){return e.highlightItem(t)}),this}},{key:"unhighlightAll",value:function(){var e=this;return this._store.items.forEach(function(t){return e.unhighlightItem(t)}),this}},{key:"removeActiveItemsByValue",value:function(e){var t=this;return this._store.activeItems.filter(function(t){return t.value===e}).forEach(function(e){return t._removeItem(e)}),this}},{key:"removeActiveItems",value:function(e){var t=this;return this._store.activeItems.filter(function(t){return t.id!==e}).forEach(function(e){return t._removeItem(e)}),this}},{key:"removeHighlightedItems",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this._store.highlightedActiveItems.forEach(function(i){e._removeItem(i),t&&e._triggerChange(i.value)}),this}},{key:"showDropdown",value:function(e){var t=this;return this.dropdown.isActive?this:(requestAnimationFrame(function(){t.dropdown.show(),t.containerOuter.open(t.dropdown.distanceFromTopWindow()),!e&&t._canSearch&&t.input.focus(),t.passedElement.triggerEvent(a.EVENTS.showDropdown,{})}),this)}},{key:"hideDropdown",value:function(e){var t=this;return this.dropdown.isActive?(requestAnimationFrame(function(){t.dropdown.hide(),t.containerOuter.close(),!e&&t._canSearch&&(t.input.removeActiveDescendant(),t.input.blur()),t.passedElement.triggerEvent(a.EVENTS.hideDropdown,{})}),this):this}},{key:"getValue",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=this._store.activeItems.reduce(function(t,i){var n=e?i.value:i;return t.push(n),t},[]);return this._isSelectOneElement?t[0]:t}},{key:"setValue",value:function(e){var t=this;return this.initialised?([].concat(e).forEach(function(e){return t._setChoiceOrItem(e)}),this):this}},{key:"setChoiceByValue",value:function(e){var t=this;return!this.initialised||this._isTextElement?this:(((0,p.isType)("Array",e)?e:[e]).forEach(function(e){return t._findAndSelectChoiceByValue(e)}),this)}},{key:"setChoices",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(!this._isSelectElement||!i)return this;o&&this.clearChoices(),this.containerOuter.removeLoadingState();return this._setLoading(!0),t.forEach(function(t){t.choices?e._addGroup({group:t,id:t.id||null,valueKey:i,labelKey:n}):e._addChoice({value:t[i],label:t[n],isSelected:t.selected,isDisabled:t.disabled,customProperties:t.customProperties,placeholder:t.placeholder})}),this._setLoading(!1),this}},{key:"clearChoices",value:function(){this._store.dispatch((0,l.clearChoices)())}},{key:"clearStore",value:function(){return this._store.dispatch((0,d.clearAll)()),this}},{key:"clearInput",value:function(){var e=!this._isSelectOneElement;return this.input.clear(e),!this._isTextElement&&this._canSearch&&(this._isSearching=!1,this._store.dispatch((0,l.activateChoices)(!0))),this}},{key:"ajax",value:function(e){var t=this;return this.initialised&&this._isSelectElement&&e?(requestAnimationFrame(function(){return t._handleLoadingState(!0)}),e(this._ajaxCallback()),this):this}},{key:"_render",value:function(){if(!this._store.isLoading()){this._currentState=this._store.state;var e=this._currentState.choices!==this._prevState.choices||this._currentState.groups!==this._prevState.groups||this._currentState.items!==this._prevState.items,t=this._isSelectElement,i=this._currentState.items!==this._prevState.items;e&&(t&&this._renderChoices(),i&&this._renderItems(),this._prevState=this._currentState)}}},{key:"_renderChoices",value:function(){var e=this,t=this._store,i=t.activeGroups,n=t.activeChoices,o=document.createDocumentFragment();if(this.choiceList.clear(),this.config.resetScrollPosition&&requestAnimationFrame(function(){return e.choiceList.scrollToTop()}),i.length>=1&&!this._isSearching){var r=n.filter(function(e){return!0===e.placeholder&&-1===e.groupId});r.length>=1&&(o=this._createChoicesFragment(r,o)),o=this._createGroupsFragment(i,n,o)}else n.length>=1&&(o=this._createChoicesFragment(n,o));if(o.childNodes&&o.childNodes.length>0){var s=this._store.activeItems,a=this._canAddItem(s,this.input.value);a.response?(this.choiceList.append(o),this._highlightChoice()):this.choiceList.append(this._getTemplate("notice",a.notice))}else{var c,l;this._isSearching?(l=(0,p.isType)("Function",this.config.noResultsText)?this.config.noResultsText():this.config.noResultsText,c=this._getTemplate("notice",l,"no-results")):(l=(0,p.isType)("Function",this.config.noChoicesText)?this.config.noChoicesText():this.config.noChoicesText,c=this._getTemplate("notice",l,"no-choices")),this.choiceList.append(c)}}},{key:"_renderItems",value:function(){var e=this._store.activeItems||[];this.itemList.clear();var t=this._createItemsFragment(e);t.childNodes&&this.itemList.append(t)}},{key:"_createGroupsFragment",value:function(e,t,i){var n=this,o=i||document.createDocumentFragment();return this.config.shouldSort&&e.sort(this.config.sortFn),e.forEach(function(e){var i=function(e){return t.filter(function(t){return n._isSelectOneElement?t.groupId===e.id:t.groupId===e.id&&("always"===n.config.renderSelectedChoices||!t.selected)})}(e);if(i.length>=1){var r=n._getTemplate("choiceGroup",e);o.appendChild(r),n._createChoicesFragment(i,o,!0)}}),o}},{key:"_createChoicesFragment",value:function(e,t){var i=this,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=t||document.createDocumentFragment(),r=this.config,s=r.renderSelectedChoices,a=r.searchResultLimit,c=r.renderChoiceLimit,l=this._isSearching?p.sortByScore:this.config.sortFn,u=function(e){if("auto"!==s||(i._isSelectOneElement||!e.selected)){var t=i._getTemplate("choice",e,i.config.itemSelectText);o.appendChild(t)}},h=e;"auto"!==s||this._isSelectOneElement||(h=e.filter(function(e){return!e.selected}));var d=h.reduce(function(e,t){return t.placeholder?e.placeholderChoices.push(t):e.normalChoices.push(t),e},{placeholderChoices:[],normalChoices:[]}),f=d.placeholderChoices,v=d.normalChoices;(this.config.shouldSort||this._isSearching)&&v.sort(l);var m=h.length,g=[].concat(f,v);this._isSearching?m=a:c>0&&!n&&(m=c);for(var _=0;_<m;_+=1)g[_]&&u(g[_]);return o}},{key:"_createItemsFragment",value:function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=this.config,o=n.shouldSortItems,r=n.sortFn,s=n.removeItemButton,a=i||document.createDocumentFragment();o&&!this._isSelectOneElement&&e.sort(r),this._isTextElement?this.passedElement.value=e:this.passedElement.options=e;return e.forEach(function(e){return function(e){var i=t._getTemplate("item",e,s);a.appendChild(i)}(e)}),a}},{key:"_triggerChange",value:function(e){null!=e&&this.passedElement.triggerEvent(a.EVENTS.change,{value:e})}},{key:"_selectPlaceholderChoice",value:function(){var e=this._store.placeholderChoice;e&&(this._addItem({value:e.value,label:e.label,choiceId:e.id,groupId:e.groupId,placeholder:e.placeholder}),this._triggerChange(e.value))}},{key:"_handleButtonAction",value:function(e,t){if(e&&t&&this.config.removeItems&&this.config.removeItemButton){var i=t.parentNode.getAttribute("data-id"),n=e.find(function(e){return e.id===parseInt(i,10)});this._removeItem(n),this._triggerChange(n.value),this._isSelectOneElement&&this._selectPlaceholderChoice()}}},{key:"_handleItemAction",value:function(e,t){var i=this,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(e&&t&&this.config.removeItems&&!this._isSelectOneElement){var o=t.getAttribute("data-id");e.forEach(function(e){e.id!==parseInt(o,10)||e.highlighted?!n&&e.highlighted&&i.unhighlightItem(e):i.highlightItem(e)}),this.input.focus()}}},{key:"_handleChoiceAction",value:function(e,t){if(e&&t){var i=t.getAttribute("data-id"),n=this._store.getChoiceById(i),o=e[0]&&e[0].keyCode?e[0].keyCode:null,r=this.dropdown.isActive;if(n.keyCode=o,this.passedElement.triggerEvent(a.EVENTS.choice,{choice:n}),n&&!n.selected&&!n.disabled)this._canAddItem(e,n.value).response&&(this._addItem({value:n.value,label:n.label,choiceId:n.id,groupId:n.groupId,customProperties:n.customProperties,placeholder:n.placeholder,keyCode:n.keyCode}),this._triggerChange(n.value));this.clearInput(),r&&this._isSelectOneElement&&(this.hideDropdown(!0),this.containerOuter.focus())}}},{key:"_handleBackspace",value:function(e){if(this.config.removeItems&&e){var t=e[e.length-1],i=e.some(function(e){return e.highlighted});this.config.editItems&&!i&&t?(this.input.value=t.value,this.input.setWidth(),this._removeItem(t),this._triggerChange(t.value)):(i||this.highlightItem(t,!1),this.removeHighlightedItems(!0))}}},{key:"_setLoading",value:function(e){this._store.dispatch((0,f.setIsLoading)(e))}},{key:"_handleLoadingState",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=this.itemList.getChild(".".concat(this.config.classNames.placeholder));e?(this.disable(),this.containerOuter.addLoadingState(),this._isSelectOneElement?t?t.innerHTML=this.config.loadingText:(t=this._getTemplate("placeholder",this.config.loadingText),this.itemList.append(t)):this.input.placeholder=this.config.loadingText):(this.enable(),this.containerOuter.removeLoadingState(),this._isSelectOneElement?t.innerHTML=this._placeholderValue||"":this.input.placeholder=this._placeholderValue||"")}},{key:"_handleSearch",value:function(e){if(e&&this.input.isFocussed){var t=this._store.choices,i=this.config,n=i.searchFloor,o=i.searchChoices,r=t.some(function(e){return!e.active});if(e&&e.length>=n){var s=o?this._searchChoices(e):0;this.passedElement.triggerEvent(a.EVENTS.search,{value:e,resultCount:s})}else r&&(this._isSearching=!1,this._store.dispatch((0,l.activateChoices)(!0)))}}},{key:"_canAddItem",value:function(e,t){var i=!0,n=(0,p.isType)("Function",this.config.addItemText)?this.config.addItemText(t):this.config.addItemText;if(!this._isSelectOneElement){var o=(0,p.existsInArray)(e,t);this.config.maxItemCount>0&&this.config.maxItemCount<=e.length&&(i=!1,n=(0,p.isType)("Function",this.config.maxItemText)?this.config.maxItemText(this.config.maxItemCount):this.config.maxItemText),!this.config.duplicateItemsAllowed&&o&&i&&(i=!1,n=(0,p.isType)("Function",this.config.uniqueItemText)?this.config.uniqueItemText(t):this.config.uniqueItemText),this._isTextElement&&this.config.addItems&&i&&(0,p.isType)("Function",this.config.addItemFilterFn)&&!this.config.addItemFilterFn(t)&&(i=!1,n=(0,p.isType)("Function",this.config.customAddItemText)?this.config.customAddItemText(t):this.config.customAddItemText)}return{response:i,notice:n}}},{key:"_ajaxCallback",value:function(){var e=this;return function(t,i,n){if(t&&i){var o=(0,p.isType)("Object",t)?[t]:t;o&&(0,p.isType)("Array",o)&&o.length?(e._handleLoadingState(!1),e._setLoading(!0),o.forEach(function(t){t.choices?e._addGroup({group:t,id:t.id||null,valueKey:i,labelKey:n}):e._addChoice({value:(0,p.fetchFromObject)(t,i),label:(0,p.fetchFromObject)(t,n),isSelected:t.selected,isDisabled:t.disabled,customProperties:t.customProperties,placeholder:t.placeholder})}),e._setLoading(!1),e._isSelectOneElement&&e._selectPlaceholderChoice()):e._handleLoadingState(!1)}}}},{key:"_searchChoices",value:function(e){var t=(0,p.isType)("String",e)?e.trim():e,i=(0,p.isType)("String",this._currentValue)?this._currentValue.trim():this._currentValue;if(t.length<1&&t==="".concat(i," "))return 0;var o=this._store.searchableChoices,r=t,s=[].concat(this.config.searchFields),a=Object.assign(this.config.fuseOptions,{keys:s}),c=new n.default(o,a).search(r);return this._currentValue=t,this._highlightPosition=0,this._isSearching=!0,this._store.dispatch((0,l.filterChoices)(c)),c.length}},{key:"_addEventListeners",value:function(){document.addEventListener("keyup",this._onKeyUp),document.addEventListener("keydown",this._onKeyDown),document.addEventListener("click",this._onClick),document.addEventListener("touchmove",this._onTouchMove),document.addEventListener("touchend",this._onTouchEnd),document.addEventListener("mousedown",this._onMouseDown),document.addEventListener("mouseover",this._onMouseOver),this._isSelectOneElement&&(this.containerOuter.element.addEventListener("focus",this._onFocus),this.containerOuter.element.addEventListener("blur",this._onBlur)),this.input.element.addEventListener("focus",this._onFocus),this.input.element.addEventListener("blur",this._onBlur),this.input.element.form&&this.input.element.form.addEventListener("reset",this._onFormReset),this.input.addEventListeners()}},{key:"_removeEventListeners",value:function(){document.removeEventListener("keyup",this._onKeyUp),document.removeEventListener("keydown",this._onKeyDown),document.removeEventListener("click",this._onClick),document.removeEventListener("touchmove",this._onTouchMove),document.removeEventListener("touchend",this._onTouchEnd),document.removeEventListener("mousedown",this._onMouseDown),document.removeEventListener("mouseover",this._onMouseOver),this._isSelectOneElement&&(this.containerOuter.element.removeEventListener("focus",this._onFocus),this.containerOuter.element.removeEventListener("blur",this._onBlur)),this.input.element.removeEventListener("focus",this._onFocus),this.input.element.removeEventListener("blur",this._onBlur),this.input.element.form&&this.input.element.form.removeEventListener("reset",this._onFormReset),this.input.removeEventListeners()}},{key:"_onKeyDown",value:function(e){var t,i=e.target,n=e.keyCode,o=e.ctrlKey,r=e.metaKey;if(i===this.input.element||this.containerOuter.element.contains(i)){var s=this._store.activeItems,c=this.input.isFocussed,l=this.dropdown.isActive,u=this.itemList.hasChildren,h=String.fromCharCode(n),d=a.KEY_CODES.BACK_KEY,f=a.KEY_CODES.DELETE_KEY,p=a.KEY_CODES.ENTER_KEY,v=a.KEY_CODES.A_KEY,g=a.KEY_CODES.ESC_KEY,_=a.KEY_CODES.UP_KEY,y=a.KEY_CODES.DOWN_KEY,b=a.KEY_CODES.PAGE_UP_KEY,E=a.KEY_CODES.PAGE_DOWN_KEY,S=o||r;!this._isTextElement&&/[a-zA-Z0-9-_ ]/.test(h)&&this.showDropdown();var I=(m(t={},v,this._onAKey),m(t,p,this._onEnterKey),m(t,g,this._onEscapeKey),m(t,_,this._onDirectionKey),m(t,b,this._onDirectionKey),m(t,y,this._onDirectionKey),m(t,E,this._onDirectionKey),m(t,f,this._onDeleteKey),m(t,d,this._onDeleteKey),t);I[n]&&I[n]({event:e,target:i,keyCode:n,metaKey:r,activeItems:s,hasFocusedInput:c,hasActiveDropdown:l,hasItems:u,hasCtrlDownKeyPressed:S})}}},{key:"_onKeyUp",value:function(e){var t=e.target,i=e.keyCode;if(t===this.input.element){var n=this.input.value,o=this._store.activeItems,r=this._canAddItem(o,n),s=a.KEY_CODES.BACK_KEY,c=a.KEY_CODES.DELETE_KEY;if(this._isTextElement){if(r.notice&&n){var u=this._getTemplate("notice",r.notice);this.dropdown.element.innerHTML=u.outerHTML,this.showDropdown(!0)}else this.hideDropdown(!0)}else{var h=(i===s||i===c)&&!t.value,d=!this._isTextElement&&this._isSearching,f=this._canSearch&&r.response;h&&d?(this._isSearching=!1,this._store.dispatch((0,l.activateChoices)(!0))):f&&this._handleSearch(this.input.value)}this._canSearch=this.config.searchEnabled}}},{key:"_onAKey",value:function(e){var t=e.hasItems;e.hasCtrlDownKeyPressed&&t&&(this._canSearch=!1,this.config.removeItems&&!this.input.value&&this.input.element===document.activeElement&&this.highlightAll())}},{key:"_onEnterKey",value:function(e){var t=e.event,i=e.target,n=e.activeItems,o=e.hasActiveDropdown,r=a.KEY_CODES.ENTER_KEY,s=i.hasAttribute("data-button");if(this._isTextElement&&i.value){var c=this.input.value;this._canAddItem(n,c).response&&(this.hideDropdown(!0),this._addItem({value:c}),this._triggerChange(c),this.clearInput())}if(s&&(this._handleButtonAction(n,i),t.preventDefault()),o){var l=this.dropdown.getChild(".".concat(this.config.classNames.highlightedState));l&&(n[0]&&(n[0].keyCode=r),this._handleChoiceAction(n,l)),t.preventDefault()}else this._isSelectOneElement&&(this.showDropdown(),t.preventDefault())}},{key:"_onEscapeKey",value:function(e){e.hasActiveDropdown&&(this.hideDropdown(!0),this.containerOuter.focus())}},{key:"_onDirectionKey",value:function(e){var t=e.event,i=e.hasActiveDropdown,n=e.keyCode,o=e.metaKey,r=a.KEY_CODES.DOWN_KEY,s=a.KEY_CODES.PAGE_UP_KEY,c=a.KEY_CODES.PAGE_DOWN_KEY;if(i||this._isSelectOneElement){this.showDropdown(),this._canSearch=!1;var l,u=n===r||n===c?1:-1;if(o||n===c||n===s)l=u>0?Array.from(this.dropdown.element.querySelectorAll("[data-choice-selectable]")).pop():this.dropdown.element.querySelector("[data-choice-selectable]");else{var h=this.dropdown.element.querySelector(".".concat(this.config.classNames.highlightedState));l=h?(0,p.getAdjacentEl)(h,"[data-choice-selectable]",u):this.dropdown.element.querySelector("[data-choice-selectable]")}l&&((0,p.isScrolledIntoView)(l,this.choiceList.element,u)||this.choiceList.scrollToChoice(l,u),this._highlightChoice(l)),t.preventDefault()}}},{key:"_onDeleteKey",value:function(e){var t=e.event,i=e.target,n=e.hasFocusedInput,o=e.activeItems;!n||i.value||this._isSelectOneElement||(this._handleBackspace(o),t.preventDefault())}},{key:"_onTouchMove",value:function(){this._wasTap&&(this._wasTap=!1)}},{key:"_onTouchEnd",value:function(e){var t=(e||e.touches[0]).target;this._wasTap&&this.containerOuter.element.contains(t)&&((t===this.containerOuter.element||t===this.containerInner.element)&&(this._isTextElement?this.input.focus():this._isSelectMultipleElement&&this.showDropdown()),e.stopPropagation());this._wasTap=!0}},{key:"_onMouseDown",value:function(e){var t=e.target,i=e.shiftKey;if(this.choiceList.element.contains(t)&&(0,p.isIE11)()&&(this._isScrollingOnIe=!0),this.containerOuter.element.contains(t)&&t!==this.input.element){var n=this._store.activeItems,o=i,r=(0,p.findAncestorByAttrName)(t,"data-button"),s=(0,p.findAncestorByAttrName)(t,"data-item"),a=(0,p.findAncestorByAttrName)(t,"data-choice");r?this._handleButtonAction(n,r):s?this._handleItemAction(n,s,o):a&&this._handleChoiceAction(n,a),e.preventDefault()}}},{key:"_onMouseOver",value:function(e){var t=e.target;(t===this.dropdown||this.dropdown.element.contains(t))&&t.hasAttribute("data-choice")&&this._highlightChoice(t)}},{key:"_onClick",value:function(e){var t=e.target;this.containerOuter.element.contains(t)?this.dropdown.isActive||this.containerOuter.isDisabled?this._isSelectOneElement&&t!==this.input.element&&!this.dropdown.element.contains(t)&&this.hideDropdown():this._isTextElement?document.activeElement!==this.input.element&&this.input.focus():(this.showDropdown(),this.containerOuter.focus()):(this._store.highlightedActiveItems&&this.unhighlightAll(),this.containerOuter.removeFocusState(),this.hideDropdown(!0))}},{key:"_onFocus",value:function(e){var t=this,i=e.target;this.containerOuter.element.contains(i)&&{text:function(){i===t.input.element&&t.containerOuter.addFocusState()},"select-one":function(){t.containerOuter.addFocusState(),i===t.input.element&&t.showDropdown(!0)},"select-multiple":function(){i===t.input.element&&(t.showDropdown(!0),t.containerOuter.addFocusState())}}[this.passedElement.element.type]()}},{key:"_onBlur",value:function(e){var t=this,i=e.target;if(this.containerOuter.element.contains(i)&&!this._isScrollingOnIe){var n=this._store.activeItems.some(function(e){return e.highlighted});({text:function(){i===t.input.element&&(t.containerOuter.removeFocusState(),n&&t.unhighlightAll(),t.hideDropdown(!0))},"select-one":function(){t.containerOuter.removeFocusState(),(i===t.input.element||i===t.containerOuter.element&&!t._canSearch)&&t.hideDropdown(!0)},"select-multiple":function(){i===t.input.element&&(t.containerOuter.removeFocusState(),t.hideDropdown(!0),n&&t.unhighlightAll())}})[this.passedElement.element.type]()}else this._isScrollingOnIe=!1,this.input.element.focus()}},{key:"_onFormReset",value:function(){this._store.dispatch((0,d.resetTo)(this._initialState))}},{key:"_highlightChoice",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,i=Array.from(this.dropdown.element.querySelectorAll("[data-choice-selectable]"));if(i.length){var n=t;Array.from(this.dropdown.element.querySelectorAll(".".concat(this.config.classNames.highlightedState))).forEach(function(t){t.classList.remove(e.config.classNames.highlightedState),t.setAttribute("aria-selected","false")}),n?this._highlightPosition=i.indexOf(n):(n=i.length>this._highlightPosition?i[this._highlightPosition]:i[i.length-1])||(n=i[0]),n.classList.add(this.config.classNames.highlightedState),n.setAttribute("aria-selected","true"),this.passedElement.triggerEvent(a.EVENTS.highlightChoice,{el:n}),this.dropdown.isActive&&(this.input.setActiveDescendant(n.id),this.containerOuter.setActiveDescendant(n.id))}}},{key:"_addItem",value:function(e){var t=e.value,i=e.label,n=void 0===i?null:i,o=e.choiceId,r=void 0===o?-1:o,s=e.groupId,c=void 0===s?-1:s,l=e.customProperties,h=void 0===l?null:l,d=e.placeholder,f=void 0!==d&&d,v=e.keyCode,m=void 0===v?null:v,g=(0,p.isType)("String",t)?t.trim():t,_=m,y=h,b=this._store.items,E=n||g,S=parseInt(r,10)||-1,I=c>=0?this._store.getGroupById(c):null,O=b?b.length+1:1;return this.config.prependValue&&(g=this.config.prependValue+g.toString()),this.config.appendValue&&(g+=this.config.appendValue.toString()),this._store.dispatch((0,u.addItem)({value:g,label:E,id:O,choiceId:S,groupId:c,customProperties:h,placeholder:f,keyCode:_})),this._isSelectOneElement&&this.removeActiveItems(O),this.passedElement.triggerEvent(a.EVENTS.addItem,{id:O,value:g,label:E,customProperties:y,groupValue:I&&I.value?I.value:void 0,keyCode:_}),this}},{key:"_removeItem",value:function(e){if(!e||!(0,p.isType)("Object",e))return this;var t=e.id,i=e.value,n=e.label,o=e.choiceId,r=e.groupId,s=r>=0?this._store.getGroupById(r):null;return this._store.dispatch((0,u.removeItem)(t,o)),s&&s.value?this.passedElement.triggerEvent(a.EVENTS.removeItem,{id:t,value:i,label:n,groupValue:s.value}):this.passedElement.triggerEvent(a.EVENTS.removeItem,{id:t,value:i,label:n}),this}},{key:"_addChoice",value:function(e){var t=e.value,i=e.label,n=void 0===i?null:i,o=e.isSelected,r=void 0!==o&&o,s=e.isDisabled,a=void 0!==s&&s,c=e.groupId,u=void 0===c?-1:c,h=e.customProperties,d=void 0===h?null:h,f=e.placeholder,p=void 0!==f&&f,v=e.keyCode,m=void 0===v?null:v;if(null!=t){var g=this._store.choices,_=n||t,y=g?g.length+1:1,b="".concat(this._baseId,"-").concat(this._idNames.itemChoice,"-").concat(y);this._store.dispatch((0,l.addChoice)({value:t,label:_,id:y,groupId:u,disabled:a,elementId:b,customProperties:d,placeholder:p,keyCode:m})),r&&this._addItem({value:t,label:_,choiceId:y,customProperties:d,placeholder:p,keyCode:m})}}},{key:"_addGroup",value:function(e){var t=this,i=e.group,n=e.id,o=e.valueKey,r=void 0===o?"value":o,s=e.labelKey,a=void 0===s?"label":s,c=(0,p.isType)("Object",i)?i.choices:Array.from(i.getElementsByTagName("OPTION")),l=n||Math.floor((new Date).valueOf()*Math.random()),u=!!i.disabled&&i.disabled;if(c){this._store.dispatch((0,h.addGroup)(i.label,l,!0,u));c.forEach(function(e){var i=e.disabled||e.parentNode&&e.parentNode.disabled;t._addChoice({value:e[r],label:(0,p.isType)("Object",e)?e[a]:e.innerHTML,isSelected:e.selected,isDisabled:i,groupId:l,customProperties:e.customProperties,placeholder:e.placeholder})})}else this._store.dispatch((0,h.addGroup)(i.label,i.id,!1,i.disabled))}},{key:"_getTemplate",value:function(e){var t;if(!e)return null;for(var i=this.config,n=i.templates,o=i.classNames,r=arguments.length,s=new Array(r>1?r-1:0),a=1;a<r;a++)s[a-1]=arguments[a];return(t=n[e]).call.apply(t,[this,o].concat(s))}},{key:"_createTemplates",value:function(){var e=this.config.callbackOnCreateTemplates,t={};e&&(0,p.isType)("Function",e)&&(t=e.call(this,p.strToEl)),this.config.templates=(0,o.default)(c.TEMPLATES,t)}},{key:"_createElements",value:function(){this.containerOuter=new s.Container({element:this._getTemplate("containerOuter",this._direction,this._isSelectElement,this._isSelectOneElement,this.config.searchEnabled,this.passedElement.element.type),classNames:this.config.classNames,type:this.passedElement.element.type,position:this.config.position}),this.containerInner=new s.Container({element:this._getTemplate("containerInner"),classNames:this.config.classNames,type:this.passedElement.element.type,position:this.config.position}),this.input=new s.Input({element:this._getTemplate("input"),classNames:this.config.classNames,type:this.passedElement.element.type}),this.choiceList=new s.List({element:this._getTemplate("choiceList",this._isSelectOneElement)}),this.itemList=new s.List({element:this._getTemplate("itemList",this._isSelectOneElement)}),this.dropdown=new s.Dropdown({element:this._getTemplate("dropdown"),classNames:this.config.classNames,type:this.passedElement.element.type})}},{key:"_createStructure",value:function(){this.passedElement.conceal(),this.containerInner.wrap(this.passedElement.element),this.containerOuter.wrap(this.containerInner.element),this._isSelectOneElement?this.input.placeholder=this.config.searchPlaceholderValue||"":this._placeholderValue&&(this.input.placeholder=this._placeholderValue,this.input.setWidth(!0)),this.containerOuter.element.appendChild(this.containerInner.element),this.containerOuter.element.appendChild(this.dropdown.element),this.containerInner.element.appendChild(this.itemList.element),this._isTextElement||this.dropdown.element.appendChild(this.choiceList.element),this._isSelectOneElement?this.config.searchEnabled&&this.dropdown.element.insertBefore(this.input.element,this.dropdown.element.firstChild):this.containerInner.element.appendChild(this.input.element),this._isSelectElement?this._addPredefinedChoices():this._isTextElement&&this._addPredefinedItems()}},{key:"_addPredefinedChoices",value:function(){var e=this,t=this.passedElement.optionGroups;if(this._highlightPosition=0,this._isSearching=!1,this._setLoading(!0),t&&t.length){var i=this.passedElement.placeholderOption;i&&"SELECT"===i.parentNode.tagName&&this._addChoice({value:i.value,label:i.innerHTML,isSelected:i.selected,isDisabled:i.disabled,placeholder:!0}),t.forEach(function(t){return e._addGroup({group:t,id:t.id||null})})}else{var n=this.passedElement.options,o=this.config.sortFn,r=this._presetChoices;n.forEach(function(e){r.push({value:e.value,label:e.innerHTML,selected:e.selected,disabled:e.disabled||e.parentNode.disabled,placeholder:e.hasAttribute("placeholder"),customProperties:e.getAttribute("data-custom-properties")})}),this.config.shouldSort&&r.sort(o);var s=r.some(function(e){return e.selected});r.forEach(function(t,i){return function(t,i){var n=t.value,o=t.label,r=t.customProperties,a=t.placeholder;if(e._isSelectElement)if(t.choices)e._addGroup({group:t,id:t.id||null});else{var c=e._isSelectOneElement&&!s&&0===i,l=!!c||t.selected,u=!c&&t.disabled;e._addChoice({value:n,label:o,isSelected:l,isDisabled:u,customProperties:r,placeholder:a})}else e._addChoice({value:n,label:o,isSelected:t.selected,isDisabled:t.disabled,customProperties:r,placeholder:a})}(t,i)})}this._setLoading(!1)}},{key:"_addPredefinedItems",value:function(){var e=this;this._presetItems.forEach(function(t){return function(t){var i=(0,p.getType)(t);"Object"===i&&t.value?e._addItem({value:t.value,label:t.label,choiceId:t.id,customProperties:t.customProperties,placeholder:t.placeholder}):"String"===i&&e._addItem({value:t})}(t)})}},{key:"_setChoiceOrItem",value:function(e){var t=this;({object:function(){e.value&&(t._isTextElement?t._addItem({value:e.value,label:e.label,choiceId:e.id,customProperties:e.customProperties,placeholder:e.placeholder}):t._addChoice({value:e.value,label:e.label,isSelected:!0,isDisabled:!1,customProperties:e.customProperties,placeholder:e.placeholder}))},string:function(){t._isTextElement?t._addItem({value:e}):t._addChoice({value:e,label:e,isSelected:!0,isDisabled:!1})}})[(0,p.getType)(e).toLowerCase()]()}},{key:"_findAndSelectChoiceByValue",value:function(e){var t=this,i=this._store.choices.find(function(i){return t.config.itemComparer(i.value,e)});i&&!i.selected&&this._addItem({value:i.value,label:i.label,choiceId:i.id,groupId:i.groupId,customProperties:i.customProperties,placeholder:i.placeholder,keyCode:i.keyCode})}},{key:"_generateInstances",value:function(t,i){return t.reduce(function(t,n){return t.push(new e(n,i)),t},[this])}},{key:"_generatePlaceholderValue",value:function(){return!this._isSelectOneElement&&(!!this.config.placeholder&&(this.config.placeholderValue||this.passedElement.element.getAttribute("placeholder")))}}])&&g(t.prototype,i),v&&g(t,v),e}();_.userDefaults={},e.exports=_},function(e,t,i){
/*!
 * Fuse.js v3.4.2 - Lightweight fuzzy-search (http://fusejs.io)
 * 
 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 */
var n;n=function(){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s="src/index.html")}({"./src/bitap/bitap_matched_indices.js":
/*!********************************************!*\
  !*** ./src/bitap/bitap_matched_indices.js ***!
  \********************************************/
/*! no static exports found */function(e,t){e.exports=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=[],n=-1,o=-1,r=0,s=e.length;r<s;r+=1){var a=e[r];a&&-1===n?n=r:a||-1===n||((o=r-1)-n+1>=t&&i.push([n,o]),n=-1)}return e[r-1]&&r-n>=t&&i.push([n,r-1]),i}},"./src/bitap/bitap_pattern_alphabet.js":
/*!*********************************************!*\
  !*** ./src/bitap/bitap_pattern_alphabet.js ***!
  \*********************************************/
/*! no static exports found */function(e,t){e.exports=function(e){for(var t={},i=e.length,n=0;n<i;n+=1)t[e.charAt(n)]=0;for(var o=0;o<i;o+=1)t[e.charAt(o)]|=1<<i-o-1;return t}},"./src/bitap/bitap_regex_search.js":
/*!*****************************************!*\
  !*** ./src/bitap/bitap_regex_search.js ***!
  \*****************************************/
/*! no static exports found */function(e,t){var i=/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;e.exports=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:/ +/g,o=new RegExp(t.replace(i,"\\$&").replace(n,"|")),r=e.match(o),s=!!r,a=[];if(s)for(var c=0,l=r.length;c<l;c+=1){var u=r[c];a.push([e.indexOf(u),u.length-1])}return{score:s?.5:1,isMatch:s,matchedIndices:a}}},"./src/bitap/bitap_score.js":
/*!**********************************!*\
  !*** ./src/bitap/bitap_score.js ***!
  \**********************************/
/*! no static exports found */function(e,t){e.exports=function(e,t){var i=t.errors,n=void 0===i?0:i,o=t.currentLocation,r=void 0===o?0:o,s=t.expectedLocation,a=void 0===s?0:s,c=t.distance,l=void 0===c?100:c,u=n/e.length,h=Math.abs(a-r);return l?u+h/l:h?1:u}},"./src/bitap/bitap_search.js":
/*!***********************************!*\
  !*** ./src/bitap/bitap_search.js ***!
  \***********************************/
/*! no static exports found */function(e,t,i){var n=i(/*! ./bitap_score */"src/bitap/bitap_score.html"),o=i(/*! ./bitap_matched_indices */"src/bitap/bitap_matched_indices.html");e.exports=function(e,t,i,r){for(var s=r.location,a=void 0===s?0:s,c=r.distance,l=void 0===c?100:c,u=r.threshold,h=void 0===u?.6:u,d=r.findAllMatches,f=void 0!==d&&d,p=r.minMatchCharLength,v=void 0===p?1:p,m=a,g=e.length,_=h,y=e.indexOf(t,m),b=t.length,E=[],S=0;S<g;S+=1)E[S]=0;if(-1!==y){var I=n(t,{errors:0,currentLocation:y,expectedLocation:m,distance:l});if(_=Math.min(I,_),-1!==(y=e.lastIndexOf(t,m+b))){var O=n(t,{errors:0,currentLocation:y,expectedLocation:m,distance:l});_=Math.min(O,_)}}y=-1;for(var C=[],T=1,w=b+g,k=1<<b-1,A=0;A<b;A+=1){for(var L=0,x=w;L<x;){n(t,{errors:A,currentLocation:m+x,expectedLocation:m,distance:l})<=_?L=x:w=x,x=Math.floor((w-L)/2+L)}w=x;var P=Math.max(1,m-x+1),D=f?g:Math.min(m+x,g)+b,j=Array(D+2);j[D+1]=(1<<A)-1;for(var M=D;M>=P;M-=1){var N=M-1,F=i[e.charAt(N)];if(F&&(E[N]=1),j[M]=(j[M+1]<<1|1)&F,0!==A&&(j[M]|=(C[M+1]|C[M])<<1|1|C[M+1]),j[M]&k&&(T=n(t,{errors:A,currentLocation:N,expectedLocation:m,distance:l}))<=_){if(_=T,(y=N)<=m)break;P=Math.max(1,2*m-y)}}if(n(t,{errors:A+1,currentLocation:m,expectedLocation:m,distance:l})>_)break;C=j}return{isMatch:y>=0,score:0===T?.001:T,matchedIndices:o(E,v)}}},"./src/bitap/index.js":
/*!****************************!*\
  !*** ./src/bitap/index.js ***!
  \****************************/
/*! no static exports found */function(e,t,i){function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var o=i(/*! ./bitap_regex_search */"src/bitap/bitap_regex_search.html"),r=i(/*! ./bitap_search */"src/bitap/bitap_search.html"),s=i(/*! ./bitap_pattern_alphabet */"src/bitap/bitap_pattern_alphabet.html"),a=function(){function e(t,i){var n=i.location,o=void 0===n?0:n,r=i.distance,a=void 0===r?100:r,c=i.threshold,l=void 0===c?.6:c,u=i.maxPatternLength,h=void 0===u?32:u,d=i.isCaseSensitive,f=void 0!==d&&d,p=i.tokenSeparator,v=void 0===p?/ +/g:p,m=i.findAllMatches,g=void 0!==m&&m,_=i.minMatchCharLength,y=void 0===_?1:_;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:o,distance:a,threshold:l,maxPatternLength:h,isCaseSensitive:f,tokenSeparator:v,findAllMatches:g,minMatchCharLength:y},this.pattern=this.options.isCaseSensitive?t:t.toLowerCase(),this.pattern.length<=h&&(this.patternAlphabet=s(this.pattern))}var t,i,a;return t=e,(i=[{key:"search",value:function(e){if(this.options.isCaseSensitive||(e=e.toLowerCase()),this.pattern===e)return{isMatch:!0,score:0,matchedIndices:[[0,e.length-1]]};var t=this.options,i=t.maxPatternLength,n=t.tokenSeparator;if(this.pattern.length>i)return o(e,this.pattern,n);var s=this.options,a=s.location,c=s.distance,l=s.threshold,u=s.findAllMatches,h=s.minMatchCharLength;return r(e,this.pattern,this.patternAlphabet,{location:a,distance:c,threshold:l,findAllMatches:u,minMatchCharLength:h})}}])&&n(t.prototype,i),a&&n(t,a),e}();e.exports=a},"./src/helpers/deep_value.js":
/*!***********************************!*\
  !*** ./src/helpers/deep_value.js ***!
  \***********************************/
/*! no static exports found */function(e,t,i){var n=i(/*! ./is_array */"src/helpers/is_array.html");e.exports=function(e,t){return function e(t,i,o){if(i){var r=i.indexOf("."),s=i,a=null;-1!==r&&(s=i.slice(0,r),a=i.slice(r+1));var c=t[s];if(null!=c)if(a||"string"!=typeof c&&"number"!=typeof c)if(n(c))for(var l=0,u=c.length;l<u;l+=1)e(c[l],a,o);else a&&e(c,a,o);else o.push(c.toString())}else o.push(t);return o}(e,t,[])}},"./src/helpers/is_array.js":
/*!*********************************!*\
  !*** ./src/helpers/is_array.js ***!
  \*********************************/
/*! no static exports found */function(e,t){e.exports=function(e){return Array.isArray?Array.isArray(e):"[object Array]"===Object.prototype.toString.call(e)}},"./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */function(e,t,i){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var r=i(/*! ./bitap */"src/bitap/index.html"),s=i(/*! ./helpers/deep_value */"src/helpers/deep_value.html"),a=i(/*! ./helpers/is_array */"src/helpers/is_array.html"),c=function(){function e(t,i){var n=i.location,o=void 0===n?0:n,r=i.distance,a=void 0===r?100:r,c=i.threshold,l=void 0===c?.6:c,u=i.maxPatternLength,h=void 0===u?32:u,d=i.caseSensitive,f=void 0!==d&&d,p=i.tokenSeparator,v=void 0===p?/ +/g:p,m=i.findAllMatches,g=void 0!==m&&m,_=i.minMatchCharLength,y=void 0===_?1:_,b=i.id,E=void 0===b?null:b,S=i.keys,I=void 0===S?[]:S,O=i.shouldSort,C=void 0===O||O,T=i.getFn,w=void 0===T?s:T,k=i.sortFn,A=void 0===k?function(e,t){return e.score-t.score}:k,L=i.tokenize,x=void 0!==L&&L,P=i.matchAllTokens,D=void 0!==P&&P,j=i.includeMatches,M=void 0!==j&&j,N=i.includeScore,F=void 0!==N&&N,K=i.verbose,R=void 0!==K&&K;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:o,distance:a,threshold:l,maxPatternLength:h,isCaseSensitive:f,tokenSeparator:v,findAllMatches:g,minMatchCharLength:y,id:E,keys:I,includeMatches:M,includeScore:F,shouldSort:C,getFn:w,sortFn:A,verbose:R,tokenize:x,matchAllTokens:D},this.setCollection(t)}var t,i,c;return t=e,(i=[{key:"setCollection",value:function(e){return this.list=e,e}},{key:"search",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{limit:!1};this._log('---------\nSearch pattern: "'.concat(e,'"'));var i=this._prepareSearchers(e),n=i.tokenSearchers,o=i.fullSearcher,r=this._search(n,o),s=r.weights,a=r.results;return this._computeScore(s,a),this.options.shouldSort&&this._sort(a),t.limit&&"number"==typeof t.limit&&(a=a.slice(0,t.limit)),this._format(a)}},{key:"_prepareSearchers",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=[];if(this.options.tokenize)for(var i=e.split(this.options.tokenSeparator),n=0,o=i.length;n<o;n+=1)t.push(new r(i[n],this.options));return{tokenSearchers:t,fullSearcher:new r(e,this.options)}}},{key:"_search",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,i=this.list,n={},o=[];if("string"==typeof i[0]){for(var r=0,s=i.length;r<s;r+=1)this._analyze({key:"",value:i[r],record:r,index:r},{resultMap:n,results:o,tokenSearchers:e,fullSearcher:t});return{weights:null,results:o}}for(var a={},c=0,l=i.length;c<l;c+=1)for(var u=i[c],h=0,d=this.options.keys.length;h<d;h+=1){var f=this.options.keys[h];if("string"!=typeof f){if(a[f.name]={weight:1-f.weight||1},f.weight<=0||f.weight>1)throw new Error("Key weight has to be > 0 and <= 1");f=f.name}else a[f]={weight:1};this._analyze({key:f,value:this.options.getFn(u,f),record:u,index:c},{resultMap:n,results:o,tokenSearchers:e,fullSearcher:t})}return{weights:a,results:o}}},{key:"_analyze",value:function(e,t){var i=e.key,n=e.arrayIndex,o=void 0===n?-1:n,r=e.value,s=e.record,c=e.index,l=t.tokenSearchers,u=void 0===l?[]:l,h=t.fullSearcher,d=void 0===h?[]:h,f=t.resultMap,p=void 0===f?{}:f,v=t.results,m=void 0===v?[]:v;if(null!=r){var g=!1,_=-1,y=0;if("string"==typeof r){this._log("\nKey: ".concat(""===i?"-":i));var b=d.search(r);if(this._log('Full text: "'.concat(r,'", score: ').concat(b.score)),this.options.tokenize){for(var E=r.split(this.options.tokenSeparator),S=[],I=0;I<u.length;I+=1){var O=u[I];this._log('\nPattern: "'.concat(O.pattern,'"'));for(var C=!1,T=0;T<E.length;T+=1){var w=E[T],k=O.search(w),A={};k.isMatch?(A[w]=k.score,g=!0,C=!0,S.push(k.score)):(A[w]=1,this.options.matchAllTokens||S.push(1)),this._log('Token: "'.concat(w,'", score: ').concat(A[w]))}C&&(y+=1)}_=S[0];for(var L=S.length,x=1;x<L;x+=1)_+=S[x];_/=L,this._log("Token score average:",_)}var P=b.score;_>-1&&(P=(P+_)/2),this._log("Score average:",P);var D=!this.options.tokenize||!this.options.matchAllTokens||y>=u.length;if(this._log("\nCheck Matches: ".concat(D)),(g||b.isMatch)&&D){var j=p[c];j?j.output.push({key:i,arrayIndex:o,value:r,score:P,matchedIndices:b.matchedIndices}):(p[c]={item:s,output:[{key:i,arrayIndex:o,value:r,score:P,matchedIndices:b.matchedIndices}]},m.push(p[c]))}}else if(a(r))for(var M=0,N=r.length;M<N;M+=1)this._analyze({key:i,arrayIndex:M,value:r[M],record:s,index:c},{resultMap:p,results:m,tokenSearchers:u,fullSearcher:d})}}},{key:"_computeScore",value:function(e,t){this._log("\n\nComputing score:\n");for(var i=0,n=t.length;i<n;i+=1){for(var o=t[i].output,r=o.length,s=1,a=1,c=0;c<r;c+=1){var l=e?e[o[c].key].weight:1,u=(1===l?o[c].score:o[c].score||.001)*l;1!==l?a=Math.min(a,u):(o[c].nScore=u,s*=u)}t[i].score=1===a?s:a,this._log(t[i])}}},{key:"_sort",value:function(e){this._log("\n\nSorting...."),e.sort(this.options.sortFn)}},{key:"_format",value:function(e){var t=[];if(this.options.verbose){var i=[];this._log("\n\nOutput:\n\n",JSON.stringify(e,function(e,t){if("object"===n(t)&&null!==t){if(-1!==i.indexOf(t))return;i.push(t)}return t})),i=null}var o=[];this.options.includeMatches&&o.push(function(e,t){var i=e.output;t.matches=[];for(var n=0,o=i.length;n<o;n+=1){var r=i[n];if(0!==r.matchedIndices.length){var s={indices:r.matchedIndices,value:r.value};r.key&&(s.key=r.key),r.hasOwnProperty("arrayIndex")&&r.arrayIndex>-1&&(s.arrayIndex=r.arrayIndex),t.matches.push(s)}}}),this.options.includeScore&&o.push(function(e,t){t.score=e.score});for(var r=0,s=e.length;r<s;r+=1){var a=e[r];if(this.options.id&&(a.item=this.options.getFn(a.item,this.options.id)[0]),o.length){for(var c={item:a.item},l=0,u=o.length;l<u;l+=1)o[l](a,c);t.push(c)}else t.push(a.item)}return t}},{key:"_log",value:function(){var e;this.options.verbose&&(e=console).log.apply(e,arguments)}}])&&o(t.prototype,i),c&&o(t,c),e}();e.exports=c}})},e.exports=n()},function(e,t,i){"use strict";i.r(t);var n=function(e){return function(e){return!!e&&"object"==typeof e}(e)&&!function(e){var t=Object.prototype.toString.call(e);return"[object RegExp]"===t||"[object Date]"===t||function(e){return e.$$typeof===o}(e)}(e)};var o="function"==typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function r(e,t){return!1!==t.clone&&t.isMergeableObject(e)?a((i=e,Array.isArray(i)?[]:{}),e,t):e;var i}function s(e,t,i){return e.concat(t).map(function(e){return r(e,i)})}function a(e,t,i){(i=i||{}).arrayMerge=i.arrayMerge||s,i.isMergeableObject=i.isMergeableObject||n;var o=Array.isArray(t);return o===Array.isArray(e)?o?i.arrayMerge(e,t,i):function(e,t,i){var n={};return i.isMergeableObject(e)&&Object.keys(e).forEach(function(t){n[t]=r(e[t],i)}),Object.keys(t).forEach(function(o){i.isMergeableObject(t[o])&&e[o]?n[o]=a(e[o],t[o],i):n[o]=r(t[o],i)}),n}(e,t,i):r(t,i)}a.all=function(e,t){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce(function(e,i){return a(e,i,t)},{})};var c=a;t.default=c},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,o=i(6),r=(n=i(15))&&n.__esModule?n:{default:n};function s(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._store=(0,o.createStore)(r.default,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__())}var t,i,n;return t=e,(i=[{key:"subscribe",value:function(e){this._store.subscribe(e)}},{key:"dispatch",value:function(e){this._store.dispatch(e)}},{key:"isLoading",value:function(){return this.state.general.loading}},{key:"getChoiceById",value:function(e){return!!e&&this.activeChoices.find(function(t){return t.id===parseInt(e,10)})}},{key:"getGroupById",value:function(e){return this.groups.find(function(t){return t.id===parseInt(e,10)})}},{key:"state",get:function(){return this._store.getState()}},{key:"items",get:function(){return this.state.items}},{key:"activeItems",get:function(){return this.items.filter(function(e){return!0===e.active})}},{key:"highlightedActiveItems",get:function(){return this.items.filter(function(e){return e.active&&e.highlighted})}},{key:"choices",get:function(){return this.state.choices}},{key:"activeChoices",get:function(){return this.choices.filter(function(e){return!0===e.active})}},{key:"selectableChoices",get:function(){return this.choices.filter(function(e){return!0!==e.disabled})}},{key:"searchableChoices",get:function(){return this.selectableChoices.filter(function(e){return!0!==e.placeholder})}},{key:"placeholderChoice",get:function(){return[].concat(this.choices).reverse().find(function(e){return!0===e.placeholder})}},{key:"groups",get:function(){return this.state.groups}},{key:"activeGroups",get:function(){var e=this.groups,t=this.choices;return e.filter(function(e){var i=!0===e.active&&!1===e.disabled,n=t.some(function(e){return!0===e.active&&!1===e.disabled});return i&&n},[])}}])&&s(t.prototype,i),n&&s(t,n),e}();t.default=a},function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(6),o=l(i(16)),r=l(i(17)),s=l(i(18)),a=l(i(19)),c=i(0);function l(e){return e&&e.__esModule?e:{default:e}}var u=(0,n.combineReducers)({items:o.default,groups:r.default,choices:s.default,general:a.default}),h=function(e,t){var i=e;if("CLEAR_ALL"===t.type)i=void 0;else if("RESET_TO"===t.type)return(0,c.cloneObject)(t.state);return u(i,t)};t.default=h},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_ITEM":var i=[].concat(e,[{id:t.id,choiceId:t.choiceId,groupId:t.groupId,value:t.value,label:t.label,active:!0,highlighted:!1,customProperties:t.customProperties,placeholder:t.placeholder||!1,keyCode:null}]);return i.map(function(e){var t=e;return t.highlighted=!1,t});case"REMOVE_ITEM":return e.map(function(e){var i=e;return i.id===t.id&&(i.active=!1),i});case"HIGHLIGHT_ITEM":return e.map(function(e){var i=e;return i.id===t.id&&(i.highlighted=t.highlighted),i});default:return e}},t.defaultState=void 0;var n=[];t.defaultState=n},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_GROUP":return[].concat(e,[{id:t.id,value:t.value,active:t.active,disabled:t.disabled}]);case"CLEAR_CHOICES":return[];default:return e}},t.defaultState=void 0;var n=[];t.defaultState=n},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_CHOICE":return[].concat(e,[{id:t.id,elementId:t.elementId,groupId:t.groupId,value:t.value,label:t.label||t.value,disabled:t.disabled||!1,selected:!1,active:!0,score:9999,customProperties:t.customProperties,placeholder:t.placeholder||!1,keyCode:null}]);case"ADD_ITEM":return t.activateOptions?e.map(function(e){var i=e;return i.active=t.active,i}):t.choiceId>-1?e.map(function(e){var i=e;return i.id===parseInt(t.choiceId,10)&&(i.selected=!0),i}):e;case"REMOVE_ITEM":return t.choiceId>-1?e.map(function(e){var i=e;return i.id===parseInt(t.choiceId,10)&&(i.selected=!1),i}):e;case"FILTER_CHOICES":return e.map(function(e){var i=e;return i.active=t.results.some(function(e){var t=e.item,n=e.score;return t.id===i.id&&(i.score=n,!0)}),i});case"ACTIVATE_CHOICES":return e.map(function(e){var i=e;return i.active=t.active,i});case"CLEAR_CHOICES":return n;default:return e}},t.defaultState=void 0;var n=[];t.defaultState=n},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.defaultState=void 0;var n={loading:!1};t.defaultState=n;var o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_IS_LOADING":return{loading:t.isLoading};default:return e}};t.default=o},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Dropdown",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(t,"Container",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"Input",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(t,"List",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(t,"WrappedInput",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(t,"WrappedSelect",{enumerable:!0,get:function(){return c.default}});var n=l(i(21)),o=l(i(22)),r=l(i(23)),s=l(i(24)),a=l(i(25)),c=l(i(26));function l(e){return e&&e.__esModule?e:{default:e}}},function(e,t,i){"use strict";function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){function e(t){var i=t.element,n=t.type,o=t.classNames;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),Object.assign(this,{element:i,type:n,classNames:o}),this.isActive=!1}var t,i,o;return t=e,(i=[{key:"distanceFromTopWindow",value:function(){return this.dimensions=this.element.getBoundingClientRect(),this.position=Math.ceil(this.dimensions.top+window.pageYOffset+this.element.offsetHeight),this.position}},{key:"getChild",value:function(e){return this.element.querySelector(e)}},{key:"show",value:function(){return this.element.classList.add(this.classNames.activeState),this.element.setAttribute("aria-expanded","true"),this.isActive=!0,this}},{key:"hide",value:function(){return this.element.classList.remove(this.classNames.activeState),this.element.setAttribute("aria-expanded","false"),this.isActive=!1,this}}])&&n(t.prototype,i),o&&n(t,o),e}();t.default=o},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(0);function o(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var r=function(){function e(t){var i=t.element,n=t.type,o=t.classNames,r=t.position;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),Object.assign(this,{element:i,classNames:o,type:n,position:r}),this.isOpen=!1,this.isFlipped=!1,this.isFocussed=!1,this.isDisabled=!1,this.isLoading=!1,this._onFocus=this._onFocus.bind(this),this._onBlur=this._onBlur.bind(this)}var t,i,r;return t=e,(i=[{key:"addEventListeners",value:function(){this.element.addEventListener("focus",this._onFocus),this.element.addEventListener("blur",this._onBlur)}},{key:"removeEventListeners",value:function(){this.element.removeEventListener("focus",this._onFocus),this.element.removeEventListener("blur",this._onBlur)}},{key:"shouldFlip",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:(0,n.getWindowHeight)();if(void 0===e)return!1;var i=!1;return"auto"===this.position?i=e>=t:"top"===this.position&&(i=!0),i}},{key:"setActiveDescendant",value:function(e){this.element.setAttribute("aria-activedescendant",e)}},{key:"removeActiveDescendant",value:function(){this.element.removeAttribute("aria-activedescendant")}},{key:"open",value:function(e){this.element.classList.add(this.classNames.openState),this.element.setAttribute("aria-expanded","true"),this.isOpen=!0,this.shouldFlip(e)&&(this.element.classList.add(this.classNames.flippedState),this.isFlipped=!0)}},{key:"close",value:function(){this.element.classList.remove(this.classNames.openState),this.element.setAttribute("aria-expanded","false"),this.removeActiveDescendant(),this.isOpen=!1,this.isFlipped&&(this.element.classList.remove(this.classNames.flippedState),this.isFlipped=!1)}},{key:"focus",value:function(){this.isFocussed||this.element.focus()}},{key:"addFocusState",value:function(){this.element.classList.add(this.classNames.focusState)}},{key:"removeFocusState",value:function(){this.element.classList.remove(this.classNames.focusState)}},{key:"enable",value:function(){this.element.classList.remove(this.classNames.disabledState),this.element.removeAttribute("aria-disabled"),"select-one"===this.type&&this.element.setAttribute("tabindex","0"),this.isDisabled=!1}},{key:"disable",value:function(){this.element.classList.add(this.classNames.disabledState),this.element.setAttribute("aria-disabled","true"),"select-one"===this.type&&this.element.setAttribute("tabindex","-1"),this.isDisabled=!0}},{key:"wrap",value:function(e){(0,n.wrap)(e,this.element)}},{key:"unwrap",value:function(e){this.element.parentNode.insertBefore(e,this.element),this.element.parentNode.removeChild(this.element)}},{key:"addLoadingState",value:function(){this.element.classList.add(this.classNames.loadingState),this.element.setAttribute("aria-busy","true"),this.isLoading=!0}},{key:"removeLoadingState",value:function(){this.element.classList.remove(this.classNames.loadingState),this.element.removeAttribute("aria-busy"),this.isLoading=!1}},{key:"_onFocus",value:function(){this.isFocussed=!0}},{key:"_onBlur",value:function(){this.isFocussed=!1}}])&&o(t.prototype,i),r&&o(t,r),e}();t.default=r},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(0);function o(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var r=function(){function e(t){var i=t.element,n=t.type,o=t.classNames,r=t.placeholderValue;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),Object.assign(this,{element:i,type:n,classNames:o,placeholderValue:r}),this.element=i,this.classNames=o,this.isFocussed=this.element===document.activeElement,this.isDisabled=!1,this._onPaste=this._onPaste.bind(this),this._onInput=this._onInput.bind(this),this._onFocus=this._onFocus.bind(this),this._onBlur=this._onBlur.bind(this)}var t,i,r;return t=e,(i=[{key:"addEventListeners",value:function(){this.element.addEventListener("input",this._onInput),this.element.addEventListener("paste",this._onPaste),this.element.addEventListener("focus",this._onFocus),this.element.addEventListener("blur",this._onBlur),this.element.form&&this.element.form.addEventListener("reset",this._onFormReset)}},{key:"removeEventListeners",value:function(){this.element.removeEventListener("input",this._onInput),this.element.removeEventListener("paste",this._onPaste),this.element.removeEventListener("focus",this._onFocus),this.element.removeEventListener("blur",this._onBlur),this.element.form&&this.element.form.removeEventListener("reset",this._onFormReset)}},{key:"enable",value:function(){this.element.removeAttribute("disabled"),this.isDisabled=!1}},{key:"disable",value:function(){this.element.setAttribute("disabled",""),this.isDisabled=!0}},{key:"focus",value:function(){this.isFocussed||this.element.focus()}},{key:"blur",value:function(){this.isFocussed&&this.element.blur()}},{key:"clear",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return this.element.value&&(this.element.value=""),e&&this.setWidth(),this}},{key:"setWidth",value:function(e){var t=this,i=function(e){t.element.style.width=e};if(this._placeholderValue){var n=this.element.value.length>=this._placeholderValue.length/1.25;(this.element.value&&n||e)&&this.calcWidth(i)}else this.calcWidth(i)}},{key:"calcWidth",value:function(e){return(0,n.calcWidthOfInput)(this.element,e)}},{key:"setActiveDescendant",value:function(e){this.element.setAttribute("aria-activedescendant",e)}},{key:"removeActiveDescendant",value:function(){this.element.removeAttribute("aria-activedescendant")}},{key:"_onInput",value:function(){"select-one"!==this.type&&this.setWidth()}},{key:"_onPaste",value:function(e){e.target===this.element&&this.preventPaste&&e.preventDefault()}},{key:"_onFocus",value:function(){this.isFocussed=!0}},{key:"_onBlur",value:function(){this.isFocussed=!1}},{key:"placeholder",set:function(e){this.element.placeholder=e}},{key:"value",set:function(e){this.element.value=e},get:function(){return(0,n.sanitise)(this.element.value)}}])&&o(t.prototype,i),r&&o(t,r),e}();t.default=r},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(1);function o(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var r=function(){function e(t){var i=t.element;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),Object.assign(this,{element:i}),this.scrollPos=this.element.scrollTop,this.height=this.element.offsetHeight,this.hasChildren=!!this.element.children}var t,i,r;return t=e,(i=[{key:"clear",value:function(){this.element.innerHTML=""}},{key:"append",value:function(e){this.element.appendChild(e)}},{key:"getChild",value:function(e){return this.element.querySelector(e)}},{key:"scrollToTop",value:function(){this.element.scrollTop=0}},{key:"scrollToChoice",value:function(e,t){var i=this;if(e){var n=this.element.offsetHeight,o=e.offsetHeight,r=e.offsetTop+o,s=this.element.scrollTop+n,a=t>0?this.element.scrollTop+r-s:e.offsetTop;requestAnimationFrame(function(e){i._animateScroll(e,a,t)})}}},{key:"_scrollDown",value:function(e,t,i){var n=(i-e)/t,o=n>1?n:1;this.element.scrollTop=e+o}},{key:"_scrollUp",value:function(e,t,i){var n=(e-i)/t,o=n>1?n:1;this.element.scrollTop=e-o}},{key:"_animateScroll",value:function(e,t,i){var o=this,r=n.SCROLLING_SPEED,s=this.element.scrollTop,a=!1;i>0?(this._scrollDown(s,r,t),s<t&&(a=!0)):(this._scrollUp(s,r,t),s>t&&(a=!0)),a&&requestAnimationFrame(function(){o._animateScroll(e,t,i)})}}])&&o(t.prototype,i),r&&o(t,r),e}();t.default=r},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,o=(n=i(4))&&n.__esModule?n:{default:n};function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function a(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function c(e,t,i){return(c="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,i){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=l(e)););return e}(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(i):o.value}})(e,t,i||e)}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var h=function(e){function t(e){var i,n=e.element,o=e.classNames,r=e.delimiter;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(i=a(this,l(t).call(this,{element:n,classNames:o}))).delimiter=r,i}var i,n,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}(t,o.default),i=t,(n=[{key:"value",set:function(e){var t=e.map(function(e){return e.value}).join(this.delimiter);this.element.setAttribute("value",t),this.element.value=t},get:function(){return c(l(t.prototype),"value",this)}}])&&s(i.prototype,n),r&&s(i,r),t}();t.default=h},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(i(4)),o=r(i(5));function r(e){return e&&e.__esModule?e:{default:e}}function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function c(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var h=function(e){function t(e){var i=e.element,n=e.classNames;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),c(this,l(t).call(this,{element:i,classNames:n}))}var i,r,s;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}(t,n.default),i=t,(r=[{key:"appendDocFragment",value:function(e){this.element.innerHTML="",this.element.appendChild(e)}},{key:"placeholderOption",get:function(){return this.element.querySelector("option[placeholder]")}},{key:"optionGroups",get:function(){return Array.from(this.element.getElementsByTagName("OPTGROUP"))}},{key:"options",get:function(){return Array.from(this.element.options)},set:function(e){var t=document.createDocumentFragment();e.forEach(function(e){return i=e,n=o.default.option(i),void t.appendChild(n);var i,n}),this.appendDocFragment(t)}}])&&a(i.prototype,r),s&&a(i,s),t}();t.default=h},function(e,t,i){var n;
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
!function(){"use strict";var i={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=typeof n;if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)&&n.length){var s=o.apply(null,n);s&&e.push(s)}else if("object"===r)for(var a in n)i.call(n,a)&&n[a]&&e.push(a)}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(n=function(){return o}.apply(t,[]))||(e.exports=n)}()},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.clearChoices=t.activateChoices=t.filterChoices=t.addChoice=void 0;var n=i(1);t.addChoice=function(e){var t=e.value,i=e.label,o=e.id,r=e.groupId,s=e.disabled,a=e.elementId,c=e.customProperties,l=e.placeholder,u=e.keyCode;return{type:n.ACTION_TYPES.ADD_CHOICE,value:t,label:i,id:o,groupId:r,disabled:s,elementId:a,customProperties:c,placeholder:l,keyCode:u}};t.filterChoices=function(e){return{type:n.ACTION_TYPES.FILTER_CHOICES,results:e}};t.activateChoices=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return{type:n.ACTION_TYPES.ACTIVATE_CHOICES,active:e}};t.clearChoices=function(){return{type:n.ACTION_TYPES.CLEAR_CHOICES}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.highlightItem=t.removeItem=t.addItem=void 0;var n=i(1);t.addItem=function(e){var t=e.value,i=e.label,o=e.id,r=e.choiceId,s=e.groupId,a=e.customProperties,c=e.placeholder,l=e.keyCode;return{type:n.ACTION_TYPES.ADD_ITEM,value:t,label:i,id:o,choiceId:r,groupId:s,customProperties:a,placeholder:c,keyCode:l}};t.removeItem=function(e,t){return{type:n.ACTION_TYPES.REMOVE_ITEM,id:e,choiceId:t}};t.highlightItem=function(e,t){return{type:n.ACTION_TYPES.HIGHLIGHT_ITEM,id:e,highlighted:t}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.addGroup=void 0;var n=i(1);t.addGroup=function(e,t,i,o){return{type:n.ACTION_TYPES.ADD_GROUP,value:e,id:t,active:i,disabled:o}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.resetTo=t.clearAll=void 0;t.clearAll=function(){return{type:"CLEAR_ALL"}};t.resetTo=function(e){return{type:"RESET_TO",state:e}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.setIsLoading=void 0;t.setIsLoading=function(e){return{type:"SET_IS_LOADING",isLoading:e}}}])});