var nl = Object.defineProperty;
var Ai = (t) => {
  throw TypeError(t);
};
var rl = (t, e, a) => e in t ? nl(t, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[e] = a;
var ct = (t, e, a) => rl(t, typeof e != "symbol" ? e + "" : e, a), Vr = (t, e, a) => e.has(t) || Ai("Cannot " + a);
var y = (t, e, a) => (Vr(t, e, "read from private field"), a ? a.call(t) : e.get(t)), re = (t, e, a) => e.has(t) ? Ai("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), ae = (t, e, a, n) => (Vr(t, e, "write to private field"), n ? n.call(t, a) : e.set(t, a), a), ke = (t, e, a) => (Vr(t, e, "access private method"), a);
var oi = Array.isArray, il = Array.prototype.indexOf, fn = Array.prototype.includes, Dr = Array.from, pn = Object.defineProperty, sn = Object.getOwnPropertyDescriptor, sl = Object.getOwnPropertyDescriptors, ll = Object.prototype, ol = Array.prototype, Ki = Object.getPrototypeOf, Ei = Object.isExtensible;
const cl = () => {
};
function dl(t) {
  for (var e = 0; e < t.length; e++)
    t[e]();
}
function Ji() {
  var t, e, a = new Promise((n, r) => {
    t = n, e = r;
  });
  return { promise: a, resolve: t, reject: e };
}
const dt = 2, Nn = 4, Ir = 8, Zi = 1 << 24, la = 16, $t = 32, mn = 64, Jr = 128, qt = 512, We = 1024, rt = 2048, ca = 4096, bt = 8192, Lt = 16384, xn = 32768, Pi = 1 << 25, hn = 65536, $n = 1 << 17, ul = 1 << 18, Vn = 1 << 19, vl = 1 << 20, sa = 1 << 25, gn = 65536, Tr = 1 << 21, Ln = 1 << 22, za = 1 << 23, ln = Symbol("$state"), fl = Symbol("legacy props"), pl = Symbol(""), Xi = Symbol("proxy path"), ml = Symbol("hmr anchor"), ma = new class extends Error {
  constructor() {
    super(...arguments);
    ct(this, "name", "StaleReactionError");
    ct(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var qi;
const hl = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((qi = globalThis.document) != null && qi.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
), gl = 1, bl = 11;
function _l(t) {
  {
    const e = new Error(`invariant_violation
An invariant violation occurred, meaning Svelte's internal assumptions were flawed. This is a bug in Svelte, not your app — please open an issue at https://github.com/sveltejs/svelte, citing the following message: "${t}"
https://svelte.dev/e/invariant_violation`);
    throw e.name = "Svelte error", e;
  }
}
function xl() {
  {
    const t = new Error("snippet_without_render_tag\nAttempted to render a snippet without a `{@render}` block. This would cause the snippet code to be stringified instead of its content being rendered to the DOM. To fix this, change `{snippet}` to `{@render snippet()}`.\nhttps://svelte.dev/e/snippet_without_render_tag");
    throw t.name = "Svelte error", t;
  }
}
function yl() {
  {
    const t = new Error("async_derived_orphan\nCannot create a `$derived(...)` with an `await` expression outside of an effect tree\nhttps://svelte.dev/e/async_derived_orphan");
    throw t.name = "Svelte error", t;
  }
}
function Ni() {
  {
    const t = new Error("bind_invalid_checkbox_value\nUsing `bind:value` together with a checkbox input is not allowed. Use `bind:checked` instead\nhttps://svelte.dev/e/bind_invalid_checkbox_value");
    throw t.name = "Svelte error", t;
  }
}
function wl(t, e) {
  {
    const a = new Error(`component_api_changed
Calling \`${t}\` on a component instance (of ${e}) is no longer valid in Svelte 5
https://svelte.dev/e/component_api_changed`);
    throw a.name = "Svelte error", a;
  }
}
function kl(t, e) {
  {
    const a = new Error(`component_api_invalid_new
Attempted to instantiate ${t} with \`new ${e}\`, which is no longer valid in Svelte 5. If this component is not under your control, set the \`compatibility.componentApi\` compiler option to \`4\` to keep it working.
https://svelte.dev/e/component_api_invalid_new`);
    throw a.name = "Svelte error", a;
  }
}
function Sl() {
  {
    const t = new Error(`derived_references_self
A derived value cannot reference itself recursively
https://svelte.dev/e/derived_references_self`);
    throw t.name = "Svelte error", t;
  }
}
function Ml(t, e, a) {
  {
    const n = new Error(`each_key_duplicate
${a ? `Keyed each block has duplicate key \`${a}\` at indexes ${t} and ${e}` : `Keyed each block has duplicate key at indexes ${t} and ${e}`}
https://svelte.dev/e/each_key_duplicate`);
    throw n.name = "Svelte error", n;
  }
}
function Tl(t, e, a) {
  {
    const n = new Error(`each_key_volatile
Keyed each block has key that is not idempotent — the key for item at index ${t} was \`${e}\` but is now \`${a}\`. Keys must be the same each time for a given item
https://svelte.dev/e/each_key_volatile`);
    throw n.name = "Svelte error", n;
  }
}
function Cl(t) {
  {
    const e = new Error(`effect_in_teardown
\`${t}\` cannot be used inside an effect cleanup function
https://svelte.dev/e/effect_in_teardown`);
    throw e.name = "Svelte error", e;
  }
}
function Fl() {
  {
    const t = new Error("effect_in_unowned_derived\nEffect cannot be created inside a `$derived` value that was not itself created inside an effect\nhttps://svelte.dev/e/effect_in_unowned_derived");
    throw t.name = "Svelte error", t;
  }
}
function Al(t) {
  {
    const e = new Error(`effect_orphan
\`${t}\` can only be used inside an effect (e.g. during component initialisation)
https://svelte.dev/e/effect_orphan`);
    throw e.name = "Svelte error", e;
  }
}
function El() {
  {
    const t = new Error(`effect_update_depth_exceeded
Maximum update depth exceeded. This typically indicates that an effect reads and writes the same piece of state
https://svelte.dev/e/effect_update_depth_exceeded`);
    throw t.name = "Svelte error", t;
  }
}
function Pl() {
  {
    const t = new Error("invalid_snippet\nCould not `{@render}` snippet due to the expression being `null` or `undefined`. Consider using optional chaining `{@render snippet?.()}`\nhttps://svelte.dev/e/invalid_snippet");
    throw t.name = "Svelte error", t;
  }
}
function Nl(t) {
  {
    const e = new Error(`props_invalid_value
Cannot do \`bind:${t}={undefined}\` when \`${t}\` has a fallback value
https://svelte.dev/e/props_invalid_value`);
    throw e.name = "Svelte error", e;
  }
}
function Ll(t) {
  {
    const e = new Error(`rune_outside_svelte
The \`${t}\` rune is only available inside \`.svelte\` and \`.svelte.js/ts\` files
https://svelte.dev/e/rune_outside_svelte`);
    throw e.name = "Svelte error", e;
  }
}
function Dl() {
  {
    const t = new Error("state_descriptors_fixed\nProperty descriptors defined on `$state` objects must contain `value` and always be `enumerable`, `configurable` and `writable`.\nhttps://svelte.dev/e/state_descriptors_fixed");
    throw t.name = "Svelte error", t;
  }
}
function Il() {
  {
    const t = new Error("state_prototype_fixed\nCannot set prototype of `$state` object\nhttps://svelte.dev/e/state_prototype_fixed");
    throw t.name = "Svelte error", t;
  }
}
function Rl() {
  {
    const t = new Error("state_unsafe_mutation\nUpdating state inside `$derived(...)`, `$inspect(...)` or a template expression is forbidden. If the value should not be reactive, declare it without `$state`\nhttps://svelte.dev/e/state_unsafe_mutation");
    throw t.name = "Svelte error", t;
  }
}
function Bl() {
  {
    const t = new Error("svelte_boundary_reset_onerror\nA `<svelte:boundary>` `reset` function cannot be called while an error is still being handled\nhttps://svelte.dev/e/svelte_boundary_reset_onerror");
    throw t.name = "Svelte error", t;
  }
}
const Hl = 1, Ol = 2, Qi = 4, jl = 8, zl = 16, Gl = 1, Vl = 4, Ul = 8, ql = 16, Wl = 1, Yl = 2, $e = Symbol(), T = Symbol("filename"), $i = "http://www.w3.org/1999/xhtml", Kl = "http://www.w3.org/2000/svg", Jl = "http://www.w3.org/1998/Math/MathML";
var Ya = "font-weight: bold", Ka = "font-weight: normal";
function Zl(t) {
  console.warn(`%c[svelte] await_reactivity_loss
%cDetected reactivity loss when reading \`${t}\`. This happens when state is read in an async function after an earlier \`await\`
https://svelte.dev/e/await_reactivity_loss`, Ya, Ka);
}
function Xl() {
  console.warn(`%c[svelte] derived_inert
%cReading a derived belonging to a now-destroyed effect may result in stale values
https://svelte.dev/e/derived_inert`, Ya, Ka);
}
function Ql(t, e) {
  console.warn(`%c[svelte] event_handler_invalid
%c${t} should be a function. Did you mean to ${e}?
https://svelte.dev/e/event_handler_invalid`, Ya, Ka);
}
function $l() {
  console.warn(`%c[svelte] lifecycle_double_unmount
%cTried to unmount a component that was not mounted
https://svelte.dev/e/lifecycle_double_unmount`, Ya, Ka);
}
function eo() {
  console.warn("%c[svelte] select_multiple_invalid_value\n%cThe `value` property of a `<select multiple>` element should be an array, but it received a non-array value. The selection will be kept as is.\nhttps://svelte.dev/e/select_multiple_invalid_value", Ya, Ka);
}
function br(t) {
  console.warn(`%c[svelte] state_proxy_equality_mismatch
%cReactive \`$state(...)\` proxies and the values they proxy have different identities. Because of this, comparisons with \`${t}\` will produce unexpected results
https://svelte.dev/e/state_proxy_equality_mismatch`, Ya, Ka);
}
function to() {
  console.warn(`%c[svelte] state_proxy_unmount
%cTried to unmount a state proxy, rather than a component
https://svelte.dev/e/state_proxy_unmount`, Ya, Ka);
}
function ao() {
  console.warn("%c[svelte] svelte_boundary_reset_noop\n%cA `<svelte:boundary>` `reset` function only resets the boundary the first time it is called\nhttps://svelte.dev/e/svelte_boundary_reset_noop", Ya, Ka);
}
function es(t) {
  return t === this.v;
}
function no(t, e) {
  return t != t ? e == e : t !== e || t !== null && typeof t == "object" || typeof t == "function";
}
function ts(t) {
  return !no(t, this.v);
}
let ro = !1;
function L(t, e) {
  return t.label = e, as(t.v, e), t;
}
function as(t, e) {
  var a;
  return (a = t == null ? void 0 : t[Xi]) == null || a.call(t, e), t;
}
function ns(t) {
  const e = new Error(), a = io();
  return a.length === 0 ? null : (a.unshift(`
`), pn(e, "stack", {
    value: a.join(`
`)
  }), pn(e, "name", {
    value: t
  }), /** @type {Error & { stack: string }} */
  e);
}
function io() {
  const t = Error.stackTraceLimit;
  Error.stackTraceLimit = 1 / 0;
  const e = new Error().stack;
  if (Error.stackTraceLimit = t, !e) return [];
  const a = e.split(`
`), n = [];
  for (let r = 0; r < a.length; r++) {
    const i = a[r], l = i.replaceAll("\\", "/");
    if (i.trim() !== "Error") {
      if (i.includes("validate_each_keys"))
        return [];
      l.includes("svelte/src/internal") || l.includes("node_modules/.vite") || n.push(i);
    }
  }
  return n;
}
function so(t, e) {
  t || _l(e);
}
let Ye = null;
function Dn(t) {
  Ye = t;
}
let wa = null;
function Cr(t) {
  wa = t;
}
function C(t, e, a, n, r, i) {
  const l = wa;
  wa = {
    type: e,
    file: a[T],
    line: n,
    column: r,
    parent: l,
    ...i
  };
  try {
    return t();
  } finally {
    wa = l;
  }
}
let Un = null;
function Fr(t) {
  Un = t;
}
function fe(t, e = !1, a) {
  Ye = {
    p: Ye,
    i: !1,
    c: null,
    e: null,
    s: t,
    x: null,
    r: (
      /** @type {Effect} */
      ce
    ),
    l: null
  }, Ye.function = a, Un = a;
}
function pe(t) {
  var e = (
    /** @type {ComponentContext} */
    Ye
  ), a = e.e;
  if (a !== null) {
    e.e = null;
    for (var n of a)
      Ms(n);
  }
  return t !== void 0 && (e.x = t), e.i = !0, Ye = e.p, Un = (Ye == null ? void 0 : Ye.function) ?? null, t ?? /** @type {T} */
  {};
}
function rs() {
  return !0;
}
let Xa = [];
function is() {
  var t = Xa;
  Xa = [], dl(t);
}
function Ga(t) {
  if (Xa.length === 0 && !Jn) {
    var e = Xa;
    queueMicrotask(() => {
      e === Xa && is();
    });
  }
  Xa.push(t);
}
function lo() {
  for (; Xa.length > 0; )
    is();
}
const Zr = /* @__PURE__ */ new WeakMap();
function ss(t) {
  var e = ce;
  if (e === null)
    return ue.f |= za, t;
  if (t instanceof Error && !Zr.has(t) && Zr.set(t, oo(t, e)), (e.f & xn) === 0 && (e.f & Nn) === 0)
    throw !e.parent && t instanceof Error && ls(t), t;
  Ha(t, e);
}
function Ha(t, e) {
  for (; e !== null; ) {
    if ((e.f & Jr) !== 0) {
      if ((e.f & xn) === 0)
        throw t;
      try {
        e.b.error(t);
        return;
      } catch (a) {
        t = a;
      }
    }
    e = e.parent;
  }
  throw t instanceof Error && ls(t), t;
}
function oo(t, e) {
  var l, o, c;
  const a = sn(t, "message");
  if (!(a && !a.configurable)) {
    for (var n = mi ? "  " : "	", r = `
${n}in ${((l = e.fn) == null ? void 0 : l.name) || "<unknown>"}`, i = e.ctx; i !== null; )
      r += `
${n}in ${(o = i.function) == null ? void 0 : o[T].split("/").pop()}`, i = i.p;
    return {
      message: t.message + `
${r}
`,
      stack: (c = t.stack) == null ? void 0 : c.split(`
`).filter((p) => !p.includes("svelte/src/internal")).join(`
`)
    };
  }
}
function ls(t) {
  const e = Zr.get(t);
  e && (pn(t, "message", {
    value: e.message
  }), pn(t, "stack", {
    value: e.stack
  }));
}
const co = -7169;
function Ne(t, e) {
  t.f = t.f & co | e;
}
function ci(t) {
  (t.f & qt) !== 0 || t.deps === null ? Ne(t, We) : Ne(t, ca);
}
function os(t) {
  if (t !== null)
    for (const e of t)
      (e.f & dt) === 0 || (e.f & gn) === 0 || (e.f ^= gn, os(
        /** @type {Derived} */
        e.deps
      ));
}
function cs(t, e, a) {
  (t.f & rt) !== 0 ? e.add(t) : (t.f & ca) !== 0 && a.add(t), os(t.deps), Ne(t, We);
}
let hr = !1;
function uo(t) {
  var e = hr;
  try {
    return hr = !1, [t(), hr];
  } finally {
    hr = e;
  }
}
const Ja = /* @__PURE__ */ new Set();
let $ = null, nt = null, Xr = null, Jn = !1, Ur = !1, Tn = null, _r = null;
var Li = 0, vo = /* @__PURE__ */ new Set();
let fo = 1;
var Cn, Fn, en, ha, ta, nr, xt, rr, Pa, ga, aa, An, En, tn, Ge, xr, ds, yr, Qr, wr, po;
const Pr = class Pr {
  constructor() {
    re(this, Ge);
    ct(this, "id", fo++);
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    ct(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    ct(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    re(this, Cn, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    re(this, Fn, /* @__PURE__ */ new Set());
    /**
     * Callbacks that should run only when a fork is committed.
     * @type {Set<(batch: Batch) => void>}
     */
    re(this, en, /* @__PURE__ */ new Set());
    /**
     * Async effects that are currently in flight
     * @type {Map<Effect, number>}
     */
    re(this, ha, /* @__PURE__ */ new Map());
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    re(this, ta, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    re(this, nr, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    re(this, xt, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    re(this, rr, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    re(this, Pa, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    re(this, ga, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    re(this, aa, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    re(this, An, /* @__PURE__ */ new Set());
    ct(this, "is_fork", !1);
    re(this, En, !1);
    /** @type {Set<Batch>} */
    re(this, tn, /* @__PURE__ */ new Set());
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(e) {
    y(this, aa).has(e) || y(this, aa).set(e, { d: [], m: [] }), y(this, An).delete(e);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(e, a = (n) => this.schedule(n)) {
    var n = y(this, aa).get(e);
    if (n) {
      y(this, aa).delete(e);
      for (var r of n.d)
        Ne(r, rt), a(r);
      for (r of n.m)
        Ne(r, ca), a(r);
    }
    y(this, An).add(e);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(e, a, n = !1) {
    e.v !== $e && !this.previous.has(e) && this.previous.set(e, e.v), (e.f & za) === 0 && (this.current.set(e, [a, n]), nt == null || nt.set(e, a)), this.is_fork || (e.v = a);
  }
  activate() {
    $ = this;
  }
  deactivate() {
    $ = null, nt = null;
  }
  flush() {
    var e = /* @__PURE__ */ new Set();
    try {
      Ur = !0, $ = this, ke(this, Ge, yr).call(this);
    } finally {
      Li = 0, Xr = null, Tn = null, _r = null, Ur = !1, $ = null, nt = null, on.clear();
      for (
        const a of
        /** @type {Set<Source>} */
        e
      )
        a.updated = null;
    }
  }
  discard() {
    for (const e of y(this, Fn)) e(this);
    y(this, Fn).clear(), y(this, en).clear(), Ja.delete(this);
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(e) {
    y(this, rr).push(e);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(e, a) {
    let n = y(this, ha).get(a) ?? 0;
    if (y(this, ha).set(a, n + 1), e) {
      let r = y(this, ta).get(a) ?? 0;
      y(this, ta).set(a, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   * @param {boolean} skip - whether to skip updates (because this is triggered by a stale reaction)
   */
  decrement(e, a, n) {
    let r = y(this, ha).get(a) ?? 0;
    if (r === 1 ? y(this, ha).delete(a) : y(this, ha).set(a, r - 1), e) {
      let i = y(this, ta).get(a) ?? 0;
      i === 1 ? y(this, ta).delete(a) : y(this, ta).set(a, i - 1);
    }
    y(this, En) || n || (ae(this, En, !0), Ga(() => {
      ae(this, En, !1), this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(e, a) {
    for (const n of e)
      y(this, Pa).add(n);
    for (const n of a)
      y(this, ga).add(n);
    e.clear(), a.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(e) {
    y(this, Cn).add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(e) {
    y(this, Fn).add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  on_fork_commit(e) {
    y(this, en).add(e);
  }
  run_fork_commit_callbacks() {
    for (const e of y(this, en)) e(this);
    y(this, en).clear();
  }
  settled() {
    return (y(this, nr) ?? ae(this, nr, Ji())).promise;
  }
  static ensure() {
    if ($ === null) {
      const e = $ = new Pr();
      Ur || (Ja.add($), Jn || Ga(() => {
        $ === e && e.flush();
      }));
    }
    return $;
  }
  apply() {
    {
      nt = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(e) {
    var r;
    if (Xr = e, (r = e.b) != null && r.is_pending && (e.f & (Nn | Ir | Zi)) !== 0 && (e.f & xn) === 0) {
      e.b.defer_effect(e);
      return;
    }
    for (var a = e; a.parent !== null; ) {
      a = a.parent;
      var n = a.f;
      if (Tn !== null && a === ce && (ue === null || (ue.f & dt) === 0))
        return;
      if ((n & (mn | $t)) !== 0) {
        if ((n & We) === 0)
          return;
        a.f ^= We;
      }
    }
    y(this, xt).push(a);
  }
};
Cn = new WeakMap(), Fn = new WeakMap(), en = new WeakMap(), ha = new WeakMap(), ta = new WeakMap(), nr = new WeakMap(), xt = new WeakMap(), rr = new WeakMap(), Pa = new WeakMap(), ga = new WeakMap(), aa = new WeakMap(), An = new WeakMap(), En = new WeakMap(), tn = new WeakMap(), Ge = new WeakSet(), xr = function() {
  return this.is_fork || y(this, ta).size > 0;
}, ds = function() {
  for (const n of y(this, tn))
    for (const r of y(n, ta).keys()) {
      for (var e = !1, a = r; a.parent !== null; ) {
        if (y(this, aa).has(a)) {
          e = !0;
          break;
        }
        a = a.parent;
      }
      if (!e)
        return !0;
    }
  return !1;
}, yr = function() {
  var o, c;
  if (Li++ > 1e3 && (Ja.delete(this), ho()), !ke(this, Ge, xr).call(this)) {
    for (const p of y(this, Pa))
      y(this, ga).delete(p), Ne(p, rt), this.schedule(p);
    for (const p of y(this, ga))
      Ne(p, ca), this.schedule(p);
  }
  const e = y(this, xt);
  ae(this, xt, []), this.apply();
  var a = Tn = [], n = [], r = _r = [];
  for (const p of e)
    try {
      ke(this, Ge, Qr).call(this, p, a, n);
    } catch (d) {
      throw fs(p), d;
    }
  if ($ = null, r.length > 0) {
    var i = Pr.ensure();
    for (const p of r)
      i.schedule(p);
  }
  if (Tn = null, _r = null, ke(this, Ge, xr).call(this) || ke(this, Ge, ds).call(this)) {
    ke(this, Ge, wr).call(this, n), ke(this, Ge, wr).call(this, a);
    for (const [p, d] of y(this, aa))
      vs(p, d);
  } else {
    y(this, ha).size === 0 && Ja.delete(this), y(this, Pa).clear(), y(this, ga).clear();
    for (const p of y(this, Cn)) p(this);
    y(this, Cn).clear(), Di(n), Di(a), (o = y(this, nr)) == null || o.resolve();
  }
  var l = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    $
  );
  if (y(this, xt).length > 0) {
    const p = l ?? (l = this);
    y(p, xt).push(...y(this, xt).filter((d) => !y(p, xt).includes(d)));
  }
  if (l !== null) {
    Ja.add(l);
    for (const p of this.current.keys())
      vo.add(p);
    ke(c = l, Ge, yr).call(c);
  }
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
Qr = function(e, a, n) {
  e.f ^= We;
  for (var r = e.first; r !== null; ) {
    var i = r.f, l = (i & ($t | mn)) !== 0, o = l && (i & We) !== 0, c = o || (i & bt) !== 0 || y(this, aa).has(r);
    if (!c && r.fn !== null) {
      l ? r.f ^= We : (i & Nn) !== 0 ? a.push(r) : ur(r) && ((i & la) !== 0 && y(this, ga).add(r), Bn(r));
      var p = r.first;
      if (p !== null) {
        r = p;
        continue;
      }
    }
    for (; r !== null; ) {
      var d = r.next;
      if (d !== null) {
        r = d;
        break;
      }
      r = r.parent;
    }
  }
}, /**
 * @param {Effect[]} effects
 */
wr = function(e) {
  for (var a = 0; a < e.length; a += 1)
    cs(e[a], y(this, Pa), y(this, ga));
}, po = function() {
  var d, f, u;
  for (const g of Ja) {
    var e = g.id < this.id, a = [];
    for (const [h, [_, b]] of this.current) {
      if (g.current.has(h)) {
        var n = (
          /** @type {[any, boolean]} */
          g.current.get(h)[0]
        );
        if (e && _ !== n)
          g.current.set(h, [_, b]);
        else
          continue;
      }
      a.push(h);
    }
    var r = [...g.current.keys()].filter((h) => !this.current.has(h));
    if (r.length === 0)
      e && g.discard();
    else if (a.length > 0) {
      if (so(y(g, xt).length === 0, "Batch has scheduled roots"), e)
        for (const h of y(this, An))
          g.unskip_effect(h, (_) => {
            var b;
            (_.f & (la | Ln)) !== 0 ? g.schedule(_) : ke(b = g, Ge, wr).call(b, [_]);
          });
      g.activate();
      var i = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
      for (var o of a)
        us(o, r, i, l);
      l = /* @__PURE__ */ new Map();
      var c = [...g.current.keys()].filter(
        (h) => this.current.has(h) ? (
          /** @type {[any, boolean]} */
          this.current.get(h)[0] !== h
        ) : !0
      );
      for (const h of y(this, rr))
        (h.f & (Lt | bt | $n)) === 0 && di(h, c, l) && ((h.f & (Ln | la)) !== 0 ? (Ne(h, rt), g.schedule(h)) : y(g, Pa).add(h));
      if (y(g, xt).length > 0) {
        g.apply();
        for (var p of y(g, xt))
          ke(d = g, Ge, Qr).call(d, p, [], []);
        ae(g, xt, []);
      }
      g.deactivate();
    }
  }
  for (const g of Ja)
    y(g, tn).has(this) && (y(g, tn).delete(this), y(g, tn).size === 0 && !ke(f = g, Ge, xr).call(f) && (g.activate(), ke(u = g, Ge, yr).call(u)));
};
let bn = Pr;
function mo(t) {
  var e = Jn;
  Jn = !0;
  try {
    for (var a; ; ) {
      if (lo(), $ === null)
        return (
          /** @type {T} */
          a
        );
      $.flush();
    }
  } finally {
    Jn = e;
  }
}
function ho() {
  {
    var t = /* @__PURE__ */ new Map();
    for (
      const a of
      /** @type {Batch} */
      $.current.keys()
    )
      for (const [n, r] of a.updated ?? []) {
        var e = t.get(n);
        e || (e = { error: r.error, count: 0 }, t.set(n, e)), e.count += r.count;
      }
    for (const a of t.values())
      a.error && console.error(a.error);
  }
  try {
    El();
  } catch (a) {
    pn(a, "stack", { value: "" }), Ha(a, Xr);
  }
}
let Jt = null;
function Di(t) {
  var e = t.length;
  if (e !== 0) {
    for (var a = 0; a < e; ) {
      var n = t[a++];
      if ((n.f & (Lt | bt)) === 0 && ur(n) && (Jt = /* @__PURE__ */ new Set(), Bn(n), n.deps === null && n.first === null && n.nodes === null && n.teardown === null && n.ac === null && As(n), (Jt == null ? void 0 : Jt.size) > 0)) {
        on.clear();
        for (const r of Jt) {
          if ((r.f & (Lt | bt)) !== 0) continue;
          const i = [r];
          let l = r.parent;
          for (; l !== null; )
            Jt.has(l) && (Jt.delete(l), i.push(l)), l = l.parent;
          for (let o = i.length - 1; o >= 0; o--) {
            const c = i[o];
            (c.f & (Lt | bt)) === 0 && Bn(c);
          }
        }
        Jt.clear();
      }
    }
    Jt = null;
  }
}
function us(t, e, a, n) {
  if (!a.has(t) && (a.add(t), t.reactions !== null))
    for (const r of t.reactions) {
      const i = r.f;
      (i & dt) !== 0 ? us(
        /** @type {Derived} */
        r,
        e,
        a,
        n
      ) : (i & (Ln | la)) !== 0 && (i & rt) === 0 && di(r, e, n) && (Ne(r, rt), vi(
        /** @type {Effect} */
        r
      ));
    }
}
function di(t, e, a) {
  const n = a.get(t);
  if (n !== void 0) return n;
  if (t.deps !== null)
    for (const r of t.deps) {
      if (fn.call(e, r))
        return !0;
      if ((r.f & dt) !== 0 && di(
        /** @type {Derived} */
        r,
        e,
        a
      ))
        return a.set(
          /** @type {Derived} */
          r,
          !0
        ), !0;
    }
  return a.set(t, !1), !1;
}
function vi(t) {
  $.schedule(t);
}
function vs(t, e) {
  if (!((t.f & $t) !== 0 && (t.f & We) !== 0)) {
    (t.f & rt) !== 0 ? e.d.push(t) : (t.f & ca) !== 0 && e.m.push(t), Ne(t, We);
    for (var a = t.first; a !== null; )
      vs(a, e), a = a.next;
  }
}
function fs(t) {
  Ne(t, We);
  for (var e = t.first; e !== null; )
    fs(e), e = e.next;
}
function go(t) {
  let e = 0, a = _n(0), n;
  return L(a, "createSubscriber version"), () => {
    hi() && (s(a), Ts(() => (e === 0 && (n = yi(() => t(() => Xn(a)))), e += 1, () => {
      Ga(() => {
        e -= 1, e === 0 && (n == null || n(), n = void 0, Xn(a));
      });
    })));
  };
}
var bo = hn | Vn;
function _o(t, e, a, n) {
  new xo(t, e, a, n);
}
var Ot, li, jt, an, yt, zt, mt, Ct, ba, nn, Na, Pn, ir, sr, na, Nr, Pe, yo, wo, ko, $r, kr, Sr, ei, ti;
class xo {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(e, a, n, r) {
    re(this, Pe);
    /** @type {Boundary | null} */
    ct(this, "parent");
    ct(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    ct(this, "transform_error");
    /** @type {TemplateNode} */
    re(this, Ot);
    /** @type {TemplateNode | null} */
    re(this, li, null);
    /** @type {BoundaryProps} */
    re(this, jt);
    /** @type {((anchor: Node) => void)} */
    re(this, an);
    /** @type {Effect} */
    re(this, yt);
    /** @type {Effect | null} */
    re(this, zt, null);
    /** @type {Effect | null} */
    re(this, mt, null);
    /** @type {Effect | null} */
    re(this, Ct, null);
    /** @type {DocumentFragment | null} */
    re(this, ba, null);
    re(this, nn, 0);
    re(this, Na, 0);
    re(this, Pn, !1);
    /** @type {Set<Effect>} */
    re(this, ir, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    re(this, sr, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    re(this, na, null);
    re(this, Nr, go(() => (ae(this, na, _n(y(this, nn))), L(y(this, na), "$effect.pending()"), () => {
      ae(this, na, null);
    })));
    var i;
    ae(this, Ot, e), ae(this, jt, a), ae(this, an, (l) => {
      var o = (
        /** @type {Effect} */
        ce
      );
      o.b = this, o.f |= Jr, n(l);
    }), this.parent = /** @type {Effect} */
    ce.b, this.transform_error = r ?? ((i = this.parent) == null ? void 0 : i.transform_error) ?? ((l) => l), ae(this, yt, dr(() => {
      ke(this, Pe, $r).call(this);
    }, bo));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(e) {
    cs(e, y(this, ir), y(this, sr));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!y(this, jt).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(e, a) {
    ke(this, Pe, ei).call(this, e, a), ae(this, nn, y(this, nn) + e), !(!y(this, na) || y(this, Pn)) && (ae(this, Pn, !0), Ga(() => {
      ae(this, Pn, !1), y(this, na) && Rn(y(this, na), y(this, nn));
    }));
  }
  get_effect_pending() {
    return y(this, Nr).call(this), s(
      /** @type {Source<number>} */
      y(this, na)
    );
  }
  /** @param {unknown} error */
  error(e) {
    if (!y(this, jt).onerror && !y(this, jt).failed)
      throw e;
    $ != null && $.is_fork ? (y(this, zt) && $.skip_effect(y(this, zt)), y(this, mt) && $.skip_effect(y(this, mt)), y(this, Ct) && $.skip_effect(y(this, Ct)), $.on_fork_commit(() => {
      ke(this, Pe, ti).call(this, e);
    })) : ke(this, Pe, ti).call(this, e);
  }
}
Ot = new WeakMap(), li = new WeakMap(), jt = new WeakMap(), an = new WeakMap(), yt = new WeakMap(), zt = new WeakMap(), mt = new WeakMap(), Ct = new WeakMap(), ba = new WeakMap(), nn = new WeakMap(), Na = new WeakMap(), Pn = new WeakMap(), ir = new WeakMap(), sr = new WeakMap(), na = new WeakMap(), Nr = new WeakMap(), Pe = new WeakSet(), yo = function() {
  try {
    ae(this, zt, Vt(() => y(this, an).call(this, y(this, Ot))));
  } catch (e) {
    this.error(e);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
wo = function(e) {
  const a = y(this, jt).failed;
  a && ae(this, Ct, Vt(() => {
    a(
      y(this, Ot),
      () => e,
      () => () => {
      }
    );
  }));
}, ko = function() {
  const e = y(this, jt).pending;
  e && (this.is_pending = !0, ae(this, mt, Vt(() => e(y(this, Ot)))), Ga(() => {
    var a = ae(this, ba, document.createDocumentFragment()), n = ka();
    a.append(n), ae(this, zt, ke(this, Pe, Sr).call(this, () => Vt(() => y(this, an).call(this, n)))), y(this, Na) === 0 && (y(this, Ot).before(a), ae(this, ba, null), dn(
      /** @type {Effect} */
      y(this, mt),
      () => {
        ae(this, mt, null);
      }
    ), ke(this, Pe, kr).call(
      this,
      /** @type {Batch} */
      $
    ));
  }));
}, $r = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), ae(this, Na, 0), ae(this, nn, 0), ae(this, zt, Vt(() => {
      y(this, an).call(this, y(this, Ot));
    })), y(this, Na) > 0) {
      var e = ae(this, ba, document.createDocumentFragment());
      xi(y(this, zt), e);
      const a = (
        /** @type {(anchor: Node) => void} */
        y(this, jt).pending
      );
      ae(this, mt, Vt(() => a(y(this, Ot))));
    } else
      ke(this, Pe, kr).call(
        this,
        /** @type {Batch} */
        $
      );
  } catch (a) {
    this.error(a);
  }
}, /**
 * @param {Batch} batch
 */
kr = function(e) {
  this.is_pending = !1, e.transfer_effects(y(this, ir), y(this, sr));
}, /**
 * @template T
 * @param {() => T} fn
 */
Sr = function(e) {
  var a = ce, n = ue, r = Ye;
  da(y(this, yt)), Yt(y(this, yt)), Dn(y(this, yt).ctx);
  try {
    return bn.ensure(), e();
  } catch (i) {
    return ss(i), null;
  } finally {
    da(a), Yt(n), Dn(r);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
ei = function(e, a) {
  var n;
  if (!this.has_pending_snippet()) {
    this.parent && ke(n = this.parent, Pe, ei).call(n, e, a);
    return;
  }
  ae(this, Na, y(this, Na) + e), y(this, Na) === 0 && (ke(this, Pe, kr).call(this, a), y(this, mt) && dn(y(this, mt), () => {
    ae(this, mt, null);
  }), y(this, ba) && (y(this, Ot).before(y(this, ba)), ae(this, ba, null)));
}, /**
 * @param {unknown} error
 */
ti = function(e) {
  y(this, zt) && (wt(y(this, zt)), ae(this, zt, null)), y(this, mt) && (wt(y(this, mt)), ae(this, mt, null)), y(this, Ct) && (wt(y(this, Ct)), ae(this, Ct, null));
  var a = y(this, jt).onerror;
  let n = y(this, jt).failed;
  var r = !1, i = !1;
  const l = () => {
    if (r) {
      ao();
      return;
    }
    r = !0, i && Bl(), y(this, Ct) !== null && dn(y(this, Ct), () => {
      ae(this, Ct, null);
    }), ke(this, Pe, Sr).call(this, () => {
      ke(this, Pe, $r).call(this);
    });
  }, o = (c) => {
    try {
      i = !0, a == null || a(c, l), i = !1;
    } catch (p) {
      Ha(p, y(this, yt) && y(this, yt).parent);
    }
    n && ae(this, Ct, ke(this, Pe, Sr).call(this, () => {
      try {
        return Vt(() => {
          var p = (
            /** @type {Effect} */
            ce
          );
          p.b = this, p.f |= Jr, n(
            y(this, Ot),
            () => c,
            () => l
          );
        });
      } catch (p) {
        return Ha(
          p,
          /** @type {Effect} */
          y(this, yt).parent
        ), null;
      }
    }));
  };
  Ga(() => {
    var c;
    try {
      c = this.transform_error(e);
    } catch (p) {
      Ha(p, y(this, yt) && y(this, yt).parent);
      return;
    }
    c !== null && typeof c == "object" && typeof /** @type {any} */
    c.then == "function" ? c.then(
      o,
      /** @param {unknown} e */
      (p) => Ha(p, y(this, yt) && y(this, yt).parent)
    ) : o(c);
  });
};
function So(t, e, a, n) {
  const r = Rr;
  var i = t.filter((u) => !u.settled);
  if (a.length === 0 && i.length === 0) {
    n(e.map(r));
    return;
  }
  var l = (
    /** @type {Effect} */
    ce
  ), o = Mo(), c = i.length === 1 ? i[0].promise : i.length > 1 ? Promise.all(i.map((u) => u.promise)) : null;
  function p(u) {
    o();
    try {
      n(u);
    } catch (g) {
      (l.f & Lt) === 0 && Ha(g, l);
    }
    Ar();
  }
  if (a.length === 0) {
    c.then(() => p(e.map(r)));
    return;
  }
  var d = ps();
  function f() {
    Promise.all(a.map((u) => /* @__PURE__ */ Co(u))).then((u) => p([...e.map(r), ...u])).catch((u) => Ha(u, l)).finally(() => d());
  }
  c ? c.then(() => {
    o(), f(), Ar();
  }) : f();
}
function Mo() {
  var t = (
    /** @type {Effect} */
    ce
  ), e = ue, a = Ye, n = (
    /** @type {Batch} */
    $
  ), r = wa;
  return function(l = !0) {
    da(t), Yt(e), Dn(a), l && (t.f & Lt) === 0 && (n == null || n.activate(), n == null || n.apply()), Zn(null), Cr(r);
  };
}
async function Ae(t) {
  var e = gt;
  queueMicrotask(() => {
    gt === e && Zn(null);
  });
  var a = await t;
  return () => (Zn(e), queueMicrotask(() => {
    gt === e && Zn(null);
  }), a);
}
function Ar(t = !0) {
  da(null), Yt(null), Dn(null), t && ($ == null || $.deactivate()), Zn(null), Cr(null);
}
function ps() {
  var t = (
    /** @type {Effect} */
    ce
  ), e = (
    /** @type {Boundary} */
    t.b
  ), a = (
    /** @type {Batch} */
    $
  ), n = e.is_rendered();
  return e.update_pending_count(1, a), a.increment(n, t), (r = !1) => {
    e.update_pending_count(-1, a), a.decrement(n, t, r);
  };
}
let gt = null;
function Zn(t) {
  gt = t;
}
const To = /* @__PURE__ */ new Set();
// @__NO_SIDE_EFFECTS__
function Rr(t) {
  var e = dt | rt;
  return ce !== null && (ce.f |= Vn), {
    ctx: Ye,
    deps: null,
    effects: null,
    equals: es,
    f: e,
    fn: t,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      $e
    ),
    wv: 0,
    parent: ce,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function Co(t, e, a) {
  let n = (
    /** @type {Effect | null} */
    ce
  );
  n === null && yl();
  var r = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), i = _n(
    /** @type {V} */
    $e
  );
  i.label = e;
  var l = !ue, o = /* @__PURE__ */ new Map();
  return Uo(() => {
    var g;
    var c = (
      /** @type {Effect} */
      ce
    );
    gt = { effect: c, effect_deps: /* @__PURE__ */ new Set(), warned: !1 };
    var p = Ji();
    r = p.promise;
    try {
      Promise.resolve(t()).then(p.resolve, p.reject).finally(Ar);
    } catch (h) {
      p.reject(h), Ar();
    }
    {
      if (gt) {
        if (c.deps !== null)
          for (let h = 0; h < _t; h += 1)
            gt.effect_deps.add(c.deps[h]);
        if (tt !== null)
          for (let h = 0; h < tt.length; h += 1)
            gt.effect_deps.add(tt[h]);
      }
      gt = null;
    }
    var d = (
      /** @type {Batch} */
      $
    );
    if (l) {
      if ((c.f & xn) !== 0)
        var f = ps();
      if (
        /** @type {Boundary} */
        n.b.is_rendered()
      )
        (g = o.get(d)) == null || g.reject(ma), o.delete(d);
      else {
        for (const h of o.values())
          h.reject(ma);
        o.clear();
      }
      o.set(d, p);
    }
    const u = (h, _ = void 0) => {
      if (gt = null, f) {
        var b = _ === ma;
        f(b);
      }
      if (!(_ === ma || (c.f & Lt) !== 0)) {
        if (d.activate(), _)
          i.f |= za, Rn(i, _);
        else {
          (i.f & za) !== 0 && (i.f ^= za), Rn(i, h);
          for (const [k, E] of o) {
            if (o.delete(k), k === d) break;
            E.reject(ma);
          }
        }
        d.deactivate();
      }
    };
    p.promise.then(u, (h) => u(null, h || "unknown"));
  }), gi(() => {
    for (const c of o.values())
      c.reject(ma);
  }), i.f |= Ln, new Promise((c) => {
    function p(d) {
      function f() {
        d === r ? c(i) : p(r);
      }
      d.then(f, f);
    }
    p(r);
  });
}
// @__NO_SIDE_EFFECTS__
function J(t) {
  const e = /* @__PURE__ */ Rr(t);
  return Ns(e), e;
}
// @__NO_SIDE_EFFECTS__
function ms(t) {
  const e = /* @__PURE__ */ Rr(t);
  return e.equals = ts, e;
}
function Fo(t) {
  var e = t.effects;
  if (e !== null) {
    t.effects = null;
    for (var a = 0; a < e.length; a += 1)
      wt(
        /** @type {Effect} */
        e[a]
      );
  }
}
let qr = [];
function fi(t) {
  var e, a = ce, n = t.parent;
  if (!Sa && n !== null && (n.f & (Lt | bt)) !== 0)
    return Xl(), t.v;
  da(n);
  {
    let r = In;
    Ii(/* @__PURE__ */ new Set());
    try {
      fn.call(qr, t) && Sl(), qr.push(t), t.f &= ~gn, Fo(t), e = Rs(t);
    } finally {
      da(a), Ii(r), qr.pop();
    }
  }
  return e;
}
function hs(t) {
  var e = fi(t);
  if (!t.equals(e) && (t.wv = Ds(), (!($ != null && $.is_fork) || t.deps === null) && ($ !== null ? $.capture(t, e, !0) : t.v = e, t.deps === null))) {
    Ne(t, We);
    return;
  }
  Sa || (nt !== null ? (hi() || $ != null && $.is_fork) && nt.set(t, e) : ci(t));
}
function Ao(t) {
  var e, a;
  if (t.effects !== null)
    for (const n of t.effects)
      (n.teardown || n.ac) && ((e = n.teardown) == null || e.call(n), (a = n.ac) == null || a.abort(ma), n.teardown = cl, n.ac = null, er(n, 0), bi(n));
}
function gs(t) {
  if (t.effects !== null)
    for (const e of t.effects)
      e.teardown && Bn(e);
}
let In = /* @__PURE__ */ new Set();
const on = /* @__PURE__ */ new Map();
function Ii(t) {
  In = t;
}
let pi = !1;
function Eo() {
  pi = !0;
}
function _n(t, e) {
  var a = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: t,
    reactions: null,
    equals: es,
    rv: 0,
    wv: 0
  };
  return a;
}
// @__NO_SIDE_EFFECTS__
function ve(t, e) {
  const a = _n(t);
  return Ns(a), a;
}
// @__NO_SIDE_EFFECTS__
function Po(t, e = !1, a = !0) {
  const n = _n(t);
  return e || (n.equals = ts), n;
}
function _e(t, e, a = !1) {
  ue !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Ut || (ue.f & $n) !== 0) && rs() && (ue.f & (dt | la | Ln | $n)) !== 0 && (Wt === null || !fn.call(Wt, t)) && Rl();
  let n = a ? Oa(e) : e;
  return as(
    n,
    /** @type {string} */
    t.label
  ), Rn(t, n, _r);
}
function Rn(t, e, a = null) {
  var r;
  if (!t.equals(e)) {
    on.set(t, Sa ? e : t.v);
    var n = bn.ensure();
    n.capture(t, e);
    {
      if (ce !== null) {
        t.updated ?? (t.updated = /* @__PURE__ */ new Map());
        const i = (((r = t.updated.get("")) == null ? void 0 : r.count) ?? 0) + 1;
        if (t.updated.set("", { error: (
          /** @type {any} */
          null
        ), count: i }), i > 5) {
          const l = ns("updated at");
          if (l !== null) {
            let o = t.updated.get(l.stack);
            o || (o = { error: l, count: 0 }, t.updated.set(l.stack, o)), o.count++;
          }
        }
      }
      ce !== null && (t.set_during_effect = !0);
    }
    if ((t.f & dt) !== 0) {
      const i = (
        /** @type {Derived} */
        t
      );
      (t.f & rt) !== 0 && fi(i), nt === null && ci(i);
    }
    t.wv = Ds(), _s(t, rt, a), ce !== null && (ce.f & We) !== 0 && (ce.f & ($t | mn)) === 0 && (Rt === null ? Wo([t]) : Rt.push(t)), !n.is_fork && In.size > 0 && !pi && bs();
  }
  return e;
}
function bs() {
  pi = !1;
  for (const t of In)
    (t.f & We) !== 0 && Ne(t, ca), ur(t) && Bn(t);
  In.clear();
}
function Ce(t, e = 1) {
  var a = s(t), n = e === 1 ? a++ : a--;
  return _e(t, a), n;
}
function Xn(t) {
  _e(t, t.v + 1);
}
function _s(t, e, a) {
  var n = t.reactions;
  if (n !== null)
    for (var r = n.length, i = 0; i < r; i++) {
      var l = n[i], o = l.f;
      if ((o & $n) !== 0) {
        In.add(l);
        continue;
      }
      var c = (o & rt) === 0;
      if (c && Ne(l, e), (o & dt) !== 0) {
        var p = (
          /** @type {Derived} */
          l
        );
        nt == null || nt.delete(p), (o & gn) === 0 && (o & qt && (l.f |= gn), _s(p, ca, a));
      } else if (c) {
        var d = (
          /** @type {Effect} */
          l
        );
        (o & la) !== 0 && Jt !== null && Jt.add(d), a !== null ? a.push(d) : vi(d);
      }
    }
}
const No = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
function Oa(t) {
  if (typeof t != "object" || t === null || ln in t)
    return t;
  const e = Ki(t);
  if (e !== ll && e !== ol)
    return t;
  var a = /* @__PURE__ */ new Map(), n = oi(t), r = /* @__PURE__ */ ve(0), i = un, l = (d) => {
    if (un === i)
      return d();
    var f = ue, u = un;
    Yt(null), Oi(i);
    var g = d();
    return Yt(f), Oi(u), g;
  };
  n && (a.set("length", /* @__PURE__ */ ve(
    /** @type {any[]} */
    t.length
  )), t = /** @type {any} */
  Io(
    /** @type {any[]} */
    t
  ));
  var o = "";
  let c = !1;
  function p(d) {
    if (!c) {
      c = !0, o = d, L(r, `${o} version`);
      for (const [f, u] of a)
        L(u, Za(o, f));
      c = !1;
    }
  }
  return new Proxy(
    /** @type {any} */
    t,
    {
      defineProperty(d, f, u) {
        (!("value" in u) || u.configurable === !1 || u.enumerable === !1 || u.writable === !1) && Dl();
        var g = a.get(f);
        return g === void 0 ? l(() => {
          var h = /* @__PURE__ */ ve(u.value);
          return a.set(f, h), typeof f == "string" && L(h, Za(o, f)), h;
        }) : _e(g, u.value, !0), !0;
      },
      deleteProperty(d, f) {
        var u = a.get(f);
        if (u === void 0) {
          if (f in d) {
            const g = l(() => /* @__PURE__ */ ve($e));
            a.set(f, g), Xn(r), L(g, Za(o, f));
          }
        } else
          _e(u, $e), Xn(r);
        return !0;
      },
      get(d, f, u) {
        var b;
        if (f === ln)
          return t;
        if (f === Xi)
          return p;
        var g = a.get(f), h = f in d;
        if (g === void 0 && (!h || (b = sn(d, f)) != null && b.writable) && (g = l(() => {
          var k = Oa(h ? d[f] : $e), E = /* @__PURE__ */ ve(k);
          return L(E, Za(o, f)), E;
        }), a.set(f, g)), g !== void 0) {
          var _ = s(g);
          return _ === $e ? void 0 : _;
        }
        return Reflect.get(d, f, u);
      },
      getOwnPropertyDescriptor(d, f) {
        var u = Reflect.getOwnPropertyDescriptor(d, f);
        if (u && "value" in u) {
          var g = a.get(f);
          g && (u.value = s(g));
        } else if (u === void 0) {
          var h = a.get(f), _ = h == null ? void 0 : h.v;
          if (h !== void 0 && _ !== $e)
            return {
              enumerable: !0,
              configurable: !0,
              value: _,
              writable: !0
            };
        }
        return u;
      },
      has(d, f) {
        var _;
        if (f === ln)
          return !0;
        var u = a.get(f), g = u !== void 0 && u.v !== $e || Reflect.has(d, f);
        if (u !== void 0 || ce !== null && (!g || (_ = sn(d, f)) != null && _.writable)) {
          u === void 0 && (u = l(() => {
            var b = g ? Oa(d[f]) : $e, k = /* @__PURE__ */ ve(b);
            return L(k, Za(o, f)), k;
          }), a.set(f, u));
          var h = s(u);
          if (h === $e)
            return !1;
        }
        return g;
      },
      set(d, f, u, g) {
        var w;
        var h = a.get(f), _ = f in d;
        if (n && f === "length")
          for (var b = u; b < /** @type {Source<number>} */
          h.v; b += 1) {
            var k = a.get(b + "");
            k !== void 0 ? _e(k, $e) : b in d && (k = l(() => /* @__PURE__ */ ve($e)), a.set(b + "", k), L(k, Za(o, b)));
          }
        if (h === void 0)
          (!_ || (w = sn(d, f)) != null && w.writable) && (h = l(() => /* @__PURE__ */ ve(void 0)), L(h, Za(o, f)), _e(h, Oa(u)), a.set(f, h));
        else {
          _ = h.v !== $e;
          var E = l(() => Oa(u));
          _e(h, E);
        }
        var x = Reflect.getOwnPropertyDescriptor(d, f);
        if (x != null && x.set && x.set.call(g, u), !_) {
          if (n && typeof f == "string") {
            var M = (
              /** @type {Source<number>} */
              a.get("length")
            ), S = Number(f);
            Number.isInteger(S) && S >= M.v && _e(M, S + 1);
          }
          Xn(r);
        }
        return !0;
      },
      ownKeys(d) {
        s(r);
        var f = Reflect.ownKeys(d).filter((h) => {
          var _ = a.get(h);
          return _ === void 0 || _.v !== $e;
        });
        for (var [u, g] of a)
          g.v !== $e && !(u in d) && f.push(u);
        return f;
      },
      setPrototypeOf() {
        Il();
      }
    }
  );
}
function Za(t, e) {
  return typeof e == "symbol" ? `${t}[Symbol(${e.description ?? ""})]` : No.test(e) ? `${t}.${e}` : /^\d+$/.test(e) ? `${t}[${e}]` : `${t}['${e}']`;
}
function cn(t) {
  try {
    if (t !== null && typeof t == "object" && ln in t)
      return t[ln];
  } catch {
  }
  return t;
}
function Lo(t, e) {
  return Object.is(cn(t), cn(e));
}
const Do = /* @__PURE__ */ new Set([
  "copyWithin",
  "fill",
  "pop",
  "push",
  "reverse",
  "shift",
  "sort",
  "splice",
  "unshift"
]);
function Io(t) {
  return new Proxy(t, {
    get(e, a, n) {
      var r = Reflect.get(e, a, n);
      return Do.has(
        /** @type {string} */
        a
      ) ? function(...i) {
        Eo();
        var l = r.apply(this, i);
        return bs(), l;
      } : r;
    }
  });
}
function Ro() {
  const t = Array.prototype, e = Array.__svelte_cleanup;
  e && e();
  const { indexOf: a, lastIndexOf: n, includes: r } = t;
  t.indexOf = function(i, l) {
    const o = a.call(this, i, l);
    if (o === -1) {
      for (let c = l ?? 0; c < this.length; c += 1)
        if (cn(this[c]) === i) {
          br("array.indexOf(...)");
          break;
        }
    }
    return o;
  }, t.lastIndexOf = function(i, l) {
    const o = n.call(this, i, l ?? this.length - 1);
    if (o === -1) {
      for (let c = 0; c <= (l ?? this.length - 1); c += 1)
        if (cn(this[c]) === i) {
          br("array.lastIndexOf(...)");
          break;
        }
    }
    return o;
  }, t.includes = function(i, l) {
    const o = r.call(this, i, l);
    if (!o) {
      for (let c = 0; c < this.length; c += 1)
        if (cn(this[c]) === i) {
          br("array.includes(...)");
          break;
        }
    }
    return o;
  }, Array.__svelte_cleanup = () => {
    t.indexOf = a, t.lastIndexOf = n, t.includes = r;
  };
}
function A(t, e, a = !0) {
  try {
    t === e != (cn(t) === cn(e)) && br(a ? "===" : "!==");
  } catch {
  }
  return t === e === a;
}
var Ri, mi, xs, ys;
function Bo() {
  if (Ri === void 0) {
    Ri = window, mi = /Firefox/.test(navigator.userAgent);
    var t = Element.prototype, e = Node.prototype, a = Text.prototype;
    xs = sn(e, "firstChild").get, ys = sn(e, "nextSibling").get, Ei(t) && (t.__click = void 0, t.__className = void 0, t.__attributes = null, t.__style = void 0, t.__e = void 0), Ei(a) && (a.__t = void 0), t.__svelte_meta = null, Ro();
  }
}
function ka(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function ja(t) {
  return (
    /** @type {TemplateNode | null} */
    xs.call(t)
  );
}
// @__NO_SIDE_EFFECTS__
function cr(t) {
  return (
    /** @type {TemplateNode | null} */
    ys.call(t)
  );
}
function m(t, e) {
  return /* @__PURE__ */ ja(t);
}
function be(t, e = !1) {
  {
    var a = /* @__PURE__ */ ja(t);
    return a instanceof Comment && a.data === "" ? /* @__PURE__ */ cr(a) : a;
  }
}
function v(t, e = 1, a = !1) {
  let n = t;
  for (; e--; )
    n = /** @type {TemplateNode} */
    /* @__PURE__ */ cr(n);
  return n;
}
function Ho(t) {
  t.textContent = "";
}
function ws() {
  return !1;
}
function ks(t, e, a) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(e ?? $i, t, void 0)
  );
}
let Bi = !1;
function Oo() {
  Bi || (Bi = !0, document.addEventListener(
    "reset",
    (t) => {
      Promise.resolve().then(() => {
        var e;
        if (!t.defaultPrevented)
          for (
            const a of
            /**@type {HTMLFormElement} */
            t.target.elements
          )
            (e = a.__on_r) == null || e.call(a);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function Br(t) {
  var e = ue, a = ce;
  Yt(null), da(null);
  try {
    return t();
  } finally {
    Yt(e), da(a);
  }
}
function Ss(t, e, a, n = a) {
  t.addEventListener(e, () => Br(a));
  const r = t.__on_r;
  r ? t.__on_r = () => {
    r(), n(!0);
  } : t.__on_r = () => n(!0), Oo();
}
function jo(t) {
  ce === null && (ue === null && Al(t), Fl()), Sa && Cl(t);
}
function zo(t, e) {
  var a = e.last;
  a === null ? e.last = e.first = t : (a.next = t, t.prev = a, e.last = t);
}
function Ta(t, e) {
  for (var a = ce; a !== null && (a.f & $n) !== 0; )
    a = a.parent;
  a !== null && (a.f & bt) !== 0 && (t |= bt);
  var n = {
    ctx: Ye,
    deps: null,
    nodes: null,
    f: t | rt | qt,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: a,
    b: a && a.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  n.component_function = Un, $ == null || $.register_created_effect(n);
  var r = n;
  if ((t & Nn) !== 0)
    Tn !== null ? Tn.push(n) : bn.ensure().schedule(n);
  else if (e !== null) {
    try {
      Bn(n);
    } catch (l) {
      throw wt(n), l;
    }
    r.deps === null && r.teardown === null && r.nodes === null && r.first === r.last && // either `null`, or a singular child
    (r.f & Vn) === 0 && (r = r.first, (t & la) !== 0 && (t & hn) !== 0 && r !== null && (r.f |= hn));
  }
  if (r !== null && (r.parent = a, a !== null && zo(r, a), ue !== null && (ue.f & dt) !== 0 && (t & mn) === 0)) {
    var i = (
      /** @type {Derived} */
      ue
    );
    (i.effects ?? (i.effects = [])).push(r);
  }
  return n;
}
function hi() {
  return ue !== null && !Ut;
}
function gi(t) {
  const e = Ta(Ir, null);
  return Ne(e, We), e.teardown = t, e;
}
function ye(t) {
  jo("$effect"), pn(t, "name", {
    value: "$effect"
  });
  var e = (
    /** @type {Effect} */
    ce.f
  ), a = !ue && (e & $t) !== 0 && (e & xn) === 0;
  if (a) {
    var n = (
      /** @type {ComponentContext} */
      Ye
    );
    (n.e ?? (n.e = [])).push(t);
  } else
    return Ms(t);
}
function Ms(t) {
  return Ta(Nn | vl, t);
}
function Go(t) {
  bn.ensure();
  const e = Ta(mn | Vn, t);
  return (a = {}) => new Promise((n) => {
    a.outro ? dn(e, () => {
      wt(e), n(void 0);
    }) : (wt(e), n(void 0));
  });
}
function Vo(t) {
  return Ta(Nn, t);
}
function Uo(t) {
  return Ta(Ln | Vn, t);
}
function Ts(t, e = 0) {
  return Ta(Ir | e, t);
}
function G(t, e = [], a = [], n = []) {
  So(n, e, a, (r) => {
    Ta(Ir, () => t(...r.map(s)));
  });
}
function dr(t, e = 0) {
  var a = Ta(la | e, t);
  return a.dev_stack = wa, a;
}
function Vt(t) {
  return Ta($t | Vn, t);
}
function Cs(t) {
  var e = t.teardown;
  if (e !== null) {
    const a = Sa, n = ue;
    Hi(!0), Yt(null);
    try {
      e.call(null);
    } finally {
      Hi(a), Yt(n);
    }
  }
}
function bi(t, e = !1) {
  var a = t.first;
  for (t.first = t.last = null; a !== null; ) {
    const r = a.ac;
    r !== null && Br(() => {
      r.abort(ma);
    });
    var n = a.next;
    (a.f & mn) !== 0 ? a.parent = null : wt(a, e), a = n;
  }
}
function qo(t) {
  for (var e = t.first; e !== null; ) {
    var a = e.next;
    (e.f & $t) === 0 && wt(e), e = a;
  }
}
function wt(t, e = !0) {
  var a = !1;
  (e || (t.f & ul) !== 0) && t.nodes !== null && t.nodes.end !== null && (Fs(
    t.nodes.start,
    /** @type {TemplateNode} */
    t.nodes.end
  ), a = !0), Ne(t, Pi), bi(t, e && !a), er(t, 0);
  var n = t.nodes && t.nodes.t;
  if (n !== null)
    for (const i of n)
      i.stop();
  Cs(t), t.f ^= Pi, t.f |= Lt;
  var r = t.parent;
  r !== null && r.first !== null && As(t), t.component_function = null, t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes = t.ac = t.b = null;
}
function Fs(t, e) {
  for (; t !== null; ) {
    var a = t === e ? null : /* @__PURE__ */ cr(t);
    t.remove(), t = a;
  }
}
function As(t) {
  var e = t.parent, a = t.prev, n = t.next;
  a !== null && (a.next = n), n !== null && (n.prev = a), e !== null && (e.first === t && (e.first = n), e.last === t && (e.last = a));
}
function dn(t, e, a = !0) {
  var n = [];
  Es(t, n, !0);
  var r = () => {
    a && wt(t), e && e();
  }, i = n.length;
  if (i > 0) {
    var l = () => --i || r();
    for (var o of n)
      o.out(l);
  } else
    r();
}
function Es(t, e, a) {
  if ((t.f & bt) === 0) {
    t.f ^= bt;
    var n = t.nodes && t.nodes.t;
    if (n !== null)
      for (const o of n)
        (o.is_global || a) && e.push(o);
    for (var r = t.first; r !== null; ) {
      var i = r.next, l = (r.f & hn) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (r.f & $t) !== 0 && (t.f & la) !== 0;
      Es(r, e, l ? a : !1), r = i;
    }
  }
}
function _i(t) {
  Ps(t, !0);
}
function Ps(t, e) {
  if ((t.f & bt) !== 0) {
    t.f ^= bt, (t.f & We) === 0 && (Ne(t, rt), bn.ensure().schedule(t));
    for (var a = t.first; a !== null; ) {
      var n = a.next, r = (a.f & hn) !== 0 || (a.f & $t) !== 0;
      Ps(a, r ? e : !1), a = n;
    }
    var i = t.nodes && t.nodes.t;
    if (i !== null)
      for (const l of i)
        (l.is_global || e) && l.in();
  }
}
function xi(t, e) {
  if (t.nodes)
    for (var a = t.nodes.start, n = t.nodes.end; a !== null; ) {
      var r = a === n ? null : /* @__PURE__ */ cr(a);
      e.append(a), a = r;
    }
}
let Mr = !1, Sa = !1;
function Hi(t) {
  Sa = t;
}
let ue = null, Ut = !1;
function Yt(t) {
  ue = t;
}
let ce = null;
function da(t) {
  ce = t;
}
let Wt = null;
function Ns(t) {
  ue !== null && (Wt === null ? Wt = [t] : Wt.push(t));
}
let tt = null, _t = 0, Rt = null;
function Wo(t) {
  Rt = t;
}
let Ls = 1, Qa = 0, un = Qa;
function Oi(t) {
  un = t;
}
function Ds() {
  return ++Ls;
}
function ur(t) {
  var e = t.f;
  if ((e & rt) !== 0)
    return !0;
  if (e & dt && (t.f &= ~gn), (e & ca) !== 0) {
    for (var a = (
      /** @type {Value[]} */
      t.deps
    ), n = a.length, r = 0; r < n; r++) {
      var i = a[r];
      if (ur(
        /** @type {Derived} */
        i
      ) && hs(
        /** @type {Derived} */
        i
      ), i.wv > t.wv)
        return !0;
    }
    (e & qt) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    nt === null && Ne(t, We);
  }
  return !1;
}
function Is(t, e, a = !0) {
  var n = t.reactions;
  if (n !== null && !(Wt !== null && fn.call(Wt, t)))
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      (i.f & dt) !== 0 ? Is(
        /** @type {Derived} */
        i,
        e,
        !1
      ) : e === i && (a ? Ne(i, rt) : (i.f & We) !== 0 && Ne(i, ca), vi(
        /** @type {Effect} */
        i
      ));
    }
}
function Rs(t) {
  var _;
  var e = tt, a = _t, n = Rt, r = ue, i = Wt, l = Ye, o = Ut, c = un, p = t.f;
  tt = /** @type {null | Value[]} */
  null, _t = 0, Rt = null, ue = (p & ($t | mn)) === 0 ? t : null, Wt = null, Dn(t.ctx), Ut = !1, un = ++Qa, t.ac !== null && (Br(() => {
    t.ac.abort(ma);
  }), t.ac = null);
  try {
    t.f |= Tr;
    var d = (
      /** @type {Function} */
      t.fn
    ), f = d();
    t.f |= xn;
    var u = t.deps, g = $ == null ? void 0 : $.is_fork;
    if (tt !== null) {
      var h;
      if (g || er(t, _t), u !== null && _t > 0)
        for (u.length = _t + tt.length, h = 0; h < tt.length; h++)
          u[_t + h] = tt[h];
      else
        t.deps = u = tt;
      if (hi() && (t.f & qt) !== 0)
        for (h = _t; h < u.length; h++)
          ((_ = u[h]).reactions ?? (_.reactions = [])).push(t);
    } else !g && u !== null && _t < u.length && (er(t, _t), u.length = _t);
    if (rs() && Rt !== null && !Ut && u !== null && (t.f & (dt | ca | rt)) === 0)
      for (h = 0; h < /** @type {Source[]} */
      Rt.length; h++)
        Is(
          Rt[h],
          /** @type {Effect} */
          t
        );
    if (r !== null && r !== t) {
      if (Qa++, r.deps !== null)
        for (let b = 0; b < a; b += 1)
          r.deps[b].rv = Qa;
      if (e !== null)
        for (const b of e)
          b.rv = Qa;
      Rt !== null && (n === null ? n = Rt : n.push(.../** @type {Source[]} */
      Rt));
    }
    return (t.f & za) !== 0 && (t.f ^= za), f;
  } catch (b) {
    return ss(b);
  } finally {
    t.f ^= Tr, tt = e, _t = a, Rt = n, ue = r, Wt = i, Dn(l), Ut = o, un = c;
  }
}
function Yo(t, e) {
  let a = e.reactions;
  if (a !== null) {
    var n = il.call(a, t);
    if (n !== -1) {
      var r = a.length - 1;
      r === 0 ? a = e.reactions = null : (a[n] = a[r], a.pop());
    }
  }
  if (a === null && (e.f & dt) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (tt === null || !fn.call(tt, e))) {
    var i = (
      /** @type {Derived} */
      e
    );
    (i.f & qt) !== 0 && (i.f ^= qt, i.f &= ~gn), i.v !== $e && ci(i), Ao(i), er(i, 0);
  }
}
function er(t, e) {
  var a = t.deps;
  if (a !== null)
    for (var n = e; n < a.length; n++)
      Yo(t, a[n]);
}
function Bn(t) {
  var e = t.f;
  if ((e & Lt) === 0) {
    Ne(t, We);
    var a = ce, n = Mr;
    ce = t, Mr = !0;
    {
      var r = Un;
      Fr(t.component_function);
      var i = (
        /** @type {any} */
        wa
      );
      Cr(t.dev_stack ?? wa);
    }
    try {
      (e & (la | Zi)) !== 0 ? qo(t) : bi(t), Cs(t);
      var l = Rs(t);
      t.teardown = typeof l == "function" ? l : null, t.wv = Ls;
      var o;
      ro && (t.f & rt) !== 0 && t.deps;
    } finally {
      Mr = n, ce = a, Fr(r), Cr(i);
    }
  }
}
async function Ko() {
  await Promise.resolve(), mo();
}
function s(t) {
  var e = t.f, a = (e & dt) !== 0;
  if (ue !== null && !Ut) {
    var n = ce !== null && (ce.f & Lt) !== 0;
    if (!n && (Wt === null || !fn.call(Wt, t))) {
      var r = ue.deps;
      if ((ue.f & Tr) !== 0)
        t.rv < Qa && (t.rv = Qa, tt === null && r !== null && r[_t] === t ? _t++ : tt === null ? tt = [t] : tt.push(t));
      else {
        (ue.deps ?? (ue.deps = [])).push(t);
        var i = t.reactions;
        i === null ? t.reactions = [ue] : fn.call(i, ue) || i.push(ue);
      }
    }
  }
  {
    if (!Ut && gt && !gt.warned && (gt.effect.f & Tr) === 0 && !gt.effect_deps.has(t)) {
      gt.warned = !0, Zl(
        /** @type {string} */
        t.label
      );
      var l = ns("traced at");
      l && console.warn(l);
    }
    To.delete(t);
  }
  if (Sa && on.has(t))
    return on.get(t);
  if (a) {
    var o = (
      /** @type {Derived} */
      t
    );
    if (Sa) {
      var c = o.v;
      return ((o.f & We) === 0 && o.reactions !== null || Hs(o)) && (c = fi(o)), on.set(o, c), c;
    }
    var p = (o.f & qt) === 0 && !Ut && ue !== null && (Mr || (ue.f & qt) !== 0), d = (o.f & xn) === 0;
    ur(o) && (p && (o.f |= qt), hs(o)), p && !d && (gs(o), Bs(o));
  }
  if (nt != null && nt.has(t))
    return nt.get(t);
  if ((t.f & za) !== 0)
    throw t.v;
  return t.v;
}
function Bs(t) {
  if (t.f |= qt, t.deps !== null)
    for (const e of t.deps)
      (e.reactions ?? (e.reactions = [])).push(t), (e.f & dt) !== 0 && (e.f & qt) === 0 && (gs(
        /** @type {Derived} */
        e
      ), Bs(
        /** @type {Derived} */
        e
      ));
}
function Hs(t) {
  if (t.v === $e) return !0;
  if (t.deps === null) return !1;
  for (const e of t.deps)
    if (on.has(e) || (e.f & dt) !== 0 && Hs(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function yi(t) {
  var e = Ut;
  try {
    return Ut = !0, t();
  } finally {
    Ut = e;
  }
}
const Jo = ["touchstart", "touchmove"];
function Zo(t) {
  return Jo.includes(t);
}
function P(t, e, a) {
  return (...n) => {
    const r = t(...n);
    var i = r.nodeType === bl ? r.firstChild : r;
    return Os(i, e, a), r;
  };
}
function Xo(t, e, a) {
  t.__svelte_meta = {
    parent: wa,
    loc: { file: e, line: a[0], column: a[1] }
  }, a[2] && Os(t.firstChild, e, a[2]);
}
function Os(t, e, a) {
  for (var n = 0; t && n < a.length; )
    t.nodeType === gl && Xo(
      /** @type {Element} */
      t,
      e,
      a[n++]
    ), t = t.nextSibling;
}
const $a = Symbol("events"), js = /* @__PURE__ */ new Set(), ai = /* @__PURE__ */ new Set();
function Qo(t, e, a, n = {}) {
  function r(i) {
    if (n.capture || ni.call(e, i), !i.cancelBubble)
      return Br(() => a == null ? void 0 : a.call(this, i));
  }
  return t.startsWith("pointer") || t.startsWith("touch") || t === "wheel" ? Ga(() => {
    e.addEventListener(t, r, n);
  }) : e.addEventListener(t, r, n), r;
}
function kt(t, e, a, n, r) {
  var i = { capture: n, passive: r }, l = Qo(t, e, a, i);
  (e === document.body || // @ts-ignore
  e === window || // @ts-ignore
  e === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  e instanceof HTMLMediaElement) && gi(() => {
    e.removeEventListener(t, l, i);
  });
}
function D(t, e, a) {
  (e[$a] ?? (e[$a] = {}))[t] = a;
}
function Je(t) {
  for (var e = 0; e < t.length; e++)
    js.add(t[e]);
  for (var a of ai)
    a(t);
}
let ji = null;
function ni(t) {
  var b, k;
  var e = this, a = (
    /** @type {Node} */
    e.ownerDocument
  ), n = t.type, r = ((b = t.composedPath) == null ? void 0 : b.call(t)) || [], i = (
    /** @type {null | Element} */
    r[0] || t.target
  );
  ji = t;
  var l = 0, o = ji === t && t[$a];
  if (o) {
    var c = r.indexOf(o);
    if (c !== -1 && (e === document || e === /** @type {any} */
    window)) {
      t[$a] = e;
      return;
    }
    var p = r.indexOf(e);
    if (p === -1)
      return;
    c <= p && (l = c);
  }
  if (i = /** @type {Element} */
  r[l] || t.target, i !== e) {
    pn(t, "currentTarget", {
      configurable: !0,
      get() {
        return i || a;
      }
    });
    var d = ue, f = ce;
    Yt(null), da(null);
    try {
      for (var u, g = []; i !== null; ) {
        var h = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var _ = (k = i[$a]) == null ? void 0 : k[n];
          _ != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          t.target === i) && _.call(i, t);
        } catch (E) {
          u ? g.push(E) : u = E;
        }
        if (t.cancelBubble || h === e || h === null)
          break;
        i = h;
      }
      if (u) {
        for (let E of g)
          queueMicrotask(() => {
            throw E;
          });
        throw u;
      }
    } finally {
      t[$a] = e, delete t.currentTarget, Yt(d), da(f);
    }
  }
}
function $o(t, e, a, n, r, i = !1, l = !1) {
  var p, d;
  let o, c;
  try {
    o = t();
  } catch (f) {
    c = f;
  }
  if (typeof o != "function" && (i || o != null || c)) {
    const f = n == null ? void 0 : n[T], u = r ? ` at ${f}:${r[0]}:${r[1]}` : ` in ${f}`, g = ((p = a[0]) == null ? void 0 : p.eventPhase) < Event.BUBBLING_PHASE ? "capture" : "", _ = `\`${((d = a[0]) == null ? void 0 : d.type) + g}\` handler${u}`;
    if (Ql(_, l ? "remove the trailing `()`" : "add a leading `() =>`"), c)
      throw c;
  }
  o == null || o.apply(e, a);
}
var Wi;
const Wr = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((Wi = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : Wi.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (t) => t
  })
);
function ec(t) {
  return (
    /** @type {string} */
    (Wr == null ? void 0 : Wr.createHTML(t)) ?? t
  );
}
function tc(t) {
  var e = ks("template");
  return e.innerHTML = ec(t.replaceAll("<!>", "<!---->")), e.content;
}
function Hn(t, e) {
  var a = (
    /** @type {Effect} */
    ce
  );
  a.nodes === null && (a.nodes = { start: t, end: e, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function N(t, e) {
  var a = (e & Wl) !== 0, n = (e & Yl) !== 0, r, i = !t.startsWith("<!>");
  return () => {
    r === void 0 && (r = tc(i ? t : "<!>" + t), a || (r = /** @type {TemplateNode} */
    /* @__PURE__ */ ja(r)));
    var l = (
      /** @type {TemplateNode} */
      n || mi ? document.importNode(r, !0) : r.cloneNode(!0)
    );
    if (a) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ ja(l)
      ), c = (
        /** @type {TemplateNode} */
        l.lastChild
      );
      Hn(o, c);
    } else
      Hn(l, l);
    return l;
  };
}
function Ea(t = "") {
  {
    var e = ka(t + "");
    return Hn(e, e), e;
  }
}
function Ee() {
  var t = document.createDocumentFragment(), e = document.createComment(""), a = ka();
  return t.append(e, a), Hn(e, a), t;
}
function F(t, e) {
  t !== null && t.before(
    /** @type {Node} */
    e
  );
}
function B(t, e) {
  var a = e == null ? "" : typeof e == "object" ? `${e}` : e;
  a !== (t.__t ?? (t.__t = t.nodeValue)) && (t.__t = a, t.nodeValue = `${a}`);
}
function vr(t, e) {
  return ac(t, e);
}
const gr = /* @__PURE__ */ new Map();
function ac(t, { target: e, anchor: a, props: n = {}, events: r, context: i, intro: l = !0, transformError: o }) {
  Bo();
  var c = void 0, p = Go(() => {
    var d = a ?? e.appendChild(ka());
    _o(
      /** @type {TemplateNode} */
      d,
      {
        pending: () => {
        }
      },
      (g) => {
        fe({});
        var h = (
          /** @type {ComponentContext} */
          Ye
        );
        i && (h.c = i), r && (n.$$events = r), c = t(g, n) || {}, pe();
      },
      o
    );
    var f = /* @__PURE__ */ new Set(), u = (g) => {
      for (var h = 0; h < g.length; h++) {
        var _ = g[h];
        if (!f.has(_)) {
          f.add(_);
          var b = Zo(_);
          for (const x of [e, document]) {
            var k = gr.get(x);
            k === void 0 && (k = /* @__PURE__ */ new Map(), gr.set(x, k));
            var E = k.get(_);
            E === void 0 ? (x.addEventListener(_, ni, { passive: b }), k.set(_, 1)) : k.set(_, E + 1);
          }
        }
      }
    };
    return u(Dr(js)), ai.add(u), () => {
      var b;
      for (var g of f)
        for (const k of [e, document]) {
          var h = (
            /** @type {Map<string, number>} */
            gr.get(k)
          ), _ = (
            /** @type {number} */
            h.get(g)
          );
          --_ == 0 ? (k.removeEventListener(g, ni), h.delete(g), h.size === 0 && gr.delete(k)) : h.set(g, _);
        }
      ai.delete(u), d !== a && ((b = d.parentNode) == null || b.removeChild(d));
    };
  });
  return ri.set(c, p), c;
}
let ri = /* @__PURE__ */ new WeakMap();
function fr(t, e) {
  const a = ri.get(t);
  return a ? (ri.delete(t), a(e)) : (ln in t ? to() : $l(), Promise.resolve());
}
function he(t) {
  t && kl(t[T] ?? "a component", t.name);
}
function ge() {
  const t = Ye == null ? void 0 : Ye.function;
  function e(a) {
    wl(a, t[T]);
  }
  return {
    $destroy: () => e("$destroy()"),
    $on: () => e("$on(...)"),
    $set: () => e("$set(...)")
  };
}
var Xt, ra, Ft, rn, lr, or, Lr;
class wi {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(e, a = !0) {
    /** @type {TemplateNode} */
    ct(this, "anchor");
    /** @type {Map<Batch, Key>} */
    re(this, Xt, /* @__PURE__ */ new Map());
    /**
     * Map of keys to effects that are currently rendered in the DOM.
     * These effects are visible and actively part of the document tree.
     * Example:
     * ```
     * {#if condition}
     * 	foo
     * {:else}
     * 	bar
     * {/if}
     * ```
     * Can result in the entries `true->Effect` and `false->Effect`
     * @type {Map<Key, Effect>}
     */
    re(this, ra, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    re(this, Ft, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    re(this, rn, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    re(this, lr, !0);
    /**
     * @param {Batch} batch
     */
    re(this, or, (e) => {
      if (y(this, Xt).has(e)) {
        var a = (
          /** @type {Key} */
          y(this, Xt).get(e)
        ), n = y(this, ra).get(a);
        if (n)
          _i(n), y(this, rn).delete(a);
        else {
          var r = y(this, Ft).get(a);
          r && (y(this, ra).set(a, r.effect), y(this, Ft).delete(a), r.fragment.lastChild[ml] = this.anchor, r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
        }
        for (const [i, l] of y(this, Xt)) {
          if (y(this, Xt).delete(i), i === e)
            break;
          const o = y(this, Ft).get(l);
          o && (wt(o.effect), y(this, Ft).delete(l));
        }
        for (const [i, l] of y(this, ra)) {
          if (i === a || y(this, rn).has(i)) continue;
          const o = () => {
            if (Array.from(y(this, Xt).values()).includes(i)) {
              var p = document.createDocumentFragment();
              xi(l, p), p.append(ka()), y(this, Ft).set(i, { effect: l, fragment: p });
            } else
              wt(l);
            y(this, rn).delete(i), y(this, ra).delete(i);
          };
          y(this, lr) || !n ? (y(this, rn).add(i), dn(l, o, !1)) : o();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    re(this, Lr, (e) => {
      y(this, Xt).delete(e);
      const a = Array.from(y(this, Xt).values());
      for (const [n, r] of y(this, Ft))
        a.includes(n) || (wt(r.effect), y(this, Ft).delete(n));
    });
    this.anchor = e, ae(this, lr, a);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(e, a) {
    var n = (
      /** @type {Batch} */
      $
    ), r = ws();
    if (a && !y(this, ra).has(e) && !y(this, Ft).has(e))
      if (r) {
        var i = document.createDocumentFragment(), l = ka();
        i.append(l), y(this, Ft).set(e, {
          effect: Vt(() => a(l)),
          fragment: i
        });
      } else
        y(this, ra).set(
          e,
          Vt(() => a(this.anchor))
        );
    if (y(this, Xt).set(n, e), r) {
      for (const [o, c] of y(this, ra))
        o === e ? n.unskip_effect(c) : n.skip_effect(c);
      for (const [o, c] of y(this, Ft))
        o === e ? n.unskip_effect(c.effect) : n.skip_effect(c.effect);
      n.oncommit(y(this, or)), n.ondiscard(y(this, Lr));
    } else
      y(this, or).call(this, n);
  }
}
Xt = new WeakMap(), ra = new WeakMap(), Ft = new WeakMap(), rn = new WeakMap(), lr = new WeakMap(), or = new WeakMap(), Lr = new WeakMap();
function U(t, e, a = !1) {
  var n = new wi(t), r = a ? hn : 0;
  function i(l, o) {
    n.ensure(l, o);
  }
  dr(() => {
    var l = !1;
    e((o, c = 0) => {
      l = !0, i(c, o);
    }), l || i(-1, null);
  }, r);
}
const nc = Symbol("NaN");
function Hr(t, e, a) {
  var n = new wi(t);
  dr(() => {
    var r = e();
    r !== r && (r = /** @type {any} */
    nc), n.ensure(r, a);
  });
}
function St(t, e) {
  return e;
}
function rc(t, e, a) {
  for (var n = [], r = e.length, i, l = e.length, o = 0; o < r; o++) {
    let f = e[o];
    dn(
      f,
      () => {
        if (i) {
          if (i.pending.delete(f), i.done.add(f), i.pending.size === 0) {
            var u = (
              /** @type {Set<EachOutroGroup>} */
              t.outrogroups
            );
            ii(t, Dr(i.done)), u.delete(i), u.size === 0 && (t.outrogroups = null);
          }
        } else
          l -= 1;
      },
      !1
    );
  }
  if (l === 0) {
    var c = n.length === 0 && a !== null;
    if (c) {
      var p = (
        /** @type {Element} */
        a
      ), d = (
        /** @type {Element} */
        p.parentNode
      );
      Ho(d), d.append(p), t.items.clear();
    }
    ii(t, e, !c);
  } else
    i = {
      pending: new Set(e),
      done: /* @__PURE__ */ new Set()
    }, (t.outrogroups ?? (t.outrogroups = /* @__PURE__ */ new Set())).add(i);
}
function ii(t, e, a = !0) {
  var n;
  if (t.pending.size > 0) {
    n = /* @__PURE__ */ new Set();
    for (const l of t.pending.values())
      for (const o of l)
        n.add(
          /** @type {EachItem} */
          t.items.get(o).e
        );
  }
  for (var r = 0; r < e.length; r++) {
    var i = e[r];
    if (n != null && n.has(i)) {
      i.f |= sa;
      const l = document.createDocumentFragment();
      xi(i, l);
    } else
      wt(e[r], a);
  }
}
var zi;
function Ke(t, e, a, n, r, i = null) {
  var l = t, o = /* @__PURE__ */ new Map(), c = (e & Qi) !== 0;
  if (c) {
    var p = (
      /** @type {Element} */
      t
    );
    l = p.appendChild(ka());
  }
  var d = null, f = /* @__PURE__ */ ms(() => {
    var x = a();
    return oi(x) ? x : x == null ? [] : Dr(x);
  });
  L(f, "{#each ...}");
  var u, g = /* @__PURE__ */ new Map(), h = !0;
  function _(x) {
    (E.effect.f & Lt) === 0 && (E.pending.delete(x), E.fallback = d, ic(E, u, l, e, n), d !== null && (u.length === 0 ? (d.f & sa) === 0 ? _i(d) : (d.f ^= sa, Kn(d, null, l)) : dn(d, () => {
      d = null;
    })));
  }
  function b(x) {
    E.pending.delete(x);
  }
  var k = dr(() => {
    u = /** @type {V[]} */
    s(f);
    for (var x = u.length, M = /* @__PURE__ */ new Set(), S = (
      /** @type {Batch} */
      $
    ), w = ws(), R = 0; R < x; R += 1) {
      var O = u[R], V = n(O, R);
      {
        var z = n(O, R);
        V !== z && Tl(String(R), String(V), String(z));
      }
      var j = h ? null : o.get(V);
      j ? (j.v && Rn(j.v, O), j.i && Rn(j.i, R), w && S.unskip_effect(j.e)) : (j = sc(
        o,
        h ? l : zi ?? (zi = ka()),
        O,
        V,
        R,
        r,
        e,
        a
      ), h || (j.e.f |= sa), o.set(V, j)), M.add(V);
    }
    if (x === 0 && i && !d && (h ? d = Vt(() => i(l)) : (d = Vt(() => i(zi ?? (zi = ka()))), d.f |= sa)), x > M.size && lc(u, n), !h)
      if (g.set(S, M), w) {
        for (const [H, I] of o)
          M.has(H) || S.skip_effect(I.e);
        S.oncommit(_), S.ondiscard(b);
      } else
        _(S);
    s(f);
  }), E = { effect: k, items: o, pending: g, outrogroups: null, fallback: d };
  h = !1;
}
function Wn(t) {
  for (; t !== null && (t.f & $t) === 0; )
    t = t.next;
  return t;
}
function ic(t, e, a, n, r) {
  var z, j, H, I, Y, q, W, oe, le;
  var i = (n & jl) !== 0, l = e.length, o = t.items, c = Wn(t.effect.first), p, d = null, f, u = [], g = [], h, _, b, k;
  if (i)
    for (k = 0; k < l; k += 1)
      h = e[k], _ = r(h, k), b = /** @type {EachItem} */
      o.get(_).e, (b.f & sa) === 0 && ((j = (z = b.nodes) == null ? void 0 : z.a) == null || j.measure(), (f ?? (f = /* @__PURE__ */ new Set())).add(b));
  for (k = 0; k < l; k += 1) {
    if (h = e[k], _ = r(h, k), b = /** @type {EachItem} */
    o.get(_).e, t.outrogroups !== null)
      for (const ie of t.outrogroups)
        ie.pending.delete(b), ie.done.delete(b);
    if ((b.f & bt) !== 0 && (_i(b), i && ((I = (H = b.nodes) == null ? void 0 : H.a) == null || I.unfix(), (f ?? (f = /* @__PURE__ */ new Set())).delete(b))), (b.f & sa) !== 0)
      if (b.f ^= sa, b === c)
        Kn(b, null, a);
      else {
        var E = d ? d.next : c;
        b === t.effect.last && (t.effect.last = b.prev), b.prev && (b.prev.next = b.next), b.next && (b.next.prev = b.prev), Aa(t, d, b), Aa(t, b, E), Kn(b, E, a), d = b, u = [], g = [], c = Wn(d.next);
        continue;
      }
    if (b !== c) {
      if (p !== void 0 && p.has(b)) {
        if (u.length < g.length) {
          var x = g[0], M;
          d = x.prev;
          var S = u[0], w = u[u.length - 1];
          for (M = 0; M < u.length; M += 1)
            Kn(u[M], x, a);
          for (M = 0; M < g.length; M += 1)
            p.delete(g[M]);
          Aa(t, S.prev, w.next), Aa(t, d, S), Aa(t, w, x), c = x, d = w, k -= 1, u = [], g = [];
        } else
          p.delete(b), Kn(b, c, a), Aa(t, b.prev, b.next), Aa(t, b, d === null ? t.effect.first : d.next), Aa(t, d, b), d = b;
        continue;
      }
      for (u = [], g = []; c !== null && c !== b; )
        (p ?? (p = /* @__PURE__ */ new Set())).add(c), g.push(c), c = Wn(c.next);
      if (c === null)
        continue;
    }
    (b.f & sa) === 0 && u.push(b), d = b, c = Wn(b.next);
  }
  if (t.outrogroups !== null) {
    for (const ie of t.outrogroups)
      ie.pending.size === 0 && (ii(t, Dr(ie.done)), (Y = t.outrogroups) == null || Y.delete(ie));
    t.outrogroups.size === 0 && (t.outrogroups = null);
  }
  if (c !== null || p !== void 0) {
    var R = [];
    if (p !== void 0)
      for (b of p)
        (b.f & bt) === 0 && R.push(b);
    for (; c !== null; )
      (c.f & bt) === 0 && c !== t.fallback && R.push(c), c = Wn(c.next);
    var O = R.length;
    if (O > 0) {
      var V = (n & Qi) !== 0 && l === 0 ? a : null;
      if (i) {
        for (k = 0; k < O; k += 1)
          (W = (q = R[k].nodes) == null ? void 0 : q.a) == null || W.measure();
        for (k = 0; k < O; k += 1)
          (le = (oe = R[k].nodes) == null ? void 0 : oe.a) == null || le.fix();
      }
      rc(t, R, V);
    }
  }
  i && Ga(() => {
    var ie, xe;
    if (f !== void 0)
      for (b of f)
        (xe = (ie = b.nodes) == null ? void 0 : ie.a) == null || xe.apply();
  });
}
function sc(t, e, a, n, r, i, l, o) {
  var c = (l & Hl) !== 0 ? (l & zl) === 0 ? /* @__PURE__ */ Po(a, !1, !1) : _n(a) : null, p = (l & Ol) !== 0 ? _n(r) : null;
  return c && (c.trace = () => {
    o()[(p == null ? void 0 : p.v) ?? r];
  }), {
    v: c,
    i: p,
    e: Vt(() => (i(e, c ?? a, p ?? r, o), () => {
      t.delete(n);
    }))
  };
}
function Kn(t, e, a) {
  if (t.nodes)
    for (var n = t.nodes.start, r = t.nodes.end, i = e && (e.f & sa) === 0 ? (
      /** @type {EffectNodes} */
      e.nodes.start
    ) : a; n !== null; ) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ cr(n)
      );
      if (i.before(n), n === r)
        return;
      n = l;
    }
}
function Aa(t, e, a) {
  e === null ? t.effect.first = a : e.next = a, a === null ? t.effect.last = e : a.prev = e;
}
function lc(t, e) {
  const a = /* @__PURE__ */ new Map(), n = t.length;
  for (let r = 0; r < n; r++) {
    const i = e(t[r], r);
    if (a.has(i)) {
      const l = String(a.get(i)), o = String(r);
      let c = String(i);
      c.startsWith("[object ") && (c = null), Ml(l, o, c);
    }
    a.set(i, r);
  }
}
function oc(t, e, a = !1, n = !1, r = !1, i = !1) {
  var l = t, o = "";
  if (a)
    var c = (
      /** @type {Element} */
      t
    );
  G(() => {
    var p = (
      /** @type {Effect} */
      ce
    );
    if (o !== (o = e() ?? "")) {
      if (a) {
        p.nodes = null, c.innerHTML = /** @type {string} */
        o, o !== "" && Hn(
          /** @type {TemplateNode} */
          /* @__PURE__ */ ja(c),
          /** @type {TemplateNode} */
          c.lastChild
        );
        return;
      }
      if (p.nodes !== null && (Fs(
        p.nodes.start,
        /** @type {TemplateNode} */
        p.nodes.end
      ), p.nodes = null), o !== "") {
        var d = n ? Kl : r ? Jl : void 0, f = (
          /** @type {HTMLTemplateElement | SVGElement | MathMLElement} */
          ks(n ? "svg" : r ? "math" : "template", d)
        );
        f.innerHTML = /** @type {any} */
        o;
        var u = n || r ? f : (
          /** @type {HTMLTemplateElement} */
          f.content
        );
        if (Hn(
          /** @type {TemplateNode} */
          /* @__PURE__ */ ja(u),
          /** @type {TemplateNode} */
          u.lastChild
        ), n || r)
          for (; /* @__PURE__ */ ja(u); )
            l.before(
              /** @type {TemplateNode} */
              /* @__PURE__ */ ja(u)
            );
        else
          l.before(u);
      }
    }
  });
}
function cc(t) {
  return t.toString = () => (xl(), ""), t;
}
function dc(t, e, ...a) {
  var n = new wi(t);
  dr(() => {
    const r = e() ?? null;
    r == null && Pl(), n.ensure(r, r && ((i) => r(i, ...a)));
  }, hn);
}
function Gi(t, e) {
  const a = (n, ...r) => {
    var i = Un;
    Fr(t);
    try {
      return e(n, ...r);
    } finally {
      Fr(i);
    }
  };
  return cc(a), a;
}
function uc(t, e, a) {
  var n = t == null ? "" : "" + t;
  return n === "" ? null : n;
}
function Dt(t, e, a, n, r, i) {
  var l = t.__className;
  if (l !== a || l === void 0) {
    var o = uc(a);
    o == null ? t.removeAttribute("class") : t.className = o, t.__className = a;
  }
  return i;
}
function ea(t, e, a = !1) {
  if (t.multiple) {
    if (e == null)
      return;
    if (!oi(e))
      return eo();
    for (var n of t.options)
      n.selected = e.includes(Qn(n));
    return;
  }
  for (n of t.options) {
    var r = Qn(n);
    if (Lo(r, e)) {
      n.selected = !0;
      return;
    }
  }
  (!a || e !== void 0) && (t.selectedIndex = -1);
}
function ua(t) {
  var e = new MutationObserver(() => {
    ea(t, t.__value);
  });
  e.observe(t, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), gi(() => {
    e.disconnect();
  });
}
function si(t, e, a = e) {
  var n = /* @__PURE__ */ new WeakSet(), r = !0;
  Ss(t, "change", (i) => {
    var l = i ? "[selected]" : ":checked", o;
    if (t.multiple)
      o = [].map.call(t.querySelectorAll(l), Qn);
    else {
      var c = t.querySelector(l) ?? // will fall back to first non-disabled option if no option is selected
      t.querySelector("option:not([disabled])");
      o = c && Qn(c);
    }
    a(o), t.__value = o, $ !== null && n.add($);
  }), Vo(() => {
    var i = e();
    if (t === document.activeElement) {
      var l = (
        /** @type {Batch} */
        $
      );
      if (n.has(l))
        return;
    }
    if (ea(t, i, r), r && i === void 0) {
      var o = t.querySelector(":checked");
      o !== null && (i = Qn(o), a(i));
    }
    t.__value = i, r = !1;
  }), ua(t);
}
function Qn(t) {
  return "__value" in t ? t.__value : t.value;
}
const vc = Symbol("is custom element"), fc = Symbol("is html"), pc = hl ? "progress" : "PROGRESS";
function se(t, e) {
  var a = ki(t);
  a.value === (a.value = // treat null and undefined the same for the initial value
  e ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  t.value === e && (e !== 0 || t.nodeName !== pc) || (t.value = e ?? "");
}
function Gt(t, e) {
  var a = ki(t);
  a.checked !== (a.checked = // treat null and undefined the same for the initial value
  e ?? void 0) && (t.checked = e);
}
function Er(t, e, a, n) {
  var r = ki(t);
  r[e] !== (r[e] = a) && (e === "loading" && (t[pl] = a), a == null ? t.removeAttribute(e) : typeof a != "string" && mc(t).includes(e) ? t[e] = a : t.setAttribute(e, a));
}
function ki(t) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    t.__attributes ?? (t.__attributes = {
      [vc]: t.nodeName.includes("-"),
      [fc]: t.namespaceURI === $i
    })
  );
}
var Vi = /* @__PURE__ */ new Map();
function mc(t) {
  var e = t.getAttribute("is") || t.nodeName, a = Vi.get(e);
  if (a) return a;
  Vi.set(e, a = []);
  for (var n, r = t, i = Element.prototype; i !== r; ) {
    n = sl(r);
    for (var l in n)
      n[l].set && a.push(l);
    r = Ki(r);
  }
  return a;
}
function Si(t, e, a = e) {
  var n = /* @__PURE__ */ new WeakSet();
  Ss(t, "input", async (r) => {
    t.type === "checkbox" && Ni();
    var i = r ? t.defaultValue : t.value;
    if (i = Yr(t) ? Kr(i) : i, a(i), $ !== null && n.add($), await Ko(), i !== (i = e())) {
      var l = t.selectionStart, o = t.selectionEnd, c = t.value.length;
      if (t.value = i ?? "", o !== null) {
        var p = t.value.length;
        l === o && o === c && p > c ? (t.selectionStart = p, t.selectionEnd = p) : (t.selectionStart = l, t.selectionEnd = Math.min(o, p));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  yi(e) == null && t.value && (a(Yr(t) ? Kr(t.value) : t.value), $ !== null && n.add($)), Ts(() => {
    t.type === "checkbox" && Ni();
    var r = e();
    if (t === document.activeElement) {
      var i = (
        /** @type {Batch} */
        $
      );
      if (n.has(i))
        return;
    }
    Yr(t) && r === Kr(t.value) || t.type === "date" && !r && !t.value || r !== t.value && (t.value = r ?? "");
  });
}
function Yr(t) {
  var e = t.type;
  return e === "number" || e === "range";
}
function Kr(t) {
  return t === "" ? null : +t;
}
function Pt(t, e, a, n) {
  var E;
  var r = (a & Ul) !== 0, i = (a & ql) !== 0, l = (
    /** @type {V} */
    n
  ), o = !0, c = () => (o && (o = !1, l = i ? yi(
    /** @type {() => V} */
    n
  ) : (
    /** @type {V} */
    n
  )), l);
  let p;
  if (r) {
    var d = ln in t || fl in t;
    p = ((E = sn(t, e)) == null ? void 0 : E.set) ?? (d && e in t ? (x) => t[e] = x : void 0);
  }
  var f, u = !1;
  r ? [f, u] = uo(() => (
    /** @type {V} */
    t[e]
  )) : f = /** @type {V} */
  t[e], f === void 0 && n !== void 0 && (f = c(), p && (Nl(e), p(f)));
  var g;
  if (g = () => {
    var x = (
      /** @type {V} */
      t[e]
    );
    return x === void 0 ? c() : (o = !0, x);
  }, (a & Vl) === 0)
    return g;
  if (p) {
    var h = t.$$legacy;
    return (
      /** @type {() => V} */
      (function(x, M) {
        return arguments.length > 0 ? ((!M || h || u) && p(M ? g() : x), x) : g();
      })
    );
  }
  var _ = !1, b = ((a & Gl) !== 0 ? Rr : ms)(() => (_ = !1, g()));
  b.label = e, r && s(b);
  var k = (
    /** @type {Effect} */
    ce
  );
  return (
    /** @type {() => V} */
    (function(x, M) {
      if (arguments.length > 0) {
        const S = M ? s(b) : r ? Oa(x) : x;
        return _e(b, S), _ = !0, l !== void 0 && (l = S), x;
      }
      return Sa && _ || (k.f & Lt) !== 0 ? b.v : s(b);
    })
  );
}
{
  let t = function(e) {
    if (!(e in globalThis)) {
      let a;
      Object.defineProperty(globalThis, e, {
        configurable: !0,
        // eslint-disable-next-line getter-return
        get: () => {
          if (a !== void 0)
            return a;
          Ll(e);
        },
        set: (n) => {
          a = n;
        }
      });
    }
  };
  var nv = t;
  t("$state"), t("$effect"), t("$derived"), t("$inspect"), t("$props"), t("$bindable");
}
const hc = "5";
var Yi;
typeof window < "u" && ((Yi = window.__svelte ?? (window.__svelte = {})).v ?? (Yi.v = /* @__PURE__ */ new Set())).add(hc);
oa[T] = "src/components/ui/RollButton.svelte";
var gc = P(/* @__PURE__ */ N('<button class="w-5 h-5 bg-slate-700 border-0 text-slate-400 rounded text-xs cursor-pointer hover:bg-slate-600 hover:text-slate-200 inline-flex items-center justify-center flex-shrink-0">🎲</button>'), oa[T], [[5, 0]]);
function oa(t, e) {
  he(new.target), fe(e, !0, oa);
  let a = Pt(e, "title", 3, "Roll");
  var n = { ...ge() }, r = gc();
  return G(() => Er(r, "title", a())), D("click", r, function(...i) {
    $o(() => e.onclick, this, i, oa, [7, 3]);
  }), F(t, r), pe(n);
}
Je(["click"]);
ia[T] = "src/components/sidebar/StatInput.svelte";
var bc = P(/* @__PURE__ */ N('<span class="w-8 text-center text-sm font-bold text-slate-500">0</span>'), ia[T], [[33, 8]]), _c = P(/* @__PURE__ */ N('<input type="number" class="w-8 text-center bg-slate-900 border border-slate-700 text-slate-100 rounded text-sm font-bold p-0.5" min="0"/>'), ia[T], [[35, 8]]), xc = P(/* @__PURE__ */ N('<div class="flex items-center justify-between"><span class="text-xs text-slate-400 w-9"> </span> <div class="flex items-center gap-1"><button type="button" class="w-5 h-5 bg-slate-700 border-0 text-slate-400 rounded text-xs cursor-pointer hover:bg-slate-600 disabled:opacity-30">−</button> <!> <button type="button" class="w-5 h-5 bg-slate-700 border-0 text-slate-400 rounded text-xs cursor-pointer hover:bg-slate-600 disabled:opacity-30">+</button></div> <span class="text-xs text-slate-500 w-6 text-right"> </span> <!></div>'), ia[T], [[23, 2, [[24, 4], [25, 4, [[26, 6], [43, 6]]], [50, 4]]]]);
function ia(t, e) {
  he(new.target), fe(e, !0, ia);
  let a = Pt(e, "onRoll", 3, null);
  function n() {
    A(e.mode, "missing") || A(e.mode, "zero") || e.onUpdate(e.value + 1);
  }
  function r() {
    A(e.mode, "missing") || A(e.mode, "zero") || e.value > 0 && e.onUpdate(e.value - 1);
  }
  function i(d) {
    const f = Math.max(0, Math.floor(Number(d.target.value) || 0));
    e.onUpdate(f);
  }
  var l = { ...ge() }, o = Ee(), c = be(o);
  {
    var p = (d) => {
      var f = xc(), u = m(f), g = m(u), h = v(u, 2), _ = m(h), b = v(_, 2);
      {
        var k = (O) => {
          var V = bc();
          F(O, V);
        }, E = (O) => {
          var V = _c();
          G(() => se(V, e.value)), D("change", V, i), F(O, V);
        };
        C(
          () => U(b, (O) => {
            A(e.mode, "zero") ? O(k) : O(E, -1);
          }),
          "if",
          ia,
          32,
          6
        );
      }
      var x = v(b, 2), M = v(h, 2), S = m(M), w = v(M, 2);
      {
        var R = (O) => {
          C(
            () => oa(O, {
              get onclick() {
                return a();
              },
              get title() {
                return `Roll ${e.label ?? ""}`;
              }
            }),
            "component",
            ia,
            52,
            6,
            { componentTag: "RollButton" }
          );
        };
        C(
          () => U(w, (O) => {
            a() && O(R);
          }),
          "if",
          ia,
          51,
          4
        );
      }
      G(() => {
        B(g, e.label), _.disabled = A(e.mode, "zero"), x.disabled = A(e.mode, "zero"), B(S, `${e.cpCost ?? ""}cp`);
      }), D("click", _, r), D("click", x, n), F(d, f);
    };
    C(
      () => U(c, (d) => {
        A(e.mode, "missing", !1) && d(p);
      }),
      "if",
      ia,
      22,
      0
    );
  }
  return F(t, o), pe(l);
}
Je(["click", "change"]);
Va[T] = "src/components/sidebar/CPTracker.svelte";
var yc = P(/* @__PURE__ */ N("<option> </option>"), Va[T], [[59, 10]]), wc = P(/* @__PURE__ */ N('<div class="mt-2"><label class="text-xs text-slate-500 uppercase">Power Level</label> <select class="w-full bg-slate-900 border border-slate-700 rounded text-xs text-slate-100 p-0.5"></select></div>'), Va[T], [[51, 4, [[52, 6], [53, 6]]]]), kc = P(/* @__PURE__ */ N('<div class="border-t border-slate-700 pt-2"><div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Character Points</div> <div class="flex justify-between items-center text-xs"><span class="text-slate-400">Base CP</span> <input type="number" class="w-14 text-right text-xs bg-slate-900 border border-slate-700 rounded text-slate-100 p-0.5"/></div> <div class="flex justify-between text-xs"><span class="text-slate-400">Total</span> <span class="text-slate-100"> </span></div> <div class="flex justify-between text-xs"><span class="text-slate-400">Spent</span> <span class="text-slate-100"> </span></div> <div class="flex justify-between text-xs"><span class="text-slate-400">Remaining</span> <span> </span></div> <!></div>'), Va[T], [
  [
    27,
    0,
    [
      [28, 2],
      [29, 2, [[30, 4], [31, 4]]],
      [37, 2, [[38, 4], [39, 4]]],
      [41, 2, [[42, 4], [43, 4]]],
      [45, 2, [[46, 4], [47, 4]]]
    ]
  ]
]);
function Va(t, e) {
  he(new.target), fe(e, !0, Va);
  let a = L(/* @__PURE__ */ J(() => e.actor.system.cpRemaining < 0), "overBudget"), n = L(/* @__PURE__ */ J(() => "powerLevel" in e.actor.system), "hasPowerLevel");
  const r = [
    { value: "", label: "Use System Default" },
    { value: "subhuman", label: "Sub-Human (0-24 CP)" },
    { value: "human", label: "Human (25-49 CP)" },
    { value: "adventurer", label: "Adventurer (50-74 CP)" },
    { value: "heroic", label: "Heroic (75-99 CP)" },
    { value: "mythical", label: "Mythical (100-149 CP)" },
    { value: "superhuman", label: "Superhuman (150-199 CP)" },
    { value: "superpowered", label: "Superpowered (200-249 CP)" },
    { value: "godlike", label: "Godlike (250+ CP)" }
  ];
  function i(w) {
    e.actor.update({ "system.cpBase": Number(w.target.value) });
  }
  function l(w) {
    e.actor.update({ "system.powerLevel": w.target.value });
  }
  var o = { ...ge() }, c = kc(), p = v(m(c), 2), d = v(m(p), 2), f = v(p, 2), u = v(m(f), 2), g = m(u), h = v(f, 2), _ = v(m(h), 2), b = m(_), k = v(h, 2), E = v(m(k), 2), x = m(E), M = v(k, 2);
  {
    var S = (w) => {
      var R = wc(), O = v(m(R), 2);
      C(
        () => Ke(O, 21, () => r, St, (z, j) => {
          var H = yc(), I = m(H, !0);
          var Y = {};
          G(() => {
            B(I, s(j).label), Y !== (Y = s(j).value) && (H.value = (H.__value = s(j).value) ?? "");
          }), F(z, H);
        }),
        "each",
        Va,
        58,
        8
      );
      var V;
      ua(O), G(() => {
        V !== (V = e.actor.system.powerLevel) && (O.value = (O.__value = e.actor.system.powerLevel) ?? "", ea(O, e.actor.system.powerLevel));
      }), D("change", O, l), F(w, R);
    };
    C(
      () => U(M, (w) => {
        s(n) && w(S);
      }),
      "if",
      Va,
      50,
      2
    );
  }
  return G(() => {
    se(d, e.actor.system.cpBase), B(g, e.actor.system.cpTotal), B(b, e.actor.system.cpSpent), Dt(E, 1, `font-bold ${s(a) ? "text-red-400" : "text-emerald-400"}`), B(x, e.actor.system.cpRemaining);
  }), D("change", d, i), F(t, c), pe(o);
}
Je(["change"]);
Or[T] = "src/components/sidebar/SPTracker.svelte";
var Sc = P(/* @__PURE__ */ N('<div class="border-t border-slate-700 pt-2"><div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Skill Points</div> <div class="flex justify-between text-xs"><span class="text-slate-400">Pool</span> <span class="text-slate-100"> </span></div> <div class="flex justify-between text-xs"><span class="text-slate-400">Spent</span> <span class="text-slate-100"> </span></div> <div class="flex justify-between text-xs"><span class="text-slate-400">Remaining</span> <span> </span></div></div>'), Or[T], [
  [
    6,
    0,
    [
      [7, 2],
      [8, 2, [[9, 4], [10, 4]]],
      [12, 2, [[13, 4], [14, 4]]],
      [16, 2, [[17, 4], [18, 4]]]
    ]
  ]
]);
function Or(t, e) {
  he(new.target), fe(e, !0, Or);
  let a = L(/* @__PURE__ */ J(() => e.remaining < 0), "overBudget");
  var n = { ...ge() }, r = Sc(), i = v(m(r), 2), l = v(m(i), 2), o = m(l), c = v(i, 2), p = v(m(c), 2), d = m(p), f = v(c, 2), u = v(m(f), 2), g = m(u);
  return G(() => {
    B(o, e.pool), B(d, e.spent), Dt(u, 1, `font-bold ${s(a) ? "text-red-400" : "text-emerald-400"}`), B(g, e.remaining);
  }), F(t, r), pe(n);
}
at[T] = "src/components/sidebar/DerivedStats.svelte";
var Mc = P(/* @__PURE__ */ N('<div class="flex justify-between"><span class="text-slate-400">Health Points (HP)</span> <span class="text-slate-100"> </span></div>'), at[T], [[19, 6, [[20, 8], [21, 8]]]]), Tc = P(/* @__PURE__ */ N('<div class="flex justify-between"><span class="text-slate-400">Energy Points (EP)</span> <span class="text-slate-100"> </span></div>'), at[T], [[25, 6, [[26, 8], [27, 8]]]]), Cc = P(/* @__PURE__ */ N('<div class="flex justify-between"><span class="text-slate-400">Attack Combat Value (ACV)</span> <span class="text-slate-100"> </span></div> <div class="flex justify-between"><span class="text-slate-400">Defence Combat Value (DCV)</span> <span class="text-slate-100"> </span></div>', 1), at[T], [[31, 6, [[32, 8], [33, 8]]], [35, 6, [[36, 8], [37, 8]]]]), Fc = P(/* @__PURE__ */ N('<div class="flex justify-between"><span class="text-slate-400">Shock Value (SV)</span> <span class="text-slate-100"> </span></div>'), at[T], [[41, 6, [[42, 8], [43, 8]]]]), Ac = P(/* @__PURE__ */ N('<div class="flex justify-between"><span class="text-slate-400">Sanity Points</span> <span class="text-slate-100"> </span></div>'), at[T], [[57, 6, [[58, 8], [59, 8]]]]), Ec = P(/* @__PURE__ */ N('<div class="flex justify-between"><span class="text-slate-400">Social Combat Value (SoCV)</span> <span class="text-slate-100"> </span></div> <div class="flex justify-between"><span class="text-slate-400">Society Points</span> <span class="text-slate-100"> </span></div>', 1), at[T], [[63, 6, [[64, 8], [65, 8]]], [67, 6, [[68, 8], [69, 8]]]]), Pc = P(/* @__PURE__ */ N('<div class="border-t border-slate-700 pt-2"><div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Derived</div> <div class="flex flex-col gap-0.5 text-xs"><!> <!> <!> <!> <div class="flex justify-between"><span class="text-slate-400">Damage Multiplier (DM)</span> <span class="text-slate-100"> <!></span></div> <div class="flex justify-between"><span class="text-slate-400">Armour Rating (AR)</span> <span class="text-slate-100"> </span></div> <!> <!></div></div>'), at[T], [
  [
    15,
    0,
    [
      [16, 2],
      [
        17,
        2,
        [[46, 4, [[47, 6], [48, 6]]], [52, 4, [[53, 6], [54, 6]]]]
      ]
    ]
  ]
]);
function at(t, e) {
  he(new.target), fe(e, !0, at);
  let a = Pt(e, "showEP", 3, !0), n = Pt(e, "showCV", 3, !0);
  Pt(e, "showMovement", 3, !1);
  let r = L(/* @__PURE__ */ ve(!1), "sanityEnabled"), i = L(/* @__PURE__ */ ve(!1), "socialEnabled");
  ye(() => {
    try {
      _e(r, game.settings.get("besm", "sanityEnabled"), !0), _e(i, game.settings.get("besm", "socialCombatEnabled"), !0);
    } catch {
    }
  });
  var l = { ...ge() }, o = Pc(), c = v(m(o), 2), p = m(c);
  {
    var d = (I) => {
      var Y = Mc(), q = v(m(Y), 2), W = m(q);
      G(() => B(W, `${e.derived.currentHp ?? ""}/${e.derived.hpMax ?? ""}`)), F(I, Y);
    };
    C(
      () => U(p, (I) => {
        e.derived.hpApplicable && I(d);
      }),
      "if",
      at,
      18,
      4
    );
  }
  var f = v(p, 2);
  {
    var u = (I) => {
      var Y = Tc(), q = v(m(Y), 2), W = m(q);
      G(() => B(W, `${e.derived.currentEp ?? ""}/${e.derived.epMax ?? ""}`)), F(I, Y);
    };
    C(
      () => U(f, (I) => {
        a() && e.derived.epApplicable && I(u);
      }),
      "if",
      at,
      24,
      4
    );
  }
  var g = v(f, 2);
  {
    var h = (I) => {
      var Y = Cc(), q = be(Y), W = v(m(q), 2), oe = m(W), le = v(q, 2), ie = v(m(le), 2), xe = m(ie);
      G(() => {
        B(oe, e.derived.acv), B(xe, e.derived.dcv);
      }), F(I, Y);
    };
    C(
      () => U(g, (I) => {
        n() && I(h);
      }),
      "if",
      at,
      30,
      4
    );
  }
  var _ = v(g, 2);
  {
    var b = (I) => {
      var Y = Fc(), q = v(m(Y), 2), W = m(q);
      G(() => B(W, e.derived.sv)), F(I, Y);
    };
    C(
      () => U(_, (I) => {
        e.derived.hpApplicable && I(b);
      }),
      "if",
      at,
      40,
      4
    );
  }
  var k = v(_, 2), E = v(m(k), 2), x = m(E), M = v(x);
  {
    var S = (I) => {
      var Y = Ea();
      G(() => B(Y, `/ ${e.derived.meleeDamageMultiplier ?? ""} melee`)), F(I, Y);
    };
    C(
      () => U(M, (I) => {
        A(e.derived.meleeDamageMultiplier, e.derived.damageMultiplier, !1) && I(S);
      }),
      "if",
      at,
      49,
      34
    );
  }
  var w = v(k, 2), R = v(m(w), 2), O = m(R), V = v(w, 2);
  {
    var z = (I) => {
      var Y = Ac(), q = v(m(Y), 2), W = m(q);
      G(() => B(W, `${e.derived.currentSanity ?? e.derived.sanityPoints ?? ""}/${e.derived.sanityMax ?? ""}`)), F(I, Y);
    };
    C(
      () => U(V, (I) => {
        s(r) && e.derived.sanityPoints > 0 && I(z);
      }),
      "if",
      at,
      56,
      4
    );
  }
  var j = v(V, 2);
  {
    var H = (I) => {
      var Y = Ec(), q = be(Y), W = v(m(q), 2), oe = m(W), le = v(q, 2), ie = v(m(le), 2), xe = m(ie);
      G(() => {
        B(oe, e.derived.socv), B(xe, `${e.derived.currentSocietyPoints ?? e.derived.societyPoints ?? ""}/${e.derived.societyPointsMax ?? ""}`);
      }), F(I, Y);
    };
    C(
      () => U(j, (I) => {
        s(i) && e.derived.socv > 0 && I(H);
      }),
      "if",
      at,
      62,
      4
    );
  }
  return G(() => {
    B(x, e.derived.damageMultiplier), B(O, e.derived.ar);
  }), F(t, o), pe(l);
}
function yn(t, ...e) {
  return e.reduce((a, n) => a + n, t);
}
function wn(t) {
  switch (t) {
    case "minor-edge":
      return "3d6kh2";
    case "major-edge":
      return "4d6kh2";
    case "minor-obstacle":
      return "3d6kl2";
    case "major-obstacle":
      return "4d6kl2";
    default:
      return "2d6";
  }
}
function pr() {
  return `<div class="besm-edge-options" style="display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin-bottom:6px;">
  <label style="font-size:11px; cursor:pointer;"><input type="radio" name="besm-edge" value="none" checked /> Normal</label>
  <label style="font-size:11px; cursor:pointer;"><input type="radio" name="besm-edge" value="minor-edge" /> Minor Edge</label>
  <label style="font-size:11px; cursor:pointer;"><input type="radio" name="besm-edge" value="major-edge" /> Major Edge</label>
  <label style="font-size:11px; cursor:pointer;"><input type="radio" name="besm-edge" value="minor-obstacle" /> Minor Obstacle</label>
  <label style="font-size:11px; cursor:pointer;"><input type="radio" name="besm-edge" value="major-obstacle" /> Major Obstacle</label>
</div>`;
}
function Yn(t) {
  const e = t.querySelector('input[name="besm-edge"]:checked'), a = (e == null ? void 0 : e.value) ?? "none";
  return a === "none" ? null : a;
}
const Nc = {
  stat: "Stat Roll",
  skill: "Skill Roll",
  initiative: "Initiative",
  attack: "Attack Roll",
  defence: "Defence Roll",
  sanity: "Sanity Roll",
  social: "Social Combat Roll"
};
function kn(t, e, a, n) {
  const r = Nc[t] ?? "Roll", i = e.dice.map((c) => `<span class="besm-die">${c}</span>`).join(" + "), l = (e.discarded ?? []).length > 0 ? ` <span style="opacity:0.4; text-decoration:line-through;">${e.discarded.join(", ")}</span>` : "", o = a.filter((c) => c.value !== 0).map((c) => `<span class="besm-mod">+${c.value} ${c.label}</span>`).join(" ");
  return `<div class="besm-roll">
  <div class="besm-roll-header">${r}</div>
  <div class="besm-roll-dice">${i} = ${e.diceTotal}${l}</div>
  ${o ? `<div class="besm-roll-mods">${o}</div>` : ""}
  <div class="besm-roll-total">Total: ${n}</div>
</div>`;
}
function zs(t) {
  const a = (t.terms ?? []).find((l) => l.results);
  if (!a) return { dice: [], discarded: [], diceTotal: t.total };
  const n = a.results.filter((l) => l.active !== !1).map((l) => l.result), r = a.results.filter((l) => l.active === !1).map((l) => l.result), i = n.reduce((l, o) => l + o, 0);
  return { dice: n, discarded: r, diceTotal: i };
}
async function Gs(t, e) {
  const a = t.system.stats[e];
  if (a.mode !== "missing")
    return { value: a.mode === "zero" ? 0 : a.value, label: e };
  const n = ["body", "mind", "soul"].filter((o) => t.system.stats[o].mode !== "missing").map((o) => ({
    key: o,
    value: t.system.stats[o].mode === "zero" ? 0 : t.system.stats[o].value,
    label: o.charAt(0).toUpperCase() + o.slice(1)
  }));
  if (n.length === 0)
    return ui.notifications.warn("No stats available for this roll."), null;
  if (n.length === 1)
    return { value: n[0].value, label: n[0].key };
  const r = n.map((o) => ({
    label: `${o.label} (${o.value})`,
    action: o.key,
    callback: () => o.key
  })), i = await foundry.applications.api.DialogV2.wait({
    window: { title: "Missing Stat — Choose Substitute" },
    content: "<p>This roll calls for a missing stat. Choose which stat to substitute:</p>",
    buttons: r
  });
  if (!i) return null;
  const l = n.find((o) => o.key === i);
  return l ? { value: l.value, label: l.key } : null;
}
async function Lc(t, e) {
  const a = await Gs(t, e);
  if (!a) return null;
  const n = `<div class="besm-roll">
  <div class="besm-roll-header">Stat Roll — ${a.label.charAt(0).toUpperCase() + a.label.slice(1)} (${a.value})</div>
  ${pr()}
  <button data-action="execute-stat-roll" data-actor-id="${t.id}" data-stat-key="${a.label}" data-stat-value="${a.value}" style="padding:4px 12px; font-size:12px; cursor:pointer; font-weight:bold;">Roll</button>
</div>`;
  await ChatMessage.create({
    content: n,
    speaker: ChatMessage.getSpeaker({ actor: t })
  });
}
async function Dc(t, e, a, n) {
  const r = game.actors.get(t);
  if (!r) return;
  const i = wn(n), l = await new Roll(i).evaluate(), o = zs(l), c = yn(o.diceTotal, a), p = [{ label: e.charAt(0).toUpperCase() + e.slice(1), value: a }], f = `${kn("stat", o, p, c)}
<div class="besm-roll-actions" style="margin-top:4px;">
  <button data-action="spend-ep" data-actor-id="${t}" data-total="${c}" data-message-id="" style="padding:2px 8px; font-size:11px; cursor:pointer;">Spend EP?</button>
</div>`, u = await ChatMessage.create({
    content: f,
    speaker: ChatMessage.getSpeaker({ actor: r }),
    rolls: [l]
  }), g = document.createElement("div");
  g.innerHTML = u.content, g.querySelectorAll('[data-action="spend-ep"]').forEach((h) => {
    h.setAttribute("data-message-id", u.id);
  }), await u.update({ content: g.innerHTML });
}
async function Ic(t, e, a, n) {
  const r = await Gs(t, e);
  if (!r) return null;
  const i = `<div class="besm-roll">
  <div class="besm-roll-header">Skill Roll — ${n}</div>
  <div style="font-size:11px; color:#94a3b8; margin-bottom:4px;">${r.label.charAt(0).toUpperCase() + r.label.slice(1)} (${r.value}) + ${n} (${a})</div>
  ${pr()}
  <button data-action="execute-skill-roll" data-actor-id="${t.id}" data-stat-key="${r.label}" data-stat-value="${r.value}" data-skill-level="${a}" data-skill-name="${n}" style="padding:4px 12px; font-size:12px; cursor:pointer; font-weight:bold;">Roll</button>
</div>`;
  await ChatMessage.create({
    content: i,
    speaker: ChatMessage.getSpeaker({ actor: t })
  });
}
async function Rc(t, e, a, n, r, i) {
  const l = game.actors.get(t);
  if (!l) return;
  const o = wn(i), c = await new Roll(o).evaluate(), p = zs(c), d = yn(p.diceTotal, a, n), f = [
    { label: e.charAt(0).toUpperCase() + e.slice(1), value: a },
    { label: r, value: n }
  ], g = `${kn("skill", p, f, d)}
<div class="besm-roll-actions" style="margin-top:4px;">
  <button data-action="spend-ep" data-actor-id="${t}" data-total="${d}" data-message-id="" style="padding:2px 8px; font-size:11px; cursor:pointer;">Spend EP?</button>
</div>`, h = await ChatMessage.create({
    content: g,
    speaker: ChatMessage.getSpeaker({ actor: l }),
    rolls: [c]
  }), _ = document.createElement("div");
  _.innerHTML = h.content, _.querySelectorAll('[data-action="spend-ep"]').forEach((b) => {
    b.setAttribute("data-message-id", h.id);
  }), await h.update({ content: _.innerHTML });
}
je[T] = "src/components/sidebar/ActorSidebar.svelte";
var Bc = P(/* @__PURE__ */ N('<div class="flex flex-col gap-1"><span class="text-xs text-slate-200"> </span> <div class="flex gap-1"><button type="button" class="px-1.5 py-0.5 bg-blue-700 text-blue-100 rounded border-0 cursor-pointer text-xs hover:bg-blue-600">Open</button> <button type="button" class="px-1.5 py-0.5 bg-slate-700 text-slate-300 rounded border-0 cursor-pointer text-xs hover:bg-slate-600">Unlink</button></div></div>'), je[T], [[101, 8, [[102, 10], [103, 10, [[104, 12], [108, 12]]]]]]), Hc = P(/* @__PURE__ */ N("<option> </option>"), je[T], [[123, 14]]), Oc = P(/* @__PURE__ */ N('<div class="flex flex-col gap-1"><span class="text-xs text-slate-400">No pilot linked</span> <select class="w-full bg-slate-800 border border-slate-700 rounded text-xs text-slate-100 p-1"><option>— Select Pilot —</option><!></select> <button type="button" class="px-1.5 py-0.5 bg-emerald-700 text-emerald-100 rounded border-0 cursor-pointer text-xs hover:bg-emerald-600 self-start">Link</button></div>'), je[T], [[115, 8, [[116, 10], [117, 10, [[121, 12]]], [126, 10]]]]), jc = P(/* @__PURE__ */ N('<div class="border-t border-slate-700 pt-2"><div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Pilot</div> <!></div>'), je[T], [[98, 4, [[99, 6]]]]), zc = P(/* @__PURE__ */ N('<div class="bg-slate-800 p-3 border-r border-slate-700 flex flex-col gap-3 overflow-y-auto" style="width: calc(var(--spacing) * 55);"><input class="text-base font-bold text-slate-100 bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 w-full p-0.5 rounded"/> <div><div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Stats</div> <div class="flex flex-col gap-1.5"></div></div> <!> <!> <!> <!></div>'), je[T], [[58, 0, [[60, 2], [67, 2, [[68, 4], [69, 4]]]]]]);
function je(t, e) {
  he(new.target), fe(e, !0, je);
  let a = Pt(e, "showSP", 3, !1), n = Pt(e, "showEP", 3, !0), r = Pt(e, "showCV", 3, !0), i = Pt(e, "showPilot", 3, !1), l = Pt(e, "statsToShow", 19, () => ["body", "mind", "soul"]);
  const o = { body: "Body", mind: "Mind", soul: "Soul" };
  function c(j, H) {
    e.actor.update({ [`system.stats.${j}.value`]: H });
  }
  function p(j) {
    Lc(e.actor, j);
  }
  let d = L(/* @__PURE__ */ J(() => i() && e.actor.system.pilotId ? game.actors.get(e.actor.system.pilotId) : null), "pilotActor"), f = L(/* @__PURE__ */ ve(""), "pilotIdInput"), u = L(
    /* @__PURE__ */ J(() => i() ? game.actors.filter((j) => A(j.id, e.actor.id, !1) && A(j.type, "character")).sort((j, H) => j.name.localeCompare(H.name)) : []),
    "availablePilots"
  );
  function g() {
    s(d) && s(d).sheet.render(!0);
  }
  async function h() {
    s(f) && ((await Ae(e.actor.update({ "system.pilotId": s(f) })))(), _e(f, ""));
  }
  async function _() {
    (await Ae(e.actor.update({ "system.pilotId": "" })))();
  }
  var b = { ...ge() }, k = zc(), E = m(k), x = v(E, 2), M = v(m(x), 2);
  C(
    () => Ke(M, 21, l, St, (j, H) => {
      const I = L(/* @__PURE__ */ J(() => e.actor.system.stats[s(H)]), "stat");
      s(I), C(
        () => ia(j, {
          get label() {
            return o[s(H)];
          },
          get value() {
            return s(I).value;
          },
          get cpCost() {
            return s(I).cpCost;
          },
          get mode() {
            return s(I).mode;
          },
          onUpdate: (Y) => c(s(H), Y),
          onRoll: () => p(s(H))
        }),
        "component",
        je,
        72,
        8,
        { componentTag: "StatInput" }
      );
    }),
    "each",
    je,
    70,
    6
  );
  var S = v(x, 2);
  C(
    () => Va(S, {
      get actor() {
        return e.actor;
      }
    }),
    "component",
    je,
    85,
    2,
    { componentTag: "CPTracker" }
  );
  var w = v(S, 2);
  {
    var R = (j) => {
      C(
        () => Or(j, {
          get pool() {
            return e.actor.system.spPool;
          },
          get spent() {
            return e.actor.system.spSpent;
          },
          get remaining() {
            return e.actor.system.spRemaining;
          }
        }),
        "component",
        je,
        89,
        4,
        { componentTag: "SPTracker" }
      );
    };
    C(
      () => U(w, (j) => {
        a() && e.actor.system.spPool > 0 && j(R);
      }),
      "if",
      je,
      88,
      2
    );
  }
  var O = v(w, 2);
  {
    var V = (j) => {
      var H = jc(), I = v(m(H), 2);
      {
        var Y = (W) => {
          var oe = Bc(), le = m(oe), ie = m(le), xe = v(le, 2), it = m(xe), Le = v(it, 2);
          G(() => B(ie, s(d).name)), D("click", it, g), D("click", Le, _), F(W, oe);
        }, q = (W) => {
          var oe = Oc(), le = v(m(oe), 2), ie = m(le);
          ie.value = ie.__value = "";
          var xe = v(ie);
          C(
            () => Ke(xe, 17, () => s(u), St, (Le, De) => {
              var et = Hc(), Ie = m(et, !0);
              var ut = {};
              G(() => {
                B(Ie, s(De).name), ut !== (ut = s(De).id) && (et.value = (et.__value = s(De).id) ?? "");
              }), F(Le, et);
            }),
            "each",
            je,
            122,
            12
          );
          var it = v(le, 2);
          si(
            le,
            function() {
              return s(f);
            },
            function(De) {
              _e(f, De);
            }
          ), D("click", it, h), F(W, oe);
        };
        C(
          () => U(I, (W) => {
            s(d) ? W(Y) : W(q, -1);
          }),
          "if",
          je,
          100,
          6
        );
      }
      F(j, H);
    };
    C(
      () => U(O, (j) => {
        i() && j(V);
      }),
      "if",
      je,
      97,
      2
    );
  }
  var z = v(O, 2);
  return C(
    () => at(z, {
      get derived() {
        return e.actor.system.derived;
      },
      get showEP() {
        return n();
      },
      get showCV() {
        return r();
      }
    }),
    "component",
    je,
    136,
    2,
    { componentTag: "DerivedStats" }
  ), G(() => se(E, e.actor.name)), D("change", E, function(H) {
    return e.actor.update({ name: H.target.value });
  }), F(t, k), pe(b);
}
Je(["change", "click"]);
Ma[T] = "src/components/tabs/TabBar.svelte";
var Gc = P(/* @__PURE__ */ N("<button> </button>"), Ma[T], [[7, 4]]), Vc = P(/* @__PURE__ */ N('<div class="flex border-b border-slate-700 bg-slate-950"></div>'), Ma[T], [[5, 0]]);
function Ma(t, e) {
  he(new.target), fe(e, !0, Ma);
  var a = { ...ge() }, n = Vc();
  return C(
    () => Ke(n, 21, () => e.tabs, St, (r, i) => {
      var l = Gc(), o = m(l, !0);
      G(() => {
        Dt(l, 1, `px-3.5 py-2 text-xs border-0 cursor-pointer bg-transparent
             ${A(e.activeTab, s(i).id) ? "text-slate-100 border-b-2 border-b-blue-500" : "text-slate-500 hover:text-slate-300"}`), B(o, s(i).label);
      }), D("click", l, function() {
        return e.onSelect(s(i).id);
      }), F(r, l);
    }),
    "each",
    Ma,
    6,
    2
  ), F(t, n), pe(a);
}
Je(["click"]);
Ua[T] = "src/components/ui/BenchmarkPanel.svelte";
var Uc = P(/* @__PURE__ */ N('<li class="py-0.5"> </li>'), Ua[T], [[12, 8]]), qc = P(/* @__PURE__ */ N('<div class="mx-3 my-2 p-2 border border-amber-600 rounded bg-amber-950/30"><div class="text-xs font-bold text-amber-400"> </div> <ul class="mt-1 text-xs text-amber-300 list-none p-0 m-0"></ul> <p class="mt-1 text-xs text-stone-500 italic">These are recommendations, not restrictions.</p></div>'), Ua[T], [[6, 2, [[7, 4], [10, 4], [15, 4]]]]);
function Ua(t, e) {
  he(new.target), fe(e, !0, Ua);
  let a = Pt(e, "warnings", 19, () => []);
  var n = { ...ge() }, r = Ee(), i = be(r);
  {
    var l = (o) => {
      var c = qc(), p = m(c), d = m(p), f = v(p, 2);
      C(
        () => Ke(f, 21, a, St, (u, g) => {
          var h = Uc(), _ = m(h, !0);
          G(() => B(_, s(g))), F(u, h);
        }),
        "each",
        Ua,
        11,
        6
      ), G(() => B(d, `Benchmark Recommendations (${a().length ?? ""})`)), F(o, c);
    };
    C(
      () => U(i, (o) => {
        a().length > 0 && o(l);
      }),
      "if",
      Ua,
      5,
      0
    );
  }
  return F(t, r), pe(n);
}
vn[T] = "src/components/ui/TemplateBadges.svelte";
var Wc = P(/* @__PURE__ */ N('<span><span class="font-medium capitalize"> </span> </span>'), vn[T], [[18, 6, [[19, 8]]]]), Yc = P(/* @__PURE__ */ N('<div class="flex flex-wrap gap-1 px-3 py-1.5 border-b border-slate-700"></div>'), vn[T], [[16, 2]]);
function vn(t, e) {
  he(new.target), fe(e, !0, vn);
  let a = L(/* @__PURE__ */ J(() => e.actor.system.appliedTemplates ?? []), "badges");
  const n = {
    race: "bg-emerald-900 text-emerald-300",
    class: "bg-blue-900 text-blue-300",
    size: "bg-amber-900 text-amber-300",
    bundle: "bg-purple-900 text-purple-300",
    powerpack: "bg-cyan-900 text-cyan-300"
  };
  var r = { ...ge() }, i = Ee(), l = be(i);
  {
    var o = (c) => {
      var p = Yc();
      C(
        () => Ke(p, 21, () => s(a), St, (d, f) => {
          var u = Wc(), g = m(u), h = m(g);
          var _ = v(g);
          G(() => {
            Dt(u, 1, `inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs ${n[s(f).type] ?? "bg-slate-700 text-slate-300" ?? ""}`), B(h, `${s(f).type ?? ""}:`), B(_, ` ${s(f).name ?? ""}`);
          }), F(d, u);
        }),
        "each",
        vn,
        17,
        4
      ), F(c, p);
    };
    C(
      () => U(l, (c) => {
        s(a).length > 0 && c(o);
      }),
      "if",
      vn,
      15,
      0
    );
  }
  return F(t, i), pe(r);
}
xa[T] = "src/components/ui/CollapsibleSection.svelte";
var Kc = P(/* @__PURE__ */ N('<span class="text-xs text-slate-500"> </span>'), xa[T], [[14, 6]]), Jc = P(/* @__PURE__ */ N('<div class="mb-2"><button class="flex items-center gap-1.5 w-full py-1.5 cursor-pointer bg-transparent border-0 text-left"><span class="text-slate-500 text-xs"> </span> <span> </span> <!></button> <!></div>'), xa[T], [[6, 0, [[7, 2, [[11, 4], [12, 4]]]]]]);
function xa(t, e) {
  he(new.target), fe(e, !0, xa);
  let a = Pt(e, "count", 3, 0), n = Pt(e, "headerClass", 3, ""), r = L(/* @__PURE__ */ ve(!0), "open");
  var i = { ...ge() }, l = Jc(), o = m(l), c = m(o), p = m(c), d = v(c, 2), f = m(d), u = v(d, 2);
  {
    var g = (b) => {
      var k = Kc(), E = m(k);
      G(() => B(E, `(${a() ?? ""})`)), F(b, k);
    };
    C(
      () => U(u, (b) => {
        a() > 0 && b(g);
      }),
      "if",
      xa,
      13,
      4
    );
  }
  var h = v(o, 2);
  {
    var _ = (b) => {
      var k = Ee(), E = be(k);
      C(() => dc(E, () => e.children), "render", xa, 18, 4), F(b, k);
    };
    C(
      () => U(h, (b) => {
        s(r) && b(_);
      }),
      "if",
      xa,
      17,
      2
    );
  }
  return G(() => {
    B(p, s(r) ? "▼" : "▶"), Dt(d, 1, `text-xs font-bold uppercase tracking-wide ${n() ?? ""}`), B(f, e.title);
  }), D("click", o, function() {
    return _e(r, !s(r));
  }), F(t, l), pe(i);
}
Je(["click"]);
function Zc(t, e, a, n) {
  const r = Math.max(0, t - e), i = Math.max(0, r - n);
  return Math.max(0, a - i);
}
async function Xc(t, e) {
  const a = t.getActiveTokens()[0];
  if (!a) {
    ui.notifications.warn("No active token found for this actor. Place a token on the scene first.");
    return;
  }
  const n = t.system.derived.hpMax, r = t.system.derived.currentHp, i = e.system.derived.hpMax, l = [...e.items].find(
    (h) => h.type === "attribute" && h.name === "Healing" && h.system.transformationHeal === !0
  ), o = l ? l.system.effectiveLevel * 5 : 0, c = Zc(n, r, i, o);
  await e.update({ "system.derived.currentHp": c });
  const p = a.actor.effects.map((h) => h.toObject());
  if (p.length > 0) {
    const h = e.effects.map((_) => _.id);
    h.length > 0 && await e.deleteEmbeddedDocuments("ActiveEffect", h), await e.createEmbeddedDocuments("ActiveEffect", p);
  }
  const { x: d, y: f, elevation: u } = a;
  await a.document.delete();
  const g = await e.getTokenDocument({ x: d, y: f, elevation: u });
  await canvas.scene.createEmbeddedDocuments("Token", [g.toObject()]), ui.notifications.info(`${t.name} transforms into ${e.name}!`);
}
ya[T] = "src/components/ui/LinkedActorBadge.svelte";
var Qc = P(/* @__PURE__ */ N(`<span class="px-1 rounded bg-slate-600 text-slate-200 text-xs" title="Character pays half the linked actor's CP"> </span>`), ya[T], [[41, 6]]), $c = P(/* @__PURE__ */ N('<button class="text-amber-400 hover:text-amber-200 bg-transparent border-0 cursor-pointer text-xs p-0">Swap</button>'), ya[T], [[51, 6]]), ed = P(/* @__PURE__ */ N('<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-700 text-xs flex-shrink-0"><span class="text-slate-300"> </span> <span> </span> <!> <button class="text-blue-400 hover:text-blue-200 bg-transparent border-0 cursor-pointer text-xs p-0">Open</button> <!></span>'), ya[T], [[35, 2, [[36, 4], [37, 4], [45, 4]]]]);
function ya(t, e) {
  he(new.target), fe(e, !0, ya);
  let a = L(
    /* @__PURE__ */ J(() => e.attribute.system.linkedActorId ? game.actors.get(e.attribute.system.linkedActorId) : null),
    "linkedActor"
  ), n = L(/* @__PURE__ */ J(() => e.attribute.system.effectiveLevel * 10), "cpBudget"), r = L(/* @__PURE__ */ J(() => {
    var _;
    return ((_ = s(a)) == null ? void 0 : _.system.cpSpent) ?? 0;
  }), "cpSpent"), i = L(/* @__PURE__ */ J(() => s(r) <= s(n)), "cpValid"), l = L(/* @__PURE__ */ J(() => A(e.attribute.system.baseCostPerLevel, 0) && e.attribute.system.linkedActorId), "isItemAttr"), o = L(/* @__PURE__ */ J(() => s(l) ? Math.ceil(s(r) / 2) : null), "itemCost"), c = L(/* @__PURE__ */ J(() => /alternate/i.test(e.attribute.name)), "isAlternateForm");
  function p(_) {
    _.stopPropagation(), s(a) && s(a).sheet.render(!0);
  }
  function d(_) {
    _.stopPropagation(), s(a) && e.actor && Xc(e.actor, s(a));
  }
  var f = { ...ge() }, u = Ee(), g = be(u);
  {
    var h = (_) => {
      var b = ed(), k = m(b), E = m(k), x = v(k, 2), M = m(x), S = v(x, 2);
      {
        var w = (z) => {
          var j = Qc(), H = m(j);
          G(() => B(H, `Cost: ${s(o) ?? ""} CP`)), F(z, j);
        };
        C(
          () => U(S, (z) => {
            A(s(o), null, !1) && z(w);
          }),
          "if",
          ya,
          40,
          4
        );
      }
      var R = v(S, 2), O = v(R, 2);
      {
        var V = (z) => {
          var j = $c();
          G(() => Er(j, "title", `Swap to ${s(a).name ?? ""}`)), D("click", j, d), F(z, j);
        };
        C(
          () => U(O, (z) => {
            s(c) && z(V);
          }),
          "if",
          ya,
          50,
          4
        );
      }
      G(() => {
        B(E, s(a).name), Dt(x, 1, `px-1 rounded text-xs ${s(i) ? "bg-emerald-900 text-emerald-300" : "bg-red-900 text-red-300"}`), B(M, `${s(r) ?? ""}/${s(n) ?? ""} CP`), Er(R, "title", `Open ${s(a).name ?? ""} sheet`);
      }), D("click", R, p), F(_, b);
    };
    C(
      () => U(g, (_) => {
        s(a) && _(h);
      }),
      "if",
      ya,
      34,
      0
    );
  }
  return F(t, u), pe(f);
}
Je(["click"]);
function td(t, e, a, n) {
  return Math.max(0, t * e + a - n);
}
function ad(t, e) {
  return {
    attackerWins: t >= e,
    margin: t - e
  };
}
function nd(t, e) {
  return t === e ? { tie: !0 } : {
    tie: !1,
    attackerWins: t > e,
    margin: Math.abs(t - e)
  };
}
function rd(t) {
  return t >= 18 ? 5 : t >= 12 ? 4 : t >= 6 ? 3 : t >= 3 ? 2 : t >= 1 ? 1 : 0;
}
function id(t, e) {
  const a = Math.floor(e / 10);
  return Math.min(t, a);
}
function Mi(t) {
  const a = (t.terms ?? []).find((l) => l.results);
  if (!a) return { dice: [], discarded: [], diceTotal: t.total };
  const n = a.results.filter((l) => l.active !== !1).map((l) => l.result), r = a.results.filter((l) => l.active === !1).map((l) => l.result), i = n.reduce((l, o) => l + o, 0);
  return { dice: n, discarded: r, diceTotal: i };
}
async function Vs(t, e, a = null) {
  var o;
  const n = t.system.derived.acv, r = ((o = e.system.weaponOptions) == null ? void 0 : o.isMuscleAttack) ?? !1, i = r ? t.system.derived.meleeDamageMultiplier : t.system.derived.damageMultiplier, l = `<div class="besm-roll">
  <div class="besm-roll-header">Attack Roll — ${e.name}</div>
  <div style="font-size:11px; color:#94a3b8; margin-bottom:4px;">Attack Combat Value: ${n}</div>
  ${pr()}
  <button data-action="execute-attack-roll"
    data-actor-id="${t.id}"
    data-weapon-id="${e.id}"
    data-acv="${n}"
    data-dm="${i}"
    data-weapon-level="${e.system.effectiveLevel}"
    data-is-muscle="${r}"
    data-target-id="${a ?? ""}"
    style="padding:4px 12px; font-size:12px; cursor:pointer; font-weight:bold;">Roll</button>
</div>`;
  await ChatMessage.create({
    content: l,
    speaker: ChatMessage.getSpeaker({ actor: t })
  });
}
async function sd(t, e) {
  const a = t.getAttribute("data-actor-id"), n = Number(t.getAttribute("data-acv")), r = Number(t.getAttribute("data-dm")), i = Number(t.getAttribute("data-weapon-level")), l = t.getAttribute("data-is-muscle") === "true", o = t.getAttribute("data-target-id") || null, c = t.getAttribute("data-weapon-id"), p = game.actors.get(a);
  if (!p) return;
  const d = p.items.get(c), f = (d == null ? void 0 : d.name) ?? "Weapon", u = wn(e), g = await new Roll(u).evaluate(), h = Mi(g), _ = yn(h.diceTotal, n), E = `${kn("attack", h, [{ label: "Attack Combat Value (ACV)", value: n }], _)}
<div class="besm-roll-actions" style="margin-top:8px; display:flex; gap:4px; flex-wrap:wrap;">
  <button data-action="defend" data-message-id="" style="padding:2px 8px; font-size:11px; cursor:pointer;">Defend</button>
  <button data-action="auto-defend" data-message-id="" style="padding:2px 8px; font-size:11px; cursor:pointer;">Auto-Defend (NPC)</button>
</div>`, x = await ChatMessage.create({
    content: E,
    speaker: ChatMessage.getSpeaker({ actor: p }),
    rolls: [g],
    flags: {
      besm: {
        type: "attack",
        attackerId: a,
        attackTotal: _,
        weaponName: f,
        weaponLevel: i,
        isMuscle: l,
        dm: r,
        targetActorId: o
      }
    }
  }), M = document.createElement("div");
  M.innerHTML = x.content, M.querySelectorAll("[data-message-id]").forEach((S) => {
    S.setAttribute("data-message-id", x.id);
  }), await x.update({ content: M.innerHTML });
}
async function Ui(t, e) {
  const a = e.flags.besm, n = t.system.derived.dcv, r = `<div class="besm-roll">
  <div class="besm-roll-header">Defence Roll — ${t.name}</div>
  <div style="font-size:11px; color:#94a3b8; margin-bottom:4px;">Defence Combat Value: ${n} vs Attack: ${a.attackTotal}</div>
  ${pr()}
  <button data-action="execute-defence-roll"
    data-defender-id="${t.id}"
    data-attack-msg-id="${e.id}"
    data-dcv="${n}"
    style="padding:4px 12px; font-size:12px; cursor:pointer; font-weight:bold;">Roll</button>
</div>`;
  await ChatMessage.create({
    content: r,
    speaker: ChatMessage.getSpeaker({ actor: t })
  });
}
async function ld(t, e) {
  const a = t.getAttribute("data-defender-id"), n = t.getAttribute("data-attack-msg-id"), r = Number(t.getAttribute("data-dcv")), i = game.actors.get(a), l = game.messages.get(n);
  if (!i || !l) return;
  const o = l.flags.besm, c = wn(e), p = await new Roll(c).evaluate(), d = Mi(p), f = yn(d.diceTotal, r), u = ad(o.attackTotal, f);
  let g = 0, h = "";
  if (u.attackerWins) {
    const x = game.actors.get(o.attackerId), M = (x == null ? void 0 : x.system.derived.acv) ?? 0;
    g = td(o.dm, o.weaponLevel, M, i.system.derived.ar), h = `
<div style="margin-top:4px; font-size:12px; color:#f87171;">
  Damage: ${g} (Damage Multiplier ${o.dm} × Lv ${o.weaponLevel} + Attack Combat Value ${M} - Armour Rating ${i.system.derived.ar})
</div>
<button data-action="apply-damage" data-defender-id="${i.id}" data-damage="${g}" style="padding:2px 8px; font-size:11px; cursor:pointer; margin-top:4px;">Apply Damage</button>`;
  }
  const b = kn("defence", d, [{ label: "Defence Combat Value (DCV)", value: r }], f), k = u.attackerWins ? `<span style="color:#f87171;">Hit! (margin ${u.margin})</span>` : `<span style="color:#4ade80;">Miss! (margin ${Math.abs(u.margin)})</span>`, E = `<div class="besm-roll-header">Attack vs Defence</div>
<div style="font-size:12px; margin:4px 0;">Attack: ${o.attackTotal} vs Defence: ${f}</div>
<div style="font-size:13px; font-weight:bold; margin:4px 0;">${k}</div>
${b}
${h}`;
  await ChatMessage.create({
    content: E,
    speaker: ChatMessage.getSpeaker({ actor: i }),
    rolls: [p],
    flags: {
      besm: {
        type: "attackResult",
        attackerId: o.attackerId,
        defenderId: i.id,
        damage: g,
        attackerWins: u.attackerWins,
        margin: u.margin
      }
    }
  });
}
async function od(t, e) {
  const a = t.system.derived.currentHp, n = Math.max(0, a - e);
  if (await t.update({ "system.derived.currentHp": n }), e >= t.system.derived.sv && t.system.derived.sv > 0) {
    const r = t.getActiveTokens()[0];
    r && await r.toggleActiveEffect({ id: "stunned", name: "Stunned", icon: "icons/svg/daze.svg" });
  }
  if (n === 0) {
    const r = t.getActiveTokens()[0];
    r && await r.toggleActiveEffect({ id: "unconscious", name: "Unconscious", icon: "icons/svg/unconscious.svg" });
  }
  ui.notifications.info(`${t.name} takes ${e} damage. HP: ${a} → ${n}`);
}
async function cd(t, e, a) {
  const n = t.system.stats.soul.mode !== "missing" ? t.system.stats.soul.value : 0, r = t.system.derived.currentEp, i = id(n, r);
  if (i === 0)
    return ui.notifications.warn("No EP available to spend."), 0;
  const l = [];
  for (let p = 1; p <= i; p++)
    l.push({
      label: `+${p} (${p * 10} EP)`,
      action: String(p),
      callback: () => p
    });
  l.unshift({
    label: "Skip",
    action: "0",
    callback: () => 0
  });
  const o = await foundry.applications.api.DialogV2.wait({
    window: { title: "Spend Energy Points" },
    content: `<p>Spend EP for a roll bonus? (10 EP per +1, max +${i})</p>`,
    buttons: l
  });
  if (!o || o === 0) return 0;
  await t.update({
    "system.derived.currentEp": r - o * 10
  });
  const c = game.messages.get(a);
  if (c) {
    const p = e + o, d = c.content.replace(
      /Total: \d+/,
      `Total: ${p} <span style="color:#60a5fa;">(+${o} EP)</span>`
    );
    await c.update({ content: d });
  }
  return o;
}
async function dd(t) {
  const e = t.system.stats.mind.mode !== "missing" ? t.system.stats.mind.value : null, a = t.system.stats.soul.mode !== "missing" ? t.system.stats.soul.value : null;
  if (e === null || a === null)
    return ui.notifications.warn("Cannot make a sanity roll — Mind or Soul is missing."), null;
  const n = Math.floor((e + a) / 2), r = `<div class="besm-roll">
  <div class="besm-roll-header">Sanity Roll</div>
  <div style="font-size:11px; color:#94a3b8; margin-bottom:4px;">Sanity Base: ${n}</div>
  ${pr()}
  <button data-action="execute-sanity-roll"
    data-actor-id="${t.id}"
    data-sanity-base="${n}"
    style="padding:4px 12px; font-size:12px; cursor:pointer; font-weight:bold;">Roll</button>
</div>`;
  await ChatMessage.create({
    content: r,
    speaker: ChatMessage.getSpeaker({ actor: t })
  });
}
async function ud(t, e) {
  const a = t.getAttribute("data-actor-id"), n = Number(t.getAttribute("data-sanity-base")), r = game.actors.get(a);
  if (!r) return;
  const i = wn(e), l = await new Roll(i).evaluate(), o = Mi(l), c = yn(o.diceTotal, n), d = kn("sanity", o, [{ label: "Sanity Base", value: n }], c);
  await ChatMessage.create({
    content: d,
    speaker: ChatMessage.getSpeaker({ actor: r }),
    rolls: [l]
  });
}
At[T] = "src/components/ui/AttributeRow.svelte";
var vd = P(/* @__PURE__ */ N('<span class="text-amber-400"> </span>'), At[T], [[92, 56]]), fd = P(/* @__PURE__ */ N('<span class="text-slate-400"> </span>'), At[T], [[100, 4]]), pd = P(/* @__PURE__ */ N('<div class="flex flex-wrap items-center gap-x-3 gap-y-1 px-2 py-1.5 border-b border-slate-800 text-xs cursor-pointer hover:bg-slate-800/50"><span class="text-slate-400 flex-shrink-0 tabular-nums"> <!></span> <span class="text-slate-400 flex-shrink-0 tabular-nums"> </span> <span class="text-slate-200 font-medium"> </span> <!> <!> <!></div>'), At[T], [[85, 0, [[91, 2], [95, 2], [97, 2]]]]);
function At(t, e) {
  he(new.target), fe(e, !0, At);
  function a(H) {
    H.stopPropagation(), Vs(e.actor, e.attribute);
  }
  let n = L(/* @__PURE__ */ J(() => e.attribute.system.enhancements ?? []), "enhancements"), r = L(/* @__PURE__ */ J(() => e.attribute.system.limiters ?? []), "limiters"), i = L(/* @__PURE__ */ J(() => e.attribute.system.selectedOptions ?? []), "options"), l = L(/* @__PURE__ */ J(() => A(e.attribute.system.purchasedLevel, e.attribute.system.effectiveLevel, !1)), "levelMismatch"), o = L(
    /* @__PURE__ */ J(() => () => {
      const H = [];
      return s(i).length > 0 && H.push(s(i).join(", ")), s(n).length > 0 && H.push(s(n).map((I) => `${I.name} -${I.levels}`).join(", ")), s(r).length > 0 && H.push(s(r).map((I) => `${I.name} +${I.levels}`).join(", ")), H.length > 0 ? `(${H.join("; ")})` : "";
    }),
    "parenthetical"
  );
  function c() {
    e.attribute.sheet.render(!0);
  }
  async function p(H) {
    var q;
    H.preventDefault();
    let I;
    try {
      I = JSON.parse(H.dataTransfer.getData("text/plain"));
    } catch {
      return;
    }
    if (A(I.type, "Item", !1)) return;
    const Y = (await Ae(fromUuid(I.uuid)))();
    if (Y) {
      if (A(Y.type, "enhancement")) {
        const W = {
          id: foundry.utils.randomID(),
          name: Y.name,
          levels: Y.system.levels
        };
        (await Ae(e.attribute.update({ "system.enhancements": [...s(n), W] })))();
      } else if (A(Y.type, "limiter")) {
        const W = {
          id: foundry.utils.randomID(),
          name: Y.name,
          levels: Y.system.levels
        };
        (await Ae(e.attribute.update({ "system.limiters": [...s(r), W] })))();
      } else if (A(Y.type, "besm4eTemplate") && A(Y.system.templateType, "powerpack")) {
        const W = [...s(n)], oe = [...s(r)];
        for (const le of Y.system.entries ?? []) {
          if (A(le.entryType, "item", !1)) continue;
          const ie = {
            id: foundry.utils.randomID(),
            name: le.name,
            levels: ((q = le.systemData) == null ? void 0 : q.levels) ?? 1
          };
          A(le.itemType, "enhancement") ? W.push(ie) : A(le.itemType, "limiter") && oe.push(ie);
        }
        (await Ae(e.attribute.update({
          "system.enhancements": W,
          "system.limiters": oe
        })))();
      }
    }
  }
  function d(H) {
    H.preventDefault(), H.dataTransfer.dropEffect = "copy";
  }
  var f = { ...ge() }, u = pd(), g = m(u), h = m(g), _ = v(h);
  {
    var b = (H) => {
      var I = vd(), Y = m(I);
      G(() => B(Y, `(${e.attribute.system.effectiveLevel ?? ""})`)), F(H, I);
    };
    C(
      () => U(_, (H) => {
        s(l) && H(b);
      }),
      "if",
      At,
      92,
      37
    );
  }
  var k = v(g, 2), E = m(k), x = v(k, 2), M = m(x), S = v(x, 2);
  {
    var w = (H) => {
      var I = fd(), Y = m(I);
      G((q) => B(Y, q), [() => s(o)()]), F(H, I);
    }, R = /* @__PURE__ */ J(() => s(o)());
    C(
      () => U(S, (H) => {
        s(R) && H(w);
      }),
      "if",
      At,
      99,
      2
    );
  }
  var O = v(S, 2);
  {
    var V = (H) => {
      C(
        () => oa(H, {
          onclick: a,
          get title() {
            return `Attack with ${e.attribute.name ?? ""}`;
          }
        }),
        "component",
        At,
        104,
        4,
        { componentTag: "RollButton" }
      );
    };
    C(
      () => U(O, (H) => {
        e.attribute.system.isWeapon && H(V);
      }),
      "if",
      At,
      103,
      2
    );
  }
  var z = v(O, 2);
  {
    var j = (H) => {
      C(
        () => ya(H, {
          get attribute() {
            return e.attribute;
          },
          get actor() {
            return e.actor;
          }
        }),
        "component",
        At,
        108,
        4,
        { componentTag: "LinkedActorBadge" }
      );
    };
    C(
      () => U(z, (H) => {
        e.attribute.system.linkedActorId && H(j);
      }),
      "if",
      At,
      107,
      2
    );
  }
  return G(() => {
    B(h, e.attribute.system.purchasedLevel), B(E, e.attribute.system.totalCost), B(M, e.attribute.name);
  }), D("click", u, c), kt("dragover", u, d), kt("drop", u, p), F(t, u), pe(f);
}
Je(["click"]);
jr[T] = "src/components/ui/DefectRow.svelte";
var md = P(/* @__PURE__ */ N('<div class="flex items-center gap-x-3 px-2 py-1.5 border-b border-slate-800 text-xs cursor-pointer hover:bg-slate-800/50" role="button" tabindex="0"><span class="text-slate-400 flex-shrink-0 tabular-nums"> </span> <span class="text-emerald-400 flex-shrink-0 tabular-nums"> </span> <span class="text-red-300"> </span></div>'), jr[T], [[9, 0, [[16, 2], [17, 2], [18, 2]]]]);
function jr(t, e) {
  he(new.target), fe(e, !0, jr);
  function a() {
    e.defect.sheet.render(!0);
  }
  var n = { ...ge() }, r = md(), i = m(r), l = m(i), o = v(i, 2), c = m(o), p = v(o, 2), d = m(p);
  return G(() => {
    B(l, e.defect.system.rankLevel), B(c, `+${e.defect.system.cpGranted ?? ""}`), B(d, e.defect.name);
  }), D("click", r, a), D("keydown", r, function(u) {
    A(u.key, "Enter") && a();
  }), F(t, r), pe(n);
}
Je(["click", "keydown"]);
qe[T] = "src/components/tabs/AttributesTab.svelte";
var hd = P(/* @__PURE__ */ N('<p class="text-xs text-slate-500 italic px-2">No attributes. Drag from compendium to add.</p>'), qe[T], [[40, 6]]), gd = P(/* @__PURE__ */ N('<p class="text-xs text-slate-500 italic px-2">No defects.</p>'), qe[T], [[50, 6]]), bd = P(/* @__PURE__ */ N('<div class="p-3"><!> <!></div>'), qe[T], [[37, 0]]);
function qe(t, e) {
  he(new.target), fe(e, !0, qe);
  let a = L(/* @__PURE__ */ J(() => [...e.actor.items].filter((d) => A(d.type, "attribute"))), "attributes"), n = L(/* @__PURE__ */ J(() => [...e.actor.items].filter((d) => A(d.type, "defect"))), "defects");
  async function r(d) {
    d.preventDefault();
    let f;
    try {
      f = JSON.parse(d.dataTransfer.getData("text/plain"));
    } catch {
      return;
    }
    if (A(f.type, "Item", !1)) return;
    const u = (await Ae(fromUuid(f.uuid)))();
    u && (A(u.type, "attribute") || A(u.type, "defect")) && (await Ae(e.actor.createEmbeddedDocuments("Item", [u.toObject()])))();
  }
  function i(d) {
    d.preventDefault(), d.dataTransfer.dropEffect = "copy";
  }
  var l = { ...ge() }, o = bd(), c = m(o);
  C(
    () => xa(c, {
      title: "Attributes",
      get count() {
        return s(a).length;
      },
      headerClass: "text-slate-100",
      children: Gi(qe, (d, f) => {
        var u = Ee(), g = be(u);
        {
          var h = (b) => {
            var k = hd();
            F(b, k);
          }, _ = (b) => {
            var k = Ee(), E = be(k);
            C(
              () => Ke(E, 17, () => s(a), (x) => x.id, (x, M) => {
                C(
                  () => At(x, {
                    get attribute() {
                      return s(M);
                    },
                    get actor() {
                      return e.actor;
                    }
                  }),
                  "component",
                  qe,
                  43,
                  8,
                  { componentTag: "AttributeRow" }
                );
              }),
              "each",
              qe,
              42,
              6
            ), F(b, k);
          };
          C(
            () => U(g, (b) => {
              A(s(a).length, 0) ? b(h) : b(_, -1);
            }),
            "if",
            qe,
            39,
            4
          );
        }
        F(d, u);
      }),
      $$slots: { default: !0 }
    }),
    "component",
    qe,
    38,
    2,
    { componentTag: "CollapsibleSection" }
  );
  var p = v(c, 2);
  return C(
    () => xa(p, {
      title: "Defects",
      get count() {
        return s(n).length;
      },
      headerClass: "text-red-400",
      children: Gi(qe, (d, f) => {
        var u = Ee(), g = be(u);
        {
          var h = (b) => {
            var k = gd();
            F(b, k);
          }, _ = (b) => {
            var k = Ee(), E = be(k);
            C(
              () => Ke(E, 17, () => s(n), (x) => x.id, (x, M) => {
                C(
                  () => jr(x, {
                    get defect() {
                      return s(M);
                    }
                  }),
                  "component",
                  qe,
                  53,
                  8,
                  { componentTag: "DefectRow" }
                );
              }),
              "each",
              qe,
              52,
              6
            ), F(b, k);
          };
          C(
            () => U(g, (b) => {
              A(s(n).length, 0) ? b(h) : b(_, -1);
            }),
            "if",
            qe,
            49,
            4
          );
        }
        F(d, u);
      }),
      $$slots: { default: !0 }
    }),
    "component",
    qe,
    48,
    2,
    { componentTag: "CollapsibleSection" }
  ), kt("dragover", o, i), kt("drop", o, r), F(t, o), pe(l);
}
Et[T] = "src/components/ui/SkillRow.svelte";
var _d = P(/* @__PURE__ */ N('<span class="text-slate-500 no-underline">(flavor)</span>'), Et[T], [[35, 6]]), xd = P(/* @__PURE__ */ N('<span class="ml-0.5 text-emerald-500">(free)</span>'), Et[T], [[46, 8]]), yd = P(/* @__PURE__ */ N('<span class="ml-0.5 text-amber-500"> </span>'), Et[T], [[48, 8]]), wd = P(/* @__PURE__ */ N("<span> <!></span>"), Et[T], [[43, 4]]), kd = P(/* @__PURE__ */ N('<div role="button" tabindex="0"><span> <!></span> <span class="text-slate-400"> </span> <span class="text-slate-500"> </span> <!> <span class="text-slate-400 ml-auto"> </span> <!></div>'), Et[T], [[25, 0, [[32, 2], [39, 2], [40, 2], [53, 2]]]]);
function Et(t, e) {
  he(new.target), fe(e, !0, Et);
  let a = L(/* @__PURE__ */ J(() => !e.skill.system.isAvailable), "unavailable"), n = L(/* @__PURE__ */ J(() => e.skill.system.specialisations ?? []), "specialisations");
  function r() {
    e.skill.sheet.render(!0);
  }
  function i(S) {
    S.stopPropagation(), Ic(e.actor, e.skill.system.linkedStat, e.skill.system.rank, e.skill.name);
  }
  var l = { ...ge() }, o = kd(), c = m(o), p = m(c), d = v(p);
  {
    var f = (S) => {
      var w = _d();
      F(S, w);
    };
    C(
      () => U(d, (S) => {
        e.skill.system.isFlavor && S(f);
      }),
      "if",
      Et,
      34,
      4
    );
  }
  var u = v(c, 2), g = m(u), h = v(u, 2), _ = m(h), b = v(h, 2);
  C(
    () => Ke(b, 17, () => s(n), St, (S, w) => {
      var R = wd(), O = m(R), V = v(O);
      {
        var z = (H) => {
          var I = xd();
          F(H, I);
        }, j = (H) => {
          var I = yd(), Y = m(I);
          G(() => B(Y, `(${s(w).spCost ?? ""} SP)`)), F(H, I);
        };
        C(
          () => U(V, (H) => {
            s(w).isFree ? H(z) : H(j, -1);
          }),
          "if",
          Et,
          45,
          6
        );
      }
      G(() => {
        Dt(R, 1, `inline-flex items-center px-1 py-0.5 rounded text-xs ${s(w).isFree ? "bg-emerald-900/50 text-emerald-300" : "bg-amber-900/50 text-amber-300"}`), B(O, `${s(w).name ?? ""} `);
      }), F(S, R);
    }),
    "each",
    Et,
    42,
    2
  );
  var k = v(b, 2), E = m(k), x = v(k, 2);
  {
    var M = (S) => {
      C(
        () => oa(S, {
          onclick: i,
          get title() {
            return `Roll ${e.skill.name ?? ""}`;
          }
        }),
        "component",
        Et,
        56,
        4,
        { componentTag: "RollButton" }
      );
    };
    C(
      () => U(x, (S) => {
        !s(a) && !e.skill.system.isFlavor && S(M);
      }),
      "if",
      Et,
      55,
      2
    );
  }
  return G(() => {
    Dt(o, 1, `flex flex-wrap items-center gap-x-3 gap-y-1 px-2 py-1.5 border-b border-slate-800 text-xs cursor-pointer hover:bg-slate-800/50 ${s(a) ? "opacity-40 line-through" : ""}`), Dt(c, 1, `text-slate-200 font-medium ${e.skill.system.isFlavor ? "italic" : ""}`), B(p, `${e.skill.name ?? ""} `), B(g, `Rank ${e.skill.system.rank ?? ""}`), B(_, e.skill.system.linkedStat), B(E, `${e.skill.system.totalSpCost ?? ""} SP`);
  }), D("click", o, r), D("keydown", o, function(w) {
    A(w.key, "Enter") && r();
  }), F(t, o), pe(l);
}
Je(["click", "keydown"]);
ht[T] = "src/components/tabs/SkillsTab.svelte";
var Sd = P(/* @__PURE__ */ N('<p class="text-xs text-slate-500 italic">No skills. Drag from compendium to add.</p>'), ht[T], [[50, 6]]), Md = P(/* @__PURE__ */ N('<div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Skills (Point Buy)</div> <!>', 1), ht[T], [[48, 4]]), Td = P(/* @__PURE__ */ N('<p class="text-xs text-slate-500 italic">No skill groups. Drag from compendium to add.</p>'), ht[T], [[59, 6]]), Cd = P(/* @__PURE__ */ N('<div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Skill Groups</div> <!>', 1), ht[T], [[57, 4]]), Fd = P(/* @__PURE__ */ N('<div class="p-3"><!></div>'), ht[T], [[46, 0]]);
function ht(t, e) {
  he(new.target), fe(e, !0, ht);
  let a = L(
    /* @__PURE__ */ J(() => [...e.actor.items].filter((u) => A(u.type, "skill")).sort((u, g) => A(u.system.isAvailable, g.system.isAvailable, !1) ? u.system.isAvailable ? -1 : 1 : u.name.localeCompare(g.name))),
    "skills"
  ), n = L(/* @__PURE__ */ J(() => [...e.actor.items].filter((u) => A(u.type, "attribute") && u.system.isSkillGroup)), "skillGroups"), r = L(/* @__PURE__ */ J(() => A(e.actor.system.skillMode, "pointbuy")), "isPointBuy");
  async function i(u) {
    var _;
    u.preventDefault();
    let g;
    try {
      g = JSON.parse(u.dataTransfer.getData("text/plain"));
    } catch {
      return;
    }
    if (A(g.type, "Item", !1)) return;
    const h = (await Ae(fromUuid(g.uuid)))();
    h && (s(r) && A(h.type, "skill") ? (await Ae(e.actor.createEmbeddedDocuments("Item", [h.toObject()])))() : !s(r) && A(h.type, "attribute") && ((_ = h.system) != null && _.isSkillGroup) && (await Ae(e.actor.createEmbeddedDocuments("Item", [h.toObject()])))());
  }
  function l(u) {
    u.preventDefault(), u.dataTransfer.dropEffect = "copy";
  }
  var o = { ...ge() }, c = Fd(), p = m(c);
  {
    var d = (u) => {
      var g = Md(), h = v(be(g), 2);
      {
        var _ = (k) => {
          var E = Sd();
          F(k, E);
        }, b = (k) => {
          var E = Ee(), x = be(E);
          C(
            () => Ke(x, 17, () => s(a), (M) => M.id, (M, S) => {
              C(
                () => Et(M, {
                  get skill() {
                    return s(S);
                  },
                  get actor() {
                    return e.actor;
                  }
                }),
                "component",
                ht,
                53,
                8,
                { componentTag: "SkillRow" }
              );
            }),
            "each",
            ht,
            52,
            6
          ), F(k, E);
        };
        C(
          () => U(h, (k) => {
            A(s(a).length, 0) ? k(_) : k(b, -1);
          }),
          "if",
          ht,
          49,
          4
        );
      }
      F(u, g);
    }, f = (u) => {
      var g = Cd(), h = v(be(g), 2);
      {
        var _ = (k) => {
          var E = Td();
          F(k, E);
        }, b = (k) => {
          var E = Ee(), x = be(E);
          C(
            () => Ke(x, 17, () => s(n), (M) => M.id, (M, S) => {
              C(
                () => At(M, {
                  get attribute() {
                    return s(S);
                  },
                  get actor() {
                    return e.actor;
                  }
                }),
                "component",
                ht,
                62,
                8,
                { componentTag: "AttributeRow" }
              );
            }),
            "each",
            ht,
            61,
            6
          ), F(k, E);
        };
        C(
          () => U(h, (k) => {
            A(s(n).length, 0) ? k(_) : k(b, -1);
          }),
          "if",
          ht,
          58,
          4
        );
      }
      F(u, g);
    };
    C(
      () => U(p, (u) => {
        s(r) ? u(d) : u(f, -1);
      }),
      "if",
      ht,
      47,
      2
    );
  }
  return kt("dragover", c, l), kt("drop", c, i), F(t, c), pe(o);
}
qa[T] = "src/components/ui/PossessionRow.svelte";
var Ad = P(/* @__PURE__ */ N('<span class="text-slate-400"> </span>'), qa[T], [[31, 4]]), Ed = P(/* @__PURE__ */ N('<span class="text-slate-500 italic"> </span>'), qa[T], [[35, 4]]), Pd = P(/* @__PURE__ */ N('<div class="flex items-center gap-3 px-2 py-1.5 border-b border-slate-800 text-xs cursor-pointer hover:bg-slate-800/50" role="button" tabindex="0"><span class="text-slate-200 font-medium"> </span> <span class="px-1.5 py-0.5 rounded bg-slate-700 text-slate-400 text-xs"> </span> <span> </span> <!> <!></div>'), qa[T], [[15, 0, [[22, 2], [24, 2], [26, 2]]]]);
function qa(t, e) {
  he(new.target), fe(e, !0, qa);
  let a = L(
    /* @__PURE__ */ J(() => () => {
      if (!e.possession.system.linkedAttributeId) return null;
      const k = [...e.actor.items].find((E) => A(E.id, e.possession.system.linkedAttributeId));
      return (k == null ? void 0 : k.name) ?? null;
    }),
    "linkedAttrName"
  );
  function n() {
    e.possession.sheet.render(!0);
  }
  var r = { ...ge() }, i = Pd(), l = m(i), o = m(l), c = v(l, 2), p = m(c), d = v(c, 2), f = m(d), u = v(d, 2);
  {
    var g = (k) => {
      var E = Ad(), x = m(E);
      G(() => B(x, `Cost: ${e.possession.system.budgetCost ?? ""}`)), F(k, E);
    };
    C(
      () => U(u, (k) => {
        e.possession.system.isMechanical && e.possession.system.budgetCost > 0 && k(g);
      }),
      "if",
      qa,
      30,
      2
    );
  }
  var h = v(u, 2);
  {
    var _ = (k) => {
      var E = Ed(), x = m(E);
      G((M) => B(x, `via ${M ?? ""}`), [() => s(a)()]), F(k, E);
    }, b = /* @__PURE__ */ J(() => s(a)());
    C(
      () => U(h, (k) => {
        s(b) && k(_);
      }),
      "if",
      qa,
      34,
      2
    );
  }
  return G(() => {
    B(o, e.possession.name), B(p, e.possession.system.category), Dt(d, 1, `px-1.5 py-0.5 rounded text-xs ${e.possession.system.isMechanical ? "bg-blue-900 text-blue-300" : "bg-slate-700 text-slate-400"}`), B(f, e.possession.system.isMechanical ? "mechanical" : "flavor");
  }), D("click", i, n), D("keydown", i, function(E) {
    A(E.key, "Enter") && n();
  }), F(t, i), pe(r);
}
Je(["click", "keydown"]);
tr[T] = "src/components/ui/GearBudget.svelte";
var Nd = P(/* @__PURE__ */ N('<div class="mx-2 my-2 p-2 border border-slate-700 rounded bg-slate-800/50"><div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Gear Budget</div> <div class="flex gap-4 text-xs"><span class="text-slate-400">Budget: <span class="text-slate-100"> </span></span> <span class="text-slate-400">Spent: <span class="text-slate-100"> </span></span> <span class="text-slate-400">Remaining: <span> </span></span></div></div>'), tr[T], [
  [
    31,
    2,
    [
      [32, 4],
      [
        33,
        4,
        [
          [34, 6, [[34, 43]]],
          [35, 6, [[35, 42]]],
          [36, 6, [[36, 46]]]
        ]
      ]
    ]
  ]
]);
function tr(t, e) {
  he(new.target), fe(e, !0, tr);
  let a = L(/* @__PURE__ */ J(() => [...e.actor.items].find((u) => A(u.type, "attribute") && A(u.name, "Gear"))), "gearAttr"), n = L(/* @__PURE__ */ ve(5), "gearBudgetPerLevel");
  ye(() => {
    try {
      _e(n, game.settings.get("besm", "gearBudgetPerLevel") ?? 5, !0);
    } catch {
    }
  });
  let r = L(
    /* @__PURE__ */ J(() => s(a) ? s(a).system.effectiveLevel * s(n) : 0),
    "budget"
  ), i = L(
    /* @__PURE__ */ J(() => s(a) ? [...e.actor.items].filter((u) => A(u.type, "possession") && u.system.isMechanical && A(u.system.linkedAttributeId, s(a).id)).reduce((u, g) => u + g.system.budgetCost, 0) : 0),
    "spent"
  ), l = L(/* @__PURE__ */ J(() => s(r) - s(i)), "remaining"), o = L(/* @__PURE__ */ J(() => s(l) < 0), "overBudget");
  var c = { ...ge() }, p = Ee(), d = be(p);
  {
    var f = (u) => {
      var g = Nd(), h = v(m(g), 2), _ = m(h), b = v(m(_)), k = m(b), E = v(_, 2), x = v(m(E)), M = m(x), S = v(E, 2), w = v(m(S)), R = m(w);
      G(() => {
        B(k, s(r)), B(M, s(i)), Dt(w, 1, `font-bold ${s(o) ? "text-red-400" : "text-emerald-400"}`), B(R, s(l));
      }), F(u, g);
    };
    C(
      () => U(d, (u) => {
        s(a) && u(f);
      }),
      "if",
      tr,
      30,
      0
    );
  }
  return F(t, p), pe(c);
}
_a[T] = "src/components/tabs/PossessionsTab.svelte";
var Ld = P(/* @__PURE__ */ N('<p class="text-xs text-slate-500 italic">No possessions. Drag from compendium to add.</p>'), _a[T], [[39, 4]]), Dd = P(/* @__PURE__ */ N('<div class="p-3"><!> <div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Possessions</div> <!></div>'), _a[T], [[34, 0, [[37, 2]]]]);
function _a(t, e) {
  he(new.target), fe(e, !0, _a);
  let a = L(/* @__PURE__ */ J(() => [...e.actor.items].filter((f) => A(f.type, "possession"))), "possessions");
  async function n(f) {
    f.preventDefault();
    let u;
    try {
      u = JSON.parse(f.dataTransfer.getData("text/plain"));
    } catch {
      return;
    }
    if (A(u.type, "Item", !1)) return;
    const g = (await Ae(fromUuid(u.uuid)))();
    g && A(g.type, "possession") && (await Ae(e.actor.createEmbeddedDocuments("Item", [g.toObject()])))();
  }
  function r(f) {
    f.preventDefault(), f.dataTransfer.dropEffect = "copy";
  }
  var i = { ...ge() }, l = Dd(), o = m(l);
  C(
    () => tr(o, {
      get actor() {
        return e.actor;
      }
    }),
    "component",
    _a,
    35,
    2,
    { componentTag: "GearBudget" }
  );
  var c = v(o, 4);
  {
    var p = (f) => {
      var u = Ld();
      F(f, u);
    }, d = (f) => {
      var u = Ee(), g = be(u);
      C(
        () => Ke(g, 17, () => s(a), (h) => h.id, (h, _) => {
          C(
            () => qa(h, {
              get possession() {
                return s(_);
              },
              get actor() {
                return e.actor;
              }
            }),
            "component",
            _a,
            42,
            6,
            { componentTag: "PossessionRow" }
          );
        }),
        "each",
        _a,
        41,
        4
      ), F(f, u);
    };
    C(
      () => U(c, (f) => {
        A(s(a).length, 0) ? f(p) : f(d, -1);
      }),
      "if",
      _a,
      38,
      2
    );
  }
  return kt("dragover", l, r), kt("drop", l, n), F(t, l), pe(i);
}
ar[T] = "src/components/ui/ResourceBar.svelte";
var Id = P(/* @__PURE__ */ N('<div class="flex items-center gap-2"><span class="text-xs text-slate-400 whitespace-nowrap"> </span> <input type="number" class="w-12 text-center text-xs bg-slate-900 border border-slate-700 rounded text-slate-100 p-0.5" min="0"/> <span class="text-xs text-slate-500"> </span></div>'), ar[T], [[15, 0, [[16, 2], [17, 2], [25, 2]]]]);
function ar(t, e) {
  he(new.target), fe(e, !0, ar);
  let a = L(/* @__PURE__ */ ve(Oa(e.current)), "editValue");
  function n() {
    const f = Math.max(0, Math.min(e.max, Math.floor(s(a))));
    A(f, e.current, !1) && e.onUpdate(f);
  }
  ye(() => {
    _e(a, e.current, !0);
  });
  var r = { ...ge() }, i = Id(), l = m(i), o = m(l), c = v(l, 2), p = v(c, 2), d = m(p);
  return G(() => {
    B(o, e.label), Er(c, "max", e.max), B(d, `/ ${e.max ?? ""}`);
  }), kt("blur", c, n), Si(
    c,
    function() {
      return s(a);
    },
    function(u) {
      _e(a, u);
    }
  ), F(t, i), pe(r);
}
function Us(t) {
  const a = (t.terms ?? []).find((l) => l.results);
  if (!a) return { dice: [], discarded: [], diceTotal: t.total };
  const n = a.results.filter((l) => l.active !== !1).map((l) => l.result), r = a.results.filter((l) => l.active === !1).map((l) => l.result), i = n.reduce((l, o) => l + o, 0);
  return { dice: n, discarded: r, diceTotal: i };
}
async function Rd(t, e, a, n = null) {
  const r = t.system.derived.socv ?? 0, i = n ? wn(n) : "2d6", l = await new Roll(i).evaluate(), o = Us(l), c = yn(o.diceTotal, r, e), f = `${kn("social", o, [
    { label: "SoCV", value: r },
    { label: a, value: e }
  ], c)}
<div class="besm-roll-actions" style="margin-top:8px;">
  <button data-action="social-defend" data-message-id="" style="padding:2px 8px; font-size:11px; cursor:pointer;">Social Defend</button>
</div>`, u = await ChatMessage.create({
    content: f,
    speaker: ChatMessage.getSpeaker({ actor: t }),
    rolls: [l],
    flags: {
      besm: {
        type: "socialAttack",
        attackerId: t.id,
        attackTotal: c,
        skillName: a
      }
    }
  }), g = document.createElement("div");
  return g.innerHTML = u.content, g.querySelectorAll("[data-message-id]").forEach((h) => {
    h.setAttribute("data-message-id", u.id);
  }), await u.update({ content: g.innerHTML }), { roll: l, total: c };
}
async function Bd(t, e, a = null) {
  const n = e.flags.besm, r = t.system.derived.socv ?? 0, i = a ? wn(a) : "2d6", l = await new Roll(i).evaluate(), o = Us(l), c = yn(o.diceTotal, r), p = nd(n.attackTotal, c);
  let d;
  if (p.tie)
    d = '<div style="font-size:13px; font-weight:bold; color:#fbbf24;">Tie — Reroll!</div>';
  else if (p.attackerWins) {
    const h = rd(p.margin);
    d = `<div style="font-size:13px; font-weight:bold; color:#f87171;">Social Hit! (margin ${p.margin})</div>
<div style="font-size:12px; color:#f87171;">Society Point Damage: ${h}</div>
<button data-action="apply-social-damage" data-defender-id="${t.id}" data-damage="${h}" style="padding:2px 8px; font-size:11px; cursor:pointer; margin-top:4px;">Apply SP Damage</button>`;
  } else
    d = '<div style="font-size:13px; font-weight:bold; color:#4ade80;">Social Defence succeeds!</div>';
  const u = kn("social", o, [{ label: "SoCV", value: r }], c), g = `<div class="besm-roll-header">Social Combat</div>
<div style="font-size:12px; margin:4px 0;">Attack: ${n.attackTotal} vs Defence: ${c}</div>
${d}
${u}`;
  return await ChatMessage.create({
    content: g,
    speaker: ChatMessage.getSpeaker({ actor: t }),
    rolls: [l]
  }), { defenceTotal: c, result: p };
}
async function Hd(t, e) {
  const a = t.system.derived.currentSocietyPoints, n = Math.max(0, a - e);
  await t.update({ "system.derived.currentSocietyPoints": n }), ui.notifications.info(`${t.name} loses ${e} Society Points. SP: ${a} → ${n}`);
}
we[T] = "src/components/tabs/CombatTab.svelte";
var Od = P(/* @__PURE__ */ N('<p class="text-xs text-slate-500 italic">No weapon attributes. Mark an attribute as a Weapon on its sheet to add it here.</p>'), we[T], [[61, 6]]), jd = P(/* @__PURE__ */ N('<div class="flex items-center justify-between px-2 py-1.5 border border-slate-700 rounded text-xs hover:bg-slate-800/50"><div class="flex flex-col"><span class="text-slate-200 font-medium"> </span> <span class="text-slate-500"> <!> <!> <!> <!></span></div> <!></div>'), we[T], [[65, 10, [[66, 12, [[67, 14], [68, 14]]]]]]), zd = P(/* @__PURE__ */ N('<div class="flex flex-col gap-1"></div>'), we[T], [[63, 6]]), Gd = P(/* @__PURE__ */ N('<div class="border-t border-slate-700 pt-3"><div class="flex items-center justify-between"><div class="text-xs text-slate-500 uppercase">Sanity</div> <!></div></div>'), we[T], [[95, 4, [[96, 6, [[97, 8]]]]]]), Vd = P(/* @__PURE__ */ N('<div class="border-t border-slate-700 pt-3"><div class="flex items-center justify-between"><div class="text-xs text-slate-500 uppercase">Social Combat</div> <!></div></div>'), we[T], [[105, 4, [[106, 6, [[107, 8]]]]]]), Ud = P(/* @__PURE__ */ N('<div class="p-3 flex flex-col gap-4"><div class="flex flex-col gap-2"><!> <!></div> <div><div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Attacks</div> <!></div> <!> <!></div>'), we[T], [[46, 0, [[48, 2], [58, 2, [[59, 4]]]]]]);
function we(t, e) {
  he(new.target), fe(e, !0, we);
  let a = L(/* @__PURE__ */ J(() => e.actor.system.derived), "d"), n = L(/* @__PURE__ */ J(() => [...e.actor.items].filter((z) => A(z.type, "attribute") && z.system.isWeapon)), "weapons"), r = L(/* @__PURE__ */ ve(!1), "sanityEnabled"), i = L(/* @__PURE__ */ ve(!1), "socialEnabled");
  ye(() => {
    try {
      _e(r, game.settings.get("besm", "sanityEnabled"), !0), _e(i, game.settings.get("besm", "socialCombatEnabled"), !0);
    } catch {
    }
  });
  function l(z) {
    e.actor.update({ "system.derived.currentHp": z });
  }
  function o(z) {
    e.actor.update({ "system.derived.currentEp": z });
  }
  function c(z) {
    Vs(e.actor, z);
  }
  function p() {
    dd(e.actor);
  }
  function d() {
    Rd(e.actor, 0, "Social", null);
  }
  var f = { ...ge() }, u = Ud(), g = m(u), h = m(g);
  {
    var _ = (z) => {
      C(
        () => ar(z, {
          label: "Health Points (HP)",
          get current() {
            return s(a).currentHp;
          },
          get max() {
            return s(a).hpMax;
          },
          onUpdate: l
        }),
        "component",
        we,
        50,
        6,
        { componentTag: "ResourceBar" }
      );
    };
    C(
      () => U(h, (z) => {
        s(a).hpApplicable && z(_);
      }),
      "if",
      we,
      49,
      4
    );
  }
  var b = v(h, 2);
  {
    var k = (z) => {
      C(
        () => ar(z, {
          label: "Energy Points (EP)",
          get current() {
            return s(a).currentEp;
          },
          get max() {
            return s(a).epMax;
          },
          onUpdate: o
        }),
        "component",
        we,
        53,
        6,
        { componentTag: "ResourceBar" }
      );
    };
    C(
      () => U(b, (z) => {
        s(a).epApplicable && z(k);
      }),
      "if",
      we,
      52,
      4
    );
  }
  var E = v(g, 2), x = v(m(E), 2);
  {
    var M = (z) => {
      var j = Od();
      F(z, j);
    }, S = (z) => {
      var j = zd();
      C(
        () => Ke(j, 21, () => s(n), St, (H, I) => {
          var Y = jd(), q = m(Y), W = m(q), oe = m(W, !0);
          var le = v(W, 2), ie = m(le), xe = v(ie);
          {
            var it = (Z) => {
              var me = Ea();
              G(() => B(me, `· Melee (DM ${s(a).meleeDamageMultiplier ?? ""})`)), F(Z, me);
            }, Le = (Z) => {
              var me = Ea();
              G(() => B(me, `· Ranged (DM ${s(a).damageMultiplier ?? ""})`)), F(Z, me);
            };
            C(
              () => U(xe, (Z) => {
                s(I).system.weaponOptions.isMuscleAttack ? Z(it) : Z(Le, -1);
              }),
              "if",
              we,
              70,
              16
            );
          }
          var De = v(xe, 2);
          {
            var et = (Z) => {
              var me = Ea();
              G(() => B(me, `· ${s(I).system.weaponOptions.range ?? ""}`)), F(Z, me);
            };
            C(
              () => U(De, (Z) => {
                s(I).system.weaponOptions.range && Z(et);
              }),
              "if",
              we,
              75,
              16
            );
          }
          var Ie = v(De, 2);
          {
            var ut = (Z) => {
              var me = Ea();
              G(() => B(me, `· Accurate +${s(I).system.weaponOptions.accurate ?? ""}`)), F(Z, me);
            };
            C(
              () => U(Ie, (Z) => {
                s(I).system.weaponOptions.accurate > 0 && Z(ut);
              }),
              "if",
              we,
              78,
              16
            );
          }
          var ee = v(Ie, 2);
          {
            var K = (Z) => {
              var me = Ea("· Spreading");
              F(Z, me);
            };
            C(
              () => U(ee, (Z) => {
                s(I).system.weaponOptions.spreading && Z(K);
              }),
              "if",
              we,
              81,
              16
            );
          }
          var ne = v(q, 2);
          C(
            () => oa(ne, {
              onclick: () => c(s(I)),
              get title() {
                return `Attack with ${s(I).name ?? ""}`;
              }
            }),
            "component",
            we,
            86,
            12,
            { componentTag: "RollButton" }
          ), G(() => {
            B(oe, s(I).name), B(ie, `Lv ${s(I).system.effectiveLevel ?? ""} `);
          }), F(H, Y);
        }),
        "each",
        we,
        64,
        8
      ), F(z, j);
    };
    C(
      () => U(x, (z) => {
        A(s(n).length, 0) ? z(M) : z(S, -1);
      }),
      "if",
      we,
      60,
      4
    );
  }
  var w = v(E, 2);
  {
    var R = (z) => {
      var j = Gd(), H = m(j), I = v(m(H), 2);
      C(() => oa(I, { onclick: p, title: "Sanity Roll" }), "component", we, 98, 8, { componentTag: "RollButton" }), F(z, j);
    };
    C(
      () => U(w, (z) => {
        s(r) && s(a).sanityPoints > 0 && z(R);
      }),
      "if",
      we,
      94,
      2
    );
  }
  var O = v(w, 2);
  {
    var V = (z) => {
      var j = Vd(), H = m(j), I = v(m(H), 2);
      C(() => oa(I, { onclick: d, title: "Social Attack Roll" }), "component", we, 108, 8, { componentTag: "RollButton" }), F(z, j);
    };
    C(
      () => U(O, (z) => {
        s(i) && s(a).socv > 0 && z(V);
      }),
      "if",
      we,
      104,
      2
    );
  }
  return F(t, u), pe(f);
}
Sn[T] = "src/components/tabs/BiographyTab.svelte";
var qd = P(
  /* @__PURE__ */ N(`<div class="p-3 flex flex-col gap-3"><div><div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Biography</div> <div class="text-xs text-slate-400 italic">Biography editing requires the full Foundry editor (coming in a future phase).
      Current content is displayed below.</div> <div class="mt-2 p-2 bg-slate-900 rounded border border-slate-700 text-xs text-slate-300 min-h-16"></div></div> <div><div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Notes</div> <textarea class="w-full h-24 bg-slate-900 border border-slate-700 rounded text-xs text-slate-200 p-2 resize-y"></textarea></div></div>`),
  Sn[T],
  [
    [
      10,
      0,
      [
        [11, 2, [[12, 4], [13, 4], [17, 4]]],
        [22, 2, [[23, 4], [24, 4]]]
      ]
    ]
  ]
);
function Sn(t, e) {
  he(new.target), fe(e, !0, Sn);
  let a = L(/* @__PURE__ */ ve(Oa(e.actor.system.notes ?? "")), "notes");
  function n() {
    e.actor.update({ "system.notes": s(a) });
  }
  var r = { ...ge() }, i = qd(), l = m(i), o = v(m(l), 4);
  oc(o, () => e.actor.system.biography || "<em class='text-slate-500'>No biography.</em>", !0);
  var c = v(l, 2), p = v(m(c), 2);
  return kt("blur", p, n), Si(
    p,
    function() {
      return s(a);
    },
    function(f) {
      _e(a, f);
    }
  ), F(t, i), pe(r);
}
async function qs(t, e, a = /* @__PURE__ */ new Set()) {
  if (a.has(t.id)) {
    console.warn(`BESM | Circular template reference detected: ${t.name}`);
    return;
  }
  a.add(t.id);
  const n = [];
  for (const l of t.system.entries)
    if (l.entryType === "item")
      n.push({
        name: l.name,
        type: l.itemType,
        system: {
          ...l.systemData,
          sourceTemplateId: t.id,
          sourceTemplateName: t.name
        }
      });
    else if (l.entryType === "template") {
      const o = await fromUuid(l.templateId);
      if (!o) {
        console.warn(`BESM | Nested template not found: ${l.templateId}`);
        continue;
      }
      await qs(o, e, a);
    }
  n.length > 0 && await e.createEmbeddedDocuments("Item", n);
  const r = t.system.statModifiers;
  if (r && (r.body || r.mind || r.soul)) {
    const l = {};
    r.body && e.system.stats.body.mode !== "missing" && (l["system.stats.body.value"] = e.system.stats.body.value + r.body), r.mind && e.system.stats.mind.mode !== "missing" && (l["system.stats.mind.value"] = e.system.stats.mind.value + r.mind), r.soul && e.system.stats.soul.mode !== "missing" && (l["system.stats.soul.value"] = e.system.stats.soul.value + r.soul), Object.keys(l).length > 0 && await e.update(l);
  }
  const i = [...e.system.appliedTemplates ?? []];
  i.push({
    id: t.id,
    name: t.name,
    type: t.system.templateType,
    pointTotal: t.system.pointTotal,
    appliedAt: Date.now()
  }), await e.update({ "system.appliedTemplates": i }), a.delete(t.id);
}
pt[T] = "src/components/sheets/CharacterSheet.svelte";
var Wd = P(/* @__PURE__ */ N('<div class="flex h-full bg-slate-900 text-slate-100"><!> <div class="flex-1 flex flex-col overflow-hidden"><!> <!> <!> <div class="flex-1 overflow-y-auto"><!></div></div></div>'), pt[T], [[78, 0, [[81, 2, [[86, 4]]]]]]);
function pt(t, e) {
  he(new.target), fe(e, !0, pt);
  let a = L(/* @__PURE__ */ ve(0), "version"), n = L(
    /* @__PURE__ */ J(() => (s(a), e.document)),
    "actor"
  ), r = L(/* @__PURE__ */ ve("attributes"), "activeTab");
  const i = [
    { id: "attributes", label: "Attributes" },
    { id: "skills", label: "Skills" },
    { id: "possessions", label: "Possessions" },
    { id: "combat", label: "Combat" },
    { id: "biography", label: "Biography" }
  ];
  ye(() => {
    const f = Hooks.on("updateActor", (u) => {
      A(u.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("updateActor", f);
  }), ye(() => {
    const f = Hooks.on("createItem", (u) => {
      var g;
      A((g = u.parent) == null ? void 0 : g.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("createItem", f);
  }), ye(() => {
    const f = Hooks.on("updateItem", (u) => {
      var g;
      A((g = u.parent) == null ? void 0 : g.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("updateItem", f);
  }), ye(() => {
    const f = Hooks.on("deleteItem", (u) => {
      var g;
      A((g = u.parent) == null ? void 0 : g.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("deleteItem", f);
  });
  async function l(f) {
    f.preventDefault();
    let u;
    try {
      u = JSON.parse(f.dataTransfer.getData("text/plain"));
    } catch {
      return;
    }
    if (A(u.type, "Item", !1)) return;
    const g = (await Ae(fromUuid(u.uuid)))();
    !g || A(g.type, "besm4eTemplate", !1) || ((await Ae(qs(g, s(n))))(), ui.notifications.info(`Applied template: ${g.name}`));
  }
  function o(f) {
    f.preventDefault(), f.dataTransfer.dropEffect = "copy";
  }
  var c = { ...ge() }, p = Ee(), d = be(p);
  return C(
    () => Hr(d, () => s(a), (f) => {
      var u = Wd(), g = m(u);
      C(
        () => je(g, {
          get actor() {
            return s(n);
          },
          showSP: !0,
          showEP: !0,
          showCV: !0
        }),
        "component",
        pt,
        79,
        2,
        { componentTag: "ActorSidebar" }
      );
      var h = v(g, 2), _ = m(h);
      C(
        () => Ma(_, {
          get tabs() {
            return i;
          },
          get activeTab() {
            return s(r);
          },
          onSelect: (V) => _e(r, V, !0)
        }),
        "component",
        pt,
        82,
        4,
        { componentTag: "TabBar" }
      );
      var b = v(_, 2);
      C(
        () => vn(b, {
          get actor() {
            return s(n);
          }
        }),
        "component",
        pt,
        83,
        4,
        { componentTag: "TemplateBadges" }
      );
      var k = v(b, 2);
      C(
        () => Ua(k, {
          get warnings() {
            return s(n).system.benchmarkWarnings;
          }
        }),
        "component",
        pt,
        84,
        4,
        { componentTag: "BenchmarkPanel" }
      );
      var E = v(k, 2), x = m(E);
      {
        var M = (V) => {
          C(
            () => qe(V, {
              get actor() {
                return s(n);
              }
            }),
            "component",
            pt,
            88,
            8,
            { componentTag: "AttributesTab" }
          );
        }, S = (V) => {
          C(
            () => ht(V, {
              get actor() {
                return s(n);
              }
            }),
            "component",
            pt,
            90,
            8,
            { componentTag: "SkillsTab" }
          );
        }, w = (V) => {
          C(
            () => _a(V, {
              get actor() {
                return s(n);
              }
            }),
            "component",
            pt,
            92,
            8,
            { componentTag: "PossessionsTab" }
          );
        }, R = (V) => {
          C(
            () => we(V, {
              get actor() {
                return s(n);
              }
            }),
            "component",
            pt,
            94,
            8,
            { componentTag: "CombatTab" }
          );
        }, O = (V) => {
          C(
            () => Sn(V, {
              get actor() {
                return s(n);
              }
            }),
            "component",
            pt,
            96,
            8,
            { componentTag: "BiographyTab" }
          );
        };
        C(
          () => U(x, (V) => {
            A(s(r), "attributes") ? V(M) : A(s(r), "skills") ? V(S, 1) : A(s(r), "possessions") ? V(w, 2) : A(s(r), "combat") ? V(R, 3) : A(s(r), "biography") && V(O, 4);
          }),
          "if",
          pt,
          87,
          6
        );
      }
      kt("dragover", u, o), kt("drop", u, l), F(f, u);
    }),
    "key",
    pt,
    76,
    0
  ), F(t, p), pe(c);
}
var La;
class Ws extends foundry.applications.api.DocumentSheetV2 {
  constructor() {
    super(...arguments);
    re(this, La, null);
  }
  async _renderHTML(a, n) {
    const r = document.createElement("div");
    return r.classList.add("svelte-mount"), r;
  }
  _replaceHTML(a, n, r) {
    super._replaceHTML(a, n, r), y(this, La) || ae(this, La, vr(pt, {
      target: n,
      props: { document: this.document, sheet: this }
    }));
  }
  async close(a) {
    return y(this, La) && (fr(y(this, La)), ae(this, La, null)), super.close(a);
  }
}
La = new WeakMap(), ct(Ws, "DEFAULT_OPTIONS", {
  classes: ["besm", "actor-sheet"],
  position: { width: 800, height: 650 },
  window: { resizable: !0 }
});
Te[T] = "src/components/items/AttributeSheet.svelte";
var Yd = P(/* @__PURE__ */ N('<div><label class="text-xs text-slate-500 uppercase">Skill Group Category</label> <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"><option>Background (1 CP/Level)</option><option>Field (2 CP/Level)</option><option>Action (3 CP/Level)</option></select></div>'), Te[T], [
  [155, 4, [[156, 6], [157, 6, [[161, 8], [162, 8], [163, 8]]]]]
]), Kd = P(/* @__PURE__ */ N('<div class="grid grid-cols-2 gap-2"><div><label class="text-xs text-slate-500 uppercase">Tier</label> <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"><option>Lesser (1 CP/Level)</option><option>Greater (2 CP/Level)</option><option>Serious (3 CP/Level)</option></select></div></div> <div><label class="text-xs text-slate-500 uppercase">Unique Description</label> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-16 resize-y"></textarea></div>', 1), Te[T], [
  [
    170,
    4,
    [
      [
        171,
        6,
        [[172, 8], [173, 8, [[177, 10], [178, 10], [179, 10]]]]
      ]
    ]
  ],
  [183, 4, [[184, 6], [185, 6]]]
]), Jd = P(/* @__PURE__ */ N('<div class="border border-slate-700 rounded p-2"><div class="text-xs text-slate-500 uppercase mb-2">Weapon Options</div> <div class="grid grid-cols-2 gap-2"><div><label class="text-xs text-slate-500">Damage</label> <input class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"/></div> <div><label class="text-xs text-slate-500">Range</label> <input class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"/></div> <div><label class="text-xs text-slate-500">Accurate</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"/></div> <div class="flex items-center gap-2"><label class="flex items-center gap-1 text-xs text-slate-400"><input type="checkbox"/> Spreading</label> <label class="flex items-center gap-1 text-xs text-slate-400"><input type="checkbox"/> Muscle</label></div></div></div>'), Te[T], [
  [
    194,
    4,
    [
      [195, 6],
      [
        196,
        6,
        [
          [197, 8, [[198, 10], [199, 10]]],
          [204, 8, [[205, 10], [206, 10]]],
          [211, 8, [[212, 10], [213, 10]]],
          [218, 8, [[219, 10, [[220, 12]]], [224, 10, [[225, 12]]]]]
        ]
      ]
    ]
  ]
]), Zd = P(/* @__PURE__ */ N('<p class="text-xs text-slate-500 italic">None. Drop enhancements on the attribute row to add.</p>'), Te[T], [[238, 6]]), Xd = P(/* @__PURE__ */ N('<div class="flex items-center justify-between px-2 py-1 border-b border-slate-800 text-xs"><span class="text-sky-300"> </span> <span class="text-slate-400"> </span> <button type="button" class="text-slate-500 hover:text-red-400 bg-transparent border-0 cursor-pointer text-xs">Remove</button></div>'), Te[T], [[241, 8, [[242, 10], [243, 10], [244, 10]]]]), Qd = P(/* @__PURE__ */ N('<p class="text-xs text-slate-500 italic">None. Drop limiters on the attribute row to add.</p>'), Te[T], [[255, 6]]), $d = P(/* @__PURE__ */ N('<div class="flex items-center justify-between px-2 py-1 border-b border-slate-800 text-xs"><span class="text-violet-300"> </span> <span class="text-slate-400"> </span> <button type="button" class="text-slate-500 hover:text-red-400 bg-transparent border-0 cursor-pointer text-xs">Remove</button></div>'), Te[T], [[258, 8, [[259, 10], [260, 10], [261, 10]]]]), eu = P(/* @__PURE__ */ N('<div class="flex items-center gap-2 text-xs"><span class="text-slate-200"> </span> <span> </span> <button type="button" class="px-2 py-1 bg-blue-700 text-blue-100 rounded border-0 cursor-pointer text-xs hover:bg-blue-600">Open Sheet</button> <button type="button" class="px-2 py-1 bg-slate-700 text-slate-300 rounded border-0 cursor-pointer text-xs hover:bg-slate-600">Unlink</button></div>'), Te[T], [[273, 8, [[274, 10], [275, 10], [278, 10], [280, 10]]]]), tu = P(/* @__PURE__ */ N('<div class="flex flex-col gap-2"><button type="button" class="px-2 py-1 bg-emerald-700 text-emerald-100 rounded border-0 cursor-pointer text-xs hover:bg-emerald-600 self-start">Create Linked Actor</button> <div class="flex items-center gap-2"><input class="flex-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-100 p-1" placeholder="Paste actor ID to link..."/></div></div>'), Te[T], [[284, 8, [[285, 10], [287, 10, [[288, 12]]]]]]), au = P(/* @__PURE__ */ N('<div class="border border-slate-700 rounded p-2"><div class="text-xs text-slate-500 uppercase mb-2">Linked Actor</div> <!></div>'), Te[T], [[270, 4, [[271, 6]]]]), nu = P(/* @__PURE__ */ N('<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full"><input class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"/> <div class="grid grid-cols-2 gap-2"><div><label class="text-xs text-slate-500 uppercase">Base Cost/Level</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"/></div> <div><label class="text-xs text-slate-500 uppercase">Purchased Level</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"/></div> <div><label class="text-xs text-slate-500 uppercase">Effective Level</label> <span class="block text-sm text-slate-300 p-1"> </span></div> <div><label class="text-xs text-slate-500 uppercase">Total Cost</label> <span class="block text-sm text-slate-300 p-1"> </span></div></div> <div><label class="text-xs text-slate-500 uppercase">Options (comma-separated)</label> <input class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1" placeholder="e.g. Fire, Area Effect"/></div> <div><label class="text-xs text-slate-500 uppercase">Description</label> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-20 resize-y"></textarea></div> <div class="flex flex-wrap gap-3 text-xs"><label class="flex items-center gap-1 text-slate-400"><input type="checkbox"/> Weapon</label> <label class="flex items-center gap-1 text-slate-400"><input type="checkbox"/> Skill Group</label> <label class="flex items-center gap-1 text-slate-400"><input type="checkbox"/> Skills Attribute</label> <label class="flex items-center gap-1 text-slate-400"><input type="checkbox"/> Benchmark Exception</label> <label class="flex items-center gap-1 text-slate-400"><input type="checkbox"/> Unique</label> <label class="flex items-center gap-1 text-slate-400"><input type="checkbox"/> Transformation Heal</label></div> <!> <!> <!> <div><div class="text-xs text-slate-500 uppercase mb-1"> </div> <!></div> <div><div class="text-xs text-slate-500 uppercase mb-1"> </div> <!></div> <!> <div><label class="text-xs text-slate-500 uppercase">Notes</label> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-16 resize-y"></textarea></div></div>'), Te[T], [
  [
    61,
    0,
    [
      [63, 2],
      [
        70,
        2,
        [
          [71, 4, [[72, 6], [73, 6]]],
          [78, 4, [[79, 6], [80, 6]]],
          [85, 4, [[86, 6], [87, 6]]],
          [89, 4, [[90, 6], [91, 6]]]
        ]
      ],
      [96, 2, [[97, 4], [98, 4]]],
      [111, 2, [[112, 4], [113, 4]]],
      [
        120,
        2,
        [
          [121, 4, [[122, 6]]],
          [126, 4, [[127, 6]]],
          [131, 4, [[132, 6]]],
          [136, 4, [[137, 6]]],
          [141, 4, [[142, 6]]],
          [146, 4, [[147, 6]]]
        ]
      ],
      [235, 2, [[236, 4]]],
      [252, 2, [[253, 4]]],
      [301, 2, [[302, 4], [303, 4]]]
    ]
  ]
]);
function Te(t, e) {
  he(new.target), fe(e, !0, Te);
  let a = L(/* @__PURE__ */ ve(0), "version"), n = L(
    /* @__PURE__ */ J(() => (s(a), e.document)),
    "item"
  );
  ye(() => {
    const X = Hooks.on("updateItem", (Q) => {
      A(Q.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("updateItem", X);
  });
  function r(X, Q) {
    e.document.update({ [X]: Q });
  }
  function i(X) {
    const Q = s(n).system.enhancements.filter((Fe, Be) => A(Be, X, !1));
    e.document.update({ "system.enhancements": Q });
  }
  function l(X) {
    const Q = s(n).system.limiters.filter((Fe, Be) => A(Be, X, !1));
    e.document.update({ "system.limiters": Q });
  }
  let o = L(/* @__PURE__ */ J(() => /companion|minion|alternate/i.test(s(n).name)), "isLinkable"), c = L(
    /* @__PURE__ */ J(() => s(n).system.linkedActorId ? game.actors.get(s(n).system.linkedActorId) : null),
    "linkedActor"
  ), p = L(/* @__PURE__ */ J(() => s(n).system.effectiveLevel * 10), "cpBudget");
  async function d() {
    const X = s(n).parent;
    if (!X) return;
    const Q = (await Ae(Actor.create({
      name: `${s(n).name} of ${X.name}`,
      type: "character",
      folder: X.folder || void 0
    })))();
    Q && (await Ae(e.document.update({ "system.linkedActorId": Q.id })))();
  }
  async function f() {
    (await Ae(e.document.update({ "system.linkedActorId": "" })))();
  }
  function u() {
    s(c) && s(c).sheet.render(!0);
  }
  var g = { ...ge() }, h = nu(), _ = m(h), b = v(_, 2), k = m(b), E = v(m(k), 2), x = v(k, 2), M = v(m(x), 2), S = v(x, 2), w = v(m(S), 2), R = m(w), O = v(S, 2), V = v(m(O), 2), z = m(V), j = v(b, 2), H = v(m(j), 2), I = v(j, 2), Y = v(m(I), 2), q = v(I, 2), W = m(q), oe = m(W), le = v(W, 2), ie = m(le), xe = v(le, 2), it = m(xe), Le = v(xe, 2), De = m(Le), et = v(Le, 2), Ie = m(et), ut = v(et, 2), ee = m(ut), K = v(q, 2);
  {
    var ne = (X) => {
      var Q = Yd(), Fe = v(m(Q), 2), Be = m(Fe);
      Be.value = Be.__value = "background";
      var Se = v(Be);
      Se.value = Se.__value = "field";
      var He = v(Se);
      He.value = He.__value = "action";
      var Me;
      ua(Fe), G(() => {
        Me !== (Me = s(n).system.skillGroupCategory) && (Fe.value = (Fe.__value = s(n).system.skillGroupCategory) ?? "", ea(Fe, s(n).system.skillGroupCategory));
      }), D("change", Fe, function(ft) {
        return r("system.skillGroupCategory", ft.target.value);
      }), F(X, Q);
    };
    C(
      () => U(K, (X) => {
        s(n).system.isSkillGroup && X(ne);
      }),
      "if",
      Te,
      154,
      2
    );
  }
  var Z = v(K, 2);
  {
    var me = (X) => {
      var Q = Kd(), Fe = be(Q), Be = m(Fe), Se = v(m(Be), 2), He = m(Se);
      He.value = He.__value = "lesser";
      var Me = v(He);
      Me.value = Me.__value = "greater";
      var Oe = v(Me);
      Oe.value = Oe.__value = "serious";
      var ft;
      ua(Se);
      var Qe = v(Fe, 2), It = v(m(Qe), 2);
      G(() => {
        ft !== (ft = s(n).system.tier) && (Se.value = (Se.__value = s(n).system.tier) ?? "", ea(Se, s(n).system.tier)), se(It, s(n).system.uniqueDescription ?? "");
      }), D("change", Se, function(fa) {
        return r("system.tier", fa.target.value);
      }), D("change", It, function(fa) {
        return r("system.uniqueDescription", fa.target.value);
      }), F(X, Q);
    };
    C(
      () => U(Z, (X) => {
        s(n).system.isUnique && X(me);
      }),
      "if",
      Te,
      169,
      2
    );
  }
  var st = v(Z, 2);
  {
    var vt = (X) => {
      var Q = Jd(), Fe = v(m(Q), 2), Be = m(Fe), Se = v(m(Be), 2), He = v(Be, 2), Me = v(m(He), 2), Oe = v(He, 2), ft = v(m(Oe), 2), Qe = v(Oe, 2), It = m(Qe), Tt = m(It), fa = v(It, 2), Fi = m(fa);
      G(() => {
        se(Se, s(n).system.weaponOptions.damage), se(Me, s(n).system.weaponOptions.range), se(ft, s(n).system.weaponOptions.accurate), Gt(Tt, s(n).system.weaponOptions.spreading), Gt(Fi, s(n).system.weaponOptions.isMuscleAttack);
      }), D("change", Se, function(pa) {
        return r("system.weaponOptions.damage", pa.target.value);
      }), D("change", Me, function(pa) {
        return r("system.weaponOptions.range", pa.target.value);
      }), D("change", ft, function(pa) {
        return r("system.weaponOptions.accurate", Number(pa.target.value));
      }), D("change", Tt, function(pa) {
        return r("system.weaponOptions.spreading", pa.target.checked);
      }), D("change", Fi, function(pa) {
        return r("system.weaponOptions.isMuscleAttack", pa.target.checked);
      }), F(X, Q);
    };
    C(
      () => U(st, (X) => {
        s(n).system.isWeapon && X(vt);
      }),
      "if",
      Te,
      193,
      2
    );
  }
  var de = v(st, 2), te = m(de), Ze = m(te), Ve = v(te, 2);
  {
    var Mt = (X) => {
      var Q = Zd();
      F(X, Q);
    }, qn = (X) => {
      var Q = Ee(), Fe = be(Q);
      C(
        () => Ke(Fe, 17, () => s(n).system.enhancements, St, (Be, Se, He) => {
          var Me = Xd(), Oe = m(Me), ft = m(Oe, !0);
          var Qe = v(Oe, 2), It = m(Qe);
          var Tt = v(Qe, 2);
          G(() => {
            B(ft, s(Se).name), B(It, `-${s(Se).levels ?? ""} levels`);
          }), D("click", Tt, function() {
            return i(He);
          }), F(Be, Me);
        }),
        "each",
        Te,
        240,
        6
      ), F(X, Q);
    };
    C(
      () => U(Ve, (X) => {
        A(s(n).system.enhancements.length, 0) ? X(Mt) : X(qn, -1);
      }),
      "if",
      Te,
      237,
      4
    );
  }
  var Ca = v(de, 2), Fa = m(Ca), lt = m(Fa), Xe = v(Fa, 2);
  {
    var Ue = (X) => {
      var Q = Qd();
      F(X, Q);
    }, Kt = (X) => {
      var Q = Ee(), Fe = be(Q);
      C(
        () => Ke(Fe, 17, () => s(n).system.limiters, St, (Be, Se, He) => {
          var Me = $d(), Oe = m(Me), ft = m(Oe, !0);
          var Qe = v(Oe, 2), It = m(Qe);
          var Tt = v(Qe, 2);
          G(() => {
            B(ft, s(Se).name), B(It, `+${s(Se).levels ?? ""} levels`);
          }), D("click", Tt, function() {
            return l(He);
          }), F(Be, Me);
        }),
        "each",
        Te,
        257,
        6
      ), F(X, Q);
    };
    C(
      () => U(Xe, (X) => {
        A(s(n).system.limiters.length, 0) ? X(Ue) : X(Kt, -1);
      }),
      "if",
      Te,
      254,
      4
    );
  }
  var Re = v(Ca, 2);
  {
    var ot = (X) => {
      var Q = au(), Fe = v(m(Q), 2);
      {
        var Be = (He) => {
          var Me = eu(), Oe = m(Me), ft = m(Oe), Qe = v(Oe, 2), It = m(Qe), Tt = v(Qe, 2), fa = v(Tt, 2);
          G(() => {
            B(ft, s(c).name), Dt(Qe, 1, `px-1.5 py-0.5 rounded ${s(c).system.cpSpent <= s(p) ? "bg-emerald-900 text-emerald-300" : "bg-red-900 text-red-300"}`), B(It, `${s(c).system.cpSpent ?? ""} / ${s(p) ?? ""} CP`);
          }), D("click", Tt, u), D("click", fa, f), F(He, Me);
        }, Se = (He) => {
          var Me = tu(), Oe = m(Me), ft = v(Oe, 2), Qe = m(ft);
          G(() => se(Qe, s(n).system.linkedActorId)), D("click", Oe, d), D("change", Qe, function(Tt) {
            return r("system.linkedActorId", Tt.target.value);
          }), F(He, Me);
        };
        C(
          () => U(Fe, (He) => {
            s(c) ? He(Be) : He(Se, -1);
          }),
          "if",
          Te,
          272,
          6
        );
      }
      F(X, Q);
    };
    C(
      () => U(Re, (X) => {
        s(o) && X(ot);
      }),
      "if",
      Te,
      269,
      2
    );
  }
  var va = v(Re, 2), Mn = v(m(va), 2);
  return G(
    (X) => {
      se(_, s(n).name), se(E, s(n).system.baseCostPerLevel), se(M, s(n).system.purchasedLevel), B(R, s(n).system.effectiveLevel), B(z, `${s(n).system.totalCost ?? ""} CP`), se(H, X), se(Y, s(n).system.description ?? ""), Gt(oe, s(n).system.isWeapon), Gt(ie, s(n).system.isSkillGroup), Gt(it, s(n).system.isSkillsAttribute), Gt(De, s(n).system.isBenchmarkException), Gt(Ie, s(n).system.isUnique), Gt(ee, s(n).system.transformationHeal), B(Ze, `Enhancements (${s(n).system.enhancements.length ?? ""})`), B(lt, `Limiters (${s(n).system.limiters.length ?? ""})`), se(Mn, s(n).system.notes ?? "");
    },
    [() => (s(n).system.selectedOptions ?? []).join(", ")]
  ), D("change", _, function(Q) {
    return e.document.update({ name: Q.target.value });
  }), D("change", E, function(Q) {
    return r("system.baseCostPerLevel", Number(Q.target.value));
  }), D("change", M, function(Q) {
    return r("system.purchasedLevel", Number(Q.target.value));
  }), D("change", H, function(Q) {
    const Fe = Q.target.value.trim(), Be = Fe ? Fe.split(",").map((Se) => Se.trim()).filter(Boolean) : [];
    r("system.selectedOptions", Be);
  }), D("change", Y, function(Q) {
    return r("system.description", Q.target.value);
  }), D("change", oe, function(Q) {
    return r("system.isWeapon", Q.target.checked);
  }), D("change", ie, function(Q) {
    return r("system.isSkillGroup", Q.target.checked);
  }), D("change", it, function(Q) {
    return r("system.isSkillsAttribute", Q.target.checked);
  }), D("change", De, function(Q) {
    return r("system.isBenchmarkException", Q.target.checked);
  }), D("change", Ie, function(Q) {
    return r("system.isUnique", Q.target.checked);
  }), D("change", ee, function(Q) {
    return r("system.transformationHeal", Q.target.checked);
  }), D("change", Mn, function(Q) {
    return r("system.notes", Q.target.value);
  }), F(t, h), pe(g);
}
Je(["change", "click"]);
On[T] = "src/components/items/DefectSheet.svelte";
var ru = P(/* @__PURE__ */ N('<div><label class="text-xs text-slate-500 uppercase">Tier</label> <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"><option>Lesser (1 CP/Rank)</option><option>Greater (2 CP/Rank)</option><option>Serious (3 CP/Rank)</option></select></div> <div><label class="text-xs text-slate-500 uppercase">Unique Description</label> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-16 resize-y"></textarea></div>', 1), On[T], [
  [57, 4, [[58, 6], [59, 6, [[63, 8], [64, 8], [65, 8]]]]],
  [68, 4, [[69, 6], [70, 6]]]
]), iu = P(/* @__PURE__ */ N('<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full"><input class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"/> <div class="grid grid-cols-2 gap-2"><div><label class="text-xs text-slate-500 uppercase">CP Granted</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"/></div> <div><label class="text-xs text-slate-500 uppercase">Rank Level</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"/></div></div> <div><label class="text-xs text-slate-500 uppercase">Description</label> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-20 resize-y"></textarea></div> <label class="flex items-center gap-1 text-xs text-slate-400"><input type="checkbox"/> Unique Defect</label> <!></div>'), On[T], [
  [
    18,
    0,
    [
      [19, 2],
      [
        25,
        2,
        [[26, 4, [[27, 6], [28, 6]]], [33, 4, [[34, 6], [35, 6]]]]
      ],
      [42, 2, [[43, 4], [44, 4]]],
      [50, 2, [[51, 4]]]
    ]
  ]
]);
function On(t, e) {
  he(new.target), fe(e, !0, On);
  let a = L(/* @__PURE__ */ ve(0), "version"), n = L(
    /* @__PURE__ */ J(() => (s(a), e.document)),
    "item"
  );
  ye(() => {
    const x = Hooks.on("updateItem", (M) => {
      A(M.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("updateItem", x);
  });
  function r(x, M) {
    e.document.update({ [x]: M });
  }
  var i = { ...ge() }, l = iu(), o = m(l), c = v(o, 2), p = m(c), d = v(m(p), 2), f = v(p, 2), u = v(m(f), 2), g = v(c, 2), h = v(m(g), 2), _ = v(g, 2), b = m(_), k = v(_, 2);
  {
    var E = (x) => {
      var M = ru(), S = be(M), w = v(m(S), 2), R = m(w);
      R.value = R.__value = "lesser";
      var O = v(R);
      O.value = O.__value = "greater";
      var V = v(O);
      V.value = V.__value = "serious";
      var z;
      ua(w);
      var j = v(S, 2), H = v(m(j), 2);
      G(() => {
        z !== (z = s(n).system.tier) && (w.value = (w.__value = s(n).system.tier) ?? "", ea(w, s(n).system.tier)), se(H, s(n).system.uniqueDescription ?? "");
      }), D("change", w, function(Y) {
        return r("system.tier", Y.target.value);
      }), D("change", H, function(Y) {
        return r("system.uniqueDescription", Y.target.value);
      }), F(x, M);
    };
    C(
      () => U(k, (x) => {
        s(n).system.isUnique && x(E);
      }),
      "if",
      On,
      56,
      2
    );
  }
  return G(() => {
    se(o, s(n).name), se(d, s(n).system.cpGranted), se(u, s(n).system.rankLevel), se(h, s(n).system.description ?? ""), Gt(b, s(n).system.isUnique);
  }), D("change", o, function(M) {
    return e.document.update({ name: M.target.value });
  }), D("change", d, function(M) {
    return r("system.cpGranted", Number(M.target.value));
  }), D("change", u, function(M) {
    return r("system.rankLevel", Number(M.target.value));
  }), D("change", h, function(M) {
    return r("system.description", M.target.value);
  }), D("change", b, function(M) {
    return r("system.isUnique", M.target.checked);
  }), F(t, l), pe(i);
}
Je(["change"]);
jn[T] = "src/components/items/EnhancementSheet.svelte";
var su = P(/* @__PURE__ */ N('<div class="text-xs text-slate-500"> </div>'), jn[T], [[43, 4]]), lu = P(/* @__PURE__ */ N('<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full"><input class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"/> <div><label class="text-xs text-slate-500 uppercase">Levels</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1" min="1"/></div> <div><label class="text-xs text-slate-500 uppercase">Description</label> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-20 resize-y"></textarea></div> <!></div>'), jn[T], [
  [
    18,
    0,
    [
      [19, 2],
      [25, 2, [[26, 4], [27, 4]]],
      [34, 2, [[35, 4], [36, 4]]]
    ]
  ]
]);
function jn(t, e) {
  he(new.target), fe(e, !0, jn);
  let a = L(/* @__PURE__ */ ve(0), "version"), n = L(
    /* @__PURE__ */ J(() => (s(a), e.document)),
    "item"
  );
  ye(() => {
    const h = Hooks.on("updateItem", (_) => {
      A(_.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("updateItem", h);
  });
  function r(h, _) {
    e.document.update({ [h]: _ });
  }
  var i = { ...ge() }, l = lu(), o = m(l), c = v(o, 2), p = v(m(c), 2), d = v(c, 2), f = v(m(d), 2), u = v(d, 2);
  {
    var g = (h) => {
      var _ = su(), b = m(_);
      G(() => B(b, `Parent Attribute: ${s(n).system.parentAttributeId ?? ""}`)), F(h, _);
    };
    C(
      () => U(u, (h) => {
        s(n).system.parentAttributeId && h(g);
      }),
      "if",
      jn,
      42,
      2
    );
  }
  return G(() => {
    se(o, s(n).name), se(p, s(n).system.levels), se(f, s(n).system.description ?? "");
  }), D("change", o, function(_) {
    return e.document.update({ name: _.target.value });
  }), D("change", p, function(_) {
    return r("system.levels", Number(_.target.value));
  }), D("change", f, function(_) {
    return r("system.description", _.target.value);
  }), F(t, l), pe(i);
}
Je(["change"]);
zn[T] = "src/components/items/LimiterSheet.svelte";
var ou = P(/* @__PURE__ */ N('<div class="text-xs text-slate-500"> </div>'), zn[T], [[43, 4]]), cu = P(/* @__PURE__ */ N('<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full"><input class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"/> <div><label class="text-xs text-slate-500 uppercase">Levels</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1" min="1"/></div> <div><label class="text-xs text-slate-500 uppercase">Description</label> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-20 resize-y"></textarea></div> <!></div>'), zn[T], [
  [
    18,
    0,
    [
      [19, 2],
      [25, 2, [[26, 4], [27, 4]]],
      [34, 2, [[35, 4], [36, 4]]]
    ]
  ]
]);
function zn(t, e) {
  he(new.target), fe(e, !0, zn);
  let a = L(/* @__PURE__ */ ve(0), "version"), n = L(
    /* @__PURE__ */ J(() => (s(a), e.document)),
    "item"
  );
  ye(() => {
    const h = Hooks.on("updateItem", (_) => {
      A(_.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("updateItem", h);
  });
  function r(h, _) {
    e.document.update({ [h]: _ });
  }
  var i = { ...ge() }, l = cu(), o = m(l), c = v(o, 2), p = v(m(c), 2), d = v(c, 2), f = v(m(d), 2), u = v(d, 2);
  {
    var g = (h) => {
      var _ = ou(), b = m(_);
      G(() => B(b, `Parent Attribute: ${s(n).system.parentAttributeId ?? ""}`)), F(h, _);
    };
    C(
      () => U(u, (h) => {
        s(n).system.parentAttributeId && h(g);
      }),
      "if",
      zn,
      42,
      2
    );
  }
  return G(() => {
    se(o, s(n).name), se(p, s(n).system.levels), se(f, s(n).system.description ?? "");
  }), D("change", o, function(_) {
    return e.document.update({ name: _.target.value });
  }), D("change", p, function(_) {
    return r("system.levels", Number(_.target.value));
  }), D("change", f, function(_) {
    return r("system.description", _.target.value);
  }), F(t, l), pe(i);
}
Je(["change"]);
Gn[T] = "src/components/items/PossessionSheet.svelte";
var du = P(/* @__PURE__ */ N('<div><label class="text-xs text-slate-500 uppercase">Budget Cost</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"/></div>'), Gn[T], [[44, 4, [[45, 6], [46, 6]]]]), uu = P(/* @__PURE__ */ N('<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full"><input class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"/> <div><label class="text-xs text-slate-500 uppercase">Category</label> <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"><option>Gear</option><option>Feature</option><option>Other</option></select></div> <label class="flex items-center gap-1 text-xs text-slate-400"><input type="checkbox"/> Mechanical (has budget cost)</label> <!> <div><label class="text-xs text-slate-500 uppercase">Description</label> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-20 resize-y"></textarea></div></div>'), Gn[T], [
  [
    18,
    0,
    [
      [19, 2],
      [25, 2, [[26, 4], [27, 4, [[31, 6], [32, 6], [33, 6]]]]],
      [37, 2, [[38, 4]]],
      [53, 2, [[54, 4], [55, 4]]]
    ]
  ]
]);
function Gn(t, e) {
  he(new.target), fe(e, !0, Gn);
  let a = L(/* @__PURE__ */ ve(0), "version"), n = L(
    /* @__PURE__ */ J(() => (s(a), e.document)),
    "item"
  );
  ye(() => {
    const M = Hooks.on("updateItem", (S) => {
      A(S.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("updateItem", M);
  });
  function r(M, S) {
    e.document.update({ [M]: S });
  }
  var i = { ...ge() }, l = uu(), o = m(l), c = v(o, 2), p = v(m(c), 2), d = m(p);
  d.value = d.__value = "gear";
  var f = v(d);
  f.value = f.__value = "feature";
  var u = v(f);
  u.value = u.__value = "other";
  var g;
  ua(p);
  var h = v(c, 2), _ = m(h), b = v(h, 2);
  {
    var k = (M) => {
      var S = du(), w = v(m(S), 2);
      G(() => se(w, s(n).system.budgetCost)), D("change", w, function(O) {
        return r("system.budgetCost", Number(O.target.value));
      }), F(M, S);
    };
    C(
      () => U(b, (M) => {
        s(n).system.isMechanical && M(k);
      }),
      "if",
      Gn,
      43,
      2
    );
  }
  var E = v(b, 2), x = v(m(E), 2);
  return G(() => {
    se(o, s(n).name), g !== (g = s(n).system.category) && (p.value = (p.__value = s(n).system.category) ?? "", ea(p, s(n).system.category)), Gt(_, s(n).system.isMechanical), se(x, s(n).system.description ?? "");
  }), D("change", o, function(S) {
    return e.document.update({ name: S.target.value });
  }), D("change", p, function(S) {
    return r("system.category", S.target.value);
  }), D("change", _, function(S) {
    return r("system.isMechanical", S.target.checked);
  }), D("change", x, function(S) {
    return r("system.description", S.target.value);
  }), F(t, l), pe(i);
}
Je(["change"]);
Wa[T] = "src/components/items/SkillSheet.svelte";
var vu = P(/* @__PURE__ */ N('<p class="text-xs text-slate-500 italic mb-2">None. First specialisation is free.</p>'), Wa[T], [[107, 6]]), fu = P(/* @__PURE__ */ N('<div class="flex items-center justify-between px-2 py-1 border-b border-slate-800 text-xs"><span class="text-slate-200"> </span> <span> </span> <button type="button" class="text-slate-500 hover:text-red-400 bg-transparent border-0 cursor-pointer text-xs">Remove</button></div>'), Wa[T], [[110, 8, [[111, 10], [112, 10], [115, 10]]]]), pu = P(/* @__PURE__ */ N('<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full"><input class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"/> <div class="grid grid-cols-2 gap-2"><div><label class="text-xs text-slate-500 uppercase">Rank</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1" min="0"/></div> <div><label class="text-xs text-slate-500 uppercase">Cost Class</label> <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"><option>Framework (1 SP)</option><option>Adventure (2 SP)</option><option>Genre (3 SP)</option></select></div> <div><label class="text-xs text-slate-500 uppercase">Linked Stat</label> <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"><option>Body</option><option>Mind</option><option>Soul</option><option>Body+Mind</option><option>Body+Soul</option><option>Mind+Soul</option><option>Average</option></select></div> <div><label class="text-xs text-slate-500 uppercase">SP Cost</label> <span class="block text-sm text-slate-300 p-1"> </span></div></div> <div class="flex gap-3 text-xs"><label class="flex items-center gap-1 text-slate-400"><input type="checkbox"/> Flavor (no SP cost)</label> <label class="flex items-center gap-1 text-slate-400"><input type="checkbox"/> Genius Skill</label></div> <div><div class="text-xs text-slate-500 uppercase mb-1"> </div> <!> <div class="flex gap-2 mt-2"><input class="flex-1 bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1" placeholder="Specialisation name..."/> <button class="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs border-0 cursor-pointer hover:bg-slate-600">Add</button></div></div> <div><label class="text-xs text-slate-500 uppercase">Description</label> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-20 resize-y"></textarea></div></div>'), Wa[T], [
  [
    39,
    0,
    [
      [41, 2],
      [
        48,
        2,
        [
          [49, 4, [[50, 6], [51, 6]]],
          [57, 4, [[58, 6], [59, 6, [[63, 8], [64, 8], [65, 8]]]]],
          [
            68,
            4,
            [
              [69, 6],
              [
                70,
                6,
                [
                  [74, 8],
                  [75, 8],
                  [76, 8],
                  [77, 8],
                  [78, 8],
                  [79, 8],
                  [80, 8]
                ]
              ]
            ]
          ],
          [83, 4, [[84, 6], [85, 6]]]
        ]
      ],
      [90, 2, [[91, 4, [[92, 6]]], [96, 4, [[97, 6]]]]],
      [104, 2, [[105, 4], [120, 4, [[121, 6], [127, 6]]]]],
      [135, 2, [[136, 4], [137, 4]]]
    ]
  ]
]);
function Wa(t, e) {
  he(new.target), fe(e, !0, Wa);
  let a = L(/* @__PURE__ */ ve(0), "version"), n = L(
    /* @__PURE__ */ J(() => (s(a), e.document)),
    "item"
  ), r = L(/* @__PURE__ */ ve(""), "newSpecName");
  ye(() => {
    const de = Hooks.on("updateItem", (te) => {
      A(te.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("updateItem", de);
  });
  function i(de, te) {
    e.document.update({ [de]: te });
  }
  let l = L(/* @__PURE__ */ J(() => s(n).system.specialisations ?? []), "specialisations");
  function o() {
    if (!s(r).trim()) return;
    const de = [...s(l)], te = A(de.length, 0);
    de.push({
      name: s(r).trim(),
      isFree: te,
      spCost: te ? 0 : 1
    }), e.document.update({ "system.specialisations": de }), _e(r, "");
  }
  function c(de) {
    let te = s(l).filter((Ze, Ve) => A(Ve, de, !1));
    te.length > 0 && !te.some((Ze) => Ze.isFree) && (te[0] = { ...te[0], isFree: !0, spCost: 0 }), e.document.update({ "system.specialisations": te });
  }
  var p = { ...ge() }, d = pu(), f = m(d), u = v(f, 2), g = m(u), h = v(m(g), 2), _ = v(g, 2), b = v(m(_), 2), k = m(b);
  k.value = k.__value = "framework";
  var E = v(k);
  E.value = E.__value = "adventure";
  var x = v(E);
  x.value = x.__value = "genre";
  var M;
  ua(b);
  var S = v(_, 2), w = v(m(S), 2), R = m(w);
  R.value = R.__value = "body";
  var O = v(R);
  O.value = O.__value = "mind";
  var V = v(O);
  V.value = V.__value = "soul";
  var z = v(V);
  z.value = z.__value = "bodyMind";
  var j = v(z);
  j.value = j.__value = "bodySoul";
  var H = v(j);
  H.value = H.__value = "mindSoul";
  var I = v(H);
  I.value = I.__value = "avg";
  var Y;
  ua(w);
  var q = v(S, 2), W = v(m(q), 2), oe = m(W), le = v(u, 2), ie = m(le), xe = m(ie), it = v(ie, 2), Le = m(it), De = v(le, 2), et = m(De), Ie = m(et), ut = v(et, 2);
  {
    var ee = (de) => {
      var te = vu();
      F(de, te);
    }, K = (de) => {
      var te = Ee(), Ze = be(te);
      C(
        () => Ke(Ze, 17, () => s(l), St, (Ve, Mt, qn) => {
          var Ca = fu(), Fa = m(Ca), lt = m(Fa, !0);
          var Xe = v(Fa, 2), Ue = m(Xe, !0);
          var Kt = v(Xe, 2);
          G(() => {
            B(lt, s(Mt).name), Dt(Xe, 1, s(Mt).isFree ? "text-emerald-400" : "text-amber-400"), B(Ue, s(Mt).isFree ? "free" : `${s(Mt).spCost} SP`);
          }), D("click", Kt, function() {
            return c(qn);
          }), F(Ve, Ca);
        }),
        "each",
        Wa,
        109,
        6
      ), F(de, te);
    };
    C(
      () => U(ut, (de) => {
        A(s(l).length, 0) ? de(ee) : de(K, -1);
      }),
      "if",
      Wa,
      106,
      4
    );
  }
  var ne = v(ut, 2), Z = m(ne), me = v(Z, 2), st = v(De, 2), vt = v(m(st), 2);
  return G(() => {
    se(f, s(n).name), se(h, s(n).system.rank), M !== (M = s(n).system.costClass) && (b.value = (b.__value = s(n).system.costClass) ?? "", ea(b, s(n).system.costClass)), Y !== (Y = s(n).system.linkedStat) && (w.value = (w.__value = s(n).system.linkedStat) ?? "", ea(w, s(n).system.linkedStat)), B(oe, s(n).system.totalSpCost), Gt(xe, s(n).system.isFlavor), Gt(Le, s(n).system.isGeniusSkill), B(Ie, `Specialisations (${s(l).length ?? ""})`), se(vt, s(n).system.description ?? "");
  }), D("change", f, function(te) {
    return e.document.update({ name: te.target.value });
  }), D("change", h, function(te) {
    return i("system.rank", Number(te.target.value));
  }), D("change", b, function(te) {
    return i("system.costClass", te.target.value);
  }), D("change", w, function(te) {
    return i("system.linkedStat", te.target.value);
  }), D("change", xe, function(te) {
    return i("system.isFlavor", te.target.checked);
  }), D("change", Le, function(te) {
    return i("system.isGeniusSkill", te.target.checked);
  }), D("keydown", Z, function(te) {
    A(te.key, "Enter") && o();
  }), Si(
    Z,
    function() {
      return s(r);
    },
    function(te) {
      _e(r, te);
    }
  ), D("click", me, o), D("change", vt, function(te) {
    return i("system.description", te.target.value);
  }), F(t, d), pe(p);
}
Je(["change", "click", "keydown"]);
ze[T] = "src/components/items/TemplateSheet.svelte";
var mu = P(/* @__PURE__ */ N('<div><label class="text-xs text-slate-500 uppercase">Size Rank</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"/></div>'), ze[T], [[145, 4, [[146, 6], [147, 6]]]]), hu = P(/* @__PURE__ */ N('<div><label class="text-xs text-slate-500 uppercase">Tradition</label> <input class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1" placeholder="e.g. Conjuration, Divine, Psi, Ritualist..."/></div>'), ze[T], [[155, 4, [[156, 6], [157, 6]]]]), gu = P(/* @__PURE__ */ N('<div><div class="text-xs text-slate-500 uppercase mb-1">Stat Modifiers</div> <div class="grid grid-cols-3 gap-2"><div><label class="text-xs text-slate-400">Body</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1 text-center"/></div> <div><label class="text-xs text-slate-400">Mind</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1 text-center"/></div> <div><label class="text-xs text-slate-400">Soul</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1 text-center"/></div></div></div>'), ze[T], [
  [
    167,
    4,
    [
      [168, 6],
      [
        169,
        6,
        [
          [170, 8, [[171, 10], [172, 10]]],
          [177, 8, [[178, 10], [179, 10]]],
          [184, 8, [[185, 10], [186, 10]]]
        ]
      ]
    ]
  ]
]), bu = P(/* @__PURE__ */ N('<span class="px-1 py-0.5 rounded bg-sky-900 text-sky-300 text-xs">Enh</span> <span class="text-slate-200 flex-1"> </span> <label class="text-slate-400">×</label> <input type="number" class="w-10 text-center bg-slate-800 border border-slate-700 rounded text-slate-100 p-0.5 text-xs" min="1"/>', 1), ze[T], [[221, 12], [222, 12], [223, 12], [224, 12]]), _u = P(/* @__PURE__ */ N('<span class="px-1 py-0.5 rounded bg-violet-900 text-violet-300 text-xs">Lim</span> <span class="text-slate-200 flex-1"> </span> <label class="text-slate-400">×</label> <input type="number" class="w-10 text-center bg-slate-800 border border-slate-700 rounded text-slate-100 p-0.5 text-xs" min="1"/>', 1), ze[T], [[230, 12], [231, 12], [232, 12], [233, 12]]), xu = P(/* @__PURE__ */ N('<span class="px-1 py-0.5 rounded bg-blue-900 text-blue-300 text-xs">Attr</span> <span class="text-slate-200 flex-1"> </span> <label class="text-slate-400">Lv</label> <input type="number" class="w-10 text-center bg-slate-800 border border-slate-700 rounded text-slate-100 p-0.5 text-xs" min="0"/> <span class="text-slate-500"> </span>', 1), ze[T], [[239, 12], [240, 12], [241, 12], [242, 12], [247, 12]]), yu = P(/* @__PURE__ */ N('<span class="px-1 py-0.5 rounded bg-red-900 text-red-300 text-xs">Defect</span> <span class="text-slate-200 flex-1"> </span> <label class="text-slate-400">Rank</label> <input type="number" class="w-10 text-center bg-slate-800 border border-slate-700 rounded text-slate-100 p-0.5 text-xs" min="1"/>', 1), ze[T], [[249, 12], [250, 12], [251, 12], [252, 12]]), wu = P(/* @__PURE__ */ N('<span class="px-1 py-0.5 rounded bg-purple-900 text-purple-300 text-xs">Template</span> <span class="text-slate-200 flex-1"> </span>', 1), ze[T], [[259, 10], [260, 10]]), ku = P(/* @__PURE__ */ N('<div class="flex items-center gap-2 px-2 py-1.5 border-b border-slate-800 text-xs"><!> <button type="button" class="text-slate-500 hover:text-red-400 bg-transparent border-0 cursor-pointer text-xs p-0">×</button></div>'), ze[T], [[218, 6, [[262, 8]]]]), Su = P(/* @__PURE__ */ N('<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full"><input class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"/> <div class="grid grid-cols-2 gap-2"><div><label class="text-xs text-slate-500 uppercase">Template Type</label> <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"><option>Race</option><option>Class</option><option>Size</option><option>Power Bundle</option><option>Power Pack</option></select></div> <div><label class="text-xs text-slate-500 uppercase">Point Total (info only)</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"/></div></div> <!> <!> <!> <div><label class="text-xs text-slate-500 uppercase">Description</label> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-16 resize-y"></textarea></div> <div><div class="text-xs text-slate-500 uppercase mb-1"> </div> <p class="text-xs text-slate-500 italic mb-2"><!></p> <!></div></div>'), ze[T], [
  [
    108,
    0,
    [
      [114, 2],
      [
        121,
        2,
        [
          [
            122,
            4,
            [
              [123, 6],
              [124, 6, [[128, 8], [129, 8], [130, 8], [131, 8], [132, 8]]]
            ]
          ],
          [135, 4, [[136, 6], [137, 6]]]
        ]
      ],
      [196, 2, [[197, 4], [198, 4]]],
      [205, 2, [[206, 4], [209, 4]]]
    ]
  ]
]);
function ze(t, e) {
  he(new.target), fe(e, !0, ze);
  let a = L(/* @__PURE__ */ ve(0), "version"), n = L(
    /* @__PURE__ */ J(() => (s(a), e.document)),
    "item"
  );
  ye(() => {
    const ee = Hooks.on("updateItem", (K) => {
      A(K.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("updateItem", ee);
  });
  function r(ee, K) {
    e.document.update({ [ee]: K });
  }
  let i = L(
    /* @__PURE__ */ J(() => (s(a), e.document.system.entries ?? [])),
    "entries"
  ), l = L(/* @__PURE__ */ J(() => A(s(n).system.templateType, "powerpack")), "isPowerPack"), o = L(/* @__PURE__ */ J(() => A(s(n).system.templateType, "bundle")), "isBundle"), c = L(/* @__PURE__ */ J(() => ["race", "class", "size"].includes(s(n).system.templateType)), "isCharacterTemplate");
  function p(ee) {
    const K = s(i).filter((ne, Z) => A(Z, ee, !1));
    e.document.update({ "system.entries": K });
  }
  function d(ee, K) {
    const ne = s(i).map((Z, me) => {
      if (A(me, ee, !1)) return Z;
      const st = { ...Z.systemData };
      return A(Z.itemType, "attribute") ? st.purchasedLevel = K : A(Z.itemType, "defect") ? st.rankLevel = K : (A(Z.itemType, "enhancement") || A(Z.itemType, "limiter")) && (st.levels = K), { ...Z, systemData: st };
    });
    e.document.update({ "system.entries": ne });
  }
  async function f(ee) {
    ee.preventDefault();
    let K;
    try {
      K = JSON.parse(ee.dataTransfer.getData("text/plain"));
    } catch {
      return;
    }
    if (A(K.type, "Item", !1)) return;
    const ne = (await Ae(fromUuid(K.uuid)))();
    if (ne) {
      if (s(l)) {
        if (["enhancement", "limiter"].includes(ne.type)) {
          const Z = [
            ...s(i),
            {
              entryType: "item",
              name: ne.name,
              itemType: ne.type,
              systemData: { levels: ne.system.levels ?? 1 }
            }
          ];
          e.document.update({ "system.entries": Z });
        }
        return;
      }
      if (A(ne.type, "besm4eTemplate")) {
        const Z = [
          ...s(i),
          {
            entryType: "template",
            templateId: K.uuid,
            templateName: ne.name
          }
        ];
        e.document.update({ "system.entries": Z });
      } else if (["attribute", "defect"].includes(ne.type)) {
        const Z = {};
        A(ne.type, "attribute") ? (Z.baseCostPerLevel = ne.system.baseCostPerLevel, Z.purchasedLevel = ne.system.purchasedLevel, ne.system.isWeapon && (Z.isWeapon = !0), ne.system.isSkillGroup && (Z.isSkillGroup = !0, Z.skillGroupCategory = ne.system.skillGroupCategory)) : A(ne.type, "defect") && (Z.rankLevel = ne.system.rankLevel ?? 1, Z.cpGranted = ne.system.cpGranted ?? 1);
        const me = [
          ...s(i),
          {
            entryType: "item",
            name: ne.name,
            itemType: ne.type,
            systemData: Z
          }
        ];
        e.document.update({ "system.entries": me });
      }
    }
  }
  function u(ee) {
    ee.preventDefault(), ee.dataTransfer.dropEffect = "copy";
  }
  var g = { ...ge() }, h = Su(), _ = m(h), b = v(_, 2), k = m(b), E = v(m(k), 2), x = m(E);
  x.value = x.__value = "race";
  var M = v(x);
  M.value = M.__value = "class";
  var S = v(M);
  S.value = S.__value = "size";
  var w = v(S);
  w.value = w.__value = "bundle";
  var R = v(w);
  R.value = R.__value = "powerpack";
  var O;
  ua(E);
  var V = v(k, 2), z = v(m(V), 2), j = v(b, 2);
  {
    var H = (ee) => {
      var K = mu(), ne = v(m(K), 2);
      G(() => se(ne, s(n).system.sizeRank ?? 0)), D("change", ne, function(me) {
        return r("system.sizeRank", Number(me.target.value));
      }), F(ee, K);
    };
    C(
      () => U(j, (ee) => {
        A(s(n).system.templateType, "size") && ee(H);
      }),
      "if",
      ze,
      144,
      2
    );
  }
  var I = v(j, 2);
  {
    var Y = (ee) => {
      var K = hu(), ne = v(m(K), 2);
      G(() => se(ne, s(n).system.tradition ?? "")), D("change", ne, function(me) {
        return r("system.tradition", me.target.value);
      }), F(ee, K);
    };
    C(
      () => U(I, (ee) => {
        (s(o) || s(l)) && ee(Y);
      }),
      "if",
      ze,
      154,
      2
    );
  }
  var q = v(I, 2);
  {
    var W = (ee) => {
      var K = gu(), ne = v(m(K), 2), Z = m(ne), me = v(m(Z), 2), st = v(Z, 2), vt = v(m(st), 2), de = v(st, 2), te = v(m(de), 2);
      G(() => {
        var Ze, Ve, Mt;
        se(me, ((Ze = s(n).system.statModifiers) == null ? void 0 : Ze.body) ?? 0), se(vt, ((Ve = s(n).system.statModifiers) == null ? void 0 : Ve.mind) ?? 0), se(te, ((Mt = s(n).system.statModifiers) == null ? void 0 : Mt.soul) ?? 0);
      }), D("change", me, function(Ve) {
        return r("system.statModifiers.body", Number(Ve.target.value));
      }), D("change", vt, function(Ve) {
        return r("system.statModifiers.mind", Number(Ve.target.value));
      }), D("change", te, function(Ve) {
        return r("system.statModifiers.soul", Number(Ve.target.value));
      }), F(ee, K);
    };
    C(
      () => U(q, (ee) => {
        (s(c) || s(o)) && ee(W);
      }),
      "if",
      ze,
      166,
      2
    );
  }
  var oe = v(q, 2), le = v(m(oe), 2), ie = v(oe, 2), xe = m(ie), it = m(xe), Le = v(xe, 2), De = m(Le);
  {
    var et = (ee) => {
      var K = Ea("Drop enhancements and limiters here. Drop this pack onto an attribute to apply all at once.");
      F(ee, K);
    }, Ie = (ee) => {
      var K = Ea("Drop attributes, defects, or other templates here to add them.");
      F(ee, K);
    };
    C(
      () => U(De, (ee) => {
        s(l) ? ee(et) : ee(Ie, -1);
      }),
      "if",
      ze,
      210,
      6
    );
  }
  var ut = v(Le, 2);
  return C(
    () => Ke(ut, 17, () => s(i), St, (ee, K, ne) => {
      var Z = ku(), me = m(Z);
      {
        var st = (te) => {
          var Ze = Ee(), Ve = be(Ze);
          {
            var Mt = (lt) => {
              var Xe = bu(), Ue = v(be(Xe), 2), Kt = m(Ue, !0);
              var Re = v(Ue, 4);
              G(() => {
                var ot;
                B(Kt, s(K).name), se(Re, ((ot = s(K).systemData) == null ? void 0 : ot.levels) ?? 1);
              }), D("change", Re, function(va) {
                return d(ne, Number(va.target.value));
              }), F(lt, Xe);
            }, qn = (lt) => {
              var Xe = _u(), Ue = v(be(Xe), 2), Kt = m(Ue, !0);
              var Re = v(Ue, 4);
              G(() => {
                var ot;
                B(Kt, s(K).name), se(Re, ((ot = s(K).systemData) == null ? void 0 : ot.levels) ?? 1);
              }), D("change", Re, function(va) {
                return d(ne, Number(va.target.value));
              }), F(lt, Xe);
            }, Ca = (lt) => {
              var Xe = xu(), Ue = v(be(Xe), 2), Kt = m(Ue, !0);
              var Re = v(Ue, 4);
              var ot = v(Re, 2), va = m(ot);
              G(() => {
                var Mn, X;
                B(Kt, s(K).name), se(Re, ((Mn = s(K).systemData) == null ? void 0 : Mn.purchasedLevel) ?? 1), B(va, `${((X = s(K).systemData) == null ? void 0 : X.baseCostPerLevel) ?? 0 ?? ""} CP/Lv`);
              }), D("change", Re, function(X) {
                return d(ne, Number(X.target.value));
              }), F(lt, Xe);
            }, Fa = (lt) => {
              var Xe = yu(), Ue = v(be(Xe), 2), Kt = m(Ue, !0);
              var Re = v(Ue, 4);
              G(() => {
                var ot;
                B(Kt, s(K).name), se(Re, ((ot = s(K).systemData) == null ? void 0 : ot.rankLevel) ?? 1);
              }), D("change", Re, function(va) {
                return d(ne, Number(va.target.value));
              }), F(lt, Xe);
            };
            C(
              () => U(Ve, (lt) => {
                A(s(K).itemType, "enhancement") ? lt(Mt) : A(s(K).itemType, "limiter") ? lt(qn, 1) : A(s(K).itemType, "attribute") ? lt(Ca, 2) : lt(Fa, -1);
              }),
              "if",
              ze,
              220,
              10
            );
          }
          F(te, Ze);
        }, vt = (te) => {
          var Ze = wu(), Ve = v(be(Ze), 2), Mt = m(Ve, !0);
          G(() => B(Mt, s(K).templateName)), F(te, Ze);
        };
        C(
          () => U(me, (te) => {
            A(s(K).entryType, "item") ? te(st) : te(vt, -1);
          }),
          "if",
          ze,
          219,
          8
        );
      }
      var de = v(me, 2);
      D("click", de, function() {
        return p(ne);
      }), F(ee, Z);
    }),
    "each",
    ze,
    217,
    4
  ), G(() => {
    se(_, s(n).name), O !== (O = s(n).system.templateType) && (E.value = (E.__value = s(n).system.templateType) ?? "", ea(E, s(n).system.templateType)), se(z, s(n).system.pointTotal), se(le, s(n).system.description ?? ""), B(it, `${s(l) ? "Enhancements & Limiters" : "Entries"} (${s(i).length ?? ""})`);
  }), kt("dragover", h, u), kt("drop", h, f), D("change", _, function(K) {
    return e.document.update({ name: K.target.value });
  }), D("change", E, function(K) {
    return r("system.templateType", K.target.value);
  }), D("change", z, function(K) {
    return r("system.pointTotal", Number(K.target.value));
  }), D("change", le, function(K) {
    return r("system.description", K.target.value);
  }), F(t, h), pe(g);
}
Je(["change", "click"]);
const Mu = {
  attribute: Te,
  defect: On,
  enhancement: jn,
  limiter: zn,
  possession: Gn,
  skill: Wa,
  besm4eTemplate: ze
};
var Da;
class Ys extends foundry.applications.api.DocumentSheetV2 {
  constructor() {
    super(...arguments);
    re(this, Da, null);
  }
  async _renderHTML(a, n) {
    const r = document.createElement("div");
    return r.classList.add("svelte-mount"), r;
  }
  _replaceHTML(a, n, r) {
    if (super._replaceHTML(a, n, r), !y(this, Da)) {
      const i = Mu[this.document.type];
      if (!i) return;
      ae(this, Da, vr(i, {
        target: n,
        props: { document: this.document, sheet: this }
      }));
    }
  }
  async close(a) {
    return y(this, Da) && (fr(y(this, Da)), ae(this, Da, null)), super.close(a);
  }
}
Da = new WeakMap(), ct(Ys, "DEFAULT_OPTIONS", {
  classes: ["besm", "item-sheet"],
  position: { width: 450, height: 500 },
  window: { resizable: !0 }
});
Bt[T] = "src/components/sheets/NPCSheet.svelte";
var Tu = P(/* @__PURE__ */ N('<div class="flex h-full bg-slate-900 text-slate-100"><!> <div class="flex-1 flex flex-col overflow-hidden"><!> <!> <div class="flex-1 overflow-y-auto"><!></div></div></div>'), Bt[T], [[50, 0, [[53, 2, [[57, 4]]]]]]);
function Bt(t, e) {
  he(new.target), fe(e, !0, Bt);
  let a = L(/* @__PURE__ */ ve(0), "version"), n = L(
    /* @__PURE__ */ J(() => (s(a), e.document)),
    "actor"
  ), r = L(/* @__PURE__ */ ve("attributes"), "activeTab");
  const i = [
    { id: "attributes", label: "Attributes" },
    { id: "combat", label: "Combat" },
    { id: "biography", label: "Biography" }
  ];
  ye(() => {
    const p = Hooks.on("updateActor", (d) => {
      A(d.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("updateActor", p);
  }), ye(() => {
    const p = Hooks.on("createItem", (d) => {
      var f;
      A((f = d.parent) == null ? void 0 : f.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("createItem", p);
  }), ye(() => {
    const p = Hooks.on("updateItem", (d) => {
      var f;
      A((f = d.parent) == null ? void 0 : f.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("updateItem", p);
  }), ye(() => {
    const p = Hooks.on("deleteItem", (d) => {
      var f;
      A((f = d.parent) == null ? void 0 : f.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("deleteItem", p);
  });
  var l = { ...ge() }, o = Ee(), c = be(o);
  return C(
    () => Hr(c, () => s(a), (p) => {
      var d = Tu(), f = m(d);
      C(
        () => je(f, {
          get actor() {
            return s(n);
          },
          showSP: !1,
          showEP: !0,
          showCV: !0
        }),
        "component",
        Bt,
        51,
        2,
        { componentTag: "ActorSidebar" }
      );
      var u = v(f, 2), g = m(u);
      C(
        () => Ma(g, {
          get tabs() {
            return i;
          },
          get activeTab() {
            return s(r);
          },
          onSelect: (M) => _e(r, M, !0)
        }),
        "component",
        Bt,
        54,
        4,
        { componentTag: "TabBar" }
      );
      var h = v(g, 2);
      {
        let M = /* @__PURE__ */ J(() => s(n).system.benchmarkWarnings ?? []);
        C(
          () => Ua(h, {
            get warnings() {
              return s(M);
            }
          }),
          "component",
          Bt,
          55,
          4,
          { componentTag: "BenchmarkPanel" }
        );
      }
      var _ = v(h, 2), b = m(_);
      {
        var k = (M) => {
          C(
            () => qe(M, {
              get actor() {
                return s(n);
              }
            }),
            "component",
            Bt,
            59,
            8,
            { componentTag: "AttributesTab" }
          );
        }, E = (M) => {
          C(
            () => we(M, {
              get actor() {
                return s(n);
              }
            }),
            "component",
            Bt,
            61,
            8,
            { componentTag: "CombatTab" }
          );
        }, x = (M) => {
          C(
            () => Sn(M, {
              get actor() {
                return s(n);
              }
            }),
            "component",
            Bt,
            63,
            8,
            { componentTag: "BiographyTab" }
          );
        };
        C(
          () => U(b, (M) => {
            A(s(r), "attributes") ? M(k) : A(s(r), "combat") ? M(E, 1) : A(s(r), "biography") && M(x, 2);
          }),
          "if",
          Bt,
          58,
          6
        );
      }
      F(p, d);
    }),
    "key",
    Bt,
    49,
    0
  ), F(t, o), pe(l);
}
var Ia;
class Ks extends foundry.applications.api.DocumentSheetV2 {
  constructor() {
    super(...arguments);
    re(this, Ia, null);
  }
  async _renderHTML(a, n) {
    const r = document.createElement("div");
    return r.classList.add("svelte-mount"), r;
  }
  _replaceHTML(a, n, r) {
    super._replaceHTML(a, n, r), y(this, Ia) || ae(this, Ia, vr(Bt, {
      target: n,
      props: { document: this.document, sheet: this }
    }));
  }
  async close(a) {
    return y(this, Ia) && (fr(y(this, Ia)), ae(this, Ia, null)), super.close(a);
  }
}
Ia = new WeakMap(), ct(Ks, "DEFAULT_OPTIONS", {
  classes: ["besm", "actor-sheet", "npc-sheet"],
  position: { width: 700, height: 550 },
  window: { resizable: !0 }
});
Nt[T] = "src/components/tabs/CrewTab.svelte";
var Cu = P(/* @__PURE__ */ N('<p class="text-xs text-slate-500 italic mb-3">No crew assigned.</p>'), Nt[T], [[51, 4]]), Fu = P(/* @__PURE__ */ N('<div class="flex items-center gap-2 px-2 py-1.5 border-b border-slate-800 text-xs"><span class="text-slate-200 flex-1"> </span> <select class="bg-slate-800 border border-slate-700 rounded text-xs text-slate-100 p-0.5"><option>Crew</option><option>Pilot</option><option>Gunner</option><option>Passenger</option></select> <button type="button" class="text-blue-400 hover:text-blue-200 bg-transparent border-0 cursor-pointer text-xs">Open</button> <button type="button" class="text-red-400 hover:text-red-200 bg-transparent border-0 cursor-pointer text-xs">Remove</button></div>'), Nt[T], [
  [
    55,
    6,
    [
      [56, 8],
      [59, 8, [[64, 10], [65, 10], [66, 10], [67, 10]]],
      [69, 8],
      [73, 8]
    ]
  ]
]), Au = P(/* @__PURE__ */ N('<div class="mt-2 mb-3 text-xs text-slate-400"> </div>'), Nt[T], [[82, 4]]), Eu = P(/* @__PURE__ */ N("<option> </option>"), Nt[T], [[97, 10]]), Pu = P(/* @__PURE__ */ N('<div class="p-3"><div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Crew</div> <!> <!> <div class="border-t border-slate-700 pt-2 mt-2"><div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Add Crew Member</div> <div class="flex flex-col gap-1"><select class="w-full bg-slate-800 border border-slate-700 rounded text-xs text-slate-100 p-1"><option>— Select Actor —</option><!></select> <div class="flex gap-2"><select class="flex-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-100 p-1"><option>Crew</option><option>Pilot</option><option>Gunner</option><option>Passenger</option></select> <button type="button" class="px-2 py-1 bg-emerald-700 text-emerald-100 rounded border-0 cursor-pointer text-xs hover:bg-emerald-600">Add</button></div></div></div></div>'), Nt[T], [
  [
    47,
    0,
    [
      [48, 2],
      [
        88,
        2,
        [
          [89, 4],
          [
            90,
            4,
            [
              [91, 6, [[95, 8]]],
              [
                100,
                6,
                [
                  [101, 8, [[105, 10], [106, 10], [107, 10], [108, 10]]],
                  [110, 8]
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ]
]);
function Nt(t, e) {
  he(new.target), fe(e, !0, Nt);
  let a = L(/* @__PURE__ */ J(() => e.actor.system.crew ?? []), "crew"), n = L(/* @__PURE__ */ J(() => s(a).filter((q) => A(q.role, "passenger")).length), "passengerCount"), r = L(/* @__PURE__ */ ve(""), "newCrewId"), i = L(/* @__PURE__ */ ve("crew"), "newCrewRole"), l = L(/* @__PURE__ */ J(() => game.actors.filter((q) => A(q.id, e.actor.id, !1) && !s(a).some((W) => A(W.actorId, q.id))).sort((q, W) => q.name.localeCompare(W.name))), "availableActors");
  function o(q) {
    return game.actors.get(q);
  }
  async function c() {
    if (!s(r)) return;
    const q = [
      ...s(a),
      { actorId: s(r), role: s(i) }
    ];
    (await Ae(e.actor.update({ "system.crew": q })))(), _e(r, ""), _e(i, "crew");
  }
  async function p(q) {
    const W = s(a).filter((oe, le) => A(le, q, !1));
    (await Ae(e.actor.update({ "system.crew": W })))();
  }
  async function d(q, W) {
    const oe = s(a).map((le, ie) => A(ie, q) ? { ...le, role: W } : le);
    (await Ae(e.actor.update({ "system.crew": oe })))();
  }
  function f(q) {
    const W = game.actors.get(q);
    W && W.sheet.render(!0);
  }
  var u = { ...ge() }, g = Pu(), h = v(m(g), 2);
  {
    var _ = (q) => {
      var W = Cu();
      F(q, W);
    }, b = (q) => {
      var W = Ee(), oe = be(W);
      C(
        () => Ke(oe, 17, () => s(a), St, (le, ie, xe) => {
          const it = L(/* @__PURE__ */ J(() => o(s(ie).actorId)), "crewActor");
          s(it);
          var Le = Fu(), De = m(Le), et = m(De, !0);
          var Ie = v(De, 2), ut = m(Ie);
          ut.value = ut.__value = "crew";
          var ee = v(ut);
          ee.value = ee.__value = "pilot";
          var K = v(ee);
          K.value = K.__value = "gunner";
          var ne = v(K);
          ne.value = ne.__value = "passenger";
          var Z;
          ua(Ie);
          var me = v(Ie, 2), st = v(me, 2);
          G(() => {
            var vt;
            B(et, ((vt = s(it)) == null ? void 0 : vt.name) ?? "Unknown Actor"), Z !== (Z = s(ie).role) && (Ie.value = (Ie.__value = s(ie).role) ?? "", ea(Ie, s(ie).role));
          }), D("change", Ie, function(de) {
            return d(xe, de.target.value);
          }), D("click", me, function() {
            return f(s(ie).actorId);
          }), D("click", st, function() {
            return p(xe);
          }), F(le, Le);
        }),
        "each",
        Nt,
        53,
        4
      ), F(q, W);
    };
    C(
      () => U(h, (q) => {
        A(s(a).length, 0) ? q(_) : q(b, -1);
      }),
      "if",
      Nt,
      50,
      2
    );
  }
  var k = v(h, 2);
  {
    var E = (q) => {
      var W = Au(), oe = m(W);
      G(() => B(oe, `Passengers: ${s(n) ?? ""} / ${e.actor.system.passengerCapacity ?? ""}`)), F(q, W);
    };
    C(
      () => U(k, (q) => {
        e.actor.system.passengerCapacity > 0 && q(E);
      }),
      "if",
      Nt,
      81,
      2
    );
  }
  var x = v(k, 2), M = v(m(x), 2), S = m(M), w = m(S);
  w.value = w.__value = "";
  var R = v(w);
  C(
    () => Ke(R, 17, () => s(l), St, (q, W) => {
      var oe = Eu(), le = m(oe);
      var ie = {};
      G(() => {
        var xe;
        B(le, `${s(W).name ?? ""} (${((xe = CONFIG.Actor.typeLabels) == null ? void 0 : xe[s(W).type]) ?? s(W).type ?? ""})`), ie !== (ie = s(W).id) && (oe.value = (oe.__value = s(W).id) ?? "");
      }), F(q, oe);
    }),
    "each",
    Nt,
    96,
    8
  );
  var O = v(S, 2), V = m(O), z = m(V);
  z.value = z.__value = "crew";
  var j = v(z);
  j.value = j.__value = "pilot";
  var H = v(j);
  H.value = H.__value = "gunner";
  var I = v(H);
  I.value = I.__value = "passenger";
  var Y = v(V, 2);
  return si(
    S,
    function() {
      return s(r);
    },
    function(W) {
      _e(r, W);
    }
  ), si(
    V,
    function() {
      return s(i);
    },
    function(W) {
      _e(i, W);
    }
  ), D("click", Y, c), F(t, g), pe(u);
}
Je(["change", "click"]);
Zt[T] = "src/components/sheets/VehicleSheet.svelte";
var Nu = P(/* @__PURE__ */ N('<div class="flex h-full bg-slate-900 text-slate-100"><!> <div class="flex-1 flex flex-col overflow-hidden"><!> <div class="flex-1 overflow-y-auto"><!></div></div></div>'), Zt[T], [[49, 0, [[52, 2, [[55, 4]]]]]]);
function Zt(t, e) {
  he(new.target), fe(e, !0, Zt);
  let a = L(/* @__PURE__ */ ve(0), "version"), n = L(
    /* @__PURE__ */ J(() => (s(a), e.document)),
    "actor"
  ), r = L(/* @__PURE__ */ ve("attributes"), "activeTab");
  const i = [
    { id: "attributes", label: "Attributes" },
    { id: "crew", label: "Crew" },
    { id: "biography", label: "Biography" }
  ];
  ye(() => {
    const p = Hooks.on("updateActor", (d) => {
      A(d.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("updateActor", p);
  }), ye(() => {
    const p = Hooks.on("createItem", (d) => {
      var f;
      A((f = d.parent) == null ? void 0 : f.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("createItem", p);
  }), ye(() => {
    const p = Hooks.on("updateItem", (d) => {
      var f;
      A((f = d.parent) == null ? void 0 : f.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("updateItem", p);
  }), ye(() => {
    const p = Hooks.on("deleteItem", (d) => {
      var f;
      A((f = d.parent) == null ? void 0 : f.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("deleteItem", p);
  });
  var l = { ...ge() }, o = Ee(), c = be(o);
  return C(
    () => Hr(c, () => s(a), (p) => {
      var d = Nu(), f = m(d);
      C(
        () => je(f, {
          get actor() {
            return s(n);
          },
          showSP: !1,
          showEP: !1,
          showCV: !1,
          statsToShow: ["body"]
        }),
        "component",
        Zt,
        50,
        2,
        { componentTag: "ActorSidebar" }
      );
      var u = v(f, 2), g = m(u);
      C(
        () => Ma(g, {
          get tabs() {
            return i;
          },
          get activeTab() {
            return s(r);
          },
          onSelect: (x) => _e(r, x, !0)
        }),
        "component",
        Zt,
        53,
        4,
        { componentTag: "TabBar" }
      );
      var h = v(g, 2), _ = m(h);
      {
        var b = (x) => {
          C(
            () => qe(x, {
              get actor() {
                return s(n);
              }
            }),
            "component",
            Zt,
            57,
            8,
            { componentTag: "AttributesTab" }
          );
        }, k = (x) => {
          C(
            () => Nt(x, {
              get actor() {
                return s(n);
              }
            }),
            "component",
            Zt,
            59,
            8,
            { componentTag: "CrewTab" }
          );
        }, E = (x) => {
          C(
            () => Sn(x, {
              get actor() {
                return s(n);
              }
            }),
            "component",
            Zt,
            61,
            8,
            { componentTag: "BiographyTab" }
          );
        };
        C(
          () => U(_, (x) => {
            A(s(r), "attributes") ? x(b) : A(s(r), "crew") ? x(k, 1) : A(s(r), "biography") && x(E, 2);
          }),
          "if",
          Zt,
          56,
          6
        );
      }
      F(p, d);
    }),
    "key",
    Zt,
    48,
    0
  ), F(t, o), pe(l);
}
var Ra;
class Js extends foundry.applications.api.DocumentSheetV2 {
  constructor() {
    super(...arguments);
    re(this, Ra, null);
  }
  async _renderHTML(a, n) {
    const r = document.createElement("div");
    return r.classList.add("svelte-mount"), r;
  }
  _replaceHTML(a, n, r) {
    super._replaceHTML(a, n, r), y(this, Ra) || ae(this, Ra, vr(Zt, {
      target: n,
      props: { document: this.document, sheet: this }
    }));
  }
  async close(a) {
    return y(this, Ra) && (fr(y(this, Ra)), ae(this, Ra, null)), super.close(a);
  }
}
Ra = new WeakMap(), ct(Js, "DEFAULT_OPTIONS", {
  classes: ["besm", "actor-sheet", "vehicle-sheet"],
  position: { width: 700, height: 500 },
  window: { resizable: !0 }
});
Ht[T] = "src/components/sheets/MechaSheet.svelte";
var Lu = P(/* @__PURE__ */ N('<div class="flex h-full bg-slate-900 text-slate-100"><!> <div class="flex-1 flex flex-col overflow-hidden"><!> <div class="flex-1 overflow-y-auto"><!></div></div></div>'), Ht[T], [[51, 0, [[54, 2, [[57, 4]]]]]]);
function Ht(t, e) {
  he(new.target), fe(e, !0, Ht);
  let a = L(/* @__PURE__ */ ve(0), "version"), n = L(
    /* @__PURE__ */ J(() => (s(a), e.document)),
    "actor"
  ), r = L(/* @__PURE__ */ ve("attributes"), "activeTab");
  const i = [
    { id: "attributes", label: "Attributes" },
    { id: "crew", label: "Crew" },
    { id: "combat", label: "Combat" },
    { id: "biography", label: "Biography" }
  ];
  ye(() => {
    const p = Hooks.on("updateActor", (d) => {
      A(d.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("updateActor", p);
  }), ye(() => {
    const p = Hooks.on("createItem", (d) => {
      var f;
      A((f = d.parent) == null ? void 0 : f.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("createItem", p);
  }), ye(() => {
    const p = Hooks.on("updateItem", (d) => {
      var f;
      A((f = d.parent) == null ? void 0 : f.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("updateItem", p);
  }), ye(() => {
    const p = Hooks.on("deleteItem", (d) => {
      var f;
      A((f = d.parent) == null ? void 0 : f.id, e.document.id) && Ce(a);
    });
    return () => Hooks.off("deleteItem", p);
  });
  var l = { ...ge() }, o = Ee(), c = be(o);
  return C(
    () => Hr(c, () => s(a), (p) => {
      var d = Lu(), f = m(d);
      C(
        () => je(f, {
          get actor() {
            return s(n);
          },
          showSP: !1,
          showEP: !1,
          showCV: !0,
          showPilot: !0,
          statsToShow: ["body"]
        }),
        "component",
        Ht,
        52,
        2,
        { componentTag: "ActorSidebar" }
      );
      var u = v(f, 2), g = m(u);
      C(
        () => Ma(g, {
          get tabs() {
            return i;
          },
          get activeTab() {
            return s(r);
          },
          onSelect: (M) => _e(r, M, !0)
        }),
        "component",
        Ht,
        55,
        4,
        { componentTag: "TabBar" }
      );
      var h = v(g, 2), _ = m(h);
      {
        var b = (M) => {
          C(
            () => qe(M, {
              get actor() {
                return s(n);
              }
            }),
            "component",
            Ht,
            59,
            8,
            { componentTag: "AttributesTab" }
          );
        }, k = (M) => {
          C(
            () => Nt(M, {
              get actor() {
                return s(n);
              }
            }),
            "component",
            Ht,
            61,
            8,
            { componentTag: "CrewTab" }
          );
        }, E = (M) => {
          C(
            () => we(M, {
              get actor() {
                return s(n);
              }
            }),
            "component",
            Ht,
            63,
            8,
            { componentTag: "CombatTab" }
          );
        }, x = (M) => {
          C(
            () => Sn(M, {
              get actor() {
                return s(n);
              }
            }),
            "component",
            Ht,
            65,
            8,
            { componentTag: "BiographyTab" }
          );
        };
        C(
          () => U(_, (M) => {
            A(s(r), "attributes") ? M(b) : A(s(r), "crew") ? M(k, 1) : A(s(r), "combat") ? M(E, 2) : A(s(r), "biography") && M(x, 3);
          }),
          "if",
          Ht,
          58,
          6
        );
      }
      F(p, d);
    }),
    "key",
    Ht,
    50,
    0
  ), F(t, o), pe(l);
}
var Ba;
class Zs extends foundry.applications.api.DocumentSheetV2 {
  constructor() {
    super(...arguments);
    re(this, Ba, null);
  }
  async _renderHTML(a, n) {
    const r = document.createElement("div");
    return r.classList.add("svelte-mount"), r;
  }
  _replaceHTML(a, n, r) {
    super._replaceHTML(a, n, r), y(this, Ba) || ae(this, Ba, vr(Ht, {
      target: n,
      props: { document: this.document, sheet: this }
    }));
  }
  async close(a) {
    return y(this, Ba) && (fr(y(this, Ba)), ae(this, Ba, null)), super.close(a);
  }
}
Ba = new WeakMap(), ct(Zs, "DEFAULT_OPTIONS", {
  classes: ["besm", "actor-sheet", "mecha-sheet"],
  position: { width: 700, height: 550 },
  window: { resizable: !0 }
});
function zr(t) {
  return t <= 0 ? 0 : t <= 12 ? t * 2 : 24 + (t - 12) * 4;
}
function Qt(t) {
  return t.mode === "missing" ? null : t.mode === "zero" ? 0 : t.value;
}
function Du(t, e, a, n) {
  const r = e.reduce((o, c) => o + c.levels, 0), i = a.reduce((o, c) => o + c.levels, 0);
  return Math.max(n ? -1 : 0, t - r + i);
}
function Iu(t, e) {
  return t * e;
}
function Ti(t, e, a) {
  const n = [t, e, a].filter((r) => r !== null);
  return n.length === 0 ? 0 : Math.floor(n.reduce((r, i) => r + i, 0) / n.length);
}
function Gr(t, e, a, n) {
  const r = a * 10, i = n * 10;
  return t !== null && e !== null ? { hp: Math.max(0, (t + e) * 5 + r - i), applicable: !0 } : t === null && e !== null ? { hp: Math.max(0, e * 10 + r - i), applicable: !0 } : e === null && t !== null ? { hp: Math.max(0, t * 10 + r - i), applicable: !0 } : { hp: 0, applicable: !1 };
}
function Xs(t, e, a) {
  const n = a * 10;
  return t !== null && e !== null ? { ep: (t + e) * 5 + n, applicable: !0 } : t === null && e !== null ? { ep: e * 10 + n, applicable: !0 } : e === null && t !== null ? { ep: t * 10 + n, applicable: !0 } : { ep: 0, applicable: !1 };
}
function Qs(t, e, a) {
  if (!e) return 0;
  const n = Math.floor(t / 5), r = a * 10, i = Math.floor(t / 2);
  return Math.min(i, n + r);
}
function Ci(t, e) {
  return {
    base: 5 + t,
    melee: 5 + t + e
  };
}
function $s(t) {
  if (t === null)
    return {
      walkSpeed: 0,
      jogSpeed: 0,
      runSpeed: 0,
      sprintSpeed: 0,
      swimSpeed: 0,
      jumpDistanceStationary: 0,
      jumpDistanceMoving: 0
    };
  const e = t * 4;
  return {
    walkSpeed: t * 1,
    jogSpeed: Math.round(t * 1.5),
    runSpeed: t * 2,
    sprintSpeed: e,
    swimSpeed: Math.round(t * 0.5),
    jumpDistanceStationary: Math.floor(t / 4),
    jumpDistanceMoving: Math.floor(e / 4)
  };
}
function el(t, e, a, n) {
  return t === null || e === null ? null : t + e + a * 2 - n * 2;
}
function tl(t, e) {
  return t === null || e === null ? null : Math.floor((t + e) / 2);
}
const Ru = {
  subhuman: { cpMax: 24, maxStat: 5, maxAttrLevel: 2, cvMin: 1, cvMax: 6, hpMin: 10, hpMax: 40, dmgMin: 2, dmgMax: 4 },
  human: { cpMax: 49, maxStat: 7, maxAttrLevel: 3, cvMin: 2, cvMax: 7, hpMin: 30, hpMax: 60, dmgMin: 3, dmgMax: 6 },
  adventurer: { cpMax: 74, maxStat: 9, maxAttrLevel: 4, cvMin: 3, cvMax: 8, hpMin: 40, hpMax: 80, dmgMin: 4, dmgMax: 8 },
  heroic: { cpMax: 99, maxStat: 10, maxAttrLevel: 5, cvMin: 4, cvMax: 9, hpMin: 50, hpMax: 100, dmgMin: 4, dmgMax: 9 },
  mythical: { cpMax: 149, maxStat: 12, maxAttrLevel: 6, cvMin: 5, cvMax: 10, hpMin: 60, hpMax: 120, dmgMin: 5, dmgMax: 10 },
  superhuman: { cpMax: 199, maxStat: null, maxAttrLevel: 8, cvMin: 6, cvMax: 12, hpMin: 70, hpMax: 140, dmgMin: 5, dmgMax: 11 },
  superpowered: { cpMax: 249, maxStat: null, maxAttrLevel: 9, cvMin: 7, cvMax: null, hpMin: 80, hpMax: 160, dmgMin: 6, dmgMax: 12 },
  godlike: { cpMax: null, maxStat: null, maxAttrLevel: null, cvMin: 8, cvMax: null, hpMin: 100, hpMax: null, dmgMin: 6, dmgMax: null }
};
function al(t, e, a, n) {
  const r = Ru[t];
  if (!r) return { warnings: [], valid: !0 };
  const i = [];
  if (r.maxStat)
    for (const [l, o] of Object.entries(e)) {
      if (o.mode === "missing") continue;
      const c = o.mode === "zero" ? 0 : o.value;
      c > r.maxStat && i.push(`${l} (${c}) exceeds recommended stat max of ${r.maxStat}`);
    }
  if (r.maxAttrLevel)
    for (const l of a)
      l.type === "attribute" && (l.system.isBenchmarkException || l.system.effectiveLevel > r.maxAttrLevel && i.push(`${l.name} effective level (${l.system.effectiveLevel}) exceeds recommended max of ${r.maxAttrLevel}`));
  return r.cvMin && n.acv < r.cvMin && i.push(`ACV (${n.acv}) is below recommended minimum of ${r.cvMin}`), r.cvMax && n.acv > r.cvMax && i.push(`ACV (${n.acv}) exceeds recommended maximum of ${r.cvMax}`), r.hpMin && n.hp < r.hpMin && i.push(`HP (${n.hp}) is below recommended minimum of ${r.hpMin}`), r.hpMax && n.hp > r.hpMax && i.push(`HP (${n.hp}) exceeds recommended maximum of ${r.hpMax}`), { warnings: i, valid: i.length === 0 };
}
const Bu = {
  framework: 1,
  adventure: 2,
  genre: 3
};
function Hu(t, e, a, n) {
  let r = e, i = !0;
  const l = a[t];
  l && (l.costClass && (r = l.costClass), l.available !== void 0 && (i = l.available));
  const o = n[t];
  return o && (o.costClass && (r = o.costClass), o.available !== void 0 && (i = o.available)), {
    costPerRank: Bu[r] ?? 1,
    available: i
  };
}
function Ou(t) {
  return t * 10;
}
function ju(t) {
  return t.filter((e) => !e.isFlavor).reduce((e, a) => {
    const n = a.rank * a.resolvedCostPerRank, r = a.specialisations.filter((i) => !i.isFree).reduce((i, l) => i + l.spCost, 0);
    return e + n + r;
  }, 0);
}
class zu extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const e = foundry.data.fields;
    return {
      biography: new e.HTMLField(),
      genre: new e.StringField({ initial: "" }),
      powerLevel: new e.StringField({ initial: "" }),
      cpBase: new e.NumberField({ integer: !0, initial: 50 }),
      cpTotal: new e.NumberField({ integer: !0, initial: 0 }),
      cpSpent: new e.NumberField({ integer: !0, initial: 0 }),
      cpRemaining: new e.NumberField({ integer: !0, initial: 0 }),
      stats: new e.SchemaField({
        body: new e.SchemaField({
          value: new e.NumberField({ integer: !0, initial: 0, min: 0 }),
          cpCost: new e.NumberField({ integer: !0, initial: 0 }),
          mode: new e.StringField({
            initial: "normal",
            choices: ["normal", "zero", "missing"]
          })
        }),
        mind: new e.SchemaField({
          value: new e.NumberField({ integer: !0, initial: 0, min: 0 }),
          cpCost: new e.NumberField({ integer: !0, initial: 0 }),
          mode: new e.StringField({
            initial: "normal",
            choices: ["normal", "zero", "missing"]
          })
        }),
        soul: new e.SchemaField({
          value: new e.NumberField({ integer: !0, initial: 0, min: 0 }),
          cpCost: new e.NumberField({ integer: !0, initial: 0 }),
          mode: new e.StringField({
            initial: "normal",
            choices: ["normal", "zero", "missing"]
          })
        })
      }),
      derived: new e.SchemaField({
        hp: new e.NumberField({ integer: !0, initial: 0 }),
        hpMax: new e.NumberField({ integer: !0, initial: 0 }),
        hpApplicable: new e.BooleanField({ initial: !0 }),
        currentHp: new e.NumberField({ integer: !0, initial: 0 }),
        ep: new e.NumberField({ integer: !0, initial: 0 }),
        epMax: new e.NumberField({ integer: !0, initial: 0 }),
        epApplicable: new e.BooleanField({ initial: !0 }),
        currentEp: new e.NumberField({ integer: !0, initial: 0 }),
        hpAsEp: new e.BooleanField({ initial: !1 }),
        epAsHp: new e.BooleanField({ initial: !1 }),
        sv: new e.NumberField({ integer: !0, initial: 0 }),
        acv: new e.NumberField({ integer: !0, initial: 0 }),
        dcv: new e.NumberField({ integer: !0, initial: 0 }),
        baseCv: new e.NumberField({ integer: !0, initial: 0 }),
        initiative: new e.NumberField({ integer: !0, initial: 0 }),
        damageMultiplier: new e.NumberField({ integer: !0, initial: 5 }),
        meleeDamageMultiplier: new e.NumberField({ integer: !0, initial: 5 }),
        ar: new e.NumberField({ integer: !0, initial: 0 }),
        walkSpeed: new e.NumberField({ initial: 0 }),
        jogSpeed: new e.NumberField({ initial: 0 }),
        runSpeed: new e.NumberField({ initial: 0 }),
        sprintSpeed: new e.NumberField({ initial: 0 }),
        swimSpeed: new e.NumberField({ initial: 0 }),
        jumpDistanceStationary: new e.NumberField({ initial: 0 }),
        jumpDistanceMoving: new e.NumberField({ initial: 0 }),
        sanityPoints: new e.NumberField({ integer: !0, initial: 0 }),
        sanityMax: new e.NumberField({ integer: !0, initial: 0 }),
        currentSanity: new e.NumberField({ integer: !0, initial: 0 }),
        socv: new e.NumberField({ integer: !0, initial: 0 }),
        societyPoints: new e.NumberField({ integer: !0, initial: 0 }),
        societyPointsMax: new e.NumberField({ integer: !0, initial: 0 }),
        currentSocietyPoints: new e.NumberField({ integer: !0, initial: 0 })
      }),
      skillMode: new e.StringField({
        initial: "pointbuy",
        choices: ["pointbuy", "group"]
      }),
      spPool: new e.NumberField({ integer: !0, initial: 0 }),
      spSpent: new e.NumberField({ integer: !0, initial: 0 }),
      spRemaining: new e.NumberField({ integer: !0, initial: 0 }),
      appliedTemplates: new e.ArrayField(new e.ObjectField()),
      advancement: new e.SchemaField({
        sessionLog: new e.ArrayField(new e.ObjectField()),
        totalEarned: new e.NumberField({ integer: !0, initial: 0 }),
        totalSpent: new e.NumberField({ integer: !0, initial: 0 })
      }),
      benchmarkWarnings: new e.ArrayField(new e.StringField()),
      benchmarkValid: new e.BooleanField({ initial: !0 }),
      notes: new e.HTMLField()
    };
  }
  prepareDerivedData() {
    const e = this.parent.items, a = Qt(this.stats.body), n = Qt(this.stats.mind), r = Qt(this.stats.soul);
    for (const w of Object.values(this.stats))
      w.cpCost = w.mode === "missing" ? 0 : zr(w.value);
    const i = Object.values(this.stats).reduce((w, R) => w + R.cpCost, 0), l = e.filter((w) => w.type === "attribute").reduce((w, R) => w + R.system.totalCost, 0), o = e.filter((w) => w.type === "defect").reduce((w, R) => w + R.system.cpGranted, 0);
    this.cpTotal = this.cpBase + o, this.cpSpent = i + l, this.cpRemaining = this.cpTotal - this.cpSpent;
    try {
      if (game.settings.get("besm", "skillMode") === "pointbuy") {
        const w = e.find(
          (R) => R.type === "attribute" && R.system.isSkillsAttribute
        );
        if (w) {
          const R = Ou(w.system.purchasedLevel), O = [...e].filter((z) => z.type === "skill"), V = ju(O.map((z) => z.system));
          this.spPool = R, this.spSpent = V, this.spRemaining = R - V;
        }
      }
    } catch {
    }
    this.derived.baseCv = Ti(a, n, r);
    const c = (w) => e.some(
      (R) => R.type === "attribute" && ((R.system.selectedOptions ?? []).some((O) => O.toLowerCase().includes(w.toLowerCase())) || R.name.toLowerCase().includes(w.toLowerCase()))
    ), p = e.find(
      (w) => w.type === "attribute" && w.name === "Attack Mastery"
    );
    this.derived.acv = this.derived.baseCv + ((p == null ? void 0 : p.system.effectiveLevel) ?? 0);
    const d = e.find(
      (w) => w.type === "attribute" && w.name === "Defence Mastery"
    );
    this.derived.dcv = this.derived.baseCv + ((d == null ? void 0 : d.system.effectiveLevel) ?? 0);
    const f = c("Lightning Reflexes");
    this.derived.initiative = this.derived.acv + (f ? 3 : 0);
    const u = e.find((w) => w.type === "attribute" && w.name === "Tough"), g = e.find((w) => w.type === "defect" && w.name === "Fragile"), h = Gr(a, r, (u == null ? void 0 : u.system.effectiveLevel) ?? 0, (g == null ? void 0 : g.system.rankLevel) ?? 0);
    this.derived.hp = h.hp, this.derived.hpMax = h.hp, this.derived.hpApplicable = h.applicable, (this.derived.currentHp === 0 || this.derived.currentHp > h.hp) && (this.derived.currentHp = h.hp);
    const _ = e.find((w) => w.type === "attribute" && w.name === "Energised"), b = Xs(n, r, (_ == null ? void 0 : _.system.effectiveLevel) ?? 0);
    this.derived.ep = b.ep, this.derived.epMax = b.ep, this.derived.epApplicable = b.applicable, (this.derived.currentEp === 0 || this.derived.currentEp > b.ep) && (this.derived.currentEp = b.ep);
    const k = c("Hardboiled") ? 1 : 0;
    this.derived.sv = Qs(this.derived.hp, this.derived.hpApplicable, k);
    const E = e.find((w) => w.type === "attribute" && w.name === "Massive Damage"), x = e.find((w) => w.type === "attribute" && w.name === "Superstrength"), M = Ci(
      (E == null ? void 0 : E.system.effectiveLevel) ?? 0,
      (x == null ? void 0 : x.system.effectiveLevel) ?? 0
    );
    this.derived.damageMultiplier = M.base, this.derived.meleeDamageMultiplier = M.melee, this.derived.ar = e.filter((w) => w.type === "attribute" && ["Armour", "Force Field"].includes(w.name)).reduce((w, R) => w + R.system.effectiveLevel, 0) * 5;
    const S = $s(a);
    Object.assign(this.derived, S);
    try {
      if (game.settings.get("besm", "sanityEnabled")) {
        const w = e.find((V) => V.type === "attribute" && V.name === "Unassailable"), R = e.find((V) => V.type === "defect" && V.name === "Unsettled"), O = el(n, r, (w == null ? void 0 : w.system.effectiveLevel) ?? 0, (R == null ? void 0 : R.system.rankLevel) ?? 0);
        O !== null && (this.derived.sanityPoints = O, this.derived.sanityMax = O, (this.derived.currentSanity === 0 || this.derived.currentSanity > O) && (this.derived.currentSanity = O));
      }
    } catch {
    }
    try {
      if (game.settings.get("besm", "socialCombatEnabled")) {
        const w = tl(n, r);
        w !== null && (this.derived.socv = w, this.derived.societyPoints = w, this.derived.societyPointsMax = w, (this.derived.currentSocietyPoints === 0 || this.derived.currentSocietyPoints > w) && (this.derived.currentSocietyPoints = w));
      }
    } catch {
    }
    try {
      if (game.settings.get("besm", "enforceBenchmarks")) {
        const w = this.powerLevel || game.settings.get("besm", "powerLevel"), R = al(w, this.stats, [...e], this.derived);
        this.benchmarkWarnings = R.warnings, this.benchmarkValid = R.valid;
      } else
        this.benchmarkWarnings = [], this.benchmarkValid = !0;
    } catch {
      this.benchmarkWarnings = [], this.benchmarkValid = !0;
    }
  }
}
class Gu extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const e = foundry.data.fields;
    return {
      biography: new e.HTMLField(),
      genre: new e.StringField({ initial: "" }),
      powerLevel: new e.StringField({ initial: "" }),
      cpBase: new e.NumberField({ integer: !0, initial: 50 }),
      cpTotal: new e.NumberField({ integer: !0, initial: 0 }),
      cpSpent: new e.NumberField({ integer: !0, initial: 0 }),
      cpRemaining: new e.NumberField({ integer: !0, initial: 0 }),
      stats: new e.SchemaField({
        body: new e.SchemaField({
          value: new e.NumberField({ integer: !0, initial: 0, min: 0 }),
          cpCost: new e.NumberField({ integer: !0, initial: 0 }),
          mode: new e.StringField({
            initial: "normal",
            choices: ["normal", "zero", "missing"]
          })
        }),
        mind: new e.SchemaField({
          value: new e.NumberField({ integer: !0, initial: 0, min: 0 }),
          cpCost: new e.NumberField({ integer: !0, initial: 0 }),
          mode: new e.StringField({
            initial: "normal",
            choices: ["normal", "zero", "missing"]
          })
        }),
        soul: new e.SchemaField({
          value: new e.NumberField({ integer: !0, initial: 0, min: 0 }),
          cpCost: new e.NumberField({ integer: !0, initial: 0 }),
          mode: new e.StringField({
            initial: "normal",
            choices: ["normal", "zero", "missing"]
          })
        })
      }),
      derived: new e.SchemaField({
        hp: new e.NumberField({ integer: !0, initial: 0 }),
        hpMax: new e.NumberField({ integer: !0, initial: 0 }),
        hpApplicable: new e.BooleanField({ initial: !0 }),
        currentHp: new e.NumberField({ integer: !0, initial: 0 }),
        ep: new e.NumberField({ integer: !0, initial: 0 }),
        epMax: new e.NumberField({ integer: !0, initial: 0 }),
        epApplicable: new e.BooleanField({ initial: !0 }),
        currentEp: new e.NumberField({ integer: !0, initial: 0 }),
        hpAsEp: new e.BooleanField({ initial: !1 }),
        epAsHp: new e.BooleanField({ initial: !1 }),
        sv: new e.NumberField({ integer: !0, initial: 0 }),
        acv: new e.NumberField({ integer: !0, initial: 0 }),
        dcv: new e.NumberField({ integer: !0, initial: 0 }),
        baseCv: new e.NumberField({ integer: !0, initial: 0 }),
        initiative: new e.NumberField({ integer: !0, initial: 0 }),
        damageMultiplier: new e.NumberField({ integer: !0, initial: 5 }),
        meleeDamageMultiplier: new e.NumberField({ integer: !0, initial: 5 }),
        ar: new e.NumberField({ integer: !0, initial: 0 }),
        walkSpeed: new e.NumberField({ initial: 0 }),
        jogSpeed: new e.NumberField({ initial: 0 }),
        runSpeed: new e.NumberField({ initial: 0 }),
        sprintSpeed: new e.NumberField({ initial: 0 }),
        swimSpeed: new e.NumberField({ initial: 0 }),
        jumpDistanceStationary: new e.NumberField({ initial: 0 }),
        jumpDistanceMoving: new e.NumberField({ initial: 0 }),
        sanityPoints: new e.NumberField({ integer: !0, initial: 0 }),
        sanityMax: new e.NumberField({ integer: !0, initial: 0 }),
        currentSanity: new e.NumberField({ integer: !0, initial: 0 }),
        socv: new e.NumberField({ integer: !0, initial: 0 }),
        societyPoints: new e.NumberField({ integer: !0, initial: 0 }),
        societyPointsMax: new e.NumberField({ integer: !0, initial: 0 }),
        currentSocietyPoints: new e.NumberField({ integer: !0, initial: 0 })
      }),
      notes: new e.HTMLField()
    };
  }
  prepareDerivedData() {
    const e = this.parent.items, a = Qt(this.stats.body), n = Qt(this.stats.mind), r = Qt(this.stats.soul);
    for (const S of Object.values(this.stats))
      S.cpCost = S.mode === "missing" ? 0 : zr(S.value);
    const i = Object.values(this.stats).reduce((S, w) => S + w.cpCost, 0), l = e.filter((S) => S.type === "attribute").reduce((S, w) => S + w.system.totalCost, 0), o = e.filter((S) => S.type === "defect").reduce((S, w) => S + w.system.cpGranted, 0);
    this.cpTotal = this.cpBase + o, this.cpSpent = i + l, this.cpRemaining = this.cpTotal - this.cpSpent, this.derived.baseCv = Ti(a, n, r);
    const c = (S) => e.some(
      (w) => w.type === "attribute" && ((w.system.selectedOptions ?? []).some((R) => R.toLowerCase().includes(S.toLowerCase())) || w.name.toLowerCase().includes(S.toLowerCase()))
    ), p = e.find((S) => S.type === "attribute" && S.name === "Attack Mastery");
    this.derived.acv = this.derived.baseCv + ((p == null ? void 0 : p.system.effectiveLevel) ?? 0);
    const d = e.find((S) => S.type === "attribute" && S.name === "Defence Mastery");
    this.derived.dcv = this.derived.baseCv + ((d == null ? void 0 : d.system.effectiveLevel) ?? 0);
    const f = c("Lightning Reflexes");
    this.derived.initiative = this.derived.acv + (f ? 3 : 0);
    const u = e.find((S) => S.type === "attribute" && S.name === "Tough"), g = e.find((S) => S.type === "defect" && S.name === "Fragile"), h = Gr(a, r, (u == null ? void 0 : u.system.effectiveLevel) ?? 0, (g == null ? void 0 : g.system.rankLevel) ?? 0);
    this.derived.hp = h.hp, this.derived.hpMax = h.hp, this.derived.hpApplicable = h.applicable, (this.derived.currentHp === 0 || this.derived.currentHp > h.hp) && (this.derived.currentHp = h.hp);
    const _ = e.find((S) => S.type === "attribute" && S.name === "Energised"), b = Xs(n, r, (_ == null ? void 0 : _.system.effectiveLevel) ?? 0);
    this.derived.ep = b.ep, this.derived.epMax = b.ep, this.derived.epApplicable = b.applicable, (this.derived.currentEp === 0 || this.derived.currentEp > b.ep) && (this.derived.currentEp = b.ep);
    const k = c("Hardboiled") ? 1 : 0;
    this.derived.sv = Qs(this.derived.hp, this.derived.hpApplicable, k);
    const E = e.find((S) => S.type === "attribute" && S.name === "Massive Damage"), x = e.find((S) => S.type === "attribute" && S.name === "Superstrength"), M = Ci((E == null ? void 0 : E.system.effectiveLevel) ?? 0, (x == null ? void 0 : x.system.effectiveLevel) ?? 0);
    this.derived.damageMultiplier = M.base, this.derived.meleeDamageMultiplier = M.melee, this.derived.ar = e.filter((S) => S.type === "attribute" && ["Armour", "Force Field"].includes(S.name)).reduce((S, w) => S + w.system.effectiveLevel, 0) * 5, Object.assign(this.derived, $s(a));
    try {
      if (game.settings.get("besm", "sanityEnabled")) {
        const S = e.find((O) => O.type === "attribute" && O.name === "Unassailable"), w = e.find((O) => O.type === "defect" && O.name === "Unsettled"), R = el(n, r, (S == null ? void 0 : S.system.effectiveLevel) ?? 0, (w == null ? void 0 : w.system.rankLevel) ?? 0);
        R !== null && (this.derived.sanityPoints = R, this.derived.sanityMax = R, (this.derived.currentSanity === 0 || this.derived.currentSanity > R) && (this.derived.currentSanity = R));
      }
    } catch {
    }
    try {
      if (game.settings.get("besm", "socialCombatEnabled")) {
        const S = tl(n, r);
        S !== null && (this.derived.socv = S, this.derived.societyPoints = S, this.derived.societyPointsMax = S, (this.derived.currentSocietyPoints === 0 || this.derived.currentSocietyPoints > S) && (this.derived.currentSocietyPoints = S));
      }
    } catch {
    }
    try {
      if (game.settings.get("besm", "enforceBenchmarks")) {
        const S = this.powerLevel || game.settings.get("besm", "powerLevel"), w = al(S, this.stats, [...e], this.derived);
        this.benchmarkWarnings = w.warnings, this.benchmarkValid = w.valid;
      }
    } catch {
    }
  }
}
class Vu extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const e = foundry.data.fields;
    return {
      description: new e.HTMLField(),
      cpBase: new e.NumberField({ integer: !0, initial: 0 }),
      cpTotal: new e.NumberField({ integer: !0, initial: 0 }),
      cpSpent: new e.NumberField({ integer: !0, initial: 0 }),
      cpRemaining: new e.NumberField({ integer: !0, initial: 0 }),
      stats: new e.SchemaField({
        body: new e.SchemaField({
          value: new e.NumberField({ integer: !0, initial: 0, min: 0 }),
          cpCost: new e.NumberField({ integer: !0, initial: 0 }),
          mode: new e.StringField({
            initial: "normal",
            choices: ["normal", "zero", "missing"]
          })
        }),
        mind: new e.SchemaField({
          value: new e.NumberField({ integer: !0, initial: 0, min: 0 }),
          cpCost: new e.NumberField({ integer: !0, initial: 0 }),
          mode: new e.StringField({
            initial: "missing",
            choices: ["normal", "zero", "missing"]
          })
        }),
        soul: new e.SchemaField({
          value: new e.NumberField({ integer: !0, initial: 0, min: 0 }),
          cpCost: new e.NumberField({ integer: !0, initial: 0 }),
          mode: new e.StringField({
            initial: "missing",
            choices: ["normal", "zero", "missing"]
          })
        })
      }),
      derived: new e.SchemaField({
        hp: new e.NumberField({ integer: !0, initial: 0 }),
        hpMax: new e.NumberField({ integer: !0, initial: 0 }),
        hpApplicable: new e.BooleanField({ initial: !0 }),
        currentHp: new e.NumberField({ integer: !0, initial: 0 }),
        ar: new e.NumberField({ integer: !0, initial: 0 })
      }),
      crew: new e.ArrayField(
        new e.SchemaField({
          actorId: new e.StringField(),
          role: new e.StringField({ initial: "crew" })
        })
      ),
      passengerCapacity: new e.NumberField({ integer: !0, initial: 0 }),
      notes: new e.HTMLField()
    };
  }
  prepareDerivedData() {
    const e = this.parent.items;
    for (const d of Object.values(this.stats))
      d.cpCost = d.mode === "missing" ? 0 : zr(d.value);
    const a = Object.values(this.stats).reduce((d, f) => d + f.cpCost, 0), n = e.filter((d) => d.type === "attribute").reduce((d, f) => d + f.system.totalCost, 0), r = e.filter((d) => d.type === "defect").reduce((d, f) => d + f.system.cpGranted, 0);
    this.cpTotal = this.cpBase + r, this.cpSpent = a + n, this.cpRemaining = this.cpTotal - this.cpSpent;
    const i = Qt(this.stats.body), l = Qt(this.stats.soul), o = e.find((d) => d.type === "attribute" && d.name === "Tough"), c = e.find((d) => d.type === "defect" && d.name === "Fragile"), p = Gr(i, l, (o == null ? void 0 : o.system.effectiveLevel) ?? 0, (c == null ? void 0 : c.system.rankLevel) ?? 0);
    this.derived.hp = p.hp, this.derived.hpMax = p.hp, this.derived.hpApplicable = p.applicable, (this.derived.currentHp === 0 || this.derived.currentHp > p.hp) && (this.derived.currentHp = p.hp), this.derived.ar = e.filter((d) => d.type === "attribute" && ["Armour", "Force Field"].includes(d.name)).reduce((d, f) => d + f.system.effectiveLevel, 0) * 5;
  }
}
class Uu extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const e = foundry.data.fields;
    return {
      description: new e.HTMLField(),
      cpBase: new e.NumberField({ integer: !0, initial: 0 }),
      cpTotal: new e.NumberField({ integer: !0, initial: 0 }),
      cpSpent: new e.NumberField({ integer: !0, initial: 0 }),
      cpRemaining: new e.NumberField({ integer: !0, initial: 0 }),
      stats: new e.SchemaField({
        body: new e.SchemaField({
          value: new e.NumberField({ integer: !0, initial: 0, min: 0 }),
          cpCost: new e.NumberField({ integer: !0, initial: 0 }),
          mode: new e.StringField({
            initial: "normal",
            choices: ["normal", "zero", "missing"]
          })
        }),
        mind: new e.SchemaField({
          value: new e.NumberField({ integer: !0, initial: 0, min: 0 }),
          cpCost: new e.NumberField({ integer: !0, initial: 0 }),
          mode: new e.StringField({
            initial: "missing",
            choices: ["normal", "zero", "missing"]
          })
        }),
        soul: new e.SchemaField({
          value: new e.NumberField({ integer: !0, initial: 0, min: 0 }),
          cpCost: new e.NumberField({ integer: !0, initial: 0 }),
          mode: new e.StringField({
            initial: "missing",
            choices: ["normal", "zero", "missing"]
          })
        })
      }),
      derived: new e.SchemaField({
        hp: new e.NumberField({ integer: !0, initial: 0 }),
        hpMax: new e.NumberField({ integer: !0, initial: 0 }),
        hpApplicable: new e.BooleanField({ initial: !0 }),
        currentHp: new e.NumberField({ integer: !0, initial: 0 }),
        ar: new e.NumberField({ integer: !0, initial: 0 }),
        acv: new e.NumberField({ integer: !0, initial: 0 }),
        dcv: new e.NumberField({ integer: !0, initial: 0 }),
        baseCv: new e.NumberField({ integer: !0, initial: 0 }),
        damageMultiplier: new e.NumberField({ integer: !0, initial: 5 }),
        meleeDamageMultiplier: new e.NumberField({ integer: !0, initial: 5 })
      }),
      pilotId: new e.StringField({ initial: "" }),
      pilotBonus: new e.SchemaField({
        body: new e.NumberField({ integer: !0, initial: 0 }),
        mind: new e.NumberField({ integer: !0, initial: 0 }),
        soul: new e.NumberField({ integer: !0, initial: 0 })
      }),
      crew: new e.ArrayField(
        new e.SchemaField({
          actorId: new e.StringField(),
          role: new e.StringField({ initial: "crew" })
        })
      ),
      passengerCapacity: new e.NumberField({ integer: !0, initial: 0 }),
      notes: new e.HTMLField()
    };
  }
  prepareDerivedData() {
    const e = this.parent.items;
    for (const x of Object.values(this.stats))
      x.cpCost = x.mode === "missing" ? 0 : zr(x.value);
    const a = Object.values(this.stats).reduce((x, M) => x + M.cpCost, 0), n = e.filter((x) => x.type === "attribute").reduce((x, M) => x + M.system.totalCost, 0), r = e.filter((x) => x.type === "defect").reduce((x, M) => x + M.system.cpGranted, 0);
    this.cpTotal = this.cpBase + r, this.cpSpent = a + n, this.cpRemaining = this.cpTotal - this.cpSpent;
    const i = Qt(this.stats.body), l = Qt(this.stats.mind), o = Qt(this.stats.soul);
    let c = i, p = l, d = o;
    try {
      if (this.pilotId) {
        const x = game.actors.get(this.pilotId);
        if (x) {
          const M = x.system.stats.body.mode !== "missing" ? x.system.stats.body.value : null, S = x.system.stats.mind.mode !== "missing" ? x.system.stats.mind.value : null, w = x.system.stats.soul.mode !== "missing" ? x.system.stats.soul.value : null;
          this.pilotBonus.body = M ?? 0, this.pilotBonus.mind = S ?? 0, this.pilotBonus.soul = w ?? 0, c = (i ?? 0) + (M ?? 0), p = S, d = w;
        }
      }
    } catch {
    }
    this.derived.baseCv = Ti(c, p, d);
    const f = e.find((x) => x.type === "attribute" && x.name === "Attack Mastery");
    this.derived.acv = this.derived.baseCv + ((f == null ? void 0 : f.system.effectiveLevel) ?? 0);
    const u = e.find((x) => x.type === "attribute" && x.name === "Defence Mastery");
    this.derived.dcv = this.derived.baseCv + ((u == null ? void 0 : u.system.effectiveLevel) ?? 0);
    const g = e.find((x) => x.type === "attribute" && x.name === "Tough"), h = e.find((x) => x.type === "defect" && x.name === "Fragile"), _ = Gr(i, o, (g == null ? void 0 : g.system.effectiveLevel) ?? 0, (h == null ? void 0 : h.system.rankLevel) ?? 0);
    this.derived.hp = _.hp, this.derived.hpMax = _.hp, this.derived.hpApplicable = _.applicable, (this.derived.currentHp === 0 || this.derived.currentHp > _.hp) && (this.derived.currentHp = _.hp), this.derived.ar = e.filter((x) => x.type === "attribute" && ["Armour", "Force Field"].includes(x.name)).reduce((x, M) => x + M.system.effectiveLevel, 0) * 5;
    const b = e.find((x) => x.type === "attribute" && x.name === "Massive Damage"), k = e.find((x) => x.type === "attribute" && x.name === "Superstrength"), E = Ci((b == null ? void 0 : b.system.effectiveLevel) ?? 0, (k == null ? void 0 : k.system.effectiveLevel) ?? 0);
    this.derived.damageMultiplier = E.base, this.derived.meleeDamageMultiplier = E.melee;
  }
}
class qu extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const e = foundry.data.fields;
    return {
      description: new e.HTMLField(),
      source: new e.StringField({ initial: "BESM4e" }),
      baseCostPerLevel: new e.NumberField({ integer: !0, initial: 1 }),
      purchasedLevel: new e.NumberField({ integer: !0, initial: 1, min: 0 }),
      effectiveLevel: new e.NumberField({ integer: !0, initial: 1 }),
      totalCost: new e.NumberField({ integer: !0, initial: 0 }),
      enhancements: new e.ArrayField(
        new e.SchemaField({
          id: new e.StringField(),
          name: new e.StringField(),
          levels: new e.NumberField({ integer: !0, initial: 1 })
        })
      ),
      limiters: new e.ArrayField(
        new e.SchemaField({
          id: new e.StringField(),
          name: new e.StringField(),
          levels: new e.NumberField({ integer: !0, initial: 1 })
        })
      ),
      isWeapon: new e.BooleanField({ initial: !1 }),
      weaponOptions: new e.SchemaField({
        damage: new e.StringField({ initial: "" }),
        range: new e.StringField({ initial: "" }),
        accurate: new e.NumberField({ integer: !0, initial: 0 }),
        spreading: new e.BooleanField({ initial: !1 }),
        isMuscleAttack: new e.BooleanField({ initial: !1 })
      }),
      isSkillGroup: new e.BooleanField({ initial: !1 }),
      skillGroupCategory: new e.StringField({
        initial: null,
        nullable: !0,
        choices: ["background", "field", "action"]
      }),
      skillGroupType: new e.StringField({ initial: "" }),
      isSkillsAttribute: new e.BooleanField({ initial: !1 }),
      spPool: new e.NumberField({ integer: !0, initial: 0 }),
      spSpent: new e.NumberField({ integer: !0, initial: 0 }),
      spRemaining: new e.NumberField({ integer: !0, initial: 0 }),
      isBenchmarkException: new e.BooleanField({ initial: !1 }),
      isUnique: new e.BooleanField({ initial: !1 }),
      tier: new e.StringField({
        initial: null,
        nullable: !0,
        choices: ["lesser", "greater", "serious"]
      }),
      uniqueDescription: new e.HTMLField(),
      sourceTemplateId: new e.StringField({ initial: "" }),
      sourceTemplateName: new e.StringField({ initial: "" }),
      linkedActorId: new e.StringField({ initial: "" }),
      transformationHeal: new e.BooleanField({ initial: !1 }),
      selectedOptions: new e.ArrayField(
        new e.StringField(),
        { initial: [] }
      ),
      notes: new e.HTMLField()
    };
  }
  prepareDerivedData() {
    var e;
    if (this.effectiveLevel = Du(
      this.purchasedLevel,
      this.enhancements,
      this.limiters,
      this.isWeapon
    ), this.totalCost = Iu(this.baseCostPerLevel, this.purchasedLevel), this.linkedActorId && this.baseCostPerLevel === 0)
      try {
        const a = (e = game.actors) == null ? void 0 : e.get(this.linkedActorId);
        a && (this.totalCost = Math.ceil(a.system.cpSpent / 2));
      } catch {
      }
  }
}
class Wu extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const e = foundry.data.fields;
    return {
      description: new e.HTMLField(),
      source: new e.StringField({ initial: "BESM4e" }),
      levels: new e.NumberField({ integer: !0, initial: 1, min: 1 }),
      parentAttributeId: new e.StringField({ initial: "" })
    };
  }
}
class Yu extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const e = foundry.data.fields;
    return {
      description: new e.HTMLField(),
      source: new e.StringField({ initial: "BESM4e" }),
      levels: new e.NumberField({ integer: !0, initial: 1, min: 1 }),
      parentAttributeId: new e.StringField({ initial: "" })
    };
  }
}
class Ku extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const e = foundry.data.fields;
    return {
      description: new e.HTMLField(),
      source: new e.StringField({ initial: "BESM4e" }),
      cpGranted: new e.NumberField({ integer: !0, initial: 1 }),
      rankLevel: new e.NumberField({ integer: !0, initial: 1, min: 1 }),
      isUnique: new e.BooleanField({ initial: !1 }),
      tier: new e.StringField({
        initial: null,
        nullable: !0,
        choices: ["lesser", "greater", "serious"]
      }),
      uniqueDescription: new e.HTMLField(),
      sourceTemplateId: new e.StringField({ initial: "" }),
      sourceTemplateName: new e.StringField({ initial: "" })
    };
  }
}
class Ju extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const e = foundry.data.fields;
    return {
      description: new e.HTMLField(),
      category: new e.StringField({
        initial: "gear",
        choices: ["gear", "feature", "other"]
      }),
      isMechanical: new e.BooleanField({ initial: !1 }),
      budgetCost: new e.NumberField({ integer: !0, initial: 0 }),
      linkedAttributeId: new e.StringField({ initial: "" }),
      notes: new e.HTMLField()
    };
  }
}
class Zu extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const e = foundry.data.fields;
    return {
      description: new e.HTMLField(),
      source: new e.StringField({ initial: "BESM4e" }),
      group: new e.StringField({ initial: "" }),
      costClass: new e.StringField({
        initial: "framework",
        choices: ["framework", "adventure", "genre"]
      }),
      rank: new e.NumberField({ integer: !0, initial: 1, min: 0 }),
      resolvedCostPerRank: new e.NumberField({ integer: !0, initial: 1 }),
      totalSpCost: new e.NumberField({ integer: !0, initial: 0 }),
      isAvailable: new e.BooleanField({ initial: !0 }),
      isFlavor: new e.BooleanField({ initial: !1 }),
      linkedStat: new e.StringField({
        initial: "body",
        choices: ["body", "mind", "soul", "bodyMind", "bodySoul", "mindSoul", "avg"]
      }),
      isGeniusSkill: new e.BooleanField({ initial: !1 }),
      specialisations: new e.ArrayField(
        new e.SchemaField({
          name: new e.StringField({ initial: "" }),
          isFree: new e.BooleanField({ initial: !1 }),
          spCost: new e.NumberField({ integer: !0, initial: 0 })
        })
      ),
      sourceTemplateId: new e.StringField({ initial: "" }),
      sourceTemplateName: new e.StringField({ initial: "" })
    };
  }
  prepareDerivedData() {
    const e = {};
    let a = {};
    try {
      a = game.settings.get("besm", "worldSkillOverrides") ?? {};
    } catch {
    }
    const n = Hu(
      this.parent.name,
      this.costClass,
      e,
      a
    );
    this.resolvedCostPerRank = this.isFlavor ? 0 : n.costPerRank, this.isAvailable = n.available;
    const r = this.rank * this.resolvedCostPerRank, i = this.specialisations.filter((l) => !l.isFree).reduce((l, o) => l + o.spCost, 0);
    this.totalSpCost = r + i;
  }
}
class Xu extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const e = foundry.data.fields;
    return {
      templateType: new e.StringField({
        initial: "race",
        choices: ["race", "class", "size", "bundle", "powerpack"]
      }),
      tradition: new e.StringField({ initial: "" }),
      description: new e.HTMLField(),
      pointTotal: new e.NumberField({ integer: !0, initial: 0 }),
      sizeRank: new e.NumberField({ integer: !0, initial: 0, nullable: !0 }),
      statModifiers: new e.SchemaField({
        body: new e.NumberField({ integer: !0, initial: 0 }),
        mind: new e.NumberField({ integer: !0, initial: 0 }),
        soul: new e.NumberField({ integer: !0, initial: 0 })
      }),
      entries: new e.ArrayField(new e.ObjectField())
    };
  }
}
function Qu() {
  const t = (e, a) => game.settings.register("besm", e, {
    scope: "world",
    config: !0,
    ...a
  });
  t("skillMode", {
    name: "Skill Mode",
    hint: "Point Buy uses individual skills with SP costs. Skill Groups uses attribute-based skill groups with CP costs.",
    type: String,
    default: "pointbuy",
    choices: {
      pointbuy: "Point Buy",
      group: "Skill Groups"
    }
  }), t("powerLevel", {
    name: "Power Level",
    hint: "Sets benchmark recommendations for stat and attribute caps.",
    type: String,
    default: "adventurer",
    choices: {
      subhuman: "Sub-Human (0-24 CP)",
      human: "Human (25-49 CP)",
      adventurer: "Adventurer (50-74 CP)",
      heroic: "Heroic (75-99 CP)",
      mythical: "Mythical (100-149 CP)",
      superhuman: "Superhuman (150-199 CP)",
      superpowered: "Superpowered (200-249 CP)",
      godlike: "Godlike (250+ CP)"
    }
  }), t("cpBase", {
    name: "Base CP",
    hint: "Starting Character Points for new characters. Set within the power level range.",
    type: Number,
    default: 50
  }), t("enforceBenchmarks", {
    name: "Enforce Benchmarks",
    hint: "Show warnings when characters exceed power level benchmark recommendations.",
    type: Boolean,
    default: !0
  }), t("benchmarkWarningsOnly", {
    name: "Benchmark Warnings Only",
    hint: "When enabled, benchmarks are advisory warnings. When disabled, benchmarks are hard blocks (not recommended).",
    type: Boolean,
    default: !0
  }), t("sanityEnabled", {
    name: "Enable Sanity Points",
    hint: "Adds Sanity Points derived value for horror/occult genres.",
    type: Boolean,
    default: !1
  }), t("socialCombatEnabled", {
    name: "Enable Social Combat",
    hint: "Adds Social Combat Value (SoCV) and Society Points.",
    type: Boolean,
    default: !1
  }), t("trackMovement", {
    name: "Track Movement",
    hint: "Shows movement speed derived values on the character sheet.",
    type: Boolean,
    default: !1
  }), t("allowStatsAbove12", {
    name: "Allow Stats Above 12",
    hint: "When enabled, stats above 12 cost 4 CP per point instead of 2 CP.",
    type: Boolean,
    default: !1
  }), t("allowGeniusSkills", {
    name: "Allow Genius Skills",
    hint: "When enabled, skill rank cap lifts from 6 to the Genius Skill Max Rank.",
    type: Boolean,
    default: !1
  }), t("geniusSkillMaxRank", {
    name: "Genius Skill Max Rank",
    hint: "Maximum rank for Genius Skills when enabled.",
    type: Number,
    default: 12
  }), t("genreTemplate", {
    name: "Genre Template",
    hint: "Active genre template. Affects skill costs and availability.",
    type: String,
    default: "universal"
  }), t("initiativeMode", {
    name: "Initiative Mode",
    hint: "ACV + 2d6 rolls initiative with dice. CV Static uses ACV directly.",
    type: String,
    default: "cv_plus_2d6",
    choices: {
      cv_plus_2d6: "ACV + 2d6",
      cv_static: "CV (Static)"
    }
  }), t("gearBudgetPerLevel", {
    name: "Gear Budget Per Level",
    hint: "Budget points granted per effective level of the Gear attribute.",
    type: Number,
    default: 5
  }), t("worldSkillOverrides", {
    name: "World Skill Overrides",
    hint: "GM overrides for skill costs and availability (Layer 3).",
    type: Object,
    default: {},
    config: !1
  });
}
function $u() {
  Hooks.on("createActor", async (t) => {
    if (t.type !== "character" || t.folder) return;
    const e = await Folder.create({
      name: t.name,
      type: "Actor",
      color: "#555555"
    });
    await t.update({ folder: e.id });
  }), Hooks.on("updateActor", async (t, e) => {
    if (!e.name || !t.folder) return;
    const a = game.folders.get(t.folder);
    if (!a) return;
    game.actors.filter((i) => i.folder === t.folder).some((i) => i.id === t.id && i.type === "character") && a.name !== e.name && await a.update({ name: e.name });
  });
}
const ev = [
  {
    id: "stunned",
    name: "Stunned",
    icon: "icons/svg/daze.svg"
  },
  {
    id: "prone",
    name: "Prone",
    icon: "icons/svg/falling.svg"
  },
  {
    id: "unconscious",
    name: "Unconscious",
    icon: "icons/svg/unconscious.svg"
  },
  {
    id: "dead",
    name: "Dead",
    icon: "icons/svg/skull.svg"
  },
  {
    id: "energyDepleted",
    name: "Energy Depleted",
    icon: "icons/svg/lightning.svg"
  },
  {
    id: "burning",
    name: "Burning",
    icon: "icons/svg/fire.svg"
  },
  {
    id: "bound",
    name: "Bound",
    icon: "icons/svg/net.svg"
  }
];
Hooks.on("init", () => {
  console.log("BESM 4e | Initializing BESM 4th Edition system"), CONFIG.Actor.dataModels.character = zu, CONFIG.Actor.dataModels.npc = Gu, CONFIG.Actor.dataModels.vehicle = Vu, CONFIG.Actor.dataModels.mecha = Uu, CONFIG.Item.dataModels.attribute = qu, CONFIG.Item.dataModels.enhancement = Wu, CONFIG.Item.dataModels.limiter = Yu, CONFIG.Item.dataModels.defect = Ku, CONFIG.Item.dataModels.possession = Ju, CONFIG.Item.dataModels.skill = Zu, CONFIG.Item.dataModels.besm4eTemplate = Xu, Qu(), $u();
  try {
    game.settings.get("besm", "initiativeMode") === "cv_static" ? CONFIG.Combat.initiative = { formula: "@derived.initiative", decimals: 0 } : CONFIG.Combat.initiative = { formula: "2d6 + @derived.initiative", decimals: 0 };
  } catch {
    CONFIG.Combat.initiative = { formula: "2d6 + @derived.initiative", decimals: 0 };
  }
  CONFIG.statusEffects = ev, CONFIG.Actor.typeLabels = {
    character: "Character",
    npc: "NPC",
    vehicle: "Vehicle",
    mecha: "Mecha"
  }, CONFIG.Item.typeLabels = {
    attribute: "Attribute",
    defect: "Defect",
    enhancement: "Enhancement",
    limiter: "Limiter",
    possession: "Possession",
    skill: "Skill",
    besm4eTemplate: "Template"
  }, foundry.documents.collections.Actors.registerSheet("besm", Ws, {
    types: ["character"],
    makeDefault: !0,
    label: "Character Sheet"
  }), foundry.documents.collections.Actors.registerSheet("besm", Ks, {
    types: ["npc"],
    makeDefault: !0,
    label: "NPC Sheet"
  }), foundry.documents.collections.Actors.registerSheet("besm", Js, {
    types: ["vehicle"],
    makeDefault: !0,
    label: "Vehicle Sheet"
  }), foundry.documents.collections.Actors.registerSheet("besm", Zs, {
    types: ["mecha"],
    makeDefault: !0,
    label: "Mecha Sheet"
  }), foundry.documents.collections.Items.registerSheet("besm", Ys, {
    types: ["attribute", "defect", "enhancement", "limiter", "possession", "skill", "besm4eTemplate"],
    makeDefault: !0,
    label: "Item Sheet"
  });
});
Hooks.on("renderChatMessageHTML", (t, e) => {
  e.querySelectorAll('[data-action="defend"]').forEach((a) => {
    a.addEventListener("click", async () => {
      var o, c;
      const n = a.getAttribute("data-message-id"), r = game.messages.get(n);
      if (!r) return;
      const i = (c = (o = canvas.tokens) == null ? void 0 : o.controlled) == null ? void 0 : c[0], l = (i == null ? void 0 : i.actor) ?? game.user.character;
      if (!l) {
        ui.notifications.warn("Select a token or assign a character to defend.");
        return;
      }
      await Ui(l, r);
    });
  }), e.querySelectorAll('[data-action="auto-defend"]').forEach((a) => {
    a.addEventListener("click", async () => {
      var o, c;
      const n = a.getAttribute("data-message-id"), r = game.messages.get(n);
      if (!r) return;
      const i = (c = (o = canvas.tokens) == null ? void 0 : o.controlled) == null ? void 0 : c[0], l = i == null ? void 0 : i.actor;
      if (!l) {
        ui.notifications.warn("Select the defending token first.");
        return;
      }
      await Ui(l, r);
    });
  }), e.querySelectorAll('[data-action="apply-damage"]').forEach((a) => {
    a.addEventListener("click", async () => {
      const n = a.getAttribute("data-defender-id"), r = Number(a.getAttribute("data-damage")), i = game.actors.get(n);
      i && await od(i, r);
    });
  }), e.querySelectorAll('[data-action="spend-ep"]').forEach((a) => {
    a.addEventListener("click", async () => {
      const n = a.getAttribute("data-actor-id"), r = Number(a.getAttribute("data-total")), i = a.getAttribute("data-message-id"), l = game.actors.get(n);
      l && await cd(l, r, i);
    });
  }), e.querySelectorAll('[data-action="social-defend"]').forEach((a) => {
    a.addEventListener("click", async () => {
      var o, c;
      const n = a.getAttribute("data-message-id"), r = game.messages.get(n);
      if (!r) return;
      const i = (c = (o = canvas.tokens) == null ? void 0 : o.controlled) == null ? void 0 : c[0], l = (i == null ? void 0 : i.actor) ?? game.user.character;
      if (!l) {
        ui.notifications.warn("Select a token or assign a character to defend.");
        return;
      }
      await Bd(l, r);
    });
  }), e.querySelectorAll('[data-action="apply-social-damage"]').forEach((a) => {
    a.addEventListener("click", async () => {
      const n = a.getAttribute("data-defender-id"), r = Number(a.getAttribute("data-damage")), i = game.actors.get(n);
      i && await Hd(i, r);
    });
  }), e.querySelectorAll('[data-action="execute-stat-roll"]').forEach((a) => {
    a.addEventListener("click", async () => {
      const n = Yn(a.closest(".besm-roll")), r = a.getAttribute("data-actor-id"), i = a.getAttribute("data-stat-key"), l = Number(a.getAttribute("data-stat-value"));
      await Dc(r, i, l, n);
    });
  }), e.querySelectorAll('[data-action="execute-skill-roll"]').forEach((a) => {
    a.addEventListener("click", async () => {
      const n = Yn(a.closest(".besm-roll")), r = a.getAttribute("data-actor-id"), i = a.getAttribute("data-stat-key"), l = Number(a.getAttribute("data-stat-value")), o = Number(a.getAttribute("data-skill-level")), c = a.getAttribute("data-skill-name");
      await Rc(r, i, l, o, c, n);
    });
  }), e.querySelectorAll('[data-action="execute-attack-roll"]').forEach((a) => {
    a.addEventListener("click", async () => {
      const n = Yn(a.closest(".besm-roll"));
      await sd(a, n);
    });
  }), e.querySelectorAll('[data-action="execute-defence-roll"]').forEach((a) => {
    a.addEventListener("click", async () => {
      const n = Yn(a.closest(".besm-roll"));
      await ld(a, n);
    });
  }), e.querySelectorAll('[data-action="execute-sanity-roll"]').forEach((a) => {
    a.addEventListener("click", async () => {
      const n = Yn(a.closest(".besm-roll"));
      await ud(a, n);
    });
  });
});
