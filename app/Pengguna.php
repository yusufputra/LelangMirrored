<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
        'tanggal_lahir'
    ];

    protected $hidden = ['password'];

    public $timestamps = false;

    public function toArray()
    {
        // Only hide email if `guest` or not an `admin`
        $this->setAttributeVisibility();

        return parent::toArray();
    }

    public function setAttributeVisibility()
    {
        $this->makeVisible(array_merge($this->fillable, $this->appends, ['password']));
    }

    public function alamatPengiriman() {
        return $this->hasMany('App\AlamatPengiriman', 'username_pengguna', 'username');
    }

    public function notifikasi() {
        return $this->hasMany('App\Notifikasi', 'username_pengguna', 'username');
    }

    public function penawaran() {
        return $this->hasMany('App\PenawaranLelang', 'username_pengguna', 'username');
    }

    public function tokoLelang()
    {
        return $this->hasOne('App\TokoLelang', 'username_pengguna', 'username');
    }

    public function transaksi() {
        return $this->hasMany('App\Transaksi', 'username_pengguna', 'username');
    }
}
