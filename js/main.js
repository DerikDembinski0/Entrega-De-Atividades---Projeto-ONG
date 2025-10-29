// Arquivo principal que "cola" todas as partes.
// Aqui iniciamos o roteador e montamos os formulários conforme a rota.

import { templates } from './templates.js';
import { initRouter } from './router.js';
import { mountForms } from './forms.js';

// Inicializa SPA passando os templates
// Sempre que a rota mudar, mountForms verifica se precisa ativar lógica de formulário
initRouter(templates, (route, root) => {
  mountForms(route, root);
});

document.getElementById('btn-dark').onclick = () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : '');
};
document.getElementById('btn-contrast').onclick = () => {
  document.body.classList.toggle('high-contrast');
  localStorage.setItem('theme', document.body.classList.contains('high-contrast') ? 'high-contrast' : '');
};