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
        'datetimeType',
        'datetimePost',
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

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function userMaker() {
        return $this->belongsTo(User::class, 'user_maker_id');
    }

    public function candidates() {
        return $this->hasMany(Candidate::class);
    }
}
