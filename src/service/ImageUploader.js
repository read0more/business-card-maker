import sha256 from "sha256";

class ImageUploader {
  url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;

  async upload(file) {
    const formData = new FormData();
    const timestamp = Date.now() / 1000;
    const signature = sha256(
      `timestamp=${timestamp}${process.env.REACT_APP_CLOUDINARY_API_SECRET}`
    );

    formData.append("file", file);
    formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
    formData.append("timestamp", `${timestamp}`);
    formData.append("signature", signature);

    const response = await fetch(this.url, { method: "POST", body: formData });
    const result = await response.json();

    return result;
  }
}

export default ImageUploader;
