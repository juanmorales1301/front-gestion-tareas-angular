type TTipoNumPers = 1 | 2 | 3 | 4 | 5;

export interface UsuarioModel {
    id_usuario: any,
    ussername: string,
    password: string
}


export interface UsuarioLoginModel {
    usuario: {
        ussername: string,
        password: string
    },
    token_data: string
}
