<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $category = new Category([
            'title' => 'Jardinerie',
            'description' => 'Toutes les annonces concernant la jardinerie',
        ]);
        $category->save();
        $category = new Category([
            'title' => 'Plomberie',
            'description' => 'Toutes les annonces concernant la jardinerie',
        ]);
        $category->save();
        $category = new Category([
            'title' => 'Garde d\'enfant',
            'description' => 'Toutes les annonces concernant la garde d\'enfant',
        ]);
        $category->save();
    }
}
