// ================================================
// controla os formulários da ONG.
// - Máscaras simples CPF, telefone, CEP
// - Validação básica dos campos
// - Consulta à API ViaCEP
// ================================================

export function mountForms(route, root = document) {
  // Inicializa os formulários de acordo com a rota
  if (route === 'facaparte') setupVolForm(root); // cadastro voluntário
  if (route === 'doe') setupDoeForm(root);       // doação
}

/* ============================================================
   - Aplica máscaras de input
   - Busca CEP e preenche cidade/estado automaticamente
   - Valida dados antes de enviar
   ============================================================ */
function setupVolForm(root) {
  const f = root.querySelector('#form-vol');
  if (!f) return; // se não existir o form, sai

  // Referências para os campos
  const cpf = f.querySelector('#cpf');
  const tel = f.querySelector('#telefone');
  const cep = f.querySelector('#cep');

  // ----- Máscaras -------
  // CPF no formato 000.000.000-00
  cpf.addEventListener('input', () => {
    const d = onlyDigits(cpf.value).slice(0, 11);
    cpf.value = d
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d{1,2})$/, '.$1-$2');
  });

  // Telefone no formato (00) 00000-0000 ou (00) 0000-0000
  tel.addEventListener('input', () => {
    const d = onlyDigits(tel.value).slice(0, 11);
    if (d.length <= 10) {
      tel.value = d
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d{1,4})$/, '$1-$2');
    } else {
      tel.value = d
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
    }
  });

  // CEP no formato 00000-000
  cep.addEventListener('input', () => {
    const d = onlyDigits(cep.value).slice(0, 8);
    cep.value = d.replace(/^(\d{5})(\d{1,3})$/, '$1-$2');
  });

  // Quando o campo perde foco, busca cidade e estado
  cep.addEventListener('blur', async () => {
    const d = onlyDigits(cep.value);
    if (d.length !== 8) return;
    try {
      const data = await findCEP(d);
      if (data && !data.erro) {
        root.querySelector('#cidade').value = data.localidade || '';
        root.querySelector('#estado').value = data.uf || '';
      } else {
        setErr(cep, 'CEP não encontrado.');
      }
    } catch {
      setErr(cep, 'Erro ao consultar o CEP.');
    }
  });

  // --- Validação + envio ----
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors(f);
    const ok = validateVol(f);
    if (ok) {
      showAlert('Obrigado!', 'Seu cadastro foi enviado com sucesso. 💚');
      f.reset();
      const cidade = f.querySelector('#cidade');
      const estado = f.querySelector('#estado');
      if (cidade) cidade.value = '';
      if (estado) estado.value = '';
    }
  });
}

/* ====== FORMULÁRIO DE DOAÇÃO (Doe)
   - Valida nome, e-mail e valor selecionado
   - Suporta optional #valorCustom e #metodo se existirem
================================================ */
function setupDoeForm(root) {
  const f = root.querySelector('#form-doe');
  if (!f) return;

  const nome        = f.querySelector('#nome');
  const email       = f.querySelector('#email');
  const valorSel    = f.querySelector('#valor');
  const valorCustom = f.querySelector('#valorCustom'); // opcional
  const metodo      = f.querySelector('#metodo');      // opcional

  // se algum essencial não existir, sai
  if (!nome || !email || !valorSel) return;

  // limpa erros ao mexer (mesmo UX do cadastro)
  [nome, email, valorSel, valorCustom, metodo].filter(Boolean).forEach(el => {
    el.addEventListener('input',  () => clearErrors(f));
    el.addEventListener('change', () => clearErrors(f));
    el.addEventListener('blur',   () => clearErrors(f));
  });

  f.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors(f);
    let ok = true;

    // Nome
    if (!nome.value.trim() || nome.value.trim().length < 3) {
      setErr(nome, 'Informe seu nome completo (mínimo 3 caracteres).');
      ok = false;
    }

    // E-mail
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email.value)) {
      setErr(email, 'E-mail inválido.');
      ok = false;
    }

    // Valor: selecionado OU (se existir) custom > 0
    const valSelect = Number(valorSel.value || 0);
    const valCustomNum = valorCustom ? Number(valorCustom.value || 0) : 0;
    if (!(valSelect > 0 || valCustomNum > 0)) {
      setErr(valorSel, 'Escolha um valor de doação.');
      if (valorCustom) setErr(valorCustom, 'Digite um valor válido.');
      ok = false;
    }

    // Método (se existir)
    if (metodo && !metodo.value) {
      setErr(metodo, 'Escolha o método de pagamento.');
      ok = false;
    }

    if (ok) {
      showAlert('Obrigado!', 'Sua doação foi registrada com sucesso. 💚');
      f.reset();
    }
  });
}

/* ==========UTILITÁRIOS====== */

// Busca CEP usando API ViaCEP
async function findCEP(cepDigits) {
  const r = await fetch(`https://viacep.com.br/ws/${cepDigits}/json/`);
  if (!r.ok) throw new Error('HTTP');
  return r.json();
}

// Exibe erro logo abaixo do campo
function setErr(el, msg) {
  el.classList.add('is-invalid');

  // Se já existir uma mensagem logo após o campo, reaproveita
  let s = el.nextElementSibling;
  if (!s || !s.classList || !s.classList.contains('field-error')) {
    s = document.createElement('small');
    s.className = 'field-error';
    s.style.color = '#b00020';
    s.style.display = 'block';
    s.style.marginTop = '4px';
    // insere imediatamente depois do input
    el.insertAdjacentElement('afterend', s);
  }

  s.textContent = msg;
}


// Limpa erros
function clearErrors(scope = document) {
  scope.querySelectorAll('.is-invalid').forEach(e => e.classList.remove('is-invalid'));
  scope.querySelectorAll('.field-error').forEach(e => e.remove());
}

// Mostra modal de alerta ou fallback para alert
function showAlert(titulo, mensagem) {
  const wrap = document.querySelector('#alerta');
  if (!wrap) { alert(`${titulo}\n${mensagem}`); return; }
  wrap.style.display = 'flex';
  wrap.querySelector('h3').textContent = titulo;
  wrap.querySelector('p').textContent = mensagem;
  const btn = wrap.querySelector('button');
  btn.onclick = () => { wrap.style.display = 'none'; };
}

// Calcula idade a partir da data de nascimento
function calcAge(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return 0;
  const hoje = new Date();
  let age = hoje.getFullYear() - d.getFullYear();
  const m = hoje.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < d.getDate())) age--;
  return age;
}

// Apenas dígitos
function onlyDigits(v) {
  return String(v || '').replace(/\D/g, '');
}

// Validação de CPF simples checando dígitos verificadores
function isValidCPF(cpf) {
  if (!cpf || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += Number(cpf[i]) * (10 - i);
  let d1 = (soma * 10) % 11;
  if (d1 === 10) d1 = 0;
  if (d1 !== Number(cpf[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += Number(cpf[i]) * (11 - i);
  let d2 = (soma * 10) % 11;
  if (d2 === 10) d2 = 0;
  return d2 === Number(cpf[10]);
}

/* ===Validação do formulário de voluntário======= */
function validateVol(f) {
  let ok = true;

  const nome = f.querySelector('#nome');
  const email = f.querySelector('#email');
  const cpf = f.querySelector('#cpf');
  const tel = f.querySelector('#telefone');
  const nasc = f.querySelector('#nascimento');
  const cep = f.querySelector('#cep');
  const cidade = f.querySelector('#cidade');
  const estado = f.querySelector('#estado');
  const endereco = f.querySelector('#endereco');
  const projeto = f.querySelector('#projeto');

  if (!nome.value.trim() || nome.value.trim().length < 3) {
    setErr(nome, 'Preencha o nome completo.');
    ok = false;
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email.value)) {
    setErr(email, 'E-mail inválido.');
    ok = false;
  }

  const cpfDigits = onlyDigits(cpf.value);
  if (!(cpfDigits.length === 11 && isValidCPF(cpfDigits))) {
    setErr(cpf, 'CPF inválido. Use o formato 000.000.000-00.');
    ok = false;
  }

  const phoneDigits = onlyDigits(tel.value);
  if (!(phoneDigits.length === 10 || phoneDigits.length === 11)) {
    setErr(tel, 'Telefone inválido. Use o formato (00) 00000-0000.');
    ok = false;
  }

  if (!nasc.value || calcAge(nasc.value) < 16) {
    setErr(nasc, 'É necessário ter pelo menos 16 anos.');
    ok = false;
  }

  const cepDigits = onlyDigits(cep.value);
  if (cepDigits.length !== 8) {
    setErr(cep, 'CEP inválido. Use o formato 00000-000.');
    ok = false;
  }

  if (!cidade.value.trim()) {
    setErr(cidade, 'Campo preenchido automaticamente pelo CEP.');
    ok = false;
  }

  if (!estado.value.trim()) {
    setErr(estado, 'Campo preenchido automaticamente pelo CEP.');
    ok = false;
  }

  if (!endereco.value.trim() || endereco.value.trim().length < 5) {
    setErr(endereco, 'Informe logradouro e número.');
    ok = false;
  }

  if (!projeto.value) {
    setErr(projeto, 'Selecione um projeto.');
    ok = false;
  }

  return ok;
}
