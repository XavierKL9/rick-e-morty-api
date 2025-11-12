const API_URL = 'https://rickandmortyapi.com/api/character';
let currentPage = 1;
let totalPages = 1;

window.addEventListener('DOMContentLoaded', () => {
    buscarPersonagensAsync(currentPage); // Passa a página atual
    criarBotoesPaginacao(); // Cria os botões de navegação
});

async function buscarPersonagensAsync(page) {
    try {
        const response = await fetch(`${API_URL}?page=${page}`);
        if (!response.ok) {
            throw new Error('Erro HTTP: ' + response.status);
        }
        const data = await response.json();
        totalPages = data.info.pages; 
        exibirPersonagens(data.results);
        atualizarBotoesPaginacao(); 
    } catch (error) {
        console.error('Falha ao buscar personagens:', error);
    }
}

function exibirPersonagens(personagens) {
    const container = document.getElementById('personagens-container');

    // Usamos 'map' para transformar CADA personagem em uma string HTML
    const htmlPersonagens = personagens.map(personagem => {
        return `
            <article class="card">
                <img src="${personagem.image}" alt="${personagem.name}">
                <div class="card-info">
                    <h3>${personagem.name}</h3>
                    <p>Status: ${personagem.status}</p>
                    <p>Espécie: ${personagem.species}</p>
                </div>
            </article>
        `;
    }).join(''); // Junta todas as strings em uma só

    // Insere o HTML gigante no container de uma vez
    container.innerHTML = htmlPersonagens;
}

function criarBotoesPaginacao() {
    const paginationContainer = document.createElement('div');
    paginationContainer.id = 'pagination-container';
    paginationContainer.innerHTML = `
        <button id="prev-btn">voltar</button>
        <span id="page-info">Página ${currentPage} de ${totalPages}</span>
        <button id="next-btn">proxima pagina</button>
    `;
    document.body.appendChild(paginationContainer); 

    // Adiciona event listeners aos botões
    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            buscarPersonagensAsync(currentPage);
        }
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            buscarPersonagensAsync(currentPage);
        }
    });
}

function atualizarBotoesPaginacao() {
    const pageInfo = document.getElementById('page-info');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (pageInfo) pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}
