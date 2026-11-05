/* ============================================================
   MIXUE — Ice Cream & Tea
   Vanilla JavaScript: menu, filters, cart, navigation, forms
   ============================================================ */

'use strict';

/* ---------- Product catalog ---------- */
const PRODUCTS = [
  // Ice Cream
  { id: 1,  cat: 'icecream', name: 'Vanilla Bliss Cone',   desc: 'Classic vanilla bean soft serve in a crispy cone.',      price: 2.90, img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80', tag: 'bestseller' },
  { id: 2,  cat: 'icecream', name: 'Strawberry Cloud',      desc: 'Creamy strawberry ice cream topped with fresh berries.',  price: 3.20, img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80', tag: '' },
  { id: 3,  cat: 'icecream', name: 'Choco Fudge Dream',     desc: 'Rich chocolate fudge ice cream with fudge drizzle.',     price: 3.40, img: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=800&q=80', tag: 'new' },
  { id: 4,  cat: 'icecream', name: 'Mango Sunshine Scoop',  desc: 'Tropical mango ice cream — sunshine in every bite.',      price: 3.30, img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80', tag: '' },

  // Milk Tea
  { id: 5,  cat: 'milktea', name: 'Classic Pearl Milk Tea',desc: 'Slow-brewed black tea, fresh milk and chewy pearls.',     price: 3.50, img: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=80', tag: 'bestseller' },
  { id: 6,  cat: 'milktea', name: 'Brown Sugar Boba',       desc: 'Caramelized brown sugar boba with thick milk.',          price: 4.20, img: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=800&q=80', tag: 'new' },
  { id: 7,  cat: 'milktea', name: 'Taro Milk Tea',          desc: 'Creamy taro with a hint of vanilla sweetness.',          price: 4.50, img: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=800&q=80', tag: '' },
  { id: 8,  cat: 'milktea', name: 'Matcha Cloud Latte',     desc: 'Ceremonial-grade matcha whisked with silky milk.',       price: 4.80, img: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80', tag: '' },

  // Fresh Tea
  { id: 9,  cat: 'freshtea', name: 'Lemon Green Tea',       desc: 'Refreshing green tea with fresh lemon slices.',          price: 3.00, img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80', tag: '' },
  { id: 10, cat: 'freshtea', name: 'Peach Oolong',          desc: 'Floral oolong infused with ripe peach.',                price: 3.40, img: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80', tag: '' },
  { id: 11, cat: 'freshtea', name: 'Jasmine Green Tea',     desc: 'Light jasmine green tea, naturally fragrant.',           price: 3.00, img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80', tag: 'bestseller' },
  { id: 12, cat: 'freshtea', name: 'Iced Black Tea',        desc: 'Bold black tea over ice with a touch of honey.',         price: 2.80, img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80', tag: '' },

  // Fruit Drinks
  { id: 13, cat: 'fruit', name: 'Mango Slush',             desc: 'Chilled mango slush blended to perfection.',             price: 3.80, img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80', tag: '' },
  { id: 14, cat: 'fruit', name: 'Strawberry Smoothie',      desc: 'Fresh strawberries blended with yogurt & honey.',        price: 4.20, img: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80', tag: 'new' },
  { id: 15, cat: 'fruit', name: 'Berry Cooler',            desc: 'Mixed berries, soda water and a splash of lime.',        price: 3.90, img: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80', tag: '' },
  { id: 16, cat: 'fruit', name: 'Watermelon Mint Cooler',  desc: 'Juicy watermelon with refreshing mint.',                price: 3.60, img: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=800&q=80', tag: '' },
];

const CURRENCY = '$';
const fmt = n => `${CURRENCY}${n.toFixed(2)}`;

/* ---------- DOM refs ---------- */
const menuGrid = document.getElementById('menuGrid');
const menuTabs = document.getElementById('menuTabs');
const cartBtn = document.getElementById('cartBtn');
const cartBadge = document.getElementById('cartBadge');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartBody = document.getElementById('cartBody');
const cartFooter = document.getElementById('cartFooter');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const header = document.getElementById('header');
const toTop = document.getElementById('toTop');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const newsletterForm = document.getElementById('newsletterForm');

/* ---------- Cart state ---------- */
let cart = JSON.parse(localStorage.getItem('mixue_cart') || '{}');

const saveCart = () => localStorage.setItem('mixue_cart', JSON.stringify(cart));
const cartQty = () => Object.values(cart).reduce((sum, q) => sum + q, 0);
const cartSum = () =>
  Object.entries(cart).reduce((sum, [id, q]) => {
    const p = PRODUCTS.find(p => p.id === Number(id));
    return p ? sum + p.price * q : sum;
  }, 0);

/* ---------- Menu rendering ---------- */
function renderMenu(cat = 'all') {
  const items = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  menuGrid.innerHTML = items.map((p, i) => `
    <article class="product-card" style="animation-delay:${i * 40}ms">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        ${p.tag ? `<span class="product-tag ${p.tag}">${p.tag === 'bestseller' ? 'Bestseller' : 'New'}</span>` : ''}
      </div>
      <div class="product-body">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-foot">
          <span class="product-price">${fmt(p.price)}</span>
          <button class="add-btn" data-id="${p.id}" aria-label="Add ${p.name} to cart">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

/* ---------- Menu tabs ---------- */
menuTabs.addEventListener('click', e => {
  const tab = e.target.closest('.tab');
  if (!tab) return;
  menuTabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  renderMenu(tab.dataset.cat);
});

/* ---------- Add to cart (event delegation) ---------- */
menuGrid.addEventListener('click', e => {
  const btn = e.target.closest('.add-btn');
  if (!btn) return;
  addToCart(Number(btn.dataset.id), btn);
});

function addToCart(id, btn) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  updateBadge();
  renderCart();

  if (btn) {
    const original = btn.innerHTML;
    btn.classList.add('added');
    btn.innerHTML = '✓ Added';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = original;
    }, 900);
  }

  // little badge pop animation
  cartBadge.classList.remove('pop');
  void cartBadge.offsetWidth;
  cartBadge.classList.add('pop');
}

/* ---------- Cart drawer ---------- */
function openCart() {
  renderCart();
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  cartDrawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCart();
});

function updateBadge() {
  const n = cartQty();
  cartBadge.textContent = n;
  cartBadge.style.display = n ? 'grid' : 'none';
}

function renderCart() {
  const entries = Object.entries(cart).filter(([, q]) => q > 0);
  const n = entries.reduce((s, [, q]) => s + q, 0);

  cartCount.textContent = `(${n})`;
  updateBadge();

  if (!entries.length) {
    cartBody.innerHTML = `
      <div class="cart-empty">
        <span class="emoji">🛒</span>
        <p>Your cart is empty.<br/>Add something delicious!</p>
      </div>`;
    cartFooter.style.display = 'none';
    return;
  }

  cartFooter.style.display = 'block';
  cartBody.innerHTML = entries.map(([id, qty]) => {
    const p = PRODUCTS.find(x => x.id === Number(id));
    if (!p) return '';
    return `
      <div class="cart-item" data-id="${p.id}">
        <img class="cart-item-img" src="${p.img}" alt="${p.name}" loading="lazy" />
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">${fmt(p.price)}</div>
          <div class="cart-item-controls">
            <button class="qty-btn" data-action="dec" aria-label="Decrease quantity">−</button>
            <span class="cart-item-qty">${qty}</span>
            <button class="qty-btn" data-action="inc" aria-label="Increase quantity">+</button>
            <button class="cart-item-remove" data-action="remove">Remove</button>
          </div>
        </div>
      </div>`;
  }).join('');

  cartTotal.textContent = fmt(cartSum());
}

/* Cart quantity / remove (event delegation) */
cartBody.addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const item = btn.closest('.cart-item');
  const id = Number(item.dataset.id);
  const action = btn.dataset.action;

  if (action === 'inc') cart[id] = (cart[id] || 0) + 1;
  else if (action === 'dec') {
    cart[id] = (cart[id] || 0) - 1;
    if (cart[id] <= 0) delete cart[id];
  } else if (action === 'remove') {
    delete cart[id];
  }

  saveCart();
  renderCart();
});

checkoutBtn.addEventListener('click', () => {
  if (!cartQty()) return;
  alert(`Thank you for your order! 🎉\n\n${cartQty()} item(s) — Total: ${fmt(cartSum())}\n\n(This is a demo checkout.)`);
  cart = {};
  saveCart();
  renderCart();
});

/* ---------- Mobile nav ---------- */
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
});

navLinks.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

/* ---------- Header shadow & back-to-top ---------- */
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  toTop.classList.toggle('show', window.scrollY > 500);
}, { passive: true });

toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- Scroll reveal ---------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Active nav link on scroll ---------- */
const sections = document.querySelectorAll('main section[id]');
const navAnchors = navLinks.querySelectorAll('a');

window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

/* ---------- Contact form ---------- */
contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('fullName');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  let valid = true;

  [name, email, message].forEach(field => field.classList.remove('error'));

  if (!name.value.trim()) { name.classList.add('error'); valid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    email.classList.add('error'); valid = false;
  }
  if (!message.value.trim()) { message.classList.add('error'); valid = false; }

  if (!valid) {
    formStatus.textContent = 'Please fill in all fields correctly.';
    formStatus.className = 'form-status error';
    return;
  }

  formStatus.textContent = `Thanks ${name.value.trim()}! Your message has been sent. We'll reply soon. 💌`;
  formStatus.className = 'form-status success';
  contactForm.reset();
});

/* ---------- Newsletter ---------- */
newsletterForm.addEventListener('submit', e => {
  e.preventDefault();
  const input = newsletterForm.querySelector('input');
  if (!input.value.trim()) return;
  alert(`Welcome to the MIXUE family! 🎉\nDeals and new flavors will be sent to ${input.value}.`);
  newsletterForm.reset();
});

/* ---------- Init ---------- */
renderMenu();
renderCart();
updateBadge();
