export interface DeskProps {
  id: string;
  label: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  column: number;
  row: number;
  equipment: ("HDMI" | "USBC" | "HeightAdjustable" | "DOCK")[];
  fixdesk: null | string;
  office: {
    id: string;
    name: string;
    map: string;
    columns: number;
    rows: number;
    createdAt: string;
    updatedAt: string;
  };
  nextBooking: null;
  isUserFavourite: boolean;
}
