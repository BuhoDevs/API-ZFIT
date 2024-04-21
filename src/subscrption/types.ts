export interface ISubscriptionFilter {
  disciplineId?: number;
  ci?: string;
  firstName?: string;
  lastName?: string;
  subsTypeId?: number;
  subscriptorId?: number;
  dateIn?: string;
  dateOut?: string;
  status?: boolean;
  skip: number;
  take: number;
}
