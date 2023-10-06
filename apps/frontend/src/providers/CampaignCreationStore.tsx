import {create} from 'zustand';
import {persist} from "zustand/middleware";
import {AccessFields, QuestionType, RewardType, SurveyFields, VoucherFields} from "@constants/types";

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

const defaultReward: SurveyFields = {
    type: RewardType.Survey,
    questions: [{
        questionType: QuestionType.YesNo,
        question: "Would you recommend the ad to a friend?",
        answer: ""
    }]
};


const defaultData: Campaign = {
    adDetails: defaultAdDetails,
    distribution: defaultDistribution,
    reward: defaultReward
};

type RewardProps = SurveyFields | VoucherFields | AccessFields;

export type Campaign = {
    adDetails: AdDetailsProps,
    distribution: DistributionProps,
    reward: RewardProps

}

export type CampaignCreationStore = {
    data: Campaign
    setAdDetails: (newAdDetails: AdDetailsProps) => void;
    setDistribution: (newDistribution: DistributionProps) => void;
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
