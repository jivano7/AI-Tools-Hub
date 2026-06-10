// ===== GLOBAL VARIABLES =====
let allTools = [];
let filteredTools = [];
let currentPage = 1;
const toolsPerPage = 8;
let activeCategory = 'all';
let activePricing = 'all';
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

async function loadTools() {
  try {
    const response = await fetch('data/tools.json');
    allTools = await response.json();
    filteredTools = [...allTools];
    renderTools();
    updateCount();
    initSearch();
  } catch (error) {
    console.error('Tools load nahi hue:', error);
  }
}

function renderTools(reset = false) {
  if (reset) currentPage = 1;
  const grid = document.getElementById('toolsGrid');
  if (!grid) return;
  const end = currentPage * toolsPerPage;
  const toolsToShow = filteredTools.slice(0, end);
  grid.innerHTML = '';
  if (toolsToShow.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:#9ca3af;">
      <i class="fas fa-search" style="font-size:48px;margin-bottom:16px;display:block;"></i>
      <h3>Koi tool nahi mila</h3><p>Dusra search ya filter try karo</p></div>`;
    return;
  }
  toolsToShow.forEach(tool => { grid.innerHTML += createCard(tool); });
  const lm = document.querySelector('.load-more-wrapper');
  if (lm) lm.style.display = end >= filteredTools.length ? 'none' : 'block';
}

function createCard(tool) {
  const isFav = favorites.includes(tool.id);
  const badgeClass = getBadgeClass(tool.category);
  return `<div class="tool-card" id="card-${tool.id}">
    <div class="card-top">
      <div class="tool-logo" style="background:${tool.color}">
        ${tool.logo ? `<img src="${tool.logo}" alt="${tool.name}" style="width:100%;height:100%;object-fit:contain;border-radius:10px;" onerror="this.style.display='none'">` : tool.icon}
      </div>
      <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(${tool.id})">
        <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
      </button>
    </div>
    <div class="tool-name">
      <h3><a href="tool-details.html?id=${tool.id}">${tool.name}</a></h3>
      <span class="category-badge ${badgeClass}">${tool.category}</span>
    </div>
    <p class="tool-desc">${tool.description}</p>
    <p class="tool-pricing"><strong>${tool.pricing}</strong> • ${tool.price_detail}</p>
    <div class="tool-rating">
      <i class="fas fa-star"></i><span>${tool.rating}</span>
      <small>(${tool.reviews} reviews)</small>
    </div>
    <div class="card-actions">
      <a class="visit-btn" href="${tool.website}" target="_blank">
        <i class="fas fa-external-link-alt"></i> Visit Website
      </a>
      <button class="bookmark-btn" onclick="toggleFavorite(${tool.id})">
        <i class="fas fa-bookmark"></i>
      </button>
    </div>
  </div>`;
}

function getBadgeClass(category) {
  const map = {'Chatbots':'badge-chatbot','Image Generation':'badge-image','Video Generation':'badge-video','Voice Generation':'badge-voice','Coding Assistant':'badge-coding','Productivity':'badge-productivity','Education':'badge-education'};
  return map[category] || 'badge-chatbot';
}

function updateCount() {
  const el = document.getElementById('resultsCount');
  if (!el) return;
  const shown = Math.min(currentPage * toolsPerPage, filteredTools.length);
  el.innerHTML = `Showing <span>1 - ${shown}</span> of <span>${filteredTools.length}</span> tools`;
}

function loadMore() { currentPage++; renderTools(); updateCount(); }

function filterCategory(category, el) {
  activeCategory = category;
  applyFilters();
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  if (el) el.classList.add('active');
}

function filterPrice(pricing, el) {
  activePricing = pricing;
  applyFilters();
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
}

function applyFilters() {
  const q = document.getElementById('searchInput')?.value?.toLowerCase() || '';
  filteredTools = allTools.filter(t => {
    return (activeCategory === 'all' || t.category === activeCategory) &&
           (activePricing === 'all' || t.pricing === activePricing) &&
           (!q || t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q) || (t.description||'').toLowerCase().includes(q));
  });
  renderTools(true);
  updateCount();
}

function filterFree() { activePricing='Free'; activeCategory='all'; applyFilters(); }
function filterPopular() { filteredTools=[...allTools].sort((a,b)=>b.rating-a.rating); renderTools(true); updateCount(); }
function sortTools(v) { if(v==='name') filteredTools.sort((a,b)=>a.name.localeCompare(b.name)); else filteredTools.sort((a,b)=>b.rating-a.rating); renderTools(true); }

function toggleFavorite(id) {
  favorites = favorites.includes(id) ? favorites.filter(f=>f!==id) : [...favorites, id];
  localStorage.setItem('favorites', JSON.stringify(favorites));
  const card = document.getElementById(`card-${id}`);
  if (!card) return;
  const btn = card.querySelector('.fav-btn');
  const icon = btn?.querySelector('i');
  if (favorites.includes(id)) { btn?.classList.add('active'); if(icon) icon.className='fas fa-heart'; }
  else { btn?.classList.remove('active'); if(icon) icon.className='far fa-heart'; }
}

function showFavorites() { filteredTools=allTools.filter(t=>favorites.includes(t.id)); renderTools(true); updateCount(); }

function toggleDark() {
  document.body.classList.toggle('dark-mode');
  document.getElementById('darkToggle')?.classList.toggle('on');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function toggleSidebar() {
  document.getElementById('sidebar')?.classList.toggle('open');
  document.getElementById('sidebarOverlay')?.classList.toggle('active');
  document.body.style.overflow = document.getElementById('sidebar')?.classList.contains('open') ? 'hidden' : '';
}

function initSearch() {
  const si = document.getElementById('searchInput');
  if (si) si.addEventListener('input', applyFilters);
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    if (window.innerWidth <= 900) toggleSidebar();
  });
});

const userMenu = document.querySelector('.user-menu');
if (userMenu) {
  userMenu.addEventListener('mouseenter', () => { const d=document.querySelector('.dropdown-menu'); if(d) d.style.display='block'; });
  userMenu.addEventListener('mouseleave', () => { const d=document.querySelector('.dropdown-menu'); if(d) d.style.display='none'; });
}

window.toggleNotif = function() {
  const d = document.getElementById('notifDropdown');
  if (d) d.style.display = d.style.display==='none' ? 'block' : 'none';
}

window.logoutUser = async function() {
  try {
    const {getAuth, signOut} = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js");
    await signOut(getAuth());
    window.location.href = 'login.html';
  } catch(e) { window.location.href = 'login.html'; }
}

loadTools();
