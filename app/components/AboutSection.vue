<script setup lang="ts">
// 关于页的章节外壳：负责 id 锚点、标题样式与统一的段落排版间距。
// 章节之间靠间距分隔，不再用「一张张卡片」——关于页是文档，不是落地页。
defineProps<{
  id: string;
  title: string;
  icon?: string;
}>();
</script>

<template>
  <section :id="id" class="scroll-mt-[calc(var(--shell-header-h)+24px)]">
    <h2 class="mb-4 flex items-center gap-2.5 text-lg font-bold text-default">
      <UIcon v-if="icon" :name="icon" class="size-5 shrink-0 text-brand-600" aria-hidden="true" />
      {{ title }}
    </h2>
    <div class="space-y-3.5 text-[15px] leading-[1.9] text-toned">
      <slot />
    </div>
  </section>
</template>
