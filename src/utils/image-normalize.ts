export const normalized = (url: string) => {
  if (url.includes('http://') || url.includes('https://')) {
    return url;
  }
  return `http://localhost:5000${url}`;
};
