export function base64ToBinary(base64String) {
    try {
        // Check if the base64 string contains a data URI scheme and remove it if present
        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");

        // Validate base64 string format
        if (!/^[a-zA-Z0-9+/=]+$/.test(base64Data)) {
            throw new Error("Invalid base64 string");
        }

 
        const binaryString = atob(base64Data);

 
        const binaryLength = binaryString.length;
        const bytes = new Uint8Array(binaryLength);

 
        for (let i = 0; i < binaryLength; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        return bytes;
    } catch (error) {
        console.error("Error decoding base64 string:", error);
        return null;
    }
}
export function convertToBase64(photoData) {
    return new Promise((resolve, reject) => {
      if (typeof FileReader !== "undefined") {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(photoData);
        return;
      }
      reject(new Error("FileReader is not supported in this environment."));
    });
  }

  