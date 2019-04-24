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

        try{
            $user = JWT::decode($request->header('authorization'),env('SECRET_TOKEN_KEY'),['HS256']);
            $request->user = $user;
            // return response()->json($request->user);
        }catch(\Exception $e){
            return response()->json("Unauthorized",401);
        }
        return $next($request);
    }
}
