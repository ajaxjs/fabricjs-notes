<script setup lang="ts">
import { Editor, HeadBar } from '@/packages/editor'
import { useDark, useToggle } from '@vueuse/core'
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-vue-next';
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
	<div class="w-screen h-screen flex flex-col">
		<HeadBar class="head-bar" />
		<Editor class="flex-1" />
	</div>
</template>

<style lang="scss" scoped></style>