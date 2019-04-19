<?php

namespace App\Http\Controllers;

use App\Pengguna;
use Illuminate\Http\Request;

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
        $validatedData = $request->validate([
            'username' => 'required',
            'email' => 'required',
            'password' => 'required'
        ]);
        $data = Pengguna::where('username', $validatedData['username']);
        if($data){
            if(Hash::check($validatedData['password'], $data->password)){
                return $data->toJson();
            }else{
                return $data->toJson('Email atau Username atau Password salah');
            }
        }else{
            return $data->toJson('Email atau Username atau Password salah');
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
