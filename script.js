// Personalize this file with your own photos, memories, music, and message.
const birthday = {
  name: 'Eniola',
  date: '2026-10-31T00:00:00',
  greeting: 'To my favorite person, my forever friend, and the one who makes ordinary days feel like a story worth keeping.',
  photos: [
    { src: 'photos/eniola-01-favorite.jpeg', caption: 'A favorite moment', alt: 'Eniola smiling in a peach outfit' },
    { src: 'photos/eniola-02-black-white.jpeg', caption: 'A little movie moment', alt: 'Eniola posing in a black dress' },
    { src: 'photos/eniola-03-selfie.jpeg', caption: 'Just being you', alt: 'A close-up selfie of Eniola' },
    { src: 'photos/eniola-04-pout.jpeg', caption: 'A little kiss for the camera', alt: 'Eniola playfully posing for a photo' },
    { src: 'photos/eniola-05-peace.jpeg', caption: 'Peace and birthday love', alt: 'Eniola making a peace sign' },
    { src: 'photos/eniola-06-smile.jpeg', caption: 'That lovely smile', alt: 'Eniola smiling and posing' },
    { src: 'photos/eniola-07-smile.jpeg', caption: 'A moment worth keeping', alt: 'Eniola smiling for a photo' },
    { src: 'photos/eniola-08-selfie.jpeg', caption: 'A little piece of happy', alt: 'A close-up selfie of Eniola outdoors' },
  ],
  compliments: [
    { title: 'Your laugh', text: 'It is genuinely one of my favorite sounds. Even my bad jokes feel funnier around you.', kind: 'playful' },
    { title: 'Your big heart', text: 'You make people feel seen, safe, and so very loved. That is a rare kind of magic.', kind: 'heartfelt' },
    { title: 'Your courage', text: 'You keep showing up, growing, and becoming more yourself. I hope you know how inspiring that is.', kind: 'encouraging' },
    { title: 'Your energy', text: 'Somehow you can turn a quick catch-up into the highlight of my entire week.', kind: 'playful' },
    { title: 'Your loyalty', text: 'You are the kind of friend people write grateful little notes about. Consider this yours.', kind: 'heartfelt' },
    { title: 'Your sparkle', text: 'You never have to try to be the most memorable person in the room. You just are.', kind: 'sweet' },
    { title: 'Your honesty', text: 'You tell me what I need to hear, with the exact right amount of love and side-eye.', kind: 'playful' },
    { title: 'Your softness', text: 'There is so much strength in the gentleness you give to the people you love.', kind: 'heartfelt' },
    { title: 'Your becoming', text: 'The person you are growing into is someone your younger self would be so proud of.', kind: 'encouraging' },
    { title: 'Simply you', text: 'No list could quite fit it. I am just really, really glad you exist—and that you are my friend.', kind: 'sweet' },
  ],
  memories: [
    { date: 'A FAVORITE PORTRAIT', title: 'A smile to remember', text: 'A lovely moment, captured just as you are.', src: 'photos/eniola-01-favorite.jpeg' },
    { date: 'A LITTLE POSE', title: 'A day worth keeping', text: 'A few pictures, a little sunshine, and a memory to hold on to.', src: 'photos/eniola-05-peace.jpeg' },
    { date: 'STILL WRITING', title: 'And all that is ahead', text: 'Here is to more laughs, long talks, and memories we have not made yet.', src: 'photos/eniola-08-selfie.jpeg' },
  ],
  letter: `Happy birthday to one of the best things life has ever given me: your friendship.

Thank you for being the person I can laugh with until nothing makes sense, the person I can be completely myself around, and the person who makes life feel a little kinder just by being in it. I hope this next year brings you the same warmth, joy, and love you give so freely to everyone around you.

You deserve to feel celebrated—not just today, but every ordinary day in between. I am always in your corner, cheering for you, and very grateful that I get to call you my best friend.

All my love,
Your best friend`,
  musicSrc: 'music/fola-treat-u-right.mp3',
};

const app = document.querySelector('#app');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const state = {
  selectedPhoto: null,
  letterOpen: false,
  wishVisible: false,
  litCandles: [true, true, true],
  musicPlaying: false,
  activeReason: null,
  toastTimer: null,
  entranceTimer: null,
};

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[character]));

const iconPaths = {
  arrowDown: '<path d="M12 5v14m-7-7 7 7 7-7"/>',
  arrowLeft: '<path d="m12 19-7-7 7-7M5 12h14"/>',
  arrowRight: '<path d="M5 12h14m-7-7 7 7-7 7"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
  sparkles: '<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z"/>',
  close: '<path d="m18 6-12 12M6 6l12 12"/>',
};

function icon(name, options = {}) {
  const { size = 16, fill = false, className = '' } = options;
  const fillAttribute = fill ? ' fill="currentColor"' : '';
  return `<svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${fillAttribute}>${iconPaths[name]}</svg>`;
}

function placeholder(label, large = false) {
  return `<div class="photo-placeholder${large ? ' photo-placeholder-large' : ''}">
    <span class="placeholder-flower">✿</span>
    <span class="placeholder-label">${escapeHtml(label)}</span>
    <span class="placeholder-mark">୨୧</span>
  </div>`;
}

function photoContent(photo, fallbackLabel, large = false) {
  return photo.src
    ? `<img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt)}" loading="lazy" />`
    : placeholder(fallbackLabel, large);
}

function heading(eyebrow, title, subtitle, light = false) {
  return `<div class="section-heading reveal${light ? ' section-heading-light' : ''}">
    <span class="eyebrow"><span></span>${escapeHtml(eyebrow)}<span></span></span>
    <h2>${title}</h2>
    ${subtitle ? `<p>${escapeHtml(subtitle)}</p>` : ''}
  </div>`;
}

function birthdayDateParts() {
  return Object.fromEntries(new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  }).formatToParts(new Date(birthday.date)).map(({ type, value }) => [type, value]));
}

const dateParts = birthdayDateParts();

function renderPage() {
  const name = escapeHtml(birthday.name);
  const mainPhoto = birthday.photos[0] || { src: '', caption: '', alt: '' };
  const audio = birthday.musicSrc
    ? `<audio id="background-music" src="${escapeHtml(birthday.musicSrc)}" loop></audio>`
    : '';

  app.innerHTML = `
    <main>
      <div class="entrance" id="entrance">
        <div class="entrance-glow"></div>
        <div class="floating-heart heart-one">${icon('heart', { size: 23 })}</div>
        <div class="floating-heart heart-two">${icon('heart', { size: 19 })}</div>
        <div class="floating-heart heart-three">${icon('sparkles', { size: 21 })}</div>
        <div class="entrance-content">
          <div class="tiny-bow" aria-hidden="true">୨୧</div>
          <span class="eyebrow">A LITTLE SOMETHING, JUST FOR YOU</span>
          <h1>Hey, ${name}<span class="comma">...</span></h1>
          <p>Someone made something special for you.</p>
          <button class="open-gift" data-action="open-gift" aria-label="Open your birthday surprise">
            <span class="gift-icon">${icon('mail', { size: 21 })}</span>
            <span>Open your little surprise</span>
            ${icon('arrowRight', { size: 17 })}
          </button>
          <span class="entrance-note">MADE WITH SO MUCH LOVE ${icon('heart', { size: 11, fill: true })}</span>
        </div>
        <span class="entrance-corner entrance-top">✳</span>
        <span class="entrance-corner entrance-bottom">✳</span>
      </div>
      ${audio}
      <header class="topbar">
        <a class="wordmark" href="#home" aria-label="For ${name}, with love">for ${escapeHtml(birthday.name.toLowerCase())} <span>୨୧</span></a>
        <nav class="desktop-nav" aria-label="Main navigation">
          <a href="#moments">Moments</a><a href="#reasons">Reasons</a><a href="#story">Our story</a><a href="#letter">A little letter</a>
        </nav>
        <button class="music-button" data-action="music" aria-label="Play background music">
          ${icon('music', { size: 15 })}<span>OUR SOUNDTRACK</span>
        </button>
      </header>

      <section class="hero" id="home">
        <div class="hero-orbit orbit-one"></div><div class="hero-orbit orbit-two"></div>
        <div class="hero-stamp"><span>${escapeHtml(dateParts.day)}</span><small>${escapeHtml(dateParts.month)}<br />${escapeHtml(dateParts.year)}</small></div>
        <div class="hero-copy">
          <span class="eyebrow reveal">A DAY ALL ABOUT YOU</span>
          <h1 class="reveal">Happy birthday,<br /><em>${name}.</em></h1>
          <p class="reveal">${escapeHtml(birthday.greeting)}</p>
          <a class="text-link reveal" href="#moments">YOUR LITTLE BIRTHDAY WORLD ${icon('arrowDown', { size: 14 })}</a>
        </div>
        <div class="hero-portrait reveal">
          ${photoContent(mainPhoto, `Your favorite photo of ${birthday.name} goes here`, true)}
          <div class="portrait-caption"><span>A favorite face</span>${icon('heart', { size: 15, fill: true })}</div>
          <div class="portrait-bow" aria-hidden="true">୨୧</div>
        </div>
        <span class="hero-side-note">A FRIENDSHIP WORTH CELEBRATING · WITH LOVE, ALWAYS</span>
      </section>

      <section class="countdown-strip">
        <div class="countdown-label">${icon('sparkles', { size: 16 })}<span id="countdown-label">COUNTING DOWN TO YOUR DAY</span></div>
        <div class="countdown-numbers" aria-live="polite">
          <div class="count-unit"><strong id="count-days">00</strong><span>DAYS</span></div>
          <div class="count-unit"><strong id="count-hours">00</strong><span>HRS</span></div>
          <div class="count-unit"><strong id="count-minutes">00</strong><span>MIN</span></div>
          <div class="count-unit"><strong id="count-seconds">00</strong><span>SEC</span></div>
        </div>
        <span class="countdown-date">${escapeHtml(dateParts.month.toUpperCase())} ${escapeHtml(dateParts.day)} <span>✳</span> YOUR DAY, YOUR WAY</span>
      </section>

      <section class="moments section-pad" id="moments">
        ${heading('THE LITTLE THINGS WE KEEP', 'Beautiful moments.', 'A place for the photos that feel like sunshine.')}
        <div class="photo-grid">
          ${birthday.photos.map((photo, index) => `
            <button class="photo-card photo-card-${index + 1}" data-action="photo" data-index="${index}" aria-label="View photo: ${escapeHtml(photo.caption)}">
              <div class="photo-image">${photoContent(photo, `ADD PHOTO ${String(index + 1).padStart(2, '0')}`)}</div>
              <span class="photo-caption">${escapeHtml(photo.caption)}</span>
              <span class="photo-index">0${index + 1} <span>✳</span></span>
            </button>`).join('')}
        </div>
      </section>

      <section class="reasons section-pad" id="reasons">
        <div class="reason-decor decor-left">✳</div><div class="reason-decor decor-right">୨୧</div>
        ${heading('A VERY SHORT LIST (OF MANY)', "10 reasons you're special.", 'Tap a card to reveal a little reminder of what makes you wonderful.', true)}
        <div class="reason-grid">
          ${birthday.compliments.map((reason, index) => `
            <button class="reason-card" data-action="reason" data-index="${index}" aria-expanded="false">
              <span class="reason-number">${String(index + 1).padStart(2, '0')}</span>
              <span class="reason-heart">${icon('heart', { size: 16 })}</span>
              <strong>${escapeHtml(reason.title)}</strong>
              <span class="reason-text" hidden>${escapeHtml(reason.text)}</span>
              <span class="reason-kind">${escapeHtml(reason.kind)} · TAP TO READ</span>
            </button>`).join('')}
        </div>
      </section>

      <section class="story section-pad" id="story">
        ${heading('CHAPTERS, STILL BEING WRITTEN', 'Our friendship story.', 'A few little markers for the moments and memories worth keeping close.')}
        <div class="timeline">
          ${birthday.memories.map((memory, index) => `
            <article class="timeline-item${index % 2 ? ' timeline-right' : ''} reveal">
              <div class="timeline-dot">${icon('heart', { size: 13, fill: true })}</div>
              <div class="memory-card">
                <span class="memory-date">${escapeHtml(memory.date)}</span>
                <h3>${escapeHtml(memory.title)}</h3>
                <p>${escapeHtml(memory.text)}</p>
                ${memory.src
                  ? `<img class="memory-image" src="${escapeHtml(memory.src)}" alt="Memory: ${escapeHtml(memory.title)}" loading="lazy" />`
                  : `<div class="memory-placeholder">${icon('sparkles', { size: 17 })}<span>ADD A PHOTO OR KEEP THIS ONE JUST WORDS</span></div>`}
              </div>
            </article>`).join('')}
        </div>
      </section>

      <section class="cake-section section-pad">
        <div class="cake-copy">
          <span class="eyebrow">MAKE A WISH, BIRTHDAY STAR</span>
          <h2>One little cake.<br /><em>One very big wish.</em></h2>
          <p>Take a breath, think of something wonderful, and tap to blow out the candles.</p>
          <button class="pill-button" data-action="blow-candles">BLOW OUT THE CANDLES ${icon('arrowRight', { size: 15 })}</button>
          <p class="wish-message" id="wish-message" hidden>${icon('sparkles', { size: 15 })} May this year bring you everything your heart is hoping for.</p>
        </div>
        <div class="cake-art" id="cake-art" aria-label="3 of 3 birthday candles lit">
          <span class="cake-sparkle sparkle-a">✧</span><span class="cake-sparkle sparkle-b">✳</span>
          <div class="candles">
            ${state.litCandles.map((lit, index) => candleMarkup(lit, index)).join('')}
          </div>
          <div class="cake-top"><span class="icing-drip"></span></div>
          <div class="cake-layer cake-layer-top"><span>made with love</span></div>
          <div class="cake-layer cake-layer-bottom"></div>
          <div class="cake-plate"></div>
          <span class="cake-note">♡ baked with affection ♡</span>
        </div>
      </section>

      <section class="letter-section section-pad" id="letter">
        <div class="letter-ornament">✳</div>
        ${heading('SOMETHING TO KEEP', 'A little letter for you.', 'Some things are easier to say when they are written down.')}
        <button class="letter-envelope" data-action="letter" aria-expanded="false">
          <span class="envelope-flap"></span>
          <span class="envelope-seal">${icon('heart', { size: 20, fill: true })}</span>
          <span class="envelope-label">OPEN WHEN YOU NEED A REMINDER</span>
          <span class="envelope-hint">tap to open your letter</span>
        </button>
      </section>

      <section class="finale">
        <div class="finale-stars">✧ <span>✳</span> ✧</div>
        <span class="eyebrow">AND BEFORE YOU GO...</span>
        <h2>The world is sweeter<br />with <em>you</em> in it.</h2>
        <p>Happy birthday, ${name}. I love you bigger than this little website can say.</p>
        <button class="final-button" data-action="send-love">${icon('heart', { size: 16, fill: true })} SEND A LITTLE MORE LOVE</button>
        <span class="final-signoff">MADE FOR ${escapeHtml(birthday.name.toUpperCase())} · WITH ALL MY HEART <span>୨୧</span></span>
      </section>

      <footer class="footer"><a href="#home">back to the top ${icon('chevronDown', { size: 13 })}</a><span>© ${escapeHtml(birthday.name.toUpperCase())}’S BIRTHDAY, FOREVER IN OUR HEARTS · MADE BY DAMI/DEEBOY</span><span>✳</span></footer>
    </main>`;
}

function candleMarkup(lit, index) {
  return `<button class="candle${lit ? ' candle-lit' : ''}" data-action="candle" data-index="${index}" aria-label="${lit ? 'Blow out' : 'Light'} candle ${index + 1}">
    ${lit ? '<span class="flame"></span>' : ''}<span class="wick${lit ? '' : ' wick-out'}"></span>
  </button>`;
}

function updateCountdown() {
  const remaining = new Date(birthday.date).getTime() - Date.now();
  const passed = remaining <= 0;
  const values = passed
    ? [0, 0, 0, 0]
    : [
      Math.floor(remaining / 86400000),
      Math.floor((remaining / 3600000) % 24),
      Math.floor((remaining / 60000) % 60),
      Math.floor((remaining / 1000) % 60),
    ];
  ['days', 'hours', 'minutes', 'seconds'].forEach((unit, index) => {
    document.querySelector(`#count-${unit}`).textContent = String(values[index]).padStart(2, '0');
  });
  document.querySelector('#countdown-label').textContent = passed
    ? 'TODAY, WE CELEBRATE YOU'
    : 'COUNTING DOWN TO YOUR DAY';
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    document.querySelector('main').append(toast);
  }
  toast.innerHTML = `${icon('check', { size: 15 })}<span>${escapeHtml(message)}</span>`;
  clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => toast.remove(), 3200);
}

function celebrate() {
  if (reducedMotion) return;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return;
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: '0',
    width: '100%',
    height: '100%',
    zIndex: '50',
    pointerEvents: 'none',
  });
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  context.scale(window.devicePixelRatio, window.devicePixelRatio);
  document.body.append(canvas);

  const colors = ['#e7a5b1', '#f4c9cf', '#d2ad75', '#fff8f1', '#c98292'];
  const particles = Array.from({ length: 130 }, () => ({
    x: window.innerWidth * (0.25 + Math.random() * 0.5),
    y: window.innerHeight * 0.64,
    vx: (Math.random() - 0.5) * 9,
    vy: -Math.random() * 9 - 3,
    size: Math.random() * 5 + 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.2,
    life: 100,
  }));
  let frame = 0;

  function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.13;
      particle.rotation += particle.spin;
      particle.life -= 1;
      context.save();
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.globalAlpha = Math.max(0, particle.life / 100);
      context.fillStyle = particle.color;
      context.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 0.7);
      context.restore();
    });
    frame += 1;
    if (frame < 110) window.requestAnimationFrame(draw);
    else canvas.remove();
  }
  window.requestAnimationFrame(draw);
}

function updateCandle(index) {
  state.litCandles[index] = !state.litCandles[index];
  const button = document.querySelector(`.candle[data-index="${index}"]`);
  button.outerHTML = candleMarkup(state.litCandles[index], index);
  updateCakeStatus();
}

function updateCakeStatus() {
  const litCount = state.litCandles.filter(Boolean).length;
  document.querySelector('#cake-art').setAttribute('aria-label', `${litCount} of 3 birthday candles lit`);
  const allOut = litCount === 0;
  const button = document.querySelector('[data-action="blow-candles"]');
  button.innerHTML = `${allOut ? 'LIGHT THE CANDLES AGAIN' : 'BLOW OUT THE CANDLES'} ${icon('arrowRight', { size: 15 })}`;
}

function toggleLetter() {
  state.letterOpen = !state.letterOpen;
  const button = document.querySelector('[data-action="letter"]');
  button.classList.toggle('envelope-open', state.letterOpen);
  button.setAttribute('aria-expanded', String(state.letterOpen));
  button.querySelector('.envelope-label').textContent = state.letterOpen
    ? 'WITH ALL MY LOVE'
    : 'OPEN WHEN YOU NEED A REMINDER';
  button.querySelector('.envelope-hint').textContent = state.letterOpen
    ? 'tap to fold it back up'
    : 'tap to open your letter';

  const existingLetter = document.querySelector('.letter-paper');
  if (state.letterOpen && !existingLetter) {
    const paper = document.createElement('article');
    paper.className = 'letter-paper';
    paper.innerHTML = `<div class="letter-inner">
      <span class="letter-date">${escapeHtml(dateParts.month)} ${escapeHtml(dateParts.day)}, ${escapeHtml(dateParts.year)}</span>
      <p class="letter-script">My dearest ${escapeHtml(birthday.name)},</p>
      <p class="letter-body">${escapeHtml(birthday.letter)}</p>
      <span class="letter-heart">with love, always ${icon('heart', { size: 14, fill: true })}</span>
    </div>`;
    button.after(paper);
  } else if (!state.letterOpen && existingLetter) {
    existingLetter.remove();
  }
}

function showPhoto(index) {
  const photo = birthday.photos[index];
  if (!photo) return;
  state.selectedPhoto = photo;
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Photo preview');
  lightbox.innerHTML = `
    <button class="lightbox-close" data-action="close-photo" aria-label="Close photo preview">${icon('close', { size: 22 })}</button>
    <div class="lightbox-card">
      ${photoContent(photo, 'YOUR PHOTO WILL APPEAR HERE', true)}
      <span>${escapeHtml(photo.caption)} ${icon('heart', { size: 14, fill: true })}</span>
    </div>
    <span class="lightbox-help">${icon('arrowLeft', { size: 13 })} CLICK OUTSIDE TO CLOSE ${icon('arrowRight', { size: 13 })}</span>`;
  document.querySelector('main').append(lightbox);
  document.body.style.overflow = 'hidden';
  lightbox.querySelector('.lightbox-close').focus();
}

function closePhoto() {
  document.querySelector('.lightbox')?.remove();
  document.body.style.overflow = '';
  state.selectedPhoto = null;
}

function toggleMusic() {
  const audio = document.querySelector('#background-music');
  if (!audio) {
    showToast('Add your song in script.js to make this button sing.');
    return;
  }
  if (state.musicPlaying) {
    audio.pause();
    state.musicPlaying = false;
  } else {
    audio.play().then(() => {
      state.musicPlaying = true;
      updateMusicButton();
    }).catch(() => {
      showToast('The music could not be played. Check the audio file in script.js.');
    });
  }
  updateMusicButton();
}

function updateMusicButton() {
  const button = document.querySelector('[data-action="music"]');
  button.classList.toggle('is-playing', state.musicPlaying);
  button.setAttribute('aria-label', state.musicPlaying ? 'Pause background music' : 'Play background music');
  button.innerHTML = `${icon(state.musicPlaying ? 'pause' : 'music', { size: 15 })}<span>${state.musicPlaying ? 'PAUSE MUSIC' : 'OUR SOUNDTRACK'}</span>${state.musicPlaying ? '<span class="sound-bars"><i></i><i></i><i></i></span>' : ''}`;
}

function openEntrance() {
  const entrance = document.querySelector('#entrance');
  entrance.classList.add('is-leaving');
  state.entranceTimer = window.setTimeout(() => entrance.remove(), 850);
}

app.addEventListener('click', (event) => {
  const actionElement = event.target.closest('[data-action]');
  if (actionElement) {
    const index = Number(actionElement.dataset.index);
    switch (actionElement.dataset.action) {
      case 'open-gift':
        openEntrance();
        break;
      case 'music':
        toggleMusic();
        break;
      case 'photo':
        showPhoto(index);
        break;
      case 'reason': {
        const isActive = state.activeReason === index;
        if (state.activeReason !== null) {
          const previous = document.querySelector(`.reason-card[data-index="${state.activeReason}"]`);
          if (previous) {
            previous.classList.remove('reason-active');
            previous.setAttribute('aria-expanded', 'false');
            previous.querySelector('.reason-text').hidden = true;
            previous.querySelector('.reason-kind').textContent = `${birthday.compliments[state.activeReason].kind} · TAP TO READ`;
          }
        }
        state.activeReason = isActive ? null : index;
        if (!isActive) {
          actionElement.classList.add('reason-active');
          actionElement.setAttribute('aria-expanded', 'true');
          actionElement.querySelector('.reason-text').hidden = false;
          actionElement.querySelector('.reason-kind').textContent = `${birthday.compliments[index].kind} · TAP TO CLOSE`;
        }
        break;
      }
      case 'candle':
        updateCandle(index);
        break;
      case 'blow-candles':
        if (state.litCandles.every((lit) => !lit)) {
          state.litCandles = [true, true, true];
          document.querySelector('.candles').innerHTML = state.litCandles.map((lit, candleIndex) => candleMarkup(lit, candleIndex)).join('');
          document.querySelector('#wish-message').hidden = true;
        } else {
          state.litCandles = [false, false, false];
          document.querySelector('.candles').innerHTML = state.litCandles.map((lit, candleIndex) => candleMarkup(lit, candleIndex)).join('');
          document.querySelector('#wish-message').hidden = false;
          celebrate();
        }
        updateCakeStatus();
        break;
      case 'letter':
        toggleLetter();
        break;
      case 'send-love':
        celebrate();
        showToast('A little extra birthday love, just for you.');
        break;
      case 'close-photo':
        closePhoto();
        break;
      default:
        break;
    }
    return;
  }
  if (event.target.classList.contains('lightbox')) closePhoto();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && state.selectedPhoto) closePhoto();
});

const audioElement = document.querySelector('#background-music');
if (audioElement) {
  audioElement.addEventListener('pause', () => {
    state.musicPlaying = false;
    updateMusicButton();
  });
  audioElement.addEventListener('play', () => {
    state.musicPlaying = true;
    updateMusicButton();
  });
}

renderPage();
updateCountdown();
window.setInterval(updateCountdown, 1000);

if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}
