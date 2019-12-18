import { MouseEvent, FormEvent } from 'react';

export interface IAutoCompleteProps {
	inputLabel: string;
	inputRequired: boolean;
	inputPlaceholder: string;
	showAddNewItem: boolean;
	addNewItemText?: string;
	searchedItems: any[];
	selectedItems: any[];
	onSearch: (search: string) => Promise<void>;
	addNewItem: (e: MouseEvent) => void;
	onSelectItem: (e: MouseEvent, item: any) => Promise<void>;
	onRemoveItem: (e: MouseEvent, _id: string) => void;
	onSaveSelect: (e: FormEvent<HTMLButtonElement>) => void;
}
export interface IAutoCompleteStates {
	showAutoComplete: boolean;
	searchString: string;
}
