import { getPlaiceholder } from 'plaiceholder';

export async function createBase64ImagePlaceholder(
  imageBuffer: Buffer
): Promise<string> {
  const { base64 } = await getPlaiceholder(imageBuffer, { size: 8 });
  return base64;
}
