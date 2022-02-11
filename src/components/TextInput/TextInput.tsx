import React, { FC, useEffect, useRef, useState } from "react";
import { default as cn } from "classnames";

import "../../tailwind.css";

export interface TextInputProps {
    /** Input type*/
    type: string;
    /** Input ID */
    id: string;
    /** Input Name */
    name: string;
    /** Label for the input */
    label: string;
    /** Force the focus state on the input */
    focused?: boolean;
    /** Error state */
    error?: boolean;
    /** Callback on change */
    isRequire?: boolean;
    onChange?(value: string): void;
}

export const TextInput: FC<TextInputProps> = ({
    label,
    focused,
    error,
    id,
    name,
    isRequire,
    type,
    onChange,
}: TextInputProps) => {
    const [isFocus, setIsFocus] = useState<boolean>(Boolean(focused));
    const [isActive, setIsActive] = useState<boolean>(Boolean(false));
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const input = inputRef.current;
        if (!input || isFocus === undefined || focused === undefined) return;
        if (isFocus || focused) {
            input.focus();
            setIsActive(true);
        } else {
            input.blur();
        }
    }, [isFocus, focused]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e.currentTarget.value);
    };

    const handleInputFocus = () => {
        setIsFocus(true);
    };

    const handleInputBlur = () => {
        const input = inputRef.current;
        setIsFocus(false);
        if (input && input.value === "") {
            setIsActive(false);
        } else {
            setIsActive(true);
        }
    };

    const handleLabelClick = () => {
        setIsFocus(() => {
            if (!isFocus) return true;
            return isFocus;
        });
    };

    const inputStyles = cn(
        "border-2 py-2 px-3 rounded-md text-sm leading-5 font-normal w-full",
        {
            "border-gray-300 shadow-sm": !isFocus,
        },
        {
            "focus:ring-1 focus:ring-indigo-500 border-indigo-500 outline-indigo-500 shadow-none":
                isFocus,
        },
        {
            "focus:ring-1 focus:ring-red-500 border-red-500 outline-red-500 shadow-none":
                error,
        }
    );
    const labelStyles = cn(
        "block inline-block font-medium ml-2 relative transition-all",
        {
            "text-sm text-gray-500 px-2 top-9": !isActive,
        },
        {
            "text-xs text-gray-700 px-1 top-4 bg-white": isActive,
        }
    );

    return (
        <div className="font-muli">
            <label
                htmlFor="email"
                className={labelStyles}
                onClick={handleLabelClick}
            >
                {label}
                {isRequire && <span className="text-red-500"> *</span>}
            </label>
            <div className="mt-1">
                <input
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={(e) => handleChange(e)}
                    ref={inputRef}
                    type={type}
                    name={name}
                    id={id}
                    className={inputStyles}
                />
            </div>
        </div>
    );
};
