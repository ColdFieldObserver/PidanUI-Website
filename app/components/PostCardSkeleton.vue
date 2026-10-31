<template>
  <!-- 与 PostCard 同结构的骨架（封面通栏 + 三行文字），避免结果区高度跳变。
       USkeleton 主题默认 bg-elevated，而 --ui-bg-elevated 被映射成卡片白，
       白底上是隐形骨架 —— 这里统一改成 bg-line。 -->
  <div
    class="overflow-hidden rounded-xl border border-ink-300/60 bg-transparent dark:border-default"
    aria-hidden="true"
  >
    <USkeleton class="aspect-[16/9] w-full rounded-none" :ui="{ base: 'bg-line' }" />
    <div class="flex flex-col gap-2 p-4">
      <USkeleton class="h-3.5 w-4/5" :ui="{ base: 'bg-line' }" />
      <USkeleton class="h-3 w-1/3" :ui="{ base: 'bg-line' }" />
      <USkeleton class="h-3 w-full" :ui="{ base: 'bg-line' }" />
    </div>
  </div>
</template>
