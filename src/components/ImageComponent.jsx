import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import placeHolderImage from '../assets/blurhashof.jpg';

function ImageComponent({ src, alt, className }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setImageLoaded(true);
        };
        img.src = src;
    }, [src]);

    return (
        <div className="w-full">
            <LazyLoadImage
                alt={alt}
                src={src}
                width="100%"
                placeholderSrc={placeHolderImage}
                className={clsx(
                    'transition-opacity duration-500 ease-in-out opacity-0',
                    imageLoaded && 'opacity-100',
                    className
                )}
                effect="blur"
            />
        </div>
    );
}

export default ImageComponent;
