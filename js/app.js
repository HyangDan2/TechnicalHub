const categoryNames = ['HW', 'SW', 'AI', 'Data', 'ML', 'DL', 'Utility', 'Etc'];
const list = document.querySelector('#project-list');
const filters = document.querySelector('#filters');
const search = document.querySelector('#search');
const reset = document.querySelector('#reset');
const count = document.querySelector('#result-count');
const status = document.querySelector('#status');

let projects = [];
let activeCategory = '';

const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

function renderFilters() {
  filters.replaceChildren();
  for (const category of categoryNames) {
    const button = element('button', 'filter-chip', category);
    button.type = 'button';
    button.setAttribute('aria-pressed', String(activeCategory === category));
    button.addEventListener('click', () => {
      activeCategory = activeCategory === category ? '' : category;
      renderFilters();
      renderProjects();
    });
    filters.append(button);
  }
}

function card(project, index) {
  const item = element('li', 'project-card-item');
  const article = element('article', 'project-card');
  article.dataset.project = project.id;

  if (project.thumbnail) {
    const frame = element('div', 'card-image');
    const image = element('img');
    image.src = `./${project.thumbnail}`;
    image.alt = project.thumbnailAlt || '';
    image.width = 960;
    image.height = 540;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.addEventListener('error', () => {
      image.src = './assets/profiles/placeholder.svg';
      image.alt = `${project.name} — 미리보기 준비 중`;
    }, { once: true });
    frame.append(image, element('span', 'image-caption', '프로필 화면'));
    article.append(frame);
  }

  const body = element('div', 'card-body');
  const kicker = element('div', 'card-kicker');
  kicker.append(element('span', '', project.categories.join(' · ').toUpperCase()), element('span', 'card-index', String(index + 1).padStart(2, '0')));
  const meta = element('div', 'card-meta');
  const pills = (Array.isArray(project.technologies) && project.technologies.length ? project.technologies : project.categories).slice(0, 4);
  for (const pill of pills) meta.append(element('span', 'meta-pill', pill));

  body.append(
    kicker,
    element('h3', 'card-title', project.name),
    element('p', 'card-subtitle', `소개 갱신 ${project.updatedAt || project.inspectedAt}`),
    element('p', 'card-description', project.summary ?? ''),
    meta,
  );

  const destination = project.profileUrl || project.repositoryUrl;
  const link = element('a', 'action-link', project.profileUrl ? '프로필 보기' : '저장소 열기');
  link.href = destination;
  link.setAttribute('aria-label', `${project.name} ${project.profileUrl ? '프로필 보기' : '저장소 열기'}`);
  if (!project.profileUrl) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
  const arrow = element('span', '', '↗');
  arrow.setAttribute('aria-hidden', 'true');
  link.append(arrow);
  body.append(link);

  article.append(body);
  item.append(article);
  return item;
}

function renderProjects() {
  const query = search.value.trim().toLocaleLowerCase('ko');
  const visible = projects.filter(project => {
    const matchesCategory = !activeCategory || project.categories.includes(activeCategory);
    const searchableText = `${project.name} ${project.summary || ''}`.toLocaleLowerCase('ko');
    const matchesQuery = !query || searchableText.includes(query);
    return matchesCategory && matchesQuery;
  });
  list.replaceChildren();
  for (const [index, project] of visible.entries()) list.append(card(project, index));
  count.textContent = `${visible.length}개`;
  status.hidden = visible.length > 0;
  list.setAttribute('aria-busy', 'false');
  status.textContent = projects.length === 0
    ? '아직 등록된 프로젝트가 없습니다.'
    : '조건에 맞는 프로젝트가 없습니다. 검색어나 분야를 바꿔보세요.';
  reset.disabled = !search.value && !activeCategory;
}

search.addEventListener('input', renderProjects);
reset.addEventListener('click', () => {
  search.value = '';
  activeCategory = '';
  renderFilters();
  renderProjects();
  search.focus();
});

renderFilters();
fetch('./data/catalog.json')
  .then(response => {
    if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
    return response.json();
  })
  .then(catalog => {
    projects = Array.isArray(catalog.projects) ? catalog.projects : [];
    renderProjects();
  })
  .catch(() => {
    count.textContent = '불러오기 실패';
    status.hidden = false;
    status.textContent = '프로젝트 목록을 불러오지 못했습니다. 페이지를 새로고침해 주세요.';
    list.replaceChildren();
    list.setAttribute('aria-busy', 'false');
  });
