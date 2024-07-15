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
  createdAt?: string;
  skip: number;
  take: number;
}

export interface IGetSubscription {
  subscripcionId: number;
}

export interface IGetSubscriptionByCi extends IGetSubscription {
  ci: string;
}

export interface ISubscriptionBalance extends ISubscriptionFilter {}
export interface IncomeReport {
  discipline: string;
  subsType: string;
  totalAmount: number;
  count: number;
}
