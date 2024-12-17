import React from "react";
import { TablerIconName } from "./tablerIconNames";
import * as TablerIcons from "@tabler/icons-react";
import { ClassNameWithAutocomplete } from "@/utils/types";

export interface ITablerIconProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
	icon: TablerIconName;
	className?: ClassNameWithAutocomplete;
}

const TablerIcon: React.FC<ITablerIconProps> = ({
	icon,
	className = "w-6 h-6 text-gray-600"
}: ITablerIconProps): JSX.Element => {
	//@ts-ignore
	const Icon = TablerIcons[icon];
	return (
		<i>
			<Icon className={className} />
		</i>
	);
};
export default TablerIcon;
