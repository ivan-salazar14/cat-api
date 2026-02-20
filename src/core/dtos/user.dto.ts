export interface CreateUserDto {
    email: string;
    password?: string;
    name?: string;
}

export interface LoginDto {
    email: string;
    password?: string;
}

export interface CatQueryDto {
    breed_id?: string;
    q?: string;
}