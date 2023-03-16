export interface ITechnic {
  name:string,
  tonnazh:string,
  price:string,
  description: string,
  img: string,
  id: string,
  _id: string;
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

/*export interface IPriceTypeSelect {
  priceMin?:any,
  priceMax?:any,
}*/




export interface ISimiliarTechnic extends ITechnic {
  locationId: string
}
export interface ITechnicTitle {
  name: string;
  id: string
}
export interface ICustomTicketData extends ISimiliarTechnic {
  title: ITechnicTitle;
}
