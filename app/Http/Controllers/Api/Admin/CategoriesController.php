<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CategoriesController extends Controller
{
    /**
     * Display all categories
     *
     * @param integer $id
     * @return Request
     */
    public function index() {
        $categories = Category::all();
        return $this->sendResponse(true, $categories);
    }

    /**
     * Display the specified category
     *
     * @param integer $id
     * @return Request
     */
    public function view($id) {
        $category = Category::findOrFail($id);
        return $this->sendResponse(true, $category);
    }

    /**
     * Store the created category
     *
     * @param Request $request
     * @return Request
     */
    public function store(Request $request) {
        $input = $request->all();
        $validator = Validator::make($input, [
            'title' => 'required|max:100|string',
            'description' => 'required|string'
        ],[
            'title.required' => 'Vous devez renseigner un titre',
            'title.max' => 'Le titre ne doit pas dépasser 100 caractères',
            'title.string' => 'Le titre doit être une chaîne de caractères',
            'description.required' => 'Vous devez renseigner une description',
            'description.string' => 'La description doit être une chaîne de caractères'
        ]);
        if($validator->fails()){
            return response()->json([
                "success" => false,
                "error" => $validator->errors()
            ]);
        }

        $category = new Category();
        $category->title            = $request->title;
        $category->description      = $request->description;
        $category->save();

        return $this->sendResponse();
    }

    /**
     * Update a category
     *
     * @param Request $request
     * @return Request
     */
    public function update(Request $request) {
        $request->validate([
            'title' => 'required|max:100|string',
            'description' => 'required|string',
        ],[
            'title.required' => 'Vous devez renseigner un titre',
            'title.max' => 'Le titre ne doit pas dépasser 100 caractères',
            'title.string' => 'Le titre doit être une chaîne de caractères',
            'description.required' => 'Vous devez renseigner une description',
            'description.string' => 'La description doit être une chaîne de caractères'
        ]);

        $category = Category::find($request->id);
        $category->title            = $request->title;
        $category->description      = $request->description;
        $category->save();

        return $this->sendResponse();
    }

    /**
     * Delete a category
     *
     * @param Request $request
     * @return Request
     */
    public function delete(Request $request) {
        $category = Category::findOrFail($request->id);
        $category->delete();
        return $this->sendResponse();
    }
}
