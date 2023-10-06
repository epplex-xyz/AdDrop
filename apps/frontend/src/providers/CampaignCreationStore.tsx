import {create} from 'zustand';
import {persist} from "zustand/middleware";
import {AccessFields, QuestionType, RewardProps, RewardType, SurveyFields, VoucherFields} from "@constants/types";

interface AdDetailsProps {
    image: File | null
    description: string
    name: string
    symbol: string
}

// best to send as Datetime or unixtimestamp
interface DistributionProps {
    distributionDate: string
    userReach: number
    userGroups: string[]
}


const defaultAdDetails: AdDetailsProps = {
    image: null,
    description: '',
    name: '',
    symbol: '',
};

const defaultDistribution: DistributionProps = {
    distributionDate: '',
    userReach: 0,
    userGroups: [],
};

export const defaultVoucher: VoucherFields = {
    type: RewardType.Voucher,
    discountAmount: 5,
    description: "5% off on all products",
};

export const defaultAccess: AccessFields = {
    type: RewardType.Access,
    description: "Get 1 week free access to our Pro plan",
};

export const defaultSurvey: SurveyFields = {
    type: RewardType.Survey,
    questions: [{
        questionType: QuestionType.YesNo,
        question: "Would you recommend this ad to a friend?",
    }]
};

const defaultData: Campaign = {
    adDetails: defaultAdDetails,
    distribution: defaultDistribution,
    reward: defaultSurvey
};


export type Campaign = {
    adDetails: AdDetailsProps,
    distribution: DistributionProps,
    reward: RewardProps
}

export type CampaignCreationStore = {
    data: Campaign
    setAdDetails: (newAdDetails: AdDetailsProps) => void;
    setDistribution: (newDistribution: DistributionProps) => void;
    setReward: (newReward: RewardProps) => void;
    resetData: () => void;

}

// Zustand with typescript
// https://stackoverflow.com/questions/69814018/zustand-typescript-persist-how-to-type-store
const useCampaginCreationStore = create<CampaignCreationStore>()(
    persist(
        (set, get) => ({
            data: defaultData,
            setAdDetails: (newAdDetails) => {
                set((state) => ({
                    data: {
                        ...state.data,
                        adDetails: newAdDetails,
                    },
                }));
            },
            setDistribution: (newDistribution) => {
                set((state) => ({
                    data: {
                        ...state.data,
                        distribution: newDistribution,
                    },
                }));
            },
            setReward: (newReward) => {
                set((state) => ({
                    data: {
                        ...state.data,
                        reward: newReward,
                    },
                }));
            },
            resetData: () => {
                set(() => ({
                    data: defaultData, // need to add defaults
                }));
            }
        }),
        { name: "campaignCreation" }
    ),
);

export default useCampaginCreationStore;
