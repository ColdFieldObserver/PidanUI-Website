<script setup lang="ts">
import { computed } from 'vue';
import { useTheme, type ThemeMode } from '~/composables/useTheme';

// 主题切换按钮：三态循环（跟随系统 → 浅色 → 深色），图标随当前模式变化
const { mode, cycle } = useTheme();

const LABELS: Record<ThemeMode, string> = {
  auto: '跟随系统',
  light: '浅色模式',
  dark: '深色模式',
};

const ICONS: Record<ThemeMode, string> = {
  auto: 'i-lucide-monitor',
  light: 'i-lucide-sun',
  dark: 'i-lucide-moon',
};

const label = computed(() => LABELS[mode.value]);
const icon = computed(() => ICONS[mode.value]);
</script>

<template>
  <!-- 顶栏里是一个方形图标按钮：宽度由内容决定，不会再像侧栏时期那样撑满一行 -->
  <UButton
    variant="ghost"
    color="neutral"
    square
    :icon="icon"
    :title="`当前：${label}（点击切换）`"
    :aria-label="`切换主题，当前${label}`"
    @click="cycle"
  />
</template>
