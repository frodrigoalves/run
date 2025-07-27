'use client';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import GlobalControls from './global-controls';
import Header from './header';

interface TopBarProps {
    showNav: boolean;
}

export default function TopBar({ showNav }: TopBarProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleActivity = () => {
            setIsVisible(true);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsVisible(false);
            }, 3000); // Hide after 3 seconds of inactivity
        };

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
            handleActivity();
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleActivity);

        handleActivity(); // Initial call

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleActivity);
            clearTimeout(timeoutId);
        };
    }, []);

    const navBarClasses = cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out",
        "p-2 flex items-center justify-center",
        "w-auto",
        (isVisible || isScrolled) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full',
        (isScrolled || isVisible) && 'glass-effect rounded-b-lg' // Apply glass effect when visible or scrolled
    );
    
    return (
        <>
             {/* Always-visible controls */}
            <div className="fixed top-0 right-0 z-50 p-2 pr-4 flex items-center justify-end">
                <GlobalControls />
            </div>

            {/* Auto-hiding navigation */}
            {showNav && (
                <div className={navBarClasses}>
                    <Header />
                </div>
            )}
        </>
    );
}