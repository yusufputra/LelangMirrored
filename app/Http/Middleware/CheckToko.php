<?php

namespace App\Http\Middleware;

use App\TokoLelang;
use Closure;

class CheckToko
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
        $data = $request->user;
        $tokoLelang = TokoLelang::where(['username_pengguna' => $data->username])->first();
        if ($tokoLelang) {
            $request->toko = $tokoLelang;
            return $next($request);
        } else {
            return response()->json("Anda belum memiliki toko", 400);
        }
    }
}
