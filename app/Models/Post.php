<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'timeLength',
        'cost',
        'toolsProvided',
        'toolsType',
        'status',
        'address',
        'zipCode',
        'city',
        'visibility',
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function reports() {
        return $this->hasMany(Report::class);
    }

    public function transactions() {
        return $this->hasMany(Transaction::class);
    }

    // a checker
    public function users() {
        return $this->belongsToMany(User::class)->withPivot('validated');
    }
}
