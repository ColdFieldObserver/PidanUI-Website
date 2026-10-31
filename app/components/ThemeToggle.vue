<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useTheme, type ThemeMode } from '~/composables/useTheme';

// 主题开关：胶囊形，三态循环（跟随系统 → 浅色 → 深色）。
// 滑块停在 左 / 中 / 右 分别对应 跟随系统 / 浅色 / 深色，滑块上显示当前模式图标；
// 轨道两端各有一个静态小图标，交代这个胶囊是「浅↔深」的开关。
const { mode, cycle } = useTheme();

// 服务端只能渲染 auto（localStorage 在 SSR 不存在），而客户端一开始就能读到
// 已保存的模式。首帧统一按 auto 渲染、挂载后再切到真实模式，
// 否则 title / aria-label / 图标会与 SSR 不一致而触发 hydration 警告。
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});
const shownMode = computed<ThemeMode>(() => (mounted.value ? mode.value : 'auto'));

const LABELS: Record<ThemeMode, string> = {
  auto: '跟随系统',
  light: '浅色模式',
  dark: '深色模式',
};

const ICONS: Record<ThemeMode, string> = {
  // 跟随系统用「太阳+月亮」而不是显示器：显示器图标在本站还表示「Windows」
  auto: 'i-lucide-sun-moon',
  light: 'i-lucide-sun',
  dark: 'i-lucide-moon',
};

/** 滑块档位：0 = 左（跟随系统）、1 = 中（浅色）、2 = 右（深色） */
const STOPS: Record<ThemeMode, number> = { auto: 0, light: 1, dark: 2 };

const label = computed(() => LABELS[shownMode.value]);
const icon = computed(() => ICONS[shownMode.value]);
const stop = computed(() => STOPS[shownMode.value]);
</script>

<template>
  <button
    type="button"
    class="theme-switch"
    :data-stop="stop"
    :title="`当前：${label}（点击切换）`"
    :aria-label="`切换主题，当前${label}`"
    @click="cycle"
  >
    <UIcon name="i-lucide-sun-moon" class="theme-switch__mark theme-switch__mark--auto" aria-hidden="true" />
    <UIcon name="i-lucide-sun" class="theme-switch__mark theme-switch__mark--light" aria-hidden="true" />
    <UIcon name="i-lucide-moon" class="theme-switch__mark theme-switch__mark--dark" aria-hidden="true" />
    <span class="theme-switch__knob">
      <UIcon :name="icon" class="size-3.5" aria-hidden="true" />
    </span>
  </button>
</template>

<style scoped>
/* 几何一次算清，避免「差 1px」的错位：
   滑块直径 = 高 - (描边 + 内边距) × 2 —— 这样滑块与胶囊内缘之间的留白
   恰好等于 padding，滑块圆与胶囊圆头同心，圆角衔接才不显突兀；
   滑块行程 = 宽 - (描边 + 内边距) × 2 - 滑块直径。
   三档位置用 data-stop 表达（0/1/2），不用内联 style —— 内联自定义属性在
   hydration 时容易被判定成样式不一致 */
.theme-switch {
  --switch-w: 78px;
  --switch-h: 34px;
  --switch-border: 1px;
  --switch-pad: 3px;
  --knob: calc(var(--switch-h) - (var(--switch-border) + var(--switch-pad)) * 2);
  --travel: calc(var(--switch-w) - (var(--switch-border) + var(--switch-pad)) * 2 - var(--knob));
  --mark: 15px;

  position: relative;
  display: inline-flex;
  flex: none;
  align-items: center;
  width: var(--switch-w);
  height: var(--switch-h);
  padding: var(--switch-pad);
  background: var(--card);
  border: var(--switch-border) solid var(--line);
  border-radius: 999px;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.theme-switch:hover {
  border-color: var(--brand-deep);
}

.theme-switch:focus-visible {
  outline: 2px solid var(--color-brand-deep-a35);
  outline-offset: 2px;
}

/* 轨道上的三个静态图标：标出 跟随系统 / 浅色 / 深色 三个落点，
   不参与状态（当前状态由滑块上的图标表示）。
   横向位置 = 滑块中心：padding + 半径 + n × 半程，居中靠 translateX(-50%) */
.theme-switch__mark {
  position: absolute;
  top: 50%;
  width: var(--mark);
  height: var(--mark);
  color: var(--ink-3);
  opacity: 0.6;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.theme-switch__mark--auto {
  left: calc(var(--switch-pad) + var(--knob) / 2);
}

.theme-switch__mark--light {
  left: calc(var(--switch-pad) + var(--knob) / 2 + var(--travel) / 2);
}

.theme-switch__mark--dark {
  left: calc(var(--switch-pad) + var(--knob) / 2 + var(--travel));
}

/* 纵向用 inset + auto 外边距居中，而不是 top:50% + translateY(-50%)：
   后者在半像素高度下会出现 0.5px 偏移，圆头与滑块的高低差就是这么来的 */
.theme-switch__knob {
  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--switch-pad);
  display: grid;
  place-items: center;
  width: var(--knob);
  height: var(--knob);
  margin-block: auto;
  color: #1d2129;
  background: var(--brand-deep);
  border-radius: 50%;
  transform: translateX(0);
  transition: transform 0.22s ease;
}

.theme-switch[data-stop='1'] .theme-switch__knob {
  transform: translateX(calc(var(--travel) / 2));
}

.theme-switch[data-stop='2'] .theme-switch__knob {
  transform: translateX(var(--travel));
}

@media (prefers-reduced-motion: reduce) {
  .theme-switch,
  .theme-switch__knob {
    transition: none;
  }
}
</style>
