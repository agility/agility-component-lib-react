import { FC } from "react";

export interface IInputCounterProps {
	/** Counter limit */
	limit: number | undefined;
	/** Counter current number */
	current: number;
}

/** Primary UI component for user interaction */
const InputCounter: FC<IInputCounterProps> = ({ current = 0, limit }) => {
	return (
		<div className="mt-3 text-center text-xs leading-4  text-gray-500 flex gap-1">
			<div className="currentCount">{current ?? 0}</div>
			{(limit || 0) > 0 && (
				<>
					<div>/</div>
					<div className="limitCount">{limit}</div>
				</>
			)}
		</div>
	);
};
export default InputCounter;
