const m = 0.997;
// LARIMER USDT USDPOOL
// received 是输入数量
export const larimer_usdt = ({ larimer, usdt, usdpool, received }) => {
  const sell = received;
  return (usdt * m * sell) / (larimer + m * sell);
};

export const usdpool_usdt = ({ larimer, usdt, usdpool, received }) => {
  // double larimer = bal.larimer;
  // double usdt = bal.usdt;
  // double usdpool = bal.usdpool;
  // double received = quantity.amount;

  const larimer_part = (larimer * received) / usdpool;
  const usdt_part = (usdt * received) / usdpool;

  const buy_usdt_part =
    ((usdt - usdt_part) * m * larimer_part) /
    (larimer - larimer_part + m * larimer_part);
  return buy_usdt_part + usdt_part;
};

export const usdpool_larimer = ({ larimer, usdt, usdpool, received }) => {
  const larimer_part = (larimer * received) / usdpool;
  const usdt_part = (usdt * received) / usdpool;

  const buy_larimer_part =
    ((larimer - larimer_part) * m * usdt_part) /
    (usdt - usdt_part + m * usdt_part);
  return buy_larimer_part + larimer_part;
};

export const usdt_larimer = ({ larimer, usdt, usdpool, received }) => {
  const sell = received;
  return (larimer * m * sell) / (usdt + m * sell);
};

export const larimer_usdpool = ({ larimer, usdt, usdpool, received }) => {
  usdpool /= 10000;

  larimer /= 10000;

  usdt /= 10000;

  received /= 10000;

  const k =
    (Math.sqrt(
      (m * larimer + larimer) * (m * larimer + larimer) +
        4 * m * larimer * received
    ) -
      larimer -
      m * larimer) /
    (2 * m);
  const new_shares = (usdpool * (received - k)) / (larimer + k);
  return 10000 * new_shares;
};

export const usdt_usdpool = ({ larimer, usdt, usdpool, received }) => {
  usdpool /= 10000;

  larimer /= 10000;

  usdt /= 10000;

  received /= 10000;

  const k =
    (Math.sqrt(
      (m * usdt + usdt) * (m * usdt + usdt) + 4 * m * usdt * received
    ) -
      usdt -
      m * usdt) /
    (2 * m);
  const new_shares = (usdpool * (received - k)) / (usdt + k);
  return 10000 * new_shares;
};
