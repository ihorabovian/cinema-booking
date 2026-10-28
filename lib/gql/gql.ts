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
    "\n  mutation CancelCinemaOrder($orderId: String!) {\n    cancelCinemaOrder(input: { orderId: $orderId }) {\n      success\n      reason\n    }\n  }\n": typeof types.CancelCinemaOrderDocument,
    "\n  mutation CreateCinemaPayment($input: CreateCinemaPaymentDto!) {\n    createCinemaPayment(input: $input) {\n      success\n      reason\n      order {\n        orderNumber\n      }\n    }\n  }\n": typeof types.CreateCinemaPaymentDocument,
    "\n  mutation CreateOtp($phone: String!) {\n    createOtp(phone: $phone) {\n      success\n      reason\n      retryDelay\n    }\n  }\n": typeof types.CreateOtpDocument,
    "\n  query GetCinemaOrders {\n    getCinemaOrders {\n      success\n      reason\n      orders {\n        _id\n        orderNumber\n        status\n        film {\n          id\n          name\n        }\n        tickets {\n          _id\n          row\n          column\n          seance {\n            date\n            time\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetCinemaOrdersDocument,
    "\n  query GetCinemaToday {\n    getCinemaToday {\n      success\n      reason\n      films {\n        id\n        name\n        genres\n        img\n        userRatings {\n          imdb\n        }\n        actors {\n          id\n          fullName\n          photo\n        }\n      }\n    }\n  }\n": typeof types.GetCinemaTodayDocument,
    "\n  query GetFilm($filmId: String!) {\n    getFilm(filmId: $filmId) {\n      success\n      reason\n      film {\n        id\n        name\n        description\n        genres\n        img\n        userRatings {\n          imdb\n        }\n        actors {\n          id\n          fullName\n          photo\n        }\n      }\n    }\n  }\n": typeof types.GetFilmDocument,
    "\n  query GetFilmHalls($filmId: String!) {\n    getFilmSchedule(filmId: $filmId) {\n      success\n      reason\n      schedules {\n        date\n        seances {\n          time\n          hall {\n            name\n            places {\n              price\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetFilmHallsDocument,
    "\n  query GetFilmSchedule($filmId: String!) {\n    getFilmSchedule(filmId: $filmId) {\n      success\n      reason\n      schedules {\n        date\n        seances {\n          time\n          hall {\n            name\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetFilmScheduleDocument,
    "\n  query GetProfile {\n    getProfile {\n      success\n      reason\n      user {\n        phone\n        firstname\n        lastname\n        middlename\n        city\n        email\n      }\n    }\n  }\n": typeof types.GetProfileDocument,
    "\n  mutation SignIn($phone: String!, $code: Float!) {\n    signIn(phone: $phone, code: $code) {\n      success\n      reason\n    }\n  }\n": typeof types.SignInDocument,
    "\n  mutation SignOut {\n    signOut {\n      success\n      reason\n    }\n  }\n": typeof types.SignOutDocument,
    "\n  mutation UpdateProfile(\n    $firstname: String\n    $lastname: String\n    $middlename: String\n    $city: String\n    $email: String\n  ) {\n    updateProfile(\n      firstname: $firstname\n      lastname: $lastname\n      middlename: $middlename\n      city: $city\n      email: $email\n    ) {\n      success\n      reason\n    }\n  }\n": typeof types.UpdateProfileDocument,
};
const documents: Documents = {
    "\n  mutation CancelCinemaOrder($orderId: String!) {\n    cancelCinemaOrder(input: { orderId: $orderId }) {\n      success\n      reason\n    }\n  }\n": types.CancelCinemaOrderDocument,
    "\n  mutation CreateCinemaPayment($input: CreateCinemaPaymentDto!) {\n    createCinemaPayment(input: $input) {\n      success\n      reason\n      order {\n        orderNumber\n      }\n    }\n  }\n": types.CreateCinemaPaymentDocument,
    "\n  mutation CreateOtp($phone: String!) {\n    createOtp(phone: $phone) {\n      success\n      reason\n      retryDelay\n    }\n  }\n": types.CreateOtpDocument,
    "\n  query GetCinemaOrders {\n    getCinemaOrders {\n      success\n      reason\n      orders {\n        _id\n        orderNumber\n        status\n        film {\n          id\n          name\n        }\n        tickets {\n          _id\n          row\n          column\n          seance {\n            date\n            time\n          }\n        }\n      }\n    }\n  }\n": types.GetCinemaOrdersDocument,
    "\n  query GetCinemaToday {\n    getCinemaToday {\n      success\n      reason\n      films {\n        id\n        name\n        genres\n        img\n        userRatings {\n          imdb\n        }\n        actors {\n          id\n          fullName\n          photo\n        }\n      }\n    }\n  }\n": types.GetCinemaTodayDocument,
    "\n  query GetFilm($filmId: String!) {\n    getFilm(filmId: $filmId) {\n      success\n      reason\n      film {\n        id\n        name\n        description\n        genres\n        img\n        userRatings {\n          imdb\n        }\n        actors {\n          id\n          fullName\n          photo\n        }\n      }\n    }\n  }\n": types.GetFilmDocument,
    "\n  query GetFilmHalls($filmId: String!) {\n    getFilmSchedule(filmId: $filmId) {\n      success\n      reason\n      schedules {\n        date\n        seances {\n          time\n          hall {\n            name\n            places {\n              price\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetFilmHallsDocument,
    "\n  query GetFilmSchedule($filmId: String!) {\n    getFilmSchedule(filmId: $filmId) {\n      success\n      reason\n      schedules {\n        date\n        seances {\n          time\n          hall {\n            name\n          }\n        }\n      }\n    }\n  }\n": types.GetFilmScheduleDocument,
    "\n  query GetProfile {\n    getProfile {\n      success\n      reason\n      user {\n        phone\n        firstname\n        lastname\n        middlename\n        city\n        email\n      }\n    }\n  }\n": types.GetProfileDocument,
    "\n  mutation SignIn($phone: String!, $code: Float!) {\n    signIn(phone: $phone, code: $code) {\n      success\n      reason\n    }\n  }\n": types.SignInDocument,
    "\n  mutation SignOut {\n    signOut {\n      success\n      reason\n    }\n  }\n": types.SignOutDocument,
    "\n  mutation UpdateProfile(\n    $firstname: String\n    $lastname: String\n    $middlename: String\n    $city: String\n    $email: String\n  ) {\n    updateProfile(\n      firstname: $firstname\n      lastname: $lastname\n      middlename: $middlename\n      city: $city\n      email: $email\n    ) {\n      success\n      reason\n    }\n  }\n": types.UpdateProfileDocument,
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
export function graphql(source: "\n  mutation CancelCinemaOrder($orderId: String!) {\n    cancelCinemaOrder(input: { orderId: $orderId }) {\n      success\n      reason\n    }\n  }\n"): (typeof documents)["\n  mutation CancelCinemaOrder($orderId: String!) {\n    cancelCinemaOrder(input: { orderId: $orderId }) {\n      success\n      reason\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCinemaPayment($input: CreateCinemaPaymentDto!) {\n    createCinemaPayment(input: $input) {\n      success\n      reason\n      order {\n        orderNumber\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCinemaPayment($input: CreateCinemaPaymentDto!) {\n    createCinemaPayment(input: $input) {\n      success\n      reason\n      order {\n        orderNumber\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOtp($phone: String!) {\n    createOtp(phone: $phone) {\n      success\n      reason\n      retryDelay\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOtp($phone: String!) {\n    createOtp(phone: $phone) {\n      success\n      reason\n      retryDelay\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCinemaOrders {\n    getCinemaOrders {\n      success\n      reason\n      orders {\n        _id\n        orderNumber\n        status\n        film {\n          id\n          name\n        }\n        tickets {\n          _id\n          row\n          column\n          seance {\n            date\n            time\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCinemaOrders {\n    getCinemaOrders {\n      success\n      reason\n      orders {\n        _id\n        orderNumber\n        status\n        film {\n          id\n          name\n        }\n        tickets {\n          _id\n          row\n          column\n          seance {\n            date\n            time\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCinemaToday {\n    getCinemaToday {\n      success\n      reason\n      films {\n        id\n        name\n        genres\n        img\n        userRatings {\n          imdb\n        }\n        actors {\n          id\n          fullName\n          photo\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCinemaToday {\n    getCinemaToday {\n      success\n      reason\n      films {\n        id\n        name\n        genres\n        img\n        userRatings {\n          imdb\n        }\n        actors {\n          id\n          fullName\n          photo\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFilm($filmId: String!) {\n    getFilm(filmId: $filmId) {\n      success\n      reason\n      film {\n        id\n        name\n        description\n        genres\n        img\n        userRatings {\n          imdb\n        }\n        actors {\n          id\n          fullName\n          photo\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFilm($filmId: String!) {\n    getFilm(filmId: $filmId) {\n      success\n      reason\n      film {\n        id\n        name\n        description\n        genres\n        img\n        userRatings {\n          imdb\n        }\n        actors {\n          id\n          fullName\n          photo\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFilmHalls($filmId: String!) {\n    getFilmSchedule(filmId: $filmId) {\n      success\n      reason\n      schedules {\n        date\n        seances {\n          time\n          hall {\n            name\n            places {\n              price\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFilmHalls($filmId: String!) {\n    getFilmSchedule(filmId: $filmId) {\n      success\n      reason\n      schedules {\n        date\n        seances {\n          time\n          hall {\n            name\n            places {\n              price\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFilmSchedule($filmId: String!) {\n    getFilmSchedule(filmId: $filmId) {\n      success\n      reason\n      schedules {\n        date\n        seances {\n          time\n          hall {\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFilmSchedule($filmId: String!) {\n    getFilmSchedule(filmId: $filmId) {\n      success\n      reason\n      schedules {\n        date\n        seances {\n          time\n          hall {\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProfile {\n    getProfile {\n      success\n      reason\n      user {\n        phone\n        firstname\n        lastname\n        middlename\n        city\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProfile {\n    getProfile {\n      success\n      reason\n      user {\n        phone\n        firstname\n        lastname\n        middlename\n        city\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignIn($phone: String!, $code: Float!) {\n    signIn(phone: $phone, code: $code) {\n      success\n      reason\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($phone: String!, $code: Float!) {\n    signIn(phone: $phone, code: $code) {\n      success\n      reason\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignOut {\n    signOut {\n      success\n      reason\n    }\n  }\n"): (typeof documents)["\n  mutation SignOut {\n    signOut {\n      success\n      reason\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProfile(\n    $firstname: String\n    $lastname: String\n    $middlename: String\n    $city: String\n    $email: String\n  ) {\n    updateProfile(\n      firstname: $firstname\n      lastname: $lastname\n      middlename: $middlename\n      city: $city\n      email: $email\n    ) {\n      success\n      reason\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProfile(\n    $firstname: String\n    $lastname: String\n    $middlename: String\n    $city: String\n    $email: String\n  ) {\n    updateProfile(\n      firstname: $firstname\n      lastname: $lastname\n      middlename: $middlename\n      city: $city\n      email: $email\n    ) {\n      success\n      reason\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;