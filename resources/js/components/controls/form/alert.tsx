import React from "react";

interface Props {
    type: String;
    title: String;
    message: String;
}
const Alert: React.FC<Props> = ({ type, title, message }) => {
    const color = type === 'success' ? 'green' : 'red';

    return (
        <div
            className={`rounded-md bg-${color}-200 p-4 w-3/4 ml-64 h-20 mt-10`}
        >
            <div className="flex">
                <div className="ml-3">
                    <h3 className={`text-sm leading-5 font-medium text-${color}-800`}>
                        {title}
                    </h3>
                    <div className={`mt-2 text-sm leading-5 text-${color}-700`}>
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Alert };