<script setup lang="ts">
import { computed } from 'vue';
import type { Post } from '#shared/types/post';

// ============================================================
// 首条特稿大卡（新闻列表第 1 页专用）
//
// 与 PostCard 共用同一套卡片语言（封面通栏 + 标题 / 分类·日期 / 摘要），
// 只放大字号、增加摘要行数与「阅读全文」，形成层级差而不是换一套外观。
// ============================================================
const props = defineProps<{ post: Post }>();

/** 封面：外链原样输出，站内相对路径补 base（与 PostCard 同一套规则） */
const coverSrc = computed(() => {
  const cover = props.post.cover;
  if (!cover) return withBase('/images/default_cover.webp');
  if (/^(?:https?:|data:)/i.test(cover)) return cover;
  return withBase(cover.startsWith('/') ? cover : `/${cover}`);
});

const CARD_UI = {
  root:
    'group w-full overflow-hidden rounded-xl border border-ink-300/60 bg-transparent ' +
    'transition-[border-color,box-shadow] duration-200 hover:border-brand-600/40 ' +
    'hover:shadow-card dark:border-default lg:gap-x-0',
  header: 'relative overflow-hidden bg-muted lg:aspect-auto lg:h-full',
  image: 'h-full w-full object-cover transition-transform duration-300 group-hover/blog-post:scale-[1.03]',
  body: 'flex flex-col justify-center gap-3 p-5 sm:p-6 lg:p-7',
} as const;
</script>

<template>
  <UBlogPost :to="post.url" orientation="horizontal" reverse variant="naked" :ui="CARD_UI">
    <template #header>
      <UBadge
        v-if="post.stickypost"
        class="absolute top-2 left-2 z-1"
        color="primary"
        size="sm"
        label="置顶"
      />
      <img :src="coverSrc" :alt="post.title" loading="eager" fetchpriority="high" decoding="async" />
    </template>

    <template #body>
      <h2 class="line-clamp-3 text-[19px] leading-[1.45] font-semibold text-default">
        {{ post.title }}
      </h2>

      <div class="flex flex-wrap items-center gap-1.5 text-[12.5px] text-dimmed">
        <span v-if="post.categories.length" class="font-medium text-brand-600">
          {{ post.categories[0] }}
        </span>
        <span v-if="post.categories.length" aria-hidden="true">·</span>
        <time>{{ post.date }}</time>
      </div>

      <p v-if="post.description" class="line-clamp-3 text-[13.5px] leading-[1.7] text-toned">
        {{ post.description }}
      </p>

      <span class="mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-brand-600">
        阅读全文
        <UIcon
          name="i-lucide-arrow-right"
          class="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </template>
  </UBlogPost>
</template>
