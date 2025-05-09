<script lang="ts">
	import '../app.css';
	import '@fontsource/noto-sans-thai';

	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	const hideNavbar = derived(page, ($page) => $page.url.pathname === '/');
</script>

<!-- {#if !$hideNavbar} -->
<!-- Navbar -->
<nav class="navbar">
	<a href="/">Home</a>
	<a href="/display">Show</a>
	<a href="/list">List</a>
</nav>
<!-- {/if} -->
<main class="container">
	<slot />
</main>

<style>
	.navbar {
		position: sticky;
		top: 0;
		background-color: #f4f4f4;
		padding: 1rem;
		display: flex;
		gap: 1rem;
		z-index: 1000; /* ให้ navbar อยู่เหนือ content */
	}

	.container {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		justify-self: center;
		background-color: var(--cream);
		color: var(--text);
	}
</style>
