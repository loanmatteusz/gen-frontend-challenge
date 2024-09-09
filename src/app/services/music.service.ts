import { map } from "rxjs";
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {Music, UpdateMusic} from "../models/music.model";

import { LIST_MUSICS } from '../graphql/query';
import {DELETE_MUSIC, POST_MUSIC, UPDATE_MUSIC} from "../graphql/mutations";


@Injectable({
  providedIn: 'root',
})
export class MusicService {
  public constructor(
    private readonly apollo: Apollo,
  ) {}

  public list() {
    return this.apollo
      .query<{ listAllMusic: Music[] }>({
        query: LIST_MUSICS
      }).pipe(map(data => data.data.listAllMusic));
  }

  public add(data: { title: string, link: string}) {
    return this.apollo.mutate<{ postMusic: { id: string, title: string, link: string } }>({
      mutation: POST_MUSIC,
      variables: data,
    }).pipe(map(data => data.data?.postMusic));
  }

  public update(data: UpdateMusic) {
    return this.apollo.mutate<{ updateMusic: Music }>({
      mutation: UPDATE_MUSIC,
      variables: data,
    });
  }

  public remove(data: { musicId: string }) {
    return this.apollo.mutate<{ deleteMusic: { id: string } }>({
      mutation: DELETE_MUSIC,
      variables: data,
    });
  }
}
