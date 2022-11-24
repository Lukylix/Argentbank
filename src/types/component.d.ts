interface IAccountLineProps {
  id: string;
  type: string;
  amount: number;
  transactions: number;
}

interface IFeatureItemProps {
  icon: string;
  alt: string;
  title: string;
  description: string;
}

interface IPaginationProps {
  page: number;
  totalPage: number;
}

interface ITransactionLineProps {
  id: string;
  date: string;
  note: string;
  amount: number;
  balance: number;
  type: string;
  description: string;
  category: ICategory;
}
