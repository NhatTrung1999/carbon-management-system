export interface ICat5Data {
  Waste_disposal_date: string;
  Consolidated_Waste: string;
  Waste_Code: string;
  Vendor_Name: string;
  Vendor_ID: string;
  Waste_collection_address: string;
  Location_Code: string;
  Transportation_Distance_km: string;
  The_type_of_waste: string;
  Waste_type: string;
  Waste_Treatment_method: string;
  Treatment_Method_ID: string;
  Weight_of_waste_treated_Unit_kg: string;
  TKT_Ton_km: string;
}

export const HEADER: { name: string; state: string; sort: boolean }[] = [
  {
    name: 'cat5.waste_disposal_date',
    state: 'Waste_disposal_date',
    sort: true,
  },
  {
    name: 'Consolidated Waste',
    state: 'Consolidated_Waste',
    sort: true,
  },
  {
    name: 'Waste Code',
    state: 'Waste_Code',
    sort: true,
  },
  {
    name: 'cat5.vendor_name',
    state: 'Vendor_Name',
    sort: true,
  },
  {
    name: 'cat5.vendor_id',
    state: 'Vender_ID',
    sort: true,
  },
  {
    name: 'cat5.waste_collection_address',
    state: 'Waste_collection_address',
    sort: true,
  },
  {
    name: 'Location Code',
    state: 'Location_Code',
    sort: true,
  },
  {
    name: 'cat5.transportation_distance_km',
    state: 'Transportation_Distance_km',
    sort: true,
  },
  {
    name: 'cat5.the_type_of_waste',
    state: 'The_type_of_waste',
    sort: true,
  },
  {
    name: 'cat5.waste_type',
    state: 'Waste_type',
    sort: true,
  },
  {
    name: 'cat5.waste_treatment_method',
    state: 'Waste_Treatment_method',
    sort: true,
  },
  {
    name: 'cat5.treatment_method_id',
    state: 'Treatment_Method_ID',
    sort: true,
  },
  {
    name: 'cat5.weight_of_waste_treated_unit_kg)',
    state: 'Weight_of_waste_treated_Unit_kg',
    sort: true,
  },
  {
    name: 'cat5.tkt_ton_km',
    state: 'TKT_Ton_km',
    sort: true,
  },
];
