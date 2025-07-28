import React from "react";
import { gsap } from "gsap";
import { Montserrat } from "next/font/google";

interface MenuItemProps {
    id: string;
    link: string;
    text: string;
    image: string;
}

interface FlowingMenuProps {
    items?: MenuItemProps[];
}

const monserrat = Montserrat({
    subsets: ['latin'],
    weight: ['100','300', '400', '500', '600', '700'],
    variable: '--font-montserrat',
    display: 'swap',
});

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
    return (
        <div className="w-full h-full overflow-hidden">
            <nav className="flex flex-col h-full m-0 p-0">
                {items.map((item, idx) => (
                    <MenuItem key={idx} {...item} />
                ))}
            </nav>
        </div>
    );
};

const MenuItem: React.FC<MenuItemProps> = ({ link, text, image }) => {
    const itemRef = React.useRef<HTMLDivElement>(null);
    const marqueeRef = React.useRef<HTMLDivElement>(null);
    const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

    const animationDefaults = { duration: 0.6, ease: "expo" };

    const findClosestEdge = (
        mouseX: number,
        mouseY: number,
        width: number,
        height: number
    ): "top" | "bottom" => {
        const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
        const bottomEdgeDist =
            Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
        return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
    };

    const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
            return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(
            ev.clientX - rect.left,
            ev.clientY - rect.top,
            rect.width,
            rect.height
        );

        const tl = gsap.timeline({ defaults: animationDefaults });
        tl.set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
            .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" })
            .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" });
    };

    const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
            return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(
            ev.clientX - rect.left,
            ev.clientY - rect.top,
            rect.width,
            rect.height
        );

        const tl = gsap.timeline({ defaults: animationDefaults }) as TimelineMax;
        tl.to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }).to(
            marqueeInnerRef.current,
            { y: edge === "top" ? "101%" : "-101%" }
        );
    };

    const repeatedMarqueeContent = React.useMemo(() => {
        return Array.from({ length: 1 }).map((_, idx) => (
            <React.Fragment key={idx}>
                <span className={`text-[#060010] uppercase font-light text-xl leading-[1.2] p-[1vh_1vw_0] ${monserrat.className}`}>
                    {text}
                </span>
                <div
                    className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                />
            </React.Fragment>
        ));
    }, [text, image]);

    return (
        <div
            className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff]"
            ref={itemRef}
        >
            <a
                className="flex items-center justify-center h-full relative uppercase no-underline font-semibold text-white text-2xl cursor-arrow-right hover:text-[#060010] focus:text-white focus-visible:text-[#060010]"
                href={link}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <span className="flex items-center justify-between w-full px-4">
                    <span className={`${monserrat.className} text-xl font-light w-[20%] text-left`}>
                        {text.split(" ")[0]}
                    </span>
                    <span className={`${monserrat.className} text-xl font-normal uppercase text-center w-[60%]`}>
                        {text.split(" ").slice(1).join(" ")} {/* Nome */}
                    </span>
                    <span className="w-[20%] text-right">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 inline-block"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="0.5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10m0-10h10v10" />
                        </svg>
                    </span>
                </span>

            </a>
            <div
                className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white translate-y-[101%]"
                ref={marqueeRef}
            >
                <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>
                    <div className="flex items-center relative h-full w-[150%] will-change-transform animate-marquee">
                        {repeatedMarqueeContent}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlowingMenu;

