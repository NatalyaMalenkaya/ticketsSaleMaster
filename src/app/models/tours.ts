export interface ITour {
  name:string,
  tonnazh:string,
  price:string,
  img: string,
  id: string,
  type: string,
  date: string,
  locationId: string,
  
}
export type TourType = 'Экскаватор' | 'Погрузчик';
export type WeightType = '1-тонник' | '4-тонник'| '7-тонник'| '10-тонник';

export interface IWeightTypeSelect {
  label?: string,
  value?: string,
  
}

export interface ITechnicTypeSelect {
  label?: string,
  value?: string,
  date?: string
}



export interface INearestTour extends ITour {
  locationId: string
}
export interface ITourLocation {
  name: string;
  id: string
}
export interface ICustomTicketData extends INearestTour {
  region: ITourLocation;
}

