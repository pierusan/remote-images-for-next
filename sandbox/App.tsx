import { Fragment } from 'react';
import katePortfolioImages from '../scripts/output/pierre-portfolio-assets_kate-portfolio-v2.json';
import pierrePortfolioImages from '../scripts/output/pierre-portfolio-assets_pierre-portfolio-v2.json';
import { cn } from './helpers/cn';

const buckets = {
  'kate-portfolio-v2': katePortfolioImages,
  'pierre-portfolio-v2': pierrePortfolioImages,
};

function FlippableImage({
  bottomSrc,
  topSrc,
  alt,
  aspectRatio,
  className,
}: {
  bottomSrc: string;
  topSrc: string;
  alt: string;
  aspectRatio: string;
  className?: string;
}) {
  return (
    <div className={cn('grid hover:[&>img:last-of-type]:opacity-0', className)}>
      <img
        className="col-start-1 row-start-1 w-full"
        src={bottomSrc}
        alt={alt}
        style={{ aspectRatio }}
      />
      <img
        className="col-start-1 row-start-1 w-full transition-opacity"
        src={topSrc}
        alt={alt}
        style={{ aspectRatio }}
      />
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
      <aside>
        <ul className={cn('sticky top-4')}>
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
                {/* <img
                  src={info.src}
                  alt={name}
                  className={cn('w-full')}
                  style={{ aspectRatio: `${info.width}/${info.height}` }}
                />
                <img
                  src={info.blurDataURL}
                  alt={name}
                  className={cn('w-full')}
                  style={{ aspectRatio: `${info.width}/${info.height}` }}
                /> */}
                <FlippableImage
                  className={cn('w-full')}
                  topSrc={info.src}
                  bottomSrc={info.blurDataURL}
                  alt={name}
                  aspectRatio={`${info.width}/${info.height}`}
                />
                <FlippableImage
                  className={cn('w-full')}
                  bottomSrc={info.src}
                  topSrc={info.blurDataURL}
                  alt={name}
                  aspectRatio={`${info.width}/${info.height}`}
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
