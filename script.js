document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const blacklist = [
        { email: "cliente1@gmail.com", cpf: "123.456.789-00", telefone: "(11) 99999-8888" },
        { email: "cliente2@gmail.com", cpf: "987.654.321-00", telefone: "(22) 88888-7777" },
        { email: "cliente1@gmail.com", cpf: "123.456.789-00", telefone: "(11) 99999-8888" },
        { email: "cliente3@gmail.com", cpf: "997.654.321-00", telefone: "(22) 88988-7777" },
        { email: "cliente4@gmail.com", cpf: "977.654.321-00", telefone: "(22) 84488-7777" },
        { email: "cliente5@gmail.com", cpf: "987.654.321-00", telefone: "(22) 82288-7777" },
        { email: "cliente6@gmail.com", cpf: "967.654.321-00", telefone: "(22) 88388-7777" },
        { email: "cliente7@gmail.com", cpf: "957.654.321-00", telefone: "(22) 88886-7777" },
    ];

    let found = false;
    for (const client of blacklist) {
        if ((email && client.email.toLowerCase() === email.toLowerCase()) ||
            (cpf && client.cpf === cpf) ||
            (telefone && client.telefone === telefone)) {
            found = true;
            displayResult(client);
            break;
        }
    }
    
    if (!found) {
        displayError("Cliente não encontrado na Blacklist.");
    }
});

document.getElementById('showAll').addEventListener('click', function() {
    const blacklist = [
        { email: "cliente1@gmail.com", cpf: "123.456.789-00", telefone: "(11) 99999-8888" },
        { email: "cliente2@gmail.com", cpf: "987.654.321-00", telefone: "(22) 88888-7777" },
    ];

    const resultDiv = document.getElementById('result');
    let html = '<p id="success-message">Todos os clientes da Blacklist:</p>';
    for (const client of blacklist) {
        html += `
            <ul>
                <li>E-mail: ${client.email}</li>
                <li>CPF: ${client.cpf}</li>
                <li>Telefone: ${client.telefone}</li>
            </ul>
        `;
    }
    resultDiv.innerHTML = html;
});

function displayResult(client) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p id="success-message">Cliente encontrado na Blacklist:</p>
        <ul>
            <li>E-mail: ${client.email}</li>
            <li>CPF: ${client.cpf}</li>
            <li>Telefone: ${client.telefone}</li>
        </ul>
    `;
}

function displayError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p id="error-message">${message}</p>`;
}


