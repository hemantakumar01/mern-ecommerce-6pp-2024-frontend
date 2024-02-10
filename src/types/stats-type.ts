type latestOrderArray = {
  _id: string;
  quantity: number;
  amount: number;
  status: string;
  discount: number;
};

export type StatsType = {
  latestOrder: latestOrderArray[];
  maleCount: number;
  femaleCount: number;
  categories: Record<string, number>[];
  chart: {
    order: number[];
    revenue: number[];
  };
  count: {
    revenue: number;
    order: number;
    product: number;
    users: number;
  };

  product: string | number;
  order: string | number;
  user: string | number;
};

export type StatsResponce = {
  success: boolean;
  stats: StatsType;
};

type getProductData = number[];
type getUserData = number[];
type getOrderData = number[];
type chart = {
  products: getProductData;
  users: getUserData;
  orders: getOrderData;
};
type userAgeType = {
  teen: number;
  adult: number;
  old: number;
};
type allUsers = {
  admin: number;
  users: number;
};

type allCategories = Record<string, number>[];

type Pie = {
  userAgeType: userAgeType;
  allUsers: allUsers;
  revinewStats: {
    netMargin: number;
    discount: number;
    productionCost: number;
    burnt: number;
    marketingCost: number;
  };
  stock: {
    outOfStock: number;
    inStock: number;
  };
  status: {
    categories: allCategories;
    process: number;
    shipped: number;
    delevered: number;
  };
};
type Line = {
  product: number[];
  userData: number[];
  discount: number[];
  revenue: number[];
};
export type PaiResponce = {
  success: boolean;
  chart: Pie;
};

export type BarResponce = {
  success: true;
  chart: chart;
};
export type LineResponce = {
  success: true;
  chart: Line;
};
