import { getFileName } from './fileName';
import { extractImageMetadata } from './metadata';
import { createBase64ImagePlaceholder } from './placeholder';

export type RemoteImageProps = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

async function fetchImage(remoteImageUrl: string) {
  const buffer = await fetch(remoteImageUrl).then(async (response) =>
    Buffer.from(await response.arrayBuffer())
  );
  return buffer;
}

export async function getRemoteImageNextJsProps(
  remoteImageUrl: string
): Promise<RemoteImageProps & { name: string }> {
  const imageName = getFileName(remoteImageUrl);
  const imageBuffer = await fetchImage(remoteImageUrl);
  const { width, height } = await extractImageMetadata(imageBuffer);
  const blurDataURL = await createBase64ImagePlaceholder(imageBuffer);
  return { name: imageName, src: remoteImageUrl, width, height, blurDataURL };
}
