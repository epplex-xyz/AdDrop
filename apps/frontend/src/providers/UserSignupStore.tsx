import {create} from 'zustand';
import { persist } from "zustand/middleware";

export type UserData = {
    username: string,
    handle: string,
    avatar: string
    preferences: string[]
    mainWalelt: string
}

export type UserSignupStore = {
    data: UserData
    setData: (UserData) => void
}

// Zustand with typescript
// https://stackoverflow.com/questions/69814018/zustand-typescript-persist-how-to-type-store
const useUserSignupStore = create<UserSignupStore>()(
    persist(
        (set, get) => ({
            data: {} as UserData,
            setData: (data) => {
                set({ data: data });
            }
        }),
        { name: "userSignup" }
    ),
);

export default useUserSignupStore;
