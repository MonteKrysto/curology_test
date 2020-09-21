import React, { useEffect, useState } from "react";
import _ from "lodash/fp";

interface Props {
    label?: string;
    inputType?: string;
    id?: string;
    errors?: any;
    value?: string;
    onChange?: (val) => void;
}

/**
 * An input field that accepts a ref to the use-hook-form register method
 * in order to validate the field
 */
const Field = React.forwardRef<HTMLInputElement, Props>(
    (
        { label, onChange, inputType, id, errors, value },
        ref
    ) => {
        const handleOnChange = e => onChange(e.target.value);

        return (
            <div>
              <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        id={id || null}
                        placeholder={label}
                        type={inputType || null}
                        value={value}
                        name={label}
                        onChange={e => handleOnChange(e)}
                        className={`form-input block w-full transition ease-in-out duration-150 sm:text-sm sm:leading-5 ${
                            errors ? "border-red-700 border-2" : ""
                        }`}
                        ref={ref}
                    />
                </div>
                {errors && (
                    <p className="text-red-700">{errors.message}</p>
                )}
            </div>
        );
    }
);

export default Field;
