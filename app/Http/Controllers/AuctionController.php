<?php

namespace App\Http\Controllers;

use App\BarangLelang;
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

            // if ($request->get('max')) {
            //     $barang->where('max_bid', '<=', $request->get('max'));
            // }

			$barang = $barang->get();
			
			// error_log(gettype($barang->toArray()));
			// foreach($barang as $b) {
			// 	error_log($b->nama_barang);
			// }

            // if ($request->get('max')) {
            //     array_filter($barang, function ($element) {
            //         return $element->max_bid <= $request->get('max');
            //     });
            // }

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
}
