export interface TblRoleUpdate {
	fldId: number;
	fldFKCompany: number;
	fldFKUnit: number;
	fldIsSuperAdmin: boolean;
	fldIsAdmin: boolean;
	fldRoleName: string;
	fldRole: string;
	fldRoleCode: string;
	fldViewOnly: boolean;
	fldCreateOrPepare: boolean;
	fldEdit: boolean;
	fldVerify: boolean;
	fldAuthorize: boolean;
	fldDelete: boolean;
	fldIsActive: boolean;
	fldCreatedBy: number;
	fldCreatedDt: Date;
	fldModifiedBy: number;
	fldModifiedDt: Date;
}
