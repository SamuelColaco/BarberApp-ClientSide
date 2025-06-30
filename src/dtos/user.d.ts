
type UserApiRole = "client" | "barber"

type UserApiResponse = {
    token: string
    user: {
        id: string,
        name: string,
        email: string,
        role: UserApiRole
    }
}