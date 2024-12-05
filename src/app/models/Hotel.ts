export interface Hotel {
  // message: string;
  // state: boolean;
  // data: {

  // }
  hot_name: string,
  hot_quantity_rooms: number,
  hot_state: number,
  cit_id: number,
  hot_address: string
  hot_nit: string,
  updated_at: string,
  created_at: string,
  hot_id: number,
  city: {
    cit_id: number
    cit_name: string
    cit_state: number
    created_at: string
    updated_at: string
  }
}
