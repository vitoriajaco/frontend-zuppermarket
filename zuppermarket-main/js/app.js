
const SERVER = 'http://localhost:8080';

async function listarAnuncios(){

  let anuncios = null;

  const categoria = document.getElementById('categoria').value;
  console.log(categoria)

  const status = document.getElementById('status').value;
  console.log(status)

  const listaAnuncios = document.querySelector('.anuncios__lista');
  
  anuncios = await buscarAnuncios();
  
  anuncios.forEach(anuncio => {
    console.log(anuncio)
    const card = `
    <article class="card">
      <strong class="card__titulo">
        ${anuncio.nomeDoTitulo}
      </strong>
      <span class="card__preco">
        ${anuncio.valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
      </span>
      <div class="card__imagem">
        <img src="https://picsum.photos/400" alt="${anuncio.descricaoFoto}"/>
      </div>
      <p class="card__description">
        ${anuncio.descricao}
      </p>
      <span class="card__autor">
        ${anuncio.usuario.apelido}
      </span>
      <a href="#" class="card__detalhes">
        Ver mais detalhes
      </a>
    </article>`;
    listaAnuncios.innerHTML += card;
  });

}

async function buscarAnuncios() {
  const data = await fetch(`${SERVER}/anuncios`);
  const json = await data.json();
  return json;
}
