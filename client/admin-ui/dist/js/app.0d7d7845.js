;(function (e) {
    function t(t) {
        for (var a, r, i = t[0], c = t[1], l = t[2], u = 0, m = []; u < i.length; u++)
            (r = i[u]), Object.prototype.hasOwnProperty.call(s, r) && s[r] && m.push(s[r][0]), (s[r] = 0)
        for (a in c) Object.prototype.hasOwnProperty.call(c, a) && (e[a] = c[a])
        d && d(t)
        while (m.length) m.shift()()
        return o.push.apply(o, l || []), n()
    }
    function n() {
        for (var e, t = 0; t < o.length; t++) {
            for (var n = o[t], a = !0, i = 1; i < n.length; i++) {
                var c = n[i]
                0 !== s[c] && (a = !1)
            }
            a && (o.splice(t--, 1), (e = r((r.s = n[0]))))
        }
        return e
    }
    var a = {},
        s = { app: 0 },
        o = []
    function r(t) {
        if (a[t]) return a[t].exports
        var n = (a[t] = { i: t, l: !1, exports: {} })
        return e[t].call(n.exports, n, n.exports, r), (n.l = !0), n.exports
    }
    ;(r.m = e),
        (r.c = a),
        (r.d = function (e, t, n) {
            r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n })
        }),
        (r.r = function (e) {
            'undefined' !== typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, {
                    value: 'Module',
                }),
                Object.defineProperty(e, '__esModule', { value: !0 })
        }),
        (r.t = function (e, t) {
            if ((1 & t && (e = r(e)), 8 & t)) return e
            if (4 & t && 'object' === typeof e && e && e.__esModule) return e
            var n = Object.create(null)
            if (
                (r.r(n),
                Object.defineProperty(n, 'default', {
                    enumerable: !0,
                    value: e,
                }),
                2 & t && 'string' != typeof e)
            )
                for (var a in e)
                    r.d(
                        n,
                        a,
                        function (t) {
                            return e[t]
                        }.bind(null, a)
                    )
            return n
        }),
        (r.n = function (e) {
            var t =
                e && e.__esModule
                    ? function () {
                          return e['default']
                      }
                    : function () {
                          return e
                      }
            return r.d(t, 'a', t), t
        }),
        (r.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }),
        (r.p = '')
    var i = (window['webpackJsonp'] = window['webpackJsonp'] || []),
        c = i.push.bind(i)
    ;(i.push = t), (i = i.slice())
    for (var l = 0; l < i.length; l++) t(i[l])
    var d = c
    o.push([0, 'chunk-vendors']), n()
})({
    0: function (e, t, n) {
        e.exports = n('56d7')
    },
    '03bd': function (e) {
        e.exports = JSON.parse(
            '{"separator":": ","id":"ID","update":"Atualizar","details":"Detalhes","actions":"Ações","select-namespace":"Selecione o e","namespace":"Espaço de nome","namespaces":"Espaço de nomes","disconnect":"Desconectar","name":"Nome","value":"Valor","type":"Tipo","status":"Status","connected":"conectado","disconnected":"desconectado","connection":{"title":"Conexão","serverUrl":"URL do Servidor","username":"Usuário","password":"Senha","connect":"Conectar","invalid-credentials":"Credenciais inválidas","error":"Error","websocket-only":"Apenas WebSocket?","path":"Caminho"},"dashboard":{"title":"Dashboard"},"sockets":{"title":"Sockets","details":"Detalhes do Socket","address":"Endereço IP","transport":"Transporte","disconnect":"Desconectar esta instância","displayDetails":"Exibir os detalhes desta instância","client":"Cliente","socket":"Socket","creation-date":"Data de criação","leave":"Saia desta sala","join":"Entrar","join-a-room":"Entrar em uma sala","initial-request":"Solicitação HTTP inicial","headers":"Cabeçalhos","query-params":"Parâmetros de consulta"},"rooms":{"title":"Salas","details":"Detalhes da sala","active":"Ativa","deleted":"Deletada","public":"Pública","private":"Privada","show-private":"Mostrar salas privadas?","sockets-count":"# de sockets","clear":"Remover todas as instâncias de Socket desta sala","leave":"Remover a instância de Socket desta sala","disconnect":"Desconecte todas as instâncias de Socket que estão nesta sala","displayDetails":"Exibir os detalhes desta sala"},"clients":{"title":"Clientes","details":"Detalhes do cliente","sockets-count":"# de sockets","disconnect":"Desconecte este cliente (e todas as instâncias anexadas)","displayDetails":"Mostrar os detalhes deste cliente"},"servers":{"title":"Servidores","hostname":"Nome do Host","pid":"PID","uptime":"Tempo de atividade","clients-count":"# de clientes","last-ping":"Último ping","healthy":"Bom","unhealthy":"Ruim"},"config":{"language":"Idioma","readonly":"Somente leitura?","dark-theme":"Tema escuro?"}}'
        )
    },
    '05eb': function (e, t, n) {},
    '0981': function (e, t, n) {},
    1993: function (e, t, n) {
        'use strict'
        n('d026')
    },
    '20c9': function (e, t, n) {},
    2224: function (e, t, n) {
        e.exports = n.p + 'img/logo-dark.3727fec5.svg'
    },
    '2bc7': function (e, t, n) {
        'use strict'
        n('20c9')
    },
    '3a99': function (e, t, n) {
        'use strict'
        n('05eb')
    },
    '423e': function (e) {
        e.exports = JSON.parse(
            '{"separator":": ","id":"ID","update":"更新","details":"详情","actions":"Actions","select-namespace":"选择 Namespace","namespace":"Namespace","namespaces":"Namespaces","disconnect":"断开连接","name":"名称","value":"值","type":"类型","status":"状态","connected":"已连接","disconnected":"未连接","connection":{"title":"连接","serverUrl":"服务器 URL","username":"用户名","password":"密码","connect":"提交","invalid-credentials":"无效的密钥","error":"错误"},"dashboard":{"title":"状态面板"},"sockets":{"title":"Sockets","details":"Socket 详情","address":"IP 地址","transport":"协议","disconnect":"与该 Socket 实例断开连接","displayDetails":"显示该 Socket 实例详情","client":"客户端","socket":"Socket","creation-date":"创建时间","leave":"离开房间","join":"加入","join-a-room":"加入房间","initial-request":"初始 HTTP 请求","headers":"Headers","query-params":"查询参数"},"rooms":{"title":"房间","details":"房间 详情","active":"活跃","deleted":"已删除","public":"公开","private":"私有","show-private":"显示私人房间？","sockets-count":"Sockets 数量","clear":"从此房间移除所有 Socket 实例","leave":"从该房间移除此 Socket 实例","disconnect":"与此房间内所有 Socket 实例断开连接","displayDetails":"显示此房间详情"},"clients":{"title":"客户端","details":"客户端详情","sockets-count":"Sockets 数量","disconnect":"与该客户端断开连接","displayDetails":"显示该客户端详情"},"servers":{"title":"服务器","hostname":"Hostname","pid":"PID","uptime":"已经运行","clients-count":"客户端数量","last-ping":"上次 ping","healthy":"健康","unhealthy":"不健康"},"config":{"language":"语言","readonly":"只读","dark-theme":"夜间模式"}}'
        )
    },
    4519: function (e, t, n) {},
    '49a0': function (e, t, n) {},
    '49f8': function (e, t, n) {
        var a = {
            './bn.json': '8782',
            './en.json': 'edd4',
            './fr.json': 'f693',
            './ko.json': 'dd11',
            './pt-BR.json': '03bd',
            './tr.json': 'ffeb',
            './zh-CN.json': '423e',
        }
        function s(e) {
            var t = o(e)
            return n(t)
        }
        function o(e) {
            if (!n.o(a, e)) {
                var t = new Error("Cannot find module '" + e + "'")
                throw ((t.code = 'MODULE_NOT_FOUND'), t)
            }
            return a[e]
        }
        ;(s.keys = function () {
            return Object.keys(a)
        }),
            (s.resolve = o),
            (e.exports = s),
            (s.id = '49f8')
    },
    '4a85': function (e, t, n) {
        'use strict'
        n('7e30')
    },
    '513c': function (e, t, n) {
        'use strict'
        n('49a0')
    },
    '56d7': function (e, t, n) {
        'use strict'
        n.r(t)
        n('e260'), n('e6cf'), n('cca6'), n('a79d')
        var a = n('2b0e'),
            s = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'v-app',
                    [
                        n('AppBar', {
                            on: {
                                update: function (t) {
                                    e.showConnectionModal = !0
                                },
                            },
                        }),
                        n('NavigationDrawer'),
                        n(
                            'v-main',
                            { class: e.backgroundColor },
                            [
                                n(
                                    'v-container',
                                    { attrs: { fluid: '' } },
                                    [
                                        n(
                                            e.transitionName,
                                            {
                                                tag: 'component',
                                                attrs: { 'hide-on-leave': '' },
                                            },
                                            [n('router-view')],
                                            1
                                        ),
                                    ],
                                    1
                                ),
                            ],
                            1
                        ),
                        n('ConnectionModal', {
                            attrs: {
                                'is-open': e.showConnectionModal,
                                'initial-server-url': e.serverUrl,
                                'initial-ws-only': e.wsOnly,
                                'initial-path': e.path,
                                'initial-namespace': e.namespace,
                                'initial-parser': e.parser,
                                'is-connecting': e.isConnecting,
                                error: e.connectionError,
                            },
                            on: { submit: e.onSubmit },
                        }),
                    ],
                    1
                )
            },
            o = [],
            r = n('5530'),
            i = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'v-app-bar',
                    {
                        attrs: {
                            app: '',
                            'clipped-left': '',
                            'extension-height': e.extensionHeight,
                        },
                        scopedSlots: e._u([
                            {
                                key: 'extension',
                                fn: function () {
                                    return [
                                        n(
                                            'div',
                                            {
                                                staticClass: 'd-flex flex-column d-lg-none',
                                            },
                                            [
                                                n('div', { staticClass: 'mt-3' }, [
                                                    e._v(' ' + e._s(e.$t('connection.serverUrl')) + e._s(e.$t('separator'))),
                                                    e.serverUrl ? n('code', [e._v(e._s(e.serverUrl))]) : e._e(),
                                                ]),
                                                n(
                                                    'div',
                                                    {
                                                        staticClass: 'mt-3 mb-3',
                                                    },
                                                    [
                                                        e._v(' ' + e._s(e.$t('status')) + e._s(e.$t('separator'))),
                                                        n('ConnectionStatus', {
                                                            attrs: {
                                                                connected: e.connected,
                                                            },
                                                        }),
                                                        n(
                                                            'v-btn',
                                                            {
                                                                staticClass: 'ml-3',
                                                                attrs: {
                                                                    small: '',
                                                                    outlined: '',
                                                                },
                                                                on: {
                                                                    click: e.onUpdate,
                                                                },
                                                            },
                                                            [e._v(e._s(e.$t('update')))]
                                                        ),
                                                    ],
                                                    1
                                                ),
                                            ]
                                        ),
                                    ]
                                },
                                proxy: !0,
                            },
                        ]),
                    },
                    [
                        n('v-app-bar-nav-icon', {
                            staticClass: 'd-lg-none',
                            on: {
                                click: function (t) {
                                    return t.stopPropagation(), e.toggleNavigationDrawer(t)
                                },
                            },
                        }),
                        n('v-img', {
                            attrs: {
                                src: e.logoSrc,
                                alt: 'logo',
                                'max-height': '40',
                                'max-width': '40',
                            },
                        }),
                        n('v-toolbar-title', { staticClass: 'ml-3' }, [e._v('Socket.IO Admin UI')]),
                        n(
                            'v-btn',
                            {
                                staticClass: 'pa-0 ml-2 elevation-0',
                                attrs: {
                                    small: '',
                                    href: e.linkToReleaseNotes,
                                },
                            },
                            [e._v(e._s(e.version))]
                        ),
                        n('v-spacer'),
                        n(
                            'div',
                            { staticClass: 'd-none d-lg-flex' },
                            [
                                n('div', [
                                    n('div', [
                                        e._v(' ' + e._s(e.$t('connection.serverUrl')) + e._s(e.$t('separator'))),
                                        e.serverUrl ? n('code', [e._v(e._s(e.serverUrl))]) : e._e(),
                                    ]),
                                    n(
                                        'div',
                                        [
                                            e._v(' ' + e._s(e.$t('status')) + e._s(e.$t('separator'))),
                                            n('ConnectionStatus', {
                                                attrs: {
                                                    connected: e.connected,
                                                },
                                            }),
                                        ],
                                        1
                                    ),
                                ]),
                                n(
                                    'v-btn',
                                    {
                                        staticClass: 'ml-3 align-self-center',
                                        attrs: { outlined: '' },
                                        on: { click: e.onUpdate },
                                    },
                                    [e._v(e._s(e.$t('update')))]
                                ),
                            ],
                            1
                        ),
                    ],
                    1
                )
            },
            c = [],
            l = (n('b0c0'), n('2f62')),
            d = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n('Status', {
                    attrs: {
                        value: e.connected,
                        'ok-label': e.$t('connected'),
                        'ko-label': e.$t('disconnected'),
                    },
                })
            },
            u = [],
            m = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'v-chip',
                    {
                        staticClass: 'text-uppercase',
                        attrs: { small: '', color: e.color, outlined: '' },
                    },
                    [e._v(e._s(e.label))]
                )
            },
            p = [],
            v = n('fcf4'),
            f = {
                name: 'Status',
                props: { value: Boolean, koLabel: String, okLabel: String },
                computed: {
                    label: function () {
                        return this.value ? this.okLabel : this.koLabel
                    },
                    color: function () {
                        return this.value ? v['a'].green.base : v['a'].red.base
                    },
                },
            },
            h = f,
            b = n('2877'),
            g = n('6544'),
            k = n.n(g),
            _ = n('cc20'),
            y = Object(b['a'])(h, m, p, !1, null, null, null),
            S = y.exports
        k()(y, { VChip: _['a'] })
        var O = {
                name: 'ConnectionStatus',
                components: { Status: S },
                props: { connected: Boolean },
            },
            C = O,
            x = Object(b['a'])(C, d, u, !1, null, null, null),
            $ = x.exports,
            j = '0.5.1',
            w = {
                name: 'AppBar',
                components: { ConnectionStatus: $ },
                data: function () {
                    return { version: j }
                },
                computed: Object(r['a'])(
                    Object(r['a'])(
                        {},
                        Object(l['d'])({
                            logoSrc: function (e) {
                                return e.config.darkTheme ? n('2224') : n('ea65')
                            },
                            serverUrl: function (e) {
                                return e.connection.serverUrl
                            },
                            connected: function (e) {
                                return e.connection.connected
                            },
                        })
                    ),
                    {},
                    {
                        linkToReleaseNotes: function () {
                            return 'https://github.com/socketio/socket.io-admin-ui/releases/tag/' + j
                        },
                        extensionHeight: function () {
                            switch (this.$vuetify.breakpoint.name) {
                                case 'xs':
                                case 'sm':
                                case 'md':
                                    return 96
                                case 'lg':
                                case 'xl':
                                default:
                                    return 0
                            }
                        },
                    }
                ),
                methods: {
                    onUpdate: function () {
                        this.$emit('update')
                    },
                    toggleNavigationDrawer: function () {
                        this.$store.commit('config/toggleNavigationDrawer')
                    },
                },
            },
            V = w,
            D = n('40dc'),
            T = n('5bc1'),
            I = n('8336'),
            E = n('adda'),
            N = n('2fa4'),
            R = n('2a7f'),
            P = Object(b['a'])(V, i, c, !1, null, null, null),
            B = P.exports
        k()(P, {
            VAppBar: D['a'],
            VAppBarNavIcon: T['a'],
            VBtn: I['a'],
            VImg: E['a'],
            VSpacer: N['a'],
            VToolbarTitle: R['a'],
        })
        var A = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'v-navigation-drawer',
                    {
                        staticClass: 'elevation-3',
                        attrs: { app: '', clipped: '' },
                        scopedSlots: e._u([
                            {
                                key: 'append',
                                fn: function () {
                                    return [
                                        n('v-divider'),
                                        n('div', { staticClass: 'pa-3 pt-10' }, [n('LangSelector'), n('ThemeSelector'), n('ReadonlyToggle')], 1),
                                    ]
                                },
                                proxy: !0,
                            },
                        ]),
                        model: {
                            value: e.$store.state.config.showNavigationDrawer,
                            callback: function (t) {
                                e.$set(e.$store.state.config, 'showNavigationDrawer', t)
                            },
                            expression: '$store.state.config.showNavigationDrawer',
                        },
                    },
                    [
                        n(
                            'v-list',
                            { attrs: { dense: '', nav: '' } },
                            e._l(e.items, function (t) {
                                return n(
                                    'v-list-item',
                                    {
                                        key: t.title,
                                        attrs: { to: t.to, exact: t.exact },
                                    },
                                    [
                                        n('v-list-item-icon', [n('v-icon', [e._v(e._s(t.icon))])], 1),
                                        n('v-list-item-content', [n('v-list-item-title', [e._v(e._s(t.title))])], 1),
                                    ],
                                    1
                                )
                            }),
                            1
                        ),
                    ],
                    1
                )
            },
            U = [],
            L = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n('v-select', {
                    attrs: {
                        dense: '',
                        value: e.lang,
                        items: e.languages,
                        label: e.$t('config.language'),
                    },
                    on: { change: e.onSelectLang },
                })
            },
            M = [],
            H = {
                name: 'LangSelector',
                data: function () {
                    return {
                        languages: [
                            { text: 'বাংলা', value: 'bn' },
                            { text: 'English', value: 'en' },
                            { text: 'Français', value: 'fr' },
                            { text: '한국어', value: 'ko' },
                            { text: 'Português (Brazil)', value: 'pt-BR' },
                            { text: 'Türkçe', value: 'tr' },
                            { text: '简体中文', value: 'zh-CN' },
                        ],
                    }
                },
                computed: Object(r['a'])(
                    {},
                    Object(l['d'])({
                        lang: function (e) {
                            return e.config.lang
                        },
                    })
                ),
                methods: Object(r['a'])(
                    Object(r['a'])({}, Object(l['c'])('config', ['selectLang'])),
                    {},
                    {
                        onSelectLang: function (e) {
                            ;(this.$i18n.locale = e), this.selectLang(e)
                        },
                    }
                ),
            },
            q = H,
            F = n('b974'),
            z = Object(b['a'])(q, L, M, !1, null, null, null),
            J = z.exports
        k()(z, { VSelect: F['a'] })
        var G = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n('v-switch', {
                    attrs: {
                        'input-value': e.darkTheme,
                        label: e.$t('config.dark-theme'),
                        inset: '',
                        dense: '',
                    },
                    on: { change: e.onSelectTheme },
                })
            },
            K = [],
            W = {
                name: 'ThemeSelector',
                computed: Object(r['a'])(
                    {},
                    Object(l['d'])({
                        darkTheme: function (e) {
                            return e.config.darkTheme
                        },
                    })
                ),
                methods: Object(r['a'])(
                    Object(r['a'])({}, Object(l['c'])('config', ['selectTheme'])),
                    {},
                    {
                        onSelectTheme: function (e) {
                            ;(this.$vuetify.theme.dark = e), this.selectTheme(e)
                        },
                    }
                ),
            },
            Y = W,
            Z = n('b73d'),
            Q = Object(b['a'])(Y, G, K, !1, null, null, null),
            X = Q.exports
        k()(Q, { VSwitch: Z['a'] })
        var ee = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n('v-switch', {
                    attrs: {
                        'input-value': e.readonly,
                        label: e.$t('config.readonly'),
                        disabled: e.disabled,
                        inset: '',
                        dense: '',
                    },
                    on: { change: e.toggleReadonly },
                })
            },
            te = [],
            ne = {
                name: 'ReadonlyToggle',
                computed: Object(r['a'])(
                    {},
                    Object(l['d'])({
                        readonly: function (e) {
                            return e.config.readonly
                        },
                        disabled: function (e) {
                            return 0 === e.config.supportedFeatures.length
                        },
                    })
                ),
                methods: Object(r['a'])({}, Object(l['c'])('config', ['toggleReadonly'])),
            },
            ae = ne,
            se = Object(b['a'])(ae, ee, te, !1, null, null, null),
            oe = se.exports
        k()(se, { VSwitch: Z['a'] })
        var re = {
                name: 'NavigationDrawer',
                components: {
                    ReadonlyToggle: oe,
                    ThemeSelector: X,
                    LangSelector: J,
                },
                computed: Object(r['a'])(
                    Object(r['a'])({}, Object(l['b'])('config', ['developmentMode'])),
                    {},
                    {
                        items: function () {
                            return this.developmentMode
                                ? [
                                      {
                                          title: this.$t('dashboard.title'),
                                          icon: 'mdi-home-outline',
                                          to: { name: 'dashboard' },
                                          exact: !0,
                                      },
                                      {
                                          title: this.$t('sockets.title'),
                                          icon: 'mdi-ray-start-arrow',
                                          to: { name: 'sockets' },
                                      },
                                      {
                                          title: this.$t('rooms.title'),
                                          icon: 'mdi-tag-outline',
                                          to: { name: 'rooms' },
                                      },
                                      {
                                          title: this.$t('clients.title'),
                                          icon: 'mdi-account-circle-outline',
                                          to: { name: 'clients' },
                                      },
                                      {
                                          title: this.$t('events.title'),
                                          icon: 'mdi-calendar-text-outline',
                                          to: { name: 'events' },
                                      },
                                      {
                                          title: this.$t('servers.title'),
                                          icon: 'mdi-server',
                                          to: { name: 'servers' },
                                      },
                                  ]
                                : [
                                      {
                                          title: this.$t('dashboard.title'),
                                          icon: 'mdi-home-outline',
                                          to: { name: 'dashboard' },
                                          exact: !0,
                                      },
                                      {
                                          title: this.$t('servers.title'),
                                          icon: 'mdi-server',
                                          to: { name: 'servers' },
                                      },
                                  ]
                        },
                    }
                ),
            },
            ie = re,
            ce = n('ce7e'),
            le = n('132d'),
            de = n('8860'),
            ue = n('da13'),
            me = n('5d23'),
            pe = n('34c3'),
            ve = n('f774'),
            fe = Object(b['a'])(ie, A, U, !1, null, null, null),
            he = fe.exports
        k()(fe, {
            VDivider: ce['a'],
            VIcon: le['a'],
            VList: de['a'],
            VListItem: ue['a'],
            VListItemContent: me['a'],
            VListItemIcon: pe['a'],
            VListItemTitle: me['b'],
            VNavigationDrawer: ve['a'],
        })
        var be = n('daa8'),
            ge = n('3262'),
            ke = n.n(ge),
            _e = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'v-dialog',
                    {
                        attrs: {
                            value: e.isOpen,
                            transition: 'dialog-bottom-transition',
                            'max-width': '300',
                            persistent: '',
                        },
                    },
                    [
                        n(
                            'v-card',
                            [
                                n('v-card-title', [e._v(e._s(e.$t('connection.title')))]),
                                n('v-card-text', [
                                    n(
                                        'form',
                                        {
                                            on: {
                                                submit: function (t) {
                                                    return t.preventDefault(), e.onSubmit(t)
                                                },
                                            },
                                        },
                                        [
                                            n('v-text-field', {
                                                attrs: {
                                                    label: e.$t('connection.serverUrl'),
                                                    placeholder: 'https://example.com',
                                                    required: '',
                                                },
                                                model: {
                                                    value: e.serverUrl,
                                                    callback: function (t) {
                                                        e.serverUrl = t
                                                    },
                                                    expression: 'serverUrl',
                                                },
                                            }),
                                            n('v-text-field', {
                                                attrs: {
                                                    label: e.$t('connection.username'),
                                                },
                                                model: {
                                                    value: e.username,
                                                    callback: function (t) {
                                                        e.username = t
                                                    },
                                                    expression: 'username',
                                                },
                                            }),
                                            n('v-text-field', {
                                                attrs: {
                                                    label: e.$t('connection.password'),
                                                    type: 'password',
                                                },
                                                model: {
                                                    value: e.password,
                                                    callback: function (t) {
                                                        e.password = t
                                                    },
                                                    expression: 'password',
                                                },
                                            }),
                                            n('v-switch', {
                                                attrs: {
                                                    label: e.$t('connection.advanced-options'),
                                                    inset: '',
                                                    dense: '',
                                                },
                                                model: {
                                                    value: e.showAdvancedOptions,
                                                    callback: function (t) {
                                                        e.showAdvancedOptions = t
                                                    },
                                                    expression: 'showAdvancedOptions',
                                                },
                                            }),
                                            n('v-expand-transition', [
                                                e.showAdvancedOptions
                                                    ? n(
                                                          'div',
                                                          [
                                                              n('v-switch', {
                                                                  directives: [
                                                                      {
                                                                          name: 'show',
                                                                          rawName: 'v-show',
                                                                          value: e.showAdvancedOptions,
                                                                          expression: 'showAdvancedOptions',
                                                                      },
                                                                  ],
                                                                  attrs: {
                                                                      label: e.$t('connection.websocket-only'),
                                                                      inset: '',
                                                                      dense: '',
                                                                  },
                                                                  model: {
                                                                      value: e.wsOnly,
                                                                      callback: function (t) {
                                                                          e.wsOnly = t
                                                                      },
                                                                      expression: 'wsOnly',
                                                                  },
                                                              }),
                                                              n('v-text-field', {
                                                                  attrs: {
                                                                      label: e.$t('connection.namespace'),
                                                                  },
                                                                  model: {
                                                                      value: e.namespace,
                                                                      callback: function (t) {
                                                                          e.namespace = t
                                                                      },
                                                                      expression: 'namespace',
                                                                  },
                                                              }),
                                                              n('v-text-field', {
                                                                  attrs: {
                                                                      label: e.$t('connection.path'),
                                                                  },
                                                                  model: {
                                                                      value: e.path,
                                                                      callback: function (t) {
                                                                          e.path = t
                                                                      },
                                                                      expression: 'path',
                                                                  },
                                                              }),
                                                              n('v-select', {
                                                                  attrs: {
                                                                      label: e.$t('connection.parser'),
                                                                      items: e.parserOptions,
                                                                  },
                                                                  model: {
                                                                      value: e.parser,
                                                                      callback: function (t) {
                                                                          e.parser = t
                                                                      },
                                                                      expression: 'parser',
                                                                  },
                                                              }),
                                                          ],
                                                          1
                                                      )
                                                    : e._e(),
                                            ]),
                                            n(
                                                'v-btn',
                                                {
                                                    staticClass: 'primary',
                                                    attrs: {
                                                        loading: e.isConnecting,
                                                        disabled: e.isConnecting || !e.isValid,
                                                        type: 'submit',
                                                    },
                                                },
                                                [e._v(e._s(e.$t('connection.connect')))]
                                            ),
                                            e.error
                                                ? n(
                                                      'div',
                                                      {
                                                          staticClass: 'red--text mt-3',
                                                      },
                                                      [e._v(' ' + e._s(e.errorMessage) + ' ')]
                                                  )
                                                : e._e(),
                                        ],
                                        1
                                    ),
                                ]),
                            ],
                            1
                        ),
                    ],
                    1
                )
            },
            ye = [],
            Se = {
                name: 'ConnectionModal',
                props: {
                    isOpen: Boolean,
                    isConnecting: Boolean,
                    initialServerUrl: String,
                    initialWsOnly: Boolean,
                    initialPath: String,
                    initialNamespace: String,
                    initialParser: String,
                    error: String,
                },
                data: function () {
                    return {
                        showAdvancedOptions: !1,
                        serverUrl: this.initialServerUrl,
                        wsOnly: this.initialWsOnly,
                        path: this.initialPath,
                        namespace: this.initialNamespace,
                        username: '',
                        password: '',
                        parser: this.initialParser,
                        parserOptions: [
                            {
                                value: 'default',
                                text: this.$t('connection.default-parser'),
                            },
                            {
                                value: 'msgpack',
                                text: this.$t('connection.msgpack-parser'),
                            },
                        ],
                    }
                },
                computed: {
                    isValid: function () {
                        return this.serverUrl && this.serverUrl.length
                    },
                    errorMessage: function () {
                        return 'invalid credentials' === this.error
                            ? this.$t('connection.invalid-credentials')
                            : this.$t('connection.error') + this.$t('separator') + this.error
                    },
                },
                methods: {
                    onSubmit: function () {
                        this.$emit('submit', {
                            serverUrl: this.serverUrl,
                            wsOnly: this.wsOnly,
                            path: this.path,
                            namespace: this.namespace,
                            username: this.username,
                            password: this.password,
                            parser: this.parser,
                        })
                    },
                },
            },
            Oe = Se,
            Ce = n('b0af'),
            xe = n('99d9'),
            $e = n('169a'),
            je = n('0789'),
            we = n('8654'),
            Ve = Object(b['a'])(Oe, _e, ye, !1, null, '142bafcc', null),
            De = Ve.exports
        k()(Ve, {
            VBtn: I['a'],
            VCard: Ce['a'],
            VCardText: xe['a'],
            VCardTitle: xe['b'],
            VDialog: $e['a'],
            VExpandTransition: je['a'],
            VSelect: F['a'],
            VSwitch: Z['a'],
            VTextField: we['a'],
        })
        var Te = {
            set socket(e) {
                this._socket = e
            },
            get socket() {
                return this._socket
            },
        }
        function Ie() {
            return new Date().toISOString()
        }
        var Ee = {
                name: 'App',
                components: {
                    ConnectionModal: De,
                    NavigationDrawer: he,
                    AppBar: B,
                    VSlideXTransition: je['f'],
                    VSlideXReverseTransition: je['e'],
                    VSlideYTransition: je['h'],
                    VSlideYReverseTransition: je['g'],
                },
                data: function () {
                    return {
                        showConnectionModal: !1,
                        isConnecting: !1,
                        connectionError: '',
                        transitionName: 'v-slide-x-reverse-transition',
                    }
                },
                computed: Object(r['a'])(
                    {},
                    Object(l['d'])({
                        serverUrl: function (e) {
                            return e.connection.serverUrl
                        },
                        wsOnly: function (e) {
                            return e.connection.wsOnly
                        },
                        path: function (e) {
                            return e.connection.path
                        },
                        namespace: function (e) {
                            return e.connection.namespace
                        },
                        parser: function (e) {
                            return e.connection.parser
                        },
                        backgroundColor: function (e) {
                            return e.config.darkTheme ? '' : 'grey lighten-5'
                        },
                    })
                ),
                watch: {
                    $route: function (e, t) {
                        e.meta.topLevel && t.meta.topLevel
                            ? (this.transitionName = e.meta.index > t.meta.index ? 'v-slide-y-reverse-transition' : 'v-slide-y-transition')
                            : (this.transitionName = e.meta.topLevel ? 'v-slide-x-transition' : 'v-slide-x-reverse-transition')
                    },
                },
                methods: {
                    tryConnect: function (e, t, n, a, s, o) {
                        var r = this
                        ;(this.isConnecting = !0),
                            Te.socket &&
                                (Te.socket.disconnect(), Te.socket.off('connect'), Te.socket.off('connect_error'), Te.socket.off('disconnect'))
                        var i = Object(be['a'])(e + t, {
                            forceNew: !0,
                            reconnection: !1,
                            withCredentials: !0,
                            transports: a ? ['websocket'] : ['polling', 'websocket'],
                            path: s,
                            parser: 'msgpack' === o ? ke.a : null,
                            auth: n,
                        })
                        i.once('connect', function () {
                            ;(r.showConnectionModal = !1),
                                (r.connectionError = ''),
                                (r.isConnecting = !1),
                                i.io.reconnection(!0),
                                r.$store.commit('connection/saveConfig', {
                                    serverUrl: e,
                                    wsOnly: a,
                                    path: s,
                                    namespace: t,
                                    parser: o,
                                }),
                                (Te.socket = i),
                                r.registerEventListeners(i)
                        }),
                            i.on('connect', function () {
                                r.$store.commit('connection/connect')
                            }),
                            i.on('connect_error', function (e) {
                                ;(r.isConnecting || 'invalid credentials' === e.message) &&
                                    ((r.showConnectionModal = !0), (r.connectionError = e.message)),
                                    (r.isConnecting = !1)
                            }),
                            i.on('disconnect', function (e) {
                                r.isConnecting && ((r.isConnecting = !1), (r.connectionError = e)), r.$store.commit('connection/disconnect')
                            })
                    },
                    registerEventListeners: function (e) {
                        var t = this
                        e.on('session', function (e) {
                            t.$store.commit('connection/saveSessionId', e)
                        }),
                            e.on('config', function (e) {
                                t.$store.commit('config/updateConfig', e)
                            }),
                            e.on('server_stats', function (e) {
                                t.$store.commit('servers/onServerStats', e), t.$store.commit('main/onServerStats', e)
                            }),
                            e.on('all_sockets', function (e) {
                                t.$store.commit('main/onAllSockets', e)
                            }),
                            e.on('socket_connected', function (e) {
                                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Ie()
                                t.$store.commit('main/onSocketConnected', {
                                    timestamp: n,
                                    socket: e,
                                })
                            }),
                            e.on('socket_updated', function (e) {
                                t.$store.commit('main/onSocketUpdated', e)
                            }),
                            e.on('socket_disconnected', function (e, n, a) {
                                var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : Ie()
                                t.$store.commit('main/onSocketDisconnected', {
                                    timestamp: s,
                                    nsp: e,
                                    id: n,
                                    reason: a,
                                })
                            }),
                            e.on('room_joined', function (e, n, a) {
                                var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : Ie()
                                t.$store.commit('main/onRoomJoined', {
                                    timestamp: s,
                                    nsp: e,
                                    room: n,
                                    id: a,
                                })
                            }),
                            e.on('room_left', function (e, n, a) {
                                var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : Ie()
                                t.$store.commit('main/onRoomLeft', {
                                    timestamp: s,
                                    nsp: e,
                                    room: n,
                                    id: a,
                                })
                            }),
                            e.on('event_received', function (e, n, a, s) {
                                t.$store.commit('main/onEventReceived', {
                                    timestamp: s,
                                    nsp: e,
                                    id: n,
                                    args: a,
                                })
                            }),
                            e.on('event_sent', function (e, n, a, s) {
                                t.$store.commit('main/onEventSent', {
                                    timestamp: s,
                                    nsp: e,
                                    id: n,
                                    args: a,
                                })
                            })
                    },
                    onSubmit: function (e) {
                        this.tryConnect(e.serverUrl, e.namespace, { username: e.username, password: e.password }, e.wsOnly, e.path, e.parser)
                    },
                },
                created: function () {
                    if (
                        ((this.$vuetify.theme.dark = this.$store.state.config.darkTheme),
                        this.$vuetify.breakpoint.lgAndUp && this.$store.commit('config/toggleNavigationDrawer'),
                        this.serverUrl)
                    ) {
                        var e = this.$store.state.connection.sessionId
                        this.tryConnect(this.serverUrl, this.namespace, { sessionId: e }, this.wsOnly, this.path, this.parser)
                    } else this.showConnectionModal = !0
                },
            },
            Ne = Ee,
            Re = n('7496'),
            Pe = n('a523'),
            Be = n('f6c4'),
            Ae = Object(b['a'])(Ne, s, o, !1, null, null, null),
            Ue = Ae.exports
        k()(Ae, { VApp: Re['a'], VContainer: Pe['a'], VMain: Be['a'] })
        var Le = n('8c4f'),
            Me = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'div',
                    [
                        n('v-breadcrumbs', {
                            attrs: { items: e.breadcrumbItems },
                        }),
                        n(
                            'v-container',
                            { attrs: { fluid: '' } },
                            [
                                n(
                                    'v-row',
                                    [
                                        n(
                                            'v-col',
                                            {
                                                attrs: {
                                                    cols: '12',
                                                    md: '6',
                                                    lg: '4',
                                                },
                                            },
                                            [n('ClientsOverview')],
                                            1
                                        ),
                                        n(
                                            'v-col',
                                            {
                                                attrs: {
                                                    cols: '12',
                                                    md: '6',
                                                    lg: '4',
                                                },
                                            },
                                            [n('ServersOverview')],
                                            1
                                        ),
                                        n(
                                            'v-col',
                                            {
                                                attrs: {
                                                    cols: '12',
                                                    md: '6',
                                                    lg: '4',
                                                },
                                            },
                                            [n('NamespacesOverview')],
                                            1
                                        ),
                                        e.hasAggregatedValues
                                            ? n(
                                                  'v-col',
                                                  {
                                                      attrs: {
                                                          cols: '12',
                                                          md: '6',
                                                      },
                                                  },
                                                  [n('ConnectionsHistogram')],
                                                  1
                                              )
                                            : e._e(),
                                        e.hasAggregatedValues
                                            ? n(
                                                  'v-col',
                                                  {
                                                      attrs: {
                                                          cols: '12',
                                                          md: '6',
                                                      },
                                                  },
                                                  [n('BytesHistogram')],
                                                  1
                                              )
                                            : e._e(),
                                    ],
                                    1
                                ),
                            ],
                            1
                        ),
                    ],
                    1
                )
            },
            He = [],
            qe = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'v-card',
                    [
                        n(
                            'v-card-title',
                            { staticClass: 'text-center' },
                            [
                                e._v(' ' + e._s(e.$t('clients.title')) + ' '),
                                n('v-spacer'),
                                e.developmentMode
                                    ? n(
                                          'v-btn',
                                          {
                                              attrs: {
                                                  to: { name: 'clients' },
                                                  small: '',
                                              },
                                          },
                                          [n('v-icon', [e._v('mdi-dots-horizontal')])],
                                          1
                                      )
                                    : e._e(),
                            ],
                            1
                        ),
                        n(
                            'v-card-text',
                            [
                                n(
                                    'v-row',
                                    [
                                        n('Doughnut', {
                                            staticClass: 'chart',
                                            attrs: {
                                                'chart-data': e.data,
                                                'chart-options': e.chartOptions,
                                            },
                                        }),
                                        n('v-simple-table', {
                                            staticClass: 'grow align-self-center',
                                            scopedSlots: e._u([
                                                {
                                                    key: 'default',
                                                    fn: function () {
                                                        return [
                                                            n(
                                                                'tbody',
                                                                [
                                                                    n('tr', [n('th', [e._v(e._s(e.$t('sockets.transport')))]), n('th', [e._v('#')])]),
                                                                    e._l(e.transports, function (t) {
                                                                        return n(
                                                                            'tr',
                                                                            {
                                                                                key: t,
                                                                            },
                                                                            [
                                                                                n(
                                                                                    'td',
                                                                                    [
                                                                                        n('Transport', {
                                                                                            attrs: {
                                                                                                transport: t,
                                                                                            },
                                                                                        }),
                                                                                    ],
                                                                                    1
                                                                                ),
                                                                                n('td', [
                                                                                    n('div', [n('h2', [e._v(e._s(e.transportRepartition[t]))])]),
                                                                                    n('div', [
                                                                                        e._v(
                                                                                            ' ' +
                                                                                                e._s(
                                                                                                    e.percentage(
                                                                                                        e.transportRepartition[t],
                                                                                                        e.clientsCount
                                                                                                    )
                                                                                                ) +
                                                                                                ' % '
                                                                                        ),
                                                                                    ]),
                                                                                ]),
                                                                            ]
                                                                        )
                                                                    }),
                                                                ],
                                                                2
                                                            ),
                                                        ]
                                                    },
                                                    proxy: !0,
                                                },
                                            ]),
                                        }),
                                    ],
                                    1
                                ),
                            ],
                            1
                        ),
                    ],
                    1
                )
            },
            Fe = [],
            ze = (n('4de4'), n('d81d'), n('7b97')),
            Je = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n('v-chip', { attrs: { small: '', color: e.color, outlined: '' } }, [e._v(e._s(e.label))])
            },
            Ge = [],
            Ke = {
                name: 'Transport',
                props: { transport: String },
                computed: {
                    label: function () {
                        switch (this.transport) {
                            case 'polling':
                                return 'HTTP long-polling'
                            case 'websocket':
                                return 'WebSocket'
                            default:
                                return this.transport
                        }
                    },
                    color: function () {
                        switch (this.transport) {
                            case 'polling':
                                return v['a'].orange.base
                            case 'websocket':
                                return v['a'].green.base
                            default:
                                return v['a'].grey.base
                        }
                    },
                },
            },
            We = Ke,
            Ye = Object(b['a'])(We, Je, Ge, !1, null, null, null),
            Ze = Ye.exports
        k()(Ye, { VChip: _['a'] })
        var Qe = n('53ca'),
            Xe = (n('a15b'), n('a434'), n('caad'), n('2532'), n('b680'), n('1c8f')),
            et = function () {
                var e = 'test'
                try {
                    return localStorage.setItem(e, e), localStorage.removeItem(e), !0
                } catch (t) {
                    return !1
                }
            },
            tt = et()
        function nt(e) {
            var t = Math.ceil(Math.max(e, 0)),
                n = Math.floor(t / 86400),
                a = Math.floor((t - 86400 * n) / 3600),
                s = Math.floor((t - 86400 * n - 3600 * a) / 60),
                o = Math.ceil(t) - 86400 * n - 3600 * a - 60 * s,
                r = []
            return (
                n > 0 && r.push(n + 'd'),
                (n > 0 || a > 0) && r.push(a + 'h'),
                (n > 0 || a > 0 || s > 0) && r.push(s + 'm'),
                r.push(o + 's'),
                r.join(' ')
            )
        }
        function at(e, t) {
            var n = 'object' === Object(Qe['a'])(t) ? Object(Xe['a'])(e, t) : e.indexOf(t)
            return -1 === n ? [] : e.splice(n, 1)
        }
        function st(e, t) {
            e.includes(t) || e.push(t)
        }
        function ot(e, t) {
            return 0 === t ? 0 : ((e / t) * 100).toFixed(1)
        }
        var rt = n('9223'),
            it = {
                name: 'ClientsOverview',
                components: { Transport: Ze, Doughnut: ze['b'] },
                data: function () {
                    return {
                        transports: ['websocket', 'polling'],
                        chartOptions: { plugins: { legend: { display: !1 } } },
                    }
                },
                computed: Object(r['a'])(
                    Object(r['a'])(
                        Object(r['a'])(
                            {},
                            Object(l['d'])({
                                clients: function (e) {
                                    return e.main.clients
                                },
                                darkTheme: function (e) {
                                    return e.config.darkTheme
                                },
                                servers: function (e) {
                                    return e.servers.servers
                                },
                            })
                        ),
                        Object(l['b'])('config', ['hasAggregatedValues', 'developmentMode'])
                    ),
                    {},
                    {
                        clientsCount: function () {
                            return this.hasAggregatedValues ? Object(rt['a'])(this.servers, 'clientsCount') : this.clients.length
                        },
                        transportRepartition: function () {
                            if (this.hasAggregatedValues) {
                                var e = Object(rt['a'])(this.servers, 'pollingClientsCount')
                                return {
                                    polling: e,
                                    websocket: this.clientsCount - e,
                                }
                            }
                            return this.clients
                                .map(function (e) {
                                    return e.sockets[0]
                                })
                                .filter(function (e) {
                                    return !!e
                                })
                                .reduce(
                                    function (e, t) {
                                        return e[t.transport]++, e
                                    },
                                    { websocket: 0, polling: 0 }
                                )
                        },
                        data: function () {
                            return {
                                labels: ['WebSocket', 'HTTP long-polling'],
                                datasets: [
                                    {
                                        backgroundColor: [v['a'].green.base, v['a'].orange.base],
                                        borderColor: this.darkTheme ? 'black' : 'white',
                                        data: [this.transportRepartition['websocket'], this.transportRepartition['polling']],
                                    },
                                ],
                            }
                        },
                    }
                ),
                methods: { percentage: ot },
            },
            ct = it,
            lt = (n('2bc7'), n('0fd9')),
            dt = n('1f4f'),
            ut = Object(b['a'])(ct, qe, Fe, !1, null, '68c0c5d5', null),
            mt = ut.exports
        k()(ut, {
            VBtn: I['a'],
            VCard: Ce['a'],
            VCardText: xe['a'],
            VCardTitle: xe['b'],
            VIcon: le['a'],
            VRow: lt['a'],
            VSimpleTable: dt['a'],
            VSpacer: N['a'],
        })
        var pt = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'v-card',
                    [
                        n(
                            'v-card-title',
                            { staticClass: 'text-center' },
                            [
                                e._v(' ' + e._s(e.$t('servers.title')) + ' '),
                                n('v-spacer'),
                                n(
                                    'v-btn',
                                    {
                                        attrs: {
                                            to: { name: 'servers' },
                                            small: '',
                                        },
                                    },
                                    [n('v-icon', [e._v('mdi-dots-horizontal')])],
                                    1
                                ),
                            ],
                            1
                        ),
                        n(
                            'v-card-text',
                            [
                                n(
                                    'v-row',
                                    [
                                        n('Doughnut', {
                                            staticClass: 'chart',
                                            attrs: {
                                                'chart-data': e.data,
                                                'chart-options': e.chartOptions,
                                            },
                                        }),
                                        n('v-simple-table', {
                                            staticClass: 'grow align-self-center',
                                            scopedSlots: e._u([
                                                {
                                                    key: 'default',
                                                    fn: function () {
                                                        return [
                                                            n('tbody', [
                                                                n('tr', [n('th', [e._v(e._s(e.$t('status')))]), n('th', [e._v('#')])]),
                                                                n('tr', [
                                                                    n(
                                                                        'td',
                                                                        [
                                                                            n('ServerStatus', {
                                                                                attrs: {
                                                                                    healthy: '',
                                                                                },
                                                                            }),
                                                                        ],
                                                                        1
                                                                    ),
                                                                    n('td', [
                                                                        n('div', [n('h2', [e._v(e._s(e.healthyServers))])]),
                                                                        n('div', [e._v(e._s(e.percentage(e.healthyServers, e.totalServers)) + ' %')]),
                                                                    ]),
                                                                ]),
                                                                n('tr', [
                                                                    n('td', [n('ServerStatus')], 1),
                                                                    n('td', [
                                                                        n('div', [n('h2', [e._v(e._s(e.totalServers - e.healthyServers))])]),
                                                                        n('div', [
                                                                            e._v(
                                                                                ' ' +
                                                                                    e._s(
                                                                                        e.percentage(
                                                                                            e.totalServers - e.healthyServers,
                                                                                            e.totalServers
                                                                                        )
                                                                                    ) +
                                                                                    ' % '
                                                                            ),
                                                                        ]),
                                                                    ]),
                                                                ]),
                                                            ]),
                                                        ]
                                                    },
                                                    proxy: !0,
                                                },
                                            ]),
                                        }),
                                    ],
                                    1
                                ),
                            ],
                            1
                        ),
                    ],
                    1
                )
            },
            vt = [],
            ft = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n('Status', {
                    attrs: {
                        value: e.healthy,
                        'ok-label': e.$t('servers.healthy'),
                        'ko-label': e.$t('servers.unhealthy'),
                    },
                })
            },
            ht = [],
            bt = {
                name: 'ServerStatus',
                components: { Status: S },
                props: { healthy: Boolean },
            },
            gt = bt,
            kt = Object(b['a'])(gt, ft, ht, !1, null, null, null),
            _t = kt.exports,
            yt = {
                name: 'ServersOverview',
                components: { ServerStatus: _t, Doughnut: ze['b'] },
                data: function () {
                    return {
                        chartOptions: { plugins: { legend: { display: !1 } } },
                    }
                },
                computed: Object(r['a'])(
                    Object(r['a'])(
                        {},
                        Object(l['d'])({
                            healthyServers: function (e) {
                                return e.servers.servers.filter(function (e) {
                                    return e.healthy
                                }).length
                            },
                            totalServers: function (e) {
                                return e.servers.servers.length
                            },
                            darkTheme: function (e) {
                                return e.config.darkTheme
                            },
                        })
                    ),
                    {},
                    {
                        data: function () {
                            return {
                                labels: [this.$t('servers.healthy'), this.$t('servers.unhealthy')],
                                datasets: [
                                    {
                                        backgroundColor: [v['a'].green.base, v['a'].red.base],
                                        borderColor: this.darkTheme ? 'black' : 'white',
                                        data: [this.healthyServers, this.totalServers - this.healthyServers],
                                    },
                                ],
                            }
                        },
                    }
                ),
                methods: { percentage: ot },
            },
            St = yt,
            Ot = (n('a86e'), Object(b['a'])(St, pt, vt, !1, null, '0ad5cc14', null)),
            Ct = Ot.exports
        k()(Ot, {
            VBtn: I['a'],
            VCard: Ce['a'],
            VCardText: xe['a'],
            VCardTitle: xe['b'],
            VIcon: le['a'],
            VRow: lt['a'],
            VSimpleTable: dt['a'],
            VSpacer: N['a'],
        })
        var xt = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'v-card',
                    { staticClass: 'fill-height' },
                    [
                        n(
                            'v-card-title',
                            { staticClass: 'text-center' },
                            [
                                e._v(' ' + e._s(e.$t('namespaces')) + ' '),
                                n('v-spacer'),
                                e.developmentMode
                                    ? n(
                                          'v-btn',
                                          {
                                              attrs: {
                                                  to: { name: 'sockets' },
                                                  small: '',
                                              },
                                          },
                                          [n('v-icon', [e._v('mdi-dots-horizontal')])],
                                          1
                                      )
                                    : e._e(),
                            ],
                            1
                        ),
                        n('v-simple-table', {
                            scopedSlots: e._u([
                                {
                                    key: 'default',
                                    fn: function () {
                                        return [
                                            n('thead', [
                                                n('tr', [n('th', [e._v(e._s(e.$t('name')))]), n('th', [e._v(e._s(e.$t('rooms.sockets-count')))])]),
                                            ]),
                                            n(
                                                'tbody',
                                                e._l(e.namespaces, function (t) {
                                                    return n('tr', { key: t.name }, [
                                                        n(
                                                            'td',
                                                            {
                                                                staticClass: 'key-column',
                                                            },
                                                            [n('code', [e._v(e._s(t.name))])]
                                                        ),
                                                        n('td', [e._v(e._s(t.socketsCount))]),
                                                    ])
                                                }),
                                                0
                                            ),
                                        ]
                                    },
                                    proxy: !0,
                                },
                            ]),
                        }),
                    ],
                    1
                )
            },
            $t = [],
            jt = n('d66c'),
            wt = {
                name: 'NamespacesOverview',
                computed: Object(r['a'])(
                    Object(r['a'])(
                        Object(r['a'])(
                            Object(r['a'])(
                                {},
                                Object(l['d'])({
                                    plainNamespaces: function (e) {
                                        return Object(jt['a'])(e.main.namespaces, 'name').map(function (e) {
                                            var t = e.name,
                                                n = e.sockets
                                            return {
                                                name: t,
                                                socketsCount: n.length,
                                            }
                                        })
                                    },
                                })
                            ),
                            Object(l['b'])('config', ['hasAggregatedValues', 'developmentMode'])
                        ),
                        Object(l['b'])('servers', {
                            liteNamespaces: 'namespaces',
                        })
                    ),
                    {},
                    {
                        namespaces: function () {
                            return this.hasAggregatedValues ? this.liteNamespaces : this.plainNamespaces
                        },
                    }
                ),
            },
            Vt = wt,
            Dt = Object(b['a'])(Vt, xt, $t, !1, null, '11fe24be', null),
            Tt = Dt.exports
        k()(Dt, {
            VBtn: I['a'],
            VCard: Ce['a'],
            VCardTitle: xe['b'],
            VIcon: le['a'],
            VSimpleTable: dt['a'],
            VSpacer: N['a'],
        })
        var It = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'v-card',
                    [
                        n('v-card-title', { staticClass: 'text-center' }, [e._v(' ' + e._s(e.$t('dashboard.connectionsHistogram.title')) + ' ')]),
                        n(
                            'v-card-text',
                            [
                                n(
                                    'v-row',
                                    [
                                        n('Bar', {
                                            staticStyle: { width: '100%' },
                                            attrs: {
                                                'chart-data': e.chartData,
                                                'chart-options': e.chartOptions,
                                                height: e.chartHeight,
                                            },
                                        }),
                                    ],
                                    1
                                ),
                            ],
                            1
                        ),
                    ],
                    1
                )
            },
            Et = [],
            Nt = n('6b78')
        function Rt(e) {
            return { x: e.timestamp, y: e.count }
        }
        var Pt = {
                name: 'ConnectionsHistogram',
                components: { Bar: ze['a'] },
                data: function () {
                    return {
                        chartHeight: 120,
                        chartOptions: {
                            parsing: !1,
                            scales: {
                                x: {
                                    type: 'time',
                                    time: { stepSize: 1, unit: 'minute' },
                                },
                                y: {
                                    type: 'linear',
                                    beginAtZero: !0,
                                    suggestedMax: 10,
                                    ticks: { precision: 0 },
                                },
                            },
                        },
                    }
                },
                computed: Object(r['a'])(
                    Object(r['a'])({}, Object(l['d'])('main', ['aggregatedEvents'])),
                    {},
                    {
                        connectionEvents: function () {
                            return this.aggregatedEvents
                                .filter(function (e) {
                                    return 'rawConnection' === e.type
                                })
                                .map(Rt)
                        },
                        disconnectionEvents: function () {
                            return this.aggregatedEvents
                                .filter(function (e) {
                                    return 'rawDisconnection' === e.type
                                })
                                .map(Rt)
                        },
                        chartData: function () {
                            return {
                                datasets: [
                                    {
                                        label: this.$i18n.t('events.type.connection'),
                                        backgroundColor: v['a'].green.base,
                                        data: this.connectionEvents,
                                    },
                                    {
                                        label: this.$i18n.t('events.type.disconnection'),
                                        backgroundColor: v['a'].red.base,
                                        data: this.disconnectionEvents,
                                    },
                                ],
                            }
                        },
                    }
                ),
                created: function () {
                    this.updateChartBounds(), (this.interval = setInterval(this.updateChartBounds, 1e4))
                },
                beforeDestroy: function () {
                    clearInterval(this.interval)
                },
                methods: {
                    updateChartBounds: function () {
                        var e = new Date()
                        ;(this.chartOptions.scales.x.min = Object(Nt['a'])(e, 10)), (this.chartOptions.scales.x.max = e)
                    },
                },
            },
            Bt = Pt,
            At = Object(b['a'])(Bt, It, Et, !1, null, null, null),
            Ut = At.exports
        k()(At, {
            VCard: Ce['a'],
            VCardText: xe['a'],
            VCardTitle: xe['b'],
            VRow: lt['a'],
        })
        var Lt = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'v-card',
                    [
                        n('v-card-title', { staticClass: 'text-center' }, [e._v(' ' + e._s(e.$t('dashboard.bytesHistogram.title')) + ' ')]),
                        n(
                            'v-card-text',
                            [
                                n(
                                    'v-row',
                                    [
                                        n('Bar', {
                                            staticStyle: { width: '100%' },
                                            attrs: {
                                                'chart-data': e.chartData,
                                                'chart-options': e.chartOptions,
                                                height: e.chartHeight,
                                            },
                                        }),
                                    ],
                                    1
                                ),
                            ],
                            1
                        ),
                    ],
                    1
                )
            },
            Mt = []
        function Ht(e) {
            return { x: e.timestamp, y: e.count }
        }
        var qt = {
                name: 'BytesHistogram',
                components: { Bar: ze['a'] },
                data: function () {
                    return {
                        chartHeight: 120,
                        chartOptions: {
                            parsing: !1,
                            scales: {
                                x: {
                                    type: 'time',
                                    time: { stepSize: 1, unit: 'minute' },
                                },
                                y: {
                                    type: 'linear',
                                    beginAtZero: !0,
                                    suggestedMax: 1e3,
                                    ticks: { precision: 0 },
                                },
                            },
                        },
                    }
                },
                computed: Object(r['a'])(
                    Object(r['a'])({}, Object(l['d'])('main', ['aggregatedEvents'])),
                    {},
                    {
                        bytesIn: function () {
                            return this.aggregatedEvents
                                .filter(function (e) {
                                    return 'bytesIn' === e.type
                                })
                                .map(Ht)
                        },
                        bytesOut: function () {
                            return this.aggregatedEvents
                                .filter(function (e) {
                                    return 'bytesOut' === e.type
                                })
                                .map(Ht)
                        },
                        chartData: function () {
                            return {
                                datasets: [
                                    {
                                        label: this.$i18n.t('dashboard.bytesHistogram.bytesIn'),
                                        backgroundColor: v['a'].green.base,
                                        data: this.bytesIn,
                                    },
                                    {
                                        label: this.$i18n.t('dashboard.bytesHistogram.bytesOut'),
                                        backgroundColor: v['a'].red.base,
                                        data: this.bytesOut,
                                    },
                                ],
                            }
                        },
                    }
                ),
                created: function () {
                    this.updateChartBounds(), (this.interval = setInterval(this.updateChartBounds, 1e4))
                },
                beforeDestroy: function () {
                    clearInterval(this.interval)
                },
                methods: {
                    updateChartBounds: function () {
                        var e = new Date()
                        ;(this.chartOptions.scales.x.min = Object(Nt['a'])(e, 10)), (this.chartOptions.scales.x.max = e)
                    },
                },
            },
            Ft = qt,
            zt = Object(b['a'])(Ft, Lt, Mt, !1, null, null, null),
            Jt = zt.exports
        k()(zt, {
            VCard: Ce['a'],
            VCardText: xe['a'],
            VCardTitle: xe['b'],
            VRow: lt['a'],
        })
        var Gt = {
                name: 'Dashboard',
                components: {
                    NamespacesOverview: Tt,
                    ServersOverview: Ct,
                    ClientsOverview: mt,
                    ConnectionsHistogram: Ut,
                    BytesHistogram: Jt,
                },
                computed: Object(r['a'])(
                    {
                        breadcrumbItems: function () {
                            return [
                                {
                                    text: this.$t('dashboard.title'),
                                    disabled: !0,
                                },
                            ]
                        },
                    },
                    Object(l['b'])('config', ['hasAggregatedValues'])
                ),
            },
            Kt = Gt,
            Wt = n('2bc5'),
            Yt = n('62ad'),
            Zt = Object(b['a'])(Kt, Me, He, !1, null, null, null),
            Qt = Zt.exports
        k()(Zt, {
            VBreadcrumbs: Wt['a'],
            VCol: Yt['a'],
            VContainer: Pe['a'],
            VRow: lt['a'],
        })
        var Xt = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'div',
                    [
                        n('v-breadcrumbs', {
                            attrs: { items: e.breadcrumbItems },
                        }),
                        n(
                            'v-card',
                            [
                                n('v-card-text', [n('NamespaceSelector')], 1),
                                n('v-data-table', {
                                    staticClass: 'row-pointer',
                                    attrs: {
                                        headers: e.headers,
                                        items: e.sockets,
                                        'footer-props': e.footerProps,
                                    },
                                    on: { 'click:row': e.displayDetails },
                                    scopedSlots: e._u([
                                        {
                                            key: 'item.transport',
                                            fn: function (e) {
                                                var t = e.value
                                                return [
                                                    n('Transport', {
                                                        attrs: { transport: t },
                                                    }),
                                                ]
                                            },
                                        },
                                        {
                                            key: 'item.actions',
                                            fn: function (t) {
                                                var a = t.item
                                                return [
                                                    e.isSocketDisconnectSupported
                                                        ? n(
                                                              'v-tooltip',
                                                              {
                                                                  attrs: {
                                                                      bottom: '',
                                                                  },
                                                                  scopedSlots: e._u(
                                                                      [
                                                                          {
                                                                              key: 'activator',
                                                                              fn: function (t) {
                                                                                  var s = t.on,
                                                                                      o = t.attrs
                                                                                  return [
                                                                                      n(
                                                                                          'v-btn',
                                                                                          e._g(
                                                                                              e._b(
                                                                                                  {
                                                                                                      staticClass: 'ml-3',
                                                                                                      attrs: {
                                                                                                          disabled: e.isReadonly,
                                                                                                          small: '',
                                                                                                      },
                                                                                                      on: {
                                                                                                          click: function (t) {
                                                                                                              return e.disconnect(a)
                                                                                                          },
                                                                                                      },
                                                                                                  },
                                                                                                  'v-btn',
                                                                                                  o,
                                                                                                  !1
                                                                                              ),
                                                                                              s
                                                                                          ),
                                                                                          [n('v-icon', [e._v('mdi-logout')])],
                                                                                          1
                                                                                      ),
                                                                                  ]
                                                                              },
                                                                          },
                                                                      ],
                                                                      null,
                                                                      !0
                                                                  ),
                                                              },
                                                              [n('span', [e._v(e._s(e.$t('sockets.disconnect')))])]
                                                          )
                                                        : e._e(),
                                                ]
                                            },
                                        },
                                    ]),
                                }),
                            ],
                            1
                        ),
                    ],
                    1
                )
            },
            en = [],
            tn = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n('v-select', {
                    staticClass: 'selector',
                    attrs: {
                        value: e.selectedNamespace,
                        items: e.namespaces,
                        'item-text': 'name',
                        'item-value': 'name',
                        label: e.$t('select-namespace'),
                        'persistent-hint': '',
                        'return-object': '',
                    },
                    on: { change: e.selectNamespace },
                })
            },
            nn = [],
            an = {
                name: 'NamespaceSelector',
                computed: Object(r['a'])(
                    {},
                    Object(l['d'])({
                        selectedNamespace: function (e) {
                            return e.main.selectedNamespace
                        },
                        namespaces: function (e) {
                            return Object(jt['a'])(e.main.namespaces, 'name')
                        },
                    })
                ),
                methods: Object(r['a'])({}, Object(l['c'])('main', ['selectNamespace'])),
            },
            sn = an,
            on = (n('f712'), Object(b['a'])(sn, tn, nn, !1, null, '2c330798', null)),
            rn = on.exports
        k()(on, { VSelect: F['a'] })
        var cn = {
                name: 'Sockets',
                components: { Transport: Ze, NamespaceSelector: rn },
                data: function () {
                    return {
                        footerProps: {
                            'items-per-page-options': [20, 100, -1],
                        },
                    }
                },
                computed: Object(r['a'])(
                    Object(r['a'])(
                        {
                            breadcrumbItems: function () {
                                return [
                                    {
                                        text: this.$t('sockets.title'),
                                        disabled: !0,
                                    },
                                ]
                            },
                            headers: function () {
                                return [
                                    { text: '#', value: 'id', align: 'start' },
                                    {
                                        text: this.$t('sockets.address'),
                                        value: 'handshake.address',
                                    },
                                    {
                                        text: this.$t('sockets.transport'),
                                        value: 'transport',
                                    },
                                    {
                                        value: 'actions',
                                        align: 'end',
                                        sortable: !1,
                                    },
                                ]
                            },
                        },
                        Object(l['b'])('main', ['sockets'])
                    ),
                    Object(l['d'])({
                        selectedNamespace: function (e) {
                            return e.main.selectedNamespace
                        },
                        isReadonly: function (e) {
                            return e.config.readonly
                        },
                        isSocketDisconnectSupported: function (e) {
                            return e.config.supportedFeatures.includes('DISCONNECT')
                        },
                    })
                ),
                methods: {
                    disconnect: function (e) {
                        Te.socket.emit('_disconnect', e.nsp, !1, e.id)
                    },
                    displayDetails: function (e) {
                        this.$router.push({
                            name: 'socket',
                            params: {
                                nsp: this.selectedNamespace.name,
                                id: e.id,
                            },
                        })
                    },
                },
            },
            ln = cn,
            dn = (n('513c'), n('8fea')),
            un = n('3a2f'),
            mn = Object(b['a'])(ln, Xt, en, !1, null, '1d29c60a', null),
            pn = mn.exports
        k()(mn, {
            VBreadcrumbs: Wt['a'],
            VBtn: I['a'],
            VCard: Ce['a'],
            VCardText: xe['a'],
            VDataTable: dn['a'],
            VIcon: le['a'],
            VTooltip: un['a'],
        })
        var vn = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'div',
                    [
                        n('v-breadcrumbs', {
                            attrs: { items: e.breadcrumbItems },
                        }),
                        e.socket
                            ? n(
                                  'v-container',
                                  { attrs: { fluid: '' } },
                                  [
                                      n(
                                          'v-row',
                                          [
                                              n(
                                                  'v-col',
                                                  {
                                                      attrs: {
                                                          sm: '12',
                                                          md: '6',
                                                          lg: '4',
                                                      },
                                                  },
                                                  [
                                                      n('SocketDetails', {
                                                          attrs: {
                                                              socket: e.socket,
                                                              client: e.client,
                                                          },
                                                      }),
                                                  ],
                                                  1
                                              ),
                                              n(
                                                  'v-col',
                                                  {
                                                      attrs: {
                                                          sm: '12',
                                                          md: '6',
                                                          lg: '4',
                                                      },
                                                  },
                                                  [
                                                      n('InitialRequest', {
                                                          attrs: {
                                                              socket: e.socket,
                                                          },
                                                      }),
                                                  ],
                                                  1
                                              ),
                                              n(
                                                  'v-col',
                                                  {
                                                      attrs: {
                                                          sm: '12',
                                                          md: '6',
                                                          lg: '4',
                                                      },
                                                  },
                                                  [
                                                      n('SocketRooms', {
                                                          attrs: {
                                                              socket: e.socket,
                                                          },
                                                      }),
                                                  ],
                                                  1
                                              ),
                                          ],
                                          1
                                      ),
                                  ],
                                  1
                              )
                            : e._e(),
                    ],
                    1
                )
            },
            fn = [],
            hn = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'v-card',
                    { staticClass: 'fill-height' },
                    [
                        n('v-card-title', [e._v(e._s(e.$t('rooms.title')))]),
                        n('v-data-table', {
                            staticClass: 'row-pointer',
                            attrs: {
                                headers: e.headers,
                                items: e.roomsAsObjects,
                                dense: '',
                            },
                            on: { 'click:row': e.displayDetails },
                            scopedSlots: e._u([
                                {
                                    key: 'item.actions',
                                    fn: function (t) {
                                        var a = t.item
                                        return [
                                            e.isSocketLeaveSupported
                                                ? n(
                                                      'v-tooltip',
                                                      {
                                                          attrs: { bottom: '' },
                                                          scopedSlots: e._u(
                                                              [
                                                                  {
                                                                      key: 'activator',
                                                                      fn: function (t) {
                                                                          var s = t.on,
                                                                              o = t.attrs
                                                                          return [
                                                                              n(
                                                                                  'v-btn',
                                                                                  e._g(
                                                                                      e._b(
                                                                                          {
                                                                                              staticClass: 'ml-3',
                                                                                              attrs: {
                                                                                                  disabled: e.isReadonly,
                                                                                                  small: '',
                                                                                              },
                                                                                              on: {
                                                                                                  click: function (t) {
                                                                                                      return e.leave(a)
                                                                                                  },
                                                                                              },
                                                                                          },
                                                                                          'v-btn',
                                                                                          o,
                                                                                          !1
                                                                                      ),
                                                                                      s
                                                                                  ),
                                                                                  [n('v-icon', [e._v('mdi-tag-off-outline')])],
                                                                                  1
                                                                              ),
                                                                          ]
                                                                      },
                                                                  },
                                                              ],
                                                              null,
                                                              !0
                                                          ),
                                                      },
                                                      [n('span', [e._v(e._s(e.$t('sockets.leave')))])]
                                                  )
                                                : e._e(),
                                        ]
                                    },
                                },
                            ]),
                        }),
                        n('v-card-text', [
                            n(
                                'form',
                                {
                                    on: {
                                        submit: function (t) {
                                            return t.preventDefault(), e.onSubmit(t)
                                        },
                                    },
                                },
                                [
                                    n('v-combobox', {
                                        staticClass: 'select-room d-inline-block mr-3',
                                        attrs: {
                                            'search-input': e.newRoom,
                                            label: e.$t('sockets.join-a-room'),
                                            items: e.availableRooms,
                                            'item-value': 'name',
                                            'item-text': 'name',
                                            disabled: e.isReadonly,
                                            'return-object': !1,
                                        },
                                        on: {
                                            'update:searchInput': function (t) {
                                                e.newRoom = t
                                            },
                                            'update:search-input': function (t) {
                                                e.newRoom = t
                                            },
                                        },
                                    }),
                                    n(
                                        'v-tooltip',
                                        {
                                            attrs: { bottom: '' },
                                            scopedSlots: e._u([
                                                {
                                                    key: 'activator',
                                                    fn: function (t) {
                                                        var a = t.on,
                                                            s = t.attrs
                                                        return [
                                                            n(
                                                                'v-btn',
                                                                e._g(
                                                                    e._b(
                                                                        {
                                                                            attrs: {
                                                                                type: 'submit',
                                                                                small: '',
                                                                                disabled: e.isReadonly,
                                                                            },
                                                                        },
                                                                        'v-btn',
                                                                        s,
                                                                        !1
                                                                    ),
                                                                    a
                                                                ),
                                                                [n('v-icon', [e._v('mdi-tag-plus-outline')])],
                                                                1
                                                            ),
                                                        ]
                                                    },
                                                },
                                            ]),
                                        },
                                        [n('span', [e._v(e._s(e.$t('sockets.join')))])]
                                    ),
                                ],
                                1
                            ),
                        ]),
                    ],
                    1
                )
            },
            bn = [],
            gn = (n('fb6a'), n('1775')),
            kn = {
                name: 'SocketRooms',
                props: { socket: Object },
                data: function () {
                    return { newRoom: '' }
                },
                computed: Object(r['a'])(
                    Object(r['a'])(
                        {
                            headers: function () {
                                return [
                                    {
                                        text: this.$t('id'),
                                        value: 'name',
                                        align: 'start',
                                    },
                                    {
                                        value: 'actions',
                                        align: 'end',
                                        sortable: !1,
                                    },
                                ]
                            },
                            roomsAsObjects: function () {
                                return this.socket.rooms
                                    .slice(0)
                                    .sort()
                                    .map(function (e) {
                                        return { name: e }
                                    })
                            },
                            availableRooms: function () {
                                return Object(gn['a'])(this.findRoomsByNamespace(this.socket.nsp), this.roomsAsObjects, 'name')
                            },
                        },
                        Object(l['d'])({
                            selectedNamespace: function (e) {
                                return e.main.selectedNamespace
                            },
                            isReadonly: function (e) {
                                return e.config.readonly
                            },
                            isSocketLeaveSupported: function (e) {
                                return e.config.supportedFeatures.includes('LEAVE')
                            },
                            isSocketDisconnectSupported: function (e) {
                                return e.config.supportedFeatures.includes('DISCONNECT')
                            },
                        })
                    ),
                    Object(l['b'])('main', ['findRoomsByNamespace'])
                ),
                methods: {
                    emit: function () {},
                    onSubmit: function () {
                        Te.socket.emit('join', this.socket.nsp, this.newRoom, this.socket.id), (this.newRoom = '')
                    },
                    leave: function (e) {
                        Te.socket.emit('leave', this.socket.nsp, e.name, this.socket.id)
                    },
                    disconnect: function () {
                        Te.socket.emit('_disconnect', this.socket.nsp, !1, this.socket.id)
                    },
                    displayDetails: function (e) {
                        this.$router.push({
                            name: 'room',
                            params: { nsp: this.socket.nsp, name: e.name },
                        })
                    },
                },
            },
            _n = kn,
            yn = (n('4a85'), n('2b5d')),
            Sn = Object(b['a'])(_n, hn, bn, !1, null, '5631eb89', null),
            On = Sn.exports
        k()(Sn, {
            VBtn: I['a'],
            VCard: Ce['a'],
            VCardText: xe['a'],
            VCardTitle: xe['b'],
            VCombobox: yn['a'],
            VDataTable: dn['a'],
            VIcon: le['a'],
            VTooltip: un['a'],
        })
        var Cn = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'v-card',
                    { staticClass: 'fill-height' },
                    [
                        n('v-card-title', [e._v(e._s(e.$t('details')))]),
                        n('v-card-text', [n('h4', [e._v(e._s(e.$t('sockets.client')))])]),
                        n(
                            'v-simple-table',
                            { attrs: { dense: '' } },
                            [
                                [
                                    n('tbody', [
                                        n('tr', [
                                            n('td', { staticClass: 'key-column' }, [e._v(e._s(e.$t('id')))]),
                                            n(
                                                'td',
                                                [
                                                    e.client.connected
                                                        ? n(
                                                              'router-link',
                                                              {
                                                                  staticClass: 'link',
                                                                  attrs: {
                                                                      to: e.toClient,
                                                                  },
                                                              },
                                                              [e._v(e._s(e.client.id))]
                                                          )
                                                        : n('span', [e._v(e._s(e.client.id))]),
                                                ],
                                                1
                                            ),
                                            n('td'),
                                        ]),
                                        n('tr', [
                                            n('td', { staticClass: 'key-column' }, [e._v(e._s(e.$t('status')))]),
                                            n(
                                                'td',
                                                [
                                                    n('ConnectionStatus', {
                                                        attrs: {
                                                            connected: e.client.connected,
                                                        },
                                                    }),
                                                ],
                                                1
                                            ),
                                            n(
                                                'td',
                                                { attrs: { align: 'right' } },
                                                [
                                                    e.isSocketDisconnectSupported && e.client.connected
                                                        ? n(
                                                              'v-tooltip',
                                                              {
                                                                  attrs: {
                                                                      bottom: '',
                                                                  },
                                                                  scopedSlots: e._u(
                                                                      [
                                                                          {
                                                                              key: 'activator',
                                                                              fn: function (t) {
                                                                                  var a = t.on,
                                                                                      s = t.attrs
                                                                                  return [
                                                                                      n(
                                                                                          'v-btn',
                                                                                          e._g(
                                                                                              e._b(
                                                                                                  {
                                                                                                      attrs: {
                                                                                                          disabled: e.isReadonly,
                                                                                                          small: '',
                                                                                                      },
                                                                                                      on: {
                                                                                                          click: function (t) {
                                                                                                              return e.disconnectClient()
                                                                                                          },
                                                                                                      },
                                                                                                  },
                                                                                                  'v-btn',
                                                                                                  s,
                                                                                                  !1
                                                                                              ),
                                                                                              a
                                                                                          ),
                                                                                          [n('v-icon', [e._v('mdi-logout')])],
                                                                                          1
                                                                                      ),
                                                                                  ]
                                                                              },
                                                                          },
                                                                      ],
                                                                      null,
                                                                      !1,
                                                                      1004975867
                                                                  ),
                                                              },
                                                              [n('span', [e._v(e._s(e.$t('clients.disconnect')))])]
                                                          )
                                                        : e._e(),
                                                ],
                                                1
                                            ),
                                        ]),
                                        n('tr', [
                                            n('td', { staticClass: 'key-column' }, [e._v(e._s(e.$t('sockets.transport')))]),
                                            n(
                                                'td',
                                                [
                                                    n('Transport', {
                                                        attrs: {
                                                            transport: e.socket.transport,
                                                        },
                                                    }),
                                                ],
                                                1
                                            ),
                                            n('td'),
                                        ]),
                                        n('tr', [
                                            n('td', { staticClass: 'key-column' }, [e._v(e._s(e.$t('sockets.address')))]),
                                            n('td', [e._v(e._s(e.socket.handshake.address))]),
                                            n('td'),
                                        ]),
                                    ]),
                                ],
                            ],
                            2
                        ),
                        n('v-card-text', [n('h4', [e._v(e._s(e.$t('sockets.socket')))])]),
                        n('v-simple-table', {
                            attrs: { dense: '' },
                            scopedSlots: e._u([
                                {
                                    key: 'default',
                                    fn: function () {
                                        return [
                                            n('tbody', [
                                                n('tr', [
                                                    n(
                                                        'td',
                                                        {
                                                            staticClass: 'key-column',
                                                        },
                                                        [e._v(e._s(e.$t('namespace')))]
                                                    ),
                                                    n('td', [n('code', [e._v(e._s(e.socket.nsp))])]),
                                                    n('td'),
                                                ]),
                                                n('tr', [
                                                    n(
                                                        'td',
                                                        {
                                                            staticClass: 'key-column',
                                                        },
                                                        [e._v(e._s(e.$t('id')))]
                                                    ),
                                                    n('td', [e._v(e._s(e.socket.id))]),
                                                    n('td'),
                                                ]),
                                                n('tr', [
                                                    n(
                                                        'td',
                                                        {
                                                            staticClass: 'key-column',
                                                        },
                                                        [e._v(e._s(e.$t('data')))]
                                                    ),
                                                    n('td', [n('pre', [n('code', [e._v(e._s(JSON.stringify(e.socket.data, null, 2)))])])]),
                                                    n('td'),
                                                ]),
                                                n('tr', [
                                                    n(
                                                        'td',
                                                        {
                                                            staticClass: 'key-column',
                                                        },
                                                        [e._v(e._s(e.$t('status')))]
                                                    ),
                                                    n(
                                                        'td',
                                                        [
                                                            n('ConnectionStatus', {
                                                                attrs: {
                                                                    connected: e.socket.connected,
                                                                },
                                                            }),
                                                        ],
                                                        1
                                                    ),
                                                    n(
                                                        'td',
                                                        {
                                                            attrs: {
                                                                align: 'right',
                                                            },
                                                        },
                                                        [
                                                            e.isSocketDisconnectSupported && e.socket.connected
                                                                ? n(
                                                                      'v-tooltip',
                                                                      {
                                                                          attrs: {
                                                                              bottom: '',
                                                                          },
                                                                          scopedSlots: e._u(
                                                                              [
                                                                                  {
                                                                                      key: 'activator',
                                                                                      fn: function (t) {
                                                                                          var a = t.on,
                                                                                              s = t.attrs
                                                                                          return [
                                                                                              n(
                                                                                                  'v-btn',
                                                                                                  e._g(
                                                                                                      e._b(
                                                                                                          {
                                                                                                              staticClass: 'ml-3',
                                                                                                              attrs: {
                                                                                                                  disabled: e.isReadonly,
                                                                                                                  small: '',
                                                                                                              },
                                                                                                              on: {
                                                                                                                  click: function (t) {
                                                                                                                      return e.disconnectSocket()
                                                                                                                  },
                                                                                                              },
                                                                                                          },
                                                                                                          'v-btn',
                                                                                                          s,
                                                                                                          !1
                                                                                                      ),
                                                                                                      a
                                                                                                  ),
                                                                                                  [n('v-icon', [e._v('mdi-logout')])],
                                                                                                  1
                                                                                              ),
                                                                                          ]
                                                                                      },
                                                                                  },
                                                                              ],
                                                                              null,
                                                                              !1,
                                                                              2351110648
                                                                          ),
                                                                      },
                                                                      [n('span', [e._v(e._s(e.$t('sockets.disconnect')))])]
                                                                  )
                                                                : e._e(),
                                                        ],
                                                        1
                                                    ),
                                                ]),
                                                n('tr', [
                                                    n(
                                                        'td',
                                                        {
                                                            staticClass: 'key-column',
                                                        },
                                                        [e._v(e._s(e.$t('sockets.creation-date')))]
                                                    ),
                                                    n('td', [e._v(e._s(e.creationDate))]),
                                                    n('td'),
                                                ]),
                                            ]),
                                        ]
                                    },
                                    proxy: !0,
                                },
                            ]),
                        }),
                    ],
                    1
                )
            },
            xn = [],
            $n = {
                name: 'SocketDetails',
                components: { ConnectionStatus: $, Transport: Ze },
                props: { socket: Object, client: Object },
                computed: Object(r['a'])(
                    {
                        toClient: function () {
                            return {
                                name: 'client',
                                params: { id: this.client.id },
                            }
                        },
                        creationDate: function () {
                            return new Date(this.socket.handshake.issued).toISOString()
                        },
                    },
                    Object(l['d'])({
                        isReadonly: function (e) {
                            return e.config.readonly
                        },
                        isSocketDisconnectSupported: function (e) {
                            return e.config.supportedFeatures.includes('DISCONNECT')
                        },
                    })
                ),
                methods: {
                    navigateToClient: function () {
                        this.$router.push({
                            name: 'client',
                            params: { id: this.client.id },
                        })
                    },
                    disconnectClient: function () {
                        Te.socket.emit('_disconnect', this.socket.nsp, !0, this.socket.id)
                    },
                    disconnectSocket: function () {
                        Te.socket.emit('_disconnect', this.socket.nsp, !1, this.socket.id)
                    },
                },
            },
            jn = $n,
            wn = (n('eb02'), Object(b['a'])(jn, Cn, xn, !1, null, '3c0dcfcd', null)),
            Vn = wn.exports
        k()(wn, {
            VBtn: I['a'],
            VCard: Ce['a'],
            VCardText: xe['a'],
            VCardTitle: xe['b'],
            VIcon: le['a'],
            VSimpleTable: dt['a'],
            VTooltip: un['a'],
        })
        var Dn = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'v-card',
                    { staticClass: 'fill-height' },
                    [
                        n('v-card-title', [e._v(e._s(e.$t('sockets.initial-request')))]),
                        n('v-card-text', [n('h4', [e._v(e._s(e.$t('sockets.headers')))])]),
                        n('KeyValueTable', {
                            attrs: { object: e.socket.handshake.headers },
                        }),
                        n('v-card-text', [n('h4', [e._v(e._s(e.$t('sockets.query-params')))])]),
                        n('KeyValueTable', {
                            attrs: { object: e.socket.handshake.query },
                        }),
                    ],
                    1
                )
            },
            Tn = [],
            In = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n('v-simple-table', {
                    attrs: { dense: '' },
                    scopedSlots: e._u([
                        {
                            key: 'default',
                            fn: function () {
                                return [
                                    n('thead', [n('tr', [n('th', [e._v(e._s(e.$t('name')))]), n('th', [e._v(e._s(e.$t('value')))])])]),
                                    n(
                                        'tbody',
                                        e._l(e.items, function (t) {
                                            var a = t.key,
                                                s = t.value
                                            return n('tr', { key: a }, [
                                                n(
                                                    'td',
                                                    {
                                                        staticClass: 'key-column',
                                                    },
                                                    [e._v(e._s(a))]
                                                ),
                                                n('td', [e._v(e._s(s))]),
                                            ])
                                        }),
                                        0
                                    ),
                                ]
                            },
                            proxy: !0,
                        },
                    ]),
                })
            },
            En = [],
            Nn =
                (n('b64b'),
                {
                    name: 'KeyValueTable',
                    props: { object: Object },
                    computed: {
                        items: function () {
                            var e = this,
                                t = Object.keys(this.object)
                            return t.sort().map(function (t) {
                                return { key: t, value: e.object[t] }
                            })
                        },
                    },
                }),
            Rn = Nn,
            Pn = (n('786c'), Object(b['a'])(Rn, In, En, !1, null, '18284f59', null)),
            Bn = Pn.exports
        k()(Pn, { VSimpleTable: dt['a'] })
        var An = {
                name: 'InitialRequest',
                components: { KeyValueTable: Bn },
                props: { socket: Object },
            },
            Un = An,
            Ln = Object(b['a'])(Un, Dn, Tn, !1, null, null, null),
            Mn = Ln.exports
        k()(Ln, { VCard: Ce['a'], VCardText: xe['a'], VCardTitle: xe['b'] })
        var Hn = {
                name: 'Socket',
                components: {
                    InitialRequest: Mn,
                    SocketDetails: Vn,
                    SocketRooms: On,
                },
                data: function () {
                    return { socket: null, client: null }
                },
                computed: Object(r['a'])(
                    {
                        breadcrumbItems: function () {
                            return [
                                {
                                    text: this.$t('sockets.title'),
                                    to: { name: 'sockets' },
                                },
                                {
                                    text: this.$t('sockets.details'),
                                    disabled: !0,
                                },
                            ]
                        },
                    },
                    Object(l['b'])('main', ['findSocketById', 'findClientById'])
                ),
                mounted: function () {
                    ;(this.socket = this.findSocketById(this.$route.params.nsp, this.$route.params.id)),
                        this.socket && (this.client = this.findClientById(this.socket.clientId))
                },
            },
            qn = Hn,
            Fn = Object(b['a'])(qn, vn, fn, !1, null, '14172ed0', null),
            zn = Fn.exports
        k()(Fn, {
            VBreadcrumbs: Wt['a'],
            VCol: Yt['a'],
            VContainer: Pe['a'],
            VRow: lt['a'],
        })
        var Jn = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'div',
                    [
                        n('v-breadcrumbs', {
                            attrs: { items: e.breadcrumbItems },
                        }),
                        n(
                            'v-card',
                            [
                                n(
                                    'v-card-text',
                                    { staticClass: 'd-flex' },
                                    [
                                        n('NamespaceSelector'),
                                        n('v-switch', {
                                            staticClass: 'ml-3',
                                            attrs: {
                                                label: e.$t('rooms.show-private'),
                                                inset: '',
                                                dense: '',
                                            },
                                            on: {
                                                change: e.onPrivateRoomsUpdate,
                                            },
                                            model: {
                                                value: e.showPrivateRooms,
                                                callback: function (t) {
                                                    e.showPrivateRooms = t
                                                },
                                                expression: 'showPrivateRooms',
                                            },
                                        }),
                                    ],
                                    1
                                ),
                                n('v-data-table', {
                                    staticClass: 'row-pointer',
                                    attrs: {
                                        headers: e.headers,
                                        items: e.filteredRooms,
                                        'footer-props': e.footerProps,
                                    },
                                    on: { 'click:row': e.displayDetails },
                                    scopedSlots: e._u([
                                        {
                                            key: 'item.sockets',
                                            fn: function (t) {
                                                var n = t.item
                                                return [e._v(' ' + e._s(n.sockets.length) + ' ')]
                                            },
                                        },
                                        {
                                            key: 'item.isPrivate',
                                            fn: function (e) {
                                                var t = e.value
                                                return [
                                                    n('RoomType', {
                                                        attrs: {
                                                            'is-private': t,
                                                        },
                                                    }),
                                                ]
                                            },
                                        },
                                        {
                                            key: 'item.actions',
                                            fn: function (t) {
                                                var a = t.item
                                                return [
                                                    e.isMultiLeaveSupported && !a.isPrivate
                                                        ? n(
                                                              'v-tooltip',
                                                              {
                                                                  attrs: {
                                                                      bottom: '',
                                                                  },
                                                                  scopedSlots: e._u(
                                                                      [
                                                                          {
                                                                              key: 'activator',
                                                                              fn: function (t) {
                                                                                  var s = t.on,
                                                                                      o = t.attrs
                                                                                  return [
                                                                                      n(
                                                                                          'v-btn',
                                                                                          e._g(
                                                                                              e._b(
                                                                                                  {
                                                                                                      staticClass: 'ml-3',
                                                                                                      attrs: {
                                                                                                          disabled: e.isReadonly,
                                                                                                          small: '',
                                                                                                      },
                                                                                                      on: {
                                                                                                          click: function (t) {
                                                                                                              return e.clear(a)
                                                                                                          },
                                                                                                      },
                                                                                                  },
                                                                                                  'v-btn',
                                                                                                  o,
                                                                                                  !1
                                                                                              ),
                                                                                              s
                                                                                          ),
                                                                                          [n('v-icon', [e._v('mdi-tag-off-outline')])],
                                                                                          1
                                                                                      ),
                                                                                  ]
                                                                              },
                                                                          },
                                                                      ],
                                                                      null,
                                                                      !0
                                                                  ),
                                                              },
                                                              [n('span', [e._v(e._s(e.$t('rooms.clear')))])]
                                                          )
                                                        : e._e(),
                                                    e.isMultiDisconnectSupported
                                                        ? n(
                                                              'v-tooltip',
                                                              {
                                                                  attrs: {
                                                                      bottom: '',
                                                                  },
                                                                  scopedSlots: e._u(
                                                                      [
                                                                          {
                                                                              key: 'activator',
                                                                              fn: function (t) {
                                                                                  var s = t.on,
                                                                                      o = t.attrs
                                                                                  return [
                                                                                      n(
                                                                                          'v-btn',
                                                                                          e._g(
                                                                                              e._b(
                                                                                                  {
                                                                                                      staticClass: 'ml-3',
                                                                                                      attrs: {
                                                                                                          disabled: e.isReadonly,
                                                                                                          small: '',
                                                                                                      },
                                                                                                      on: {
                                                                                                          click: function (t) {
                                                                                                              return e.disconnect(a)
                                                                                                          },
                                                                                                      },
                                                                                                  },
                                                                                                  'v-btn',
                                                                                                  o,
                                                                                                  !1
                                                                                              ),
                                                                                              s
                                                                                          ),
                                                                                          [n('v-icon', [e._v('mdi-logout')])],
                                                                                          1
                                                                                      ),
                                                                                  ]
                                                                              },
                                                                          },
                                                                      ],
                                                                      null,
                                                                      !0
                                                                  ),
                                                              },
                                                              [n('span', [e._v(e._s(e.$t('rooms.disconnect')))])]
                                                          )
                                                        : e._e(),
                                                ]
                                            },
                                        },
                                    ]),
                                }),
                            ],
                            1
                        ),
                    ],
                    1
                )
            },
            Gn = [],
            Kn =
                (n('5319'),
                n('ac1f'),
                function () {
                    var e = this,
                        t = e.$createElement,
                        n = e._self._c || t
                    return n('Status', {
                        attrs: {
                            value: !e.isPrivate,
                            'ok-label': e.$t('rooms.public'),
                            'ko-label': e.$t('rooms.private'),
                        },
                    })
                }),
            Wn = [],
            Yn = {
                name: 'RoomType',
                components: { Status: S },
                props: { isPrivate: Boolean },
            },
            Zn = Yn,
            Qn = Object(b['a'])(Zn, Kn, Wn, !1, null, null, null),
            Xn = Qn.exports,
            ea = {
                name: 'Rooms',
                components: { RoomType: Xn, NamespaceSelector: rn },
                data: function () {
                    return {
                        showPrivateRooms: !1,
                        footerProps: {
                            'items-per-page-options': [20, 100, -1],
                        },
                    }
                },
                computed: Object(r['a'])(
                    Object(r['a'])(
                        Object(r['a'])(
                            {
                                breadcrumbItems: function () {
                                    return [
                                        {
                                            text: this.$t('rooms.title'),
                                            disabled: !0,
                                        },
                                    ]
                                },
                                headers: function () {
                                    return [
                                        {
                                            text: this.$t('id'),
                                            value: 'name',
                                            align: 'start',
                                        },
                                        {
                                            text: this.$t('type'),
                                            value: 'isPrivate',
                                        },
                                        {
                                            text: this.$t('rooms.sockets-count'),
                                            value: 'sockets',
                                        },
                                        {
                                            value: 'actions',
                                            align: 'end',
                                            sortable: !1,
                                        },
                                    ]
                                },
                            },
                            Object(l['b'])('main', ['rooms'])
                        ),
                        Object(l['d'])({
                            selectedNamespace: function (e) {
                                return e.main.selectedNamespace
                            },
                            isReadonly: function (e) {
                                return e.config.readonly
                            },
                            isMultiLeaveSupported: function (e) {
                                return e.config.supportedFeatures.includes('MLEAVE')
                            },
                            isMultiDisconnectSupported: function (e) {
                                return e.config.supportedFeatures.includes('MDISCONNECT')
                            },
                        })
                    ),
                    {},
                    {
                        filteredRooms: function () {
                            var e = this.showPrivateRooms
                                ? this.rooms
                                : this.rooms.filter(function (e) {
                                      return !e.isPrivate
                                  })
                            return Object(jt['a'])(e, 'name')
                        },
                    }
                ),
                methods: {
                    clear: function (e) {
                        Te.socket.emit('leave', this.selectedNamespace.name, e.name)
                    },
                    disconnect: function (e) {
                        Te.socket.emit('_disconnect', this.selectedNamespace.name, !1, e.name)
                    },
                    displayDetails: function (e) {
                        this.$router.push({
                            name: 'room',
                            params: {
                                nsp: this.selectedNamespace.name,
                                name: e.name,
                            },
                        })
                    },
                    onPrivateRoomsUpdate: function (e) {
                        var t = e ? { p: 1 } : {}
                        this.$router.replace({ name: 'rooms', query: t })
                    },
                },
                mounted: function () {
                    this.showPrivateRooms = '1' === this.$route.query.p
                },
            },
            ta = ea,
            na = (n('3a99'), Object(b['a'])(ta, Jn, Gn, !1, null, '29992f63', null)),
            aa = na.exports
        k()(na, {
            VBreadcrumbs: Wt['a'],
            VBtn: I['a'],
            VCard: Ce['a'],
            VCardText: xe['a'],
            VDataTable: dn['a'],
            VIcon: le['a'],
            VSwitch: Z['a'],
            VTooltip: un['a'],
        })
        var sa = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'div',
                    [
                        n('v-breadcrumbs', {
                            attrs: { items: e.breadcrumbItems },
                        }),
                        n(
                            'v-card',
                            [
                                n('v-data-table', {
                                    staticClass: 'row-pointer',
                                    attrs: {
                                        headers: e.headers,
                                        items: e.clients,
                                        'footer-props': e.footerProps,
                                    },
                                    on: { 'click:row': e.displayDetails },
                                    scopedSlots: e._u([
                                        {
                                            key: 'item.address',
                                            fn: function (t) {
                                                var a = t.item
                                                return [a.sockets.length ? n('span', [e._v(e._s(a.sockets[0].handshake.address))]) : e._e()]
                                            },
                                        },
                                        {
                                            key: 'item.transport',
                                            fn: function (t) {
                                                var a = t.item
                                                return [
                                                    a.sockets.length
                                                        ? n('Transport', {
                                                              attrs: {
                                                                  transport: a.sockets[0].transport,
                                                              },
                                                          })
                                                        : e._e(),
                                                ]
                                            },
                                        },
                                        {
                                            key: 'item.sockets',
                                            fn: function (t) {
                                                var n = t.item
                                                return [e._v(' ' + e._s(n.sockets.length) + ' ')]
                                            },
                                        },
                                        {
                                            key: 'item.actions',
                                            fn: function (t) {
                                                var a = t.item
                                                return [
                                                    e.isSocketDisconnectSupported
                                                        ? n(
                                                              'v-tooltip',
                                                              {
                                                                  attrs: {
                                                                      bottom: '',
                                                                  },
                                                                  scopedSlots: e._u(
                                                                      [
                                                                          {
                                                                              key: 'activator',
                                                                              fn: function (t) {
                                                                                  var s = t.on,
                                                                                      o = t.attrs
                                                                                  return [
                                                                                      n(
                                                                                          'v-btn',
                                                                                          e._g(
                                                                                              e._b(
                                                                                                  {
                                                                                                      staticClass: 'ml-3',
                                                                                                      attrs: {
                                                                                                          disabled: e.isReadonly,
                                                                                                          small: '',
                                                                                                      },
                                                                                                      on: {
                                                                                                          click: function (t) {
                                                                                                              return e.disconnect(a)
                                                                                                          },
                                                                                                      },
                                                                                                  },
                                                                                                  'v-btn',
                                                                                                  o,
                                                                                                  !1
                                                                                              ),
                                                                                              s
                                                                                          ),
                                                                                          [n('v-icon', [e._v('mdi-logout')])],
                                                                                          1
                                                                                      ),
                                                                                  ]
                                                                              },
                                                                          },
                                                                      ],
                                                                      null,
                                                                      !0
                                                                  ),
                                                              },
                                                              [n('span', [e._v(e._s(e.$t('clients.disconnect')))])]
                                                          )
                                                        : e._e(),
                                                ]
                                            },
                                        },
                                    ]),
                                }),
                            ],
                            1
                        ),
                    ],
                    1
                )
            },
            oa = [],
            ra = {
                name: 'Clients',
                components: { Transport: Ze },
                data: function () {
                    return {
                        footerProps: {
                            'items-per-page-options': [20, 100, -1],
                        },
                    }
                },
                computed: Object(r['a'])(
                    {
                        breadcrumbItems: function () {
                            return [
                                {
                                    text: this.$t('clients.title'),
                                    disabled: !0,
                                },
                            ]
                        },
                        headers: function () {
                            return [
                                { text: '#', value: 'id', align: 'start' },
                                {
                                    text: this.$t('sockets.address'),
                                    value: 'address',
                                },
                                {
                                    text: this.$t('sockets.transport'),
                                    value: 'transport',
                                },
                                {
                                    text: this.$t('clients.sockets-count'),
                                    value: 'sockets',
                                },
                                {
                                    value: 'actions',
                                    align: 'end',
                                    sortable: !1,
                                },
                            ]
                        },
                    },
                    Object(l['d'])({
                        clients: function (e) {
                            return e.main.clients
                        },
                        isReadonly: function (e) {
                            return e.config.readonly
                        },
                        isSocketDisconnectSupported: function (e) {
                            return e.config.supportedFeatures.includes('DISCONNECT')
                        },
                    })
                ),
                methods: {
                    disconnect: function (e) {
                        var t = e.sockets[0]
                        t && Te.socket.emit('_disconnect', t.nsp, !0, t.id)
                    },
                    displayDetails: function (e) {
                        this.$router.push({
                            name: 'client',
                            params: { id: e.id },
                        })
                    },
                },
            },
            ia = ra,
            ca = (n('ff8e'), Object(b['a'])(ia, sa, oa, !1, null, '57b53591', null)),
            la = ca.exports
        k()(ca, {
            VBreadcrumbs: Wt['a'],
            VBtn: I['a'],
            VCard: Ce['a'],
            VDataTable: dn['a'],
            VIcon: le['a'],
            VTooltip: un['a'],
        })
        var da = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'div',
                    [
                        n('v-breadcrumbs', {
                            attrs: { items: e.breadcrumbItems },
                        }),
                        e.client
                            ? n(
                                  'v-container',
                                  { attrs: { fluid: '' } },
                                  [
                                      n(
                                          'v-row',
                                          [
                                              n(
                                                  'v-col',
                                                  {
                                                      attrs: {
                                                          sm: '12',
                                                          md: '6',
                                                          lg: '4',
                                                      },
                                                  },
                                                  [
                                                      n('ClientDetails', {
                                                          attrs: {
                                                              client: e.client,
                                                              socket: e.socket,
                                                          },
                                                      }),
                                                  ],
                                                  1
                                              ),
                                              n(
                                                  'v-col',
                                                  {
                                                      attrs: {
                                                          sm: '12',
                                                          md: '6',
                                                          lg: '4',
                                                      },
                                                  },
                                                  [
                                                      e.socket
                                                          ? n('InitialRequest', {
                                                                attrs: {
                                                                    socket: e.socket,
                                                                },
                                                            })
                                                          : e._e(),
                                                  ],
                                                  1
                                              ),
                                              n(
                                                  'v-col',
                                                  {
                                                      attrs: {
                                                          sm: '12',
                                                          md: '6',
                                                          lg: '4',
                                                      },
                                                  },
                                                  [
                                                      n('ClientSockets', {
                                                          attrs: {
                                                              sockets: e.client.sockets,
                                                          },
                                                      }),
                                                  ],
                                                  1
                                              ),
                                          ],
                                          1
                                      ),
                                  ],
                                  1
                              )
                            : e._e(),
                    ],
                    1
                )
            },
            ua = [],
            ma = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'v-card',
                    { staticClass: 'fill-height' },
                    [
                        n('v-card-title', [e._v(e._s(e.$t('details')))]),
                        n(
                            'v-simple-table',
                            { attrs: { dense: '' } },
                            [
                                [
                                    n('tbody', [
                                        n('tr', [
                                            n('td', { staticClass: 'key-column' }, [e._v(e._s(e.$t('id')))]),
                                            n('td', [e._v(' ' + e._s(e.client.id) + ' ')]),
                                            n('td'),
                                        ]),
                                        n('tr', [
                                            n('td', { staticClass: 'key-column' }, [e._v(e._s(e.$t('status')))]),
                                            n(
                                                'td',
                                                [
                                                    n('ConnectionStatus', {
                                                        attrs: {
                                                            connected: e.client.connected,
                                                        },
                                                    }),
                                                ],
                                                1
                                            ),
                                            n(
                                                'td',
                                                { attrs: { align: 'right' } },
                                                [
                                                    e.isSocketDisconnectSupported && e.client.connected
                                                        ? n(
                                                              'v-tooltip',
                                                              {
                                                                  attrs: {
                                                                      bottom: '',
                                                                  },
                                                                  scopedSlots: e._u(
                                                                      [
                                                                          {
                                                                              key: 'activator',
                                                                              fn: function (t) {
                                                                                  var a = t.on,
                                                                                      s = t.attrs
                                                                                  return [
                                                                                      n(
                                                                                          'v-btn',
                                                                                          e._g(
                                                                                              e._b(
                                                                                                  {
                                                                                                      attrs: {
                                                                                                          disabled: e.isReadonly,
                                                                                                          small: '',
                                                                                                      },
                                                                                                      on: {
                                                                                                          click: function (t) {
                                                                                                              return e.disconnectClient()
                                                                                                          },
                                                                                                      },
                                                                                                  },
                                                                                                  'v-btn',
                                                                                                  s,
                                                                                                  !1
                                                                                              ),
                                                                                              a
                                                                                          ),
                                                                                          [n('v-icon', [e._v('mdi-logout')])],
                                                                                          1
                                                                                      ),
                                                                                  ]
                                                                              },
                                                                          },
                                                                      ],
                                                                      null,
                                                                      !1,
                                                                      1004975867
                                                                  ),
                                                              },
                                                              [n('span', [e._v(e._s(e.$t('clients.disconnect')))])]
                                                          )
                                                        : e._e(),
                                                ],
                                                1
                                            ),
                                        ]),
                                        n('tr', [
                                            n('td', { staticClass: 'key-column' }, [e._v(e._s(e.$t('sockets.transport')))]),
                                            n(
                                                'td',
                                                [
                                                    n('Transport', {
                                                        attrs: {
                                                            transport: e.socket.transport,
                                                        },
                                                    }),
                                                ],
                                                1
                                            ),
                                            n('td'),
                                        ]),
                                        n('tr', [
                                            n('td', { staticClass: 'key-column' }, [e._v(e._s(e.$t('sockets.address')))]),
                                            n('td', [e._v(e._s(e.socket.handshake.address))]),
                                            n('td'),
                                        ]),
                                    ]),
                                ],
                            ],
                            2
                        ),
                    ],
                    1
                )
            },
            pa = [],
            va = {
                name: 'ClientDetails',
                components: { ConnectionStatus: $, Transport: Ze },
                props: { client: Object, socket: Object },
                computed: Object(r['a'])(
                    {},
                    Object(l['d'])({
                        isReadonly: function (e) {
                            return e.config.readonly
                        },
                        isSocketDisconnectSupported: function (e) {
                            return e.config.supportedFeatures.includes('DISCONNECT')
                        },
                    })
                ),
                methods: {
                    disconnectClient: function () {
                        var e = this.client.sockets[0]
                        e && Te.socket.emit('_disconnect', e.nsp, !0, e.id)
                    },
                },
            },
            fa = va,
            ha = (n('6602'), Object(b['a'])(fa, ma, pa, !1, null, '8d2424e4', null)),
            ba = ha.exports
        k()(ha, {
            VBtn: I['a'],
            VCard: Ce['a'],
            VCardTitle: xe['b'],
            VIcon: le['a'],
            VSimpleTable: dt['a'],
            VTooltip: un['a'],
        })
        var ga = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'v-card',
                    [
                        n('v-card-title', [e._v(e._s(e.$t('sockets.title')))]),
                        n('v-data-table', {
                            staticClass: 'row-pointer',
                            attrs: {
                                headers: e.headers,
                                items: e.sockets,
                                dense: '',
                            },
                            on: { 'click:row': e.displayDetails },
                            scopedSlots: e._u([
                                {
                                    key: 'item.nsp',
                                    fn: function (t) {
                                        var a = t.value
                                        return [n('code', [e._v(e._s(a))])]
                                    },
                                },
                                {
                                    key: 'item.actions',
                                    fn: function (t) {
                                        var a = t.item
                                        return [
                                            e.isSocketDisconnectSupported
                                                ? n(
                                                      'v-tooltip',
                                                      {
                                                          attrs: { bottom: '' },
                                                          scopedSlots: e._u(
                                                              [
                                                                  {
                                                                      key: 'activator',
                                                                      fn: function (t) {
                                                                          var s = t.on,
                                                                              o = t.attrs
                                                                          return [
                                                                              n(
                                                                                  'v-btn',
                                                                                  e._g(
                                                                                      e._b(
                                                                                          {
                                                                                              staticClass: 'ml-3',
                                                                                              attrs: {
                                                                                                  disabled: e.isReadonly,
                                                                                                  small: '',
                                                                                              },
                                                                                              on: {
                                                                                                  click: function (t) {
                                                                                                      return e.disconnect(a)
                                                                                                  },
                                                                                              },
                                                                                          },
                                                                                          'v-btn',
                                                                                          o,
                                                                                          !1
                                                                                      ),
                                                                                      s
                                                                                  ),
                                                                                  [n('v-icon', [e._v('mdi-logout')])],
                                                                                  1
                                                                              ),
                                                                          ]
                                                                      },
                                                                  },
                                                              ],
                                                              null,
                                                              !0
                                                          ),
                                                      },
                                                      [n('span', [e._v(e._s(e.$t('sockets.disconnect')))])]
                                                  )
                                                : e._e(),
                                        ]
                                    },
                                },
                            ]),
                        }),
                    ],
                    1
                )
            },
            ka = [],
            _a = {
                name: 'ClientSockets',
                props: { sockets: Array },
                computed: Object(r['a'])(
                    {
                        headers: function () {
                            return [
                                { text: '#', value: 'id', align: 'start' },
                                { text: this.$t('namespace'), value: 'nsp' },
                                {
                                    value: 'actions',
                                    align: 'end',
                                    sortable: !1,
                                },
                            ]
                        },
                    },
                    Object(l['d'])({
                        isReadonly: function (e) {
                            return e.config.readonly
                        },
                        isSocketDisconnectSupported: function (e) {
                            return e.config.supportedFeatures.includes('DISCONNECT')
                        },
                    })
                ),
                methods: {
                    disconnect: function (e) {
                        Te.socket.emit('_disconnect', e.nsp, !1, e.id)
                    },
                    displayDetails: function (e) {
                        this.$router.push({
                            name: 'socket',
                            params: { nsp: e.nsp, id: e.id },
                        })
                    },
                },
            },
            ya = _a,
            Sa = (n('1993'), Object(b['a'])(ya, ga, ka, !1, null, '38772079', null)),
            Oa = Sa.exports
        k()(Sa, {
            VBtn: I['a'],
            VCard: Ce['a'],
            VCardTitle: xe['b'],
            VDataTable: dn['a'],
            VIcon: le['a'],
            VTooltip: un['a'],
        })
        var Ca = {
                name: 'Client',
                components: {
                    ClientSockets: Oa,
                    InitialRequest: Mn,
                    ClientDetails: ba,
                },
                data: function () {
                    return { socket: null, client: null }
                },
                computed: Object(r['a'])(
                    {
                        breadcrumbItems: function () {
                            return [
                                {
                                    text: this.$t('clients.title'),
                                    to: { name: 'clients' },
                                    exact: !0,
                                },
                                {
                                    text: this.$t('clients.details'),
                                    disabled: !0,
                                },
                            ]
                        },
                    },
                    Object(l['b'])('main', ['findClientById'])
                ),
                mounted: function () {
                    ;(this.client = this.findClientById(this.$route.params.id)), this.client && (this.socket = this.client.sockets[0])
                },
            },
            xa = Ca,
            $a = Object(b['a'])(xa, da, ua, !1, null, '3d554d12', null),
            ja = $a.exports
        k()($a, {
            VBreadcrumbs: Wt['a'],
            VCol: Yt['a'],
            VContainer: Pe['a'],
            VRow: lt['a'],
        })
        var wa = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'div',
                    [
                        n('v-breadcrumbs', {
                            attrs: { items: e.breadcrumbItems },
                        }),
                        n(
                            'v-card',
                            [
                                n('v-data-table', {
                                    attrs: {
                                        headers: e.headers,
                                        items: e.servers,
                                        'footer-props': e.footerProps,
                                    },
                                    scopedSlots: e._u([
                                        {
                                            key: 'item.uptime',
                                            fn: function (t) {
                                                var n = t.value
                                                return [e._v(' ' + e._s(e.formatDuration(n)) + ' ')]
                                            },
                                        },
                                        {
                                            key: 'item.lastPing',
                                            fn: function (t) {
                                                var n = t.value
                                                return [e._v(' ' + e._s(e.delaySinceLastPing(n)) + ' ')]
                                            },
                                        },
                                        {
                                            key: 'item.healthy',
                                            fn: function (e) {
                                                var t = e.value
                                                return [
                                                    n('ServerStatus', {
                                                        attrs: { healthy: t },
                                                    }),
                                                ]
                                            },
                                        },
                                        {
                                            key: 'item.actions',
                                            fn: function (t) {
                                                var a = t.item
                                                return [
                                                    a.healthy
                                                        ? e._e()
                                                        : n(
                                                              'v-btn',
                                                              {
                                                                  attrs: {
                                                                      small: '',
                                                                  },
                                                                  on: {
                                                                      click: function (t) {
                                                                          return e.removeServer(a)
                                                                      },
                                                                  },
                                                              },
                                                              [n('v-icon', [e._v('mdi-delete-outline')])],
                                                              1
                                                          ),
                                                ]
                                            },
                                        },
                                    ]),
                                }),
                            ],
                            1
                        ),
                    ],
                    1
                )
            },
            Va = [],
            Da = {
                name: 'Servers',
                components: { ServerStatus: _t },
                data: function () {
                    return {
                        footerProps: {
                            'items-per-page-options': [20, 100, -1],
                        },
                        now: Date.now(),
                    }
                },
                created: function () {
                    var e = this
                    this.interval = setInterval(function () {
                        e.now = Date.now()
                    }, 1e3)
                },
                beforeDestroy: function () {
                    clearInterval(this.interval)
                },
                computed: Object(r['a'])(
                    {
                        breadcrumbItems: function () {
                            return [
                                {
                                    text: this.$t('servers.title'),
                                    disabled: !0,
                                },
                            ]
                        },
                        headers: function () {
                            return [
                                { text: this.$t('id'), value: 'serverId' },
                                {
                                    text: this.$t('servers.hostname'),
                                    value: 'hostname',
                                },
                                { text: this.$t('servers.pid'), value: 'pid' },
                                {
                                    text: this.$t('servers.uptime'),
                                    value: 'uptime',
                                },
                                {
                                    text: this.$t('servers.clients-count'),
                                    value: 'clientsCount',
                                },
                                {
                                    text: this.$t('servers.last-ping'),
                                    value: 'lastPing',
                                },
                                { text: this.$t('status'), value: 'healthy' },
                                {
                                    value: 'actions',
                                    align: 'end',
                                    sortable: !1,
                                },
                            ]
                        },
                    },
                    Object(l['d'])({
                        servers: function (e) {
                            return Object(jt['a'])(e.servers.servers, 'serverId')
                        },
                    })
                ),
                methods: {
                    formatDuration: nt,
                    delaySinceLastPing: function (e) {
                        var t = this.now - e
                        return ''.concat(nt(t / 1e3), ' ago')
                    },
                    removeServer: function (e) {
                        this.$store.commit('servers/removeServer', e.serverId)
                    },
                },
            },
            Ta = Da,
            Ia = Object(b['a'])(Ta, wa, Va, !1, null, null, null),
            Ea = Ia.exports
        k()(Ia, {
            VBreadcrumbs: Wt['a'],
            VBtn: I['a'],
            VCard: Ce['a'],
            VDataTable: dn['a'],
            VIcon: le['a'],
        })
        var Na = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'div',
                    [
                        n('v-breadcrumbs', {
                            attrs: { items: e.breadcrumbItems },
                        }),
                        e.room
                            ? n(
                                  'v-container',
                                  { attrs: { fluid: '' } },
                                  [
                                      n(
                                          'v-row',
                                          [
                                              n(
                                                  'v-col',
                                                  {
                                                      attrs: {
                                                          sm: '12',
                                                          md: '4',
                                                      },
                                                  },
                                                  [
                                                      n('RoomDetails', {
                                                          attrs: {
                                                              room: e.room,
                                                              nsp: e.$route.params.nsp,
                                                          },
                                                      }),
                                                  ],
                                                  1
                                              ),
                                              n(
                                                  'v-col',
                                                  {
                                                      attrs: {
                                                          sm: '12',
                                                          md: '8',
                                                      },
                                                  },
                                                  [
                                                      n('RoomSockets', {
                                                          attrs: {
                                                              room: e.room,
                                                          },
                                                      }),
                                                  ],
                                                  1
                                              ),
                                          ],
                                          1
                                      ),
                                  ],
                                  1
                              )
                            : e._e(),
                    ],
                    1
                )
            },
            Ra = [],
            Pa = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return e.room
                    ? n(
                          'v-card',
                          [
                              n('v-card-title', [e._v(e._s(e.$t('sockets.title')))]),
                              n('v-data-table', {
                                  staticClass: 'row-pointer',
                                  attrs: {
                                      headers: e.headers,
                                      items: e.room.sockets,
                                      'footer-props': e.footerProps,
                                  },
                                  on: { 'click:row': e.displayDetails },
                                  scopedSlots: e._u(
                                      [
                                          {
                                              key: 'item.transport',
                                              fn: function (e) {
                                                  var t = e.value
                                                  return [
                                                      n('Transport', {
                                                          attrs: {
                                                              transport: t,
                                                          },
                                                      }),
                                                  ]
                                              },
                                          },
                                          {
                                              key: 'item.actions',
                                              fn: function (t) {
                                                  var a = t.item
                                                  return [
                                                      e.isSocketLeaveSupported && !e.room.isPrivate
                                                          ? n(
                                                                'v-tooltip',
                                                                {
                                                                    attrs: {
                                                                        bottom: '',
                                                                    },
                                                                    scopedSlots: e._u(
                                                                        [
                                                                            {
                                                                                key: 'activator',
                                                                                fn: function (t) {
                                                                                    var s = t.on,
                                                                                        o = t.attrs
                                                                                    return [
                                                                                        n(
                                                                                            'v-btn',
                                                                                            e._g(
                                                                                                e._b(
                                                                                                    {
                                                                                                        staticClass: 'ml-3',
                                                                                                        attrs: {
                                                                                                            disabled: e.isReadonly,
                                                                                                            small: '',
                                                                                                        },
                                                                                                        on: {
                                                                                                            click: function (t) {
                                                                                                                return e.leave(a)
                                                                                                            },
                                                                                                        },
                                                                                                    },
                                                                                                    'v-btn',
                                                                                                    o,
                                                                                                    !1
                                                                                                ),
                                                                                                s
                                                                                            ),
                                                                                            [n('v-icon', [e._v('mdi-tag-off-outline')])],
                                                                                            1
                                                                                        ),
                                                                                    ]
                                                                                },
                                                                            },
                                                                        ],
                                                                        null,
                                                                        !0
                                                                    ),
                                                                },
                                                                [n('span', [e._v(e._s(e.$t('rooms.leave')))])]
                                                            )
                                                          : e._e(),
                                                      e.isSocketDisconnectSupported
                                                          ? n(
                                                                'v-tooltip',
                                                                {
                                                                    attrs: {
                                                                        bottom: '',
                                                                    },
                                                                    scopedSlots: e._u(
                                                                        [
                                                                            {
                                                                                key: 'activator',
                                                                                fn: function (t) {
                                                                                    var s = t.on,
                                                                                        o = t.attrs
                                                                                    return [
                                                                                        n(
                                                                                            'v-btn',
                                                                                            e._g(
                                                                                                e._b(
                                                                                                    {
                                                                                                        staticClass: 'ml-3',
                                                                                                        attrs: {
                                                                                                            disabled: e.isReadonly,
                                                                                                            small: '',
                                                                                                        },
                                                                                                        on: {
                                                                                                            click: function (t) {
                                                                                                                return e.disconnect(a)
                                                                                                            },
                                                                                                        },
                                                                                                    },
                                                                                                    'v-btn',
                                                                                                    o,
                                                                                                    !1
                                                                                                ),
                                                                                                s
                                                                                            ),
                                                                                            [n('v-icon', [e._v('mdi-logout')])],
                                                                                            1
                                                                                        ),
                                                                                    ]
                                                                                },
                                                                            },
                                                                        ],
                                                                        null,
                                                                        !0
                                                                    ),
                                                                },
                                                                [n('span', [e._v(e._s(e.$t('sockets.disconnect')))])]
                                                            )
                                                          : e._e(),
                                                  ]
                                              },
                                          },
                                      ],
                                      null,
                                      !1,
                                      1763569022
                                  ),
                              }),
                          ],
                          1
                      )
                    : e._e()
            },
            Ba = [],
            Aa = {
                name: 'RoomSockets',
                components: { Transport: Ze },
                props: { room: Object },
                data: function () {
                    return {
                        footerProps: {
                            'items-per-page-options': [20, 100, -1],
                        },
                    }
                },
                computed: Object(r['a'])(
                    Object(r['a'])(
                        {
                            breadcrumbItems: function () {
                                return [
                                    {
                                        text: this.$t('rooms.title'),
                                        to: { name: 'rooms' },
                                    },
                                    {
                                        text: this.$t('rooms.details'),
                                        disabled: !0,
                                    },
                                ]
                            },
                            headers: function () {
                                return [
                                    {
                                        text: this.$t('id'),
                                        value: 'id',
                                        align: 'start',
                                    },
                                    {
                                        text: this.$t('sockets.address'),
                                        value: 'handshake.address',
                                    },
                                    {
                                        text: this.$t('sockets.transport'),
                                        value: 'transport',
                                    },
                                    {
                                        value: 'actions',
                                        align: 'end',
                                        sortable: !1,
                                    },
                                ]
                            },
                        },
                        Object(l['b'])('main', ['findRoomByName'])
                    ),
                    Object(l['d'])({
                        isReadonly: function (e) {
                            return e.config.readonly
                        },
                        isSocketLeaveSupported: function (e) {
                            return e.config.supportedFeatures.includes('LEAVE')
                        },
                        isSocketDisconnectSupported: function (e) {
                            return e.config.supportedFeatures.includes('DISCONNECT')
                        },
                    })
                ),
                methods: {
                    leave: function (e) {
                        Te.socket.emit('leave', e.nsp, this.room.name, e.id)
                    },
                    disconnect: function (e) {
                        Te.socket.emit('_disconnect', e.nsp, !1, e.id)
                    },
                    displayDetails: function (e) {
                        this.$router.push({
                            name: 'socket',
                            params: { nsp: this.$route.params.nsp, id: e.id },
                        })
                    },
                },
            },
            Ua = Aa,
            La = (n('6e0b'), Object(b['a'])(Ua, Pa, Ba, !1, null, 'c9425064', null)),
            Ma = La.exports
        k()(La, {
            VBtn: I['a'],
            VCard: Ce['a'],
            VCardTitle: xe['b'],
            VDataTable: dn['a'],
            VIcon: le['a'],
            VTooltip: un['a'],
        })
        var Ha = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'v-card',
                    { staticClass: 'fill-height' },
                    [
                        n('v-card-title', [e._v(e._s(e.$t('details')))]),
                        n(
                            'v-simple-table',
                            { attrs: { dense: '' } },
                            [
                                [
                                    n('tbody', [
                                        n('tr', [
                                            n('td', { staticClass: 'key-column' }, [e._v(e._s(e.$t('namespace')))]),
                                            n('td', [n('code', [e._v(e._s(e.nsp))])]),
                                            n('td'),
                                        ]),
                                        n('tr', [
                                            n('td', { staticClass: 'key-column' }, [e._v(e._s(e.$t('id')))]),
                                            n('td', [e._v(' ' + e._s(e.room.name) + ' ')]),
                                            n('td'),
                                        ]),
                                        n('tr', [
                                            n('td', { staticClass: 'key-column' }, [e._v(e._s(e.$t('status')))]),
                                            n(
                                                'td',
                                                [
                                                    n('RoomStatus', {
                                                        attrs: {
                                                            active: e.room.active,
                                                        },
                                                    }),
                                                ],
                                                1
                                            ),
                                            n(
                                                'td',
                                                { attrs: { align: 'right' } },
                                                [
                                                    e.isMultiLeaveSupported && !e.room.isPrivate
                                                        ? n(
                                                              'v-tooltip',
                                                              {
                                                                  attrs: {
                                                                      bottom: '',
                                                                  },
                                                                  scopedSlots: e._u(
                                                                      [
                                                                          {
                                                                              key: 'activator',
                                                                              fn: function (t) {
                                                                                  var a = t.on,
                                                                                      s = t.attrs
                                                                                  return [
                                                                                      n(
                                                                                          'v-btn',
                                                                                          e._g(
                                                                                              e._b(
                                                                                                  {
                                                                                                      staticClass: 'ml-3',
                                                                                                      attrs: {
                                                                                                          disabled: e.isReadonly,
                                                                                                          small: '',
                                                                                                      },
                                                                                                      on: {
                                                                                                          click: function (t) {
                                                                                                              return e.clear()
                                                                                                          },
                                                                                                      },
                                                                                                  },
                                                                                                  'v-btn',
                                                                                                  s,
                                                                                                  !1
                                                                                              ),
                                                                                              a
                                                                                          ),
                                                                                          [n('v-icon', [e._v('mdi-tag-off-outline')])],
                                                                                          1
                                                                                      ),
                                                                                  ]
                                                                              },
                                                                          },
                                                                      ],
                                                                      null,
                                                                      !1,
                                                                      464351539
                                                                  ),
                                                              },
                                                              [n('span', [e._v(e._s(e.$t('rooms.clear')))])]
                                                          )
                                                        : e._e(),
                                                ],
                                                1
                                            ),
                                        ]),
                                        n('tr', [
                                            n('td', { staticClass: 'key-column' }, [e._v(e._s(e.$t('type')))]),
                                            n(
                                                'td',
                                                [
                                                    n('RoomType', {
                                                        attrs: {
                                                            'is-private': e.room.isPrivate,
                                                        },
                                                    }),
                                                ],
                                                1
                                            ),
                                            n('td'),
                                        ]),
                                    ]),
                                ],
                            ],
                            2
                        ),
                    ],
                    1
                )
            },
            qa = [],
            Fa = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n('Status', {
                    attrs: {
                        value: e.active,
                        'ok-label': e.$t('rooms.active'),
                        'ko-label': e.$t('rooms.deleted'),
                    },
                })
            },
            za = [],
            Ja = {
                name: 'RoomStatus',
                components: { Status: S },
                props: { active: Boolean },
            },
            Ga = Ja,
            Ka = Object(b['a'])(Ga, Fa, za, !1, null, null, null),
            Wa = Ka.exports,
            Ya = {
                name: 'RoomDetails',
                components: { RoomType: Xn, RoomStatus: Wa },
                props: { room: Object, nsp: String },
                computed: Object(r['a'])(
                    {},
                    Object(l['d'])({
                        isReadonly: function (e) {
                            return e.config.readonly
                        },
                        isMultiLeaveSupported: function (e) {
                            return e.config.supportedFeatures.includes('MLEAVE')
                        },
                    })
                ),
                methods: {
                    clear: function () {
                        Te.socket.emit('leave', this.nsp, this.room.name)
                    },
                },
            },
            Za = Ya,
            Qa = Object(b['a'])(Za, Ha, qa, !1, null, '7b3793ea', null),
            Xa = Qa.exports
        k()(Qa, {
            VBtn: I['a'],
            VCard: Ce['a'],
            VCardTitle: xe['b'],
            VIcon: le['a'],
            VSimpleTable: dt['a'],
            VTooltip: un['a'],
        })
        var es = {
                name: 'Sockets',
                components: { RoomDetails: Xa, RoomSockets: Ma },
                data: function () {
                    return { room: null }
                },
                computed: Object(r['a'])(
                    {
                        breadcrumbItems: function () {
                            return [
                                {
                                    text: this.$t('rooms.title'),
                                    to: { name: 'rooms' },
                                },
                                {
                                    text: this.$t('rooms.details'),
                                    disabled: !0,
                                },
                            ]
                        },
                    },
                    Object(l['b'])('main', ['findRoomByName'])
                ),
                mounted: function () {
                    this.room = this.findRoomByName(this.$route.params.nsp, this.$route.params.name)
                },
            },
            ts = es,
            ns = Object(b['a'])(ts, Na, Ra, !1, null, null, null),
            as = ns.exports
        k()(ns, {
            VBreadcrumbs: Wt['a'],
            VCol: Yt['a'],
            VContainer: Pe['a'],
            VRow: lt['a'],
        })
        var ss = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n(
                    'div',
                    [
                        n('v-breadcrumbs', {
                            attrs: { items: e.breadcrumbItems },
                        }),
                        n(
                            'v-card',
                            [
                                n('v-card-text', [n('NamespaceSelector')], 1),
                                n('v-data-table', {
                                    attrs: {
                                        headers: e.headers,
                                        items: e.events,
                                        'footer-props': e.footerProps,
                                        'item-key': 'eventId',
                                        'sort-by': ['timestamp', 'eventId'],
                                        'sort-desc': [!0, !0],
                                        'single-expand': '',
                                        'show-expand': '',
                                    },
                                    scopedSlots: e._u([
                                        {
                                            key: 'item.type',
                                            fn: function (e) {
                                                var t = e.value
                                                return [
                                                    n('EventType', {
                                                        attrs: { type: t },
                                                    }),
                                                ]
                                            },
                                        },
                                        {
                                            key: 'item.id',
                                            fn: function (t) {
                                                var a = t.value
                                                return [
                                                    n(
                                                        'router-link',
                                                        {
                                                            staticClass: 'link',
                                                            attrs: {
                                                                to: e.socketDetailsRoute(a),
                                                            },
                                                        },
                                                        [e._v(e._s(a))]
                                                    ),
                                                ]
                                            },
                                        },
                                        {
                                            key: 'item.args',
                                            fn: function (t) {
                                                var a = t.item,
                                                    s = t.value
                                                return [
                                                    e.isExpandable(a)
                                                        ? n('span', [
                                                              e._v(' ' + e._s(e.$t('events.eventName')) + e._s(e.$t('separator'))),
                                                              n('code', [e._v(e._s(a.eventName))]),
                                                          ])
                                                        : 'disconnection' === a.type
                                                          ? n('span', [
                                                                e._v(' ' + e._s(e.$t('events.reason')) + e._s(e.$t('separator'))),
                                                                n('code', [e._v(e._s(s))]),
                                                            ])
                                                          : 'room_joined' === a.type || 'room_left' === a.type
                                                            ? n('span', [
                                                                  e._v(' ' + e._s(e.$t('events.room')) + e._s(e.$t('separator'))),
                                                                  n('code', [e._v(e._s(s))]),
                                                              ])
                                                            : n('span', [e._v(' ' + e._s(s) + ' ')]),
                                                ]
                                            },
                                        },
                                        {
                                            key: 'item.data-table-expand',
                                            fn: function (t) {
                                                var a = t.item,
                                                    s = t.isExpanded,
                                                    o = t.expand
                                                return [
                                                    e.isExpandable(a) && !s
                                                        ? n(
                                                              'v-btn',
                                                              {
                                                                  attrs: {
                                                                      icon: '',
                                                                  },
                                                                  on: {
                                                                      click: function (e) {
                                                                          return o(!0)
                                                                      },
                                                                  },
                                                              },
                                                              [n('v-icon', [e._v('mdi-chevron-down')])],
                                                              1
                                                          )
                                                        : e._e(),
                                                    e.isExpandable(a) && s
                                                        ? n(
                                                              'v-btn',
                                                              {
                                                                  attrs: {
                                                                      icon: '',
                                                                  },
                                                                  on: {
                                                                      click: function (e) {
                                                                          return o(!1)
                                                                      },
                                                                  },
                                                              },
                                                              [n('v-icon', [e._v('mdi-chevron-up')])],
                                                              1
                                                          )
                                                        : e._e(),
                                                ]
                                            },
                                        },
                                        {
                                            key: 'expanded-item',
                                            fn: function (t) {
                                                var a = t.headers,
                                                    s = t.item
                                                return [
                                                    n(
                                                        'td',
                                                        {
                                                            attrs: {
                                                                colspan: a.length,
                                                            },
                                                        },
                                                        [
                                                            n(
                                                                'div',
                                                                {
                                                                    staticClass: 'ma-3',
                                                                },
                                                                [
                                                                    e._v(' ' + e._s(e.$t('events.eventArgs')) + e._s(e.$t('separator')) + ' '),
                                                                    n('pre', [n('code', [e._v(e._s(s.args))])]),
                                                                ]
                                                            ),
                                                        ]
                                                    ),
                                                ]
                                            },
                                        },
                                    ]),
                                }),
                            ],
                            1
                        ),
                    ],
                    1
                )
            },
            os = [],
            rs = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t
                return n('v-chip', { attrs: { color: e.color, outlined: '' } }, [e._v(' ' + e._s(e.$t('events.type.' + e.type)) + ' ')])
            },
            is = [],
            cs = {
                name: 'EventType',
                props: { type: String },
                computed: {
                    color: function () {
                        switch (this.type) {
                            case 'connection':
                                return v['a'].green.base
                            case 'room_joined':
                                return v['a'].teal.base
                            case 'room_left':
                                return v['a'].amber.base
                            case 'disconnection':
                                return v['a'].red.base
                            case 'event_received':
                                return v['a'].blue.base
                            case 'event_sent':
                                return v['a'].orange.base
                        }
                        return v['a'].gray.base
                    },
                },
            },
            ls = cs,
            ds = Object(b['a'])(ls, rs, is, !1, null, null, null),
            us = ds.exports
        k()(ds, { VChip: _['a'] })
        var ms = {
                name: 'Events',
                components: { EventType: us, NamespaceSelector: rn },
                data: function () {
                    return { footerProps: { 'items-per-page-options': [-1] } }
                },
                computed: Object(r['a'])(
                    Object(r['a'])(
                        {
                            breadcrumbItems: function () {
                                return [
                                    {
                                        text: this.$t('events.title'),
                                        disabled: !0,
                                    },
                                ]
                            },
                            headers: function () {
                                return [
                                    {
                                        text: this.$t('timestamp'),
                                        value: 'timestamp',
                                    },
                                    {
                                        text: this.$t('sockets.socket'),
                                        value: 'id',
                                        sortable: !1,
                                    },
                                    {
                                        text: this.$t('type'),
                                        value: 'type',
                                        sortable: !1,
                                    },
                                    { value: 'args', sortable: !1 },
                                    { text: '', value: 'data-table-expand' },
                                ]
                            },
                        },
                        Object(l['b'])('main', ['events'])
                    ),
                    Object(l['d'])({
                        selectedNamespace: function (e) {
                            return e.main.selectedNamespace
                        },
                    })
                ),
                methods: {
                    socketDetailsRoute: function (e) {
                        return {
                            name: 'socket',
                            params: { nsp: this.selectedNamespace.name, id: e },
                        }
                    },
                    isExpandable: function (e) {
                        return ['event_received', 'event_sent'].includes(e.type)
                    },
                },
            },
            ps = ms,
            vs = (n('76e7'), Object(b['a'])(ps, ss, os, !1, null, '2c2337d4', null)),
            fs = vs.exports
        k()(vs, {
            VBreadcrumbs: Wt['a'],
            VBtn: I['a'],
            VCard: Ce['a'],
            VCardText: xe['a'],
            VDataTable: dn['a'],
            VIcon: le['a'],
        }),
            a['a'].use(Le['a'])
        var hs = [
                {
                    path: '/',
                    name: 'dashboard',
                    component: Qt,
                    meta: { topLevel: !0, index: 0 },
                },
                {
                    path: '/sockets/',
                    name: 'sockets',
                    component: pn,
                    meta: { topLevel: !0, index: 1 },
                },
                {
                    path: '/n/:nsp/sockets/:id',
                    name: 'socket',
                    component: zn,
                    meta: { topLevel: !1 },
                },
                {
                    path: '/rooms/',
                    name: 'rooms',
                    component: aa,
                    meta: { topLevel: !0, index: 2 },
                },
                {
                    path: '/n/:nsp/rooms/:name',
                    name: 'room',
                    component: as,
                    meta: { topLevel: !1 },
                },
                {
                    path: '/clients/',
                    name: 'clients',
                    component: la,
                    meta: { topLevel: !0, index: 3 },
                },
                {
                    path: '/clients/:id',
                    name: 'client',
                    component: ja,
                    meta: { topLevel: !1 },
                },
                {
                    path: '/events/',
                    name: 'events',
                    component: fs,
                    meta: { topLevel: !0, index: 4 },
                },
                {
                    path: '/servers/',
                    name: 'servers',
                    component: Ea,
                    meta: { topLevel: !0, index: 5 },
                },
            ],
            bs = new Le['a']({ mode: 'hash', base: '', routes: hs }),
            gs = bs,
            ks = (n('159b'), n('d3b7'), n('ddb0'), n('466d'), n('a925'))
        function _s() {
            var e = n('49f8'),
                t = {}
            return (
                e.keys().forEach(function (n) {
                    var a = n.match(/([A-Za-z0-9-_]+)\./i)
                    if (a && a.length > 1) {
                        var s = a[1]
                        t[s] = e(n)
                    }
                }),
                t
            )
        }
        a['a'].use(ks['a'])
        var ys = new ks['a']({
                locale: 'en',
                fallbackLocale: 'en',
                messages: _s(),
            }),
            Ss = {
                namespaced: !0,
                state: {
                    darkTheme: !1,
                    readonly: !1,
                    lang: 'en',
                    supportedFeatures: [],
                    showNavigationDrawer: !1,
                },
                getters: {
                    developmentMode: function (e) {
                        return e.supportedFeatures.includes('ALL_EVENTS') || !e.supportedFeatures.includes('AGGREGATED_EVENTS')
                    },
                    hasAggregatedValues: function (e) {
                        return e.supportedFeatures.includes('AGGREGATED_EVENTS')
                    },
                },
                mutations: {
                    init: function (e) {
                        tt &&
                            ((e.darkTheme = 'true' === localStorage.getItem('dark_theme')),
                            (e.readonly = 'true' === localStorage.getItem('readonly')),
                            (e.lang = localStorage.getItem('lang') || 'en'))
                    },
                    selectTheme: function (e, t) {
                        ;(e.darkTheme = t), tt && localStorage.setItem('dark_theme', t)
                    },
                    selectLang: function (e, t) {
                        ;(e.lang = t), tt && localStorage.setItem('lang', t)
                    },
                    toggleReadonly: function (e) {
                        ;(e.readonly = !e.readonly), tt && localStorage.setItem('readonly', e.readonly)
                    },
                    updateConfig: function (e, t) {
                        e.supportedFeatures = t.supportedFeatures
                    },
                    toggleNavigationDrawer: function (e) {
                        e.showNavigationDrawer = !e.showNavigationDrawer
                    },
                },
            },
            Os =
                (n('8a79'),
                {
                    namespaced: !0,
                    state: {
                        serverUrl: '',
                        wsOnly: !1,
                        path: '/socket.io',
                        namespace: '/admin',
                        parser: 'default',
                        sessionId: '',
                        connected: !1,
                    },
                    mutations: {
                        init: function (e) {
                            tt &&
                                ((e.serverUrl = localStorage.getItem('server_url') || ''),
                                e.serverUrl.endsWith('/admin')
                                    ? (e.serverUrl = e.serverUrl.slice(0, -6))
                                    : (e.namespace = localStorage.getItem('namespace') || '/admin'),
                                (e.wsOnly = 'true' === localStorage.getItem('ws_only')),
                                (e.sessionId = localStorage.getItem('session_id')),
                                (e.path = localStorage.getItem('path') || '/socket.io'),
                                (e.parser = localStorage.getItem('parser') || 'default'))
                        },
                        saveConfig: function (e, t) {
                            var n = t.serverUrl,
                                a = t.wsOnly,
                                s = t.path,
                                o = t.namespace,
                                r = t.parser
                            ;(e.serverUrl = n),
                                (e.wsOnly = a),
                                (e.path = s),
                                (e.namespace = o),
                                (e.parser = r),
                                tt &&
                                    (localStorage.setItem('server_url', n),
                                    localStorage.setItem('ws_only', a),
                                    localStorage.setItem('path', s),
                                    localStorage.setItem('namespace', o),
                                    localStorage.setItem('parser', r))
                        },
                        saveSessionId: function (e, t) {
                            ;(e.sessionId = t), tt && localStorage.setItem('session_id', t)
                        },
                        connect: function (e) {
                            e.connected = !0
                        },
                        disconnect: function (e) {
                            e.connected = !1
                        },
                    },
                }),
            Cs = n('b85c'),
            xs = n('3835'),
            $s = n('0a94'),
            js = n('a1a3'),
            ws = n('3a59'),
            Vs = 6e5,
            Ds = function (e, t) {
                var n = Object($s['a'])(e, { name: t })
                return n || ((n = { name: t, sockets: [], rooms: [], events: [] }), e.push(n), n)
            },
            Ts = function (e, t) {
                var n = Object($s['a'])(e.rooms, { name: t })
                return n || ((n = { name: t, active: !0, sockets: [] }), e.rooms.push(n), n)
            },
            Is = function (e, t) {
                var n = Object($s['a'])(e, { id: t })
                return n || ((n = { id: t, connected: !0, sockets: [] }), e.push(n), n)
            },
            Es = function (e, t) {
                var n = Ds(e.namespaces, t.nsp)
                ;(t.connected = !0),
                    Object($s['a'])(n.sockets, { id: t.id }) || n.sockets.push(t),
                    t.rooms.forEach(function (e) {
                        var a = Ts(n, e)
                        ;(a.isPrivate = e === t.id), Object($s['a'])(a.sockets, { id: t.id }) || a.sockets.push(t)
                    })
                var a = Is(e.clients, t.clientId)
                Object($s['a'])(a.sockets, { id: t.id }) || a.sockets.push(t)
            },
            Ns = 1e3,
            Rs = 0,
            Ps = function (e, t) {
                ;(t.eventId = ++Rs), e.push(t), e.length > Ns && e.shift()
            }
        function Bs(e) {
            return e - (e % 1e4)
        }
        var As = {
                namespaced: !0,
                state: {
                    namespaces: [],
                    clients: [],
                    selectedNamespace: null,
                    aggregatedEvents: [],
                },
                getters: {
                    findSocketById: function (e) {
                        return function (t, n) {
                            var a = Object($s['a'])(e.namespaces, { name: t })
                            if (a) return Object($s['a'])(a.sockets, { id: n })
                        }
                    },
                    findClientById: function (e) {
                        return function (t) {
                            return Object($s['a'])(e.clients, { id: t })
                        }
                    },
                    findRoomByName: function (e) {
                        return function (t, n) {
                            var a = Object($s['a'])(e.namespaces, { name: t })
                            if (a) return Object($s['a'])(a.rooms, { name: n })
                        }
                    },
                    findRoomsByNamespace: function (e) {
                        return function (t) {
                            var n = Object($s['a'])(e.namespaces, { name: t })
                            return n ? n.rooms : []
                        }
                    },
                    sockets: function (e) {
                        return e.selectedNamespace ? e.selectedNamespace.sockets : []
                    },
                    rooms: function (e) {
                        return e.selectedNamespace ? e.selectedNamespace.rooms : []
                    },
                    events: function (e) {
                        return e.selectedNamespace ? e.selectedNamespace.events : []
                    },
                },
                mutations: {
                    selectNamespace: function (e, t) {
                        e.selectedNamespace = t
                    },
                    onAllSockets: function (e, t) {
                        e.namespaces.forEach(function (e) {
                            e.sockets.splice(0), e.rooms.splice(0)
                        }),
                            e.clients.splice(0),
                            t.forEach(function (t) {
                                return Es(e, t)
                            }),
                            e.selectedNamespace ||
                                (e.selectedNamespace =
                                    Object($s['a'])(e.namespaces, {
                                        name: '/',
                                    }) || e.namespaces[0])
                    },
                    onSocketConnected: function (e, t) {
                        var n = t.timestamp,
                            a = t.socket
                        Es(e, a)
                        var s = Ds(e.namespaces, a.nsp)
                        Ps(s.events, {
                            type: 'connection',
                            timestamp: n,
                            id: a.id,
                        })
                    },
                    onSocketUpdated: function (e, t) {
                        var n = Ds(e.namespaces, t.nsp),
                            a = Object($s['a'])(n.sockets, { id: t.id })
                        a && Object(js['a'])(a, t)
                    },
                    onSocketDisconnected: function (e, t) {
                        var n = t.timestamp,
                            a = t.nsp,
                            s = t.id,
                            o = t.reason,
                            r = Ds(e.namespaces, a),
                            i = at(r.sockets, { id: s }),
                            c = Object(xs['a'])(i, 1),
                            l = c[0]
                        if (l) {
                            l.connected = !1
                            var d = Is(e.clients, l.clientId)
                            at(d.sockets, { id: s }), 0 === d.sockets.length && ((d.connected = !1), at(e.clients, { id: l.clientId }))
                        }
                        Ps(r.events, {
                            type: 'disconnection',
                            timestamp: n,
                            id: s,
                            args: o,
                        })
                    },
                    onRoomJoined: function (e, t) {
                        var n = t.nsp,
                            a = t.room,
                            s = t.id,
                            o = t.timestamp,
                            r = Ds(e.namespaces, n),
                            i = Object($s['a'])(r.sockets, { id: s })
                        if (i) {
                            st(i.rooms, a)
                            var c = Ts(r, a)
                            c.sockets.push(i)
                        }
                        Ps(r.events, {
                            type: 'room_joined',
                            timestamp: o,
                            id: s,
                            args: a,
                        })
                    },
                    onRoomLeft: function (e, t) {
                        var n = t.timestamp,
                            a = t.nsp,
                            s = t.room,
                            o = t.id,
                            r = Ds(e.namespaces, a),
                            i = Object($s['a'])(r.sockets, { id: o })
                        i && at(i.rooms, s)
                        var c = Ts(r, s)
                        at(c.sockets, { id: o }),
                            0 === c.sockets.length && ((c.active = !1), at(r.rooms, { name: s })),
                            Ps(r.events, {
                                type: 'room_left',
                                timestamp: n,
                                id: o,
                                args: s,
                            })
                    },
                    onServerStats: function (e, t) {
                        if (t.aggregatedEvents) {
                            var n,
                                a = Object(Cs['a'])(t.aggregatedEvents)
                            try {
                                for (a.s(); !(n = a.n()).done; ) {
                                    var s = n.value,
                                        o = Bs(s.timestamp),
                                        r = Object($s['a'])(e.aggregatedEvents, {
                                            timestamp: o,
                                            type: s.type,
                                            subType: s.subType,
                                        })
                                    r
                                        ? (r.count += s.count)
                                        : e.aggregatedEvents.push({
                                              timestamp: o,
                                              type: s.type,
                                              subType: s.subType,
                                              count: s.count,
                                          })
                                }
                            } catch (i) {
                                a.e(i)
                            } finally {
                                a.f()
                            }
                            Object(ws['a'])(e.aggregatedEvents, function (e) {
                                return e.timestamp < Date.now() - Vs
                            })
                        }
                    },
                    onEventReceived: function (e, t) {
                        var n = t.timestamp,
                            a = t.nsp,
                            s = t.id,
                            o = t.args,
                            r = Ds(e.namespaces, a),
                            i = o.shift()
                        Ps(r.events, {
                            type: 'event_received',
                            timestamp: n,
                            id: s,
                            eventName: i,
                            args: o,
                        })
                    },
                    onEventSent: function (e, t) {
                        var n = t.timestamp,
                            a = t.nsp,
                            s = t.id,
                            o = t.args,
                            r = Ds(e.namespaces, a),
                            i = o.shift()
                        Ps(r.events, {
                            type: 'event_sent',
                            timestamp: n,
                            id: s,
                            eventName: i,
                            args: o,
                        })
                    },
                },
            },
            Us = 1e4,
            Ls = {
                namespaced: !0,
                state: { servers: [] },
                getters: {
                    namespaces: function (e) {
                        var t,
                            n = {},
                            a = Object(Cs['a'])(e.servers)
                        try {
                            for (a.s(); !(t = a.n()).done; ) {
                                var s = t.value
                                if (s.namespaces) {
                                    var o,
                                        r = Object(Cs['a'])(s.namespaces)
                                    try {
                                        for (r.s(); !(o = r.n()).done; ) {
                                            var i = o.value,
                                                c = i.name,
                                                l = i.socketsCount
                                            n[c] = (n[c] || 0) + l
                                        }
                                    } catch (d) {
                                        r.e(d)
                                    } finally {
                                        r.f()
                                    }
                                }
                            }
                        } catch (d) {
                            a.e(d)
                        } finally {
                            a.f()
                        }
                        return Object.keys(n).map(function (e) {
                            return { name: e, socketsCount: n[e] }
                        })
                    },
                },
                mutations: {
                    onServerStats: function (e, t) {
                        t.lastPing = Date.now()
                        var n = Object($s['a'])(e.servers, {
                            serverId: t.serverId,
                        })
                        n ? Object(js['a'])(n, t) : ((t.healthy = !0), e.servers.push(t))
                    },
                    removeServer: function (e, t) {
                        at(e.servers, { serverId: t })
                    },
                    updateState: function (e) {
                        e.servers.forEach(function (e) {
                            e.healthy = Date.now() - e.lastPing < Us
                        })
                    },
                },
            }
        a['a'].use(l['a'])
        var Ms = new l['a'].Store({
                modules: { config: Ss, connection: Os, main: As, servers: Ls },
            }),
            Hs = n('f309')
        a['a'].use(Hs['a'])
        var qs = new Hs['a']({}),
            Fs = n('dd61')
        n('8e16')
        Fs['e'].register(Fs['f'], Fs['o'], Fs['g'], Fs['a'], Fs['c'], Fs['n'], Fs['i']),
            (a['a'].config.productionTip = !1),
            Ms.commit('config/init'),
            Ms.commit('connection/init'),
            (ys.locale = Ms.state.config.lang),
            setInterval(function () {
                Ms.commit('servers/updateState')
            }, 1e3),
            new a['a']({
                router: gs,
                i18n: ys,
                store: Ms,
                vuetify: qs,
                render: function (e) {
                    return e(Ue)
                },
            }).$mount('#app')
    },
    '56f0': function (e, t, n) {},
    6602: function (e, t, n) {
        'use strict'
        n('c081')
    },
    '6e0b': function (e, t, n) {
        'use strict'
        n('56f0')
    },
    '76e7': function (e, t, n) {
        'use strict'
        n('4519')
    },
    7744: function (e, t, n) {},
    7823: function (e, t, n) {},
    '786c': function (e, t, n) {
        'use strict'
        n('ef29')
    },
    '7e30': function (e, t, n) {},
    '7fc4': function (e, t, n) {},
    8782: function (e) {
        e.exports = JSON.parse(
            '{"separator":": ","id":"আইডি","update":"হালনাগাদ","details":"বর্ণনা","actions":"ক্রিয়াগুলো","select-namespace":"নেমস্পেস নির্বাচন করুন","namespace":"নেমস্পেস","namespaces":"নেমস্পেসগুলো","disconnect":"সংযোগ বিচ্ছিন্ন","name":"নাম","value":"মান","type":"প্রকার","status":"অবস্থা","connected":"সংযুক্ত","disconnected":"সংযোগহীন","connection":{"title":"সংযোগ","serverUrl":"সার্ভার ইউআরএল","username":"ব্যবহারকারীর নাম","password":"গুপ্তমন্ত্র","connect":"সংযোগ করুন","invalid-credentials":"অবৈধ প্রশংসাপত্র","error":"ত্রুটি","websocket-only":"কেবল ওয়েবসকেট?","path":"পথ"},"dashboard":{"title":"ড্যাশবোর্ড"},"sockets":{"title":"সকেটগুলো","details":"সকেটের বিশদ","address":"আইপি ঠিকানা","transport":"পরিবহন","disconnect":"এই সকেট দৃষ্টান্তের সংযোগ বিচ্ছিন্ন করুন","displayDetails":"এই সকেট দৃষ্টান্তের বিস্তারিত প্রদর্শন করুন","client":"ক্লায়েন্ট","socket":"সকেট","creation-date":"তৈরির তারিখ","leave":"এই ঘর ছেড়ে দিন","join":"যোগদান","join-a-room":"একটি ঘরে যোগদান করুন","initial-request":"প্রাথমিক এইচটিটিপি অনুরোধ","headers":"হেডারগুলো","query-params":"অনুসন্ধানের প্যারামিটার"},"rooms":{"title":"রুমগুলো","details":"ঘরের বিস্তারিত","active":"সক্রিয়","deleted":"মোছা হয়েছে","public":"পাবলিক","private":"ব্যক্তিগত","show-private":"ব্যক্তিগত কক্ষগুলি দেখান?","sockets-count":"# সকেটের সংখ্যা","clear":"এই ঘর থেকে সমস্ত সকেট দৃষ্টান্ত গুলো সরান","leave":"এই ঘর থেকে এই সকেট দৃষ্টান্তটি সরান","disconnect":"এই ঘরে থাকা সমস্ত সকেট দৃষ্টান্তের সংযোগ বিচ্ছিন্ন করুন","displayDetails":"এই ঘরের বিস্তারিত প্রদর্শন করুন"},"clients":{"title":"ক্লায়েন্ট","details":"ক্লায়েন্টের খুঁটিনাটি","sockets-count":"# সকেটের সংখ্যা","disconnect":"এই ক্লায়েন্টের সংযোগ বিচ্ছিন্ন করুন (এবং সমস্ত সংযুক্তকৃত সকেট দৃষ্টান্ত গুলি)","displayDetails":"এই ক্লায়েন্টের বিস্তারিত প্রদর্শন করুন"},"servers":{"title":"সার্ভারগুলো","hostname":"হোস্টনেম","pid":"পিআইডি","uptime":"আপটাইম","clients-count":"# ক্লায়েন্টের সংখ্যা","last-ping":"শেষ পিং","healthy":"সুস্থ","unhealthy":"অসুস্থ"},"config":{"language":"ভাষা","readonly":"শুধুমাত্র পাঠযোগ্য?","dark-theme":"অন্ধকার থিম?"}}'
        )
    },
    a86e: function (e, t, n) {
        'use strict'
        n('7744')
    },
    c081: function (e, t, n) {},
    d026: function (e, t, n) {},
    dd11: function (e) {
        e.exports = JSON.parse(
            '{"separator":": ","id":"ID","update":"업데이트","details":"상세정보","actions":"액션","select-namespace":"네임 스페이스 선택","namespace":"네임 스페이스","namespaces":"네임 스페이스","disconnect":"연결 끊기","name":"이름","value":"값","type":"타입","status":"상태","connected":"연결됨","disconnected":"연결되지 않음","data":"데이터","timestamp":"타임스탬프","args":"전달 인자 (Arguments)","connection":{"title":"접속","serverUrl":"서버 URL","username":"유저 이름 (Username)","password":"비밀번호 (Password)","connect":"접속하기","invalid-credentials":"올바르지 않은 인증","error":"에러","websocket-only":"웹소켓 전용?","path":"경로","parser":"파서 (Parser)","default-parser":"Built-in parser","msgpack-parser":"MessagePack parser","namespace":"관리자 네임 스페이스","advanced-options":"고급 옵션"},"dashboard":{"title":"대시보드","connectionsHistogram":{"title":"Connection 및 Disconnection 이벤트"},"bytesHistogram":{"title":"수신 및 전송된 바이트","bytesIn":"수신된 바이트","bytesOut":"전송된 바이트"}},"sockets":{"title":"소켓","details":"소켓 상세정보","address":"IP 주소","transport":"통신 방식 (Transport)","disconnect":"소켓 인스턴스 연결 끊기","displayDetails":"소켓 인스턴스 상세정보","client":"클라이언트","socket":"소켓","creation-date":"생성일","leave":"룸 떠나기","join":"참여","join-a-room":"룸에 참여","initial-request":"초기 HTTP 요청","headers":"헤더","query-params":"쿼리 파라미터"},"rooms":{"title":"룸","details":"룸 상세정보","active":"활성화","deleted":"삭제됨","public":"Public","private":"Private","show-private":"프라이빗(Private) 룸 보기?","sockets-count":"소켓 수","clear":"룸에서 모든 소켓 인스턴스 제거","leave":"룸에서 소켓 인스턴스 제거","disconnect":"룸의 모든 소켓 인스턴스 연결 끊기","displayDetails":"룸 상세정보"},"clients":{"title":"클라이언트","details":"클라언트 상세정보","sockets-count":"소켓 수","disconnect":"클라이언트 연결 끊기 (연결된 모든 소켓 인스턴스 끊기)","displayDetails":"클라이언트 상세정보"},"servers":{"title":"서버","hostname":"호스트이름","pid":"PID","uptime":"가동 시간","clients-count":"클라이언트 수","last-ping":"마지막 ping","healthy":"Healthy","unhealthy":"Unhealthy"},"config":{"language":"언어","readonly":"읽기 전용?","dark-theme":"다크 테마?"},"events":{"title":"이벤트","type":{"connection":"연결 (Connection)","disconnection":"연결 해제 (Disconnection)","room_joined":"참여중인 룸(Room joined)","room_left":"나간 룸(Room left)","event_received":"수신한 이벤트","event_sent":"전송한 이벤트"},"eventName":"이벤트 이름","eventArgs":"이벤트 전달 인자 (Event Arguments)","reason":"원인 (Reason)","room":"룸"}}'
        )
    },
    ea65: function (e, t, n) {
        e.exports = n.p + 'img/logo-light.73342c25.svg'
    },
    eb02: function (e, t, n) {
        'use strict'
        n('7fc4')
    },
    edd4: function (e) {
        e.exports = JSON.parse(
            '{"separator":": ","id":"ID","update":"Update","details":"Details","actions":"Actions","select-namespace":"Select namespace","namespace":"Namespace","namespaces":"Namespaces","disconnect":"Disconnect","name":"Name","value":"Value","type":"Type","status":"Status","connected":"connected","disconnected":"disconnected","data":"Data","timestamp":"Timestamp","args":"Arguments","connection":{"title":"Connection","serverUrl":"Server URL","username":"Username","password":"Password","connect":"Connect","invalid-credentials":"Invalid credentials","error":"Error","websocket-only":"WebSocket only?","path":"Path","parser":"Parser","default-parser":"Built-in parser","msgpack-parser":"MessagePack parser","namespace":"Admin namespace","advanced-options":"Advanced options"},"dashboard":{"title":"Dashboard","connectionsHistogram":{"title":"Connection and disconnection events"},"bytesHistogram":{"title":"Bytes received and sent","bytesIn":"Bytes received","bytesOut":"Bytes sent"}},"sockets":{"title":"Sockets","details":"Socket details","address":"IP address","transport":"Transport","disconnect":"Disconnect this Socket instance","displayDetails":"Display the details of this Socket instance","client":"Client","socket":"Socket","creation-date":"Creation date","leave":"Leave this room","join":"Join","join-a-room":"Join a room","initial-request":"Initial HTTP request","headers":"Headers","query-params":"Query parameters"},"rooms":{"title":"Rooms","details":"Room details","active":"Active","deleted":"Deleted","public":"Public","private":"Private","show-private":"Show private rooms?","sockets-count":"# of sockets","clear":"Remove all the Socket instances from this room","leave":"Remove the Socket instance from this room","disconnect":"Disconnect all the Socket instances that are in this room","displayDetails":"Display the details of this room"},"clients":{"title":"Clients","details":"Client details","sockets-count":"# of sockets","disconnect":"Disconnect this client (and all attached Socket instances)","displayDetails":"Display the details of this client"},"servers":{"title":"Servers","hostname":"Hostname","pid":"PID","uptime":"Uptime","clients-count":"# of clients","last-ping":"Last ping","healthy":"Healthy","unhealthy":"Unhealthy"},"config":{"language":"Language","readonly":"Read-only?","dark-theme":"Dark theme?"},"events":{"title":"Events","type":{"connection":"Connection","disconnection":"Disconnection","room_joined":"Room joined","room_left":"Room left","event_received":"Event received","event_sent":"Event sent"},"eventName":"Event name","eventArgs":"Event arguments","reason":"Reason","room":"Room"}}'
        )
    },
    ef29: function (e, t, n) {},
    f693: function (e) {
        e.exports = JSON.parse(
            '{"separator":" : ","id":"ID","update":"Mettre à jour","details":"Détails","actions":"Actions","select-namespace":"Sélection de l\'espace de noms","namespace":"Espace de noms","namespaces":"Espaces de noms","disconnect":"Déconnexion","name":"Nom","value":"Valeur","type":"Type","status":"Statut","connected":"connecté","disconnected":"déconnecté","data":"Données","timestamp":"Horodatage","args":"Arguments","connection":{"title":"Connexion","serverUrl":"URL du serveur","username":"Nom d\'utilisateur","password":"Mot de passe","connect":"Se connecter","invalid-credentials":"Identifiants invalides","error":"Erreur","websocket-only":"WebSocket uniquement ?","path":"Chemin HTTP","parser":"Encodeur","default-parser":"Encodeur par défaut","msgpack-parser":"Encodeur basé sur MessagePack","namespace":"Espace de nom d\'administration","advanced-options":"Options avancées"},"dashboard":{"title":"Accueil","connectionsHistogram":{"title":"Évènements de connexion et de déconnexion"},"bytesHistogram":{"title":"Octets reçus et envoyés","bytesIn":"Octets reçus","bytesOut":"Octets envoyés"}},"sockets":{"title":"Connexions","details":"Détails de la connexion","address":"Adresse IP","transport":"Transport","disconnect":"Termine cette connexion","displayDetails":"Voir les détails de cette connexion","client":"Client","socket":"Connexion","creation-date":"Date de création","leave":"Quitter cette salle","join":"Rejoindre","join-a-room":"Rejoindre une salle","initial-request":"Requête HTTP initiale","headers":"Entêtes HTTP","query-params":"Paramètres de requête"},"rooms":{"title":"Salles","details":"Détails de la salle","active":"Active","deleted":"Supprimée","public":"Publique","private":"Privée","show-private":"Afficher les salles privées ?","sockets-count":"# de connexions","clear":"Vider cette salle","leave":"Sortir cette connexion de la salle","disconnect":"Sortir toutes les connexions de cette salle","displayDetails":"Voir les détails de cette salle"},"clients":{"title":"Clients","details":"Détails du client","sockets-count":"# de connexions","disconnect":"Déconnecte ce client (et toutes les connexions liées)","displayDetails":"Voir les détails de ce client"},"servers":{"title":"Serveurs","hostname":"Nom d\'hôte","pid":"PID","uptime":"Uptime","clients-count":"# de clients","last-ping":"Dernier ping","healthy":"Actif","unhealthy":"Inactif"},"config":{"language":"Langue","readonly":"Lecture seule ?","dark-theme":"Mode sombre ?"},"events":{"title":"Évènements","type":{"connection":"Connexion","disconnection":"Déconnexion","room_joined":"Salle rejointe","room_left":"Salle quittée","event_received":"Évènement reçu","event_sent":"Évènement envoyé"},"eventName":"Nom de l\'évènement","eventArgs":"Argument de l\'évènement","reason":"Raison","room":"Salle"}}'
        )
    },
    f712: function (e, t, n) {
        'use strict'
        n('7823')
    },
    ff8e: function (e, t, n) {
        'use strict'
        n('0981')
    },
    ffeb: function (e) {
        e.exports = JSON.parse(
            '{"separator":": ","id":"ID","update":"Güncelle","details":"Detaylar","actions":"Hareketler","select-namespace":"Namespace seç","namespace":"Namespace","namespaces":"Namespaceler","disconnect":"Bağlantıyı Kes","name":"Ad","value":"Değer","type":"Tip","status":"Durum","connected":"bağlandı","disconnected":"bağlantı kesildi","data":"Ver,","timestamp":"Zaman dilimi","args":"Argümanlar","connection":{"title":"Bağlantı","serverUrl":"Server URL","username":"Kullanıcı Adı","password":"Şifre","connect":"Bağlan","invalid-credentials":"Geçersiz kimlik bilgileri","error":"Hata","websocket-only":"Yalnızca WebSocket?","path":"Yol","parser":"Derleyici","default-parser":"Yerleşik Derleyici","msgpack-parser":"MessagePack Derleyici","namespace":"Admin namespace","advanced-options":"Gelişmiş Seçenekler"},"dashboard":{"title":"Gösterge Panneli","connectionsHistogram":{"title":"Bağlantı ve bağlantı kesilmesi olayları"},"bytesHistogram":{"title":"Alınan ve gönderilen baytlar","bytesIn":"Alınan baytlar","bytesOut":"gönderilen baytlar"}},"sockets":{"title":"Socketler","details":"Socket detayları","address":"IP adresi","transport":"Ulaşım","disconnect":"Bu Socket\'in bağlantısını kesin","displayDetails":"Bu Socket\'in ayrıntılarını görüntüle","client":"Alıcı","socket":"Socket","creation-date":"Oluşturma tarihi","leave":"Bu odadan ayrıl","join":"Katıl","join-a-room":"Odaya katıl","initial-request":"İlk HTTP isteği","headers":"Header\'lar","query-params":"Query parametreleri"},"rooms":{"title":"Oda","details":"Oda detayları","active":"Aktif","deleted":"Silinmiş","public":"Herkese açık","private":"Gizli","show-private":"Gizli odaları göstermek ister misin","sockets-count":"# socketlerin","clear":"Bu odadaki tüm Socketleri kaldırın","leave":"Socketi bu odadan kaldır","disconnect":"Bu odadaki Socketlerin bağlantısını kesin","displayDetails":"Bu odanın ayrıntılarını göster"},"clients":{"title":"Alıcı","details":"Alıcı detayları","sockets-count":"# socketlerin","disconnect":"Bu istemcinin (ve tüm bağlı Socketlerin) bağlantısını kesin","displayDetails":"Bu istemcinin ayrıntılarını göster"},"servers":{"title":"Servers","hostname":"Host Adı","pid":"PID","uptime":"Çalışma Süresi","clients-count":"# alıcılar","last-ping":"Son ping","healthy":"Sağlıklı","unhealthy":"Sağlıksız"},"config":{"language":"Dil","readonly":"Sadece okuma modu","dark-theme":"Koyu Tema"},"events":{"title":"Etkinlikler","type":{"connection":"Bağlandı","disconnection":"Bağlantıyı Kesildi","room_joined":"Oda katıldı","room_left":"Oda Ayrıldı","event_received":"Olay alındı","event_sent":"Olay gönderildi"},"eventName":"Etkinlik Adı","eventArgs":"Etkinlik argümanları","reason":"Neden","room":"Oda"}}'
        )
    },
})
//# sourceMappingURL=app.0d7d7845.js.map
