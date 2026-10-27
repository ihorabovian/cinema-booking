/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CreateCinemaPaymentDto = {
  debitCard: CreatePaymentDebitCardDto;
  filmId: string;
  person: CreatePaymentPersonDto;
  seance: CreatePaymentSeanceDto;
  tickets: Array<CreatePaymentTicketsDto>;
};

export type CreatePaymentDebitCardDto = {
  cvv: string;
  expireDate: string;
  pan: string;
};

export type CreatePaymentPersonDto = {
  firstname: string;
  lastname: string;
  middlename?: string | null | undefined;
  phone: string;
};

export type CreatePaymentSeanceDto = {
  date: string;
  time: string;
};

export type CreatePaymentTicketsDto = {
  column: number;
  row: number;
};

export type FilmHallCellType =
  | 'BLOCKED'
  | 'COMFORT'
  | 'ECONOM'
  | 'PAID';

export type CreateCinemaPaymentMutationVariables = Exact<{
  input: CreateCinemaPaymentDto;
}>;


export type CreateCinemaPaymentMutation = { createCinemaPayment: { success: boolean, reason: string | null, order: { orderNumber: number } } };

export type GetCinemaTodayQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCinemaTodayQuery = { getCinemaToday: { success: boolean, reason: string | null, films: Array<{ id: string, name: string, genres: Array<string>, img: string, userRatings: { imdb: string }, actors: Array<{ id: string, fullName: string, photo: string }> }> } };

export type GetFilmQueryVariables = Exact<{
  filmId: string;
}>;


export type GetFilmQuery = { getFilm: { success: boolean, reason: string | null, film: { id: string, name: string, description: string, genres: Array<string>, img: string, userRatings: { imdb: string }, actors: Array<{ id: string, fullName: string, photo: string }> } } };

export type GetFilmHallsQueryVariables = Exact<{
  filmId: string;
}>;


export type GetFilmHallsQuery = { getFilmSchedule: { success: boolean, reason: string | null, schedules: Array<{ date: string, seances: Array<{ time: string, hall: { name: string, places: Array<Array<{ price: number, type: FilmHallCellType }>> } }> }> } };

export type GetFilmScheduleQueryVariables = Exact<{
  filmId: string;
}>;


export type GetFilmScheduleQuery = { getFilmSchedule: { success: boolean, reason: string | null, schedules: Array<{ date: string, seances: Array<{ time: string, hall: { name: string } }> }> } };


export const CreateCinemaPaymentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCinemaPayment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCinemaPaymentDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCinemaPayment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"order"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCinemaPaymentMutation, CreateCinemaPaymentMutationVariables>;
export const GetCinemaTodayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCinemaToday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCinemaToday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"films"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"img"}},{"kind":"Field","name":{"kind":"Name","value":"userRatings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imdb"}}]}},{"kind":"Field","name":{"kind":"Name","value":"actors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCinemaTodayQuery, GetCinemaTodayQueryVariables>;
export const GetFilmDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFilm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filmId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFilm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filmId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filmId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"film"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"img"}},{"kind":"Field","name":{"kind":"Name","value":"userRatings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imdb"}}]}},{"kind":"Field","name":{"kind":"Name","value":"actors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFilmQuery, GetFilmQueryVariables>;
export const GetFilmHallsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFilmHalls"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filmId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFilmSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filmId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filmId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"schedules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"seances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"hall"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFilmHallsQuery, GetFilmHallsQueryVariables>;
export const GetFilmScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFilmSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filmId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFilmSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filmId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filmId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"schedules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"seances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"hall"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFilmScheduleQuery, GetFilmScheduleQueryVariables>;