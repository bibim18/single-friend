<script lang="ts">
	import { friend } from '$lib/stores/friend';
	import ContactDropdown from '$lib/components/ContactDropdown.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import { addFriendData } from '$lib/actions/friends';
	import { storage, ref, uploadBytes, getDownloadURL } from '$lib/firebase';

	let completed: boolean = false;
	let qrUploaded = false;
	let imgloaded = false;
	let isUploading = false;

	async function handleFileUpload(event: Event, field: string) {
		const file = (event.target as HTMLInputElement).files?.[0];

		if (file) {
			isUploading = true;
			try {
				// Create a storage reference
				const storageRef = ref(storage, `${Date.now()}-${file.name}`);
				
				// Upload the file to Firebase Storage
				const snapshot = await uploadBytes(storageRef, file);
				
				// Get download URL
				const downloadURL = await getDownloadURL(snapshot.ref);
				
				// Update friend object with the download URL based on the field
				if (field === 'img') {
					imgloaded = true;
					$friend.img = downloadURL;
				} else if (field === 'qr') {
					qrUploaded = true;
					$friend.contact.qr = downloadURL;
				}
			} catch (error) {
				console.error('Error uploading file:', error);
				alert('Failed to upload file. Please try again.');
			} finally {
				isUploading = false;
			}
		}
	}

	async function onSubmit(event: Event) {
		completed = true;
		event.preventDefault();
		await addFriendData($friend);
	}
</script>

<div class="grid justify-items-center gap-4">
	<p class="title">ประกาศให้โลกรู้ ว่ากรูโสดอยู่จ้า 👀</p>
	{#if !completed}
		<div class="form-group">
			<div>
				<label for="name"> Name </label>
				<input type="text" id="name" name="name" bind:value={$friend.name} />
			</div>
			<div>
				<label for="quote">Quote</label>
				<input type="text" id="quote" name="quote" bind:value={$friend.quote} />
			</div>
			<div class="self-center py-4">
				<label for="img" class="button">upload your The Best Look 💋</label>
				<input
					type="file"
					id="img"
					name="img"
					class="hidden"
					on:change={(event) => handleFileUpload(event, 'img')}
				/>
				{#if imgloaded}
					<span class="uploaded-check">✔</span>
				{/if}
			</div>

			<div class="contact">
				<div>
					<label for="contact"> Contact </label>
					<div class="contactContainer">
						<ContactDropdown bind:value={$friend.contact.type} />
						<input type="text" id="contact" name="contact" bind:value={$friend.contact.info} />
					</div>
				</div>
				<!-- <Divider text="or" />
				<div class="justify-self-center pt-2">
					<input
						type="file"
						id="qr"
						name="qr"
						class="hidden"
						on:change={(event) => handleFileUpload(event, 'qr')}
					/>
					<label for="qr" class="button">upload contact QR</label>
					{#if qrUploaded}
						<span class="uploaded-check">✔</span>
					{/if}
				</div> -->
			</div>

			<button on:click={onSubmit} disabled={completed}>ส่ง</button>
		</div>
	{:else}
		<div class="completed items-center text-xl">เพิ่มข้อมูลเรียบร้อย</div>
	{/if}
</div>

<style>
	.uploaded-check {
		color: green;
		font-size: 1.2rem;
	}

	.contact {
		display: grid;
		gap: 0.5rem;
	}

	.form-group,
	.completed {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: white;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
		width: 350px;
	}

	.contactContainer {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.title {
		font-size: 30px;
		font-weight: 700;
	}

	.button {
		background-color: var(--brown-secoundary);
	}
</style>
