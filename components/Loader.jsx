import Image from 'next/image';
import React from 'react'

const Loader = () => {
    return (
        <div className="w-full flex-center">
          <Image
            src="/assets/icons/loader.svg"
            width={50}
            height={50}
            alt="loading..."
            className="object-contain"
          />
        </div>
      );
}

export default Loader