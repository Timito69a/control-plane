import { State } from './state.js';
import { Events } from './events.js';

const sidebar = document.querySelector('#sidebar ul');
const workspaces = document.getElementById('workspaces');

function handleSidebarClick(e) {
  const li = e.target.closest('li[data-workspace]');
  if (li) {
    const workspaceId = li.getAttribute('data-workspace');
    const context = {
      tenant: li.getAttribute('data-tenant-id') || null,
      project: li.getAttribute('data-project-id') || null
    };
    Events.emit('tab:open', {workspaceId, context});
    // Active class on sidebar
    sidebar.querySelectorAll('li').forEach(el=>el.classList.remove('active'));
    li.classList.add('active');
  }
}

export const Workspace = {
  init() {
    sidebar.addEventListener('click', handleSidebarClick);
    // Accordion
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        header.parentNode.classList.toggle('expanded');
      });
    });

    // Initial state safety
    if (State.openTabs.length === 0) {
      Events.emit('tab:open', {workspaceId: 'overview', context:{}});
    }
  }
};