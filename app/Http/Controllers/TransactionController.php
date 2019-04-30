<?php

namespace App\Http\Controllers;

use App\Transaksi;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    //
    public function getUserTransactionHistory(Request $request)
    {
        try {
            $transaksi = Transaksi::where('username_pengguna', $request->user->username)
                ->orderByDesc('id')->with('barang')->get();

            return response()->json([
                'status' => true,
                'data' => $transaksi,
            ]);
        } catch (\Exception $e) {
            $errorData = ['status' => false];

            if (isset($e->errorInfo[1])) {
                switch ($e->errorInfo[1]) {
                    case 1216:
                        $errorData['message'] = 'Data pengguna tidak valid';
                        break;
                    default:
                        $errorData['message'] = 'Terjadi kesalahan pada database';
                        break;
                }
            } else {
                $errorData['message'] = 'Terjadi kesalahan pada server';
            }
            return response()->json($errorData, 500);
        }
    }
}