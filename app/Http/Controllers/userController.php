<?php

namespace App\Http\Controllers;

use App\Pengguna;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(){
        $user = Pengguna::get();
        if($user){
            return response()->json([
                'status' => true,
                'data' => $user
            ],200);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'user not found'
            ],404);
        }
    }

    public function getOneUser($username){

        $user = Pengguna::find($username);
        if($user){
            return response()->json([
                'status' => true,
                'data' => $user
            ],200);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'user not found'
            ],404);
        }
    }

    public function login(Request $request){

        try{
            $validatedData = $request->validate([
                'username' => 'max:32',
                'email' => 'max:255',
                'password' => 'required'
            ]);
            $data = Pengguna::where('username', $validatedData['username'])
                    ->get();
            // return $data->toJson();
            if($data){
                if(Hash::check($validatedData['password'], $data[0]->password)){
                    session(['username' => $data[0]->username]);
                    session(['email' => $data[0]->email]);
                    session(['nama' => $data[0]->nama]);
                    session(['tanggal_lahir' => $data[0]->tanggal_lahir]);
                    return response()->json([
                        'status' => true,
                        'data' => $data
                    ],200);
                }else{
                    return response()->json([
                        'status' => false,
                        'message' => 'Email atau Username atau Password salah'
                    ],404);
                }
            }else{
                return response()->json([
                    'status' => false,
                    'message' => 'Email atau Username atau Password salah'
                ],404);
            }
        }catch(\Exception $e){
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

    public function daftar(Request $request){

        try{
            $validatedData = $request->validate([
                'username' => 'required',
                'email' => 'required',
                'nama' => 'required',
                'password' => 'required',
                'tanggal_lahir' => 'required'
              ]);

              $project = Pengguna::create([
                'username' => $validatedData['username'],
                'email' => $validatedData['email'],
                'nama' => $validatedData['nama'],
                'password' => bcrypt($validatedData['password']),
                'tanggal_lahir' => $validatedData['tanggal_lahir']
              ]);

              if($project){
                return response()->json([
                    'status' => true,
                    'message' => 'register successed'
                ],200);
              }else{
                return response()->json([
                    'status' => false,
                    'message' => 'register failed'
                ],400);
              }
        }catch(\Exception $e){
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

    public function updateProfile(Request $request){

        try{
            $validatedData = $request->validate([
                'username' => 'required',
                'email' => 'required',
                'nama' => 'required',
                'password' => 'required',
                'tanggal_lahir' => 'required'
              ]);

              $project = Pengguna::where('username', $validatedData['username'])->first();

              if($project){
                  $project->username = $validatedData['username'];
                  $project->email = $validatedData['email'];
                  $project->nama = $validatedData['nama'];
                  $project->password = bcrypt($validatedData['password']);
                  $project->tanggal_lahir = $validatedData['tanggal_lahir'];
                  $project->save();
                return response()->json([
                    'status' => true,
                    'message' => 'Update successed'
                ],200);
              }else{
                return response()->json([
                    'status' => false,
                    'message' => 'Update failed'
                ],400);
              }
        }catch(\Exception $e){
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
