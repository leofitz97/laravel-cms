<!DOCTYPE html>
<html>
<head>
  <title>{{ $page->title }}</title>
  @vite('resources/css/app.css')
</head>
<body class="page-modern-blue h-screen">
  @if($page->background_path)
    <div class="h-full" style="background-image:url('{{ asset($page->background_path) }}'); background-size:cover;">
  @endif

  <div class='p-2'>
    <header class='flex gap-2'>
      @if($page->logo_path)
      <img src="{{ asset($page->logo_path) }}" alt="Logo" style="max-height:40px;">
      @endif
      <h1 class="text-center font-bold text-2xl">{{ $page->title }}</h1>
    </header>

    <main class="prose">
      {!! $page->body !!}
    </main>
    @if($page->background_path)
      </div>
    @endif
  </div>
</body>
</html>
