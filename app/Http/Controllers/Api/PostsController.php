<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Candidate;
use App\Models\Report;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
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
        //$posts = Post::where('visibility', 1)->orderByDesc('created_at')->get();
        $posts = Post::where('visibility', 1)->with('category')->orderByDesc('created_at')->get();
        return $this->sendResponse(true, $posts);
    }


    /**
     * Display the filtered posts 
     * 
     * @param String $category
     * @param String $lengthService
     * @param String $date
     * @return Request
     */
    public function filteredPosts( $category, $lengthService, $date, $dateType) {        
        $operator = '=';
        if ($dateType === "B") {
            $operator = "<"; 
        } else if ($dateType === "A") {
            $operator = ">"; 
        } else if ($dateType === "O") {
            $operator = "="; 
        }
        $posts = Post::where('category_id', $category)->where('timeLength', $lengthService)->with('category')->where('datetimePost',$operator, $date)->get();
        return $this->sendResponse(true, $posts);
    }


    /**
     * Display the specified post
     *
     * @param integer $id
     * @return Request
     */
    public function view($id) {
        $post = Post::where('id', $id)->with(['user' => function ($query) {
            $query->select('id', 'firstName', 'lastName');
        }])->first();
        return $this->sendResponse(true, $post);
    }

    /**
     * Give the categories list
     *
     * @return Request
     */
    public function add() {
        $categories = Category::all();
        return $this->sendResponse(true, $categories);
    }

    /**
     * Store the created post
     *
     * @param Request $request
     * @return Request
     */
    public function store(Request $request) {
        if (!Auth::check()) return $this->sendResponse(false, "Vous n'avez pas acc??s ?? cette partie !");
        $input = $request->all();
        $validator = Validator::make($input, [
            'title' => 'required|max:80|string',
            'description' => 'required|string',
            'timeLength' => 'required|integer',
            'cost' => 'required|integer|min:0',
            'toolsProvided' => 'required|string|max:1',
            'toolsType' => 'nullable|string',
            'address' => 'required|string',
            'zipCode' => 'required|string',
            'city' => 'required|string',
            'category_id' => 'required|integer|exists:categories,id',
        ],[
            'title.required' => 'Vous devez renseigner un titre',
            'title.max' => 'Le titre ne doit pas d??passer 80 caract??res',
            'title.string' => 'Le titre doit ??tre une cha??ne de caract??res',
            'description.required' => 'Vous devez renseigner une description',
            'description.string' => 'La description doit ??tre une cha??ne de caract??res',
            'timeLength.required' => 'Vous devez renseigner une dur??e approximative',
            'timeLength.integer' => 'Vous devez renseigner une dur??e approximative correcte',
            'cost.required' => 'Vous devez renseigner le nombre de grains de sel en r??compense',
            'cost.integer' => 'Le nombre de grains de sel doit ??tre un entier',
            'cost.min' => 'Le nombre de grains de sel doit ??tre sup??rieur ou ??gale ?? 0',
            'toolsProvided.required' => 'Vous devez renseigner si des outils sont n??cessaires',
            'toolsType.string' => 'Le type d\'outil doit ??tre une cha??ne de caract??res',
            'address.required' => 'Vous devez renseigner une adresse',
            'address.string' => 'L\'adresse doit ??tre une cha??ne de caract??res',
            'zipCode.required' => 'Vous devez renseigner un code postal',
            'zipCode.string' => 'Le code postal doit ??tre une cha??ne de caract??res',
            'city.required' => 'Vous devez renseigner une ville',
            'city.string' => 'La ville doit ??tre une cha??ne de caract??res',
            'category_id.required' => 'Vous devez renseigner une cat??gorie',
            'category_id.exists' => 'La cat??gorie doit exister',
        ]);
        if($validator->fails()){
            return response()->json([
                "error"=> $validator->messages()
            ]);
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
        $post->datetimeType     = $request->datetimeType;
        $post->datetimePost     = $request->datetimePost;
        $post->category()->associate(Category::findOrFail($request->category_id));
        $post->user()->associate(Auth::user()->id);
        //$post->user()->associate(1);

        $post->save();

        return $this->sendResponse();
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
            'cost' => 'required|integer|min:0',
            'toolsProvided' => 'required|string|max:1',
            'toolsType' => 'nullable|string',
            'address' => 'required|string',
            'zipCode' => 'required|string',
            'city' => 'required|string',
            'category_id' => 'required|integer|exists:categories,id',
        ],[
            'title.required' => 'Vous devez renseigner un titre',
            'title.max' => 'Le titre ne doit pas d??passer 80 caract??res',
            'title.string' => 'Le titre doit ??tre une cha??ne de caract??res',
            'description.required' => 'Vous devez renseigner une description',
            'description.string' => 'La description doit ??tre une cha??ne de caract??res',
            'timeLength.required' => 'Vous devez renseigner une dur??e approximative',
            'timeLength.integer' => 'Vous devez renseigner une dur??e approximative correcte',
            'cost.required' => 'Vous devez renseigner le nombre de grains de sel en r??compense',
            'cost.integer' => 'Le nombre de grains de sel doit ??tre un entier',
            'cost.min' => 'Le nombre de grains de sel doit ??tre sup??rieur ou ??gale ?? 0',
            'toolsProvided.required' => 'Vous devez renseigner si des outils sont n??cessaires',
            'toolsType.string' => 'Le type d\'outil doit ??tre une cha??ne de caract??res',
            'address.required' => 'Vous devez renseigner une adresse',
            'address.string' => 'L\'adresse doit ??tre une cha??ne de caract??res',
            'zipCode.required' => 'Vous devez renseigner un code postal',
            'zipCode.string' => 'Le code postal doit ??tre une cha??ne de caract??res',
            'city.required' => 'Vous devez renseigner une ville',
            'city.string' => 'La ville doit ??tre une cha??ne de caract??res',
            'category_id.required' => 'Vous devez renseigner une cat??gorie',
            'category_id.exists' => 'La cat??gorie doit exister',
        ]);
        if($validator->fails()){
            return response()->json([
                "error"=> $validator->messages()
            ]);
        }

        $post = Post::find($request->id);
        if (Auth::check() && Auth::user()->id == $post->user_id) {
            $post->title            = $request->title;
            $post->description      = $request->description;
            $post->timeLength       = $request->timeLength;
            $post->cost             = $request->cost;
            $post->toolsProvided    = $request->toolsProvided;
            $post->toolsType        = $request->toolsType;
            $post->address          = $request->address;
            $post->zipCode          = $request->zipCode;
            $post->city             = $request->city;
            $post->datetimeType     = $request->datetimeType;
            $post->datetimePost     = $request->datetimePost;
            $post->save();
        } else return $this->sendResponse(false, "Vous n'avez pas acc??s ?? cette partie !");

        return $this->sendResponse();
    }

    /**
     * Delete a post
     *
     * @param String $id
     * @return Request
     */
    public function delete($id) {
        if (!Auth::check()) return $this->sendResponse(false, "Vous n'avez pas acc??s ?? cette partie !");
        $post = Post::findOrFail($id);
        $post->delete();
        return $this->sendResponse();
    }

    /**
     * Mark a post as in progress
     *
     * @param String $id
     * @return Request
     */
    public function inProgress($id) {
        if (!Auth::check()) return $this->sendResponse(false, "Vous n'avez pas acc??s ?? cette partie !");
        $post = Post::findOrFail($id);
        $post->status = 'P';
        $post->save();

        // Mail user qui own l'annonce en disant

        return $this->sendResponse();
    }

    /**
     * Mark a post as finished
     *
     * @param String $id
     * @return Request
     */
    public function finish($id) {
        $post = Post::findOrFail($id);
        $post->status = 'F';
        $post->save();
        if ($post->userMaker != null) {
            // Create Transaction
            $transaction = new Transaction();
            $transaction->amount = $post->cost;
            $transaction->post()->associate($post->id);
            $transaction->save();
            // debit + cr??dit gds
            $post->user->money -= $post->cost;
            $post->user->save();
            $post->userMaker->money += $post->cost;
            $post->userMaker->save();
        }

        return $this->sendResponse();
    }

    /**
     * Candidate to a post
     *
     * @param String $id
     * @return Response
     */
    public function candidate($id) {
        $post = Post::findOrFail($id);
        if ($post->user_id != Auth::id()) {
            $candidate = new Candidate();
            $candidate->user()->associate(Auth::id());
            $candidate->post()->associate($id);
            $candidate->save();
            return $this->sendResponse();
        } else return $this->sendResponse(false, "Vous ne pouvez pas postuler ?? votre annonce !");
    }

    /**
     * Report a post
     *
     * @param Request $request
     * @return Response
     */
    public function report(Request $request) {
        $report = new Report();
        $report->$request->reason;
        $report->user()->associate(Auth::user()->id);
        $report->post()->associate($request->post_id);
        $report->userReported()->associate($request->user_reported_id);
        $report->save();

        return $this->sendResponse();
    }
}
