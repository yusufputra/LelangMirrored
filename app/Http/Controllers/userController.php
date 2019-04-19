<?php

namespace App\Http\Controllers;

use App\Pengguna;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(){
        $user = Pengguna::get();
        return $user->toJson();
    }

    public function getOneUser($username){

        $user = Pengguna::find($username);
        return $user->toJson();
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
                    return $data->toJson();
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

          return response()->json('Project created!');
    }
}
