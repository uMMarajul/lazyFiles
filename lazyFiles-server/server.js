// server/index.js
const express = require('express');
const app = express();
const PORT = 5171;

app.get('/', (req, res) => {
    res.json({ message: "Hello from the backend!" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});