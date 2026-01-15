import api from "../services/api";

export type UserRole = "admin" | "user";

export type User = {
  _id?: string;
  email: string;
  name?: string;
  role: UserRole;
};

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

// Get token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem("token");
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

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Login function
export const login = async (
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { token, user } = response.data;

    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuth", "true");
      return { success: true, user };
    }

    return { success: false, error: "Invalid response from server" };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Login failed",
    };
  }
};

// Register function
export const register = async (
  name: string,
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    const { token, user } = response.data;

    if (token) {
      // If user object is not in response, create one from the data
      const userData = user || { email, name, role: "user" };
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isAuth", "true");
      return { success: true, user: userData };
    }

    return { success: false, error: "Invalid response from server" };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Registration failed",
    };
  }
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("isAuth");
  localStorage.removeItem("cart");
};

// Get user profile from API
export const getUserProfile = async (): Promise<User | null> => {
  try {
    const response = await api.get("/users/profile");
    return response.data.user;
  } catch (error) {
    return null;
  }
};
