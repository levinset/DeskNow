//
import { DateType } from "./DateTypes";
//
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

  // New properties for handling equipment visibility
  showEquipment: boolean; // Indicates whether equipment details are visible
  toggleEquipment: (id: string) => void; // Function to toggle equipment visibility
}
//
export interface DeskBookInfoProps {
  label: string;
  row: string;
  column: string;
  type: string;
  startDate: DateType | undefined;
  endDate: DateType | undefined;
  isUserFavourite: boolean;
  equipment: ("HDMI" | "USBC" | "HeightAdjustable" | "DOCK")[];
}
//
export interface DeskBookedProps {
  label: string;
  dateStart: string;
  dateEnd: string;
  officeName: string;
  column: number;
  row: number;
  key: string;
  deskId: string;
  userId: string;
  officeId: string;
  deskFavouriteId: string;
  deskCommentId: string;
}
//
export interface BookedDesk {
  id: string;
  bookedAt: string;
  dateStart: string;
  dateEnd: string;
  equipment: ("HDMI" | "USBC" | "HeightAdjustable" | "DOCK")[];
  onSuccess: () => void;
  label: string;
  row: number;
  column: number;
  department: string;
  createdAt: string;
  updatedAt: string;
  type: string;
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

  user: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    isAdmin: boolean;
    department: string;
    createdAt: string;
    updatedAt: string;
  };
  desk: {
    id: string;
    label: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    column: number;
    row: number;
    equipment: string[];
    office: {
      id: string;
      name: string;
      map: string;
      columns: number;
      rows: number;
      createdAt: string;
      updatedAt: string;
    };
  };
  // New properties for handling equipment visibility
  showEquipment: boolean; // Indicates whether equipment details are visible
  toggleEquipment: (id: string) => void; // Function to toggle equipment visibility
}
