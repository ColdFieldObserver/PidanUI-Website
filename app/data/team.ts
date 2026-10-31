/**
 * 首页「开发人员」区块的数据。
 *
 * 目前是占位数据：头像直接复用 `public/images/characters/` 里的蛋仔立绘，
 * 换成真实成员时只改 name / role / avatar 三个字段，版式不用动。
 * avatar 写站内相对路径，渲染时经 withBase 处理。
 */
export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  { name: '冷域观者', role: '项目主导 / 官网与组件', avatar: '/images/characters/yeggy.webp' },
  { name: '皮蛋', role: '系统封装 / 发布', avatar: '/images/characters/bulu.webp' },
  { name: '蜜糖星雨', role: '系统封装 / 视觉', avatar: '/images/characters/minty.webp' },
  { name: '社区贡献者', role: '测试 / 反馈 / 文档', avatar: '/images/characters/rosie.webp' },
];
