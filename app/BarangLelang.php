<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BarangLelang extends Model
{
    //
    protected $table = 'barang_lelang';

    protected $fillable = [
        'nama_barang',
        'bukaan_harga',
        'kelipatan',
        'deskripsi',
        'id_toko',
        'kategori'
    ];

    public function toko()
    {
        return $this->belongsTo('App\TokoLelang', 'id_toko', 'id');
    }

    public function komentar()
    {
        return $this->hasMany('App\KomentarLelang', 'id_barang', 'id');
    }

    public function penawaran()
    {
        return $this->hasMany('App\PenawaranLelang', 'id_barang', 'id');
    }

    public function transaksi()
    {
        return $this->hasOne('App\Transaksi', 'id_barang', 'id');
    }
}
