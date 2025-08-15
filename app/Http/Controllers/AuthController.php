<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;


class AuthController extends Controller {

  public function create(Request $request): Response
    {
      return Inertia::render('auth/login', [
        'canResetPassword' => Route::has('password.request'),
        'status' => '',
      ]);
    }

  public function register(Request $request) {
    $data = $request->validate([
      'name' => 'required|string|max:191',
      'email' => 'required|email|unique:users,email',
      'password' => 'required|string|min:8|confirmed',
    ]);

    $user = User::create([
      'name' => $data['name'],
      'email' => $data['email'],
      'password' => Hash::make($data['password']),
      'slug' => \Str::slug($data['name']) . '-' . \Str::random(4),
    ]);

    $token = $user->createToken('api-token')->plainTextToken;

    return response()->json(['user' => $user, 'token' => $token], 201);
  }

  public function login(Request $request) {
    $data = $request->validate(['email'=>'required|email','password'=>'required']);
    $user = User::where('email',$data['email'])->first();
    if (!$user || !Hash::check($data['password'],$user->password)) {
        throw ValidationException::withMessages(['email' => ['The provided credentials are incorrect.']]);
    }
    $token = $user->createToken('api-token')->plainTextToken;
    return response()->json(['user'=>$user,'token'=>$token]);
  }

  public function me(Request $request) {
    return response()->json($request->user());
  }

  public function logout(Request $request) {
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Logged out']);
  }
}