<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\User;
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


    public function balance(Request $request) {
        $users = User::withCount(['posts' => function ($query) {
            global $request;
            $query->whereRaw("DATE(created_at) BETWEEN '$request->dateDebut' AND '$request->dateFin'");
        }])->withCount(['postsMaker' => function ($query) {
            global $request;
            $query->whereRaw("DATE(created_at) BETWEEN '$request->dateDebut' AND '$request->dateFin'");
        }])->get();
        return $this->sendResponse(true, $users);
    }
    
    public function exportCsv(Request $request) {
        $request->dateDebut = "2022-06-01";
        $request->dateFin = "2022-06-30";
        $fileName = 'La_boite_a_sel.csv';
        $users = User::withCount(['posts' => function ($query) {
            global $request;
            $query->whereRaw("DATE(created_at) BETWEEN '$request->dateDebut' AND '$request->dateFin'");
        }])->withCount(['postsMaker' => function ($query) {
            global $request;
            $query->whereRaw("DATE(created_at) BETWEEN '$request->dateDebut' AND '$request->dateFin'");
        }])->get();

        $headers = array(
            "Content-Encoding"    => "UTF-8",
            "Content-type"        => "text/csv; charset=UTF-8",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        );

        $columns = array('Nom & Prénom', 'Service reçu', 'Service donné', 'Total');

        $callback = function() use($users, $columns) {
            $file = fopen('php://output', 'w');
            fprintf($file, chr(0xEF).chr(0xBB).chr(0xBF));
            fputcsv($file, $columns);

            foreach ($users as $user) {
                $row['name']  = $user->firstName . " " . $user->lastName;
                $row['posts']  = $user->posts_count;
                $row['postsMaker']  = $user->posts_maker_count;
                $row['total']  = intval($user->posts_maker_count) + intval($user->posts_count);

                fputcsv($file, array($row['name'], $row['posts'], $row['postsMaker'], $row['total']));
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
