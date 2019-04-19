<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TokoLelang extends Model
{
    //
    protected $table = 'toko_lelang';

    protected $fillable = [
        'username_pengguna',
        'nama_toko',
        'no_telepon',
        'nama_jalan',
        'kelurahan',
        'kode_pos',
    ];

    public $timestamps = false;

    public function pengguna()
    {
        return $this->belongsTo('App\User', 'username_pengguna', 'username');
    }

    public function barang()
    {
        return $this->hasMany('App\BarangLelang', 'id_toko', 'id');
    }
}
