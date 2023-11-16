export function getFileName(remoteUrl: string) {
  const fileNameWithExtension = decodeURIComponent(remoteUrl).split('/').pop();

  if (!fileNameWithExtension) {
    throw new Error(`File name not found in remote URL: ${remoteUrl}`);
  }

  return fileNameWithExtension.split('.').slice(0, -1).join('.');
}
