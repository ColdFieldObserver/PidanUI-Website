/**
 * 站点常量：站点信息、分页与评论配置。
 * 「关于我们」等文案对齐 README；社交链接见 data/socialLinks.ts。
 */
export const SITE = {
  /** 站点品牌名 */
  brand: 'PidanUI',
  /** 作者 / 组织 */
  author: 'PidanUI Team',
  /** 官网根地址（本站在用户主页域名发布） */
  mainUrl: 'https://pidanui.eggycore.top',
} as const;

/** 文章列表每页显示数量 */
export const PAGE_SIZE = 12;

/** Giscus 评论配置 */
export const GISCUS = {
  repo: 'PidanUI-Team/PidanUI-Website',
  repoId: 'R_kgDOU8wvkw',
  category: 'Announcements',
  categoryId: 'DIC_kwDOU8wvk84DHGnO',
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top',
  lang: 'zh-CN',
  loading: 'lazy',
} as const;
