// components/Logo.js
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <>
      <div className="hidden sm:block">
        <Link
          className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
          href="/"
          aria-label="Rings N Roses"
        >
          <Image
            src="/Logo.png" // Assumes Logo.png is in the public directory
            alt="Rings N Roses Logo"
            width={112} // w-28 is 112px
            height={40} // Maintain aspect ratio
            className="mt-2"
          />
        </Link>
      </div>
      <div className="sm:hidden">
        <Link
          className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
          href="/"
          aria-label="Rings N Roses"
        >
          <Image
            src="/Logo.png" // Assumes Logo.png is in the public directory
            alt="Rings N Roses Logo"
            width={31}
            height={31} // Maintain aspect ratio for the smaller logo
          />
        </Link>
      </div>
    </>
  );
};

export default Logo;