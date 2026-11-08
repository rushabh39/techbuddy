/**
 * TechBuddy - Interactive Scripts
 * Handles VPN speed simulation, US/UK region switching, Quiz recommender,
 * Reading progress bar, category filters, and interactive feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  initReadingProgressBar();
  initSpeedTestSimulator();
  initRegionCurrencySwitcher();
  initBlogFilter();
  initVpnQuiz();
  initCommentsSystem();
  initMobileMenu();
  initShareButtons();
});

/* Reading Progress Indicator */
function initReadingProgressBar() {
  const progressBar = document.getElementById('readingProgress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

/* VPN Speed Test Simulation */
function initSpeedTestSimulator() {
  const startBtn = document.getElementById('startSpeedTestBtn');
  const speedVal = document.getElementById('speedValue');
  const pingVal = document.getElementById('pingValue');
  const serverVal = document.getElementById('serverValue');
  const progressBar = document.getElementById('speedProgressBar');

  if (!startBtn) return;

  startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    startBtn.innerText = 'Testing Encrypted WireGuard Tunnel...';
    
    let progress = 0;
    const servers = ['London (UK-10G)', 'New York (US-East)', 'Manchester (UK)', 'Chicago (US-Midwest)', 'Los Angeles (US-West)'];
    const chosenServer = servers[Math.floor(Math.random() * servers.length)];
    if (serverVal) serverVal.innerText = chosenServer;

    const interval = setInterval(() => {
      progress += 5;
      if (progressBar) progressBar.style.width = progress + '%';

      const liveSpeed = Math.floor(Math.random() * 200) + 750;
      const livePing = Math.floor(Math.random() * 8) + 11;
      if (speedVal) speedVal.innerText = `${liveSpeed} Mbps`;
      if (pingVal) pingVal.innerText = `${livePing} ms`;

      if (progress >= 100) {
        clearInterval(interval);
        startBtn.disabled = false;
        startBtn.innerText = 'Retest Connection Speed';
        if (speedVal) speedVal.innerText = '892.4 Mbps';
        if (pingVal) pingVal.innerText = '14 ms';
      }
    }, 80);
  });
}

/* Region & Currency Switcher (US $ vs UK £) */
function initRegionCurrencySwitcher() {
  const switchBtns = document.querySelectorAll('[data-currency-toggle]');
  if (!switchBtns.length) return;

  switchBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetCurr = btn.getAttribute('data-currency-toggle');
      
      // Update price cells
      const priceCells = document.querySelectorAll('[data-price-us]');
      priceCells.forEach(cell => {
        if (targetCurr === 'UK') {
          cell.innerText = cell.getAttribute('data-price-uk');
        } else {
          cell.innerText = cell.getAttribute('data-price-us');
        }
      });

      // Update button visual
      switchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update banner text
      const bannerText = document.getElementById('regionBannerText');
      if (bannerText) {
        if (targetCurr === 'UK') {
          bannerText.innerHTML = '🇬🇧 Viewing TechBuddy UK Edition: Optimized for BBC iPlayer, Sky Go & UK Investigatory Laws.';
        } else {
          bannerText.innerHTML = '🇺🇸 Viewing TechBuddy USA Edition: Optimized for US Netflix, Hulu, NFL & CLOUD Act Security.';
        }
      }
    });
  });
}

/* Blog Category Filtering on Home & Blog Pages */
function initBlogFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      blogCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Interactive VPN Quiz Matcher */
function initVpnQuiz() {
  const quizBtns = document.querySelectorAll('.quiz-opt-btn');
  const resultBox = document.getElementById('quizResultBox');
  const resultTitle = document.getElementById('quizResultTitle');
  const resultDesc = document.getElementById('quizResultDesc');
  const resultLink = document.getElementById('quizResultLink');

  if (!quizBtns.length || !resultBox) return;

  const recommendations = {
    streaming: {
      name: 'ExpressVPN / NordVPN',
      desc: 'Top choice for unblocking US Netflix, BBC iPlayer, ITVX, Hulu, and UK Sky Sports in 4K HDR without buffering. Servers tested with 10Gbps RAM-only routing.',
      link: 'blog-1.html'
    },
    privacy: {
      name: 'Mullvad / NordVPN',
      desc: 'Maximum defense against US CLOUD Act warrantless requests and UK Investigatory Powers Act snooping. Zero logs verified by PricewaterhouseCoopers.',
      link: 'blog-2.html'
    },
    sports: {
      name: 'Surfshark / NordVPN',
      desc: 'Zero-throttle bypass for NFL Sunday Ticket, Premier League 3pm blackout restrictions, and Champions League streams across the Atlantic.',
      link: 'blog-3.html'
    },
    budget: {
      name: 'Surfshark VPN',
      desc: 'Best budget-friendly VPN for UK & US users with unlimited simultaneous connections and plans starting at just $2.19 / £1.89/mo.',
      link: 'compare.html'
    }
  };

  quizBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      quizBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const choice = btn.getAttribute('data-choice');
      const data = recommendations[choice];
      if (data) {
        resultBox.style.display = 'block';
        resultTitle.innerText = `Recommended for You: ${data.name}`;
        resultDesc.innerText = data.desc;
        if (resultLink) resultLink.href = data.link;
      }
    });
  });
}

/* Comments System Simulation */
function initCommentsSystem() {
  const form = document.getElementById('commentForm');
  const commentsList = document.getElementById('commentsList');

  if (!form || !commentsList) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('commentName');
    const textInput = document.getElementById('commentText');
    const regionSelect = document.getElementById('commentRegion');

    if (!nameInput.value || !textInput.value) return;

    const newComment = document.createElement('div');
    newComment.className = 'comment-item';
    newComment.style.animation = 'fadeIn 0.4s ease-in-out';
    newComment.innerHTML = `
      <div class="comment-author">
        <span>${escapeHtml(nameInput.value)}</span>
        <span class="comment-location">📍 ${regionSelect ? regionSelect.value : 'USA'} • Just now</span>
      </div>
      <p style="font-size:0.925rem; color:#334155;">${escapeHtml(textInput.value)}</p>
    `;

    commentsList.prepend(newComment);
    form.reset();

    const toast = document.createElement('div');
    toast.className = 'toast-alert';
    toast.innerText = 'Thanks for your comment! Your review has been published.';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  });
}

/* Share & Bookmark Actions */
function initShareButtons() {
  const shareBtns = document.querySelectorAll('.share-btn');
  shareBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        alert('Article link copied to clipboard!');
      } else {
        alert('Share this article: ' + window.location.href);
      }
    });
  });

  const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
  bookmarkBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('bookmarked');
      if (btn.classList.contains('bookmarked')) {
        btn.innerHTML = '★ Saved';
        btn.style.color = '#E11D48';
      } else {
        btn.innerHTML = '☆ Save';
        btn.style.color = '';
      }
    });
  });
}

/* Mobile Menu */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '72px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = '#FFFFFF';
      navLinks.style.padding = '1.5rem';
      navLinks.style.borderBottom = '1px solid #E2E8F0';
      navLinks.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
    }
  });
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.innerText = string;
  return div.innerHTML;
}
