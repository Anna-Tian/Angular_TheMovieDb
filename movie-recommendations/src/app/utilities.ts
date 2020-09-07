export interface DropdownOption {
  value: string;
  label: string;
  isLeaf?: boolean;
}

export interface FilterOption {
  checked: boolean;
  label?: string;
  valueNumber?: number;
  valueString?: string;
}

export interface Genres {
  id: number;
  name: string;
}

export interface Languages {
  iso_639_1: string;
  english_name: string;
  name: string;
}
