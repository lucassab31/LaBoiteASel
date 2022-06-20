<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use stdClass;

class UsersController extends Controller
{
    /**
     * Display all users
     *
     * @param integer $id
     * @return Request
     */
    public function index() {
        $users = User::all();
        return $this->sendResponse(true, $users);
    }

    /**
     * Display the specified user
     *
     * @param String $id
     * @return Request
     */
    public function view($id) {
        $user = User::where('id', $id)->with(['posts' => function ($query) {
            $query->orderByDesc('created_at');
        }])->first();
        return $this->sendResponse(true, $user);
    }

    /**
     * Store the created user
     *
     * @param Request $request
     * @return Request
     */
    public function store(Request $request) {
        $input = $request->all();
        $validator = Validator::make($input, [
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string',
            'dateOfBirth' => 'required|date',
            'money' => 'required|integer',
            'address' => 'required|string',
            'zipCode' => 'required|string',
            'city' => 'required|string',
            'role' => 'required|string|max:1'
        ],[
            'firstName.required' => 'Vous devez renseigner un prénom',
            'firstName.string' => 'Le prénom doit être une chaîne de caractères',
            'lastName.required' => 'Vous devez renseigner un nom',
            'lastName.string' => 'Le nom doit être une chaîne de caractères',
            'email.required' => 'Vous devez renseigner une adresse email',
            'email.email' => 'L\'email doit être valide (par exemple : nom.prenom@exemple.com)',
            'email.unique' => 'Un compte existe déjà avec cette adresse email',
            'phone.required' => 'Vous devez renseigner un numéro de téléphone',
            'phone.string' => 'Le numéro de téléphone doit être une chaîne de caractères',
            'dateOfBirth.required' => 'Vous devez renseigner une date de naissance',
            'dateOfBirth.date' => 'La date de naissance doit être une date',
            'money.required' => 'Vous devez renseigner une somme de départ',
            'money.integer' => 'Le nombre de grains de sel doit être un entier',
            'address.required' => 'Vous devez renseigner une adresse',
            'address.string' => 'L\'adresse doit être une chaîne de caractères',
            'zipCode.required' => 'Vous devez renseigner un code postal',
            'zipCode.string' => 'Le code postal doit être une chaîne de caractères',
            'city.required' => 'Vous devez renseigner une ville en France',
            'city.string' => 'La ville doit être une chaîne de caractères',
            'role.required' => 'Vous devez renseigner un rôle'
        ]);
        if($validator->fails()) {
            return $this->sendResponse(false, $validator->errors());
        }

        $user = new User();
        $user->firstName        = $request->firstName;
        $user->lastName         = $request->lastName;
        $user->email            = $request->email;
        $user->phone            = $request->phone;
        $user->dateOfBirth      = $request->dateOfBirth;
        $user->money            = $request->money;
        $user->address          = $request->address;
        $user->zipCode          = $request->zipCode;
        $user->city             = $request->city;
        $user->role             = $request->role;
        $password               = Str::random(6);
        $user->password         = bcrypt($password);
        $user->save();

        // mail user avec pswd

        return $this->sendResponse();
    }

    /**
     * Update a user
     *
     * @param Request $request
     * @return Request
     */
    public function update(Request $request) {
        $input = $request->all();
        $validator = Validator::make($input, [
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string',
            'dateOfBirth' => 'required|date',
            'money' => 'required|integer',
            'address' => 'required|string',
            'zipCode' => 'required|string',
            'city' => 'required|string',
            'role' => 'required|string|max:1'
        ],[
            'firstName.required' => 'Vous devez renseigner un prénom',
            'firstName.string' => 'Le prénom doit être une chaîne de caractères',
            'lastName.required' => 'Vous devez renseigner un nom',
            'lastName.string' => 'Le nom doit être une chaîne de caractères',
            'email.required' => 'Vous devez renseigner une adresse email',
            'email.email' => 'L\'email doit être valide (par exemple : nom.prenom@exemple.com)',
            'email.unique' => 'Un compte existe déjà avec cette adresse email',
            'phone.required' => 'Vous devez renseigner un numéro de téléphone',
            'phone.string' => 'Le numéro de téléphone doit être une chaîne de caractères',
            'dateOfBirth.required' => 'Vous devez renseigner une date de naissance',
            'dateOfBirth.date' => 'La date de naissance doit être une date',
            'money.required' => 'Vous devez renseigner une somme de départ',
            'money.integer' => 'Le nombre de grains de sel doit être un entier',
            'address.required' => 'Vous devez renseigner une adresse',
            'address.string' => 'L\'adresse doit être une chaîne de caractères',
            'zipCode.required' => 'Vous devez renseigner un code postal',
            'zipCode.string' => 'Le code postal doit être une chaîne de caractères',
            'city.required' => 'Vous devez renseigner une ville en France',
            'city.string' => 'La ville doit être une chaîne de caractères',
            'role.required' => 'Vous devez renseigner un rôle'
        ]);
        if($validator->fails()) {
            return $this->sendResponse(false, $validator->errors());
        }

        $user = User::find($request->id);
        $user->firstName        = $request->firstName;
        $user->lastName         = $request->lastName;
        $user->email            = $request->email;
        $user->phone            = $request->phone;
        $user->dateOfBirth      = $request->dateOfBirth;
        $user->money            = $request->money;
        $user->address          = $request->address;
        $user->zipCode          = $request->zipCode;
        $user->city             = $request->city;
        $user->role             = $request->role;
        $user->save();

        return $this->sendResponse();
    }

    /**
     * Reset a user's password
     *
     * @param String $id
     * @return Request
     */
    public function resetPassword($id) {
        $user = User::findOrFail($id);
        $password               = Str::random(6);
        $user->password         = bcrypt($password);
        $user->save();

        // Mail user

        return $this->sendResponse();
    }

    /**
     * Delete a user
     *
     * @param String $id
     * @return Request
     */
    public function delete($id) {
        $user = User::findOrFail($id);
        $user->delete();
        return $this->sendResponse();
    }
}
