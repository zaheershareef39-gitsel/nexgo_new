import React from 'react'

const footer = () => {
    return (
        <div className="w-full bg-slate-900 flex justify-center mt-auto border-t border-slate-700">
            <div className="md:p-6 w-full flex flex-col items-center py-6 gap-3">
                <div className="flex gap-1 items-center cursor-pointer hover:opacity-80 transition-opacity duration-200">
                    <h3 className="text-white font-bold text-2xl tracking-wide">Nex Go</h3>
                    <img
                        src={
                            "https://static.vecteezy.com/system/resources/thumbnails/063/107/886/small/playful-captivating-abstract-symbol-of-time-hourglass-with-clean-lines-flat-color-minimal-design-with-scalable-design-artisan-png.png"
                        }
                        alt="HiresLogo"
                        className="w-8 h-8 object-contain"
                    />
                </div>
                <div className="text-sm text-gray-400">© Copyright 2026</div>
            </div>
        </div>
    )
}

export default footer
