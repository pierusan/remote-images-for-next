import 'dotenv/config';
import ffmpeg from 'fluent-ffmpeg';
import { getFileName } from '../lib';

// https://stackoverflow.com/a/31928825
export async function getVideoDimensions(remoteVideoUrl: string) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    ffmpeg.ffprobe(remoteVideoUrl, function (error, metadata) {
      if (error) {
        reject(error);
      } else {
        const videoStream = metadata.streams.find(
          (
            stream
          ): stream is ffmpeg.FfprobeStream & {
            width: number;
            height: number;
          } => stream.width !== undefined && stream.height !== undefined
        );

        if (!videoStream) {
          reject(new Error('Video stream not found'));
          return;
        }

        resolve({ width: videoStream.width, height: videoStream.height });
      }
    });
  });
}

export async function getVideoProps(remoteVideoUrl: string) {
  const videoName = getFileName(remoteVideoUrl);
  const { width, height } = await getVideoDimensions(remoteVideoUrl);
  return { name: videoName, src: remoteVideoUrl, width, height };
}
