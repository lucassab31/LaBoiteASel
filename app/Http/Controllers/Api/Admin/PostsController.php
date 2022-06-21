<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Post;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class PostsController extends Controller
{
    /**
     * Display all posts
     *
     * @param integer $id
     * @return Request
     */
    public function index() {
        $posts = Post::all();
        return $this->sendResponse(true, $posts);
    }

    /**
     * Display the specified post
     *
     * @param String $id
     * @return Request
     */
    public function view($id) {
        $post = Post::findOrFail($id);
        return $this->sendResponse(true, $post);
    }

    /**
     * Update a post
     *
     * @param Request $request
     * @return Request
     */
    public function update(Request $request) {
        $input = $request->all();
        $validator = Validator::make($input, [
            'title' => 'required|max:80|string',
            'description' => 'required|string',
            'timeLength' => 'required|integer',
            'cost' => 'required|integer',
            'toolsProvided' => 'required|string|max:1',
            'toolsType' => 'nullable|string',
            'address' => 'required|string',
            'zipCode' => 'required|string',
            'city' => 'required|string',
            'category_id' => 'required|integer|exists:categories,id',
            'status' =>  'required|string|max:1'
        ],[
            'title.required' => 'Vous devez renseigner un titre',
            'title.max' => 'Le titre ne doit pas dépasser 80 caractères',
            'title.string' => 'Le titre doit être une chaîne de caractères',
            'description.required' => 'Vous devez renseigner une description',
            'description.string' => 'La description doit être une chaîne de caractères',
            'timeLength.required' => 'Vous devez renseigner une durée approximative',
            'timeLength.integer' => 'Vous devez renseigner une durée approximative correcte',
            'cost.required' => 'Vous devez renseigner le nombre de grains de sel en récompense',
            'cost.integer' => 'Le nombre de grains de sel doit être un entier',
            'toolsProvided.required' => 'Vous devez renseigner si des outils sont nécessaires',
            'toolsType.string' => 'Le type d\'outil doit être une chaîne de caractères',
            'address.required' => 'Vous devez renseigner une adresse',
            'address.string' => 'L\'adresse doit être une chaîne de caractères',
            'zipCode.required' => 'Vous devez renseigner un code postal',
            'zipCode.string' => 'Le code postal doit être une chaîne de caractères',
            'city.required' => 'Vous devez renseigner une ville',
            'city.string' => 'La ville doit être une chaîne de caractères',
            'category_id.required' => 'Vous devez renseigner une catégorie',
            'category_id.exists' => 'La catégorie doit exister',
        ]);
        if($validator->fails()) {
            return $this->sendResponse(false, $validator->errors());
        }

        $post = new Post();
        $post->title            = $request->title;
        $post->description      = $request->description;
        $post->timeLength       = $request->timeLength;
        $post->cost             = $request->cost;
        $post->toolsProvided    = $request->toolsProvided;
        $post->toolsType        = $request->toolsType;
        $post->address          = $request->address;
        $post->zipCode          = $request->zipCode;
        $post->city             = $request->city;
        $post->status           = $request->status;
        $post->datetimeType     = $request->datetimeType;
        $post->datetimePost     = $request->datetimePost;
        $post->category()->associate(Category::findOrFail($request->category_id));
        $post->save();

        if ($post->status == 'F') {
            // Create Transaction
            $transaction = new Transaction();
            $transaction->amount = $post->cost;
            $transaction->post()->associate($post->id);
            $transaction->save();
            // debit + crédit gds
            $post->user->money -= $post->cost;
            $post->user->save();
            $post->userMaker->money += $post->cost;
            $post->userMaker->save();
        }

        return $this->sendResponse();
    }

    /**
     * Delete a post
     *
     * @param String $id
     * @return Request
     */
    public function delete($id) {
        $post = Post::findOrFail($id);
        $post->delete();
        return $this->sendResponse();
    }
}
