<?php

namespace App\Http\Controllers;

use App\BarangLelang;
use App\PenawaranLelang;
use Illuminate\Http\Request;

class AuctionController extends Controller
{
    //

    public function createAuction(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'nama_barang' => 'required|max:255',
                'deskripsi' => 'string|nullable',
                'kategori' => 'required|max:255',
                'bukaan_harga' => 'numeric|nullable',
                'kelipatan' => 'numeric|nullable',
                'waktu_mulai' => 'required|after:now',
                'waktu_akhir' => 'after:waktu_mulai|nullable',
            ]);

            $barang_lelang = new BarangLelang;
            $barang_lelang->nama_barang = $validatedData['nama_barang'];
            $barang_lelang->deskripsi = $validatedData['deskripsi'];
            $barang_lelang->kategori = $validatedData['kategori'];
            $barang_lelang->bukaan_harga = $validatedData['bukaan_harga'] ?? 0;
            $barang_lelang->waktu_mulai = $validatedData['waktu_mulai'];

            if (isset($validatedData['kelipatan'])) {
                $barang_lelang->kelipatan = $validatedData['kelipatan'];
            }

            if (isset($validatedData['waktu_akhir'])) {
                $barang_lelang->waktu_akhir = $validatedData['waktu_akhir'];
            }

            $barang_lelang->jumlah_dilihat = 0;
            $barang_lelang->id_toko = $request->toko->id;
            $barang_lelang->save();

            return response()->json([
                'status' => true,
                'message' => 'Barang lelang berhasil didaftarkan',
            ]);
        } catch (\Exception $e) {
            $errorData = ['status' => false];

            if (empty($e->status)) {
                if (isset($e->errorInfo[1])) {
                    switch ($e->errorInfo[1]) {
                        case 1216:
                            $errorData['message'] = 'Data toko pengguna tidak valid';
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

    public function readAuction($id)
    {
        try {
            $barangLelang = BarangLelang::where('id', $id)->first();

            if ($barangLelang) {
                $barangLelang->jumlah_dilihat = $barangLelang->jumlah_dilihat + 1;
                $barangLelang->save();

                return response()->json([
                    'status' => true,
                    'data' => $barangLelang,
                ]);
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
            return response()->json($errorData, $e->status ?? 500);
        }
    }

    public function updateAuction(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'nama_barang' => 'required|max:255',
                'deskripsi' => 'string|nullable',
                'kategori' => 'required|max:255',
                'bukaan_harga' => 'numeric|nullable',
                'kelipatan' => 'numeric|nullable',
            ]);

            $barang_lelang = BarangLelang::find($id);

            if ($barang_lelang) {
                if ($barangLelang->id_toko == $request->toko->id) {
                    $barang_lelang->nama_barang = $validatedData['nama_barang'];
                    $barang_lelang->deskripsi = $validatedData['deskripsi'];
                    $barang_lelang->kategori = $validatedData['kategori'];
                    $barang_lelang->bukaan_harga = $validatedData['bukaan_harga'] ?? 0;
                    $barang_lelang->kelipatan = $validatedData['kelipatan'];

                    $barang_lelang->save();

                    return response()->json([
                        'status' => true,
                        'message' => 'Informasi barang lelang berhasil diperbarui',
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

    public function deleteAuction($id)
    {
        try {
            $barangLelang = BarangLelang::find($id);

            if ($barangLelang) {
                if ($barangLelang->id_toko == $request->toko->id) {
                    $barangLelang->delete();

                    return response()->json([
                        'status' => true,
                        'message' => 'Barang lelang berhasil dihapus',
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
            return response()->json($errorData, $e->status ?? 500);
        }
    }

    public function searchAuction(Request $request)
    {
        try {
            $barang = BarangLelang::whereRaw("1 = 1");

            if ($request->get('keyword')) {
                $barang->where('nama_barang', 'LIKE', '%' . $request->get('keyword') . '%');
            }

            $barang = $barang->get();

            if ($request->get('max')) {
                $barang = $barang->filter(function ($element) use ($request) {
                    return $element->max_bid <= $request->get('max');
                });
            }

            if ($request->get('min')) {
                $barang = $barang->filter(function ($element) use ($request) {
                    return $element->max_bid >= $request->get('max');
                });
            }

            // if ($request->get('sortBy')) {
            //     switch ($request->get('sortBy')) {
            //         case 'name':
            //             $barang->sortBy('nama_barang');
            //             break;
            //         case 'nameDesc':
            //             $barang->sortByDesc('nama_barang');
            //             break;
            //         case 'price':
            //             $barang->sortBy('max_bid');
            //             break;
            //         case 'priceDesc':
            //             $barang->sortByDesc('max_bid');
            //             break;
            //         case 'latestDesc':
            //             $barang->sortByDesc('id');
            //             break;
            //         default:
            //             $barang->sortBy('id');
            //             break;
            //     }
            // }

            if ($request->get('perPage')) {
                $temp = $barang;
                $barang = array();

                $page = $request->get('page') ?? 1;
                for ($i = ($page - 1) * $request->get('perPage'); $i < $page * $request->get('perPage'); $i++) {
                    if (isset($temp[$i])) {
                        $barang[] = $temp[$i];
                    } else {
                        break;
                    }
                }
            }

            return response()->json([
                'status' => true,
                'data' => $barang,
            ], 200);
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
            return response()->json($e->getMessage(), $e->status ?? 500);
        }
    }

    public function placeBid(Request $request, $id)
    {
        try {
            $barangLelang = BarangLelang::find($id);

            if ($barangLelang) {
                if ($request->get('penawaran')) {
                    $validatedData = $request->validate([
                        'penawaran' => 'required|numeric|min:0',
                    ]);
                    $penawaran = $validatedData['penawaran'];
                    if ($penawaran > $barangLelang->max_bid) {
                        if ($barangLelang->kelipatan && $penawaran % $barangLelang->kelipatan != 0) {
                            return response()->json([
                                'status' => false,
                                'message' => 'Kelipatan penawaran tidak sesuai',
                            ], 422);
                        }

                        $penawaranLelang = new PenawaranLelang;
                        $penawaranLelang->id_barang = $id;
                        $penawaranLelang->harga_penawaran = $penawaran;
                        $penawaranLelang->username_pengguna = $request->user->username;
                        $penawaranLelang->save();

                        return response()->json([
                            'status' => true,
                            'message' => 'Penawaran barang berhasil dimasukkan',
                        ]);
                    } else {
                        return response()->json([
                            'status' => false,
                            'message' => 'Harga penawaran tidak valid',
                        ], 400);
                    }
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'Input data tidak valid',
                    ], 422);
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
