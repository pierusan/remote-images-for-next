import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFile } from 'node:fs/promises';
import { Storage } from '@google-cloud/storage';
import {
  type RemoteImageProps,
  getRemoteImageNextJsProps,
} from '../lib/nextImageProps';
import { getVideoProps } from './videoProps';

const outputDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  'output'
);
const gcsFolders = [
  { bucket: 'pierre-portfolio-assets', prefix: 'kate-portfolio-v2' },
  { bucket: 'pierre-portfolio-assets', prefix: 'pierre-portfolio-v2' },
];

const storage = new Storage();

async function listGCSFolderMedia(
  bucket: string,
  prefix: string
): Promise<{ url: string; type: 'image' | 'video' }[]> {
  const [allFiles] = await storage.bucket(bucket).getFiles({ prefix });

  const imageFileNames = allFiles
    .filter((file) => /^.*\.(jpg|JPG|jpeg|JPEG|png|PNG)$/.test(file.name))
    .map((file) => ({ url: file.publicUrl(), type: 'image' as const }));

  const videoFileNames = allFiles
    .filter((file) => /^.*\.(mp4)$/.test(file.name))
    .map((file) => ({ url: file.publicUrl(), type: 'video' as const }));

  return [...imageFileNames, ...videoFileNames];
}

async function mediaInfoInBucket(
  bucket: string,
  prefix: string
): Promise<{
  images: Record<string, RemoteImageProps>;
  videos: Record<string, { src: string; width: number; height: number }>;
}> {
  const mediaUrls = await listGCSFolderMedia(bucket, prefix);
  const imageInfos = await Promise.all(
    mediaUrls
      .filter(({ type }) => type === 'image')
      .map(async ({ url }) => {
        const imageProps = await getRemoteImageNextJsProps(url);
        return { ...imageProps };
      })
  );

  const videoInfos = await Promise.all(
    mediaUrls
      .filter(({ type }) => type === 'video')
      .map(async ({ url }) => {
        const videoProps = await getVideoProps(url);
        return { ...videoProps };
      })
  );

  return {
    images: Object.fromEntries(
      [...imageInfos].map((info) => {
        const { name, ...rest } = info;
        return [name, rest];
      })
    ),
    videos: Object.fromEntries(
      [...videoInfos].map((info) => {
        const { name, ...rest } = info;
        return [name, rest];
      })
    ),
  };
}

await Promise.all(
  gcsFolders.map(async ({ bucket, prefix }) => {
    const resultFileName = `${bucket}_${prefix}.json`;
    const mediaInfo = await mediaInfoInBucket(bucket, prefix);
    await writeFile(
      path.resolve(outputDirectory, resultFileName),
      JSON.stringify(mediaInfo)
    );
    // eslint-disable-next-line no-console
    console.log(`Wrote - ${resultFileName}`);
  })
);
