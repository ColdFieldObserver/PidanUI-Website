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
   描边用 inset box-shadow 画在盒子内部，而不是 border —— 浏览器会按设备像素
   把 border 取整（1px 可能落成 0.8/1.2），上下左右不对称，胶囊圆头和滑块
   就会出现肉眼可见的偏心；inset 阴影不参与布局，四边内缩严格相等。
   滑块直径 = 高 - 内边距 × 2，行程 = 宽 - 内边距 × 2 - 滑块直径：
   这样滑块与描边之间的留白处处等于 3px，两者同心。
   三档位置用 data-stop 表达（0/1/2），不用内联 style —— 内联自定义属性在
   hydration 时容易被判定成样式不一致 */
.theme-switch {
  --switch-w: 78px;
  --switch-h: 34px;
  /* 内边距比描边多 1px，保证滑块与描边之间留出 3px */
  --switch-pad: 4px;
  --switch-ring: 1px;
  --knob: calc(var(--switch-h) - var(--switch-pad) * 2);
  --travel: calc(var(--switch-w) - var(--switch-pad) * 2 - var(--knob));
  --mark: 15px;

  position: relative;
  display: inline-flex;
  flex: none;
  align-items: center;
  width: var(--switch-w);
  height: var(--switch-h);
  padding: 0;
  background: var(--card);
  border: 0;
  border-radius: 999px;
  box-shadow: inset 0 0 0 var(--switch-ring) var(--line);
  cursor: pointer;
  transition: box-shadow 0.2s ease;
}

.theme-switch:hover {
  box-shadow: inset 0 0 0 var(--switch-ring) var(--brand-deep);
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

/* 纵向用 inset 定位而非 top:50% + translateY(-50%)：滑块高度等于内高，
   inset-start 直接取 padding 即可与胶囊内缘等距，不会出现半像素偏移；
   横向同样从 padding 起算，三档用 translateX 推进 */
.theme-switch__knob {
  position: absolute;
  inset-block-start: var(--switch-pad);
  inset-inline-start: var(--switch-pad);
  display: grid;
  place-items: center;
  width: var(--knob);
  height: var(--knob);
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
