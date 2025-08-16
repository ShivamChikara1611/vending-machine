"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

// Transition settings for animations
const transition = {
    type: "spring",
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

// ---------------- Menu Item ----------------
export const MenuItem = ({ setActive, active, item, children }) => {
    return (
        <div onMouseEnter={() => setActive(item)} className="relative">
            <motion.p
                transition={{ duration: 0.3 }}
                className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
            >
                {item}
            </motion.p>
            {active !== null && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={transition}
                >
                    {active === item && (
                        <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
                            <motion.div
                                transition={transition}
                                layoutId="active"
                                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
                            >
                                <motion.div layout className="w-max h-full p-4">
                                    {children}
                                </motion.div>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

// ---------------- Menu Wrapper ----------------
export const Menu = ({ setActive, children }) => {
    return (
        <nav
            onMouseLeave={() => setActive(null)}
            className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6"
        >
            {children}
        </nav>
    );
};

// ---------------- Product Item ----------------
export const ProductItem = ({ title, description, href, src }) => {
    return (
        <a href={href} className="flex space-x-2">
            <img
                src={src}
                width={140}
                height={70}
                alt={title}
                className="shrink-0 rounded-md shadow-2xl"
            />
            <div>
                <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
                    {title}
                </h4>
                <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
                    {description}
                </p>
            </div>
        </a>
    );
};

// ---------------- Hovered Link ----------------
export const HoveredLink = ({ children, ...rest }) => {
    return (
        <a
            {...rest}
            className="text-neutral-700 dark:text-neutral-200 hover:text-black"
        >
            {children}
        </a>
    );
};

// ---------------- Main Navbar ----------------
const Navbar = () => {
    const [active, setActive] = useState(null);

    return (
        <div className="w-full flex justify-center mt-6">
            <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Products">
                    <div className="grid grid-cols-1 gap-4">
                        <ProductItem
                            title="Cold Drinks"
                            description="Refreshing beverages."
                            href="#"
                        />
                        <ProductItem
                            title="Snacks"
                            description="Quick bites for any time."
                            href="#"
                        />
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="About">
                    <div className="flex flex-col space-y-4">
                        <HoveredLink href="#">Our Story</HoveredLink>
                        <HoveredLink href="#">Team</HoveredLink>
                        <HoveredLink href="#">Careers</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Contact">
                    <div className="flex flex-col space-y-4">
                        <HoveredLink href="#">Support</HoveredLink>
                        <HoveredLink href="#">Locations</HoveredLink>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default Navbar;
