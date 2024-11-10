export interface IDataResponse<data> {
    mensaje: string,
    code: number,
    status_code: number,
    correcto: boolean,
    access_token?: string,
    token_type?: string,
    data: data
}
