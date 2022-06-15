<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class TransactionsController extends Controller
{
    /**
     * Store the created transaction
     *
     * @param Request $request
     * @return Request
     */
    public function store(Request $request) {
        $request->validate([
            'amount' => 'required|integer',
            'user_id' => 'required|integer|exists:users,id',
            'post_id' => 'required|integer|exists:posts,id',
        ],[
            'amount.required' => 'Vous devez renseigner le nombre de grain de sel',
            'amount.integer' => 'Le nombre de grain de sel doit être un entier',
            'user_id.required' => 'Le membre est obligatoire',
            'user_id.exists' => 'Le membre doit exister',
            'post_id.required' => 'L\'annonce est obligatoire',
            'post_id.exists' => 'L\'annonce doit exister',
        ]);

        $transaction = new Transaction();
        $transaction->amount = $request->amount;
        $transaction->user()->associate(Auth::user()->id);
        $transaction->post()->associate(Post::findOrFail($request->post_id));
        $transaction->save();

        return request()->json([
            "success" => true
        ]);
    }
}
