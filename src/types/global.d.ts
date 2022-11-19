interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface Account {
  id: string;
  userId: string;
  amount: number;
  transactions: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  name: string;
  id: string;
}

interface Transaction {
  note: string;
  accountId: string;
  userId: string;
  categoryId: Category;
  amount: number;
  balance: number;
  type: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface TransactionBody {
  page: number;
  totalPage: number;
  total: number;
  transactions: Transaction[];
}
