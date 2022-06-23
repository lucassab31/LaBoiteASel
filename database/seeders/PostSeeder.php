<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $post = new Post();
        $post->title            = "Taillage de hais";
        $post->description      = "Bonjour, je souhaite faire tailler ma hais qui fait 100m de long";
        $post->timeLength       = 60;
        $post->cost             = 150;
        $post->toolsProvided    = "Y";
        $post->toolsType        = "Taille hais";
        $post->address          = "32 rue de Nancy";
        $post->zipCode          = "75010";
        $post->city             = "Paris";
        $post->datetimeType     = "A";
        $post->datetimePost     = "2022-06-23 11:56:51";
        $post->category()->associate(1);
        $post->user()->associate(1);
        $post->save();

        $post = new Post();
        $post->title            = "Tonte de pelouse";
        $post->description      = "Bonjour, je souhaite faire tondre ma pelouse";
        $post->timeLength       = 30;
        $post->cost             = 80;
        $post->toolsProvided    = "N";
        $post->toolsType        = "Tondeuse";
        $post->address          = "87 rue de la Loire";
        $post->zipCode          = "42100";
        $post->city             = "Saint-Étienne";
        $post->datetimeType     = "B";
        $post->datetimePost     = "2022-06-30 10:30:00";
        $post->category()->associate(1);
        $post->user()->associate(2);
        $post->save();

        $post = new Post();
        $post->title            = "Garde de mes enfant";
        $post->description      = "Bonjour, je souhaite faire garder mes lorsque je vais amener ma femme à l'aéroport";
        $post->timeLength       = 30;
        $post->cost             = 80;
        $post->toolsProvided    = "A";
        $post->toolsType        = "";
        $post->address          = "32 rue de Nancy";
        $post->zipCode          = "75010";
        $post->city             = "Paris";
        $post->datetimeType     = "O";
        $post->datetimePost     = "2022-06-25 14:00:00";
        $post->category()->associate(3);
        $post->user()->associate(1);
        $post->save();
    }
}
