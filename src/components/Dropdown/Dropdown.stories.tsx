import React, { useState } from "react"
import { Meta } from "@storybook/react/types-6-0"
import { Story } from "@storybook/react"
import {
	Dropdown,
	IDropdownClassnames,
	IDropdownProps,
	ItemProp,
	defaultClassNames
} from "./Dropdown"
import { dropdownDataBase, dropdownDataWithIcons } from "./data"
import { BRAND_CONFIG } from "../../common"
import { DynamicIcons } from "../DynamicIcons/DynamicIcons"

export default {
	title: `${BRAND_CONFIG.brandTitle}/Components/Dropdown`,
	component: Dropdown
} as Meta

const Template: Story<IDropdownProps> = (args) => (
	<div className="text-center">
		<Dropdown {...args} />
	</div>
)

const baseArgs: IDropdownProps = {
	items: [...dropdownDataBase],
	label: "Dropdown",
	classNames: defaultClassNames,
	id: "dropdown"
}
export const AllVariations = Template.bind({})
AllVariations.decorators = [
	() => {
		return (
			<div className="mx-12 grid grid-flow-row gap-y-4 ">
				<Dropdown
					{...{
						...(Label.args as IDropdownProps)
					}}
				/>

				<Dropdown
					{...{
						...(IconOnly.args as IDropdownProps)
					}}
				/>
				<span className="mt-5 block text-xs text-gray-400">
					Note: controls are disabled on this view
				</span>
			</div>
		)
	}
]

const IconElement = () => (
	<DynamicIcons
		className="h-5 w-5 text-gray-400 hover:text-gray-600"
		aria-hidden="true"
		icon="DotsVerticalIcon"
	/>
)

export const IconOnly = Template.bind({})
IconOnly.args = {
	...baseArgs,
	items: dropdownDataWithIcons,
	CustomDropdownTrigger: <IconElement />
}
export const Label = Template.bind({})
Label.args = {
	...baseArgs,
	items: dropdownDataWithIcons
}
