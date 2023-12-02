export const imageToBase64 = (image: File): Promise<string | null> => {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.onload = () => {
      res(reader.result as string);
    };

    reader.onerror = () => {
      res(null);
    };

    reader.readAsDataURL(image);
  });
};
