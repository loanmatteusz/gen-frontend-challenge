import { map, Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {Apollo, MutationResult} from 'apollo-angular';

import { IAuthService } from './interfaces/auth-service.interface';
import { JwtService } from "./jwt.service";
import { ISignIn, ISignUp } from '../models/auth.model';
import { SIGN_IN, SIGN_UP } from '../graphql/mutations';


@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly apollo: Apollo,
  ) {}


  public signUp(data: ISignUp): Observable<MutationResult<{createUser: boolean}>> {
    return this.apollo
      .mutate<{ createUser: boolean }>({
        mutation: SIGN_UP,
        variables: data,
      });
  }


  public signIn(data: ISignIn): Observable<void> {
    return this.apollo
      .mutate<{ login: string }>({
        mutation: SIGN_IN,
        variables: data,
      }).pipe(map((response) => {
          if (!!response.data?.login) {
            this.jwtService.setToken(response.data.login);
            this.apollo.client.resetStore();
          }
        }),
      );
  }


  public logout(): void {
    this.jwtService.removeToken();
    this.apollo.client.resetStore();
  }
}
