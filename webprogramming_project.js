const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid').v4;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// 간단한 메모리 데이터베이스 구현
let users = [];

// 회원가입
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    // 사용자가 이미 존재하는지 확인
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = { id: uuid(), username, password };
    users.push(newUser);
    res.json({ success: true, user: { id: newUser.id, username: newUser.username } });
});

// 로그인
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ success: true, user: { id: user.id, username: user.username } });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
