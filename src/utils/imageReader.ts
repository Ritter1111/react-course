export const  imageToBase64 = (image: File, callback: ((base64String: string) => void)) => {
  const extensions = ['image/png', 'image/jpeg'];
  const reader = new FileReader();

  if (!extensions.includes(image.type)) {
    return;
  }

  reader.onload = () => {
    callback(reader.result as string)
  };

  reader.readAsDataURL(image);
};