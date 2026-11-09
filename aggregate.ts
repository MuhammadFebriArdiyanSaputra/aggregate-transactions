interface Transaction {
  id: number;
  userId: number;
  amount: number;
}

interface UserTotal {
  userId: number;
  total: number;
}

const transactions = [
  { id: 1, userId: 101, amount: 100000 },
  { id: 2, userId: 102, amount: 200000 },
  { id: 3, userId: 101, amount: 150000 },
  { id: 4, userId: 103, amount: 300000 },
  { id: 5, userId: 102, amount: 50000 }
];

function aggregateTransactions(data: Transaction[]): UserTotal[] {
  const totals = data.reduce<Record<number, number>>((acc, { userId, amount }) => {
    acc[userId] = (acc[userId] || 0) + amount;
    return acc;
  }, {});

  return Object.entries(totals)
    .map(([userId, total]) => ({ userId: Number(userId), total }))
    .sort((a, b) => b.total - a.total || a.userId - b.userId);
}

console.log(aggregateTransactions(transactions));
