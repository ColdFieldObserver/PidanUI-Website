/**
 * 主导航数据源。
 * header 的桌面横排导航与移动端下拉面板共用这一份，改动只在这里。
 * 新增导航项时记得同步 `useActiveNavKey()` 的分区判定。
 */
export const NAV_ITEMS = [
  { key: 'home', label: '首页', href: '/', icon: 'i-lucide-house' },
  { key: 'download', label: '下载', href: '/download', icon: 'i-lucide-download' },
  { key: 'news', label: '新闻', href: '/posts/', icon: 'i-lucide-newspaper' },
  { key: 'about', label: '关于', href: '/about', icon: 'i-lucide-info' },
] as const;

export type NavKey = (typeof NAV_ITEMS)[number]['key'];
