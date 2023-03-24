export interface IUser {
  login: string;
  email?: string;
  psw: string;
  cardNumber?: string;
  id?: string | undefined;
  
}
/*
//данные приходят с сервера
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

//преобразуем данные и выводим на странице
export interface ICustomStatisticUser {
  techName: string | null ,
  firstName: string | null ,
  cardNumber: string,
  workingTime: string | null,
  workingDay: string | null,
  workingLocation:string | null,
  
}*/
