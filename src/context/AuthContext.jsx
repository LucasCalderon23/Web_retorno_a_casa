import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginRequest, registerRequest } from "../services/authApi";

const STORAGE_KEY = "retorno_auth_session";

const AuthContext = createContext(null);

const decodeJwtPayload = (token) => {
  try {
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) {
      return null;
    }

    const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(base64);
    return JSON.parse(json);
  } catch {
    return null;
  }
};

const mapSessionFromAuthResponse = ({ token, expiresAtUtc }) => {
  const payload = decodeJwtPayload(token);
  const roleClaim =
    payload?.role ??
    payload?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
    "";

  return {
    token,
    expiresAtUtc,
    user: {
      id: payload?.sub ?? null,
      email: payload?.email ?? "",
      role: roleClaim
    }
  };
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const rawSession = localStorage.getItem(STORAGE_KEY);
    if (!rawSession) {
      setIsLoading(false);
      return;
    }

    try {
      const parsedSession = JSON.parse(rawSession);
      const isExpired = new Date(parsedSession.expiresAtUtc).getTime() <= Date.now();

      if (isExpired || !parsedSession.token) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        setSession(parsedSession);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const data = await loginRequest(credentials);
    const nextSession = mapSessionFromAuthResponse(data);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
  };

  const register = async (credentials) => {
    const data = await registerRequest(credentials);
    const nextSession = mapSessionFromAuthResponse(data);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSession(null);
  };

  const value = useMemo(
    () => ({
      token: session?.token ?? null,
      user: session?.user ?? null,
      isAuthenticated: Boolean(session?.token),
      isLoading,
      login,
      register,
      logout
    }),
    [session, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider.");
  }

  return context;
};
