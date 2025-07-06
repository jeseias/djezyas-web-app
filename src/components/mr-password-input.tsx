import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { Input } from "./ui/input";

type Props = {
	field: ControllerRenderProps<any, "password">;
};

export const MrPasswordInput = ({ field }: Props) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div className="relative">
			<Input
				placeholder="********"
				type={showPassword ? "text" : "password"}
				{...field}
				className="pr-8"
			/>
			<button
				type="button"
				onClick={() => setShowPassword(!showPassword)}
				className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
			>
				{showPassword ? (
					<EyeOff className="h-4 w-4" />
				) : (
					<Eye className="h-4 w-4" />
				)}
			</button>
		</div>
	);
};
