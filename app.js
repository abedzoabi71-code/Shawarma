/* =========================================================
   App logic. Vanilla JS, no dependencies.
   Screens: home → item → sides → cart → (drinks) → checkout → done
   ========================================================= */
(function () {
  'use strict';

  /* ---------- state ---------- */
  const state = {
    lang: pickLang(),
    screen: 'home',
    cat: 'shawarma',
    itemId: null,
    bread: 'laffa',
    salads: ['hummus', 'tahina', 'corn'],
    extras: [],
    qty: 1,
    pendingSides: [],
    cart: [],
    pay: null,
    wazeSent: false,
    orderNo: CONFIG.firstOrderNo,
    boxSize: 'small',
    saladBoxChoice: null,
  };

  function pickLang() {
    const l = (navigator.language || 'he').slice(0, 2).toLowerCase();
    return l === 'ar' ? 'ar' : l === 'en' ? 'en' : 'he';
  }

  /* ---------- helpers ---------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const t = (v) => (v && typeof v === 'object' ? v[state.lang] || v.en : v);
  const money = (n) => CONFIG.currency + n;
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  /* an <img> when a photo is set, a striped placeholder otherwise */
  const photo = (src, alt) =>
    src ? `<img src="${src}" alt="${alt || ''}" loading="lazy">` : '<div class="photo"></div>';

  const ICON = {
    plus: '<svg viewBox="0 0 20 20"><path d="M10 4.5v11M4.5 10h11"/></svg>',
    minus: '<svg viewBox="0 0 20 20"><path d="M4.5 10h11"/></svg>',
    check: '<svg viewBox="0 0 20 20"><path d="M4.5 10.5l3.5 3.5 7.5-8"/></svg>',
    star: '<svg viewBox="0 0 20 20"><path d="M10 2.6l2.3 4.7 5.2.8-3.8 3.7.9 5.2L10 14.5l-4.6 2.5.9-5.2L2.5 8.1l5.2-.8z"/></svg>',
    card: '<svg viewBox="0 0 20 20"><rect x="2.5" y="5" width="15" height="10" rx="1.8"/><path d="M2.5 8.6h15"/></svg>',
    cash: '<svg viewBox="0 0 20 20"><rect x="2.5" y="5.5" width="15" height="9" rx="1.4"/><circle cx="10" cy="10" r="2.2"/></svg>',
    pin: '<svg viewBox="0 0 20 20"><path d="M10 17.5s5.4-5 5.4-9a5.4 5.4 0 10-10.8 0c0 4 5.4 9 5.4 9z"/><circle cx="10" cy="8.4" r="2"/></svg>',
  };

  /* ---------- language ---------- */
  function applyLang() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === 'en' ? 'ltr' : 'rtl';
    document.querySelectorAll('[data-t]').forEach((n) => {
      n.textContent = t(T[n.dataset.t]);
    });
    document.querySelectorAll('.lang button').forEach((b) => {
      b.setAttribute('aria-current', String(b.dataset.lang === state.lang));
    });
    $('#note').placeholder = t(T.notePlaceholder);
    $('#address').placeholder = t(T.addressPlaceholder);
    $('#customer-name').placeholder = t(T.customerNamePlaceholder);
    $('#customer-phone').placeholder = t(T.customerPhonePlaceholder);
    $('#card-name').placeholder = t(T.cardHolderPlaceholder);
    $('#card-number').placeholder = t(T.cardNumberPlaceholder);
    $('#card-expiry').placeholder = t(T.expiryPlaceholder);
    $('#card-cvv').placeholder = t(T.cvvPlaceholder);
  }

  /* ---------- screens ---------- */
  function show(name) {
    state.screen = name;
    document.querySelectorAll('.screen').forEach((s) => {
      s.hidden = s.id !== 'screen-' + name;
    });
    window.scrollTo(0, 0);
    renderCartBar();
  }

  /* ---------- home ---------- */
  function renderCats() {
    const wrap = $('#cats');
    wrap.innerHTML = '';
    CATS.forEach((c) => {
      const b = el('button', null, t(c.name));
      b.type = 'button';
      b.setAttribute('aria-current', String(c.id === state.cat && c.id !== 'drinks'));
      b.onclick = () => {
        if (c.id === 'drinks') return show('drinks');
        state.cat = c.id;
        renderCats();
        renderMenu();
      };
      wrap.appendChild(b);
    });
  }

  function renderMenu() {
    $('#cat-title').textContent = t((CATS.find((c) => c.id === state.cat) || CATS[0]).name);
    const list = $('#menu');
    list.innerHTML = '';

    if (state.cat === 'salad-boxes') {
      SALADS.forEach((s) => {
        const li = el('li');
        const b = el('button', 'dish');
        b.type = 'button';
        b.innerHTML =
          `<span class="dish__thumb">${photo(s.photo, t(s.name))}</span>` +
          `<span class="dish__body">` +
          `<span class="dish__title"><strong>${t(s.name)}</strong></span>` +
          `<span class="dish__desc">${t(T.saladsQ)}</span>` +
          `<span class="price">${t(T.saladsFree)}</span>` +
          `</span>` +
          `<span class="dish__add">${ICON.plus}</span>`;
        b.onclick = () => openSaladBoxPicker(s.id);
        li.appendChild(b);
        list.appendChild(li);
      });
      return;
    }

    ITEMS.filter((i) => i.cat === state.cat).forEach((i) => {
      const li = el('li');
      const b = el('button', 'dish');
      b.type = 'button';
      b.innerHTML =
        `<span class="dish__thumb">${photo(i.photo, t(i.name))}</span>` +
        `<span class="dish__body">` +
        `<span class="dish__title"><strong>${t(i.name)}</strong>` +
        (i.tag ? `<span class="tag">${t(i.tag)}</span>` : '') +
        `</span>` +
        `<span class="dish__desc">${t(i.desc)}</span>` +
        `<span class="price">${money(i.price)}</span>` +
        `</span>` +
        `<span class="dish__add">${ICON.plus}</span>`;
      b.onclick = () => openItem(i.id);
      li.appendChild(b);
      list.appendChild(li);
    });
  }

  function renderStatic() {
    const why = $('#why');
    why.innerHTML = '';
    WHY.forEach((w) => {
      why.appendChild(el('li', null, `<span><strong>${t(w.title)}</strong><span>${t(w.body)}</span></span>`));
    });
    const rev = $('#reviews');
    rev.innerHTML = '';
    REVIEWS.forEach((r) => {
      rev.appendChild(
        el('article', 'review',
          `<div class="review__stars">${ICON.star.repeat(5)}</div>` +
          `<p>${t(r.text)}</p><span>${t(r.who)}</span>`)
      );
    });
  }

  /* ---------- item builder ---------- */
  function currentItem() {
    return ITEMS.find((i) => i.id === state.itemId) || null;
  }

  function addDirectItem(item) {
    state.cart.push({
      key: item.id + '-' + Date.now(),
      name: item.name,
      photo: item.photo,
      unit: item.price,
      qty: 1,
      parts: [L('סלטים', 'سلطات', 'Salads')],
      kind: 'salad-box',
    });
    renderCart();
    show('cart');
  }

  function openSaladBoxPicker(saladId) {
    state.itemId = '__salad-box__';
    state.saladBoxChoice = saladId;
    state.boxSize = 'small';
    $('#note').value = '';
    renderItem();
    show('item');
  }

  function openItem(id) {
    const item = ITEMS.find((i) => i.id === id);
    if (!item) return;
    if (item.builder === false) {
      addDirectItem(item);
      return;
    }
    Object.assign(state, {
      itemId: id, bread: 'laffa', salads: ['hummus', 'tahina', 'corn'],
      extras: [], qty: 1, pendingSides: [],
    });
    $('#note').value = '';
    renderItem();
    show('item');
  }

  function unitPrice() {
    if (state.itemId === '__salad-box__') {
      const salad = SALADS.find((s) => s.id === state.saladBoxChoice) || SALADS[0];
      const sizePrice = { small: 24, big: 32, 'small-dahi': 30 }[state.boxSize] || 24;
      return sizePrice;
    }
    const it = currentItem();
    if (!it) return 0;
    const bread = BREADS.find((b) => b.id === state.bread);
    const extras = EXTRAS.filter((e) => state.extras.includes(e.id)).reduce((a, e) => a + e.price, 0);
    return it.price + (bread ? bread.extra : 0) + extras;
  }

  function toggle(list, id) {
    const i = list.indexOf(id);
    if (i >= 0) list.splice(i, 1); else list.push(id);
  }

  function renderItem() {
    if (state.itemId === '__salad-box__') {
      const salad = SALADS.find((s) => s.id === state.saladBoxChoice) || SALADS[0];
      const boxSizes = [
        { id: 'small', label: L('קטן', 'صغير', 'Small'), price: 24 },
        { id: 'big', label: L('גדול', 'كبير', 'Large'), price: 32 },
        { id: 'small-dahi', label: L('קטן + דהין', 'صغير + دحين', 'Small + dahi'), price: 30 },
      ];

      $('#item-photo').outerHTML = '<div class="photo photo--flat" id="item-photo"></div>';
      $('#item-name').textContent = t(salad.name);
      $('#item-price').textContent = money(boxSizes.find((b) => b.id === state.boxSize)?.price || 24);
      $('#item-desc').textContent = t(T.saladsQ);

      const breads = $('#breads');
      breads.innerHTML = '';
      boxSizes.forEach((size) => {
        const n = el('button', 'bread',
          `<span class="bread__sw"></span><span><strong>${t(size.label)}</strong>` +
          `<span>${'+' + money(size.price)}</span></span>`);
        n.type = 'button';
        n.setAttribute('aria-pressed', String(state.boxSize === size.id));
        n.onclick = () => { state.boxSize = size.id; renderItem(); };
        breads.appendChild(n);
      });

      $('#salads').innerHTML = '';
      $('#extras').innerHTML = '';
      $('#qty').textContent = state.qty;
      $('#item-total').textContent = money(unitPrice() * state.qty);
      return;
    }

    const it = currentItem();
    if (!it) return;
    $('#item-photo').outerHTML = it.photo
      ? `<img id="item-photo" src="${it.photo}" alt="${t(it.name)}">`
      : '<div class="photo photo--flat" id="item-photo"></div>';
    $('#item-name').textContent = t(it.name);
    $('#item-price').textContent = money(it.price);
    $('#item-desc').textContent = t(it.desc);

    const breads = $('#breads');
    breads.innerHTML = '';
    BREADS.forEach((b) => {
      const n = el('button', 'bread',
        `<span class="bread__sw"></span><span><strong>${t(b.name)}</strong>` +
        `<span>${b.extra ? '+' + money(b.extra) : t(T.noCharge)}</span></span>`);
      n.type = 'button';
      n.setAttribute('aria-pressed', String(state.bread === b.id));
      n.onclick = () => { state.bread = b.id; renderItem(); };
      breads.appendChild(n);
    });

    const salads = $('#salads');
    salads.innerHTML = '';
    SALADS.forEach((s) => {
      const n = el('button', 'salad',
        `<span class="salad__tile">${photo(s.photo, t(s.name))}` +
        `<span class="salad__check">${ICON.check}</span></span>` +
        `<span>${t(s.name)}</span>`);
      n.type = 'button';
      n.setAttribute('aria-pressed', String(state.salads.includes(s.id)));
      n.onclick = () => { toggle(state.salads, s.id); renderItem(); };
      salads.appendChild(n);
    });

    const extras = $('#extras');
    extras.innerHTML = '';
    EXTRAS.forEach((e) => {
      const n = el('button', 'option',
        `<span class="option__box">${ICON.check}</span>` +
        `<span class="option__text"><strong>${t(e.name)}</strong></span>` +
        `<span class="option__price">${e.price ? '+' + money(e.price) : t(T.free)}</span>`);
      n.type = 'button';
      n.setAttribute('aria-pressed', String(state.extras.includes(e.id)));
      n.onclick = () => { toggle(state.extras, e.id); renderItem(); };
      extras.appendChild(n);
    });

    $('#qty').textContent = state.qty;
    $('#item-total').textContent = money(unitPrice() * state.qty);
  }

  /* ---------- sides upsell ---------- */
  function renderSides() {
    const wrap = $('#sides');
    wrap.innerHTML = '';
    SIDES.forEach((s) => {
      const n = el('button', 'option',
        `<span class="option__thumb">${photo(s.photo, t(s.name))}</span>` +
        `<span class="option__text"><strong>${t(s.name)}</strong><small>${t(s.desc)}</small>` +
        `<strong class="option__price">+${money(s.price)}</strong></span>` +
        `<span class="option__box">${ICON.check}</span>`);
      n.type = 'button';
      n.setAttribute('aria-pressed', String(state.pendingSides.includes(s.id)));
      n.onclick = () => { toggle(state.pendingSides, s.id); renderSides(); };
      wrap.appendChild(n);
    });
    const total = SIDES.filter((s) => state.pendingSides.includes(s.id)).reduce((a, s) => a + s.price, 0);
    $('#sides-total').textContent = money(total);
    $('#sides-cta').textContent = state.pendingSides.length ? t(T.addSides) : t(T.addToCart);
  }

  function commitItem(withSides) {
    if (state.itemId === '__salad-box__') {
      const salad = SALADS.find((s) => s.id === state.saladBoxChoice) || SALADS[0];
      const size = { small: L('קטן', 'صغير', 'Small'), big: L('גדול', 'كبير', 'Large'), 'small-dahi': L('קטן + דהין', 'صغير + دحين', 'Small + dahi') }[state.boxSize] || L('קטן', 'صغير', 'Small');
      state.cart.push({
        key: 'salad-box-' + salad.id + '-' + Date.now(),
        name: salad.name,
        photo: salad.photo,
        unit: unitPrice(),
        qty: state.qty,
        parts: [size],
        kind: 'salad-box',
      });
      state.pendingSides = [];
      renderCart();
      show('cart');
      return;
    }

    const it = currentItem();
    if (!it) return;
    const bread = BREADS.find((b) => b.id === state.bread);
    const parts = [bread]
      .concat(SALADS.filter((s) => state.salads.includes(s.id)))
      .concat(EXTRAS.filter((e) => state.extras.includes(e.id)))
      .filter(Boolean)
      .map((p) => p.name);
    const note = $('#note').value.trim();
    state.cart.push({
      key: it.id + '-' + Date.now(), name: it.name, photo: it.photo,
      unit: unitPrice(), qty: state.qty, parts, note,
    });
    if (withSides) {
      SIDES.filter((s) => state.pendingSides.includes(s.id)).forEach((s) => {
        state.cart.push({
          key: 'side-' + s.id + '-' + Date.now(), name: s.name, photo: s.photo,
          unit: s.price, qty: 1, parts: [], kind: 'side',
        });
      });
    }
    state.pendingSides = [];
    renderCart();
    show('cart');
  }

  /* ---------- drinks ---------- */
  function renderDrinks() {
    const wrap = $('#drinks');
    wrap.innerHTML = '';
    DRINKS.forEach((d) => {
      const inCart = state.cart.find((l) => l.key === 'drink-' + d.id);
      const card = el('div', 'drink',
        `<div class="drink__thumb">${photo(d.photo, t(d.name))}</div>` +
        `<strong>${t(d.name)}</strong>` +
        `<div class="drink__row"><span class="price">${money(d.price)}</span>` +
        `<button type="button" class="drink__add${inCart ? ' is-added' : ''}">${inCart ? inCart.qty : ICON.plus}</button></div>`);
      $('.drink__add', card).onclick = () => {
        const line = state.cart.find((l) => l.key === 'drink-' + d.id);
        if (line) line.qty += 1;
        else state.cart.push({ key: 'drink-' + d.id, name: d.name, photo: d.photo, unit: d.price, qty: 1, parts: [], kind: 'drink' });
        renderDrinks();
        renderCart();
      };
      wrap.appendChild(card);
    });
  }

  /* ---------- cart & totals ---------- */
  const subtotal = () => state.cart.reduce((a, l) => a + l.unit * l.qty, 0);
  const fee = () => (state.cart.length ? CONFIG.deliveryFee : 0);
  const total = () => subtotal() + fee();

  function renderTotals(node) {
    node.innerHTML =
      `<div><dt>${t(T.subtotal)}</dt><dd>${money(subtotal())}</dd></div>` +
      `<div><dt>${t(T.delivery)}</dt><dd>${money(fee())}</dd></div>` +
      `<div class="is-total"><dt>${t(T.total)}</dt><dd>${money(total())}</dd></div>`;
  }

  function renderCart() {
    const list = $('#cart');
    list.innerHTML = '';
    if (!state.cart.length) {
      list.appendChild(el('li', 'line', `<span class="line__detail">${t(T.emptyCart)}</span>`));
    }
    state.cart.forEach((l) => {
      const detail = l.parts.length
        ? l.parts.map(t).join(' · ')
        : t(l.kind === 'drink' ? T.drink : T.side);
      const li = el('li', 'line',
        `<span class="line__thumb">${photo(l.photo, '')}</span>` +
        `<span class="line__body"><strong>${t(l.name)}</strong>` +
        `<span class="line__detail">${detail}${l.note ? ' · ' + l.note : ''}</span>` +
        `<span class="line__row"><span class="line__qty">` +
        `<button type="button" data-dec>${ICON.minus}</button><span>${l.qty}</span>` +
        `<button type="button" data-inc>${ICON.plus}</button></span>` +
        `<span class="line__total">${money(l.unit * l.qty)}</span></span></span>`);
      $('[data-dec]', li).onclick = () => bump(l.key, -1);
      $('[data-inc]', li).onclick = () => bump(l.key, 1);
      list.appendChild(li);
    });
    renderTotals($('#totals-cart'));
    renderTotals($('#totals-checkout'));
    renderCartBar();
  }

  function bump(key, delta) {
    const line = state.cart.find((l) => l.key === key);
    if (!line) return;
    line.qty += delta;
    if (line.qty <= 0) state.cart = state.cart.filter((l) => l.key !== key);
    renderCart();
    if (state.screen === 'drinks') renderDrinks();
  }

  function renderCartBar() {
    const bar = $('#cartbar');
    const count = state.cart.reduce((a, l) => a + l.qty, 0);
    bar.hidden = !(state.screen === 'home' && count > 0);
    $('#cartbar-count').textContent = count;
    $('#cartbar-total').textContent = money(subtotal());
  }

  /* ---------- checkout ---------- */
  function renderPayments() {
    const wrap = $('#payments');
    const cardDetails = $('#card-details');
    wrap.innerHTML = '';
    [
      { id: 'card', name: T.payCard, sub: T.payCardSub, icon: ICON.card },
      { id: 'cash', name: T.payCash, sub: T.payCashSub, icon: ICON.cash },
    ].forEach((p) => {
      const n = el('button', 'option',
        `<span class="option__radio"></span>` +
        `<span class="option__text"><strong>${t(p.name)}</strong><small>${t(p.sub)}</small></span>` +
        p.icon);
      n.type = 'button';
      n.setAttribute('aria-checked', String(state.pay === p.id));
      n.onclick = () => { state.pay = p.id; renderPayments(); renderPlace(); };
      wrap.appendChild(n);
    });
    cardDetails.hidden = state.pay !== 'card';
  }

  function renderPlace() {
    const b = $('#place');
    const customerName = $('#customer-name').value.trim();
    const customerPhone = $('#customer-phone').value.trim();
    const cardName = $('#card-name').value.trim();
    const cardNumber = $('#card-number').value.trim();
    const cardExpiry = $('#card-expiry').value.trim();
    const cardCvv = $('#card-cvv').value.trim();
    const cardReady = !!cardName && !!cardNumber && !!cardExpiry && !!cardCvv;
    const ready = !!customerName && !!customerPhone && state.pay && (state.pay === 'cash' || cardReady);

    b.disabled = !ready;
    b.textContent = state.pay ? t(T.place) : t(T.placeNeedsPay);
  }

  function renderWaze() {
    const b = $('#waze');
    b.setAttribute('aria-pressed', String(state.wazeSent));
    $('#waze-title').textContent = state.wazeSent ? t(T.wazeSent) : t(T.wazeIdle);
    $('#waze-sub').textContent = state.wazeSent ? state.coords || '' : t(T.wazeIdleSub);
  }

  /* Real geolocation → a Waze deep link the restaurant can open.
     Hook this up to your backend / WhatsApp send. */
  function sendLocation() {
    if (!navigator.geolocation) { $('#waze-sub').textContent = t(T.wazeDenied); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(5);
        const lon = pos.coords.longitude.toFixed(5);
        state.wazeSent = true;
        state.coords = lat + ', ' + lon;
        state.wazeLink = 'https://waze.com/ul?ll=' + lat + ',' + lon + '&navigate=yes';
        renderWaze();
      },
      () => { $('#waze-sub').textContent = t(T.wazeDenied); },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  /* ---------- confirmation ---------- */
  function placeOrder() {
    if (!state.pay) return;
    /* TODO: POST the order to the restaurant here.
       Payload: state.cart, address, state.wazeLink, state.pay, total() */
    $('#receipt').innerHTML =
      `<div><dt>${t(T.orderNo)}</dt><dd>#${state.orderNo}</dd></div>` +
      `<div><dt>${t(T.payQ)}</dt><dd>${t(state.pay === 'cash' ? T.payCash : T.payCard)}</dd></div>` +
      `<div><dt>${t(T.total)}</dt><dd>${money(total())}</dd></div>` +
      (state.wazeSent ? `<div class="note-row">${ICON.pin}<span>${t(T.wazeSentNote)}</span></div>` : '');
    show('done');
  }

  function reset() {
    state.cart = []; state.pay = null; state.wazeSent = false;
    state.coords = null; state.wazeLink = null; state.orderNo += 1;
    $('#address').value = '';
    $('#customer-name').value = '';
    $('#customer-phone').value = '';
    $('#card-name').value = '';
    $('#card-number').value = '';
    $('#card-expiry').value = '';
    $('#card-cvv').value = '';
    renderCart(); renderPayments(); renderPlace(); renderWaze();
    show('home');
  }

  /* ---------- wiring ---------- */
  document.querySelectorAll('.lang button').forEach((b) => {
    b.onclick = () => {
      state.lang = b.dataset.lang;
      applyLang(); renderCats(); renderMenu(); renderStatic();
      renderItem(); renderSides(); renderDrinks(); renderCart();
      renderPayments(); renderPlace(); renderWaze();
    };
  });
  document.querySelectorAll('[data-go]').forEach((b) => {
    b.onclick = () => {
      const to = b.dataset.go;
      if (to === 'drinks') renderDrinks();
      if (to === 'cart') renderCart();
      show(to);
    };
  });
  $('#cta-menu').onclick = () => $('#cats').scrollIntoView({ behavior: 'smooth', block: 'start' });
  $('#qty-minus').onclick = () => { state.qty = Math.max(1, state.qty - 1); renderItem(); };
  $('#qty-plus').onclick = () => { state.qty += 1; renderItem(); };
  $('#to-sides').onclick = () => { renderSides(); show('sides'); };
  $('#skip-sides').onclick = () => commitItem(false);
  $('#confirm-sides').onclick = () => commitItem(true);
  $('#customer-name').oninput = renderPlace;
  $('#customer-phone').oninput = renderPlace;
  $('#card-name').oninput = renderPlace;
  $('#card-number').oninput = renderPlace;
  $('#card-expiry').oninput = renderPlace;
  $('#card-cvv').oninput = renderPlace;
  $('#waze').onclick = sendLocation;
  $('#place').onclick = placeOrder;
  $('#reset').onclick = reset;

  /* ---------- boot ---------- */
  applyLang();
  renderCats(); renderMenu(); renderStatic();
  renderSides(); renderDrinks(); renderCart();
  renderPayments(); renderPlace(); renderWaze();
  show('home');
})();
