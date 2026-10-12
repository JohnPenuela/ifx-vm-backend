<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WebSocketBroadcaster
{
    private string $serverUrl;

    public function __construct()
    {
        $this->serverUrl = env('WEBSOCKET_BROADCAST_URL', 'http://127.0.0.1:6001/broadcast');
    }

    public function broadcast(string $event, array $payload): void
    {
        try {
            Http::timeout(1)->post($this->serverUrl, [
                'event' => $event,
                'payload' => $payload,
                'timestamp' => now()->toIso8601String(),
            ]);
        } catch (\Throwable $e) {
            // El fallback silencioso asegura que si el relay WS está inactivo, la operación CRUD de la base de datos no se interrumpa
            Log::info("WebSocket broadcast no enviado: " . $e->getMessage());
        }
    }
}
