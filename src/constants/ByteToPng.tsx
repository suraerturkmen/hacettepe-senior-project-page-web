export function createFileFromBase64(
  base64String: string,
  fileName = "file.png"
) {
  const binaryData = atob(base64String);

  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

  const fileBlob = new Blob([arrayBuffer], { type: "image/png" });

  const url = window.URL.createObjectURL(fileBlob);
  return { url, fileBlob, fileName };
}
