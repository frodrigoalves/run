'use client';
import GlobalControls from './global-controls';
import Header from './header';

interface TopBarProps {
    showNav: boolean;
}

export default function TopBar({ showNav }: TopBarProps) {
    return (
        <div className="fixed top-4 left-4 right-4 z-50 glass-effect rounded-full p-2 flex items-center justify-between">
            <div className="w-1/3 flex justify-start">
                 <GlobalControls />
            </div>
            <div className="w-1/3 flex justify-center">
                {showNav && <Header />}
            </div>
            <div className="w-1/3" />
        </div>
    );
}
