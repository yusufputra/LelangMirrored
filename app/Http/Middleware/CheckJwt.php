<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;

class CheckJwt
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWT::decode($request->header('Authorization'), env('SECRET_TOKEN_KEY'), ['HS256']);
            $request->user = $user;
        } catch (\Exception $e) {
            return response()->json(['err' => $e], 401);
        }
        return $next($request);
    }
}
