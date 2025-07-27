'use client';

import { useEffect, useState } from "react";
import { MatrixEffect } from "./matrix-effect";
import { cn } from "@/lib/utils";
import { useLocalization } from "@/hooks/use-localization";

type HintState = 'language' | 'theme';

const hintContent = {
    language: {
        pt: 'Mudar Idioma',
        en: 'Switch Language',
        arrow: '↑',
    },
    theme: {
        pt: 'Mudar Tema',
        en: 'Change Theme',
        arrow: '↑',
    }
};

const arrowChars = ['/', '\\', '|', '-', '↑'];

const Hint = ({ text, arrow, isVisible, alwaysDecodeArrow }: { text: string; arrow: string; isVisible: boolean; alwaysDecodeArrow?: boolean; }) => (
    <div className={cn(
        "flex items-center justify-center gap-2 transition-opacity duration-1000",
        isVisible ? "opacity-100" : "opacity-0"
    )}>
        <MatrixEffect
            key={`${text}-text`}
            strings={[text]}
            isFeatured={true}
            className="text-xs opacity-70"
            loopAfter={7000}
            stopAfter={6000}
        />
        <MatrixEffect
            key={`${text}-arrow`}
            strings={[arrow]}
            isFeatured={true}
            className="text-xs opacity-70"
            characterSet={arrowChars}
            stopAfter={alwaysDecodeArrow ? undefined : 6000}
            loopAfter={alwaysDecodeArrow ? undefined : 7000}
        />
    </div>
);

export function ControlsHint() {
    const { t, lang } = useLocalization();
    const [activeHint, setActiveHint] = useState<HintState>('language');

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveHint(prevState => (prevState === 'language' ? 'theme' : 'language'));
        }, 7000); 

        return () => clearInterval(interval);
    }, []);
    
    const languageHintText = lang === 'pt' ? hintContent.language.en : hintContent.language.pt;
    const themeHintText = t(hintContent.theme);

    return (
        <div className="absolute z-50 top-16 right-0 w-full h-6 pointer-events-none">
            <div className="absolute right-[112px] w-[140px]">
                 <Hint
                    text={languageHintText}
                    arrow={hintContent.language.arrow}
                    isVisible={activeHint === 'language'}
                    alwaysDecodeArrow={true}
                />
            </div>
            <div className="absolute right-[40px] w-[140px]">
                <Hint
                    text={themeHintText}
                    arrow={hintContent.theme.arrow}
                    isVisible={activeHint === 'theme'}
                    alwaysDecodeArrow={true}
                />
            </div>
        </div>
    );
}
