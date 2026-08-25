export interface TblUserDetailAdd {
	fldId: number;
	fldFKUser: number;
	fldFKMenuMaster: number;
	fldCondition: string;
	fldFKMenuCategory: number;
	fldFKRole: number;
	fldRoleName: string;
	fldRole: string;
	fldMenuRoleCode: string;
	fldIsActive: boolean;
	fldCreatedBy: number;
	fldCreatedDt: Date;
}
