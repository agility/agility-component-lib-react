import React, { FC } from 'react';
import { default as cn } from 'classnames';

export interface InputLabelProps {
    /** Prop comment */
    isPlaceholder?: boolean;
    id: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    isError?: boolean;
    isActive?: boolean;
    isFocused?: boolean;
    label?: string;
}

/** Comment */
export const InputLabel: FC<InputLabelProps> = ({
    isPlaceholder = false,
    id,
    isRequired,
    isDisabled,
    isActive,
    isError,
    label
}: InputLabelProps) => {
    const labelStyles = cn(
        {'inline-block font-medium transition-all text-sm text-gray-700 mb-1': !isPlaceholder},
        {'inline-block font-medium ml-2 relative transition-all': isPlaceholder},
        { 'text-sm text-gray-400 px-2 top-9': isPlaceholder && !isActive },
        { 'text-xs text-gray-700 px-1 top-4 bg-white': isPlaceholder && isActive },
        { 'text-xs text-red-500 px-1 top-4 bg-white': isPlaceholder && isError },
        { 'text-red-500 bg-white': !isPlaceholder && isError },
        { 'z-10 text-gray-700/[.5]': isDisabled }
    );

    return (
        <label htmlFor={id} className={labelStyles}>
            {label}
            {isRequired && <span className="text-red-500"> *</span>}
        </label>
    );
};
