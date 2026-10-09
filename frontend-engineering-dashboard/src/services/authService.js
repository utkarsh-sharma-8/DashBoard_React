const mockUser = {
  id: 1,
  name: "Utkarsh Sharma",
  email: "demo@example.com",
};
export const loginService = async (credentials) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (
    credentials.email !== "demo@example.com" ||
    credentials.password !== "password123"
  ) {
    throw new Error("Invalid email or password");
  }

  return {
    accessToken: "mock-access-token",
    user: mockUser,
  };
};

export const logoutService = async () => {};

export const refreshSessionService = async () => {
  throw new Error("No active session");
};