export interface Item {
    id: string,
    imei: string,
    date_in?: number | null,
    date_out?: number | null,
    model: string,
    inInventory: boolean,
    worker_name: string,
}

export interface Worker {
    id: number,
    name: string,
    abreviation: string,
}