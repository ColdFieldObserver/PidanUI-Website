import { computed } from 'vue';
import type { NavKey } from '~/data/nav';

/**
 * 当前路由归属的导航分区。
 * 新闻分区涵盖文章、分类、标签、归档与站内搜索——它们同属"新闻中心"这一块，
 * 顶栏高亮时不应四处跳动。路径前缀判定与 `buildRoutes()` 生成的路由表一致。
 */
export function useActiveNavKey() {
  const route = useRoute();

  return computed<NavKey | ''>(() => {
    const path = route.path;
    if (path === '/' || path.startsWith('/index')) return 'home';
    if (path.startsWith('/download')) return 'download';
    if (
      path.startsWith('/posts') ||
      path.startsWith('/categories') ||
      path.startsWith('/tags') ||
      path.startsWith('/archives') ||
      path.startsWith('/search')
    ) {
      return 'news';
    }
    if (path.startsWith('/about') || path.startsWith('/personality-test')) return 'about';
    return '';
  });
}
