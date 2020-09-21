import React, { useState } from "react";

interface Option {
    value: string;
    text: string;
}
interface Props {
    label?: string;
    id?: string;
    onChange: (val) => void;
    options: Option[];
    defaultText?: string;
    errors?: any;
    name?: string;
    value?: any;
}

/**
 * Return a select box component.
 */
const Select = React.forwardRef<HTMLSelectElement, Props>(
    (
        { label, id, onChange, value, defaultText, errors, options, name },
        ref
    ) => {
        const [fieldName, setFieldName] = useState("");
        const [selectedOption, setSelectedOption] = useState(0);

        /**
         * Set the default option and call the onChange callback
         * @param e
         */
        const handleOnChange = e => onChange(e.target.value);

        return (
            <div>
                <label className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px">
                    {label}
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                        <select
                            name={label}
                            value={value || ""}
                            className={`block form-select w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                                errors ? "border-red-700 border-2" : ""
                            }`}
                            defaultValue=""
                            onChange={e => handleOnChange(e)}
                            ref={ref}
                        >
                            {defaultText && (
                                <option value="" disabled>
                                    {defaultText}
                                </option>
                            )}
                            {options &&
                                options.map(opt => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.text}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                {errors && <p className="text-red-700">{errors.message}</p>}
            </div>
        );
    }
);

export { Select };
