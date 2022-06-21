<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Models\Candidate;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CandidatesController extends Controller
{
    public function store($id) {
        $post = Post::findOrFail($id);
        $candidate = new Candidate();
        $candidate->user()->associate($post->id);
        $candidate->user()->associate(Auth::user()->id);

        // MAIL post's user to notify

        return $this->sendResponse();
    }
}
