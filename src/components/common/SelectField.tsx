import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface SelectFieldProps {
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	options: string[];
}

export function SelectField({
	value,
	onChange,
	placeholder = "Select an option",
	options,
}: SelectFieldProps) {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{options.map((opt) => (
						<SelectItem key={opt} value={opt}>
							{opt}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
