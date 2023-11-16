import { Fragment } from 'react';
import katePortfolioMedia from '../scripts/output/pierre-portfolio-assets_kate-portfolio-v2.json';
import pierrePortfolioMedia from '../scripts/output/pierre-portfolio-assets_pierre-portfolio-v2.json';
import { cn } from './helpers/cn';

const buckets = {
  'kate-portfolio-v2': katePortfolioMedia.images,
  'pierre-portfolio-v2': pierrePortfolioMedia.images,
};

function FlippableImage({
  src,
  blurDataUrl,
  blurOnTop,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataUrl: string;
  blurOnTop: boolean;
  className?: string;
}) {
  const originalImage = (
    <img
      className="col-start-1 row-start-1 w-full"
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
  const blurImage = (
    <img
      className={cn(
        'col-start-1 row-start-1 w-full',
        // Styles used by Next.js to display the blur placeholder
        // (except it's background-position: 50% 50% instead of center)
        'bg-cover bg-center bg-no-repeat'
      )}
      src={`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'></svg>`} // Fake a valid source
      alt={alt}
      width={width}
      height={height}
      style={{
        // Used by Next.js to display the blur placeholder
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'><filter id='b' color-interpolation-filters='sRGB'><feGaussianBlur stdDeviation='20'/><feColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/><feFlood x='0' y='0' width='100%' height='100%'/><feComposite operator='out' in='s'/><feComposite in2='SourceGraphic'/><feGaussianBlur stdDeviation='20'/></filter><image width='100%' height='100%' x='0' y='0' preserveAspectRatio='none' style='filter: url(%23b);' href='${blurDataUrl}'/></svg>")`,
        // Uncomment to see the difference without the filter
        // backgroundImage : `url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'><image width='100%' height='100%' x='0' y='0' preserveAspectRatio='none' style='filter: url(%23b);' href='${blurDataUrl}'/></svg>")`,
      }}
    />
  );

  return (
    <div className={cn('grid hover:[&>img:last-of-type]:opacity-0', className)}>
      {blurOnTop ? blurImage : originalImage}
      {blurOnTop ? originalImage : blurImage}
    </div>
  );
}

function App() {
  return (
    <div
      className={cn(
        'mx-auto max-w-7xl px-6 py-12',
        'grid grid-cols-[14rem_1fr] gap-x-20'
      )}
    >
      <aside
        className={cn('sticky top-4 h-[calc(100dvh_-_2rem)] overflow-scroll')}
      >
        <ul>
          {Object.entries(buckets).map(([bucketName, images]) => (
            <li
              className={cn('flex flex-col', '[&:not(:first-of-type)]:mt-4')}
              key={bucketName}
            >
              <a
                href={`#${bucketName}`}
                className={cn(
                  'text-sm text-fuchsia-800 hover:font-medium hover:text-fuchsia-500',
                  'mb-1'
                )}
              >
                {bucketName}
              </a>
              {Object.keys(images).map((imageName) => (
                <a
                  className={cn(
                    'overflow-hidden text-ellipsis pl-2',
                    'text-xs font-light text-fuchsia-300 hover:font-medium hover:text-fuchsia-500'
                  )}
                  key={imageName}
                  href={`#${imageName}`}
                >
                  {imageName}
                </a>
              ))}
            </li>
          ))}
        </ul>
      </aside>
      <main className={cn('grid grid-cols-2 gap-x-3')}>
        {Object.entries(buckets).map(([bucketName, imagesInfo]) => (
          <Fragment key={bucketName}>
            <h1
              id={bucketName}
              className={cn(
                'col-span-2 mb-2 text-4xl text-fuchsia-600 [&:not(:first-of-type)]:mt-24',
                'font-extralight tracking-widest'
              )}
            >
              {bucketName}
            </h1>
            {Object.entries(imagesInfo).map(([name, info]) => (
              <Fragment key={name}>
                <h2
                  id={name}
                  className={cn(
                    'text-md col-span-2 mb-2 mt-8 font-semibold text-fuchsia-900'
                  )}
                >
                  {name}
                  <span
                    className={cn(
                      'col-span-2 mb-2 pl-2 text-xs font-normal text-fuchsia-300 '
                    )}
                  >
                    w:{info.width} | h: {info.height}
                  </span>
                </h2>
                <FlippableImage
                  className={cn('w-full')}
                  src={info.src}
                  blurDataUrl={info.blurDataURL}
                  blurOnTop={false}
                  alt={name}
                  width={info.width}
                  height={info.height}
                />
                <FlippableImage
                  className={cn('w-full')}
                  src={info.src}
                  blurDataUrl={info.blurDataURL}
                  blurOnTop={true}
                  alt={name}
                  width={info.width}
                  height={info.height}
                />
              </Fragment>
            ))}
          </Fragment>
        ))}
      </main>
    </div>
  );
}

export default App;
