window.onload = function() {
  setTimeout(function() {
      document.getElementById('splash').style.display = 'none';
  }, 2000);
};

let currentPage = 1;
let totalPages = 1;

function normalizeCpf(cpf){
  return cpf.replace(/\D/g, '');
}

function displayResult(clients){
  const resultDiv = document.getElementById('result');
  let html = '<p id="success-message">Clientes encontrados na Blacklist:</p>';
  for (const client of clients) {
    const formattedDate = moment(client.data_insercao).format('DD/MM/YYYY HH:mm:ss');
    html += `
    <table>
        <tr><td>E-mail:</td><td>${client.email || 'Não informado'}</td></tr>
        <tr><td>CPF:</td><td>${client.cpf || 'Não informado'}</td></tr>
        <tr><td>Telefone:</td><td>${client.telefone}</td></tr>
        <tr><td>Data de inclusão:</td><td>${formattedDate}</td></tr>
        <tr><td>Data de expiração:</td><td>4000-12-31</td></tr>
    </table>
    `;
  }
  resultDiv.innerHTML = html;
}

function displayError(message){
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<p id="error-message">${message}</p>`;
}

function fetchPage(page) {
fetch(`http://localhost:3000/blacklist?page=${page}`)
  .then(response => response.json())
  .then(data => {
    const blacklist = data.clients;
    totalPages = data.totalPages;

    const resultDiv = document.getElementById('result');
    let html = '<p id="success-message">Clientes da Blacklist na página ' + page + ':</p>'
    for (const client of blacklist) {
      html += `
      <table>
          <tr><td>E-mail:</td><td>${client.email || 'Não informado'}</td></tr>
          <tr><td>CPF:</td><td>${client.cpf || 'Não informado'}</td></tr>
          <tr><td>Telefone:</td><td>${client.telefone}</td></tr>
          <tr><td>Data de inclusão:</td><td>${client.data_insercao}</td></tr>
          <tr><td>Data de expiração:</td><td>4000-12-31</td></tr>
      </table>
      `;
    }

    resultDiv.innerHTML = html;

  // Atualiza o estado dos botões de navegação
    document.getElementById('prevPage').disabled = page <= 1;
    document.getElementById('nextPage').disabled = page >= totalPages;
    document.getElementById('firstPage').disabled = page <= 1;
    document.getElementById('lastPage').disabled = page >= totalPages;
  });
}

document.getElementById('searchForm').addEventListener('submit', function(event) {
event.preventDefault();

const email = document.getElementById('email').value.trim().toLowerCase();
const cpf = normalizeCpf(document.getElementById('cpf').value.trim());
const telefone = document.getElementById('telefone').value.trim().replace(/\D/g, '');
const selectedDate = document.getElementById('dataInclusao').value;


let formattedDate = '';
if (selectedDate) {
  formattedDate = moment(selectedDate).format('YYYY-MM-DD');
}

console.log(`Email: ${email}`);
console.log(`CPF: ${cpf}`);
console.log(`Telefone: ${telefone}`);
console.log(`Data: ${formattedDate}`); // Se uma data for selecionada

// Oculta os botões de navegação
document.getElementById('prevPage').style.display = 'none';
document.getElementById('nextPage').style.display = 'none';
document.getElementById('firstPage').style.display = 'none';
document.getElementById('lastPage').style.display = 'none';

let url = `http://localhost:3000/blacklist/search?email=${email}&cpf=${cpf}&telefone=${telefone}`;
if (selectedDate) {
  url += `&dataInclusao=${formattedDate}`;
}

console.log(`URL: ${url}`);

fetch(url)
  .then(response => response.json())
  .then(blacklist => {
    if (blacklist.length > 0) {
      displayResult(blacklist);
    } else {
      displayError("Cliente não encontrado na Blacklist.");
    }
  });
});

document.getElementById('showAll').addEventListener('click', function() {
fetchPage(currentPage);
document.getElementById('prevPage').style.display = 'inline';
document.getElementById('nextPage').style.display = 'inline';
document.getElementById('firstPage').style.display = 'inline';
document.getElementById('lastPage').style.display = 'inline';
});

document.getElementById('nextPage').addEventListener('click', function() {
if (currentPage < totalPages) {
  currentPage++;
  fetchPage(currentPage);
}
});

document.getElementById('prevPage').addEventListener('click', function() {
if (currentPage > 1) {
  currentPage--;
  fetchPage(currentPage);
}
});

document.getElementById('firstPage').addEventListener('click', function() {
currentPage = 1;
fetchPage(currentPage);
});

document.getElementById('lastPage').addEventListener('click', function() {
currentPage = totalPages;
fetchPage(currentPage);
});
