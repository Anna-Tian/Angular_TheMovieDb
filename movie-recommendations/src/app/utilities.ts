export interface DropdownOption {
  value: string;
  label: string;
  isLeaf: boolean;
}

export interface FilterOption {
  checked: boolean;
  value?: string;
  id?: number;
}

export interface Genres {
  id: number;
  name: string;
}
