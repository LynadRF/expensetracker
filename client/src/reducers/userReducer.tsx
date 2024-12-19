export type UserReducerAction = { type: "UPDATE"; userInfo: UserInfo };

export type UserInfo = {
    email: string;
    username: string;
    createdAt: string;
};

export function userReducer(state: UserInfo, action: UserReducerAction): UserInfo {
    switch (action.type as string) {
        case "UPDATE":
            return action.userInfo;
        default:
            return state;
    }
}
