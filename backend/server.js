const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Import and use recipes route
const recipesRouter = require('./routes/recipes');
app.use('/api/recipes', recipesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});