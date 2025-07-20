import { useState, useEffect } from 'react'

export const useViewport = () => {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    })

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        
        window.addEventListener('resize', handleWindowResize)
        
        // Call handler right away so state gets updated with initial window size
        handleWindowResize()
        
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [])

    // Responsive breakpoints
    const isMobile = windowSize.width < 768
    const isTablet = windowSize.width >= 768 && windowSize.width < 1024
    const isDesktop = windowSize.width >= 1024
    const isSmallMobile = windowSize.width < 480
    const isLargeMobile = windowSize.width >= 480 && windowSize.width < 768

    return { 
        windowSize,
        width: windowSize.width,
        height: windowSize.height,
        isMobile, 
        isTablet, 
        isDesktop,
        isSmallMobile,
        isLargeMobile
    }
}