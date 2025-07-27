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
    },
    theme: {
        pt: 'Mudar Tema',
        en: 'Change Theme',
        arrow: '↑',
    }
};

const arrowChars = ['/', '\\', '|', '-', '↑'];

export function ControlsHint() {
    const { t, lang } = useLocalization();
    const [activeHint, setActiveHint] = useState<HintState>('language');
    const [isLanguageVisible, setLanguageVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveHint(prevState => {
                const newState = prevState === 'language' ? 'theme' : 'language';
                setLanguageVisible(newState === 'language');
                return newState;
            });
        }, 5000); // Cycle every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const languageHintText = lang === 'pt' ? hintContent.language.en : hintContent.language.pt;
    const themeHintText = t(hintContent.theme);

    const Hint = ({ text, arrow, positionClass, isVisible }: { text: string; arrow: string; positionClass: string; isVisible: boolean }) => (
        <div className={cn(
            "absolute z-50 top-16 w-auto transition-opacity duration-1000",
            positionClass,
            isVisible ? "opacity-100" : "opacity-0"
        )}>
            <div className="flex items-center justify-center gap-2">
                <MatrixEffect
                    key={`${text}-text`}
                    strings={[text]}
                    isFeatured={true}
                    className="text-xs opacity-70"
                    loopAfter={5000}
                    stopAfter={4000}
                />
                <MatrixEffect
                    key={`${text}-arrow`}
                    strings={[arrow]}
                    isFeatured={true}
                    className="text-xs opacity-70"
                    loopAfter={5000}
                    stopAfter={4000}
                    characterSet={arrowChars}
                />
            </div>
        </div>
    );

    return (
        <>
            <Hint
                text={languageHintText}
                arrow={hintContent.language.arrow}
                positionClass="right-[160px]"
                isVisible={isLanguageVisible}
            />
            <Hint
                text={themeHintText}
                arrow={hintContent.theme.arrow}
                positionClass="right-[55px]"
                isVisible={!isLanguageVisible}
            />
        </>
    );
}
