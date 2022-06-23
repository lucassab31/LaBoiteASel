<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->firstName        = "Jean";
        $user->lastName         = "Dupont";
        $user->email            = "jean.dupont@gmail.com";
        $user->phone            = "0612345678";
        $user->dateOfBirth      = "1971-05-29";
        $user->money            = 1000;
        $user->address          = "32 rue de Nancy";
        $user->zipCode          = "75010";
        $user->city             = "Paris";
        $user->role             = 'A';
        $password               = "laboitasel";
        $user->password         = bcrypt($password);
        $user->save();

        $user = new User();
        $user->firstName        = "Claudette";
        $user->lastName         = "Maréchale";
        $user->email            = "claudette.marechal@gmail.com";
        $user->phone            = "0612345678";
        $user->dateOfBirth      = "1960-11-02";
        $user->money            = 1000;
        $user->address          = "87 rue de la Loire";
        $user->zipCode          = "42100";
        $user->city             = "Saint-Étienne";
        $user->role             = 'U';
        $password               = "laboitasel";
        $user->password         = bcrypt($password);
        $user->save();
    }
}
