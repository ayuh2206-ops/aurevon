/**
 * Upload an image file to Cloudinary using their unsigned REST API.
 * This does not require a backend server or secret API keys, making it safe for client-side uploads.
 * 
 * You must set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
 * in your .env.local file.
 * 
 * @param {File} file - The image file to upload
 * @returns {Promise<string|null>} - Returns the secure URL of the uploaded image or null on failure
 */
export async function uploadToCloudinary(file) {
    if (!file) return null;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        console.error("Cloudinary credentials are not set in .env.local");
        throw new Error("Missing Cloudinary Configuration");
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Cloudinary Upload Error:", errorText);
            throw new Error(`Cloudinary Upload Failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
}
