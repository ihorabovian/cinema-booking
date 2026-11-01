import { print } from "graphql";
import { cacheLife, cacheTag } from "next/cache";
import { gqlClient } from "./graphql-client";
import type { SignInMutation, SignInMutationVariables } from "./gql/graphql";
import { CANCEL_CINEMA_ORDER } from "./queries/CANCEL_CINEMA_ORDER";
import { CREATE_CINEMA_PAYMENT } from "./queries/CREATE_CINEMA_PAYMENT";
import { CREATE_OTP } from "./queries/CREATE_OTP";
import { GET_CINEMA_ORDERS } from "./queries/GET_CINEMA_ORDERS";
import { GET_CINEMA_TODAY } from "./queries/GET_CINEMA_TODAY";
import { GET_FILM } from "./queries/GET_FILM";
import { GET_FILM_HALLS } from "./queries/GET_FILM_HALLS";
import { GET_FILM_SCHEDULE } from "./queries/GET_FILM_SCHEDULE";
import { GET_PROFILE } from "./queries/GET_PROFILE";
import { SIGN_IN } from "./queries/SIGN_IN";
import { SIGN_OUT } from "./queries/SIGN_OUT";
import { UPDATE_PROFILE } from "./queries/UPDATE_PROFILE";
import type {
  FilmCard,
  FilmDetails,
  FilmSchedule,
  Hall,
  PaymentInput,
  CinemaOrder,
  ProfileInput,
  User,
  UserOrder,
} from "@/lib/types/cinema";

type ApiResponse = {
  success: boolean;
  reason: string | null;
};

// Every query answers with `success` and `reason`, so a failed one becomes an error here.
function assertSuccess(response: ApiResponse, query: string) {
  if (!response.success) {
    throw new Error(`${query} failed: ${response.reason ?? "unknown reason"}`);
  }
}

// The hall cache of a film is tagged, so a payment can drop the seats it just sold.
export function getFilmHallsTag(filmId: string) {
  return `film-halls:${filmId}`;
}

// Requests made for a signed-in user carry their API token.
function authHeaders(token: string) {
  return { authorization: `Bearer ${token}` };
}

// A mutation: never cached. A signed-in buyer's token links the order to their account.
export async function createCinemaPayment(
  input: PaymentInput,
  token?: string,
): Promise<CinemaOrder> {
  const { createCinemaPayment } = await gqlClient.request(
    CREATE_CINEMA_PAYMENT,
    { input },
    token ? authHeaders(token) : undefined,
  );
  assertSuccess(createCinemaPayment, "createCinemaPayment");

  return createCinemaPayment.order;
}

// Sends a one-time code by SMS. Returns how long to wait before asking again, in ms.
export async function createOtp(phone: string): Promise<number> {
  const { createOtp } = await gqlClient.request(CREATE_OTP, { phone });
  assertSuccess(createOtp, "createOtp");

  return createOtp.retryDelay;
}

// Exchanges the code for an API token. The API sets it as a session_token cookie;
// the same value works as a Bearer token in later requests.
export async function signIn(phone: string, code: number): Promise<string> {
  // rawRequest exposes the response headers, but takes the query as a string.
  const { data, headers } = await gqlClient.rawRequest<
    SignInMutation,
    SignInMutationVariables
  >(print(SIGN_IN), { phone, code });
  assertSuccess(data.signIn, "signIn");

  const token = headers
    .getSetCookie()
    .map((cookie) => cookie.match(/^session_token=([^;]+)/)?.[1])
    .find(Boolean);
  if (!token) {
    throw new Error("signIn failed: no session_token cookie in the response");
  }

  return token;
}

export async function signOut(token: string) {
  const { signOut } = await gqlClient.request(SIGN_OUT, {}, authHeaders(token));
  assertSuccess(signOut, "signOut");
}

// The functions below return one user's data, so none of them is cached on the server.

export async function getProfile(token: string): Promise<User> {
  const { getProfile } = await gqlClient.request(GET_PROFILE, {}, authHeaders(token));
  assertSuccess(getProfile, "getProfile");

  return getProfile.user;
}

export async function updateProfile(token: string, input: ProfileInput) {
  const { updateProfile } = await gqlClient.request(
    UPDATE_PROFILE,
    input,
    authHeaders(token),
  );
  assertSuccess(updateProfile, "updateProfile");
}

export async function getCinemaOrders(token: string): Promise<UserOrder[]> {
  const { getCinemaOrders } = await gqlClient.request(
    GET_CINEMA_ORDERS,
    {},
    authHeaders(token),
  );
  assertSuccess(getCinemaOrders, "getCinemaOrders");

  return getCinemaOrders.orders;
}

export async function cancelCinemaOrder(token: string, orderId: string) {
  const { cancelCinemaOrder } = await gqlClient.request(
    CANCEL_CINEMA_ORDER,
    { orderId },
    authHeaders(token),
  );
  assertSuccess(cancelCinemaOrder, "cancelCinemaOrder");
}

export async function getCinemaToday(): Promise<FilmCard[]> {
  "use cache";
  cacheLife("minutes");

  const { getCinemaToday } = await gqlClient.request(GET_CINEMA_TODAY);
  assertSuccess(getCinemaToday, "getCinemaToday");

  return getCinemaToday.films;
}

export async function getFilm(filmId: string): Promise<FilmDetails> {
  "use cache";
  cacheLife("minutes");

  const { getFilm } = await gqlClient.request(GET_FILM, { filmId });
  assertSuccess(getFilm, "getFilm");

  return getFilm.film;
}

export async function getFilmSchedule(filmId: string): Promise<FilmSchedule[]> {
  "use cache";
  cacheLife("minutes");

  const { getFilmSchedule } = await gqlClient.request(GET_FILM_SCHEDULE, {
    filmId,
  });
  assertSuccess(getFilmSchedule, "getFilmSchedule");

  return getFilmSchedule.schedules;
}

// The API has no query for one seance, so we take the week and pick the hall out of it.
// Seats sell out quickly, so this cache is short.
export async function getSeanceHall(
  filmId: string,
  date: string,
  time: string,
  hallName: string,
): Promise<Hall | null> {
  "use cache";
  cacheLife("seconds");
  cacheTag(getFilmHallsTag(filmId));

  const { getFilmSchedule } = await gqlClient.request(GET_FILM_HALLS, {
    filmId,
  });
  assertSuccess(getFilmSchedule, "getFilmHalls");

  const seance = getFilmSchedule.schedules
    .find((schedule) => schedule.date === date)
    ?.seances.find(
      (seance) => seance.time === time && seance.hall.name === hallName,
    );

  return seance?.hall ?? null;
}

export function getImageUrl(path: string) {
  return `${process.env.API_BASE_URL}${path}`;
}
