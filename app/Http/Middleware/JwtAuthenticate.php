<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Services\JwtService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class JwtAuthenticate
{
    public function __construct(
        private readonly JwtService $jwtService
    ) {}

    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->cookie('access_token');

        if (!$token && $request->hasHeader('Authorization')) {
            $token = $request->bearerToken();
        }

        if (!$token) {
            return response()->json([
                'error' => 'No autenticado',
                'message' => 'No se encontró el token de sesión en la cookie HttpOnly ni en la cabecera.'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $payload = $this->jwtService->decodeToken($token);

        if (!$payload || !isset($payload->sub)) {
            return response()->json([
                'error' => 'Sesión expirada o token inválido',
                'message' => 'La sesión ha expirado o el token es inválido. Por favor inicie sesión nuevamente.'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = User::find($payload->sub);

        if (!$user) {
            return response()->json([
                'error' => 'Usuario no encontrado',
                'message' => 'El usuario asociado al token no existe en el sistema.'
            ], Response::HTTP_UNAUTHORIZED);
        }

        Auth::setUser($user);
        $request->setUserResolver(fn() => $user);

        return $next($request);
    }
}
