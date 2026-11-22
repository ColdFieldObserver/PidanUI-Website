/**
 * 首页「开发人员」区块的数据。
 */
export interface TeamMember {
  /** 成员名称 */
  name: string;
  /** 成员角色 */
  role: string;
  /** 成员头像链接（头像图片引用一律走图床CDN，仓库内不要放头像文件） */
  avatar: string;
  /** 成员B站个人空间链接（可选） */
  bilibiliLink?: string;
  /** 成员GitHub链接（可选） */
  githubLink?: string;
  /** 成员个人网站链接（可选） */
  personWebsiteLink?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: '前端小蓝蛋',
    role: '本网站维护者',
    avatar: 'https://img.remit.ee/i/lPHogqCFw4YO',
    githubLink: 'https://github.com/AloneVoyager',
    personWebsiteLink: 'https://danxiaolan.wordpress.com',
  },
  {
    name: '快乐的泡泡',
    role: '剪辑 / 客服 / 存储',
    avatar: 'https://img.remit.ee/i/U8KGFxlvFFou',
    bilibiliLink: 'https://space.bilibili.com/3747563612147456',
    githubLink: 'https://github.com/xiaolan-dan',
  },
  {
    name: 'red.blue.light',
    role: '维护、制作镜像 / 规划',
    avatar: 'https://img.remit.ee/i/FLj1CJc6EDIi',
    bilibiliLink: 'https://space.bilibili.com/3546389388724715',
    githubLink: 'https://github.com/CN-RBL',
    personWebsiteLink: 'https://cn-rbl.github.io',
  },
  {
    name: '一个玩VM和MC的ZSS',
    role: '维护、制作镜像',
    avatar: 'https://img.remit.ee/i/1clKA5VvPmin',
    bilibiliLink: 'https://space.bilibili.com/3546711859399222',
    // githubLink: 'https://github.com/lianyuyang',
  },
  {
    name: '嘎达皮蛋',
    role: '维护、制作、测试镜像',
    avatar: 'https://img.remit.ee/i/A1R87mzheD1e',
    bilibiliLink: 'https://space.bilibili.com/3493144343612119',
    githubLink: 'https://github.com/Gada-Pidan',
    personWebsiteLink: 'https://link3.cc/eggycore',
  },
  {
    name: '昶',
    role: '技术指导',
    avatar: 'https://img.remit.ee/i/r4nWy3kZl6qn',
    bilibiliLink: 'https://space.bilibili.com/1714708262',
  },
  {
    name: '冒泡の狼小蓝',
    role: '测试镜像',
    avatar: 'https://img.remit.ee/i/UUm42YMHjuTX',
    bilibiliLink: 'https://space.bilibili.com/1521328433',
  },
  {
    name: '晨溪',
    role: '技术指导',
    avatar: 'https://img.remit.ee/i/mJKmcVClqTFe',
    bilibiliLink: 'https://space.bilibili.com/3493078465775727',
    githubLink: 'https://github.com/Sci-maoxiaochen',
    personWebsiteLink: 'https://www.chenxiy.top',
  },
  // { name: '蓝天正义之鸿', role: 'Logo设计', avatar: 'https://img.remit.ee/i/xedXoCZv9UHK' },
];
