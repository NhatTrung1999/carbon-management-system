export interface ICat5Data {
  Waste_disposal_date: string;
  Vendor_Name: string;
  Vendor_ID: string;
  Waste_collection_address: string;
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
