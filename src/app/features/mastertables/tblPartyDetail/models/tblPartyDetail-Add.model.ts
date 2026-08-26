export interface TblPartyDetailAdd {
	fldId: number;
	fldFKParty: number;
	fldFKPartyCategory: number;
	fldCode: string;
	fldName: string;
	fldShortName: string;
	fldAddress1: string;
	fldAddress2: string;
	fldFKArea: number;
	fldState: string;
	fldCity: string;
	fldArea: string;
	fldPincode: string;
	fldStateCode: string;
	fldPANNo: string;
	fldGSTNo: string;
	fldContactPersonName: string;
	fldFKDesignation: number;
	fldMobileNo: string;
	fldMailId: string;
	fldImagePath: string;
	fldIsHeaderInfo: boolean;
	fldIsActive: boolean;
	fldCreatedBy: number;
	fldCreatedDt: Date;
}
