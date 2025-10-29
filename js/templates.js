// js/templates.js
// Este arquivo contém os templates pedaços de HTML em forma de string.
// Cada rota início, sobre, projetos, faça parte, doe tem seu próprio bloco.
export const templates = {
  inicio: `
    <section class="hero">
      <h2 class="mb-2">Nossa missão é ajudar comunidades carentes através de projetos sociais, educação e saúde.</h2>
      <figure class="hero-media">
        <img src="../imagens/logo.jpg" alt="Marca da ONG Esperança">
      </figure>
      <p>Atuamos com iniciativas contínuas focadas em alimentação, educação e saúde.</p>
    </section>
  `,
  sobre: `
    <section class="hero">
    <div class="hero__text">
      <h2>Nossa História</h2>
      <p>A ONG Esperança nasceu em 2010 com o objetivo de apoiar comunidades carentes, levando educação, saúde e alimentação a famílias em situação de vulnerabilidade.</p>
    </div>
    
  </section>
<img class="hero__img" src="../imagens/logo.jpg" alt="Logo da ONG Esperança", style="max-width:500px;padding:20px;">
  <section>
    <h2>Missão, Visão e Valores</h2>
    <p><strong>Missão:</strong> Promover inclusão social por meio de projetos que transformem vidas.</p>
    <p><strong>Visão:</strong> Ser referência nacional em iniciativas sociais sustentáveis.</p>
    <p><strong>Valores:</strong> Solidariedade, transparência, respeito e inovação.</p>
  </section>

  <section>
    <h2>Nossa Equipe</h2>
    <p>Contamos com voluntários e profissionais comprometidos em diferentes áreas, como saúde, educação, administração e assistência social.</p>
    <img src="../imagens/equipe.jpg" alt="Equipe de voluntários">
  </section>
  `,
  projetos: `
  <h2 class="center mb-2">Nossos Projetos</h2>
    <section class="projetos-container projetos-grid">
      
      <article class="projeto">
        <img src="../imagens/projeto1.jpg" alt="Distribuição de cestas básicas">
        <h3>Projeto Alimentar</h3>
        <p>Distribuição de cestas básicas e refeições quentes para famílias em situação de vulnerabilidade</p>
      </article>
      <article class="projeto">
        <img src="../imagens/projeto2.jpg" alt="Reforço Escolar">
        <h3>Projeto Educação</h3>
        <p>Oficinas educativas e reforço escolar para crianças e jovens da comunidade</p>
      </article>
      <article class="projeto">
        <img src="../imagens/projeto3.jpg" alt="Saúde na Comunidade">
        <h3>Projeto Saúde</h3>
        <p>Atendimentos médicos gratuitos e campanhas de vacinação para comunidades carentes</p>
      </article>
    </section>
  `,
  facaparte: `
    <section class="form-container">
  <h3>Formulário de Cadastro</h3>
  <form id="form-vol" novalidate>
    <label for="nome">Nome Completo</label>
    <input id="nome" name="nome" required>

    <label for="email">E-mail</label>
    <input id="email" name="email" type="email" required>

    <label for="cpf">CPF</label>
    <input id="cpf" name="cpf" placeholder="000.000.000-00" required>

    <label for="telefone">Telefone</label>
    <input id="telefone" name="telefone" placeholder="(00) 00000-0000" required>

    <label for="nascimento">Data de Nascimento</label>
    <input id="nascimento" name="nascimento" type="date" required>

    <label for="cep">CEP</label>
    <input id="cep" name="cep" placeholder="00000-000" required>
    <small style="display:block;margin:-8px 0 10px;color:#555">
      Informe apenas o CEP. Cidade e Estado serão preenchidos automaticamente.
    </small>

    <label for="cidade">Cidade</label>
    <input id="cidade" name="cidade" readonly required>

    <label for="estado">Estado</label>
    <input id="estado" name="estado" readonly required>

    <label for="endereco">Endereço (Logradouro e Número)</label>
    <input id="endereco" name="endereco" required>

    <label for="projeto">Projeto</label>
    <select id="projeto" name="projeto" required>
      <option value="">Selecione...</option>
      <option>Projeto Alimentar</option>
      <option>Projeto Educação</option>
      <option>Projeto Saúde</option>
      <option>Projeto Moradia</option>
      <option>Projeto Meio Ambiente</option>
      <option>Projeto Cultura</option>
    </select>

    <button class="btn" type="submit">Enviar</button>
  </form>
</section>

<!-- Importa e inicializa o JS -->
<script type="module">
  import { mountForms } from "../js/forms.js";
  mountForms("facaparte", document);
</script>

  `,
  doe: `
    <section class="form-container">
  <h3>Formulário de Doação</h3>
  <form id="form-doe" novalidate>
    <label for="nome">Nome Completo</label>
    <input id="nome" name="nome" required>

    <label for="email">E-mail</label>
    <input id="email" name="email" type="email" required>

    <label for="valor">Valor da Doação</label>
    <select id="valor" name="valor" required>
      <option value="">Selecione...</option>
      <option value="50">R$ 50,00</option>
      <option value="100">R$ 100,00</option>
      <option value="200">R$ 200,00</option>
      <option value="500">R$ 500,00</option>
    </select>

    <button class="btn" type="submit">Doar</button>
  </form>
</section>

  `
};
