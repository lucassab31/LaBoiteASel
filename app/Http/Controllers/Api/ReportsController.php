<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Models\Report;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ReportsController extends Controller
{
    /**
     * Display all the reports from the authenticated user
     *
     * @return Request
     */
    public function index() {
        $reports = Report::where(['user_id'=>Auth::user()->id])->orderBy('created_at', 'desc')->get();
        return response()->json([
            "success" => true,
            "data" => $reports
        ]);
    }

    /**
     * Display a report
     *
     * @param String $id
     * @return Request
     */
    public function view($id) {
        $report = Report::findOrFail($id);
        return response()->json([
            "success" => true,
            "data" => $report
        ]);
    }

    /**
     * Store the created report
     *
     * @param Request $request
     * @return Request
     */
    public function store(Request $request) {
        $request->validate([
            'reason' => 'required|string',
            'user_id' => 'required_unless:post_id,null|integer|exists:users,id',
            'post_id' => 'integer|exists:posts,id',
        ],[
            'reason.required' => 'Vous devez renseigner une raison',
            'reason.string' => 'La raison doit être une chaine de caratères',
            'user_id.required' => 'Le membre est obligatoire',
            'user_id.exists' => 'Le membre doit exister',
            'post_id.exists' => 'L\'annonce doit exister',
        ]);

        $report = new Report();
        $report->reason = $request->reason;
        $report->user_reported_id = $request->user_reported_id;
        $report->userReported()->associate(Auth::user()->id);
        $report->user()->associate(Auth::user()->id);
        $report->post()->associate(Post::find($request->post_id));
        $report->save();

        return request()->json([
            "success" => true
        ]);
    }

    /**
     * Delete a report
     *
     * @param @param String $id
     * @return Request
     */
    public function delete($id) {
        $report = Report::findOrFail($id);
        if ($report->status != 'F') {
            $report->delete();
            return request()->json([
                "success" => true
            ]);
        } else {
            return request()->json([
                "success" => false,
                'message' => 'Le signalement est cloturé, impossible de le supprimer.'
            ]);
        }
    }
}
