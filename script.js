/* ============================================================
   DATA — edit these to customize the site content
   ============================================================ */
const CAREER_DATA = [
  { year: 2019, impact: 20, role: "Data Analyst", company: "Retail Analytics Co.", note: "Started in reporting, automated the team's weekly dashboards." },
  { year: 2020, impact: 35, role: "Jr. Data Scientist", company: "Retail Analytics Co.", note: "First production model: a churn predictor that actually shipped." },
  { year: 2021, impact: 52, role: "Data Scientist", company: "Northwind Labs", note: "Owned demand forecasting for 200+ SKUs." },
  { year: 2022, impact: 68, role: "ML Engineer", company: "Northwind Labs", note: "Rebuilt the forecasting stack with proper uncertainty estimates." },
  { year: 2023, impact: 80, role: "Sr. ML Engineer", company: "Fieldnote AI", note: "Led a 3-person team shipping applied NLP tools." },
  { year: 2024, impact: 92, role: "ML Research Engineer", company: "Fieldnote AI", note: "Published on calibration; started mentoring junior researchers." },
  { year: 2025, impact: 97, role: "ML Research Engineer", company: "Fieldnote AI", note: "Currently exploring what's next — open to new opportunities." },
];

const SKILLS_DATA = [
  { group: "Languages", items: [ ["Python", 5], ["SQL", 5], ["R", 3], ["JavaScript", 3] ] },
  { group: "ML / AI", items: [ ["PyTorch", 5], ["scikit-learn", 5], ["Transformers", 4], ["Conformal Prediction", 4], ["XGBoost", 4] ] },
  { group: "Data & Infra", items: [ ["Postgres", 4], ["Airflow", 4], ["Docker", 3], ["AWS", 3], ["Spark", 2] ] },
  { group: "Craft", items: [ ["Technical writing", 4], ["Mentoring", 4], ["Experiment design", 5] ] },
];

/* ============================================================
   MOBILE MENU
   ============================================================ */
const menuToggle = document.querySelector('.menu-toggle');
const cellNav = document.querySelector('.cell-nav');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const open = cellNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open);
  });
  cellNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    cellNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', false);
  }));
}

/* ============================================================
   ABOUT: raw / rendered toggle
   ============================================================ */
const aboutToggle = document.getElementById('aboutToggle');
if (aboutToggle) {
  aboutToggle.addEventListener('click', () => {
    const isRaw = document.body.classList.toggle('raw-mode');
    aboutToggle.setAttribute('aria-pressed', isRaw);
    aboutToggle.querySelector('.toggle-label').textContent = isRaw ? 'show rendered' : 'show raw';
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealTargets = document.querySelectorAll('.cell');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach(el => revealObserver.observe(el));

/* ============================================================
   HERO SCATTER CANVAS
   ============================================================ */
(function scatterHero() {
  const canvas = document.getElementById('scatter');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const heroSection = canvas.closest('.hero-cell');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let points = [];
  let mouse = { x: -9999, y: -9999 };
  let w, h;

  function resize() {
    w = canvas.width = heroSection.offsetWidth * devicePixelRatio;
    h = canvas.height = heroSection.offsetHeight * devicePixelRatio;
    canvas.style.width = heroSection.offsetWidth + 'px';
    canvas.style.height = heroSection.offsetHeight + 'px';
    const count = Math.min(90, Math.floor((heroSection.offsetWidth * heroSection.offsetHeight) / 14000));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      baseX: 0, baseY: 0,
      r: (Math.random() * 1.8 + 1.2) * devicePixelRatio,
    }));
    points.forEach(p => { p.baseX = p.x; p.baseY = p.y; });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255,90,54,0.35)';
    points.forEach(p => {
      const dx = mouse.x - p.x, dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 160 * devicePixelRatio;
      if (dist < radius) {
        const force = (1 - dist / radius) * 22 * devicePixelRatio;
        p.x -= (dx / (dist || 1)) * force * 0.06;
        p.y -= (dy / (dist || 1)) * force * 0.06;
      }
      p.x += (p.baseX - p.x) * 0.02;
      p.y += (p.baseY - p.y) * 0.02;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    if (!prefersReduced) requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) * devicePixelRatio;
    mouse.y = (e.clientY - rect.top) * devicePixelRatio;
  });
  heroSection.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  resize();
  draw();
  if (prefersReduced) draw(); // draw one static frame
})();

/* ============================================================
   CAREER CHART (SVG)
   ============================================================ */
(function careerChart() {
  const svg = document.getElementById('careerChart');
  if (!svg) return;
  const tooltip = document.getElementById('chartTooltip');
  const ns = 'http://www.w3.org/2000/svg';

  const W = 900, H = 420, padL = 50, padR = 30, padT = 20, padB = 50;
  const years = CAREER_DATA.map(d => d.year);
  const minY = years[0], maxY = years[years.length - 1];
  const xScale = (year) => padL + ((year - minY) / (maxY - minY)) * (W - padL - padR);
  const yScale = (impact) => (H - padB) - (impact / 100) * (H - padT - padB);

  // gridlines + y-axis labels
  for (let v = 0; v <= 100; v += 25) {
    const y = yScale(v);
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', padL); line.setAttribute('x2', W - padR);
    line.setAttribute('y1', y); line.setAttribute('y2', y);
    line.setAttribute('class', 'chart-gridline');
    svg.appendChild(line);
  }

  // x-axis year labels
  CAREER_DATA.forEach(d => {
    const t = document.createElementNS(ns, 'text');
    t.setAttribute('x', xScale(d.year));
    t.setAttribute('y', H - padB + 22);
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('class', 'chart-year');
    t.textContent = d.year;
    svg.appendChild(t);
  });

  // area path
  const linePoints = CAREER_DATA.map(d => `${xScale(d.year)},${yScale(d.impact)}`).join(' L ');
  const areaPath = document.createElementNS(ns, 'path');
  areaPath.setAttribute('d', `M ${xScale(minY)},${H - padB} L ${linePoints} L ${xScale(maxY)},${H - padB} Z`);
  areaPath.setAttribute('class', 'chart-area');
  svg.appendChild(areaPath);

  // line path (animated draw-on)
  const linePath = document.createElementNS(ns, 'path');
  linePath.setAttribute('d', `M ${linePoints}`);
  linePath.setAttribute('class', 'chart-line');
  svg.appendChild(linePath);

  const len = linePath.getTotalLength();
  linePath.style.strokeDasharray = len;
  linePath.style.strokeDashoffset = len;

  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        linePath.style.transition = 'stroke-dashoffset 1.4s ease';
        linePath.style.strokeDashoffset = 0;
        chartObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  chartObserver.observe(svg);

  // points + labels + interactivity
  CAREER_DATA.forEach((d, i) => {
    const cx = xScale(d.year), cy = yScale(d.impact);

    const circle = document.createElementNS(ns, 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', 6);
    circle.setAttribute('class', 'chart-point');
    circle.setAttribute('tabindex', '0');
    circle.setAttribute('role', 'button');
    circle.setAttribute('aria-label', `${d.role} at ${d.company}, ${d.year}`);
    svg.appendChild(circle);

    const label = document.createElementNS(ns, 'text');
    label.setAttribute('x', cx);
    label.setAttribute('y', cy - 14);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('class', 'chart-label');
    label.textContent = i === CAREER_DATA.length - 1 ? 'you are here' : d.role.split(' ')[0];
    svg.appendChild(label);

    function showTip(evt) {
      tooltip.innerHTML = `<strong>${d.role}</strong><span>${d.company} · ${d.year}</span>${d.note}`;
      tooltip.classList.add('visible');
      positionTip(evt);
    }
    function positionTip(evt) {
      const wrapRect = svg.parentElement.getBoundingClientRect();
      let clientX, clientY;
      if (evt.touches && evt.touches[0]) { clientX = evt.touches[0].clientX; clientY = evt.touches[0].clientY; }
      else if (evt.clientX !== undefined) { clientX = evt.clientX; clientY = evt.clientY; }
      else {
        const ptRect = circle.getBoundingClientRect();
        clientX = ptRect.left; clientY = ptRect.top;
      }
      let left = clientX - wrapRect.left + 16;
      let top = clientY - wrapRect.top - 10;
      if (left + 260 > wrapRect.width) left = clientX - wrapRect.left - 276;
      tooltip.style.left = left + 'px';
      tooltip.style.top = top + 'px';
    }
    function hideTip() { tooltip.classList.remove('visible'); }

    circle.addEventListener('mouseenter', showTip);
    circle.addEventListener('mousemove', positionTip);
    circle.addEventListener('mouseleave', hideTip);
    circle.addEventListener('focus', showTip);
    circle.addEventListener('blur', hideTip);
    circle.addEventListener('touchstart', (e) => { showTip(e); }, { passive: true });
  });
})();

/* ============================================================
   SKILLS HEATMAP
   ============================================================ */
(function skillsHeatmap() {
  const container = document.getElementById('skillsGroups');
  if (!container) return;

  function colorFor(level) {
    // level 1-5 -> intensity mapped onto ink/coral mix
    const stops = ['#FFFFFF', '#FFE3DA', '#FFC0A8', '#FF8F6B', '#FF5A36', '#D9431F'];
    return stops[level] || stops[3];
  }
  function textColorFor(level) {
    return level >= 4 ? '#FFFFFF' : '#1B1F23';
  }

  SKILLS_DATA.forEach(group => {
    const groupEl = document.createElement('div');
    groupEl.className = 'skill-group';
    const h4 = document.createElement('h4');
    h4.textContent = group.group;
    groupEl.appendChild(h4);

    const tagsEl = document.createElement('div');
    tagsEl.className = 'skill-tags';
    group.items.forEach(([name, level]) => {
      const tag = document.createElement('span');
      tag.className = 'skill-tag';
      tag.textContent = name;
      tag.style.background = colorFor(level);
      tag.style.color = textColorFor(level);
      tag.style.borderColor = level >= 4 ? colorFor(level) : '#1B1F23';
      tag.title = `Confidence: ${level}/5`;
      tagsEl.appendChild(tag);
    });
    groupEl.appendChild(tagsEl);
    container.appendChild(groupEl);
  });
})();

/* ============================================================
   CONTACT FORM (static site — falls back to mailto)
   ============================================================ */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:jordan.lee@example.com?subject=${subject}&body=${body}`;
    formNote.textContent = "Opening your email client…";
  });
}
