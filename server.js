import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files dengan header yang benar
app.use((req, res, next) => {
  if (req.path.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  }
  if (req.path.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css; charset=utf-8');
  }
  next();
});

app.use(express.static(__dirname, { 
  index: false,
  etag: false 
}));

// Serve HTML
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.sendFile(path.join(__dirname, 'Kopi Rakyat App.dc.html'));
});

// Serve all files with HTML as fallback
app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.sendFile(path.join(__dirname, 'Kopi Rakyat App.dc.html'));
});

const server = app.listen(PORT, () => {
  console.log(`🍵 Kopi Rakyat App running on http://localhost:${PORT}`);
});

process.on('uncaughtException', (err) => {
  console.error('Error:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Rejection:', err);
});
