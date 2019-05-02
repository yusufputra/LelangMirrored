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

    public function getTransaction(Request $request, $id)
    {
        try {
            $transaksi = Transaksi::find($id);

            if ($transaksi) {
                if (
                    $transaksi->username_pengguna == $request->user->username ||
                    $transaksi->barang->toko->pemilik->username == $request->user->username
                ) {
                    return response()->json([
                        'status' => true,
                        'data' => $transaksi,
                    ]);
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'Anda tidak memiliki izin',
                    ], 403);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);
            }
        } catch (\Exception $e) {
            $errorData = ['status' => false];

            if (isset($e->errorInfo[1])) {
                switch ($e->errorInfo[1]) {
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

    public function inputResi(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'resi' => 'required',
            ]);

            $transaksi = Transaksi::find($id);

            if ($transaksi) {
                if ($transaksi->barang->toko->pemilik->username == $request->user->username) {
                    $transaksi->resi = $validatedData['resi'];
                    $transaksi->status = 4;
                    $transaksi->save();

                    return response()->json([
                        'status' => true,
                        'message' => 'Nomor resi berhasil dimasukkan',
                    ]);
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'Anda tidak memiliki izin',
                    ], 403);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);
            }
        } catch (\Exception $e) {
            $errorData = ['status' => false];

            if (isset($e->errorInfo[1])) {
                switch ($e->errorInfo[1]) {
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

    public function paymentConfirmation(Request $request, $id)
    {
        try {
            $transaksi = Transaksi::find($id);

            if ($transaksi) {
                if ($transaksi->username_pengguna == $request->user->username) {
                    $transaksi->status = 2;
                    $transaksi->save();

                    return response()->json([
                        'status' => true,
                        'message' => 'Konfirmasi pembayaran berhasil',
                    ]);
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'Anda tidak memiliki izin',
                    ], 403);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);
            }
        } catch (\Exception $e) {
            $errorData = ['status' => false];

            if (isset($e->errorInfo[1])) {
                switch ($e->errorInfo[1]) {
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

    public function transactionConfirmation(Request $request, $id)
    {
        try {
            $transaksi = Transaksi::find($id);

            if ($transaksi) {
                if ($transaksi->username_pengguna == $request->user->username) {
                    $transaksi->status = 5;
                    $transaksi->save();

                    return response()->json([
                        'status' => true,
                        'message' => 'Konfirmasi pembayaran berhasil',
                    ]);
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'Anda tidak memiliki izin',
                    ], 403);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);
            }
        } catch (\Exception $e) {
            $errorData = ['status' => false];

            if (isset($e->errorInfo[1])) {
                switch ($e->errorInfo[1]) {
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

    public function storeShipmentAddress(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'id_alamat_pengiriman' => 'required|min:0|numeric',
            ]);

            $transaksi = Transaksi::find($id);

            if ($transaksi) {
                if ($transaksi->username_pengguna == $request->user->username) {
                    $transaksi->id_alamat_pengiriman = $validatedData['id_alamat_pengiriman'];
                    $transaksi->status = 1;
                    $transaksi->save();

                    return response()->json([
                        'status' => true,
                        'message' => 'Nomor resi berhasil dimasukkan',
                    ]);
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'Anda tidak memiliki izin',
                    ], 403);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);
            }
        } catch (\Exception $e) {
            $errorData = ['status' => false];

            if (empty($e->status)) {
                if (isset($e->errorInfo[1])) {
                    switch ($e->errorInfo[1]) {
                        case 1216:
                            $errorData['message'] = 'Alamat pengiriman tidak valid';
                            break;
                        default:
                            $errorData['message'] = 'Terjadi kesalahan pada database';
                            break;
                    }
                } else {
                    $errorData['message'] = 'Terjadi kesalahan pada server';
                }
            } else {
                $errorData['message'] = 'Input data tidak valid';
            }

            return response()->json($errorData, $e->status ?? 500);
        }
    }
}
