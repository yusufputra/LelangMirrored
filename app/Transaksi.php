<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    //
    protected $table = 'transaksi';

    protected $fillable = [
        'id_barang',
        'id_penawaran',
        'kode_unik',
        'username_pengguna',
        'status',
    ];

    protected $with = [
        'barang',
    ];

    public function pengguna()
    {
        return $this->belongsTo('App\Pengguna', 'username_pengguna', 'username');
    }

    public function barang()
    {
        return $this->belongsTo('App\BarangLelang', 'id_barang', 'id');
	}
	
	public function penawaran() {
		return $this->belongsTo('App\PenawaranLelang', 'id_penawaran', 'id');
	}
}
