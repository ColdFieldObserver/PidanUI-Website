<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { SITE } from '#shared/site';
import { NAV_ITEMS } from '~/data/nav';
import { useActiveNavKey } from '~/composables/useNav';

// 全站顶栏：品牌 + 桌面横排导航 + 搜索 / 主题 / 汉堡。
// 移动端（< lg 即 < 1024px）导航收进顶栏正下方的下拉面板——
// 刻意不用 USlideover / UDrawer：那不是抽屉，不锁滚动，也没有边缘手势。
const route = useRoute();
const activeKey = useActiveNavKey();
const mobileOpen = ref(false);

const menuItems = computed(() =>
  NAV_ITEMS.map((item) => ({
    label: item.label,
    icon: item.icon,
    to: item.href,
    // 分类 / 标签 / 归档 / 搜索都算「新闻」分区，高亮不跟着路径乱跳
    active: activeKey.value === item.key,
  })),
);

// 路由切换后自动收起，避免面板停在新页面上空
watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false;
  },
);

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && mobileOpen.value) mobileOpen.value = false;
}

onMounted(() => document.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown));
</script>

<template>
  <UHeader
    :toggle="false"
    :title="SITE.brand"
    to="/"
    :ui="{ container: 'max-w-none px-4 sm:px-6 lg:px-8', right: 'flex items-center gap-1' }"
  >
    <!-- UHeader 的 #title 插槽本身是 flex items-end（图标贴底对齐），
         直接把图片与文字塞进去会基线错位；这里包一层，让内部按垂直居中排布。
         品牌名是纯大写形态，字形只占上行空间，行盒垂直居中时视觉上仍会偏高
         约 1.5px（实测墨迹中心 12.33 / 行盒中心 14），因此再做一次视觉补偿。 -->
    <template #title>
      <span class="flex items-center gap-2">
        <img
          class="size-8 shrink-0 rounded-lg object-contain"
          :src="withBase('/images/logo.webp')"
          :alt="SITE.brand"
          width="32"
          height="32"
          decoding="async"
          fetchpriority="high"
        />
        <span class="translate-y-[1.5px]">{{ SITE.brand }}</span>
      </span>
    </template>

    <UNavigationMenu :items="menuItems" highlight />

    <template #right>
      <SearchLauncher compact />
      <ThemeToggle />
      <UButton
        class="lg:hidden"
        variant="ghost"
        color="neutral"
        square
        :icon="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'"
        :aria-label="mobileOpen ? '关闭主导航' : '打开主导航'"
        :aria-expanded="mobileOpen"
        aria-controls="site-mobile-nav"
        @click="mobileOpen = !mobileOpen"
      />
    </template>

    <!-- 顶栏正下方的下拉面板：绝对定位，不撑高 sticky header，因此滚动不跳动。
         收起态用 grid-rows-[0fr] + inert：内容不占位、也不进键盘 Tab 序列。 -->
    <template #bottom>
      <div
        id="site-mobile-nav"
        class="absolute inset-x-0 top-full grid overflow-hidden border-b border-default bg-default shadow-lg transition-[grid-template-rows] duration-300 lg:hidden"
        :class="mobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
        :inert="!mobileOpen"
      >
        <div class="min-h-0 overflow-hidden">
          <UNavigationMenu orientation="vertical" :items="menuItems" class="p-2" />
        </div>
      </div>
    </template>
  </UHeader>
</template>
