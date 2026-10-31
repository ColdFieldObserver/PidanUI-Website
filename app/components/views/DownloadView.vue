<script setup lang="ts">
import { computed } from 'vue';
import { downloadMeta } from '~/data';
import { PROMO_IMAGE } from '~/data/home';

// 数据来自构建期打包的本地模块（downloadMeta），运行时不发起任何网络请求。
// 版式：一张「宣传图 + 版本信息 + 下载按钮」的整体卡片，下方按版本逐行列出，
// 全部静态展开（旧版的手风琴与「同时只展开一个」的状态已移除）。
const title = downloadMeta.title || '下载';
const badge = downloadMeta.version ? `v${downloadMeta.version}` : '';
const overallDesc = downloadMeta.description || '';
const versions = downloadMeta.versions?.length ? downloadMeta.versions : null;

/** 主下载按钮指向第一个有链接的版本 */
const primary = computed(() => versions?.find((v) => v.downloadUrl) ?? null);
</script>

<template>
  <div class="mx-auto max-w-page">
    <section class="overflow-hidden rounded-xl border border-default">
      <!-- 上半：宣传图 + 版本信息 + 主下载按钮 -->
      <div class="grid lg:grid-cols-[1.15fr_1fr]">
        <img
          class="aspect-[16/10] w-full object-cover lg:aspect-auto lg:h-full"
          :src="PROMO_IMAGE"
          alt="PidanUI 宣传图"
          width="960"
          height="600"
          decoding="async"
          fetchpriority="high"
        />

        <div class="flex flex-col gap-4 p-6 lg:p-8">
          <div class="flex flex-wrap items-center gap-2.5">
            <PageTitle :title="title" />
            <UBadge v-if="badge" variant="soft" color="primary" :label="badge" />
            <UBadge
              v-if="versions"
              variant="outline"
              color="neutral"
              :label="`共 ${versions.length} 个版本`"
            />
          </div>

          <p v-if="overallDesc" class="text-[15px] leading-[1.8] text-toned">{{ overallDesc }}</p>

          <ul class="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-dimmed">
            <li class="flex items-center gap-1.5">
              <UIcon name="i-lucide-monitor" class="size-4" aria-hidden="true" />
              Windows 10 / 11
            </li>
            <li class="flex items-center gap-1.5">
              <UIcon name="i-lucide-download" class="size-4" aria-hidden="true" />
              网盘直链 · 免费
            </li>
            <li class="flex items-center gap-1.5">
              <UIcon name="i-lucide-shield-check" class="size-4" aria-hidden="true" />
              非盈利 · 禁止商用
            </li>
          </ul>

          <div class="mt-auto flex flex-wrap gap-2.5 pt-2">
            <UButton
              v-if="primary"
              :to="primary.downloadUrl"
              target="_blank"
              rel="noopener"
              size="lg"
              icon="i-lucide-download"
              :label="`下载 ${primary.version || '最新版本'}`"
            />
            <UButton to="/posts/" size="lg" variant="outline" color="neutral" label="查看更新公告" />
          </div>
        </div>
      </div>

      <!-- 下半：逐版本一行，全部展开 -->
      <div v-if="versions" class="divide-y divide-default border-t border-default">
        <div
          v-for="(v, i) in versions"
          :key="v.id || i"
          class="grid gap-3 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-6 md:p-6"
        >
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <h2 class="text-base font-semibold text-default">{{ v.type || '版本' }}</h2>
              <UBadge v-if="v.version" variant="soft" color="primary" size="sm" :label="v.version" />
            </div>

            <p v-if="v.description" class="mt-1.5 text-[13.5px] leading-[1.7] text-toned">
              {{ v.description }}
            </p>

            <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-dimmed">
              <span v-if="v.fileSize" class="flex items-center gap-1.5">
                <UIcon name="i-lucide-hard-drive" class="size-3.5" aria-hidden="true" />
                {{ v.fileSize }}
              </span>
              <span v-if="v.updateDate" class="flex items-center gap-1.5">
                <UIcon name="i-lucide-calendar-days" class="size-3.5" aria-hidden="true" />
                {{ v.updateDate }}
              </span>
            </div>
          </div>

          <UButton
            v-if="v.downloadUrl"
            :to="v.downloadUrl"
            target="_blank"
            rel="noopener"
            variant="soft"
            color="primary"
            icon="i-lucide-download"
            label="下载"
          />
          <UButton v-else variant="outline" color="neutral" disabled label="暂无链接" />
        </div>
      </div>
    </section>

    <EmptyState v-if="!versions" text="暂无版本信息" />
  </div>
</template>
