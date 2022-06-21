<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use stdClass;

class StatsController extends Controller
{
    /**
     * Get the admin dashboard
     *
     * @return Response
     */
    public function index() {
        $postsGraph = DB::table('posts')
                    ->select(DB::raw("DATE(created_at) as Date, SUM(status='F') as Finished, SUM(status='C') as Created, SUM(status='P') Progress"))
                    ->whereRaw('DATE(created_at) BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE()')
                    ->groupBy(DB::raw("DATE(created_at)"))
                    ->get();
        $latestPosts = Post::where('status', 'C')->with('category')->orderByDesc('created_at')->limit(10)->get();
        $oPosts = new stdClass();
        $oPosts->postsGraph = $postsGraph;
        $oPosts->lastestPosts = $latestPosts;
        return $this->sendResponse(true, $oPosts);
    }

    public function (Request $request) {
        $posts = Post::whereRaw("DATE(created_at) BETWEEN $request->dateDebut AND $request->dateFin")->get();
        return $this->sendResponse(true, $posts);
    }
}
