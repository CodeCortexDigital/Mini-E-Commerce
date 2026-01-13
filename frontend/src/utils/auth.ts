export type UserRole = "admin" | "customer";

export type User = {
  email: string;
  name?: string;
  role: UserRole;
};

// Default admin credentials
const ADMIN_EMAIL = "admin@commerce.com";
const ADMIN_PASSWORD = "admin123";

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// Get current user role
export const getUserRole = (): UserRole | null => {
  const user = getCurrentUser();
  return user?.role || null;
};

// Check if user is admin
export const isAdmin = (): boolean => {
  return getUserRole() === "admin";
};

// Check if user is customer
export const isCustomer = (): boolean => {
  return getUserRole() === "customer";
};

// Login function
export const login = (email: string, password: string): { success: boolean; user?: User; error?: string } => {
  // Check admin credentials
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const adminUser: User = {
      email: ADMIN_EMAIL,
      name: "Admin",
      role: "admin",
    };
    localStorage.setItem("user", JSON.stringify(adminUser));
    localStorage.setItem("isAuth", "true");
    return { success: true, user: adminUser };
  }

  // Check customer credentials from localStorage
  const users = getStoredUsers();
  const user = users.find((u) => u.email === email);
  
  if (user && user.password === password) {
    const customerUser: User = {
      email: user.email,
      name: user.name,
      role: "customer",
    };
    localStorage.setItem("user", JSON.stringify(customerUser));
    localStorage.setItem("isAuth", "true");
    return { success: true, user: customerUser };
  }

  return { success: false, error: "Invalid email or password" };
};

// Register function
export const register = (name: string, email: string, password: string): { success: boolean; user?: User; error?: string } => {
  const users = getStoredUsers();
  
  // Check if email already exists
  if (users.some((u) => u.email === email)) {
    return { success: false, error: "Email already registered" };
  }

  // Create new customer
  const newUser = {
    email,
    name,
    password,
    role: "customer" as UserRole,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  const customerUser: User = {
    email,
    name,
    role: "customer",
  };
  
  localStorage.setItem("user", JSON.stringify(customerUser));
  localStorage.setItem("isAuth", "true");
  
  return { success: true, user: customerUser };
};

// Get stored users (for customer login)
type StoredUser = {
  email: string;
  name: string;
  password: string;
  role: UserRole;
};

const getStoredUsers = (): StoredUser[] => {
  try {
    const usersStr = localStorage.getItem("users");
    if (!usersStr) return [];
    return JSON.parse(usersStr);
  } catch {
    return [];
  }
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem("user");
  localStorage.removeItem("isAuth");
  localStorage.removeItem("cart");
};
