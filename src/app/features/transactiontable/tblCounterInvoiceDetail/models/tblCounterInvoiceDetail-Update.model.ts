export interface TblCounterInvoiceDetailUpdate {
	fldId: number;
	fldFKInv: number;
	fldFKItem: number;
	fldItemDescription: string;
	fldItemSize: string;
	fldItemColour: string;
	fldFKPurchaseUOM: string;
	fldFKUsageUOM: string;
	fldFKHSNCode: number;
	fldQuantity: number;
	fldRate: number;
	fldGrossValue: number;
	fldDiscountPercentage: number;
	fldDiscountValue: number;
	fldTaxableValue: number;
	fldIGSTPercentage: number;
	fldIGSTValue: number;
	fldSGSTPercentage: number;
	fldSGSTValue: number;
	fldCGSTPercentage: number;
	fldCGSTValue: number;
	fldGSTValue: number;
	fldTotalValue: number;
	fldDeliveryDate: Date;
	fldRemarks: string;
	fldFKStatus: number;
	fldInwardQuantity: number;
	fldCancelQuantity: number;
	fldBalanceQuantity: number;
	fldIsActive: boolean;
	fldCreatedBy: number;
	fldCreatedDt: Date;
	fldModifiedBy: number;
	fldModifiedDt: Date;
}

