<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notifikasi extends Model
{
    //
    protected $table = 'notifikasi';

    // Primary key
    protected $primaryKey = ['username_pengguna', 'id_konten'];
    public $incrementing = false;

    protected $fillable = [
        'username_pengguna',
        'tipe',
        'id_konten',
        'dibaca'
    ];

    public function pengguna()
    {
        return $this->belongsTo('App\User', 'username_pengguna', 'username');
    }
}
