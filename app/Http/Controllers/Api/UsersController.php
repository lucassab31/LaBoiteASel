<?php

namespace App\Http\Controllers\Api;

use stdClass;
use App\Models\User;
use App\Models\Report;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    /**
     * Login a user
     *
     * @param Request $request
     * @return Response
     */
    public function login(Request $request)
    {
        $data = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (Auth::attempt($data)) {
            $token = Auth::user()->createToken('LaBoiteASel')->accessToken;
            return $this->sendResponse(true, $token);
        } else {
            return $this->sendResponse(false, "Adresse mail ou mot de passe incorrect");
        }
    }

    /**
     * Logout the authenticated user
     *
     * @return Response
     */
    public function logout() {
        if (Auth::check()) {
            Auth::logout();
            return $this->sendResponse();
        } else {
            return $this->sendResponse(false, "Vous n'êtes pas connecté");
        }
    }

    /**
     * View user profile
     *
     * @param String $id
     * @return Response
     */
    public function view($id) {
        if (Auth::id() == $id || $id == 0) {
            return $this->sendResponse(true, User::where('id', Auth::id())->withCount('posts')->withCount('postsMaker')->first());
        } else {
            $user = User::where('id', $id)->withCount('posts')->withCount('postsMaker')->first();
            if ($user == null) return $this->sendResponse(false, "Aucun utilisateur ne correspond");
            $oUser = new stdClass();
            $oUser->id = $user->id;
            $oUser->firstName = $user->firstName;
            $oUser->lastName = substr($user->lastName, 0, 1);
            $oUser->profilePicture = $user->profilePicture;
            $oUser->posts_count = $user->posts_count;
            $oUser->posts_maker_count = $user->posts_maker_count;
            $oUser->created_at = $user->created_at;
            return $this->sendResponse(true, $oUser);
        }
    }

    /**
     * View user's posts
     *
     * @param String $id
     * @return Response
     */
    public function viewPosts($id) {
        if (Auth::id() == $id) {
            $user = User::where('id', $id)->with(['posts' => function ($query) {
                $query->with('candidates')->orderByDesc('created_at');
            }])->first();
            return $this->sendResponse(true, $user);
        } else return $this->sendResponse(false, "Vous n'avez pas accès à cette partie !");
    }

    /**
     * View user's transactions
     *
     * @param String $id
     * @return Response
     */
    public function viewTransactions($id) {
        if (Auth::id() == $id) {
            $user = User::where('id', $id)->with(['transactions' => function ($query) {
                $query->orderByDesc('created_at');
            }])->first();
            return $this->sendResponse(true, $user);
        } else return $this->sendResponse(false, "Vous n'avez pas accès à cette partie !");
    }

    /**
     * View user's reports
     *
     * @param String $id
     * @return Response
     */
    public function viewReports($id) {
        if (Auth::id() == $id) {
            $user = User::where('id', $id)->with(['reports' => function ($query) {
                $query->orderByDesc('created_at');
            }])->first();
            return $this->sendResponse(true, $user);
        } else return $this->sendResponse(false, "Vous n'avez pas accès à cette partie !");
    }

    /**
     * Update a post
     *
     * @param Request $request
     * @return Response
     */
    public function update(Request $request) {
        if (Auth::id() == $request->id) {
            $input = $request->all();
            $validator = Validator::make($input, [
                'firstName' => 'required|string',
                'lastName' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'phone' => 'required|string',
                'dateOfBirth' => 'required|date',
                'address' => 'required|string',
                'zipCode' => 'required|string',
                'city' => 'required|string'
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
                'address.required' => 'Vous devez renseigner une adresse',
                'address.string' => 'L\'adresse doit être une chaîne de caractères',
                'zipCode.required' => 'Vous devez renseigner un code postal',
                'zipCode.string' => 'Le code postal doit être une chaîne de caractères',
                'city.required' => 'Vous devez renseigner une ville en France',
                'city.string' => 'La ville doit être une chaîne de caractères'
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
            $user->address          = $request->address;
            $user->zipCode          = $request->zipCode;
            $user->city             = $request->city;
            $user->save();
    
            return $this->sendResponse();
        } else return $this->sendResponse(false, "Vous n'avez pas accès à cette partie !");
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
        $report->userReported()->associate($request->user_reported_id);
        $report->save();

        return $this->sendResponse();
    }
}
