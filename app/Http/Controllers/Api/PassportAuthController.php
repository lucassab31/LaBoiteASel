<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class PassportAuthController extends Controller
{
    /**
     * Registration Req
     */
    public function register(Request $request)
    {
        $user = User::create([
            'lastName' => $request->lastName,
            'firstName' => $request->firstName,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'phone' => $request->phone,
            'dateOfBirth' => $request->dateOfBirth,
            'address' => $request->address,
            'zipCode' => $request->zipCode,
            'city' => $request->city,
        ]);

        $token = $user->createToken('Laravel9PassportAuth')->accessToken;

        return response()->json(['token' => $token], 200);
    }

    /**
     * Login Req
     */
    public function login(Request $request)
    {
        $data = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (auth()->attempt($data)) {
            $token = User::findOrFail(auth()->id())->createToken('Laravel9PassportAuth')->accessToken;
            //$token = auth()->user()->createToken('Laravel9PassportAuth')->accessToken;
            return response()->json(['token' => $token], 200);
        } else {
            return response()->json(['error' => 'Unauthorised'], 401);
        }
    }

    public function logout() {
        auth()->logout();
    }

    public function userInfo()
    {
        $user = auth()->user();
        return response()->json(['user' => $user], 200);
    }
}
