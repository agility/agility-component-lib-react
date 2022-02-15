import React, { FC, useEffect, useRef, useState } from 'react';
import { default as cn } from 'classnames';
import { DynamicIcons, IconName } from '../../util/DynamicIcons';

import '../../tailwind.css';
import { InputCounter } from '../InputCounter';
import { BaseField } from "../BaseField";

type Type = 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'time' | 'week' | 'currency';

export interface TextInputAddonProps {
    /** Input type*/
    type: Type;
    /** Input ID */
    id: string;
    /** Input Name */
    name: string;
    /** Label for the input */
    label: string;
    /** placeholder for the input */
    placeholder?: string;
    /** Force the focus state on the input */
    isFocused?: boolean;
    /** Error state */
    isError?: boolean;
    /** If field is required */
    isRequired?: boolean;
    /** Disabled state */
    isDisabled?: boolean;
    /** Set default value */
    defaultValue?: string;
    /** Message shown under the text field */
    message?: string;
    /** Input character counter */
    showCounter?: boolean;
    /** Max length of input character  */
    maxLength?: number;
    /** Icon to use in the text field  */
    primaryIcon?: IconName;
    /** Callback on change */
    onChange?(value: string): void;
}

export const TextInputAddon: FC<TextInputAddonProps> = ({
    label,
    isFocused,
    isError,
    id,
    name,
    isRequired,
    type,
    defaultValue,
    isDisabled,
    message,
    showCounter,
    maxLength = 100,
    placeholder,
    primaryIcon,
    onChange
}: TextInputAddonProps) => {
    const [isFocus, setIsFocus] = useState<boolean>(Boolean(isFocused));
    const [value, setValue] = useState<string | null | undefined>(defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);

    // set force focus
    useEffect(() => {
        const input = inputRef.current;
        if (!input || isFocus === undefined || isFocused === undefined || isDisabled) return;
        if (isFocus || isFocused) {
            input.focus();
        } else {
            input.blur();
        }
    }, [isFocus, isFocused]);

    // set label as active if default value is set
    useEffect(() => {
        const input = inputRef.current;
        if (!input || defaultValue === undefined || defaultValue === '') return;
    }, [defaultValue]);

    const handleInputFocus = (): void => {
        setIsFocus(true);
        // add other focus effects here
    };

    const handleInputBlur = (): void => {
        setIsFocus(false);
        // add other focus effects here
    };

    const inputStyles = cn('border py-2 px-3 rounded-md text-sm leading-5 font-normal w-full border-gray-300 shadow-sm pl-10', {
        'focus:ring-red-500 border-red-500 outline-red-500 shadow-none': isError
    });
    const labelStyles = cn('block inline-block font-medium transition-all text-sm text-gray-700', {
        'text-red-500 bg-white': isError
    });

    const discriptionStyles = cn('text-sm mt-1 block', { 'text-gray-500': !isError }, { 'text-red-500': isError });

    return (
        <div>
            <label htmlFor={id} className={labelStyles}>
                {label}
                {isRequired && <span className="text-red-500"> *</span>}
            </label>
            <div className="mt-1 relative">
                {primaryIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DynamicIcons icon={primaryIcon} className="h-5 w-5 text-gray-400" outline={false} />
                    </div>
                )}
                <BaseField
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={onChange}
                    onValueChange={setValue}
                    ref={inputRef}
                    type="text"
                    name={name}
                    id={id}
                    inputStyles={inputStyles}
                    isDisabled={isDisabled}
                    defaultValue={defaultValue}
                    maxLength={maxLength}
                    placeholder={placeholder}
                />
            </div>
            <div className="flex flex-row">
                <div className="grow">{message && <span className={discriptionStyles}>{message}</span>}</div>
                <div className="shrink-0">{showCounter && <InputCounter current={Number(value?.length)} limit={maxLength} />}</div>
            </div>
        </div>
    );
};
