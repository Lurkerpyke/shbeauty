"use client";

import { useEffect, useState } from "react";

const sections = ["section1", "section2", "section3", "section4"];

const SectionPage = () => {
    return (
        <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
            {sections.map((id, index) => (
                <section
                    key={id}
                    id={id}
                    className={`transition-transform duration-700 snap-y snap-mandatory h-screen w-full flex items-center justify-center text-5xl font-bold text-white snap-start ${index % 2 === 0 ? "bg-blue-600" : "bg-green-600"
                        }`}
                >
                    {id.toUpperCase()}
                </section>
            ))}
            <DotNav />
        </div>
    );
};

const DotNav = () => {
    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
            {sections.map((id, idx) => (
                <button
                    key={id}
                    className={`w-3 h-3 rounded-full transition-all duration-300
                        }`}
                    aria-label={`Go to ${id}`}
                />
            ))}
        </div>
    );
};


export default SectionPage;
