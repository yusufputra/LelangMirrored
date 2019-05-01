<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;

class Pengguna extends Model
{
    //
    protected $table = 'pengguna';

    // Primary key
    protected $primaryKey = 'username';
    public $incrementing = false;
    protected $keyType = 'string';

    // Field
    protected $fillable = [
        'username',
        'email',
        'nama',
        'password',
        'tanggal_lahir',
    ];

    protected $hidden = ['password'];

    protected $appends = ['foto'];

    public $timestamps = false;

    public function alamatPengiriman()
    {
        return $this->hasMany('App\AlamatPengiriman', 'username_pengguna', 'username');
    }

    public function notifikasi()
    {
        return $this->hasMany('App\Notifikasi', 'username_pengguna', 'username');
    }

    public function penawaran()
    {
        return $this->hasMany('App\PenawaranLelang', 'username_pengguna', 'username');
    }

    public function tokoLelang()
    {
        return $this->hasOne('App\TokoLelang', 'username_pengguna', 'username');
    }

    public function transaksi()
    {
        return $this->hasMany('App\Transaksi', 'username_pengguna', 'username');
    }

    public function getFotoAttribute()
    {
        $standardPhotoPath = '/uploads/profile_photo/';
        $path = public_path() . $standardPhotoPath . $this->attributes['username'];
        $matchingFiles = File::glob("{$path}.*");
        if ($matchingFiles) {
            $photo_name = explode('/', $matchingFiles[0]);
            return url($standardPhotoPath . end($photo_name));
        } else {
            return 'http://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png';
        }
    }
}
