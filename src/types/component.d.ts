interface AccountLineProps {
  id: string;
  type: string;
  amount: number;
  transactions: number;
}

interface AlertProps {
  alert: Alert;
}

interface FeatureItemProps {
  icon: string;
  alt: string;
  title: string;
  description: string;
}

interface PaginationProps {
  page: number;
  totalPage: number;
  baseUrl: string;
}

interface TransactionLineProps
  extends Omit<Transaction, "categoryId" | "updatedAt" | "createdAt" | "accountId" | "userId"> {
  category: Category;
  date: string;
  categories: Category[];
}
