interface IUserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface IAccount {
  id: string;
  userId: string;
  amount: number;
  transactions: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface ICategory {
  name: string;
  id: string;
}

interface ITransaction {
  note: string;
  accountId: string;
  userId: string;
  category: ICategory;
  amount: number;
  balance: number;
  type: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface ITransactionBody {
  page: number;
  totalPage: number;
  total: number;
  transactions: ITransaction[];
}
