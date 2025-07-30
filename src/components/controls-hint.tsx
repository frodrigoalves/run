
'use client';

import { useEffect, useState } from "react";
import { MatrixEffect } from "./matrix-effect";
import { cn } from "@/lib/utils";
import { useLocalization } from "@/hooks/use-localization";

type HintState = 'language' | 'theme' | 'both' | 'none';

const hintContent = {
    language: {
        pt: 'Mudar idioma',
        en: 'Switch Language',
        arrow: '↑',
    },
    theme: {
        pt: 'Mudar Temas',
        en: 'Change Theme',
        arrow: '↑',
    }
};

const Hint = ({ text, arrow, isVisible }: { text: string; arrow: string; isVisible: boolean; }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        let decodeTimer: NodeJS.Timeout;
        let displayTimer: NodeJS.Timeout;
        let fadeOutTimer: NodeJS.Timeout;

        if (isVisible) {
            setIsAnimating(true); // Start fade-in and decode

            decodeTimer = setTimeout(() => {
                // Decode finished, now just display
            }, 1000); // Corresponds to stopAfter in MatrixEffect

            displayTimer = setTimeout(() => {
                // Start fade-out
                setIsAnimating(false);
            }, 4000); // 1s decode + 3s display

        } else {
           setIsAnimating(false);
        }
        
        return () => {
            clearTimeout(decodeTimer);
            clearTimeout(displayTimer);
            clearTimeout(fadeOutTimer);
        }

    }, [isVisible]);

    return (
         <div className={cn(
            "flex items-center justify-center gap-2 transition-opacity duration-1000",
            isVisible ? "opacity-100" : "opacity-0"
        )}>
             <MatrixEffect
                key={`${text}-text`}
                strings={[text]}
                isFeatured={true}
                className="text-xs opacity-70"
                stopAfter={1000} // 1s decode
                loopAfter={4000} // 1s decode + 3s display
            />
            <MatrixEffect
                key={`${text}-arrow`}
                strings={[arrow]}
                isFeatured={true}
                className="text-xs opacity-70"
                stopAfter={1000}
                loopAfter={4000}
            />
        </div>
    )
};

export function ControlsHint() {
    const { t, lang } = useLocalization();
    const [activeHint, setActiveHint] = useState<'language' | 'theme'>('language');

     useEffect(() => {
        const interval = setInterval(() => {
            setActiveHint(prev => prev === 'language' ? 'theme' : 'language');
        }, 5000); // Each hint shows for 1s decode + 3s display + 1s fade = 5s

        return () => clearInterval(interval);
    }, []);
    
    const languageHintText = lang === 'pt' ? hintContent.language.en : t(hintContent.language);
    const themeHintText = t(hintContent.theme);

    return (
        <div className="absolute z-50 top-16 right-0 w-full h-6 pointer-events-none">
            <div className="absolute right-[160px] w-[140px]">
                 <Hint
                    text={languageHintText}
                    arrow={hintContent.language.arrow}
                    isVisible={activeHint === 'language'}
                />
            </div>
            <div className="absolute right-[40px] w-[140px]">
                <Hint
                    text={themeHintText}
                    arrow={hintContent.theme.arrow}
                    isVisible={activeHint === 'theme'}
                />
            </div>
        </div>
    );
}
