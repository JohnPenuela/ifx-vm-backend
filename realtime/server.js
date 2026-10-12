const http = require('http');
const express = require('express');
const cors = require('cors');
const { WebSocketServer, WebSocket } = require('ws');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);
    console.log(`[IFX-RealTime] Cliente conectado. Total clientes activos: ${clients.size}`);

    ws.send(JSON.stringify({
        event: 'system:connected',
        payload: {
            message: 'Conectado al cluster de eventos en tiempo real IFX Networks',
            clientsCount: clients.size,
            timestamp: new Date().toISOString()
        }
    }));

    ws.on('close', () => {
        clients.delete(ws);
        console.log(`[IFX-RealTime] Cliente desconectado. Total clientes activos: ${clients.size}`);
    });

    ws.on('error', (err) => {
        console.error('[IFX-RealTime] Error en socket:', err.message);
        clients.delete(ws);
    });
});

// Endpoint utilizado por Laravel para emitir eventos
app.post('/broadcast', (req, res) => {
    const { event, payload, timestamp } = req.body;
    const message = JSON.stringify({
        event: event || 'vm:event',
        payload: payload || {},
        timestamp: timestamp || new Date().toISOString()
    });

    let deliveredCount = 0;
    for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
            deliveredCount++;
        }
    }

    console.log(`[IFX-RealTime] Evento broadcast '${event}' emitido a ${deliveredCount} clientes.`);
    return res.json({ status: 'ok', deliveredTo: deliveredCount });
});

app.get('/health', (req, res) => {
    res.json({
        service: 'IFX Networks Real-Time Event Hub',
        status: 'healthy',
        activeClients: clients.size,
        uptime: process.uptime()
    });
});

const PORT = process.env.PORT || 6001;
server.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`  IFX Real-Time WebSocket Hub activo en puerto ${PORT}`);
    console.log(`  WebSocket URL: ws://localhost:${PORT}`);
    console.log(`  Broadcast API: http://localhost:${PORT}/broadcast`);
    console.log(`=======================================================`);
});