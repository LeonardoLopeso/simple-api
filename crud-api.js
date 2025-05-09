const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Banco de dados em memória (para teste)
let users = [
    { id: 1, name: 'João Silva', email: 'joao@example.com' },
    { id: 2, name: 'Maria Souza', email: 'maria@example.com' }
];

// Rota de teste
app.get('/', (req, res) => {
    res.send('API CRUD de Teste - Funcionando!');
});

// GET all users
app.get('/users', (req, res) => {
    res.json(users);
});

// GET user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('Usuário não encontrado.');
    res.json(user);
});

// POST create new user
app.post('/users', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(user);
    const data = {
        message: 'Usuário criado com sucesso!',
        user
    }
    res.status(201).json(data);
});

// PUT update user
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('Usuário não encontrado.');

    user.name = req.body.name;
    user.email = req.body.email;

    const data = {
        message: 'Usuário atualizado com sucesso!',
        user
    }

    res.json(data);
});

// DELETE user
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('Usuário não encontrado.');

    const deletedUser = users.splice(userIndex, 1);
    const data = {
        message: 'Usuário excluído com sucesso!',
        deletedUser
    }
    res.json(data);
});

// Iniciar o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});