export interface TypeItem {
  id: string;
  label: string;
}

export interface Frequency {
  id: number;
  label: string;
}

export interface Segment {
  id: number;
  name: string;
  type: string;
  refresh_frequency: number;
  created_at: string;
  updated_at: string;
  type_item: TypeItem;
  frequency: Frequency;
}
