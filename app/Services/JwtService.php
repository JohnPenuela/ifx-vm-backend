<?php

namespace App\Services;

use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Symfony\Component\HttpFoundation\Cookie;

class JwtService
{
    private string $key;
    private string $algorithm = 'HS256';
    private int $ttlSeconds = 86400; // 24 horas

    public function __construct()
    {
        $appKey = config('app.key', 'base64:ifx-technical-test-secret-jwt-key-2026!');
        if (str_starts_with($appKey, 'base64:')) {
            $this->key = base64_decode(substr($appKey, 7));
        } else {
            $this->key = $appKey;
        }
    }

    public function generateToken(User $user): string
    {
        $issuedAt = time();
        $payload = [
            'iss' => config('app.url', 'http://localhost:8000'),
            'sub' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'iat' => $issuedAt,
            'exp' => $issuedAt + $this->ttlSeconds,
        ];

        return JWT::encode($payload, $this->key, $this->algorithm);
    }

    public function decodeToken(string $token): ?object
    {
        try {
            return JWT::decode($token, new Key($this->key, $this->algorithm));
        } catch (\Throwable $e) {
            return null;
        }
    }

    public function makeAuthCookie(string $token): Cookie
    {
        $minutes = (int) ($this->ttlSeconds / 60);
        $isSecure = app()->isProduction(); // En local http debe ser false para que el navegador acepte la cookie

        return cookie(
            name: 'access_token',
            value: $token,
            minutes: $minutes,
            path: '/',
            domain: null,
            secure: $isSecure,
            httpOnly: true,
            raw: false,
            sameSite: 'Lax'
        );
    }

    public function makeForgetCookie(): Cookie
    {
        return cookie(
            name: 'access_token',
            value: '',
            minutes: -2628000,
            path: '/',
            domain: null,
            secure: app()->isProduction(),
            httpOnly: true,
            raw: false,
            sameSite: 'Lax'
        );
    }
}
