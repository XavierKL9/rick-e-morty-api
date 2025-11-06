const API_URL = 'https://rickandmortyapi.com/api/character';

window.addEventListener('DOMContentLoaded', () => {
    buscarPersonagensAsync(); // Chamamos a versão async
});

async function buscarPersonagensAsync() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Erro HTTP: ' + response.status);
        }
        const data = await response.json();
        exibirPersonagens(data.results); // Mesma função de antes!
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