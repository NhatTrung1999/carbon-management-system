/** Saves binary data (e.g. an axios `responseType: 'blob'` result) as a file. */
export const downloadBlob = (data: BlobPart, fileName: string) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
