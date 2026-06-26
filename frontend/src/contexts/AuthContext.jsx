import { createContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext({
  accessToken: null,
  user: null, // we can optionally store user identifier here
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  setAccessToken: () => {}, // useful for silent refresh or unauthorized callbacks
});

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null); // identifier
  const [isLoading, setIsLoading] = useState(true);

  // Attempt to refresh token on initial mount
  useEffect(() => {
    let isMounted = true;

    async function tryRefresh() {
      try {
        const data = await authService.refresh();
        if (isMounted) {
          setAccessToken(data.access_token);
          // Assuming the token itself has the user info or the backend could return user info in refresh
          // But we don't have a /me endpoint right now, so we just set the token.
        }
      } catch (err) {
        // Not logged in or expired refresh token
        if (isMounted) {
          setAccessToken(null);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    tryRefresh();

    return () => {
      isMounted = false;
    };
  }, []);

  const signIn = async (identifier, password) => {
    const data = await authService.login(identifier, password);
    setAccessToken(data.access_token);
    setUser({ identifier }); // Optionally store
  };

  const signUp = async (identifier, password) => {
    await authService.register(identifier, password);
    // Auto login after register
    const data = await authService.login(identifier, password);
    setAccessToken(data.access_token);
    setUser({ identifier });
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      if (accessToken) {
        await authService.logout(accessToken);
      }
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setAccessToken(null);
      setUser(null);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
