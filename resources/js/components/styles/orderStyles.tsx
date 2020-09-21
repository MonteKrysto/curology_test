import React from "react";
import classnames from "classnames";

export const Box = ({ color, other = '', children, position = "" }) => {
    return (
        <div className={classnames(`${position} bg-${color} ${other}`)}>
            {children}
        </div>
    );
};

interface ImgContainerProps {
    right: string;
    width: string;
    height: string;
    imgWidth: string;
    src: string;
    children?: any;
}
export const ImgContainer: React.FC<ImgContainerProps> = ({
    right,
    width,
    height,
    imgWidth,
    src,
    children
}) => {
    return (
        <div className="lg:absolute lg:inset-0">
            <div
                className={classnames(
                    `lg:absolute lg:inset-y-0 lg:right-${right} lg:w-${width}`
                )}
            >
                <img
                    className={classnames(
                        `h-${height} ml-24 w-${imgWidth} object-cover lg:absolute lg:h-full`
                    )}
                    src={src}
                    alt=""
                />
            </div>
        </div>
    );
};

export const Header = ({ size, text, other = '' }) => {
    return (
        <h2
            className={classnames(
                `text-${size} leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10 ${other}`
            )}
        >
            {text}
        </h2>
    );
};

export const Text = ({ margin, color, text }) => {
    return (
        <p
            className={classnames(
                `mt-${margin} text-lg leading-7 text-${color} sm:mt-3`
            )}
        >
            {text}
        </p>
    );
};
