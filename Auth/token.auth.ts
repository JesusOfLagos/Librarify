import JWT from 'jsonwebtoken';


export interface TokenUser {
    id: string;
    email: string;
    role: string;
 }


 export class TokenManager implements TokenUser {
     id: string;
     email: string;
     role: string;

        constructor(id: string, email: string, role: string) {
            this.id = id;
            this.email = email;
            this.role = role;
        }

        public getId(): string {
            return this.id;
        }

        public generateToken(user: TokenUser): string {
            return JWT.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        }

        public verifyToken(token: string): boolean {
            try {
                JWT.verify(token, process.env.JWT_SECRET);
                return true;
            } catch (error) {
                return false;
            }
        }

        public getTokenData(token: string): TokenUser {
            const data = JWT.verify(token, process.env.JWT_SECRET) as TokenUser;
            return {
                id: data.id,
                email: data.email,
                role: data.role
            }
        }
 }

