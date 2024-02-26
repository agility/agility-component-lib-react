import React, { FC } from "react"
import { default as cn } from "classnames"

export interface IInputLabelProps {
	/** Prop comment */
	isPlaceholder?: boolean
	id: string
	isRequired?: boolean
	isDisabled?: boolean
	isError?: boolean
	isActive?: boolean
	isFocused?: boolean
	label?: string
}

/** Comment */
const InputLabel: FC<IInputLabelProps> = ({
	isPlaceholder = false,
	id,
	isRequired,
	isDisabled,
	isActive,
	isError,
	label
}: IInputLabelProps) => {
	const labelStyles = cn(
		"z-[2] bg-label-gradient-idle group-focus-within:bg-label-gradient-focus",
		{ "inline-block font-medium transition-all text-sm text-gray-700 ": !isPlaceholder },
		{ "inline-block font-medium ml-2 relative transition-all": isPlaceholder },
		{ "text-sm text-gray-400 px-2 top-8": isPlaceholder && !isActive },
		{ "text-xs text-gray-700 px-1 top-[10px] ": isPlaceholder && isActive },
		{ "text-xs text-red-500 px-1 top-[10px] ": isPlaceholder && isError },
		{ "text-red-500 ": !isPlaceholder && isError },
		{ "text-gray-500/[.5]": isDisabled }
	)
	if (!label) return null
	return (
		<label htmlFor={id} className={labelStyles}>
			{label}
			{isRequired && <span className="text-red-500"> *</span>}
		</label>
	)
}

export default InputLabel
