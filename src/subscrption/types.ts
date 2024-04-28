export interface ISubscriptionFilter {
  disciplineId?: number;
  ci?: string;
  firstname?: string;
  lastname?: string;
  subsTypeId?: number;
  subscriptorId?: number;
  dateIn?: string;
  dateOut?: string;
  status?: boolean;
  skip: number;
  take: number;
}

export interface IGetSubscription {
  subscripcionId: number;
}
