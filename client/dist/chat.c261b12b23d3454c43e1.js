;(() => {
	'use strict'
	var e = {
			d: (t, n) => {
				for (var r in n) e.o(n, r) && !e.o(t, r) && Object.defineProperty(t, r, { enumerable: !0, get: n[r] })
			},
			o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
			r: (e) => {
				'undefined' != typeof Symbol &&
					Symbol.toStringTag &&
					Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
					Object.defineProperty(e, '__esModule', { value: !0 })
			},
		},
		t = {}
	e.r(t), e.d(t, { Decoder: () => ge, Encoder: () => fe, PacketType: () => pe, protocol: () => he })
	const n = Object.create(null)
	;(n.open = '0'),
		(n.close = '1'),
		(n.ping = '2'),
		(n.pong = '3'),
		(n.message = '4'),
		(n.upgrade = '5'),
		(n.noop = '6')
	const r = Object.create(null)
	Object.keys(n).forEach((e) => {
		r[n[e]] = e
	})
	const o = { type: 'error', data: 'parser error' },
		i =
			'function' == typeof Blob ||
			('undefined' != typeof Blob && '[object BlobConstructor]' === Object.prototype.toString.call(Blob)),
		s = 'function' == typeof ArrayBuffer,
		a = (e) =>
			'function' == typeof ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer instanceof ArrayBuffer,
		c = ({ type: e, data: t }, r, o) =>
			i && t instanceof Blob
				? r
					? o(t)
					: u(t, o)
				: s && (t instanceof ArrayBuffer || a(t))
					? r
						? o(t)
						: u(new Blob([t]), o)
					: o(n[e] + (t || '')),
		u = (e, t) => {
			const n = new FileReader()
			return (
				(n.onload = function () {
					const e = n.result.split(',')[1]
					t('b' + (e || ''))
				}),
				n.readAsDataURL(e)
			)
		}
	function l(e) {
		return e instanceof Uint8Array
			? e
			: e instanceof ArrayBuffer
				? new Uint8Array(e)
				: new Uint8Array(e.buffer, e.byteOffset, e.byteLength)
	}
	let d
	const h = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
		p = 'undefined' == typeof Uint8Array ? [] : new Uint8Array(256)
	for (let e = 0; e < 64; e++) p[h.charCodeAt(e)] = e
	const f = 'function' == typeof ArrayBuffer,
		m = (e, t) => {
			if ('string' != typeof e) return { type: 'message', data: y(e, t) }
			const n = e.charAt(0)
			if ('b' === n) return { type: 'message', data: g(e.substring(1), t) }
			return r[n] ? (e.length > 1 ? { type: r[n], data: e.substring(1) } : { type: r[n] }) : o
		},
		g = (e, t) => {
			if (f) {
				const n = ((e) => {
					let t,
						n,
						r,
						o,
						i,
						s = 0.75 * e.length,
						a = e.length,
						c = 0
					'=' === e[e.length - 1] && (s--, '=' === e[e.length - 2] && s--)
					const u = new ArrayBuffer(s),
						l = new Uint8Array(u)
					for (t = 0; t < a; t += 4)
						(n = p[e.charCodeAt(t)]),
							(r = p[e.charCodeAt(t + 1)]),
							(o = p[e.charCodeAt(t + 2)]),
							(i = p[e.charCodeAt(t + 3)]),
							(l[c++] = (n << 2) | (r >> 4)),
							(l[c++] = ((15 & r) << 4) | (o >> 2)),
							(l[c++] = ((3 & o) << 6) | (63 & i))
					return u
				})(e)
				return y(n, t)
			}
			return { base64: !0, data: e }
		},
		y = (e, t) =>
			'blob' === t ? (e instanceof Blob ? e : new Blob([e])) : e instanceof ArrayBuffer ? e : e.buffer,
		v = String.fromCharCode(30)
	function b() {
		return new TransformStream({
			transform(e, t) {
				!(function (e, t) {
					i && e.data instanceof Blob
						? e.data.arrayBuffer().then(l).then(t)
						: s && (e.data instanceof ArrayBuffer || a(e.data))
							? t(l(e.data))
							: c(e, !1, (e) => {
									d || (d = new TextEncoder()), t(d.encode(e))
								})
				})(e, (n) => {
					const r = n.length
					let o
					if (r < 126) (o = new Uint8Array(1)), new DataView(o.buffer).setUint8(0, r)
					else if (r < 65536) {
						o = new Uint8Array(3)
						const e = new DataView(o.buffer)
						e.setUint8(0, 126), e.setUint16(1, r)
					} else {
						o = new Uint8Array(9)
						const e = new DataView(o.buffer)
						e.setUint8(0, 127), e.setBigUint64(1, BigInt(r))
					}
					e.data && 'string' != typeof e.data && (o[0] |= 128), t.enqueue(o), t.enqueue(n)
				})
			},
		})
	}
	let w
	function k(e) {
		return e.reduce((e, t) => e + t.length, 0)
	}
	function S(e, t) {
		if (e[0].length === t) return e.shift()
		const n = new Uint8Array(t)
		let r = 0
		for (let o = 0; o < t; o++) (n[o] = e[0][r++]), r === e[0].length && (e.shift(), (r = 0))
		return e.length && r < e[0].length && (e[0] = e[0].slice(r)), n
	}
	function E(e) {
		if (e)
			return (function (e) {
				for (var t in E.prototype) e[t] = E.prototype[t]
				return e
			})(e)
	}
	;(E.prototype.on = E.prototype.addEventListener =
		function (e, t) {
			return (
				(this._callbacks = this._callbacks || {}),
				(this._callbacks['$' + e] = this._callbacks['$' + e] || []).push(t),
				this
			)
		}),
		(E.prototype.once = function (e, t) {
			function n() {
				this.off(e, n), t.apply(this, arguments)
			}
			return (n.fn = t), this.on(e, n), this
		}),
		(E.prototype.off =
			E.prototype.removeListener =
			E.prototype.removeAllListeners =
			E.prototype.removeEventListener =
				function (e, t) {
					if (((this._callbacks = this._callbacks || {}), 0 == arguments.length))
						return (this._callbacks = {}), this
					var n,
						r = this._callbacks['$' + e]
					if (!r) return this
					if (1 == arguments.length) return delete this._callbacks['$' + e], this
					for (var o = 0; o < r.length; o++)
						if ((n = r[o]) === t || n.fn === t) {
							r.splice(o, 1)
							break
						}
					return 0 === r.length && delete this._callbacks['$' + e], this
				}),
		(E.prototype.emit = function (e) {
			this._callbacks = this._callbacks || {}
			for (
				var t = new Array(arguments.length - 1), n = this._callbacks['$' + e], r = 1;
				r < arguments.length;
				r++
			)
				t[r - 1] = arguments[r]
			if (n) {
				r = 0
				for (var o = (n = n.slice(0)).length; r < o; ++r) n[r].apply(this, t)
			}
			return this
		}),
		(E.prototype.emitReserved = E.prototype.emit),
		(E.prototype.listeners = function (e) {
			return (this._callbacks = this._callbacks || {}), this._callbacks['$' + e] || []
		}),
		(E.prototype.hasListeners = function (e) {
			return !!this.listeners(e).length
		})
	const L = 'undefined' != typeof self ? self : 'undefined' != typeof window ? window : Function('return this')()
	function x(e, ...t) {
		return t.reduce((t, n) => (e.hasOwnProperty(n) && (t[n] = e[n]), t), {})
	}
	const T = L.setTimeout,
		j = L.clearTimeout
	function q(e, t) {
		t.useNativeTimers
			? ((e.setTimeoutFn = T.bind(L)), (e.clearTimeoutFn = j.bind(L)))
			: ((e.setTimeoutFn = L.setTimeout.bind(L)), (e.clearTimeoutFn = L.clearTimeout.bind(L)))
	}
	class C extends Error {
		constructor(e, t, n) {
			super(e), (this.description = t), (this.context = n), (this.type = 'TransportError')
		}
	}
	class _ extends E {
		constructor(e) {
			super(), (this.writable = !1), q(this, e), (this.opts = e), (this.query = e.query), (this.socket = e.socket)
		}
		onError(e, t, n) {
			return super.emitReserved('error', new C(e, t, n)), this
		}
		open() {
			return (this.readyState = 'opening'), this.doOpen(), this
		}
		close() {
			return (
				('opening' !== this.readyState && 'open' !== this.readyState) || (this.doClose(), this.onClose()), this
			)
		}
		send(e) {
			'open' === this.readyState && this.write(e)
		}
		onOpen() {
			;(this.readyState = 'open'), (this.writable = !0), super.emitReserved('open')
		}
		onData(e) {
			const t = m(e, this.socket.binaryType)
			this.onPacket(t)
		}
		onPacket(e) {
			super.emitReserved('packet', e)
		}
		onClose(e) {
			;(this.readyState = 'closed'), super.emitReserved('close', e)
		}
		pause(e) {}
		createUri(e, t = {}) {
			return e + '://' + this._hostname() + this._port() + this.opts.path + this._query(t)
		}
		_hostname() {
			const e = this.opts.hostname
			return -1 === e.indexOf(':') ? e : '[' + e + ']'
		}
		_port() {
			return this.opts.port &&
				((this.opts.secure && Number(443 !== this.opts.port)) ||
					(!this.opts.secure && 80 !== Number(this.opts.port)))
				? ':' + this.opts.port
				: ''
		}
		_query(e) {
			const t = (function (e) {
				let t = ''
				for (let n in e)
					e.hasOwnProperty(n) &&
						(t.length && (t += '&'), (t += encodeURIComponent(n) + '=' + encodeURIComponent(e[n])))
				return t
			})(e)
			return t.length ? '?' + t : ''
		}
	}
	const O = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
		A = 64,
		I = {}
	let B,
		N = 0,
		P = 0
	function R(e) {
		let t = ''
		do {
			;(t = O[e % A] + t), (e = Math.floor(e / A))
		} while (e > 0)
		return t
	}
	function M() {
		const e = R(+new Date())
		return e !== B ? ((N = 0), (B = e)) : e + '.' + R(N++)
	}
	for (; P < A; P++) I[O[P]] = P
	let $ = !1
	try {
		$ = 'undefined' != typeof XMLHttpRequest && 'withCredentials' in new XMLHttpRequest()
	} catch (e) {}
	const D = $
	function F(e) {
		const t = e.xdomain
		try {
			if ('undefined' != typeof XMLHttpRequest && (!t || D)) return new XMLHttpRequest()
		} catch (e) {}
		if (!t)
			try {
				return new L[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP')
			} catch (e) {}
	}
	function z() {}
	const U = null != new F({ xdomain: !1 }).responseType
	class G extends E {
		constructor(e, t) {
			super(),
				q(this, t),
				(this.opts = t),
				(this.method = t.method || 'GET'),
				(this.uri = e),
				(this.data = void 0 !== t.data ? t.data : null),
				this.create()
		}
		create() {
			var e
			const t = x(
				this.opts,
				'agent',
				'pfx',
				'key',
				'passphrase',
				'cert',
				'ca',
				'ciphers',
				'rejectUnauthorized',
				'autoUnref'
			)
			t.xdomain = !!this.opts.xd
			const n = (this.xhr = new F(t))
			try {
				n.open(this.method, this.uri, !0)
				try {
					if (this.opts.extraHeaders) {
						n.setDisableHeaderCheck && n.setDisableHeaderCheck(!0)
						for (let e in this.opts.extraHeaders)
							this.opts.extraHeaders.hasOwnProperty(e) && n.setRequestHeader(e, this.opts.extraHeaders[e])
					}
				} catch (e) {}
				if ('POST' === this.method)
					try {
						n.setRequestHeader('Content-type', 'text/plain;charset=UTF-8')
					} catch (e) {}
				try {
					n.setRequestHeader('Accept', '*/*')
				} catch (e) {}
				null === (e = this.opts.cookieJar) || void 0 === e || e.addCookies(n),
					'withCredentials' in n && (n.withCredentials = this.opts.withCredentials),
					this.opts.requestTimeout && (n.timeout = this.opts.requestTimeout),
					(n.onreadystatechange = () => {
						var e
						3 === n.readyState && (null === (e = this.opts.cookieJar) || void 0 === e || e.parseCookies(n)),
							4 === n.readyState &&
								(200 === n.status || 1223 === n.status
									? this.onLoad()
									: this.setTimeoutFn(() => {
											this.onError('number' == typeof n.status ? n.status : 0)
										}, 0))
					}),
					n.send(this.data)
			} catch (e) {
				return void this.setTimeoutFn(() => {
					this.onError(e)
				}, 0)
			}
			'undefined' != typeof document && ((this.index = G.requestsCount++), (G.requests[this.index] = this))
		}
		onError(e) {
			this.emitReserved('error', e, this.xhr), this.cleanup(!0)
		}
		cleanup(e) {
			if (void 0 !== this.xhr && null !== this.xhr) {
				if (((this.xhr.onreadystatechange = z), e))
					try {
						this.xhr.abort()
					} catch (e) {}
				'undefined' != typeof document && delete G.requests[this.index], (this.xhr = null)
			}
		}
		onLoad() {
			const e = this.xhr.responseText
			null !== e && (this.emitReserved('data', e), this.emitReserved('success'), this.cleanup())
		}
		abort() {
			this.cleanup()
		}
	}
	if (((G.requestsCount = 0), (G.requests = {}), 'undefined' != typeof document))
		if ('function' == typeof attachEvent) attachEvent('onunload', H)
		else if ('function' == typeof addEventListener) {
			addEventListener('onpagehide' in L ? 'pagehide' : 'unload', H, !1)
		}
	function H() {
		for (let e in G.requests) G.requests.hasOwnProperty(e) && G.requests[e].abort()
	}
	const V =
			'function' == typeof Promise && 'function' == typeof Promise.resolve
				? (e) => Promise.resolve().then(e)
				: (e, t) => t(e, 0),
		W = L.WebSocket || L.MozWebSocket,
		J =
			'undefined' != typeof navigator &&
			'string' == typeof navigator.product &&
			'reactnative' === navigator.product.toLowerCase()
	const Y = {
			websocket: class extends _ {
				constructor(e) {
					super(e), (this.supportsBinary = !e.forceBase64)
				}
				get name() {
					return 'websocket'
				}
				doOpen() {
					if (!this.check()) return
					const e = this.uri(),
						t = this.opts.protocols,
						n = J
							? {}
							: x(
									this.opts,
									'agent',
									'perMessageDeflate',
									'pfx',
									'key',
									'passphrase',
									'cert',
									'ca',
									'ciphers',
									'rejectUnauthorized',
									'localAddress',
									'protocolVersion',
									'origin',
									'maxPayload',
									'family',
									'checkServerIdentity'
								)
					this.opts.extraHeaders && (n.headers = this.opts.extraHeaders)
					try {
						this.ws = J ? new W(e, t, n) : t ? new W(e, t) : new W(e)
					} catch (e) {
						return this.emitReserved('error', e)
					}
					;(this.ws.binaryType = this.socket.binaryType), this.addEventListeners()
				}
				addEventListeners() {
					;(this.ws.onopen = () => {
						this.opts.autoUnref && this.ws._socket.unref(), this.onOpen()
					}),
						(this.ws.onclose = (e) =>
							this.onClose({ description: 'websocket connection closed', context: e })),
						(this.ws.onmessage = (e) => this.onData(e.data)),
						(this.ws.onerror = (e) => this.onError('websocket error', e))
				}
				write(e) {
					this.writable = !1
					for (let t = 0; t < e.length; t++) {
						const n = e[t],
							r = t === e.length - 1
						c(n, this.supportsBinary, (e) => {
							try {
								this.ws.send(e)
							} catch (e) {}
							r &&
								V(() => {
									;(this.writable = !0), this.emitReserved('drain')
								}, this.setTimeoutFn)
						})
					}
				}
				doClose() {
					void 0 !== this.ws && (this.ws.close(), (this.ws = null))
				}
				uri() {
					const e = this.opts.secure ? 'wss' : 'ws',
						t = this.query || {}
					return (
						this.opts.timestampRequests && (t[this.opts.timestampParam] = M()),
						this.supportsBinary || (t.b64 = 1),
						this.createUri(e, t)
					)
				}
				check() {
					return !!W
				}
			},
			webtransport: class extends _ {
				get name() {
					return 'webtransport'
				}
				doOpen() {
					'function' == typeof WebTransport &&
						((this.transport = new WebTransport(
							this.createUri('https'),
							this.opts.transportOptions[this.name]
						)),
						this.transport.closed
							.then(() => {
								this.onClose()
							})
							.catch((e) => {
								this.onError('webtransport error', e)
							}),
						this.transport.ready.then(() => {
							this.transport.createBidirectionalStream().then((e) => {
								const t = (function (e, t) {
										w || (w = new TextDecoder())
										const n = []
										let r = 0,
											i = -1,
											s = !1
										return new TransformStream({
											transform(a, c) {
												for (n.push(a); ; ) {
													if (0 === r) {
														if (k(n) < 1) break
														const e = S(n, 1)
														;(s = !(128 & ~e[0])),
															(i = 127 & e[0]),
															(r = i < 126 ? 3 : 126 === i ? 1 : 2)
													} else if (1 === r) {
														if (k(n) < 2) break
														const e = S(n, 2)
														;(i = new DataView(e.buffer, e.byteOffset, e.length).getUint16(
															0
														)),
															(r = 3)
													} else if (2 === r) {
														if (k(n) < 8) break
														const e = S(n, 8),
															t = new DataView(e.buffer, e.byteOffset, e.length),
															s = t.getUint32(0)
														if (s > Math.pow(2, 21) - 1) {
															c.enqueue(o)
															break
														}
														;(i = s * Math.pow(2, 32) + t.getUint32(4)), (r = 3)
													} else {
														if (k(n) < i) break
														const e = S(n, i)
														c.enqueue(m(s ? e : w.decode(e), t)), (r = 0)
													}
													if (0 === i || i > e) {
														c.enqueue(o)
														break
													}
												}
											},
										})
									})(Number.MAX_SAFE_INTEGER, this.socket.binaryType),
									n = e.readable.pipeThrough(t).getReader(),
									r = b()
								r.readable.pipeTo(e.writable), (this.writer = r.writable.getWriter())
								const i = () => {
									n.read()
										.then(({ done: e, value: t }) => {
											e || (this.onPacket(t), i())
										})
										.catch((e) => {})
								}
								i()
								const s = { type: 'open' }
								this.query.sid && (s.data = `{"sid":"${this.query.sid}"}`),
									this.writer.write(s).then(() => this.onOpen())
							})
						}))
				}
				write(e) {
					this.writable = !1
					for (let t = 0; t < e.length; t++) {
						const n = e[t],
							r = t === e.length - 1
						this.writer.write(n).then(() => {
							r &&
								V(() => {
									;(this.writable = !0), this.emitReserved('drain')
								}, this.setTimeoutFn)
						})
					}
				}
				doClose() {
					var e
					null === (e = this.transport) || void 0 === e || e.close()
				}
			},
			polling: class extends _ {
				constructor(e) {
					if ((super(e), (this.polling = !1), 'undefined' != typeof location)) {
						const t = 'https:' === location.protocol
						let n = location.port
						n || (n = t ? '443' : '80'),
							(this.xd =
								('undefined' != typeof location && e.hostname !== location.hostname) || n !== e.port)
					}
					const t = e && e.forceBase64
					;(this.supportsBinary = U && !t), this.opts.withCredentials && (this.cookieJar = void 0)
				}
				get name() {
					return 'polling'
				}
				doOpen() {
					this.poll()
				}
				pause(e) {
					this.readyState = 'pausing'
					const t = () => {
						;(this.readyState = 'paused'), e()
					}
					if (this.polling || !this.writable) {
						let e = 0
						this.polling &&
							(e++,
							this.once('pollComplete', function () {
								--e || t()
							})),
							this.writable ||
								(e++,
								this.once('drain', function () {
									--e || t()
								}))
					} else t()
				}
				poll() {
					;(this.polling = !0), this.doPoll(), this.emitReserved('poll')
				}
				onData(e) {
					;((e, t) => {
						const n = e.split(v),
							r = []
						for (let e = 0; e < n.length; e++) {
							const o = m(n[e], t)
							if ((r.push(o), 'error' === o.type)) break
						}
						return r
					})(e, this.socket.binaryType).forEach((e) => {
						if (('opening' === this.readyState && 'open' === e.type && this.onOpen(), 'close' === e.type))
							return this.onClose({ description: 'transport closed by the server' }), !1
						this.onPacket(e)
					}),
						'closed' !== this.readyState &&
							((this.polling = !1),
							this.emitReserved('pollComplete'),
							'open' === this.readyState && this.poll())
				}
				doClose() {
					const e = () => {
						this.write([{ type: 'close' }])
					}
					'open' === this.readyState ? e() : this.once('open', e)
				}
				write(e) {
					;(this.writable = !1),
						((e, t) => {
							const n = e.length,
								r = new Array(n)
							let o = 0
							e.forEach((e, i) => {
								c(e, !1, (e) => {
									;(r[i] = e), ++o === n && t(r.join(v))
								})
							})
						})(e, (e) => {
							this.doWrite(e, () => {
								;(this.writable = !0), this.emitReserved('drain')
							})
						})
				}
				uri() {
					const e = this.opts.secure ? 'https' : 'http',
						t = this.query || {}
					return (
						!1 !== this.opts.timestampRequests && (t[this.opts.timestampParam] = M()),
						this.supportsBinary || t.sid || (t.b64 = 1),
						this.createUri(e, t)
					)
				}
				request(e = {}) {
					return Object.assign(e, { xd: this.xd, cookieJar: this.cookieJar }, this.opts), new G(this.uri(), e)
				}
				doWrite(e, t) {
					const n = this.request({ method: 'POST', data: e })
					n.on('success', t),
						n.on('error', (e, t) => {
							this.onError('xhr post error', e, t)
						})
				}
				doPoll() {
					const e = this.request()
					e.on('data', this.onData.bind(this)),
						e.on('error', (e, t) => {
							this.onError('xhr poll error', e, t)
						}),
						(this.pollXhr = e)
				}
			},
		},
		K =
			/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
		X = [
			'source',
			'protocol',
			'authority',
			'userInfo',
			'user',
			'password',
			'host',
			'port',
			'relative',
			'path',
			'directory',
			'file',
			'query',
			'anchor',
		]
	function Q(e) {
		if (e.length > 2e3) throw 'URI too long'
		const t = e,
			n = e.indexOf('['),
			r = e.indexOf(']')
		;-1 != n && -1 != r && (e = e.substring(0, n) + e.substring(n, r).replace(/:/g, ';') + e.substring(r, e.length))
		let o = K.exec(e || ''),
			i = {},
			s = 14
		for (; s--; ) i[X[s]] = o[s] || ''
		return (
			-1 != n &&
				-1 != r &&
				((i.source = t),
				(i.host = i.host.substring(1, i.host.length - 1).replace(/;/g, ':')),
				(i.authority = i.authority.replace('[', '').replace(']', '').replace(/;/g, ':')),
				(i.ipv6uri = !0)),
			(i.pathNames = (function (e, t) {
				const n = /\/{2,9}/g,
					r = t.replace(n, '/').split('/')
				;('/' != t.slice(0, 1) && 0 !== t.length) || r.splice(0, 1)
				'/' == t.slice(-1) && r.splice(r.length - 1, 1)
				return r
			})(0, i.path)),
			(i.queryKey = (function (e, t) {
				const n = {}
				return (
					t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (e, t, r) {
						t && (n[t] = r)
					}),
					n
				)
			})(0, i.query)),
			i
		)
	}
	class Z extends E {
		constructor(e, t = {}) {
			super(),
				(this.binaryType = 'arraybuffer'),
				(this.writeBuffer = []),
				e && 'object' == typeof e && ((t = e), (e = null)),
				e
					? ((e = Q(e)),
						(t.hostname = e.host),
						(t.secure = 'https' === e.protocol || 'wss' === e.protocol),
						(t.port = e.port),
						e.query && (t.query = e.query))
					: t.host && (t.hostname = Q(t.host).host),
				q(this, t),
				(this.secure =
					null != t.secure ? t.secure : 'undefined' != typeof location && 'https:' === location.protocol),
				t.hostname && !t.port && (t.port = this.secure ? '443' : '80'),
				(this.hostname = t.hostname || ('undefined' != typeof location ? location.hostname : 'localhost')),
				(this.port =
					t.port ||
					('undefined' != typeof location && location.port ? location.port : this.secure ? '443' : '80')),
				(this.transports = t.transports || ['polling', 'websocket', 'webtransport']),
				(this.writeBuffer = []),
				(this.prevBufferLen = 0),
				(this.opts = Object.assign(
					{
						path: '/engine.io',
						agent: !1,
						withCredentials: !1,
						upgrade: !0,
						timestampParam: 't',
						rememberUpgrade: !1,
						addTrailingSlash: !0,
						rejectUnauthorized: !0,
						perMessageDeflate: { threshold: 1024 },
						transportOptions: {},
						closeOnBeforeunload: !1,
					},
					t
				)),
				(this.opts.path = this.opts.path.replace(/\/$/, '') + (this.opts.addTrailingSlash ? '/' : '')),
				'string' == typeof this.opts.query &&
					(this.opts.query = (function (e) {
						let t = {},
							n = e.split('&')
						for (let e = 0, r = n.length; e < r; e++) {
							let r = n[e].split('=')
							t[decodeURIComponent(r[0])] = decodeURIComponent(r[1])
						}
						return t
					})(this.opts.query)),
				(this.id = null),
				(this.upgrades = null),
				(this.pingInterval = null),
				(this.pingTimeout = null),
				(this.pingTimeoutTimer = null),
				'function' == typeof addEventListener &&
					(this.opts.closeOnBeforeunload &&
						((this.beforeunloadEventListener = () => {
							this.transport && (this.transport.removeAllListeners(), this.transport.close())
						}),
						addEventListener('beforeunload', this.beforeunloadEventListener, !1)),
					'localhost' !== this.hostname &&
						((this.offlineEventListener = () => {
							this.onClose('transport close', { description: 'network connection lost' })
						}),
						addEventListener('offline', this.offlineEventListener, !1))),
				this.open()
		}
		createTransport(e) {
			const t = Object.assign({}, this.opts.query)
			;(t.EIO = 4), (t.transport = e), this.id && (t.sid = this.id)
			const n = Object.assign(
				{},
				this.opts,
				{ query: t, socket: this, hostname: this.hostname, secure: this.secure, port: this.port },
				this.opts.transportOptions[e]
			)
			return new Y[e](n)
		}
		open() {
			let e
			if (this.opts.rememberUpgrade && Z.priorWebsocketSuccess && -1 !== this.transports.indexOf('websocket'))
				e = 'websocket'
			else {
				if (0 === this.transports.length)
					return void this.setTimeoutFn(() => {
						this.emitReserved('error', 'No transports available')
					}, 0)
				e = this.transports[0]
			}
			this.readyState = 'opening'
			try {
				e = this.createTransport(e)
			} catch (e) {
				return this.transports.shift(), void this.open()
			}
			e.open(), this.setTransport(e)
		}
		setTransport(e) {
			this.transport && this.transport.removeAllListeners(),
				(this.transport = e),
				e
					.on('drain', this.onDrain.bind(this))
					.on('packet', this.onPacket.bind(this))
					.on('error', this.onError.bind(this))
					.on('close', (e) => this.onClose('transport close', e))
		}
		probe(e) {
			let t = this.createTransport(e),
				n = !1
			Z.priorWebsocketSuccess = !1
			const r = () => {
				n ||
					(t.send([{ type: 'ping', data: 'probe' }]),
					t.once('packet', (e) => {
						if (!n)
							if ('pong' === e.type && 'probe' === e.data) {
								if (((this.upgrading = !0), this.emitReserved('upgrading', t), !t)) return
								;(Z.priorWebsocketSuccess = 'websocket' === t.name),
									this.transport.pause(() => {
										n ||
											('closed' !== this.readyState &&
												(u(),
												this.setTransport(t),
												t.send([{ type: 'upgrade' }]),
												this.emitReserved('upgrade', t),
												(t = null),
												(this.upgrading = !1),
												this.flush()))
									})
							} else {
								const e = new Error('probe error')
								;(e.transport = t.name), this.emitReserved('upgradeError', e)
							}
					}))
			}
			function o() {
				n || ((n = !0), u(), t.close(), (t = null))
			}
			const i = (e) => {
				const n = new Error('probe error: ' + e)
				;(n.transport = t.name), o(), this.emitReserved('upgradeError', n)
			}
			function s() {
				i('transport closed')
			}
			function a() {
				i('socket closed')
			}
			function c(e) {
				t && e.name !== t.name && o()
			}
			const u = () => {
				t.removeListener('open', r),
					t.removeListener('error', i),
					t.removeListener('close', s),
					this.off('close', a),
					this.off('upgrading', c)
			}
			t.once('open', r),
				t.once('error', i),
				t.once('close', s),
				this.once('close', a),
				this.once('upgrading', c),
				-1 !== this.upgrades.indexOf('webtransport') && 'webtransport' !== e
					? this.setTimeoutFn(() => {
							n || t.open()
						}, 200)
					: t.open()
		}
		onOpen() {
			if (
				((this.readyState = 'open'),
				(Z.priorWebsocketSuccess = 'websocket' === this.transport.name),
				this.emitReserved('open'),
				this.flush(),
				'open' === this.readyState && this.opts.upgrade)
			) {
				let e = 0
				const t = this.upgrades.length
				for (; e < t; e++) this.probe(this.upgrades[e])
			}
		}
		onPacket(e) {
			if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState)
				switch (
					(this.emitReserved('packet', e), this.emitReserved('heartbeat'), this.resetPingTimeout(), e.type)
				) {
					case 'open':
						this.onHandshake(JSON.parse(e.data))
						break
					case 'ping':
						this.sendPacket('pong'), this.emitReserved('ping'), this.emitReserved('pong')
						break
					case 'error':
						const t = new Error('server error')
						;(t.code = e.data), this.onError(t)
						break
					case 'message':
						this.emitReserved('data', e.data), this.emitReserved('message', e.data)
				}
		}
		onHandshake(e) {
			this.emitReserved('handshake', e),
				(this.id = e.sid),
				(this.transport.query.sid = e.sid),
				(this.upgrades = this.filterUpgrades(e.upgrades)),
				(this.pingInterval = e.pingInterval),
				(this.pingTimeout = e.pingTimeout),
				(this.maxPayload = e.maxPayload),
				this.onOpen(),
				'closed' !== this.readyState && this.resetPingTimeout()
		}
		resetPingTimeout() {
			this.clearTimeoutFn(this.pingTimeoutTimer),
				(this.pingTimeoutTimer = this.setTimeoutFn(() => {
					this.onClose('ping timeout')
				}, this.pingInterval + this.pingTimeout)),
				this.opts.autoUnref && this.pingTimeoutTimer.unref()
		}
		onDrain() {
			this.writeBuffer.splice(0, this.prevBufferLen),
				(this.prevBufferLen = 0),
				0 === this.writeBuffer.length ? this.emitReserved('drain') : this.flush()
		}
		flush() {
			if ('closed' !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
				const e = this.getWritablePackets()
				this.transport.send(e), (this.prevBufferLen = e.length), this.emitReserved('flush')
			}
		}
		getWritablePackets() {
			if (!(this.maxPayload && 'polling' === this.transport.name && this.writeBuffer.length > 1))
				return this.writeBuffer
			let e = 1
			for (let n = 0; n < this.writeBuffer.length; n++) {
				const r = this.writeBuffer[n].data
				if (
					(r &&
						(e +=
							'string' == typeof (t = r)
								? (function (e) {
										let t = 0,
											n = 0
										for (let r = 0, o = e.length; r < o; r++)
											(t = e.charCodeAt(r)),
												t < 128
													? (n += 1)
													: t < 2048
														? (n += 2)
														: t < 55296 || t >= 57344
															? (n += 3)
															: (r++, (n += 4))
										return n
									})(t)
								: Math.ceil(1.33 * (t.byteLength || t.size))),
					n > 0 && e > this.maxPayload)
				)
					return this.writeBuffer.slice(0, n)
				e += 2
			}
			var t
			return this.writeBuffer
		}
		write(e, t, n) {
			return this.sendPacket('message', e, t, n), this
		}
		send(e, t, n) {
			return this.sendPacket('message', e, t, n), this
		}
		sendPacket(e, t, n, r) {
			if (
				('function' == typeof t && ((r = t), (t = void 0)),
				'function' == typeof n && ((r = n), (n = null)),
				'closing' === this.readyState || 'closed' === this.readyState)
			)
				return
			;(n = n || {}).compress = !1 !== n.compress
			const o = { type: e, data: t, options: n }
			this.emitReserved('packetCreate', o), this.writeBuffer.push(o), r && this.once('flush', r), this.flush()
		}
		close() {
			const e = () => {
					this.onClose('forced close'), this.transport.close()
				},
				t = () => {
					this.off('upgrade', t), this.off('upgradeError', t), e()
				},
				n = () => {
					this.once('upgrade', t), this.once('upgradeError', t)
				}
			return (
				('opening' !== this.readyState && 'open' !== this.readyState) ||
					((this.readyState = 'closing'),
					this.writeBuffer.length
						? this.once('drain', () => {
								this.upgrading ? n() : e()
							})
						: this.upgrading
							? n()
							: e()),
				this
			)
		}
		onError(e) {
			;(Z.priorWebsocketSuccess = !1), this.emitReserved('error', e), this.onClose('transport error', e)
		}
		onClose(e, t) {
			;('opening' !== this.readyState && 'open' !== this.readyState && 'closing' !== this.readyState) ||
				(this.clearTimeoutFn(this.pingTimeoutTimer),
				this.transport.removeAllListeners('close'),
				this.transport.close(),
				this.transport.removeAllListeners(),
				'function' == typeof removeEventListener &&
					(removeEventListener('beforeunload', this.beforeunloadEventListener, !1),
					removeEventListener('offline', this.offlineEventListener, !1)),
				(this.readyState = 'closed'),
				(this.id = null),
				this.emitReserved('close', e, t),
				(this.writeBuffer = []),
				(this.prevBufferLen = 0))
		}
		filterUpgrades(e) {
			const t = []
			let n = 0
			const r = e.length
			for (; n < r; n++) ~this.transports.indexOf(e[n]) && t.push(e[n])
			return t
		}
	}
	Z.protocol = 4
	Z.protocol
	const ee = 'function' == typeof ArrayBuffer,
		te = (e) => ('function' == typeof ArrayBuffer.isView ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer),
		ne = Object.prototype.toString,
		re = 'function' == typeof Blob || ('undefined' != typeof Blob && '[object BlobConstructor]' === ne.call(Blob)),
		oe = 'function' == typeof File || ('undefined' != typeof File && '[object FileConstructor]' === ne.call(File))
	function ie(e) {
		return (ee && (e instanceof ArrayBuffer || te(e))) || (re && e instanceof Blob) || (oe && e instanceof File)
	}
	function se(e, t) {
		if (!e || 'object' != typeof e) return !1
		if (Array.isArray(e)) {
			for (let t = 0, n = e.length; t < n; t++) if (se(e[t])) return !0
			return !1
		}
		if (ie(e)) return !0
		if (e.toJSON && 'function' == typeof e.toJSON && 1 === arguments.length) return se(e.toJSON(), !0)
		for (const t in e) if (Object.prototype.hasOwnProperty.call(e, t) && se(e[t])) return !0
		return !1
	}
	function ae(e) {
		const t = [],
			n = e.data,
			r = e
		return (r.data = ce(n, t)), (r.attachments = t.length), { packet: r, buffers: t }
	}
	function ce(e, t) {
		if (!e) return e
		if (ie(e)) {
			const n = { _placeholder: !0, num: t.length }
			return t.push(e), n
		}
		if (Array.isArray(e)) {
			const n = new Array(e.length)
			for (let r = 0; r < e.length; r++) n[r] = ce(e[r], t)
			return n
		}
		if ('object' == typeof e && !(e instanceof Date)) {
			const n = {}
			for (const r in e) Object.prototype.hasOwnProperty.call(e, r) && (n[r] = ce(e[r], t))
			return n
		}
		return e
	}
	function ue(e, t) {
		return (e.data = le(e.data, t)), delete e.attachments, e
	}
	function le(e, t) {
		if (!e) return e
		if (e && !0 === e._placeholder) {
			if ('number' == typeof e.num && e.num >= 0 && e.num < t.length) return t[e.num]
			throw new Error('illegal attachments')
		}
		if (Array.isArray(e)) for (let n = 0; n < e.length; n++) e[n] = le(e[n], t)
		else if ('object' == typeof e)
			for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && (e[n] = le(e[n], t))
		return e
	}
	const de = ['connect', 'connect_error', 'disconnect', 'disconnecting', 'newListener', 'removeListener'],
		he = 5
	var pe
	!(function (e) {
		;(e[(e.CONNECT = 0)] = 'CONNECT'),
			(e[(e.DISCONNECT = 1)] = 'DISCONNECT'),
			(e[(e.EVENT = 2)] = 'EVENT'),
			(e[(e.ACK = 3)] = 'ACK'),
			(e[(e.CONNECT_ERROR = 4)] = 'CONNECT_ERROR'),
			(e[(e.BINARY_EVENT = 5)] = 'BINARY_EVENT'),
			(e[(e.BINARY_ACK = 6)] = 'BINARY_ACK')
	})(pe || (pe = {}))
	class fe {
		constructor(e) {
			this.replacer = e
		}
		encode(e) {
			return (e.type !== pe.EVENT && e.type !== pe.ACK) || !se(e)
				? [this.encodeAsString(e)]
				: this.encodeAsBinary({
						type: e.type === pe.EVENT ? pe.BINARY_EVENT : pe.BINARY_ACK,
						nsp: e.nsp,
						data: e.data,
						id: e.id,
					})
		}
		encodeAsString(e) {
			let t = '' + e.type
			return (
				(e.type !== pe.BINARY_EVENT && e.type !== pe.BINARY_ACK) || (t += e.attachments + '-'),
				e.nsp && '/' !== e.nsp && (t += e.nsp + ','),
				null != e.id && (t += e.id),
				null != e.data && (t += JSON.stringify(e.data, this.replacer)),
				t
			)
		}
		encodeAsBinary(e) {
			const t = ae(e),
				n = this.encodeAsString(t.packet),
				r = t.buffers
			return r.unshift(n), r
		}
	}
	function me(e) {
		return '[object Object]' === Object.prototype.toString.call(e)
	}
	class ge extends E {
		constructor(e) {
			super(), (this.reviver = e)
		}
		add(e) {
			let t
			if ('string' == typeof e) {
				if (this.reconstructor) throw new Error('got plaintext data when reconstructing a packet')
				t = this.decodeString(e)
				const n = t.type === pe.BINARY_EVENT
				n || t.type === pe.BINARY_ACK
					? ((t.type = n ? pe.EVENT : pe.ACK),
						(this.reconstructor = new ye(t)),
						0 === t.attachments && super.emitReserved('decoded', t))
					: super.emitReserved('decoded', t)
			} else {
				if (!ie(e) && !e.base64) throw new Error('Unknown type: ' + e)
				if (!this.reconstructor) throw new Error('got binary data when not reconstructing a packet')
				;(t = this.reconstructor.takeBinaryData(e)),
					t && ((this.reconstructor = null), super.emitReserved('decoded', t))
			}
		}
		decodeString(e) {
			let t = 0
			const n = { type: Number(e.charAt(0)) }
			if (void 0 === pe[n.type]) throw new Error('unknown packet type ' + n.type)
			if (n.type === pe.BINARY_EVENT || n.type === pe.BINARY_ACK) {
				const r = t + 1
				for (; '-' !== e.charAt(++t) && t != e.length; );
				const o = e.substring(r, t)
				if (o != Number(o) || '-' !== e.charAt(t)) throw new Error('Illegal attachments')
				n.attachments = Number(o)
			}
			if ('/' === e.charAt(t + 1)) {
				const r = t + 1
				for (; ++t; ) {
					if (',' === e.charAt(t)) break
					if (t === e.length) break
				}
				n.nsp = e.substring(r, t)
			} else n.nsp = '/'
			const r = e.charAt(t + 1)
			if ('' !== r && Number(r) == r) {
				const r = t + 1
				for (; ++t; ) {
					const n = e.charAt(t)
					if (null == n || Number(n) != n) {
						--t
						break
					}
					if (t === e.length) break
				}
				n.id = Number(e.substring(r, t + 1))
			}
			if (e.charAt(++t)) {
				const r = this.tryParse(e.substr(t))
				if (!ge.isPayloadValid(n.type, r)) throw new Error('invalid payload')
				n.data = r
			}
			return n
		}
		tryParse(e) {
			try {
				return JSON.parse(e, this.reviver)
			} catch (e) {
				return !1
			}
		}
		static isPayloadValid(e, t) {
			switch (e) {
				case pe.CONNECT:
					return me(t)
				case pe.DISCONNECT:
					return void 0 === t
				case pe.CONNECT_ERROR:
					return 'string' == typeof t || me(t)
				case pe.EVENT:
				case pe.BINARY_EVENT:
					return (
						Array.isArray(t) &&
						('number' == typeof t[0] || ('string' == typeof t[0] && -1 === de.indexOf(t[0])))
					)
				case pe.ACK:
				case pe.BINARY_ACK:
					return Array.isArray(t)
			}
		}
		destroy() {
			this.reconstructor && (this.reconstructor.finishedReconstruction(), (this.reconstructor = null))
		}
	}
	class ye {
		constructor(e) {
			;(this.packet = e), (this.buffers = []), (this.reconPack = e)
		}
		takeBinaryData(e) {
			if ((this.buffers.push(e), this.buffers.length === this.reconPack.attachments)) {
				const e = ue(this.reconPack, this.buffers)
				return this.finishedReconstruction(), e
			}
			return null
		}
		finishedReconstruction() {
			;(this.reconPack = null), (this.buffers = [])
		}
	}
	function ve(e, t, n) {
		return (
			e.on(t, n),
			function () {
				e.off(t, n)
			}
		)
	}
	const be = Object.freeze({
		connect: 1,
		connect_error: 1,
		disconnect: 1,
		disconnecting: 1,
		newListener: 1,
		removeListener: 1,
	})
	class we extends E {
		constructor(e, t, n) {
			super(),
				(this.connected = !1),
				(this.recovered = !1),
				(this.receiveBuffer = []),
				(this.sendBuffer = []),
				(this._queue = []),
				(this._queueSeq = 0),
				(this.ids = 0),
				(this.acks = {}),
				(this.flags = {}),
				(this.io = e),
				(this.nsp = t),
				n && n.auth && (this.auth = n.auth),
				(this._opts = Object.assign({}, n)),
				this.io._autoConnect && this.open()
		}
		get disconnected() {
			return !this.connected
		}
		subEvents() {
			if (this.subs) return
			const e = this.io
			this.subs = [
				ve(e, 'open', this.onopen.bind(this)),
				ve(e, 'packet', this.onpacket.bind(this)),
				ve(e, 'error', this.onerror.bind(this)),
				ve(e, 'close', this.onclose.bind(this)),
			]
		}
		get active() {
			return !!this.subs
		}
		connect() {
			return (
				this.connected ||
					(this.subEvents(),
					this.io._reconnecting || this.io.open(),
					'open' === this.io._readyState && this.onopen()),
				this
			)
		}
		open() {
			return this.connect()
		}
		send(...e) {
			return e.unshift('message'), this.emit.apply(this, e), this
		}
		emit(e, ...t) {
			if (be.hasOwnProperty(e)) throw new Error('"' + e.toString() + '" is a reserved event name')
			if ((t.unshift(e), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile))
				return this._addToQueue(t), this
			const n = { type: pe.EVENT, data: t, options: {} }
			if (((n.options.compress = !1 !== this.flags.compress), 'function' == typeof t[t.length - 1])) {
				const e = this.ids++,
					r = t.pop()
				this._registerAckCallback(e, r), (n.id = e)
			}
			const r = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable
			return (
				(this.flags.volatile && (!r || !this.connected)) ||
					(this.connected ? (this.notifyOutgoingListeners(n), this.packet(n)) : this.sendBuffer.push(n)),
				(this.flags = {}),
				this
			)
		}
		_registerAckCallback(e, t) {
			var n
			const r = null !== (n = this.flags.timeout) && void 0 !== n ? n : this._opts.ackTimeout
			if (void 0 === r) return void (this.acks[e] = t)
			const o = this.io.setTimeoutFn(() => {
					delete this.acks[e]
					for (let t = 0; t < this.sendBuffer.length; t++)
						this.sendBuffer[t].id === e && this.sendBuffer.splice(t, 1)
					t.call(this, new Error('operation has timed out'))
				}, r),
				i = (...e) => {
					this.io.clearTimeoutFn(o), t.apply(this, e)
				}
			;(i.withError = !0), (this.acks[e] = i)
		}
		emitWithAck(e, ...t) {
			return new Promise((n, r) => {
				const o = (e, t) => (e ? r(e) : n(t))
				;(o.withError = !0), t.push(o), this.emit(e, ...t)
			})
		}
		_addToQueue(e) {
			let t
			'function' == typeof e[e.length - 1] && (t = e.pop())
			const n = {
				id: this._queueSeq++,
				tryCount: 0,
				pending: !1,
				args: e,
				flags: Object.assign({ fromQueue: !0 }, this.flags),
			}
			e.push((e, ...r) => {
				if (n !== this._queue[0]) return
				return (
					null !== e
						? n.tryCount > this._opts.retries && (this._queue.shift(), t && t(e))
						: (this._queue.shift(), t && t(null, ...r)),
					(n.pending = !1),
					this._drainQueue()
				)
			}),
				this._queue.push(n),
				this._drainQueue()
		}
		_drainQueue(e = !1) {
			if (!this.connected || 0 === this._queue.length) return
			const t = this._queue[0]
			;(t.pending && !e) ||
				((t.pending = !0), t.tryCount++, (this.flags = t.flags), this.emit.apply(this, t.args))
		}
		packet(e) {
			;(e.nsp = this.nsp), this.io._packet(e)
		}
		onopen() {
			'function' == typeof this.auth
				? this.auth((e) => {
						this._sendConnectPacket(e)
					})
				: this._sendConnectPacket(this.auth)
		}
		_sendConnectPacket(e) {
			this.packet({
				type: pe.CONNECT,
				data: this._pid ? Object.assign({ pid: this._pid, offset: this._lastOffset }, e) : e,
			})
		}
		onerror(e) {
			this.connected || this.emitReserved('connect_error', e)
		}
		onclose(e, t) {
			;(this.connected = !1), delete this.id, this.emitReserved('disconnect', e, t), this._clearAcks()
		}
		_clearAcks() {
			Object.keys(this.acks).forEach((e) => {
				if (!this.sendBuffer.some((t) => String(t.id) === e)) {
					const t = this.acks[e]
					delete this.acks[e], t.withError && t.call(this, new Error('socket has been disconnected'))
				}
			})
		}
		onpacket(e) {
			if (e.nsp === this.nsp)
				switch (e.type) {
					case pe.CONNECT:
						e.data && e.data.sid
							? this.onconnect(e.data.sid, e.data.pid)
							: this.emitReserved(
									'connect_error',
									new Error(
										'It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)'
									)
								)
						break
					case pe.EVENT:
					case pe.BINARY_EVENT:
						this.onevent(e)
						break
					case pe.ACK:
					case pe.BINARY_ACK:
						this.onack(e)
						break
					case pe.DISCONNECT:
						this.ondisconnect()
						break
					case pe.CONNECT_ERROR:
						this.destroy()
						const t = new Error(e.data.message)
						;(t.data = e.data.data), this.emitReserved('connect_error', t)
				}
		}
		onevent(e) {
			const t = e.data || []
			null != e.id && t.push(this.ack(e.id)),
				this.connected ? this.emitEvent(t) : this.receiveBuffer.push(Object.freeze(t))
		}
		emitEvent(e) {
			if (this._anyListeners && this._anyListeners.length) {
				const t = this._anyListeners.slice()
				for (const n of t) n.apply(this, e)
			}
			super.emit.apply(this, e),
				this._pid && e.length && 'string' == typeof e[e.length - 1] && (this._lastOffset = e[e.length - 1])
		}
		ack(e) {
			const t = this
			let n = !1
			return function (...r) {
				n || ((n = !0), t.packet({ type: pe.ACK, id: e, data: r }))
			}
		}
		onack(e) {
			const t = this.acks[e.id]
			'function' == typeof t &&
				(delete this.acks[e.id], t.withError && e.data.unshift(null), t.apply(this, e.data))
		}
		onconnect(e, t) {
			;(this.id = e),
				(this.recovered = t && this._pid === t),
				(this._pid = t),
				(this.connected = !0),
				this.emitBuffered(),
				this.emitReserved('connect'),
				this._drainQueue(!0)
		}
		emitBuffered() {
			this.receiveBuffer.forEach((e) => this.emitEvent(e)),
				(this.receiveBuffer = []),
				this.sendBuffer.forEach((e) => {
					this.notifyOutgoingListeners(e), this.packet(e)
				}),
				(this.sendBuffer = [])
		}
		ondisconnect() {
			this.destroy(), this.onclose('io server disconnect')
		}
		destroy() {
			this.subs && (this.subs.forEach((e) => e()), (this.subs = void 0)), this.io._destroy(this)
		}
		disconnect() {
			return (
				this.connected && this.packet({ type: pe.DISCONNECT }),
				this.destroy(),
				this.connected && this.onclose('io client disconnect'),
				this
			)
		}
		close() {
			return this.disconnect()
		}
		compress(e) {
			return (this.flags.compress = e), this
		}
		get volatile() {
			return (this.flags.volatile = !0), this
		}
		timeout(e) {
			return (this.flags.timeout = e), this
		}
		onAny(e) {
			return (this._anyListeners = this._anyListeners || []), this._anyListeners.push(e), this
		}
		prependAny(e) {
			return (this._anyListeners = this._anyListeners || []), this._anyListeners.unshift(e), this
		}
		offAny(e) {
			if (!this._anyListeners) return this
			if (e) {
				const t = this._anyListeners
				for (let n = 0; n < t.length; n++) if (e === t[n]) return t.splice(n, 1), this
			} else this._anyListeners = []
			return this
		}
		listenersAny() {
			return this._anyListeners || []
		}
		onAnyOutgoing(e) {
			return (
				(this._anyOutgoingListeners = this._anyOutgoingListeners || []),
				this._anyOutgoingListeners.push(e),
				this
			)
		}
		prependAnyOutgoing(e) {
			return (
				(this._anyOutgoingListeners = this._anyOutgoingListeners || []),
				this._anyOutgoingListeners.unshift(e),
				this
			)
		}
		offAnyOutgoing(e) {
			if (!this._anyOutgoingListeners) return this
			if (e) {
				const t = this._anyOutgoingListeners
				for (let n = 0; n < t.length; n++) if (e === t[n]) return t.splice(n, 1), this
			} else this._anyOutgoingListeners = []
			return this
		}
		listenersAnyOutgoing() {
			return this._anyOutgoingListeners || []
		}
		notifyOutgoingListeners(e) {
			if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
				const t = this._anyOutgoingListeners.slice()
				for (const n of t) n.apply(this, e.data)
			}
		}
	}
	function ke(e) {
		;(e = e || {}),
			(this.ms = e.min || 100),
			(this.max = e.max || 1e4),
			(this.factor = e.factor || 2),
			(this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0),
			(this.attempts = 0)
	}
	;(ke.prototype.duration = function () {
		var e = this.ms * Math.pow(this.factor, this.attempts++)
		if (this.jitter) {
			var t = Math.random(),
				n = Math.floor(t * this.jitter * e)
			e = 1 & Math.floor(10 * t) ? e + n : e - n
		}
		return 0 | Math.min(e, this.max)
	}),
		(ke.prototype.reset = function () {
			this.attempts = 0
		}),
		(ke.prototype.setMin = function (e) {
			this.ms = e
		}),
		(ke.prototype.setMax = function (e) {
			this.max = e
		}),
		(ke.prototype.setJitter = function (e) {
			this.jitter = e
		})
	class Se extends E {
		constructor(e, n) {
			var r
			super(),
				(this.nsps = {}),
				(this.subs = []),
				e && 'object' == typeof e && ((n = e), (e = void 0)),
				((n = n || {}).path = n.path || '/socket.io'),
				(this.opts = n),
				q(this, n),
				this.reconnection(!1 !== n.reconnection),
				this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0),
				this.reconnectionDelay(n.reconnectionDelay || 1e3),
				this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3),
				this.randomizationFactor(null !== (r = n.randomizationFactor) && void 0 !== r ? r : 0.5),
				(this.backoff = new ke({
					min: this.reconnectionDelay(),
					max: this.reconnectionDelayMax(),
					jitter: this.randomizationFactor(),
				})),
				this.timeout(null == n.timeout ? 2e4 : n.timeout),
				(this._readyState = 'closed'),
				(this.uri = e)
			const o = n.parser || t
			;(this.encoder = new o.Encoder()),
				(this.decoder = new o.Decoder()),
				(this._autoConnect = !1 !== n.autoConnect),
				this._autoConnect && this.open()
		}
		reconnection(e) {
			return arguments.length ? ((this._reconnection = !!e), this) : this._reconnection
		}
		reconnectionAttempts(e) {
			return void 0 === e ? this._reconnectionAttempts : ((this._reconnectionAttempts = e), this)
		}
		reconnectionDelay(e) {
			var t
			return void 0 === e
				? this._reconnectionDelay
				: ((this._reconnectionDelay = e), null === (t = this.backoff) || void 0 === t || t.setMin(e), this)
		}
		randomizationFactor(e) {
			var t
			return void 0 === e
				? this._randomizationFactor
				: ((this._randomizationFactor = e), null === (t = this.backoff) || void 0 === t || t.setJitter(e), this)
		}
		reconnectionDelayMax(e) {
			var t
			return void 0 === e
				? this._reconnectionDelayMax
				: ((this._reconnectionDelayMax = e), null === (t = this.backoff) || void 0 === t || t.setMax(e), this)
		}
		timeout(e) {
			return arguments.length ? ((this._timeout = e), this) : this._timeout
		}
		maybeReconnectOnOpen() {
			!this._reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
		}
		open(e) {
			if (~this._readyState.indexOf('open')) return this
			this.engine = new Z(this.uri, this.opts)
			const t = this.engine,
				n = this
			;(this._readyState = 'opening'), (this.skipReconnect = !1)
			const r = ve(t, 'open', function () {
					n.onopen(), e && e()
				}),
				o = (t) => {
					this.cleanup(),
						(this._readyState = 'closed'),
						this.emitReserved('error', t),
						e ? e(t) : this.maybeReconnectOnOpen()
				},
				i = ve(t, 'error', o)
			if (!1 !== this._timeout) {
				const e = this._timeout,
					n = this.setTimeoutFn(() => {
						r(), o(new Error('timeout')), t.close()
					}, e)
				this.opts.autoUnref && n.unref(),
					this.subs.push(() => {
						this.clearTimeoutFn(n)
					})
			}
			return this.subs.push(r), this.subs.push(i), this
		}
		connect(e) {
			return this.open(e)
		}
		onopen() {
			this.cleanup(), (this._readyState = 'open'), this.emitReserved('open')
			const e = this.engine
			this.subs.push(
				ve(e, 'ping', this.onping.bind(this)),
				ve(e, 'data', this.ondata.bind(this)),
				ve(e, 'error', this.onerror.bind(this)),
				ve(e, 'close', this.onclose.bind(this)),
				ve(this.decoder, 'decoded', this.ondecoded.bind(this))
			)
		}
		onping() {
			this.emitReserved('ping')
		}
		ondata(e) {
			try {
				this.decoder.add(e)
			} catch (e) {
				this.onclose('parse error', e)
			}
		}
		ondecoded(e) {
			V(() => {
				this.emitReserved('packet', e)
			}, this.setTimeoutFn)
		}
		onerror(e) {
			this.emitReserved('error', e)
		}
		socket(e, t) {
			let n = this.nsps[e]
			return n ? this._autoConnect && !n.active && n.connect() : ((n = new we(this, e, t)), (this.nsps[e] = n)), n
		}
		_destroy(e) {
			const t = Object.keys(this.nsps)
			for (const e of t) {
				if (this.nsps[e].active) return
			}
			this._close()
		}
		_packet(e) {
			const t = this.encoder.encode(e)
			for (let n = 0; n < t.length; n++) this.engine.write(t[n], e.options)
		}
		cleanup() {
			this.subs.forEach((e) => e()), (this.subs.length = 0), this.decoder.destroy()
		}
		_close() {
			;(this.skipReconnect = !0),
				(this._reconnecting = !1),
				this.onclose('forced close'),
				this.engine && this.engine.close()
		}
		disconnect() {
			return this._close()
		}
		onclose(e, t) {
			this.cleanup(),
				this.backoff.reset(),
				(this._readyState = 'closed'),
				this.emitReserved('close', e, t),
				this._reconnection && !this.skipReconnect && this.reconnect()
		}
		reconnect() {
			if (this._reconnecting || this.skipReconnect) return this
			const e = this
			if (this.backoff.attempts >= this._reconnectionAttempts)
				this.backoff.reset(), this.emitReserved('reconnect_failed'), (this._reconnecting = !1)
			else {
				const t = this.backoff.duration()
				this._reconnecting = !0
				const n = this.setTimeoutFn(() => {
					e.skipReconnect ||
						(this.emitReserved('reconnect_attempt', e.backoff.attempts),
						e.skipReconnect ||
							e.open((t) => {
								t
									? ((e._reconnecting = !1), e.reconnect(), this.emitReserved('reconnect_error', t))
									: e.onreconnect()
							}))
				}, t)
				this.opts.autoUnref && n.unref(),
					this.subs.push(() => {
						this.clearTimeoutFn(n)
					})
			}
		}
		onreconnect() {
			const e = this.backoff.attempts
			;(this._reconnecting = !1), this.backoff.reset(), this.emitReserved('reconnect', e)
		}
	}
	const Ee = {}
	function Le(e, t) {
		'object' == typeof e && ((t = e), (e = void 0))
		const n = (function (e, t = '', n) {
				let r = e
				;(n = n || ('undefined' != typeof location && location)),
					null == e && (e = n.protocol + '//' + n.host),
					'string' == typeof e &&
						('/' === e.charAt(0) && (e = '/' === e.charAt(1) ? n.protocol + e : n.host + e),
						/^(https?|wss?):\/\//.test(e) || (e = void 0 !== n ? n.protocol + '//' + e : 'https://' + e),
						(r = Q(e))),
					r.port ||
						(/^(http|ws)$/.test(r.protocol)
							? (r.port = '80')
							: /^(http|ws)s$/.test(r.protocol) && (r.port = '443')),
					(r.path = r.path || '/')
				const o = -1 !== r.host.indexOf(':') ? '[' + r.host + ']' : r.host
				return (
					(r.id = r.protocol + '://' + o + ':' + r.port + t),
					(r.href = r.protocol + '://' + o + (n && n.port === r.port ? '' : ':' + r.port)),
					r
				)
			})(e, (t = t || {}).path || '/socket.io'),
			r = n.source,
			o = n.id,
			i = n.path,
			s = Ee[o] && i in Ee[o].nsps
		let a
		return (
			t.forceNew || t['force new connection'] || !1 === t.multiplex || s
				? (a = new Se(r, t))
				: (Ee[o] || (Ee[o] = new Se(r, t)), (a = Ee[o])),
			n.query && !t.query && (t.query = n.queryKey),
			a.socket(n.path, t)
		)
	}
	function xe(e) {
		return (
			(xe =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e
						}
					: function (e) {
							return e &&
								'function' == typeof Symbol &&
								e.constructor === Symbol &&
								e !== Symbol.prototype
								? 'symbol'
								: typeof e
						}),
			xe(e)
		)
	}
	function Te() {
		Te = function () {
			return t
		}
		var e,
			t = {},
			n = Object.prototype,
			r = n.hasOwnProperty,
			o =
				Object.defineProperty ||
				function (e, t, n) {
					e[t] = n.value
				},
			i = 'function' == typeof Symbol ? Symbol : {},
			s = i.iterator || '@@iterator',
			a = i.asyncIterator || '@@asyncIterator',
			c = i.toStringTag || '@@toStringTag'
		function u(e, t, n) {
			return Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }), e[t]
		}
		try {
			u({}, '')
		} catch (e) {
			u = function (e, t, n) {
				return (e[t] = n)
			}
		}
		function l(e, t, n, r) {
			var i = t && t.prototype instanceof y ? t : y,
				s = Object.create(i.prototype),
				a = new _(r || [])
			return o(s, '_invoke', { value: T(e, n, a) }), s
		}
		function d(e, t, n) {
			try {
				return { type: 'normal', arg: e.call(t, n) }
			} catch (e) {
				return { type: 'throw', arg: e }
			}
		}
		t.wrap = l
		var h = 'suspendedStart',
			p = 'suspendedYield',
			f = 'executing',
			m = 'completed',
			g = {}
		function y() {}
		function v() {}
		function b() {}
		var w = {}
		u(w, s, function () {
			return this
		})
		var k = Object.getPrototypeOf,
			S = k && k(k(O([])))
		S && S !== n && r.call(S, s) && (w = S)
		var E = (b.prototype = y.prototype = Object.create(w))
		function L(e) {
			;['next', 'throw', 'return'].forEach(function (t) {
				u(e, t, function (e) {
					return this._invoke(t, e)
				})
			})
		}
		function x(e, t) {
			function n(o, i, s, a) {
				var c = d(e[o], e, i)
				if ('throw' !== c.type) {
					var u = c.arg,
						l = u.value
					return l && 'object' == xe(l) && r.call(l, '__await')
						? t.resolve(l.__await).then(
								function (e) {
									n('next', e, s, a)
								},
								function (e) {
									n('throw', e, s, a)
								}
							)
						: t.resolve(l).then(
								function (e) {
									;(u.value = e), s(u)
								},
								function (e) {
									return n('throw', e, s, a)
								}
							)
				}
				a(c.arg)
			}
			var i
			o(this, '_invoke', {
				value: function (e, r) {
					function o() {
						return new t(function (t, o) {
							n(e, r, t, o)
						})
					}
					return (i = i ? i.then(o, o) : o())
				},
			})
		}
		function T(t, n, r) {
			var o = h
			return function (i, s) {
				if (o === f) throw Error('Generator is already running')
				if (o === m) {
					if ('throw' === i) throw s
					return { value: e, done: !0 }
				}
				for (r.method = i, r.arg = s; ; ) {
					var a = r.delegate
					if (a) {
						var c = j(a, r)
						if (c) {
							if (c === g) continue
							return c
						}
					}
					if ('next' === r.method) r.sent = r._sent = r.arg
					else if ('throw' === r.method) {
						if (o === h) throw ((o = m), r.arg)
						r.dispatchException(r.arg)
					} else 'return' === r.method && r.abrupt('return', r.arg)
					o = f
					var u = d(t, n, r)
					if ('normal' === u.type) {
						if (((o = r.done ? m : p), u.arg === g)) continue
						return { value: u.arg, done: r.done }
					}
					'throw' === u.type && ((o = m), (r.method = 'throw'), (r.arg = u.arg))
				}
			}
		}
		function j(t, n) {
			var r = n.method,
				o = t.iterator[r]
			if (o === e)
				return (
					(n.delegate = null),
					('throw' === r &&
						t.iterator.return &&
						((n.method = 'return'), (n.arg = e), j(t, n), 'throw' === n.method)) ||
						('return' !== r &&
							((n.method = 'throw'),
							(n.arg = new TypeError("The iterator does not provide a '" + r + "' method")))),
					g
				)
			var i = d(o, t.iterator, n.arg)
			if ('throw' === i.type) return (n.method = 'throw'), (n.arg = i.arg), (n.delegate = null), g
			var s = i.arg
			return s
				? s.done
					? ((n[t.resultName] = s.value),
						(n.next = t.nextLoc),
						'return' !== n.method && ((n.method = 'next'), (n.arg = e)),
						(n.delegate = null),
						g)
					: s
				: ((n.method = 'throw'),
					(n.arg = new TypeError('iterator result is not an object')),
					(n.delegate = null),
					g)
		}
		function q(e) {
			var t = { tryLoc: e[0] }
			1 in e && (t.catchLoc = e[1]),
				2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
				this.tryEntries.push(t)
		}
		function C(e) {
			var t = e.completion || {}
			;(t.type = 'normal'), delete t.arg, (e.completion = t)
		}
		function _(e) {
			;(this.tryEntries = [{ tryLoc: 'root' }]), e.forEach(q, this), this.reset(!0)
		}
		function O(t) {
			if (t || '' === t) {
				var n = t[s]
				if (n) return n.call(t)
				if ('function' == typeof t.next) return t
				if (!isNaN(t.length)) {
					var o = -1,
						i = function n() {
							for (; ++o < t.length; ) if (r.call(t, o)) return (n.value = t[o]), (n.done = !1), n
							return (n.value = e), (n.done = !0), n
						}
					return (i.next = i)
				}
			}
			throw new TypeError(xe(t) + ' is not iterable')
		}
		return (
			(v.prototype = b),
			o(E, 'constructor', { value: b, configurable: !0 }),
			o(b, 'constructor', { value: v, configurable: !0 }),
			(v.displayName = u(b, c, 'GeneratorFunction')),
			(t.isGeneratorFunction = function (e) {
				var t = 'function' == typeof e && e.constructor
				return !!t && (t === v || 'GeneratorFunction' === (t.displayName || t.name))
			}),
			(t.mark = function (e) {
				return (
					Object.setPrototypeOf
						? Object.setPrototypeOf(e, b)
						: ((e.__proto__ = b), u(e, c, 'GeneratorFunction')),
					(e.prototype = Object.create(E)),
					e
				)
			}),
			(t.awrap = function (e) {
				return { __await: e }
			}),
			L(x.prototype),
			u(x.prototype, a, function () {
				return this
			}),
			(t.AsyncIterator = x),
			(t.async = function (e, n, r, o, i) {
				void 0 === i && (i = Promise)
				var s = new x(l(e, n, r, o), i)
				return t.isGeneratorFunction(n)
					? s
					: s.next().then(function (e) {
							return e.done ? e.value : s.next()
						})
			}),
			L(E),
			u(E, c, 'Generator'),
			u(E, s, function () {
				return this
			}),
			u(E, 'toString', function () {
				return '[object Generator]'
			}),
			(t.keys = function (e) {
				var t = Object(e),
					n = []
				for (var r in t) n.push(r)
				return (
					n.reverse(),
					function e() {
						for (; n.length; ) {
							var r = n.pop()
							if (r in t) return (e.value = r), (e.done = !1), e
						}
						return (e.done = !0), e
					}
				)
			}),
			(t.values = O),
			(_.prototype = {
				constructor: _,
				reset: function (t) {
					if (
						((this.prev = 0),
						(this.next = 0),
						(this.sent = this._sent = e),
						(this.done = !1),
						(this.delegate = null),
						(this.method = 'next'),
						(this.arg = e),
						this.tryEntries.forEach(C),
						!t)
					)
						for (var n in this)
							't' === n.charAt(0) && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = e)
				},
				stop: function () {
					this.done = !0
					var e = this.tryEntries[0].completion
					if ('throw' === e.type) throw e.arg
					return this.rval
				},
				dispatchException: function (t) {
					if (this.done) throw t
					var n = this
					function o(r, o) {
						return (
							(a.type = 'throw'), (a.arg = t), (n.next = r), o && ((n.method = 'next'), (n.arg = e)), !!o
						)
					}
					for (var i = this.tryEntries.length - 1; i >= 0; --i) {
						var s = this.tryEntries[i],
							a = s.completion
						if ('root' === s.tryLoc) return o('end')
						if (s.tryLoc <= this.prev) {
							var c = r.call(s, 'catchLoc'),
								u = r.call(s, 'finallyLoc')
							if (c && u) {
								if (this.prev < s.catchLoc) return o(s.catchLoc, !0)
								if (this.prev < s.finallyLoc) return o(s.finallyLoc)
							} else if (c) {
								if (this.prev < s.catchLoc) return o(s.catchLoc, !0)
							} else {
								if (!u) throw Error('try statement without catch or finally')
								if (this.prev < s.finallyLoc) return o(s.finallyLoc)
							}
						}
					}
				},
				abrupt: function (e, t) {
					for (var n = this.tryEntries.length - 1; n >= 0; --n) {
						var o = this.tryEntries[n]
						if (o.tryLoc <= this.prev && r.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
							var i = o
							break
						}
					}
					i && ('break' === e || 'continue' === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null)
					var s = i ? i.completion : {}
					return (
						(s.type = e),
						(s.arg = t),
						i ? ((this.method = 'next'), (this.next = i.finallyLoc), g) : this.complete(s)
					)
				},
				complete: function (e, t) {
					if ('throw' === e.type) throw e.arg
					return (
						'break' === e.type || 'continue' === e.type
							? (this.next = e.arg)
							: 'return' === e.type
								? ((this.rval = this.arg = e.arg), (this.method = 'return'), (this.next = 'end'))
								: 'normal' === e.type && t && (this.next = t),
						g
					)
				},
				finish: function (e) {
					for (var t = this.tryEntries.length - 1; t >= 0; --t) {
						var n = this.tryEntries[t]
						if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), C(n), g
					}
				},
				catch: function (e) {
					for (var t = this.tryEntries.length - 1; t >= 0; --t) {
						var n = this.tryEntries[t]
						if (n.tryLoc === e) {
							var r = n.completion
							if ('throw' === r.type) {
								var o = r.arg
								C(n)
							}
							return o
						}
					}
					throw Error('illegal catch attempt')
				},
				delegateYield: function (t, n, r) {
					return (
						(this.delegate = { iterator: O(t), resultName: n, nextLoc: r }),
						'next' === this.method && (this.arg = e),
						g
					)
				},
			}),
			t
		)
	}
	function je(e, t, n, r, o, i, s) {
		try {
			var a = e[i](s),
				c = a.value
		} catch (e) {
			return void n(e)
		}
		a.done ? t(c) : Promise.resolve(c).then(r, o)
	}
	Object.assign(Le, { Manager: Se, Socket: we, io: Le, connect: Le })
	var qe = (function () {
			var e,
				t =
					((e = Te().mark(function e(t) {
						var n
						return Te().wrap(function (e) {
							for (;;)
								switch ((e.prev = e.next)) {
									case 0:
										if ('' !== t) {
											e.next = 4
											break
										}
										return e.abrupt('return', null)
									case 4:
										return (
											(e.next = 6),
											fetch('/search/search-people', {
												method: 'POST',
												headers: { 'Content-Type': 'application/json' },
												body: JSON.stringify({ queryText: t }),
											})
												.then(function (e) {
													return e.json()
												})
												.then(function (e) {
													return e
												})
												.catch(function (e) {
													console.log('Error in searching people: ', e)
												})
										)
									case 6:
										return (n = e.sent), e.abrupt('return', n)
									case 8:
									case 'end':
										return e.stop()
								}
						}, e)
					})),
					function () {
						var t = this,
							n = arguments
						return new Promise(function (r, o) {
							var i = e.apply(t, n)
							function s(e) {
								je(i, r, o, s, a, 'next', e)
							}
							function a(e) {
								je(i, r, o, s, a, 'throw', e)
							}
							s(void 0)
						})
					})
			return function (e) {
				return t.apply(this, arguments)
			}
		})(),
		Ce = function (e) {
			var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
				n = document.querySelector('.group-chats')
			!n.open && (n.open = !0)
			var r = document.createElement('div')
			r.classList.add('group-child', 'group'), (r.dataset.id = e.groupId)
			var o = document.createElement('div')
			o.classList.add('group-img')
			var i = document.createElement('img')
			;(i.draggable = !1),
				(i.src = e.groupAvatar
					? e.groupAvatar
					: 'https://avatar.iran.liara.run/username?username='.concat(e.groupName.replace(/ /g, '+'))),
				(i.alt = e.groupName),
				o.appendChild(i),
				r.appendChild(o)
			var s = document.createElement('div')
			s.classList.add('group-name-parent')
			var a = document.createElement('h4')
			a.classList.add('group-name'), (a.textContent = e.groupName)
			var c = document.createElement('h4')
			c.classList.add('group-description'),
				(c.textContent = e.groupDescription),
				s.appendChild(a),
				s.appendChild(c),
				r.appendChild(s)
			return (
				(r.innerHTML += DOMPurify.sanitize(
					'\n\t<div class="unread-badge right-8 hidden">\n        <div class="badge bg-secondary text-white">0</div>\n    </div>'
				)),
				document.querySelector('.group-chats').appendChild(r),
				t && _e(r, e),
				r
			)
		},
		_e = function (e) {
			document.querySelector('.chat-child.active') &&
				document.querySelector('.chat-child.active').classList.remove('active'),
				document.querySelector('.group-child.active') &&
					document.querySelector('.group-child.active').classList.remove('active'),
				e.classList.add('active')
			var t = e.children[2]
			;(t.children[0].textContent = 0), !t.classList.contains('hidden') && t.classList.add('hidden')
			for (
				var n = e.dataset.id, r = {}, o = arguments.length, i = new Array(o > 1 ? o - 1 : 0), s = 1;
				s < o;
				s++
			)
				i[s - 1] = arguments[s]
			;(r =
				i[0] && i[0].groupId === n
					? i[0]
					: {
							groupId: n,
							groupName: e.querySelector('.group-name').innerText,
							groupDescription: e.querySelector('.group-description').innerText,
							groupAvatar: e.querySelector('.group-img img').src,
						}),
				Oe(r),
				Ae(r)
		},
		Oe = function (e) {
			var t = document.getElementById('chats-head'),
				n = document.getElementById('all-chats'),
				r = document.getElementById('chats-end'),
				o = document.getElementById('chat-head-name'),
				i = document.getElementById('chat-head-img'),
				s = document.getElementById('to-user-info-popup')
			t.classList.contains('hidden') && t.classList.remove('hidden'),
				n.classList.contains('hidden') && n.classList.remove('hidden'),
				r.classList.contains('hidden') && r.classList.remove('hidden'),
				(o.textContent = e.groupName),
				(i.src = e.groupAvatar),
				(s.querySelector('#to-user-info-popup-name').textContent = e.groupName),
				(s.querySelector('#to-user-info-popup-username').textContent = e.groupDescription),
				(s.querySelector('#to-user-info-popup-img').src = e.groupAvatar
					? e.groupAvatar
					: 'https://avatar.iran.liara.run/username?username='.concat(
							clickedUser.groupName.replace(/ /g, '+')
						)),
				t.querySelector('.avatar').classList.contains('online') &&
					t.querySelector('.avatar').classList.remove('online')
			var a = document.querySelector('.to-user-info-popup-options')
			!a.classList.contains('hidden') && a.classList.add('hidden')
			var c = document.querySelector('.group-info-popup-options')
			c.classList.contains('hidden') && c.classList.remove('hidden')
			var u = document.querySelector('#copy-group-link-btn')
			u.classList.contains('hidden') && u.classList.remove('hidden')
		},
		Ae = function (e) {
			var t = document.querySelector('.chat-section')
			t.classList.contains('hidden') && t.classList.remove('hidden'),
				(document.querySelector('.to-user-profile-sec-img img').src = e.groupAvatar
					? e.groupAvatar
					: 'https://avatar.iran.liara.run/username?username='.concat(e.groupName.replace(/ /g, '+')))
			var n = document.querySelector('.to-user-profile-sec-name h1'),
				r = document.querySelector('.to-user-profile-sec-name h3')
			;(n.textContent = e.groupName),
				(r.textContent = e.groupDescription),
				(r.parentElement.dataset.tip = e.groupDescription),
				fetch('/group-chat-api/get-group-conversation', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ groupId: e.groupId }),
				})
					.then(function (e) {
						return e.json()
					})
					.then(function (e) {
						Ie(e)
					})
					.catch(function (e) {
						console.log('Error in getting conversation: ', e)
					})
		},
		Ie = function (e) {
			var t = e.requesterId,
				n = e.groupMessages,
				r = document.querySelector('.message-container')
			if (0 !== n.length) {
				r.textContent = ''
				var o = ''
				;(n = n.filter(function (e) {
					return null !== e
				})).forEach(function (e) {
					var n = Ye(e.createdAt).slice(6),
						i = Ye(e.createdAt).slice(0, 5)
					if (n !== o) {
						o = n
						var s = document.createElement('div')
						s.classList.add('day')
						var a = document.createElement('div')
						a.classList.add('date')
						var c = document.createElement('h1')
						;(c.textContent = n), a.appendChild(c), s.appendChild(a), r.appendChild(s)
					}
					if (e.senderId === t) {
						var u = Be(e.message, e._id, i, e.senderName)
						r.appendChild(u)
					} else {
						var l = Ne(e.message, e._id, i, e.senderName)
						r.appendChild(l)
					}
				}),
					(r.scrollTop = r.scrollHeight)
			} else r.textContent = ''
		},
		Be = function (e, t, n, r) {
			var o = document.createElement('div')
			return (
				o.classList.add('from-user-msg'),
				(o.dataset.id = t),
				(o.innerHTML =
					'\n        <div class="delete-msg-btn hidden pr-2">\n            <button class="btn btn-circle btn-outline border-neutral bg-neutral hover:bg-accent hover:border-accent h-6 w-6 min-h-4 group">\n                <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4 stroke-accent group-hover:stroke-neutral" xmlns="http://www.w3.org/2000/svg">\n                    <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>\n                </svg>\n            </button>\n        </div>\n        <div id="from-user-msg-container" class="msg-container">\n            <div class="flex items-center space-x-2 rtl:space-x-reverse">\n                <h3 class="msg-sender-name text-base font-medium text-black">'
						.concat(
							r,
							'</h3>\n                <h4 class="msg-sending-time text-sm font-normal text-black">'
						)
						.concat(
							n,
							'</h4>\n            </div>\n            <p class="msg-content py-1 text-base font-semibold text-black whitespace-pre-wrap">'
						)
						.concat(e, '</p>\n        </div>\n    ')),
				o
			)
		},
		Ne = function (e, t, n, r) {
			var o = document.createElement('div')
			return (
				o.classList.add('to-user-msg'),
				(o.dataset.id = t),
				(o.innerHTML =
					'\n        <div id="to-user-msg-container" class="msg-container">\n            <div class="flex items-center space-x-2 rtl:space-x-reverse">\n                <h3 class="msg-sender-name text-base font-medium text-black">'
						.concat(
							r,
							'</h3>\n                <h4 class="msg-sending-time text-sm font-normal text-black">'
						)
						.concat(
							n,
							'</h4>\n            </div>\n            <p class="msg-content py-2.5 text-base font-semibold text-black whitespace-pre-wrap">'
						)
						.concat(e, '</p>\n        </div>\n    ')),
				o
			)
		},
		Pe = function (e, t) {
			fetch('/group-chat-api/send-group-message', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ groupId: e, msg: t }),
			})
				.then(function (e) {
					return e.json()
				})
				.then(function (e) {
					var t = e.msgInfo,
						n = t._id,
						r = t.message,
						o = t.createdAt,
						i = document.querySelector('#change-details-name').value,
						s = document.querySelector('.message-container'),
						a = Ye(o),
						c = a.slice(6),
						u = a.slice(0, 5),
						l = Array.from(document.querySelectorAll('.date'))
					if (0 === l.length || l[l.length - 1].innerText !== c) {
						var d = document.createElement('div')
						d.classList.add('day')
						var h = document.createElement('div')
						h.classList.add('date')
						var p = document.createElement('h1')
						;(p.textContent = c), h.appendChild(p), d.appendChild(h), s.appendChild(d)
					}
					var f = Be(r, n, u, i)
					s.appendChild(f), (s.scrollTop = s.scrollHeight)
				})
		}
	function Re(e) {
		return (
			(Re =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e
						}
					: function (e) {
							return e &&
								'function' == typeof Symbol &&
								e.constructor === Symbol &&
								e !== Symbol.prototype
								? 'symbol'
								: typeof e
						}),
			Re(e)
		)
	}
	function Me() {
		Me = function () {
			return t
		}
		var e,
			t = {},
			n = Object.prototype,
			r = n.hasOwnProperty,
			o =
				Object.defineProperty ||
				function (e, t, n) {
					e[t] = n.value
				},
			i = 'function' == typeof Symbol ? Symbol : {},
			s = i.iterator || '@@iterator',
			a = i.asyncIterator || '@@asyncIterator',
			c = i.toStringTag || '@@toStringTag'
		function u(e, t, n) {
			return Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }), e[t]
		}
		try {
			u({}, '')
		} catch (e) {
			u = function (e, t, n) {
				return (e[t] = n)
			}
		}
		function l(e, t, n, r) {
			var i = t && t.prototype instanceof y ? t : y,
				s = Object.create(i.prototype),
				a = new _(r || [])
			return o(s, '_invoke', { value: T(e, n, a) }), s
		}
		function d(e, t, n) {
			try {
				return { type: 'normal', arg: e.call(t, n) }
			} catch (e) {
				return { type: 'throw', arg: e }
			}
		}
		t.wrap = l
		var h = 'suspendedStart',
			p = 'suspendedYield',
			f = 'executing',
			m = 'completed',
			g = {}
		function y() {}
		function v() {}
		function b() {}
		var w = {}
		u(w, s, function () {
			return this
		})
		var k = Object.getPrototypeOf,
			S = k && k(k(O([])))
		S && S !== n && r.call(S, s) && (w = S)
		var E = (b.prototype = y.prototype = Object.create(w))
		function L(e) {
			;['next', 'throw', 'return'].forEach(function (t) {
				u(e, t, function (e) {
					return this._invoke(t, e)
				})
			})
		}
		function x(e, t) {
			function n(o, i, s, a) {
				var c = d(e[o], e, i)
				if ('throw' !== c.type) {
					var u = c.arg,
						l = u.value
					return l && 'object' == Re(l) && r.call(l, '__await')
						? t.resolve(l.__await).then(
								function (e) {
									n('next', e, s, a)
								},
								function (e) {
									n('throw', e, s, a)
								}
							)
						: t.resolve(l).then(
								function (e) {
									;(u.value = e), s(u)
								},
								function (e) {
									return n('throw', e, s, a)
								}
							)
				}
				a(c.arg)
			}
			var i
			o(this, '_invoke', {
				value: function (e, r) {
					function o() {
						return new t(function (t, o) {
							n(e, r, t, o)
						})
					}
					return (i = i ? i.then(o, o) : o())
				},
			})
		}
		function T(t, n, r) {
			var o = h
			return function (i, s) {
				if (o === f) throw Error('Generator is already running')
				if (o === m) {
					if ('throw' === i) throw s
					return { value: e, done: !0 }
				}
				for (r.method = i, r.arg = s; ; ) {
					var a = r.delegate
					if (a) {
						var c = j(a, r)
						if (c) {
							if (c === g) continue
							return c
						}
					}
					if ('next' === r.method) r.sent = r._sent = r.arg
					else if ('throw' === r.method) {
						if (o === h) throw ((o = m), r.arg)
						r.dispatchException(r.arg)
					} else 'return' === r.method && r.abrupt('return', r.arg)
					o = f
					var u = d(t, n, r)
					if ('normal' === u.type) {
						if (((o = r.done ? m : p), u.arg === g)) continue
						return { value: u.arg, done: r.done }
					}
					'throw' === u.type && ((o = m), (r.method = 'throw'), (r.arg = u.arg))
				}
			}
		}
		function j(t, n) {
			var r = n.method,
				o = t.iterator[r]
			if (o === e)
				return (
					(n.delegate = null),
					('throw' === r &&
						t.iterator.return &&
						((n.method = 'return'), (n.arg = e), j(t, n), 'throw' === n.method)) ||
						('return' !== r &&
							((n.method = 'throw'),
							(n.arg = new TypeError("The iterator does not provide a '" + r + "' method")))),
					g
				)
			var i = d(o, t.iterator, n.arg)
			if ('throw' === i.type) return (n.method = 'throw'), (n.arg = i.arg), (n.delegate = null), g
			var s = i.arg
			return s
				? s.done
					? ((n[t.resultName] = s.value),
						(n.next = t.nextLoc),
						'return' !== n.method && ((n.method = 'next'), (n.arg = e)),
						(n.delegate = null),
						g)
					: s
				: ((n.method = 'throw'),
					(n.arg = new TypeError('iterator result is not an object')),
					(n.delegate = null),
					g)
		}
		function q(e) {
			var t = { tryLoc: e[0] }
			1 in e && (t.catchLoc = e[1]),
				2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
				this.tryEntries.push(t)
		}
		function C(e) {
			var t = e.completion || {}
			;(t.type = 'normal'), delete t.arg, (e.completion = t)
		}
		function _(e) {
			;(this.tryEntries = [{ tryLoc: 'root' }]), e.forEach(q, this), this.reset(!0)
		}
		function O(t) {
			if (t || '' === t) {
				var n = t[s]
				if (n) return n.call(t)
				if ('function' == typeof t.next) return t
				if (!isNaN(t.length)) {
					var o = -1,
						i = function n() {
							for (; ++o < t.length; ) if (r.call(t, o)) return (n.value = t[o]), (n.done = !1), n
							return (n.value = e), (n.done = !0), n
						}
					return (i.next = i)
				}
			}
			throw new TypeError(Re(t) + ' is not iterable')
		}
		return (
			(v.prototype = b),
			o(E, 'constructor', { value: b, configurable: !0 }),
			o(b, 'constructor', { value: v, configurable: !0 }),
			(v.displayName = u(b, c, 'GeneratorFunction')),
			(t.isGeneratorFunction = function (e) {
				var t = 'function' == typeof e && e.constructor
				return !!t && (t === v || 'GeneratorFunction' === (t.displayName || t.name))
			}),
			(t.mark = function (e) {
				return (
					Object.setPrototypeOf
						? Object.setPrototypeOf(e, b)
						: ((e.__proto__ = b), u(e, c, 'GeneratorFunction')),
					(e.prototype = Object.create(E)),
					e
				)
			}),
			(t.awrap = function (e) {
				return { __await: e }
			}),
			L(x.prototype),
			u(x.prototype, a, function () {
				return this
			}),
			(t.AsyncIterator = x),
			(t.async = function (e, n, r, o, i) {
				void 0 === i && (i = Promise)
				var s = new x(l(e, n, r, o), i)
				return t.isGeneratorFunction(n)
					? s
					: s.next().then(function (e) {
							return e.done ? e.value : s.next()
						})
			}),
			L(E),
			u(E, c, 'Generator'),
			u(E, s, function () {
				return this
			}),
			u(E, 'toString', function () {
				return '[object Generator]'
			}),
			(t.keys = function (e) {
				var t = Object(e),
					n = []
				for (var r in t) n.push(r)
				return (
					n.reverse(),
					function e() {
						for (; n.length; ) {
							var r = n.pop()
							if (r in t) return (e.value = r), (e.done = !1), e
						}
						return (e.done = !0), e
					}
				)
			}),
			(t.values = O),
			(_.prototype = {
				constructor: _,
				reset: function (t) {
					if (
						((this.prev = 0),
						(this.next = 0),
						(this.sent = this._sent = e),
						(this.done = !1),
						(this.delegate = null),
						(this.method = 'next'),
						(this.arg = e),
						this.tryEntries.forEach(C),
						!t)
					)
						for (var n in this)
							't' === n.charAt(0) && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = e)
				},
				stop: function () {
					this.done = !0
					var e = this.tryEntries[0].completion
					if ('throw' === e.type) throw e.arg
					return this.rval
				},
				dispatchException: function (t) {
					if (this.done) throw t
					var n = this
					function o(r, o) {
						return (
							(a.type = 'throw'), (a.arg = t), (n.next = r), o && ((n.method = 'next'), (n.arg = e)), !!o
						)
					}
					for (var i = this.tryEntries.length - 1; i >= 0; --i) {
						var s = this.tryEntries[i],
							a = s.completion
						if ('root' === s.tryLoc) return o('end')
						if (s.tryLoc <= this.prev) {
							var c = r.call(s, 'catchLoc'),
								u = r.call(s, 'finallyLoc')
							if (c && u) {
								if (this.prev < s.catchLoc) return o(s.catchLoc, !0)
								if (this.prev < s.finallyLoc) return o(s.finallyLoc)
							} else if (c) {
								if (this.prev < s.catchLoc) return o(s.catchLoc, !0)
							} else {
								if (!u) throw Error('try statement without catch or finally')
								if (this.prev < s.finallyLoc) return o(s.finallyLoc)
							}
						}
					}
				},
				abrupt: function (e, t) {
					for (var n = this.tryEntries.length - 1; n >= 0; --n) {
						var o = this.tryEntries[n]
						if (o.tryLoc <= this.prev && r.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
							var i = o
							break
						}
					}
					i && ('break' === e || 'continue' === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null)
					var s = i ? i.completion : {}
					return (
						(s.type = e),
						(s.arg = t),
						i ? ((this.method = 'next'), (this.next = i.finallyLoc), g) : this.complete(s)
					)
				},
				complete: function (e, t) {
					if ('throw' === e.type) throw e.arg
					return (
						'break' === e.type || 'continue' === e.type
							? (this.next = e.arg)
							: 'return' === e.type
								? ((this.rval = this.arg = e.arg), (this.method = 'return'), (this.next = 'end'))
								: 'normal' === e.type && t && (this.next = t),
						g
					)
				},
				finish: function (e) {
					for (var t = this.tryEntries.length - 1; t >= 0; --t) {
						var n = this.tryEntries[t]
						if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), C(n), g
					}
				},
				catch: function (e) {
					for (var t = this.tryEntries.length - 1; t >= 0; --t) {
						var n = this.tryEntries[t]
						if (n.tryLoc === e) {
							var r = n.completion
							if ('throw' === r.type) {
								var o = r.arg
								C(n)
							}
							return o
						}
					}
					throw Error('illegal catch attempt')
				},
				delegateYield: function (t, n, r) {
					return (
						(this.delegate = { iterator: O(t), resultName: n, nextLoc: r }),
						'next' === this.method && (this.arg = e),
						g
					)
				},
			}),
			t
		)
	}
	function $e(e, t, n, r, o, i, s) {
		try {
			var a = e[i](s),
				c = a.value
		} catch (e) {
			return void n(e)
		}
		a.done ? t(c) : Promise.resolve(c).then(r, o)
	}
	function De(e) {
		return function () {
			var t = this,
				n = arguments
			return new Promise(function (r, o) {
				var i = e.apply(t, n)
				function s(e) {
					$e(i, r, o, s, a, 'next', e)
				}
				function a(e) {
					$e(i, r, o, s, a, 'throw', e)
				}
				s(void 0)
			})
		}
	}
	var Fe = function (e) {
			var t = Ye(e.createdAt),
				n = t.slice(6),
				r = t.slice(0, 5),
				o = Array.from(document.querySelectorAll('.date')),
				i = document.querySelector('.message-container')
			if (0 === o.length || o[o.length - 1].textContent !== n) {
				var s = document.createElement('div')
				s.classList.add('day')
				var a = document.createElement('div')
				a.classList.add('date')
				var c = document.createElement('h1')
				;(c.textContent = n), a.appendChild(c), s.appendChild(a), i.appendChild(s)
			}
			var u = rt(e.message, e._id, r)
			i.appendChild(u), (i.scrollTop = i.scrollHeight)
		},
		ze = function (e) {
			document.querySelectorAll('.chat-child').forEach(
				(function () {
					var t = De(
						Me().mark(function t(n) {
							var r, o, i, s
							return Me().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											;(r = n.querySelector('.chat-username').innerText),
												(o = n.querySelector('.avatar')),
												e && e.includes(r)
													? (!o.classList.contains('online') && o.classList.add('online'),
														n.classList.contains('active') &&
															((i = document.querySelector('.chats-head')),
															!(s = i.querySelector('.avatar')).classList.contains(
																'online'
															) && s.classList.add('online')))
													: o.classList.contains('online') && o.classList.remove('online')
										case 3:
										case 'end':
											return t.stop()
									}
							}, t)
						})
					)
					return function (e) {
						return t.apply(this, arguments)
					}
				})()
			)
		},
		Ue = Le('http://localhost:3000', { withCredentials: !0 }),
		Ge = []
	function He(e) {
		return (
			(He =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e
						}
					: function (e) {
							return e &&
								'function' == typeof Symbol &&
								e.constructor === Symbol &&
								e !== Symbol.prototype
								? 'symbol'
								: typeof e
						}),
			He(e)
		)
	}
	function Ve() {
		Ve = function () {
			return t
		}
		var e,
			t = {},
			n = Object.prototype,
			r = n.hasOwnProperty,
			o =
				Object.defineProperty ||
				function (e, t, n) {
					e[t] = n.value
				},
			i = 'function' == typeof Symbol ? Symbol : {},
			s = i.iterator || '@@iterator',
			a = i.asyncIterator || '@@asyncIterator',
			c = i.toStringTag || '@@toStringTag'
		function u(e, t, n) {
			return Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }), e[t]
		}
		try {
			u({}, '')
		} catch (e) {
			u = function (e, t, n) {
				return (e[t] = n)
			}
		}
		function l(e, t, n, r) {
			var i = t && t.prototype instanceof y ? t : y,
				s = Object.create(i.prototype),
				a = new _(r || [])
			return o(s, '_invoke', { value: T(e, n, a) }), s
		}
		function d(e, t, n) {
			try {
				return { type: 'normal', arg: e.call(t, n) }
			} catch (e) {
				return { type: 'throw', arg: e }
			}
		}
		t.wrap = l
		var h = 'suspendedStart',
			p = 'suspendedYield',
			f = 'executing',
			m = 'completed',
			g = {}
		function y() {}
		function v() {}
		function b() {}
		var w = {}
		u(w, s, function () {
			return this
		})
		var k = Object.getPrototypeOf,
			S = k && k(k(O([])))
		S && S !== n && r.call(S, s) && (w = S)
		var E = (b.prototype = y.prototype = Object.create(w))
		function L(e) {
			;['next', 'throw', 'return'].forEach(function (t) {
				u(e, t, function (e) {
					return this._invoke(t, e)
				})
			})
		}
		function x(e, t) {
			function n(o, i, s, a) {
				var c = d(e[o], e, i)
				if ('throw' !== c.type) {
					var u = c.arg,
						l = u.value
					return l && 'object' == He(l) && r.call(l, '__await')
						? t.resolve(l.__await).then(
								function (e) {
									n('next', e, s, a)
								},
								function (e) {
									n('throw', e, s, a)
								}
							)
						: t.resolve(l).then(
								function (e) {
									;(u.value = e), s(u)
								},
								function (e) {
									return n('throw', e, s, a)
								}
							)
				}
				a(c.arg)
			}
			var i
			o(this, '_invoke', {
				value: function (e, r) {
					function o() {
						return new t(function (t, o) {
							n(e, r, t, o)
						})
					}
					return (i = i ? i.then(o, o) : o())
				},
			})
		}
		function T(t, n, r) {
			var o = h
			return function (i, s) {
				if (o === f) throw Error('Generator is already running')
				if (o === m) {
					if ('throw' === i) throw s
					return { value: e, done: !0 }
				}
				for (r.method = i, r.arg = s; ; ) {
					var a = r.delegate
					if (a) {
						var c = j(a, r)
						if (c) {
							if (c === g) continue
							return c
						}
					}
					if ('next' === r.method) r.sent = r._sent = r.arg
					else if ('throw' === r.method) {
						if (o === h) throw ((o = m), r.arg)
						r.dispatchException(r.arg)
					} else 'return' === r.method && r.abrupt('return', r.arg)
					o = f
					var u = d(t, n, r)
					if ('normal' === u.type) {
						if (((o = r.done ? m : p), u.arg === g)) continue
						return { value: u.arg, done: r.done }
					}
					'throw' === u.type && ((o = m), (r.method = 'throw'), (r.arg = u.arg))
				}
			}
		}
		function j(t, n) {
			var r = n.method,
				o = t.iterator[r]
			if (o === e)
				return (
					(n.delegate = null),
					('throw' === r &&
						t.iterator.return &&
						((n.method = 'return'), (n.arg = e), j(t, n), 'throw' === n.method)) ||
						('return' !== r &&
							((n.method = 'throw'),
							(n.arg = new TypeError("The iterator does not provide a '" + r + "' method")))),
					g
				)
			var i = d(o, t.iterator, n.arg)
			if ('throw' === i.type) return (n.method = 'throw'), (n.arg = i.arg), (n.delegate = null), g
			var s = i.arg
			return s
				? s.done
					? ((n[t.resultName] = s.value),
						(n.next = t.nextLoc),
						'return' !== n.method && ((n.method = 'next'), (n.arg = e)),
						(n.delegate = null),
						g)
					: s
				: ((n.method = 'throw'),
					(n.arg = new TypeError('iterator result is not an object')),
					(n.delegate = null),
					g)
		}
		function q(e) {
			var t = { tryLoc: e[0] }
			1 in e && (t.catchLoc = e[1]),
				2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
				this.tryEntries.push(t)
		}
		function C(e) {
			var t = e.completion || {}
			;(t.type = 'normal'), delete t.arg, (e.completion = t)
		}
		function _(e) {
			;(this.tryEntries = [{ tryLoc: 'root' }]), e.forEach(q, this), this.reset(!0)
		}
		function O(t) {
			if (t || '' === t) {
				var n = t[s]
				if (n) return n.call(t)
				if ('function' == typeof t.next) return t
				if (!isNaN(t.length)) {
					var o = -1,
						i = function n() {
							for (; ++o < t.length; ) if (r.call(t, o)) return (n.value = t[o]), (n.done = !1), n
							return (n.value = e), (n.done = !0), n
						}
					return (i.next = i)
				}
			}
			throw new TypeError(He(t) + ' is not iterable')
		}
		return (
			(v.prototype = b),
			o(E, 'constructor', { value: b, configurable: !0 }),
			o(b, 'constructor', { value: v, configurable: !0 }),
			(v.displayName = u(b, c, 'GeneratorFunction')),
			(t.isGeneratorFunction = function (e) {
				var t = 'function' == typeof e && e.constructor
				return !!t && (t === v || 'GeneratorFunction' === (t.displayName || t.name))
			}),
			(t.mark = function (e) {
				return (
					Object.setPrototypeOf
						? Object.setPrototypeOf(e, b)
						: ((e.__proto__ = b), u(e, c, 'GeneratorFunction')),
					(e.prototype = Object.create(E)),
					e
				)
			}),
			(t.awrap = function (e) {
				return { __await: e }
			}),
			L(x.prototype),
			u(x.prototype, a, function () {
				return this
			}),
			(t.AsyncIterator = x),
			(t.async = function (e, n, r, o, i) {
				void 0 === i && (i = Promise)
				var s = new x(l(e, n, r, o), i)
				return t.isGeneratorFunction(n)
					? s
					: s.next().then(function (e) {
							return e.done ? e.value : s.next()
						})
			}),
			L(E),
			u(E, c, 'Generator'),
			u(E, s, function () {
				return this
			}),
			u(E, 'toString', function () {
				return '[object Generator]'
			}),
			(t.keys = function (e) {
				var t = Object(e),
					n = []
				for (var r in t) n.push(r)
				return (
					n.reverse(),
					function e() {
						for (; n.length; ) {
							var r = n.pop()
							if (r in t) return (e.value = r), (e.done = !1), e
						}
						return (e.done = !0), e
					}
				)
			}),
			(t.values = O),
			(_.prototype = {
				constructor: _,
				reset: function (t) {
					if (
						((this.prev = 0),
						(this.next = 0),
						(this.sent = this._sent = e),
						(this.done = !1),
						(this.delegate = null),
						(this.method = 'next'),
						(this.arg = e),
						this.tryEntries.forEach(C),
						!t)
					)
						for (var n in this)
							't' === n.charAt(0) && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = e)
				},
				stop: function () {
					this.done = !0
					var e = this.tryEntries[0].completion
					if ('throw' === e.type) throw e.arg
					return this.rval
				},
				dispatchException: function (t) {
					if (this.done) throw t
					var n = this
					function o(r, o) {
						return (
							(a.type = 'throw'), (a.arg = t), (n.next = r), o && ((n.method = 'next'), (n.arg = e)), !!o
						)
					}
					for (var i = this.tryEntries.length - 1; i >= 0; --i) {
						var s = this.tryEntries[i],
							a = s.completion
						if ('root' === s.tryLoc) return o('end')
						if (s.tryLoc <= this.prev) {
							var c = r.call(s, 'catchLoc'),
								u = r.call(s, 'finallyLoc')
							if (c && u) {
								if (this.prev < s.catchLoc) return o(s.catchLoc, !0)
								if (this.prev < s.finallyLoc) return o(s.finallyLoc)
							} else if (c) {
								if (this.prev < s.catchLoc) return o(s.catchLoc, !0)
							} else {
								if (!u) throw Error('try statement without catch or finally')
								if (this.prev < s.finallyLoc) return o(s.finallyLoc)
							}
						}
					}
				},
				abrupt: function (e, t) {
					for (var n = this.tryEntries.length - 1; n >= 0; --n) {
						var o = this.tryEntries[n]
						if (o.tryLoc <= this.prev && r.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
							var i = o
							break
						}
					}
					i && ('break' === e || 'continue' === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null)
					var s = i ? i.completion : {}
					return (
						(s.type = e),
						(s.arg = t),
						i ? ((this.method = 'next'), (this.next = i.finallyLoc), g) : this.complete(s)
					)
				},
				complete: function (e, t) {
					if ('throw' === e.type) throw e.arg
					return (
						'break' === e.type || 'continue' === e.type
							? (this.next = e.arg)
							: 'return' === e.type
								? ((this.rval = this.arg = e.arg), (this.method = 'return'), (this.next = 'end'))
								: 'normal' === e.type && t && (this.next = t),
						g
					)
				},
				finish: function (e) {
					for (var t = this.tryEntries.length - 1; t >= 0; --t) {
						var n = this.tryEntries[t]
						if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), C(n), g
					}
				},
				catch: function (e) {
					for (var t = this.tryEntries.length - 1; t >= 0; --t) {
						var n = this.tryEntries[t]
						if (n.tryLoc === e) {
							var r = n.completion
							if ('throw' === r.type) {
								var o = r.arg
								C(n)
							}
							return o
						}
					}
					throw Error('illegal catch attempt')
				},
				delegateYield: function (t, n, r) {
					return (
						(this.delegate = { iterator: O(t), resultName: n, nextLoc: r }),
						'next' === this.method && (this.arg = e),
						g
					)
				},
			}),
			t
		)
	}
	function We(e, t, n, r, o, i, s) {
		try {
			var a = e[i](s),
				c = a.value
		} catch (e) {
			return void n(e)
		}
		a.done ? t(c) : Promise.resolve(c).then(r, o)
	}
	function Je(e) {
		return function () {
			var t = this,
				n = arguments
			return new Promise(function (r, o) {
				var i = e.apply(t, n)
				function s(e) {
					We(i, r, o, s, a, 'next', e)
				}
				function a(e) {
					We(i, r, o, s, a, 'throw', e)
				}
				s(void 0)
			})
		}
	}
	Ue.on('getOnlineUsers', function (e) {
		;(Ge = e), ze(e)
	}),
		Ue.on(
			'newMessage',
			(function () {
				var e = De(
					Me().mark(function e(t, n, r) {
						var o, i, s
						return Me().wrap(function (e) {
							for (;;)
								switch ((e.prev = e.next)) {
									case 0:
										if (
											((o = ''),
											document.querySelectorAll('.chat-child').forEach(function (e) {
												e.querySelector('.chat-username').innerText === n && (o = e)
											}),
											'' !== o)
										) {
											e.next = 12
											break
										}
										if (
											(document.querySelectorAll('.new-chat-people').forEach(function (e) {
												var t = e.querySelector('.new-chat-people-username').innerText.trim()
												if (t === n) {
													var r = e.querySelector('.new-chat-people-name').innerText,
														i = e.querySelector('.new-chat-people-avatar').src,
														s = e.dataset.id
													o = {
														name: r,
														username: t,
														avatar: i,
														encryptedId: s,
														isOnline: !0,
													}
												}
											}),
											'' !== o)
										) {
											e.next = 11
											break
										}
										return r({ status: 'failure', error: 'Sender not found' }), e.abrupt('return')
									case 11:
										;(a = void 0),
											(a = it(o)),
											document.querySelector('.private-chats').appendChild(a),
											(o = a)
									case 12:
										o.classList.contains('active')
											? (Fe(t), r({ status: 'success' }))
											: ((i = o.children[2]),
												(s = parseInt(i.innerText) + 1),
												(i.children[0].textContent = s),
												i.classList.remove('hidden'),
												Ke(
													1 === s
														? 'You have a new message from "'.concat(n, '"')
														: 'You have '.concat(s, ' new messages from "').concat(n, '"')
												),
												r({ status: 'unread' }))
									case 13:
									case 'end':
										return e.stop()
								}
							var a
						}, e)
					})
				)
				return function (t, n, r) {
					return e.apply(this, arguments)
				}
			})()
		),
		Ue.on('deleteMessage', function (e, t) {
			var n = document.querySelector('.chat-child.active')
			n
				? n.querySelector('.chat-username').innerText === t &&
					(document.querySelectorAll('.to-user-msg').forEach(function (t) {
						t.dataset.id === e && t.remove()
					}),
					document.querySelectorAll('.from-user-msg').forEach(function (t) {
						t.dataset.id === e && t.remove()
					}),
					document.querySelectorAll('.day').forEach(function (e) {
						;(null === e.nextElementSibling || e.nextElementSibling.classList.contains('day')) && e.remove()
					}))
				: document.querySelectorAll('.chat-child').forEach(function (e) {
						if (e.querySelector('.chat-username').innerText === t) {
							var n = e.children[2]
							if (n.classList.contains('hidden')) return
							var r = parseInt(n.innerText) - 1
							;(n.children[0].textContent = r), 0 === r && n.classList.add('hidden')
						}
					})
		}),
		Ue.on('deleteConversation', function (e) {
			document.querySelectorAll('.chat-child').forEach(function (t) {
				t.querySelector('.chat-username').innerText === e && t.remove()
			})
			var t = document.getElementById('chats-head'),
				n = document.getElementById('all-chats'),
				r = document.getElementById('chats-end'),
				o = document.querySelector('#chats-end-block'),
				i = document.querySelector('.block-info'),
				s = document.querySelector('#block-to-user'),
				a = document.querySelector('#delete-chat-to-user')
			t.classList.add('hidden'),
				n.classList.add('hidden'),
				(n.querySelector('.message-container').innerHTML = ''),
				r.classList.add('hidden'),
				o.classList.add('hidden'),
				i && i.remove(),
				s.classList.remove('hidden'),
				a.classList.remove('hidden')
		}),
		Ue.on('blockUser', function (e) {
			if (document.querySelector('.chat-child.active')) {
				document.getElementById('chats-end').classList.add('hidden'),
					document.querySelector('#chats-end-block').classList.remove('hidden'),
					document.querySelector('#block-to-user').classList.add('hidden'),
					document.querySelector('#delete-chat-to-user').classList.add('hidden')
				var t = document.querySelector('.block-info')
				t.classList.contains('hidden') && t.classList.remove('hidden')
				var n = document.querySelector('.to-user-info-popup-options')
				n.classList.contains('hidden') && n.classList.remove('hidden'), n.appendChild(t)
			}
		}),
		Ue.on('unblockUser', function (e) {
			if (document.querySelector('.chat-child.active')) {
				document.querySelector('#chats-end-block').classList.add('hidden'),
					document.querySelector('#block-to-user').classList.remove('hidden'),
					document.querySelector('#delete-chat-to-user').classList.remove('hidden')
				var t = document.querySelector('.block-info')
				t.classList.contains('hidden') || t.classList.add('hidden'),
					document.getElementById('chats-end').classList.remove('hidden')
			}
		}),
		Ue.on('receiver-changed-details', function (e, t, n) {
			try {
				document.querySelectorAll('.new-chat-people').forEach(function (n) {
					n.querySelector('.new-chat-people-username').innerText.trim() === e.username &&
						((n.querySelector('.new-chat-people-name').textContent = t.name),
						(n.querySelector('.new-chat-people-username').textContent = t.username),
						(n.querySelector('.new-chat-people-avatar').src = t.avatar))
				}),
					document.querySelectorAll('.chat-child').forEach(function (n) {
						if (
							n.querySelector('.chat-username').innerText.trim() === e.username &&
							((n.querySelector('.chat-name').textContent = t.name),
							(n.querySelector('.chat-username').textContent = t.username),
							(n.querySelector('.chats-img img').src = t.avatar),
							n.classList.contains('active'))
						) {
							var r = document.querySelector('.chats-head')
							;(r.querySelector('.chat-img img').src = t.avatar),
								(r.querySelector('#chat-head-name').textContent = t.name),
								(document.querySelector('.to-user-info-popup-details img').src = t.avatar),
								(document.querySelector('.to-user-info-popup-details h3').textContent = t.name),
								(document.querySelector('.to-user-info-popup-details h4').textContent = t.username)
							var o = document.querySelector('.to-user-profile-sec')
							;(o.querySelector('.to-user-profile-sec-img img').src = t.avatar),
								(o.querySelector('.to-user-profile-sec-name h1').textContent = t.name),
								(o.querySelector('.to-user-profile-sec-name h3').textContent = t.username)
						}
					}),
					n({ status: 'success', message: 'details updated' })
			} catch (e) {
				n({ status: 'failure', error: e })
			}
		}),
		Ue.on('join-group', function (e) {
			Ue.emit('join-room', { roomId: e.roomId }),
				document.querySelector('#change-details-name').value !== e.creatorName && Ce(e.groupInfo, !1)
		}),
		Ue.on('group-message', function (e, t) {
			var n = e.groupId,
				r = e.message,
				o = e.msgId,
				i = e.createdAt,
				s = e.senderName,
				a = ''
			if (
				(document.querySelectorAll('.group-child').forEach(function (e) {
					e.dataset.id === n && (a = e)
				}),
				'' !== a)
			)
				if (a.classList.contains('active')) {
					var c = Ye(i),
						u = c.slice(6),
						l = c.slice(0, 5),
						d = Array.from(document.querySelectorAll('.date')),
						h = document.querySelector('.message-container')
					if (0 === d.length || d[d.length - 1].textContent !== u) {
						var p = document.createElement('div')
						p.classList.add('day')
						var f = document.createElement('div')
						f.classList.add('date')
						var m = document.createElement('h1')
						;(m.textContent = u), f.appendChild(m), p.appendChild(f), h.appendChild(p)
					}
					var g = Ne(r, o, l, s)
					h.appendChild(g), (h.scrollTop = h.scrollHeight), t({ status: 'success' })
				} else {
					var y = a.querySelector('.unread-badge'),
						v = parseInt(y.children[0].textContent) + 1
					;(y.children[0].textContent = v), y.classList.remove('hidden')
					var b = a.querySelector('.group-name').innerText
					Ke(
						1 === v
							? 'You have a new message in "'.concat(b, '" group')
							: 'You have '.concat(v, ' new messages in "').concat(b, '" group')
					),
						t({ status: 'unread' })
				}
			else t({ status: 'failure', error: 'Group not found' })
		}),
		Ue.on('delete-group-message', function (e) {
			var t = e.groupId,
				n = e.msgId,
				r = e.deletedBy,
				o = document.querySelectorAll('.group-child'),
				i = ''
			if (
				(o.forEach(function (e) {
					e.dataset.id === t && (i = e)
				}),
				i && i.classList.contains('active'))
			)
				i.dataset.id === t &&
					(document.querySelectorAll('.to-user-msg').forEach(function (e) {
						var t = e.dataset.id
						n === t && e.remove()
					}),
					document.querySelectorAll('.day').forEach(function (e) {
						;(null === e.nextElementSibling || e.nextElementSibling.classList.contains('day')) && e.remove()
					}))
			else if (i) {
				var s = i.querySelector('.unread-badge')
				if (s.classList.contains('hidden')) return
				var a = parseInt(s.children[0].innerText) - 1
				;(s.children[0].textContent = a), 0 === a && s.classList.add('hidden')
			}
			var c = i.querySelector('.group-name').innerText
			Ke('"'.concat(r, '" deleted a message in "').concat(c, '" group'))
		}),
		Ue.on('connect', function () {
			console.log('Connected to server')
		}),
		Ue.on('disconnect', function () {
			console.log('Disconnected from server')
		})
	var Ye = function (e) {
			var t = new Date(e),
				n = ('0' + t.getHours()).slice(-2),
				r = ('0' + t.getMinutes()).slice(-2),
				o = t.getDate().toString(),
				i = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][t.getMonth()],
				s = t.getFullYear()
			return ''.concat(n, ':').concat(r, ' ').concat(o, ' ').concat(i, ', ').concat(s)
		},
		Ke = function (e) {
			document.querySelector('#notification-alert').classList.remove('hidden'),
				(document.querySelector('#notification-alert span').textContent = e),
				setTimeout(function () {
					;(document.querySelector('#notification-alert span').textContent = ''),
						document.querySelector('#notification-alert').classList.add('hidden')
				}, 5e3)
		},
		Xe = (function () {
			var e = Je(
				Ve().mark(function e(t) {
					var n,
						r,
						o,
						i,
						s,
						a,
						c,
						u,
						l,
						d,
						h,
						p = arguments
					return Ve().wrap(function (e) {
						for (;;)
							switch ((e.prev = e.next)) {
								case 0:
									for (
										document.querySelector('.chat-child.active') &&
											document.querySelector('.chat-child.active').classList.remove('active'),
											document.querySelector('.group-child.active') &&
												document
													.querySelector('.group-child.active')
													.classList.remove('active'),
											t.classList.add('active'),
											(n = t.children[2]).children[0].textContent = 0,
											!n.classList.contains('hidden') && n.classList.add('hidden'),
											r = t.querySelector('.chat-username').innerText,
											o = {},
											i = p.length,
											s = new Array(i > 1 ? i - 1 : 0),
											a = 1;
										a < i;
										a++
									)
										s[a - 1] = p[a]
									s[0] && s[0].username === r
										? (o = s[0])
										: ((c = t.dataset.id),
											(u = t.querySelector('.chat-name').innerText),
											(l = t.querySelector('.chat-img img').src),
											(o = { encryptedId: c, name: u, avatar: l, username: r })),
										(d = !1),
										(h = t.querySelector('.avatar')),
										(d = !!h.classList.contains('online')),
										Qe(o, d),
										Ze(o)
								case 15:
								case 'end':
									return e.stop()
							}
					}, e)
				})
			)
			return function (t) {
				return e.apply(this, arguments)
			}
		})(),
		Qe = function (e) {
			var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
				n = document.getElementById('all-chats'),
				r = document.getElementById('chats-end'),
				o = document.getElementById('chats-head'),
				i = document.getElementById('chat-head-name'),
				s = document.getElementById('chat-head-img'),
				a = document.getElementById('to-user-info-popup')
			o.classList.contains('hidden') && o.classList.remove('hidden'),
				n.classList.contains('hidden') && n.classList.remove('hidden'),
				r.classList.contains('hidden') && r.classList.remove('hidden'),
				(i.textContent = e.name),
				(s.src = e.avatar
					? e.avatar
					: 'https://avatar.iran.liara.run/username?username='.concat(e.name.replace(/ /g, '+'))),
				(a.querySelector('#to-user-info-popup-name').textContent = e.name),
				(a.querySelector('#to-user-info-popup-username').textContent = e.username),
				(a.querySelector('#to-user-info-popup-img').src = e.avatar
					? e.avatar
					: 'https://avatar.iran.liara.run/username?username='.concat(e.name.replace(/ /g, '+')))
			var c = document.querySelector('.to-user-info-popup-options')
			c.classList.contains('hidden') && c.classList.remove('hidden')
			var u = document.querySelector('.group-info-popup-options')
			!u.classList.contains('hidden') && u.classList.add('hidden'),
				t
					? o.querySelector('.avatar').classList.add('online')
					: o.querySelector('.avatar').classList.remove('online')
			var l = document.querySelector('#copy-group-link-btn')
			!l.classList.contains('hidden') && l.classList.add('hidden')
		},
		Ze = function (e) {
			var t = document.querySelector('.chat-section')
			t.classList.contains('hidden') && t.classList.remove('hidden'),
				(document.querySelector('.to-user-profile-sec-img img').src = e.avatar
					? e.avatar
					: 'https://avatar.iran.liara.run/username?username='.concat(e.name.replace(/ /g, '+')))
			var n = document.querySelector('.to-user-profile-sec-name h1'),
				r = document.querySelector('.to-user-profile-sec-name h3')
			;(n.textContent = e.name), (r.textContent = e.username), (r.parentElement.dataset.tip = e.username)
			var o = e.encryptedId
			et(o)
		},
		et = function (e) {
			var t = document.getElementById('chats-end')
			fetch('/conv-api/get-conversation', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ receiverId: e }),
			})
				.then(function (e) {
					return e.json()
				})
				.then(function (e) {
					var n = e.isBlocked,
						r = e.blockedBy,
						o = e.senderId
					n &&
						(t.classList.add('hidden'),
						document.querySelector('#chats-end-block').classList.remove('hidden'))
					if (r === o) document.querySelector('#block-to-user').children[0].textContent = 'Unblock'
					else if (null !== r) {
						document.querySelector('#block-to-user').classList.add('hidden'),
							document.querySelector('#delete-chat-to-user').classList.add('hidden')
						var i = document.querySelector('.block-info')
						i.classList.contains('hidden') && i.classList.remove('hidden')
						var s = document.querySelector('.to-user-info-popup-options')
						s.classList.contains('hidden') && s.classList.remove('hidden'), s.appendChild(i)
					}
					tt(e)
				})
				.catch(function (e) {
					console.log('Error in getting conversation: ', e)
				})
		},
		tt = function (e) {
			var t = e.senderId,
				n = document.querySelector('.message-container')
			if (0 !== e.messages.length) {
				n.textContent = ''
				var r = ''
				;(e.messages = e.messages.filter(function (e) {
					return null !== e
				})),
					e.messages.forEach(function (e) {
						var o = Ye(e.createdAt).slice(6)
						if (o !== r) {
							r = o
							var i = document.createElement('div')
							i.classList.add('day')
							var s = document.createElement('div')
							s.classList.add('date')
							var a = document.createElement('h1')
							;(a.textContent = r), s.appendChild(a), i.appendChild(s), n.appendChild(i)
						}
						if (e.senderId === t) {
							var c = nt(e.message, e._id, Ye(e.createdAt).slice(0, 5))
							n.appendChild(c)
						} else {
							var u = rt(e.message, e._id, Ye(e.createdAt).slice(0, 5))
							n.appendChild(u)
						}
					}),
					(n.scrollTop = n.scrollHeight)
			} else n.textContent = ''
		},
		nt = function (e, t, n) {
			var r = document.createElement('div')
			return (
				r.classList.add('from-user-msg'),
				(r.dataset.id = t),
				(r.innerHTML =
					'\n        <div class="delete-msg-btn hidden pr-2">\n            <button class="btn btn-circle btn-outline border-neutral bg-neutral hover:bg-accent hover:border-accent h-6 w-6 min-h-4 group">\n                <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4 stroke-accent group-hover:stroke-neutral" xmlns="http://www.w3.org/2000/svg">\n                    <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>\n                </svg>\n            </button>\n        </div>\n        <div id="from-user-msg-container" class="msg-container">\n            <p class="py-1 text-base font-semibold text-black whitespace-pre-wrap">'
						.concat(e, '</p>\n            <span class="text-sm font-normal text-black">')
						.concat(n, '</span>\n        </div>\n    ')),
				r
			)
		},
		rt = function (e, t, n) {
			var r = document.createElement('div')
			return (
				r.classList.add('to-user-msg'),
				(r.dataset.id = t),
				(r.innerHTML =
					'\n        <div id="to-user-msg-container" class="msg-container">\n            <p class="py-1 text-base font-semibold text-black whitespace-pre-wrap">'
						.concat(e, '</p>\n            <span class="text-sm font-normal text-black">')
						.concat(
							n,
							'</span>\n        </div>\n        <div class="delete-msg-btn hidden pl-2">\n            <button class="btn btn-circle btn-outline border-accent bg-accent hover:bg-neutral hover:border-neutral h-6 w-6 min-h-4 group">\n                <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4 stroke-neutral group-hover:stroke-accent" xmlns="http://www.w3.org/2000/svg">\n                    <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>\n                </svg>\n            </button>\n        </div>\n    '
						)),
				r
			)
		},
		ot = function (e) {
			var t = it(e)
			document.querySelector('.private-chats').appendChild(t), Xe(t, e), ze(Ge)
		},
		it = function (e) {
			var t = document.createElement('div')
			t.classList.add('chat-child', 'group'), (t.dataset.id = e.encryptedId ? e.encryptedId : e._id)
			var n = e.isOnline ? 'online' : ''
			return (
				(t.innerHTML = '\n        <div class="avatar '
					.concat(
						n,
						'">\n            <div class="chat-img w-14 scale-110 rounded-full">\n                <img draggable="false" class="scale-110" src="'
					)
					.concat(e.avatar, '" alt="')
					.concat(
						e.username,
						'" />\n            </div>\n        </div>\n        <div class="chat-name-parent">\n            <h4 class="chat-name">'
					)
					.concat(e.name, '</h4>\n            <h4 class="chat-username">')
					.concat(
						e.username,
						'</h4>\n        </div>\n        <div class="unread-badge hidden right-8">\n            <div class="badge bg-secondary text-white">0</div>\n        </div>\n    '
					)),
				t
			)
		},
		st = (function () {
			var e = Je(
				Ve().mark(function e(t) {
					var n, r, o, i, s, a, c, u, l, d, h, p
					return Ve().wrap(function (e) {
						for (;;)
							switch ((e.prev = e.next)) {
								case 0:
									if (
										((n = !1),
										(r = ''),
										(o = t.children[1].children[1].innerText),
										(i = document.querySelector('#change-details-username').value),
										(s = [
											"Talking to yourself? It's not a bug, it's a feature request!",
											'Self-chatting: the ultimate form of code review.',
											'Error 404: Self-chat not found. But hey, who needs other people?',
											"Trying to chat with yourself? Sorry, we're still working on that mirror feature.",
											'Self-chatting: because sometimes even your code needs a pep talk.',
											'Looks like you want to talk to yourself. We call that solo debugging!',
											'No self-chatting yet, but we admire your self-confidence!',
											'Attempting self-chat? Our servers recommend a rubber duck instead.',
											'Self-chatting not available. Try talking to your rubber duck instead!',
											"Hold on, we're still working on that 'inner monologue' feature.",
											'Self-chatting is under construction. Meanwhile, feel free to talk to your plants!',
											"Mirror, mirror on the wall, self-chat isn't here at all!",
											'Self-chatting feature in progress. For now, practice your stand-up routine!',
											'Talking to yourself? You must be debugging in style!',
											"Self-chat isn't ready, but you can always practice your next big speech.",
											"Looks like you're trying to chat with yourself. Maybe take a coffee break instead!",
											'Self-chat feature coming soon. In the meantime, how about a quick meditation session?',
											"Self-chatting isn't supported yet. Try our premium feature: talking to a pillow!",
										]),
										o !== i)
									) {
										e.next = 12
										break
									}
									return (
										(a = document.querySelector('.alert')),
										((c = a.querySelector('span')).innerHTML =
											"Well, you found an easter egg! Here's a joke: <b>".concat(
												s[Math.floor(Math.random() * s.length)],
												'</b>'
											)),
										a.classList.remove('hidden'),
										setTimeout(function () {
											a.classList.add('hidden'), (c.textContent = '')
										}, 15e3),
										e.abrupt('return')
									)
								case 12:
									;(u = t.children[1].children[0].innerText),
										(l = t.children[0].src),
										(d = t.dataset.id),
										(h = { encryptedId: d, name: u, username: o, avatar: l }),
										!(p = document.querySelector('.private-chats')).open && (p.open = !0),
										document.querySelectorAll('.chat-child').forEach(function (e) {
											e.querySelector('.chat-username').innerText === h.username &&
												((n = !0),
												(r = e),
												e.classList.contains('hidden') && e.classList.remove('hidden'))
										}),
										n
											? Xe(r, h)
											: fetch('/add-people-api/add-people-to-chat', {
													method: 'POST',
													headers: { 'Content-Type': 'application/json' },
													body: JSON.stringify({ receiverId: h.encryptedId }),
												})
													.then(function (e) {
														return e.json()
													})
													.then(function (e) {
														'Added people to chat' === e.message && ot(e.newPerson)
													})
													.catch(function (e) {
														console.log('Error getting people', e)
													}),
										document.querySelector('#transparent-modal').click()
								case 22:
								case 'end':
									return e.stop()
							}
					}, e)
				})
			)
			return function (t) {
				return e.apply(this, arguments)
			}
		})(),
		at = function (e) {
			var t = document.querySelector('.message-container'),
				n = Ye(e.createdAt),
				r = n.slice(6),
				o = n.slice(0, 5),
				i = Array.from(document.querySelectorAll('.date'))
			if (0 === i.length || i[i.length - 1].innerText !== r) {
				var s = document.createElement('div')
				s.classList.add('day')
				var a = document.createElement('div')
				a.classList.add('date')
				var c = document.createElement('h1')
				;(c.textContent = r), a.appendChild(c), s.appendChild(a), t.appendChild(s)
			}
			var u = nt(e.message, e._id, o)
			t.appendChild(u), (t.scrollTop = t.scrollHeight)
		},
		ct = (function () {
			var e = Je(
				Ve().mark(function e(t, n) {
					return Ve().wrap(function (e) {
						for (;;)
							switch ((e.prev = e.next)) {
								case 0:
									fetch('/chat/send-message', {
										method: 'POST',
										headers: { 'Content-Type': 'application/json' },
										body: JSON.stringify({ receiverId: t, message: n }),
									})
										.then(function (e) {
											return e.json()
										})
										.then(function (e) {
											if ('User is blocked' === e.message) {
												var t = document.querySelector('.alert')
												;(t.children[1].innerHTML = 'User is blocked'),
													t.classList.remove('hidden'),
													setTimeout(function () {
														t.classList.add('hidden')
													}, 5e3)
											} else at(e)
										})
										.catch(function (e) {
											console.log('Error in sending message: ', e)
										})
								case 1:
								case 'end':
									return e.stop()
							}
					}, e)
				})
			)
			return function (t, n) {
				return e.apply(this, arguments)
			}
		})(),
		ut = (function () {
			var e = Je(
				Ve().mark(function e(t) {
					var n, r
					return Ve().wrap(function (e) {
						for (;;)
							switch ((e.prev = e.next)) {
								case 0:
									;(n = t.dataset.id),
										(r = document.querySelector('.chat-child.active').dataset.id),
										fetch('/chat/delete-message', {
											method: 'POST',
											headers: { 'Content-Type': 'application/json' },
											body: JSON.stringify({ receiverId: r, msgId: n }),
										})
											.then(function (e) {
												return e.json()
											})
											.then(function (e) {
												if ('Message deleted' === e.message) {
													t.remove(),
														document.querySelectorAll('.day').forEach(function (e) {
															;(null === e.nextElementSibling ||
																e.nextElementSibling.classList.contains('day')) &&
																e.remove()
														})
													var n = document.querySelector('.alert')
													;(n.children[1].textContent = 'Message deleted for both'),
														n.classList.remove('hidden'),
														setTimeout(function () {
															n.classList.add('hidden')
														}, 5e3)
												}
											})
											.catch(function (e) {
												console.log('Error in deleting message: ', e)
											})
								case 3:
								case 'end':
									return e.stop()
							}
					}, e)
				})
			)
			return function (t) {
				return e.apply(this, arguments)
			}
		})(),
		lt = (function () {
			var e = Je(
				Ve().mark(function e() {
					var t, n, r, o, i, s
					return Ve().wrap(function (e) {
						for (;;)
							switch ((e.prev = e.next)) {
								case 0:
									;(t = document.getElementById('all-chats')),
										(n = document.getElementById('chats-end')),
										(r = document.getElementById('chats-head')),
										(o = document.querySelector('#chats-end-block')),
										(i = document.querySelector('.chat-child.active')),
										(s = i.dataset.id),
										fetch('/chat/delete-conversation', {
											method: 'POST',
											headers: { 'Content-Type': 'application/json' },
											body: JSON.stringify({ receiverId: s }),
										})
											.then(function (e) {
												return e.json()
											})
											.then(function (e) {
												if ('Conversation deleted' === e.message) {
													i.remove(),
														r.classList.add('hidden'),
														t.classList.add('hidden'),
														n.classList.add('hidden'),
														o.classList.add('hidden')
													var s = document.querySelector('.alert')
													;(s.children[1].textContent = 'Conversation deleted'),
														s.classList.remove('hidden'),
														setTimeout(function () {
															s.classList.add('hidden')
														}, 5e3)
												}
											})
											.catch(function (e) {
												console.log('Error in deleting conversation: ', e)
											})
								case 7:
								case 'end':
									return e.stop()
							}
					}, e)
				})
			)
			return function () {
				return e.apply(this, arguments)
			}
		})(),
		dt = function (e, t) {
			var n = document.getElementById('chats-end'),
				r = document.querySelector('#chats-end-block')
			fetch('/chat/block-user', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ receiverId: e }),
			})
				.then(function (e) {
					return e.json()
				})
				.then(function (e) {
					'User blocked' === e.message &&
						((t.children[0].textContent = 'Unblock'),
						n.classList.add('hidden'),
						r.classList.remove('hidden'))
				})
				.catch(function (e) {
					console.log('Error in blocking user: ', e)
				})
		},
		ht = function (e, t) {
			var n = document.getElementById('chats-end'),
				r = document.querySelector('#chats-end-block')
			fetch('/chat/unblock-user', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ receiverId: e }),
			})
				.then(function (e) {
					return e.json()
				})
				.then(function (e) {
					'User unblocked' === e.message &&
						((t.children[0].textContent = 'Block'), r.classList.add('hidden'), n.classList.remove('hidden'))
				})
				.catch(function (e) {
					console.log('Error in unblocking user: ', e)
				})
		},
		pt = (function () {
			var e = Je(
				Ve().mark(function e(t) {
					var n, r
					return Ve().wrap(function (e) {
						for (;;)
							switch ((e.prev = e.next)) {
								case 0:
									;(n = document.querySelector('.chat-child.active')),
										(r = n.dataset.id),
										'Block' === t.children[0].innerText ? dt(r, t) : ht(r, t)
								case 4:
								case 'end':
									return e.stop()
							}
					}, e)
				})
			)
			return function (t) {
				return e.apply(this, arguments)
			}
		})(),
		ft = setInterval(function () {
			fetch('/auth/jwt/refresh-token', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
				.then(function (e) {
					return e.json()
				})
				.then(function (e) {
					console.log(e), e.error && clearInterval(ft)
				})
				.catch(function (e) {
					return console.log(e.message)
				})
		}, 3e5)
	function mt(e) {
		return (
			(mt =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function (e) {
							return typeof e
						}
					: function (e) {
							return e &&
								'function' == typeof Symbol &&
								e.constructor === Symbol &&
								e !== Symbol.prototype
								? 'symbol'
								: typeof e
						}),
			mt(e)
		)
	}
	function gt(e, t) {
		var n = ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator']
		if (!n) {
			if (
				Array.isArray(e) ||
				(n = (function (e, t) {
					if (e) {
						if ('string' == typeof e) return yt(e, t)
						var n = {}.toString.call(e).slice(8, -1)
						return (
							'Object' === n && e.constructor && (n = e.constructor.name),
							'Map' === n || 'Set' === n
								? Array.from(e)
								: 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
									? yt(e, t)
									: void 0
						)
					}
				})(e)) ||
				(t && e && 'number' == typeof e.length)
			) {
				n && (e = n)
				var r = 0,
					o = function () {}
				return {
					s: o,
					n: function () {
						return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] }
					},
					e: function (e) {
						throw e
					},
					f: o,
				}
			}
			throw new TypeError(
				'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
			)
		}
		var i,
			s = !0,
			a = !1
		return {
			s: function () {
				n = n.call(e)
			},
			n: function () {
				var e = n.next()
				return (s = e.done), e
			},
			e: function (e) {
				;(a = !0), (i = e)
			},
			f: function () {
				try {
					s || null == n.return || n.return()
				} finally {
					if (a) throw i
				}
			},
		}
	}
	function yt(e, t) {
		;(null == t || t > e.length) && (t = e.length)
		for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n]
		return r
	}
	function vt() {
		vt = function () {
			return t
		}
		var e,
			t = {},
			n = Object.prototype,
			r = n.hasOwnProperty,
			o =
				Object.defineProperty ||
				function (e, t, n) {
					e[t] = n.value
				},
			i = 'function' == typeof Symbol ? Symbol : {},
			s = i.iterator || '@@iterator',
			a = i.asyncIterator || '@@asyncIterator',
			c = i.toStringTag || '@@toStringTag'
		function u(e, t, n) {
			return Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }), e[t]
		}
		try {
			u({}, '')
		} catch (e) {
			u = function (e, t, n) {
				return (e[t] = n)
			}
		}
		function l(e, t, n, r) {
			var i = t && t.prototype instanceof y ? t : y,
				s = Object.create(i.prototype),
				a = new _(r || [])
			return o(s, '_invoke', { value: T(e, n, a) }), s
		}
		function d(e, t, n) {
			try {
				return { type: 'normal', arg: e.call(t, n) }
			} catch (e) {
				return { type: 'throw', arg: e }
			}
		}
		t.wrap = l
		var h = 'suspendedStart',
			p = 'suspendedYield',
			f = 'executing',
			m = 'completed',
			g = {}
		function y() {}
		function v() {}
		function b() {}
		var w = {}
		u(w, s, function () {
			return this
		})
		var k = Object.getPrototypeOf,
			S = k && k(k(O([])))
		S && S !== n && r.call(S, s) && (w = S)
		var E = (b.prototype = y.prototype = Object.create(w))
		function L(e) {
			;['next', 'throw', 'return'].forEach(function (t) {
				u(e, t, function (e) {
					return this._invoke(t, e)
				})
			})
		}
		function x(e, t) {
			function n(o, i, s, a) {
				var c = d(e[o], e, i)
				if ('throw' !== c.type) {
					var u = c.arg,
						l = u.value
					return l && 'object' == mt(l) && r.call(l, '__await')
						? t.resolve(l.__await).then(
								function (e) {
									n('next', e, s, a)
								},
								function (e) {
									n('throw', e, s, a)
								}
							)
						: t.resolve(l).then(
								function (e) {
									;(u.value = e), s(u)
								},
								function (e) {
									return n('throw', e, s, a)
								}
							)
				}
				a(c.arg)
			}
			var i
			o(this, '_invoke', {
				value: function (e, r) {
					function o() {
						return new t(function (t, o) {
							n(e, r, t, o)
						})
					}
					return (i = i ? i.then(o, o) : o())
				},
			})
		}
		function T(t, n, r) {
			var o = h
			return function (i, s) {
				if (o === f) throw Error('Generator is already running')
				if (o === m) {
					if ('throw' === i) throw s
					return { value: e, done: !0 }
				}
				for (r.method = i, r.arg = s; ; ) {
					var a = r.delegate
					if (a) {
						var c = j(a, r)
						if (c) {
							if (c === g) continue
							return c
						}
					}
					if ('next' === r.method) r.sent = r._sent = r.arg
					else if ('throw' === r.method) {
						if (o === h) throw ((o = m), r.arg)
						r.dispatchException(r.arg)
					} else 'return' === r.method && r.abrupt('return', r.arg)
					o = f
					var u = d(t, n, r)
					if ('normal' === u.type) {
						if (((o = r.done ? m : p), u.arg === g)) continue
						return { value: u.arg, done: r.done }
					}
					'throw' === u.type && ((o = m), (r.method = 'throw'), (r.arg = u.arg))
				}
			}
		}
		function j(t, n) {
			var r = n.method,
				o = t.iterator[r]
			if (o === e)
				return (
					(n.delegate = null),
					('throw' === r &&
						t.iterator.return &&
						((n.method = 'return'), (n.arg = e), j(t, n), 'throw' === n.method)) ||
						('return' !== r &&
							((n.method = 'throw'),
							(n.arg = new TypeError("The iterator does not provide a '" + r + "' method")))),
					g
				)
			var i = d(o, t.iterator, n.arg)
			if ('throw' === i.type) return (n.method = 'throw'), (n.arg = i.arg), (n.delegate = null), g
			var s = i.arg
			return s
				? s.done
					? ((n[t.resultName] = s.value),
						(n.next = t.nextLoc),
						'return' !== n.method && ((n.method = 'next'), (n.arg = e)),
						(n.delegate = null),
						g)
					: s
				: ((n.method = 'throw'),
					(n.arg = new TypeError('iterator result is not an object')),
					(n.delegate = null),
					g)
		}
		function q(e) {
			var t = { tryLoc: e[0] }
			1 in e && (t.catchLoc = e[1]),
				2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
				this.tryEntries.push(t)
		}
		function C(e) {
			var t = e.completion || {}
			;(t.type = 'normal'), delete t.arg, (e.completion = t)
		}
		function _(e) {
			;(this.tryEntries = [{ tryLoc: 'root' }]), e.forEach(q, this), this.reset(!0)
		}
		function O(t) {
			if (t || '' === t) {
				var n = t[s]
				if (n) return n.call(t)
				if ('function' == typeof t.next) return t
				if (!isNaN(t.length)) {
					var o = -1,
						i = function n() {
							for (; ++o < t.length; ) if (r.call(t, o)) return (n.value = t[o]), (n.done = !1), n
							return (n.value = e), (n.done = !0), n
						}
					return (i.next = i)
				}
			}
			throw new TypeError(mt(t) + ' is not iterable')
		}
		return (
			(v.prototype = b),
			o(E, 'constructor', { value: b, configurable: !0 }),
			o(b, 'constructor', { value: v, configurable: !0 }),
			(v.displayName = u(b, c, 'GeneratorFunction')),
			(t.isGeneratorFunction = function (e) {
				var t = 'function' == typeof e && e.constructor
				return !!t && (t === v || 'GeneratorFunction' === (t.displayName || t.name))
			}),
			(t.mark = function (e) {
				return (
					Object.setPrototypeOf
						? Object.setPrototypeOf(e, b)
						: ((e.__proto__ = b), u(e, c, 'GeneratorFunction')),
					(e.prototype = Object.create(E)),
					e
				)
			}),
			(t.awrap = function (e) {
				return { __await: e }
			}),
			L(x.prototype),
			u(x.prototype, a, function () {
				return this
			}),
			(t.AsyncIterator = x),
			(t.async = function (e, n, r, o, i) {
				void 0 === i && (i = Promise)
				var s = new x(l(e, n, r, o), i)
				return t.isGeneratorFunction(n)
					? s
					: s.next().then(function (e) {
							return e.done ? e.value : s.next()
						})
			}),
			L(E),
			u(E, c, 'Generator'),
			u(E, s, function () {
				return this
			}),
			u(E, 'toString', function () {
				return '[object Generator]'
			}),
			(t.keys = function (e) {
				var t = Object(e),
					n = []
				for (var r in t) n.push(r)
				return (
					n.reverse(),
					function e() {
						for (; n.length; ) {
							var r = n.pop()
							if (r in t) return (e.value = r), (e.done = !1), e
						}
						return (e.done = !0), e
					}
				)
			}),
			(t.values = O),
			(_.prototype = {
				constructor: _,
				reset: function (t) {
					if (
						((this.prev = 0),
						(this.next = 0),
						(this.sent = this._sent = e),
						(this.done = !1),
						(this.delegate = null),
						(this.method = 'next'),
						(this.arg = e),
						this.tryEntries.forEach(C),
						!t)
					)
						for (var n in this)
							't' === n.charAt(0) && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = e)
				},
				stop: function () {
					this.done = !0
					var e = this.tryEntries[0].completion
					if ('throw' === e.type) throw e.arg
					return this.rval
				},
				dispatchException: function (t) {
					if (this.done) throw t
					var n = this
					function o(r, o) {
						return (
							(a.type = 'throw'), (a.arg = t), (n.next = r), o && ((n.method = 'next'), (n.arg = e)), !!o
						)
					}
					for (var i = this.tryEntries.length - 1; i >= 0; --i) {
						var s = this.tryEntries[i],
							a = s.completion
						if ('root' === s.tryLoc) return o('end')
						if (s.tryLoc <= this.prev) {
							var c = r.call(s, 'catchLoc'),
								u = r.call(s, 'finallyLoc')
							if (c && u) {
								if (this.prev < s.catchLoc) return o(s.catchLoc, !0)
								if (this.prev < s.finallyLoc) return o(s.finallyLoc)
							} else if (c) {
								if (this.prev < s.catchLoc) return o(s.catchLoc, !0)
							} else {
								if (!u) throw Error('try statement without catch or finally')
								if (this.prev < s.finallyLoc) return o(s.finallyLoc)
							}
						}
					}
				},
				abrupt: function (e, t) {
					for (var n = this.tryEntries.length - 1; n >= 0; --n) {
						var o = this.tryEntries[n]
						if (o.tryLoc <= this.prev && r.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
							var i = o
							break
						}
					}
					i && ('break' === e || 'continue' === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null)
					var s = i ? i.completion : {}
					return (
						(s.type = e),
						(s.arg = t),
						i ? ((this.method = 'next'), (this.next = i.finallyLoc), g) : this.complete(s)
					)
				},
				complete: function (e, t) {
					if ('throw' === e.type) throw e.arg
					return (
						'break' === e.type || 'continue' === e.type
							? (this.next = e.arg)
							: 'return' === e.type
								? ((this.rval = this.arg = e.arg), (this.method = 'return'), (this.next = 'end'))
								: 'normal' === e.type && t && (this.next = t),
						g
					)
				},
				finish: function (e) {
					for (var t = this.tryEntries.length - 1; t >= 0; --t) {
						var n = this.tryEntries[t]
						if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), C(n), g
					}
				},
				catch: function (e) {
					for (var t = this.tryEntries.length - 1; t >= 0; --t) {
						var n = this.tryEntries[t]
						if (n.tryLoc === e) {
							var r = n.completion
							if ('throw' === r.type) {
								var o = r.arg
								C(n)
							}
							return o
						}
					}
					throw Error('illegal catch attempt')
				},
				delegateYield: function (t, n, r) {
					return (
						(this.delegate = { iterator: O(t), resultName: n, nextLoc: r }),
						'next' === this.method && (this.arg = e),
						g
					)
				},
			}),
			t
		)
	}
	function bt(e, t, n, r, o, i, s) {
		try {
			var a = e[i](s),
				c = a.value
		} catch (e) {
			return void n(e)
		}
		a.done ? t(c) : Promise.resolve(c).then(r, o)
	}
	function wt(e) {
		return function () {
			var t = this,
				n = arguments
			return new Promise(function (r, o) {
				var i = e.apply(t, n)
				function s(e) {
					bt(i, r, o, s, a, 'next', e)
				}
				function a(e) {
					bt(i, r, o, s, a, 'throw', e)
				}
				s(void 0)
			})
		}
	}
	var kt = document.querySelector('#add-chat-popup').innerHTML
	document.querySelector('#transparent-modal').addEventListener('click', function () {
		var e = document.getElementById('add-chat-btn'),
			t = document.querySelector('#transparent-modal'),
			n = document.getElementById('to-user-info-popup'),
			r = document.getElementById('to-user-info-btn'),
			o = document.getElementById('emoji-popup'),
			i = document.querySelector('#all-group-members-btn'),
			s = document.getElementById('add-chat-popup')
		s.classList.contains('hidden') || ((s.innerHTML = kt), St(), s.classList.add('hidden')),
			e.classList.remove('active'),
			r.classList.remove('active'),
			n.classList.add('hidden'),
			o.classList.add('hidden'),
			e.classList.contains('z-30') && e.classList.remove('z-30'),
			i.parentElement.open && (i.parentElement.open = !1),
			t.classList.add('hidden')
	}),
		document.getElementById('add-chat-btn').addEventListener('click', function (e) {
			var t = document.getElementById('add-chat-btn'),
				n = document.getElementById('add-chat-popup'),
				r = document.querySelector('.all-new-chat-people'),
				o = document.getElementById('new-chat-search'),
				i = document.querySelector('#transparent-modal')
			t.classList.toggle('active'),
				t.classList.toggle('z-30'),
				n.classList.contains('hidden')
					? (n.classList.remove('hidden'), i.classList.remove('hidden'), o.focus(), (r.scrollTop = 0))
					: (n.classList.add('hidden'), i.classList.add('hidden'))
		}),
		document.getElementById('to-user-info-btn').addEventListener('click', function () {
			var e = document.querySelector('#transparent-modal'),
				t = document.getElementById('to-user-info-popup'),
				n = document.getElementById('to-user-info-btn')
			t.classList.contains('hidden')
				? (t.classList.remove('hidden'), e.classList.remove('hidden'), n.classList.add('active'))
				: (t.classList.add('hidden'), e.classList.add('hidden'), n.classList.remove('active'))
		}),
		document.getElementById('send-btn').addEventListener('click', function (e) {
			e.preventDefault()
			var t = document.getElementById('msg-input'),
				n = DOMPurify.sanitize(t.value)
			if (((t.value = ''), t.focus(), n.length > 0))
				if (document.querySelector('.chat-child.active')) {
					var r = document.querySelector('.chat-child.active').dataset.id
					ct(r, n)
				} else if (document.querySelector('.group-child.active')) {
					var o = document.querySelector('.group-child.active').dataset.id
					Pe(o, n)
				}
		}),
		document.getElementById('msg-input').addEventListener('keydown', function (e) {
			var t = document.getElementById('msg-input')
			if ('Enter' !== e.key || e.shiftKey) {
				if (e.shiftKey && 'Enter' === e.key) {
					e.preventDefault()
					var n = t.selectionStart,
						r = t.value
					;(t.value = r.slice(0, n) + '\n' + r.slice(n)), (t.selectionEnd = n + 1)
				}
			} else {
				e.preventDefault()
				var o = DOMPurify.sanitize(t.value)
				if (((t.value = ''), t.focus(), o.length > 0))
					if (document.querySelector('.chat-child.active')) {
						var i = document.querySelector('.chat-child.active').dataset.id
						ct(i, o)
					} else if (document.querySelector('.group-child.active')) {
						var s = document.querySelector('.group-child.active').dataset.id
						Pe(s, o)
					}
			}
		}),
		document.querySelector('.message-container').addEventListener('click', function (e) {
			if (e.target.closest('.delete-msg-btn')) {
				var t = e.target.closest('.delete-msg-btn').parentElement
				document.querySelector('.chat-child.active')
					? ut(t)
					: document.querySelector('.group-child.active') &&
						(function (e) {
							var t = e.dataset.id,
								n = document.querySelector('.group-child.active').dataset.id
							fetch('/group-chat-api/delete-group-message', {
								method: 'POST',
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify({ groupId: n, msgId: t }),
							})
								.then(function (e) {
									return e.json()
								})
								.then(function (t) {
									if (t.success) {
										e.remove(),
											document.querySelectorAll('.day').forEach(function (e) {
												;(null === e.nextElementSibling ||
													e.nextElementSibling.classList.contains('day')) &&
													e.remove()
											})
										var n = document.querySelector('.alert')
										;(n.children[1].textContent = 'Message deleted for both'),
											n.classList.remove('hidden'),
											setTimeout(function () {
												n.classList.add('hidden')
											}, 5e3)
									}
								})
								.catch(function (e) {
									console.log('Error in deleting group message: ', e)
								})
						})(t)
			}
		}),
		document.querySelector('#delete-chat-to-user').addEventListener('click', function () {
			lt()
		}),
		document.querySelector('#block-to-user').addEventListener('click', function () {
			pt(document.querySelector('#block-to-user'))
		}),
		document.querySelector('#from-user-modal-img').addEventListener('click', function () {
			my_modal_2.showModal()
		}),
		document.querySelector('#change-profilePic-btn').addEventListener('click', function () {
			var e = document.querySelector('#change-details-profilePic')
			fetch('/api/get-avatar')
				.then(function (e) {
					return e.json()
				})
				.then(function (t) {
					e.src = t.avatar
				})
				.catch(function (e) {
					console.log('Error in getting avatar: ', e)
				})
		}),
		document.querySelector('#chat-change-details-done-btn').addEventListener('click', function () {
			var e = DOMPurify.sanitize(document.querySelector('#change-details-name').value),
				t = DOMPurify.sanitize(document.querySelector('#change-details-username').value),
				n = DOMPurify.sanitize(document.querySelector('#change-details-gender option:checked').value),
				r = document.querySelector('#change-details-profilePic').src,
				o = DOMPurify.sanitize(document.querySelector('input[name="CSRFToken"]').value)
			fetch('/api/change-details', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'x-csrf-token': o },
				body: JSON.stringify({ name: e, username: t, gender: n, avatar: r }),
			})
				.then(function (e) {
					return e.json()
				})
				.then(function (e) {
					e.success && (document.querySelector('#from-user-modal-img').src = e.user.avatar),
						'Username already taken' === e.message && (t.textContent = e.user.username),
						Ke(e.message)
				})
				.catch(function (e) {
					console.log('Error in changing details: ', e),
						Ke('Error in changing details! Please refresh the page and try again.')
				})
		}),
		document.querySelector('.all-group-members').addEventListener('click', function (e) {
			e.target.closest('.group-member') && st(e.target.closest('.group-member'))
		}),
		document.querySelector('.chat-parent').addEventListener('click', function (e) {
			e.target.closest('.chat-child')
				? Xe(e.target.closest('.chat-child'))
				: e.target.closest('.group-child') && _e(e.target.closest('.group-child'))
		}),
		document.querySelector('#leave-and-delete-group').addEventListener('click', function () {
			var e = document.querySelector('.group-child.active').dataset.id
			fetch('/group-chat-api/leave-and-delete-group', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ groupId: e }),
			})
				.then(function (e) {
					return e.json()
				})
				.then(function (t) {
					if (t.success) {
						document.querySelector('.group-child[data-id="'.concat(e, '"]')).remove(),
							document.querySelector('#transparent-modal').click()
						var n = document.getElementById('chats-head'),
							r = document.getElementById('all-chats'),
							o = document.getElementById('chats-end')
						n.classList.add('hidden'), r.classList.add('hidden'), o.classList.add('hidden')
						var i = document.querySelector('.alert')
						;(i.children[1].textContent = 'Group left and deleted'),
							i.classList.remove('hidden'),
							setTimeout(function () {
								i.classList.add('hidden')
							}, 5e3)
					}
				})
				.catch(function (e) {
					console.log('Error in leaving and deleting group: ', e)
				})
		}),
		document.querySelector('#all-group-members-btn').addEventListener('click', function () {
			if (!document.querySelector('#all-group-members-btn').parentElement.open) {
				var e = document.querySelector('.group-child.active').dataset.id
				fetch('/group-chat-api/get-group-members', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ groupId: e }),
				})
					.then(function (e) {
						return e.json()
					})
					.then(function (e) {
						if (e.success) {
							var t = e.groupMembers,
								n = document.querySelector('.all-group-members')
							n.textContent = ''
							var r = t.length
							;(n.previousElementSibling.querySelector('span').textContent = r),
								t.forEach(function (e) {
									var t = (function (e) {
										var t = document.createElement('div')
										return (
											t.classList.add('group-member', 'group'),
											(t.dataset.id = e.encryptedId),
											(t.innerHTML =
												'\n        <img draggable="false" class="group-member-avatar h-10 w-10 rounded-full" src="'
													.concat(e.avatar, '" alt="')
													.concat(
														e.username,
														'" />\n        <div class="group-memeber-name-parent w-4/5 pl-2">\n            <h3 \n                class="group-member-name overflow-hidden text-ellipsis whitespace-nowrap pl-2 text-sm font-semibold text-white group-hover:text-black"\n            >\n                '
													)
													.concat(
														e.name,
														'\n            </h3>\n            <h4\n                class="group-member-username overflow-hidden text-ellipsis whitespace-nowrap pl-2 text-xs font-medium text-white group-hover:text-black"\n            >\n                '
													)
													.concat(e.username, '\n            </h4>\n        </div>\n    ')),
											t
										)
									})(e)
									n.appendChild(t)
								})
						} else {
							var o = document.querySelector('.alert'),
								i = o.querySelector('span')
							;(i.textContent = 'Error in getting group members. Try refreshing the page.'),
								o.classList.remove('hidden'),
								setTimeout(function () {
									o.classList.add('hidden'), (i.textContent = '')
								}, 5e3)
						}
					})
					.catch(function (e) {
						console.log('Error in getting group members: ', e)
					})
			}
		}),
		document.querySelector('#copy-group-link-btn').addEventListener('click', function () {
			var e = document.querySelector('#copy-group-link-btn')
			e.dataset.tip = 'Copied'
			var t = document.querySelector('.group-child.active').dataset.id
			navigator.clipboard.writeText(
				''
					.concat('http://localhost:3000', '/group-chat-api/join-group-via-link?id=')
					.concat(encodeURIComponent(t))
			),
				setTimeout(function () {
					e.dataset.tip = 'Copy Group Link'
				}, 2e3)
		})
	var St = function () {
		document.querySelector('#new-chat-tab').addEventListener('click', function () {
			var e = document.querySelector('#new-chat-tab'),
				t = document.querySelector('#new-group-tab'),
				n = document.querySelector('.new-chat-tab-content'),
				r = document.querySelector('.new-group-tab-content-parent')
			!e.classList.contains('tab-active') && e.classList.add('tab-active'),
				t.classList.contains('tab-active') && t.classList.remove('tab-active'),
				n.classList.contains('hidden') && n.classList.remove('hidden'),
				!r.classList.contains('hidden') && r.classList.add('hidden')
		}),
			document.querySelector('#new-group-tab').addEventListener('click', function () {
				var e = document.querySelector('#new-chat-tab'),
					t = document.querySelector('#new-group-tab'),
					n = document.querySelector('.new-chat-tab-content'),
					r = document.querySelector('.new-group-tab-content-parent')
				e.classList.contains('tab-active') && e.classList.remove('tab-active'),
					!t.classList.contains('tab-active') && t.classList.add('tab-active'),
					!n.classList.contains('hidden') && n.classList.add('hidden'),
					r.classList.contains('hidden') && r.classList.remove('hidden')
			}),
			document.getElementById('new-chat-search').addEventListener(
				'keyup',
				(function () {
					var e = wt(
						vt().mark(function e(t) {
							var n, r, o, i
							return vt().wrap(
								function (e) {
									for (;;)
										switch ((e.prev = e.next)) {
											case 0:
												if (
													(t.preventDefault(),
													(e.prev = 1),
													(n = t.target.value.toLowerCase()),
													(r = document.querySelectorAll('.new-chat-people')),
													'' !== n)
												) {
													e.next = 8
													break
												}
												r.forEach(function (e) {
													e.classList.contains('hidden') && e.classList.remove('hidden')
												}),
													(e.next = 12)
												break
											case 8:
												return (e.next = 10), qe(n)
											case 10:
												0 === (o = e.sent).people.length
													? r.forEach(function (e) {
															!e.classList.contains('hidden') && e.classList.add('hidden')
														})
													: ((i = o.people.map(function (e) {
															return e.username
														})),
														r.forEach(function (e) {
															var t = e
																.querySelector('.new-chat-people-username')
																.innerText.trim()
															i.includes(t)
																? e.classList.remove('hidden')
																: e.classList.add('hidden')
														}))
											case 12:
												e.next = 17
												break
											case 14:
												;(e.prev = 14),
													(e.t0 = e.catch(1)),
													console.log('Error in searching people: ', e.t0)
											case 17:
											case 'end':
												return e.stop()
										}
								},
								e,
								null,
								[[1, 14]]
							)
						})
					)
					return function (t) {
						return e.apply(this, arguments)
					}
				})()
			),
			document.querySelector('.all-new-chat-people').addEventListener('click', function (e) {
				e.target.closest('.new-chat-people') && st(e.target.closest('.new-chat-people'))
			}),
			document.querySelector('.new-group-selected-people').addEventListener(
				'wheel',
				function (e) {
					document.querySelector('.new-group-selected-people').scrollLeft += e.deltaY
				},
				{ passive: !0 }
			),
			document.querySelector('#new-group-done-btn').addEventListener('click', function () {
				document.querySelector('.create-group-tab-content').classList.remove('hidden'),
					document.querySelector('.new-group-tab-content').classList.add('hidden')
			}),
			document.getElementById('new-group-search').addEventListener(
				'keyup',
				(function () {
					var e = wt(
						vt().mark(function e(t) {
							var n, r, o, i
							return vt().wrap(
								function (e) {
									for (;;)
										switch ((e.prev = e.next)) {
											case 0:
												if (
													(t.preventDefault(),
													(e.prev = 1),
													(n = t.target.value.toLowerCase()),
													(r = document.querySelectorAll('.new-group-people')),
													'' !== n)
												) {
													e.next = 8
													break
												}
												r.forEach(function (e) {
													e.classList.contains('hidden') && e.classList.remove('hidden')
												}),
													(e.next = 12)
												break
											case 8:
												return (e.next = 10), qe(n)
											case 10:
												0 === (o = e.sent).people.length
													? r.forEach(function (e) {
															!e.classList.contains('hidden') && e.classList.add('hidden')
														})
													: ((i = o.people.map(function (e) {
															return e.username
														})),
														r.forEach(function (e) {
															var t = e
																.querySelector('.new-group-people-username')
																.innerText.trim()
															i.includes(t)
																? e.classList.remove('hidden')
																: e.classList.add('hidden')
														}))
											case 12:
												e.next = 17
												break
											case 14:
												;(e.prev = 14),
													(e.t0 = e.catch(1)),
													console.log('Error in searching people: ', e.t0)
											case 17:
											case 'end':
												return e.stop()
										}
								},
								e,
								null,
								[[1, 14]]
							)
						})
					)
					return function (t) {
						return e.apply(this, arguments)
					}
				})()
			),
			document.querySelector('.all-new-group-people').addEventListener('click', function (e) {
				if (!e.target.classList.contains('all-new-group-people')) {
					var t = null,
						n = document.querySelector('.new-group-selected-people-parent'),
						r = document.querySelector('.new-group-selected-people'),
						o = e.target.closest('.new-group-people')
					if (
						(e.target.closest('.new-group-people') &&
							(t = e.target
								.closest('.new-group-people')
								.querySelector('.new-group-people-checkbox input')) &&
							t !== e.target &&
							(t.checked = !t.checked),
						t && t.checked)
					) {
						n.classList.contains('hidden') && n.classList.remove('hidden'),
							document.querySelector('.all-new-group-people').classList.replace('h-64', 'h-46')
						var i = document.createElement('div')
						i.classList.add('avatar'), (i.dataset.id = o.dataset.id)
						var s = document.createElement('div')
						s.classList.add('w-14', 'h-14', 'rounded-full')
						var a = document.createElement('img')
						;(a.src = o.querySelector('img').src),
							(a.alt = o.querySelector('img').alt),
							s.appendChild(a),
							i.appendChild(s),
							r.appendChild(i)
					} else {
						var c,
							u = gt(r.children)
						try {
							for (u.s(); !(c = u.n()).done; ) {
								var l = c.value
								l.querySelector('img').alt === o.querySelector('img').alt && l.remove()
							}
						} catch (e) {
							u.e(e)
						} finally {
							u.f()
						}
						0 === r.children.length &&
							(!n.classList.contains('hidden') && n.classList.add('hidden'),
							document.querySelector('.all-new-group-people').classList.replace('h-46', 'h-64'))
					}
				}
			}),
			document.querySelector('#change-group-avatar-btn').addEventListener('click', function () {
				var e = document.querySelector('#group-avatar')
				fetch('/api/get-group-avatar')
					.then(function (e) {
						return e.json()
					})
					.then(function (t) {
						e.src = t.groupAvatar
					})
					.catch(function (e) {
						console.log('Error in getting group avatar: ', e)
					})
			}),
			document.querySelector('#group-back-btn').addEventListener('click', function () {
				document.querySelector('.create-group-tab-content').classList.add('hidden'),
					document.querySelector('.new-group-tab-content').classList.remove('hidden')
			}),
			document.querySelector('#group-create-btn').addEventListener(
				'click',
				wt(
					vt().mark(function e() {
						var t, n, r, o
						return vt().wrap(function (e) {
							for (;;)
								switch ((e.prev = e.next)) {
									case 0:
										if (
											((t = Array.from(
												document.querySelector('.new-group-selected-people').children
											).map(function (e) {
												return e.dataset.id
											})),
											(n = DOMPurify.sanitize(document.querySelector('#group-name').value)),
											(r = DOMPurify.sanitize(
												document.querySelector('#group-description').value
											)),
											(o = document.querySelector('#group-avatar').src),
											'' !== n && '' !== r)
										) {
											e.next = 7
											break
										}
										return Ke('Group name and description are required'), e.abrupt('return')
									case 7:
										return (
											(e.next = 9),
											fetch('/group-chat-api/create-group', {
												method: 'POST',
												headers: { 'Content-Type': 'application/json' },
												body: JSON.stringify({
													groupMembersIds: t,
													groupName: n,
													groupDescription: r,
													groupAvatar: o,
												}),
											})
												.then(function (e) {
													return e.json()
												})
												.then(function (e) {
													e.success
														? (Ke('Group created successfully'),
															(document.querySelector('#add-chat-popup').innerHTML = kt),
															document.querySelector('#transparent-modal').click(),
															Ce(e.groupInfo))
														: Ke('Error in creating group. Please try again!')
												})
												.catch(function (e) {
													console.log('Error in creating group: ', e),
														Ke(
															'Error in creating group. Please refresh the page and try again!'
														)
												})
										)
									case 9:
									case 'end':
										return e.stop()
								}
						}, e)
					})
				)
			)
	}
	function Et(e) {
		if ('string' != typeof e || !e) throw new Error('expected a non-empty string, got: ' + e)
	}
	function Lt(e) {
		if ('number' != typeof e) throw new Error('expected a number, got: ' + e)
	}
	St()
	const xt = 1,
		Tt = 1,
		jt = 'emoji',
		qt = 'keyvalue',
		Ct = 'favorites',
		_t = 'tokens',
		Ot = 'tokens',
		At = 'unicode',
		It = 'count',
		Bt = 'group',
		Nt = 'order',
		Pt = 'group-order',
		Rt = 'eTag',
		Mt = 'url',
		$t = 'skinTone',
		Dt = 'readonly',
		Ft = 'readwrite',
		zt = 'skinUnicodes',
		Ut = 'skinUnicodes'
	function Gt(e) {
		return (function (e, t) {
			const n = new Set(),
				r = []
			for (const o of e) {
				const e = t(o)
				n.has(e) || (n.add(e), r.push(o))
			}
			return r
		})(e, (e) => e.unicode)
	}
	const Ht = {},
		Vt = {},
		Wt = {}
	function Jt(e, t, n) {
		;(n.onerror = () => t(n.error)),
			(n.onblocked = () => t(new Error('IDB blocked'))),
			(n.onsuccess = () => e(n.result))
	}
	async function Yt(e) {
		const t = await new Promise((t, n) => {
			const r = indexedDB.open(e, xt)
			;(Ht[e] = r),
				(r.onupgradeneeded = (e) => {
					e.oldVersion < Tt &&
						(function (e) {
							function t(t, n, r) {
								const o = n ? e.createObjectStore(t, { keyPath: n }) : e.createObjectStore(t)
								if (r)
									for (const [e, [t, n]] of Object.entries(r)) o.createIndex(e, t, { multiEntry: n })
								return o
							}
							t(qt),
								t(jt, At, { [Ot]: [_t, !0], [Pt]: [[Bt, Nt]], [zt]: [Ut, !0] }),
								t(Ct, void 0, { [It]: [''] })
						})(r.result)
				}),
				Jt(t, n, r)
		})
		return (t.onclose = () => Xt(e)), t
	}
	function Kt(e, t, n, r) {
		return new Promise((o, i) => {
			const s = e.transaction(t, n, { durability: 'relaxed' }),
				a = 'string' == typeof t ? s.objectStore(t) : t.map((e) => s.objectStore(e))
			let c
			r(a, s, (e) => {
				c = e
			}),
				(s.oncomplete = () => o(c)),
				(s.onerror = () => i(s.error))
		})
	}
	function Xt(e) {
		const t = Ht[e],
			n = t && t.result
		if (n) {
			n.close()
			const t = Wt[e]
			if (t) for (const e of t) e()
		}
		delete Ht[e], delete Vt[e], delete Wt[e]
	}
	const Qt = new Set([
		':D',
		'XD',
		":'D",
		'O:)',
		':X',
		':P',
		';P',
		'XP',
		':L',
		':Z',
		':j',
		'8D',
		'XO',
		'8)',
		':B',
		':O',
		':S',
		":'o",
		'Dx',
		'X(',
		'D:',
		':C',
		'>0)',
		':3',
		'</3',
		'<3',
		'\\M/',
		':E',
		'8#',
	])
	function Zt(e) {
		return e
			.split(/[\s_]+/)
			.map((e) =>
				!e.match(/\w/) || Qt.has(e)
					? e.toLowerCase()
					: e
							.replace(/[)(:,]/g, '')
							.replace(/’/g, "'")
							.toLowerCase()
			)
			.filter(Boolean)
	}
	const en = 2
	function tn(e) {
		return e
			.filter(Boolean)
			.map((e) => e.toLowerCase())
			.filter((e) => e.length >= en)
	}
	function nn(e, t, n, r) {
		e[t](n).onsuccess = (e) => r && r(e.target.result)
	}
	function rn(e, t, n) {
		nn(e, 'get', t, n)
	}
	function on(e, t, n) {
		nn(e, 'getAll', t, n)
	}
	function sn(e) {
		e.commit && e.commit()
	}
	function an(e, t) {
		const n = (function (e, t) {
				let n = e[0]
				for (let r = 1; r < e.length; r++) {
					const o = e[r]
					t(n) > t(o) && (n = o)
				}
				return n
			})(e, (e) => e.length),
			r = []
		for (const o of n) e.some((e) => -1 === e.findIndex((e) => t(e) === t(o))) || r.push(o)
		return r
	}
	async function cn(e, t, n, r) {
		try {
			const o = (function (e) {
				return e.map(
					({
						annotation: e,
						emoticon: t,
						group: n,
						order: r,
						shortcodes: o,
						skins: i,
						tags: s,
						emoji: a,
						version: c,
					}) => {
						const u = [
								...new Set(tn([...(o || []).map(Zt).flat(), ...s.map(Zt).flat(), ...Zt(e), t])),
							].sort(),
							l = { annotation: e, group: n, order: r, tags: s, tokens: u, unicode: a, version: c }
						if ((t && (l.emoticon = t), o && (l.shortcodes = o), i)) {
							;(l.skinTones = []), (l.skinUnicodes = []), (l.skinVersions = [])
							for (const { tone: e, emoji: t, version: n } of i)
								l.skinTones.push(e), l.skinUnicodes.push(t), l.skinVersions.push(n)
						}
						return l
					}
				)
			})(t)
			await Kt(e, [jt, qt], Ft, ([e, t], i) => {
				let s,
					a,
					c = 0
				function u() {
					2 == ++c &&
						(function () {
							if (s === r && a === n) return
							e.clear()
							for (const t of o) e.put(t)
							t.put(r, Rt), t.put(n, Mt), sn(i)
						})()
				}
				rn(t, Rt, (e) => {
					;(s = e), u()
				}),
					rn(t, Mt, (e) => {
						;(a = e), u()
					})
			})
		} finally {
		}
	}
	async function un(e, t) {
		const n = tn(Zt(t))
		return n.length
			? Kt(e, jt, Dt, (e, t, r) => {
					const o = [],
						i = () => {
							const e = an(o, (e) => e.unicode)
							r(e.sort((e, t) => (e.order < t.order ? -1 : 1)))
						}
					for (let t = 0; t < n.length; t++) {
						const r = n[t],
							s = t === n.length - 1 ? IDBKeyRange.bound(r, r + '￿', !1, !0) : IDBKeyRange.only(r)
						on(e.index(Ot), s, (e) => {
							o.push(e), o.length === n.length && i()
						})
					}
				})
			: []
	}
	async function ln(e, t) {
		const n = await un(e, t)
		if (!n.length) {
			const n = (e) => (e.shortcodes || []).includes(t.toLowerCase())
			return (
				(await (async function (e, t) {
					return Kt(e, jt, Dt, (e, n, r) => {
						let o
						const i = () => {
							e.getAll(o && IDBKeyRange.lowerBound(o, !0), 50).onsuccess = (e) => {
								const n = e.target.result
								for (const e of n) if (((o = e.unicode), t(e))) return r(e)
								if (n.length < 50) return r()
								i()
							}
						}
						i()
					})
				})(e, n)) || null
			)
		}
		return (
			n.filter((e) => {
				const n = (e.shortcodes || []).map((e) => e.toLowerCase())
				return n.includes(t.toLowerCase())
			})[0] || null
		)
	}
	function dn(e, t, n) {
		return Kt(e, t, Dt, (e, t, r) => rn(e, n, r))
	}
	const hn = ''
	const pn = ['name', 'url']
	function fn(e) {
		!(function (e) {
			const t = e && Array.isArray(e),
				n = t && e.length && (!e[0] || pn.some((t) => !(t in e[0])))
			if (!t || n) throw new Error('Custom emojis are in the wrong format')
		})(e)
		const t = (e, t) => (e.name.toLowerCase() < t.name.toLowerCase() ? -1 : 1),
			n = e.sort(t),
			r = (function (e, t) {
				const n = new Map()
				for (const r of e) {
					const e = t(r)
					for (const t of e) {
						let e = n
						for (let n = 0; n < t.length; n++) {
							const r = t.charAt(n)
							let o = e.get(r)
							o || ((o = new Map()), e.set(r, o)), (e = o)
						}
						let o = e.get(hn)
						o || ((o = []), e.set(hn, o)), o.push(r)
					}
				}
				return (e, t) => {
					let r = n
					for (let t = 0; t < e.length; t++) {
						const n = e.charAt(t),
							o = r.get(n)
						if (!o) return []
						r = o
					}
					if (t) return r.get(hn) || []
					const o = [],
						i = [r]
					for (; i.length; ) {
						const e = [...i.shift().entries()].sort((e, t) => (e[0] < t[0] ? -1 : 1))
						for (const [t, n] of e) t === hn ? o.push(...n) : i.push(n)
					}
					return o
				}
			})(e, (e) => [...new Set((e.shortcodes || []).map((e) => Zt(e)).flat())]),
			o = (e) => r(e, !0),
			i = (e) => r(e, !1),
			s = new Map(),
			a = new Map()
		for (const t of e) {
			a.set(t.name.toLowerCase(), t)
			for (const e of t.shortcodes || []) s.set(e.toLowerCase(), t)
		}
		return {
			all: n,
			search: (e) => {
				const n = Zt(e),
					r = n.map((e, t) => (t < n.length - 1 ? o : i)(e))
				return an(r, (e) => e.name).sort(t)
			},
			byShortcode: (e) => s.get(e.toLowerCase()),
			byName: (e) => a.get(e.toLowerCase()),
		}
	}
	const mn = 'undefined' != typeof wrappedJSObject
	function gn(e) {
		if (!e) return e
		if ((mn && (e = structuredClone(e)), delete e.tokens, e.skinTones)) {
			const t = e.skinTones.length
			e.skins = Array(t)
			for (let n = 0; n < t; n++)
				e.skins[n] = { tone: e.skinTones[n], unicode: e.skinUnicodes[n], version: e.skinVersions[n] }
			delete e.skinTones, delete e.skinUnicodes, delete e.skinVersions
		}
		return e
	}
	function yn(e) {
		e || console.warn('emoji-picker-element is more efficient if the dataSource server exposes an ETag header.')
	}
	const vn = ['annotation', 'emoji', 'group', 'order', 'tags', 'version']
	function bn(e, t) {
		if (2 !== Math.floor(e.status / 100)) throw new Error('Failed to fetch: ' + t + ':  ' + e.status)
	}
	async function wn(e) {
		const t = await fetch(e)
		bn(t, e)
		const n = t.headers.get('etag')
		yn(n)
		const r = await t.json()
		return (
			(function (e) {
				if (!e || !Array.isArray(e) || !e[0] || 'object' != typeof e[0] || vn.some((t) => !(t in e[0])))
					throw new Error('Emoji data is in the wrong format')
			})(r),
			[n, r]
		)
	}
	async function kn(e) {
		let t = (function (e) {
			for (var t = e.length, n = new ArrayBuffer(t), r = new Uint8Array(n), o = -1; ++o < t; )
				r[o] = e.charCodeAt(o)
			return n
		})(JSON.stringify(e))
		const n = (function (e) {
			for (var t = '', n = new Uint8Array(e), r = n.byteLength, o = -1; ++o < r; ) t += String.fromCharCode(n[o])
			return t
		})(await crypto.subtle.digest('SHA-1', t))
		return btoa(n)
	}
	async function Sn(e, t) {
		let n,
			r = await (async function (e) {
				const t = await fetch(e, { method: 'HEAD' })
				bn(t, e)
				const n = t.headers.get('etag')
				return yn(n), n
			})(t)
		if (!r) {
			const e = await wn(t)
			;(r = e[0]), (n = e[1]), r || (r = await kn(n))
		}
		if (
			await (async function (e, t, n) {
				const [r, o] = await Promise.all([Rt, Mt].map((t) => dn(e, qt, t)))
				return r === n && o === t
			})(e, t, r)
		);
		else {
			if (!n) {
				n = (await wn(t))[1]
			}
			await cn(e, n, t, r)
		}
	}
	class En {
		constructor({
			dataSource: e = 'https://cdn.jsdelivr.net/npm/emoji-picker-element-data@^1/en/emojibase/data.json',
			locale: t = 'en',
			customEmoji: n = [],
		} = {}) {
			;(this.dataSource = e),
				(this.locale = t),
				(this._dbName = `emoji-picker-element-${this.locale}`),
				(this._db = void 0),
				(this._lazyUpdate = void 0),
				(this._custom = fn(n)),
				(this._clear = this._clear.bind(this)),
				(this._ready = this._init())
		}
		async _init() {
			const e = (this._db = await ((t = this._dbName), Vt[t] || (Vt[t] = Yt(t)), Vt[t]))
			var t
			!(function (e, t) {
				let n = Wt[e]
				n || (n = Wt[e] = []), n.push(t)
			})(this._dbName, this._clear)
			const n = this.dataSource,
				r = await (async function (e) {
					return !(await dn(e, qt, Mt))
				})(e)
			r
				? await (async function (e, t) {
						let [n, r] = await wn(t)
						n || (n = await kn(r)), await cn(e, r, t, n)
					})(e, n)
				: (this._lazyUpdate = Sn(e, n))
		}
		async ready() {
			const e = async () => (this._ready || (this._ready = this._init()), this._ready)
			await e(), this._db || (await e())
		}
		async getEmojiByGroup(e) {
			return (
				Lt(e),
				await this.ready(),
				Gt(
					await (async function (e, t) {
						return Kt(e, jt, Dt, (e, n, r) => {
							const o = IDBKeyRange.bound([t, 0], [t + 1, 0], !1, !0)
							on(e.index(Pt), o, r)
						})
					})(this._db, e)
				).map(gn)
			)
		}
		async getEmojiBySearchQuery(e) {
			Et(e), await this.ready()
			return [...this._custom.search(e), ...Gt(await un(this._db, e)).map(gn)]
		}
		async getEmojiByShortcode(e) {
			Et(e), await this.ready()
			const t = this._custom.byShortcode(e)
			return t || gn(await ln(this._db, e))
		}
		async getEmojiByUnicodeOrName(e) {
			Et(e), await this.ready()
			const t = this._custom.byName(e)
			return (
				t ||
				gn(
					await (async function (e, t) {
						return Kt(e, jt, Dt, (e, n, r) =>
							rn(e, t, (n) => {
								if (n) return r(n)
								rn(e.index(zt), t, (e) => r(e || null))
							})
						)
					})(this._db, e)
				)
			)
		}
		async getPreferredSkinTone() {
			return await this.ready(), (await dn(this._db, qt, $t)) || 0
		}
		async setPreferredSkinTone(e) {
			return (
				Lt(e),
				await this.ready(),
				(function (e, t, n, r) {
					return Kt(e, t, Ft, (e, t) => {
						e.put(r, n), sn(t)
					})
				})(this._db, qt, $t, e)
			)
		}
		async incrementFavoriteEmojiCount(e) {
			return (
				Et(e),
				await this.ready(),
				(t = this._db),
				(n = e),
				Kt(t, Ct, Ft, (e, t) =>
					rn(e, n, (r) => {
						e.put((r || 0) + 1, n), sn(t)
					})
				)
			)
			var t, n
		}
		async getTopFavoriteEmoji(e) {
			return (
				Lt(e),
				await this.ready(),
				(
					await (function (e, t, n) {
						return 0 === n
							? []
							: Kt(e, [Ct, jt], Dt, ([e, r], o, i) => {
									const s = []
									e.index(It).openCursor(void 0, 'prev').onsuccess = (e) => {
										const o = e.target.result
										if (!o) return i(s)
										function a(e) {
											if ((s.push(e), s.length === n)) return i(s)
											o.continue()
										}
										const c = o.primaryKey,
											u = t.byName(c)
										if (u) return a(u)
										rn(r, c, (e) => {
											if (e) return a(e)
											o.continue()
										})
									}
								})
					})(this._db, this._custom, e)
				).map(gn)
			)
		}
		set customEmoji(e) {
			this._custom = fn(e)
		}
		get customEmoji() {
			return this._custom.all
		}
		async _shutdown() {
			await this.ready()
			try {
				await this._lazyUpdate
			} catch (e) {}
		}
		_clear() {
			this._db = this._ready = this._lazyUpdate = void 0
		}
		async close() {
			await this._shutdown(), await Xt(this._dbName)
		}
		async delete() {
			var e
			await this._shutdown(),
				await ((e = this._dbName),
				new Promise((t, n) => {
					Xt(e), Jt(t, n, indexedDB.deleteDatabase(e))
				}))
		}
	}
	const Ln = [
			[-1, '✨', 'custom'],
			[0, '😀', 'smileys-emotion'],
			[1, '👋', 'people-body'],
			[3, '🐱', 'animals-nature'],
			[4, '🍎', 'food-drink'],
			[5, '🏠️', 'travel-places'],
			[6, '⚽', 'activities'],
			[7, '📝', 'objects'],
			[8, '⛔️', 'symbols'],
			[9, '🏁', 'flags'],
		].map(([e, t, n]) => ({ id: e, emoji: t, name: n })),
		xn = Ln.slice(1),
		Tn = 'function' == typeof requestIdleCallback ? requestIdleCallback : setTimeout
	function jn(e) {
		return e.unicode.includes('‍')
	}
	const qn = {
			'🫨': 15.1,
			'🫠': 14,
			'🥲': 13.1,
			'🥻': 12.1,
			'🥰': 11,
			'🤩': 5,
			'👱‍♀️': 4,
			'🤣': 3,
			'👁️‍🗨️': 2,
			'😀': 1,
			'😐️': 0.7,
			'😃': 0.6,
		},
		Cn = ['😊', '😒', '❤️', '👍️', '😍', '😂', '😭', '☺️', '😔', '😩', '😏', '💕', '🙌', '😘'],
		_n =
			'"Twemoji Mozilla","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji","EmojiOne Color","Android Emoji",sans-serif',
		On = (e, t) => (e < t ? -1 : e > t ? 1 : 0),
		An = (e, t) => {
			const n = document.createElement('canvas')
			n.width = n.height = 1
			const r = n.getContext('2d')
			return (
				(r.textBaseline = 'top'),
				(r.font = `100px ${_n}`),
				(r.fillStyle = t),
				r.scale(0.01, 0.01),
				r.fillText(e, 0, 0),
				r.getImageData(0, 0, 1, 1).data
			)
		},
		In = (e, t) => {
			const n = [...e].join(',')
			return n === [...t].join(',') && !n.startsWith('0,0,0,')
		}
	function Bn(e) {
		const t = An(e, '#000'),
			n = An(e, '#fff')
		return t && n && In(t, n)
	}
	let Nn
	const Pn = () => (
			Nn ||
				(Nn = new Promise((e) =>
					Tn(() =>
						e(
							(function () {
								const e = Object.entries(qn)
								try {
									for (const [t, n] of e) if (Bn(t)) return n
								} catch (e) {}
								return e[0][1]
							})()
						)
					)
				)),
			Nn
		),
		Rn = new Map(),
		Mn = '️',
		$n = '\ud83c',
		Dn = '‍',
		Fn = 127995,
		zn = 57339
	function Un(e) {
		e.preventDefault(), e.stopPropagation()
	}
	function Gn(e, t, n) {
		return (t += e ? -1 : 1) < 0 ? (t = n.length - 1) : t >= n.length && (t = 0), t
	}
	function Hn(e, t) {
		const n = new Set(),
			r = []
		for (const o of e) {
			const e = t(o)
			n.has(e) || (n.add(e), r.push(o))
		}
		return r
	}
	const Vn = requestAnimationFrame
	let Wn,
		Jn = 'function' == typeof ResizeObserver
	function Yn(e) {
		{
			const t = document.createRange()
			return t.selectNode(e.firstChild), t.getBoundingClientRect().width
		}
	}
	function Kn(e, t, n) {
		let r = e.get(t)
		return r || ((r = n()), e.set(t, r)), r
	}
	function Xn(e) {
		return '' + e
	}
	const Qn = new WeakMap(),
		Zn = new WeakMap(),
		er = Symbol('un-keyed'),
		tr = 'replaceChildren' in Element.prototype
	function nr(e, t) {
		const { targetNode: n } = t
		let { targetParentNode: r } = t,
			o = !1
		r
			? (o = (function (e, t) {
					let n = e.firstChild,
						r = 0
					for (; n; ) {
						if (t[r] !== n) return !0
						;(n = n.nextSibling), r++
					}
					return r !== t.length
				})(r, e))
			: ((o = !0), (t.targetNode = void 0), (t.targetParentNode = r = n.parentNode)),
			o &&
				(function (e, t) {
					tr ? e.replaceChildren(...t) : ((e.innerHTML = ''), e.append(...t))
				})(r, e)
	}
	function rr(e) {
		let t = '',
			n = !1,
			r = !1,
			o = -1
		const i = new Map(),
			s = []
		for (let a = 0, c = e.length; a < c; a++) {
			const u = e[a]
			if (((t += u), a === c - 1)) break
			for (let e = 0; e < u.length; e++) {
				switch (u.charAt(e)) {
					case '<':
						'/' === u.charAt(e + 1) ? s.pop() : ((n = !0), s.push(++o))
						break
					case '>':
						;(n = !1), (r = !1)
						break
					case '=':
						r = !0
				}
			}
			const l = Kn(i, s[s.length - 1], () => [])
			let d, h, p
			if (r) {
				const t = /(\S+)="?([^"=]*)$/.exec(u)
				;(d = t[1]), (h = t[2]), (p = /^[^">]*/.exec(e[a + 1])[0])
			}
			const f = { attributeName: d, attributeValuePre: h, attributeValuePost: p, expressionIndex: a }
			l.push(f), n || r || (t += ' ')
		}
		const a = (function (e) {
			const t = document.createElement('template')
			return (t.innerHTML = e), t
		})(t)
		return { template: a, elementsToBindings: i }
	}
	function or(e) {
		const { template: t, elementsToBindings: n } = Kn(Qn, e, () => rr(e)),
			r = t.cloneNode(!0).content.firstElementChild,
			o = (function (e, t) {
				const n = [],
					r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT)
				let o = e,
					i = -1
				do {
					const e = t.get(++i)
					if (e)
						for (let t = 0; t < e.length; t++) {
							const r = e[t],
								i = {
									binding: r,
									targetNode: r.attributeName ? o : o.firstChild,
									targetParentNode: void 0,
									currentExpression: void 0,
								}
							n.push(i)
						}
				} while ((o = r.nextNode()))
				return n
			})(r, n)
		return function (e) {
			return (
				(function (e, t) {
					for (const n of t) {
						const {
								targetNode: t,
								currentExpression: r,
								binding: {
									expressionIndex: o,
									attributeName: i,
									attributeValuePre: s,
									attributeValuePost: a,
								},
							} = n,
							c = e[o]
						if (r !== c)
							if (((n.currentExpression = c), i)) t.setAttribute(i, s + Xn(c) + a)
							else {
								let e
								Array.isArray(c)
									? nr(c, n)
									: c instanceof Element
										? ((e = c), t.replaceWith(e))
										: (t.nodeValue = Xn(c)),
									e && (n.targetNode = e)
							}
					}
				})(e, o),
				r
			)
		}
	}
	function ir(e, t, n, r, o, i, s, a) {
		const { labelWithSkin: c, titleForEmoji: u, unicodeWithSkin: l } = n,
			{ html: d, map: h } = (function (e) {
				const t = Kn(Zn, e, () => new Map())
				let n = er
				return {
					map: function (e, t, r) {
						return e.map((e, o) => {
							const i = n
							n = r(e)
							try {
								return t(e, o)
							} finally {
								n = i
							}
						})
					},
					html: function (e, ...r) {
						const o = Kn(t, e, () => new Map())
						return Kn(o, n, () => or(e))(r)
					},
				}
			})(t)
		function p(e, n, r) {
			return h(
				e,
				(e, o) =>
					d`<button role="${n ? 'option' : 'menuitem'}" aria-selected="${t.searchMode ? o === t.activeSearchItem : ''}" aria-label="${c(e, t.currentSkinTone)}" title="${u(e)}" class="emoji ${n && o === t.activeSearchItem ? 'active' : ''}" id="${`${r}-${e.id}`}">${e.unicode ? l(e, t.currentSkinTone) : d`<img class="custom-emoji" src="${e.url}" alt="" loading="lazy">`}</button>`,
				(e) => `${r}-${e.id}`
			)
		}
		const f = d`<section data-ref="rootElement" class="picker" aria-label="${t.i18n.regionLabel}" style="${t.pickerStyle}"><div class="pad-top"></div><div class="search-row"><div class="search-wrapper"><input id="search" class="search" type="search" role="combobox" enterkeyhint="search" placeholder="${t.i18n.searchLabel}" autocapitalize="none" autocomplete="off" spellcheck="true" aria-expanded="${!(!t.searchMode || !t.currentEmojis.length)}" aria-controls="search-results" aria-describedby="search-description" aria-autocomplete="list" aria-activedescendant="${t.activeSearchItemId ? `emo-${t.activeSearchItemId}` : ''}" data-ref="searchElement" data-on-input="onSearchInput" data-on-keydown="onSearchKeydown"><label class="sr-only" for="search">${t.i18n.searchLabel}</label> <span id="search-description" class="sr-only">${t.i18n.searchDescription}</span></div><div class="skintone-button-wrapper ${t.skinTonePickerExpandedAfterAnimation ? 'expanded' : ''}"><button id="skintone-button" class="emoji ${t.skinTonePickerExpanded ? 'hide-focus' : ''}" aria-label="${t.skinToneButtonLabel}" title="${t.skinToneButtonLabel}" aria-describedby="skintone-description" aria-haspopup="listbox" aria-expanded="${t.skinTonePickerExpanded}" aria-controls="skintone-list" data-on-click="onClickSkinToneButton">${t.skinToneButtonText}</button></div><span id="skintone-description" class="sr-only">${t.i18n.skinToneDescription}</span><div data-ref="skinToneDropdown" id="skintone-list" class="skintone-list hide-focus ${t.skinTonePickerExpanded ? '' : 'hidden no-animate'}" style="transform:translateY(${t.skinTonePickerExpanded ? 0 : 'calc(-1 * var(--num-skintones) * var(--total-emoji-size))'})" role="listbox" aria-label="${t.i18n.skinTonesLabel}" aria-activedescendant="skintone-${t.activeSkinTone}" aria-hidden="${!t.skinTonePickerExpanded}" tabIndex="-1" data-on-focusout="onSkinToneOptionsFocusOut" data-on-click="onSkinToneOptionsClick" data-on-keydown="onSkinToneOptionsKeydown" data-on-keyup="onSkinToneOptionsKeyup">${h(
			t.skinTones,
			(e, n) =>
				d`<div id="skintone-${n}" class="emoji ${n === t.activeSkinTone ? 'active' : ''}" aria-selected="${n === t.activeSkinTone}" role="option" title="${t.i18n.skinTones[n]}" aria-label="${t.i18n.skinTones[n]}">${e}</div>`,
			(e) => e
		)}</div></div><div class="nav" role="tablist" style="grid-template-columns:repeat(${t.groups.length},1fr)" aria-label="${t.i18n.categoriesLabel}" data-on-keydown="onNavKeydown" data-on-click="onNavClick">${h(
			t.groups,
			(e) =>
				d`<button role="tab" class="nav-button" aria-controls="tab-${e.id}" aria-label="${t.i18n.categories[e.name]}" aria-selected="${!t.searchMode && t.currentGroup.id === e.id}" title="${t.i18n.categories[e.name]}" data-group-id="${e.id}"><div class="nav-emoji emoji">${e.emoji}</div></button>`,
			(e) => e.id
		)}</div><div class="indicator-wrapper"><div class="indicator" style="transform:translateX(${(t.isRtl ? -1 : 1) * t.currentGroupIndex * 100}%)"></div></div><div class="message ${t.message ? '' : 'gone'}" role="alert" aria-live="polite">${t.message}</div><div data-ref="tabpanelElement" class="tabpanel ${!t.databaseLoaded || t.message ? 'gone' : ''}" role="${t.searchMode ? 'region' : 'tabpanel'}" aria-label="${t.searchMode ? t.i18n.searchResultsLabel : t.i18n.categories[t.currentGroup.name]}" id="${t.searchMode ? '' : `tab-${t.currentGroup.id}`}" tabIndex="0" data-on-click="onEmojiClick"><div data-action="calculateEmojiGridStyle">${h(
			t.currentEmojisWithCategories,
			(e, n) =>
				d`<div><div id="menu-label-${n}" class="category ${1 === t.currentEmojisWithCategories.length && '' === t.currentEmojisWithCategories[0].category ? 'gone' : ''}" aria-hidden="true">${t.searchMode ? t.i18n.searchResultsLabel : e.category ? e.category : t.currentEmojisWithCategories.length > 1 ? t.i18n.categories.custom : t.i18n.categories[t.currentGroup.name]}</div><div class="emoji-menu" role="${t.searchMode ? 'listbox' : 'menu'}" aria-labelledby="menu-label-${n}" id="${t.searchMode ? 'search-results' : ''}">${p(e.emojis, t.searchMode, 'emo')}</div></div>`,
			(e) => e.category
		)}</div></div><div class="favorites emoji-menu ${t.message ? 'gone' : ''}" role="menu" aria-label="${t.i18n.favoritesLabel}" style="padding-inline-end:${`${t.scrollbarWidth}px`}" data-on-click="onEmojiClick">${p(t.currentFavorites, !1, 'fav')}</div><button data-ref="baselineEmoji" aria-hidden="true" tabindex="-1" class="abs-pos hidden emoji baseline-emoji">😀</button></section>`
		if (a) {
			e.appendChild(f)
			const t = (t, n) => {
				for (const r of e.querySelectorAll(`[${t}]`)) n(r, r.getAttribute(t))
			}
			for (const e of ['click', 'focusout', 'input', 'keydown', 'keyup'])
				t(`data-on-${e}`, (t, n) => {
					t.addEventListener(e, r[n])
				})
			t('data-ref', (e, t) => {
				i[t] = e
			}),
				t('data-action', (e, t) => {
					o[t](e)
				}),
				s.addEventListener('abort', () => {
					e.removeChild(f)
				})
		}
	}
	const sr = 'function' == typeof queueMicrotask ? queueMicrotask : (e) => Promise.resolve().then(e)
	function ar(e, t, n) {
		if (e.length !== t.length) return !1
		for (let r = 0; r < e.length; r++) if (!n(e[r], t[r])) return !1
		return !0
	}
	const cr = [],
		{ assign: ur } = Object
	function lr(e, t) {
		const n = {},
			r = new AbortController(),
			o = r.signal,
			{ state: i, createEffect: s } = (function (e) {
				let t,
					n = !1
				const r = new Map(),
					o = new Set()
				let i
				const s = () => {
						if (n) return
						const e = [...o]
						o.clear()
						try {
							for (const t of e) t()
						} finally {
							;(i = !1), o.size && ((i = !0), sr(s))
						}
					},
					a = new Proxy(
						{},
						{
							get(e, n) {
								if (t) {
									let e = r.get(n)
									e || ((e = new Set()), r.set(n, e)), e.add(t)
								}
								return e[n]
							},
							set(e, t, n) {
								e[t] = n
								const a = r.get(t)
								if (a) {
									for (const e of a) o.add(e)
									i || ((i = !0), sr(s))
								}
								return !0
							},
						}
					)
				return (
					e.addEventListener('abort', () => {
						n = !0
					}),
					{
						state: a,
						createEffect: (e) => {
							const n = () => {
								const r = t
								t = n
								try {
									return e()
								} finally {
									t = r
								}
							}
							return n()
						},
					}
				)
			})(o)
		ur(i, {
			skinToneEmoji: void 0,
			i18n: void 0,
			database: void 0,
			customEmoji: void 0,
			customCategorySorting: void 0,
			emojiVersion: void 0,
		}),
			ur(i, t),
			ur(i, {
				initialLoad: !0,
				currentEmojis: [],
				currentEmojisWithCategories: [],
				rawSearchText: '',
				searchText: '',
				searchMode: !1,
				activeSearchItem: -1,
				message: void 0,
				skinTonePickerExpanded: !1,
				skinTonePickerExpandedAfterAnimation: !1,
				currentSkinTone: 0,
				activeSkinTone: 0,
				skinToneButtonText: void 0,
				pickerStyle: void 0,
				skinToneButtonLabel: '',
				skinTones: [],
				currentFavorites: [],
				defaultFavoriteEmojis: void 0,
				numColumns: 8,
				isRtl: !1,
				scrollbarWidth: 0,
				currentGroupIndex: 0,
				groups: xn,
				databaseLoaded: !1,
				activeSearchItemId: void 0,
			}),
			s(() => {
				i.currentGroup !== i.groups[i.currentGroupIndex] && (i.currentGroup = i.groups[i.currentGroupIndex])
			})
		const a = (t) => {
				e.getElementById(t).focus()
			},
			c = (t) => e.getElementById(`emo-${t.id}`),
			u = (e, t) => {
				n.rootElement.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }))
			},
			l = (e, t) => e.id === t.id,
			d = (e, t) => {
				const { category: n, emojis: r } = e,
					{ category: o, emojis: i } = t
				return n === o && ar(r, i, l)
			},
			h = (e) => {
				ar(i.currentEmojis, e, l) || (i.currentEmojis = e)
			},
			p = (e) => {
				i.searchMode !== e && (i.searchMode = e)
			},
			f = (e, t) => (t && e.skins && e.skins[t]) || e.unicode,
			m = {
				labelWithSkin: (e, t) => {
					return ((n = [e.name || f(e, t), e.annotation, ...(e.shortcodes || cr)].filter(Boolean)),
					Hn(n, (e) => e)).join(', ')
					var n
				},
				titleForEmoji: (e) => e.annotation || (e.shortcodes || cr).join(', '),
				unicodeWithSkin: f,
			},
			g = {
				onClickSkinToneButton: function (e) {
					;(i.skinTonePickerExpanded = !i.skinTonePickerExpanded),
						(i.activeSkinTone = i.currentSkinTone),
						i.skinTonePickerExpanded && (Un(e), Vn(() => a('skintone-list')))
				},
				onEmojiClick: async function (e) {
					const { target: t } = e
					if (!t.classList.contains('emoji')) return
					Un(e)
					E(t.id.substring(4))
				},
				onNavClick: function (e) {
					const { target: t } = e,
						r = t.closest('.nav-button')
					if (!r) return
					const o = parseInt(r.dataset.groupId, 10)
					;(n.searchElement.value = ''),
						(i.rawSearchText = ''),
						(i.searchText = ''),
						(i.activeSearchItem = -1),
						(i.currentGroupIndex = i.groups.findIndex((e) => e.id === o))
				},
				onNavKeydown: function (e) {
					const { target: t, key: n } = e,
						r = (t) => {
							t && (Un(e), t.focus())
						}
					switch (n) {
						case 'ArrowLeft':
							return r(t.previousElementSibling)
						case 'ArrowRight':
							return r(t.nextElementSibling)
						case 'Home':
							return r(t.parentElement.firstElementChild)
						case 'End':
							return r(t.parentElement.lastElementChild)
					}
				},
				onSearchKeydown: function (e) {
					if (!i.searchMode || !i.currentEmojis.length) return
					const t = (t) => {
						Un(e), (i.activeSearchItem = Gn(t, i.activeSearchItem, i.currentEmojis))
					}
					switch (e.key) {
						case 'ArrowDown':
							return t(!1)
						case 'ArrowUp':
							return t(!0)
						case 'Enter':
							if (-1 !== i.activeSearchItem) return Un(e), E(i.currentEmojis[i.activeSearchItem].id)
							i.activeSearchItem = 0
					}
				},
				onSkinToneOptionsClick: function (e) {
					const {
							target: { id: t },
						} = e,
						n = t && t.match(/^skintone-(\d)/)
					if (!n) return
					Un(e)
					L(parseInt(n[1], 10))
				},
				onSkinToneOptionsFocusOut: async function (e) {
					const { relatedTarget: t } = e
					;(t && 'skintone-list' === t.id) || (i.skinTonePickerExpanded = !1)
				},
				onSkinToneOptionsKeydown: function (e) {
					if (!i.skinTonePickerExpanded) return
					const t = async (t) => {
						Un(e), (i.activeSkinTone = t)
					}
					switch (e.key) {
						case 'ArrowUp':
							return t(Gn(!0, i.activeSkinTone, i.skinTones))
						case 'ArrowDown':
							return t(Gn(!1, i.activeSkinTone, i.skinTones))
						case 'Home':
							return t(0)
						case 'End':
							return t(i.skinTones.length - 1)
						case 'Enter':
							return Un(e), L(i.activeSkinTone)
						case 'Escape':
							return Un(e), (i.skinTonePickerExpanded = !1), a('skintone-button')
					}
				},
				onSkinToneOptionsKeyup: function (e) {
					if (!i.skinTonePickerExpanded) return
					if (' ' === e.key) return Un(e), L(i.activeSkinTone)
				},
				onSearchInput: function (e) {
					i.rawSearchText = e.target.value
				},
			},
			y = {
				calculateEmojiGridStyle: function (e) {
					!(function (e, t, n) {
						let r
						Jn
							? ((r = new ResizeObserver((e) => n(e[0].contentRect.width))), r.observe(e))
							: Vn(() => n(e.getBoundingClientRect().width)),
							t.addEventListener('abort', () => {
								r && r.disconnect()
							})
					})(e, o, (t) => {
						{
							const r = getComputedStyle(n.rootElement),
								o = parseInt(r.getPropertyValue('--num-columns'), 10),
								s = 'rtl' === r.getPropertyValue('direction'),
								a = e.parentElement.getBoundingClientRect().width - t
							;(i.numColumns = o), (i.scrollbarWidth = a), (i.isRtl = s)
						}
					})
				},
			}
		let v = !0
		function b() {
			i.database.customEmoji = i.customEmoji || cr
		}
		function w(e) {
			return !e.unicode || !jn(e) || Rn.get(e.unicode)
		}
		async function k(e) {
			const t = i.emojiVersion || (await Pn())
			return e.filter(({ version: e }) => !e || e <= t)
		}
		async function S(e) {
			return (function (e, t) {
				const n = (e) => {
					const n = {}
					for (const r of e) 'number' == typeof r.tone && r.version <= t && (n[r.tone] = r.unicode)
					return n
				}
				return e.map(
					({ unicode: e, skins: t, shortcodes: r, url: o, name: i, category: s, annotation: a }) => ({
						unicode: e,
						name: i,
						shortcodes: r,
						url: o,
						category: s,
						annotation: a,
						id: e || i,
						skins: t && n(t),
					})
				)
			})(e, i.emojiVersion || (await Pn()))
		}
		async function E(e) {
			const t = await i.database.getEmojiByUnicodeOrName(e),
				n = [...i.currentEmojis, ...i.currentFavorites].find((t) => t.id === e),
				r = n.unicode && f(n, i.currentSkinTone)
			await i.database.incrementFavoriteEmojiCount(e),
				u('emoji-click', {
					emoji: t,
					skinTone: i.currentSkinTone,
					...(r && { unicode: r }),
					...(n.name && { name: n.name }),
				})
		}
		function L(e) {
			;(i.currentSkinTone = e),
				(i.skinTonePickerExpanded = !1),
				a('skintone-button'),
				u('skin-tone-change', { skinTone: e }),
				i.database.setPreferredSkinTone(e)
		}
		return (
			s(() => {
				ir(e, i, m, g, y, n, o, v), (v = !1)
			}),
			i.emojiVersion ||
				Pn().then((e) => {
					e || (i.message = i.i18n.emojiUnsupportedMessage)
				}),
			s(() => {
				i.database &&
					(async function () {
						let e = !1
						const t = setTimeout(() => {
							;(e = !0), (i.message = i.i18n.loadingMessage)
						}, 1e3)
						try {
							await i.database.ready(), (i.databaseLoaded = !0)
						} catch (e) {
							console.error(e), (i.message = i.i18n.networkErrorMessage)
						} finally {
							clearTimeout(t), e && ((e = !1), (i.message = ''))
						}
					})()
			}),
			s(() => {
				i.pickerStyle = `\n      --num-groups: ${i.groups.length}; \n      --indicator-opacity: ${i.searchMode ? 0 : 1}; \n      --num-skintones: 6;`
			}),
			s(() => {
				i.customEmoji && i.database && b()
			}),
			s(() => {
				i.customEmoji && i.customEmoji.length
					? i.groups !== Ln && (i.groups = Ln)
					: i.groups !== xn && (i.currentGroupIndex && i.currentGroupIndex--, (i.groups = xn))
			}),
			s(() => {
				!(async function () {
					i.databaseLoaded && (i.currentSkinTone = await i.database.getPreferredSkinTone())
				})()
			}),
			s(() => {
				i.skinTones = Array(6)
					.fill()
					.map((e, t) =>
						(function (e, t) {
							if (0 === t) return e
							const n = e.indexOf(Dn)
							return -1 !== n
								? e.substring(0, n) + String.fromCodePoint(Fn + t - 1) + e.substring(n)
								: (e.endsWith(Mn) && (e = e.substring(0, e.length - 1)),
									e + $n + String.fromCodePoint(zn + t - 1))
						})(i.skinToneEmoji, t)
					)
			}),
			s(() => {
				i.skinToneButtonText = i.skinTones[i.currentSkinTone]
			}),
			s(() => {
				i.skinToneButtonLabel = i.i18n.skinToneLabel.replace('{skinTone}', i.i18n.skinTones[i.currentSkinTone])
			}),
			s(() => {
				i.databaseLoaded &&
					(async function () {
						const { database: e } = i,
							t = (await Promise.all(Cn.map((t) => e.getEmojiByUnicodeOrName(t)))).filter(Boolean)
						i.defaultFavoriteEmojis = t
					})()
			}),
			s(() => {
				i.databaseLoaded &&
					i.defaultFavoriteEmojis &&
					(async function () {
						b()
						const { database: e, defaultFavoriteEmojis: t, numColumns: n } = i,
							r = await e.getTopFavoriteEmoji(n),
							o = await S(Hn([...r, ...t], (e) => e.unicode || e.name).slice(0, n))
						i.currentFavorites = o
					})()
			}),
			s(() => {
				!(async function () {
					const { searchText: e, currentGroup: t, databaseLoaded: n, customEmoji: r } = i
					if (n)
						if (e.length >= 2) {
							const t = await (async function (e) {
								return S(await k(await i.database.getEmojiBySearchQuery(e)))
							})(e)
							i.searchText === e && (h(t), p(!0))
						} else {
							const { id: e } = t
							if (-1 !== e || (r && r.length)) {
								const t = await (async function (e) {
									const t = -1 === e ? i.customEmoji : await i.database.getEmojiByGroup(e)
									return S(await k(t))
								})(e)
								i.currentGroup.id === e && (h(t), p(!1))
							}
						}
					else (i.currentEmojis = []), (i.searchMode = !1)
				})()
			}),
			s(() => {
				const { currentEmojis: e, emojiVersion: t } = i,
					r = e.filter((e) => e.unicode).filter((e) => jn(e) && !Rn.has(e.unicode))
				if (!t && r.length)
					h(e),
						Vn(() =>
							(function (e) {
								;(function (e, t, n) {
									for (const r of e) {
										const e = Yn(n(r))
										void 0 === Wn && (Wn = Yn(t))
										const o = e / 1.8 < Wn
										Rn.set(r.unicode, o)
									}
								})(e, n.baselineEmoji, c),
									(i.currentEmojis = i.currentEmojis)
							})(r)
						)
				else {
					const r = t ? e : e.filter(w)
					h(r),
						Vn(() => {
							var e
							;(e = n.tabpanelElement) && (e.scrollTop = 0)
						})
				}
			}),
			s(() => {}),
			s(() => {
				;((e) => {
					ar(i.currentEmojisWithCategories, e, d) || (i.currentEmojisWithCategories = e)
				})(
					(function () {
						const { searchMode: e, currentEmojis: t } = i
						if (e) return [{ category: '', emojis: t }]
						const n = new Map()
						for (const e of t) {
							const t = e.category || ''
							let r = n.get(t)
							r || ((r = []), n.set(t, r)), r.push(e)
						}
						return [...n.entries()]
							.map(([e, t]) => ({ category: e, emojis: t }))
							.sort((e, t) => i.customCategorySorting(e.category, t.category))
					})()
				)
			}),
			s(() => {
				i.activeSearchItemId = -1 !== i.activeSearchItem && i.currentEmojis[i.activeSearchItem].id
			}),
			s(() => {
				const { rawSearchText: e } = i
				Tn(() => {
					;(i.searchText = (e || '').trim()), (i.activeSearchItem = -1)
				})
			}),
			s(() => {
				i.skinTonePickerExpanded
					? n.skinToneDropdown.addEventListener(
							'transitionend',
							() => {
								i.skinTonePickerExpandedAfterAnimation = !0
							},
							{ once: !0 }
						)
					: (i.skinTonePickerExpandedAfterAnimation = !1)
			}),
			{
				$set(e) {
					ur(i, e)
				},
				$destroy() {
					r.abort()
				},
			}
		)
	}
	var dr = {
		categoriesLabel: 'Categories',
		emojiUnsupportedMessage: 'Your browser does not support color emoji.',
		favoritesLabel: 'Favorites',
		loadingMessage: 'Loading…',
		networkErrorMessage: 'Could not load emoji.',
		regionLabel: 'Emoji picker',
		searchDescription: 'When search results are available, press up or down to select and enter to choose.',
		searchLabel: 'Search',
		searchResultsLabel: 'Search results',
		skinToneDescription: 'When expanded, press up or down to select and enter to choose.',
		skinToneLabel: 'Choose a skin tone (currently {skinTone})',
		skinTonesLabel: 'Skin tones',
		skinTones: ['Default', 'Light', 'Medium-Light', 'Medium', 'Medium-Dark', 'Dark'],
		categories: {
			custom: 'Custom',
			'smileys-emotion': 'Smileys and emoticons',
			'people-body': 'People and body',
			'animals-nature': 'Animals and nature',
			'food-drink': 'Food and drink',
			'travel-places': 'Travel and places',
			activities: 'Activities',
			objects: 'Objects',
			symbols: 'Symbols',
			flags: 'Flags',
		},
	}
	const hr = [
			'customEmoji',
			'customCategorySorting',
			'database',
			'dataSource',
			'i18n',
			'locale',
			'skinToneEmoji',
			'emojiVersion',
		],
		pr = `:host{--emoji-font-family:${_n}}`
	class fr extends HTMLElement {
		constructor(e) {
			super(), this.attachShadow({ mode: 'open' })
			const t = document.createElement('style')
			;(t.textContent =
				':host{--emoji-size:1.375rem;--emoji-padding:0.5rem;--category-emoji-size:var(--emoji-size);--category-emoji-padding:var(--emoji-padding);--indicator-height:3px;--input-border-radius:0.5rem;--input-border-size:1px;--input-font-size:1rem;--input-line-height:1.5;--input-padding:0.25rem;--num-columns:8;--outline-size:2px;--border-size:1px;--skintone-border-radius:1rem;--category-font-size:1rem;display:flex;width:min-content;height:400px}:host,:host(.light){color-scheme:light;--background:#fff;--border-color:#e0e0e0;--indicator-color:#385ac1;--input-border-color:#999;--input-font-color:#111;--input-placeholder-color:#999;--outline-color:#999;--category-font-color:#111;--button-active-background:#e6e6e6;--button-hover-background:#d9d9d9}:host(.dark){color-scheme:dark;--background:#222;--border-color:#444;--indicator-color:#5373ec;--input-border-color:#ccc;--input-font-color:#efefef;--input-placeholder-color:#ccc;--outline-color:#fff;--category-font-color:#efefef;--button-active-background:#555555;--button-hover-background:#484848}@media (prefers-color-scheme:dark){:host{color-scheme:dark;--background:#222;--border-color:#444;--indicator-color:#5373ec;--input-border-color:#ccc;--input-font-color:#efefef;--input-placeholder-color:#ccc;--outline-color:#fff;--category-font-color:#efefef;--button-active-background:#555555;--button-hover-background:#484848}}:host([hidden]){display:none}button{margin:0;padding:0;border:0;background:0 0;box-shadow:none;-webkit-tap-highlight-color:transparent}button::-moz-focus-inner{border:0}input{padding:0;margin:0;line-height:1.15;font-family:inherit}input[type=search]{-webkit-appearance:none}:focus{outline:var(--outline-color) solid var(--outline-size);outline-offset:calc(-1*var(--outline-size))}:host([data-js-focus-visible]) :focus:not([data-focus-visible-added]){outline:0}:focus:not(:focus-visible){outline:0}.hide-focus{outline:0}*{box-sizing:border-box}.picker{contain:content;display:flex;flex-direction:column;background:var(--background);border:var(--border-size) solid var(--border-color);width:100%;height:100%;overflow:hidden;--total-emoji-size:calc(var(--emoji-size) + (2 * var(--emoji-padding)));--total-category-emoji-size:calc(var(--category-emoji-size) + (2 * var(--category-emoji-padding)))}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.hidden{opacity:0;pointer-events:none}.abs-pos{position:absolute;left:0;top:0}.gone{display:none!important}.skintone-button-wrapper,.skintone-list{background:var(--background);z-index:3}.skintone-button-wrapper.expanded{z-index:1}.skintone-list{position:absolute;inset-inline-end:0;top:0;z-index:2;overflow:visible;border-bottom:var(--border-size) solid var(--border-color);border-radius:0 0 var(--skintone-border-radius) var(--skintone-border-radius);will-change:transform;transition:transform .2s ease-in-out;transform-origin:center 0}@media (prefers-reduced-motion:reduce){.skintone-list{transition-duration:.001s}}@supports not (inset-inline-end:0){.skintone-list{right:0}}.skintone-list.no-animate{transition:none}.tabpanel{overflow-y:auto;-webkit-overflow-scrolling:touch;will-change:transform;min-height:0;flex:1;contain:content}.emoji-menu{display:grid;grid-template-columns:repeat(var(--num-columns),var(--total-emoji-size));justify-content:space-around;align-items:flex-start;width:100%}.category{padding:var(--emoji-padding);font-size:var(--category-font-size);color:var(--category-font-color)}.custom-emoji,.emoji,button.emoji{height:var(--total-emoji-size);width:var(--total-emoji-size)}.emoji,button.emoji{font-size:var(--emoji-size);display:flex;align-items:center;justify-content:center;border-radius:100%;line-height:1;overflow:hidden;font-family:var(--emoji-font-family);cursor:pointer}@media (hover:hover) and (pointer:fine){.emoji:hover,button.emoji:hover{background:var(--button-hover-background)}}.emoji.active,.emoji:active,button.emoji.active,button.emoji:active{background:var(--button-active-background)}.custom-emoji{padding:var(--emoji-padding);object-fit:contain;pointer-events:none;background-repeat:no-repeat;background-position:center center;background-size:var(--emoji-size) var(--emoji-size)}.nav,.nav-button{align-items:center}.nav{display:grid;justify-content:space-between;contain:content}.nav-button{display:flex;justify-content:center}.nav-emoji{font-size:var(--category-emoji-size);width:var(--total-category-emoji-size);height:var(--total-category-emoji-size)}.indicator-wrapper{display:flex;border-bottom:1px solid var(--border-color)}.indicator{width:calc(100%/var(--num-groups));height:var(--indicator-height);opacity:var(--indicator-opacity);background-color:var(--indicator-color);will-change:transform,opacity;transition:opacity .1s linear,transform .25s ease-in-out}@media (prefers-reduced-motion:reduce){.indicator{will-change:opacity;transition:opacity .1s linear}}.pad-top,input.search{background:var(--background);width:100%}.pad-top{height:var(--emoji-padding);z-index:3}.search-row{display:flex;align-items:center;position:relative;padding-inline-start:var(--emoji-padding);padding-bottom:var(--emoji-padding)}.search-wrapper{flex:1;min-width:0}input.search{padding:var(--input-padding);border-radius:var(--input-border-radius);border:var(--input-border-size) solid var(--input-border-color);color:var(--input-font-color);font-size:var(--input-font-size);line-height:var(--input-line-height)}input.search::placeholder{color:var(--input-placeholder-color)}.favorites{display:flex;flex-direction:row;border-top:var(--border-size) solid var(--border-color);contain:content}.message{padding:var(--emoji-padding)}' +
				pr),
				this.shadowRoot.appendChild(t),
				(this._ctx = {
					locale: 'en',
					dataSource: 'https://cdn.jsdelivr.net/npm/emoji-picker-element-data@^1/en/emojibase/data.json',
					skinToneEmoji: '🖐️',
					customCategorySorting: On,
					customEmoji: null,
					i18n: dr,
					emojiVersion: null,
					...e,
				})
			for (const e of hr)
				'database' !== e &&
					Object.prototype.hasOwnProperty.call(this, e) &&
					((this._ctx[e] = this[e]), delete this[e])
			this._dbFlush()
		}
		connectedCallback() {
			this._cmp || (this._cmp = lr(this.shadowRoot, this._ctx))
		}
		disconnectedCallback() {
			sr(() => {
				if (!this.isConnected && this._cmp) {
					this._cmp.$destroy(), (this._cmp = void 0)
					const { database: e } = this._ctx
					e.close().catch((e) => console.error(e))
				}
			})
		}
		static get observedAttributes() {
			return ['locale', 'data-source', 'skin-tone-emoji', 'emoji-version']
		}
		attributeChangedCallback(e, t, n) {
			this._set(
				e.replace(/-([a-z])/g, (e, t) => t.toUpperCase()),
				'emoji-version' === e ? parseFloat(n) : n
			)
		}
		_set(e, t) {
			;(this._ctx[e] = t),
				this._cmp && this._cmp.$set({ [e]: t }),
				['locale', 'dataSource'].includes(e) && this._dbFlush()
		}
		_dbCreate() {
			const { locale: e, dataSource: t, database: n } = this._ctx
			;(n && n.locale === e && n.dataSource === t) || this._set('database', new En({ locale: e, dataSource: t }))
		}
		_dbFlush() {
			sr(() => this._dbCreate())
		}
	}
	const mr = {}
	for (const e of hr)
		mr[e] = {
			get() {
				return 'database' === e && this._dbCreate(), this._ctx[e]
			},
			set(t) {
				if ('database' === e) throw new Error('database is read-only')
				this._set(e, t)
			},
		}
	Object.defineProperties(fr.prototype, mr),
		customElements.get('emoji-picker') || customElements.define('emoji-picker', fr),
		document.getElementById('emoji-popup-btn').addEventListener('click', function () {
			var e = document.getElementById('emoji-popup-btn'),
				t = document.getElementById('emoji-popup')
			t.classList.contains('hidden')
				? (t.classList.remove('hidden'), e.classList.add('active'))
				: (t.classList.add('hidden'), e.classList.remove('active'))
		}),
		document.addEventListener('click', function (e) {
			var t = document.getElementById('emoji-popup-btn'),
				n = document.getElementById('emoji-popup')
			t.contains(e.target) ||
				n.contains(e.target) ||
				n.classList.contains('hidden') ||
				(n.classList.add('hidden'), t.classList.remove('active'))
		}),
		document.querySelector('emoji-picker').addEventListener('emoji-click', function (e) {
			document.getElementById('msg-input').value += e.detail.unicode
		})
})()
