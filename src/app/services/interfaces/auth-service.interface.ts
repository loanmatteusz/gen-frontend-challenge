import { Observable } from 'rxjs';
import { MutationResult } from "apollo-angular";
import { ISignIn, ISignUp } from '../../models/auth.model';

export interface IAuthService {
  signUp(data: ISignUp): Observable<MutationResult<{createUser: boolean}>>;
  signIn(data: ISignIn): Observable<void>;
  logout(): void;
}
