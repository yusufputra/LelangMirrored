<?php

namespace App\Http\Controllers;

use App\AlamatPengiriman;
use App\Pengguna;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        try {
            $user = Pengguna::get();
            if ($user) {
                return response()->json([
                    'status' => true,
                    'data' => $user,
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Pengguna tidak ditemukan',
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
            return response()->json($e->getMessage(), $e->status ?? 500);
        }
    }

    protected function jwt(Pengguna $pengguna)
    {
        $payload = [
            'iss' => "lelang-in", // Issuer of the token
            'username' => $pengguna->username, // Subject of the token
            'iat' => time(), // Time when JWT was issued.
            'exp' => time() + 60 * 60, // Expiration time
        ];

        // As you can see we are passing `JWT_SECRET` as the second parameter that will
        // be used to decode the token in the future.
        return JWT::encode($payload, env('SECRET_TOKEN_KEY'),'HS256');
    }

    public function getOneUser($username)
    {
        try {
            $user = Pengguna::find($username);
            if ($user) {
                return response()->json([
                    'status' => true,
                    'data' => $user,
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Pengguna tidak ditemukan',
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
            return response()->json($e->getMessage(), $e->status ?? 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'username' => 'max:32',
                'email' => 'max:255',
                'password' => 'required',
            ]);
            $data = Pengguna::where('username', $validatedData['username'])->first();
            if ($data) {
                if (Hash::check($validatedData['password'], $data->password)) {
                    $jwt = $this->jwt($data);

                    return response()->json([
                        'status' => true,
                        'token' => $jwt,
                    ], 200);
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'Email atau Username atau Password salah',
                    ], 404);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Email atau Username atau Password salah',
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
            return response()->json($e->getMessage(), $e->status ?? 500);
        }
    }

    public function daftar(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'username' => 'required',
                'email' => 'required',
                'nama' => 'required',
                'password' => 'required',
                'tanggal_lahir' => 'required',
            ]);

            $pengguna = Pengguna::create([
                'username' => $validatedData['username'],
                'email' => $validatedData['email'],
                'nama' => $validatedData['nama'],
                'password' => bcrypt($validatedData['password']),
                'tanggal_lahir' => $validatedData['tanggal_lahir'],
            ]);

            if ($pengguna) {
                return response()->json([
                    'status' => true,
                    'message' => 'Registrasi berhasil',
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Registrasi gagal',
                ], 400);
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
            return response()->json($e->getMessage(), $e->status ?? 500);
        }
    }

    public function updateProfile(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'username' => 'required',
                'email' => 'required',
                'nama' => 'required',
                'password' => 'required',
                'tanggal_lahir' => 'required',
            ]);

            $project = Pengguna::where('username', $validatedData['username'])->first();

            if ($project) {
                $project->username = $validatedData['username'];
                $project->email = $validatedData['email'];
                $project->nama = $validatedData['nama'];
                $project->password = bcrypt($validatedData['password']);
                $project->tanggal_lahir = $validatedData['tanggal_lahir'];
                $project->save();
                return response()->json([
                    'status' => true,
                    'message' => 'Update successed',
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Update failed',
                ], 400);
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
            return response()->json($e->getMessage(), $e->status ?? 500);
        }
    }
}
