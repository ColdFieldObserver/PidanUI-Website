---
title: Pidan System WinServer 2028 Build 29706 正式发布
date: 2026-11-25 22:30:00
categories: [新版本发布]
tags: [Pidan System, 发布, WinServer]
description: Pidan System WinServer 2028 Build 29706 已正式发布。它是 Pidan System 的第十个版本，主要供尝鲜玩家体验，包含目前 PidanUI 正在开发测试的美化特性。
stickypost: false
cover: https://img.remit.ee/i/iNOijlOMFGrh
---

经过一段时间的开发与测试，**Pidan System WinServer 2028 Build 29706 已正式发布**。

它是 Pidan System 的第十个版本，也是第二个以 Insider Preview 系统作为底包魔改的版本。下文将介绍它是什么，以及它有哪些新特性和需要注意的事项。

![Pidan System Win11 26H2 v2 系统截图](https://img.remit.ee/i/iNOijlOMFGrh)

## 一、它是什么

本版本基于 Windows Server vNext Preview Build 29706 进行深度定制。它主要供尝鲜玩家体验，包含目前 PidanUI 正在开发测试的美化特性。

## 二、它有哪些新特性

- **OpenPidanUI Rainmeter 小组件**：和 EggyUI 时期相比，其辅助程序全面升级，UI 大幅简化（具体更新内容见<https://github.com/PidanUI-Team/OpenPidanUI/releases/tag/v1.0-Widgets>）。
- **蛋仔硬件监控灵动岛（实验性）**：可监控 CPU、内存、GPU、磁盘等属性的实时使用情况。
- **更激进的亚克力模糊效果（实验性）**：开始菜单、窗口背景、任务栏均有亚克力模糊效果。

## 三、重要注意事项（请务必阅读）

本版本由于采用了 Windows Server vNext Preview 系统作为底包，存在以下几点特殊情况：

1. **关于系统时间炸弹**：此系统属于 Future Platforms 频道的 Windows Server vNext Preview 系统，所以有内建的评估时间炸弹（到期时间：2027/11/1 7:43）。请尽量不要在到期时间之后使用此系统。
2. **Windows Server 系统的特殊性**：由于 Windows Server 系统专为服务器平台设计，所以此系统安装在普通电脑上可能会遇到驱动程序等的兼容性问题，建议在虚拟机中尝鲜。
3. **其他常规提示**：系统可能未内置现代 .NET 桌面运行时（如 .NET 10），首次运行部分工具若报错，请按提示安装运行库；若系统激活失效，可打开桌面上的 `激活工具.exe` 进行激活。

## 四、下载方式

- **PidanUI 官网下载页**：见[本站下载页面](../download)（对应版本：Pidan System，对应文件夹：`Pidan-WinServer-2028-Datacenter（分卷镜像）`，你需要把文件夹里的三个分卷文件全部下载下来）。