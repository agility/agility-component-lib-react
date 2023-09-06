import React, { useEffect, useState } from "react"
import { default as cn } from "classnames"
import { Switch } from "@headlessui/react"
import { DynamicIcon, IDynamicIconProps } from "@/stories/atoms"

interface ToggleSwitchLabel {
	text: string | JSX.Element
	className?: string
	xPosition?: "left" | "right"
}

export interface IToggleSwitchProps {
	isChecked: boolean
	onChange: (isChecked: boolean) => void
	label?: ToggleSwitchLabel
	screenReaderLabel?: string
	name: string
	id: string
	variant?: "base" | "short"
	withIcon?: IDynamicIconProps
	disabled?: boolean,
	groupClassName?: string
}

const ToggleSwitch: React.FC<IToggleSwitchProps> = ({
	isChecked,
	onChange,
	label,
	screenReaderLabel,
	name,
	id,
	variant = "base",
	withIcon,
	disabled,
	groupClassName,
}) => {
	const [checked, setChecked] = useState<boolean>(isChecked)
	useEffect(() => setChecked(isChecked), [isChecked])

	return (
		<Switch.Group as={"div"} className={cn("flex items-center gap-2", groupClassName)}>
			{label && (label.xPosition === "left" || !label?.xPosition) && (
				<Switch.Label className={label.className}>{label.text}</Switch.Label>
			)}
			<Switch
				name={name}
				id={id}
				checked={checked}
				onChange={(v: boolean) => {
					onChange(v)
					setChecked(v)
				}}
				className={cn(
					{ "w-9 h-4 transition-all": variant === "short", " h-6 w-11": variant === "base" },
					checked && disabled ? "bg-purple-200" : checked ? "bg-purple-600" : "bg-gray-200",
					"relative inline-flex items-center rounded-full focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2  focus-within:ring-2 focus-within:ring-purple-600 focus-within:ring-offset-2  focus:ring-2 focus:ring-purple-600 focus:ring-offset-2  active:ring-2 active:ring-purple-600 active:ring-offset-2"
				)}
				disabled={disabled}
			>
				{screenReaderLabel && <span className="sr-only">{screenReaderLabel}</span>}
				<span
					className={cn(
						checked ? "translate-x-[22px]" : "translate-x-[2px]",
						{
							"border border-gray-200 translate-x-0": variant === "short",
							"!translate-x-[22px]": checked && variant === "short"
						},
						" h-5 w-5 transform rounded-full bg-white transition shadow-sm drop-shadow flex items-center justify-center"
					)}
				>
					{withIcon && <DynamicIcon {...withIcon} className={"text-gray-400 m-[2px]"} />}
				</span>
			</Switch>
			{label && label.xPosition === "right" && (
				<Switch.Label className={label.className}>{label.text}</Switch.Label>
			)}
		</Switch.Group>
	)
}

export default ToggleSwitch
