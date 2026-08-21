export interface TblMenuMaster {
	fldId: number;
	fldTableOrView: string;
	fldFKCategory: number;
	fldCategory: string;
	fldMenuName: string;
	fldTableOrViewName: string;
	fldCondition: string;
	fldRoleOfTheMenu: string;
	fldControllerName: string;
	fldIcon: string;
	fldIsProcessProgram: boolean;
	fldIsActive: boolean;
	fldCreatedBy: number;
	fldCreatedDt: Date;
	fldModifiedBy: number;
	fldModifiedDt: Date;
	fldDeletedBy: number;
	fldDeletedDt: Date;
}
