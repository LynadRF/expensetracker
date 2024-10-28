import { createContext, useContext, useReducer } from "react";

type FormAction = { type: "UPDATE"; userInfo: UserInfo };

type UserInfo = {
    email: string;
    username: string;
};

export function userReducer(state: UserInfo, action: FormAction): UserInfo {
    switch (action.type as string) {
        case "UPDATE":
            return action.userInfo;
        default:
            return state;
    }
}

const initialUserState: UserInfo = { email: "", username: "" };

const UserContext = createContext<{ userState: UserInfo; userDispatch: (userDispatch: FormAction) => void }>({
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
