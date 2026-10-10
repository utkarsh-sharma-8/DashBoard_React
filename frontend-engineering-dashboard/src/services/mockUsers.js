const firstNames = [
  "John", "Jane", "Rahul", "Sneha", "Amit",
  "Priya", "Arjun", "Neha", "Rohan", "Ananya",
];

const lastNames = [
  "Doe", "Smith", "Jain", "Patel", "Kumar",
  "Sharma", "Singh", "Verma", "Gupta", "Mehta",
];

const statuses = ["Active", "Inactive"];
const roles = ["Customer", "Admin", "Manager"];

export const mockUsers = Array.from({ length: 10_000 }, (_, index) => {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length];

  return {
    id: index + 1,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index + 1}@example.com`,
    status: statuses[index % statuses.length],
    role: roles[index % roles.length],
    revenue: Math.floor(1000 + Math.random() * 40000),
    joinedAt: new Date(2024, index % 12, (index % 28) + 1)
      .toISOString()
      .slice(0, 10),
  };
});