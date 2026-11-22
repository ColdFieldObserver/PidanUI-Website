<script setup lang="ts">
import type { TeamMember } from '~/data/team';

// 首页「开发人员」的一张成员卡片。
// 宽度固定 + shrink-0：卡片会被放进 UMarquee 或横向滚动容器，
// 任何一侧允许收缩都会让头像被压扁。
defineProps<{ member: TeamMember & { avatar: string } }>();

function isBlankLink(link: string | undefined): boolean {
  return link == undefined || link.trim() === '';
}
</script>

<template>
  <UPageCard
    variant="subtle"
    class="w-[220px] shrink-0 snap-start"
    :ui="{ container: 'flex flex-col items-center gap-2 p-5 text-center lg:flex' }"
  >
    <UAvatar
      size="3xl"
      :src="member.avatar"
      :alt="member.name"
      :ui="{ root: 'size-20 text-2xl sm:size-24' }"
    />
    <h3 class="mt-1 text-base font-semibold text-default">{{ member.name }}</h3>
    <p class="text-[13px] leading-[1.6] text-toned">{{ member.role }}</p>

    <div class="flex gap-2">
      <UButton
        :href="member.bilibiliLink ?? 'https://space.bilibili.com/'"
        target="_blank"
        variant="ghost"
        :color="isBlankLink(member.bilibiliLink) ? 'neutral' : 'primary'"
        icon="i-simple-icons-bilibili"
        :disabled="isBlankLink(member.bilibiliLink)"
        :title="
          isBlankLink(member.bilibiliLink)
            ? '该成员未提供B站主页链接'
            : `前往“${member.name}”的B站主页`
        "
      />
      <UButton
        :href="member.githubLink ?? 'https://github.com/'"
        target="_blank"
        variant="ghost"
        :color="isBlankLink(member.githubLink) ? 'neutral' : 'primary'"
        icon="i-simple-icons-github"
        :disabled="isBlankLink(member.githubLink)"
        :title="
          isBlankLink(member.githubLink)
            ? '该成员未提供GitHub主页链接'
            : `前往“${member.name}”的GitHub主页`
        "
      />
      <UButton
        :href="member.personWebsiteLink ?? 'https://example.com/'"
        target="_blank"
        variant="ghost"
        :color="isBlankLink(member.personWebsiteLink) ? 'neutral' : 'primary'"
        icon="i-lucide-globe"
        :disabled="isBlankLink(member.personWebsiteLink)"
        :title="
          isBlankLink(member.personWebsiteLink)
            ? '该成员未提供个人网站链接'
            : `前往“${member.name}”的个人网站`
        "
      />
    </div>
  </UPageCard>
</template>
