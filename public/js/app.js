const ALBUM_DATA = {
  panini: ["00"],
  special: [
    "FWC1","FWC2","FWC3","FWC4","FWC5","FWC6","FWC7","FWC8",
    "FWC9","FWC10","FWC11","FWC12","FWC13","FWC14","FWC15","FWC16",
    "FWC17","FWC18","FWC19"
  ],
  teams: [
    {code:"ALG",name:"Algeria",count:20},
    {code:"ARG",name:"Argentina",count:20},
    {code:"AUS",name:"Australia",count:20},
    {code:"AUT",name:"Austria",count:20},
    {code:"BEL",name:"Belgium",count:20},
    {code:"BIH",name:"Bosnia & Herzegovina",count:20},
    {code:"BRA",name:"Brazil",count:20},
    {code:"CAN",name:"Canada",count:20},
    {code:"CPV",name:"Cape Verde",count:20},
    {code:"COL",name:"Colombia",count:20},
    {code:"CRO",name:"Croatia",count:20},
    {code:"CUW",name:"Curaçao",count:20},
    {code:"CZE",name:"Czechia",count:20},
    {code:"COD",name:"DR Congo",count:20},
    {code:"ECU",name:"Ecuador",count:20},
    {code:"EGY",name:"Egypt",count:20},
    {code:"ENG",name:"England",count:20},
    {code:"FRA",name:"France",count:20},
    {code:"GER",name:"Germany",count:20},
    {code:"GHA",name:"Ghana",count:20},
    {code:"HAI",name:"Haiti",count:20},
    {code:"IRN",name:"Iran",count:20},
    {code:"IRQ",name:"Iraq",count:20},
    {code:"JPN",name:"Japan",count:20},
    {code:"JOR",name:"Jordan",count:20},
    {code:"MAR",name:"Morocco",count:20},
    {code:"MEX",name:"Mexico",count:20},
    {code:"NED",name:"Netherlands",count:20},
    {code:"NZL",name:"New Zealand",count:20},
    {code:"NOR",name:"Norway",count:20},
    {code:"PAN",name:"Panama",count:20},
    {code:"PAR",name:"Paraguay",count:20},
    {code:"POR",name:"Portugal",count:20},
    {code:"QAT",name:"Qatar",count:20},
    {code:"KSA",name:"Saudi Arabia",count:20},
    {code:"SCO",name:"Scotland",count:20},
    {code:"SEN",name:"Senegal",count:20},
    {code:"RSA",name:"South Africa",count:20},
    {code:"KOR",name:"South Korea",count:20},
    {code:"ESP",name:"Spain",count:20},
    {code:"SWE",name:"Sweden",count:20},
    {code:"SUI",name:"Switzerland",count:20},
    {code:"TUN",name:"Tunisia",count:20},
    {code:"TUR",name:"Turkey",count:20},
    {code:"USA",name:"USA",count:20},
    {code:"URU",name:"Uruguay",count:20},
    {code:"UZB",name:"Uzbekistan",count:20},
  ],
  cocacola: Array.from({length: 14}, (_, i) => 'CC' + (i + 1))
};

// state: { [id]: 0 = missing, 1 = owned, 2+ = owned + (n-1) extras }
let state = {};
let saveTimer = null;
let currentLanguage = localStorage.getItem('fwc-language') || 'en';
let currentTheme = localStorage.getItem('fwc-theme') || 'default';

const I18N = {
  en: {
    albumTitle: 'Panini FIFA World Cup 2026 — Sticker Album',
    owned: 'Owned',
    missing: 'Missing',
    extras: 'Extras',
    completion: 'Completion',
    export: 'Export',
    reset: 'Reset All',
    album: 'Album',
    compare: 'Compare',
    all: 'All',
    missingFilter: 'Missing',
    ownedFilter: 'Owned',
    extrasFilter: 'Extras',
    completeSections: 'Complete Sections',
    sections: 'Sections',
    fwcSection: 'FWC — Special Stickers',
    cocaCola: 'Coca-Cola',
    language: 'Language',
    theme: 'Theme',
    midnightGold: 'Dark / Midnight Gold',
    emerald: 'Dark / Emerald',
    ruby: 'Dark / Ruby',
    frost: 'Dark / Frost',
    daylight: 'Light / Daylight',
    mint: 'Light / Mint',
    blush: 'Light / Blush',
    sage: 'Light / Sage Cream',
    compareTitle: 'Compare',
    namePlaceholder: 'Name (optional)',
    extrasMode: "Their Extras → my missing",
    missingMode: "Their Missing → my extras",
    pastePlaceholder: 'Paste exported sticker list here…',
    compareButton: 'Compare',
    missingTooltip: 'Missing',
    complete: 'Complete!',
    resetConfirm: 'Reset all sticker data? This cannot be undone.',
    noMatches: 'No matches found.',
    parseError: 'Could not parse any sticker IDs from the pasted text.',
    extrasModeLabel: "stickers they have extra that you're missing",
    missingModeLabel: 'stickers they need that you have extra',
    matches: 'matches',
    match: 'match',
    remove: 'Remove',
    filterLabels: { all: 'All', missing: 'Missing', owned: 'Owned', extras: 'Extras' },
    countryNames: {}
  },
  es: {
    albumTitle: 'Álbum de estampas Panini FIFA World Cup 2026',
    owned: 'Tengo',
    missing: 'Faltan',
    extras: 'Repetidas',
    completion: 'Completado',
    export: 'Exportar',
    reset: 'Reiniciar',
    album: 'Álbum',
    compare: 'Comparar',
    all: 'Todas',
    missingFilter: 'Faltantes',
    ownedFilter: 'Tengo',
    extrasFilter: 'Repetidas',
    completeSections: 'Secciones completas',
    sections: 'Secciones',
    fwcSection: 'FWC — Estampas especiales',
    cocaCola: 'Coca-Cola',
    language: 'Idioma',
    theme: 'Tema',
    midnightGold: 'Oscuro / Medianoche dorada',
    emerald: 'Oscuro / Esmeralda',
    ruby: 'Oscuro / Rubí',
    frost: 'Oscuro / Hielo',
    daylight: 'Claro / Día claro',
    mint: 'Claro / Menta',
    blush: 'Claro / Rosa',
    sage: 'Claro / Crema salvia',
    compareTitle: 'Comparar',
    namePlaceholder: 'Nombre (opcional)',
    extrasMode: 'Sus repetidas → mis faltantes',
    missingMode: 'Sus faltantes → mis repetidas',
    pastePlaceholder: 'Pega aquí la lista exportada de estampas…',
    compareButton: 'Comparar',
    missingTooltip: 'Faltantes',
    complete: '¡Completa!',
    resetConfirm: '¿Reiniciar todos los datos? Esta acción no se puede deshacer.',
    noMatches: 'No se encontraron coincidencias.',
    parseError: 'No se pudo leer ninguna estampa del texto pegado.',
    extrasModeLabel: 'estampas que tiene repetidas y a ti te faltan',
    missingModeLabel: 'estampas que necesita y tú tienes repetidas',
    matches: 'coincidencias',
    match: 'coincidencia',
    remove: 'Eliminar',
    filterLabels: { all: 'Todas', missing: 'Faltantes', owned: 'Tengo', extras: 'Repetidas' },
    countryNames: {
      ALG: 'Argelia',
      ARG: 'Argentina',
      AUS: 'Australia',
      AUT: 'Austria',
      BEL: 'Bélgica',
      BIH: 'Bosnia y Herzegovina',
      BRA: 'Brasil',
      CAN: 'Canadá',
      CPV: 'Cabo Verde',
      COL: 'Colombia',
      CRO: 'Croacia',
      CUW: 'Curazao',
      CZE: 'Chequia',
      COD: 'RD Congo',
      ECU: 'Ecuador',
      EGY: 'Egipto',
      ENG: 'Inglaterra',
      FRA: 'Francia',
      GER: 'Alemania',
      GHA: 'Ghana',
      HAI: 'Haití',
      IRN: 'Irán',
      IRQ: 'Irak',
      JPN: 'Japón',
      JOR: 'Jordania',
      MAR: 'Marruecos',
      MEX: 'México',
      NED: 'Países Bajos',
      NZL: 'Nueva Zelanda',
      NOR: 'Noruega',
      PAN: 'Panamá',
      PAR: 'Paraguay',
      POR: 'Portugal',
      QAT: 'Catar',
      KSA: 'Arabia Saudita',
      SCO: 'Escocia',
      SEN: 'Senegal',
      RSA: 'Sudáfrica',
      KOR: 'Corea del Sur',
      ESP: 'España',
      SWE: 'Suecia',
      SUI: 'Suiza',
      TUN: 'Túnez',
      TUR: 'Turquía',
      USA: 'Estados Unidos',
      URU: 'Uruguay',
      UZB: 'Uzbekistán'
    }
  }
};

async function loadState() {
  try {
    const res = await fetch('/api/state');
    state = await res.json();
  } catch(e) { state = {}; }
}

function saveState() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    fetch('/api/state', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(state)
    });
  }, 300);
}

function getText() {
  return I18N[currentLanguage] || I18N.en;
}

function applyTheme(theme) {
  if (!document.querySelector(`#theme-select option[value="${theme}"]`)) theme = 'default';
  currentTheme = theme;
  document.body.dataset.theme = theme;
  document.getElementById('theme-select').value = theme;
  localStorage.setItem('fwc-theme', theme);
  updateSidebarOffset();
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function applyLanguage(language) {
  if (!I18N[language]) language = 'en';
  currentLanguage = language;
  const text = getText();
  document.documentElement.lang = language;
  document.getElementById('language-select').value = language;
  localStorage.setItem('fwc-language', language);

  setText('owned-label', text.owned);
  setText('missing-label', text.missing);
  setText('extras-label', text.extras);
  setText('completion-label', text.completion);
  setText('export-btn', text.export);
  setText('reset-btn', text.reset);
  setText('complete-sections-label', text.completeSections);
  setText('sections-label', text.sections);
  setText('language-label', text.language);
  setText('theme-label', text.theme);

  const title = document.querySelector('header h1');
  if (title) title.textContent = text.albumTitle;

  const albumTab = document.querySelector('.tab-bar button[data-tab="album"]');
  const compareTab = document.querySelector('.tab-bar button[data-tab="compare"]');
  if (albumTab) albumTab.textContent = text.album;
  if (compareTab) compareTab.textContent = text.compare;

  document.querySelectorAll('#filter-bar button').forEach(button => {
    const labels = {
      all: text.all,
      missing: text.missingFilter,
      owned: text.ownedFilter,
      extras: text.extrasFilter
    };
    button.textContent = labels[button.dataset.filter] || button.textContent;
  });

  document.querySelector('#theme-select option[value="default"]').textContent = text.midnightGold;
  document.querySelector('#theme-select option[value="emerald"]').textContent = text.emerald;
  document.querySelector('#theme-select option[value="ruby"]').textContent = text.ruby;
  document.querySelector('#theme-select option[value="frost"]').textContent = text.frost;
  document.querySelector('#theme-select option[value="daylight"]').textContent = text.daylight;
  document.querySelector('#theme-select option[value="mint"]').textContent = text.mint;
  document.querySelector('#theme-select option[value="blush"]').textContent = text.blush;
  document.querySelector('#theme-select option[value="sage"]').textContent = text.sage;

  const compareTitle = document.querySelector('.compare-title');
  if (compareTitle) compareTitle.textContent = text.compareTitle;
  document.getElementById('compare-name').placeholder = text.namePlaceholder;
  document.getElementById('compare-mode').options[0].textContent = text.extrasMode;
  document.getElementById('compare-mode').options[1].textContent = text.missingMode;
  document.getElementById('compare-paste').placeholder = text.pastePlaceholder;
  document.getElementById('compare-btn').textContent = text.compareButton;

  updateSectionTitles();
  updateCountryList();
  updateSidebarOffset();
  loadCompareHistory();
}

function getVal(id) { return state[id] || 0; }

function handleClick(id) {
  const v = getVal(id);
  state[id] = v + 1;
  saveState();
  updateSticker(id);
  updateStats();
  updateCountryList();
  applyFilter(currentFilter);
}

function handleRightClick(e, id) {
  e.preventDefault();
  const v = getVal(id);
  if (v <= 0) return;
  state[id] = v - 1;
  if (state[id] === 0) delete state[id];
  saveState();
  updateSticker(id);
  updateStats();
  updateCountryList();
  applyFilter(currentFilter);
}

function updateSticker(id) {
  const el = document.getElementById('s-' + id);
  if (!el) return;
  const v = getVal(id);
  el.classList.toggle('owned', v >= 1);
  let badge = el.querySelector('.extra-badge');
  if (v >= 2) {
    if (!badge) {
      badge = document.createElement('div');
      badge.className = 'extra-badge';
      el.appendChild(badge);
    }
    badge.textContent = '+' + (v - 1);
  } else {
    if (badge) badge.remove();
  }
}

function getSectionFlag(stickers) {
  const firstId = stickers[0] || '';
  const prefix = firstId.replace(/\d+$/, '');
  return FLAG[firstId] || FLAG[prefix] || '';
}

function getTeamName(team) {
  return getText().countryNames[team.code] || team.name;
}

function getSectionTitle(sectionKey) {
  const text = getText();
  if (sectionKey === 'PANINI') return 'Panini';
  if (sectionKey === 'FWC') return text.fwcSection;
  if (sectionKey === 'CC') return text.cocaCola;
  const team = ALBUM_DATA.teams.find(item => item.code === sectionKey);
  return team ? `${team.code} — ${getTeamName(team)}` : sectionKey;
}

function updateSectionTitles() {
  document.querySelectorAll('.section[data-group]').forEach(section => {
    const title = getSectionTitle(section.dataset.group);
    const firstSticker = section.querySelector('.sticker');
    const titleEl = section.querySelector('.section-title');
    if (!titleEl || !firstSticker) return;
    const flag = getSectionFlag([firstSticker.dataset.id]);
    titleEl.textContent = flag ? `${flag} ${title}` : title;
    section.dataset.title = title;
  });
}

function buildSection(title, stickers, isFoil, extraClass, sectionKey) {
  const section = document.createElement('section');
  section.className = 'section';
  section.dataset.section = title;
  section.dataset.title = title;
  if (sectionKey) section.dataset.group = sectionKey;

  const header = document.createElement('div');
  header.className = 'section-header';

  const h2 = document.createElement('h2');
  h2.className = 'section-title';
  const flag = getSectionFlag(stickers);
  h2.textContent = flag ? `${flag} ${title}` : title;

  const prog = document.createElement('span');
  prog.className = 'section-progress';
  prog.dataset.section = title;
  header.appendChild(h2);
  header.appendChild(prog);
  section.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'grid';

  stickers.forEach(id => {
    const cell = document.createElement('div');
    cell.className = 'sticker' + (isFoil ? ' foil' : '') + (extraClass ? ' ' + extraClass : '');
    cell.id = 's-' + id;
    cell.dataset.id = id;

    const code = document.createElement('span');
    code.className = 'code';
    code.textContent = id;
    cell.appendChild(code);

    cell.addEventListener('click', () => handleClick(id));
    cell.addEventListener('contextmenu', e => handleRightClick(e, id));

    grid.appendChild(cell);
  });

  section.appendChild(grid);
  return section;
}

function buildAlbum() {
  const main = document.getElementById('main');
  main.innerHTML = '';

  // Panini logo sticker
  main.appendChild(buildSection('Panini', ALBUM_DATA.panini, true, '', 'PANINI'));

  // Special / FWC stickers
  main.appendChild(buildSection('FWC — Special Stickers', ALBUM_DATA.special, true, '', 'FWC'));

  // Team sections
  ALBUM_DATA.teams.forEach(team => {
    const ids = Array.from({length: team.count}, (_, i) => team.code + (i + 1));
    main.appendChild(buildSection(team.code + ' — ' + team.name, ids, false, '', team.code));
  });

  // Coca-Cola section
  main.appendChild(buildSection('CocaCola', ALBUM_DATA.cocacola, false, 'cocacola', 'CC'));
}

function getSidebarSections() {
  return [
    { key: 'PANINI', name: 'Panini', flag: FLAG['00'], ids: ALBUM_DATA.panini },
    { key: 'FWC', name: 'FWC', flag: FLAG.FWC, ids: ALBUM_DATA.special },
    ...ALBUM_DATA.teams.map(team => ({
      key: team.code,
      name: getTeamName(team),
      flag: FLAG[team.code],
      ids: Array.from({length: team.count}, (_, i) => team.code + (i + 1))
    })),
    { key: 'CC', name: getText().cocaCola, flag: FLAG.CC, ids: ALBUM_DATA.cocacola }
  ];
}

function getOwnedCount(ids) {
  return ids.reduce((owned, id) => owned + (getVal(id) >= 1 ? 1 : 0), 0);
}

function getMissingLabel(ids) {
  const missing = ids
    .filter(id => getVal(id) < 1)
    .map(id => id.replace(/^[A-Za-z]+/, ''));
  return missing.length === 0 ? getText().complete : missing.join(', ');
}

function positionMissingTooltip(x, y) {
  const tooltip = document.getElementById('missing-tooltip');
  const offset = 12;
  let left = x + offset;
  let top = y + offset;
  const rect = tooltip.getBoundingClientRect();

  if (left + rect.width > window.innerWidth - offset) {
    left = Math.max(offset, x - rect.width - offset);
  }
  if (top + rect.height > window.innerHeight - offset) {
    top = Math.max(offset, y - rect.height - offset);
  }

  tooltip.style.left = left + 'px';
  tooltip.style.top = top + 'px';
}

function showMissingTooltip(text, x, y) {
  const tooltip = document.getElementById('missing-tooltip');
  tooltip.textContent = '';
  if (text === getText().complete) {
    tooltip.textContent = text;
  } else {
    const label = document.createElement('span');
    label.className = 'missing-tooltip-label';
    label.textContent = getText().missingTooltip;
    tooltip.appendChild(label);
    tooltip.appendChild(document.createTextNode(text));
  }
  tooltip.classList.add('visible');
  positionMissingTooltip(x, y);
}

function hideMissingTooltip() {
  document.getElementById('missing-tooltip').classList.remove('visible');
}

function updateSidebarOffset() {
  const header = document.querySelector('header');
  const headerHeight = header ? Math.ceil(header.getBoundingClientRect().height) : 0;
  document.documentElement.style.setProperty('--sidebar-top', `${headerHeight + 12}px`);
}

function scrollToAlbumSection(section) {
  const header = document.querySelector('header');
  const headerOffset = header ? header.getBoundingClientRect().height : 0;
  const targetTop = section.getBoundingClientRect().top + window.scrollY - headerOffset - 14;
  window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
}

function buildCountryList() {
  const leftList = document.getElementById('country-list-left');
  const rightList = document.getElementById('country-list-right');
  const sections = getSidebarSections();
  const splitIndex = Math.ceil(sections.length / 2);
  leftList.innerHTML = '';
  rightList.innerHTML = '';

  sections.forEach((sectionData, index) => {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'country-row';
    row.dataset.group = sectionData.key;
    row.dataset.missing = getMissingLabel(sectionData.ids);
    row.addEventListener('click', () => {
      const section = document.querySelector(`.section[data-group="${sectionData.key}"]`);
      if (section) scrollToAlbumSection(section);
    });
    row.addEventListener('mouseenter', e => showMissingTooltip(row.dataset.missing || '', e.clientX, e.clientY));
    row.addEventListener('mousemove', e => positionMissingTooltip(e.clientX, e.clientY));
    row.addEventListener('mouseleave', hideMissingTooltip);
    row.addEventListener('focus', () => {
      const rect = row.getBoundingClientRect();
      showMissingTooltip(row.dataset.missing || '', rect.right, rect.top);
    });
    row.addEventListener('blur', hideMissingTooltip);

    const name = document.createElement('span');
    name.className = 'country-name';
    const flag = sectionData.flag || '';
    name.textContent = flag ? `${flag} ${sectionData.name}` : sectionData.name;

    const completion = document.createElement('span');
    completion.className = 'country-completion';

    row.appendChild(name);
    row.appendChild(completion);
    const list = index < splitIndex ? leftList : rightList;
    list.appendChild(row);
  });
}

function updateCountryList() {
  let completeSections = 0;
  const sections = getSidebarSections();

  sections.forEach(sectionData => {
    const row = document.querySelector(`.country-row[data-group="${sectionData.key}"]`);
    if (!row) return;
    const owned = getOwnedCount(sectionData.ids);
    const total = sectionData.ids.length;
    const pct = Math.round((owned / total) * 100);
    const isComplete = owned === total;
    if (isComplete) completeSections++;
    const name = row.querySelector('.country-name');
    if (name) {
      const flag = sectionData.flag || '';
      name.textContent = flag ? `${flag} ${sectionData.name}` : sectionData.name;
    }
    row.classList.toggle('complete', isComplete);
    row.dataset.missing = getMissingLabel(sectionData.ids);
    row.querySelector('.country-completion').textContent = `${owned}/${total} ${pct}%`;
  });

  document.getElementById('complete-sections-count').textContent = completeSections;
  document.getElementById('complete-sections-total').textContent = sections.length;
}

function updateStats() {
  let owned = 0, extras = 0;
  Object.entries(state).forEach(([id, v]) => {
    if (v >= 1) owned++;
    if (v >= 2) extras += (v - 1);
  });
  document.getElementById('stat-owned').textContent = owned;
  document.getElementById('stat-missing').textContent = 994 - owned;
  document.getElementById('stat-extras').textContent = extras;
  document.getElementById('stat-pct').textContent = Math.round(owned / 994 * 100) + '%';

  // Section progress
  document.querySelectorAll('.section-progress[data-section]').forEach(el => {
    const sectionEl = el.closest('.section');
    const cells = sectionEl.querySelectorAll('.sticker');
    const total = cells.length;
    let sOwned = 0;
    cells.forEach(c => { if (getVal(c.dataset.id) >= 1) sOwned++; });
    el.innerHTML = `<span class="count">${sOwned}</span> / ${total}`;
  });
}

function refreshAllStickers() {
  document.querySelectorAll('.sticker').forEach(el => {
    updateSticker(el.dataset.id);
  });
}

let currentFilter = 'all';

function applyFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('#filter-bar button').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === filter);
  });

  document.querySelectorAll('.section').forEach(section => {
    const cells = section.querySelectorAll('.sticker');
    let visibleCount = 0;

    cells.forEach(cell => {
      const v = getVal(cell.dataset.id);
      let show = true;
      if (filter === 'missing') show = v === 0;
      else if (filter === 'owned') show = v >= 1;
      else if (filter === 'extras') show = v >= 2;
      cell.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    section.classList.toggle('hidden', filter !== 'all' && visibleCount === 0);
  });
}

document.getElementById('filter-bar').addEventListener('click', e => {
  if (e.target.dataset.filter) applyFilter(e.target.dataset.filter);
});

document.getElementById('tab-bar').addEventListener('click', e => {
  const tab = e.target.dataset.tab;
  if (!tab) return;
  document.querySelectorAll('.tab-bar button').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + tab));
  document.getElementById('filter-bar').style.display = tab === 'album' ? '' : 'none';
});

// Country code → flag emoji
const FLAG = {
  "00":"🏅","FWC":"🏆",
  "ALG":"🇩🇿","ARG":"🇦🇷","AUS":"🇦🇺","AUT":"🇦🇹","BEL":"🇧🇪",
  "BIH":"🇧🇦","BRA":"🇧🇷","CAN":"🇨🇦","CPV":"🇨🇻","COL":"🇨🇴",
  "CRO":"🇭🇷","CUW":"🇨🇼","CZE":"🇨🇿","COD":"🇨🇩","ECU":"🇪🇨",
  "EGY":"🇪🇬","ENG":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","FRA":"🇫🇷","GER":"🇩🇪","GHA":"🇬🇭",
  "HAI":"🇭🇹","IRN":"🇮🇷","IRQ":"🇮🇶","JPN":"🇯🇵","JOR":"🇯🇴",
  "MAR":"🇲🇦","MEX":"🇲🇽","NED":"🇳🇱","NZL":"🇳🇿","NOR":"🇳🇴",
  "PAN":"🇵🇦","PAR":"🇵🇾","POR":"🇵🇹","QAT":"🇶🇦","KSA":"🇸🇦",
  "SCO":"🏴󠁧󠁢󠁳󠁣󠁴󠁿","SEN":"🇸🇳","RSA":"🇿🇦","KOR":"🇰🇷","ESP":"🇪🇸",
  "SWE":"🇸🇪","SUI":"🇨🇭","TUN":"🇹🇳","TUR":"🇹🇷","USA":"🇺🇸",
  "URU":"🇺🇾","UZB":"🇺🇿","CC":"🥤"
};

function exportList() {
  // Gather all visible sections
  const lines = [];
  const filterLabel = getText().filterLabels[currentFilter] || getText().filterLabels.all;

  lines.push(`Panini FIFA World Cup 2026 — ${filterLabel} Stickers`);
  lines.push('');

  document.querySelectorAll('.section:not(.hidden)').forEach(section => {
    const titleEl = section.querySelector('.section-title');
    const title = section.dataset.title || (titleEl ? titleEl.textContent : '');

    // Collect visible sticker cells
    const visibleCells = [...section.querySelectorAll('.sticker')]
      .filter(c => c.style.display !== 'none');

    if (visibleCells.length === 0) return;

    // Determine prefix for flag lookup
    const firstId = visibleCells[0].dataset.id;
    const prefix = firstId.replace(/\d+$/, '');
    const flagKey = FLAG[prefix] ? prefix : (FLAG[firstId] ? firstId : prefix);
    const flag = FLAG[flagKey] || FLAG[prefix] || '';

    const parts = visibleCells.map(c => {
      const id = c.dataset.id;
      const num = id.replace(/^[A-Za-z]+/, '');
      const v = getVal(id);
      if (currentFilter === 'extras') return v > 2 ? `${num}x${v - 1}` : num;
      return v >= 2 ? `${num}x${v}` : num;
    });

    lines.push(`${flag}  ${title}: ${parts.join(', ')}`);
  });

  const blob = new Blob([lines.join('\n')], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fwc2026_${currentFilter}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

document.getElementById('export-btn').addEventListener('click', exportList);

// ── Compare ──────────────────────────────────────────────────────────────────

function parsePaste(text) {
  const ids = new Set();
  for (const line of text.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const left = line.slice(0, colonIdx).trim();
    const right = line.slice(colonIdx + 1).trim();
    if (!right) continue;
    let prefix = '';
    const tokens = left.split(/[\s—–]+/);
    const codeToken = tokens.reverse().find(t => /^[A-Z0-9]{2,5}$/.test(t));
    if (codeToken) prefix = codeToken === 'Stickers' ? 'FWC' : codeToken;
    else if (left.includes('CocaCola')) prefix = 'CC';
    for (const item of right.split(',').map(s => s.trim()).filter(Boolean)) {
      const num = item.replace(/x\d+$/i, '').trim();
      if (!num) continue;
      ids.add(/^[A-Za-z]/.test(num) ? num : prefix + num);
    }
  }
  return ids;
}

function getStickerGroup(id) {
  if (/^\d+$/.test(id)) return '00';
  return id.replace(/\d+$/, '');
}

function getGroupLabel(prefix) {
  if (prefix === '00') return 'Panini';
  return prefix;
}

function computeMatches(theirIds, mode) {
  const grouped = {};
  for (const id of theirIds) {
    const prefix = getStickerGroup(id);
    const num = id.replace(/^[A-Za-z]+/, '');
    const myVal = getVal(id);
    const match = mode === 'extras' ? myVal === 0 : myVal >= 2;
    if (match) {
      if (!grouped[prefix]) grouped[prefix] = [];
      grouped[prefix].push({ num, id, myVal });
    }
  }
  return grouped;
}

function renderCompareBlock(entry) {
  const text = getText();
  const { id, name, mode, grouped } = entry;
  const prefixes = Object.keys(grouped);
  const totalMatches = prefixes.reduce((s, p) => s + grouped[p].length, 0);
  const modeLabel = mode === 'extras'
    ? text.extrasModeLabel
    : text.missingModeLabel;

  const block = document.createElement('div');
  block.className = 'compare-result-block';
  block.dataset.id = id;

  let html = `<div class="compare-result-header">
    <div class="compare-result-name">${name} — ${totalMatches} ${totalMatches === 1 ? text.match : text.matches}</div>
    <button class="compare-remove-btn" data-id="${id}">${text.remove}</button>
  </div>`;
  html += `<div class="compare-result-row" style="margin-bottom:10px;font-size:0.72rem;color:#666;">${modeLabel}</div>`;

  if (totalMatches === 0) {
    html += `<div class="compare-none">${text.noMatches}</div>`;
  } else {
    for (const prefix of prefixes.sort()) {
      const flag = FLAG[prefix] || '';
      const label = getGroupLabel(prefix);
      const parts = grouped[prefix].map(({ num, myVal }) => {
        if (mode === 'missing') {
          const extras = myVal - 1;
          return extras > 1 ? `<span class="compare-match">${num}x${extras}</span>` : `<span class="compare-match">${num}</span>`;
        }
        return `<span class="compare-match">${num}</span>`;
      });
      html += `<div class="compare-result-row">${flag} <strong>${label}:</strong> ${parts.join(', ')}</div>`;
    }
  }

  block.innerHTML = html;
  block.querySelector('.compare-remove-btn').addEventListener('click', () => removeCompareEntry(id));
  return block;
}

async function loadCompareHistory() {
  try {
    const res = await fetch('/api/compare');
    const entries = await res.json();
    const resultsEl = document.getElementById('compare-results');
    resultsEl.innerHTML = '';
    entries.forEach(entry => resultsEl.appendChild(renderCompareBlock(entry)));
  } catch(e) {}
}

async function removeCompareEntry(id) {
  await fetch(`/api/compare/${id}`, { method: 'DELETE' });
  const block = document.querySelector(`.compare-result-block[data-id="${id}"]`);
  if (block) block.remove();
}

async function runCompare() {
  const name = document.getElementById('compare-name').value.trim() || 'Result';
  const mode = document.getElementById('compare-mode').value;
  const paste = document.getElementById('compare-paste').value;
  const resultsEl = document.getElementById('compare-results');

  const theirIds = parsePaste(paste);
  if (theirIds.size === 0) {
    const message = document.createElement('p');
    message.className = 'compare-none';
    message.textContent = getText().parseError;
    resultsEl.insertBefore(message, resultsEl.firstChild);
    return;
  }

  const grouped = computeMatches(theirIds, mode);
  const entry = { name, mode, grouped };

  const res = await fetch('/api/compare', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry)
  });
  const saved = await res.json();

  resultsEl.insertBefore(renderCompareBlock(saved), resultsEl.firstChild);
  document.getElementById('compare-paste').value = '';
}

document.getElementById('compare-btn').addEventListener('click', runCompare);

document.getElementById('reset-btn').addEventListener('click', () => {
  if (confirm(getText().resetConfirm)) {
    state = {};
    saveState();
    refreshAllStickers();
    updateStats();
    updateCountryList();
    applyFilter(currentFilter);
  }
});

document.getElementById('language-select').addEventListener('change', e => {
  applyLanguage(e.target.value);
});

document.getElementById('theme-select').addEventListener('change', e => {
  applyTheme(e.target.value);
});

// Init
updateSidebarOffset();
window.addEventListener('resize', updateSidebarOffset);
buildAlbum();
buildCountryList();
applyTheme(currentTheme);
applyLanguage(currentLanguage);
loadState().then(() => {
  updateSidebarOffset();
  refreshAllStickers();
  updateStats();
  updateCountryList();
});
