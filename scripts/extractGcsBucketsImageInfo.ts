import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFile } from 'node:fs/promises';
import { Storage } from '@google-cloud/storage';
import {
  type RemoteImageProps,
  getRemoteImageNextJsProps,
} from '../lib/nextImageProps';

const outputDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  'output'
);
const gcsFolders = [
  { bucket: 'pierre-portfolio-assets', prefix: 'kate-portfolio-v2' },
  { bucket: 'pierre-portfolio-assets', prefix: 'pierre-portfolio-v2' },
];

const storage = new Storage();

async function listGCSFolderImages(bucket: string, prefix: string) {
  const [allFiles] = await storage.bucket(bucket).getFiles({ prefix });

  const imageFileNames = allFiles
    .filter((file) => /^.*\.(jpg|JPG|jpeg|JPEG|png|PNG)$/.test(file.name))
    .map((file) => file.publicUrl());

  return imageFileNames;
}

async function imagesInfoInBucket(
  bucket: string,
  prefix: string
): Promise<Record<string, RemoteImageProps>> {
  const imageUrls = await listGCSFolderImages(bucket, prefix);
  const imageInfos = await Promise.all(
    imageUrls.map(async (url) => await getRemoteImageNextJsProps(url))
  );

  return Object.fromEntries(
    imageInfos.map((info) => {
      const { name, ...rest } = info;
      return [name, rest];
    })
  );
}

await Promise.all(
  gcsFolders.map(async ({ bucket, prefix }) => {
    const resultFileName = `${bucket}_${prefix}.json`;
    const imagesInfo = await imagesInfoInBucket(bucket, prefix);
    await writeFile(
      path.resolve(outputDirectory, resultFileName),
      JSON.stringify(imagesInfo)
    );
    // eslint-disable-next-line no-console
    console.log(`Wrote - ${resultFileName}`);
  })
);
