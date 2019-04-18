<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class KomentarLelang extends Model
{
    //
    protected $table = 'komentar_barang';

    protected $fillable = [
        'username_pengguna',
        'isi',
        'id_barang'
    ];

    public function pengguna()
    {
        return $this->belongsTo('App\User', 'username_pengguna', 'username');
    }

    public function barang()
    {
        return $this->belongsTo('App\BarangLelang', 'id_barang', 'id');
    }
}
