export enum Preference {
    DEFI = "DEFI",
    NFT = "NFT",
    ART = "ART",
    GAMING = "GAMING",
    MUSIC = "MUSIC",
    SPORTS = "SPORTS",
}

export const preferenceList: string[] = Object.values(Preference);


export enum RewardType {
    Survey = 'survey',
    Voucher = 'voucher',
    Access = 'access',
}


export enum QuestionType {
    YesNo = 'Yes/No',
    Poll = 'Poll',
    FiveStar = '5 star rating',
    TenNumber = '10 star rating',
    FeedbackHundred = 'Feedback (100 characters)',
    FeedbackFiveHundred = 'Feedback (500 characters)'
}

interface Question {
    questionType: QuestionType
    question: string
    answer: string
}

export interface SurveyFields {
    type: RewardType.Survey;
    questions: Question[];
}

export interface VoucherFields {
    type: RewardType.Voucher;
    discountAmount: number;
    description: string;
}

export interface AccessFields {
    type: RewardType.Access;
    accessDescription: string;
}