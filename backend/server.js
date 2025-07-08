const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5050;

const allowedOrigins = [
  "http://localhost:5173",
  "https://rhuynh06.github.io"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  }
}));

app.use(express.json());

// for debugging purposes:
app.get('/', (req, res) => {
  res.send('Working');
});

const recipesRouter = require('./routes/recipes');
app.use('/api/recipes', recipesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
