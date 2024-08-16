const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/lost-and-found', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// 모델 정의
const BoardSchema = new mongoose.Schema({
  subject: String,
  writer: String,
  content: String,
  date: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  password: String,
  image: String,
  recovered: { type: Boolean, default: false },
  recoveredStudentID: String,
  recoveredName: String,
});

const Board = mongoose.model('Board', BoardSchema);

// API 엔드포인트
app.get('/api/boards', async (req, res) => {
  const boards = await Board.find();
  res.json(boards);
});

app.post('/api/boards', async (req, res) => {
  const newBoard = new Board(req.body);
  await newBoard.save();
  res.json(newBoard);
});

app.put('/api/boards/:id', async (req, res) => {
  const board = await Board.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(board);
});

app.delete('/api/boards/:id', async (req, res) => {
  await Board.findByIdAndDelete(req.params.id);
  res.json({ message: 'Board deleted' });
});

// HTML 파일 라우팅
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/board/write', (req, res) => {
  res.sendFile(path.join(__dirname, '/board/write.html'));
});

app.get('/board/list', (req, res) => {
  res.sendFile(path.join(__dirname, '/board/list.html'));
});

app.get('/board/view', (req, res) => {
  res.sendFile(path.join(__dirname, '/board/view.html'));
});

app.get('/board/modify', (req, res) => {
  res.sendFile(path.join(__dirname, '/board/modify.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
