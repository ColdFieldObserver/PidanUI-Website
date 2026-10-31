<script setup lang="ts">
import { openSearchDialog } from '~/composables/useSearch';

/**
 * 搜索入口。
 * - 默认形态：列表页顶部的大搜索框（带 Ctrl + K 提示）
 * - compact：顶栏里的方形图标按钮
 * 两种形态都保留 `.search-launcher` 类，无 JS 时由 base.css 隐藏并显示 fallback 链接。
 */
withDefaults(defineProps<{ compact?: boolean }>(), { compact: false });
</script>

<template>
  <UButton
    v-if="compact"
    class="search-launcher"
    variant="ghost"
    color="neutral"
    square
    icon="i-lucide-search"
    aria-label="搜索新闻标题与正文"
    aria-haspopup="dialog"
    aria-keyshortcuts="Control+K Meta+K"
    @click="openSearchDialog($event.currentTarget as HTMLElement)"
  />
  <UButton
    v-else
    class="search-launcher mb-[18px] w-full justify-start gap-3 rounded-full px-[18px] py-3 text-[15px] font-normal"
    variant="outline"
    color="neutral"
    icon="i-lucide-search"
    label="搜索新闻标题与正文..."
    aria-haspopup="dialog"
    aria-keyshortcuts="Control+K Meta+K"
    @click="openSearchDialog($event.currentTarget as HTMLElement)"
  >
    <template #trailing>
      <!-- 静态写 Ctrl / K：navigator 在 SSR 不可用，按平台渲染会带来水合跳变；
           真正的平台语义交给 aria-keyshortcuts -->
      <span class="ms-auto flex items-center gap-1" aria-hidden="true">
        <UKbd size="sm">Ctrl</UKbd>
        <UKbd size="sm">K</UKbd>
      </span>
    </template>
  </UButton>

  <!-- 无 JS 时对话框打不开，退化成站内搜索页链接 -->
  <a
    class="search-launcher-fallback hidden text-brand-600 underline"
    :class="compact ? 'items-center' : 'mb-[18px]'"
    :href="withBase('/search/')"
    :aria-label="compact ? '打开搜索页' : undefined"
  >
    <template v-if="compact">
      <UIcon name="i-lucide-search" class="size-5" aria-hidden="true" />
    </template>
    <template v-else>打开搜索页</template>
  </a>
</template>
