import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname, {
  maxAge: '1h',
  etag: false
}));

// Root route - serve main HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Kopi Rakyat App.dc.html'));
});

// Catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Kopi Rakyat App.dc.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
});

const server = app.listen(PORT, () => {
  console.log(`🍵 Kopi Rakyat App running on http://localhost:${PORT}`);
  console.log(`📂 Serving files from: ${__dirname}`);
});

// Handle uncaught errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});
