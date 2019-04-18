<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    //
    protected $table = 'transaksi';

    protected $fillable = [
        'id_barang',
        'kode_unik',
        'username_pengguna',
        'status'
    ];

    public function pengguna() {
        return $this->belongsTo('App\Pengguna', 'username_pengguna', 'username');
    }

    public function barang() {
        return $this->belongsTo('App\BarangLelang', 'id_barang', 'id');
    }
}
