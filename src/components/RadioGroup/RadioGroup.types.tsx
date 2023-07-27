export interface RadioOption {
	label: string;
	value: string;
}

export type RadioGroupProps = {
	options: RadioOption[];
	name: string;
	selectedValue: string | null;
	onSelectionChange: (selectedValue: string) => void;
};
