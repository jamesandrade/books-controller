export interface ILoan {
    id?: string;
    student: string;
    book: string;
    loan: string;
    returned?: boolean;
    returned_at?: string;
    reason_devolution?: number;
  }