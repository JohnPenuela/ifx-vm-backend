<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use App\Services\JwtService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function __construct(
        private readonly JwtService $jwtService
    ) {}

    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'error' => 'Credenciales invÃ¡lidas',
                'message' => 'El correo electrÃ³nico o la contraseÃ±a son incorrectos.'
            ], Response::HTTP_UNAUTHORIZED);
        }

        // Generar JWT
        $token = $this->jwtService->generateToken($user);

        // Cookie HttpOnly con el token
        $cookie = $this->jwtService->makeAuthCookie($token);

        return response()->json([
            'message' => 'SesiÃ³n iniciada correctamente.',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ]
        ], Response::HTTP_OK)->withCookie($cookie);
    }

    public function logout(Request $request): JsonResponse
    {
        $forgetCookie = $this->jwtService->makeForgetCookie();

        return response()->json([
            'message' => 'SesiÃ³n finalizada con Ã©xito.'
        ], Response::HTTP_OK)->withCookie($forgetCookie);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ]
        ], Response::HTTP_OK);
    }
}

