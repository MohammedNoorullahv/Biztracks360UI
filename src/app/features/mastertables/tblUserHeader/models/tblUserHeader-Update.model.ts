export interface TblUserHeaderUpdate {
	fldId: number;
	fldFKCompany: number;
	fldFKUnit: number;
	fldUsername: string;
	fldLoginMailId: string;
	fldPassword: string;
	fldFKUsertype: number;
	fldFKDesignation: number;
	fldFKRole: number;
	fldAspNetUserId: string;
	fldContactNo: string;
	fldSignature: string;
	fldReceiveLoginAlert: boolean;
	fldCheckLoginIP: boolean;
	fldUserMacID: string;
	fldIsActive: boolean;
	fldCreatedBy: number;
	fldCreatedDt: Date;
	fldModifiedBy: number;
	fldModifiedDt: Date;
}
