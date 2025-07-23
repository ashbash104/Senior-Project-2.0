import type { AuthProvider } from "@refinedev/core";
import type { User } from "../graphql/schema.types";

/**
 * Demo credentials for easy testing
 */
export const authCredentials = {
  email: "demo@refine.dev",
  password: "demodemo",
};

/**
 * A fake demo user object matching your User type
 */
const demoUser: User = {
  id: "1",
  name: "Michael Scott",
  email: "demo@refine.dev",
  phone: "123-456-7890",
  jobTitle: "Regional Manager",
  timezone: "America/New_York",
  avatarUrl: "https://example.com/avatar.jpg",
};

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    // Only allow login with demo credentials
    if (email === authCredentials.email && password === authCredentials.password) {
      localStorage.setItem("access_token", "demo-access-token");
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        message: "Invalid email or password",
        name: "AuthenticationError",
      },
    };
  },

  logout: async () => {
    localStorage.removeItem("access_token");
    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async () => {
    const token = localStorage.getItem("access_token");
    if (token === "demo-access-token") {
      return { authenticated: true, redirectTo: "/" };
    }
    return { authenticated: false, redirectTo: "/login" };
  },

  getIdentity: async () => {
    const token = localStorage.getItem("access_token");
    if (token === "demo-access-token") {
      return demoUser;
    }
    return undefined;
  },

  onError: async (error) => {
    if (error.statusCode === "UNAUTHENTICATED") {
      return { logout: true };
    }
    return { error };
  },
};
