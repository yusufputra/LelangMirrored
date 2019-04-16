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
}
