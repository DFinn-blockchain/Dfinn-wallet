/*! For license information please see page.js.LICENSE.txt */
(() => {
  var t = {
      795: (t, e, r) => {
        'use strict';
        const n = r(699);
        function i(t, e, r) {
          try {
            Reflect.apply(t, e, r);
          } catch (t) {
            setTimeout(() => {
              throw t;
            });
          }
        }
        class o extends n.EventEmitter {
          emit(t, ...e) {
            let r = 'error' === t;
            const n = this._events;
            if (void 0 !== n) r = r && void 0 === n.error;
            else if (!r) return !1;
            if (r) {
              let t;
              if ((e.length > 0 && ([t] = e), t instanceof Error)) throw t;
              const r = new Error('Unhandled error.' + (t ? ` (${t.message})` : ''));
              throw ((r.context = t), r);
            }
            const o = n[t];
            if (void 0 === o) return !1;
            if ('function' == typeof o) i(o, this, e);
            else {
              const t = o.length,
                r = (function (t) {
                  const e = t.length,
                    r = new Array(e);
                  for (let n = 0; n < e; n += 1) r[n] = t[n];
                  return r;
                })(o);
              for (let n = 0; n < t; n += 1) i(r[n], this, e);
            }
            return !0;
          }
        }
        e.Z = o;
      },
      766: (t, e) => {
        'use strict';
        (e.byteLength = function (t) {
          var e = u(t),
            r = e[0],
            n = e[1];
          return (3 * (r + n)) / 4 - n;
        }),
          (e.toByteArray = function (t) {
            var e,
              r,
              o = u(t),
              s = o[0],
              h = o[1],
              a = new i(
                (function (t, e, r) {
                  return (3 * (e + r)) / 4 - r;
                })(0, s, h),
              ),
              f = 0,
              l = h > 0 ? s - 4 : s;
            for (r = 0; r < l; r += 4)
              (e =
                (n[t.charCodeAt(r)] << 18) |
                (n[t.charCodeAt(r + 1)] << 12) |
                (n[t.charCodeAt(r + 2)] << 6) |
                n[t.charCodeAt(r + 3)]),
                (a[f++] = (e >> 16) & 255),
                (a[f++] = (e >> 8) & 255),
                (a[f++] = 255 & e);
            return (
              2 === h && ((e = (n[t.charCodeAt(r)] << 2) | (n[t.charCodeAt(r + 1)] >> 4)), (a[f++] = 255 & e)),
              1 === h &&
                ((e = (n[t.charCodeAt(r)] << 10) | (n[t.charCodeAt(r + 1)] << 4) | (n[t.charCodeAt(r + 2)] >> 2)),
                (a[f++] = (e >> 8) & 255),
                (a[f++] = 255 & e)),
              a
            );
          }),
          (e.fromByteArray = function (t) {
            for (var e, n = t.length, i = n % 3, o = [], s = 16383, h = 0, u = n - i; h < u; h += s)
              o.push(a(t, h, h + s > u ? u : h + s));
            return (
              1 === i
                ? ((e = t[n - 1]), o.push(r[e >> 2] + r[(e << 4) & 63] + '=='))
                : 2 === i &&
                  ((e = (t[n - 2] << 8) + t[n - 1]), o.push(r[e >> 10] + r[(e >> 4) & 63] + r[(e << 2) & 63] + '=')),
              o.join('')
            );
          });
        for (
          var r = [],
            n = [],
            i = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
            o = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
            s = 0,
            h = o.length;
          s < h;
          ++s
        )
          (r[s] = o[s]), (n[o.charCodeAt(s)] = s);
        function u(t) {
          var e = t.length;
          if (e % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4');
          var r = t.indexOf('=');
          return -1 === r && (r = e), [r, r === e ? 0 : 4 - (r % 4)];
        }
        function a(t, e, n) {
          for (var i, o, s = [], h = e; h < n; h += 3)
            (i = ((t[h] << 16) & 16711680) + ((t[h + 1] << 8) & 65280) + (255 & t[h + 2])),
              s.push(r[((o = i) >> 18) & 63] + r[(o >> 12) & 63] + r[(o >> 6) & 63] + r[63 & o]);
          return s.join('');
        }
        (n['-'.charCodeAt(0)] = 62), (n['_'.charCodeAt(0)] = 63);
      },
      197: function (t, e, r) {
        !(function (t, e) {
          'use strict';
          function n(t, e) {
            if (!t) throw new Error(e || 'Assertion failed');
          }
          function i(t, e) {
            t.super_ = e;
            var r = function () {};
            (r.prototype = e.prototype), (t.prototype = new r()), (t.prototype.constructor = t);
          }
          function o(t, e, r) {
            if (o.isBN(t)) return t;
            (this.negative = 0),
              (this.words = null),
              (this.length = 0),
              (this.red = null),
              null !== t && (('le' !== e && 'be' !== e) || ((r = e), (e = 10)), this._init(t || 0, e || 10, r || 'be'));
          }
          var s;
          'object' == typeof t ? (t.exports = o) : (e.BN = o), (o.BN = o), (o.wordSize = 26);
          try {
            s = 'undefined' != typeof window && void 0 !== window.Buffer ? window.Buffer : r(196).Buffer;
          } catch (t) {}
          function h(t, e) {
            var r = t.charCodeAt(e);
            return r >= 48 && r <= 57
              ? r - 48
              : r >= 65 && r <= 70
              ? r - 55
              : r >= 97 && r <= 102
              ? r - 87
              : void n(!1, 'Invalid character in ' + t);
          }
          function u(t, e, r) {
            var n = h(t, r);
            return r - 1 >= e && (n |= h(t, r - 1) << 4), n;
          }
          function a(t, e, r, i) {
            for (var o = 0, s = 0, h = Math.min(t.length, r), u = e; u < h; u++) {
              var a = t.charCodeAt(u) - 48;
              (o *= i),
                (s = a >= 49 ? a - 49 + 10 : a >= 17 ? a - 17 + 10 : a),
                n(a >= 0 && s < i, 'Invalid character'),
                (o += s);
            }
            return o;
          }
          function f(t, e) {
            (t.words = e.words), (t.length = e.length), (t.negative = e.negative), (t.red = e.red);
          }
          if (
            ((o.isBN = function (t) {
              return (
                t instanceof o ||
                (null !== t && 'object' == typeof t && t.constructor.wordSize === o.wordSize && Array.isArray(t.words))
              );
            }),
            (o.max = function (t, e) {
              return t.cmp(e) > 0 ? t : e;
            }),
            (o.min = function (t, e) {
              return t.cmp(e) < 0 ? t : e;
            }),
            (o.prototype._init = function (t, e, r) {
              if ('number' == typeof t) return this._initNumber(t, e, r);
              if ('object' == typeof t) return this._initArray(t, e, r);
              'hex' === e && (e = 16), n(e === (0 | e) && e >= 2 && e <= 36);
              var i = 0;
              '-' === (t = t.toString().replace(/\s+/g, ''))[0] && (i++, (this.negative = 1)),
                i < t.length &&
                  (16 === e
                    ? this._parseHex(t, i, r)
                    : (this._parseBase(t, e, i), 'le' === r && this._initArray(this.toArray(), e, r)));
            }),
            (o.prototype._initNumber = function (t, e, r) {
              t < 0 && ((this.negative = 1), (t = -t)),
                t < 67108864
                  ? ((this.words = [67108863 & t]), (this.length = 1))
                  : t < 4503599627370496
                  ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]), (this.length = 2))
                  : (n(t < 9007199254740992),
                    (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                    (this.length = 3)),
                'le' === r && this._initArray(this.toArray(), e, r);
            }),
            (o.prototype._initArray = function (t, e, r) {
              if ((n('number' == typeof t.length), t.length <= 0)) return (this.words = [0]), (this.length = 1), this;
              (this.length = Math.ceil(t.length / 3)), (this.words = new Array(this.length));
              for (var i = 0; i < this.length; i++) this.words[i] = 0;
              var o,
                s,
                h = 0;
              if ('be' === r)
                for (i = t.length - 1, o = 0; i >= 0; i -= 3)
                  (s = t[i] | (t[i - 1] << 8) | (t[i - 2] << 16)),
                    (this.words[o] |= (s << h) & 67108863),
                    (this.words[o + 1] = (s >>> (26 - h)) & 67108863),
                    (h += 24) >= 26 && ((h -= 26), o++);
              else if ('le' === r)
                for (i = 0, o = 0; i < t.length; i += 3)
                  (s = t[i] | (t[i + 1] << 8) | (t[i + 2] << 16)),
                    (this.words[o] |= (s << h) & 67108863),
                    (this.words[o + 1] = (s >>> (26 - h)) & 67108863),
                    (h += 24) >= 26 && ((h -= 26), o++);
              return this._strip();
            }),
            (o.prototype._parseHex = function (t, e, r) {
              (this.length = Math.ceil((t.length - e) / 6)), (this.words = new Array(this.length));
              for (var n = 0; n < this.length; n++) this.words[n] = 0;
              var i,
                o = 0,
                s = 0;
              if ('be' === r)
                for (n = t.length - 1; n >= e; n -= 2)
                  (i = u(t, e, n) << o),
                    (this.words[s] |= 67108863 & i),
                    o >= 18 ? ((o -= 18), (s += 1), (this.words[s] |= i >>> 26)) : (o += 8);
              else
                for (n = (t.length - e) % 2 == 0 ? e + 1 : e; n < t.length; n += 2)
                  (i = u(t, e, n) << o),
                    (this.words[s] |= 67108863 & i),
                    o >= 18 ? ((o -= 18), (s += 1), (this.words[s] |= i >>> 26)) : (o += 8);
              this._strip();
            }),
            (o.prototype._parseBase = function (t, e, r) {
              (this.words = [0]), (this.length = 1);
              for (var n = 0, i = 1; i <= 67108863; i *= e) n++;
              n--, (i = (i / e) | 0);
              for (var o = t.length - r, s = o % n, h = Math.min(o, o - s) + r, u = 0, f = r; f < h; f += n)
                (u = a(t, f, f + n, e)),
                  this.imuln(i),
                  this.words[0] + u < 67108864 ? (this.words[0] += u) : this._iaddn(u);
              if (0 !== s) {
                var l = 1;
                for (u = a(t, f, t.length, e), f = 0; f < s; f++) l *= e;
                this.imuln(l), this.words[0] + u < 67108864 ? (this.words[0] += u) : this._iaddn(u);
              }
              this._strip();
            }),
            (o.prototype.copy = function (t) {
              t.words = new Array(this.length);
              for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
              (t.length = this.length), (t.negative = this.negative), (t.red = this.red);
            }),
            (o.prototype._move = function (t) {
              f(t, this);
            }),
            (o.prototype.clone = function () {
              var t = new o(null);
              return this.copy(t), t;
            }),
            (o.prototype._expand = function (t) {
              for (; this.length < t; ) this.words[this.length++] = 0;
              return this;
            }),
            (o.prototype._strip = function () {
              for (; this.length > 1 && 0 === this.words[this.length - 1]; ) this.length--;
              return this._normSign();
            }),
            (o.prototype._normSign = function () {
              return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this;
            }),
            'undefined' != typeof Symbol && 'function' == typeof Symbol.for)
          )
            try {
              o.prototype[Symbol.for('nodejs.util.inspect.custom')] = l;
            } catch (t) {
              o.prototype.inspect = l;
            }
          else o.prototype.inspect = l;
          function l() {
            return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
          }
          var c = [
              '',
              '0',
              '00',
              '000',
              '0000',
              '00000',
              '000000',
              '0000000',
              '00000000',
              '000000000',
              '0000000000',
              '00000000000',
              '000000000000',
              '0000000000000',
              '00000000000000',
              '000000000000000',
              '0000000000000000',
              '00000000000000000',
              '000000000000000000',
              '0000000000000000000',
              '00000000000000000000',
              '000000000000000000000',
              '0000000000000000000000',
              '00000000000000000000000',
              '000000000000000000000000',
              '0000000000000000000000000',
            ],
            p = [
              0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
              5, 5, 5,
            ],
            d = [
              0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171,
              35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632,
              6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393,
              45435424, 52521875, 60466176,
            ];
          function m(t, e, r) {
            r.negative = e.negative ^ t.negative;
            var n = (t.length + e.length) | 0;
            (r.length = n), (n = (n - 1) | 0);
            var i = 0 | t.words[0],
              o = 0 | e.words[0],
              s = i * o,
              h = 67108863 & s,
              u = (s / 67108864) | 0;
            r.words[0] = h;
            for (var a = 1; a < n; a++) {
              for (
                var f = u >>> 26, l = 67108863 & u, c = Math.min(a, e.length - 1), p = Math.max(0, a - t.length + 1);
                p <= c;
                p++
              ) {
                var d = (a - p) | 0;
                (f += ((s = (i = 0 | t.words[d]) * (o = 0 | e.words[p]) + l) / 67108864) | 0), (l = 67108863 & s);
              }
              (r.words[a] = 0 | l), (u = 0 | f);
            }
            return 0 !== u ? (r.words[a] = 0 | u) : r.length--, r._strip();
          }
          (o.prototype.toString = function (t, e) {
            var r;
            if (((e = 0 | e || 1), 16 === (t = t || 10) || 'hex' === t)) {
              r = '';
              for (var i = 0, o = 0, s = 0; s < this.length; s++) {
                var h = this.words[s],
                  u = (16777215 & ((h << i) | o)).toString(16);
                (o = (h >>> (24 - i)) & 16777215),
                  (i += 2) >= 26 && ((i -= 26), s--),
                  (r = 0 !== o || s !== this.length - 1 ? c[6 - u.length] + u + r : u + r);
              }
              for (0 !== o && (r = o.toString(16) + r); r.length % e != 0; ) r = '0' + r;
              return 0 !== this.negative && (r = '-' + r), r;
            }
            if (t === (0 | t) && t >= 2 && t <= 36) {
              var a = p[t],
                f = d[t];
              r = '';
              var l = this.clone();
              for (l.negative = 0; !l.isZero(); ) {
                var m = l.modrn(f).toString(t);
                r = (l = l.idivn(f)).isZero() ? m + r : c[a - m.length] + m + r;
              }
              for (this.isZero() && (r = '0' + r); r.length % e != 0; ) r = '0' + r;
              return 0 !== this.negative && (r = '-' + r), r;
            }
            n(!1, 'Base should be between 2 and 36');
          }),
            (o.prototype.toNumber = function () {
              var t = this.words[0];
              return (
                2 === this.length
                  ? (t += 67108864 * this.words[1])
                  : 3 === this.length && 1 === this.words[2]
                  ? (t += 4503599627370496 + 67108864 * this.words[1])
                  : this.length > 2 && n(!1, 'Number can only safely store up to 53 bits'),
                0 !== this.negative ? -t : t
              );
            }),
            (o.prototype.toJSON = function () {
              return this.toString(16, 2);
            }),
            s &&
              (o.prototype.toBuffer = function (t, e) {
                return this.toArrayLike(s, t, e);
              }),
            (o.prototype.toArray = function (t, e) {
              return this.toArrayLike(Array, t, e);
            }),
            (o.prototype.toArrayLike = function (t, e, r) {
              this._strip();
              var i = this.byteLength(),
                o = r || Math.max(1, i);
              n(i <= o, 'byte array longer than desired length'), n(o > 0, 'Requested array length <= 0');
              var s = (function (t, e) {
                return t.allocUnsafe ? t.allocUnsafe(e) : new t(e);
              })(t, o);
              return this['_toArrayLike' + ('le' === e ? 'LE' : 'BE')](s, i), s;
            }),
            (o.prototype._toArrayLikeLE = function (t, e) {
              for (var r = 0, n = 0, i = 0, o = 0; i < this.length; i++) {
                var s = (this.words[i] << o) | n;
                (t[r++] = 255 & s),
                  r < t.length && (t[r++] = (s >> 8) & 255),
                  r < t.length && (t[r++] = (s >> 16) & 255),
                  6 === o ? (r < t.length && (t[r++] = (s >> 24) & 255), (n = 0), (o = 0)) : ((n = s >>> 24), (o += 2));
              }
              if (r < t.length) for (t[r++] = n; r < t.length; ) t[r++] = 0;
            }),
            (o.prototype._toArrayLikeBE = function (t, e) {
              for (var r = t.length - 1, n = 0, i = 0, o = 0; i < this.length; i++) {
                var s = (this.words[i] << o) | n;
                (t[r--] = 255 & s),
                  r >= 0 && (t[r--] = (s >> 8) & 255),
                  r >= 0 && (t[r--] = (s >> 16) & 255),
                  6 === o ? (r >= 0 && (t[r--] = (s >> 24) & 255), (n = 0), (o = 0)) : ((n = s >>> 24), (o += 2));
              }
              if (r >= 0) for (t[r--] = n; r >= 0; ) t[r--] = 0;
            }),
            Math.clz32
              ? (o.prototype._countBits = function (t) {
                  return 32 - Math.clz32(t);
                })
              : (o.prototype._countBits = function (t) {
                  var e = t,
                    r = 0;
                  return (
                    e >= 4096 && ((r += 13), (e >>>= 13)),
                    e >= 64 && ((r += 7), (e >>>= 7)),
                    e >= 8 && ((r += 4), (e >>>= 4)),
                    e >= 2 && ((r += 2), (e >>>= 2)),
                    r + e
                  );
                }),
            (o.prototype._zeroBits = function (t) {
              if (0 === t) return 26;
              var e = t,
                r = 0;
              return (
                0 == (8191 & e) && ((r += 13), (e >>>= 13)),
                0 == (127 & e) && ((r += 7), (e >>>= 7)),
                0 == (15 & e) && ((r += 4), (e >>>= 4)),
                0 == (3 & e) && ((r += 2), (e >>>= 2)),
                0 == (1 & e) && r++,
                r
              );
            }),
            (o.prototype.bitLength = function () {
              var t = this.words[this.length - 1],
                e = this._countBits(t);
              return 26 * (this.length - 1) + e;
            }),
            (o.prototype.zeroBits = function () {
              if (this.isZero()) return 0;
              for (var t = 0, e = 0; e < this.length; e++) {
                var r = this._zeroBits(this.words[e]);
                if (((t += r), 26 !== r)) break;
              }
              return t;
            }),
            (o.prototype.byteLength = function () {
              return Math.ceil(this.bitLength() / 8);
            }),
            (o.prototype.toTwos = function (t) {
              return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone();
            }),
            (o.prototype.fromTwos = function (t) {
              return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone();
            }),
            (o.prototype.isNeg = function () {
              return 0 !== this.negative;
            }),
            (o.prototype.neg = function () {
              return this.clone().ineg();
            }),
            (o.prototype.ineg = function () {
              return this.isZero() || (this.negative ^= 1), this;
            }),
            (o.prototype.iuor = function (t) {
              for (; this.length < t.length; ) this.words[this.length++] = 0;
              for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
              return this._strip();
            }),
            (o.prototype.ior = function (t) {
              return n(0 == (this.negative | t.negative)), this.iuor(t);
            }),
            (o.prototype.or = function (t) {
              return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this);
            }),
            (o.prototype.uor = function (t) {
              return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this);
            }),
            (o.prototype.iuand = function (t) {
              var e;
              e = this.length > t.length ? t : this;
              for (var r = 0; r < e.length; r++) this.words[r] = this.words[r] & t.words[r];
              return (this.length = e.length), this._strip();
            }),
            (o.prototype.iand = function (t) {
              return n(0 == (this.negative | t.negative)), this.iuand(t);
            }),
            (o.prototype.and = function (t) {
              return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this);
            }),
            (o.prototype.uand = function (t) {
              return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this);
            }),
            (o.prototype.iuxor = function (t) {
              var e, r;
              this.length > t.length ? ((e = this), (r = t)) : ((e = t), (r = this));
              for (var n = 0; n < r.length; n++) this.words[n] = e.words[n] ^ r.words[n];
              if (this !== e) for (; n < e.length; n++) this.words[n] = e.words[n];
              return (this.length = e.length), this._strip();
            }),
            (o.prototype.ixor = function (t) {
              return n(0 == (this.negative | t.negative)), this.iuxor(t);
            }),
            (o.prototype.xor = function (t) {
              return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this);
            }),
            (o.prototype.uxor = function (t) {
              return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this);
            }),
            (o.prototype.inotn = function (t) {
              n('number' == typeof t && t >= 0);
              var e = 0 | Math.ceil(t / 26),
                r = t % 26;
              this._expand(e), r > 0 && e--;
              for (var i = 0; i < e; i++) this.words[i] = 67108863 & ~this.words[i];
              return r > 0 && (this.words[i] = ~this.words[i] & (67108863 >> (26 - r))), this._strip();
            }),
            (o.prototype.notn = function (t) {
              return this.clone().inotn(t);
            }),
            (o.prototype.setn = function (t, e) {
              n('number' == typeof t && t >= 0);
              var r = (t / 26) | 0,
                i = t % 26;
              return (
                this._expand(r + 1),
                (this.words[r] = e ? this.words[r] | (1 << i) : this.words[r] & ~(1 << i)),
                this._strip()
              );
            }),
            (o.prototype.iadd = function (t) {
              var e, r, n;
              if (0 !== this.negative && 0 === t.negative)
                return (this.negative = 0), (e = this.isub(t)), (this.negative ^= 1), this._normSign();
              if (0 === this.negative && 0 !== t.negative)
                return (t.negative = 0), (e = this.isub(t)), (t.negative = 1), e._normSign();
              this.length > t.length ? ((r = this), (n = t)) : ((r = t), (n = this));
              for (var i = 0, o = 0; o < n.length; o++)
                (e = (0 | r.words[o]) + (0 | n.words[o]) + i), (this.words[o] = 67108863 & e), (i = e >>> 26);
              for (; 0 !== i && o < r.length; o++)
                (e = (0 | r.words[o]) + i), (this.words[o] = 67108863 & e), (i = e >>> 26);
              if (((this.length = r.length), 0 !== i)) (this.words[this.length] = i), this.length++;
              else if (r !== this) for (; o < r.length; o++) this.words[o] = r.words[o];
              return this;
            }),
            (o.prototype.add = function (t) {
              var e;
              return 0 !== t.negative && 0 === this.negative
                ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
                : 0 === t.negative && 0 !== this.negative
                ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
                : this.length > t.length
                ? this.clone().iadd(t)
                : t.clone().iadd(this);
            }),
            (o.prototype.isub = function (t) {
              if (0 !== t.negative) {
                t.negative = 0;
                var e = this.iadd(t);
                return (t.negative = 1), e._normSign();
              }
              if (0 !== this.negative) return (this.negative = 0), this.iadd(t), (this.negative = 1), this._normSign();
              var r,
                n,
                i = this.cmp(t);
              if (0 === i) return (this.negative = 0), (this.length = 1), (this.words[0] = 0), this;
              i > 0 ? ((r = this), (n = t)) : ((r = t), (n = this));
              for (var o = 0, s = 0; s < n.length; s++)
                (o = (e = (0 | r.words[s]) - (0 | n.words[s]) + o) >> 26), (this.words[s] = 67108863 & e);
              for (; 0 !== o && s < r.length; s++)
                (o = (e = (0 | r.words[s]) + o) >> 26), (this.words[s] = 67108863 & e);
              if (0 === o && s < r.length && r !== this) for (; s < r.length; s++) this.words[s] = r.words[s];
              return (this.length = Math.max(this.length, s)), r !== this && (this.negative = 1), this._strip();
            }),
            (o.prototype.sub = function (t) {
              return this.clone().isub(t);
            });
          var g = function (t, e, r) {
            var n,
              i,
              o,
              s = t.words,
              h = e.words,
              u = r.words,
              a = 0,
              f = 0 | s[0],
              l = 8191 & f,
              c = f >>> 13,
              p = 0 | s[1],
              d = 8191 & p,
              m = p >>> 13,
              g = 0 | s[2],
              y = 8191 & g,
              v = g >>> 13,
              w = 0 | s[3],
              M = 8191 & w,
              E = w >>> 13,
              b = 0 | s[4],
              _ = 8191 & b,
              A = b >>> 13,
              N = 0 | s[5],
              I = 8191 & N,
              R = N >>> 13,
              T = 0 | s[6],
              O = 8191 & T,
              S = T >>> 13,
              L = 0 | s[7],
              B = 8191 & L,
              U = L >>> 13,
              C = 0 | s[8],
              D = 8191 & C,
              x = C >>> 13,
              P = 0 | s[9],
              k = 8191 & P,
              G = P >>> 13,
              j = 0 | h[0],
              $ = 8191 & j,
              K = j >>> 13,
              F = 0 | h[1],
              V = 8191 & F,
              q = F >>> 13,
              W = 0 | h[2],
              H = 8191 & W,
              Z = W >>> 13,
              z = 0 | h[3],
              X = 8191 & z,
              J = z >>> 13,
              Y = 0 | h[4],
              Q = 8191 & Y,
              tt = Y >>> 13,
              et = 0 | h[5],
              rt = 8191 & et,
              nt = et >>> 13,
              it = 0 | h[6],
              ot = 8191 & it,
              st = it >>> 13,
              ht = 0 | h[7],
              ut = 8191 & ht,
              at = ht >>> 13,
              ft = 0 | h[8],
              lt = 8191 & ft,
              ct = ft >>> 13,
              pt = 0 | h[9],
              dt = 8191 & pt,
              mt = pt >>> 13;
            (r.negative = t.negative ^ e.negative), (r.length = 19);
            var gt =
              (((a + (n = Math.imul(l, $))) | 0) +
                ((8191 & (i = ((i = Math.imul(l, K)) + Math.imul(c, $)) | 0)) << 13)) |
              0;
            (a = ((((o = Math.imul(c, K)) + (i >>> 13)) | 0) + (gt >>> 26)) | 0),
              (gt &= 67108863),
              (n = Math.imul(d, $)),
              (i = ((i = Math.imul(d, K)) + Math.imul(m, $)) | 0),
              (o = Math.imul(m, K));
            var yt =
              (((a + (n = (n + Math.imul(l, V)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(l, q)) | 0) + Math.imul(c, V)) | 0)) << 13)) |
              0;
            (a = ((((o = (o + Math.imul(c, q)) | 0) + (i >>> 13)) | 0) + (yt >>> 26)) | 0),
              (yt &= 67108863),
              (n = Math.imul(y, $)),
              (i = ((i = Math.imul(y, K)) + Math.imul(v, $)) | 0),
              (o = Math.imul(v, K)),
              (n = (n + Math.imul(d, V)) | 0),
              (i = ((i = (i + Math.imul(d, q)) | 0) + Math.imul(m, V)) | 0),
              (o = (o + Math.imul(m, q)) | 0);
            var vt =
              (((a + (n = (n + Math.imul(l, H)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(l, Z)) | 0) + Math.imul(c, H)) | 0)) << 13)) |
              0;
            (a = ((((o = (o + Math.imul(c, Z)) | 0) + (i >>> 13)) | 0) + (vt >>> 26)) | 0),
              (vt &= 67108863),
              (n = Math.imul(M, $)),
              (i = ((i = Math.imul(M, K)) + Math.imul(E, $)) | 0),
              (o = Math.imul(E, K)),
              (n = (n + Math.imul(y, V)) | 0),
              (i = ((i = (i + Math.imul(y, q)) | 0) + Math.imul(v, V)) | 0),
              (o = (o + Math.imul(v, q)) | 0),
              (n = (n + Math.imul(d, H)) | 0),
              (i = ((i = (i + Math.imul(d, Z)) | 0) + Math.imul(m, H)) | 0),
              (o = (o + Math.imul(m, Z)) | 0);
            var wt =
              (((a + (n = (n + Math.imul(l, X)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(l, J)) | 0) + Math.imul(c, X)) | 0)) << 13)) |
              0;
            (a = ((((o = (o + Math.imul(c, J)) | 0) + (i >>> 13)) | 0) + (wt >>> 26)) | 0),
              (wt &= 67108863),
              (n = Math.imul(_, $)),
              (i = ((i = Math.imul(_, K)) + Math.imul(A, $)) | 0),
              (o = Math.imul(A, K)),
              (n = (n + Math.imul(M, V)) | 0),
              (i = ((i = (i + Math.imul(M, q)) | 0) + Math.imul(E, V)) | 0),
              (o = (o + Math.imul(E, q)) | 0),
              (n = (n + Math.imul(y, H)) | 0),
              (i = ((i = (i + Math.imul(y, Z)) | 0) + Math.imul(v, H)) | 0),
              (o = (o + Math.imul(v, Z)) | 0),
              (n = (n + Math.imul(d, X)) | 0),
              (i = ((i = (i + Math.imul(d, J)) | 0) + Math.imul(m, X)) | 0),
              (o = (o + Math.imul(m, J)) | 0);
            var Mt =
              (((a + (n = (n + Math.imul(l, Q)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(l, tt)) | 0) + Math.imul(c, Q)) | 0)) << 13)) |
              0;
            (a = ((((o = (o + Math.imul(c, tt)) | 0) + (i >>> 13)) | 0) + (Mt >>> 26)) | 0),
              (Mt &= 67108863),
              (n = Math.imul(I, $)),
              (i = ((i = Math.imul(I, K)) + Math.imul(R, $)) | 0),
              (o = Math.imul(R, K)),
              (n = (n + Math.imul(_, V)) | 0),
              (i = ((i = (i + Math.imul(_, q)) | 0) + Math.imul(A, V)) | 0),
              (o = (o + Math.imul(A, q)) | 0),
              (n = (n + Math.imul(M, H)) | 0),
              (i = ((i = (i + Math.imul(M, Z)) | 0) + Math.imul(E, H)) | 0),
              (o = (o + Math.imul(E, Z)) | 0),
              (n = (n + Math.imul(y, X)) | 0),
              (i = ((i = (i + Math.imul(y, J)) | 0) + Math.imul(v, X)) | 0),
              (o = (o + Math.imul(v, J)) | 0),
              (n = (n + Math.imul(d, Q)) | 0),
              (i = ((i = (i + Math.imul(d, tt)) | 0) + Math.imul(m, Q)) | 0),
              (o = (o + Math.imul(m, tt)) | 0);
            var Et =
              (((a + (n = (n + Math.imul(l, rt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(l, nt)) | 0) + Math.imul(c, rt)) | 0)) << 13)) |
              0;
            (a = ((((o = (o + Math.imul(c, nt)) | 0) + (i >>> 13)) | 0) + (Et >>> 26)) | 0),
              (Et &= 67108863),
              (n = Math.imul(O, $)),
              (i = ((i = Math.imul(O, K)) + Math.imul(S, $)) | 0),
              (o = Math.imul(S, K)),
              (n = (n + Math.imul(I, V)) | 0),
              (i = ((i = (i + Math.imul(I, q)) | 0) + Math.imul(R, V)) | 0),
              (o = (o + Math.imul(R, q)) | 0),
              (n = (n + Math.imul(_, H)) | 0),
              (i = ((i = (i + Math.imul(_, Z)) | 0) + Math.imul(A, H)) | 0),
              (o = (o + Math.imul(A, Z)) | 0),
              (n = (n + Math.imul(M, X)) | 0),
              (i = ((i = (i + Math.imul(M, J)) | 0) + Math.imul(E, X)) | 0),
              (o = (o + Math.imul(E, J)) | 0),
              (n = (n + Math.imul(y, Q)) | 0),
              (i = ((i = (i + Math.imul(y, tt)) | 0) + Math.imul(v, Q)) | 0),
              (o = (o + Math.imul(v, tt)) | 0),
              (n = (n + Math.imul(d, rt)) | 0),
              (i = ((i = (i + Math.imul(d, nt)) | 0) + Math.imul(m, rt)) | 0),
              (o = (o + Math.imul(m, nt)) | 0);
            var bt =
              (((a + (n = (n + Math.imul(l, ot)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(l, st)) | 0) + Math.imul(c, ot)) | 0)) << 13)) |
              0;
            (a = ((((o = (o + Math.imul(c, st)) | 0) + (i >>> 13)) | 0) + (bt >>> 26)) | 0),
              (bt &= 67108863),
              (n = Math.imul(B, $)),
              (i = ((i = Math.imul(B, K)) + Math.imul(U, $)) | 0),
              (o = Math.imul(U, K)),
              (n = (n + Math.imul(O, V)) | 0),
              (i = ((i = (i + Math.imul(O, q)) | 0) + Math.imul(S, V)) | 0),
              (o = (o + Math.imul(S, q)) | 0),
              (n = (n + Math.imul(I, H)) | 0),
              (i = ((i = (i + Math.imul(I, Z)) | 0) + Math.imul(R, H)) | 0),
              (o = (o + Math.imul(R, Z)) | 0),
              (n = (n + Math.imul(_, X)) | 0),
              (i = ((i = (i + Math.imul(_, J)) | 0) + Math.imul(A, X)) | 0),
              (o = (o + Math.imul(A, J)) | 0),
              (n = (n + Math.imul(M, Q)) | 0),
              (i = ((i = (i + Math.imul(M, tt)) | 0) + Math.imul(E, Q)) | 0),
              (o = (o + Math.imul(E, tt)) | 0),
              (n = (n + Math.imul(y, rt)) | 0),
              (i = ((i = (i + Math.imul(y, nt)) | 0) + Math.imul(v, rt)) | 0),
              (o = (o + Math.imul(v, nt)) | 0),
              (n = (n + Math.imul(d, ot)) | 0),
              (i = ((i = (i + Math.imul(d, st)) | 0) + Math.imul(m, ot)) | 0),
              (o = (o + Math.imul(m, st)) | 0);
            var _t =
              (((a + (n = (n + Math.imul(l, ut)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(l, at)) | 0) + Math.imul(c, ut)) | 0)) << 13)) |
              0;
            (a = ((((o = (o + Math.imul(c, at)) | 0) + (i >>> 13)) | 0) + (_t >>> 26)) | 0),
              (_t &= 67108863),
              (n = Math.imul(D, $)),
              (i = ((i = Math.imul(D, K)) + Math.imul(x, $)) | 0),
              (o = Math.imul(x, K)),
              (n = (n + Math.imul(B, V)) | 0),
              (i = ((i = (i + Math.imul(B, q)) | 0) + Math.imul(U, V)) | 0),
              (o = (o + Math.imul(U, q)) | 0),
              (n = (n + Math.imul(O, H)) | 0),
              (i = ((i = (i + Math.imul(O, Z)) | 0) + Math.imul(S, H)) | 0),
              (o = (o + Math.imul(S, Z)) | 0),
              (n = (n + Math.imul(I, X)) | 0),
              (i = ((i = (i + Math.imul(I, J)) | 0) + Math.imul(R, X)) | 0),
              (o = (o + Math.imul(R, J)) | 0),
              (n = (n + Math.imul(_, Q)) | 0),
              (i = ((i = (i + Math.imul(_, tt)) | 0) + Math.imul(A, Q)) | 0),
              (o = (o + Math.imul(A, tt)) | 0),
              (n = (n + Math.imul(M, rt)) | 0),
              (i = ((i = (i + Math.imul(M, nt)) | 0) + Math.imul(E, rt)) | 0),
              (o = (o + Math.imul(E, nt)) | 0),
              (n = (n + Math.imul(y, ot)) | 0),
              (i = ((i = (i + Math.imul(y, st)) | 0) + Math.imul(v, ot)) | 0),
              (o = (o + Math.imul(v, st)) | 0),
              (n = (n + Math.imul(d, ut)) | 0),
              (i = ((i = (i + Math.imul(d, at)) | 0) + Math.imul(m, ut)) | 0),
              (o = (o + Math.imul(m, at)) | 0);
            var At =
              (((a + (n = (n + Math.imul(l, lt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(l, ct)) | 0) + Math.imul(c, lt)) | 0)) << 13)) |
              0;
            (a = ((((o = (o + Math.imul(c, ct)) | 0) + (i >>> 13)) | 0) + (At >>> 26)) | 0),
              (At &= 67108863),
              (n = Math.imul(k, $)),
              (i = ((i = Math.imul(k, K)) + Math.imul(G, $)) | 0),
              (o = Math.imul(G, K)),
              (n = (n + Math.imul(D, V)) | 0),
              (i = ((i = (i + Math.imul(D, q)) | 0) + Math.imul(x, V)) | 0),
              (o = (o + Math.imul(x, q)) | 0),
              (n = (n + Math.imul(B, H)) | 0),
              (i = ((i = (i + Math.imul(B, Z)) | 0) + Math.imul(U, H)) | 0),
              (o = (o + Math.imul(U, Z)) | 0),
              (n = (n + Math.imul(O, X)) | 0),
              (i = ((i = (i + Math.imul(O, J)) | 0) + Math.imul(S, X)) | 0),
              (o = (o + Math.imul(S, J)) | 0),
              (n = (n + Math.imul(I, Q)) | 0),
              (i = ((i = (i + Math.imul(I, tt)) | 0) + Math.imul(R, Q)) | 0),
              (o = (o + Math.imul(R, tt)) | 0),
              (n = (n + Math.imul(_, rt)) | 0),
              (i = ((i = (i + Math.imul(_, nt)) | 0) + Math.imul(A, rt)) | 0),
              (o = (o + Math.imul(A, nt)) | 0),
              (n = (n + Math.imul(M, ot)) | 0),
              (i = ((i = (i + Math.imul(M, st)) | 0) + Math.imul(E, ot)) | 0),
              (o = (o + Math.imul(E, st)) | 0),
              (n = (n + Math.imul(y, ut)) | 0),
              (i = ((i = (i + Math.imul(y, at)) | 0) + Math.imul(v, ut)) | 0),
              (o = (o + Math.imul(v, at)) | 0),
              (n = (n + Math.imul(d, lt)) | 0),
              (i = ((i = (i + Math.imul(d, ct)) | 0) + Math.imul(m, lt)) | 0),
              (o = (o + Math.imul(m, ct)) | 0);
            var Nt =
              (((a + (n = (n + Math.imul(l, dt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(l, mt)) | 0) + Math.imul(c, dt)) | 0)) << 13)) |
              0;
            (a = ((((o = (o + Math.imul(c, mt)) | 0) + (i >>> 13)) | 0) + (Nt >>> 26)) | 0),
              (Nt &= 67108863),
              (n = Math.imul(k, V)),
              (i = ((i = Math.imul(k, q)) + Math.imul(G, V)) | 0),
              (o = Math.imul(G, q)),
              (n = (n + Math.imul(D, H)) | 0),
              (i = ((i = (i + Math.imul(D, Z)) | 0) + Math.imul(x, H)) | 0),
              (o = (o + Math.imul(x, Z)) | 0),
              (n = (n + Math.imul(B, X)) | 0),
              (i = ((i = (i + Math.imul(B, J)) | 0) + Math.imul(U, X)) | 0),
              (o = (o + Math.imul(U, J)) | 0),
              (n = (n + Math.imul(O, Q)) | 0),
              (i = ((i = (i + Math.imul(O, tt)) | 0) + Math.imul(S, Q)) | 0),
              (o = (o + Math.imul(S, tt)) | 0),
              (n = (n + Math.imul(I, rt)) | 0),
              (i = ((i = (i + Math.imul(I, nt)) | 0) + Math.imul(R, rt)) | 0),
              (o = (o + Math.imul(R, nt)) | 0),
              (n = (n + Math.imul(_, ot)) | 0),
              (i = ((i = (i + Math.imul(_, st)) | 0) + Math.imul(A, ot)) | 0),
              (o = (o + Math.imul(A, st)) | 0),
              (n = (n + Math.imul(M, ut)) | 0),
              (i = ((i = (i + Math.imul(M, at)) | 0) + Math.imul(E, ut)) | 0),
              (o = (o + Math.imul(E, at)) | 0),
              (n = (n + Math.imul(y, lt)) | 0),
              (i = ((i = (i + Math.imul(y, ct)) | 0) + Math.imul(v, lt)) | 0),
              (o = (o + Math.imul(v, ct)) | 0);
            var It =
              (((a + (n = (n + Math.imul(d, dt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(d, mt)) | 0) + Math.imul(m, dt)) | 0)) << 13)) |
              0;
            (a = ((((o = (o + Math.imul(m, mt)) | 0) + (i >>> 13)) | 0) + (It >>> 26)) | 0),
              (It &= 67108863),
              (n = Math.imul(k, H)),
              (i = ((i = Math.imul(k, Z)) + Math.imul(G, H)) | 0),
              (o = Math.imul(G, Z)),
              (n = (n + Math.imul(D, X)) | 0),
              (i = ((i = (i + Math.imul(D, J)) | 0) + Math.imul(x, X)) | 0),
              (o = (o + Math.imul(x, J)) | 0),
              (n = (n + Math.imul(B, Q)) | 0),
              (i = ((i = (i + Math.imul(B, tt)) | 0) + Math.imul(U, Q)) | 0),
              (o = (o + Math.imul(U, tt)) | 0),
              (n = (n + Math.imul(O, rt)) | 0),
              (i = ((i = (i + Math.imul(O, nt)) | 0) + Math.imul(S, rt)) | 0),
              (o = (o + Math.imul(S, nt)) | 0),
              (n = (n + Math.imul(I, ot)) | 0),
              (i = ((i = (i + Math.imul(I, st)) | 0) + Math.imul(R, ot)) | 0),
              (o = (o + Math.imul(R, st)) | 0),
              (n = (n + Math.imul(_, ut)) | 0),
              (i = ((i = (i + Math.imul(_, at)) | 0) + Math.imul(A, ut)) | 0),
              (o = (o + Math.imul(A, at)) | 0),
              (n = (n + Math.imul(M, lt)) | 0),
              (i = ((i = (i + Math.imul(M, ct)) | 0) + Math.imul(E, lt)) | 0),
              (o = (o + Math.imul(E, ct)) | 0);
            var Rt =
              (((a + (n = (n + Math.imul(y, dt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(y, mt)) | 0) + Math.imul(v, dt)) | 0)) << 13)) |
              0;
            (a = ((((o = (o + Math.imul(v, mt)) | 0) + (i >>> 13)) | 0) + (Rt >>> 26)) | 0),
              (Rt &= 67108863),
              (n = Math.imul(k, X)),
              (i = ((i = Math.imul(k, J)) + Math.imul(G, X)) | 0),
              (o = Math.imul(G, J)),
              (n = (n + Math.imul(D, Q)) | 0),
              (i = ((i = (i + Math.imul(D, tt)) | 0) + Math.imul(x, Q)) | 0),
              (o = (o + Math.imul(x, tt)) | 0),
              (n = (n + Math.imul(B, rt)) | 0),
              (i = ((i = (i + Math.imul(B, nt)) | 0) + Math.imul(U, rt)) | 0),
              (o = (o + Math.imul(U, nt)) | 0),
              (n = (n + Math.imul(O, ot)) | 0),
              (i = ((i = (i + Math.imul(O, st)) | 0) + Math.imul(S, ot)) | 0),
              (o = (o + Math.imul(S, st)) | 0),
              (n = (n + Math.imul(I, ut)) | 0),
              (i = ((i = (i + Math.imul(I, at)) | 0) + Math.imul(R, ut)) | 0),
              (o = (o + Math.imul(R, at)) | 0),
              (n = (n + Math.imul(_, lt)) | 0),
              (i = ((i = (i + Math.imul(_, ct)) | 0) + Math.imul(A, lt)) | 0),
              (o = (o + Math.imul(A, ct)) | 0);
            var Tt =
              (((a + (n = (n + Math.imul(M, dt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(M, mt)) | 0) + Math.imul(E, dt)) | 0)) << 13)) |
              0;
            (a = ((((o = (o + Math.imul(E, mt)) | 0) + (i >>> 13)) | 0) + (Tt >>> 26)) | 0),
              (Tt &= 67108863),
              (n = Math.imul(k, Q)),
              (i = ((i = Math.imul(k, tt)) + Math.imul(G, Q)) | 0),
              (o = Math.imul(G, tt)),
              (n = (n + Math.imul(D, rt)) | 0),
              (i = ((i = (i + Math.imul(D, nt)) | 0) + Math.imul(x, rt)) | 0),
              (o = (o + Math.imul(x, nt)) | 0),
              (n = (n + Math.imul(B, ot)) | 0),
              (i = ((i = (i + Math.imul(B, st)) | 0) + Math.imul(U, ot)) | 0),
              (o = (o + Math.imul(U, st)) | 0),
              (n = (n + Math.imul(O, ut)) | 0),
              (i = ((i = (i + Math.imul(O, at)) | 0) + Math.imul(S, ut)) | 0),
              (o = (o + Math.imul(S, at)) | 0),
              (n = (n + Math.imul(I, lt)) | 0),
              (i = ((i = (i + Math.imul(I, ct)) | 0) + Math.imul(R, lt)) | 0),
              (o = (o + Math.imul(R, ct)) | 0);
            var Ot =
              (((a + (n = (n + Math.imul(_, dt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(_, mt)) | 0) + Math.imul(A, dt)) | 0)) << 13)) |
              0;
            (a = ((((o = (o + Math.imul(A, mt)) | 0) + (i >>> 13)) | 0) + (Ot >>> 26)) | 0),
              (Ot &= 67108863),
              (n = Math.imul(k, rt)),
              (i = ((i = Math.imul(k, nt)) + Math.imul(G, rt)) | 0),
              (o = Math.imul(G, nt)),
              (n = (n + Math.imul(D, ot)) | 0),
              (i = ((i = (i + Math.imul(D, st)) | 0) + Math.imul(x, ot)) | 0),
              (o = (o + Math.imul(x, st)) | 0),
              (n = (n + Math.imul(B, ut)) | 0),
              (i = ((i = (i + Math.imul(B, at)) | 0) + Math.imul(U, ut)) | 0),
              (o = (o + Math.imul(U, at)) | 0),
              (n = (n + Math.imul(O, lt)) | 0),
              (i = ((i = (i + Math.imul(O, ct)) | 0) + Math.imul(S, lt)) | 0),
              (o = (o + Math.imul(S, ct)) | 0);
            var St =
              (((a + (n = (n + Math.imul(I, dt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(I, mt)) | 0) + Math.imul(R, dt)) | 0)) << 13)) |
              0;
            (a = ((((o = (o + Math.imul(R, mt)) | 0) + (i >>> 13)) | 0) + (St >>> 26)) | 0),
              (St &= 67108863),
              (n = Math.imul(k, ot)),
              (i = ((i = Math.imul(k, st)) + Math.imul(G, ot)) | 0),
              (o = Math.imul(G, st)),
              (n = (n + Math.imul(D, ut)) | 0),
              (i = ((i = (i + Math.imul(D, at)) | 0) + Math.imul(x, ut)) | 0),
              (o = (o + Math.imul(x, at)) | 0),
              (n = (n + Math.imul(B, lt)) | 0),
              (i = ((i = (i + Math.imul(B, ct)) | 0) + Math.imul(U, lt)) | 0),
              (o = (o + Math.imul(U, ct)) | 0);
            var Lt =
              (((a + (n = (n + Math.imul(O, dt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(O, mt)) | 0) + Math.imul(S, dt)) | 0)) << 13)) |
              0;
            (a = ((((o = (o + Math.imul(S, mt)) | 0) + (i >>> 13)) | 0) + (Lt >>> 26)) | 0),
              (Lt &= 67108863),
              (n = Math.imul(k, ut)),
              (i = ((i = Math.imul(k, at)) + Math.imul(G, ut)) | 0),
              (o = Math.imul(G, at)),
              (n = (n + Math.imul(D, lt)) | 0),
              (i = ((i = (i + Math.imul(D, ct)) | 0) + Math.imul(x, lt)) | 0),
              (o = (o + Math.imul(x, ct)) | 0);
            var Bt =
              (((a + (n = (n + Math.imul(B, dt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(B, mt)) | 0) + Math.imul(U, dt)) | 0)) << 13)) |
              0;
            (a = ((((o = (o + Math.imul(U, mt)) | 0) + (i >>> 13)) | 0) + (Bt >>> 26)) | 0),
              (Bt &= 67108863),
              (n = Math.imul(k, lt)),
              (i = ((i = Math.imul(k, ct)) + Math.imul(G, lt)) | 0),
              (o = Math.imul(G, ct));
            var Ut =
              (((a + (n = (n + Math.imul(D, dt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(D, mt)) | 0) + Math.imul(x, dt)) | 0)) << 13)) |
              0;
            (a = ((((o = (o + Math.imul(x, mt)) | 0) + (i >>> 13)) | 0) + (Ut >>> 26)) | 0), (Ut &= 67108863);
            var Ct =
              (((a + (n = Math.imul(k, dt))) | 0) +
                ((8191 & (i = ((i = Math.imul(k, mt)) + Math.imul(G, dt)) | 0)) << 13)) |
              0;
            return (
              (a = ((((o = Math.imul(G, mt)) + (i >>> 13)) | 0) + (Ct >>> 26)) | 0),
              (Ct &= 67108863),
              (u[0] = gt),
              (u[1] = yt),
              (u[2] = vt),
              (u[3] = wt),
              (u[4] = Mt),
              (u[5] = Et),
              (u[6] = bt),
              (u[7] = _t),
              (u[8] = At),
              (u[9] = Nt),
              (u[10] = It),
              (u[11] = Rt),
              (u[12] = Tt),
              (u[13] = Ot),
              (u[14] = St),
              (u[15] = Lt),
              (u[16] = Bt),
              (u[17] = Ut),
              (u[18] = Ct),
              0 !== a && ((u[19] = a), r.length++),
              r
            );
          };
          function y(t, e, r) {
            (r.negative = e.negative ^ t.negative), (r.length = t.length + e.length);
            for (var n = 0, i = 0, o = 0; o < r.length - 1; o++) {
              var s = i;
              i = 0;
              for (
                var h = 67108863 & n, u = Math.min(o, e.length - 1), a = Math.max(0, o - t.length + 1);
                a <= u;
                a++
              ) {
                var f = o - a,
                  l = (0 | t.words[f]) * (0 | e.words[a]),
                  c = 67108863 & l;
                (h = 67108863 & (c = (c + h) | 0)),
                  (i += (s = ((s = (s + ((l / 67108864) | 0)) | 0) + (c >>> 26)) | 0) >>> 26),
                  (s &= 67108863);
              }
              (r.words[o] = h), (n = s), (s = i);
            }
            return 0 !== n ? (r.words[o] = n) : r.length--, r._strip();
          }
          function v(t, e, r) {
            return y(t, e, r);
          }
          function w(t, e) {
            (this.x = t), (this.y = e);
          }
          Math.imul || (g = m),
            (o.prototype.mulTo = function (t, e) {
              var r = this.length + t.length;
              return 10 === this.length && 10 === t.length
                ? g(this, t, e)
                : r < 63
                ? m(this, t, e)
                : r < 1024
                ? y(this, t, e)
                : v(this, t, e);
            }),
            (w.prototype.makeRBT = function (t) {
              for (var e = new Array(t), r = o.prototype._countBits(t) - 1, n = 0; n < t; n++)
                e[n] = this.revBin(n, r, t);
              return e;
            }),
            (w.prototype.revBin = function (t, e, r) {
              if (0 === t || t === r - 1) return t;
              for (var n = 0, i = 0; i < e; i++) (n |= (1 & t) << (e - i - 1)), (t >>= 1);
              return n;
            }),
            (w.prototype.permute = function (t, e, r, n, i, o) {
              for (var s = 0; s < o; s++) (n[s] = e[t[s]]), (i[s] = r[t[s]]);
            }),
            (w.prototype.transform = function (t, e, r, n, i, o) {
              this.permute(o, t, e, r, n, i);
              for (var s = 1; s < i; s <<= 1)
                for (
                  var h = s << 1, u = Math.cos((2 * Math.PI) / h), a = Math.sin((2 * Math.PI) / h), f = 0;
                  f < i;
                  f += h
                )
                  for (var l = u, c = a, p = 0; p < s; p++) {
                    var d = r[f + p],
                      m = n[f + p],
                      g = r[f + p + s],
                      y = n[f + p + s],
                      v = l * g - c * y;
                    (y = l * y + c * g),
                      (g = v),
                      (r[f + p] = d + g),
                      (n[f + p] = m + y),
                      (r[f + p + s] = d - g),
                      (n[f + p + s] = m - y),
                      p !== h && ((v = u * l - a * c), (c = u * c + a * l), (l = v));
                  }
            }),
            (w.prototype.guessLen13b = function (t, e) {
              var r = 1 | Math.max(e, t),
                n = 1 & r,
                i = 0;
              for (r = (r / 2) | 0; r; r >>>= 1) i++;
              return 1 << (i + 1 + n);
            }),
            (w.prototype.conjugate = function (t, e, r) {
              if (!(r <= 1))
                for (var n = 0; n < r / 2; n++) {
                  var i = t[n];
                  (t[n] = t[r - n - 1]), (t[r - n - 1] = i), (i = e[n]), (e[n] = -e[r - n - 1]), (e[r - n - 1] = -i);
                }
            }),
            (w.prototype.normalize13b = function (t, e) {
              for (var r = 0, n = 0; n < e / 2; n++) {
                var i = 8192 * Math.round(t[2 * n + 1] / e) + Math.round(t[2 * n] / e) + r;
                (t[n] = 67108863 & i), (r = i < 67108864 ? 0 : (i / 67108864) | 0);
              }
              return t;
            }),
            (w.prototype.convert13b = function (t, e, r, i) {
              for (var o = 0, s = 0; s < e; s++)
                (o += 0 | t[s]), (r[2 * s] = 8191 & o), (o >>>= 13), (r[2 * s + 1] = 8191 & o), (o >>>= 13);
              for (s = 2 * e; s < i; ++s) r[s] = 0;
              n(0 === o), n(0 == (-8192 & o));
            }),
            (w.prototype.stub = function (t) {
              for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0;
              return e;
            }),
            (w.prototype.mulp = function (t, e, r) {
              var n = 2 * this.guessLen13b(t.length, e.length),
                i = this.makeRBT(n),
                o = this.stub(n),
                s = new Array(n),
                h = new Array(n),
                u = new Array(n),
                a = new Array(n),
                f = new Array(n),
                l = new Array(n),
                c = r.words;
              (c.length = n),
                this.convert13b(t.words, t.length, s, n),
                this.convert13b(e.words, e.length, a, n),
                this.transform(s, o, h, u, n, i),
                this.transform(a, o, f, l, n, i);
              for (var p = 0; p < n; p++) {
                var d = h[p] * f[p] - u[p] * l[p];
                (u[p] = h[p] * l[p] + u[p] * f[p]), (h[p] = d);
              }
              return (
                this.conjugate(h, u, n),
                this.transform(h, u, c, o, n, i),
                this.conjugate(c, o, n),
                this.normalize13b(c, n),
                (r.negative = t.negative ^ e.negative),
                (r.length = t.length + e.length),
                r._strip()
              );
            }),
            (o.prototype.mul = function (t) {
              var e = new o(null);
              return (e.words = new Array(this.length + t.length)), this.mulTo(t, e);
            }),
            (o.prototype.mulf = function (t) {
              var e = new o(null);
              return (e.words = new Array(this.length + t.length)), v(this, t, e);
            }),
            (o.prototype.imul = function (t) {
              return this.clone().mulTo(t, this);
            }),
            (o.prototype.imuln = function (t) {
              var e = t < 0;
              e && (t = -t), n('number' == typeof t), n(t < 67108864);
              for (var r = 0, i = 0; i < this.length; i++) {
                var o = (0 | this.words[i]) * t,
                  s = (67108863 & o) + (67108863 & r);
                (r >>= 26), (r += (o / 67108864) | 0), (r += s >>> 26), (this.words[i] = 67108863 & s);
              }
              return 0 !== r && ((this.words[i] = r), this.length++), e ? this.ineg() : this;
            }),
            (o.prototype.muln = function (t) {
              return this.clone().imuln(t);
            }),
            (o.prototype.sqr = function () {
              return this.mul(this);
            }),
            (o.prototype.isqr = function () {
              return this.imul(this.clone());
            }),
            (o.prototype.pow = function (t) {
              var e = (function (t) {
                for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
                  var n = (r / 26) | 0,
                    i = r % 26;
                  e[r] = (t.words[n] >>> i) & 1;
                }
                return e;
              })(t);
              if (0 === e.length) return new o(1);
              for (var r = this, n = 0; n < e.length && 0 === e[n]; n++, r = r.sqr());
              if (++n < e.length) for (var i = r.sqr(); n < e.length; n++, i = i.sqr()) 0 !== e[n] && (r = r.mul(i));
              return r;
            }),
            (o.prototype.iushln = function (t) {
              n('number' == typeof t && t >= 0);
              var e,
                r = t % 26,
                i = (t - r) / 26,
                o = (67108863 >>> (26 - r)) << (26 - r);
              if (0 !== r) {
                var s = 0;
                for (e = 0; e < this.length; e++) {
                  var h = this.words[e] & o,
                    u = ((0 | this.words[e]) - h) << r;
                  (this.words[e] = u | s), (s = h >>> (26 - r));
                }
                s && ((this.words[e] = s), this.length++);
              }
              if (0 !== i) {
                for (e = this.length - 1; e >= 0; e--) this.words[e + i] = this.words[e];
                for (e = 0; e < i; e++) this.words[e] = 0;
                this.length += i;
              }
              return this._strip();
            }),
            (o.prototype.ishln = function (t) {
              return n(0 === this.negative), this.iushln(t);
            }),
            (o.prototype.iushrn = function (t, e, r) {
              var i;
              n('number' == typeof t && t >= 0), (i = e ? (e - (e % 26)) / 26 : 0);
              var o = t % 26,
                s = Math.min((t - o) / 26, this.length),
                h = 67108863 ^ ((67108863 >>> o) << o),
                u = r;
              if (((i -= s), (i = Math.max(0, i)), u)) {
                for (var a = 0; a < s; a++) u.words[a] = this.words[a];
                u.length = s;
              }
              if (0 === s);
              else if (this.length > s)
                for (this.length -= s, a = 0; a < this.length; a++) this.words[a] = this.words[a + s];
              else (this.words[0] = 0), (this.length = 1);
              var f = 0;
              for (a = this.length - 1; a >= 0 && (0 !== f || a >= i); a--) {
                var l = 0 | this.words[a];
                (this.words[a] = (f << (26 - o)) | (l >>> o)), (f = l & h);
              }
              return (
                u && 0 !== f && (u.words[u.length++] = f),
                0 === this.length && ((this.words[0] = 0), (this.length = 1)),
                this._strip()
              );
            }),
            (o.prototype.ishrn = function (t, e, r) {
              return n(0 === this.negative), this.iushrn(t, e, r);
            }),
            (o.prototype.shln = function (t) {
              return this.clone().ishln(t);
            }),
            (o.prototype.ushln = function (t) {
              return this.clone().iushln(t);
            }),
            (o.prototype.shrn = function (t) {
              return this.clone().ishrn(t);
            }),
            (o.prototype.ushrn = function (t) {
              return this.clone().iushrn(t);
            }),
            (o.prototype.testn = function (t) {
              n('number' == typeof t && t >= 0);
              var e = t % 26,
                r = (t - e) / 26,
                i = 1 << e;
              return !(this.length <= r || !(this.words[r] & i));
            }),
            (o.prototype.imaskn = function (t) {
              n('number' == typeof t && t >= 0);
              var e = t % 26,
                r = (t - e) / 26;
              if ((n(0 === this.negative, 'imaskn works only with positive numbers'), this.length <= r)) return this;
              if ((0 !== e && r++, (this.length = Math.min(r, this.length)), 0 !== e)) {
                var i = 67108863 ^ ((67108863 >>> e) << e);
                this.words[this.length - 1] &= i;
              }
              return this._strip();
            }),
            (o.prototype.maskn = function (t) {
              return this.clone().imaskn(t);
            }),
            (o.prototype.iaddn = function (t) {
              return (
                n('number' == typeof t),
                n(t < 67108864),
                t < 0
                  ? this.isubn(-t)
                  : 0 !== this.negative
                  ? 1 === this.length && (0 | this.words[0]) <= t
                    ? ((this.words[0] = t - (0 | this.words[0])), (this.negative = 0), this)
                    : ((this.negative = 0), this.isubn(t), (this.negative = 1), this)
                  : this._iaddn(t)
              );
            }),
            (o.prototype._iaddn = function (t) {
              this.words[0] += t;
              for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
                (this.words[e] -= 67108864), e === this.length - 1 ? (this.words[e + 1] = 1) : this.words[e + 1]++;
              return (this.length = Math.max(this.length, e + 1)), this;
            }),
            (o.prototype.isubn = function (t) {
              if ((n('number' == typeof t), n(t < 67108864), t < 0)) return this.iaddn(-t);
              if (0 !== this.negative) return (this.negative = 0), this.iaddn(t), (this.negative = 1), this;
              if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
                (this.words[0] = -this.words[0]), (this.negative = 1);
              else
                for (var e = 0; e < this.length && this.words[e] < 0; e++)
                  (this.words[e] += 67108864), (this.words[e + 1] -= 1);
              return this._strip();
            }),
            (o.prototype.addn = function (t) {
              return this.clone().iaddn(t);
            }),
            (o.prototype.subn = function (t) {
              return this.clone().isubn(t);
            }),
            (o.prototype.iabs = function () {
              return (this.negative = 0), this;
            }),
            (o.prototype.abs = function () {
              return this.clone().iabs();
            }),
            (o.prototype._ishlnsubmul = function (t, e, r) {
              var i,
                o,
                s = t.length + r;
              this._expand(s);
              var h = 0;
              for (i = 0; i < t.length; i++) {
                o = (0 | this.words[i + r]) + h;
                var u = (0 | t.words[i]) * e;
                (h = ((o -= 67108863 & u) >> 26) - ((u / 67108864) | 0)), (this.words[i + r] = 67108863 & o);
              }
              for (; i < this.length - r; i++)
                (h = (o = (0 | this.words[i + r]) + h) >> 26), (this.words[i + r] = 67108863 & o);
              if (0 === h) return this._strip();
              for (n(-1 === h), h = 0, i = 0; i < this.length; i++)
                (h = (o = -(0 | this.words[i]) + h) >> 26), (this.words[i] = 67108863 & o);
              return (this.negative = 1), this._strip();
            }),
            (o.prototype._wordDiv = function (t, e) {
              var r = (this.length, t.length),
                n = this.clone(),
                i = t,
                s = 0 | i.words[i.length - 1];
              0 != (r = 26 - this._countBits(s)) && ((i = i.ushln(r)), n.iushln(r), (s = 0 | i.words[i.length - 1]));
              var h,
                u = n.length - i.length;
              if ('mod' !== e) {
                ((h = new o(null)).length = u + 1), (h.words = new Array(h.length));
                for (var a = 0; a < h.length; a++) h.words[a] = 0;
              }
              var f = n.clone()._ishlnsubmul(i, 1, u);
              0 === f.negative && ((n = f), h && (h.words[u] = 1));
              for (var l = u - 1; l >= 0; l--) {
                var c = 67108864 * (0 | n.words[i.length + l]) + (0 | n.words[i.length + l - 1]);
                for (c = Math.min((c / s) | 0, 67108863), n._ishlnsubmul(i, c, l); 0 !== n.negative; )
                  c--, (n.negative = 0), n._ishlnsubmul(i, 1, l), n.isZero() || (n.negative ^= 1);
                h && (h.words[l] = c);
              }
              return h && h._strip(), n._strip(), 'div' !== e && 0 !== r && n.iushrn(r), { div: h || null, mod: n };
            }),
            (o.prototype.divmod = function (t, e, r) {
              return (
                n(!t.isZero()),
                this.isZero()
                  ? { div: new o(0), mod: new o(0) }
                  : 0 !== this.negative && 0 === t.negative
                  ? ((h = this.neg().divmod(t, e)),
                    'mod' !== e && (i = h.div.neg()),
                    'div' !== e && ((s = h.mod.neg()), r && 0 !== s.negative && s.iadd(t)),
                    { div: i, mod: s })
                  : 0 === this.negative && 0 !== t.negative
                  ? ((h = this.divmod(t.neg(), e)), 'mod' !== e && (i = h.div.neg()), { div: i, mod: h.mod })
                  : 0 != (this.negative & t.negative)
                  ? ((h = this.neg().divmod(t.neg(), e)),
                    'div' !== e && ((s = h.mod.neg()), r && 0 !== s.negative && s.isub(t)),
                    { div: h.div, mod: s })
                  : t.length > this.length || this.cmp(t) < 0
                  ? { div: new o(0), mod: this }
                  : 1 === t.length
                  ? 'div' === e
                    ? { div: this.divn(t.words[0]), mod: null }
                    : 'mod' === e
                    ? { div: null, mod: new o(this.modrn(t.words[0])) }
                    : { div: this.divn(t.words[0]), mod: new o(this.modrn(t.words[0])) }
                  : this._wordDiv(t, e)
              );
              var i, s, h;
            }),
            (o.prototype.div = function (t) {
              return this.divmod(t, 'div', !1).div;
            }),
            (o.prototype.mod = function (t) {
              return this.divmod(t, 'mod', !1).mod;
            }),
            (o.prototype.umod = function (t) {
              return this.divmod(t, 'mod', !0).mod;
            }),
            (o.prototype.divRound = function (t) {
              var e = this.divmod(t);
              if (e.mod.isZero()) return e.div;
              var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
                n = t.ushrn(1),
                i = t.andln(1),
                o = r.cmp(n);
              return o < 0 || (1 === i && 0 === o) ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1);
            }),
            (o.prototype.modrn = function (t) {
              var e = t < 0;
              e && (t = -t), n(t <= 67108863);
              for (var r = (1 << 26) % t, i = 0, o = this.length - 1; o >= 0; o--)
                i = (r * i + (0 | this.words[o])) % t;
              return e ? -i : i;
            }),
            (o.prototype.modn = function (t) {
              return this.modrn(t);
            }),
            (o.prototype.idivn = function (t) {
              var e = t < 0;
              e && (t = -t), n(t <= 67108863);
              for (var r = 0, i = this.length - 1; i >= 0; i--) {
                var o = (0 | this.words[i]) + 67108864 * r;
                (this.words[i] = (o / t) | 0), (r = o % t);
              }
              return this._strip(), e ? this.ineg() : this;
            }),
            (o.prototype.divn = function (t) {
              return this.clone().idivn(t);
            }),
            (o.prototype.egcd = function (t) {
              n(0 === t.negative), n(!t.isZero());
              var e = this,
                r = t.clone();
              e = 0 !== e.negative ? e.umod(t) : e.clone();
              for (var i = new o(1), s = new o(0), h = new o(0), u = new o(1), a = 0; e.isEven() && r.isEven(); )
                e.iushrn(1), r.iushrn(1), ++a;
              for (var f = r.clone(), l = e.clone(); !e.isZero(); ) {
                for (var c = 0, p = 1; 0 == (e.words[0] & p) && c < 26; ++c, p <<= 1);
                if (c > 0)
                  for (e.iushrn(c); c-- > 0; )
                    (i.isOdd() || s.isOdd()) && (i.iadd(f), s.isub(l)), i.iushrn(1), s.iushrn(1);
                for (var d = 0, m = 1; 0 == (r.words[0] & m) && d < 26; ++d, m <<= 1);
                if (d > 0)
                  for (r.iushrn(d); d-- > 0; )
                    (h.isOdd() || u.isOdd()) && (h.iadd(f), u.isub(l)), h.iushrn(1), u.iushrn(1);
                e.cmp(r) >= 0 ? (e.isub(r), i.isub(h), s.isub(u)) : (r.isub(e), h.isub(i), u.isub(s));
              }
              return { a: h, b: u, gcd: r.iushln(a) };
            }),
            (o.prototype._invmp = function (t) {
              n(0 === t.negative), n(!t.isZero());
              var e = this,
                r = t.clone();
              e = 0 !== e.negative ? e.umod(t) : e.clone();
              for (var i, s = new o(1), h = new o(0), u = r.clone(); e.cmpn(1) > 0 && r.cmpn(1) > 0; ) {
                for (var a = 0, f = 1; 0 == (e.words[0] & f) && a < 26; ++a, f <<= 1);
                if (a > 0) for (e.iushrn(a); a-- > 0; ) s.isOdd() && s.iadd(u), s.iushrn(1);
                for (var l = 0, c = 1; 0 == (r.words[0] & c) && l < 26; ++l, c <<= 1);
                if (l > 0) for (r.iushrn(l); l-- > 0; ) h.isOdd() && h.iadd(u), h.iushrn(1);
                e.cmp(r) >= 0 ? (e.isub(r), s.isub(h)) : (r.isub(e), h.isub(s));
              }
              return (i = 0 === e.cmpn(1) ? s : h).cmpn(0) < 0 && i.iadd(t), i;
            }),
            (o.prototype.gcd = function (t) {
              if (this.isZero()) return t.abs();
              if (t.isZero()) return this.abs();
              var e = this.clone(),
                r = t.clone();
              (e.negative = 0), (r.negative = 0);
              for (var n = 0; e.isEven() && r.isEven(); n++) e.iushrn(1), r.iushrn(1);
              for (;;) {
                for (; e.isEven(); ) e.iushrn(1);
                for (; r.isEven(); ) r.iushrn(1);
                var i = e.cmp(r);
                if (i < 0) {
                  var o = e;
                  (e = r), (r = o);
                } else if (0 === i || 0 === r.cmpn(1)) break;
                e.isub(r);
              }
              return r.iushln(n);
            }),
            (o.prototype.invm = function (t) {
              return this.egcd(t).a.umod(t);
            }),
            (o.prototype.isEven = function () {
              return 0 == (1 & this.words[0]);
            }),
            (o.prototype.isOdd = function () {
              return 1 == (1 & this.words[0]);
            }),
            (o.prototype.andln = function (t) {
              return this.words[0] & t;
            }),
            (o.prototype.bincn = function (t) {
              n('number' == typeof t);
              var e = t % 26,
                r = (t - e) / 26,
                i = 1 << e;
              if (this.length <= r) return this._expand(r + 1), (this.words[r] |= i), this;
              for (var o = i, s = r; 0 !== o && s < this.length; s++) {
                var h = 0 | this.words[s];
                (o = (h += o) >>> 26), (h &= 67108863), (this.words[s] = h);
              }
              return 0 !== o && ((this.words[s] = o), this.length++), this;
            }),
            (o.prototype.isZero = function () {
              return 1 === this.length && 0 === this.words[0];
            }),
            (o.prototype.cmpn = function (t) {
              var e,
                r = t < 0;
              if (0 !== this.negative && !r) return -1;
              if (0 === this.negative && r) return 1;
              if ((this._strip(), this.length > 1)) e = 1;
              else {
                r && (t = -t), n(t <= 67108863, 'Number is too big');
                var i = 0 | this.words[0];
                e = i === t ? 0 : i < t ? -1 : 1;
              }
              return 0 !== this.negative ? 0 | -e : e;
            }),
            (o.prototype.cmp = function (t) {
              if (0 !== this.negative && 0 === t.negative) return -1;
              if (0 === this.negative && 0 !== t.negative) return 1;
              var e = this.ucmp(t);
              return 0 !== this.negative ? 0 | -e : e;
            }),
            (o.prototype.ucmp = function (t) {
              if (this.length > t.length) return 1;
              if (this.length < t.length) return -1;
              for (var e = 0, r = this.length - 1; r >= 0; r--) {
                var n = 0 | this.words[r],
                  i = 0 | t.words[r];
                if (n !== i) {
                  n < i ? (e = -1) : n > i && (e = 1);
                  break;
                }
              }
              return e;
            }),
            (o.prototype.gtn = function (t) {
              return 1 === this.cmpn(t);
            }),
            (o.prototype.gt = function (t) {
              return 1 === this.cmp(t);
            }),
            (o.prototype.gten = function (t) {
              return this.cmpn(t) >= 0;
            }),
            (o.prototype.gte = function (t) {
              return this.cmp(t) >= 0;
            }),
            (o.prototype.ltn = function (t) {
              return -1 === this.cmpn(t);
            }),
            (o.prototype.lt = function (t) {
              return -1 === this.cmp(t);
            }),
            (o.prototype.lten = function (t) {
              return this.cmpn(t) <= 0;
            }),
            (o.prototype.lte = function (t) {
              return this.cmp(t) <= 0;
            }),
            (o.prototype.eqn = function (t) {
              return 0 === this.cmpn(t);
            }),
            (o.prototype.eq = function (t) {
              return 0 === this.cmp(t);
            }),
            (o.red = function (t) {
              return new I(t);
            }),
            (o.prototype.toRed = function (t) {
              return (
                n(!this.red, 'Already a number in reduction context'),
                n(0 === this.negative, 'red works only with positives'),
                t.convertTo(this)._forceRed(t)
              );
            }),
            (o.prototype.fromRed = function () {
              return n(this.red, 'fromRed works only with numbers in reduction context'), this.red.convertFrom(this);
            }),
            (o.prototype._forceRed = function (t) {
              return (this.red = t), this;
            }),
            (o.prototype.forceRed = function (t) {
              return n(!this.red, 'Already a number in reduction context'), this._forceRed(t);
            }),
            (o.prototype.redAdd = function (t) {
              return n(this.red, 'redAdd works only with red numbers'), this.red.add(this, t);
            }),
            (o.prototype.redIAdd = function (t) {
              return n(this.red, 'redIAdd works only with red numbers'), this.red.iadd(this, t);
            }),
            (o.prototype.redSub = function (t) {
              return n(this.red, 'redSub works only with red numbers'), this.red.sub(this, t);
            }),
            (o.prototype.redISub = function (t) {
              return n(this.red, 'redISub works only with red numbers'), this.red.isub(this, t);
            }),
            (o.prototype.redShl = function (t) {
              return n(this.red, 'redShl works only with red numbers'), this.red.shl(this, t);
            }),
            (o.prototype.redMul = function (t) {
              return (
                n(this.red, 'redMul works only with red numbers'), this.red._verify2(this, t), this.red.mul(this, t)
              );
            }),
            (o.prototype.redIMul = function (t) {
              return (
                n(this.red, 'redMul works only with red numbers'), this.red._verify2(this, t), this.red.imul(this, t)
              );
            }),
            (o.prototype.redSqr = function () {
              return n(this.red, 'redSqr works only with red numbers'), this.red._verify1(this), this.red.sqr(this);
            }),
            (o.prototype.redISqr = function () {
              return n(this.red, 'redISqr works only with red numbers'), this.red._verify1(this), this.red.isqr(this);
            }),
            (o.prototype.redSqrt = function () {
              return n(this.red, 'redSqrt works only with red numbers'), this.red._verify1(this), this.red.sqrt(this);
            }),
            (o.prototype.redInvm = function () {
              return n(this.red, 'redInvm works only with red numbers'), this.red._verify1(this), this.red.invm(this);
            }),
            (o.prototype.redNeg = function () {
              return n(this.red, 'redNeg works only with red numbers'), this.red._verify1(this), this.red.neg(this);
            }),
            (o.prototype.redPow = function (t) {
              return n(this.red && !t.red, 'redPow(normalNum)'), this.red._verify1(this), this.red.pow(this, t);
            });
          var M = { k256: null, p224: null, p192: null, p25519: null };
          function E(t, e) {
            (this.name = t),
              (this.p = new o(e, 16)),
              (this.n = this.p.bitLength()),
              (this.k = new o(1).iushln(this.n).isub(this.p)),
              (this.tmp = this._tmp());
          }
          function b() {
            E.call(this, 'k256', 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
          }
          function _() {
            E.call(this, 'p224', 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
          }
          function A() {
            E.call(this, 'p192', 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
          }
          function N() {
            E.call(this, '25519', '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
          }
          function I(t) {
            if ('string' == typeof t) {
              var e = o._prime(t);
              (this.m = e.p), (this.prime = e);
            } else n(t.gtn(1), 'modulus must be greater than 1'), (this.m = t), (this.prime = null);
          }
          function R(t) {
            I.call(this, t),
              (this.shift = this.m.bitLength()),
              this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
              (this.r = new o(1).iushln(this.shift)),
              (this.r2 = this.imod(this.r.sqr())),
              (this.rinv = this.r._invmp(this.m)),
              (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
              (this.minv = this.minv.umod(this.r)),
              (this.minv = this.r.sub(this.minv));
          }
          (E.prototype._tmp = function () {
            var t = new o(null);
            return (t.words = new Array(Math.ceil(this.n / 13))), t;
          }),
            (E.prototype.ireduce = function (t) {
              var e,
                r = t;
              do {
                this.split(r, this.tmp), (e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength());
              } while (e > this.n);
              var n = e < this.n ? -1 : r.ucmp(this.p);
              return (
                0 === n
                  ? ((r.words[0] = 0), (r.length = 1))
                  : n > 0
                  ? r.isub(this.p)
                  : void 0 !== r.strip
                  ? r.strip()
                  : r._strip(),
                r
              );
            }),
            (E.prototype.split = function (t, e) {
              t.iushrn(this.n, 0, e);
            }),
            (E.prototype.imulK = function (t) {
              return t.imul(this.k);
            }),
            i(b, E),
            (b.prototype.split = function (t, e) {
              for (var r = 4194303, n = Math.min(t.length, 9), i = 0; i < n; i++) e.words[i] = t.words[i];
              if (((e.length = n), t.length <= 9)) return (t.words[0] = 0), void (t.length = 1);
              var o = t.words[9];
              for (e.words[e.length++] = o & r, i = 10; i < t.length; i++) {
                var s = 0 | t.words[i];
                (t.words[i - 10] = ((s & r) << 4) | (o >>> 22)), (o = s);
              }
              (o >>>= 22), (t.words[i - 10] = o), 0 === o && t.length > 10 ? (t.length -= 10) : (t.length -= 9);
            }),
            (b.prototype.imulK = function (t) {
              (t.words[t.length] = 0), (t.words[t.length + 1] = 0), (t.length += 2);
              for (var e = 0, r = 0; r < t.length; r++) {
                var n = 0 | t.words[r];
                (e += 977 * n), (t.words[r] = 67108863 & e), (e = 64 * n + ((e / 67108864) | 0));
              }
              return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t;
            }),
            i(_, E),
            i(A, E),
            i(N, E),
            (N.prototype.imulK = function (t) {
              for (var e = 0, r = 0; r < t.length; r++) {
                var n = 19 * (0 | t.words[r]) + e,
                  i = 67108863 & n;
                (n >>>= 26), (t.words[r] = i), (e = n);
              }
              return 0 !== e && (t.words[t.length++] = e), t;
            }),
            (o._prime = function (t) {
              if (M[t]) return M[t];
              var e;
              if ('k256' === t) e = new b();
              else if ('p224' === t) e = new _();
              else if ('p192' === t) e = new A();
              else {
                if ('p25519' !== t) throw new Error('Unknown prime ' + t);
                e = new N();
              }
              return (M[t] = e), e;
            }),
            (I.prototype._verify1 = function (t) {
              n(0 === t.negative, 'red works only with positives'), n(t.red, 'red works only with red numbers');
            }),
            (I.prototype._verify2 = function (t, e) {
              n(0 == (t.negative | e.negative), 'red works only with positives'),
                n(t.red && t.red === e.red, 'red works only with red numbers');
            }),
            (I.prototype.imod = function (t) {
              return this.prime ? this.prime.ireduce(t)._forceRed(this) : (f(t, t.umod(this.m)._forceRed(this)), t);
            }),
            (I.prototype.neg = function (t) {
              return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
            }),
            (I.prototype.add = function (t, e) {
              this._verify2(t, e);
              var r = t.add(e);
              return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this);
            }),
            (I.prototype.iadd = function (t, e) {
              this._verify2(t, e);
              var r = t.iadd(e);
              return r.cmp(this.m) >= 0 && r.isub(this.m), r;
            }),
            (I.prototype.sub = function (t, e) {
              this._verify2(t, e);
              var r = t.sub(e);
              return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this);
            }),
            (I.prototype.isub = function (t, e) {
              this._verify2(t, e);
              var r = t.isub(e);
              return r.cmpn(0) < 0 && r.iadd(this.m), r;
            }),
            (I.prototype.shl = function (t, e) {
              return this._verify1(t), this.imod(t.ushln(e));
            }),
            (I.prototype.imul = function (t, e) {
              return this._verify2(t, e), this.imod(t.imul(e));
            }),
            (I.prototype.mul = function (t, e) {
              return this._verify2(t, e), this.imod(t.mul(e));
            }),
            (I.prototype.isqr = function (t) {
              return this.imul(t, t.clone());
            }),
            (I.prototype.sqr = function (t) {
              return this.mul(t, t);
            }),
            (I.prototype.sqrt = function (t) {
              if (t.isZero()) return t.clone();
              var e = this.m.andln(3);
              if ((n(e % 2 == 1), 3 === e)) {
                var r = this.m.add(new o(1)).iushrn(2);
                return this.pow(t, r);
              }
              for (var i = this.m.subn(1), s = 0; !i.isZero() && 0 === i.andln(1); ) s++, i.iushrn(1);
              n(!i.isZero());
              var h = new o(1).toRed(this),
                u = h.redNeg(),
                a = this.m.subn(1).iushrn(1),
                f = this.m.bitLength();
              for (f = new o(2 * f * f).toRed(this); 0 !== this.pow(f, a).cmp(u); ) f.redIAdd(u);
              for (
                var l = this.pow(f, i), c = this.pow(t, i.addn(1).iushrn(1)), p = this.pow(t, i), d = s;
                0 !== p.cmp(h);

              ) {
                for (var m = p, g = 0; 0 !== m.cmp(h); g++) m = m.redSqr();
                n(g < d);
                var y = this.pow(l, new o(1).iushln(d - g - 1));
                (c = c.redMul(y)), (l = y.redSqr()), (p = p.redMul(l)), (d = g);
              }
              return c;
            }),
            (I.prototype.invm = function (t) {
              var e = t._invmp(this.m);
              return 0 !== e.negative ? ((e.negative = 0), this.imod(e).redNeg()) : this.imod(e);
            }),
            (I.prototype.pow = function (t, e) {
              if (e.isZero()) return new o(1).toRed(this);
              if (0 === e.cmpn(1)) return t.clone();
              var r = new Array(16);
              (r[0] = new o(1).toRed(this)), (r[1] = t);
              for (var n = 2; n < r.length; n++) r[n] = this.mul(r[n - 1], t);
              var i = r[0],
                s = 0,
                h = 0,
                u = e.bitLength() % 26;
              for (0 === u && (u = 26), n = e.length - 1; n >= 0; n--) {
                for (var a = e.words[n], f = u - 1; f >= 0; f--) {
                  var l = (a >> f) & 1;
                  i !== r[0] && (i = this.sqr(i)),
                    0 !== l || 0 !== s
                      ? ((s <<= 1),
                        (s |= l),
                        (4 == ++h || (0 === n && 0 === f)) && ((i = this.mul(i, r[s])), (h = 0), (s = 0)))
                      : (h = 0);
                }
                u = 26;
              }
              return i;
            }),
            (I.prototype.convertTo = function (t) {
              var e = t.umod(this.m);
              return e === t ? e.clone() : e;
            }),
            (I.prototype.convertFrom = function (t) {
              var e = t.clone();
              return (e.red = null), e;
            }),
            (o.mont = function (t) {
              return new R(t);
            }),
            i(R, I),
            (R.prototype.convertTo = function (t) {
              return this.imod(t.ushln(this.shift));
            }),
            (R.prototype.convertFrom = function (t) {
              var e = this.imod(t.mul(this.rinv));
              return (e.red = null), e;
            }),
            (R.prototype.imul = function (t, e) {
              if (t.isZero() || e.isZero()) return (t.words[0] = 0), (t.length = 1), t;
              var r = t.imul(e),
                n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                i = r.isub(n).iushrn(this.shift),
                o = i;
              return (
                i.cmp(this.m) >= 0 ? (o = i.isub(this.m)) : i.cmpn(0) < 0 && (o = i.iadd(this.m)), o._forceRed(this)
              );
            }),
            (R.prototype.mul = function (t, e) {
              if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
              var r = t.mul(e),
                n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                i = r.isub(n).iushrn(this.shift),
                s = i;
              return (
                i.cmp(this.m) >= 0 ? (s = i.isub(this.m)) : i.cmpn(0) < 0 && (s = i.iadd(this.m)), s._forceRed(this)
              );
            }),
            (R.prototype.invm = function (t) {
              return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
            });
        })((t = r.nmd(t)), this);
      },
      834: (t, e, r) => {
        'use strict';
        const n = r(766),
          i = r(333),
          o =
            'function' == typeof Symbol && 'function' == typeof Symbol.for
              ? Symbol.for('nodejs.util.inspect.custom')
              : null;
        (e.lW = u), (e.h2 = 50);
        const s = 2147483647;
        function h(t) {
          if (t > s) throw new RangeError('The value "' + t + '" is invalid for option "size"');
          const e = new Uint8Array(t);
          return Object.setPrototypeOf(e, u.prototype), e;
        }
        function u(t, e, r) {
          if ('number' == typeof t) {
            if ('string' == typeof e)
              throw new TypeError('The "string" argument must be of type string. Received type number');
            return l(t);
          }
          return a(t, e, r);
        }
        function a(t, e, r) {
          if ('string' == typeof t)
            return (function (t, e) {
              if ((('string' == typeof e && '' !== e) || (e = 'utf8'), !u.isEncoding(e)))
                throw new TypeError('Unknown encoding: ' + e);
              const r = 0 | m(t, e);
              let n = h(r);
              const i = n.write(t, e);
              return i !== r && (n = n.slice(0, i)), n;
            })(t, e);
          if (ArrayBuffer.isView(t))
            return (function (t) {
              if (z(t, Uint8Array)) {
                const e = new Uint8Array(t);
                return p(e.buffer, e.byteOffset, e.byteLength);
              }
              return c(t);
            })(t);
          if (null == t)
            throw new TypeError(
              'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
                typeof t,
            );
          if (z(t, ArrayBuffer) || (t && z(t.buffer, ArrayBuffer))) return p(t, e, r);
          if (
            'undefined' != typeof SharedArrayBuffer &&
            (z(t, SharedArrayBuffer) || (t && z(t.buffer, SharedArrayBuffer)))
          )
            return p(t, e, r);
          if ('number' == typeof t)
            throw new TypeError('The "value" argument must not be of type number. Received type number');
          const n = t.valueOf && t.valueOf();
          if (null != n && n !== t) return u.from(n, e, r);
          const i = (function (t) {
            if (u.isBuffer(t)) {
              const e = 0 | d(t.length),
                r = h(e);
              return 0 === r.length || t.copy(r, 0, 0, e), r;
            }
            return void 0 !== t.length
              ? 'number' != typeof t.length || X(t.length)
                ? h(0)
                : c(t)
              : 'Buffer' === t.type && Array.isArray(t.data)
              ? c(t.data)
              : void 0;
          })(t);
          if (i) return i;
          if ('undefined' != typeof Symbol && null != Symbol.toPrimitive && 'function' == typeof t[Symbol.toPrimitive])
            return u.from(t[Symbol.toPrimitive]('string'), e, r);
          throw new TypeError(
            'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
              typeof t,
          );
        }
        function f(t) {
          if ('number' != typeof t) throw new TypeError('"size" argument must be of type number');
          if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"');
        }
        function l(t) {
          return f(t), h(t < 0 ? 0 : 0 | d(t));
        }
        function c(t) {
          const e = t.length < 0 ? 0 : 0 | d(t.length),
            r = h(e);
          for (let n = 0; n < e; n += 1) r[n] = 255 & t[n];
          return r;
        }
        function p(t, e, r) {
          if (e < 0 || t.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
          if (t.byteLength < e + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
          let n;
          return (
            (n =
              void 0 === e && void 0 === r
                ? new Uint8Array(t)
                : void 0 === r
                ? new Uint8Array(t, e)
                : new Uint8Array(t, e, r)),
            Object.setPrototypeOf(n, u.prototype),
            n
          );
        }
        function d(t) {
          if (t >= s)
            throw new RangeError('Attempt to allocate Buffer larger than maximum size: 0x' + s.toString(16) + ' bytes');
          return 0 | t;
        }
        function m(t, e) {
          if (u.isBuffer(t)) return t.length;
          if (ArrayBuffer.isView(t) || z(t, ArrayBuffer)) return t.byteLength;
          if ('string' != typeof t)
            throw new TypeError(
              'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t,
            );
          const r = t.length,
            n = arguments.length > 2 && !0 === arguments[2];
          if (!n && 0 === r) return 0;
          let i = !1;
          for (;;)
            switch (e) {
              case 'ascii':
              case 'latin1':
              case 'binary':
                return r;
              case 'utf8':
              case 'utf-8':
                return W(t).length;
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return 2 * r;
              case 'hex':
                return r >>> 1;
              case 'base64':
                return H(t).length;
              default:
                if (i) return n ? -1 : W(t).length;
                (e = ('' + e).toLowerCase()), (i = !0);
            }
        }
        function g(t, e, r) {
          let n = !1;
          if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return '';
          if (((void 0 === r || r > this.length) && (r = this.length), r <= 0)) return '';
          if ((r >>>= 0) <= (e >>>= 0)) return '';
          for (t || (t = 'utf8'); ; )
            switch (t) {
              case 'hex':
                return S(this, e, r);
              case 'utf8':
              case 'utf-8':
                return I(this, e, r);
              case 'ascii':
                return T(this, e, r);
              case 'latin1':
              case 'binary':
                return O(this, e, r);
              case 'base64':
                return N(this, e, r);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return L(this, e, r);
              default:
                if (n) throw new TypeError('Unknown encoding: ' + t);
                (t = (t + '').toLowerCase()), (n = !0);
            }
        }
        function y(t, e, r) {
          const n = t[e];
          (t[e] = t[r]), (t[r] = n);
        }
        function v(t, e, r, n, i) {
          if (0 === t.length) return -1;
          if (
            ('string' == typeof r
              ? ((n = r), (r = 0))
              : r > 2147483647
              ? (r = 2147483647)
              : r < -2147483648 && (r = -2147483648),
            X((r = +r)) && (r = i ? 0 : t.length - 1),
            r < 0 && (r = t.length + r),
            r >= t.length)
          ) {
            if (i) return -1;
            r = t.length - 1;
          } else if (r < 0) {
            if (!i) return -1;
            r = 0;
          }
          if (('string' == typeof e && (e = u.from(e, n)), u.isBuffer(e)))
            return 0 === e.length ? -1 : w(t, e, r, n, i);
          if ('number' == typeof e)
            return (
              (e &= 255),
              'function' == typeof Uint8Array.prototype.indexOf
                ? i
                  ? Uint8Array.prototype.indexOf.call(t, e, r)
                  : Uint8Array.prototype.lastIndexOf.call(t, e, r)
                : w(t, [e], r, n, i)
            );
          throw new TypeError('val must be string, number or Buffer');
        }
        function w(t, e, r, n, i) {
          let o,
            s = 1,
            h = t.length,
            u = e.length;
          if (
            void 0 !== n &&
            ('ucs2' === (n = String(n).toLowerCase()) || 'ucs-2' === n || 'utf16le' === n || 'utf-16le' === n)
          ) {
            if (t.length < 2 || e.length < 2) return -1;
            (s = 2), (h /= 2), (u /= 2), (r /= 2);
          }
          function a(t, e) {
            return 1 === s ? t[e] : t.readUInt16BE(e * s);
          }
          if (i) {
            let n = -1;
            for (o = r; o < h; o++)
              if (a(t, o) === a(e, -1 === n ? 0 : o - n)) {
                if ((-1 === n && (n = o), o - n + 1 === u)) return n * s;
              } else -1 !== n && (o -= o - n), (n = -1);
          } else
            for (r + u > h && (r = h - u), o = r; o >= 0; o--) {
              let r = !0;
              for (let n = 0; n < u; n++)
                if (a(t, o + n) !== a(e, n)) {
                  r = !1;
                  break;
                }
              if (r) return o;
            }
          return -1;
        }
        function M(t, e, r, n) {
          r = Number(r) || 0;
          const i = t.length - r;
          n ? (n = Number(n)) > i && (n = i) : (n = i);
          const o = e.length;
          let s;
          for (n > o / 2 && (n = o / 2), s = 0; s < n; ++s) {
            const n = parseInt(e.substr(2 * s, 2), 16);
            if (X(n)) return s;
            t[r + s] = n;
          }
          return s;
        }
        function E(t, e, r, n) {
          return Z(W(e, t.length - r), t, r, n);
        }
        function b(t, e, r, n) {
          return Z(
            (function (t) {
              const e = [];
              for (let r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));
              return e;
            })(e),
            t,
            r,
            n,
          );
        }
        function _(t, e, r, n) {
          return Z(H(e), t, r, n);
        }
        function A(t, e, r, n) {
          return Z(
            (function (t, e) {
              let r, n, i;
              const o = [];
              for (let s = 0; s < t.length && !((e -= 2) < 0); ++s)
                (r = t.charCodeAt(s)), (n = r >> 8), (i = r % 256), o.push(i), o.push(n);
              return o;
            })(e, t.length - r),
            t,
            r,
            n,
          );
        }
        function N(t, e, r) {
          return 0 === e && r === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(e, r));
        }
        function I(t, e, r) {
          r = Math.min(t.length, r);
          const n = [];
          let i = e;
          for (; i < r; ) {
            const e = t[i];
            let o = null,
              s = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
            if (i + s <= r) {
              let r, n, h, u;
              switch (s) {
                case 1:
                  e < 128 && (o = e);
                  break;
                case 2:
                  (r = t[i + 1]), 128 == (192 & r) && ((u = ((31 & e) << 6) | (63 & r)), u > 127 && (o = u));
                  break;
                case 3:
                  (r = t[i + 1]),
                    (n = t[i + 2]),
                    128 == (192 & r) &&
                      128 == (192 & n) &&
                      ((u = ((15 & e) << 12) | ((63 & r) << 6) | (63 & n)),
                      u > 2047 && (u < 55296 || u > 57343) && (o = u));
                  break;
                case 4:
                  (r = t[i + 1]),
                    (n = t[i + 2]),
                    (h = t[i + 3]),
                    128 == (192 & r) &&
                      128 == (192 & n) &&
                      128 == (192 & h) &&
                      ((u = ((15 & e) << 18) | ((63 & r) << 12) | ((63 & n) << 6) | (63 & h)),
                      u > 65535 && u < 1114112 && (o = u));
              }
            }
            null === o
              ? ((o = 65533), (s = 1))
              : o > 65535 && ((o -= 65536), n.push(((o >>> 10) & 1023) | 55296), (o = 56320 | (1023 & o))),
              n.push(o),
              (i += s);
          }
          return (function (t) {
            const e = t.length;
            if (e <= R) return String.fromCharCode.apply(String, t);
            let r = '',
              n = 0;
            for (; n < e; ) r += String.fromCharCode.apply(String, t.slice(n, (n += R)));
            return r;
          })(n);
        }
        (u.TYPED_ARRAY_SUPPORT = (function () {
          try {
            const t = new Uint8Array(1),
              e = {
                foo: function () {
                  return 42;
                },
              };
            return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(t, e), 42 === t.foo();
          } catch (t) {
            return !1;
          }
        })()),
          u.TYPED_ARRAY_SUPPORT ||
            'undefined' == typeof console ||
            'function' != typeof console.error ||
            console.error(
              'This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.',
            ),
          Object.defineProperty(u.prototype, 'parent', {
            enumerable: !0,
            get: function () {
              if (u.isBuffer(this)) return this.buffer;
            },
          }),
          Object.defineProperty(u.prototype, 'offset', {
            enumerable: !0,
            get: function () {
              if (u.isBuffer(this)) return this.byteOffset;
            },
          }),
          (u.poolSize = 8192),
          (u.from = function (t, e, r) {
            return a(t, e, r);
          }),
          Object.setPrototypeOf(u.prototype, Uint8Array.prototype),
          Object.setPrototypeOf(u, Uint8Array),
          (u.alloc = function (t, e, r) {
            return (function (t, e, r) {
              return (
                f(t), t <= 0 ? h(t) : void 0 !== e ? ('string' == typeof r ? h(t).fill(e, r) : h(t).fill(e)) : h(t)
              );
            })(t, e, r);
          }),
          (u.allocUnsafe = function (t) {
            return l(t);
          }),
          (u.allocUnsafeSlow = function (t) {
            return l(t);
          }),
          (u.isBuffer = function (t) {
            return null != t && !0 === t._isBuffer && t !== u.prototype;
          }),
          (u.compare = function (t, e) {
            if (
              (z(t, Uint8Array) && (t = u.from(t, t.offset, t.byteLength)),
              z(e, Uint8Array) && (e = u.from(e, e.offset, e.byteLength)),
              !u.isBuffer(t) || !u.isBuffer(e))
            )
              throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            if (t === e) return 0;
            let r = t.length,
              n = e.length;
            for (let i = 0, o = Math.min(r, n); i < o; ++i)
              if (t[i] !== e[i]) {
                (r = t[i]), (n = e[i]);
                break;
              }
            return r < n ? -1 : n < r ? 1 : 0;
          }),
          (u.isEncoding = function (t) {
            switch (String(t).toLowerCase()) {
              case 'hex':
              case 'utf8':
              case 'utf-8':
              case 'ascii':
              case 'latin1':
              case 'binary':
              case 'base64':
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return !0;
              default:
                return !1;
            }
          }),
          (u.concat = function (t, e) {
            if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === t.length) return u.alloc(0);
            let r;
            if (void 0 === e) for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
            const n = u.allocUnsafe(e);
            let i = 0;
            for (r = 0; r < t.length; ++r) {
              let e = t[r];
              if (z(e, Uint8Array))
                i + e.length > n.length
                  ? (u.isBuffer(e) || (e = u.from(e)), e.copy(n, i))
                  : Uint8Array.prototype.set.call(n, e, i);
              else {
                if (!u.isBuffer(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                e.copy(n, i);
              }
              i += e.length;
            }
            return n;
          }),
          (u.byteLength = m),
          (u.prototype._isBuffer = !0),
          (u.prototype.swap16 = function () {
            const t = this.length;
            if (t % 2 != 0) throw new RangeError('Buffer size must be a multiple of 16-bits');
            for (let e = 0; e < t; e += 2) y(this, e, e + 1);
            return this;
          }),
          (u.prototype.swap32 = function () {
            const t = this.length;
            if (t % 4 != 0) throw new RangeError('Buffer size must be a multiple of 32-bits');
            for (let e = 0; e < t; e += 4) y(this, e, e + 3), y(this, e + 1, e + 2);
            return this;
          }),
          (u.prototype.swap64 = function () {
            const t = this.length;
            if (t % 8 != 0) throw new RangeError('Buffer size must be a multiple of 64-bits');
            for (let e = 0; e < t; e += 8)
              y(this, e, e + 7), y(this, e + 1, e + 6), y(this, e + 2, e + 5), y(this, e + 3, e + 4);
            return this;
          }),
          (u.prototype.toString = function () {
            const t = this.length;
            return 0 === t ? '' : 0 === arguments.length ? I(this, 0, t) : g.apply(this, arguments);
          }),
          (u.prototype.toLocaleString = u.prototype.toString),
          (u.prototype.equals = function (t) {
            if (!u.isBuffer(t)) throw new TypeError('Argument must be a Buffer');
            return this === t || 0 === u.compare(this, t);
          }),
          (u.prototype.inspect = function () {
            let t = '';
            const r = e.h2;
            return (
              (t = this.toString('hex', 0, r)
                .replace(/(.{2})/g, '$1 ')
                .trim()),
              this.length > r && (t += ' ... '),
              '<Buffer ' + t + '>'
            );
          }),
          o && (u.prototype[o] = u.prototype.inspect),
          (u.prototype.compare = function (t, e, r, n, i) {
            if ((z(t, Uint8Array) && (t = u.from(t, t.offset, t.byteLength)), !u.isBuffer(t)))
              throw new TypeError(
                'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t,
              );
            if (
              (void 0 === e && (e = 0),
              void 0 === r && (r = t ? t.length : 0),
              void 0 === n && (n = 0),
              void 0 === i && (i = this.length),
              e < 0 || r > t.length || n < 0 || i > this.length)
            )
              throw new RangeError('out of range index');
            if (n >= i && e >= r) return 0;
            if (n >= i) return -1;
            if (e >= r) return 1;
            if (this === t) return 0;
            let o = (i >>>= 0) - (n >>>= 0),
              s = (r >>>= 0) - (e >>>= 0);
            const h = Math.min(o, s),
              a = this.slice(n, i),
              f = t.slice(e, r);
            for (let t = 0; t < h; ++t)
              if (a[t] !== f[t]) {
                (o = a[t]), (s = f[t]);
                break;
              }
            return o < s ? -1 : s < o ? 1 : 0;
          }),
          (u.prototype.includes = function (t, e, r) {
            return -1 !== this.indexOf(t, e, r);
          }),
          (u.prototype.indexOf = function (t, e, r) {
            return v(this, t, e, r, !0);
          }),
          (u.prototype.lastIndexOf = function (t, e, r) {
            return v(this, t, e, r, !1);
          }),
          (u.prototype.write = function (t, e, r, n) {
            if (void 0 === e) (n = 'utf8'), (r = this.length), (e = 0);
            else if (void 0 === r && 'string' == typeof e) (n = e), (r = this.length), (e = 0);
            else {
              if (!isFinite(e))
                throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
              (e >>>= 0), isFinite(r) ? ((r >>>= 0), void 0 === n && (n = 'utf8')) : ((n = r), (r = void 0));
            }
            const i = this.length - e;
            if (((void 0 === r || r > i) && (r = i), (t.length > 0 && (r < 0 || e < 0)) || e > this.length))
              throw new RangeError('Attempt to write outside buffer bounds');
            n || (n = 'utf8');
            let o = !1;
            for (;;)
              switch (n) {
                case 'hex':
                  return M(this, t, e, r);
                case 'utf8':
                case 'utf-8':
                  return E(this, t, e, r);
                case 'ascii':
                case 'latin1':
                case 'binary':
                  return b(this, t, e, r);
                case 'base64':
                  return _(this, t, e, r);
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return A(this, t, e, r);
                default:
                  if (o) throw new TypeError('Unknown encoding: ' + n);
                  (n = ('' + n).toLowerCase()), (o = !0);
              }
          }),
          (u.prototype.toJSON = function () {
            return { type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0) };
          });
        const R = 4096;
        function T(t, e, r) {
          let n = '';
          r = Math.min(t.length, r);
          for (let i = e; i < r; ++i) n += String.fromCharCode(127 & t[i]);
          return n;
        }
        function O(t, e, r) {
          let n = '';
          r = Math.min(t.length, r);
          for (let i = e; i < r; ++i) n += String.fromCharCode(t[i]);
          return n;
        }
        function S(t, e, r) {
          const n = t.length;
          (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
          let i = '';
          for (let n = e; n < r; ++n) i += J[t[n]];
          return i;
        }
        function L(t, e, r) {
          const n = t.slice(e, r);
          let i = '';
          for (let t = 0; t < n.length - 1; t += 2) i += String.fromCharCode(n[t] + 256 * n[t + 1]);
          return i;
        }
        function B(t, e, r) {
          if (t % 1 != 0 || t < 0) throw new RangeError('offset is not uint');
          if (t + e > r) throw new RangeError('Trying to access beyond buffer length');
        }
        function U(t, e, r, n, i, o) {
          if (!u.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
          if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
          if (r + n > t.length) throw new RangeError('Index out of range');
        }
        function C(t, e, r, n, i) {
          K(e, n, i, t, r, 7);
          let o = Number(e & BigInt(4294967295));
          (t[r++] = o), (o >>= 8), (t[r++] = o), (o >>= 8), (t[r++] = o), (o >>= 8), (t[r++] = o);
          let s = Number((e >> BigInt(32)) & BigInt(4294967295));
          return (t[r++] = s), (s >>= 8), (t[r++] = s), (s >>= 8), (t[r++] = s), (s >>= 8), (t[r++] = s), r;
        }
        function D(t, e, r, n, i) {
          K(e, n, i, t, r, 7);
          let o = Number(e & BigInt(4294967295));
          (t[r + 7] = o), (o >>= 8), (t[r + 6] = o), (o >>= 8), (t[r + 5] = o), (o >>= 8), (t[r + 4] = o);
          let s = Number((e >> BigInt(32)) & BigInt(4294967295));
          return (t[r + 3] = s), (s >>= 8), (t[r + 2] = s), (s >>= 8), (t[r + 1] = s), (s >>= 8), (t[r] = s), r + 8;
        }
        function x(t, e, r, n, i, o) {
          if (r + n > t.length) throw new RangeError('Index out of range');
          if (r < 0) throw new RangeError('Index out of range');
        }
        function P(t, e, r, n, o) {
          return (e = +e), (r >>>= 0), o || x(t, 0, r, 4), i.write(t, e, r, n, 23, 4), r + 4;
        }
        function k(t, e, r, n, o) {
          return (e = +e), (r >>>= 0), o || x(t, 0, r, 8), i.write(t, e, r, n, 52, 8), r + 8;
        }
        (u.prototype.slice = function (t, e) {
          const r = this.length;
          (t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
            (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
            e < t && (e = t);
          const n = this.subarray(t, e);
          return Object.setPrototypeOf(n, u.prototype), n;
        }),
          (u.prototype.readUintLE = u.prototype.readUIntLE =
            function (t, e, r) {
              (t >>>= 0), (e >>>= 0), r || B(t, e, this.length);
              let n = this[t],
                i = 1,
                o = 0;
              for (; ++o < e && (i *= 256); ) n += this[t + o] * i;
              return n;
            }),
          (u.prototype.readUintBE = u.prototype.readUIntBE =
            function (t, e, r) {
              (t >>>= 0), (e >>>= 0), r || B(t, e, this.length);
              let n = this[t + --e],
                i = 1;
              for (; e > 0 && (i *= 256); ) n += this[t + --e] * i;
              return n;
            }),
          (u.prototype.readUint8 = u.prototype.readUInt8 =
            function (t, e) {
              return (t >>>= 0), e || B(t, 1, this.length), this[t];
            }),
          (u.prototype.readUint16LE = u.prototype.readUInt16LE =
            function (t, e) {
              return (t >>>= 0), e || B(t, 2, this.length), this[t] | (this[t + 1] << 8);
            }),
          (u.prototype.readUint16BE = u.prototype.readUInt16BE =
            function (t, e) {
              return (t >>>= 0), e || B(t, 2, this.length), (this[t] << 8) | this[t + 1];
            }),
          (u.prototype.readUint32LE = u.prototype.readUInt32LE =
            function (t, e) {
              return (
                (t >>>= 0),
                e || B(t, 4, this.length),
                (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) + 16777216 * this[t + 3]
              );
            }),
          (u.prototype.readUint32BE = u.prototype.readUInt32BE =
            function (t, e) {
              return (
                (t >>>= 0),
                e || B(t, 4, this.length),
                16777216 * this[t] + ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
              );
            }),
          (u.prototype.readBigUInt64LE = Y(function (t) {
            F((t >>>= 0), 'offset');
            const e = this[t],
              r = this[t + 7];
            (void 0 !== e && void 0 !== r) || V(t, this.length - 8);
            const n = e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24,
              i = this[++t] + 256 * this[++t] + 65536 * this[++t] + r * 2 ** 24;
            return BigInt(n) + (BigInt(i) << BigInt(32));
          })),
          (u.prototype.readBigUInt64BE = Y(function (t) {
            F((t >>>= 0), 'offset');
            const e = this[t],
              r = this[t + 7];
            (void 0 !== e && void 0 !== r) || V(t, this.length - 8);
            const n = e * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + this[++t],
              i = this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + r;
            return (BigInt(n) << BigInt(32)) + BigInt(i);
          })),
          (u.prototype.readIntLE = function (t, e, r) {
            (t >>>= 0), (e >>>= 0), r || B(t, e, this.length);
            let n = this[t],
              i = 1,
              o = 0;
            for (; ++o < e && (i *= 256); ) n += this[t + o] * i;
            return (i *= 128), n >= i && (n -= Math.pow(2, 8 * e)), n;
          }),
          (u.prototype.readIntBE = function (t, e, r) {
            (t >>>= 0), (e >>>= 0), r || B(t, e, this.length);
            let n = e,
              i = 1,
              o = this[t + --n];
            for (; n > 0 && (i *= 256); ) o += this[t + --n] * i;
            return (i *= 128), o >= i && (o -= Math.pow(2, 8 * e)), o;
          }),
          (u.prototype.readInt8 = function (t, e) {
            return (t >>>= 0), e || B(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
          }),
          (u.prototype.readInt16LE = function (t, e) {
            (t >>>= 0), e || B(t, 2, this.length);
            const r = this[t] | (this[t + 1] << 8);
            return 32768 & r ? 4294901760 | r : r;
          }),
          (u.prototype.readInt16BE = function (t, e) {
            (t >>>= 0), e || B(t, 2, this.length);
            const r = this[t + 1] | (this[t] << 8);
            return 32768 & r ? 4294901760 | r : r;
          }),
          (u.prototype.readInt32LE = function (t, e) {
            return (
              (t >>>= 0),
              e || B(t, 4, this.length),
              this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
            );
          }),
          (u.prototype.readInt32BE = function (t, e) {
            return (
              (t >>>= 0),
              e || B(t, 4, this.length),
              (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
            );
          }),
          (u.prototype.readBigInt64LE = Y(function (t) {
            F((t >>>= 0), 'offset');
            const e = this[t],
              r = this[t + 7];
            (void 0 !== e && void 0 !== r) || V(t, this.length - 8);
            const n = this[t + 4] + 256 * this[t + 5] + 65536 * this[t + 6] + (r << 24);
            return (BigInt(n) << BigInt(32)) + BigInt(e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24);
          })),
          (u.prototype.readBigInt64BE = Y(function (t) {
            F((t >>>= 0), 'offset');
            const e = this[t],
              r = this[t + 7];
            (void 0 !== e && void 0 !== r) || V(t, this.length - 8);
            const n = (e << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t];
            return (BigInt(n) << BigInt(32)) + BigInt(this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + r);
          })),
          (u.prototype.readFloatLE = function (t, e) {
            return (t >>>= 0), e || B(t, 4, this.length), i.read(this, t, !0, 23, 4);
          }),
          (u.prototype.readFloatBE = function (t, e) {
            return (t >>>= 0), e || B(t, 4, this.length), i.read(this, t, !1, 23, 4);
          }),
          (u.prototype.readDoubleLE = function (t, e) {
            return (t >>>= 0), e || B(t, 8, this.length), i.read(this, t, !0, 52, 8);
          }),
          (u.prototype.readDoubleBE = function (t, e) {
            return (t >>>= 0), e || B(t, 8, this.length), i.read(this, t, !1, 52, 8);
          }),
          (u.prototype.writeUintLE = u.prototype.writeUIntLE =
            function (t, e, r, n) {
              (t = +t), (e >>>= 0), (r >>>= 0), n || U(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
              let i = 1,
                o = 0;
              for (this[e] = 255 & t; ++o < r && (i *= 256); ) this[e + o] = (t / i) & 255;
              return e + r;
            }),
          (u.prototype.writeUintBE = u.prototype.writeUIntBE =
            function (t, e, r, n) {
              (t = +t), (e >>>= 0), (r >>>= 0), n || U(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
              let i = r - 1,
                o = 1;
              for (this[e + i] = 255 & t; --i >= 0 && (o *= 256); ) this[e + i] = (t / o) & 255;
              return e + r;
            }),
          (u.prototype.writeUint8 = u.prototype.writeUInt8 =
            function (t, e, r) {
              return (t = +t), (e >>>= 0), r || U(this, t, e, 1, 255, 0), (this[e] = 255 & t), e + 1;
            }),
          (u.prototype.writeUint16LE = u.prototype.writeUInt16LE =
            function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || U(this, t, e, 2, 65535, 0),
                (this[e] = 255 & t),
                (this[e + 1] = t >>> 8),
                e + 2
              );
            }),
          (u.prototype.writeUint16BE = u.prototype.writeUInt16BE =
            function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || U(this, t, e, 2, 65535, 0),
                (this[e] = t >>> 8),
                (this[e + 1] = 255 & t),
                e + 2
              );
            }),
          (u.prototype.writeUint32LE = u.prototype.writeUInt32LE =
            function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || U(this, t, e, 4, 4294967295, 0),
                (this[e + 3] = t >>> 24),
                (this[e + 2] = t >>> 16),
                (this[e + 1] = t >>> 8),
                (this[e] = 255 & t),
                e + 4
              );
            }),
          (u.prototype.writeUint32BE = u.prototype.writeUInt32BE =
            function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || U(this, t, e, 4, 4294967295, 0),
                (this[e] = t >>> 24),
                (this[e + 1] = t >>> 16),
                (this[e + 2] = t >>> 8),
                (this[e + 3] = 255 & t),
                e + 4
              );
            }),
          (u.prototype.writeBigUInt64LE = Y(function (t, e = 0) {
            return C(this, t, e, BigInt(0), BigInt('0xffffffffffffffff'));
          })),
          (u.prototype.writeBigUInt64BE = Y(function (t, e = 0) {
            return D(this, t, e, BigInt(0), BigInt('0xffffffffffffffff'));
          })),
          (u.prototype.writeIntLE = function (t, e, r, n) {
            if (((t = +t), (e >>>= 0), !n)) {
              const n = Math.pow(2, 8 * r - 1);
              U(this, t, e, r, n - 1, -n);
            }
            let i = 0,
              o = 1,
              s = 0;
            for (this[e] = 255 & t; ++i < r && (o *= 256); )
              t < 0 && 0 === s && 0 !== this[e + i - 1] && (s = 1), (this[e + i] = (((t / o) >> 0) - s) & 255);
            return e + r;
          }),
          (u.prototype.writeIntBE = function (t, e, r, n) {
            if (((t = +t), (e >>>= 0), !n)) {
              const n = Math.pow(2, 8 * r - 1);
              U(this, t, e, r, n - 1, -n);
            }
            let i = r - 1,
              o = 1,
              s = 0;
            for (this[e + i] = 255 & t; --i >= 0 && (o *= 256); )
              t < 0 && 0 === s && 0 !== this[e + i + 1] && (s = 1), (this[e + i] = (((t / o) >> 0) - s) & 255);
            return e + r;
          }),
          (u.prototype.writeInt8 = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || U(this, t, e, 1, 127, -128),
              t < 0 && (t = 255 + t + 1),
              (this[e] = 255 & t),
              e + 1
            );
          }),
          (u.prototype.writeInt16LE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || U(this, t, e, 2, 32767, -32768),
              (this[e] = 255 & t),
              (this[e + 1] = t >>> 8),
              e + 2
            );
          }),
          (u.prototype.writeInt16BE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || U(this, t, e, 2, 32767, -32768),
              (this[e] = t >>> 8),
              (this[e + 1] = 255 & t),
              e + 2
            );
          }),
          (u.prototype.writeInt32LE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || U(this, t, e, 4, 2147483647, -2147483648),
              (this[e] = 255 & t),
              (this[e + 1] = t >>> 8),
              (this[e + 2] = t >>> 16),
              (this[e + 3] = t >>> 24),
              e + 4
            );
          }),
          (u.prototype.writeInt32BE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || U(this, t, e, 4, 2147483647, -2147483648),
              t < 0 && (t = 4294967295 + t + 1),
              (this[e] = t >>> 24),
              (this[e + 1] = t >>> 16),
              (this[e + 2] = t >>> 8),
              (this[e + 3] = 255 & t),
              e + 4
            );
          }),
          (u.prototype.writeBigInt64LE = Y(function (t, e = 0) {
            return C(this, t, e, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'));
          })),
          (u.prototype.writeBigInt64BE = Y(function (t, e = 0) {
            return D(this, t, e, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'));
          })),
          (u.prototype.writeFloatLE = function (t, e, r) {
            return P(this, t, e, !0, r);
          }),
          (u.prototype.writeFloatBE = function (t, e, r) {
            return P(this, t, e, !1, r);
          }),
          (u.prototype.writeDoubleLE = function (t, e, r) {
            return k(this, t, e, !0, r);
          }),
          (u.prototype.writeDoubleBE = function (t, e, r) {
            return k(this, t, e, !1, r);
          }),
          (u.prototype.copy = function (t, e, r, n) {
            if (!u.isBuffer(t)) throw new TypeError('argument should be a Buffer');
            if (
              (r || (r = 0),
              n || 0 === n || (n = this.length),
              e >= t.length && (e = t.length),
              e || (e = 0),
              n > 0 && n < r && (n = r),
              n === r)
            )
              return 0;
            if (0 === t.length || 0 === this.length) return 0;
            if (e < 0) throw new RangeError('targetStart out of bounds');
            if (r < 0 || r >= this.length) throw new RangeError('Index out of range');
            if (n < 0) throw new RangeError('sourceEnd out of bounds');
            n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
            const i = n - r;
            return (
              this === t && 'function' == typeof Uint8Array.prototype.copyWithin
                ? this.copyWithin(e, r, n)
                : Uint8Array.prototype.set.call(t, this.subarray(r, n), e),
              i
            );
          }),
          (u.prototype.fill = function (t, e, r, n) {
            if ('string' == typeof t) {
              if (
                ('string' == typeof e
                  ? ((n = e), (e = 0), (r = this.length))
                  : 'string' == typeof r && ((n = r), (r = this.length)),
                void 0 !== n && 'string' != typeof n)
              )
                throw new TypeError('encoding must be a string');
              if ('string' == typeof n && !u.isEncoding(n)) throw new TypeError('Unknown encoding: ' + n);
              if (1 === t.length) {
                const e = t.charCodeAt(0);
                (('utf8' === n && e < 128) || 'latin1' === n) && (t = e);
              }
            } else 'number' == typeof t ? (t &= 255) : 'boolean' == typeof t && (t = Number(t));
            if (e < 0 || this.length < e || this.length < r) throw new RangeError('Out of range index');
            if (r <= e) return this;
            let i;
            if (((e >>>= 0), (r = void 0 === r ? this.length : r >>> 0), t || (t = 0), 'number' == typeof t))
              for (i = e; i < r; ++i) this[i] = t;
            else {
              const o = u.isBuffer(t) ? t : u.from(t, n),
                s = o.length;
              if (0 === s) throw new TypeError('The value "' + t + '" is invalid for argument "value"');
              for (i = 0; i < r - e; ++i) this[i + e] = o[i % s];
            }
            return this;
          });
        const G = {};
        function j(t, e, r) {
          G[t] = class extends r {
            constructor() {
              super(),
                Object.defineProperty(this, 'message', {
                  value: e.apply(this, arguments),
                  writable: !0,
                  configurable: !0,
                }),
                (this.name = `${this.name} [${t}]`),
                this.stack,
                delete this.name;
            }
            get code() {
              return t;
            }
            set code(t) {
              Object.defineProperty(this, 'code', { configurable: !0, enumerable: !0, value: t, writable: !0 });
            }
            toString() {
              return `${this.name} [${t}]: ${this.message}`;
            }
          };
        }
        function $(t) {
          let e = '',
            r = t.length;
          const n = '-' === t[0] ? 1 : 0;
          for (; r >= n + 4; r -= 3) e = `_${t.slice(r - 3, r)}${e}`;
          return `${t.slice(0, r)}${e}`;
        }
        function K(t, e, r, n, i, o) {
          if (t > r || t < e) {
            const n = 'bigint' == typeof e ? 'n' : '';
            let i;
            throw (
              ((i =
                o > 3
                  ? 0 === e || e === BigInt(0)
                    ? `>= 0${n} and < 2${n} ** ${8 * (o + 1)}${n}`
                    : `>= -(2${n} ** ${8 * (o + 1) - 1}${n}) and < 2 ** ${8 * (o + 1) - 1}${n}`
                  : `>= ${e}${n} and <= ${r}${n}`),
              new G.ERR_OUT_OF_RANGE('value', i, t))
            );
          }
          !(function (t, e, r) {
            F(e, 'offset'), (void 0 !== t[e] && void 0 !== t[e + r]) || V(e, t.length - (r + 1));
          })(n, i, o);
        }
        function F(t, e) {
          if ('number' != typeof t) throw new G.ERR_INVALID_ARG_TYPE(e, 'number', t);
        }
        function V(t, e, r) {
          if (Math.floor(t) !== t) throw (F(t, r), new G.ERR_OUT_OF_RANGE(r || 'offset', 'an integer', t));
          if (e < 0) throw new G.ERR_BUFFER_OUT_OF_BOUNDS();
          throw new G.ERR_OUT_OF_RANGE(r || 'offset', `>= ${r ? 1 : 0} and <= ${e}`, t);
        }
        j(
          'ERR_BUFFER_OUT_OF_BOUNDS',
          function (t) {
            return t ? `${t} is outside of buffer bounds` : 'Attempt to access memory outside buffer bounds';
          },
          RangeError,
        ),
          j(
            'ERR_INVALID_ARG_TYPE',
            function (t, e) {
              return `The "${t}" argument must be of type number. Received type ${typeof e}`;
            },
            TypeError,
          ),
          j(
            'ERR_OUT_OF_RANGE',
            function (t, e, r) {
              let n = `The value of "${t}" is out of range.`,
                i = r;
              return (
                Number.isInteger(r) && Math.abs(r) > 2 ** 32
                  ? (i = $(String(r)))
                  : 'bigint' == typeof r &&
                    ((i = String(r)),
                    (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (i = $(i)),
                    (i += 'n')),
                (n += ` It must be ${e}. Received ${i}`),
                n
              );
            },
            RangeError,
          );
        const q = /[^+/0-9A-Za-z-_]/g;
        function W(t, e) {
          let r;
          e = e || 1 / 0;
          const n = t.length;
          let i = null;
          const o = [];
          for (let s = 0; s < n; ++s) {
            if (((r = t.charCodeAt(s)), r > 55295 && r < 57344)) {
              if (!i) {
                if (r > 56319) {
                  (e -= 3) > -1 && o.push(239, 191, 189);
                  continue;
                }
                if (s + 1 === n) {
                  (e -= 3) > -1 && o.push(239, 191, 189);
                  continue;
                }
                i = r;
                continue;
              }
              if (r < 56320) {
                (e -= 3) > -1 && o.push(239, 191, 189), (i = r);
                continue;
              }
              r = 65536 + (((i - 55296) << 10) | (r - 56320));
            } else i && (e -= 3) > -1 && o.push(239, 191, 189);
            if (((i = null), r < 128)) {
              if ((e -= 1) < 0) break;
              o.push(r);
            } else if (r < 2048) {
              if ((e -= 2) < 0) break;
              o.push((r >> 6) | 192, (63 & r) | 128);
            } else if (r < 65536) {
              if ((e -= 3) < 0) break;
              o.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
            } else {
              if (!(r < 1114112)) throw new Error('Invalid code point');
              if ((e -= 4) < 0) break;
              o.push((r >> 18) | 240, ((r >> 12) & 63) | 128, ((r >> 6) & 63) | 128, (63 & r) | 128);
            }
          }
          return o;
        }
        function H(t) {
          return n.toByteArray(
            (function (t) {
              if ((t = (t = t.split('=')[0]).trim().replace(q, '')).length < 2) return '';
              for (; t.length % 4 != 0; ) t += '=';
              return t;
            })(t),
          );
        }
        function Z(t, e, r, n) {
          let i;
          for (i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i) e[i + r] = t[i];
          return i;
        }
        function z(t, e) {
          return (
            t instanceof e ||
            (null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === e.name)
          );
        }
        function X(t) {
          return t != t;
        }
        const J = (function () {
          const t = '0123456789abcdef',
            e = new Array(256);
          for (let r = 0; r < 16; ++r) {
            const n = 16 * r;
            for (let i = 0; i < 16; ++i) e[n + i] = t[r] + t[i];
          }
          return e;
        })();
        function Y(t) {
          return 'undefined' == typeof BigInt ? Q : t;
        }
        function Q() {
          throw new Error('BigInt not supported');
        }
      },
      161: t => {
        'use strict';
        var e = Object.prototype.hasOwnProperty,
          r = '~';
        function n() {}
        function i(t, e, r) {
          (this.fn = t), (this.context = e), (this.once = r || !1);
        }
        function o(t, e, n, o, s) {
          if ('function' != typeof n) throw new TypeError('The listener must be a function');
          var h = new i(n, o || t, s),
            u = r ? r + e : e;
          return (
            t._events[u]
              ? t._events[u].fn
                ? (t._events[u] = [t._events[u], h])
                : t._events[u].push(h)
              : ((t._events[u] = h), t._eventsCount++),
            t
          );
        }
        function s(t, e) {
          0 == --t._eventsCount ? (t._events = new n()) : delete t._events[e];
        }
        function h() {
          (this._events = new n()), (this._eventsCount = 0);
        }
        Object.create && ((n.prototype = Object.create(null)), new n().__proto__ || (r = !1)),
          (h.prototype.eventNames = function () {
            var t,
              n,
              i = [];
            if (0 === this._eventsCount) return i;
            for (n in (t = this._events)) e.call(t, n) && i.push(r ? n.slice(1) : n);
            return Object.getOwnPropertySymbols ? i.concat(Object.getOwnPropertySymbols(t)) : i;
          }),
          (h.prototype.listeners = function (t) {
            var e = r ? r + t : t,
              n = this._events[e];
            if (!n) return [];
            if (n.fn) return [n.fn];
            for (var i = 0, o = n.length, s = new Array(o); i < o; i++) s[i] = n[i].fn;
            return s;
          }),
          (h.prototype.listenerCount = function (t) {
            var e = r ? r + t : t,
              n = this._events[e];
            return n ? (n.fn ? 1 : n.length) : 0;
          }),
          (h.prototype.emit = function (t, e, n, i, o, s) {
            var h = r ? r + t : t;
            if (!this._events[h]) return !1;
            var u,
              a,
              f = this._events[h],
              l = arguments.length;
            if (f.fn) {
              switch ((f.once && this.removeListener(t, f.fn, void 0, !0), l)) {
                case 1:
                  return f.fn.call(f.context), !0;
                case 2:
                  return f.fn.call(f.context, e), !0;
                case 3:
                  return f.fn.call(f.context, e, n), !0;
                case 4:
                  return f.fn.call(f.context, e, n, i), !0;
                case 5:
                  return f.fn.call(f.context, e, n, i, o), !0;
                case 6:
                  return f.fn.call(f.context, e, n, i, o, s), !0;
              }
              for (a = 1, u = new Array(l - 1); a < l; a++) u[a - 1] = arguments[a];
              f.fn.apply(f.context, u);
            } else {
              var c,
                p = f.length;
              for (a = 0; a < p; a++)
                switch ((f[a].once && this.removeListener(t, f[a].fn, void 0, !0), l)) {
                  case 1:
                    f[a].fn.call(f[a].context);
                    break;
                  case 2:
                    f[a].fn.call(f[a].context, e);
                    break;
                  case 3:
                    f[a].fn.call(f[a].context, e, n);
                    break;
                  case 4:
                    f[a].fn.call(f[a].context, e, n, i);
                    break;
                  default:
                    if (!u) for (c = 1, u = new Array(l - 1); c < l; c++) u[c - 1] = arguments[c];
                    f[a].fn.apply(f[a].context, u);
                }
            }
            return !0;
          }),
          (h.prototype.on = function (t, e, r) {
            return o(this, t, e, r, !1);
          }),
          (h.prototype.once = function (t, e, r) {
            return o(this, t, e, r, !0);
          }),
          (h.prototype.removeListener = function (t, e, n, i) {
            var o = r ? r + t : t;
            if (!this._events[o]) return this;
            if (!e) return s(this, o), this;
            var h = this._events[o];
            if (h.fn) h.fn !== e || (i && !h.once) || (n && h.context !== n) || s(this, o);
            else {
              for (var u = 0, a = [], f = h.length; u < f; u++)
                (h[u].fn !== e || (i && !h[u].once) || (n && h[u].context !== n)) && a.push(h[u]);
              a.length ? (this._events[o] = 1 === a.length ? a[0] : a) : s(this, o);
            }
            return this;
          }),
          (h.prototype.removeAllListeners = function (t) {
            var e;
            return (
              t
                ? ((e = r ? r + t : t), this._events[e] && s(this, e))
                : ((this._events = new n()), (this._eventsCount = 0)),
              this
            );
          }),
          (h.prototype.off = h.prototype.removeListener),
          (h.prototype.addListener = h.prototype.on),
          (h.prefixed = r),
          (h.EventEmitter = h),
          (t.exports = h);
      },
      699: t => {
        'use strict';
        var e,
          r = 'object' == typeof Reflect ? Reflect : null,
          n =
            r && 'function' == typeof r.apply
              ? r.apply
              : function (t, e, r) {
                  return Function.prototype.apply.call(t, e, r);
                };
        e =
          r && 'function' == typeof r.ownKeys
            ? r.ownKeys
            : Object.getOwnPropertySymbols
            ? function (t) {
                return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
              }
            : function (t) {
                return Object.getOwnPropertyNames(t);
              };
        var i =
          Number.isNaN ||
          function (t) {
            return t != t;
          };
        function o() {
          o.init.call(this);
        }
        (t.exports = o),
          (t.exports.once = function (t, e) {
            return new Promise(function (r, n) {
              function i(r) {
                t.removeListener(e, o), n(r);
              }
              function o() {
                'function' == typeof t.removeListener && t.removeListener('error', i), r([].slice.call(arguments));
              }
              m(t, e, o, { once: !0 }),
                'error' !== e &&
                  (function (t, e, r) {
                    'function' == typeof t.on && m(t, 'error', e, { once: !0 });
                  })(t, i);
            });
          }),
          (o.EventEmitter = o),
          (o.prototype._events = void 0),
          (o.prototype._eventsCount = 0),
          (o.prototype._maxListeners = void 0);
        var s = 10;
        function h(t) {
          if ('function' != typeof t)
            throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
        }
        function u(t) {
          return void 0 === t._maxListeners ? o.defaultMaxListeners : t._maxListeners;
        }
        function a(t, e, r, n) {
          var i, o, s, a;
          if (
            (h(r),
            void 0 === (o = t._events)
              ? ((o = t._events = Object.create(null)), (t._eventsCount = 0))
              : (void 0 !== o.newListener && (t.emit('newListener', e, r.listener ? r.listener : r), (o = t._events)),
                (s = o[e])),
            void 0 === s)
          )
            (s = o[e] = r), ++t._eventsCount;
          else if (
            ('function' == typeof s ? (s = o[e] = n ? [r, s] : [s, r]) : n ? s.unshift(r) : s.push(r),
            (i = u(t)) > 0 && s.length > i && !s.warned)
          ) {
            s.warned = !0;
            var f = new Error(
              'Possible EventEmitter memory leak detected. ' +
                s.length +
                ' ' +
                String(e) +
                ' listeners added. Use emitter.setMaxListeners() to increase limit',
            );
            (f.name = 'MaxListenersExceededWarning'),
              (f.emitter = t),
              (f.type = e),
              (f.count = s.length),
              (a = f),
              console && console.warn && console.warn(a);
          }
          return t;
        }
        function f() {
          if (!this.fired)
            return (
              this.target.removeListener(this.type, this.wrapFn),
              (this.fired = !0),
              0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
            );
        }
        function l(t, e, r) {
          var n = { fired: !1, wrapFn: void 0, target: t, type: e, listener: r },
            i = f.bind(n);
          return (i.listener = r), (n.wrapFn = i), i;
        }
        function c(t, e, r) {
          var n = t._events;
          if (void 0 === n) return [];
          var i = n[e];
          return void 0 === i
            ? []
            : 'function' == typeof i
            ? r
              ? [i.listener || i]
              : [i]
            : r
            ? (function (t) {
                for (var e = new Array(t.length), r = 0; r < e.length; ++r) e[r] = t[r].listener || t[r];
                return e;
              })(i)
            : d(i, i.length);
        }
        function p(t) {
          var e = this._events;
          if (void 0 !== e) {
            var r = e[t];
            if ('function' == typeof r) return 1;
            if (void 0 !== r) return r.length;
          }
          return 0;
        }
        function d(t, e) {
          for (var r = new Array(e), n = 0; n < e; ++n) r[n] = t[n];
          return r;
        }
        function m(t, e, r, n) {
          if ('function' == typeof t.on) n.once ? t.once(e, r) : t.on(e, r);
          else {
            if ('function' != typeof t.addEventListener)
              throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof t);
            t.addEventListener(e, function i(o) {
              n.once && t.removeEventListener(e, i), r(o);
            });
          }
        }
        Object.defineProperty(o, 'defaultMaxListeners', {
          enumerable: !0,
          get: function () {
            return s;
          },
          set: function (t) {
            if ('number' != typeof t || t < 0 || i(t))
              throw new RangeError(
                'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                  t +
                  '.',
              );
            s = t;
          },
        }),
          (o.init = function () {
            (void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events) ||
              ((this._events = Object.create(null)), (this._eventsCount = 0)),
              (this._maxListeners = this._maxListeners || void 0);
          }),
          (o.prototype.setMaxListeners = function (t) {
            if ('number' != typeof t || t < 0 || i(t))
              throw new RangeError(
                'The value of "n" is out of range. It must be a non-negative number. Received ' + t + '.',
              );
            return (this._maxListeners = t), this;
          }),
          (o.prototype.getMaxListeners = function () {
            return u(this);
          }),
          (o.prototype.emit = function (t) {
            for (var e = [], r = 1; r < arguments.length; r++) e.push(arguments[r]);
            var i = 'error' === t,
              o = this._events;
            if (void 0 !== o) i = i && void 0 === o.error;
            else if (!i) return !1;
            if (i) {
              var s;
              if ((e.length > 0 && (s = e[0]), s instanceof Error)) throw s;
              var h = new Error('Unhandled error.' + (s ? ' (' + s.message + ')' : ''));
              throw ((h.context = s), h);
            }
            var u = o[t];
            if (void 0 === u) return !1;
            if ('function' == typeof u) n(u, this, e);
            else {
              var a = u.length,
                f = d(u, a);
              for (r = 0; r < a; ++r) n(f[r], this, e);
            }
            return !0;
          }),
          (o.prototype.addListener = function (t, e) {
            return a(this, t, e, !1);
          }),
          (o.prototype.on = o.prototype.addListener),
          (o.prototype.prependListener = function (t, e) {
            return a(this, t, e, !0);
          }),
          (o.prototype.once = function (t, e) {
            return h(e), this.on(t, l(this, t, e)), this;
          }),
          (o.prototype.prependOnceListener = function (t, e) {
            return h(e), this.prependListener(t, l(this, t, e)), this;
          }),
          (o.prototype.removeListener = function (t, e) {
            var r, n, i, o, s;
            if ((h(e), void 0 === (n = this._events))) return this;
            if (void 0 === (r = n[t])) return this;
            if (r === e || r.listener === e)
              0 == --this._eventsCount
                ? (this._events = Object.create(null))
                : (delete n[t], n.removeListener && this.emit('removeListener', t, r.listener || e));
            else if ('function' != typeof r) {
              for (i = -1, o = r.length - 1; o >= 0; o--)
                if (r[o] === e || r[o].listener === e) {
                  (s = r[o].listener), (i = o);
                  break;
                }
              if (i < 0) return this;
              0 === i
                ? r.shift()
                : (function (t, e) {
                    for (; e + 1 < t.length; e++) t[e] = t[e + 1];
                    t.pop();
                  })(r, i),
                1 === r.length && (n[t] = r[0]),
                void 0 !== n.removeListener && this.emit('removeListener', t, s || e);
            }
            return this;
          }),
          (o.prototype.off = o.prototype.removeListener),
          (o.prototype.removeAllListeners = function (t) {
            var e, r, n;
            if (void 0 === (r = this._events)) return this;
            if (void 0 === r.removeListener)
              return (
                0 === arguments.length
                  ? ((this._events = Object.create(null)), (this._eventsCount = 0))
                  : void 0 !== r[t] && (0 == --this._eventsCount ? (this._events = Object.create(null)) : delete r[t]),
                this
              );
            if (0 === arguments.length) {
              var i,
                o = Object.keys(r);
              for (n = 0; n < o.length; ++n) 'removeListener' !== (i = o[n]) && this.removeAllListeners(i);
              return (
                this.removeAllListeners('removeListener'),
                (this._events = Object.create(null)),
                (this._eventsCount = 0),
                this
              );
            }
            if ('function' == typeof (e = r[t])) this.removeListener(t, e);
            else if (void 0 !== e) for (n = e.length - 1; n >= 0; n--) this.removeListener(t, e[n]);
            return this;
          }),
          (o.prototype.listeners = function (t) {
            return c(this, t, !0);
          }),
          (o.prototype.rawListeners = function (t) {
            return c(this, t, !1);
          }),
          (o.listenerCount = function (t, e) {
            return 'function' == typeof t.listenerCount ? t.listenerCount(e) : p.call(t, e);
          }),
          (o.prototype.listenerCount = p),
          (o.prototype.eventNames = function () {
            return this._eventsCount > 0 ? e(this._events) : [];
          });
      },
      333: (t, e) => {
        (e.read = function (t, e, r, n, i) {
          var o,
            s,
            h = 8 * i - n - 1,
            u = (1 << h) - 1,
            a = u >> 1,
            f = -7,
            l = r ? i - 1 : 0,
            c = r ? -1 : 1,
            p = t[e + l];
          for (l += c, o = p & ((1 << -f) - 1), p >>= -f, f += h; f > 0; o = 256 * o + t[e + l], l += c, f -= 8);
          for (s = o & ((1 << -f) - 1), o >>= -f, f += n; f > 0; s = 256 * s + t[e + l], l += c, f -= 8);
          if (0 === o) o = 1 - a;
          else {
            if (o === u) return s ? NaN : (1 / 0) * (p ? -1 : 1);
            (s += Math.pow(2, n)), (o -= a);
          }
          return (p ? -1 : 1) * s * Math.pow(2, o - n);
        }),
          (e.write = function (t, e, r, n, i, o) {
            var s,
              h,
              u,
              a = 8 * o - i - 1,
              f = (1 << a) - 1,
              l = f >> 1,
              c = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
              p = n ? 0 : o - 1,
              d = n ? 1 : -1,
              m = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
            for (
              e = Math.abs(e),
                isNaN(e) || e === 1 / 0
                  ? ((h = isNaN(e) ? 1 : 0), (s = f))
                  : ((s = Math.floor(Math.log(e) / Math.LN2)),
                    e * (u = Math.pow(2, -s)) < 1 && (s--, (u *= 2)),
                    (e += s + l >= 1 ? c / u : c * Math.pow(2, 1 - l)) * u >= 2 && (s++, (u /= 2)),
                    s + l >= f
                      ? ((h = 0), (s = f))
                      : s + l >= 1
                      ? ((h = (e * u - 1) * Math.pow(2, i)), (s += l))
                      : ((h = e * Math.pow(2, l - 1) * Math.pow(2, i)), (s = 0)));
              i >= 8;
              t[r + p] = 255 & h, p += d, h /= 256, i -= 8
            );
            for (s = (s << i) | h, a += i; a > 0; t[r + p] = 255 & s, p += d, s /= 256, a -= 8);
            t[r + p - d] |= 128 * m;
          });
      },
      196: () => {},
    },
    e = {};
  function r(n) {
    var i = e[n];
    if (void 0 !== i) return i.exports;
    var o = (e[n] = { id: n, loaded: !1, exports: {} });
    return t[n].call(o.exports, o, o.exports, r), (o.loaded = !0), o.exports;
  }
  (r.nmd = t => ((t.paths = []), t.children || (t.children = []), t)),
    (() => {
      'use strict';
      const t =
          { NODE_ENV: 'production', PKG_NAME: '@subwallet/extension-koni', PKG_VERSION: '1.0.3-0' }.EXTENSION_PREFIX ||
          '',
        e = `${t}koni-page`,
        n = `${t}koni-content`;
      class i extends Error {
        constructor(t, e, r, n) {
          super(e), (this.errorType = t), (this.code = r), (this.data = n);
        }
        toJSON() {
          return { name: this.name, message: this.message, code: this.code };
        }
      }
      const o = {
        CHAIN_DISCONNECTED: { message: 'Chain is disconnected', code: void 0 },
        INVALID_PARAMS: { message: 'Invalid params', code: void 0 },
        INTERNAL_ERROR: { message: 'Internal error', code: void 0 },
        USER_REJECT: { message: 'User reject request', code: void 0 },
      };
      class s extends i {
        constructor(t, e, r) {
          const { code: n, message: i } = o[t];
          super(t, e || i, n, r), (this.errorType = t);
        }
      }
      let h, u, a, f, l, c, p, d, m, g, y, v, w, M, E, b, _, A, N, I, R, T, O, S, L;
      !(function (t) {
        (t.NOMINATED = 'nominated'), (t.POOLED = 'pooled');
      })(h || (h = {})),
        (function (t) {
          (t.PENDING = 'pending'),
            (t.READY = 'ready'),
            (t.CACHED = 'cached'),
            (t.ERROR = 'error'),
            (t.NOT_SUPPORT = 'not_support');
        })(u || (u = {})),
        (function (t) {
          (t.VER_1 = '1.0.0'), (t.VER_2 = '2.0.0');
        })(a || (a = {})),
        (function (t) {
          (t.ONGOING = 'ongoing'), (t.COMPLETED = 'completed'), (t.FAILED = 'failed');
        })(f || (f = {})),
        (function (t) {
          (t.wasm = 'wasm'), (t.evm = 'evm');
        })(l || (l = {})),
        (function (t) {
          (t.SEND = 'send'), (t.RECEIVED = 'received');
        })(c || (c = {})),
        (function (t) {
          (t.EVM = 'evm'), (t.SUBSTRATE = 'substrate');
        })(p || (p = {})),
        (function (t) {
          (t.TRANSFER_BALANCE = 'transfer.balance'),
            (t.TRANSFER_TOKEN = 'transfer.token'),
            (t.TRANSFER_XCM = 'transfer.xcm'),
            (t.SEND_NFT = 'send_nft'),
            (t.CROWDLOAN = 'crowdloan'),
            (t.STAKING_JOIN_POOL = 'staking.join_pool'),
            (t.STAKING_LEAVE_POOL = 'staking.leave_pool'),
            (t.STAKING_POOL_WITHDRAW = 'staking.pool_withdraw'),
            (t.STAKING_BOND = 'staking.bond'),
            (t.STAKING_UNBOND = 'staking.unbond'),
            (t.STAKING_CLAIM_REWARD = 'staking.claim_reward'),
            (t.STAKING_WITHDRAW = 'staking.withdraw'),
            (t.STAKING_COMPOUNDING = 'staking.compounding'),
            (t.STAKING_CANCEL_COMPOUNDING = 'staking.cancel_compounding'),
            (t.STAKING_CANCEL_UNSTAKE = 'staking.cancel_unstake'),
            (t.EVM_EXECUTE = 'evm.execute'),
            (t.UNKNOWN = 'unknown');
        })(d || (d = {})),
        (function (t) {
          (t.QUEUED = 'queued'),
            (t.SUBMITTING = 'submitting'),
            (t.PROCESSING = 'processing'),
            (t.SUCCESS = 'success'),
            (t.FAIL = 'fail'),
            (t.CANCELLED = 'cancelled'),
            (t.UNKNOWN = 'unknown');
        })(m || (m = {})),
        (function (t) {
          (t.NOT_ENOUGH_BALANCE = 'NOT_ENOUGH_BALANCE'),
            (t.CHAIN_DISCONNECTED = 'CHAIN_DISCONNECTED'),
            (t.INVALID_PARAMS = 'INVALID_PARAMS'),
            (t.DUPLICATE_TRANSACTION = 'DUPLICATE_TRANSACTION'),
            (t.UNABLE_TO_SIGN = 'UNABLE_TO_SIGN'),
            (t.USER_REJECT_REQUEST = 'USER_REJECT_REQUEST'),
            (t.UNABLE_TO_SEND = 'UNABLE_TO_SEND'),
            (t.SEND_TRANSACTION_FAILED = 'SEND_TRANSACTION_FAILED'),
            (t.INTERNAL_ERROR = 'INTERNAL_ERROR'),
            (t.UNSUPPORTED = 'UNSUPPORTED'),
            (t.TIMEOUT = 'TIMEOUT'),
            (t.NOT_ENOUGH_EXISTENTIAL_DEPOSIT = 'NOT_ENOUGH_EXISTENTIAL_DEPOSIT');
        })(g || (g = {})),
        (function (t) {
          (t.NOT_ENOUGH_MIN_STAKE = 'NOT_ENOUGH_MIN_STAKE'),
            (t.EXCEED_MAX_NOMINATIONS = 'EXCEED_MAX_NOMINATIONS'),
            (t.EXIST_UNSTAKING_REQUEST = 'EXIST_UNSTAKING_REQUEST'),
            (t.INVALID_ACTIVE_STAKE = 'INVALID_ACTIVE_STAKE'),
            (t.EXCEED_MAX_UNSTAKING = 'EXCEED_MAX_UNSTAKING'),
            (t.INACTIVE_NOMINATION_POOL = 'INACTIVE_NOMINATION_POOL');
        })(y || (y = {})),
        (function (t) {
          (t.NOT_ENOUGH_VALUE = 'NOT_ENOUGH_VALUE'),
            (t.NOT_ENOUGH_FEE = 'NOT_ENOUGH_FEE'),
            (t.INVALID_TOKEN = 'INVALID_TOKEN'),
            (t.TRANSFER_ERROR = 'TRANSFER_ERROR');
        })(v || (v = {})),
        (function (t) {
          t.NOT_ENOUGH_EXISTENTIAL_DEPOSIT = 'notEnoughExistentialDeposit';
        })(w || (w = {})),
        (function (t) {
          (t.NETWORK_ERROR = 'NETWORK_ERROR'),
            (t.TOKEN_ERROR = 'TOKEN_ERROR'),
            (t.TIMEOUT = 'TIMEOUT'),
            (t.GET_BALANCE_ERROR = 'GET_BALANCE_ERROR');
        })(M || (M = {})),
        (function (t) {
          (t.CHAIN_DISCONNECTED = 'CHAIN_DISCONNECTED'),
            (t.INVALID_PARAMS = 'INVALID_PARAMS'),
            (t.INTERNAL_ERROR = 'INTERNAL_ERROR'),
            (t.USER_REJECT = 'USER_REJECT');
        })(E || (E = {})),
        (function (t) {
          (t.INVALID_ADDRESS = 'invalidToAccount'),
            (t.KEYRING_ERROR = 'keyringError'),
            (t.UNKNOWN_ERROR = 'unknownError');
        })(b || (b = {})),
        (function (t) {
          (t[(t.PENDING = 0)] = 'PENDING'),
            (t[(t.REJECTED = 1)] = 'REJECTED'),
            (t[(t.FAILED = 2)] = 'FAILED'),
            (t[(t.COMPLETED = 3)] = 'COMPLETED');
        })(_ || (_ = {})),
        (function (t) {
          (t.LIGHT = 'light'), (t.DARK = 'dark'), (t.SUBSPACE = 'subspace');
        })(A || (A = {})),
        (function (t) {
          (t.INVALID_INFO_TYPE = 'invalidInfoType'),
            (t.INJECT_SCRIPT_DETECTED = 'injectScriptDetected'),
            (t.EXISTED_NETWORK = 'existedNetwork'),
            (t.EXISTED_PROVIDER = 'existedProvider'),
            (t.INVALID_PROVIDER = 'invalidProvider'),
            (t.NONE = 'none'),
            (t.CONNECTION_FAILURE = 'connectionFailure'),
            (t.PROVIDER_NOT_SAME_NETWORK = 'providerNotSameNetwork');
        })(N || (N = {})),
        (function (t) {
          (t.CONNECTED = 'connected'),
            (t.CONNECTING = 'connecting'),
            (t.DISCONNECTED = 'disconnected'),
            (t.PENDING = 'pending');
        })(I || (I = {})),
        (function (t) {
          (t.USER_REJECTED_REQUEST = 'USER_REJECTED_REQUEST'),
            (t.UNAUTHORIZED = 'UNAUTHORIZED'),
            (t.UNSUPPORTED_METHOD = 'UNSUPPORTED_METHOD'),
            (t.DISCONNECTED = 'DISCONNECTED'),
            (t.CHAIN_DISCONNECTED = 'CHAIN_DISCONNECTED'),
            (t.INVALID_PARAMS = 'INVALID_PARAMS'),
            (t.INTERNAL_ERROR = 'INTERNAL_ERROR');
        })(R || (R = {})),
        (function (t) {
          (t.CLAIMABLE = 'CLAIMABLE'), (t.UNLOCKING = 'UNLOCKING');
        })(T || (T = {})),
        (function (t) {
          (t.EARNING_REWARD = 'EARNING_REWARD'),
            (t.PARTIALLY_EARNING = 'PARTIALLY_EARNING'),
            (t.NOT_EARNING = 'NOT_EARNING'),
            (t.WAITING = 'WAITING'),
            (t.NOT_STAKING = 'NOT_STAKING');
        })(O || (O = {})),
        (function (t) {
          (t.EVM = 'EVM'), (t.SUBSTRATE = 'SUBSTRATE'), (t.UNKNOWN = 'UNKNOWN'), (t.MIXED = 'MIXED');
        })(S || (S = {})),
        (function (t) {
          (t.INFO = 'info'), (t.SUCCESS = 'success'), (t.WARNING = 'warning'), (t.ERROR = 'error');
        })(L || (L = {}));
      var B = r(795);
      class U extends B.Z {
        isSubWallet = !0;
        isMetaMask = !1;
        _connected = !1;
        _subscribed = !1;
        constructor(t, e) {
          super(), (this.version = e), (this.sendMessage = t), (this._connected = !0);
        }
        get connected() {
          return this._connected;
        }
        isConnected() {
          return this._connected;
        }
        subscribeExtensionEvents() {
          this._subscribed ||
            this.sendMessage('evm(events.subscribe)', null, ({ payload: t, type: e }) => {
              if (
                [
                  'connect',
                  'disconnect',
                  'accountsChanged',
                  'chainChanged',
                  'message',
                  'data',
                  'reconnect',
                  'error',
                ].includes(e)
              ) {
                'connect' === e ? (this._connected = !0) : 'disconnect' === e && (this._connected = !1);
                const r = 'data' === e ? 'message' : e;
                this.emit(r, t);
              } else console.warn('Can not handle event', e, t);
            })
              .then(t => {
                this._subscribed = !0;
              })
              .catch(console.error);
        }
        async enable() {
          return this.request({ method: 'eth_requestAccounts' });
        }
        request({ method: t, params: e }) {
          return new Promise(
            'eth_requestAccounts' === t
              ? (t, e) => {
                  const r = '' !== document.title ? document.title : window.location.hostname;
                  this.sendMessage('pub(authorize.tabV2)', { origin: r, accountAuthType: 'evm' })
                    .then(() => {
                      this.subscribeExtensionEvents(),
                        this.request({ method: 'eth_accounts' })
                          .then(e => {
                            t(e);
                          })
                          .catch(t => {
                            e(t);
                          });
                    })
                    .catch(t => {
                      e(t);
                    });
                }
              : (r, n) => {
                  this.sendMessage('evm(request)', { params: e, method: t })
                    .then(t => {
                      r(t);
                    })
                    .catch(t => {
                      n(t);
                    });
                },
          );
        }
        _sendSync(t) {
          let e;
          if ('net_version' !== t.method) throw new Error(`Not support ${t.method}`);
          return (e = this.version ? `SubWallet v${this.version}` : null), { id: t.id, jsonrpc: t.jsonrpc, result: e };
        }
        send(t, e) {
          return 'string' != typeof t || (e && !Array.isArray(e))
            ? t && 'object' == typeof t && 'function' == typeof e
              ? this.request(t).then(t => {
                  e(t);
                })
              : this._sendSync(t)
            : this.request({ method: t, params: e });
        }
        sendAsync(t, e) {
          this.request(t)
            .then(t => {
              e(null, { result: t });
            })
            .catch(t => {
              e(t);
            });
        }
      }
      let C,
        D,
        x = 0;
      class P {
        constructor(t) {
          C = t;
        }
        get(t) {
          return C('pub(accounts.listV2)', { anyType: t, accountAuthType: 'substrate' });
        }
        subscribe(t) {
          return (
            C('pub(accounts.subscribeV2)', { accountAuthType: 'substrate' }, t).catch(t => console.error(t)), () => {}
          );
        }
      }
      class k {
        constructor(t) {
          D = t;
        }
        get() {
          return D('pub(metadata.list)');
        }
        provide(t) {
          return D('pub(metadata.provide)', t);
        }
      }
      const G = r(161),
        j =
          'undefined' != typeof globalThis
            ? globalThis
            : 'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
            ? self
            : 'undefined' != typeof window
            ? window
            : Function('return this');
      function $(t) {
        return t.toString().padStart(2, '0');
      }
      var K = r(197);
      const F = 'function' == typeof j.BigInt && 'function' == typeof j.BigInt.asIntN ? j.BigInt : () => Number.NaN,
        V = ('function' == typeof F && F.asIntN, void 0 !== j.Buffer),
        q = 'object' == typeof j.process;
      function W(t) {
        return 'function' == typeof t;
      }
      var H = r(834).lW;
      function Z(t) {
        return V && W(t && t.readDoubleLE) && H.isBuffer(t);
      }
      function z(t) {
        return (t && t.constructor) === Uint8Array || t instanceof Uint8Array;
      }
      const X = new Array(256),
        J = new Array(65536);
      for (let t = 0; t < 256; t++) X[t] = t.toString(16).padStart(2, '0');
      for (let t = 0; t < 256; t++) {
        const e = t << 8;
        for (let r = 0; r < 256; r++) J[e | r] = X[t] + X[r];
      }
      function Y(t, e) {
        const r = t.length % 2 | 0,
          n = (t.length - r) | 0;
        for (let r = 0; r < n; r += 2) e += J[(t[r] << 8) | t[r + 1]];
        return r && (e += X[0 | t[n]]), e;
      }
      const Q = '0123456789abcdef',
        tt = new Array(256),
        et = new Array(65536);
      for (let t = 0; t < Q.length; t++)
        (tt[0 | Q[t].charCodeAt(0)] = 0 | t), t > 9 && (tt[0 | Q[t].toUpperCase().charCodeAt(0)] = 0 | t);
      for (let t = 0; t < 256; t++) {
        const e = t << 8;
        for (let r = 0; r < 256; r++) et[e | r] = (tt[t] << 4) | tt[r];
      }
      const rt = /^0x[\da-fA-F]+$/;
      var nt, it;
      const ot = new ((nt = 'TextEncoder'),
      (it = class {
        encode(t) {
          const e = new Uint8Array(t.length);
          for (let r = 0; r < t.length; r++) e[r] = t.charCodeAt(r);
          return e;
        }
      }),
      void 0 === j[nt] ? it : j[nt])();
      const st = { debug: 'log', error: 'error', log: 'log', warn: 'warn' };
      function ht(t) {
        return Array.isArray(t)
          ? t.map(ht)
          : (function (t) {
              return K.isBN(t);
            })(t)
          ? t.toString()
          : z(t) || Z(t)
          ? (function (t, e = -1, r = !0) {
              const n = r ? '0x' : '';
              if (!t || !t.length) return n;
              if (e > 0) {
                const r = Math.ceil(e / 8);
                if (t.length > r) return `${Y(t.subarray(0, r / 2), n)}…${Y(t.subarray(t.length - r / 2), '')}`;
              }
              return Y(t, n);
            })(
              (function (t) {
                return z(t)
                  ? t
                  : (function (t, e = -1, r) {
                      return (
                        'string' == typeof t &&
                        ('0x' === t || rt.test(t)) &&
                        (-1 === e ? r || t.length % 2 == 0 : t.length === 2 + Math.ceil(e / 4))
                      );
                    })(t)
                  ? (function (t, e = -1) {
                      if (!t) return new Uint8Array();
                      let r = t.startsWith('0x') ? 2 : 0;
                      const n = Math.ceil((t.length - r) / 2),
                        i = Math.ceil(-1 === e ? n : e / 8),
                        o = new Uint8Array(i);
                      for (let e = i > n ? i - n : 0; e < i; e++, r += 2)
                        o[e] = et[(t.charCodeAt(r) << 8) | t.charCodeAt(r + 1)];
                      return o;
                    })(t)
                  : Z(t) || Array.isArray(t)
                  ? new Uint8Array(t)
                  : (function (t) {
                      return t ? ot.encode(t.toString()) : new Uint8Array();
                    })(t);
              })(t),
            )
          : (function (t) {
              if (
                t &&
                (function (t) {
                  return !!t && 'object' == typeof t;
                })(t) &&
                t.constructor === Object
              ) {
                const e = {};
                for (const r of Object.keys(t)) e[r] = ht(t[r]);
                return e;
              }
              return t;
            })(t);
      }
      function ut(t, e, r, n = -1) {
        if (1 === r.length && W(r[0])) {
          const i = r[0]();
          return ut(t, e, Array.isArray(i) ? i : [i], n);
        }
        var i, o;
        console[st[t]](
          `${(o = new Date()).getFullYear().toString()}-${$(o.getMonth() + 1)}-${$(o.getDate())} ${$(o.getHours())}:${$(
            o.getMinutes(),
          )}:${$(o.getSeconds())}`,
          e,
          ...r.map(ht).map(
            ((i = n),
            t => {
              if (i <= 0) return t;
              const e = `${t}`;
              return e.length < i ? t : `${e.substring(0, i)} ...`;
            }),
          ),
        );
      }
      function at() {}
      function ft(t, e) {
        return !!t && ('*' === t || e === t || (t.endsWith('*') && e.startsWith(t.slice(0, -1))));
      }
      function lt(t, e) {
        return !!t && t.startsWith('-') && (e === t.slice(1) || (t.endsWith('*') && e.startsWith(t.slice(1, -1))));
      }
      function ct(t, e) {
        let r = !1;
        for (const n of t) ft(n, e) ? (r = !0) : lt(n, e) && (r = !1);
        return r;
      }
      const pt = (function (t) {
        const e = `${t.toUpperCase()}:`.padStart(16),
          [r, n] = (function (t) {
            const e = (q ? j.process : {}).env || {},
              r = parseInt(e.DEBUG_MAX || '-1', 10);
            return [ct((e.DEBUG || '').toLowerCase().split(','), t), isNaN(r) ? -1 : r];
          })(t.toLowerCase());
        return {
          debug: r ? (...t) => ut('debug', e, t, n) : at,
          error: (...t) => ut('error', e, t),
          log: (...t) => ut('log', e, t),
          noop: at,
          warn: (...t) => ut('warn', e, t),
        };
      })('PostMessageProvider');
      let dt, mt;
      class gt {
        #t;
        isClonable = !0;
        #e = !1;
        #r = {};
        constructor(t) {
          (this.#t = new G()), (dt = t);
        }
        clone() {
          return new gt(dt);
        }
        async connect() {
          console.error('PostMessageProvider.disconnect() is not implemented.');
        }
        async disconnect() {
          console.error('PostMessageProvider.disconnect() is not implemented.');
        }
        get hasSubscriptions() {
          return !0;
        }
        get isConnected() {
          return this.#e;
        }
        listProviders() {
          return dt('pub(rpc.listProviders)', void 0);
        }
        on(t, e) {
          return (
            this.#t.on(t, e),
            () => {
              this.#t.removeListener(t, e);
            }
          );
        }
        async send(t, e, r, n) {
          if (n) {
            const { callback: r, type: i } = n,
              o = await dt('pub(rpc.subscribe)', { method: t, params: e, type: i }, t => {
                n.callback(null, t);
              });
            return (this.#r[`${i}::${o}`] = r), o;
          }
          return dt('pub(rpc.send)', { method: t, params: e });
        }
        async startProvider(t) {
          (this.#e = !1), this.#t.emit('disconnected');
          const e = await dt('pub(rpc.startProvider)', t);
          return (
            dt(
              'pub(rpc.subscribeConnected)',
              null,
              t => ((this.#e = t), t ? this.#t.emit('connected') : this.#t.emit('disconnected'), !0),
            ),
            e
          );
        }
        subscribe(t, e, r, n) {
          return this.send(e, r, !1, { callback: n, type: t });
        }
        async unsubscribe(t, e, r) {
          const n = `${t}::${r}`;
          return void 0 === this.#r[n]
            ? (pt.debug(() => `Unable to find active subscription=${n}`), !1)
            : (delete this.#r[n], this.send(e, [r]));
        }
      }
      let yt = 0;
      class vt {
        constructor(t) {
          mt = t;
        }
        async signPayload(t) {
          const e = ++yt;
          return { ...(await mt('pub(extrinsic.sign)', t)), id: e };
        }
        async signRaw(t) {
          const e = ++yt;
          return { ...(await mt('pub(bytes.sign)', t)), id: e };
        }
      }
      const wt = {};
      function Mt(r, n, i) {
        return new Promise((o, s) => {
          const h = `${t}.${Date.now()}.${++x}`;
          wt[h] = { reject: s, resolve: o, subscriber: i };
          const u = { id: h, message: r, origin: e, request: n || null };
          window.postMessage(u, '*');
        });
      }
      const Et = '1.0.3-0';
      window.addEventListener('message', ({ data: t, source: e }) => {
        e === window &&
          t.origin === n &&
          (t.id
            ? (function (t) {
                const e = wt[t.id];
                e
                  ? (e.subscriber || delete wt[t.id],
                    t.subscription
                      ? e.subscriber(t.subscription)
                      : t.error
                      ? e.reject(new s(E.INTERNAL_ERROR, t.error, t.errorCode))
                      : e.resolve(t.response))
                  : console.error(`Unknown response: ${JSON.stringify(t)}`);
              })(t)
            : console.error('Missing id for response.'));
      }),
        (function (t, { name: e, version: r }) {
          const n = window;
          (n.injectedWeb3 = n.injectedWeb3 || {}), (n.injectedWeb3[e] = { enable: e => t(e), version: r });
        })(
          async function (t) {
            return (
              await Mt('pub(authorize.tabV2)', { origin: t }),
              new (class {
                constructor(t) {
                  (this.accounts = new P(t)),
                    (this.metadata = new k(t)),
                    (this.provider = new gt(t)),
                    (this.signer = new vt(t));
                }
              })(Mt)
            );
          },
          { name: 'dfinn-js', version: Et },
        ),
        (function (t) {
          const e = window;
          e.SubWallet ? (e.SubWallet.provider = t) : (e.SubWallet = t),
            e.dispatchEvent(new Event('subwallet#initialized')),
            e.addEventListener('load', () => {
              e.ethereum || ((e.ethereum = t), e.dispatchEvent(new Event('ethereum#initialized')));
            });
        })(new U(Mt, '1.0.3-0'));
    })();
})();
