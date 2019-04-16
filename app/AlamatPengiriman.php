<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AlamatPengiriman extends Model
{
    //
    protected $table = 'alamat_pengiriman';

    protected $fillable = [
        'username_pengguna',
        'nama_penerima',
        'no_telepon',
        'nama_jalan',
        'kelurahan',
        'kode_pos'
    ];

    public function pengguna()
    {
        return $this->belongsTo('App\User', 'username_pengguna', 'username');
    }
}
