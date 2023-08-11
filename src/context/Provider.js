import { saveCart } from "@/services/helpers.service";
import { getAuthorizedUser, getUserActiveCart } from "@/services/user.service";
import { signOut } from "next-auth/react";
import React, { createContext, useEffect, useRef, useState } from "react";

export const GlobalContext = createContext();
export const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({ items: [] });

  const getUser = async () => {
    const activeUser = await getAuthorizedUser();
    if (!activeUser?.success || !activeUser.data) {
      localStorage.clear();
      await signOut({ redirect: false, callbackUrl: "/login" });
      return;
    }
    setUser(activeUser.data);
    await getCart(activeUser?.data?._id);
    return;
  };

  const getCart = async (id) => {
    let result = await getUserActiveCart(id);
    if (result.success) {
      saveCart(result?.data ? result?.data[0] : null);
      setCart(result?.data ? result?.data[0] : null);
      return;
    }
  };

  useEffect(() => {
    getUser();
  }, [children]);

  return <GlobalContext.Provider value={{ user, setUser, cart, setCart }}>{children}</GlobalContext.Provider>;
};
