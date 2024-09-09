import { gql } from "apollo-angular";

export const LIST_MUSICS = gql`
  query { listAllMusic { id, title, link } }
`;
