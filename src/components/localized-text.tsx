'use client';
import { useLocalization } from "@/hooks/use-localization";

type LocalizedTextProps = {
    pt: string;
    en: string;
}

export function LocalizedText({ pt, en }: LocalizedTextProps) {
    const { t } = useLocalization();
    return <>{t({ pt, en })}</>;
}
