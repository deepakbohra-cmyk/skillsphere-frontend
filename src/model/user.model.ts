
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserProfile{
    id: string;
    name : string;
    ldap : string;
    email : string 
    roles : string[];
}