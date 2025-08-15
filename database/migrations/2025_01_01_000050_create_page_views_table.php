<?php
use Illuminate\Database\Migrations\Migration; use Illuminate\Database\Schema\Blueprint; use Illuminate\Support\Facades\Schema;
return new class extends Migration { public function up(): void { Schema::create('page_views', function (Blueprint $table) { $table->id(); $table->foreignId('page_id')->constrained('pages')->cascadeOnDelete(); $table->uuid('visitor_id')->nullable(); $table->ipAddress('ip_address')->nullable(); $table->text('user_agent')->nullable(); $table->string('referer')->nullable(); $table->timestamps(); $table->index(['page_id','created_at']); }); } public function down(): void { Schema::dropIfExists('page_views'); } };

