import { gql } from 'apollo-angular';

export const SIGN_UP = gql`
	mutation ($name: String!, $email: String!, $password: String!) {
		createUser(input: { name: $name, email: $email, password: $password })
	}
`;

export const SIGN_IN = gql`
	mutation ($email: String!, $password: String!) {
		login(input: { email: $email, password: $password })
	}
`;


export const POST_MUSIC = gql`
	mutation ($title: String!, $link: String!) {
		postMusic(
			input: { title: $title, link: $link }
		) {
			id
			title
			link
		}
	}
`;

export const UPDATE_MUSIC = gql`
	mutation (
		$id: String!
		$title: String!
		$link: String!
	) {
		updateMusic(
			input: { id: $id, title: $title, link: $link }
		) {
			id
			title
			link
		}
	}
`;

export const DELETE_MUSIC = gql`
	mutation ($musicId: String!) {
		deleteMusic(musicId: $musicId)
	}
`;
