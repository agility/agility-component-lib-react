import React, { Fragment, HTMLAttributes, useState } from "react"
import { Transition } from "@headlessui/react"
import { default as cn } from "classnames"
import {
	useFloating,
	autoUpdate,
	offset,
	useDismiss,
	useRole,
	useClick,
	useInteractions,
	FloatingFocusManager,
	autoPlacement,
	shift,
	FloatingPortal,
	useTransitionStyles
} from "@floating-ui/react"
import { DynamicIcons, IDynamicIconsProps } from "../DynamicIcons/DynamicIcons"
import { ClassNameWithAutocomplete } from "../../util/types"

export interface ItemProp extends HTMLAttributes<HTMLButtonElement> {
	icon?: {
		name: IDynamicIconsProps["icon"]
		className?: ClassNameWithAutocomplete
		pos?: "trailing" | "leading"
		outline?: boolean
	}
	label: string
	onClick?(): void
	isEmphasized?: boolean
	key: React.Key
}
export interface IDropdownClassnames {
	groupClassname?: ClassNameWithAutocomplete
	itemsClassname?: ClassNameWithAutocomplete
	itemClassname?: ClassNameWithAutocomplete
	activeItemClassname?: ClassNameWithAutocomplete
	buttonClassname?: ClassNameWithAutocomplete
}
export interface IDropdownProps extends HTMLAttributes<HTMLDivElement> {
	items: ItemProp[][]
	label: string
	CustomDropdownTrigger?: React.ReactNode
	id: string
	classNames?: IDropdownClassnames
}
export const defaultClassNames: IDropdownClassnames = {
	groupClassname: "flex inline-block text-left",
	itemsClassname:
		"mt-2 origin-bottom-right rounded bg-white shadow-lg z-20 divide-y divide-gray-100 focus:outline-none border border-gray-300  ",
	itemClassname:
		"group flex w-full cursor-pointer items-center px-4 py-2 text-sm transition-all hover:bg-gray-100 hover:text-gray-900 justify-between gap-4 focus:outline-purple-600",
	activeItemClassname:
		"block px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 hover:text-gray-900",
	buttonClassname:
		"py-2px z-20 flex items-center self-end rounded outline-purple-500 transition-all focus:ring-purple-500 text-gray-400 hover:bg-white hover:text-gray-600 "
}

/** Comment */
export const Dropdown: React.FC<IDropdownProps> = ({
	items,
	id,
	label,
	classNames = defaultClassNames,
	CustomDropdownTrigger,
	...props
}: IDropdownProps): JSX.Element | null => {
	const [isOpen, setIsOpen] = useState(false)
	const [activeItem, setActiveItem] = useState<React.Key | null>(null)

	// Floating UI logic
	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [
			offset(10),
			autoPlacement({ allowedPlacements: ["bottom-end", "bottom"] }),

			shift({ rootBoundary: "document" })
		],
		whileElementsMounted: autoUpdate
	})
	const click = useClick(context)
	const dismiss = useDismiss(context)
	const role = useRole(context)
	const { getReferenceProps, getFloatingProps } = useInteractions([
		click,
		dismiss,
		role
	])
	const { isMounted, styles: transitionStyles } = useTransitionStyles(
		context,
		{
			duration: {
				open: 200,
				close: 200
			},
			initial: {
				opacity: 0
			},
			open: {
				opacity: 1
			}
		}
	)

	const {
		groupClassname,
		buttonClassname,
		itemsClassname,
		itemClassname,
		activeItemClassname
	} = classNames

	return (
		<div
			{...{
				className: groupClassname,
				role: "combobox",
				"aria-owns": `${id}-list`,
				"aria-expanded": isOpen,
				"aria-haspopup": "listbox",
				...props
			}}
		>
			<button
				{...{
					ref: refs.setReference,
					className: buttonClassname,
					onClick: () => {
						setIsOpen(!isOpen)
					},
					...getReferenceProps()
				}}
			>
				{CustomDropdownTrigger ? (
					<span className="pl-1">{CustomDropdownTrigger}</span>
				) : (
					<>
						<span className="pl-1">{label}</span>
						<DynamicIcons
							icon="ChevronDownIcon"
							className="ml-1 h-5 w-6 "
						/>
					</>
				)}
			</button>

			{isMounted && items.length > 0 && isOpen && (
				<FloatingPortal>
					<FloatingFocusManager context={context} modal={true}>
						<Transition
							as={Fragment}
							show={isOpen}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<ul
								{...{
									...getFloatingProps(),
									className: itemsClassname,
									ref: refs.setFloating,
									// style: floatingStyles,
									"aria-labelledby": label,
									id: `${id}-list`,
									role: "listbox",
									style: {
										position: context.strategy,
										top: Math.round(context.y ?? 0),
										left: Math.round(context.x ?? 0),
										width: "max-content",
										maxWidth:
											"min(calc(100vw - 10px), 25rem)",
										...floatingStyles
									}
								}}
								className={itemsClassname}
								ref={refs.setFloating}
								aria-labelledby={label}
								{...getFloatingProps()}
							>
								{items.map((itemStack, idx) => {
									return (
										<React.Fragment
											key={`${idx}-list-${id}`}
										>
											{itemStack.map(
												({
													onClick,
													label,
													key,
													isEmphasized,
													icon,
													...rest
												}) => {
													const active =
														activeItem &&
														activeItem === key
													const itemClass = cn(
														itemClassname,
														active
															? activeItemClassname
															: "",
														{
															"text-red-500 text-gray-900":
																isEmphasized,
															"bg-gray-100 text-red-500 hover:text-red-500":
																isEmphasized &&
																active,
															"bg-gray-100 text-gray-900":
																active
														}
													)
													return (
														<li>
															<button
																{...{
																	onClick:
																		() => {
																			setActiveItem(
																				key
																			)
																			onClick &&
																				onClick()
																		},
																	key,
																	className:
																		itemClass,
																	...rest
																}}
															>
																{icon &&
																	(icon.pos ===
																		"leading" ||
																		icon?.pos ===
																			undefined) && (
																		<DynamicIcons
																			{...{
																				icon: icon.name,
																				className:
																					icon.className,
																				outline:
																					icon.outline
																			}}
																		/>
																	)}
																<div className="whitespace-nowrap">
																	{label}
																</div>
																{icon &&
																	icon.pos ===
																		"trailing" && (
																		<DynamicIcons
																			{...{
																				icon: icon.name,
																				className:
																					icon.className,
																				outline:
																					icon.outline
																			}}
																		/>
																	)}
															</button>
														</li>
													)
												}
											)}
										</React.Fragment>
									)
								})}
							</ul>
						</Transition>
					</FloatingFocusManager>
				</FloatingPortal>
			)}
		</div>
	)
	// return (
	// 	<div
	// 		role="combobox"
	// 		aria-expanded={isOpen}
	// 		aria-owns={`${id}-list`}
	// 		aria-haspopup="listbox"
	// 	>
	// 		<button onClick={toggling} aria-controls={`${id}-list`}>
	// 			{selectedOption ? selectedOption.name : "Select option"}
	// 		</button>
	// 		{isOpen && (
	// 			<ul id={`${id}-list`} role="listbox" tabIndex="-1">
	// 				{options.map((option, index) => (
	// 					<li
	// 						key={option.id}
	// 						id={`${id}-option-${index}`}
	// 						onClick={onOptionClicked(option)}
	// 						onKeyPress={onOptionClicked(option)}
	// 						role="option"
	// 						aria-selected={
	// 							selectedOption &&
	// 							selectedOption.id === option.id
	// 						}
	// 						tabIndex="0"
	// 					>
	// 						{option.name}
	// 					</li>
	// 				))}
	// 			</ul>
	// 		)}
	// 	</div>
	// )
}
