const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// MongoDB 연결 설정
mongoose.connect('mongodb://localhost:27017/school-board', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// 스키마 및 모델 설정
const boardSchema = new mongoose.Schema({
  subject: String,
  writer: String,
  content: String,
  password: String,
  image: String,
  date: { type: Date, default: Date.now }
});

const Board = mongoose.model('Board', boardSchema);

// 게시물 생성 API
app.post('/api/boards', async (req, res) => {
  try {
    const newBoard = new Board(req.body);
    await newBoard.save();
    res.status(201).json(newBoard);
  } catch (error) {
    console.error('Error creating board:', error);
    res.status(500).json({ message: 'Failed to create board' });
  }
});

// 게시물 목록 조회 API
app.get('/api/boards', async (req, res) => {
  try {
    const boards = await Board.find().sort({ date: -1 });
    res.json(boards);
  } catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({ message: 'Failed to fetch boards' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
