//
import { DateValueType } from "react-tailwindcss-datepicker";
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
  deskColor: string;
  isDate: DateValueType;
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
  fixdesk: boolean;
  firstname: string;
  lastname: string;
  email: string;
  deskId: string | null;
  userId: string;
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
}
//
export interface BookedDesk {
  id: string;
  bookedAt: string;
  dateStart: string;
  dateEnd: string;
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
}

//
export interface DeskFavouriteProps {
  id: string;
  user: {
    firstname: string;
    lastname: string;
    email: string;
    department: string;
    id: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
  };
  desk: {
    label: string;
    id: string;
    equipment: string[];
    type: string;
    office: {
      name: string;
      columns: number;
      rows: number;
      id: string;
      map: string;
      createdAt: string;
      updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}
