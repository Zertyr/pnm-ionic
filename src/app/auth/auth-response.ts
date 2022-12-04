export interface AuthResponse {
    access_token: string,
    token_type: string,
    expired_at: string,
    user: {
        id: number,
        name: string,
        firstname: string,
        lastname: string,
        email: string,
    }
}