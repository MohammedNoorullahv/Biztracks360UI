import { TblCompanyMaster } from "../../tblCompanyMaster/models/tblCompanyMaster.model";
import { TblHSNMaster } from "../../tblHSNMaster/models/tblHSNMaster.model";
import { TblProperty } from "../../tblProperty/models/tblProperty.model";

export interface TblItemMaster {
    fldId: number;
    fldFKCompany: number;
   
    TblCompanyMasterId: TblCompanyMaster;
    fldFKType: number;
   
    TblPropertyTypeId: TblProperty;
    fldFKCategory: number;
    
    TblPropertyCategoryId: TblProperty;
    fldFKSubcategory: number;
    
    TblPropertySubcategoryId: TblProperty;
    fldFKBrand: number;
    
    TblPropertyBrandId: TblProperty;
    fldFKSource: number;
    
    TblPropertySourceId: TblProperty;
    fldCode: string;
    fldDesc: string;
    fldName: string;
    fldFKColor: number;
    
    TblPropertyColorId: TblProperty;
    fldFKPurchaseUOM: number;
    
    TblPropertyPurchaseUOMId: TblProperty;
    fldFKUsageUOM: number;
   
    TblPropertyUsageUOMId: TblProperty;
    fldPurchasetoUsageConversionRate: number;
    fldUsagetoPurchaseConversionRate: number;
    fldFKHSNCode: number;
   
    TblHSNMasterId: TblHSNMaster;
    fldFKSize: number;
  
    TblPropertySizeId: TblProperty;
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
