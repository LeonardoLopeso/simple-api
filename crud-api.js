const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Banco de dados em memória (para teste)
let users = [
    { id: 1, name: 'João Silva', email: 'joao@example.com', phone: "(11) 1234-5678", address: "Rua A, 123", city: "Cidade A", state: "Estado A", country: "Pais A", zipCode: "12345-678" },
    { id: 2, name: 'Maria Souza', email: 'maria@example.com', phone: "(21) 9876-5432", address: "Rua B, 456", city: "Cidade B", state: "Estado B", country: "Pais B", zipCode: "54321-987" },
];

// Rota de teste
app.get('/', (req, res) => {
    res.send('Server is running...');
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
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        zipCode: req.body.zipCode
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
    user.phone = req.body.phone;
    user.address = req.body.address;
    user.city = req.body.city;
    user.state = req.body.state;
    user.country = req.body.country;
    user.zipCode = req.body.zipCode;

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