export interface Room {
    roo_id: number,
    hot_id: number,
    acc_id: number,
    rty_id: number,
    roo_quantity: number,
    roo_state: number,
    created_at: string,
    updated_at: string,
    accommodation: {
        acc_id: number,
        acc_name: string,
        acc_state: number,
        created_at: string,
        updated_at: string,
    },
    room_type: {
        rty_id: number,
        rty_name: string,
        rty_state: number,
        created_at: string,
        updated_at: string,
    }
}