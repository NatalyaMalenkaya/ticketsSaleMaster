export interface IUser {
  login: string;
  email?: string;
  psw: string;
  cardNumber?: string;
  id?: string;
}
export interface IStatisticUser {
  techName: string | null ,
  firstName: string | null ,
  cardNumber: string,
  workingTime: string | null,
  workingDay: string | null,
  workingLocation:string | null,
  technicId: string | null,
  userId: string | null,
  
}
export interface IStatisticUserAddress {
  techName: string | null ,
  firstName: string | null ,
  cardNumber: string,
  workingTime: string | null,
  workingDay: string | null,
  workingLocation:string | null,
  technicId: string | null,
  userId: string | null,
  
}
export interface ICustomStatisticUser {
  techName: string | null ,
  firstName: string | null ,
  cardNumber: string,
  workingTime: string | null,
  workingDay: string | null,
  workingLocation:string | null,
  technicId: string | null,
  userId: string | null,
}
