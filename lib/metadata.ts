import sharp from 'sharp';

export async function extractImageMetadata(
  imageBuffer: Buffer
): Promise<{ width: number; height: number }> {
  const { width, height } = await sharp(imageBuffer).metadata();
  if (!width || !height) throw new Error('No width or height');
  return { width, height };
}
