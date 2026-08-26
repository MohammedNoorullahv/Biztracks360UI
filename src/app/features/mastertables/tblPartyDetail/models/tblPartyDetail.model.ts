import { TblAreaMaster } from "../../tblAreaMaster/models/tblAreaMaster.model";
import { TblPartyMaster } from "../../tblPartyMaster/models/tblPartyMaster.model";
import { TblProperty } from "../../tblProperty/models/tblProperty.model";

export interface TblPartyDetail {
    fldId: number;
    fldFKParty: number;
    tblPartyMasterId: TblPartyMaster;
    fldFKPartyCategory: number;
    tblPropertyPartyCategoryId: TblProperty;
    fldCode: string;
    fldName: string;
    fldShortName: string;
    fldAddress1: string;
    fldAddress2: string;
    fldFKArea: number;
    tblAreaMasterId: TblAreaMaster;
    fldState: string;
    fldCity: string;
    fldArea: string;
    fldPincode: string;
    fldStateCode: string;
    fldPANNo: string;
    fldGSTNo: string;
    fldContactPersonName: string;
    fldFKDesignation: number;
    tblPropertyDesignationId: TblProperty;
    fldMobileNo: string;
    fldMailId: string;
    fldImagePath: string;
    fldIsHeaderInfo: boolean;
    fldIsActive: boolean;
    fldCreatedBy: number;
    fldCreatedDt: Date;
    fldModifiedBy: number;
    fldModifiedDt: Date;
    fldDeletedBy: number;
    fldDeletedDt: Date;
}
