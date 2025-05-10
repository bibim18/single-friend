<script lang="ts">
	import { getFriends } from '$lib/actions/friends';
	import { fb, ig, line, linkin, tel, avtDefault } from '$lib/components';
	import Divider from '$lib/components/Divider.svelte';
	import type { FriendData } from '$lib/types';
	import { onMount } from 'svelte';

	let friends: FriendData[] = [];
	let currentIndex = 0;

	let interval;

	onMount(async () => {
		friends = await getFriends();
		startSlideshow();
	});

	function startSlideshow() {
		interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % friends.length;
		}, 5000); // 10 วินาที
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
	<div class="card">
		<img class="img h-fit" src={friends[currentIndex].img || avtDefault} alt="รูป {friends[currentIndex].name}" />
		<div class="right-box grid gap-4">
			<div class="grid gap-4">
				<div class="title text-xl">คำคมโดนใจ</div>
				<div class="text-3xl">{friends[currentIndex].quote}</div>
				<div class="text-2xl">
					by {friends[currentIndex].name}
				</div>
			</div>

			<div class="grid gap-4">
				<Divider size="xl" text="ช่องทางติดต่อ" />
				{#if friends[currentIndex].contact.info}
					<div class="flex items-center justify-center gap-2">
						<img src={mapContact[friends[currentIndex].contact.type ?? 'fb']} alt="" width="30px" />
						<div class="text-xl">{friends[currentIndex].contact.info}</div>
					</div>
				{/if}
				<div class="justify-items-center">
					<img
						class="rounded-md border-[2px] border-[#c79a6d]"
						src={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${friends[currentIndex].contact.info}`}
						alt=""
						width="200px"
					/>
					<div>แสกนทางนี้ได้เลยจ้า</div>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div>กำลังโหลด...</div>
{/if}

<style>
	.title {
		color: var(--brown-primary);
	}

	.card {
		width: 100%;
		background-color: #fff;
		border: 1px solid var(--input-border);
		border-radius: 16px;
		padding: 2rem;
		text-align: center;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		transition: opacity 0.5s ease-in-out;
		justify-content: center;
		display: flex;
		gap: 1rem;
	}

	.right-box{
		width: 60%;
	}

	.card .img {
		width: 450px;
		border-radius: 12px;
		margin-bottom: 1rem;
	}
</style>
