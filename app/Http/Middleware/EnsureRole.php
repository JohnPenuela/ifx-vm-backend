<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureRole
{
    public function handle(Request $request, Closure $next, string $requiredRole = 'Administrador'): Response
    {
        $user = $request->user();

        if (!$user || $user->role !== $requiredRole) {
            return response()->json([
                'error' => 'Permisos insuficientes',
                'message' => "Esta acción requiere rol de {$requiredRole}. Su rol actual es '{$user?->role}'."
            ], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
