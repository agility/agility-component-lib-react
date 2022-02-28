import React, { forwardRef, useState } from 'react';
import { default as cn } from 'classnames';
import { InputCounter } from '../InputCounter';
import { InputLabel } from "../InputLabel";

export interface TextareaProps {
    /** Input ID */
    id: string;
    /** Input Name */
    name: string;
    /** Label for the input */
    label: string;
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
    isShowCounter?: boolean;
    /** Max length of input character  */
    maxLength?: number;
    /** Callback on change */
    onChange?(value: string): void;
    /** Number of rows */
    rows?: number;
}

const Textarea = (
    {
        id,
        name,
        label,
        isError,
        isRequired,
        isDisabled,
        defaultValue,
        message,
        isShowCounter,
        maxLength = 500,
        rows = 4,
        onChange
    }: TextareaProps,
    ref: React.LegacyRef<HTMLTextAreaElement>
) => {
    const [value, setValue] = useState<string | null | undefined>(defaultValue);
    const handleOnchange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const targetValue = e.currentTarget.value;
        typeof onChange === 'function' && onChange(targetValue);
        setValue(targetValue);
    };
    const inputStyles = cn(
        'shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm rounded-md',
        { 'border-gray-300 ': !isError },
        { 'focus:ring-red-500 border-red-500 outline-red-500 shadow-none': isError }
    );
    const discriptionStyles = cn(
        'text-sm mt-1 block',
        { 'text-gray-500': !isError },
        { 'text-red-500': isError }
    );
    const wrapperStyles = cn({ 'opacity-50': isDisabled });
    return (
        <div className={wrapperStyles}>
            {label && (
                <InputLabel
                    isPlaceholder
                    isActive
                    label={label}
                    isRequired={isRequired}
                    id={id}
                    isError={isError}
                    isDisabled={isDisabled}
                />
            )}
            <div>
                <textarea
                    ref={ref}
                    maxLength={maxLength}
                    onChange={handleOnchange}
                    rows={rows}
                    name={name}
                    id={id}
                    className={inputStyles}
                    defaultValue={''}
                />
            </div>
            <div className="flex flex-row space-x-3">
                <div className="grow">
                    {message && <span className={discriptionStyles}>{message}</span>}
                </div>
                {isShowCounter && (
                    <div className="shrink-0">
                        <InputCounter current={Number(value?.length)} limit={maxLength} />
                    </div>
                )}
            </div>
        </div>
    );
};

const _Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(Textarea);
export { _Textarea as Textarea };
