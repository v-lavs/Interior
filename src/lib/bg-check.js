/* BackgroundCheck
   http://kennethcachia.com/background-check
   v1.2.2 */

!function (a, b) {
    "function" == typeof define && define.amd ? define(b) : a.BackgroundCheck = b(a)
}(this, function () {
    "use strict";

    function a(a) {
        if (void 0 === a || void 0 === a.targets) throw"Missing attributes";
        H.debug = d(a.debug, !1), H.debugOverlay = d(a.debugOverlay, !1), H.targets = g(a.targets), H.images = g(a.images || "img", !0), H.changeParent = d(a.changeParent, !1), H.threshold = d(a.threshold, 50), H.minComplexity = d(a.minComplexity, 30), H.minOverlap = d(a.minOverlap, 50), H.windowEvents = d(a.windowEvents, !0), H.maxDuration = d(a.maxDuration, 500), H.mask = d(a.mask, {
            r: 0,
            g: 255,
            b: 0
        }), H.classes = d(a.classes, {
            dark: "background--dark",
            light: "background--light",
            complex: "background--complex"
        }), void 0 === B && (h(), B && (C.style.position = "fixed", C.style.top = "0px", C.style.left = "0px", C.style.width = "100%", C.style.height = "100%", window.addEventListener(G, x.bind(null, function () {
            k(), w()
        })), window.addEventListener("scroll", x.bind(null, w)), k(), w()))
    }

    function b() {
        B = null, C = null, D = null, H = {}, E && clearTimeout(E)
    }

    function c(a) {
        z("debug") && console.log(a)
    }

    function d(a, b) {
        return e(a, typeof b), void 0 === a ? b : a
    }

    function e(a, b) {
        if (void 0 !== a && typeof a !== b) throw"Incorrect attribute type"
    }

    function f(a) {
        for (var b, d, e = [], f = 0; f < a.length; f++) if (b = a[f], e.push(b), "IMG" !== b.tagName) {
            if (d = window.getComputedStyle(b).backgroundImage, d.split(/,url|, url/).length > 1) throw"Multiple backgrounds are not supported";
            if (!d || "none" === d) throw"Element is not an <img> but does not have a background-image";
            e[f] = {
                img: new Image,
                el: e[f]
            }, d = d.slice(4, -1), d = d.replace(/"/g, ""), e[f].img.src = d, c("CSS Image - " + d)
        }
        return e
    }

    function g(a, b) {
        var c = a;
        if ("string" == typeof a ? c = document.querySelectorAll(a) : a && 1 === a.nodeType && (c = [a]), !c || 0 === c.length || void 0 === c.length) throw"Elements not found";
        return b && (c = f(c)), c = Array.prototype.slice.call(c)
    }

    function h() {
        C = document.createElement("canvas"), C && C.getContext ? (D = C.getContext("2d"), B = !0) : B = !1, i()
    }

    function i() {
        z("debugOverlay") ? (C.style.opacity = .5, C.style.pointerEvents = "none", document.body.appendChild(C)) : C.parentNode && C.parentNode.removeChild(C)
    }

    function j(a) {
        var d = (new Date).getTime() - a;
        c("Duration: " + d + "ms"), d > z("maxDuration") && (console.log("BackgroundCheck - Killed"), q(), b())
    }

    function k() {
        F = {
            left: 0,
            top: 0,
            right: document.body.clientWidth,
            bottom: window.innerHeight
        }, C.width = document.body.clientWidth, C.height = window.innerHeight
    }

    function l(a, b, c) {
        var d, e;
        return -1 !== a.indexOf("px") ? d = parseFloat(a) : -1 !== a.indexOf("%") ? (d = parseFloat(a), e = d / 100, d = e * b, c && (d -= c * e)) : d = b, d
    }

    function m(a) {
        var b = window.getComputedStyle(a.el);
        a.el.style.backgroundRepeat = "no-repeat", a.el.style.backgroundOrigin = "padding-box";
        var c = b.backgroundSize.split(" "), d = c[0], e = void 0 === c[1] ? "auto" : c[1],
            f = a.el.clientWidth / a.el.clientHeight, g = a.img.naturalWidth / a.img.naturalHeight;
        "cover" === d ? f >= g ? (d = "100%", e = "auto") : (d = "auto", c[0] = "auto", e = "100%") : "contain" === d && (1 / g > 1 / f ? (d = "auto", c[0] = "auto", e = "100%") : (d = "100%", e = "auto")), d = "auto" === d ? a.img.naturalWidth : l(d, a.el.clientWidth), e = "auto" === e ? d / a.img.naturalWidth * a.img.naturalHeight : l(e, a.el.clientHeight), "auto" === c[0] && "auto" !== c[1] && (d = e / a.img.naturalHeight * a.img.naturalWidth);
        var h = b.backgroundPosition;
        "top" === h ? h = "50% 0%" : "left" === h ? h = "0% 50%" : "right" === h ? h = "100% 50%" : "bottom" === h ? h = "50% 100%" : "center" === h && (h = "50% 50%"), h = h.split(" ");
        var i, j;
        return 4 === h.length ? (i = h[1], j = h[3]) : (i = h[0], j = h[1]), j = j || "50%", i = l(i, a.el.clientWidth, d), j = l(j, a.el.clientHeight, e), 4 === h.length && ("right" === h[0] && (i = a.el.clientWidth - a.img.naturalWidth - i), "bottom" === h[2] && (j = a.el.clientHeight - a.img.naturalHeight - j)), i += a.el.getBoundingClientRect().left, j += a.el.getBoundingClientRect().top, {
            left: Math.floor(i),
            right: Math.floor(i + d),
            top: Math.floor(j),
            bottom: Math.floor(j + e),
            width: Math.floor(d),
            height: Math.floor(e)
        }
    }

    function n(a) {
        var b, c, d;
        if (a.nodeType) {
            var e = a.getBoundingClientRect();
            b = {
                left: e.left,
                right: e.right,
                top: e.top,
                bottom: e.bottom,
                width: e.width,
                height: e.height
            }, d = a.parentNode, c = a
        } else b = m(a), d = a.el, c = a.img;
        d = d.getBoundingClientRect(), b.imageTop = 0, b.imageLeft = 0, b.imageWidth = c.naturalWidth, b.imageHeight = c.naturalHeight;
        var f, g = b.imageHeight / b.height;
        return b.top < d.top && (f = d.top - b.top, b.imageTop = g * f, b.imageHeight -= g * f, b.top += f, b.height -= f), b.left < d.left && (f = d.left - b.left, b.imageLeft += g * f, b.imageWidth -= g * f, b.width -= f, b.left += f), b.bottom > d.bottom && (f = b.bottom - d.bottom, b.imageHeight -= g * f, b.height -= f), b.right > d.right && (f = b.right - d.right, b.imageWidth -= g * f, b.width -= f), b.imageTop = Math.floor(b.imageTop), b.imageLeft = Math.floor(b.imageLeft), b.imageHeight = Math.floor(b.imageHeight), b.imageWidth = Math.floor(b.imageWidth), b
    }

    function o(a) {
        var b = n(a);
        a = a.nodeType ? a : a.img, b.imageWidth > 0 && b.imageHeight > 0 && b.width > 0 && b.height > 0 ? D.drawImage(a, b.imageLeft, b.imageTop, b.imageWidth, b.imageHeight, b.left, b.top, b.width, b.height) : c("Skipping image - " + a.src + " - area too small")
    }

    function p(a, b, c) {
        var d = a.className;
        switch (c) {
            case"add":
                d += " " + b;
                break;
            case"remove":
                var e = new RegExp("(?:^|\\s)" + b + "(?!\\S)", "g");
                d = d.replace(e, "")
        }
        a.className = d.trim()
    }

    function q(a) {
        for (var b, c = a ? [a] : z("targets"), d = 0; d < c.length; d++) b = c[d], b = z("changeParent") ? b.parentNode : b, p(b, z("classes").light, "remove"), p(b, z("classes").dark, "remove"), p(b, z("classes").complex, "remove")
    }

    function r(a) {
        var b, d, e, f, g = a.getBoundingClientRect(), h = 0, i = 0, j = 0, k = 0, l = z("mask");
        if (g.width > 0 && g.height > 0) {
            q(a), a = z("changeParent") ? a.parentNode : a, d = D.getImageData(g.left, g.top, g.width, g.height).data;
            for (var m = 0; m < d.length; m += 4) d[m] === l.r && d[m + 1] === l.g && d[m + 2] === l.b ? k++ : (h++, b = .2126 * d[m] + .7152 * d[m + 1] + .0722 * d[m + 2], e = b - j, i += e * e, j += e / h);
            k <= d.length / 4 * (1 - z("minOverlap") / 100) && (f = Math.sqrt(i / h) / 255, j /= 255, c("Target: " + a.className + " lum: " + j + " var: " + f), p(a, j <= z("threshold") / 100 ? z("classes").dark : z("classes").light, "add"), f > z("minComplexity") / 100 && p(a, z("classes").complex, "add"))
        }
    }

    function s(a, b) {
        return a = (a.nodeType ? a : a.el).getBoundingClientRect(), b = b === F ? b : (b.nodeType ? b : b.el).getBoundingClientRect(), !(a.right < b.left || a.left > b.right || a.top > b.bottom || a.bottom < b.top)
    }

    function t(a) {
        for (var b, c = (new Date).getTime(), d = a && ("IMG" === a.tagName || a.img) ? "image" : "targets", e = a ? !1 : !0, f = z("targets").length, g = 0; f > g; g++) b = z("targets")[g], s(b, F) && ("targets" !== d || a && a !== b ? "image" === d && s(b, a) && r(b) : (e = !0, r(b)));
        if ("targets" === d && !e) throw a + " is not a target";
        j(c)
    }

    function u(a) {
        var b = function (a) {
            var b = 0;
            return "static" !== window.getComputedStyle(a).position && (b = parseInt(window.getComputedStyle(a).zIndex, 10) || 0, b >= 0 && b++), b
        }, c = a.parentNode, d = c ? b(c) : 0, e = b(a);
        return 1e5 * d + e
    }

    function v(a) {
        var b = !1;
        return a.sort(function (a, c) {
            a = a.nodeType ? a : a.el, c = c.nodeType ? c : c.el;
            var d = a.compareDocumentPosition(c), e = 0;
            return a = u(a), c = u(c), a > c && (b = !0), a === c && 2 === d ? e = 1 : a === c && 4 === d && (e = -1), e || a - c
        }), c("Sorted: " + b), b && c(a), b
    }

    function w(a, b, d) {
        if (B) {
            var e = z("mask");
            c("--- BackgroundCheck ---"), c("onLoad event: " + (d && d.src)), b !== !0 && (D.clearRect(0, 0, C.width, C.height), D.fillStyle = "rgb(" + e.r + ", " + e.g + ", " + e.b + ")", D.fillRect(0, 0, C.width, C.height));
            for (var f, g, h = d ? [d] : z("images"), i = v(h), j = !1, k = 0; k < h.length; k++) f = h[k], s(f, F) && (g = f.nodeType ? f : f.img, 0 === g.naturalWidth ? (j = !0, c("Loading... " + f.src), g.removeEventListener("load", w), i ? g.addEventListener("load", w.bind(null, null, !1, null)) : g.addEventListener("load", w.bind(null, a, !0, f))) : (c("Drawing: " + f.src), o(f)));
            d || j ? d && t(d) : t(a)
        }
    }

    function x(a) {
        z("windowEvents") === !0 && (E && clearTimeout(E), E = setTimeout(a, 200))
    }

    function y(a, b) {
        if (void 0 === H[a]) throw"Unknown property - " + a;
        if (void 0 === b) throw"Missing value for " + a;
        if ("targets" === a || "images" === a) try {
            b = g("images" !== a || b ? b : "img", "images" === a ? !0 : !1)
        } catch (c) {
            throw b = [], c
        } else e(b, typeof H[a]);
        q(), H[a] = b, w(), "debugOverlay" === a && i()
    }

    function z(a) {
        if (void 0 === H[a]) throw"Unknown property - " + a;
        return H[a]
    }

    function A() {
        for (var a, b = z("images"), c = [], d = 0; d < b.length; d++) a = n(b[d]), c.push(a);
        return c
    }

    var B, C, D, E, F, G = void 0 !== window.orientation ? "orientationchange" : "resize", H = {};
    return {init: a, destroy: b, refresh: w, set: y, get: z, getImageData: A}
});