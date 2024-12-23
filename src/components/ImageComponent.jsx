import clsx from 'clsx'
import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import placeHolderImage from '../assets/blurhashof.jpg'

function ImageComponent({ src, alt, height }) {
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
        const img = new Image()

        img.onload = () => {
            setImageLoaded(true)
        }

        img.src = src
    }, [src])

    return (
        <div className={clsx('w-full', height && 'h-full')} style={height ? { height: '100vh' } : undefined}>
            <LazyLoadImage
                alt={alt}
                src={src}
                width="100%"
                height={height ? '100%' : undefined} // Conditional height
                placeholderSrc={placeHolderImage}
                className={clsx(
                    'w-full object-cover transition-opacity duration-500 ease-in-out opacity-0',
                    imageLoaded && 'opacity-100',
                    height ? 'h-full' : 'h-32 lg:h-64'
                )}
                effect="blur"
            />
        </div>
    )
}

export default ImageComponent
