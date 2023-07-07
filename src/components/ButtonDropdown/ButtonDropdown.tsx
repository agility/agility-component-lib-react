import React, { FC } from "react"
import classNames from "classnames"

import { Button, ButtonProps } from "../Button/Button"
import { Dropdown, DropdownProps } from "../Dropdown"
export interface ButtonDropDownProps {
	button: ButtonProps
	dropDown: DropdownProps
	xPosition?: "left" | "right"
}

/**
 * Primary UI component for user interaction
 */
export const ButtonDropDown: FC<ButtonDropDownProps> = ({
	button,
	dropDown,
	xPosition
}) => {
	return (
		<div className="flex items-stretch">
			<Button
				{...button}
				className="!rounded-r-none !border-r-0 hover:!border-r-0 "
			/>
			<div
				className={classNames(
					"w-[1px]",
					button.type === "primary" ? "bg-purple-700" : "",
					button.type === "secondary" ? "bg-purple-200" : "",
					button.type === "alternative" ? "bg-gray-300" : ""
				)}
			></div>
			<Dropdown
				{...dropDown}
				className={classNames(
					"h-full rounded-l-none border !border-l-0  px-2 transition-all hover:!border-l-0",
					button.type === "primary"
						? "border-purple-600 bg-purple-600  !text-white  hover:border-purple-700 hover:bg-purple-700 active:!border-purple-800 active:!bg-purple-800"
						: "",
					button.type === "secondary"
						? "border-purple-100 bg-purple-100 !text-purple-700  hover:border-purple-200 hover:bg-purple-200 active:!border-purple-300 active:!bg-purple-300"
						: "",
					button.type === "alternative"
						? "border-gray-300 bg-white !text-gray-600  hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100"
						: ""
				)}
				xPosition={xPosition || "right"}
				//itemsClassName="left-10X"
			/>
			<div className="hidden !bg-purple-100 !text-purple-600 transition-all hover:bg-purple-200 focus:bg-purple-300" />
		</div>
	)
}
