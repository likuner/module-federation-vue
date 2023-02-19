!(function (t, e) { typeof exports === 'object' && typeof module === 'object' ? module.exports = e() : typeof define === 'function' && define.amd ? define([], e) : typeof exports === 'object' ? exports.LazyImgEntry = e() : t.LazyImgEntry = e() }(globalThis, (() => (() => {
  const t = {
    557: (t, e, i) => {
      Object.defineProperty(e, '__esModule', { value: !0 }); const s = i(928); class r extends HTMLElement {
        constructor() { super(), this.loaded = !1, this.setImgSrc = (0, s.throttle)((() => { this.loaded || this.isInViewport && (this.img.setAttribute('src', this.getAttribute('src')), this.loaded = !0, this.removeScrollListener()) }), 300), this.createIntersectionObserver = () => { this.isSupportIntersectionObserver && new IntersectionObserver((([t], e) => { !this.loaded && t && t.isIntersecting && (this.img.setAttribute('src', this.getAttribute('src')), this.loaded = !0) }), { root: null, rootMargin: '0px', threshold: 0 }).observe(this) }, this.handleEmit = (t) => { this.dispatchEvent(new CustomEvent(t, { bubbles: !0, composed: !0, detail: { target: this, src: this.getAttribute('src') } })) }, this.handleLoad = () => { this.handleEmit('lazyload') }, this.handleError = () => { this.handleEmit('lazyerror') }, this.removeScrollListener = () => { window.removeEventListener('scroll', this.setImgSrc) }, this.shadow = this.attachShadow({ mode: 'open' }), this.shadow.innerHTML = '\n      <style>\n        :host{\n          display: inline-flex;\n          background: #F5F7FA;\n        }\n        img{\n          width: 100%;\n          height: 100%;\n        }\n      </style>\n    ', this.img = document.createElement('img'), this.img.setAttribute('alt', ' '), this.shadow.appendChild(this.img) }

        attributeChangedCallback(t, e, i) { e !== i && (['width', 'height'].includes(t) ? this.style.setProperty(t, (0, s.getValWithUnit)(i)) : t === 'src' ? this.loaded && this.img.setAttribute(t, i) : t === 'presrc' ? !this.loaded && this.img.setAttribute(t, i) : this.img.setAttribute(t, i)) }

        connectedCallback() { this.hasAttribute('width') || this.hasAttribute('height') || (this.style.setProperty('width', '300px'), this.style.setProperty('height', '200px')), this.img.onload = this.handleLoad, this.img.onerror = this.handleError, !this.isInViewport && this.hasAttribute('presrc') && this.img.setAttribute('src', this.getAttribute('presrc')), this.isSupportIntersectionObserver ? this.createIntersectionObserver() : (window.addEventListener('scroll', this.setImgSrc), this.setImgSrc()) }

        disconnectedCallback() { this.loaded || this.isSupportIntersectionObserver || this.removeScrollListener(), this.img.onload = null, this.img.onerror = null }

        get isInViewport() {
          const t = window.innerWidth || document.documentElement.clientWidth; const e = window.innerHeight || document.documentElement.clientHeight; const {
            top: i, bottom: s, left: r, right: n
          } = this.getBoundingClientRect(); return !(i > e || s < 0 || r > t || n < 0)
        }

        get isSupportIntersectionObserver() { return [IntersectionObserver, IntersectionObserverEntry].map(((t) => typeof t)).every(((t) => t === 'function')) }
      }r.observedAttributes = ['src', 'alt', 'presrc', 'width', 'height'], e.default = r
    },
    607(t, e, i) { const s = this && this.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(e, '__esModule', { value: !0 }), e.LazyImg = void 0; const r = s(i(557)); e.LazyImg = r.default, customElements.define('lazy-img', r.default) },
    928: (t, e) => { Object.defineProperty(e, '__esModule', { value: !0 }), e.throttle = e.getValWithUnit = void 0, e.getValWithUnit = function (t) { if (!t) return '0'; const e = t.toString(); return ['px', '%'].some(((t) => e.endsWith(t))) ? e : `${e}px` }, e.throttle = function (t, e = 300, i = !0) { const s = this; let r = null; let n = !1; return (...o) => { !n && i ? (t.apply(s, o), n = !0) : r || (r = setTimeout((() => { t.apply(s, o), r = null }), e)) } } }
  }; const e = {}; return (function i(s) { const r = e[s]; if (void 0 !== r) return r.exports; const n = e[s] = { exports: {} }; return t[s].call(n.exports, n, n.exports, i), n.exports }(607))
})())))
