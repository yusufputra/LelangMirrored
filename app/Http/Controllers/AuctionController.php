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
            if ($request['slow_bid']) {
                $validatedData = $request->validate([
                    'nama_barang' => 'required|max:255',
                    'deskripsi' => 'required|max:20',
                    'kategori' => 'required|max:255',
                    'bukaan_harga' => 'sometimes|numeric',
                    'kelipatan' => 'sometimes|numeric',
                    '' => '',
                ]);
            } else {
                $validatedData = $request->validate([
                    'nama_barang' => 'required|max:255',
                    'deskripsi' => 'required|max:20',
                    'kategori' => 'required|max:255',
                    'bukaan_harga' => 'sometimes|numeric',
                    'kelipatan' => 'sometimes|numeric',
                ]);
            }

            $barang_lelang = new BarangLelang;
            $barang_lelang->nama_barang = $validatedData['nama_barang'];
            $barang_lelang->deskripsi = $validatedData['deskripsi'];
            $barang_lelang->kategori = $validatedData['kategori'];

            if (isset($request['bukaan_harga'])) {
                $barang_lelang->bukaan_harga = $validatedData['bukaan_harga'];
            }

            if (isset($request['kelipatan'])) {
                $barang_lelang->kelipatan = $validatedData['kelipatan'];
            }

            if ($request['slow_bid']) {
                $barang_lelang->waktu_akhir = $validatedData['waktu_akhir'];
            }

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
                            $errorData['message'] = 'Data pengguna tidak valid';
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

    public function updateAuction(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'nama_toko' => 'required|max:255',
                'no_telepon' => 'required|max:20',
                'nama_jalan' => 'required|max:255',
                'kelurahan' => 'required|max:100',
                'kode_pos' => 'required|numeric',
            ]);

            $tokoLelang = TokoLelang::where('username_pengguna', $request['username_pengguna'])->first();

            if ($tokoLelang) {
                $tokoLelang->nama_toko = $validatedData['nama_toko'];
                $tokoLelang->no_telepon = $validatedData['no_telepon'];
                $tokoLelang->nama_jalan = $validatedData['nama_jalan'];
                $tokoLelang->kelurahan = $validatedData['kelurahan'];
                $tokoLelang->kode_pos = $validatedData['kode_pos'];
                $tokoLelang->save();

                return response()->json([
                    'status' => true,
                    'message' => 'Informasi toko berhasil dibuat',
                ]);
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
                $barangLelang->delete();

                return response()->json([
                    'status' => true,
                    'message' => 'Toko lelang berhasil dihapus',
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

    public function searchAuction(Request $request)
    {
        try {
            $barang = BarangLelang::whereRaw("1 = 1");

            // if ($request['keyword']) {
            //     $barang->where('nama_barang', 'LIKE', '%' . $request['keyword'] . '%');
            // }

            // if ($request['max_price']) {
			// 	$barang->where('');
            // }

            $barang = $barang->get()->all();

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
