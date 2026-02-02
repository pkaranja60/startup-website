import { LucideIcon } from "lucide-react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";

interface GlobalInputGroupProps {
	icon?: LucideIcon;
	placeholder?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
}

export default function InputField({
	icon: Icon,
	placeholder,
	value,
	onChange,
	type = "text",
}: GlobalInputGroupProps) {
	return (
		<InputGroup className="py-6 rounded-xl text-sm bg-white/5">
			<InputGroupInput
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className='outline-none ring-0 focus-visible:outline-none focus-visible:ring-0'
			/>
				<InputGroupAddon>
					{Icon && (
						<Icon
					
							className="text-text-tertiary"
						/>
					)}
				</InputGroupAddon>
			
		</InputGroup>
	);
}
