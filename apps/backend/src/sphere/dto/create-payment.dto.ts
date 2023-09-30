export class LineItem {
    price: string;
    quantity: number;
    quantityMutable: boolean;
}
export class CreatePaymentDto {
    lineItems: LineItem[];
}
