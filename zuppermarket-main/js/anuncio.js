const form = document.getElementById("cadastroAnuncio")

form.addEventListener('submit', event => { // ouvir até o submit ser acionado
    event.preventDefault();

    const message = document.querySelector('.form__message');
    message.innerText = '';
    const btnSubmit = document.querySelector('.form__submit');
    btnSubmit.setAttribute('disabled', true);
    btnSubmit.innerText = 'Cadastrando...';

    const formData = new FormData(form); // Pega o formulário e java em uma variável 
    const data = Object.fromEntries(formData); // Se torna em objeto 

    data.seNegociavel = document.querySelector('input[name="seNegociavel"]').checked;
    data.quantidade = Number(data.quantidade)
    data.valor = Number(data.valor)
    data.usuarioId = 1;
    console.log(data);

    fetch("http://localhost:8080/anuncios", {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res) => {
      console.log('Resposta: ', res);
      if(res.ok){
        message.classList.remove('form__message--erro');
        message.classList.add('form__message--sucesso');
        message.innerText = 'Anúncio cadastrado com sucesso.'
      }
      return res.json()
    })
    .then((data) => {
      if(data.status === 500){
        message.classList.remove('form__message--sucesso');
        message.classList.add('form__message--erro');
        message.innerText = data.message;
      }
    })
    .finally(() => {
      btnSubmit.removeAttribute('disabled');
      btnSubmit.innerText = 'Cadastrar';
    })
});
