
const SERVER = 'http://localhost:8080';

async function listarAnuncios(){

  let anuncios = null;

  const listaAnuncios = document.querySelector('.anuncios__lista');
  listaAnuncios.innerHTML = '';

  anuncios = await buscarAnuncios();
  
  console.log('Anuncios: ', anuncios);

  anuncios.forEach(anuncio => {
    const card = `
    <article class="card">
      <strong class="card__titulo">
        ${anuncio.nomeDoTitulo}
      </strong>
      <span class="card__preco">
        ${anuncio.valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
      </span>
      <a href="/anuncio.html?id=${anuncio.id}" class="card__imagem">
        ${anuncio.urlFoto != "" ? (
            `<img src="${anuncio.urlFoto}" alt="${anuncio.descricaoFoto}"/>`
          )
          :
          (
            `<img src="../img/empty.png" alt="${anuncio.nomeDoTitulo}"/>`
          )
        }
      </div>
      <span class="card__autor">
        ${anuncio.usuario.apelido}
      </span>
      <a href="/anuncio.html?id=${anuncio.id}" class="card__detalhes">
        Ver mais detalhes
      </a>
    </article>`;
    listaAnuncios.innerHTML += card;
  });
}

async function buscarAnuncios() {
  
  const categoria = document.getElementById('categoria').value ? document.getElementById('categoria').value : '';
  console.log('Categoria: ', categoria)
  const status = document.getElementById('status').value ? document.getElementById('status').value : '';
  console.log('Status: ', status)

  const data = await fetch(`${SERVER}/anuncios?categoria=${categoria}&status=${status}`);
  const json = await data.json();
  return json;
}
