<script lang="ts">
	import { deleteFriend, getFriends } from '$lib/actions/friends';
	import { fb, ig, line, linkin, tel } from '$lib/components';
	import type { FriendData } from '$lib/types';
	import { onMount } from 'svelte';

	let friends: FriendData[] = [];

	onMount(async () => {
		friends = await getFriends();
	});

	async function handleDelete(id: string) {
		const confirmed = confirm('แน่ใจนะว่าจะลบเพื่อนคนนี้? 🥺');
		if (confirmed) {
			await deleteFriend(id);
			friends = await getFriends();
		}
	}

	const mapContact: any = {
		fb: fb,
		ig: ig,
		line: line,
		linkin: linkin,
		tel: tel
	};
</script>

{#if friends.length > 0}
	<div class="friend-grid gap-4">
		{#each friends as f}
			<div class="card">
				<p>
					name: {f.name}
				</p>
				<p>
					quote: {f.quote}
				</p>
				<div class="flex items-center gap-2">
					<img src={mapContact[f.contact.type ?? 'fb']} alt="" width="30px" />
					<div>{f.contact.info}</div>
				</div>
				<button on:click={() => handleDelete(f.id ?? '')}>ลบ</button>
			</div>
		{/each}
	</div>
{:else}
	<div>กำลังโหลด...</div>
{/if}

<style>
	.friend-grid {
		height: -webkit-fill-available;
		display: grid;
		grid-template-columns: repeat(4, 1fr); /* 4 equal columns */
	}

	.card {
		background-color: #fff;
		border: 1px solid var(--input-border);
		border-radius: 1rem;
		padding: 1rem;
		text-align: center;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		transition: opacity 0.5s ease-in-out;
		justify-items: center;
	}
</style>
