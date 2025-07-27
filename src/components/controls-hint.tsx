'use client';

import { useEffect, useState } from "react";
import { MatrixEffect } from "./matrix-effect";
import { cn } from "@/lib/utils";

const hints = [
    { text: { pt: 'Mudar idioma', en: 'Switch language' }, target: 'lang' },
    { text: { pt: 'Mudar tema', en: 'Change theme' }, target: 'theme' },
];

const arrowChars = ['→', '»', '⇒', '>'];

export function ControlsHint() {
    const [hintIndex, setHintIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setHintIndex(prev => (prev + 1) % hints.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const currentHint = hints[hintIndex];

    const getHintPositionClass = () => {
        if (currentHint.target === 'lang') {
            return "top-4 right-[10rem] md:right-[11.5rem]"; // Position near language controls
        }
        return "top-4 right-[4rem] md:right-[5.5rem]"; // Position near theme controls
    };

    return (
        <div className={cn("absolute z-50 transition-all duration-500", getHintPositionClass())}>
            <div className="flex items-center gap-2">
                <MatrixEffect
                    strings={[currentHint.text.pt, currentHint.text.en]}
                    isFeatured={true}
                    className="text-xs opacity-70"
                    loopAfter={4000}
                />
                <MatrixEffect
                    strings={['→']}
                    isFeatured={true}
                    characterSet={arrowChars}
                    className="text-xs opacity-70"
                    loopAfter={4000}
                />
            </div>
        </div>
    );
}
