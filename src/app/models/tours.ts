export interface ITour {
  name:string,
  description:string,
  price:string,
  img: string,
  id: string,
  type: string,
  date: string,
  locationId: string

}
export type TourType = 'Экскаватор' | 'Погрузчик';

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

