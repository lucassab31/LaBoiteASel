<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class PostsController extends Controller
{
    // Affichage des annonces - Liste
    public function index() {
        
    }

    /**
     * Display the specified post
     *
     * @param integer $id
     * @return Request
     */
    public function view($id) {
        
    }

    /**
     * Give the categories list
     *
     * @return Request
     */
    public function add() {
        $categories = Category::all();
        return response()->json([
            "success" => true,
            "data" => $categories
        ]);
    }

    /**
     * Store the created post
     *
     * @param Request $request
     * @return Request
     */
    public function store(Request $request) {
        $request->validate([
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
        ],[
            'title.required' => 'Vous devez renseigner un titre',
            'title.max' => 'Le titre ne doit pas dépasser 80 caractères',
            'title.string' => 'Le titre doit être une chaine de caractères',
            'description.required' => 'Vous devez renseigner une description',
            'description.string' => 'La description doit être une chaine de caractères',
            'timeLength.required' => 'Vous devez renseigner une durée aproximative',
            'timeLength.integer' => 'Vous devez renseigner une durée aproximative correcte',
            'cost.required' => 'Vous devez renseigner le nombre de grain de sel en récompense',
            'cost.integer' => 'Le nombre de grain de sel doit être un entier',
            'toolsProvided.required' => 'Vous devez renseigner si des outils sont nécessaire',
            'toolsType.string' => 'Le type d\'outil doit être une chaine de caractères',
            'address.required' => 'Vous devez renseigner une adresse',
            'address.string' => 'L\'adresse doit être une chaine de caractères',
            'zipCode.required' => 'Vous devez renseigner un code postale',
            'zipCode.string' => 'Le code postale doit être une chaine de caractères',
            'city.required' => 'Vous devez renseigner une ville',
            'city.string' => 'La ville doit être une chaine de caractères',
            'category_id.required' => 'Vous devez renseigner une categorie',
            'category_id.exists' => 'La catégorie doit exister',
        ]);

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
        $post->category()->associate(Category::findOrFail($request->category_id));
        $post->user()->associate(Auth::user()->id);
        $post->save();

        return request()->json([
            "success" => true
        ]);
    }

    /**
     * Update a post
     *
     * @param Request $request
     * @return Request
     */
    public function update(Request $request) {
        $request->validate([
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
        ],[
            'title.required' => 'Vous devez renseigner un titre',
            'title.max' => 'Le titre ne doit pas dépasser 80 caractères',
            'title.string' => 'Le titre doit être une chaine de caractères',
            'description.required' => 'Vous devez renseigner une description',
            'description.string' => 'La description doit être une chaine de caractères',
            'timeLength.required' => 'Vous devez renseigner une durée aproximative',
            'timeLength.integer' => 'Vous devez renseigner une durée aproximative correcte',
            'cost.required' => 'Vous devez renseigner le nombre de grain de sel en récompense',
            'cost.integer' => 'Le nombre de grain de sel doit être un entier',
            'toolsProvided.required' => 'Vous devez renseigner si des outils sont nécessaire',
            'toolsType.string' => 'Le type d\'outil doit être une chaine de caractères',
            'address.required' => 'Vous devez renseigner une adresse',
            'address.string' => 'L\'adresse doit être une chaine de caractères',
            'zipCode.required' => 'Vous devez renseigner un code postale',
            'zipCode.string' => 'Le code postale doit être une chaine de caractères',
            'city.required' => 'Vous devez renseigner une ville',
            'city.string' => 'La ville doit être une chaine de caractères',
            'category_id.required' => 'Vous devez renseigner une categorie',
            'category_id.exists' => 'La catégorie doit exister',
        ]);

        $post = Post::find($request->id);
        $post->title            = $request->title;
        $post->description      = $request->description;
        $post->timeLength       = $request->timeLength;
        $post->cost             = $request->cost;
        $post->toolsProvided    = $request->toolsProvided;
        $post->toolsType        = $request->toolsType;
        $post->address          = $request->address;
        $post->zipCode          = $request->zipCode;
        $post->city             = $request->city;
        $post->save();

        return request()->json([
            "success" => true
        ]);
    }

    /**
     * Delete a post
     *
     * @param Request $request
     * @return Request
     */
    public function delete(Request $request) {
        $post = Post::findOrFail($request->id);
        // suppr toute les candidatures
        // $post->candidate()->detach();
        $post->delete();
        return request()->json([
            "success" => true
        ]);
    }

    /**
     * Mark a post as in progress
     *
     * @param Request $request
     * @return Request
     */
    public function inProgress(Request $request) {
        $post = Post::findOrFail($request->id);
        $post->status = 'P';
        $post->save();
        return request()->json([
            "success" => true
        ]);
    }

    /**
     * Mark a post as finished
     *
     * @param Request $request
     * @return Request
     */
    public function finish(Request $request) {
        $post = Post::findOrFail($request->id);
        $post->status = 'F';
        $post->save();
        // Create Transaction
        $transaction = new Transaction();
        $transaction->amount = $post->cost;
        $transaction->post()->associate($post->id);
        $transaction->user()->associate(Auth::user()->id);
        $transaction->save();

        return request()->json([
            "success" => true
        ]);
    }
}
