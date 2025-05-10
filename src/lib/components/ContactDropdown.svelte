<script lang="ts">
	import { fb, ig, line, linkin, tel, tk } from './index';
	import { onMount } from 'svelte';

	export let value: string = 'ig';
	const options = [
		{ value: 'ig', label: 'Instagram', icon: ig },
		{ value: 'tk', label: 'TikTok', icon: tk},
		{ value: 'fb', label: 'Facebook', icon: fb },
		{ value: 'line', label: 'LINE', icon: line },
		{ value: 'linkin', label: 'LinkedIn', icon: linkin },
		{ value: 'tel', label: 'Tel', icon: tel }
	];

	let isOpen = false;

	function handleClickOutside(e: Event) {
		if (!(e.target as HTMLDivElement).closest('.preview-btt')) {
			isOpen = false;
		}
	}

	function select(option: any) {
		value = option.value;
		isOpen = false;
	}

	onMount(async () => {
		document.addEventListener('click', handleClickOutside);
	});
</script>

<div>
	<button class="preview-btt" onclick={() => (isOpen = !isOpen)}>
		{#if value}
			{#each options as o}
				{#if o.value === value}
					<img src={o.icon} alt={o.label} width="45px" />
				{/if}
			{/each}
		{/if}
	</button>

	{#if isOpen}
		<div class="menu">
			{#each options as option}
				<div
					class="option"
					tabindex="0"
					role="button"
					onkeypress={() => select(option)}
					onclick={() => select(option)}
				>
					<img src={option.icon} alt={option.label} width="20px" />
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.preview-btt {
		padding: 0.25rem 0.25rem;
		background-color: var(--brown-primary);
		color: white;
		border-radius: 0.5rem;
		margin-top: 0;
		cursor: pointer;
	}
	.menu {
		position: absolute;
		background: white;
		border: 1px solid #ccc;
		z-index: 10;
	}
	.option {
		padding: 0.6rem;
		cursor: pointer;
	}
	.option:hover {
		background: #f0f0f0;
	}
</style>
