// Este arquivo implementa um roteador SPA.
// Ele escuta mudanças no hash da URL (ex: #/projetos) e troca o conteúdo do <main>.

export function initRouter(routes, onAfterRender) {
  const app = document.getElementById('app');

  // Função de renderização chamada a cada troca de rota
  function render() {
    const key = location.hash.replace('#/', '') || 'inicio';
    const html = routes[key] ?? routes.inicio;
    app.innerHTML = html;

    // Executa código extra depois que o template é carregado (ex: ativar formulários)
    onAfterRender?.(key, app);
  }

  // Eventos que disparam o render
  window.addEventListener('hashchange', render);       // ao mudar hash
  document.addEventListener('DOMContentLoaded', render); // ao carregar página
}
