export enum RewardType {
    Survey,
    Voucher,
    Access,
}

// export function getNumericReward(rewardType: RewardType): number {
//     switch (rewardType) {
//         case RewardType.Survey:
//             return 0;
//         case RewardType.Voucher:
//             return 1;
//         case RewardType.Access:
//             return 2;
//         default:
//             throw new Error('Invalid reward type');
//     }
// }
//
// export function getStringReward(index: number): string  {
//     const rewardTypeKeys = Object.keys(RewardType);
//
//     if (index >= 0 && index < rewardTypeKeys.length) {
//         const key = rewardTypeKeys[index];
//         return RewardType[key];
//     }
//
//     throw new Error('Invalid reward type');
// }
export const rewardList: string[] = ["SURVEY", "VOUCHER", "ACCESS TOKEN"];


export enum QuestionType {
    YesNo ,
    Poll,
    FiveStar,
    TenNumber,
    Feedback,
}

export const questionTypes: string[] = Object.values(['Yes/No', 'Poll', '5 star rating', 'Rating (1-10)', 'Feedback']);

export interface Question {
    questionType: QuestionType
    question: string
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
    description: string;
}

// probably better to make them extend a similar interface
export type RewardProps = SurveyFields | VoucherFields | AccessFields;
