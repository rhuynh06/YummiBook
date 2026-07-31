"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const recipes_1 = __importDefault(require("./routes/recipes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5050;
const allowedOrigins = [
    'http://localhost:5173',
    'https://rhuynh06.github.io'
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin))
            return callback(null, true);
        callback(new Error('Not allowed by CORS'));
    }
}));
app.use(express_1.default.json());
app.get('/', (_, res) => res.send('Working'));
app.use('/api/recipes', recipes_1.default);
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
