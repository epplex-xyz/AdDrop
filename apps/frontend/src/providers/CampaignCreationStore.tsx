import {create} from 'zustand';
import { persist } from "zustand/middleware";

export type Campaign = {
    username: string,
    handle: string,
    avatar: string
    preferences: string[]
    mainWalelt: string
}

export type CampaignCreationStore = {
    data: Campaign
    setData: (UserData) => void
}

// Zustand with typescript
// https://stackoverflow.com/questions/69814018/zustand-typescript-persist-how-to-type-store
const useUserSignupStore = create<CampaignCreationStore>()(
    persist(
        (set, get) => ({
            data: {} as Campaign,
            setData: (data) => {
                set({ data: data });
            }
        }),
        { name: "userSignup" }
    ),
);

export default useUserSignupStore;
