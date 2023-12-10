# Remote images for Next

Accelerate workflow to fetch remote images dimensions and generate base64
placeholders.

Edit bucket names at the top of `scripts/extractGcsBucketsImageInfo.ts` and run
`npx tsx scripts/extractGcsBucketsImageInfo.ts` to output image dimensions and
placeholder from all the images in a GCS bucket. The result are JSON files that
can be loaded once at dev time in your NextJS apps to try out the placeholders.

Edit the `sandbox/App.tsx` to load your json and `npm run sandbox` to visualize
the results.

![sandbox image 1](https://storage.googleapis.com/github-pierusan-repos-assets/remote-images-for-next/sandbox1.png)

![sandbox image 2](https://storage.googleapis.com/github-pierusan-repos-assets/remote-images-for-next/sandbox2.png)
