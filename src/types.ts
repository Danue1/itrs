export type Option<T> = Some<T> | None;

export interface Some<T> {
  readonly type: "Some";
  readonly value: T;
}

export interface None {
  readonly type: "None";
}

export const Some = <T>(value: T): Some<T> => ({
  type: "Some",
  value
});
