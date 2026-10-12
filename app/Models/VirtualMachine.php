<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VirtualMachine extends Model
{
    use HasFactory;

    protected $table = 'virtual_machines';

    protected $fillable = [
        'name',
        'cores',
        'ram',
        'disk',
        'os',
        'status',
        'ip_address',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'cores' => 'integer',
            'ram' => 'integer',
            'disk' => 'integer',
        ];
    }
}
