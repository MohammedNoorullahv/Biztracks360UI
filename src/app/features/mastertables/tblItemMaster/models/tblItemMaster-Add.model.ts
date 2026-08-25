export interface TblItemMasterAdd {
	fldId: number;
	fldFKCompany: number;
	fldFKType: number;
	fldFKCategory: number;
	fldFKSubcategory: number;
	fldFKBrand: number;
	fldFKSource: number;
	fldCode: string;
	fldDesc: string;
	fldName: string;
	fldFKColor: number;
	fldFKPurchaseUOM: number;
	fldFKUsageUOM: number;
	fldPurchasetoUsageConversionRate: number;
	fldUsagetoPurchaseConversionRate: number;
	fldFKHSNCode: number;
	fldFKSize: number;
	fldPurchasePrice: number;
	fldJobworkPrice: number;
	fldSalesPrice: number;
	fldIsActive: boolean;
	fldCreatedBy: number;
	fldCreatedDt: Date;
}
