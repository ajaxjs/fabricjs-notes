<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Editor } from '@/packages/editor'
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-vue-next';
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
	<div class="w-screen h-screen flex flex-col">
		<div class="bg-slate-200 p-1">
			<Button @click="toggleDark()" variant="outline">
				<Moon v-if="!isDark" />
				<Sun v-else />
			</Button>
		</div>
		<Editor class="flex-1" />
	</div>
</template>

<style lang="scss" scoped></style>