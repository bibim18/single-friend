function handleFileUpload(event: Event) {
	let base64File: string | null = null; // To store the base64 encoded file
	let fileName: string = ''; // To store the file name

	const file = (event.target as HTMLInputElement).files?.[0];

	if (file) {
		const reader = new FileReader();

		// Define the onload event for the FileReader
		reader.onload = () => {
			// The result will be the base64 string
			base64File = reader.result as string;
			fileName = file.name; // Store the file name
		};

		// Read the file as Data URL (Base64 encoded)
		reader.readAsDataURL(file);
	}
}
