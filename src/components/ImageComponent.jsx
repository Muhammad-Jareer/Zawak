import clsx from 'clsx'
import React, { useState, useEffect } from 'react'
import { Blurhash } from 'react-blurhash'

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
      <div className='h-64 w-full'>
            <div className={clsx('h-64 w-full', imageLoaded && 'hidden')}>
              <Blurhash 
                  hash='LDOWHC?^DN-UF_$+rqocsER5NaRj'
                  width='100%'
                  height='16rem'
                  resolutionX={32}
                  resolutionY={32}
                  punch={1}
              />
            </div>
            <img src={src} alt={alt} className={clsx('w-full h-64 object-cover transition-opacity duration-500 ease-in-out opacity-0', imageLoaded && 'opacity-100')} style={{display: !imageLoaded? 'none' : 'inline'}}/> {/* style because clsx function was not working */}
            
      </div>
  )
}

export default ImageComponent