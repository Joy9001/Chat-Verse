;(() => {
	'use strict'
	function t(e) {
		return (
			(t =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (t) {
							return typeof t
						}
					: function (t) {
							return t &&
								'function' == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? 'symbol'
								: typeof t
						}),
			t(e)
		)
	}
	function e() {
		e = function () {
			return n
		}
		var r,
			n = {},
			o = Object.prototype,
			i = o.hasOwnProperty,
			a =
				Object.defineProperty ||
				function (t, e, r) {
					t[e] = r.value
				},
			c = 'function' == typeof Symbol ? Symbol : {},
			u = c.iterator || '@@iterator',
			l = c.asyncIterator || '@@asyncIterator',
			s = c.toStringTag || '@@toStringTag'
		function f(t, e, r) {
			return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]
		}
		try {
			f({}, '')
		} catch (r) {
			f = function (t, e, r) {
				return (t[e] = r)
			}
		}
		function h(t, e, r, n) {
			var o = e && e.prototype instanceof w ? e : w,
				i = Object.create(o.prototype),
				c = new N(n || [])
			return a(i, '_invoke', { value: k(t, r, c) }), i
		}
		function y(t, e, r) {
			try {
				return { type: 'normal', arg: t.call(e, r) }
			} catch (t) {
				return { type: 'throw', arg: t }
			}
		}
		n.wrap = h
		var p = 'suspendedStart',
			d = 'suspendedYield',
			v = 'executing',
			m = 'completed',
			g = {}
		function w() {}
		function b() {}
		function L() {}
		var x = {}
		f(x, u, function () {
			return this
		})
		var E = Object.getPrototypeOf,
			S = E && E(E(G([])))
		S && S !== o && i.call(S, u) && (x = S)
		var O = (L.prototype = w.prototype = Object.create(x))
		function j(t) {
			;['next', 'throw', 'return'].forEach(function (e) {
				f(t, e, function (t) {
					return this._invoke(e, t)
				})
			})
		}
		function _(e, r) {
			function n(o, a, c, u) {
				var l = y(e[o], e, a)
				if ('throw' !== l.type) {
					var s = l.arg,
						f = s.value
					return f && 'object' == t(f) && i.call(f, '__await')
						? r.resolve(f.__await).then(
								function (t) {
									n('next', t, c, u)
								},
								function (t) {
									n('throw', t, c, u)
								}
							)
						: r.resolve(f).then(
								function (t) {
									;(s.value = t), c(s)
								},
								function (t) {
									return n('throw', t, c, u)
								}
							)
				}
				u(l.arg)
			}
			var o
			a(this, '_invoke', {
				value: function (t, e) {
					function i() {
						return new r(function (r, o) {
							n(t, e, r, o)
						})
					}
					return (o = o ? o.then(i, i) : i())
				},
			})
		}
		function k(t, e, n) {
			var o = p
			return function (i, a) {
				if (o === v) throw Error('Generator is already running')
				if (o === m) {
					if ('throw' === i) throw a
					return { value: r, done: !0 }
				}
				for (n.method = i, n.arg = a; ; ) {
					var c = n.delegate
					if (c) {
						var u = q(c, n)
						if (u) {
							if (u === g) continue
							return u
						}
					}
					if ('next' === n.method) n.sent = n._sent = n.arg
					else if ('throw' === n.method) {
						if (o === p) throw ((o = m), n.arg)
						n.dispatchException(n.arg)
					} else 'return' === n.method && n.abrupt('return', n.arg)
					o = v
					var l = y(t, e, n)
					if ('normal' === l.type) {
						if (((o = n.done ? m : d), l.arg === g)) continue
						return { value: l.arg, done: n.done }
					}
					'throw' === l.type && ((o = m), (n.method = 'throw'), (n.arg = l.arg))
				}
			}
		}
		function q(t, e) {
			var n = e.method,
				o = t.iterator[n]
			if (o === r)
				return (
					(e.delegate = null),
					('throw' === n &&
						t.iterator.return &&
						((e.method = 'return'), (e.arg = r), q(t, e), 'throw' === e.method)) ||
						('return' !== n &&
							((e.method = 'throw'),
							(e.arg = new TypeError("The iterator does not provide a '" + n + "' method")))),
					g
				)
			var i = y(o, t.iterator, e.arg)
			if ('throw' === i.type) return (e.method = 'throw'), (e.arg = i.arg), (e.delegate = null), g
			var a = i.arg
			return a
				? a.done
					? ((e[t.resultName] = a.value),
						(e.next = t.nextLoc),
						'return' !== e.method && ((e.method = 'next'), (e.arg = r)),
						(e.delegate = null),
						g)
					: a
				: ((e.method = 'throw'),
					(e.arg = new TypeError('iterator result is not an object')),
					(e.delegate = null),
					g)
		}
		function P(t) {
			var e = { tryLoc: t[0] }
			1 in t && (e.catchLoc = t[1]),
				2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
				this.tryEntries.push(e)
		}
		function T(t) {
			var e = t.completion || {}
			;(e.type = 'normal'), delete e.arg, (t.completion = e)
		}
		function N(t) {
			;(this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(P, this), this.reset(!0)
		}
		function G(e) {
			if (e || '' === e) {
				var n = e[u]
				if (n) return n.call(e)
				if ('function' == typeof e.next) return e
				if (!isNaN(e.length)) {
					var o = -1,
						a = function t() {
							for (; ++o < e.length; ) if (i.call(e, o)) return (t.value = e[o]), (t.done = !1), t
							return (t.value = r), (t.done = !0), t
						}
					return (a.next = a)
				}
			}
			throw new TypeError(t(e) + ' is not iterable')
		}
		return (
			(b.prototype = L),
			a(O, 'constructor', { value: L, configurable: !0 }),
			a(L, 'constructor', { value: b, configurable: !0 }),
			(b.displayName = f(L, s, 'GeneratorFunction')),
			(n.isGeneratorFunction = function (t) {
				var e = 'function' == typeof t && t.constructor
				return !!e && (e === b || 'GeneratorFunction' === (e.displayName || e.name))
			}),
			(n.mark = function (t) {
				return (
					Object.setPrototypeOf
						? Object.setPrototypeOf(t, L)
						: ((t.__proto__ = L), f(t, s, 'GeneratorFunction')),
					(t.prototype = Object.create(O)),
					t
				)
			}),
			(n.awrap = function (t) {
				return { __await: t }
			}),
			j(_.prototype),
			f(_.prototype, l, function () {
				return this
			}),
			(n.AsyncIterator = _),
			(n.async = function (t, e, r, o, i) {
				void 0 === i && (i = Promise)
				var a = new _(h(t, e, r, o), i)
				return n.isGeneratorFunction(e)
					? a
					: a.next().then(function (t) {
							return t.done ? t.value : a.next()
						})
			}),
			j(O),
			f(O, s, 'Generator'),
			f(O, u, function () {
				return this
			}),
			f(O, 'toString', function () {
				return '[object Generator]'
			}),
			(n.keys = function (t) {
				var e = Object(t),
					r = []
				for (var n in e) r.push(n)
				return (
					r.reverse(),
					function t() {
						for (; r.length; ) {
							var n = r.pop()
							if (n in e) return (t.value = n), (t.done = !1), t
						}
						return (t.done = !0), t
					}
				)
			}),
			(n.values = G),
			(N.prototype = {
				constructor: N,
				reset: function (t) {
					if (
						((this.prev = 0),
						(this.next = 0),
						(this.sent = this._sent = r),
						(this.done = !1),
						(this.delegate = null),
						(this.method = 'next'),
						(this.arg = r),
						this.tryEntries.forEach(T),
						!t)
					)
						for (var e in this)
							't' === e.charAt(0) && i.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = r)
				},
				stop: function () {
					this.done = !0
					var t = this.tryEntries[0].completion
					if ('throw' === t.type) throw t.arg
					return this.rval
				},
				dispatchException: function (t) {
					if (this.done) throw t
					var e = this
					function n(n, o) {
						return (
							(c.type = 'throw'), (c.arg = t), (e.next = n), o && ((e.method = 'next'), (e.arg = r)), !!o
						)
					}
					for (var o = this.tryEntries.length - 1; o >= 0; --o) {
						var a = this.tryEntries[o],
							c = a.completion
						if ('root' === a.tryLoc) return n('end')
						if (a.tryLoc <= this.prev) {
							var u = i.call(a, 'catchLoc'),
								l = i.call(a, 'finallyLoc')
							if (u && l) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0)
								if (this.prev < a.finallyLoc) return n(a.finallyLoc)
							} else if (u) {
								if (this.prev < a.catchLoc) return n(a.catchLoc, !0)
							} else {
								if (!l) throw Error('try statement without catch or finally')
								if (this.prev < a.finallyLoc) return n(a.finallyLoc)
							}
						}
					}
				},
				abrupt: function (t, e) {
					for (var r = this.tryEntries.length - 1; r >= 0; --r) {
						var n = this.tryEntries[r]
						if (n.tryLoc <= this.prev && i.call(n, 'finallyLoc') && this.prev < n.finallyLoc) {
							var o = n
							break
						}
					}
					o && ('break' === t || 'continue' === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null)
					var a = o ? o.completion : {}
					return (
						(a.type = t),
						(a.arg = e),
						o ? ((this.method = 'next'), (this.next = o.finallyLoc), g) : this.complete(a)
					)
				},
				complete: function (t, e) {
					if ('throw' === t.type) throw t.arg
					return (
						'break' === t.type || 'continue' === t.type
							? (this.next = t.arg)
							: 'return' === t.type
								? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
								: 'normal' === t.type && e && (this.next = e),
						g
					)
				},
				finish: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e]
						if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), T(r), g
					}
				},
				catch: function (t) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var r = this.tryEntries[e]
						if (r.tryLoc === t) {
							var n = r.completion
							if ('throw' === n.type) {
								var o = n.arg
								T(r)
							}
							return o
						}
					}
					throw Error('illegal catch attempt')
				},
				delegateYield: function (t, e, n) {
					return (
						(this.delegate = { iterator: G(t), resultName: e, nextLoc: n }),
						'next' === this.method && (this.arg = r),
						g
					)
				},
			}),
			n
		)
	}
	function r(t, e, r, n, o, i, a) {
		try {
			var c = t[i](a),
				u = c.value
		} catch (t) {
			return void r(t)
		}
		c.done ? e(u) : Promise.resolve(u).then(n, o)
	}
	function n(t) {
		return function () {
			var e = this,
				n = arguments
			return new Promise(function (o, i) {
				var a = t.apply(e, n)
				function c(t) {
					r(a, o, i, c, u, 'next', t)
				}
				function u(t) {
					r(a, o, i, c, u, 'throw', t)
				}
				c(void 0)
			})
		}
	}
	document.querySelector('#login-btn').addEventListener(
		'click',
		n(
			e().mark(function t() {
				var r, n, o, i
				return e().wrap(
					function (t) {
						for (;;)
							switch ((t.prev = t.next)) {
								case 0:
									if (
										((r = DOMPurify.sanitize(document.querySelector('#login-email').value)),
										(n = DOMPurify.sanitize(document.querySelector('#login-password').value)),
										r && n)
									) {
										t.next = 8
										break
									}
									return (
										"Email and password can't be empty",
										(document.querySelector('#login-alert span').textContent =
											"Email and password can't be empty"),
										document.querySelector('#login-alert').classList.remove('hidden'),
										setTimeout(function () {
											document.querySelector('#login-alert').classList.add('hidden')
										}, 3e3),
										t.abrupt('return')
									)
								case 8:
									return (
										(t.prev = 8),
										(t.next = 11),
										fetch('/auth/login', {
											method: 'POST',
											headers: { 'Content-Type': 'application/json' },
											body: JSON.stringify({ email: r, password: n }),
										})
									)
								case 11:
									return (o = t.sent), (t.next = 14), o.json()
								case 14:
									if (((i = t.sent), console.log('Data in login.js: ', i), !i.error)) {
										t.next = 18
										break
									}
									throw new Error(i.error)
								case 18:
									;(document.querySelector('#login-alert span').textContent = i.message),
										document.querySelector('#login-alert').classList.remove('hidden'),
										setTimeout(function () {
											document.querySelector('#login-alert').classList.add('hidden'),
												(window.location.href = '/chat')
										}, 3e3),
										(t.next = 28)
									break
								case 23:
									;(t.prev = 23),
										(t.t0 = t.catch(8)),
										(document.querySelector('#login-alert span').textContent = t.t0.message),
										document.querySelector('#login-alert').classList.remove('hidden'),
										setTimeout(function () {
											document.querySelector('#login-alert').classList.add('hidden')
										}, 3e3)
								case 28:
								case 'end':
									return t.stop()
							}
					},
					t,
					null,
					[[8, 23]]
				)
			})
		)
	)
})()
