<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title', 80);
            $table->text('description');
            $table->integer('timeLength')->default(0);
            $table->integer('cost')->default(0);
            $table->char('toolsProvided', 1)->default('A');
            $table->string('toolsType', 255)->nullable();
            $table->char('status', 1)->default('C');
            $table->string('address', 200);
            $table->string('zipCode', 50);
            $table->string('city', 100);
            $table->boolean('visibility')->default(true);
            $table->timestamps();

            Schema::enableForeignKeyConstraints();
            
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('category_id')->nullable();
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('posts', function (Blueprint $table) {
            Schema::disableForeignKeyConstraints();
        });
        Schema::dropIfExists('posts');
    }
};
