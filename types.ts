
export enum SunExposure {
  NONE = 'none',
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
}

export enum RoomType {
  BEDROOM = 'quarto',
  LIVING_ROOM = 'sala',
  OFFICE = 'escritorio',
  KITCHEN = 'cozinha',
  COMMERCIAL = 'comercial',
}

export interface FormData {
  width: number;
  length: number;
  height: number;
  people: number;
  electronics: number;
  windows: number;
  sunExposure: SunExposure;
  roomType: RoomType;
}

export interface Product {
  name: string;
  btu: number;
  description: string;
  imageUrl: string;
  affiliateLink: string;
}
