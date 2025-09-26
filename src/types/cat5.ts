export interface ICat5Data {
  Waste_disposal_date: string;
  Vender_Name: string;
  Waste_collection_address: string;
  Transportation_Distance_km: string;
  The_type_of_waste: string;
  Waste_type: string;
  Waste_Treatment_method: string;
  Weight_of_waste_treated_Unit_kg: string;
  TKT_Ton_km: string;
}

export const HEADER: { name: string; state: string; sort: boolean }[] = [
  {
    name: 'Waste disposal date',
    state: 'Waste_disposal_date',
    sort: true,
  },
  {
    name: 'Vender Name',
    state: 'Vender_Name',
    sort: true,
  },
  {
    name: 'Waste collection address',
    state: 'Waste_collection_address',
    sort: true,
  },
  {
    name: 'Transportation Distance (km)',
    state: 'Transportation_Distance_km',
    sort: true,
  },
  {
    name: '*The type of waste',
    state: 'The_type_of_waste',
    sort: true,
  },
  {
    name: '*Waste type',
    state: 'Waste_type',
    sort: true,
  },
  {
    name: '*Waste Treatment method',
    state: 'Waste_Treatment_method',
    sort: true,
  },
  {
    name: '*Weight of waste treated (Unit：kg)',
    state: 'Weight_of_waste_treated_Unit_kg',
    sort: true,
  },
  {
    name: 'TKT (Ton-km)',
    state: 'TKT_Ton_km',
    sort: true,
  },
];
