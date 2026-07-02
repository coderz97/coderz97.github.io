/* ============================================================
   DATA — edit this array to update skills without touching HTML
   ============================================================ */
const SKILLS_DATA = [
  { group: "Languages", items: ["Python", "SQL", "R", "C#", "Java"] },
  { group: "Libraries", items: ["Pandas", "NumPy", "SciPy", "Scikit-Learn", "TensorFlow", "PyTorch", "Keras", "Matplotlib", "Seaborn"] },
  { group: "Tools", items: ["Excel", "Power BI", "Tableau", "Hadoop", "Databricks", "Monday.com", "ServiceNow", "MATLAB"] },
  { group: "ML Algorithms", items: ["Linear & Logistic Regression", "K-NN", "Random Forest", "XGBoost", "SVM", "MLP", "CNN", "LSTM", "PCA", "K-Means Clustering"] },
];

/* ============================================================
   MOBILE MENU
   ============================================================ */
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open);
  });
  siteNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', false);
  }));
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealTargets = document.querySelectorAll('.section');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealTargets.forEach(el => revealObserver.observe(el));

/* ============================================================
   SKILLS TAGS
   ============================================================ */
(function renderSkills() {
  const container = document.getElementById('skillsGroups');
  if (!container) return;

  SKILLS_DATA.forEach(group => {
    const groupEl = document.createElement('div');
    groupEl.className = 'skill-group';
    const h4 = document.createElement('h4');
    h4.textContent = group.group;
    groupEl.appendChild(h4);

    const tagsEl = document.createElement('div');
    tagsEl.className = 'skill-tags';
    group.items.forEach(name => {
      const tag = document.createElement('span');
      tag.className = 'skill-tag';
      tag.textContent = name;
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
    window.location.href = `mailto:sreyatobji97@gmail.com?subject=${subject}&body=${body}`;
    formNote.textContent = "Opening your email client…";
  });
}
