import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import Box from "@mui/material/Box";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            delay: 1,
            // staggerChildren: 0.2,
            // delayChildren: 1.2
        }
    }
};


const itemP = (offset) => {
    return {
        hidden: {
            opacity: 1,
            rotate: [0, 0],
            x: [0, 0],
            y: [0, 0],
        },
        show: {
            opacity: 1,
            rotate: [360, 360],
            x: [0, 60],
            y: [0, -60],
            transition: {
                duration: 2,
                ease: [0.02, 0.6, 0.01, 0.91]
            }
        }
    };
};

// Framer makes it hard to animate for mobile and desktop at the same time
export function LogoAnimation() {
    const mobileFactor = 1;

    const sizeE = 100 * mobileFactor;
    const sizeP1 = 165 * mobileFactor;
    const sizeP2 = 112 * mobileFactor;
    const sizes = {
        e: sizeE,
        p1: sizeP1,
        p2: sizeP2
    };

    const offset = {
        p1: 0,
        p2: -40
    };

    const logoPlate = <Image
        src={"/logos/animation/logoPlate.png"}
        alt={"logo"}
        height={sizes.p1}
        width={sizes.p1}
    />;
    const logoArrow = <Image
        src={"/logos/animation/logoArrow.png"}
        alt={"logo"}
        height={sizes.e}
        width={sizes.e}
    />;

    return (
        <Box
            component={"div"}
            // className={"sm:mt-[100px] mt-[50px]"}
            sx={{
                width: "100%",
                position: "relative",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
            }}
        >
            {/* E part */}
            <motion.div
                // variants={container}
                className={"flex justify-center relative"}
                initial="hidden"
                animate="show"
            >
                {logoPlate}
                <motion.div
                    // variants={container}
                    initial="hidden"
                    animate="show"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                >
                    <motion.div
                        variants={itemP(offset.p1)}
                    >
                        {logoArrow}
                    </motion.div>
                </motion.div>
            </motion.div>
        </Box>
    );
}