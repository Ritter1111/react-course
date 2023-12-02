export const imageToBase64 = (
  image: File,
  callback: (base64String: string) => void
) => {
  const reader = new FileReader();

  reader.onload = () => {
    callback(reader.result as string);
  };

  reader.readAsDataURL(image);
};
