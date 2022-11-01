
const SERVER = 'http://localhost:8080';

async function detalhesAnuncio(){

  let anuncio = null;

  const detalhesAnuncio = document.querySelector('.anuncio');
  
  anuncio = await buscarAnuncio();
  
    const card = `
      <div class="anuncio__imagem">
        ${anuncio.urlFoto != "" ? (
            `<img src="${anuncio.urlFoto}" alt="${anuncio.descricaoFoto}"/>`
          )
          :
          (
            `<img src="../img/empty.png" alt="${anuncio.nomeDoTitulo}"/>`
          )
        }
      </div>
      <div class="anuncio__detalhes">
        <strong class="anuncio__titulo">
            ${anuncio.nomeDoTitulo}
        </strong>
        <span class="anuncio__preco">
            ${anuncio.valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
        </span>
        <span class="anuncio__autor">
            Anunciante: <strong>${anuncio.usuario.apelido}</strong>
        </span>
        <span class="anuncio__celular">
            ${anuncio.usuario.celular}
        </span>
        <span class="anuncio__descricao">
         ${anuncio.descricao}
        </span>

        <a href="tel:${anuncio.usuario.celular}" class="anuncio__botao">
            Falar com anunciante
        </a>
      
      </div>`;

    detalhesAnuncio.innerHTML = card;
}

async function buscarAnuncio() {
    //https://www.sitepoint.com/get-url-parameters-with-javascript/
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    console.log("ID: ", id);

    const data = await fetch(`${SERVER}/anuncios/${id}`);
    const json = await data.json();
    return json;
}
