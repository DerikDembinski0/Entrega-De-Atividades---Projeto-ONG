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
