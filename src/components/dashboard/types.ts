export interface DataItem {
  id: string;
  title: string;
  value: string;
  change?: string;
  description?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  description?: string;
  items: DataItem[];
}
