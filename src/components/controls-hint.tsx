'use client';

import { MatrixEffect } from "./matrix-effect";
import { cn } from "@/lib/utils";

const hintText = { pt: 'Controles', en: 'Controls' };

export function ControlsHint() {

    return (
        <div className={cn("absolute z-50 top-12 right-0 left-0 mx-auto w-max")}>
            <div className="flex items-center justify-center">
                <MatrixEffect
                    strings={[hintText.pt, hintText.en]}
                    isFeatured={true}
                    className="text-xs opacity-70"
                    loopAfter={4000}
                />
            </div>
        </div>
    );
}
