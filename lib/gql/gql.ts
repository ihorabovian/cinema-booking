/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetCinemaToday {\n    getCinemaToday {\n      success\n      reason\n      films {\n        id\n        name\n        genres\n        img\n        userRatings {\n          kinopoisk\n        }\n        actors {\n          id\n          fullName\n          photo\n        }\n      }\n    }\n  }\n": typeof types.GetCinemaTodayDocument,
    "\n  query GetFilm($filmId: String!) {\n    getFilm(filmId: $filmId) {\n      success\n      reason\n      film {\n        id\n        name\n        description\n        genres\n        img\n        userRatings {\n          kinopoisk\n        }\n        actors {\n          id\n          fullName\n          photo\n        }\n      }\n    }\n  }\n": typeof types.GetFilmDocument,
    "\n  query GetFilmHalls($filmId: String!) {\n    getFilmSchedule(filmId: $filmId) {\n      success\n      reason\n      schedules {\n        date\n        seances {\n          time\n          hall {\n            name\n            places {\n              price\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetFilmHallsDocument,
    "\n  query GetFilmSchedule($filmId: String!) {\n    getFilmSchedule(filmId: $filmId) {\n      success\n      reason\n      schedules {\n        date\n        seances {\n          time\n          hall {\n            name\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetFilmScheduleDocument,
};
const documents: Documents = {
    "\n  query GetCinemaToday {\n    getCinemaToday {\n      success\n      reason\n      films {\n        id\n        name\n        genres\n        img\n        userRatings {\n          kinopoisk\n        }\n        actors {\n          id\n          fullName\n          photo\n        }\n      }\n    }\n  }\n": types.GetCinemaTodayDocument,
    "\n  query GetFilm($filmId: String!) {\n    getFilm(filmId: $filmId) {\n      success\n      reason\n      film {\n        id\n        name\n        description\n        genres\n        img\n        userRatings {\n          kinopoisk\n        }\n        actors {\n          id\n          fullName\n          photo\n        }\n      }\n    }\n  }\n": types.GetFilmDocument,
    "\n  query GetFilmHalls($filmId: String!) {\n    getFilmSchedule(filmId: $filmId) {\n      success\n      reason\n      schedules {\n        date\n        seances {\n          time\n          hall {\n            name\n            places {\n              price\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetFilmHallsDocument,
    "\n  query GetFilmSchedule($filmId: String!) {\n    getFilmSchedule(filmId: $filmId) {\n      success\n      reason\n      schedules {\n        date\n        seances {\n          time\n          hall {\n            name\n          }\n        }\n      }\n    }\n  }\n": types.GetFilmScheduleDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCinemaToday {\n    getCinemaToday {\n      success\n      reason\n      films {\n        id\n        name\n        genres\n        img\n        userRatings {\n          kinopoisk\n        }\n        actors {\n          id\n          fullName\n          photo\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCinemaToday {\n    getCinemaToday {\n      success\n      reason\n      films {\n        id\n        name\n        genres\n        img\n        userRatings {\n          kinopoisk\n        }\n        actors {\n          id\n          fullName\n          photo\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFilm($filmId: String!) {\n    getFilm(filmId: $filmId) {\n      success\n      reason\n      film {\n        id\n        name\n        description\n        genres\n        img\n        userRatings {\n          kinopoisk\n        }\n        actors {\n          id\n          fullName\n          photo\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFilm($filmId: String!) {\n    getFilm(filmId: $filmId) {\n      success\n      reason\n      film {\n        id\n        name\n        description\n        genres\n        img\n        userRatings {\n          kinopoisk\n        }\n        actors {\n          id\n          fullName\n          photo\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFilmHalls($filmId: String!) {\n    getFilmSchedule(filmId: $filmId) {\n      success\n      reason\n      schedules {\n        date\n        seances {\n          time\n          hall {\n            name\n            places {\n              price\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFilmHalls($filmId: String!) {\n    getFilmSchedule(filmId: $filmId) {\n      success\n      reason\n      schedules {\n        date\n        seances {\n          time\n          hall {\n            name\n            places {\n              price\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFilmSchedule($filmId: String!) {\n    getFilmSchedule(filmId: $filmId) {\n      success\n      reason\n      schedules {\n        date\n        seances {\n          time\n          hall {\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFilmSchedule($filmId: String!) {\n    getFilmSchedule(filmId: $filmId) {\n      success\n      reason\n      schedules {\n        date\n        seances {\n          time\n          hall {\n            name\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;