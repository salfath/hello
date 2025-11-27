const express = require('express');
const app = express();

// Port default 3000 sesuai panduan praktikum
const PORT = process.env.PORT || 3000;

// 1. Endpoint Health Check (WAJIB ADA)
// Ini yang akan dipanggil oleh curl localhost:3000/health di workflow GitHub
app.get('/health', (req, res) => {
    // Mengembalikan status 200 OK
    res.status(200).json({
        status: 'UP',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// 2. Endpoint Utama
app.get('/', (req, res) => {
    res.send(`
        <h1>Halo dari Server! 🚀</h1>
        <p>Aplikasi berjalan lancar.</p>
        <p>Waktu Server: ${new Date().toLocaleString()}</p>
        <p>Versi: 1.0.0</p>
    `);
});

// Jalankan Server
const server = app.listen(PORT, () => {
    console.log(`✅ Server berjalan di http://localhost:${PORT}`);
    console.log(`✅ Health check tersedia di http://localhost:${PORT}/health`);
});

// (Opsional) Graceful Shutdown untuk Systemd
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});