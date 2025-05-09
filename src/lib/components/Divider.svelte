<script lang="ts">
	export let text = '';
	export let size = 'xs';
</script>

<div class="divider-with-text">
	<span class="line"></span>
	<span class={`text text-${size}`}>{text}</span>
	<span class="line"></span>
</div>

<style>
	.divider-with-text {
		display: flex;
		align-items: center;
	}

	.divider-with-text .line {
		flex: 1;
		height: 1px;
		background-color: #ccc;
	}

	.divider-with-text .text {
		padding: 0 1em;
		color: var(--brown-primary);
		font-weight: bold;
		text-transform: uppercase;
	}
</style>
