export const STORAGE_KEYS = {
  TOKEN: 'token',
  ROLE_TYPE: 'roleType',
  USER_PROFILE: 'userProfile'
};

export const ROLE_TYPES = {
  PARENT: 0,
  TEACHER: 1
};

export const LOGIN_STATUS = {
  IDLE: 'idle',
  SENDING_CODE: 'sendingCode',
  LOGGING_IN: 'loggingIn',
  LOGGED_IN: 'loggedIn'
};

export const AUTH_STATUS = {
  UNVERIFIED: 'unverified',
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected'
};

export const ORDER_STATUS = {
  ALL: 0,
  PENDING_PAY: 1,
  COMPLETED: 2,
  REFUNDED: 3
};

export const DEFAULT_ORDER_LIST = [
  {
    id: 'ORD2023110199',
    childName: '小明',
    courseName: '钢琴私教课 - 24课时包',
    price: '4800.00',
    date: '2023-11-01 14:20',
    status: ORDER_STATUS.PENDING_PAY
  },
  {
    id: 'ORD2023102045',
    childName: '小明',
    courseName: '乐理基础班 - 季度包',
    price: '1200.00',
    date: '2023-10-20 09:15',
    status: ORDER_STATUS.COMPLETED
  }
];

export function createDefaultState() {
  return {
    session: {
      token: '',
      loginStatus: LOGIN_STATUS.IDLE,
      roleType: ROLE_TYPES.PARENT
    },
    userProfile: {
      name: '李子轩',
      userId: '882930',
      city: '北京',
      authStatus: AUTH_STATUS.UNVERIFIED
    },
    orders: DEFAULT_ORDER_LIST.map((item) => ({ ...item }))
  };
}

export function getOrderStatusText(status) {
  switch (status) {
    case ORDER_STATUS.PENDING_PAY:
      return '待支付';
    case ORDER_STATUS.COMPLETED:
      return '已完成';
    case ORDER_STATUS.REFUNDED:
      return '已退款';
    default:
      return '未知状态';
  }
}

export function filterOrdersByTab(orderList = [], activeTab = ORDER_STATUS.ALL) {
  if (activeTab === ORDER_STATUS.ALL) return orderList;
  return orderList.filter((order) => order.status === activeTab);
}

