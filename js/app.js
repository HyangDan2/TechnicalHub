const categoryNames = ['HW', 'SW', 'AI', 'Data', 'ML', 'DL', 'Utility', 'Etc'];
const list = document.querySelector('#project-list');
const filters = document.querySelector('#filters');
const search = document.querySelector('#search');
const reset = document.querySelector('#reset');
const count = document.querySelector('#result-count');
const status = document.querySelector('#status');

let projects = [];
let activeCategory = '';

function renderFilters() {
  filters.replaceChildren();
  for (const category of categoryNames) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter-chip';
    button.textContent = category;
    button.setAttribute('aria-pressed', String(activeCategory === category));
    button.addEventListener('click', () => {
      activeCategory = activeCategory === category ? '' : category;
      renderFilters();
      renderProjects();
    });
    filters.append(button);
  }
}

function renderProjects() {
  const query = search.value.trim().toLocaleLowerCase('ko');
  const visible = projects.filter(project => {
    const matchesCategory = !activeCategory || project.categories.includes(activeCategory);
    const matchesQuery = !query || project.name.toLocaleLowerCase('ko').includes(query);
    return matchesCategory && matchesQuery;
  });
  list.replaceChildren();
  for (const project of visible) {
    const item = document.createElement('li');
    item.className = 'project-card';
    const link = document.createElement('a');
    link.className = 'project-link';
    link.href = project.repositoryUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = project.name;
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    link.append(arrow);
    const tags = document.createElement('div');
    tags.className = 'card-meta';
    for (const category of project.categories) {
      const tag = document.createElement('span');
      tag.className = 'category-tag';
      tag.textContent = category;
      tags.append(tag);
    }
    const date = document.createElement('p');
    date.className = 'inspected-date';
    date.textContent = `조사일 ${project.inspectedAt}`;
    item.append(link, tags, date);
    list.append(item);
  }
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
