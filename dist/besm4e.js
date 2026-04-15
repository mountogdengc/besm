var Xs = Object.defineProperty;
var Si = (t) => {
  throw TypeError(t);
};
var Qs = (t, e, n) => e in t ? Xs(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Xe = (t, e, n) => Qs(t, typeof e != "symbol" ? e + "" : e, n), Rr = (t, e, n) => e.has(t) || Si("Cannot " + n);
var y = (t, e, n) => (Rr(t, e, "read from private field"), n ? n.call(t) : e.get(t)), $ = (t, e, n) => e.has(t) ? Si("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Q = (t, e, n, a) => (Rr(t, e, "write to private field"), a ? a.call(t, n) : e.set(t, n), n), ye = (t, e, n) => (Rr(t, e, "access private method"), n);
var ti = Array.isArray, $s = Array.prototype.indexOf, aa = Array.prototype.includes, kr = Array.from, ra = Object.defineProperty, Jn = Object.getOwnPropertyDescriptor, el = Object.getOwnPropertyDescriptors, tl = Object.prototype, nl = Array.prototype, Vi = Object.getPrototypeOf, Ti = Object.isExtensible;
const al = () => {
};
function rl(t) {
  for (var e = 0; e < t.length; e++)
    t[e]();
}
function Ui() {
  var t, e, n = new Promise((a, r) => {
    t = a, e = r;
  });
  return { promise: n, resolve: t, reject: e };
}
const $e = 2, ya = 4, Sr = 8, qi = 1 << 24, tn = 16, qt = 32, ia = 64, jr = 128, Rt = 512, Oe = 1024, Je = 2048, nn = 4096, ct = 8192, kt = 16384, ua = 32768, Mi = 1 << 25, sa = 65536, Ga = 1 << 17, il = 1 << 18, Na = 1 << 19, sl = 1 << 20, en = 1 << 25, la = 65536, hr = 1 << 21, wa = 1 << 22, Nn = 1 << 23, Zn = Symbol("$state"), ll = Symbol("legacy props"), ol = Symbol(""), Wi = Symbol("proxy path"), cl = Symbol("hmr anchor"), cn = new class extends Error {
  constructor() {
    super(...arguments);
    Xe(this, "name", "StaleReactionError");
    Xe(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var zi;
const ul = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((zi = globalThis.document) != null && zi.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
), dl = 1, vl = 11;
function fl(t) {
  {
    const e = new Error(`invariant_violation
An invariant violation occurred, meaning Svelte's internal assumptions were flawed. This is a bug in Svelte, not your app — please open an issue at https://github.com/sveltejs/svelte, citing the following message: "${t}"
https://svelte.dev/e/invariant_violation`);
    throw e.name = "Svelte error", e;
  }
}
function pl() {
  {
    const t = new Error("snippet_without_render_tag\nAttempted to render a snippet without a `{@render}` block. This would cause the snippet code to be stringified instead of its content being rendered to the DOM. To fix this, change `{snippet}` to `{@render snippet()}`.\nhttps://svelte.dev/e/snippet_without_render_tag");
    throw t.name = "Svelte error", t;
  }
}
function ml() {
  {
    const t = new Error("async_derived_orphan\nCannot create a `$derived(...)` with an `await` expression outside of an effect tree\nhttps://svelte.dev/e/async_derived_orphan");
    throw t.name = "Svelte error", t;
  }
}
function Fi() {
  {
    const t = new Error("bind_invalid_checkbox_value\nUsing `bind:value` together with a checkbox input is not allowed. Use `bind:checked` instead\nhttps://svelte.dev/e/bind_invalid_checkbox_value");
    throw t.name = "Svelte error", t;
  }
}
function hl(t, e) {
  {
    const n = new Error(`component_api_changed
Calling \`${t}\` on a component instance (of ${e}) is no longer valid in Svelte 5
https://svelte.dev/e/component_api_changed`);
    throw n.name = "Svelte error", n;
  }
}
function gl(t, e) {
  {
    const n = new Error(`component_api_invalid_new
Attempted to instantiate ${t} with \`new ${e}\`, which is no longer valid in Svelte 5. If this component is not under your control, set the \`compatibility.componentApi\` compiler option to \`4\` to keep it working.
https://svelte.dev/e/component_api_invalid_new`);
    throw n.name = "Svelte error", n;
  }
}
function bl() {
  {
    const t = new Error(`derived_references_self
A derived value cannot reference itself recursively
https://svelte.dev/e/derived_references_self`);
    throw t.name = "Svelte error", t;
  }
}
function _l(t, e, n) {
  {
    const a = new Error(`each_key_duplicate
${n ? `Keyed each block has duplicate key \`${n}\` at indexes ${t} and ${e}` : `Keyed each block has duplicate key at indexes ${t} and ${e}`}
https://svelte.dev/e/each_key_duplicate`);
    throw a.name = "Svelte error", a;
  }
}
function xl(t, e, n) {
  {
    const a = new Error(`each_key_volatile
Keyed each block has key that is not idempotent — the key for item at index ${t} was \`${e}\` but is now \`${n}\`. Keys must be the same each time for a given item
https://svelte.dev/e/each_key_volatile`);
    throw a.name = "Svelte error", a;
  }
}
function yl(t) {
  {
    const e = new Error(`effect_in_teardown
\`${t}\` cannot be used inside an effect cleanup function
https://svelte.dev/e/effect_in_teardown`);
    throw e.name = "Svelte error", e;
  }
}
function wl() {
  {
    const t = new Error("effect_in_unowned_derived\nEffect cannot be created inside a `$derived` value that was not itself created inside an effect\nhttps://svelte.dev/e/effect_in_unowned_derived");
    throw t.name = "Svelte error", t;
  }
}
function kl(t) {
  {
    const e = new Error(`effect_orphan
\`${t}\` can only be used inside an effect (e.g. during component initialisation)
https://svelte.dev/e/effect_orphan`);
    throw e.name = "Svelte error", e;
  }
}
function Sl() {
  {
    const t = new Error(`effect_update_depth_exceeded
Maximum update depth exceeded. This typically indicates that an effect reads and writes the same piece of state
https://svelte.dev/e/effect_update_depth_exceeded`);
    throw t.name = "Svelte error", t;
  }
}
function Tl() {
  {
    const t = new Error("invalid_snippet\nCould not `{@render}` snippet due to the expression being `null` or `undefined`. Consider using optional chaining `{@render snippet?.()}`\nhttps://svelte.dev/e/invalid_snippet");
    throw t.name = "Svelte error", t;
  }
}
function Ml(t) {
  {
    const e = new Error(`props_invalid_value
Cannot do \`bind:${t}={undefined}\` when \`${t}\` has a fallback value
https://svelte.dev/e/props_invalid_value`);
    throw e.name = "Svelte error", e;
  }
}
function Fl(t) {
  {
    const e = new Error(`rune_outside_svelte
The \`${t}\` rune is only available inside \`.svelte\` and \`.svelte.js/ts\` files
https://svelte.dev/e/rune_outside_svelte`);
    throw e.name = "Svelte error", e;
  }
}
function Cl() {
  {
    const t = new Error("state_descriptors_fixed\nProperty descriptors defined on `$state` objects must contain `value` and always be `enumerable`, `configurable` and `writable`.\nhttps://svelte.dev/e/state_descriptors_fixed");
    throw t.name = "Svelte error", t;
  }
}
function Al() {
  {
    const t = new Error("state_prototype_fixed\nCannot set prototype of `$state` object\nhttps://svelte.dev/e/state_prototype_fixed");
    throw t.name = "Svelte error", t;
  }
}
function El() {
  {
    const t = new Error("state_unsafe_mutation\nUpdating state inside `$derived(...)`, `$inspect(...)` or a template expression is forbidden. If the value should not be reactive, declare it without `$state`\nhttps://svelte.dev/e/state_unsafe_mutation");
    throw t.name = "Svelte error", t;
  }
}
function Nl() {
  {
    const t = new Error("svelte_boundary_reset_onerror\nA `<svelte:boundary>` `reset` function cannot be called while an error is still being handled\nhttps://svelte.dev/e/svelte_boundary_reset_onerror");
    throw t.name = "Svelte error", t;
  }
}
const Pl = 1, Dl = 2, Yi = 4, Ll = 8, Il = 16, Rl = 1, Bl = 4, Hl = 8, Ol = 16, zl = 1, Gl = 2, qe = Symbol(), S = Symbol("filename"), Ki = "http://www.w3.org/1999/xhtml", jl = "http://www.w3.org/2000/svg", Vl = "http://www.w3.org/1998/Math/MathML";
var Bn = "font-weight: bold", Hn = "font-weight: normal";
function Ul(t) {
  console.warn(`%c[svelte] await_reactivity_loss
%cDetected reactivity loss when reading \`${t}\`. This happens when state is read in an async function after an earlier \`await\`
https://svelte.dev/e/await_reactivity_loss`, Bn, Hn);
}
function ql() {
  console.warn(`%c[svelte] derived_inert
%cReading a derived belonging to a now-destroyed effect may result in stale values
https://svelte.dev/e/derived_inert`, Bn, Hn);
}
function Wl(t, e) {
  console.warn(`%c[svelte] event_handler_invalid
%c${t} should be a function. Did you mean to ${e}?
https://svelte.dev/e/event_handler_invalid`, Bn, Hn);
}
function Yl() {
  console.warn(`%c[svelte] lifecycle_double_unmount
%cTried to unmount a component that was not mounted
https://svelte.dev/e/lifecycle_double_unmount`, Bn, Hn);
}
function Kl() {
  console.warn("%c[svelte] select_multiple_invalid_value\n%cThe `value` property of a `<select multiple>` element should be an array, but it received a non-array value. The selection will be kept as is.\nhttps://svelte.dev/e/select_multiple_invalid_value", Bn, Hn);
}
function or(t) {
  console.warn(`%c[svelte] state_proxy_equality_mismatch
%cReactive \`$state(...)\` proxies and the values they proxy have different identities. Because of this, comparisons with \`${t}\` will produce unexpected results
https://svelte.dev/e/state_proxy_equality_mismatch`, Bn, Hn);
}
function Jl() {
  console.warn(`%c[svelte] state_proxy_unmount
%cTried to unmount a state proxy, rather than a component
https://svelte.dev/e/state_proxy_unmount`, Bn, Hn);
}
function Zl() {
  console.warn("%c[svelte] svelte_boundary_reset_noop\n%cA `<svelte:boundary>` `reset` function only resets the boundary the first time it is called\nhttps://svelte.dev/e/svelte_boundary_reset_noop", Bn, Hn);
}
function Ji(t) {
  return t === this.v;
}
function Xl(t, e) {
  return t != t ? e == e : t !== e || t !== null && typeof t == "object" || typeof t == "function";
}
function Zi(t) {
  return !Xl(t, this.v);
}
let Ql = !1;
function L(t, e) {
  return t.label = e, Xi(t.v, e), t;
}
function Xi(t, e) {
  var n;
  return (n = t == null ? void 0 : t[Wi]) == null || n.call(t, e), t;
}
function Qi(t) {
  const e = new Error(), n = $l();
  return n.length === 0 ? null : (n.unshift(`
`), ra(e, "stack", {
    value: n.join(`
`)
  }), ra(e, "name", {
    value: t
  }), /** @type {Error & { stack: string }} */
  e);
}
function $l() {
  const t = Error.stackTraceLimit;
  Error.stackTraceLimit = 1 / 0;
  const e = new Error().stack;
  if (Error.stackTraceLimit = t, !e) return [];
  const n = e.split(`
`), a = [];
  for (let r = 0; r < n.length; r++) {
    const i = n[r], o = i.replaceAll("\\", "/");
    if (i.trim() !== "Error") {
      if (i.includes("validate_each_keys"))
        return [];
      o.includes("svelte/src/internal") || o.includes("node_modules/.vite") || a.push(i);
    }
  }
  return a;
}
function eo(t, e) {
  t || fl(e);
}
let ze = null;
function ka(t) {
  ze = t;
}
let mn = null;
function gr(t) {
  mn = t;
}
function T(t, e, n, a, r, i) {
  const o = mn;
  mn = {
    type: e,
    file: n[S],
    line: a,
    column: r,
    parent: o,
    ...i
  };
  try {
    return t();
  } finally {
    mn = o;
  }
}
let Pa = null;
function br(t) {
  Pa = t;
}
function le(t, e = !1, n) {
  ze = {
    p: ze,
    i: !1,
    c: null,
    e: null,
    s: t,
    x: null,
    r: (
      /** @type {Effect} */
      ie
    ),
    l: null
  }, ze.function = n, Pa = n;
}
function oe(t) {
  var e = (
    /** @type {ComponentContext} */
    ze
  ), n = e.e;
  if (n !== null) {
    e.e = null;
    for (var a of n)
      xs(a);
  }
  return t !== void 0 && (e.x = t), e.i = !0, ze = e.p, Pa = (ze == null ? void 0 : ze.function) ?? null, t ?? /** @type {T} */
  {};
}
function $i() {
  return !0;
}
let Gn = [];
function es() {
  var t = Gn;
  Gn = [], rl(t);
}
function Pn(t) {
  if (Gn.length === 0 && !Ba) {
    var e = Gn;
    queueMicrotask(() => {
      e === Gn && es();
    });
  }
  Gn.push(t);
}
function to() {
  for (; Gn.length > 0; )
    es();
}
const Vr = /* @__PURE__ */ new WeakMap();
function ts(t) {
  var e = ie;
  if (e === null)
    return se.f |= Nn, t;
  if (t instanceof Error && !Vr.has(t) && Vr.set(t, no(t, e)), (e.f & ua) === 0 && (e.f & ya) === 0)
    throw !e.parent && t instanceof Error && ns(t), t;
  Cn(t, e);
}
function Cn(t, e) {
  for (; e !== null; ) {
    if ((e.f & jr) !== 0) {
      if ((e.f & ua) === 0)
        throw t;
      try {
        e.b.error(t);
        return;
      } catch (n) {
        t = n;
      }
    }
    e = e.parent;
  }
  throw t instanceof Error && ns(t), t;
}
function no(t, e) {
  var o, l, c;
  const n = Jn(t, "message");
  if (!(n && !n.configurable)) {
    for (var a = li ? "  " : "	", r = `
${a}in ${((o = e.fn) == null ? void 0 : o.name) || "<unknown>"}`, i = e.ctx; i !== null; )
      r += `
${a}in ${(l = i.function) == null ? void 0 : l[S].split("/").pop()}`, i = i.p;
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
function ns(t) {
  const e = Vr.get(t);
  e && (ra(t, "message", {
    value: e.message
  }), ra(t, "stack", {
    value: e.stack
  }));
}
const ao = -7169;
function Ae(t, e) {
  t.f = t.f & ao | e;
}
function ni(t) {
  (t.f & Rt) !== 0 || t.deps === null ? Ae(t, Oe) : Ae(t, nn);
}
function as(t) {
  if (t !== null)
    for (const e of t)
      (e.f & $e) === 0 || (e.f & la) === 0 || (e.f ^= la, as(
        /** @type {Derived} */
        e.deps
      ));
}
function rs(t, e, n) {
  (t.f & Je) !== 0 ? e.add(t) : (t.f & nn) !== 0 && n.add(t), as(t.deps), Ae(t, Oe);
}
let sr = !1;
function ro(t) {
  var e = sr;
  try {
    return sr = !1, [t(), sr];
  } finally {
    sr = e;
  }
}
const On = /* @__PURE__ */ new Set();
let q = null, Ke = null, Ur = null, Ba = !1, Br = !1, ma = null, cr = null;
var Ci = 0, io = /* @__PURE__ */ new Set();
let so = 1;
var ha, ga, Un, un, Jt, Ya, vt, Ka, yn, dn, Zt, ba, _a, qn, Ie, ur, is, dr, qr, vr, lo;
const xr = class xr {
  constructor() {
    $(this, Ie);
    Xe(this, "id", so++);
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    Xe(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    Xe(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    $(this, ha, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    $(this, ga, /* @__PURE__ */ new Set());
    /**
     * Callbacks that should run only when a fork is committed.
     * @type {Set<(batch: Batch) => void>}
     */
    $(this, Un, /* @__PURE__ */ new Set());
    /**
     * Async effects that are currently in flight
     * @type {Map<Effect, number>}
     */
    $(this, un, /* @__PURE__ */ new Map());
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    $(this, Jt, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    $(this, Ya, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    $(this, vt, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    $(this, Ka, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    $(this, yn, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    $(this, dn, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    $(this, Zt, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    $(this, ba, /* @__PURE__ */ new Set());
    Xe(this, "is_fork", !1);
    $(this, _a, !1);
    /** @type {Set<Batch>} */
    $(this, qn, /* @__PURE__ */ new Set());
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(e) {
    y(this, Zt).has(e) || y(this, Zt).set(e, { d: [], m: [] }), y(this, ba).delete(e);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(e, n = (a) => this.schedule(a)) {
    var a = y(this, Zt).get(e);
    if (a) {
      y(this, Zt).delete(e);
      for (var r of a.d)
        Ae(r, Je), n(r);
      for (r of a.m)
        Ae(r, nn), n(r);
    }
    y(this, ba).add(e);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(e, n, a = !1) {
    e.v !== qe && !this.previous.has(e) && this.previous.set(e, e.v), (e.f & Nn) === 0 && (this.current.set(e, [n, a]), Ke == null || Ke.set(e, n)), this.is_fork || (e.v = n);
  }
  activate() {
    q = this;
  }
  deactivate() {
    q = null, Ke = null;
  }
  flush() {
    var e = /* @__PURE__ */ new Set();
    try {
      Br = !0, q = this, ye(this, Ie, dr).call(this);
    } finally {
      Ci = 0, Ur = null, ma = null, cr = null, Br = !1, q = null, Ke = null, Xn.clear();
      for (
        const n of
        /** @type {Set<Source>} */
        e
      )
        n.updated = null;
    }
  }
  discard() {
    for (const e of y(this, ga)) e(this);
    y(this, ga).clear(), y(this, Un).clear(), On.delete(this);
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(e) {
    y(this, Ka).push(e);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(e, n) {
    let a = y(this, un).get(n) ?? 0;
    if (y(this, un).set(n, a + 1), e) {
      let r = y(this, Jt).get(n) ?? 0;
      y(this, Jt).set(n, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   * @param {boolean} skip - whether to skip updates (because this is triggered by a stale reaction)
   */
  decrement(e, n, a) {
    let r = y(this, un).get(n) ?? 0;
    if (r === 1 ? y(this, un).delete(n) : y(this, un).set(n, r - 1), e) {
      let i = y(this, Jt).get(n) ?? 0;
      i === 1 ? y(this, Jt).delete(n) : y(this, Jt).set(n, i - 1);
    }
    y(this, _a) || a || (Q(this, _a, !0), Pn(() => {
      Q(this, _a, !1), this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(e, n) {
    for (const a of e)
      y(this, yn).add(a);
    for (const a of n)
      y(this, dn).add(a);
    e.clear(), n.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(e) {
    y(this, ha).add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(e) {
    y(this, ga).add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  on_fork_commit(e) {
    y(this, Un).add(e);
  }
  run_fork_commit_callbacks() {
    for (const e of y(this, Un)) e(this);
    y(this, Un).clear();
  }
  settled() {
    return (y(this, Ya) ?? Q(this, Ya, Ui())).promise;
  }
  static ensure() {
    if (q === null) {
      const e = q = new xr();
      Br || (On.add(q), Ba || Pn(() => {
        q === e && e.flush();
      }));
    }
    return q;
  }
  apply() {
    {
      Ke = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(e) {
    var r;
    if (Ur = e, (r = e.b) != null && r.is_pending && (e.f & (ya | Sr | qi)) !== 0 && (e.f & ua) === 0) {
      e.b.defer_effect(e);
      return;
    }
    for (var n = e; n.parent !== null; ) {
      n = n.parent;
      var a = n.f;
      if (ma !== null && n === ie && (se === null || (se.f & $e) === 0))
        return;
      if ((a & (ia | qt)) !== 0) {
        if ((a & Oe) === 0)
          return;
        n.f ^= Oe;
      }
    }
    y(this, vt).push(n);
  }
};
ha = new WeakMap(), ga = new WeakMap(), Un = new WeakMap(), un = new WeakMap(), Jt = new WeakMap(), Ya = new WeakMap(), vt = new WeakMap(), Ka = new WeakMap(), yn = new WeakMap(), dn = new WeakMap(), Zt = new WeakMap(), ba = new WeakMap(), _a = new WeakMap(), qn = new WeakMap(), Ie = new WeakSet(), ur = function() {
  return this.is_fork || y(this, Jt).size > 0;
}, is = function() {
  for (const a of y(this, qn))
    for (const r of y(a, Jt).keys()) {
      for (var e = !1, n = r; n.parent !== null; ) {
        if (y(this, Zt).has(n)) {
          e = !0;
          break;
        }
        n = n.parent;
      }
      if (!e)
        return !0;
    }
  return !1;
}, dr = function() {
  var l, c;
  if (Ci++ > 1e3 && (On.delete(this), co()), !ye(this, Ie, ur).call(this)) {
    for (const p of y(this, yn))
      y(this, dn).delete(p), Ae(p, Je), this.schedule(p);
    for (const p of y(this, dn))
      Ae(p, nn), this.schedule(p);
  }
  const e = y(this, vt);
  Q(this, vt, []), this.apply();
  var n = ma = [], a = [], r = cr = [];
  for (const p of e)
    try {
      ye(this, Ie, qr).call(this, p, n, a);
    } catch (u) {
      throw os(p), u;
    }
  if (q = null, r.length > 0) {
    var i = xr.ensure();
    for (const p of r)
      i.schedule(p);
  }
  if (ma = null, cr = null, ye(this, Ie, ur).call(this) || ye(this, Ie, is).call(this)) {
    ye(this, Ie, vr).call(this, a), ye(this, Ie, vr).call(this, n);
    for (const [p, u] of y(this, Zt))
      ls(p, u);
  } else {
    y(this, un).size === 0 && On.delete(this), y(this, yn).clear(), y(this, dn).clear();
    for (const p of y(this, ha)) p(this);
    y(this, ha).clear(), Ai(a), Ai(n), (l = y(this, Ya)) == null || l.resolve();
  }
  var o = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    q
  );
  if (y(this, vt).length > 0) {
    const p = o ?? (o = this);
    y(p, vt).push(...y(this, vt).filter((u) => !y(p, vt).includes(u)));
  }
  if (o !== null) {
    On.add(o);
    for (const p of this.current.keys())
      io.add(p);
    ye(c = o, Ie, dr).call(c);
  }
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
qr = function(e, n, a) {
  e.f ^= Oe;
  for (var r = e.first; r !== null; ) {
    var i = r.f, o = (i & (qt | ia)) !== 0, l = o && (i & Oe) !== 0, c = l || (i & ct) !== 0 || y(this, Zt).has(r);
    if (!c && r.fn !== null) {
      o ? r.f ^= Oe : (i & ya) !== 0 ? n.push(r) : tr(r) && ((i & tn) !== 0 && y(this, dn).add(r), Ma(r));
      var p = r.first;
      if (p !== null) {
        r = p;
        continue;
      }
    }
    for (; r !== null; ) {
      var u = r.next;
      if (u !== null) {
        r = u;
        break;
      }
      r = r.parent;
    }
  }
}, /**
 * @param {Effect[]} effects
 */
vr = function(e) {
  for (var n = 0; n < e.length; n += 1)
    rs(e[n], y(this, yn), y(this, dn));
}, lo = function() {
  var u, v, d;
  for (const m of On) {
    var e = m.id < this.id, n = [];
    for (const [h, [w, x]] of this.current) {
      if (m.current.has(h)) {
        var a = (
          /** @type {[any, boolean]} */
          m.current.get(h)[0]
        );
        if (e && w !== a)
          m.current.set(h, [w, x]);
        else
          continue;
      }
      n.push(h);
    }
    var r = [...m.current.keys()].filter((h) => !this.current.has(h));
    if (r.length === 0)
      e && m.discard();
    else if (n.length > 0) {
      if (eo(y(m, vt).length === 0, "Batch has scheduled roots"), e)
        for (const h of y(this, ba))
          m.unskip_effect(h, (w) => {
            var x;
            (w.f & (tn | wa)) !== 0 ? m.schedule(w) : ye(x = m, Ie, vr).call(x, [w]);
          });
      m.activate();
      var i = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
      for (var l of n)
        ss(l, r, i, o);
      o = /* @__PURE__ */ new Map();
      var c = [...m.current.keys()].filter(
        (h) => this.current.has(h) ? (
          /** @type {[any, boolean]} */
          this.current.get(h)[0] !== h
        ) : !0
      );
      for (const h of y(this, Ka))
        (h.f & (kt | ct | Ga)) === 0 && ai(h, c, o) && ((h.f & (wa | tn)) !== 0 ? (Ae(h, Je), m.schedule(h)) : y(m, yn).add(h));
      if (y(m, vt).length > 0) {
        m.apply();
        for (var p of y(m, vt))
          ye(u = m, Ie, qr).call(u, p, [], []);
        Q(m, vt, []);
      }
      m.deactivate();
    }
  }
  for (const m of On)
    y(m, qn).has(this) && (y(m, qn).delete(this), y(m, qn).size === 0 && !ye(v = m, Ie, ur).call(v) && (m.activate(), ye(d = m, Ie, dr).call(d)));
};
let oa = xr;
function oo(t) {
  var e = Ba;
  Ba = !0;
  try {
    for (var n; ; ) {
      if (to(), q === null)
        return (
          /** @type {T} */
          n
        );
      q.flush();
    }
  } finally {
    Ba = e;
  }
}
function co() {
  {
    var t = /* @__PURE__ */ new Map();
    for (
      const n of
      /** @type {Batch} */
      q.current.keys()
    )
      for (const [a, r] of n.updated ?? []) {
        var e = t.get(a);
        e || (e = { error: r.error, count: 0 }, t.set(a, e)), e.count += r.count;
      }
    for (const n of t.values())
      n.error && console.error(n.error);
  }
  try {
    Sl();
  } catch (n) {
    ra(n, "stack", { value: "" }), Cn(n, Ur);
  }
}
let zt = null;
function Ai(t) {
  var e = t.length;
  if (e !== 0) {
    for (var n = 0; n < e; ) {
      var a = t[n++];
      if ((a.f & (kt | ct)) === 0 && tr(a) && (zt = /* @__PURE__ */ new Set(), Ma(a), a.deps === null && a.first === null && a.nodes === null && a.teardown === null && a.ac === null && Ss(a), (zt == null ? void 0 : zt.size) > 0)) {
        Xn.clear();
        for (const r of zt) {
          if ((r.f & (kt | ct)) !== 0) continue;
          const i = [r];
          let o = r.parent;
          for (; o !== null; )
            zt.has(o) && (zt.delete(o), i.push(o)), o = o.parent;
          for (let l = i.length - 1; l >= 0; l--) {
            const c = i[l];
            (c.f & (kt | ct)) === 0 && Ma(c);
          }
        }
        zt.clear();
      }
    }
    zt = null;
  }
}
function ss(t, e, n, a) {
  if (!n.has(t) && (n.add(t), t.reactions !== null))
    for (const r of t.reactions) {
      const i = r.f;
      (i & $e) !== 0 ? ss(
        /** @type {Derived} */
        r,
        e,
        n,
        a
      ) : (i & (wa | tn)) !== 0 && (i & Je) === 0 && ai(r, e, a) && (Ae(r, Je), ri(
        /** @type {Effect} */
        r
      ));
    }
}
function ai(t, e, n) {
  const a = n.get(t);
  if (a !== void 0) return a;
  if (t.deps !== null)
    for (const r of t.deps) {
      if (aa.call(e, r))
        return !0;
      if ((r.f & $e) !== 0 && ai(
        /** @type {Derived} */
        r,
        e,
        n
      ))
        return n.set(
          /** @type {Derived} */
          r,
          !0
        ), !0;
    }
  return n.set(t, !1), !1;
}
function ri(t) {
  q.schedule(t);
}
function ls(t, e) {
  if (!((t.f & qt) !== 0 && (t.f & Oe) !== 0)) {
    (t.f & Je) !== 0 ? e.d.push(t) : (t.f & nn) !== 0 && e.m.push(t), Ae(t, Oe);
    for (var n = t.first; n !== null; )
      ls(n, e), n = n.next;
  }
}
function os(t) {
  Ae(t, Oe);
  for (var e = t.first; e !== null; )
    os(e), e = e.next;
}
function uo(t) {
  let e = 0, n = ca(0), a;
  return L(n, "createSubscriber version"), () => {
    oi() && (s(n), ys(() => (e === 0 && (a = pi(() => t(() => Oa(n)))), e += 1, () => {
      Pn(() => {
        e -= 1, e === 0 && (a == null || a(), a = void 0, Oa(n));
      });
    })));
  };
}
var vo = sa | Na;
function fo(t, e, n, a) {
  new po(t, e, n, a);
}
var At, ei, Et, Wn, ft, Nt, it, bt, vn, Yn, wn, xa, Ja, Za, Xt, yr, Me, mo, ho, go, Wr, fr, pr, Yr, Kr;
class po {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(e, n, a, r) {
    $(this, Me);
    /** @type {Boundary | null} */
    Xe(this, "parent");
    Xe(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    Xe(this, "transform_error");
    /** @type {TemplateNode} */
    $(this, At);
    /** @type {TemplateNode | null} */
    $(this, ei, null);
    /** @type {BoundaryProps} */
    $(this, Et);
    /** @type {((anchor: Node) => void)} */
    $(this, Wn);
    /** @type {Effect} */
    $(this, ft);
    /** @type {Effect | null} */
    $(this, Nt, null);
    /** @type {Effect | null} */
    $(this, it, null);
    /** @type {Effect | null} */
    $(this, bt, null);
    /** @type {DocumentFragment | null} */
    $(this, vn, null);
    $(this, Yn, 0);
    $(this, wn, 0);
    $(this, xa, !1);
    /** @type {Set<Effect>} */
    $(this, Ja, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    $(this, Za, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    $(this, Xt, null);
    $(this, yr, uo(() => (Q(this, Xt, ca(y(this, Yn))), L(y(this, Xt), "$effect.pending()"), () => {
      Q(this, Xt, null);
    })));
    var i;
    Q(this, At, e), Q(this, Et, n), Q(this, Wn, (o) => {
      var l = (
        /** @type {Effect} */
        ie
      );
      l.b = this, l.f |= jr, a(o);
    }), this.parent = /** @type {Effect} */
    ie.b, this.transform_error = r ?? ((i = this.parent) == null ? void 0 : i.transform_error) ?? ((o) => o), Q(this, ft, er(() => {
      ye(this, Me, Wr).call(this);
    }, vo));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(e) {
    rs(e, y(this, Ja), y(this, Za));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!y(this, Et).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(e, n) {
    ye(this, Me, Yr).call(this, e, n), Q(this, Yn, y(this, Yn) + e), !(!y(this, Xt) || y(this, xa)) && (Q(this, xa, !0), Pn(() => {
      Q(this, xa, !1), y(this, Xt) && Ta(y(this, Xt), y(this, Yn));
    }));
  }
  get_effect_pending() {
    return y(this, yr).call(this), s(
      /** @type {Source<number>} */
      y(this, Xt)
    );
  }
  /** @param {unknown} error */
  error(e) {
    if (!y(this, Et).onerror && !y(this, Et).failed)
      throw e;
    q != null && q.is_fork ? (y(this, Nt) && q.skip_effect(y(this, Nt)), y(this, it) && q.skip_effect(y(this, it)), y(this, bt) && q.skip_effect(y(this, bt)), q.on_fork_commit(() => {
      ye(this, Me, Kr).call(this, e);
    })) : ye(this, Me, Kr).call(this, e);
  }
}
At = new WeakMap(), ei = new WeakMap(), Et = new WeakMap(), Wn = new WeakMap(), ft = new WeakMap(), Nt = new WeakMap(), it = new WeakMap(), bt = new WeakMap(), vn = new WeakMap(), Yn = new WeakMap(), wn = new WeakMap(), xa = new WeakMap(), Ja = new WeakMap(), Za = new WeakMap(), Xt = new WeakMap(), yr = new WeakMap(), Me = new WeakSet(), mo = function() {
  try {
    Q(this, Nt, Dt(() => y(this, Wn).call(this, y(this, At))));
  } catch (e) {
    this.error(e);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
ho = function(e) {
  const n = y(this, Et).failed;
  n && Q(this, bt, Dt(() => {
    n(
      y(this, At),
      () => e,
      () => () => {
      }
    );
  }));
}, go = function() {
  const e = y(this, Et).pending;
  e && (this.is_pending = !0, Q(this, it, Dt(() => e(y(this, At)))), Pn(() => {
    var n = Q(this, vn, document.createDocumentFragment()), a = Dn();
    n.append(a), Q(this, Nt, ye(this, Me, pr).call(this, () => Dt(() => y(this, Wn).call(this, a)))), y(this, wn) === 0 && (y(this, At).before(n), Q(this, vn, null), $n(
      /** @type {Effect} */
      y(this, it),
      () => {
        Q(this, it, null);
      }
    ), ye(this, Me, fr).call(
      this,
      /** @type {Batch} */
      q
    ));
  }));
}, Wr = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), Q(this, wn, 0), Q(this, Yn, 0), Q(this, Nt, Dt(() => {
      y(this, Wn).call(this, y(this, At));
    })), y(this, wn) > 0) {
      var e = Q(this, vn, document.createDocumentFragment());
      fi(y(this, Nt), e);
      const n = (
        /** @type {(anchor: Node) => void} */
        y(this, Et).pending
      );
      Q(this, it, Dt(() => n(y(this, At))));
    } else
      ye(this, Me, fr).call(
        this,
        /** @type {Batch} */
        q
      );
  } catch (n) {
    this.error(n);
  }
}, /**
 * @param {Batch} batch
 */
fr = function(e) {
  this.is_pending = !1, e.transfer_effects(y(this, Ja), y(this, Za));
}, /**
 * @template T
 * @param {() => T} fn
 */
pr = function(e) {
  var n = ie, a = se, r = ze;
  an(y(this, ft)), Ht(y(this, ft)), ka(y(this, ft).ctx);
  try {
    return oa.ensure(), e();
  } catch (i) {
    return ts(i), null;
  } finally {
    an(n), Ht(a), ka(r);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
Yr = function(e, n) {
  var a;
  if (!this.has_pending_snippet()) {
    this.parent && ye(a = this.parent, Me, Yr).call(a, e, n);
    return;
  }
  Q(this, wn, y(this, wn) + e), y(this, wn) === 0 && (ye(this, Me, fr).call(this, n), y(this, it) && $n(y(this, it), () => {
    Q(this, it, null);
  }), y(this, vn) && (y(this, At).before(y(this, vn)), Q(this, vn, null)));
}, /**
 * @param {unknown} error
 */
Kr = function(e) {
  y(this, Nt) && (pt(y(this, Nt)), Q(this, Nt, null)), y(this, it) && (pt(y(this, it)), Q(this, it, null)), y(this, bt) && (pt(y(this, bt)), Q(this, bt, null));
  var n = y(this, Et).onerror;
  let a = y(this, Et).failed;
  var r = !1, i = !1;
  const o = () => {
    if (r) {
      Zl();
      return;
    }
    r = !0, i && Nl(), y(this, bt) !== null && $n(y(this, bt), () => {
      Q(this, bt, null);
    }), ye(this, Me, pr).call(this, () => {
      ye(this, Me, Wr).call(this);
    });
  }, l = (c) => {
    try {
      i = !0, n == null || n(c, o), i = !1;
    } catch (p) {
      Cn(p, y(this, ft) && y(this, ft).parent);
    }
    a && Q(this, bt, ye(this, Me, pr).call(this, () => {
      try {
        return Dt(() => {
          var p = (
            /** @type {Effect} */
            ie
          );
          p.b = this, p.f |= jr, a(
            y(this, At),
            () => c,
            () => o
          );
        });
      } catch (p) {
        return Cn(
          p,
          /** @type {Effect} */
          y(this, ft).parent
        ), null;
      }
    }));
  };
  Pn(() => {
    var c;
    try {
      c = this.transform_error(e);
    } catch (p) {
      Cn(p, y(this, ft) && y(this, ft).parent);
      return;
    }
    c !== null && typeof c == "object" && typeof /** @type {any} */
    c.then == "function" ? c.then(
      l,
      /** @param {unknown} e */
      (p) => Cn(p, y(this, ft) && y(this, ft).parent)
    ) : l(c);
  });
};
function bo(t, e, n, a) {
  const r = Tr;
  var i = t.filter((d) => !d.settled);
  if (n.length === 0 && i.length === 0) {
    a(e.map(r));
    return;
  }
  var o = (
    /** @type {Effect} */
    ie
  ), l = _o(), c = i.length === 1 ? i[0].promise : i.length > 1 ? Promise.all(i.map((d) => d.promise)) : null;
  function p(d) {
    l();
    try {
      a(d);
    } catch (m) {
      (o.f & kt) === 0 && Cn(m, o);
    }
    _r();
  }
  if (n.length === 0) {
    c.then(() => p(e.map(r)));
    return;
  }
  var u = cs();
  function v() {
    Promise.all(n.map((d) => /* @__PURE__ */ yo(d))).then((d) => p([...e.map(r), ...d])).catch((d) => Cn(d, o)).finally(() => u());
  }
  c ? c.then(() => {
    l(), v(), _r();
  }) : v();
}
function _o() {
  var t = (
    /** @type {Effect} */
    ie
  ), e = se, n = ze, a = (
    /** @type {Batch} */
    q
  ), r = mn;
  return function(o = !0) {
    an(t), Ht(e), ka(n), o && (t.f & kt) === 0 && (a == null || a.activate(), a == null || a.apply()), Ha(null), gr(r);
  };
}
async function Te(t) {
  var e = ot;
  queueMicrotask(() => {
    ot === e && Ha(null);
  });
  var n = await t;
  return () => (Ha(e), queueMicrotask(() => {
    ot === e && Ha(null);
  }), n);
}
function _r(t = !0) {
  an(null), Ht(null), ka(null), t && (q == null || q.deactivate()), Ha(null), gr(null);
}
function cs() {
  var t = (
    /** @type {Effect} */
    ie
  ), e = (
    /** @type {Boundary} */
    t.b
  ), n = (
    /** @type {Batch} */
    q
  ), a = e.is_rendered();
  return e.update_pending_count(1, n), n.increment(a, t), (r = !1) => {
    e.update_pending_count(-1, n), n.decrement(a, t, r);
  };
}
let ot = null;
function Ha(t) {
  ot = t;
}
const xo = /* @__PURE__ */ new Set();
// @__NO_SIDE_EFFECTS__
function Tr(t) {
  var e = $e | Je;
  return ie !== null && (ie.f |= Na), {
    ctx: ze,
    deps: null,
    effects: null,
    equals: Ji,
    f: e,
    fn: t,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      qe
    ),
    wv: 0,
    parent: ie,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function yo(t, e, n) {
  let a = (
    /** @type {Effect | null} */
    ie
  );
  a === null && ml();
  var r = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), i = ca(
    /** @type {V} */
    qe
  );
  i.label = e;
  var o = !se, l = /* @__PURE__ */ new Map();
  return Ho(() => {
    var m;
    var c = (
      /** @type {Effect} */
      ie
    );
    ot = { effect: c, effect_deps: /* @__PURE__ */ new Set(), warned: !1 };
    var p = Ui();
    r = p.promise;
    try {
      Promise.resolve(t()).then(p.resolve, p.reject).finally(_r);
    } catch (h) {
      p.reject(h), _r();
    }
    {
      if (ot) {
        if (c.deps !== null)
          for (let h = 0; h < dt; h += 1)
            ot.effect_deps.add(c.deps[h]);
        if (Ye !== null)
          for (let h = 0; h < Ye.length; h += 1)
            ot.effect_deps.add(Ye[h]);
      }
      ot = null;
    }
    var u = (
      /** @type {Batch} */
      q
    );
    if (o) {
      if ((c.f & ua) !== 0)
        var v = cs();
      if (
        /** @type {Boundary} */
        a.b.is_rendered()
      )
        (m = l.get(u)) == null || m.reject(cn), l.delete(u);
      else {
        for (const h of l.values())
          h.reject(cn);
        l.clear();
      }
      l.set(u, p);
    }
    const d = (h, w = void 0) => {
      if (ot = null, v) {
        var x = w === cn;
        v(x);
      }
      if (!(w === cn || (c.f & kt) !== 0)) {
        if (u.activate(), w)
          i.f |= Nn, Ta(i, w);
        else {
          (i.f & Nn) !== 0 && (i.f ^= Nn), Ta(i, h);
          for (const [k, C] of l) {
            if (l.delete(k), k === u) break;
            C.reject(cn);
          }
        }
        u.deactivate();
      }
    };
    p.promise.then(d, (h) => d(null, h || "unknown"));
  }), ci(() => {
    for (const c of l.values())
      c.reject(cn);
  }), i.f |= wa, new Promise((c) => {
    function p(u) {
      function v() {
        u === r ? c(i) : p(r);
      }
      u.then(v, v);
    }
    p(r);
  });
}
// @__NO_SIDE_EFFECTS__
function Z(t) {
  const e = /* @__PURE__ */ Tr(t);
  return Fs(e), e;
}
// @__NO_SIDE_EFFECTS__
function us(t) {
  const e = /* @__PURE__ */ Tr(t);
  return e.equals = Zi, e;
}
function wo(t) {
  var e = t.effects;
  if (e !== null) {
    t.effects = null;
    for (var n = 0; n < e.length; n += 1)
      pt(
        /** @type {Effect} */
        e[n]
      );
  }
}
let Hr = [];
function ii(t) {
  var e, n = ie, a = t.parent;
  if (!hn && a !== null && (a.f & (kt | ct)) !== 0)
    return ql(), t.v;
  an(a);
  {
    let r = Sa;
    Ei(/* @__PURE__ */ new Set());
    try {
      aa.call(Hr, t) && bl(), Hr.push(t), t.f &= ~la, wo(t), e = Ns(t);
    } finally {
      an(n), Ei(r), Hr.pop();
    }
  }
  return e;
}
function ds(t) {
  var e = ii(t);
  if (!t.equals(e) && (t.wv = As(), (!(q != null && q.is_fork) || t.deps === null) && (q !== null ? q.capture(t, e, !0) : t.v = e, t.deps === null))) {
    Ae(t, Oe);
    return;
  }
  hn || (Ke !== null ? (oi() || q != null && q.is_fork) && Ke.set(t, e) : ni(t));
}
function ko(t) {
  var e, n;
  if (t.effects !== null)
    for (const a of t.effects)
      (a.teardown || a.ac) && ((e = a.teardown) == null || e.call(a), (n = a.ac) == null || n.abort(cn), a.teardown = al, a.ac = null, ja(a, 0), di(a));
}
function vs(t) {
  if (t.effects !== null)
    for (const e of t.effects)
      e.teardown && Ma(e);
}
let Sa = /* @__PURE__ */ new Set();
const Xn = /* @__PURE__ */ new Map();
function Ei(t) {
  Sa = t;
}
let si = !1;
function So() {
  si = !0;
}
function ca(t, e) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: t,
    reactions: null,
    equals: Ji,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function de(t, e) {
  const n = ca(t);
  return Fs(n), n;
}
// @__NO_SIDE_EFFECTS__
function To(t, e = !1, n = !0) {
  const a = ca(t);
  return e || (a.equals = Zi), a;
}
function ge(t, e, n = !1) {
  se !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!It || (se.f & Ga) !== 0) && $i() && (se.f & ($e | tn | wa | Ga)) !== 0 && (Bt === null || !aa.call(Bt, t)) && El();
  let a = n ? An(e) : e;
  return Xi(
    a,
    /** @type {string} */
    t.label
  ), Ta(t, a, cr);
}
function Ta(t, e, n = null) {
  var r;
  if (!t.equals(e)) {
    Xn.set(t, hn ? e : t.v);
    var a = oa.ensure();
    a.capture(t, e);
    {
      if (ie !== null) {
        t.updated ?? (t.updated = /* @__PURE__ */ new Map());
        const i = (((r = t.updated.get("")) == null ? void 0 : r.count) ?? 0) + 1;
        if (t.updated.set("", { error: (
          /** @type {any} */
          null
        ), count: i }), i > 5) {
          const o = Qi("updated at");
          if (o !== null) {
            let l = t.updated.get(o.stack);
            l || (l = { error: o, count: 0 }, t.updated.set(o.stack, l)), l.count++;
          }
        }
      }
      ie !== null && (t.set_during_effect = !0);
    }
    if ((t.f & $e) !== 0) {
      const i = (
        /** @type {Derived} */
        t
      );
      (t.f & Je) !== 0 && ii(i), Ke === null && ni(i);
    }
    t.wv = As(), ps(t, Je, n), ie !== null && (ie.f & Oe) !== 0 && (ie.f & (qt | ia)) === 0 && (Mt === null ? zo([t]) : Mt.push(t)), !a.is_fork && Sa.size > 0 && !si && fs();
  }
  return e;
}
function fs() {
  si = !1;
  for (const t of Sa)
    (t.f & Oe) !== 0 && Ae(t, nn), tr(t) && Ma(t);
  Sa.clear();
}
function Se(t, e = 1) {
  var n = s(t), a = e === 1 ? n++ : n--;
  return ge(t, n), a;
}
function Oa(t) {
  ge(t, t.v + 1);
}
function ps(t, e, n) {
  var a = t.reactions;
  if (a !== null)
    for (var r = a.length, i = 0; i < r; i++) {
      var o = a[i], l = o.f;
      if ((l & Ga) !== 0) {
        Sa.add(o);
        continue;
      }
      var c = (l & Je) === 0;
      if (c && Ae(o, e), (l & $e) !== 0) {
        var p = (
          /** @type {Derived} */
          o
        );
        Ke == null || Ke.delete(p), (l & la) === 0 && (l & Rt && (o.f |= la), ps(p, nn, n));
      } else if (c) {
        var u = (
          /** @type {Effect} */
          o
        );
        (l & tn) !== 0 && zt !== null && zt.add(u), n !== null ? n.push(u) : ri(u);
      }
    }
}
const Mo = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
function An(t) {
  if (typeof t != "object" || t === null || Zn in t)
    return t;
  const e = Vi(t);
  if (e !== tl && e !== nl)
    return t;
  var n = /* @__PURE__ */ new Map(), a = ti(t), r = /* @__PURE__ */ de(0), i = ea, o = (u) => {
    if (ea === i)
      return u();
    var v = se, d = ea;
    Ht(null), Li(i);
    var m = u();
    return Ht(v), Li(d), m;
  };
  a && (n.set("length", /* @__PURE__ */ de(
    /** @type {any[]} */
    t.length
  )), t = /** @type {any} */
  Ao(
    /** @type {any[]} */
    t
  ));
  var l = "";
  let c = !1;
  function p(u) {
    if (!c) {
      c = !0, l = u, L(r, `${l} version`);
      for (const [v, d] of n)
        L(d, zn(l, v));
      c = !1;
    }
  }
  return new Proxy(
    /** @type {any} */
    t,
    {
      defineProperty(u, v, d) {
        (!("value" in d) || d.configurable === !1 || d.enumerable === !1 || d.writable === !1) && Cl();
        var m = n.get(v);
        return m === void 0 ? o(() => {
          var h = /* @__PURE__ */ de(d.value);
          return n.set(v, h), typeof v == "string" && L(h, zn(l, v)), h;
        }) : ge(m, d.value, !0), !0;
      },
      deleteProperty(u, v) {
        var d = n.get(v);
        if (d === void 0) {
          if (v in u) {
            const m = o(() => /* @__PURE__ */ de(qe));
            n.set(v, m), Oa(r), L(m, zn(l, v));
          }
        } else
          ge(d, qe), Oa(r);
        return !0;
      },
      get(u, v, d) {
        var x;
        if (v === Zn)
          return t;
        if (v === Wi)
          return p;
        var m = n.get(v), h = v in u;
        if (m === void 0 && (!h || (x = Jn(u, v)) != null && x.writable) && (m = o(() => {
          var k = An(h ? u[v] : qe), C = /* @__PURE__ */ de(k);
          return L(C, zn(l, v)), C;
        }), n.set(v, m)), m !== void 0) {
          var w = s(m);
          return w === qe ? void 0 : w;
        }
        return Reflect.get(u, v, d);
      },
      getOwnPropertyDescriptor(u, v) {
        var d = Reflect.getOwnPropertyDescriptor(u, v);
        if (d && "value" in d) {
          var m = n.get(v);
          m && (d.value = s(m));
        } else if (d === void 0) {
          var h = n.get(v), w = h == null ? void 0 : h.v;
          if (h !== void 0 && w !== qe)
            return {
              enumerable: !0,
              configurable: !0,
              value: w,
              writable: !0
            };
        }
        return d;
      },
      has(u, v) {
        var w;
        if (v === Zn)
          return !0;
        var d = n.get(v), m = d !== void 0 && d.v !== qe || Reflect.has(u, v);
        if (d !== void 0 || ie !== null && (!m || (w = Jn(u, v)) != null && w.writable)) {
          d === void 0 && (d = o(() => {
            var x = m ? An(u[v]) : qe, k = /* @__PURE__ */ de(x);
            return L(k, zn(l, v)), k;
          }), n.set(v, d));
          var h = s(d);
          if (h === qe)
            return !1;
        }
        return m;
      },
      set(u, v, d, m) {
        var D;
        var h = n.get(v), w = v in u;
        if (a && v === "length")
          for (var x = d; x < /** @type {Source<number>} */
          h.v; x += 1) {
            var k = n.get(x + "");
            k !== void 0 ? ge(k, qe) : x in u && (k = o(() => /* @__PURE__ */ de(qe)), n.set(x + "", k), L(k, zn(l, x)));
          }
        if (h === void 0)
          (!w || (D = Jn(u, v)) != null && D.writable) && (h = o(() => /* @__PURE__ */ de(void 0)), L(h, zn(l, v)), ge(h, An(d)), n.set(v, h));
        else {
          w = h.v !== qe;
          var C = o(() => An(d));
          ge(h, C);
        }
        var b = Reflect.getOwnPropertyDescriptor(u, v);
        if (b != null && b.set && b.set.call(m, d), !w) {
          if (a && typeof v == "string") {
            var _ = (
              /** @type {Source<number>} */
              n.get("length")
            ), M = Number(v);
            Number.isInteger(M) && M >= _.v && ge(_, M + 1);
          }
          Oa(r);
        }
        return !0;
      },
      ownKeys(u) {
        s(r);
        var v = Reflect.ownKeys(u).filter((h) => {
          var w = n.get(h);
          return w === void 0 || w.v !== qe;
        });
        for (var [d, m] of n)
          m.v !== qe && !(d in u) && v.push(d);
        return v;
      },
      setPrototypeOf() {
        Al();
      }
    }
  );
}
function zn(t, e) {
  return typeof e == "symbol" ? `${t}[Symbol(${e.description ?? ""})]` : Mo.test(e) ? `${t}.${e}` : /^\d+$/.test(e) ? `${t}[${e}]` : `${t}['${e}']`;
}
function Qn(t) {
  try {
    if (t !== null && typeof t == "object" && Zn in t)
      return t[Zn];
  } catch {
  }
  return t;
}
function Fo(t, e) {
  return Object.is(Qn(t), Qn(e));
}
const Co = /* @__PURE__ */ new Set([
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
function Ao(t) {
  return new Proxy(t, {
    get(e, n, a) {
      var r = Reflect.get(e, n, a);
      return Co.has(
        /** @type {string} */
        n
      ) ? function(...i) {
        So();
        var o = r.apply(this, i);
        return fs(), o;
      } : r;
    }
  });
}
function Eo() {
  const t = Array.prototype, e = Array.__svelte_cleanup;
  e && e();
  const { indexOf: n, lastIndexOf: a, includes: r } = t;
  t.indexOf = function(i, o) {
    const l = n.call(this, i, o);
    if (l === -1) {
      for (let c = o ?? 0; c < this.length; c += 1)
        if (Qn(this[c]) === i) {
          or("array.indexOf(...)");
          break;
        }
    }
    return l;
  }, t.lastIndexOf = function(i, o) {
    const l = a.call(this, i, o ?? this.length - 1);
    if (l === -1) {
      for (let c = 0; c <= (o ?? this.length - 1); c += 1)
        if (Qn(this[c]) === i) {
          or("array.lastIndexOf(...)");
          break;
        }
    }
    return l;
  }, t.includes = function(i, o) {
    const l = r.call(this, i, o);
    if (!l) {
      for (let c = 0; c < this.length; c += 1)
        if (Qn(this[c]) === i) {
          or("array.includes(...)");
          break;
        }
    }
    return l;
  }, Array.__svelte_cleanup = () => {
    t.indexOf = n, t.lastIndexOf = a, t.includes = r;
  };
}
function A(t, e, n = !0) {
  try {
    t === e != (Qn(t) === Qn(e)) && or(n ? "===" : "!==");
  } catch {
  }
  return t === e === n;
}
var Ni, li, ms, hs;
function No() {
  if (Ni === void 0) {
    Ni = window, li = /Firefox/.test(navigator.userAgent);
    var t = Element.prototype, e = Node.prototype, n = Text.prototype;
    ms = Jn(e, "firstChild").get, hs = Jn(e, "nextSibling").get, Ti(t) && (t.__click = void 0, t.__className = void 0, t.__attributes = null, t.__style = void 0, t.__e = void 0), Ti(n) && (n.__t = void 0), t.__svelte_meta = null, Eo();
  }
}
function Dn(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function En(t) {
  return (
    /** @type {TemplateNode | null} */
    ms.call(t)
  );
}
// @__NO_SIDE_EFFECTS__
function $a(t) {
  return (
    /** @type {TemplateNode | null} */
    hs.call(t)
  );
}
function g(t, e) {
  return /* @__PURE__ */ En(t);
}
function pe(t, e = !1) {
  {
    var n = /* @__PURE__ */ En(t);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ $a(n) : n;
  }
}
function f(t, e = 1, n = !1) {
  let a = t;
  for (; e--; )
    a = /** @type {TemplateNode} */
    /* @__PURE__ */ $a(a);
  return a;
}
function Po(t) {
  t.textContent = "";
}
function gs() {
  return !1;
}
function bs(t, e, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(e ?? Ki, t, void 0)
  );
}
let Pi = !1;
function Do() {
  Pi || (Pi = !0, document.addEventListener(
    "reset",
    (t) => {
      Promise.resolve().then(() => {
        var e;
        if (!t.defaultPrevented)
          for (
            const n of
            /**@type {HTMLFormElement} */
            t.target.elements
          )
            (e = n.__on_r) == null || e.call(n);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function Mr(t) {
  var e = se, n = ie;
  Ht(null), an(null);
  try {
    return t();
  } finally {
    Ht(e), an(n);
  }
}
function _s(t, e, n, a = n) {
  t.addEventListener(e, () => Mr(n));
  const r = t.__on_r;
  r ? t.__on_r = () => {
    r(), a(!0);
  } : t.__on_r = () => a(!0), Do();
}
function Lo(t) {
  ie === null && (se === null && kl(t), wl()), hn && yl(t);
}
function Io(t, e) {
  var n = e.last;
  n === null ? e.last = e.first = t : (n.next = t, t.prev = n, e.last = t);
}
function _n(t, e) {
  for (var n = ie; n !== null && (n.f & Ga) !== 0; )
    n = n.parent;
  n !== null && (n.f & ct) !== 0 && (t |= ct);
  var a = {
    ctx: ze,
    deps: null,
    nodes: null,
    f: t | Je | Rt,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: n,
    b: n && n.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  a.component_function = Pa, q == null || q.register_created_effect(a);
  var r = a;
  if ((t & ya) !== 0)
    ma !== null ? ma.push(a) : oa.ensure().schedule(a);
  else if (e !== null) {
    try {
      Ma(a);
    } catch (o) {
      throw pt(a), o;
    }
    r.deps === null && r.teardown === null && r.nodes === null && r.first === r.last && // either `null`, or a singular child
    (r.f & Na) === 0 && (r = r.first, (t & tn) !== 0 && (t & sa) !== 0 && r !== null && (r.f |= sa));
  }
  if (r !== null && (r.parent = n, n !== null && Io(r, n), se !== null && (se.f & $e) !== 0 && (t & ia) === 0)) {
    var i = (
      /** @type {Derived} */
      se
    );
    (i.effects ?? (i.effects = [])).push(r);
  }
  return a;
}
function oi() {
  return se !== null && !It;
}
function ci(t) {
  const e = _n(Sr, null);
  return Ae(e, Oe), e.teardown = t, e;
}
function xe(t) {
  Lo("$effect"), ra(t, "name", {
    value: "$effect"
  });
  var e = (
    /** @type {Effect} */
    ie.f
  ), n = !se && (e & qt) !== 0 && (e & ua) === 0;
  if (n) {
    var a = (
      /** @type {ComponentContext} */
      ze
    );
    (a.e ?? (a.e = [])).push(t);
  } else
    return xs(t);
}
function xs(t) {
  return _n(ya | sl, t);
}
function Ro(t) {
  oa.ensure();
  const e = _n(ia | Na, t);
  return (n = {}) => new Promise((a) => {
    n.outro ? $n(e, () => {
      pt(e), a(void 0);
    }) : (pt(e), a(void 0));
  });
}
function Bo(t) {
  return _n(ya, t);
}
function Ho(t) {
  return _n(wa | Na, t);
}
function ys(t, e = 0) {
  return _n(Sr | e, t);
}
function O(t, e = [], n = [], a = []) {
  bo(a, e, n, (r) => {
    _n(Sr, () => t(...r.map(s)));
  });
}
function er(t, e = 0) {
  var n = _n(tn | e, t);
  return n.dev_stack = mn, n;
}
function Dt(t) {
  return _n(qt | Na, t);
}
function ws(t) {
  var e = t.teardown;
  if (e !== null) {
    const n = hn, a = se;
    Di(!0), Ht(null);
    try {
      e.call(null);
    } finally {
      Di(n), Ht(a);
    }
  }
}
function di(t, e = !1) {
  var n = t.first;
  for (t.first = t.last = null; n !== null; ) {
    const r = n.ac;
    r !== null && Mr(() => {
      r.abort(cn);
    });
    var a = n.next;
    (n.f & ia) !== 0 ? n.parent = null : pt(n, e), n = a;
  }
}
function Oo(t) {
  for (var e = t.first; e !== null; ) {
    var n = e.next;
    (e.f & qt) === 0 && pt(e), e = n;
  }
}
function pt(t, e = !0) {
  var n = !1;
  (e || (t.f & il) !== 0) && t.nodes !== null && t.nodes.end !== null && (ks(
    t.nodes.start,
    /** @type {TemplateNode} */
    t.nodes.end
  ), n = !0), Ae(t, Mi), di(t, e && !n), ja(t, 0);
  var a = t.nodes && t.nodes.t;
  if (a !== null)
    for (const i of a)
      i.stop();
  ws(t), t.f ^= Mi, t.f |= kt;
  var r = t.parent;
  r !== null && r.first !== null && Ss(t), t.component_function = null, t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes = t.ac = t.b = null;
}
function ks(t, e) {
  for (; t !== null; ) {
    var n = t === e ? null : /* @__PURE__ */ $a(t);
    t.remove(), t = n;
  }
}
function Ss(t) {
  var e = t.parent, n = t.prev, a = t.next;
  n !== null && (n.next = a), a !== null && (a.prev = n), e !== null && (e.first === t && (e.first = a), e.last === t && (e.last = n));
}
function $n(t, e, n = !0) {
  var a = [];
  Ts(t, a, !0);
  var r = () => {
    n && pt(t), e && e();
  }, i = a.length;
  if (i > 0) {
    var o = () => --i || r();
    for (var l of a)
      l.out(o);
  } else
    r();
}
function Ts(t, e, n) {
  if ((t.f & ct) === 0) {
    t.f ^= ct;
    var a = t.nodes && t.nodes.t;
    if (a !== null)
      for (const l of a)
        (l.is_global || n) && e.push(l);
    for (var r = t.first; r !== null; ) {
      var i = r.next, o = (r.f & sa) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (r.f & qt) !== 0 && (t.f & tn) !== 0;
      Ts(r, e, o ? n : !1), r = i;
    }
  }
}
function vi(t) {
  Ms(t, !0);
}
function Ms(t, e) {
  if ((t.f & ct) !== 0) {
    t.f ^= ct, (t.f & Oe) === 0 && (Ae(t, Je), oa.ensure().schedule(t));
    for (var n = t.first; n !== null; ) {
      var a = n.next, r = (n.f & sa) !== 0 || (n.f & qt) !== 0;
      Ms(n, r ? e : !1), n = a;
    }
    var i = t.nodes && t.nodes.t;
    if (i !== null)
      for (const o of i)
        (o.is_global || e) && o.in();
  }
}
function fi(t, e) {
  if (t.nodes)
    for (var n = t.nodes.start, a = t.nodes.end; n !== null; ) {
      var r = n === a ? null : /* @__PURE__ */ $a(n);
      e.append(n), n = r;
    }
}
let mr = !1, hn = !1;
function Di(t) {
  hn = t;
}
let se = null, It = !1;
function Ht(t) {
  se = t;
}
let ie = null;
function an(t) {
  ie = t;
}
let Bt = null;
function Fs(t) {
  se !== null && (Bt === null ? Bt = [t] : Bt.push(t));
}
let Ye = null, dt = 0, Mt = null;
function zo(t) {
  Mt = t;
}
let Cs = 1, jn = 0, ea = jn;
function Li(t) {
  ea = t;
}
function As() {
  return ++Cs;
}
function tr(t) {
  var e = t.f;
  if ((e & Je) !== 0)
    return !0;
  if (e & $e && (t.f &= ~la), (e & nn) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      t.deps
    ), a = n.length, r = 0; r < a; r++) {
      var i = n[r];
      if (tr(
        /** @type {Derived} */
        i
      ) && ds(
        /** @type {Derived} */
        i
      ), i.wv > t.wv)
        return !0;
    }
    (e & Rt) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    Ke === null && Ae(t, Oe);
  }
  return !1;
}
function Es(t, e, n = !0) {
  var a = t.reactions;
  if (a !== null && !(Bt !== null && aa.call(Bt, t)))
    for (var r = 0; r < a.length; r++) {
      var i = a[r];
      (i.f & $e) !== 0 ? Es(
        /** @type {Derived} */
        i,
        e,
        !1
      ) : e === i && (n ? Ae(i, Je) : (i.f & Oe) !== 0 && Ae(i, nn), ri(
        /** @type {Effect} */
        i
      ));
    }
}
function Ns(t) {
  var w;
  var e = Ye, n = dt, a = Mt, r = se, i = Bt, o = ze, l = It, c = ea, p = t.f;
  Ye = /** @type {null | Value[]} */
  null, dt = 0, Mt = null, se = (p & (qt | ia)) === 0 ? t : null, Bt = null, ka(t.ctx), It = !1, ea = ++jn, t.ac !== null && (Mr(() => {
    t.ac.abort(cn);
  }), t.ac = null);
  try {
    t.f |= hr;
    var u = (
      /** @type {Function} */
      t.fn
    ), v = u();
    t.f |= ua;
    var d = t.deps, m = q == null ? void 0 : q.is_fork;
    if (Ye !== null) {
      var h;
      if (m || ja(t, dt), d !== null && dt > 0)
        for (d.length = dt + Ye.length, h = 0; h < Ye.length; h++)
          d[dt + h] = Ye[h];
      else
        t.deps = d = Ye;
      if (oi() && (t.f & Rt) !== 0)
        for (h = dt; h < d.length; h++)
          ((w = d[h]).reactions ?? (w.reactions = [])).push(t);
    } else !m && d !== null && dt < d.length && (ja(t, dt), d.length = dt);
    if ($i() && Mt !== null && !It && d !== null && (t.f & ($e | nn | Je)) === 0)
      for (h = 0; h < /** @type {Source[]} */
      Mt.length; h++)
        Es(
          Mt[h],
          /** @type {Effect} */
          t
        );
    if (r !== null && r !== t) {
      if (jn++, r.deps !== null)
        for (let x = 0; x < n; x += 1)
          r.deps[x].rv = jn;
      if (e !== null)
        for (const x of e)
          x.rv = jn;
      Mt !== null && (a === null ? a = Mt : a.push(.../** @type {Source[]} */
      Mt));
    }
    return (t.f & Nn) !== 0 && (t.f ^= Nn), v;
  } catch (x) {
    return ts(x);
  } finally {
    t.f ^= hr, Ye = e, dt = n, Mt = a, se = r, Bt = i, ka(o), It = l, ea = c;
  }
}
function Go(t, e) {
  let n = e.reactions;
  if (n !== null) {
    var a = $s.call(n, t);
    if (a !== -1) {
      var r = n.length - 1;
      r === 0 ? n = e.reactions = null : (n[a] = n[r], n.pop());
    }
  }
  if (n === null && (e.f & $e) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Ye === null || !aa.call(Ye, e))) {
    var i = (
      /** @type {Derived} */
      e
    );
    (i.f & Rt) !== 0 && (i.f ^= Rt, i.f &= ~la), i.v !== qe && ni(i), ko(i), ja(i, 0);
  }
}
function ja(t, e) {
  var n = t.deps;
  if (n !== null)
    for (var a = e; a < n.length; a++)
      Go(t, n[a]);
}
function Ma(t) {
  var e = t.f;
  if ((e & kt) === 0) {
    Ae(t, Oe);
    var n = ie, a = mr;
    ie = t, mr = !0;
    {
      var r = Pa;
      br(t.component_function);
      var i = (
        /** @type {any} */
        mn
      );
      gr(t.dev_stack ?? mn);
    }
    try {
      (e & (tn | qi)) !== 0 ? Oo(t) : di(t), ws(t);
      var o = Ns(t);
      t.teardown = typeof o == "function" ? o : null, t.wv = Cs;
      var l;
      Ql && (t.f & Je) !== 0 && t.deps;
    } finally {
      mr = a, ie = n, br(r), gr(i);
    }
  }
}
async function jo() {
  await Promise.resolve(), oo();
}
function s(t) {
  var e = t.f, n = (e & $e) !== 0;
  if (se !== null && !It) {
    var a = ie !== null && (ie.f & kt) !== 0;
    if (!a && (Bt === null || !aa.call(Bt, t))) {
      var r = se.deps;
      if ((se.f & hr) !== 0)
        t.rv < jn && (t.rv = jn, Ye === null && r !== null && r[dt] === t ? dt++ : Ye === null ? Ye = [t] : Ye.push(t));
      else {
        (se.deps ?? (se.deps = [])).push(t);
        var i = t.reactions;
        i === null ? t.reactions = [se] : aa.call(i, se) || i.push(se);
      }
    }
  }
  {
    if (!It && ot && !ot.warned && (ot.effect.f & hr) === 0 && !ot.effect_deps.has(t)) {
      ot.warned = !0, Ul(
        /** @type {string} */
        t.label
      );
      var o = Qi("traced at");
      o && console.warn(o);
    }
    xo.delete(t);
  }
  if (hn && Xn.has(t))
    return Xn.get(t);
  if (n) {
    var l = (
      /** @type {Derived} */
      t
    );
    if (hn) {
      var c = l.v;
      return ((l.f & Oe) === 0 && l.reactions !== null || Ds(l)) && (c = ii(l)), Xn.set(l, c), c;
    }
    var p = (l.f & Rt) === 0 && !It && se !== null && (mr || (se.f & Rt) !== 0), u = (l.f & ua) === 0;
    tr(l) && (p && (l.f |= Rt), ds(l)), p && !u && (vs(l), Ps(l));
  }
  if (Ke != null && Ke.has(t))
    return Ke.get(t);
  if ((t.f & Nn) !== 0)
    throw t.v;
  return t.v;
}
function Ps(t) {
  if (t.f |= Rt, t.deps !== null)
    for (const e of t.deps)
      (e.reactions ?? (e.reactions = [])).push(t), (e.f & $e) !== 0 && (e.f & Rt) === 0 && (vs(
        /** @type {Derived} */
        e
      ), Ps(
        /** @type {Derived} */
        e
      ));
}
function Ds(t) {
  if (t.v === qe) return !0;
  if (t.deps === null) return !1;
  for (const e of t.deps)
    if (Xn.has(e) || (e.f & $e) !== 0 && Ds(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function pi(t) {
  var e = It;
  try {
    return It = !0, t();
  } finally {
    It = e;
  }
}
const Vo = ["touchstart", "touchmove"];
function Uo(t) {
  return Vo.includes(t);
}
function N(t, e, n) {
  return (...a) => {
    const r = t(...a);
    var i = r.nodeType === vl ? r.firstChild : r;
    return Ls(i, e, n), r;
  };
}
function qo(t, e, n) {
  t.__svelte_meta = {
    parent: mn,
    loc: { file: e, line: n[0], column: n[1] }
  }, n[2] && Ls(t.firstChild, e, n[2]);
}
function Ls(t, e, n) {
  for (var a = 0; t && a < n.length; )
    t.nodeType === dl && qo(
      /** @type {Element} */
      t,
      e,
      n[a++]
    ), t = t.nextSibling;
}
const Vn = Symbol("events"), Is = /* @__PURE__ */ new Set(), Jr = /* @__PURE__ */ new Set();
function Wo(t, e, n, a = {}) {
  function r(i) {
    if (a.capture || Zr.call(e, i), !i.cancelBubble)
      return Mr(() => n == null ? void 0 : n.call(this, i));
  }
  return t.startsWith("pointer") || t.startsWith("touch") || t === "wheel" ? Pn(() => {
    e.addEventListener(t, r, a);
  }) : e.addEventListener(t, r, a), r;
}
function Ot(t, e, n, a, r) {
  var i = { capture: a, passive: r }, o = Wo(t, e, n, i);
  (e === document.body || // @ts-ignore
  e === window || // @ts-ignore
  e === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  e instanceof HTMLMediaElement) && ci(() => {
    e.removeEventListener(t, o, i);
  });
}
function E(t, e, n) {
  (e[Vn] ?? (e[Vn] = {}))[t] = n;
}
function We(t) {
  for (var e = 0; e < t.length; e++)
    Is.add(t[e]);
  for (var n of Jr)
    n(t);
}
let Ii = null;
function Zr(t) {
  var x, k;
  var e = this, n = (
    /** @type {Node} */
    e.ownerDocument
  ), a = t.type, r = ((x = t.composedPath) == null ? void 0 : x.call(t)) || [], i = (
    /** @type {null | Element} */
    r[0] || t.target
  );
  Ii = t;
  var o = 0, l = Ii === t && t[Vn];
  if (l) {
    var c = r.indexOf(l);
    if (c !== -1 && (e === document || e === /** @type {any} */
    window)) {
      t[Vn] = e;
      return;
    }
    var p = r.indexOf(e);
    if (p === -1)
      return;
    c <= p && (o = c);
  }
  if (i = /** @type {Element} */
  r[o] || t.target, i !== e) {
    ra(t, "currentTarget", {
      configurable: !0,
      get() {
        return i || n;
      }
    });
    var u = se, v = ie;
    Ht(null), an(null);
    try {
      for (var d, m = []; i !== null; ) {
        var h = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var w = (k = i[Vn]) == null ? void 0 : k[a];
          w != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          t.target === i) && w.call(i, t);
        } catch (C) {
          d ? m.push(C) : d = C;
        }
        if (t.cancelBubble || h === e || h === null)
          break;
        i = h;
      }
      if (d) {
        for (let C of m)
          queueMicrotask(() => {
            throw C;
          });
        throw d;
      }
    } finally {
      t[Vn] = e, delete t.currentTarget, Ht(u), an(v);
    }
  }
}
function Yo(t, e, n, a, r, i = !1, o = !1) {
  var p, u;
  let l, c;
  try {
    l = t();
  } catch (v) {
    c = v;
  }
  if (typeof l != "function" && (i || l != null || c)) {
    const v = a == null ? void 0 : a[S], d = r ? ` at ${v}:${r[0]}:${r[1]}` : ` in ${v}`, m = ((p = n[0]) == null ? void 0 : p.eventPhase) < Event.BUBBLING_PHASE ? "capture" : "", w = `\`${((u = n[0]) == null ? void 0 : u.type) + m}\` handler${d}`;
    if (Wl(w, o ? "remove the trailing `()`" : "add a leading `() =>`"), c)
      throw c;
  }
  l == null || l.apply(e, n);
}
var Gi;
const Or = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((Gi = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : Gi.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (t) => t
  })
);
function Ko(t) {
  return (
    /** @type {string} */
    (Or == null ? void 0 : Or.createHTML(t)) ?? t
  );
}
function Jo(t) {
  var e = bs("template");
  return e.innerHTML = Ko(t.replaceAll("<!>", "<!---->")), e.content;
}
function Va(t, e) {
  var n = (
    /** @type {Effect} */
    ie
  );
  n.nodes === null && (n.nodes = { start: t, end: e, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function P(t, e) {
  var n = (e & zl) !== 0, a = (e & Gl) !== 0, r, i = !t.startsWith("<!>");
  return () => {
    r === void 0 && (r = Jo(i ? t : "<!>" + t), n || (r = /** @type {TemplateNode} */
    /* @__PURE__ */ En(r)));
    var o = (
      /** @type {TemplateNode} */
      a || li ? document.importNode(r, !0) : r.cloneNode(!0)
    );
    if (n) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ En(o)
      ), c = (
        /** @type {TemplateNode} */
        o.lastChild
      );
      Va(l, c);
    } else
      Va(o, o);
    return o;
  };
}
function Ee() {
  var t = document.createDocumentFragment(), e = document.createComment(""), n = Dn();
  return t.append(e, n), Va(e, n), t;
}
function F(t, e) {
  t !== null && t.before(
    /** @type {Node} */
    e
  );
}
function I(t, e) {
  var n = e == null ? "" : typeof e == "object" ? `${e}` : e;
  n !== (t.__t ?? (t.__t = t.nodeValue)) && (t.__t = n, t.nodeValue = `${n}`);
}
function nr(t, e) {
  return Zo(t, e);
}
const lr = /* @__PURE__ */ new Map();
function Zo(t, { target: e, anchor: n, props: a = {}, events: r, context: i, intro: o = !0, transformError: l }) {
  No();
  var c = void 0, p = Ro(() => {
    var u = n ?? e.appendChild(Dn());
    fo(
      /** @type {TemplateNode} */
      u,
      {
        pending: () => {
        }
      },
      (m) => {
        le({});
        var h = (
          /** @type {ComponentContext} */
          ze
        );
        i && (h.c = i), r && (a.$$events = r), c = t(m, a) || {}, oe();
      },
      l
    );
    var v = /* @__PURE__ */ new Set(), d = (m) => {
      for (var h = 0; h < m.length; h++) {
        var w = m[h];
        if (!v.has(w)) {
          v.add(w);
          var x = Uo(w);
          for (const b of [e, document]) {
            var k = lr.get(b);
            k === void 0 && (k = /* @__PURE__ */ new Map(), lr.set(b, k));
            var C = k.get(w);
            C === void 0 ? (b.addEventListener(w, Zr, { passive: x }), k.set(w, 1)) : k.set(w, C + 1);
          }
        }
      }
    };
    return d(kr(Is)), Jr.add(d), () => {
      var x;
      for (var m of v)
        for (const k of [e, document]) {
          var h = (
            /** @type {Map<string, number>} */
            lr.get(k)
          ), w = (
            /** @type {number} */
            h.get(m)
          );
          --w == 0 ? (k.removeEventListener(m, Zr), h.delete(m), h.size === 0 && lr.delete(k)) : h.set(m, w);
        }
      Jr.delete(d), u !== n && ((x = u.parentNode) == null || x.removeChild(u));
    };
  });
  return Xr.set(c, p), c;
}
let Xr = /* @__PURE__ */ new WeakMap();
function ar(t, e) {
  const n = Xr.get(t);
  return n ? (Xr.delete(t), n(e)) : (Zn in t ? Jl() : Yl(), Promise.resolve());
}
function ce(t) {
  t && gl(t[S] ?? "a component", t.name);
}
function ue() {
  const t = ze == null ? void 0 : ze.function;
  function e(n) {
    hl(n, t[S]);
  }
  return {
    $destroy: () => e("$destroy()"),
    $on: () => e("$on(...)"),
    $set: () => e("$set(...)")
  };
}
var jt, Qt, _t, Kn, Xa, Qa, wr;
class mi {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(e, n = !0) {
    /** @type {TemplateNode} */
    Xe(this, "anchor");
    /** @type {Map<Batch, Key>} */
    $(this, jt, /* @__PURE__ */ new Map());
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
    $(this, Qt, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    $(this, _t, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    $(this, Kn, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    $(this, Xa, !0);
    /**
     * @param {Batch} batch
     */
    $(this, Qa, (e) => {
      if (y(this, jt).has(e)) {
        var n = (
          /** @type {Key} */
          y(this, jt).get(e)
        ), a = y(this, Qt).get(n);
        if (a)
          vi(a), y(this, Kn).delete(n);
        else {
          var r = y(this, _t).get(n);
          r && (y(this, Qt).set(n, r.effect), y(this, _t).delete(n), r.fragment.lastChild[cl] = this.anchor, r.fragment.lastChild.remove(), this.anchor.before(r.fragment), a = r.effect);
        }
        for (const [i, o] of y(this, jt)) {
          if (y(this, jt).delete(i), i === e)
            break;
          const l = y(this, _t).get(o);
          l && (pt(l.effect), y(this, _t).delete(o));
        }
        for (const [i, o] of y(this, Qt)) {
          if (i === n || y(this, Kn).has(i)) continue;
          const l = () => {
            if (Array.from(y(this, jt).values()).includes(i)) {
              var p = document.createDocumentFragment();
              fi(o, p), p.append(Dn()), y(this, _t).set(i, { effect: o, fragment: p });
            } else
              pt(o);
            y(this, Kn).delete(i), y(this, Qt).delete(i);
          };
          y(this, Xa) || !a ? (y(this, Kn).add(i), $n(o, l, !1)) : l();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    $(this, wr, (e) => {
      y(this, jt).delete(e);
      const n = Array.from(y(this, jt).values());
      for (const [a, r] of y(this, _t))
        n.includes(a) || (pt(r.effect), y(this, _t).delete(a));
    });
    this.anchor = e, Q(this, Xa, n);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(e, n) {
    var a = (
      /** @type {Batch} */
      q
    ), r = gs();
    if (n && !y(this, Qt).has(e) && !y(this, _t).has(e))
      if (r) {
        var i = document.createDocumentFragment(), o = Dn();
        i.append(o), y(this, _t).set(e, {
          effect: Dt(() => n(o)),
          fragment: i
        });
      } else
        y(this, Qt).set(
          e,
          Dt(() => n(this.anchor))
        );
    if (y(this, jt).set(a, e), r) {
      for (const [l, c] of y(this, Qt))
        l === e ? a.unskip_effect(c) : a.skip_effect(c);
      for (const [l, c] of y(this, _t))
        l === e ? a.unskip_effect(c.effect) : a.skip_effect(c.effect);
      a.oncommit(y(this, Qa)), a.ondiscard(y(this, wr));
    } else
      y(this, Qa).call(this, a);
  }
}
jt = new WeakMap(), Qt = new WeakMap(), _t = new WeakMap(), Kn = new WeakMap(), Xa = new WeakMap(), Qa = new WeakMap(), wr = new WeakMap();
function j(t, e, n = !1) {
  var a = new mi(t), r = n ? sa : 0;
  function i(o, l) {
    a.ensure(o, l);
  }
  er(() => {
    var o = !1;
    e((l, c = 0) => {
      o = !0, i(c, l);
    }), o || i(-1, null);
  }, r);
}
const Xo = Symbol("NaN");
function Fr(t, e, n) {
  var a = new mi(t);
  er(() => {
    var r = e();
    r !== r && (r = /** @type {any} */
    Xo), a.ensure(r, n);
  });
}
function ht(t, e) {
  return e;
}
function Qo(t, e, n) {
  for (var a = [], r = e.length, i, o = e.length, l = 0; l < r; l++) {
    let v = e[l];
    $n(
      v,
      () => {
        if (i) {
          if (i.pending.delete(v), i.done.add(v), i.pending.size === 0) {
            var d = (
              /** @type {Set<EachOutroGroup>} */
              t.outrogroups
            );
            Qr(t, kr(i.done)), d.delete(i), d.size === 0 && (t.outrogroups = null);
          }
        } else
          o -= 1;
      },
      !1
    );
  }
  if (o === 0) {
    var c = a.length === 0 && n !== null;
    if (c) {
      var p = (
        /** @type {Element} */
        n
      ), u = (
        /** @type {Element} */
        p.parentNode
      );
      Po(u), u.append(p), t.items.clear();
    }
    Qr(t, e, !c);
  } else
    i = {
      pending: new Set(e),
      done: /* @__PURE__ */ new Set()
    }, (t.outrogroups ?? (t.outrogroups = /* @__PURE__ */ new Set())).add(i);
}
function Qr(t, e, n = !0) {
  var a;
  if (t.pending.size > 0) {
    a = /* @__PURE__ */ new Set();
    for (const o of t.pending.values())
      for (const l of o)
        a.add(
          /** @type {EachItem} */
          t.items.get(l).e
        );
  }
  for (var r = 0; r < e.length; r++) {
    var i = e[r];
    if (a != null && a.has(i)) {
      i.f |= en;
      const o = document.createDocumentFragment();
      fi(i, o);
    } else
      pt(e[r], n);
  }
}
var Ri;
function Ge(t, e, n, a, r, i = null) {
  var o = t, l = /* @__PURE__ */ new Map(), c = (e & Yi) !== 0;
  if (c) {
    var p = (
      /** @type {Element} */
      t
    );
    o = p.appendChild(Dn());
  }
  var u = null, v = /* @__PURE__ */ us(() => {
    var b = n();
    return ti(b) ? b : b == null ? [] : kr(b);
  });
  L(v, "{#each ...}");
  var d, m = /* @__PURE__ */ new Map(), h = !0;
  function w(b) {
    (C.effect.f & kt) === 0 && (C.pending.delete(b), C.fallback = u, $o(C, d, o, e, a), u !== null && (d.length === 0 ? (u.f & en) === 0 ? vi(u) : (u.f ^= en, Ra(u, null, o)) : $n(u, () => {
      u = null;
    })));
  }
  function x(b) {
    C.pending.delete(b);
  }
  var k = er(() => {
    d = /** @type {V[]} */
    s(v);
    for (var b = d.length, _ = /* @__PURE__ */ new Set(), M = (
      /** @type {Batch} */
      q
    ), D = gs(), H = 0; H < b; H += 1) {
      var W = d[H], G = a(W, H);
      {
        var me = a(W, H);
        G !== me && xl(String(H), String(G), String(me));
      }
      var R = h ? null : l.get(G);
      R ? (R.v && Ta(R.v, W), R.i && Ta(R.i, H), D && M.unskip_effect(R.e)) : (R = ec(
        l,
        h ? o : Ri ?? (Ri = Dn()),
        W,
        G,
        H,
        r,
        e,
        n
      ), h || (R.e.f |= en), l.set(G, R)), _.add(G);
    }
    if (b === 0 && i && !u && (h ? u = Dt(() => i(o)) : (u = Dt(() => i(Ri ?? (Ri = Dn()))), u.f |= en)), b > _.size && tc(d, a), !h)
      if (m.set(M, _), D) {
        for (const [z, X] of l)
          _.has(z) || M.skip_effect(X.e);
        M.oncommit(w), M.ondiscard(x);
      } else
        w(M);
    s(v);
  }), C = { effect: k, items: l, pending: m, outrogroups: null, fallback: u };
  h = !1;
}
function Ia(t) {
  for (; t !== null && (t.f & qt) === 0; )
    t = t.next;
  return t;
}
function $o(t, e, n, a, r) {
  var me, R, z, X, ee, Y, J, ve, V;
  var i = (a & Ll) !== 0, o = e.length, l = t.items, c = Ia(t.effect.first), p, u = null, v, d = [], m = [], h, w, x, k;
  if (i)
    for (k = 0; k < o; k += 1)
      h = e[k], w = r(h, k), x = /** @type {EachItem} */
      l.get(w).e, (x.f & en) === 0 && ((R = (me = x.nodes) == null ? void 0 : me.a) == null || R.measure(), (v ?? (v = /* @__PURE__ */ new Set())).add(x));
  for (k = 0; k < o; k += 1) {
    if (h = e[k], w = r(h, k), x = /** @type {EachItem} */
    l.get(w).e, t.outrogroups !== null)
      for (const B of t.outrogroups)
        B.pending.delete(x), B.done.delete(x);
    if ((x.f & ct) !== 0 && (vi(x), i && ((X = (z = x.nodes) == null ? void 0 : z.a) == null || X.unfix(), (v ?? (v = /* @__PURE__ */ new Set())).delete(x))), (x.f & en) !== 0)
      if (x.f ^= en, x === c)
        Ra(x, null, n);
      else {
        var C = u ? u.next : c;
        x === t.effect.last && (t.effect.last = x.prev), x.prev && (x.prev.next = x.next), x.next && (x.next.prev = x.prev), xn(t, u, x), xn(t, x, C), Ra(x, C, n), u = x, d = [], m = [], c = Ia(u.next);
        continue;
      }
    if (x !== c) {
      if (p !== void 0 && p.has(x)) {
        if (d.length < m.length) {
          var b = m[0], _;
          u = b.prev;
          var M = d[0], D = d[d.length - 1];
          for (_ = 0; _ < d.length; _ += 1)
            Ra(d[_], b, n);
          for (_ = 0; _ < m.length; _ += 1)
            p.delete(m[_]);
          xn(t, M.prev, D.next), xn(t, u, M), xn(t, D, b), c = b, u = D, k -= 1, d = [], m = [];
        } else
          p.delete(x), Ra(x, c, n), xn(t, x.prev, x.next), xn(t, x, u === null ? t.effect.first : u.next), xn(t, u, x), u = x;
        continue;
      }
      for (d = [], m = []; c !== null && c !== x; )
        (p ?? (p = /* @__PURE__ */ new Set())).add(c), m.push(c), c = Ia(c.next);
      if (c === null)
        continue;
    }
    (x.f & en) === 0 && d.push(x), u = x, c = Ia(x.next);
  }
  if (t.outrogroups !== null) {
    for (const B of t.outrogroups)
      B.pending.size === 0 && (Qr(t, kr(B.done)), (ee = t.outrogroups) == null || ee.delete(B));
    t.outrogroups.size === 0 && (t.outrogroups = null);
  }
  if (c !== null || p !== void 0) {
    var H = [];
    if (p !== void 0)
      for (x of p)
        (x.f & ct) === 0 && H.push(x);
    for (; c !== null; )
      (c.f & ct) === 0 && c !== t.fallback && H.push(c), c = Ia(c.next);
    var W = H.length;
    if (W > 0) {
      var G = (a & Yi) !== 0 && o === 0 ? n : null;
      if (i) {
        for (k = 0; k < W; k += 1)
          (J = (Y = H[k].nodes) == null ? void 0 : Y.a) == null || J.measure();
        for (k = 0; k < W; k += 1)
          (V = (ve = H[k].nodes) == null ? void 0 : ve.a) == null || V.fix();
      }
      Qo(t, H, G);
    }
  }
  i && Pn(() => {
    var B, fe;
    if (v !== void 0)
      for (x of v)
        (fe = (B = x.nodes) == null ? void 0 : B.a) == null || fe.apply();
  });
}
function ec(t, e, n, a, r, i, o, l) {
  var c = (o & Pl) !== 0 ? (o & Il) === 0 ? /* @__PURE__ */ To(n, !1, !1) : ca(n) : null, p = (o & Dl) !== 0 ? ca(r) : null;
  return c && (c.trace = () => {
    l()[(p == null ? void 0 : p.v) ?? r];
  }), {
    v: c,
    i: p,
    e: Dt(() => (i(e, c ?? n, p ?? r, l), () => {
      t.delete(a);
    }))
  };
}
function Ra(t, e, n) {
  if (t.nodes)
    for (var a = t.nodes.start, r = t.nodes.end, i = e && (e.f & en) === 0 ? (
      /** @type {EffectNodes} */
      e.nodes.start
    ) : n; a !== null; ) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ $a(a)
      );
      if (i.before(a), a === r)
        return;
      a = o;
    }
}
function xn(t, e, n) {
  e === null ? t.effect.first = n : e.next = n, n === null ? t.effect.last = e : n.prev = e;
}
function tc(t, e) {
  const n = /* @__PURE__ */ new Map(), a = t.length;
  for (let r = 0; r < a; r++) {
    const i = e(t[r], r);
    if (n.has(i)) {
      const o = String(n.get(i)), l = String(r);
      let c = String(i);
      c.startsWith("[object ") && (c = null), _l(o, l, c);
    }
    n.set(i, r);
  }
}
function nc(t, e, n = !1, a = !1, r = !1, i = !1) {
  var o = t, l = "";
  if (n)
    var c = (
      /** @type {Element} */
      t
    );
  O(() => {
    var p = (
      /** @type {Effect} */
      ie
    );
    if (l !== (l = e() ?? "")) {
      if (n) {
        p.nodes = null, c.innerHTML = /** @type {string} */
        l, l !== "" && Va(
          /** @type {TemplateNode} */
          /* @__PURE__ */ En(c),
          /** @type {TemplateNode} */
          c.lastChild
        );
        return;
      }
      if (p.nodes !== null && (ks(
        p.nodes.start,
        /** @type {TemplateNode} */
        p.nodes.end
      ), p.nodes = null), l !== "") {
        var u = a ? jl : r ? Vl : void 0, v = (
          /** @type {HTMLTemplateElement | SVGElement | MathMLElement} */
          bs(a ? "svg" : r ? "math" : "template", u)
        );
        v.innerHTML = /** @type {any} */
        l;
        var d = a || r ? v : (
          /** @type {HTMLTemplateElement} */
          v.content
        );
        if (Va(
          /** @type {TemplateNode} */
          /* @__PURE__ */ En(d),
          /** @type {TemplateNode} */
          d.lastChild
        ), a || r)
          for (; /* @__PURE__ */ En(d); )
            o.before(
              /** @type {TemplateNode} */
              /* @__PURE__ */ En(d)
            );
        else
          o.before(d);
      }
    }
  });
}
function ac(t) {
  return t.toString = () => (pl(), ""), t;
}
function rc(t, e, ...n) {
  var a = new mi(t);
  er(() => {
    const r = e() ?? null;
    r == null && Tl(), a.ensure(r, r && ((i) => r(i, ...n)));
  }, sa);
}
function Bi(t, e) {
  const n = (a, ...r) => {
    var i = Pa;
    br(t);
    try {
      return e(a, ...r);
    } finally {
      br(i);
    }
  };
  return ac(n), n;
}
function ic(t, e, n) {
  var a = t == null ? "" : "" + t;
  return a === "" ? null : a;
}
function sc(t, e) {
  return t == null ? null : String(t);
}
function mt(t, e, n, a, r, i) {
  var o = t.__className;
  if (o !== n || o === void 0) {
    var l = ic(n);
    l == null ? t.removeAttribute("class") : t.className = l, t.__className = n;
  }
  return i;
}
function lc(t, e, n, a) {
  var r = t.__style;
  if (r !== e) {
    var i = sc(e);
    i == null ? t.removeAttribute("style") : t.style.cssText = i, t.__style = e;
  }
  return a;
}
function Wt(t, e, n = !1) {
  if (t.multiple) {
    if (e == null)
      return;
    if (!ti(e))
      return Kl();
    for (var a of t.options)
      a.selected = e.includes(za(a));
    return;
  }
  for (a of t.options) {
    var r = za(a);
    if (Fo(r, e)) {
      a.selected = !0;
      return;
    }
  }
  (!n || e !== void 0) && (t.selectedIndex = -1);
}
function rn(t) {
  var e = new MutationObserver(() => {
    Wt(t, t.__value);
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
  }), ci(() => {
    e.disconnect();
  });
}
function $r(t, e, n = e) {
  var a = /* @__PURE__ */ new WeakSet(), r = !0;
  _s(t, "change", (i) => {
    var o = i ? "[selected]" : ":checked", l;
    if (t.multiple)
      l = [].map.call(t.querySelectorAll(o), za);
    else {
      var c = t.querySelector(o) ?? // will fall back to first non-disabled option if no option is selected
      t.querySelector("option:not([disabled])");
      l = c && za(c);
    }
    n(l), t.__value = l, q !== null && a.add(q);
  }), Bo(() => {
    var i = e();
    if (t === document.activeElement) {
      var o = (
        /** @type {Batch} */
        q
      );
      if (a.has(o))
        return;
    }
    if (Wt(t, i, r), r && i === void 0) {
      var l = t.querySelector(":checked");
      l !== null && (i = za(l), n(i));
    }
    t.__value = i, r = !1;
  }), rn(t);
}
function za(t) {
  return "__value" in t ? t.__value : t.value;
}
const oc = Symbol("is custom element"), cc = Symbol("is html"), uc = ul ? "progress" : "PROGRESS";
function re(t, e) {
  var n = hi(t);
  n.value === (n.value = // treat null and undefined the same for the initial value
  e ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  t.value === e && (e !== 0 || t.nodeName !== uc) || (t.value = e ?? "");
}
function Pt(t, e) {
  var n = hi(t);
  n.checked !== (n.checked = // treat null and undefined the same for the initial value
  e ?? void 0) && (t.checked = e);
}
function Ua(t, e, n, a) {
  var r = hi(t);
  r[e] !== (r[e] = n) && (e === "loading" && (t[ol] = n), n == null ? t.removeAttribute(e) : typeof n != "string" && dc(t).includes(e) ? t[e] = n : t.setAttribute(e, n));
}
function hi(t) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    t.__attributes ?? (t.__attributes = {
      [oc]: t.nodeName.includes("-"),
      [cc]: t.namespaceURI === Ki
    })
  );
}
var Hi = /* @__PURE__ */ new Map();
function dc(t) {
  var e = t.getAttribute("is") || t.nodeName, n = Hi.get(e);
  if (n) return n;
  Hi.set(e, n = []);
  for (var a, r = t, i = Element.prototype; i !== r; ) {
    a = el(r);
    for (var o in a)
      a[o].set && n.push(o);
    r = Vi(r);
  }
  return n;
}
function gi(t, e, n = e) {
  var a = /* @__PURE__ */ new WeakSet();
  _s(t, "input", async (r) => {
    t.type === "checkbox" && Fi();
    var i = r ? t.defaultValue : t.value;
    if (i = zr(t) ? Gr(i) : i, n(i), q !== null && a.add(q), await jo(), i !== (i = e())) {
      var o = t.selectionStart, l = t.selectionEnd, c = t.value.length;
      if (t.value = i ?? "", l !== null) {
        var p = t.value.length;
        o === l && l === c && p > c ? (t.selectionStart = p, t.selectionEnd = p) : (t.selectionStart = o, t.selectionEnd = Math.min(l, p));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  pi(e) == null && t.value && (n(zr(t) ? Gr(t.value) : t.value), q !== null && a.add(q)), ys(() => {
    t.type === "checkbox" && Fi();
    var r = e();
    if (t === document.activeElement) {
      var i = (
        /** @type {Batch} */
        q
      );
      if (a.has(i))
        return;
    }
    zr(t) && r === Gr(t.value) || t.type === "date" && !r && !t.value || r !== t.value && (t.value = r ?? "");
  });
}
function zr(t) {
  var e = t.type;
  return e === "number" || e === "range";
}
function Gr(t) {
  return t === "" ? null : +t;
}
function yt(t, e, n, a) {
  var C;
  var r = (n & Hl) !== 0, i = (n & Ol) !== 0, o = (
    /** @type {V} */
    a
  ), l = !0, c = () => (l && (l = !1, o = i ? pi(
    /** @type {() => V} */
    a
  ) : (
    /** @type {V} */
    a
  )), o);
  let p;
  if (r) {
    var u = Zn in t || ll in t;
    p = ((C = Jn(t, e)) == null ? void 0 : C.set) ?? (u && e in t ? (b) => t[e] = b : void 0);
  }
  var v, d = !1;
  r ? [v, d] = ro(() => (
    /** @type {V} */
    t[e]
  )) : v = /** @type {V} */
  t[e], v === void 0 && a !== void 0 && (v = c(), p && (Ml(e), p(v)));
  var m;
  if (m = () => {
    var b = (
      /** @type {V} */
      t[e]
    );
    return b === void 0 ? c() : (l = !0, b);
  }, (n & Bl) === 0)
    return m;
  if (p) {
    var h = t.$$legacy;
    return (
      /** @type {() => V} */
      (function(b, _) {
        return arguments.length > 0 ? ((!_ || h || d) && p(_ ? m() : b), b) : m();
      })
    );
  }
  var w = !1, x = ((n & Rl) !== 0 ? Tr : us)(() => (w = !1, m()));
  x.label = e, r && s(x);
  var k = (
    /** @type {Effect} */
    ie
  );
  return (
    /** @type {() => V} */
    (function(b, _) {
      if (arguments.length > 0) {
        const M = _ ? s(x) : r ? An(b) : b;
        return ge(x, M), w = !0, o !== void 0 && (o = M), b;
      }
      return hn && w || (k.f & kt) !== 0 ? x.v : s(x);
    })
  );
}
{
  let t = function(e) {
    if (!(e in globalThis)) {
      let n;
      Object.defineProperty(globalThis, e, {
        configurable: !0,
        // eslint-disable-next-line getter-return
        get: () => {
          if (n !== void 0)
            return n;
          Fl(e);
        },
        set: (a) => {
          n = a;
        }
      });
    }
  };
  var Bd = t;
  t("$state"), t("$effect"), t("$derived"), t("$inspect"), t("$props"), t("$bindable");
}
const vc = "5";
var ji;
typeof window < "u" && ((ji = window.__svelte ?? (window.__svelte = {})).v ?? (ji.v = /* @__PURE__ */ new Set())).add(vc);
gn[S] = "src/components/ui/RollButton.svelte";
var fc = N(/* @__PURE__ */ P('<button class="w-5 h-5 bg-slate-700 border-0 text-slate-400 rounded text-xs cursor-pointer hover:bg-slate-600 hover:text-slate-200 inline-flex items-center justify-center flex-shrink-0">🎲</button>'), gn[S], [[5, 0]]);
function gn(t, e) {
  ce(new.target), le(e, !0, gn);
  let n = yt(e, "title", 3, "Roll");
  var a = { ...ue() }, r = fc();
  return O(() => Ua(r, "title", n())), E("click", r, function(...i) {
    Yo(() => e.onclick, this, i, gn, [7, 3]);
  }), F(t, r), oe(a);
}
We(["click"]);
$t[S] = "src/components/sidebar/StatInput.svelte";
var pc = N(/* @__PURE__ */ P('<span class="w-8 text-center text-sm font-bold text-slate-500">0</span>'), $t[S], [[33, 8]]), mc = N(/* @__PURE__ */ P('<input type="number" class="w-8 text-center bg-slate-900 border border-slate-700 text-slate-100 rounded text-sm font-bold p-0.5" min="0"/>'), $t[S], [[35, 8]]), hc = N(/* @__PURE__ */ P('<div class="flex items-center justify-between"><span class="text-xs text-slate-400 w-9"> </span> <div class="flex items-center gap-1"><button type="button" class="w-5 h-5 bg-slate-700 border-0 text-slate-400 rounded text-xs cursor-pointer hover:bg-slate-600 disabled:opacity-30">−</button> <!> <button type="button" class="w-5 h-5 bg-slate-700 border-0 text-slate-400 rounded text-xs cursor-pointer hover:bg-slate-600 disabled:opacity-30">+</button></div> <span class="text-xs text-slate-500 w-6 text-right"> </span> <!></div>'), $t[S], [[23, 2, [[24, 4], [25, 4, [[26, 6], [43, 6]]], [50, 4]]]]);
function $t(t, e) {
  ce(new.target), le(e, !0, $t);
  let n = yt(e, "onRoll", 3, null);
  function a() {
    A(e.mode, "missing") || A(e.mode, "zero") || e.onUpdate(e.value + 1);
  }
  function r() {
    A(e.mode, "missing") || A(e.mode, "zero") || e.value > 0 && e.onUpdate(e.value - 1);
  }
  function i(u) {
    const v = Math.max(0, Math.floor(Number(u.target.value) || 0));
    e.onUpdate(v);
  }
  var o = { ...ue() }, l = Ee(), c = pe(l);
  {
    var p = (u) => {
      var v = hc(), d = g(v), m = g(d), h = f(d, 2), w = g(h), x = f(w, 2);
      {
        var k = (W) => {
          var G = pc();
          F(W, G);
        }, C = (W) => {
          var G = mc();
          O(() => re(G, e.value)), E("change", G, i), F(W, G);
        };
        T(
          () => j(x, (W) => {
            A(e.mode, "zero") ? W(k) : W(C, -1);
          }),
          "if",
          $t,
          32,
          6
        );
      }
      var b = f(x, 2), _ = f(h, 2), M = g(_), D = f(_, 2);
      {
        var H = (W) => {
          T(
            () => gn(W, {
              get onclick() {
                return n();
              },
              get title() {
                return `Roll ${e.label ?? ""}`;
              }
            }),
            "component",
            $t,
            52,
            6,
            { componentTag: "RollButton" }
          );
        };
        T(
          () => j(D, (W) => {
            n() && W(H);
          }),
          "if",
          $t,
          51,
          4
        );
      }
      O(() => {
        I(m, e.label), w.disabled = A(e.mode, "zero"), b.disabled = A(e.mode, "zero"), I(M, `${e.cpCost ?? ""}cp`);
      }), E("click", w, r), E("click", b, a), F(u, v);
    };
    T(
      () => j(c, (u) => {
        A(e.mode, "missing", !1) && u(p);
      }),
      "if",
      $t,
      22,
      0
    );
  }
  return F(t, l), oe(o);
}
We(["click", "change"]);
Cr[S] = "src/components/sidebar/CPTracker.svelte";
var gc = N(/* @__PURE__ */ P('<div class="border-t border-slate-700 pt-2"><div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Character Points</div> <div class="flex justify-between text-xs"><span class="text-slate-400">Total</span> <span class="text-slate-100"> </span></div> <div class="flex justify-between text-xs"><span class="text-slate-400">Spent</span> <span class="text-slate-100"> </span></div> <div class="flex justify-between text-xs"><span class="text-slate-400">Remaining</span> <span> </span></div></div>'), Cr[S], [
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
function Cr(t, e) {
  ce(new.target), le(e, !0, Cr);
  let n = L(/* @__PURE__ */ Z(() => e.remaining < 0), "overBudget");
  var a = { ...ue() }, r = gc(), i = f(g(r), 2), o = f(g(i), 2), l = g(o), c = f(i, 2), p = f(g(c), 2), u = g(p), v = f(c, 2), d = f(g(v), 2), m = g(d);
  return O(() => {
    I(l, e.total), I(u, e.spent), mt(d, 1, `font-bold ${s(n) ? "text-red-400" : "text-emerald-400"}`), I(m, e.remaining);
  }), F(t, r), oe(a);
}
Ar[S] = "src/components/sidebar/SPTracker.svelte";
var bc = N(/* @__PURE__ */ P('<div class="border-t border-slate-700 pt-2"><div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Skill Points</div> <div class="flex justify-between text-xs"><span class="text-slate-400">Pool</span> <span class="text-slate-100"> </span></div> <div class="flex justify-between text-xs"><span class="text-slate-400">Spent</span> <span class="text-slate-100"> </span></div> <div class="flex justify-between text-xs"><span class="text-slate-400">Remaining</span> <span> </span></div></div>'), Ar[S], [
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
function Ar(t, e) {
  ce(new.target), le(e, !0, Ar);
  let n = L(/* @__PURE__ */ Z(() => e.remaining < 0), "overBudget");
  var a = { ...ue() }, r = bc(), i = f(g(r), 2), o = f(g(i), 2), l = g(o), c = f(i, 2), p = f(g(c), 2), u = g(p), v = f(c, 2), d = f(g(v), 2), m = g(d);
  return O(() => {
    I(l, e.pool), I(u, e.spent), mt(d, 1, `font-bold ${s(n) ? "text-red-400" : "text-emerald-400"}`), I(m, e.remaining);
  }), F(t, r), oe(a);
}
Lt[S] = "src/components/sidebar/DerivedStats.svelte";
var _c = N(/* @__PURE__ */ P('<span class="text-slate-400">HP</span> <span class="text-slate-100 text-right"> </span>', 1), Lt[S], [[9, 6], [10, 6]]), xc = N(/* @__PURE__ */ P('<span class="text-slate-400">EP</span> <span class="text-slate-100 text-right"> </span>', 1), Lt[S], [[13, 6], [14, 6]]), yc = N(/* @__PURE__ */ P('<span class="text-slate-400">ACV</span> <span class="text-slate-100 text-right"> </span> <span class="text-slate-400">DCV</span> <span class="text-slate-100 text-right"> </span>', 1), Lt[S], [[17, 6], [18, 6], [19, 6], [20, 6]]), wc = N(/* @__PURE__ */ P('<span class="text-slate-400">SV</span> <span class="text-slate-100 text-right"> </span>', 1), Lt[S], [[23, 6], [24, 6]]), kc = N(/* @__PURE__ */ P('<div class="border-t border-slate-700 pt-2"><div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Derived</div> <div class="grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs"><!> <!> <!> <!> <span class="text-slate-400">DM</span> <span class="text-slate-100 text-right"> </span> <span class="text-slate-400">AR</span> <span class="text-slate-100 text-right"> </span></div></div>'), Lt[S], [
  [5, 0, [[6, 2], [7, 2, [[26, 4], [27, 4], [28, 4], [29, 4]]]]]
]);
function Lt(t, e) {
  ce(new.target), le(e, !0, Lt);
  let n = yt(e, "showEP", 3, !0), a = yt(e, "showCV", 3, !0);
  yt(e, "showMovement", 3, !1);
  var r = { ...ue() }, i = kc(), o = f(g(i), 2), l = g(o);
  {
    var c = (b) => {
      var _ = _c(), M = f(pe(_), 2), D = g(M);
      O(() => I(D, `${e.derived.currentHp ?? ""}/${e.derived.hpMax ?? ""}`)), F(b, _);
    };
    T(
      () => j(l, (b) => {
        e.derived.hpApplicable && b(c);
      }),
      "if",
      Lt,
      8,
      4
    );
  }
  var p = f(l, 2);
  {
    var u = (b) => {
      var _ = xc(), M = f(pe(_), 2), D = g(M);
      O(() => I(D, `${e.derived.currentEp ?? ""}/${e.derived.epMax ?? ""}`)), F(b, _);
    };
    T(
      () => j(p, (b) => {
        n() && e.derived.epApplicable && b(u);
      }),
      "if",
      Lt,
      12,
      4
    );
  }
  var v = f(p, 2);
  {
    var d = (b) => {
      var _ = yc(), M = f(pe(_), 2), D = g(M), H = f(M, 4), W = g(H);
      O(() => {
        I(D, e.derived.acv), I(W, e.derived.dcv);
      }), F(b, _);
    };
    T(
      () => j(v, (b) => {
        a() && b(d);
      }),
      "if",
      Lt,
      16,
      4
    );
  }
  var m = f(v, 2);
  {
    var h = (b) => {
      var _ = wc(), M = f(pe(_), 2), D = g(M);
      O(() => I(D, e.derived.sv)), F(b, _);
    };
    T(
      () => j(m, (b) => {
        e.derived.hpApplicable && b(h);
      }),
      "if",
      Lt,
      22,
      4
    );
  }
  var w = f(m, 4), x = g(w), k = f(w, 4), C = g(k);
  return O(() => {
    I(x, `${e.derived.damageMultiplier ?? ""}/${e.derived.meleeDamageMultiplier ?? ""}`), I(C, e.derived.ar);
  }), F(t, i), oe(r);
}
function da(t, ...e) {
  return e.reduce((n, a) => n + a, t);
}
function Er(t) {
  return t === "minor" ? "3d6kl2" : t === "major" ? "4d6kl2" : "2d6";
}
const Sc = {
  stat: "Stat Roll",
  skill: "Skill Roll",
  initiative: "Initiative",
  attack: "Attack Roll",
  defence: "Defence Roll",
  sanity: "Sanity Roll",
  social: "Social Combat Roll"
};
function va(t, e, n, a) {
  const r = Sc[t] ?? "Roll", i = e.dice.map((l) => `<span class="besm-die">${l}</span>`).join(" + "), o = n.filter((l) => l.value !== 0).map((l) => `<span class="besm-mod">+${l.value} ${l.label}</span>`).join(" ");
  return `<div class="besm-roll">
  <div class="besm-roll-header">${r}</div>
  <div class="besm-roll-dice">${i} = ${e.diceTotal}</div>
  ${o ? `<div class="besm-roll-mods">${o}</div>` : ""}
  <div class="besm-roll-total">Total: ${a}</div>
</div>`;
}
function Rs(t) {
  const n = (t.terms ?? []).find((i) => i.results);
  if (!n) return { dice: [], diceTotal: t.total };
  const a = n.results.map((i) => i.result), r = a.reduce((i, o) => i + o, 0);
  return { dice: a, diceTotal: r };
}
async function Bs(t, e) {
  const n = t.system.stats[e];
  if (n.mode !== "missing")
    return { value: n.mode === "zero" ? 0 : n.value, label: e };
  const a = ["body", "mind", "soul"].filter((l) => t.system.stats[l].mode !== "missing").map((l) => ({
    key: l,
    value: t.system.stats[l].mode === "zero" ? 0 : t.system.stats[l].value,
    label: l.charAt(0).toUpperCase() + l.slice(1)
  }));
  if (a.length === 0)
    return ui.notifications.warn("No stats available for this roll."), null;
  if (a.length === 1)
    return { value: a[0].value, label: a[0].key };
  const r = a.map((l) => ({
    label: `${l.label} (${l.value})`,
    action: l.key,
    callback: () => l.key
  })), i = await foundry.applications.api.DialogV2.wait({
    window: { title: "Missing Stat — Choose Substitute" },
    content: "<p>This roll calls for a missing stat. Choose which stat to substitute:</p>",
    buttons: r
  });
  if (!i) return null;
  const o = a.find((l) => l.key === i);
  return o ? { value: o.value, label: o.key } : null;
}
async function Tc(t, e, n = {}) {
  const a = await Bs(t, e);
  if (!a) return null;
  const r = Er(n.edge ?? null), i = await new Roll(r).evaluate(), o = Rs(i), l = da(o.diceTotal, a.value), c = [{ label: a.label.charAt(0).toUpperCase() + a.label.slice(1), value: a.value }], u = `${va("stat", o, c, l)}
<div class="besm-roll-actions" style="margin-top:4px;">
  <button data-action="spend-ep" data-actor-id="${t.id}" data-total="${l}" data-message-id="" style="padding:2px 8px; font-size:11px; cursor:pointer;">Spend EP?</button>
</div>`, v = await ChatMessage.create({
    content: u,
    speaker: ChatMessage.getSpeaker({ actor: t }),
    rolls: [i]
  }), d = document.createElement("div");
  return d.innerHTML = v.content, d.querySelectorAll('[data-action="spend-ep"]').forEach((m) => {
    m.setAttribute("data-message-id", v.id);
  }), await v.update({ content: d.innerHTML }), { roll: i, total: l, statValue: a.value };
}
async function Mc(t, e, n, a, r = {}) {
  const i = await Bs(t, e);
  if (!i) return null;
  const o = Er(r.edge ?? null), l = await new Roll(o).evaluate(), c = Rs(l), p = da(c.diceTotal, i.value, n), u = [
    { label: i.label.charAt(0).toUpperCase() + i.label.slice(1), value: i.value },
    { label: a, value: n }
  ], d = `${va("skill", c, u, p)}
<div class="besm-roll-actions" style="margin-top:4px;">
  <button data-action="spend-ep" data-actor-id="${t.id}" data-total="${p}" data-message-id="" style="padding:2px 8px; font-size:11px; cursor:pointer;">Spend EP?</button>
</div>`, m = await ChatMessage.create({
    content: d,
    speaker: ChatMessage.getSpeaker({ actor: t }),
    rolls: [l]
  }), h = document.createElement("div");
  return h.innerHTML = m.content, h.querySelectorAll('[data-action="spend-ep"]').forEach((w) => {
    w.setAttribute("data-message-id", m.id);
  }), await m.update({ content: h.innerHTML }), { roll: l, total: p, statValue: i.value, skillLevel: n };
}
Le[S] = "src/components/sidebar/ActorSidebar.svelte";
var Fc = N(/* @__PURE__ */ P('<div class="flex flex-col gap-1"><span class="text-xs text-slate-200"> </span> <div class="flex gap-1"><button type="button" class="px-1.5 py-0.5 bg-blue-700 text-blue-100 rounded border-0 cursor-pointer text-xs hover:bg-blue-600">Open</button> <button type="button" class="px-1.5 py-0.5 bg-slate-700 text-slate-300 rounded border-0 cursor-pointer text-xs hover:bg-slate-600">Unlink</button></div></div>'), Le[S], [[105, 8, [[106, 10], [107, 10, [[108, 12], [112, 12]]]]]]), Cc = N(/* @__PURE__ */ P("<option> </option>"), Le[S], [[127, 14]]), Ac = N(/* @__PURE__ */ P('<div class="flex flex-col gap-1"><span class="text-xs text-slate-400">No pilot linked</span> <select class="w-full bg-slate-800 border border-slate-700 rounded text-xs text-slate-100 p-1"><option>— Select Pilot —</option><!></select> <button type="button" class="px-1.5 py-0.5 bg-emerald-700 text-emerald-100 rounded border-0 cursor-pointer text-xs hover:bg-emerald-600 self-start">Link</button></div>'), Le[S], [[119, 8, [[120, 10], [121, 10, [[125, 12]]], [130, 10]]]]), Ec = N(/* @__PURE__ */ P('<div class="border-t border-slate-700 pt-2"><div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Pilot</div> <!></div>'), Le[S], [[102, 4, [[103, 6]]]]), Nc = N(/* @__PURE__ */ P('<div class="w-44 bg-slate-800 p-3 border-r border-slate-700 flex flex-col gap-3 overflow-y-auto"><input class="text-base font-bold text-slate-100 bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 w-full p-0.5 rounded"/> <div><div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Stats</div> <div class="flex flex-col gap-1.5"></div></div> <!> <!> <!> <!></div>'), Le[S], [[58, 0, [[60, 2], [67, 2, [[68, 4], [69, 4]]]]]]);
function Le(t, e) {
  ce(new.target), le(e, !0, Le);
  let n = yt(e, "showSP", 3, !1), a = yt(e, "showEP", 3, !0), r = yt(e, "showCV", 3, !0), i = yt(e, "showPilot", 3, !1), o = yt(e, "statsToShow", 19, () => ["body", "mind", "soul"]);
  const l = { body: "Body", mind: "Mind", soul: "Soul" };
  function c(R, z) {
    e.actor.update({ [`system.stats.${R}.value`]: z });
  }
  function p(R) {
    Tc(e.actor, R);
  }
  let u = L(/* @__PURE__ */ Z(() => i() && e.actor.system.pilotId ? game.actors.get(e.actor.system.pilotId) : null), "pilotActor"), v = L(/* @__PURE__ */ de(""), "pilotIdInput"), d = L(
    /* @__PURE__ */ Z(() => i() ? game.actors.filter((R) => A(R.id, e.actor.id, !1) && A(R.type, "character")).sort((R, z) => R.name.localeCompare(z.name)) : []),
    "availablePilots"
  );
  function m() {
    s(u) && s(u).sheet.render(!0);
  }
  async function h() {
    s(v) && ((await Te(e.actor.update({ "system.pilotId": s(v) })))(), ge(v, ""));
  }
  async function w() {
    (await Te(e.actor.update({ "system.pilotId": "" })))();
  }
  var x = { ...ue() }, k = Nc(), C = g(k), b = f(C, 2), _ = f(g(b), 2);
  T(
    () => Ge(_, 21, o, ht, (R, z) => {
      const X = L(/* @__PURE__ */ Z(() => e.actor.system.stats[s(z)]), "stat");
      s(X), T(
        () => $t(R, {
          get label() {
            return l[s(z)];
          },
          get value() {
            return s(X).value;
          },
          get cpCost() {
            return s(X).cpCost;
          },
          get mode() {
            return s(X).mode;
          },
          onUpdate: (ee) => c(s(z), ee),
          onRoll: () => p(s(z))
        }),
        "component",
        Le,
        72,
        8,
        { componentTag: "StatInput" }
      );
    }),
    "each",
    Le,
    70,
    6
  );
  var M = f(b, 2);
  T(
    () => Cr(M, {
      get total() {
        return e.actor.system.cpTotal;
      },
      get spent() {
        return e.actor.system.cpSpent;
      },
      get remaining() {
        return e.actor.system.cpRemaining;
      }
    }),
    "component",
    Le,
    85,
    2,
    { componentTag: "CPTracker" }
  );
  var D = f(M, 2);
  {
    var H = (R) => {
      T(
        () => Ar(R, {
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
        Le,
        93,
        4,
        { componentTag: "SPTracker" }
      );
    };
    T(
      () => j(D, (R) => {
        n() && e.actor.system.spPool > 0 && R(H);
      }),
      "if",
      Le,
      92,
      2
    );
  }
  var W = f(D, 2);
  {
    var G = (R) => {
      var z = Ec(), X = f(g(z), 2);
      {
        var ee = (J) => {
          var ve = Fc(), V = g(ve), B = g(V), fe = f(V, 2), be = g(fe), he = f(be, 2);
          O(() => I(B, s(u).name)), E("click", be, m), E("click", he, w), F(J, ve);
        }, Y = (J) => {
          var ve = Ac(), V = f(g(ve), 2), B = g(V);
          B.value = B.__value = "";
          var fe = f(B);
          T(
            () => Ge(fe, 17, () => s(d), ht, (he, _e) => {
              var Ze = Cc(), ae = g(Ze, !0);
              var Ne = {};
              O(() => {
                I(ae, s(_e).name), Ne !== (Ne = s(_e).id) && (Ze.value = (Ze.__value = s(_e).id) ?? "");
              }), F(he, Ze);
            }),
            "each",
            Le,
            126,
            12
          );
          var be = f(V, 2);
          $r(
            V,
            function() {
              return s(v);
            },
            function(_e) {
              ge(v, _e);
            }
          ), E("click", be, h), F(J, ve);
        };
        T(
          () => j(X, (J) => {
            s(u) ? J(ee) : J(Y, -1);
          }),
          "if",
          Le,
          104,
          6
        );
      }
      F(R, z);
    };
    T(
      () => j(W, (R) => {
        i() && R(G);
      }),
      "if",
      Le,
      101,
      2
    );
  }
  var me = f(W, 2);
  return T(
    () => Lt(me, {
      get derived() {
        return e.actor.system.derived;
      },
      get showEP() {
        return a();
      },
      get showCV() {
        return r();
      }
    }),
    "component",
    Le,
    140,
    2,
    { componentTag: "DerivedStats" }
  ), O(() => re(C, e.actor.name)), E("change", C, function(z) {
    return e.actor.update({ name: z.target.value });
  }), F(t, k), oe(x);
}
We(["change", "click"]);
bn[S] = "src/components/tabs/TabBar.svelte";
var Pc = N(/* @__PURE__ */ P("<button> </button>"), bn[S], [[7, 4]]), Dc = N(/* @__PURE__ */ P('<div class="flex border-b border-slate-700 bg-slate-950"></div>'), bn[S], [[5, 0]]);
function bn(t, e) {
  ce(new.target), le(e, !0, bn);
  var n = { ...ue() }, a = Dc();
  return T(
    () => Ge(a, 21, () => e.tabs, ht, (r, i) => {
      var o = Pc(), l = g(o, !0);
      O(() => {
        mt(o, 1, `px-3.5 py-2 text-xs border-0 cursor-pointer bg-transparent
             ${A(e.activeTab, s(i).id) ? "text-slate-100 border-b-2 border-b-blue-500" : "text-slate-500 hover:text-slate-300"}`), I(l, s(i).label);
      }), E("click", o, function() {
        return e.onSelect(s(i).id);
      }), F(r, o);
    }),
    "each",
    bn,
    6,
    2
  ), F(t, a), oe(n);
}
We(["click"]);
Ln[S] = "src/components/ui/BenchmarkPanel.svelte";
var Lc = N(/* @__PURE__ */ P('<li class="py-0.5"> </li>'), Ln[S], [[12, 8]]), Ic = N(/* @__PURE__ */ P('<div class="mx-3 my-2 p-2 border border-amber-600 rounded bg-amber-950/30"><div class="text-xs font-bold text-amber-400"> </div> <ul class="mt-1 text-xs text-amber-300 list-none p-0 m-0"></ul> <p class="mt-1 text-xs text-stone-500 italic">These are recommendations, not restrictions.</p></div>'), Ln[S], [[6, 2, [[7, 4], [10, 4], [15, 4]]]]);
function Ln(t, e) {
  ce(new.target), le(e, !0, Ln);
  let n = yt(e, "warnings", 19, () => []);
  var a = { ...ue() }, r = Ee(), i = pe(r);
  {
    var o = (l) => {
      var c = Ic(), p = g(c), u = g(p), v = f(p, 2);
      T(
        () => Ge(v, 21, n, ht, (d, m) => {
          var h = Lc(), w = g(h, !0);
          O(() => I(w, s(m))), F(d, h);
        }),
        "each",
        Ln,
        11,
        6
      ), O(() => I(u, `Benchmark Recommendations (${n().length ?? ""})`)), F(l, c);
    };
    T(
      () => j(i, (l) => {
        n().length > 0 && l(o);
      }),
      "if",
      Ln,
      5,
      0
    );
  }
  return F(t, r), oe(a);
}
ta[S] = "src/components/ui/TemplateBadges.svelte";
var Rc = N(/* @__PURE__ */ P('<span><span class="font-medium capitalize"> </span> </span>'), ta[S], [[16, 6, [[17, 8]]]]), Bc = N(/* @__PURE__ */ P('<div class="flex flex-wrap gap-1 px-3 py-1.5 border-b border-slate-700"></div>'), ta[S], [[14, 2]]);
function ta(t, e) {
  ce(new.target), le(e, !0, ta);
  let n = L(/* @__PURE__ */ Z(() => e.actor.system.appliedTemplates ?? []), "badges");
  const a = {
    race: "bg-emerald-900 text-emerald-300",
    class: "bg-blue-900 text-blue-300",
    size: "bg-amber-900 text-amber-300"
  };
  var r = { ...ue() }, i = Ee(), o = pe(i);
  {
    var l = (c) => {
      var p = Bc();
      T(
        () => Ge(p, 21, () => s(n), ht, (u, v) => {
          var d = Rc(), m = g(d), h = g(m);
          var w = f(m);
          O(() => {
            mt(d, 1, `inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs ${a[s(v).type] ?? "bg-slate-700 text-slate-300" ?? ""}`), I(h, `${s(v).type ?? ""}:`), I(w, ` ${s(v).name ?? ""}`);
          }), F(u, d);
        }),
        "each",
        ta,
        15,
        4
      ), F(c, p);
    };
    T(
      () => j(o, (c) => {
        s(n).length > 0 && c(l);
      }),
      "if",
      ta,
      13,
      0
    );
  }
  return F(t, i), oe(r);
}
pn[S] = "src/components/ui/CollapsibleSection.svelte";
var Hc = N(/* @__PURE__ */ P('<span class="text-xs text-slate-500"> </span>'), pn[S], [[14, 6]]), Oc = N(/* @__PURE__ */ P('<div class="mb-2"><button class="flex items-center gap-1.5 w-full py-1.5 cursor-pointer bg-transparent border-0 text-left"><span class="text-slate-500 text-xs"> </span> <span> </span> <!></button> <!></div>'), pn[S], [[6, 0, [[7, 2, [[11, 4], [12, 4]]]]]]);
function pn(t, e) {
  ce(new.target), le(e, !0, pn);
  let n = yt(e, "count", 3, 0), a = yt(e, "headerClass", 3, ""), r = L(/* @__PURE__ */ de(!0), "open");
  var i = { ...ue() }, o = Oc(), l = g(o), c = g(l), p = g(c), u = f(c, 2), v = g(u), d = f(u, 2);
  {
    var m = (x) => {
      var k = Hc(), C = g(k);
      O(() => I(C, `(${n() ?? ""})`)), F(x, k);
    };
    T(
      () => j(d, (x) => {
        n() > 0 && x(m);
      }),
      "if",
      pn,
      13,
      4
    );
  }
  var h = f(l, 2);
  {
    var w = (x) => {
      var k = Ee(), C = pe(k);
      T(() => rc(C, () => e.children), "render", pn, 18, 4), F(x, k);
    };
    T(
      () => j(h, (x) => {
        s(r) && x(w);
      }),
      "if",
      pn,
      17,
      2
    );
  }
  return O(() => {
    I(p, s(r) ? "▼" : "▶"), mt(u, 1, `text-xs font-bold uppercase tracking-wide ${a() ?? ""}`), I(v, e.title);
  }), E("click", l, function() {
    return ge(r, !s(r));
  }), F(t, o), oe(i);
}
We(["click"]);
function zc(t, e, n, a) {
  const r = Math.max(0, t - e), i = Math.max(0, r - a);
  return Math.max(0, n - i);
}
async function Gc(t, e) {
  const n = t.getActiveTokens()[0];
  if (!n) {
    ui.notifications.warn("No active token found for this actor. Place a token on the scene first.");
    return;
  }
  const a = t.system.derived.hpMax, r = t.system.derived.currentHp, i = e.system.derived.hpMax, o = [...e.items].find(
    (h) => h.type === "attribute" && h.name === "Healing" && h.system.transformationHeal === !0
  ), l = o ? o.system.effectiveLevel * 5 : 0, c = zc(a, r, i, l);
  await e.update({ "system.derived.currentHp": c });
  const p = n.actor.effects.map((h) => h.toObject());
  if (p.length > 0) {
    const h = e.effects.map((w) => w.id);
    h.length > 0 && await e.deleteEmbeddedDocuments("ActiveEffect", h), await e.createEmbeddedDocuments("ActiveEffect", p);
  }
  const { x: u, y: v, elevation: d } = n;
  await n.document.delete();
  const m = await e.getTokenDocument({ x: u, y: v, elevation: d });
  await canvas.scene.createEmbeddedDocuments("Token", [m.toObject()]), ui.notifications.info(`${t.name} transforms into ${e.name}!`);
}
na[S] = "src/components/ui/LinkedActorBadge.svelte";
var jc = N(/* @__PURE__ */ P('<button class="text-amber-400 hover:text-amber-200 bg-transparent border-0 cursor-pointer text-xs p-0">Swap</button>'), na[S], [[43, 6]]), Vc = N(/* @__PURE__ */ P('<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-700 text-xs flex-shrink-0"><span class="text-slate-300"> </span> <span> </span> <button class="text-blue-400 hover:text-blue-200 bg-transparent border-0 cursor-pointer text-xs p-0">Open</button> <!></span>'), na[S], [[32, 2, [[33, 4], [34, 4], [37, 4]]]]);
function na(t, e) {
  ce(new.target), le(e, !0, na);
  let n = L(
    /* @__PURE__ */ Z(() => e.attribute.system.linkedActorId ? game.actors.get(e.attribute.system.linkedActorId) : null),
    "linkedActor"
  ), a = L(/* @__PURE__ */ Z(() => e.attribute.system.effectiveLevel * 10), "cpBudget"), r = L(/* @__PURE__ */ Z(() => {
    var m;
    return ((m = s(n)) == null ? void 0 : m.system.cpSpent) ?? 0;
  }), "cpSpent"), i = L(/* @__PURE__ */ Z(() => s(r) <= s(a)), "cpValid"), o = L(/* @__PURE__ */ Z(() => /alternate/i.test(e.attribute.name)), "isAlternateForm");
  function l(m) {
    m.stopPropagation(), s(n) && s(n).sheet.render(!0);
  }
  function c(m) {
    m.stopPropagation(), s(n) && e.actor && Gc(e.actor, s(n));
  }
  var p = { ...ue() }, u = Ee(), v = pe(u);
  {
    var d = (m) => {
      var h = Vc(), w = g(h), x = g(w), k = f(w, 2), C = g(k), b = f(k, 2), _ = f(b, 2);
      {
        var M = (D) => {
          var H = jc();
          O(() => Ua(H, "title", `Swap to ${s(n).name ?? ""}`)), E("click", H, c), F(D, H);
        };
        T(
          () => j(_, (D) => {
            s(o) && D(M);
          }),
          "if",
          na,
          42,
          4
        );
      }
      O(() => {
        I(x, s(n).name), mt(k, 1, `px-1 rounded text-xs ${s(i) ? "bg-emerald-900 text-emerald-300" : "bg-red-900 text-red-300"}`), I(C, `${s(r) ?? ""}/${s(a) ?? ""} CP`), Ua(b, "title", `Open ${s(n).name ?? ""} sheet`);
      }), E("click", b, l), F(m, h);
    };
    T(
      () => j(v, (m) => {
        s(n) && m(d);
      }),
      "if",
      na,
      31,
      0
    );
  }
  return F(t, u), oe(p);
}
We(["click"]);
function Uc(t, e, n, a) {
  return Math.max(0, t * e + n - a);
}
function qc(t, e) {
  return {
    attackerWins: t >= e,
    margin: t - e
  };
}
function Wc(t, e) {
  return t === e ? { tie: !0 } : {
    tie: !1,
    attackerWins: t > e,
    margin: Math.abs(t - e)
  };
}
function Yc(t) {
  return t >= 18 ? 5 : t >= 12 ? 4 : t >= 6 ? 3 : t >= 3 ? 2 : t >= 1 ? 1 : 0;
}
function Kc(t, e) {
  const n = Math.floor(e / 10);
  return Math.min(t, n);
}
function bi(t) {
  const n = (t.terms ?? []).find((i) => i.results);
  if (!n) return { dice: [], diceTotal: t.total };
  const a = n.results.map((i) => i.result), r = a.reduce((i, o) => i + o, 0);
  return { dice: a, diceTotal: r };
}
async function Jc(t, e, n = null) {
  var w;
  const a = t.system.derived.acv, r = "2d6", i = await new Roll(r).evaluate(), o = bi(i), l = da(o.diceTotal, a), c = ((w = e.system.weaponOptions) == null ? void 0 : w.isMuscleAttack) ?? !1, p = c ? t.system.derived.meleeDamageMultiplier : t.system.derived.damageMultiplier, d = `${va("attack", o, [{ label: "ACV", value: a }], l)}
<div class="besm-roll-actions" style="margin-top:8px; display:flex; gap:4px; flex-wrap:wrap;">
  <button data-action="defend" data-message-id="" style="padding:2px 8px; font-size:11px; cursor:pointer;">Defend</button>
  <button data-action="auto-defend" data-message-id="" style="padding:2px 8px; font-size:11px; cursor:pointer;">Auto-Defend (NPC)</button>
</div>`, m = await ChatMessage.create({
    content: d,
    speaker: ChatMessage.getSpeaker({ actor: t }),
    rolls: [i],
    flags: {
      besm: {
        type: "attack",
        attackerId: t.id,
        attackTotal: l,
        weaponName: e.name,
        weaponLevel: e.system.effectiveLevel,
        isMuscle: c,
        dm: p,
        targetActorId: n
      }
    }
  }), h = document.createElement("div");
  return h.innerHTML = m.content, h.querySelectorAll("[data-message-id]").forEach((x) => {
    x.setAttribute("data-message-id", m.id);
  }), await m.update({ content: h.innerHTML }), { roll: i, total: l, acv: a };
}
async function Oi(t, e) {
  const n = e.flags.besm, a = t.system.derived.dcv, r = await new Roll("2d6").evaluate(), i = bi(r), o = da(i.diceTotal, a), l = qc(n.attackTotal, o);
  let c = 0, p = "";
  if (l.attackerWins) {
    const h = game.actors.get(n.attackerId), w = (h == null ? void 0 : h.system.derived.acv) ?? 0;
    c = Uc(n.dm, n.weaponLevel, w, t.system.derived.ar), p = `
<div style="margin-top:4px; font-size:12px; color:#f87171;">
  Damage: ${c} (DM ${n.dm} × Lv ${n.weaponLevel} + ACV ${w} - AR ${t.system.derived.ar})
</div>
<button data-action="apply-damage" data-defender-id="${t.id}" data-damage="${c}" style="padding:2px 8px; font-size:11px; cursor:pointer; margin-top:4px;">Apply Damage</button>`;
  }
  const v = va("defence", i, [{ label: "DCV", value: a }], o), d = l.attackerWins ? `<span style="color:#f87171;">Hit! (margin ${l.margin})</span>` : `<span style="color:#4ade80;">Miss! (margin ${Math.abs(l.margin)})</span>`, m = `<div class="besm-roll-header">Attack vs Defence</div>
<div style="font-size:12px; margin:4px 0;">Attack: ${n.attackTotal} vs Defence: ${o}</div>
<div style="font-size:13px; font-weight:bold; margin:4px 0;">${d}</div>
${v}
${p}`;
  return await ChatMessage.create({
    content: m,
    speaker: ChatMessage.getSpeaker({ actor: t }),
    rolls: [r],
    flags: {
      besm: {
        type: "attackResult",
        attackerId: n.attackerId,
        defenderId: t.id,
        damage: c,
        attackerWins: l.attackerWins,
        margin: l.margin
      }
    }
  }), { defenceTotal: o, result: l, damage: c };
}
async function Zc(t, e) {
  const n = t.system.derived.currentHp, a = Math.max(0, n - e);
  if (await t.update({ "system.derived.currentHp": a }), e >= t.system.derived.sv && t.system.derived.sv > 0) {
    const r = t.getActiveTokens()[0];
    r && await r.toggleActiveEffect({ id: "stunned", name: "Stunned", icon: "icons/svg/daze.svg" });
  }
  if (a === 0) {
    const r = t.getActiveTokens()[0];
    r && await r.toggleActiveEffect({ id: "unconscious", name: "Unconscious", icon: "icons/svg/unconscious.svg" });
  }
  ui.notifications.info(`${t.name} takes ${e} damage. HP: ${n} → ${a}`);
}
async function Xc(t, e, n) {
  const a = t.system.stats.soul.mode !== "missing" ? t.system.stats.soul.value : 0, r = t.system.derived.currentEp, i = Kc(a, r);
  if (i === 0)
    return ui.notifications.warn("No EP available to spend."), 0;
  const o = [];
  for (let p = 1; p <= i; p++)
    o.push({
      label: `+${p} (${p * 10} EP)`,
      action: String(p),
      callback: () => p
    });
  o.unshift({
    label: "Skip",
    action: "0",
    callback: () => 0
  });
  const l = await foundry.applications.api.DialogV2.wait({
    window: { title: "Spend Energy Points" },
    content: `<p>Spend EP for a roll bonus? (10 EP per +1, max +${i})</p>`,
    buttons: o
  });
  if (!l || l === 0) return 0;
  await t.update({
    "system.derived.currentEp": r - l * 10
  });
  const c = game.messages.get(n);
  if (c) {
    const p = e + l, u = c.content.replace(
      /Total: \d+/,
      `Total: ${p} <span style="color:#60a5fa;">(+${l} EP)</span>`
    );
    await c.update({ content: u });
  }
  return l;
}
async function Qc(t) {
  const e = t.system.stats.mind.mode !== "missing" ? t.system.stats.mind.value : null, n = t.system.stats.soul.mode !== "missing" ? t.system.stats.soul.value : null;
  if (e === null || n === null)
    return ui.notifications.warn("Cannot make a sanity roll — Mind or Soul is missing."), null;
  const a = Math.floor((e + n) / 2), r = await new Roll("2d6").evaluate(), i = bi(r), o = da(i.diceTotal, a), c = va("sanity", i, [{ label: "Sanity Base", value: a }], o);
  return await ChatMessage.create({
    content: c,
    speaker: ChatMessage.getSpeaker({ actor: t }),
    rolls: [r]
  }), { roll: r, total: o, sanityBase: a };
}
st[S] = "src/components/ui/AttributeRow.svelte";
var $c = N(/* @__PURE__ */ P('<span class="text-amber-400"> </span>'), st[S], [[69, 6]]), eu = N(/* @__PURE__ */ P('<span class="inline-flex items-center gap-0.5 px-1 py-0.5 rounded bg-sky-900/50 text-sky-300 text-xs"> <button class="ml-0.5 text-sky-400 hover:text-sky-200 bg-transparent border-0 cursor-pointer text-xs p-0 leading-none">×</button></span>'), st[S], [[74, 4, [[76, 6]]]]), tu = N(/* @__PURE__ */ P('<span class="inline-flex items-center gap-0.5 px-1 py-0.5 rounded bg-violet-900/50 text-violet-300 text-xs"> <button class="ml-0.5 text-violet-400 hover:text-violet-200 bg-transparent border-0 cursor-pointer text-xs p-0 leading-none">×</button></span>'), st[S], [[84, 4, [[86, 6]]]]), nu = N(/* @__PURE__ */ P('<div class="flex flex-wrap items-center gap-x-3 gap-y-1 px-2 py-1.5 border-b border-slate-800 text-xs cursor-pointer hover:bg-slate-800/50"><span class="text-slate-200 font-medium flex-shrink-0"> </span> <span class="text-slate-400"> <!></span> <!> <!> <span class="text-slate-400 ml-auto flex-shrink-0"> </span> <!> <!></div>'), st[S], [[58, 0, [[64, 2], [66, 2], [93, 2]]]]);
function st(t, e) {
  ce(new.target), le(e, !0, st);
  function n(R) {
    R.stopPropagation(), Jc(e.actor, e.attribute);
  }
  let a = L(/* @__PURE__ */ Z(() => e.attribute.system.enhancements ?? []), "enhancements"), r = L(/* @__PURE__ */ Z(() => e.attribute.system.limiters ?? []), "limiters"), i = L(/* @__PURE__ */ Z(() => A(e.attribute.system.purchasedLevel, e.attribute.system.effectiveLevel, !1)), "levelMismatch");
  function o() {
    e.attribute.sheet.render(!0);
  }
  async function l(R) {
    const z = s(a).filter((X, ee) => A(ee, R, !1));
    (await Te(e.attribute.update({ "system.enhancements": z })))();
  }
  async function c(R) {
    const z = s(r).filter((X, ee) => A(ee, R, !1));
    (await Te(e.attribute.update({ "system.limiters": z })))();
  }
  async function p(R) {
    R.preventDefault();
    let z;
    try {
      z = JSON.parse(R.dataTransfer.getData("text/plain"));
    } catch {
      return;
    }
    if (A(z.type, "Item", !1)) return;
    const X = (await Te(fromUuid(z.uuid)))();
    if (X) {
      if (A(X.type, "enhancement")) {
        const ee = {
          id: foundry.utils.randomID(),
          name: X.name,
          levels: X.system.levels
        };
        (await Te(e.attribute.update({ "system.enhancements": [...s(a), ee] })))();
      } else if (A(X.type, "limiter")) {
        const ee = {
          id: foundry.utils.randomID(),
          name: X.name,
          levels: X.system.levels
        };
        (await Te(e.attribute.update({ "system.limiters": [...s(r), ee] })))();
      }
    }
  }
  function u(R) {
    R.preventDefault(), R.dataTransfer.dropEffect = "copy";
  }
  var v = { ...ue() }, d = nu(), m = g(d), h = g(m), w = f(m, 2), x = g(w), k = f(x);
  {
    var C = (R) => {
      var z = $c(), X = g(z);
      O(() => I(X, `→ Eff ${e.attribute.system.effectiveLevel ?? ""}`)), F(R, z);
    };
    T(
      () => j(k, (R) => {
        s(i) && R(C);
      }),
      "if",
      st,
      68,
      4
    );
  }
  var b = f(w, 2);
  T(
    () => Ge(b, 17, () => s(a), ht, (R, z, X) => {
      var ee = eu(), Y = g(ee), J = f(Y);
      O(() => I(Y, `${s(z).name ?? ""} -${s(z).levels ?? ""} `)), E("click", J, function(V) {
        V.stopPropagation(), l(X);
      }), F(R, ee);
    }),
    "each",
    st,
    73,
    2
  );
  var _ = f(b, 2);
  T(
    () => Ge(_, 17, () => s(r), ht, (R, z, X) => {
      var ee = tu(), Y = g(ee), J = f(Y);
      O(() => I(Y, `${s(z).name ?? ""} +${s(z).levels ?? ""} `)), E("click", J, function(V) {
        V.stopPropagation(), c(X);
      }), F(R, ee);
    }),
    "each",
    st,
    83,
    2
  );
  var M = f(_, 2), D = g(M), H = f(M, 2);
  {
    var W = (R) => {
      T(
        () => gn(R, {
          onclick: n,
          get title() {
            return `Attack with ${e.attribute.name ?? ""}`;
          }
        }),
        "component",
        st,
        96,
        4,
        { componentTag: "RollButton" }
      );
    };
    T(
      () => j(H, (R) => {
        e.attribute.system.isWeapon && R(W);
      }),
      "if",
      st,
      95,
      2
    );
  }
  var G = f(H, 2);
  {
    var me = (R) => {
      T(
        () => na(R, {
          get attribute() {
            return e.attribute;
          },
          get actor() {
            return e.actor;
          }
        }),
        "component",
        st,
        100,
        4,
        { componentTag: "LinkedActorBadge" }
      );
    };
    T(
      () => j(G, (R) => {
        e.attribute.system.linkedActorId && R(me);
      }),
      "if",
      st,
      99,
      2
    );
  }
  return O(() => {
    I(h, e.attribute.name), I(x, `Lv ${e.attribute.system.purchasedLevel ?? ""} `), I(D, `${e.attribute.system.totalCost ?? ""} CP`);
  }), E("click", d, o), Ot("dragover", d, u), Ot("drop", d, p), F(t, d), oe(v);
}
We(["click"]);
Nr[S] = "src/components/ui/DefectRow.svelte";
var au = N(/* @__PURE__ */ P('<div class="flex justify-between items-center px-2 py-1.5 border-b border-slate-800 text-xs cursor-pointer hover:bg-slate-800/50" role="button" tabindex="0"><span class="text-red-300"> </span> <span class="text-slate-400"> </span> <span class="text-emerald-400"> </span></div>'), Nr[S], [[9, 0, [[16, 2], [17, 2], [18, 2]]]]);
function Nr(t, e) {
  ce(new.target), le(e, !0, Nr);
  function n() {
    e.defect.sheet.render(!0);
  }
  var a = { ...ue() }, r = au(), i = g(r), o = g(i), l = f(i, 2), c = g(l), p = f(l, 2), u = g(p);
  return O(() => {
    I(o, e.defect.name), I(c, `Rank ${e.defect.system.rankLevel ?? ""}`), I(u, `+${e.defect.system.cpGranted ?? ""} CP`);
  }), E("click", r, n), E("keydown", r, function(d) {
    A(d.key, "Enter") && n();
  }), F(t, r), oe(a);
}
We(["click", "keydown"]);
He[S] = "src/components/tabs/AttributesTab.svelte";
var ru = N(/* @__PURE__ */ P('<p class="text-xs text-slate-500 italic px-2">No attributes. Drag from compendium to add.</p>'), He[S], [[40, 6]]), iu = N(/* @__PURE__ */ P('<p class="text-xs text-slate-500 italic px-2">No defects.</p>'), He[S], [[50, 6]]), su = N(/* @__PURE__ */ P('<div class="p-3"><!> <!></div>'), He[S], [[37, 0]]);
function He(t, e) {
  ce(new.target), le(e, !0, He);
  let n = L(/* @__PURE__ */ Z(() => [...e.actor.items].filter((u) => A(u.type, "attribute"))), "attributes"), a = L(/* @__PURE__ */ Z(() => [...e.actor.items].filter((u) => A(u.type, "defect"))), "defects");
  async function r(u) {
    u.preventDefault();
    let v;
    try {
      v = JSON.parse(u.dataTransfer.getData("text/plain"));
    } catch {
      return;
    }
    if (A(v.type, "Item", !1)) return;
    const d = (await Te(fromUuid(v.uuid)))();
    d && (A(d.type, "attribute") || A(d.type, "defect")) && (await Te(e.actor.createEmbeddedDocuments("Item", [d.toObject()])))();
  }
  function i(u) {
    u.preventDefault(), u.dataTransfer.dropEffect = "copy";
  }
  var o = { ...ue() }, l = su(), c = g(l);
  T(
    () => pn(c, {
      title: "Attributes",
      get count() {
        return s(n).length;
      },
      headerClass: "text-slate-100",
      children: Bi(He, (u, v) => {
        var d = Ee(), m = pe(d);
        {
          var h = (x) => {
            var k = ru();
            F(x, k);
          }, w = (x) => {
            var k = Ee(), C = pe(k);
            T(
              () => Ge(C, 17, () => s(n), (b) => b.id, (b, _) => {
                T(
                  () => st(b, {
                    get attribute() {
                      return s(_);
                    },
                    get actor() {
                      return e.actor;
                    }
                  }),
                  "component",
                  He,
                  43,
                  8,
                  { componentTag: "AttributeRow" }
                );
              }),
              "each",
              He,
              42,
              6
            ), F(x, k);
          };
          T(
            () => j(m, (x) => {
              A(s(n).length, 0) ? x(h) : x(w, -1);
            }),
            "if",
            He,
            39,
            4
          );
        }
        F(u, d);
      }),
      $$slots: { default: !0 }
    }),
    "component",
    He,
    38,
    2,
    { componentTag: "CollapsibleSection" }
  );
  var p = f(c, 2);
  return T(
    () => pn(p, {
      title: "Defects",
      get count() {
        return s(a).length;
      },
      headerClass: "text-red-400",
      children: Bi(He, (u, v) => {
        var d = Ee(), m = pe(d);
        {
          var h = (x) => {
            var k = iu();
            F(x, k);
          }, w = (x) => {
            var k = Ee(), C = pe(k);
            T(
              () => Ge(C, 17, () => s(a), (b) => b.id, (b, _) => {
                T(
                  () => Nr(b, {
                    get defect() {
                      return s(_);
                    }
                  }),
                  "component",
                  He,
                  53,
                  8,
                  { componentTag: "DefectRow" }
                );
              }),
              "each",
              He,
              52,
              6
            ), F(x, k);
          };
          T(
            () => j(m, (x) => {
              A(s(a).length, 0) ? x(h) : x(w, -1);
            }),
            "if",
            He,
            49,
            4
          );
        }
        F(u, d);
      }),
      $$slots: { default: !0 }
    }),
    "component",
    He,
    48,
    2,
    { componentTag: "CollapsibleSection" }
  ), Ot("dragover", l, i), Ot("drop", l, r), F(t, l), oe(o);
}
xt[S] = "src/components/ui/SkillRow.svelte";
var lu = N(/* @__PURE__ */ P('<span class="text-slate-500 no-underline">(flavor)</span>'), xt[S], [[35, 6]]), ou = N(/* @__PURE__ */ P('<span class="ml-0.5 text-emerald-500">(free)</span>'), xt[S], [[46, 8]]), cu = N(/* @__PURE__ */ P('<span class="ml-0.5 text-amber-500"> </span>'), xt[S], [[48, 8]]), uu = N(/* @__PURE__ */ P("<span> <!></span>"), xt[S], [[43, 4]]), du = N(/* @__PURE__ */ P('<div role="button" tabindex="0"><span> <!></span> <span class="text-slate-400"> </span> <span class="text-slate-500"> </span> <!> <span class="text-slate-400 ml-auto"> </span> <!></div>'), xt[S], [[25, 0, [[32, 2], [39, 2], [40, 2], [53, 2]]]]);
function xt(t, e) {
  ce(new.target), le(e, !0, xt);
  let n = L(/* @__PURE__ */ Z(() => !e.skill.system.isAvailable), "unavailable"), a = L(/* @__PURE__ */ Z(() => e.skill.system.specialisations ?? []), "specialisations");
  function r() {
    e.skill.sheet.render(!0);
  }
  function i(M) {
    M.stopPropagation(), Mc(e.actor, e.skill.system.linkedStat, e.skill.system.rank, e.skill.name);
  }
  var o = { ...ue() }, l = du(), c = g(l), p = g(c), u = f(p);
  {
    var v = (M) => {
      var D = lu();
      F(M, D);
    };
    T(
      () => j(u, (M) => {
        e.skill.system.isFlavor && M(v);
      }),
      "if",
      xt,
      34,
      4
    );
  }
  var d = f(c, 2), m = g(d), h = f(d, 2), w = g(h), x = f(h, 2);
  T(
    () => Ge(x, 17, () => s(a), ht, (M, D) => {
      var H = uu(), W = g(H), G = f(W);
      {
        var me = (z) => {
          var X = ou();
          F(z, X);
        }, R = (z) => {
          var X = cu(), ee = g(X);
          O(() => I(ee, `(${s(D).spCost ?? ""} SP)`)), F(z, X);
        };
        T(
          () => j(G, (z) => {
            s(D).isFree ? z(me) : z(R, -1);
          }),
          "if",
          xt,
          45,
          6
        );
      }
      O(() => {
        mt(H, 1, `inline-flex items-center px-1 py-0.5 rounded text-xs ${s(D).isFree ? "bg-emerald-900/50 text-emerald-300" : "bg-amber-900/50 text-amber-300"}`), I(W, `${s(D).name ?? ""} `);
      }), F(M, H);
    }),
    "each",
    xt,
    42,
    2
  );
  var k = f(x, 2), C = g(k), b = f(k, 2);
  {
    var _ = (M) => {
      T(
        () => gn(M, {
          onclick: i,
          get title() {
            return `Roll ${e.skill.name ?? ""}`;
          }
        }),
        "component",
        xt,
        56,
        4,
        { componentTag: "RollButton" }
      );
    };
    T(
      () => j(b, (M) => {
        !s(n) && !e.skill.system.isFlavor && M(_);
      }),
      "if",
      xt,
      55,
      2
    );
  }
  return O(() => {
    mt(l, 1, `flex flex-wrap items-center gap-x-3 gap-y-1 px-2 py-1.5 border-b border-slate-800 text-xs cursor-pointer hover:bg-slate-800/50 ${s(n) ? "opacity-40 line-through" : ""}`), mt(c, 1, `text-slate-200 font-medium ${e.skill.system.isFlavor ? "italic" : ""}`), I(p, `${e.skill.name ?? ""} `), I(m, `Rank ${e.skill.system.rank ?? ""}`), I(w, e.skill.system.linkedStat), I(C, `${e.skill.system.totalSpCost ?? ""} SP`);
  }), E("click", l, r), E("keydown", l, function(D) {
    A(D.key, "Enter") && r();
  }), F(t, l), oe(o);
}
We(["click", "keydown"]);
lt[S] = "src/components/tabs/SkillsTab.svelte";
var vu = N(/* @__PURE__ */ P('<p class="text-xs text-slate-500 italic">No skills. Drag from compendium to add.</p>'), lt[S], [[50, 6]]), fu = N(/* @__PURE__ */ P('<div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Skills (Point Buy)</div> <!>', 1), lt[S], [[48, 4]]), pu = N(/* @__PURE__ */ P('<p class="text-xs text-slate-500 italic">No skill groups. Drag from compendium to add.</p>'), lt[S], [[59, 6]]), mu = N(/* @__PURE__ */ P('<div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Skill Groups</div> <!>', 1), lt[S], [[57, 4]]), hu = N(/* @__PURE__ */ P('<div class="p-3"><!></div>'), lt[S], [[46, 0]]);
function lt(t, e) {
  ce(new.target), le(e, !0, lt);
  let n = L(
    /* @__PURE__ */ Z(() => [...e.actor.items].filter((d) => A(d.type, "skill")).sort((d, m) => A(d.system.isAvailable, m.system.isAvailable, !1) ? d.system.isAvailable ? -1 : 1 : d.name.localeCompare(m.name))),
    "skills"
  ), a = L(/* @__PURE__ */ Z(() => [...e.actor.items].filter((d) => A(d.type, "attribute") && d.system.isSkillGroup)), "skillGroups"), r = L(/* @__PURE__ */ Z(() => A(e.actor.system.skillMode, "pointbuy")), "isPointBuy");
  async function i(d) {
    var w;
    d.preventDefault();
    let m;
    try {
      m = JSON.parse(d.dataTransfer.getData("text/plain"));
    } catch {
      return;
    }
    if (A(m.type, "Item", !1)) return;
    const h = (await Te(fromUuid(m.uuid)))();
    h && (s(r) && A(h.type, "skill") ? (await Te(e.actor.createEmbeddedDocuments("Item", [h.toObject()])))() : !s(r) && A(h.type, "attribute") && ((w = h.system) != null && w.isSkillGroup) && (await Te(e.actor.createEmbeddedDocuments("Item", [h.toObject()])))());
  }
  function o(d) {
    d.preventDefault(), d.dataTransfer.dropEffect = "copy";
  }
  var l = { ...ue() }, c = hu(), p = g(c);
  {
    var u = (d) => {
      var m = fu(), h = f(pe(m), 2);
      {
        var w = (k) => {
          var C = vu();
          F(k, C);
        }, x = (k) => {
          var C = Ee(), b = pe(C);
          T(
            () => Ge(b, 17, () => s(n), (_) => _.id, (_, M) => {
              T(
                () => xt(_, {
                  get skill() {
                    return s(M);
                  },
                  get actor() {
                    return e.actor;
                  }
                }),
                "component",
                lt,
                53,
                8,
                { componentTag: "SkillRow" }
              );
            }),
            "each",
            lt,
            52,
            6
          ), F(k, C);
        };
        T(
          () => j(h, (k) => {
            A(s(n).length, 0) ? k(w) : k(x, -1);
          }),
          "if",
          lt,
          49,
          4
        );
      }
      F(d, m);
    }, v = (d) => {
      var m = mu(), h = f(pe(m), 2);
      {
        var w = (k) => {
          var C = pu();
          F(k, C);
        }, x = (k) => {
          var C = Ee(), b = pe(C);
          T(
            () => Ge(b, 17, () => s(a), (_) => _.id, (_, M) => {
              T(
                () => st(_, {
                  get attribute() {
                    return s(M);
                  },
                  get actor() {
                    return e.actor;
                  }
                }),
                "component",
                lt,
                62,
                8,
                { componentTag: "AttributeRow" }
              );
            }),
            "each",
            lt,
            61,
            6
          ), F(k, C);
        };
        T(
          () => j(h, (k) => {
            A(s(a).length, 0) ? k(w) : k(x, -1);
          }),
          "if",
          lt,
          58,
          4
        );
      }
      F(d, m);
    };
    T(
      () => j(p, (d) => {
        s(r) ? d(u) : d(v, -1);
      }),
      "if",
      lt,
      47,
      2
    );
  }
  return Ot("dragover", c, o), Ot("drop", c, i), F(t, c), oe(l);
}
In[S] = "src/components/ui/PossessionRow.svelte";
var gu = N(/* @__PURE__ */ P('<span class="text-slate-400"> </span>'), In[S], [[31, 4]]), bu = N(/* @__PURE__ */ P('<span class="text-slate-500 italic"> </span>'), In[S], [[35, 4]]), _u = N(/* @__PURE__ */ P('<div class="flex items-center gap-3 px-2 py-1.5 border-b border-slate-800 text-xs cursor-pointer hover:bg-slate-800/50" role="button" tabindex="0"><span class="text-slate-200 font-medium"> </span> <span class="px-1.5 py-0.5 rounded bg-slate-700 text-slate-400 text-xs"> </span> <span> </span> <!> <!></div>'), In[S], [[15, 0, [[22, 2], [24, 2], [26, 2]]]]);
function In(t, e) {
  ce(new.target), le(e, !0, In);
  let n = L(
    /* @__PURE__ */ Z(() => () => {
      if (!e.possession.system.linkedAttributeId) return null;
      const k = [...e.actor.items].find((C) => A(C.id, e.possession.system.linkedAttributeId));
      return (k == null ? void 0 : k.name) ?? null;
    }),
    "linkedAttrName"
  );
  function a() {
    e.possession.sheet.render(!0);
  }
  var r = { ...ue() }, i = _u(), o = g(i), l = g(o), c = f(o, 2), p = g(c), u = f(c, 2), v = g(u), d = f(u, 2);
  {
    var m = (k) => {
      var C = gu(), b = g(C);
      O(() => I(b, `Cost: ${e.possession.system.budgetCost ?? ""}`)), F(k, C);
    };
    T(
      () => j(d, (k) => {
        e.possession.system.isMechanical && e.possession.system.budgetCost > 0 && k(m);
      }),
      "if",
      In,
      30,
      2
    );
  }
  var h = f(d, 2);
  {
    var w = (k) => {
      var C = bu(), b = g(C);
      O((_) => I(b, `via ${_ ?? ""}`), [() => s(n)()]), F(k, C);
    }, x = /* @__PURE__ */ Z(() => s(n)());
    T(
      () => j(h, (k) => {
        s(x) && k(w);
      }),
      "if",
      In,
      34,
      2
    );
  }
  return O(() => {
    I(l, e.possession.name), I(p, e.possession.system.category), mt(u, 1, `px-1.5 py-0.5 rounded text-xs ${e.possession.system.isMechanical ? "bg-blue-900 text-blue-300" : "bg-slate-700 text-slate-400"}`), I(v, e.possession.system.isMechanical ? "mechanical" : "flavor");
  }), E("click", i, a), E("keydown", i, function(C) {
    A(C.key, "Enter") && a();
  }), F(t, i), oe(r);
}
We(["click", "keydown"]);
qa[S] = "src/components/ui/GearBudget.svelte";
var xu = N(/* @__PURE__ */ P('<div class="mx-2 my-2 p-2 border border-slate-700 rounded bg-slate-800/50"><div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Gear Budget</div> <div class="flex gap-4 text-xs"><span class="text-slate-400">Budget: <span class="text-slate-100"> </span></span> <span class="text-slate-400">Spent: <span class="text-slate-100"> </span></span> <span class="text-slate-400">Remaining: <span> </span></span></div></div>'), qa[S], [
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
function qa(t, e) {
  ce(new.target), le(e, !0, qa);
  let n = L(/* @__PURE__ */ Z(() => [...e.actor.items].find((d) => A(d.type, "attribute") && A(d.name, "Gear"))), "gearAttr"), a = L(/* @__PURE__ */ de(5), "gearBudgetPerLevel");
  xe(() => {
    try {
      ge(a, game.settings.get("besm", "gearBudgetPerLevel") ?? 5, !0);
    } catch {
    }
  });
  let r = L(
    /* @__PURE__ */ Z(() => s(n) ? s(n).system.effectiveLevel * s(a) : 0),
    "budget"
  ), i = L(
    /* @__PURE__ */ Z(() => s(n) ? [...e.actor.items].filter((d) => A(d.type, "possession") && d.system.isMechanical && A(d.system.linkedAttributeId, s(n).id)).reduce((d, m) => d + m.system.budgetCost, 0) : 0),
    "spent"
  ), o = L(/* @__PURE__ */ Z(() => s(r) - s(i)), "remaining"), l = L(/* @__PURE__ */ Z(() => s(o) < 0), "overBudget");
  var c = { ...ue() }, p = Ee(), u = pe(p);
  {
    var v = (d) => {
      var m = xu(), h = f(g(m), 2), w = g(h), x = f(g(w)), k = g(x), C = f(w, 2), b = f(g(C)), _ = g(b), M = f(C, 2), D = f(g(M)), H = g(D);
      O(() => {
        I(k, s(r)), I(_, s(i)), mt(D, 1, `font-bold ${s(l) ? "text-red-400" : "text-emerald-400"}`), I(H, s(o));
      }), F(d, m);
    };
    T(
      () => j(u, (d) => {
        s(n) && d(v);
      }),
      "if",
      qa,
      30,
      0
    );
  }
  return F(t, p), oe(c);
}
fn[S] = "src/components/tabs/PossessionsTab.svelte";
var yu = N(/* @__PURE__ */ P('<p class="text-xs text-slate-500 italic">No possessions. Drag from compendium to add.</p>'), fn[S], [[39, 4]]), wu = N(/* @__PURE__ */ P('<div class="p-3"><!> <div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Possessions</div> <!></div>'), fn[S], [[34, 0, [[37, 2]]]]);
function fn(t, e) {
  ce(new.target), le(e, !0, fn);
  let n = L(/* @__PURE__ */ Z(() => [...e.actor.items].filter((v) => A(v.type, "possession"))), "possessions");
  async function a(v) {
    v.preventDefault();
    let d;
    try {
      d = JSON.parse(v.dataTransfer.getData("text/plain"));
    } catch {
      return;
    }
    if (A(d.type, "Item", !1)) return;
    const m = (await Te(fromUuid(d.uuid)))();
    m && A(m.type, "possession") && (await Te(e.actor.createEmbeddedDocuments("Item", [m.toObject()])))();
  }
  function r(v) {
    v.preventDefault(), v.dataTransfer.dropEffect = "copy";
  }
  var i = { ...ue() }, o = wu(), l = g(o);
  T(
    () => qa(l, {
      get actor() {
        return e.actor;
      }
    }),
    "component",
    fn,
    35,
    2,
    { componentTag: "GearBudget" }
  );
  var c = f(l, 4);
  {
    var p = (v) => {
      var d = yu();
      F(v, d);
    }, u = (v) => {
      var d = Ee(), m = pe(d);
      T(
        () => Ge(m, 17, () => s(n), (h) => h.id, (h, w) => {
          T(
            () => In(h, {
              get possession() {
                return s(w);
              },
              get actor() {
                return e.actor;
              }
            }),
            "component",
            fn,
            42,
            6,
            { componentTag: "PossessionRow" }
          );
        }),
        "each",
        fn,
        41,
        4
      ), F(v, d);
    };
    T(
      () => j(c, (v) => {
        A(s(n).length, 0) ? v(p) : v(u, -1);
      }),
      "if",
      fn,
      38,
      2
    );
  }
  return Ot("dragover", o, r), Ot("drop", o, a), F(t, o), oe(i);
}
Wa[S] = "src/components/ui/ResourceBar.svelte";
var ku = N(/* @__PURE__ */ P('<div class="flex items-center gap-2"><span class="text-xs text-slate-400 w-6"> </span> <div class="flex-1 h-4 bg-slate-900 rounded overflow-hidden border border-slate-700"><div class="h-full bg-emerald-700 transition-all"></div></div> <input type="number" class="w-12 text-center text-xs bg-slate-900 border border-slate-700 rounded text-slate-100 p-0.5" min="0"/> <span class="text-xs text-slate-500"> </span></div>'), Wa[S], [[15, 0, [[16, 2], [17, 2, [[18, 4]]], [23, 2], [31, 2]]]]);
function Wa(t, e) {
  ce(new.target), le(e, !0, Wa);
  let n = L(/* @__PURE__ */ de(An(e.current)), "editValue");
  function a() {
    const m = Math.max(0, Math.min(e.max, Math.floor(s(n))));
    A(m, e.current, !1) && e.onUpdate(m);
  }
  xe(() => {
    ge(n, e.current, !0);
  });
  var r = { ...ue() }, i = ku(), o = g(i), l = g(o), c = f(o, 2), p = g(c), u = f(c, 2), v = f(u, 2), d = g(v);
  return O(() => {
    I(l, e.label), lc(p, `width: ${e.max > 0 ? e.current / e.max * 100 : 0}%`), Ua(u, "max", e.max), I(d, `/ ${e.max ?? ""}`);
  }), Ot("blur", u, a), gi(
    u,
    function() {
      return s(n);
    },
    function(h) {
      ge(n, h);
    }
  ), F(t, i), oe(r);
}
function Hs(t) {
  const n = (t.terms ?? []).find((i) => i.results);
  if (!n) return { dice: [], diceTotal: t.total };
  const a = n.results.map((i) => i.result), r = a.reduce((i, o) => i + o, 0);
  return { dice: a, diceTotal: r };
}
async function Su(t, e, n, a = null) {
  const r = t.system.derived.socv ?? 0, i = a ? Er(a) : "2d6", o = await new Roll(i).evaluate(), l = Hs(o), c = da(l.diceTotal, r, e), v = `${va("social", l, [
    { label: "SoCV", value: r },
    { label: n, value: e }
  ], c)}
<div class="besm-roll-actions" style="margin-top:8px;">
  <button data-action="social-defend" data-message-id="" style="padding:2px 8px; font-size:11px; cursor:pointer;">Social Defend</button>
</div>`, d = await ChatMessage.create({
    content: v,
    speaker: ChatMessage.getSpeaker({ actor: t }),
    rolls: [o],
    flags: {
      besm: {
        type: "socialAttack",
        attackerId: t.id,
        attackTotal: c,
        skillName: n
      }
    }
  }), m = document.createElement("div");
  return m.innerHTML = d.content, m.querySelectorAll("[data-message-id]").forEach((h) => {
    h.setAttribute("data-message-id", d.id);
  }), await d.update({ content: m.innerHTML }), { roll: o, total: c };
}
async function Tu(t, e, n = null) {
  const a = e.flags.besm, r = t.system.derived.socv ?? 0, i = n ? Er(n) : "2d6", o = await new Roll(i).evaluate(), l = Hs(o), c = da(l.diceTotal, r), p = Wc(a.attackTotal, c);
  let u;
  if (p.tie)
    u = '<div style="font-size:13px; font-weight:bold; color:#fbbf24;">Tie — Reroll!</div>';
  else if (p.attackerWins) {
    const h = Yc(p.margin);
    u = `<div style="font-size:13px; font-weight:bold; color:#f87171;">Social Hit! (margin ${p.margin})</div>
<div style="font-size:12px; color:#f87171;">Society Point Damage: ${h}</div>
<button data-action="apply-social-damage" data-defender-id="${t.id}" data-damage="${h}" style="padding:2px 8px; font-size:11px; cursor:pointer; margin-top:4px;">Apply SP Damage</button>`;
  } else
    u = '<div style="font-size:13px; font-weight:bold; color:#4ade80;">Social Defence succeeds!</div>';
  const d = va("social", l, [{ label: "SoCV", value: r }], c), m = `<div class="besm-roll-header">Social Combat</div>
<div style="font-size:12px; margin:4px 0;">Attack: ${a.attackTotal} vs Defence: ${c}</div>
${u}
${d}`;
  return await ChatMessage.create({
    content: m,
    speaker: ChatMessage.getSpeaker({ actor: t }),
    rolls: [o]
  }), { defenceTotal: c, result: p };
}
async function Mu(t, e) {
  const n = t.system.derived.currentSocietyPoints, a = Math.max(0, n - e);
  await t.update({ "system.derived.currentSocietyPoints": a }), ui.notifications.info(`${t.name} loses ${e} Society Points. SP: ${n} → ${a}`);
}
Qe[S] = "src/components/tabs/CombatTab.svelte";
var Fu = N(/* @__PURE__ */ P('<div class="border-t border-slate-700 pt-3"><div class="flex items-center justify-between mb-2"><div class="text-xs text-slate-500 uppercase">Sanity</div> <!></div> <div class="text-sm text-slate-300"> </div></div>'), Qe[S], [[79, 4, [[80, 6, [[81, 8]]], [84, 6]]]]), Cu = N(/* @__PURE__ */ P('<div class="border-t border-slate-700 pt-3"><div class="flex items-center justify-between mb-2"><div class="text-xs text-slate-500 uppercase">Social Combat</div> <!></div> <div class="text-sm text-slate-300"> </div></div>'), Qe[S], [[92, 4, [[93, 6, [[94, 8]]], [97, 6]]]]), Au = N(/* @__PURE__ */ P('<div class="p-3 flex flex-col gap-4"><div class="flex flex-col gap-2"><!> <!></div> <div class="grid grid-cols-3 gap-3"><div class="text-center"><div class="text-xs text-slate-500 uppercase">ACV</div> <div class="text-2xl font-bold text-slate-100"> </div></div> <div class="text-center"><div class="text-xs text-slate-500 uppercase">DCV</div> <div class="text-2xl font-bold text-slate-100"> </div></div> <div class="text-center"><div class="text-xs text-slate-500 uppercase">Init</div> <div class="text-2xl font-bold text-slate-100"> </div></div> <div class="text-center"><div class="text-xs text-slate-500 uppercase">SV</div> <div class="text-lg font-bold text-slate-100"> </div></div> <div class="text-center"><div class="text-xs text-slate-500 uppercase">DM</div> <div class="text-lg font-bold text-slate-100"> </div> <div class="text-xs text-slate-500"> </div></div> <div class="text-center"><div class="text-xs text-slate-500 uppercase">AR</div> <div class="text-lg font-bold text-slate-100"> </div></div></div> <!> <!></div>'), Qe[S], [
  [
    37,
    0,
    [
      [39, 2],
      [
        49,
        2,
        [
          [50, 4, [[51, 6], [52, 6]]],
          [54, 4, [[55, 6], [56, 6]]],
          [58, 4, [[59, 6], [60, 6]]],
          [62, 4, [[63, 6], [64, 6]]],
          [66, 4, [[67, 6], [68, 6], [69, 6]]],
          [71, 4, [[72, 6], [73, 6]]]
        ]
      ]
    ]
  ]
]);
function Qe(t, e) {
  ce(new.target), le(e, !0, Qe);
  let n = L(/* @__PURE__ */ Z(() => e.actor.system.derived), "d"), a = L(/* @__PURE__ */ de(!1), "sanityEnabled"), r = L(/* @__PURE__ */ de(!1), "socialEnabled");
  xe(() => {
    try {
      ge(a, game.settings.get("besm", "sanityEnabled"), !0), ge(r, game.settings.get("besm", "socialCombatEnabled"), !0);
    } catch {
    }
  });
  function i(ae) {
    e.actor.update({ "system.derived.currentHp": ae });
  }
  function o(ae) {
    e.actor.update({ "system.derived.currentEp": ae });
  }
  function l() {
    Qc(e.actor);
  }
  function c() {
    Su(e.actor, 0, "Social", null);
  }
  var p = { ...ue() }, u = Au(), v = g(u), d = g(v);
  {
    var m = (ae) => {
      T(
        () => Wa(ae, {
          label: "HP",
          get current() {
            return s(n).currentHp;
          },
          get max() {
            return s(n).hpMax;
          },
          onUpdate: i
        }),
        "component",
        Qe,
        41,
        6,
        { componentTag: "ResourceBar" }
      );
    };
    T(
      () => j(d, (ae) => {
        s(n).hpApplicable && ae(m);
      }),
      "if",
      Qe,
      40,
      4
    );
  }
  var h = f(d, 2);
  {
    var w = (ae) => {
      T(
        () => Wa(ae, {
          label: "EP",
          get current() {
            return s(n).currentEp;
          },
          get max() {
            return s(n).epMax;
          },
          onUpdate: o
        }),
        "component",
        Qe,
        44,
        6,
        { componentTag: "ResourceBar" }
      );
    };
    T(
      () => j(h, (ae) => {
        s(n).epApplicable && ae(w);
      }),
      "if",
      Qe,
      43,
      4
    );
  }
  var x = f(v, 2), k = g(x), C = f(g(k), 2), b = g(C), _ = f(k, 2), M = f(g(_), 2), D = g(M), H = f(_, 2), W = f(g(H), 2), G = g(W), me = f(H, 2), R = f(g(me), 2), z = g(R), X = f(me, 2), ee = f(g(X), 2), Y = g(ee), J = f(ee, 2), ve = g(J), V = f(X, 2), B = f(g(V), 2), fe = g(B), be = f(x, 2);
  {
    var he = (ae) => {
      var Ne = Fu(), et = g(Ne), ut = f(g(et), 2);
      T(() => gn(ut, { onclick: l, title: "Sanity Roll" }), "component", Qe, 82, 8, { componentTag: "RollButton" });
      var je = f(et, 2), Re = g(je);
      O(() => I(Re, `Sanity Points: ${s(n).currentSanity ?? s(n).sanityPoints ?? ""} / ${s(n).sanityMax ?? ""}`)), F(ae, Ne);
    };
    T(
      () => j(be, (ae) => {
        s(a) && s(n).sanityPoints > 0 && ae(he);
      }),
      "if",
      Qe,
      78,
      2
    );
  }
  var _e = f(be, 2);
  {
    var Ze = (ae) => {
      var Ne = Cu(), et = g(Ne), ut = f(g(et), 2);
      T(() => gn(ut, { onclick: c, title: "Social Attack Roll" }), "component", Qe, 95, 8, { componentTag: "RollButton" });
      var je = f(et, 2), Re = g(je);
      O(() => I(Re, `SoCV: ${s(n).socv ?? ""} | Society Points: ${s(n).currentSocietyPoints ?? s(n).societyPoints ?? ""} / ${s(n).societyPointsMax ?? ""}`)), F(ae, Ne);
    };
    T(
      () => j(_e, (ae) => {
        s(r) && s(n).socv > 0 && ae(Ze);
      }),
      "if",
      Qe,
      91,
      2
    );
  }
  return O(() => {
    I(b, s(n).acv), I(D, s(n).dcv), I(G, s(n).initiative), I(z, s(n).sv), I(Y, s(n).damageMultiplier), I(ve, `melee ${s(n).meleeDamageMultiplier ?? ""}`), I(fe, s(n).ar);
  }), F(t, u), oe(p);
}
fa[S] = "src/components/tabs/BiographyTab.svelte";
var Eu = N(
  /* @__PURE__ */ P(`<div class="p-3 flex flex-col gap-3"><div><div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Biography</div> <div class="text-xs text-slate-400 italic">Biography editing requires the full Foundry editor (coming in a future phase).
      Current content is displayed below.</div> <div class="mt-2 p-2 bg-slate-900 rounded border border-slate-700 text-xs text-slate-300 min-h-16"></div></div> <div><div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Notes</div> <textarea class="w-full h-24 bg-slate-900 border border-slate-700 rounded text-xs text-slate-200 p-2 resize-y"></textarea></div></div>`),
  fa[S],
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
function fa(t, e) {
  ce(new.target), le(e, !0, fa);
  let n = L(/* @__PURE__ */ de(An(e.actor.system.notes ?? "")), "notes");
  function a() {
    e.actor.update({ "system.notes": s(n) });
  }
  var r = { ...ue() }, i = Eu(), o = g(i), l = f(g(o), 4);
  nc(l, () => e.actor.system.biography || "<em class='text-slate-500'>No biography.</em>", !0);
  var c = f(o, 2), p = f(g(c), 2);
  return Ot("blur", p, a), gi(
    p,
    function() {
      return s(n);
    },
    function(v) {
      ge(n, v);
    }
  ), F(t, i), oe(r);
}
async function Os(t, e, n = /* @__PURE__ */ new Set()) {
  if (n.has(t.id)) {
    console.warn(`BESM | Circular template reference detected: ${t.name}`);
    return;
  }
  n.add(t.id);
  const a = [];
  for (const i of t.system.entries)
    if (i.entryType === "item")
      a.push({
        name: i.name,
        type: i.itemType,
        system: {
          ...i.systemData,
          sourceTemplateId: t.id,
          sourceTemplateName: t.name
        }
      });
    else if (i.entryType === "template") {
      const o = await fromUuid(i.templateId);
      if (!o) {
        console.warn(`BESM | Nested template not found: ${i.templateId}`);
        continue;
      }
      await Os(o, e, n);
    }
  a.length > 0 && await e.createEmbeddedDocuments("Item", a);
  const r = [...e.system.appliedTemplates ?? []];
  r.push({
    id: t.id,
    name: t.name,
    type: t.system.templateType,
    pointTotal: t.system.pointTotal,
    appliedAt: Date.now()
  }), await e.update({ "system.appliedTemplates": r }), n.delete(t.id);
}
rt[S] = "src/components/sheets/CharacterSheet.svelte";
var Nu = N(/* @__PURE__ */ P('<div class="flex h-full bg-slate-900 text-slate-100"><!> <div class="flex-1 flex flex-col overflow-hidden"><!> <!> <!> <div class="flex-1 overflow-y-auto"><!></div></div></div>'), rt[S], [[78, 0, [[81, 2, [[86, 4]]]]]]);
function rt(t, e) {
  ce(new.target), le(e, !0, rt);
  let n = L(/* @__PURE__ */ de(0), "version"), a = L(
    /* @__PURE__ */ Z(() => (s(n), e.document)),
    "actor"
  ), r = L(/* @__PURE__ */ de("attributes"), "activeTab");
  const i = [
    { id: "attributes", label: "Attributes" },
    { id: "skills", label: "Skills" },
    { id: "possessions", label: "Possessions" },
    { id: "combat", label: "Combat" },
    { id: "biography", label: "Biography" }
  ];
  xe(() => {
    const v = Hooks.on("updateActor", (d) => {
      A(d.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("updateActor", v);
  }), xe(() => {
    const v = Hooks.on("createItem", (d) => {
      var m;
      A((m = d.parent) == null ? void 0 : m.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("createItem", v);
  }), xe(() => {
    const v = Hooks.on("updateItem", (d) => {
      var m;
      A((m = d.parent) == null ? void 0 : m.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("updateItem", v);
  }), xe(() => {
    const v = Hooks.on("deleteItem", (d) => {
      var m;
      A((m = d.parent) == null ? void 0 : m.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("deleteItem", v);
  });
  async function o(v) {
    v.preventDefault();
    let d;
    try {
      d = JSON.parse(v.dataTransfer.getData("text/plain"));
    } catch {
      return;
    }
    if (A(d.type, "Item", !1)) return;
    const m = (await Te(fromUuid(d.uuid)))();
    !m || A(m.type, "besm4eTemplate", !1) || ((await Te(Os(m, s(a))))(), ui.notifications.info(`Applied template: ${m.name}`));
  }
  function l(v) {
    v.preventDefault(), v.dataTransfer.dropEffect = "copy";
  }
  var c = { ...ue() }, p = Ee(), u = pe(p);
  return T(
    () => Fr(u, () => s(n), (v) => {
      var d = Nu(), m = g(d);
      T(
        () => Le(m, {
          get actor() {
            return s(a);
          },
          showSP: !0,
          showEP: !0,
          showCV: !0
        }),
        "component",
        rt,
        79,
        2,
        { componentTag: "ActorSidebar" }
      );
      var h = f(m, 2), w = g(h);
      T(
        () => bn(w, {
          get tabs() {
            return i;
          },
          get activeTab() {
            return s(r);
          },
          onSelect: (G) => ge(r, G, !0)
        }),
        "component",
        rt,
        82,
        4,
        { componentTag: "TabBar" }
      );
      var x = f(w, 2);
      T(
        () => ta(x, {
          get actor() {
            return s(a);
          }
        }),
        "component",
        rt,
        83,
        4,
        { componentTag: "TemplateBadges" }
      );
      var k = f(x, 2);
      T(
        () => Ln(k, {
          get warnings() {
            return s(a).system.benchmarkWarnings;
          }
        }),
        "component",
        rt,
        84,
        4,
        { componentTag: "BenchmarkPanel" }
      );
      var C = f(k, 2), b = g(C);
      {
        var _ = (G) => {
          T(
            () => He(G, {
              get actor() {
                return s(a);
              }
            }),
            "component",
            rt,
            88,
            8,
            { componentTag: "AttributesTab" }
          );
        }, M = (G) => {
          T(
            () => lt(G, {
              get actor() {
                return s(a);
              }
            }),
            "component",
            rt,
            90,
            8,
            { componentTag: "SkillsTab" }
          );
        }, D = (G) => {
          T(
            () => fn(G, {
              get actor() {
                return s(a);
              }
            }),
            "component",
            rt,
            92,
            8,
            { componentTag: "PossessionsTab" }
          );
        }, H = (G) => {
          T(
            () => Qe(G, {
              get actor() {
                return s(a);
              }
            }),
            "component",
            rt,
            94,
            8,
            { componentTag: "CombatTab" }
          );
        }, W = (G) => {
          T(
            () => fa(G, {
              get actor() {
                return s(a);
              }
            }),
            "component",
            rt,
            96,
            8,
            { componentTag: "BiographyTab" }
          );
        };
        T(
          () => j(b, (G) => {
            A(s(r), "attributes") ? G(_) : A(s(r), "skills") ? G(M, 1) : A(s(r), "possessions") ? G(D, 2) : A(s(r), "combat") ? G(H, 3) : A(s(r), "biography") && G(W, 4);
          }),
          "if",
          rt,
          87,
          6
        );
      }
      Ot("dragover", d, l), Ot("drop", d, o), F(v, d);
    }),
    "key",
    rt,
    76,
    0
  ), F(t, p), oe(c);
}
var kn;
class zs extends foundry.applications.api.DocumentSheetV2 {
  constructor() {
    super(...arguments);
    $(this, kn, null);
  }
  async _renderHTML(n, a) {
    const r = document.createElement("div");
    return r.classList.add("svelte-mount"), r;
  }
  _replaceHTML(n, a, r) {
    super._replaceHTML(n, a, r), y(this, kn) || Q(this, kn, nr(rt, {
      target: a,
      props: { document: this.document, sheet: this }
    }));
  }
  async close(n) {
    return y(this, kn) && (ar(y(this, kn)), Q(this, kn, null)), super.close(n);
  }
}
kn = new WeakMap(), Xe(zs, "DEFAULT_OPTIONS", {
  classes: ["besm", "actor-sheet"],
  position: { width: 800, height: 650 },
  window: { resizable: !0 }
});
ke[S] = "src/components/items/AttributeSheet.svelte";
var Pu = N(/* @__PURE__ */ P('<div><label class="text-xs text-slate-500 uppercase">Skill Group Category</label> <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"><option>Background (1 CP/Level)</option><option>Field (2 CP/Level)</option><option>Action (3 CP/Level)</option></select></div>'), ke[S], [
  [140, 4, [[141, 6], [142, 6, [[146, 8], [147, 8], [148, 8]]]]]
]), Du = N(/* @__PURE__ */ P('<div class="grid grid-cols-2 gap-2"><div><label class="text-xs text-slate-500 uppercase">Tier</label> <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"><option>Lesser (1 CP/Level)</option><option>Greater (2 CP/Level)</option><option>Serious (3 CP/Level)</option></select></div></div> <div><label class="text-xs text-slate-500 uppercase">Unique Description</label> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-16 resize-y"></textarea></div>', 1), ke[S], [
  [
    155,
    4,
    [
      [
        156,
        6,
        [[157, 8], [158, 8, [[162, 10], [163, 10], [164, 10]]]]
      ]
    ]
  ],
  [168, 4, [[169, 6], [170, 6]]]
]), Lu = N(/* @__PURE__ */ P('<div class="border border-slate-700 rounded p-2"><div class="text-xs text-slate-500 uppercase mb-2">Weapon Options</div> <div class="grid grid-cols-2 gap-2"><div><label class="text-xs text-slate-500">Damage</label> <input class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"/></div> <div><label class="text-xs text-slate-500">Range</label> <input class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"/></div> <div><label class="text-xs text-slate-500">Accurate</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"/></div> <div class="flex items-center gap-2"><label class="flex items-center gap-1 text-xs text-slate-400"><input type="checkbox"/> Spreading</label> <label class="flex items-center gap-1 text-xs text-slate-400"><input type="checkbox"/> Muscle</label></div></div></div>'), ke[S], [
  [
    179,
    4,
    [
      [180, 6],
      [
        181,
        6,
        [
          [182, 8, [[183, 10], [184, 10]]],
          [189, 8, [[190, 10], [191, 10]]],
          [196, 8, [[197, 10], [198, 10]]],
          [203, 8, [[204, 10, [[205, 12]]], [209, 10, [[210, 12]]]]]
        ]
      ]
    ]
  ]
]), Iu = N(/* @__PURE__ */ P('<p class="text-xs text-slate-500 italic">None. Drop enhancements on the attribute row to add.</p>'), ke[S], [[223, 6]]), Ru = N(/* @__PURE__ */ P('<div class="flex items-center justify-between px-2 py-1 border-b border-slate-800 text-xs"><span class="text-sky-300"> </span> <span class="text-slate-400"> </span> <button type="button" class="text-slate-500 hover:text-red-400 bg-transparent border-0 cursor-pointer text-xs">Remove</button></div>'), ke[S], [[226, 8, [[227, 10], [228, 10], [229, 10]]]]), Bu = N(/* @__PURE__ */ P('<p class="text-xs text-slate-500 italic">None. Drop limiters on the attribute row to add.</p>'), ke[S], [[240, 6]]), Hu = N(/* @__PURE__ */ P('<div class="flex items-center justify-between px-2 py-1 border-b border-slate-800 text-xs"><span class="text-violet-300"> </span> <span class="text-slate-400"> </span> <button type="button" class="text-slate-500 hover:text-red-400 bg-transparent border-0 cursor-pointer text-xs">Remove</button></div>'), ke[S], [[243, 8, [[244, 10], [245, 10], [246, 10]]]]), Ou = N(/* @__PURE__ */ P('<div class="flex items-center gap-2 text-xs"><span class="text-slate-200"> </span> <span> </span> <button type="button" class="px-2 py-1 bg-blue-700 text-blue-100 rounded border-0 cursor-pointer text-xs hover:bg-blue-600">Open Sheet</button> <button type="button" class="px-2 py-1 bg-slate-700 text-slate-300 rounded border-0 cursor-pointer text-xs hover:bg-slate-600">Unlink</button></div>'), ke[S], [[258, 8, [[259, 10], [260, 10], [263, 10], [265, 10]]]]), zu = N(/* @__PURE__ */ P('<div class="flex flex-col gap-2"><button type="button" class="px-2 py-1 bg-emerald-700 text-emerald-100 rounded border-0 cursor-pointer text-xs hover:bg-emerald-600 self-start">Create Linked Actor</button> <div class="flex items-center gap-2"><input class="flex-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-100 p-1" placeholder="Paste actor ID to link..."/></div></div>'), ke[S], [[269, 8, [[270, 10], [272, 10, [[273, 12]]]]]]), Gu = N(/* @__PURE__ */ P('<div class="border border-slate-700 rounded p-2"><div class="text-xs text-slate-500 uppercase mb-2">Linked Actor</div> <!></div>'), ke[S], [[255, 4, [[256, 6]]]]), ju = N(/* @__PURE__ */ P('<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full"><input class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"/> <div class="grid grid-cols-2 gap-2"><div><label class="text-xs text-slate-500 uppercase">Base Cost/Level</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"/></div> <div><label class="text-xs text-slate-500 uppercase">Purchased Level</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"/></div> <div><label class="text-xs text-slate-500 uppercase">Effective Level</label> <span class="block text-sm text-slate-300 p-1"> </span></div> <div><label class="text-xs text-slate-500 uppercase">Total Cost</label> <span class="block text-sm text-slate-300 p-1"> </span></div></div> <div><label class="text-xs text-slate-500 uppercase">Description</label> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-20 resize-y"></textarea></div> <div class="flex flex-wrap gap-3 text-xs"><label class="flex items-center gap-1 text-slate-400"><input type="checkbox"/> Weapon</label> <label class="flex items-center gap-1 text-slate-400"><input type="checkbox"/> Skill Group</label> <label class="flex items-center gap-1 text-slate-400"><input type="checkbox"/> Skills Attribute</label> <label class="flex items-center gap-1 text-slate-400"><input type="checkbox"/> Benchmark Exception</label> <label class="flex items-center gap-1 text-slate-400"><input type="checkbox"/> Unique</label> <label class="flex items-center gap-1 text-slate-400"><input type="checkbox"/> Transformation Heal</label></div> <!> <!> <!> <div><div class="text-xs text-slate-500 uppercase mb-1"> </div> <!></div> <div><div class="text-xs text-slate-500 uppercase mb-1"> </div> <!></div> <!> <div><label class="text-xs text-slate-500 uppercase">Notes</label> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-16 resize-y"></textarea></div></div>'), ke[S], [
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
      [
        105,
        2,
        [
          [106, 4, [[107, 6]]],
          [111, 4, [[112, 6]]],
          [116, 4, [[117, 6]]],
          [121, 4, [[122, 6]]],
          [126, 4, [[127, 6]]],
          [131, 4, [[132, 6]]]
        ]
      ],
      [220, 2, [[221, 4]]],
      [237, 2, [[238, 4]]],
      [286, 2, [[287, 4], [288, 4]]]
    ]
  ]
]);
function ke(t, e) {
  ce(new.target), le(e, !0, ke);
  let n = L(/* @__PURE__ */ de(0), "version"), a = L(
    /* @__PURE__ */ Z(() => (s(n), e.document)),
    "item"
  );
  xe(() => {
    const K = Hooks.on("updateItem", (U) => {
      A(U.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("updateItem", K);
  });
  function r(K, U) {
    e.document.update({ [K]: U });
  }
  function i(K) {
    const U = s(a).system.enhancements.filter((Be, Ve) => A(Ve, K, !1));
    e.document.update({ "system.enhancements": U });
  }
  function o(K) {
    const U = s(a).system.limiters.filter((Be, Ve) => A(Ve, K, !1));
    e.document.update({ "system.limiters": U });
  }
  let l = L(/* @__PURE__ */ Z(() => /companion|minion|alternate/i.test(s(a).name)), "isLinkable"), c = L(
    /* @__PURE__ */ Z(() => s(a).system.linkedActorId ? game.actors.get(s(a).system.linkedActorId) : null),
    "linkedActor"
  ), p = L(/* @__PURE__ */ Z(() => s(a).system.effectiveLevel * 10), "cpBudget");
  async function u() {
    const K = s(a).parent;
    if (!K) return;
    const U = (await Te(Actor.create({
      name: `${s(a).name} of ${K.name}`,
      type: "character",
      folder: K.folder || void 0
    })))();
    U && (await Te(e.document.update({ "system.linkedActorId": U.id })))();
  }
  async function v() {
    (await Te(e.document.update({ "system.linkedActorId": "" })))();
  }
  function d() {
    s(c) && s(c).sheet.render(!0);
  }
  var m = { ...ue() }, h = ju(), w = g(h), x = f(w, 2), k = g(x), C = f(g(k), 2), b = f(k, 2), _ = f(g(b), 2), M = f(b, 2), D = f(g(M), 2), H = g(D), W = f(M, 2), G = f(g(W), 2), me = g(G), R = f(x, 2), z = f(g(R), 2), X = f(R, 2), ee = g(X), Y = g(ee), J = f(ee, 2), ve = g(J), V = f(J, 2), B = g(V), fe = f(V, 2), be = g(fe), he = f(fe, 2), _e = g(he), Ze = f(he, 2), ae = g(Ze), Ne = f(X, 2);
  {
    var et = (K) => {
      var U = Pu(), Be = f(g(U), 2), Ve = g(Be);
      Ve.value = Ve.__value = "background";
      var Ce = f(Ve);
      Ce.value = Ce.__value = "field";
      var Pe = f(Ce);
      Pe.value = Pe.__value = "action";
      var we;
      rn(Be), O(() => {
        we !== (we = s(a).system.skillGroupCategory) && (Be.value = (Be.__value = s(a).system.skillGroupCategory) ?? "", Wt(Be, s(a).system.skillGroupCategory));
      }), E("change", Be, function(at) {
        return r("system.skillGroupCategory", at.target.value);
      }), F(K, U);
    };
    T(
      () => j(Ne, (K) => {
        s(a).system.isSkillGroup && K(et);
      }),
      "if",
      ke,
      139,
      2
    );
  }
  var ut = f(Ne, 2);
  {
    var je = (K) => {
      var U = Du(), Be = pe(U), Ve = g(Be), Ce = f(g(Ve), 2), Pe = g(Ce);
      Pe.value = Pe.__value = "lesser";
      var we = f(Pe);
      we.value = we.__value = "greater";
      var De = f(we);
      De.value = De.__value = "serious";
      var at;
      rn(Ce);
      var Ue = f(Be, 2), Tt = f(g(Ue), 2);
      O(() => {
        at !== (at = s(a).system.tier) && (Ce.value = (Ce.__value = s(a).system.tier) ?? "", Wt(Ce, s(a).system.tier)), re(Tt, s(a).system.uniqueDescription ?? "");
      }), E("change", Ce, function(ln) {
        return r("system.tier", ln.target.value);
      }), E("change", Tt, function(ln) {
        return r("system.uniqueDescription", ln.target.value);
      }), F(K, U);
    };
    T(
      () => j(ut, (K) => {
        s(a).system.isUnique && K(je);
      }),
      "if",
      ke,
      154,
      2
    );
  }
  var Re = f(ut, 2);
  {
    var tt = (K) => {
      var U = Lu(), Be = f(g(U), 2), Ve = g(Be), Ce = f(g(Ve), 2), Pe = f(Ve, 2), we = f(g(Pe), 2), De = f(Pe, 2), at = f(g(De), 2), Ue = f(De, 2), Tt = g(Ue), gt = g(Tt), ln = f(Tt, 2), ki = g(ln);
      O(() => {
        re(Ce, s(a).system.weaponOptions.damage), re(we, s(a).system.weaponOptions.range), re(at, s(a).system.weaponOptions.accurate), Pt(gt, s(a).system.weaponOptions.spreading), Pt(ki, s(a).system.weaponOptions.isMuscleAttack);
      }), E("change", Ce, function(on) {
        return r("system.weaponOptions.damage", on.target.value);
      }), E("change", we, function(on) {
        return r("system.weaponOptions.range", on.target.value);
      }), E("change", at, function(on) {
        return r("system.weaponOptions.accurate", Number(on.target.value));
      }), E("change", gt, function(on) {
        return r("system.weaponOptions.spreading", on.target.checked);
      }), E("change", ki, function(on) {
        return r("system.weaponOptions.isMuscleAttack", on.target.checked);
      }), F(K, U);
    };
    T(
      () => j(Re, (K) => {
        s(a).system.isWeapon && K(tt);
      }),
      "if",
      ke,
      178,
      2
    );
  }
  var nt = f(Re, 2), Fe = g(nt), ne = g(Fe), te = f(Fe, 2);
  {
    var sn = (K) => {
      var U = Iu();
      F(K, U);
    }, Yt = (K) => {
      var U = Ee(), Be = pe(U);
      T(
        () => Ge(Be, 17, () => s(a).system.enhancements, ht, (Ve, Ce, Pe) => {
          var we = Ru(), De = g(we), at = g(De, !0);
          var Ue = f(De, 2), Tt = g(Ue);
          var gt = f(Ue, 2);
          O(() => {
            I(at, s(Ce).name), I(Tt, `-${s(Ce).levels ?? ""} levels`);
          }), E("click", gt, function() {
            return i(Pe);
          }), F(Ve, we);
        }),
        "each",
        ke,
        225,
        6
      ), F(K, U);
    };
    T(
      () => j(te, (K) => {
        A(s(a).system.enhancements.length, 0) ? K(sn) : K(Yt, -1);
      }),
      "if",
      ke,
      222,
      4
    );
  }
  var St = f(nt, 2), Kt = g(St), Da = g(Kt), La = f(Kt, 2);
  {
    var Lr = (K) => {
      var U = Bu();
      F(K, U);
    }, pa = (K) => {
      var U = Ee(), Be = pe(U);
      T(
        () => Ge(Be, 17, () => s(a).system.limiters, ht, (Ve, Ce, Pe) => {
          var we = Hu(), De = g(we), at = g(De, !0);
          var Ue = f(De, 2), Tt = g(Ue);
          var gt = f(Ue, 2);
          O(() => {
            I(at, s(Ce).name), I(Tt, `+${s(Ce).levels ?? ""} levels`);
          }), E("click", gt, function() {
            return o(Pe);
          }), F(Ve, we);
        }),
        "each",
        ke,
        242,
        6
      ), F(K, U);
    };
    T(
      () => j(La, (K) => {
        A(s(a).system.limiters.length, 0) ? K(Lr) : K(pa, -1);
      }),
      "if",
      ke,
      239,
      4
    );
  }
  var rr = f(St, 2);
  {
    var Ir = (K) => {
      var U = Gu(), Be = f(g(U), 2);
      {
        var Ve = (Pe) => {
          var we = Ou(), De = g(we), at = g(De), Ue = f(De, 2), Tt = g(Ue), gt = f(Ue, 2), ln = f(gt, 2);
          O(() => {
            I(at, s(c).name), mt(Ue, 1, `px-1.5 py-0.5 rounded ${s(c).system.cpSpent <= s(p) ? "bg-emerald-900 text-emerald-300" : "bg-red-900 text-red-300"}`), I(Tt, `${s(c).system.cpSpent ?? ""} / ${s(p) ?? ""} CP`);
          }), E("click", gt, d), E("click", ln, v), F(Pe, we);
        }, Ce = (Pe) => {
          var we = zu(), De = g(we), at = f(De, 2), Ue = g(at);
          O(() => re(Ue, s(a).system.linkedActorId)), E("click", De, u), E("change", Ue, function(gt) {
            return r("system.linkedActorId", gt.target.value);
          }), F(Pe, we);
        };
        T(
          () => j(Be, (Pe) => {
            s(c) ? Pe(Ve) : Pe(Ce, -1);
          }),
          "if",
          ke,
          257,
          6
        );
      }
      F(K, U);
    };
    T(
      () => j(rr, (K) => {
        s(l) && K(Ir);
      }),
      "if",
      ke,
      254,
      2
    );
  }
  var yi = f(rr, 2), wi = f(g(yi), 2);
  return O(() => {
    re(w, s(a).name), re(C, s(a).system.baseCostPerLevel), re(_, s(a).system.purchasedLevel), I(H, s(a).system.effectiveLevel), I(me, `${s(a).system.totalCost ?? ""} CP`), re(z, s(a).system.description ?? ""), Pt(Y, s(a).system.isWeapon), Pt(ve, s(a).system.isSkillGroup), Pt(B, s(a).system.isSkillsAttribute), Pt(be, s(a).system.isBenchmarkException), Pt(_e, s(a).system.isUnique), Pt(ae, s(a).system.transformationHeal), I(ne, `Enhancements (${s(a).system.enhancements.length ?? ""})`), I(Da, `Limiters (${s(a).system.limiters.length ?? ""})`), re(wi, s(a).system.notes ?? "");
  }), E("change", w, function(U) {
    return e.document.update({ name: U.target.value });
  }), E("change", C, function(U) {
    return r("system.baseCostPerLevel", Number(U.target.value));
  }), E("change", _, function(U) {
    return r("system.purchasedLevel", Number(U.target.value));
  }), E("change", z, function(U) {
    return r("system.description", U.target.value);
  }), E("change", Y, function(U) {
    return r("system.isWeapon", U.target.checked);
  }), E("change", ve, function(U) {
    return r("system.isSkillGroup", U.target.checked);
  }), E("change", B, function(U) {
    return r("system.isSkillsAttribute", U.target.checked);
  }), E("change", be, function(U) {
    return r("system.isBenchmarkException", U.target.checked);
  }), E("change", _e, function(U) {
    return r("system.isUnique", U.target.checked);
  }), E("change", ae, function(U) {
    return r("system.transformationHeal", U.target.checked);
  }), E("change", wi, function(U) {
    return r("system.notes", U.target.value);
  }), F(t, h), oe(m);
}
We(["change", "click"]);
Fa[S] = "src/components/items/DefectSheet.svelte";
var Vu = N(/* @__PURE__ */ P('<div><label class="text-xs text-slate-500 uppercase">Tier</label> <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"><option>Lesser (1 CP/Rank)</option><option>Greater (2 CP/Rank)</option><option>Serious (3 CP/Rank)</option></select></div> <div><label class="text-xs text-slate-500 uppercase">Unique Description</label> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-16 resize-y"></textarea></div>', 1), Fa[S], [
  [57, 4, [[58, 6], [59, 6, [[63, 8], [64, 8], [65, 8]]]]],
  [68, 4, [[69, 6], [70, 6]]]
]), Uu = N(/* @__PURE__ */ P('<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full"><input class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"/> <div class="grid grid-cols-2 gap-2"><div><label class="text-xs text-slate-500 uppercase">CP Granted</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"/></div> <div><label class="text-xs text-slate-500 uppercase">Rank Level</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"/></div></div> <div><label class="text-xs text-slate-500 uppercase">Description</label> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-20 resize-y"></textarea></div> <label class="flex items-center gap-1 text-xs text-slate-400"><input type="checkbox"/> Unique Defect</label> <!></div>'), Fa[S], [
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
function Fa(t, e) {
  ce(new.target), le(e, !0, Fa);
  let n = L(/* @__PURE__ */ de(0), "version"), a = L(
    /* @__PURE__ */ Z(() => (s(n), e.document)),
    "item"
  );
  xe(() => {
    const b = Hooks.on("updateItem", (_) => {
      A(_.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("updateItem", b);
  });
  function r(b, _) {
    e.document.update({ [b]: _ });
  }
  var i = { ...ue() }, o = Uu(), l = g(o), c = f(l, 2), p = g(c), u = f(g(p), 2), v = f(p, 2), d = f(g(v), 2), m = f(c, 2), h = f(g(m), 2), w = f(m, 2), x = g(w), k = f(w, 2);
  {
    var C = (b) => {
      var _ = Vu(), M = pe(_), D = f(g(M), 2), H = g(D);
      H.value = H.__value = "lesser";
      var W = f(H);
      W.value = W.__value = "greater";
      var G = f(W);
      G.value = G.__value = "serious";
      var me;
      rn(D);
      var R = f(M, 2), z = f(g(R), 2);
      O(() => {
        me !== (me = s(a).system.tier) && (D.value = (D.__value = s(a).system.tier) ?? "", Wt(D, s(a).system.tier)), re(z, s(a).system.uniqueDescription ?? "");
      }), E("change", D, function(ee) {
        return r("system.tier", ee.target.value);
      }), E("change", z, function(ee) {
        return r("system.uniqueDescription", ee.target.value);
      }), F(b, _);
    };
    T(
      () => j(k, (b) => {
        s(a).system.isUnique && b(C);
      }),
      "if",
      Fa,
      56,
      2
    );
  }
  return O(() => {
    re(l, s(a).name), re(u, s(a).system.cpGranted), re(d, s(a).system.rankLevel), re(h, s(a).system.description ?? ""), Pt(x, s(a).system.isUnique);
  }), E("change", l, function(_) {
    return e.document.update({ name: _.target.value });
  }), E("change", u, function(_) {
    return r("system.cpGranted", Number(_.target.value));
  }), E("change", d, function(_) {
    return r("system.rankLevel", Number(_.target.value));
  }), E("change", h, function(_) {
    return r("system.description", _.target.value);
  }), E("change", x, function(_) {
    return r("system.isUnique", _.target.checked);
  }), F(t, o), oe(i);
}
We(["change"]);
Ca[S] = "src/components/items/EnhancementSheet.svelte";
var qu = N(/* @__PURE__ */ P('<div class="text-xs text-slate-500"> </div>'), Ca[S], [[43, 4]]), Wu = N(/* @__PURE__ */ P('<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full"><input class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"/> <div><label class="text-xs text-slate-500 uppercase">Levels</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1" min="1"/></div> <div><label class="text-xs text-slate-500 uppercase">Description</label> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-20 resize-y"></textarea></div> <!></div>'), Ca[S], [
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
function Ca(t, e) {
  ce(new.target), le(e, !0, Ca);
  let n = L(/* @__PURE__ */ de(0), "version"), a = L(
    /* @__PURE__ */ Z(() => (s(n), e.document)),
    "item"
  );
  xe(() => {
    const h = Hooks.on("updateItem", (w) => {
      A(w.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("updateItem", h);
  });
  function r(h, w) {
    e.document.update({ [h]: w });
  }
  var i = { ...ue() }, o = Wu(), l = g(o), c = f(l, 2), p = f(g(c), 2), u = f(c, 2), v = f(g(u), 2), d = f(u, 2);
  {
    var m = (h) => {
      var w = qu(), x = g(w);
      O(() => I(x, `Parent Attribute: ${s(a).system.parentAttributeId ?? ""}`)), F(h, w);
    };
    T(
      () => j(d, (h) => {
        s(a).system.parentAttributeId && h(m);
      }),
      "if",
      Ca,
      42,
      2
    );
  }
  return O(() => {
    re(l, s(a).name), re(p, s(a).system.levels), re(v, s(a).system.description ?? "");
  }), E("change", l, function(w) {
    return e.document.update({ name: w.target.value });
  }), E("change", p, function(w) {
    return r("system.levels", Number(w.target.value));
  }), E("change", v, function(w) {
    return r("system.description", w.target.value);
  }), F(t, o), oe(i);
}
We(["change"]);
Aa[S] = "src/components/items/LimiterSheet.svelte";
var Yu = N(/* @__PURE__ */ P('<div class="text-xs text-slate-500"> </div>'), Aa[S], [[43, 4]]), Ku = N(/* @__PURE__ */ P('<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full"><input class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"/> <div><label class="text-xs text-slate-500 uppercase">Levels</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1" min="1"/></div> <div><label class="text-xs text-slate-500 uppercase">Description</label> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-20 resize-y"></textarea></div> <!></div>'), Aa[S], [
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
function Aa(t, e) {
  ce(new.target), le(e, !0, Aa);
  let n = L(/* @__PURE__ */ de(0), "version"), a = L(
    /* @__PURE__ */ Z(() => (s(n), e.document)),
    "item"
  );
  xe(() => {
    const h = Hooks.on("updateItem", (w) => {
      A(w.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("updateItem", h);
  });
  function r(h, w) {
    e.document.update({ [h]: w });
  }
  var i = { ...ue() }, o = Ku(), l = g(o), c = f(l, 2), p = f(g(c), 2), u = f(c, 2), v = f(g(u), 2), d = f(u, 2);
  {
    var m = (h) => {
      var w = Yu(), x = g(w);
      O(() => I(x, `Parent Attribute: ${s(a).system.parentAttributeId ?? ""}`)), F(h, w);
    };
    T(
      () => j(d, (h) => {
        s(a).system.parentAttributeId && h(m);
      }),
      "if",
      Aa,
      42,
      2
    );
  }
  return O(() => {
    re(l, s(a).name), re(p, s(a).system.levels), re(v, s(a).system.description ?? "");
  }), E("change", l, function(w) {
    return e.document.update({ name: w.target.value });
  }), E("change", p, function(w) {
    return r("system.levels", Number(w.target.value));
  }), E("change", v, function(w) {
    return r("system.description", w.target.value);
  }), F(t, o), oe(i);
}
We(["change"]);
Ea[S] = "src/components/items/PossessionSheet.svelte";
var Ju = N(/* @__PURE__ */ P('<div><label class="text-xs text-slate-500 uppercase">Budget Cost</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"/></div>'), Ea[S], [[44, 4, [[45, 6], [46, 6]]]]), Zu = N(/* @__PURE__ */ P('<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full"><input class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"/> <div><label class="text-xs text-slate-500 uppercase">Category</label> <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"><option>Gear</option><option>Feature</option><option>Other</option></select></div> <label class="flex items-center gap-1 text-xs text-slate-400"><input type="checkbox"/> Mechanical (has budget cost)</label> <!> <div><label class="text-xs text-slate-500 uppercase">Description</label> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-20 resize-y"></textarea></div></div>'), Ea[S], [
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
function Ea(t, e) {
  ce(new.target), le(e, !0, Ea);
  let n = L(/* @__PURE__ */ de(0), "version"), a = L(
    /* @__PURE__ */ Z(() => (s(n), e.document)),
    "item"
  );
  xe(() => {
    const _ = Hooks.on("updateItem", (M) => {
      A(M.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("updateItem", _);
  });
  function r(_, M) {
    e.document.update({ [_]: M });
  }
  var i = { ...ue() }, o = Zu(), l = g(o), c = f(l, 2), p = f(g(c), 2), u = g(p);
  u.value = u.__value = "gear";
  var v = f(u);
  v.value = v.__value = "feature";
  var d = f(v);
  d.value = d.__value = "other";
  var m;
  rn(p);
  var h = f(c, 2), w = g(h), x = f(h, 2);
  {
    var k = (_) => {
      var M = Ju(), D = f(g(M), 2);
      O(() => re(D, s(a).system.budgetCost)), E("change", D, function(W) {
        return r("system.budgetCost", Number(W.target.value));
      }), F(_, M);
    };
    T(
      () => j(x, (_) => {
        s(a).system.isMechanical && _(k);
      }),
      "if",
      Ea,
      43,
      2
    );
  }
  var C = f(x, 2), b = f(g(C), 2);
  return O(() => {
    re(l, s(a).name), m !== (m = s(a).system.category) && (p.value = (p.__value = s(a).system.category) ?? "", Wt(p, s(a).system.category)), Pt(w, s(a).system.isMechanical), re(b, s(a).system.description ?? "");
  }), E("change", l, function(M) {
    return e.document.update({ name: M.target.value });
  }), E("change", p, function(M) {
    return r("system.category", M.target.value);
  }), E("change", w, function(M) {
    return r("system.isMechanical", M.target.checked);
  }), E("change", b, function(M) {
    return r("system.description", M.target.value);
  }), F(t, o), oe(i);
}
We(["change"]);
Rn[S] = "src/components/items/SkillSheet.svelte";
var Xu = N(/* @__PURE__ */ P('<p class="text-xs text-slate-500 italic mb-2">None. First specialisation is free.</p>'), Rn[S], [[107, 6]]), Qu = N(/* @__PURE__ */ P('<div class="flex items-center justify-between px-2 py-1 border-b border-slate-800 text-xs"><span class="text-slate-200"> </span> <span> </span> <button type="button" class="text-slate-500 hover:text-red-400 bg-transparent border-0 cursor-pointer text-xs">Remove</button></div>'), Rn[S], [[110, 8, [[111, 10], [112, 10], [115, 10]]]]), $u = N(/* @__PURE__ */ P('<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full"><input class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"/> <div class="grid grid-cols-2 gap-2"><div><label class="text-xs text-slate-500 uppercase">Rank</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1" min="0"/></div> <div><label class="text-xs text-slate-500 uppercase">Cost Class</label> <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"><option>Framework (1 SP)</option><option>Adventure (2 SP)</option><option>Genre (3 SP)</option></select></div> <div><label class="text-xs text-slate-500 uppercase">Linked Stat</label> <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"><option>Body</option><option>Mind</option><option>Soul</option><option>Body+Mind</option><option>Body+Soul</option><option>Mind+Soul</option><option>Average</option></select></div> <div><label class="text-xs text-slate-500 uppercase">SP Cost</label> <span class="block text-sm text-slate-300 p-1"> </span></div></div> <div class="flex gap-3 text-xs"><label class="flex items-center gap-1 text-slate-400"><input type="checkbox"/> Flavor (no SP cost)</label> <label class="flex items-center gap-1 text-slate-400"><input type="checkbox"/> Genius Skill</label></div> <div><div class="text-xs text-slate-500 uppercase mb-1"> </div> <!> <div class="flex gap-2 mt-2"><input class="flex-1 bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1" placeholder="Specialisation name..."/> <button class="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs border-0 cursor-pointer hover:bg-slate-600">Add</button></div></div> <div><label class="text-xs text-slate-500 uppercase">Description</label> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-20 resize-y"></textarea></div></div>'), Rn[S], [
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
function Rn(t, e) {
  ce(new.target), le(e, !0, Rn);
  let n = L(/* @__PURE__ */ de(0), "version"), a = L(
    /* @__PURE__ */ Z(() => (s(n), e.document)),
    "item"
  ), r = L(/* @__PURE__ */ de(""), "newSpecName");
  xe(() => {
    const ne = Hooks.on("updateItem", (te) => {
      A(te.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("updateItem", ne);
  });
  function i(ne, te) {
    e.document.update({ [ne]: te });
  }
  let o = L(/* @__PURE__ */ Z(() => s(a).system.specialisations ?? []), "specialisations");
  function l() {
    if (!s(r).trim()) return;
    const ne = [...s(o)], te = A(ne.length, 0);
    ne.push({
      name: s(r).trim(),
      isFree: te,
      spCost: te ? 0 : 1
    }), e.document.update({ "system.specialisations": ne }), ge(r, "");
  }
  function c(ne) {
    let te = s(o).filter((sn, Yt) => A(Yt, ne, !1));
    te.length > 0 && !te.some((sn) => sn.isFree) && (te[0] = { ...te[0], isFree: !0, spCost: 0 }), e.document.update({ "system.specialisations": te });
  }
  var p = { ...ue() }, u = $u(), v = g(u), d = f(v, 2), m = g(d), h = f(g(m), 2), w = f(m, 2), x = f(g(w), 2), k = g(x);
  k.value = k.__value = "framework";
  var C = f(k);
  C.value = C.__value = "adventure";
  var b = f(C);
  b.value = b.__value = "genre";
  var _;
  rn(x);
  var M = f(w, 2), D = f(g(M), 2), H = g(D);
  H.value = H.__value = "body";
  var W = f(H);
  W.value = W.__value = "mind";
  var G = f(W);
  G.value = G.__value = "soul";
  var me = f(G);
  me.value = me.__value = "bodyMind";
  var R = f(me);
  R.value = R.__value = "bodySoul";
  var z = f(R);
  z.value = z.__value = "mindSoul";
  var X = f(z);
  X.value = X.__value = "avg";
  var ee;
  rn(D);
  var Y = f(M, 2), J = f(g(Y), 2), ve = g(J), V = f(d, 2), B = g(V), fe = g(B), be = f(B, 2), he = g(be), _e = f(V, 2), Ze = g(_e), ae = g(Ze), Ne = f(Ze, 2);
  {
    var et = (ne) => {
      var te = Xu();
      F(ne, te);
    }, ut = (ne) => {
      var te = Ee(), sn = pe(te);
      T(
        () => Ge(sn, 17, () => s(o), ht, (Yt, St, Kt) => {
          var Da = Qu(), La = g(Da), Lr = g(La, !0);
          var pa = f(La, 2), rr = g(pa, !0);
          var Ir = f(pa, 2);
          O(() => {
            I(Lr, s(St).name), mt(pa, 1, s(St).isFree ? "text-emerald-400" : "text-amber-400"), I(rr, s(St).isFree ? "free" : `${s(St).spCost} SP`);
          }), E("click", Ir, function() {
            return c(Kt);
          }), F(Yt, Da);
        }),
        "each",
        Rn,
        109,
        6
      ), F(ne, te);
    };
    T(
      () => j(Ne, (ne) => {
        A(s(o).length, 0) ? ne(et) : ne(ut, -1);
      }),
      "if",
      Rn,
      106,
      4
    );
  }
  var je = f(Ne, 2), Re = g(je), tt = f(Re, 2), nt = f(_e, 2), Fe = f(g(nt), 2);
  return O(() => {
    re(v, s(a).name), re(h, s(a).system.rank), _ !== (_ = s(a).system.costClass) && (x.value = (x.__value = s(a).system.costClass) ?? "", Wt(x, s(a).system.costClass)), ee !== (ee = s(a).system.linkedStat) && (D.value = (D.__value = s(a).system.linkedStat) ?? "", Wt(D, s(a).system.linkedStat)), I(ve, s(a).system.totalSpCost), Pt(fe, s(a).system.isFlavor), Pt(he, s(a).system.isGeniusSkill), I(ae, `Specialisations (${s(o).length ?? ""})`), re(Fe, s(a).system.description ?? "");
  }), E("change", v, function(te) {
    return e.document.update({ name: te.target.value });
  }), E("change", h, function(te) {
    return i("system.rank", Number(te.target.value));
  }), E("change", x, function(te) {
    return i("system.costClass", te.target.value);
  }), E("change", D, function(te) {
    return i("system.linkedStat", te.target.value);
  }), E("change", fe, function(te) {
    return i("system.isFlavor", te.target.checked);
  }), E("change", he, function(te) {
    return i("system.isGeniusSkill", te.target.checked);
  }), E("keydown", Re, function(te) {
    A(te.key, "Enter") && l();
  }), gi(
    Re,
    function() {
      return s(r);
    },
    function(te) {
      ge(r, te);
    }
  ), E("click", tt, l), E("change", Fe, function(te) {
    return i("system.description", te.target.value);
  }), F(t, u), oe(p);
}
We(["change", "click", "keydown"]);
Vt[S] = "src/components/items/TemplateSheet.svelte";
var ed = N(/* @__PURE__ */ P('<div><label class="text-xs text-slate-500 uppercase">Size Rank</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"/></div>'), Vt[S], [[98, 4, [[99, 6], [100, 6]]]]), td = N(/* @__PURE__ */ P('<div class="grid grid-cols-2 gap-1 text-xs"><input class="bg-slate-800 border border-slate-700 rounded p-1 text-slate-100" placeholder="Name"/> <select class="bg-slate-800 border border-slate-700 rounded p-1 text-slate-100"><option>Attribute</option><option>Defect</option></select></div> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-xs text-slate-200 p-1 mt-1 h-12 resize-y font-mono"></textarea>', 1), Vt[S], [
  [131, 10, [[132, 12], [137, 12, [[141, 14], [142, 14]]]]],
  [145, 10]
]), nd = N(/* @__PURE__ */ P('<input class="w-full bg-slate-800 border border-slate-700 rounded p-1 text-xs text-slate-100" placeholder="Template UUID"/> <input class="w-full bg-slate-800 border border-slate-700 rounded p-1 text-xs text-slate-100 mt-1" placeholder="Display name"/>', 1), Vt[S], [[151, 10], [156, 10]]), ad = N(/* @__PURE__ */ P('<div class="border border-slate-700 rounded p-2 mb-2"><div class="flex items-center justify-between mb-1"><span> </span> <button type="button" class="text-slate-500 hover:text-red-400 bg-transparent border-0 cursor-pointer text-xs">Remove</button></div> <!></div>'), Vt[S], [[121, 6, [[122, 8, [[123, 10], [126, 10]]]]]]), rd = N(/* @__PURE__ */ P('<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full"><input class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"/> <div class="grid grid-cols-2 gap-2"><div><label class="text-xs text-slate-500 uppercase">Template Type</label> <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"><option>Race</option><option>Class</option><option>Size</option></select></div> <div><label class="text-xs text-slate-500 uppercase">Point Total (info only)</label> <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"/></div></div> <!> <div><label class="text-xs text-slate-500 uppercase">Description</label> <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-16 resize-y"></textarea></div> <div><div class="text-xs text-slate-500 uppercase mb-1"> </div> <!> <div class="flex gap-2"><button type="button" class="px-2 py-1 bg-blue-700 text-blue-100 rounded border-0 cursor-pointer text-xs hover:bg-blue-600">Add Item Entry</button> <button type="button" class="px-2 py-1 bg-purple-700 text-purple-100 rounded border-0 cursor-pointer text-xs hover:bg-purple-600">Add Template Ref</button></div></div></div>'), Vt[S], [
  [
    67,
    0,
    [
      [69, 2],
      [
        76,
        2,
        [
          [77, 4, [[78, 6], [79, 6, [[83, 8], [84, 8], [85, 8]]]]],
          [88, 4, [[89, 6], [90, 6]]]
        ]
      ],
      [108, 2, [[109, 4], [110, 4]]],
      [117, 2, [[118, 4], [165, 4, [[166, 6], [168, 6]]]]]
    ]
  ]
]);
function Vt(t, e) {
  ce(new.target), le(e, !0, Vt);
  let n = L(/* @__PURE__ */ de(0), "version"), a = L(
    /* @__PURE__ */ Z(() => (s(n), e.document)),
    "item"
  );
  xe(() => {
    const V = Hooks.on("updateItem", (B) => {
      A(B.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("updateItem", V);
  });
  function r(V, B) {
    e.document.update({ [V]: B });
  }
  let i = L(
    /* @__PURE__ */ Z(() => (s(n), e.document.system.entries ?? [])),
    "entries"
  );
  function o() {
    const V = [
      ...s(i),
      {
        entryType: "item",
        name: "New Attribute",
        itemType: "attribute",
        systemData: { baseCostPerLevel: 1, purchasedLevel: 1 }
      }
    ];
    e.document.update({ "system.entries": V });
  }
  function l() {
    const V = [
      ...s(i),
      {
        entryType: "template",
        templateId: "",
        templateName: "Nested Template"
      }
    ];
    e.document.update({ "system.entries": V });
  }
  function c(V) {
    const B = s(i).filter((fe, be) => A(be, V, !1));
    e.document.update({ "system.entries": B });
  }
  function p(V, B, fe) {
    const be = s(i).map((he, _e) => A(_e, V, !1) ? he : { ...he, [B]: fe });
    e.document.update({ "system.entries": be });
  }
  function u(V, B) {
    try {
      const fe = JSON.parse(B), be = s(i).map((he, _e) => A(_e, V, !1) ? he : { ...he, systemData: fe });
      e.document.update({ "system.entries": be });
    } catch {
      ui.notifications.warn("Invalid JSON for system data.");
    }
  }
  var v = { ...ue() }, d = rd(), m = g(d), h = f(m, 2), w = g(h), x = f(g(w), 2), k = g(x);
  k.value = k.__value = "race";
  var C = f(k);
  C.value = C.__value = "class";
  var b = f(C);
  b.value = b.__value = "size";
  var _;
  rn(x);
  var M = f(w, 2), D = f(g(M), 2), H = f(h, 2);
  {
    var W = (V) => {
      var B = ed(), fe = f(g(B), 2);
      O(() => re(fe, s(a).system.sizeRank ?? 0)), E("change", fe, function(he) {
        return r("system.sizeRank", Number(he.target.value));
      }), F(V, B);
    };
    T(
      () => j(H, (V) => {
        A(s(a).system.templateType, "size") && V(W);
      }),
      "if",
      Vt,
      97,
      2
    );
  }
  var G = f(H, 2), me = f(g(G), 2), R = f(G, 2), z = g(R), X = g(z), ee = f(z, 2);
  T(
    () => Ge(ee, 17, () => s(i), ht, (V, B, fe) => {
      var be = ad(), he = g(be), _e = g(he), Ze = g(_e, !0);
      var ae = f(_e, 2);
      var Ne = f(he, 2);
      {
        var et = (je) => {
          var Re = td(), tt = pe(Re), nt = g(tt);
          var Fe = f(nt, 2), ne = g(Fe);
          ne.value = ne.__value = "attribute";
          var te = f(ne);
          te.value = te.__value = "defect";
          var sn;
          rn(Fe);
          var Yt = f(tt, 2);
          Ua(Yt, "placeholder", '{"baseCostPerLevel": 1, "purchasedLevel": 1}'), O(
            (St) => {
              re(nt, s(B).name), sn !== (sn = s(B).itemType) && (Fe.value = (Fe.__value = s(B).itemType) ?? "", Wt(Fe, s(B).itemType)), re(Yt, St);
            },
            [() => JSON.stringify(s(B).systemData ?? {}, null, 2)]
          ), E("change", nt, function(Kt) {
            return p(fe, "name", Kt.target.value);
          }), E("change", Fe, function(Kt) {
            return p(fe, "itemType", Kt.target.value);
          }), E("change", Yt, function(Kt) {
            return u(fe, Kt.target.value);
          }), F(je, Re);
        }, ut = (je) => {
          var Re = nd(), tt = pe(Re);
          var nt = f(tt, 2);
          O(() => {
            re(tt, s(B).templateId ?? ""), re(nt, s(B).templateName ?? "");
          }), E("change", tt, function(ne) {
            return p(fe, "templateId", ne.target.value);
          }), E("change", nt, function(ne) {
            return p(fe, "templateName", ne.target.value);
          }), F(je, Re);
        };
        T(
          () => j(Ne, (je) => {
            A(s(B).entryType, "item") ? je(et) : je(ut, -1);
          }),
          "if",
          Vt,
          130,
          8
        );
      }
      O(() => {
        mt(_e, 1, `text-xs font-bold ${A(s(B).entryType, "item") ? "text-blue-400" : "text-purple-400"}`), I(Ze, A(s(B).entryType, "item") ? "Item" : "Template Ref");
      }), E("click", ae, function() {
        return c(fe);
      }), F(V, be);
    }),
    "each",
    Vt,
    120,
    4
  );
  var Y = f(ee, 2), J = g(Y), ve = f(J, 2);
  return O(() => {
    re(m, s(a).name), _ !== (_ = s(a).system.templateType) && (x.value = (x.__value = s(a).system.templateType) ?? "", Wt(x, s(a).system.templateType)), re(D, s(a).system.pointTotal), re(me, s(a).system.description ?? ""), I(X, `Entries (${s(i).length ?? ""})`);
  }), E("change", m, function(B) {
    return e.document.update({ name: B.target.value });
  }), E("change", x, function(B) {
    return r("system.templateType", B.target.value);
  }), E("change", D, function(B) {
    return r("system.pointTotal", Number(B.target.value));
  }), E("change", me, function(B) {
    return r("system.description", B.target.value);
  }), E("click", J, o), E("click", ve, l), F(t, d), oe(v);
}
We(["change", "click"]);
const id = {
  attribute: ke,
  defect: Fa,
  enhancement: Ca,
  limiter: Aa,
  possession: Ea,
  skill: Rn,
  besm4eTemplate: Vt
};
var Sn;
class Gs extends foundry.applications.api.DocumentSheetV2 {
  constructor() {
    super(...arguments);
    $(this, Sn, null);
  }
  async _renderHTML(n, a) {
    const r = document.createElement("div");
    return r.classList.add("svelte-mount"), r;
  }
  _replaceHTML(n, a, r) {
    if (super._replaceHTML(n, a, r), !y(this, Sn)) {
      const i = id[this.document.type];
      if (!i) return;
      Q(this, Sn, nr(i, {
        target: a,
        props: { document: this.document, sheet: this }
      }));
    }
  }
  async close(n) {
    return y(this, Sn) && (ar(y(this, Sn)), Q(this, Sn, null)), super.close(n);
  }
}
Sn = new WeakMap(), Xe(Gs, "DEFAULT_OPTIONS", {
  classes: ["besm", "item-sheet"],
  position: { width: 450, height: 500 },
  window: { resizable: !0 }
});
Ft[S] = "src/components/sheets/NPCSheet.svelte";
var sd = N(/* @__PURE__ */ P('<div class="flex h-full bg-slate-900 text-slate-100"><!> <div class="flex-1 flex flex-col overflow-hidden"><!> <!> <div class="flex-1 overflow-y-auto"><!></div></div></div>'), Ft[S], [[50, 0, [[53, 2, [[57, 4]]]]]]);
function Ft(t, e) {
  ce(new.target), le(e, !0, Ft);
  let n = L(/* @__PURE__ */ de(0), "version"), a = L(
    /* @__PURE__ */ Z(() => (s(n), e.document)),
    "actor"
  ), r = L(/* @__PURE__ */ de("attributes"), "activeTab");
  const i = [
    { id: "attributes", label: "Attributes" },
    { id: "combat", label: "Combat" },
    { id: "biography", label: "Biography" }
  ];
  xe(() => {
    const p = Hooks.on("updateActor", (u) => {
      A(u.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("updateActor", p);
  }), xe(() => {
    const p = Hooks.on("createItem", (u) => {
      var v;
      A((v = u.parent) == null ? void 0 : v.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("createItem", p);
  }), xe(() => {
    const p = Hooks.on("updateItem", (u) => {
      var v;
      A((v = u.parent) == null ? void 0 : v.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("updateItem", p);
  }), xe(() => {
    const p = Hooks.on("deleteItem", (u) => {
      var v;
      A((v = u.parent) == null ? void 0 : v.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("deleteItem", p);
  });
  var o = { ...ue() }, l = Ee(), c = pe(l);
  return T(
    () => Fr(c, () => s(n), (p) => {
      var u = sd(), v = g(u);
      T(
        () => Le(v, {
          get actor() {
            return s(a);
          },
          showSP: !1,
          showEP: !0,
          showCV: !0
        }),
        "component",
        Ft,
        51,
        2,
        { componentTag: "ActorSidebar" }
      );
      var d = f(v, 2), m = g(d);
      T(
        () => bn(m, {
          get tabs() {
            return i;
          },
          get activeTab() {
            return s(r);
          },
          onSelect: (_) => ge(r, _, !0)
        }),
        "component",
        Ft,
        54,
        4,
        { componentTag: "TabBar" }
      );
      var h = f(m, 2);
      {
        let _ = /* @__PURE__ */ Z(() => s(a).system.benchmarkWarnings ?? []);
        T(
          () => Ln(h, {
            get warnings() {
              return s(_);
            }
          }),
          "component",
          Ft,
          55,
          4,
          { componentTag: "BenchmarkPanel" }
        );
      }
      var w = f(h, 2), x = g(w);
      {
        var k = (_) => {
          T(
            () => He(_, {
              get actor() {
                return s(a);
              }
            }),
            "component",
            Ft,
            59,
            8,
            { componentTag: "AttributesTab" }
          );
        }, C = (_) => {
          T(
            () => Qe(_, {
              get actor() {
                return s(a);
              }
            }),
            "component",
            Ft,
            61,
            8,
            { componentTag: "CombatTab" }
          );
        }, b = (_) => {
          T(
            () => fa(_, {
              get actor() {
                return s(a);
              }
            }),
            "component",
            Ft,
            63,
            8,
            { componentTag: "BiographyTab" }
          );
        };
        T(
          () => j(x, (_) => {
            A(s(r), "attributes") ? _(k) : A(s(r), "combat") ? _(C, 1) : A(s(r), "biography") && _(b, 2);
          }),
          "if",
          Ft,
          58,
          6
        );
      }
      F(p, u);
    }),
    "key",
    Ft,
    49,
    0
  ), F(t, l), oe(o);
}
var Tn;
class js extends foundry.applications.api.DocumentSheetV2 {
  constructor() {
    super(...arguments);
    $(this, Tn, null);
  }
  async _renderHTML(n, a) {
    const r = document.createElement("div");
    return r.classList.add("svelte-mount"), r;
  }
  _replaceHTML(n, a, r) {
    super._replaceHTML(n, a, r), y(this, Tn) || Q(this, Tn, nr(Ft, {
      target: a,
      props: { document: this.document, sheet: this }
    }));
  }
  async close(n) {
    return y(this, Tn) && (ar(y(this, Tn)), Q(this, Tn, null)), super.close(n);
  }
}
Tn = new WeakMap(), Xe(js, "DEFAULT_OPTIONS", {
  classes: ["besm", "actor-sheet", "npc-sheet"],
  position: { width: 700, height: 550 },
  window: { resizable: !0 }
});
wt[S] = "src/components/tabs/CrewTab.svelte";
var ld = N(/* @__PURE__ */ P('<p class="text-xs text-slate-500 italic mb-3">No crew assigned.</p>'), wt[S], [[51, 4]]), od = N(/* @__PURE__ */ P('<div class="flex items-center gap-2 px-2 py-1.5 border-b border-slate-800 text-xs"><span class="text-slate-200 flex-1"> </span> <select class="bg-slate-800 border border-slate-700 rounded text-xs text-slate-100 p-0.5"><option>Crew</option><option>Pilot</option><option>Gunner</option><option>Passenger</option></select> <button type="button" class="text-blue-400 hover:text-blue-200 bg-transparent border-0 cursor-pointer text-xs">Open</button> <button type="button" class="text-red-400 hover:text-red-200 bg-transparent border-0 cursor-pointer text-xs">Remove</button></div>'), wt[S], [
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
]), cd = N(/* @__PURE__ */ P('<div class="mt-2 mb-3 text-xs text-slate-400"> </div>'), wt[S], [[82, 4]]), ud = N(/* @__PURE__ */ P("<option> </option>"), wt[S], [[97, 10]]), dd = N(/* @__PURE__ */ P('<div class="p-3"><div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Crew</div> <!> <!> <div class="border-t border-slate-700 pt-2 mt-2"><div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Add Crew Member</div> <div class="flex flex-col gap-1"><select class="w-full bg-slate-800 border border-slate-700 rounded text-xs text-slate-100 p-1"><option>— Select Actor —</option><!></select> <div class="flex gap-2"><select class="flex-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-100 p-1"><option>Crew</option><option>Pilot</option><option>Gunner</option><option>Passenger</option></select> <button type="button" class="px-2 py-1 bg-emerald-700 text-emerald-100 rounded border-0 cursor-pointer text-xs hover:bg-emerald-600">Add</button></div></div></div></div>'), wt[S], [
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
function wt(t, e) {
  ce(new.target), le(e, !0, wt);
  let n = L(/* @__PURE__ */ Z(() => e.actor.system.crew ?? []), "crew"), a = L(/* @__PURE__ */ Z(() => s(n).filter((Y) => A(Y.role, "passenger")).length), "passengerCount"), r = L(/* @__PURE__ */ de(""), "newCrewId"), i = L(/* @__PURE__ */ de("crew"), "newCrewRole"), o = L(/* @__PURE__ */ Z(() => game.actors.filter((Y) => A(Y.id, e.actor.id, !1) && !s(n).some((J) => A(J.actorId, Y.id))).sort((Y, J) => Y.name.localeCompare(J.name))), "availableActors");
  function l(Y) {
    return game.actors.get(Y);
  }
  async function c() {
    if (!s(r)) return;
    const Y = [
      ...s(n),
      { actorId: s(r), role: s(i) }
    ];
    (await Te(e.actor.update({ "system.crew": Y })))(), ge(r, ""), ge(i, "crew");
  }
  async function p(Y) {
    const J = s(n).filter((ve, V) => A(V, Y, !1));
    (await Te(e.actor.update({ "system.crew": J })))();
  }
  async function u(Y, J) {
    const ve = s(n).map((V, B) => A(B, Y) ? { ...V, role: J } : V);
    (await Te(e.actor.update({ "system.crew": ve })))();
  }
  function v(Y) {
    const J = game.actors.get(Y);
    J && J.sheet.render(!0);
  }
  var d = { ...ue() }, m = dd(), h = f(g(m), 2);
  {
    var w = (Y) => {
      var J = ld();
      F(Y, J);
    }, x = (Y) => {
      var J = Ee(), ve = pe(J);
      T(
        () => Ge(ve, 17, () => s(n), ht, (V, B, fe) => {
          const be = L(/* @__PURE__ */ Z(() => l(s(B).actorId)), "crewActor");
          s(be);
          var he = od(), _e = g(he), Ze = g(_e, !0);
          var ae = f(_e, 2), Ne = g(ae);
          Ne.value = Ne.__value = "crew";
          var et = f(Ne);
          et.value = et.__value = "pilot";
          var ut = f(et);
          ut.value = ut.__value = "gunner";
          var je = f(ut);
          je.value = je.__value = "passenger";
          var Re;
          rn(ae);
          var tt = f(ae, 2), nt = f(tt, 2);
          O(() => {
            var Fe;
            I(Ze, ((Fe = s(be)) == null ? void 0 : Fe.name) ?? "Unknown Actor"), Re !== (Re = s(B).role) && (ae.value = (ae.__value = s(B).role) ?? "", Wt(ae, s(B).role));
          }), E("change", ae, function(ne) {
            return u(fe, ne.target.value);
          }), E("click", tt, function() {
            return v(s(B).actorId);
          }), E("click", nt, function() {
            return p(fe);
          }), F(V, he);
        }),
        "each",
        wt,
        53,
        4
      ), F(Y, J);
    };
    T(
      () => j(h, (Y) => {
        A(s(n).length, 0) ? Y(w) : Y(x, -1);
      }),
      "if",
      wt,
      50,
      2
    );
  }
  var k = f(h, 2);
  {
    var C = (Y) => {
      var J = cd(), ve = g(J);
      O(() => I(ve, `Passengers: ${s(a) ?? ""} / ${e.actor.system.passengerCapacity ?? ""}`)), F(Y, J);
    };
    T(
      () => j(k, (Y) => {
        e.actor.system.passengerCapacity > 0 && Y(C);
      }),
      "if",
      wt,
      81,
      2
    );
  }
  var b = f(k, 2), _ = f(g(b), 2), M = g(_), D = g(M);
  D.value = D.__value = "";
  var H = f(D);
  T(
    () => Ge(H, 17, () => s(o), ht, (Y, J) => {
      var ve = ud(), V = g(ve);
      var B = {};
      O(() => {
        I(V, `${s(J).name ?? ""} (${s(J).type ?? ""})`), B !== (B = s(J).id) && (ve.value = (ve.__value = s(J).id) ?? "");
      }), F(Y, ve);
    }),
    "each",
    wt,
    96,
    8
  );
  var W = f(M, 2), G = g(W), me = g(G);
  me.value = me.__value = "crew";
  var R = f(me);
  R.value = R.__value = "pilot";
  var z = f(R);
  z.value = z.__value = "gunner";
  var X = f(z);
  X.value = X.__value = "passenger";
  var ee = f(G, 2);
  return $r(
    M,
    function() {
      return s(r);
    },
    function(J) {
      ge(r, J);
    }
  ), $r(
    G,
    function() {
      return s(i);
    },
    function(J) {
      ge(i, J);
    }
  ), E("click", ee, c), F(t, m), oe(d);
}
We(["change", "click"]);
Gt[S] = "src/components/sheets/VehicleSheet.svelte";
var vd = N(/* @__PURE__ */ P('<div class="flex h-full bg-slate-900 text-slate-100"><!> <div class="flex-1 flex flex-col overflow-hidden"><!> <div class="flex-1 overflow-y-auto"><!></div></div></div>'), Gt[S], [[49, 0, [[52, 2, [[55, 4]]]]]]);
function Gt(t, e) {
  ce(new.target), le(e, !0, Gt);
  let n = L(/* @__PURE__ */ de(0), "version"), a = L(
    /* @__PURE__ */ Z(() => (s(n), e.document)),
    "actor"
  ), r = L(/* @__PURE__ */ de("attributes"), "activeTab");
  const i = [
    { id: "attributes", label: "Attributes" },
    { id: "crew", label: "Crew" },
    { id: "biography", label: "Biography" }
  ];
  xe(() => {
    const p = Hooks.on("updateActor", (u) => {
      A(u.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("updateActor", p);
  }), xe(() => {
    const p = Hooks.on("createItem", (u) => {
      var v;
      A((v = u.parent) == null ? void 0 : v.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("createItem", p);
  }), xe(() => {
    const p = Hooks.on("updateItem", (u) => {
      var v;
      A((v = u.parent) == null ? void 0 : v.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("updateItem", p);
  }), xe(() => {
    const p = Hooks.on("deleteItem", (u) => {
      var v;
      A((v = u.parent) == null ? void 0 : v.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("deleteItem", p);
  });
  var o = { ...ue() }, l = Ee(), c = pe(l);
  return T(
    () => Fr(c, () => s(n), (p) => {
      var u = vd(), v = g(u);
      T(
        () => Le(v, {
          get actor() {
            return s(a);
          },
          showSP: !1,
          showEP: !1,
          showCV: !1,
          statsToShow: ["body"]
        }),
        "component",
        Gt,
        50,
        2,
        { componentTag: "ActorSidebar" }
      );
      var d = f(v, 2), m = g(d);
      T(
        () => bn(m, {
          get tabs() {
            return i;
          },
          get activeTab() {
            return s(r);
          },
          onSelect: (b) => ge(r, b, !0)
        }),
        "component",
        Gt,
        53,
        4,
        { componentTag: "TabBar" }
      );
      var h = f(m, 2), w = g(h);
      {
        var x = (b) => {
          T(
            () => He(b, {
              get actor() {
                return s(a);
              }
            }),
            "component",
            Gt,
            57,
            8,
            { componentTag: "AttributesTab" }
          );
        }, k = (b) => {
          T(
            () => wt(b, {
              get actor() {
                return s(a);
              }
            }),
            "component",
            Gt,
            59,
            8,
            { componentTag: "CrewTab" }
          );
        }, C = (b) => {
          T(
            () => fa(b, {
              get actor() {
                return s(a);
              }
            }),
            "component",
            Gt,
            61,
            8,
            { componentTag: "BiographyTab" }
          );
        };
        T(
          () => j(w, (b) => {
            A(s(r), "attributes") ? b(x) : A(s(r), "crew") ? b(k, 1) : A(s(r), "biography") && b(C, 2);
          }),
          "if",
          Gt,
          56,
          6
        );
      }
      F(p, u);
    }),
    "key",
    Gt,
    48,
    0
  ), F(t, l), oe(o);
}
var Mn;
class Vs extends foundry.applications.api.DocumentSheetV2 {
  constructor() {
    super(...arguments);
    $(this, Mn, null);
  }
  async _renderHTML(n, a) {
    const r = document.createElement("div");
    return r.classList.add("svelte-mount"), r;
  }
  _replaceHTML(n, a, r) {
    super._replaceHTML(n, a, r), y(this, Mn) || Q(this, Mn, nr(Gt, {
      target: a,
      props: { document: this.document, sheet: this }
    }));
  }
  async close(n) {
    return y(this, Mn) && (ar(y(this, Mn)), Q(this, Mn, null)), super.close(n);
  }
}
Mn = new WeakMap(), Xe(Vs, "DEFAULT_OPTIONS", {
  classes: ["besm", "actor-sheet", "vehicle-sheet"],
  position: { width: 700, height: 500 },
  window: { resizable: !0 }
});
Ct[S] = "src/components/sheets/MechaSheet.svelte";
var fd = N(/* @__PURE__ */ P('<div class="flex h-full bg-slate-900 text-slate-100"><!> <div class="flex-1 flex flex-col overflow-hidden"><!> <div class="flex-1 overflow-y-auto"><!></div></div></div>'), Ct[S], [[51, 0, [[54, 2, [[57, 4]]]]]]);
function Ct(t, e) {
  ce(new.target), le(e, !0, Ct);
  let n = L(/* @__PURE__ */ de(0), "version"), a = L(
    /* @__PURE__ */ Z(() => (s(n), e.document)),
    "actor"
  ), r = L(/* @__PURE__ */ de("attributes"), "activeTab");
  const i = [
    { id: "attributes", label: "Attributes" },
    { id: "crew", label: "Crew" },
    { id: "combat", label: "Combat" },
    { id: "biography", label: "Biography" }
  ];
  xe(() => {
    const p = Hooks.on("updateActor", (u) => {
      A(u.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("updateActor", p);
  }), xe(() => {
    const p = Hooks.on("createItem", (u) => {
      var v;
      A((v = u.parent) == null ? void 0 : v.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("createItem", p);
  }), xe(() => {
    const p = Hooks.on("updateItem", (u) => {
      var v;
      A((v = u.parent) == null ? void 0 : v.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("updateItem", p);
  }), xe(() => {
    const p = Hooks.on("deleteItem", (u) => {
      var v;
      A((v = u.parent) == null ? void 0 : v.id, e.document.id) && Se(n);
    });
    return () => Hooks.off("deleteItem", p);
  });
  var o = { ...ue() }, l = Ee(), c = pe(l);
  return T(
    () => Fr(c, () => s(n), (p) => {
      var u = fd(), v = g(u);
      T(
        () => Le(v, {
          get actor() {
            return s(a);
          },
          showSP: !1,
          showEP: !1,
          showCV: !0,
          showPilot: !0,
          statsToShow: ["body"]
        }),
        "component",
        Ct,
        52,
        2,
        { componentTag: "ActorSidebar" }
      );
      var d = f(v, 2), m = g(d);
      T(
        () => bn(m, {
          get tabs() {
            return i;
          },
          get activeTab() {
            return s(r);
          },
          onSelect: (_) => ge(r, _, !0)
        }),
        "component",
        Ct,
        55,
        4,
        { componentTag: "TabBar" }
      );
      var h = f(m, 2), w = g(h);
      {
        var x = (_) => {
          T(
            () => He(_, {
              get actor() {
                return s(a);
              }
            }),
            "component",
            Ct,
            59,
            8,
            { componentTag: "AttributesTab" }
          );
        }, k = (_) => {
          T(
            () => wt(_, {
              get actor() {
                return s(a);
              }
            }),
            "component",
            Ct,
            61,
            8,
            { componentTag: "CrewTab" }
          );
        }, C = (_) => {
          T(
            () => Qe(_, {
              get actor() {
                return s(a);
              }
            }),
            "component",
            Ct,
            63,
            8,
            { componentTag: "CombatTab" }
          );
        }, b = (_) => {
          T(
            () => fa(_, {
              get actor() {
                return s(a);
              }
            }),
            "component",
            Ct,
            65,
            8,
            { componentTag: "BiographyTab" }
          );
        };
        T(
          () => j(w, (_) => {
            A(s(r), "attributes") ? _(x) : A(s(r), "crew") ? _(k, 1) : A(s(r), "combat") ? _(C, 2) : A(s(r), "biography") && _(b, 3);
          }),
          "if",
          Ct,
          58,
          6
        );
      }
      F(p, u);
    }),
    "key",
    Ct,
    50,
    0
  ), F(t, l), oe(o);
}
var Fn;
class Us extends foundry.applications.api.DocumentSheetV2 {
  constructor() {
    super(...arguments);
    $(this, Fn, null);
  }
  async _renderHTML(n, a) {
    const r = document.createElement("div");
    return r.classList.add("svelte-mount"), r;
  }
  _replaceHTML(n, a, r) {
    super._replaceHTML(n, a, r), y(this, Fn) || Q(this, Fn, nr(Ct, {
      target: a,
      props: { document: this.document, sheet: this }
    }));
  }
  async close(n) {
    return y(this, Fn) && (ar(y(this, Fn)), Q(this, Fn, null)), super.close(n);
  }
}
Fn = new WeakMap(), Xe(Us, "DEFAULT_OPTIONS", {
  classes: ["besm", "actor-sheet", "mecha-sheet"],
  position: { width: 700, height: 550 },
  window: { resizable: !0 }
});
function Pr(t) {
  return t <= 0 ? 0 : t <= 12 ? t * 2 : 24 + (t - 12) * 4;
}
function Ut(t) {
  return t.mode === "missing" ? null : t.mode === "zero" ? 0 : t.value;
}
function pd(t, e, n, a) {
  const r = e.reduce((l, c) => l + c.levels, 0), i = n.reduce((l, c) => l + c.levels, 0);
  return Math.max(a ? -1 : 0, t - r + i);
}
function md(t, e) {
  return t * e;
}
function _i(t, e, n) {
  const a = [t, e, n].filter((r) => r !== null);
  return a.length === 0 ? 0 : Math.floor(a.reduce((r, i) => r + i, 0) / a.length);
}
function Dr(t, e, n, a) {
  const r = n * 10, i = a * 10;
  return t !== null && e !== null ? { hp: Math.max(0, (t + e) * 5 + r - i), applicable: !0 } : t === null && e !== null ? { hp: Math.max(0, e * 10 + r - i), applicable: !0 } : e === null && t !== null ? { hp: Math.max(0, t * 10 + r - i), applicable: !0 } : { hp: 0, applicable: !1 };
}
function qs(t, e, n) {
  const a = n * 10;
  return t !== null && e !== null ? { ep: (t + e) * 5 + a, applicable: !0 } : t === null && e !== null ? { ep: e * 10 + a, applicable: !0 } : e === null && t !== null ? { ep: t * 10 + a, applicable: !0 } : { ep: 0, applicable: !1 };
}
function Ws(t, e, n) {
  if (!e) return 0;
  const a = Math.floor(t / 5), r = n * 10, i = Math.floor(t / 2);
  return Math.min(i, a + r);
}
function xi(t, e) {
  return {
    base: 5 + t,
    melee: 5 + t + e
  };
}
function Ys(t) {
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
function Ks(t, e, n, a) {
  return t === null || e === null ? null : t + e + n * 2 - a * 2;
}
function Js(t, e) {
  return t === null || e === null ? null : Math.floor((t + e) / 2);
}
const hd = {
  subhuman: { cpMax: 24, maxStat: 5, maxAttrLevel: 2, cvMin: 1, cvMax: 6, hpMin: 10, hpMax: 40, dmgMin: 2, dmgMax: 4 },
  human: { cpMax: 49, maxStat: 7, maxAttrLevel: 3, cvMin: 2, cvMax: 7, hpMin: 30, hpMax: 60, dmgMin: 3, dmgMax: 6 },
  adventurer: { cpMax: 74, maxStat: 9, maxAttrLevel: 4, cvMin: 3, cvMax: 8, hpMin: 40, hpMax: 80, dmgMin: 4, dmgMax: 8 },
  heroic: { cpMax: 99, maxStat: 10, maxAttrLevel: 5, cvMin: 4, cvMax: 9, hpMin: 50, hpMax: 100, dmgMin: 4, dmgMax: 9 },
  mythical: { cpMax: 149, maxStat: 12, maxAttrLevel: 6, cvMin: 5, cvMax: 10, hpMin: 60, hpMax: 120, dmgMin: 5, dmgMax: 10 },
  superhuman: { cpMax: 199, maxStat: null, maxAttrLevel: 8, cvMin: 6, cvMax: 12, hpMin: 70, hpMax: 140, dmgMin: 5, dmgMax: 11 },
  superpowered: { cpMax: 249, maxStat: null, maxAttrLevel: 9, cvMin: 7, cvMax: null, hpMin: 80, hpMax: 160, dmgMin: 6, dmgMax: 12 },
  godlike: { cpMax: null, maxStat: null, maxAttrLevel: null, cvMin: 8, cvMax: null, hpMin: 100, hpMax: null, dmgMin: 6, dmgMax: null }
};
function Zs(t, e, n, a) {
  const r = hd[t];
  if (!r) return { warnings: [], valid: !0 };
  const i = [];
  if (r.maxStat)
    for (const [o, l] of Object.entries(e)) {
      if (l.mode === "missing") continue;
      const c = l.mode === "zero" ? 0 : l.value;
      c > r.maxStat && i.push(`${o} (${c}) exceeds recommended stat max of ${r.maxStat}`);
    }
  if (r.maxAttrLevel)
    for (const o of n)
      o.type === "attribute" && (o.system.isBenchmarkException || o.system.effectiveLevel > r.maxAttrLevel && i.push(`${o.name} effective level (${o.system.effectiveLevel}) exceeds recommended max of ${r.maxAttrLevel}`));
  return r.cvMin && a.acv < r.cvMin && i.push(`ACV (${a.acv}) is below recommended minimum of ${r.cvMin}`), r.cvMax && a.acv > r.cvMax && i.push(`ACV (${a.acv}) exceeds recommended maximum of ${r.cvMax}`), r.hpMin && a.hp < r.hpMin && i.push(`HP (${a.hp}) is below recommended minimum of ${r.hpMin}`), r.hpMax && a.hp > r.hpMax && i.push(`HP (${a.hp}) exceeds recommended maximum of ${r.hpMax}`), { warnings: i, valid: i.length === 0 };
}
const gd = {
  framework: 1,
  adventure: 2,
  genre: 3
};
function bd(t, e, n, a) {
  let r = e, i = !0;
  const o = n[t];
  o && (o.costClass && (r = o.costClass), o.available !== void 0 && (i = o.available));
  const l = a[t];
  return l && (l.costClass && (r = l.costClass), l.available !== void 0 && (i = l.available)), {
    costPerRank: gd[r] ?? 1,
    available: i
  };
}
function _d(t) {
  return t * 10;
}
function xd(t) {
  return t.filter((e) => !e.isFlavor).reduce((e, n) => {
    const a = n.rank * n.resolvedCostPerRank, r = n.specialisations.filter((i) => !i.isFree).reduce((i, o) => i + o.spCost, 0);
    return e + a + r;
  }, 0);
}
class yd extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const e = foundry.data.fields;
    return {
      biography: new e.HTMLField(),
      genre: new e.StringField({ initial: "" }),
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
    const e = this.parent.items, n = Ut(this.stats.body), a = Ut(this.stats.mind), r = Ut(this.stats.soul);
    for (const _ of Object.values(this.stats))
      _.cpCost = _.mode === "missing" ? 0 : Pr(_.value);
    const i = Object.values(this.stats).reduce((_, M) => _ + M.cpCost, 0), o = e.filter((_) => _.type === "attribute").reduce((_, M) => _ + M.system.totalCost, 0), l = e.filter((_) => _.type === "defect").reduce((_, M) => _ + M.system.cpGranted, 0);
    this.cpTotal = this.cpBase + l, this.cpSpent = i + o, this.cpRemaining = this.cpTotal - this.cpSpent;
    try {
      if (game.settings.get("besm", "skillMode") === "pointbuy") {
        const _ = e.find(
          (M) => M.type === "attribute" && M.system.isSkillsAttribute
        );
        if (_) {
          const M = _d(_.system.purchasedLevel), D = [...e].filter((W) => W.type === "skill"), H = xd(D.map((W) => W.system));
          this.spPool = M, this.spSpent = H, this.spRemaining = M - H;
        }
      }
    } catch {
    }
    this.derived.baseCv = _i(n, a, r);
    const c = e.find(
      (_) => _.type === "attribute" && _.name === "Attack Mastery"
    );
    this.derived.acv = this.derived.baseCv + ((c == null ? void 0 : c.system.effectiveLevel) ?? 0);
    const p = e.find(
      (_) => _.type === "attribute" && _.name === "Defence Mastery"
    );
    this.derived.dcv = this.derived.baseCv + ((p == null ? void 0 : p.system.effectiveLevel) ?? 0);
    const u = e.find((_) => _.type === "attribute" && _.name === "Tough"), v = e.find((_) => _.type === "defect" && _.name === "Fragile"), d = Dr(n, r, (u == null ? void 0 : u.system.effectiveLevel) ?? 0, (v == null ? void 0 : v.system.rankLevel) ?? 0);
    this.derived.hp = d.hp, this.derived.hpMax = d.hp, this.derived.hpApplicable = d.applicable;
    const m = e.find((_) => _.type === "attribute" && _.name === "Energised"), h = qs(a, r, (m == null ? void 0 : m.system.effectiveLevel) ?? 0);
    this.derived.ep = h.ep, this.derived.epMax = h.ep, this.derived.epApplicable = h.applicable;
    const w = e.filter(
      (_) => _.type === "attribute" && _.name === "Combat Technique (Hardboiled)"
    ).length;
    this.derived.sv = Ws(this.derived.hp, this.derived.hpApplicable, w);
    const x = e.find((_) => _.type === "attribute" && _.name === "Massive Damage"), k = e.find((_) => _.type === "attribute" && _.name === "Superstrength"), C = xi(
      (x == null ? void 0 : x.system.effectiveLevel) ?? 0,
      (k == null ? void 0 : k.system.effectiveLevel) ?? 0
    );
    this.derived.damageMultiplier = C.base, this.derived.meleeDamageMultiplier = C.melee, this.derived.ar = e.filter((_) => _.type === "attribute" && ["Armour", "Force Field"].includes(_.name)).reduce((_, M) => _ + M.system.effectiveLevel, 0);
    const b = Ys(n);
    Object.assign(this.derived, b);
    try {
      if (game.settings.get("besm", "sanityEnabled")) {
        const _ = e.find((H) => H.type === "attribute" && H.name === "Unassailable"), M = e.find((H) => H.type === "defect" && H.name === "Unsettled"), D = Ks(a, r, (_ == null ? void 0 : _.system.effectiveLevel) ?? 0, (M == null ? void 0 : M.system.rankLevel) ?? 0);
        D !== null && (this.derived.sanityPoints = D, this.derived.sanityMax = D);
      }
    } catch {
    }
    try {
      if (game.settings.get("besm", "socialCombatEnabled")) {
        const _ = Js(a, r);
        _ !== null && (this.derived.socv = _, this.derived.societyPoints = _, this.derived.societyPointsMax = _);
      }
    } catch {
    }
    try {
      if (game.settings.get("besm", "enforceBenchmarks")) {
        const _ = game.settings.get("besm", "powerLevel"), M = Zs(_, this.stats, [...e], this.derived);
        this.benchmarkWarnings = M.warnings, this.benchmarkValid = M.valid;
      } else
        this.benchmarkWarnings = [], this.benchmarkValid = !0;
    } catch {
      this.benchmarkWarnings = [], this.benchmarkValid = !0;
    }
  }
}
class wd extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const e = foundry.data.fields;
    return {
      biography: new e.HTMLField(),
      genre: new e.StringField({ initial: "" }),
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
    const e = this.parent.items, n = Ut(this.stats.body), a = Ut(this.stats.mind), r = Ut(this.stats.soul);
    for (const b of Object.values(this.stats))
      b.cpCost = b.mode === "missing" ? 0 : Pr(b.value);
    const i = Object.values(this.stats).reduce((b, _) => b + _.cpCost, 0), o = e.filter((b) => b.type === "attribute").reduce((b, _) => b + _.system.totalCost, 0), l = e.filter((b) => b.type === "defect").reduce((b, _) => b + _.system.cpGranted, 0);
    this.cpTotal = this.cpBase + l, this.cpSpent = i + o, this.cpRemaining = this.cpTotal - this.cpSpent, this.derived.baseCv = _i(n, a, r);
    const c = e.find((b) => b.type === "attribute" && b.name === "Attack Mastery");
    this.derived.acv = this.derived.baseCv + ((c == null ? void 0 : c.system.effectiveLevel) ?? 0);
    const p = e.find((b) => b.type === "attribute" && b.name === "Defence Mastery");
    this.derived.dcv = this.derived.baseCv + ((p == null ? void 0 : p.system.effectiveLevel) ?? 0);
    const u = e.find((b) => b.type === "attribute" && b.name === "Tough"), v = e.find((b) => b.type === "defect" && b.name === "Fragile"), d = Dr(n, r, (u == null ? void 0 : u.system.effectiveLevel) ?? 0, (v == null ? void 0 : v.system.rankLevel) ?? 0);
    this.derived.hp = d.hp, this.derived.hpMax = d.hp, this.derived.hpApplicable = d.applicable;
    const m = e.find((b) => b.type === "attribute" && b.name === "Energised"), h = qs(a, r, (m == null ? void 0 : m.system.effectiveLevel) ?? 0);
    this.derived.ep = h.ep, this.derived.epMax = h.ep, this.derived.epApplicable = h.applicable;
    const w = e.filter((b) => b.type === "attribute" && b.name === "Combat Technique (Hardboiled)").length;
    this.derived.sv = Ws(this.derived.hp, this.derived.hpApplicable, w);
    const x = e.find((b) => b.type === "attribute" && b.name === "Massive Damage"), k = e.find((b) => b.type === "attribute" && b.name === "Superstrength"), C = xi((x == null ? void 0 : x.system.effectiveLevel) ?? 0, (k == null ? void 0 : k.system.effectiveLevel) ?? 0);
    this.derived.damageMultiplier = C.base, this.derived.meleeDamageMultiplier = C.melee, this.derived.ar = e.filter((b) => b.type === "attribute" && ["Armour", "Force Field"].includes(b.name)).reduce((b, _) => b + _.system.effectiveLevel, 0), Object.assign(this.derived, Ys(n));
    try {
      if (game.settings.get("besm", "sanityEnabled")) {
        const b = e.find((D) => D.type === "attribute" && D.name === "Unassailable"), _ = e.find((D) => D.type === "defect" && D.name === "Unsettled"), M = Ks(a, r, (b == null ? void 0 : b.system.effectiveLevel) ?? 0, (_ == null ? void 0 : _.system.rankLevel) ?? 0);
        M !== null && (this.derived.sanityPoints = M, this.derived.sanityMax = M);
      }
    } catch {
    }
    try {
      if (game.settings.get("besm", "socialCombatEnabled")) {
        const b = Js(a, r);
        b !== null && (this.derived.socv = b, this.derived.societyPoints = b, this.derived.societyPointsMax = b);
      }
    } catch {
    }
    try {
      if (game.settings.get("besm", "enforceBenchmarks")) {
        const b = game.settings.get("besm", "powerLevel"), _ = Zs(b, this.stats, [...e], this.derived);
        this.benchmarkWarnings = _.warnings, this.benchmarkValid = _.valid;
      }
    } catch {
    }
  }
}
class kd extends foundry.abstract.TypeDataModel {
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
    for (const u of Object.values(this.stats))
      u.cpCost = u.mode === "missing" ? 0 : Pr(u.value);
    const n = Object.values(this.stats).reduce((u, v) => u + v.cpCost, 0), a = e.filter((u) => u.type === "attribute").reduce((u, v) => u + v.system.totalCost, 0), r = e.filter((u) => u.type === "defect").reduce((u, v) => u + v.system.cpGranted, 0);
    this.cpTotal = this.cpBase + r, this.cpSpent = n + a, this.cpRemaining = this.cpTotal - this.cpSpent;
    const i = Ut(this.stats.body), o = Ut(this.stats.soul), l = e.find((u) => u.type === "attribute" && u.name === "Tough"), c = e.find((u) => u.type === "defect" && u.name === "Fragile"), p = Dr(i, o, (l == null ? void 0 : l.system.effectiveLevel) ?? 0, (c == null ? void 0 : c.system.rankLevel) ?? 0);
    this.derived.hp = p.hp, this.derived.hpMax = p.hp, this.derived.hpApplicable = p.applicable, this.derived.ar = e.filter((u) => u.type === "attribute" && ["Armour", "Force Field"].includes(u.name)).reduce((u, v) => u + v.system.effectiveLevel, 0);
  }
}
class Sd extends foundry.abstract.TypeDataModel {
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
    for (const b of Object.values(this.stats))
      b.cpCost = b.mode === "missing" ? 0 : Pr(b.value);
    const n = Object.values(this.stats).reduce((b, _) => b + _.cpCost, 0), a = e.filter((b) => b.type === "attribute").reduce((b, _) => b + _.system.totalCost, 0), r = e.filter((b) => b.type === "defect").reduce((b, _) => b + _.system.cpGranted, 0);
    this.cpTotal = this.cpBase + r, this.cpSpent = n + a, this.cpRemaining = this.cpTotal - this.cpSpent;
    const i = Ut(this.stats.body), o = Ut(this.stats.mind), l = Ut(this.stats.soul);
    let c = i, p = o, u = l;
    try {
      if (this.pilotId) {
        const b = game.actors.get(this.pilotId);
        if (b) {
          const _ = b.system.stats.body.mode !== "missing" ? b.system.stats.body.value : null, M = b.system.stats.mind.mode !== "missing" ? b.system.stats.mind.value : null, D = b.system.stats.soul.mode !== "missing" ? b.system.stats.soul.value : null;
          this.pilotBonus.body = _ ?? 0, this.pilotBonus.mind = M ?? 0, this.pilotBonus.soul = D ?? 0, c = (i ?? 0) + (_ ?? 0), p = M, u = D;
        }
      }
    } catch {
    }
    this.derived.baseCv = _i(c, p, u);
    const v = e.find((b) => b.type === "attribute" && b.name === "Attack Mastery");
    this.derived.acv = this.derived.baseCv + ((v == null ? void 0 : v.system.effectiveLevel) ?? 0);
    const d = e.find((b) => b.type === "attribute" && b.name === "Defence Mastery");
    this.derived.dcv = this.derived.baseCv + ((d == null ? void 0 : d.system.effectiveLevel) ?? 0);
    const m = e.find((b) => b.type === "attribute" && b.name === "Tough"), h = e.find((b) => b.type === "defect" && b.name === "Fragile"), w = Dr(i, l, (m == null ? void 0 : m.system.effectiveLevel) ?? 0, (h == null ? void 0 : h.system.rankLevel) ?? 0);
    this.derived.hp = w.hp, this.derived.hpMax = w.hp, this.derived.hpApplicable = w.applicable, this.derived.ar = e.filter((b) => b.type === "attribute" && ["Armour", "Force Field"].includes(b.name)).reduce((b, _) => b + _.system.effectiveLevel, 0);
    const x = e.find((b) => b.type === "attribute" && b.name === "Massive Damage"), k = e.find((b) => b.type === "attribute" && b.name === "Superstrength"), C = xi((x == null ? void 0 : x.system.effectiveLevel) ?? 0, (k == null ? void 0 : k.system.effectiveLevel) ?? 0);
    this.derived.damageMultiplier = C.base, this.derived.meleeDamageMultiplier = C.melee;
  }
}
class Td extends foundry.abstract.TypeDataModel {
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
      notes: new e.HTMLField()
    };
  }
  prepareDerivedData() {
    this.effectiveLevel = pd(
      this.purchasedLevel,
      this.enhancements,
      this.limiters,
      this.isWeapon
    ), this.totalCost = md(this.baseCostPerLevel, this.purchasedLevel);
  }
}
class Md extends foundry.abstract.TypeDataModel {
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
class Fd extends foundry.abstract.TypeDataModel {
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
class Cd extends foundry.abstract.TypeDataModel {
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
class Ad extends foundry.abstract.TypeDataModel {
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
class Ed extends foundry.abstract.TypeDataModel {
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
    let n = {};
    try {
      n = game.settings.get("besm", "worldSkillOverrides") ?? {};
    } catch {
    }
    const a = bd(
      this.parent.name,
      this.costClass,
      e,
      n
    );
    this.resolvedCostPerRank = this.isFlavor ? 0 : a.costPerRank, this.isAvailable = a.available;
    const r = this.rank * this.resolvedCostPerRank, i = this.specialisations.filter((o) => !o.isFree).reduce((o, l) => o + l.spCost, 0);
    this.totalSpCost = r + i;
  }
}
class Nd extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const e = foundry.data.fields;
    return {
      templateType: new e.StringField({
        initial: "race",
        choices: ["race", "class", "size"]
      }),
      description: new e.HTMLField(),
      pointTotal: new e.NumberField({ integer: !0, initial: 0 }),
      sizeRank: new e.NumberField({ integer: !0, initial: 0, nullable: !0 }),
      entries: new e.ArrayField(new e.ObjectField())
    };
  }
}
function Pd() {
  const t = (e, n) => game.settings.register("besm", e, {
    scope: "world",
    config: !0,
    ...n
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
function Dd() {
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
    const n = game.folders.get(t.folder);
    if (!n) return;
    game.actors.filter((i) => i.folder === t.folder).some((i) => i.id === t.id && i.type === "character") && n.name !== e.name && await n.update({ name: e.name });
  });
}
const Ld = [
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
  console.log("BESM 4e | Initializing BESM 4th Edition system"), CONFIG.Actor.dataModels.character = yd, CONFIG.Actor.dataModels.npc = wd, CONFIG.Actor.dataModels.vehicle = kd, CONFIG.Actor.dataModels.mecha = Sd, CONFIG.Item.dataModels.attribute = Td, CONFIG.Item.dataModels.enhancement = Md, CONFIG.Item.dataModels.limiter = Fd, CONFIG.Item.dataModels.defect = Cd, CONFIG.Item.dataModels.possession = Ad, CONFIG.Item.dataModels.skill = Ed, CONFIG.Item.dataModels.besm4eTemplate = Nd, Pd(), Dd();
  try {
    game.settings.get("besm", "initiativeMode") === "cv_static" ? CONFIG.Combat.initiative = { formula: "@derived.acv", decimals: 0 } : CONFIG.Combat.initiative = { formula: "2d6 + @derived.acv", decimals: 0 };
  } catch {
    CONFIG.Combat.initiative = { formula: "2d6 + @derived.acv", decimals: 0 };
  }
  CONFIG.statusEffects = Ld, foundry.documents.collections.Actors.registerSheet("besm", zs, {
    types: ["character"],
    makeDefault: !0,
    label: "BESM4e.SheetCharacter"
  }), foundry.documents.collections.Actors.registerSheet("besm", js, {
    types: ["npc"],
    makeDefault: !0,
    label: "BESM4e.SheetNPC"
  }), foundry.documents.collections.Actors.registerSheet("besm", Vs, {
    types: ["vehicle"],
    makeDefault: !0,
    label: "BESM4e.SheetVehicle"
  }), foundry.documents.collections.Actors.registerSheet("besm", Us, {
    types: ["mecha"],
    makeDefault: !0,
    label: "BESM4e.SheetMecha"
  }), foundry.documents.collections.Items.registerSheet("besm", Gs, {
    types: ["attribute", "defect", "enhancement", "limiter", "possession", "skill", "besm4eTemplate"],
    makeDefault: !0,
    label: "BESM4e.SheetItem"
  });
});
Hooks.on("renderChatMessageHTML", (t, e) => {
  e.querySelectorAll('[data-action="defend"]').forEach((n) => {
    n.addEventListener("click", async () => {
      var l, c;
      const a = n.getAttribute("data-message-id"), r = game.messages.get(a);
      if (!r) return;
      const i = (c = (l = canvas.tokens) == null ? void 0 : l.controlled) == null ? void 0 : c[0], o = (i == null ? void 0 : i.actor) ?? game.user.character;
      if (!o) {
        ui.notifications.warn("Select a token or assign a character to defend.");
        return;
      }
      await Oi(o, r);
    });
  }), e.querySelectorAll('[data-action="auto-defend"]').forEach((n) => {
    n.addEventListener("click", async () => {
      var l, c;
      const a = n.getAttribute("data-message-id"), r = game.messages.get(a);
      if (!r) return;
      const i = (c = (l = canvas.tokens) == null ? void 0 : l.controlled) == null ? void 0 : c[0], o = i == null ? void 0 : i.actor;
      if (!o) {
        ui.notifications.warn("Select the defending token first.");
        return;
      }
      await Oi(o, r);
    });
  }), e.querySelectorAll('[data-action="apply-damage"]').forEach((n) => {
    n.addEventListener("click", async () => {
      const a = n.getAttribute("data-defender-id"), r = Number(n.getAttribute("data-damage")), i = game.actors.get(a);
      i && await Zc(i, r);
    });
  }), e.querySelectorAll('[data-action="spend-ep"]').forEach((n) => {
    n.addEventListener("click", async () => {
      const a = n.getAttribute("data-actor-id"), r = Number(n.getAttribute("data-total")), i = n.getAttribute("data-message-id"), o = game.actors.get(a);
      o && await Xc(o, r, i);
    });
  }), e.querySelectorAll('[data-action="social-defend"]').forEach((n) => {
    n.addEventListener("click", async () => {
      var l, c;
      const a = n.getAttribute("data-message-id"), r = game.messages.get(a);
      if (!r) return;
      const i = (c = (l = canvas.tokens) == null ? void 0 : l.controlled) == null ? void 0 : c[0], o = (i == null ? void 0 : i.actor) ?? game.user.character;
      if (!o) {
        ui.notifications.warn("Select a token or assign a character to defend.");
        return;
      }
      await Tu(o, r);
    });
  }), e.querySelectorAll('[data-action="apply-social-damage"]').forEach((n) => {
    n.addEventListener("click", async () => {
      const a = n.getAttribute("data-defender-id"), r = Number(n.getAttribute("data-damage")), i = game.actors.get(a);
      i && await Mu(i, r);
    });
  });
});
