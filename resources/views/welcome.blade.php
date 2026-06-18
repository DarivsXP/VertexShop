<!DOCTYPE html>

<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

```
<title>V Cyril Darivs | Full Stack Developer</title>

<link rel="icon" type="image/png" href="{{ asset('logo.png') }}">

<meta name="description" content="Portfolio of V Cyril Darivs, Full Stack Web Developer specializing in Laravel, Vue.js, PHP, and AI-powered applications.">

<meta property="og:title" content="V Cyril Darivs | Full Stack Developer">
<meta property="og:description" content="Laravel, Vue.js, PHP, AI Projects, and Web Development Portfolio">
<meta property="og:image" content="{{ url('logo.png') }}">
<meta property="og:type" content="website">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="{{ url('logo.png') }}">

@vite(['resources/css/app.css', 'resources/js/app.js'])
```

</head>

<body class="bg-slate-950 text-white">

```
<section class="min-h-screen flex flex-col items-center justify-center px-6 text-center">

    <img
        src="{{ asset('logo.png') }}"
        alt="VCD Logo"
        class="w-32 mb-8"
    >

    <h1 class="text-5xl md:text-7xl font-bold mb-4">
        V Cyril Darivs
    </h1>

    <h2 class="text-xl md:text-2xl text-slate-300 mb-6">
        Full Stack Web Developer
    </h2>

    <p class="max-w-2xl text-slate-400 mb-8">
        I build modern web applications using Laravel, Vue.js, PHP, MySQL,
        JavaScript, TypeScript, and AI-powered technologies.
    </p>

    <div class="flex gap-4">
        <a href="#projects"
           class="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            View Projects
        </a>

        <a href="/resume.pdf"
           target="_blank"
           class="px-6 py-3 border border-slate-600 rounded-lg hover:bg-slate-800 transition">
            Resume
        </a>
    </div>

</section>
```

</body>
</html>
