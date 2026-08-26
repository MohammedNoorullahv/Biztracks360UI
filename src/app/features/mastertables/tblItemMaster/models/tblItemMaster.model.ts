import { TblCompanyMaster } from "../../tblCompanyMaster/models/tblCompanyMaster.model";
import { TblHSNMaster } from "../../tblHSNMaster/models/tblHSNMaster.model";
import { TblProperty } from "../../tblProperty/models/tblProperty.model";

export interface TblItemMaster {
    fldId: number;
    fldFKCompany: number;
   
    tblCompanyMasterId: TblCompanyMaster;
    fldFKType: number;
   
    tblPropertyTypeId: TblProperty;
    fldFKCategory: number;
    
    tblPropertyCategoryId: TblProperty;
    fldFKSubcategory: number;
    
    tblPropertySubcategoryId: TblProperty;
    fldFKBrand: number;
    
    tblPropertyBrandId: TblProperty;
    fldFKSource: number;
    
    tblPropertySourceId: TblProperty;
    fldCode: string;
    fldDesc: string;
    fldName: string;
    fldFKColor: number;
    
    tblPropertyColorId: TblProperty;
    fldFKPurchaseUOM: number;
    
    tblPropertyPurchaseUOMId: TblProperty;
    fldFKUsageUOM: number;
   
    tblPropertyUsageUOMId: TblProperty;
    fldPurchasetoUsageConversionRate: number;
    fldUsagetoPurchaseConversionRate: number;
    fldFKHSNCode: number;
   
    tblHSNMasterId: TblHSNMaster;
    fldFKSize: number;
  
    tblPropertySizeId: TblProperty;
    fldPurchasePrice: number;
    fldJobworkPrice: number;
    fldSalesPrice: number;
    fldIsActive: boolean;
    fldCreatedBy: number;
    fldCreatedDt: Date;
    fldModifiedBy: number;
    fldModifiedDt: Date;
    fldDeletedBy: number;
    fldDeletedDt: Date;
}
