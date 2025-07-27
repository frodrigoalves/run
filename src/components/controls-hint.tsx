'use client';

import { useEffect, useState } from "react";
import { MatrixEffect } from "./matrix-effect";
import { cn } from "@/lib/utils";
import { useLocalization } from "@/hooks/use-localization";

type HintState = 'language' | 'theme';

const hintContent = {
    language: {
        pt: 'Mudar Idioma', // Displayed when current lang is EN
        en: 'Switch Language', // Displayed when current lang is PT
        arrow: '↑',
        position: 'right-[160px]'
    },
    theme: {
        pt: 'Mudar Tema',
        en: 'Change Theme',
        arrow: '↑',
        position: 'right-[55px]'
    }
};

const arrowChars = ['/', '\\', '|', '-', '↑'];

export function ControlsHint() {
    const { t, lang } = useLocalization();
    const [state, setState] = useState<HintState>('language');

    useEffect(() => {
        const interval = setInterval(() => {
            setState(prevState => (prevState === 'language' ? 'theme' : 'language'));
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const currentHint = hintContent[state];
    
    // Inverse logic for language hint
    const languageHintText = lang === 'pt' ? hintContent.language.en : hintContent.language.pt;
    const themeHintText = t(hintContent.theme);
    const hintText = state === 'language' ? languageHintText : themeHintText;

    return (
        <div className={cn("absolute z-50 top-16 w-auto transition-all duration-500", currentHint.position)}>
            <div className="flex items-center justify-center gap-2">
                 <MatrixEffect
                    key={`${state}-text`}
                    strings={[hintText]}
                    isFeatured={true}
                    className="text-xs opacity-70"
                    loopAfter={4000}
                />
                 <MatrixEffect
                    key={`${state}-arrow`}
                    strings={[currentHint.arrow]}
                    isFeatured={true}
                    className="text-xs opacity-70"
                    loopAfter={4000}
                    characterSet={arrowChars}
                 />
            </div>
        </div>
    );
}
