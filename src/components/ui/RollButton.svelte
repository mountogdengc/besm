<script>
  let { onclick, title = "Roll" } = $props();
</script>

<button
  class="w-5 h-5 bg-slate-700 border-0 text-slate-400 rounded text-xs cursor-pointer hover:bg-slate-600 hover:text-slate-200 inline-flex items-center justify-center flex-shrink-0"
  {onclick}
  {title}
>🎲</button>
