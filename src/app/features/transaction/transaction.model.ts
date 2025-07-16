export interface ITransaction {
    id: number,
    name: string,
    date: string,
    system_entry_no: string,
    amount: number,
    remarks: string,
    category_id: number,
    category_name: string,
    user_id: number,
    user_name: string,
    account_id: number,
    account_name: string
}