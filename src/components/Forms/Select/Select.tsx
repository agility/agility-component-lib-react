import React, { FC, useState } from "react"
import { default as cn } from "classnames"
import { InputLabel } from "../InputLabel"
import { useId } from "../../../util/useID"

export type SimpleSelectOptions = {
	label: string
	value: string
}

export interface SimpleSelectProps {
	/** Label */
	label?: string
	/** Select ID prop */
	id?: string
	/** Select name prop */
	name?: string
	/** List of options to display in the select menu */
	options: SimpleSelectOptions[]
	/** Select name prop */
	onChange?(value: string): void
	/** Select disabled state */
	isDisabled?: boolean
	/** Select error state */
	isError?: boolean
	/** Select required state */
	isRequired?: boolean
}

/** Comment */
export const Select: FC<SimpleSelectProps> = ({
	label,
	id,
	name,
	options,
	onChange,
	isDisabled,
	isError,
	isRequired
}: SimpleSelectProps) => {
	const [selectedOption, setSelectedOption] = useState<string>(options[0].value)
	const uniqueID = useId()
	if (!id) id = `select-${uniqueID}`
	if (!name) name = id

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const targetValue = e.target.value
		typeof onChange == "function" && onChange(targetValue)
		setSelectedOption(targetValue)
	}
	const selectStyles = cn(
		"block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none",
		"focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded",
		{ "border-red-500": isError },
		{ "border-gray-300": !isError }
	)
	const wrapperStyle = cn({ "opacity-50": isDisabled })
	return (
		<div className={wrapperStyle}>
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
			<select
				id={id}
				name={name}
				className={selectStyles}
				onChange={handleChange}
				disabled={isDisabled}
				value={selectedOption}
			>
				{options.map(({ value, label }) => {
					return (
						<option key={value} value={value}>
							{label}
						</option>
					)
				})}
			</select>
		</div>
	)
}
