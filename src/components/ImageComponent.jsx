import clsx from 'clsx'
import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import placeHolderImage from '../assets/blurhashof.jpg'

function ImageComponent({src, alt}) {
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
        const img = new Image()

        img.onload = ()=> {
            setImageLoaded(true)
        }

        img.src = src

    }, [src])
    
  return (
      <div className=' lg:h-64 w-full'>
            <LazyLoadImage
                alt={alt}
                // height="16rem"
                src={src}
                width="100%"
                placeholderSrc={placeHolderImage}
                className={clsx('w-full h-32 lg:h-64 object-cover transition-opacity duration-500 ease-in-out opacity-0', imageLoaded && 'opacity-100')}
                effect='blur'
                 />
      </div>
  )
}

export default ImageComponent