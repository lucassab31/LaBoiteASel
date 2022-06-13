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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstName');
            $table->string('lastName');
            $table->string('email', 150)->unique();
            $table->string('phone');
            $table->string('password');
            $table->date('dateOfBirth');
            $table->integer('money')->unsigned()->default(0);
            $table->string('address', 200);
            $table->string('zipCode', 50);
            $table->string('city', 100);
            $table->char('role', 1)->default('U');
            $table->string('profilePicture')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
