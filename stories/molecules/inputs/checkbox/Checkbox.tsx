import React, { FC } from "react"
import { default as cn } from "classnames"
import InputLabel from "@/stories/molecules/inputs/InputLabel"
import { useId } from "@/utils/useId"

export interface CheckboxProps {
	/** Checkbox label */
	label: string
	/** Checkbox ID */
	id?: string
	/** Disabled state */
	isDisabled?: boolean
	/** value */
	value?: string
	/** Check state */
	isChecked?: boolean
	/** If field is required */
	isRequired?: boolean
	/** Error state */
	isError?: boolean
	/** Message or description */
	message?: string
	/** Callback on input change */
	onChange?(value: string, isChecked: boolean): void
	/** Has a border around the checkbox and label */
	hasBorder?: boolean
	/** any arbitrary classNames to add to the wrapper */
	className?: string
}

/** Comment */
const Checkbox: FC<CheckboxProps> = ({
	label,
	id,
	isDisabled,
	isChecked,
	isRequired,
	isError,
	message,
	value,
	onChange,
	hasBorder,
	className,
	...props
}: CheckboxProps) => {
	const uniqueID = useId()
	if (!id) id = `cb-${uniqueID}`

	const checkboxStyles = cn(
		"rounded-sm border-gray-300 text-sm font-normal leading-5 text-purple-600 focus:ring-purple-600",
		{ "border-red-500 shadow-none": isError }
	)
	const wrapperStyles = cn(
		"relative flex items-center min-h-[38px]",
		{ "opacity-50": isDisabled },
		{ "rounded-sm ring-1 px-3 ring-gray-300": hasBorder },
		{ "py-3": hasBorder && message },
		className
	)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e)
		const targetValue = e.target.value
		const targetChecked = e.target.checked
		typeof onChange === "function" && onChange(targetValue, targetChecked)
	}

	return (
		<div className={wrapperStyles}>
			<div className="flex items-center">
				<input
					id={id}
					aria-describedby={`${id}-description`}
					name={id}
					value={value}
					type="checkbox"
					className={checkboxStyles}
					disabled={isDisabled}
					checked={isChecked}
					onChange={(e) => {
						handleChange(e)
					}}
					{...props}
				/>
			</div>
			<div className="ml-3 text-sm ">
				<label htmlFor={id} className="font-medium text-gray-700">
					<InputLabel label={label} isRequired={isRequired} id={id} />
				</label>
				{message && (
					<p id={`${id}-description`} className="text-gray-500">
						{message}
					</p>
				)}
			</div>
		</div>
	)
}
export default Checkbox
