document.getElementById('show-books-btn').addEventListener('click', function () {
    fetch('https://api-aula.up.railway.app/livros')
        .then(response => response.json())
        .then(data => {
            const booksList = document.getElementById('books-list');
            booksList.innerHTML = '';

            const ul = document.createElement('ul');
            data.forEach(book => {
                const li = document.createElement('li');
                li.textContent = `${book.title}: ${book.description}`;
                ul.appendChild(li);
            });

            booksList.appendChild(ul);
        })
        .catch(error => console.error('Erro ao buscar livros:', error));
});

//Adicionar livro
document.getElementById('register-btn').addEventListener('click', function () {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const message = document.getElementById('message');

    if (title && description) {
        fetch('https://api-aula.up.railway.app/livros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        })
            .then(response => response.json())
            .then(data => {
                message.textContent = `Você cadastrou o título "${title}"`;
                message.style.color = 'green';

                document.getElementById('title').value = '';
                document.getElementById('description').value = '';
            })
            .catch(error => {
                message.textContent = 'Erro ao cadastrar livro';
                message.style.color = 'red';
                console.error('Erro ao adicionar livro:', error);
            });
    } else {
        message.textContent = 'Formulário inválido';
        message.style.color = 'red';
    }
});
