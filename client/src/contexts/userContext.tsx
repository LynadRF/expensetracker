import { createContext, useContext, useReducer } from "react";
import { UserInfo, UserReducerAction, userReducer } from "../reducers/userReducer";

const initialUserState: UserInfo = { email: "", username: "", createdAt: "" };

const UserContext = createContext<{ userState: UserInfo; userDispatch: (userDispatch: UserReducerAction) => void }>({
    userState: initialUserState,
    userDispatch: () => null,
});

export function UserContextProvider({ children }: UserContextProviderProps) {
    const [userState, userDispatch] = useReducer(userReducer, initialUserState);
    return <UserContext.Provider value={{ userState, userDispatch }}>{children}</UserContext.Provider>;
}

type UserContextProviderProps = {
    children: JSX.Element;
};

export const useUser = () => useContext(UserContext);
