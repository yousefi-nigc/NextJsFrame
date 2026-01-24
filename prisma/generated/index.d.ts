
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Floor
 * 
 */
export type Floor = $Result.DefaultSelection<Prisma.$FloorPayload>
/**
 * Model Assessment
 * 
 */
export type Assessment = $Result.DefaultSelection<Prisma.$AssessmentPayload>
/**
 * Model AssessmentRiskFactors
 * 
 */
export type AssessmentRiskFactors = $Result.DefaultSelection<Prisma.$AssessmentRiskFactorsPayload>
/**
 * Model AssessmentAcceptanceFactors
 * 
 */
export type AssessmentAcceptanceFactors = $Result.DefaultSelection<Prisma.$AssessmentAcceptanceFactorsPayload>
/**
 * Model AssessmentProtectionFactors
 * 
 */
export type AssessmentProtectionFactors = $Result.DefaultSelection<Prisma.$AssessmentProtectionFactorsPayload>
/**
 * Model AssessmentFinalRisks
 * 
 */
export type AssessmentFinalRisks = $Result.DefaultSelection<Prisma.$AssessmentFinalRisksPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.floor`: Exposes CRUD operations for the **Floor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Floors
    * const floors = await prisma.floor.findMany()
    * ```
    */
  get floor(): Prisma.FloorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assessment`: Exposes CRUD operations for the **Assessment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assessments
    * const assessments = await prisma.assessment.findMany()
    * ```
    */
  get assessment(): Prisma.AssessmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assessmentRiskFactors`: Exposes CRUD operations for the **AssessmentRiskFactors** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AssessmentRiskFactors
    * const assessmentRiskFactors = await prisma.assessmentRiskFactors.findMany()
    * ```
    */
  get assessmentRiskFactors(): Prisma.AssessmentRiskFactorsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assessmentAcceptanceFactors`: Exposes CRUD operations for the **AssessmentAcceptanceFactors** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AssessmentAcceptanceFactors
    * const assessmentAcceptanceFactors = await prisma.assessmentAcceptanceFactors.findMany()
    * ```
    */
  get assessmentAcceptanceFactors(): Prisma.AssessmentAcceptanceFactorsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assessmentProtectionFactors`: Exposes CRUD operations for the **AssessmentProtectionFactors** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AssessmentProtectionFactors
    * const assessmentProtectionFactors = await prisma.assessmentProtectionFactors.findMany()
    * ```
    */
  get assessmentProtectionFactors(): Prisma.AssessmentProtectionFactorsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assessmentFinalRisks`: Exposes CRUD operations for the **AssessmentFinalRisks** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AssessmentFinalRisks
    * const assessmentFinalRisks = await prisma.assessmentFinalRisks.findMany()
    * ```
    */
  get assessmentFinalRisks(): Prisma.AssessmentFinalRisksDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.1
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification',
    Project: 'Project',
    Floor: 'Floor',
    Assessment: 'Assessment',
    AssessmentRiskFactors: 'AssessmentRiskFactors',
    AssessmentAcceptanceFactors: 'AssessmentAcceptanceFactors',
    AssessmentProtectionFactors: 'AssessmentProtectionFactors',
    AssessmentFinalRisks: 'AssessmentFinalRisks'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "session" | "account" | "verification" | "project" | "floor" | "assessment" | "assessmentRiskFactors" | "assessmentAcceptanceFactors" | "assessmentProtectionFactors" | "assessmentFinalRisks"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Floor: {
        payload: Prisma.$FloorPayload<ExtArgs>
        fields: Prisma.FloorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FloorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FloorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FloorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FloorPayload>
          }
          findFirst: {
            args: Prisma.FloorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FloorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FloorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FloorPayload>
          }
          findMany: {
            args: Prisma.FloorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FloorPayload>[]
          }
          create: {
            args: Prisma.FloorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FloorPayload>
          }
          createMany: {
            args: Prisma.FloorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FloorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FloorPayload>[]
          }
          delete: {
            args: Prisma.FloorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FloorPayload>
          }
          update: {
            args: Prisma.FloorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FloorPayload>
          }
          deleteMany: {
            args: Prisma.FloorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FloorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FloorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FloorPayload>[]
          }
          upsert: {
            args: Prisma.FloorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FloorPayload>
          }
          aggregate: {
            args: Prisma.FloorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFloor>
          }
          groupBy: {
            args: Prisma.FloorGroupByArgs<ExtArgs>
            result: $Utils.Optional<FloorGroupByOutputType>[]
          }
          count: {
            args: Prisma.FloorCountArgs<ExtArgs>
            result: $Utils.Optional<FloorCountAggregateOutputType> | number
          }
        }
      }
      Assessment: {
        payload: Prisma.$AssessmentPayload<ExtArgs>
        fields: Prisma.AssessmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssessmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssessmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          findFirst: {
            args: Prisma.AssessmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssessmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          findMany: {
            args: Prisma.AssessmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>[]
          }
          create: {
            args: Prisma.AssessmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          createMany: {
            args: Prisma.AssessmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssessmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>[]
          }
          delete: {
            args: Prisma.AssessmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          update: {
            args: Prisma.AssessmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          deleteMany: {
            args: Prisma.AssessmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssessmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssessmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>[]
          }
          upsert: {
            args: Prisma.AssessmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          aggregate: {
            args: Prisma.AssessmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssessment>
          }
          groupBy: {
            args: Prisma.AssessmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssessmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssessmentCountArgs<ExtArgs>
            result: $Utils.Optional<AssessmentCountAggregateOutputType> | number
          }
        }
      }
      AssessmentRiskFactors: {
        payload: Prisma.$AssessmentRiskFactorsPayload<ExtArgs>
        fields: Prisma.AssessmentRiskFactorsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssessmentRiskFactorsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentRiskFactorsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssessmentRiskFactorsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentRiskFactorsPayload>
          }
          findFirst: {
            args: Prisma.AssessmentRiskFactorsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentRiskFactorsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssessmentRiskFactorsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentRiskFactorsPayload>
          }
          findMany: {
            args: Prisma.AssessmentRiskFactorsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentRiskFactorsPayload>[]
          }
          create: {
            args: Prisma.AssessmentRiskFactorsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentRiskFactorsPayload>
          }
          createMany: {
            args: Prisma.AssessmentRiskFactorsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssessmentRiskFactorsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentRiskFactorsPayload>[]
          }
          delete: {
            args: Prisma.AssessmentRiskFactorsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentRiskFactorsPayload>
          }
          update: {
            args: Prisma.AssessmentRiskFactorsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentRiskFactorsPayload>
          }
          deleteMany: {
            args: Prisma.AssessmentRiskFactorsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssessmentRiskFactorsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssessmentRiskFactorsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentRiskFactorsPayload>[]
          }
          upsert: {
            args: Prisma.AssessmentRiskFactorsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentRiskFactorsPayload>
          }
          aggregate: {
            args: Prisma.AssessmentRiskFactorsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssessmentRiskFactors>
          }
          groupBy: {
            args: Prisma.AssessmentRiskFactorsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssessmentRiskFactorsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssessmentRiskFactorsCountArgs<ExtArgs>
            result: $Utils.Optional<AssessmentRiskFactorsCountAggregateOutputType> | number
          }
        }
      }
      AssessmentAcceptanceFactors: {
        payload: Prisma.$AssessmentAcceptanceFactorsPayload<ExtArgs>
        fields: Prisma.AssessmentAcceptanceFactorsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssessmentAcceptanceFactorsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentAcceptanceFactorsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssessmentAcceptanceFactorsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentAcceptanceFactorsPayload>
          }
          findFirst: {
            args: Prisma.AssessmentAcceptanceFactorsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentAcceptanceFactorsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssessmentAcceptanceFactorsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentAcceptanceFactorsPayload>
          }
          findMany: {
            args: Prisma.AssessmentAcceptanceFactorsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentAcceptanceFactorsPayload>[]
          }
          create: {
            args: Prisma.AssessmentAcceptanceFactorsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentAcceptanceFactorsPayload>
          }
          createMany: {
            args: Prisma.AssessmentAcceptanceFactorsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssessmentAcceptanceFactorsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentAcceptanceFactorsPayload>[]
          }
          delete: {
            args: Prisma.AssessmentAcceptanceFactorsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentAcceptanceFactorsPayload>
          }
          update: {
            args: Prisma.AssessmentAcceptanceFactorsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentAcceptanceFactorsPayload>
          }
          deleteMany: {
            args: Prisma.AssessmentAcceptanceFactorsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssessmentAcceptanceFactorsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssessmentAcceptanceFactorsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentAcceptanceFactorsPayload>[]
          }
          upsert: {
            args: Prisma.AssessmentAcceptanceFactorsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentAcceptanceFactorsPayload>
          }
          aggregate: {
            args: Prisma.AssessmentAcceptanceFactorsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssessmentAcceptanceFactors>
          }
          groupBy: {
            args: Prisma.AssessmentAcceptanceFactorsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssessmentAcceptanceFactorsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssessmentAcceptanceFactorsCountArgs<ExtArgs>
            result: $Utils.Optional<AssessmentAcceptanceFactorsCountAggregateOutputType> | number
          }
        }
      }
      AssessmentProtectionFactors: {
        payload: Prisma.$AssessmentProtectionFactorsPayload<ExtArgs>
        fields: Prisma.AssessmentProtectionFactorsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssessmentProtectionFactorsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentProtectionFactorsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssessmentProtectionFactorsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentProtectionFactorsPayload>
          }
          findFirst: {
            args: Prisma.AssessmentProtectionFactorsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentProtectionFactorsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssessmentProtectionFactorsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentProtectionFactorsPayload>
          }
          findMany: {
            args: Prisma.AssessmentProtectionFactorsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentProtectionFactorsPayload>[]
          }
          create: {
            args: Prisma.AssessmentProtectionFactorsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentProtectionFactorsPayload>
          }
          createMany: {
            args: Prisma.AssessmentProtectionFactorsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssessmentProtectionFactorsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentProtectionFactorsPayload>[]
          }
          delete: {
            args: Prisma.AssessmentProtectionFactorsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentProtectionFactorsPayload>
          }
          update: {
            args: Prisma.AssessmentProtectionFactorsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentProtectionFactorsPayload>
          }
          deleteMany: {
            args: Prisma.AssessmentProtectionFactorsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssessmentProtectionFactorsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssessmentProtectionFactorsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentProtectionFactorsPayload>[]
          }
          upsert: {
            args: Prisma.AssessmentProtectionFactorsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentProtectionFactorsPayload>
          }
          aggregate: {
            args: Prisma.AssessmentProtectionFactorsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssessmentProtectionFactors>
          }
          groupBy: {
            args: Prisma.AssessmentProtectionFactorsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssessmentProtectionFactorsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssessmentProtectionFactorsCountArgs<ExtArgs>
            result: $Utils.Optional<AssessmentProtectionFactorsCountAggregateOutputType> | number
          }
        }
      }
      AssessmentFinalRisks: {
        payload: Prisma.$AssessmentFinalRisksPayload<ExtArgs>
        fields: Prisma.AssessmentFinalRisksFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssessmentFinalRisksFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentFinalRisksPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssessmentFinalRisksFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentFinalRisksPayload>
          }
          findFirst: {
            args: Prisma.AssessmentFinalRisksFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentFinalRisksPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssessmentFinalRisksFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentFinalRisksPayload>
          }
          findMany: {
            args: Prisma.AssessmentFinalRisksFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentFinalRisksPayload>[]
          }
          create: {
            args: Prisma.AssessmentFinalRisksCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentFinalRisksPayload>
          }
          createMany: {
            args: Prisma.AssessmentFinalRisksCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssessmentFinalRisksCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentFinalRisksPayload>[]
          }
          delete: {
            args: Prisma.AssessmentFinalRisksDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentFinalRisksPayload>
          }
          update: {
            args: Prisma.AssessmentFinalRisksUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentFinalRisksPayload>
          }
          deleteMany: {
            args: Prisma.AssessmentFinalRisksDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssessmentFinalRisksUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssessmentFinalRisksUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentFinalRisksPayload>[]
          }
          upsert: {
            args: Prisma.AssessmentFinalRisksUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentFinalRisksPayload>
          }
          aggregate: {
            args: Prisma.AssessmentFinalRisksAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssessmentFinalRisks>
          }
          groupBy: {
            args: Prisma.AssessmentFinalRisksGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssessmentFinalRisksGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssessmentFinalRisksCountArgs<ExtArgs>
            result: $Utils.Optional<AssessmentFinalRisksCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    session?: SessionOmit
    account?: AccountOmit
    verification?: VerificationOmit
    project?: ProjectOmit
    floor?: FloorOmit
    assessment?: AssessmentOmit
    assessmentRiskFactors?: AssessmentRiskFactorsOmit
    assessmentAcceptanceFactors?: AssessmentAcceptanceFactorsOmit
    assessmentProtectionFactors?: AssessmentProtectionFactorsOmit
    assessmentFinalRisks?: AssessmentFinalRisksOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    accounts: number
    projects: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    floors: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    floors?: boolean | ProjectCountOutputTypeCountFloorsArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountFloorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FloorWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    role: string | null
    banned: boolean | null
    banReason: string | null
    banExpires: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    role: string | null
    banned: boolean | null
    banReason: string | null
    banExpires: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    createdAt: number
    updatedAt: number
    role: number
    banned: number
    banReason: number
    banExpires: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    role?: true
    banned?: true
    banReason?: true
    banExpires?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    role?: true
    banned?: true
    banReason?: true
    banExpires?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    role?: true
    banned?: true
    banReason?: true
    banExpires?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    createdAt: Date
    updatedAt: Date
    role: string | null
    banned: boolean | null
    banReason: string | null
    banExpires: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean
    banned?: boolean
    banReason?: boolean
    banExpires?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean
    banned?: boolean
    banReason?: boolean
    banExpires?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean
    banned?: boolean
    banReason?: boolean
    banExpires?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean
    banned?: boolean
    banReason?: boolean
    banExpires?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "createdAt" | "updatedAt" | "role" | "banned" | "banReason" | "banExpires", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      projects: Prisma.$ProjectPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      emailVerified: boolean
      image: string | null
      createdAt: Date
      updatedAt: Date
      role: string | null
      banned: boolean | null
      banReason: string | null
      banExpires: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly role: FieldRef<"User", 'String'>
    readonly banned: FieldRef<"User", 'Boolean'>
    readonly banReason: FieldRef<"User", 'String'>
    readonly banExpires: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
    impersonatedBy: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
    impersonatedBy: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    userId: number
    impersonatedBy: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    impersonatedBy?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    impersonatedBy?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    impersonatedBy?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
    impersonatedBy: string | null
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    impersonatedBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    impersonatedBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    impersonatedBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    impersonatedBy?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent" | "userId" | "impersonatedBy", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
      userId: string
      impersonatedBy: string | null
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly token: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly impersonatedBy: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Verification model
   */
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification updateManyAndReturn
   */
  export type VerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    name: number
    address: number
    description: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    name: string
    address: string | null
    description: string | null
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    floors?: boolean | Project$floorsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "address" | "description" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    floors?: boolean | Project$floorsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      floors: Prisma.$FloorPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      address: string | null
      description: string | null
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    floors<T extends Project$floorsArgs<ExtArgs> = {}>(args?: Subset<T, Project$floorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FloorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly address: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
    readonly userId: FieldRef<"Project", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.floors
   */
  export type Project$floorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Floor
     */
    select?: FloorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Floor
     */
    omit?: FloorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FloorInclude<ExtArgs> | null
    where?: FloorWhereInput
    orderBy?: FloorOrderByWithRelationInput | FloorOrderByWithRelationInput[]
    cursor?: FloorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FloorScalarFieldEnum | FloorScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model Floor
   */

  export type AggregateFloor = {
    _count: FloorCountAggregateOutputType | null
    _avg: FloorAvgAggregateOutputType | null
    _sum: FloorSumAggregateOutputType | null
    _min: FloorMinAggregateOutputType | null
    _max: FloorMaxAggregateOutputType | null
  }

  export type FloorAvgAggregateOutputType = {
    level: number | null
  }

  export type FloorSumAggregateOutputType = {
    level: number | null
  }

  export type FloorMinAggregateOutputType = {
    id: string | null
    name: string | null
    level: number | null
    description: string | null
    projectId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FloorMaxAggregateOutputType = {
    id: string | null
    name: string | null
    level: number | null
    description: string | null
    projectId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FloorCountAggregateOutputType = {
    id: number
    name: number
    level: number
    description: number
    projectId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FloorAvgAggregateInputType = {
    level?: true
  }

  export type FloorSumAggregateInputType = {
    level?: true
  }

  export type FloorMinAggregateInputType = {
    id?: true
    name?: true
    level?: true
    description?: true
    projectId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FloorMaxAggregateInputType = {
    id?: true
    name?: true
    level?: true
    description?: true
    projectId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FloorCountAggregateInputType = {
    id?: true
    name?: true
    level?: true
    description?: true
    projectId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FloorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Floor to aggregate.
     */
    where?: FloorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Floors to fetch.
     */
    orderBy?: FloorOrderByWithRelationInput | FloorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FloorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Floors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Floors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Floors
    **/
    _count?: true | FloorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FloorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FloorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FloorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FloorMaxAggregateInputType
  }

  export type GetFloorAggregateType<T extends FloorAggregateArgs> = {
        [P in keyof T & keyof AggregateFloor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFloor[P]>
      : GetScalarType<T[P], AggregateFloor[P]>
  }




  export type FloorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FloorWhereInput
    orderBy?: FloorOrderByWithAggregationInput | FloorOrderByWithAggregationInput[]
    by: FloorScalarFieldEnum[] | FloorScalarFieldEnum
    having?: FloorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FloorCountAggregateInputType | true
    _avg?: FloorAvgAggregateInputType
    _sum?: FloorSumAggregateInputType
    _min?: FloorMinAggregateInputType
    _max?: FloorMaxAggregateInputType
  }

  export type FloorGroupByOutputType = {
    id: string
    name: string
    level: number
    description: string | null
    projectId: string
    createdAt: Date
    updatedAt: Date
    _count: FloorCountAggregateOutputType | null
    _avg: FloorAvgAggregateOutputType | null
    _sum: FloorSumAggregateOutputType | null
    _min: FloorMinAggregateOutputType | null
    _max: FloorMaxAggregateOutputType | null
  }

  type GetFloorGroupByPayload<T extends FloorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FloorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FloorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FloorGroupByOutputType[P]>
            : GetScalarType<T[P], FloorGroupByOutputType[P]>
        }
      >
    >


  export type FloorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    level?: boolean
    description?: boolean
    projectId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    assessment?: boolean | Floor$assessmentArgs<ExtArgs>
  }, ExtArgs["result"]["floor"]>

  export type FloorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    level?: boolean
    description?: boolean
    projectId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["floor"]>

  export type FloorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    level?: boolean
    description?: boolean
    projectId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["floor"]>

  export type FloorSelectScalar = {
    id?: boolean
    name?: boolean
    level?: boolean
    description?: boolean
    projectId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FloorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "level" | "description" | "projectId" | "createdAt" | "updatedAt", ExtArgs["result"]["floor"]>
  export type FloorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    assessment?: boolean | Floor$assessmentArgs<ExtArgs>
  }
  export type FloorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type FloorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $FloorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Floor"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      assessment: Prisma.$AssessmentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      level: number
      description: string | null
      projectId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["floor"]>
    composites: {}
  }

  type FloorGetPayload<S extends boolean | null | undefined | FloorDefaultArgs> = $Result.GetResult<Prisma.$FloorPayload, S>

  type FloorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FloorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FloorCountAggregateInputType | true
    }

  export interface FloorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Floor'], meta: { name: 'Floor' } }
    /**
     * Find zero or one Floor that matches the filter.
     * @param {FloorFindUniqueArgs} args - Arguments to find a Floor
     * @example
     * // Get one Floor
     * const floor = await prisma.floor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FloorFindUniqueArgs>(args: SelectSubset<T, FloorFindUniqueArgs<ExtArgs>>): Prisma__FloorClient<$Result.GetResult<Prisma.$FloorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Floor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FloorFindUniqueOrThrowArgs} args - Arguments to find a Floor
     * @example
     * // Get one Floor
     * const floor = await prisma.floor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FloorFindUniqueOrThrowArgs>(args: SelectSubset<T, FloorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FloorClient<$Result.GetResult<Prisma.$FloorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Floor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FloorFindFirstArgs} args - Arguments to find a Floor
     * @example
     * // Get one Floor
     * const floor = await prisma.floor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FloorFindFirstArgs>(args?: SelectSubset<T, FloorFindFirstArgs<ExtArgs>>): Prisma__FloorClient<$Result.GetResult<Prisma.$FloorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Floor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FloorFindFirstOrThrowArgs} args - Arguments to find a Floor
     * @example
     * // Get one Floor
     * const floor = await prisma.floor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FloorFindFirstOrThrowArgs>(args?: SelectSubset<T, FloorFindFirstOrThrowArgs<ExtArgs>>): Prisma__FloorClient<$Result.GetResult<Prisma.$FloorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Floors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FloorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Floors
     * const floors = await prisma.floor.findMany()
     * 
     * // Get first 10 Floors
     * const floors = await prisma.floor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const floorWithIdOnly = await prisma.floor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FloorFindManyArgs>(args?: SelectSubset<T, FloorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FloorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Floor.
     * @param {FloorCreateArgs} args - Arguments to create a Floor.
     * @example
     * // Create one Floor
     * const Floor = await prisma.floor.create({
     *   data: {
     *     // ... data to create a Floor
     *   }
     * })
     * 
     */
    create<T extends FloorCreateArgs>(args: SelectSubset<T, FloorCreateArgs<ExtArgs>>): Prisma__FloorClient<$Result.GetResult<Prisma.$FloorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Floors.
     * @param {FloorCreateManyArgs} args - Arguments to create many Floors.
     * @example
     * // Create many Floors
     * const floor = await prisma.floor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FloorCreateManyArgs>(args?: SelectSubset<T, FloorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Floors and returns the data saved in the database.
     * @param {FloorCreateManyAndReturnArgs} args - Arguments to create many Floors.
     * @example
     * // Create many Floors
     * const floor = await prisma.floor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Floors and only return the `id`
     * const floorWithIdOnly = await prisma.floor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FloorCreateManyAndReturnArgs>(args?: SelectSubset<T, FloorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FloorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Floor.
     * @param {FloorDeleteArgs} args - Arguments to delete one Floor.
     * @example
     * // Delete one Floor
     * const Floor = await prisma.floor.delete({
     *   where: {
     *     // ... filter to delete one Floor
     *   }
     * })
     * 
     */
    delete<T extends FloorDeleteArgs>(args: SelectSubset<T, FloorDeleteArgs<ExtArgs>>): Prisma__FloorClient<$Result.GetResult<Prisma.$FloorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Floor.
     * @param {FloorUpdateArgs} args - Arguments to update one Floor.
     * @example
     * // Update one Floor
     * const floor = await prisma.floor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FloorUpdateArgs>(args: SelectSubset<T, FloorUpdateArgs<ExtArgs>>): Prisma__FloorClient<$Result.GetResult<Prisma.$FloorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Floors.
     * @param {FloorDeleteManyArgs} args - Arguments to filter Floors to delete.
     * @example
     * // Delete a few Floors
     * const { count } = await prisma.floor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FloorDeleteManyArgs>(args?: SelectSubset<T, FloorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Floors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FloorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Floors
     * const floor = await prisma.floor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FloorUpdateManyArgs>(args: SelectSubset<T, FloorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Floors and returns the data updated in the database.
     * @param {FloorUpdateManyAndReturnArgs} args - Arguments to update many Floors.
     * @example
     * // Update many Floors
     * const floor = await prisma.floor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Floors and only return the `id`
     * const floorWithIdOnly = await prisma.floor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FloorUpdateManyAndReturnArgs>(args: SelectSubset<T, FloorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FloorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Floor.
     * @param {FloorUpsertArgs} args - Arguments to update or create a Floor.
     * @example
     * // Update or create a Floor
     * const floor = await prisma.floor.upsert({
     *   create: {
     *     // ... data to create a Floor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Floor we want to update
     *   }
     * })
     */
    upsert<T extends FloorUpsertArgs>(args: SelectSubset<T, FloorUpsertArgs<ExtArgs>>): Prisma__FloorClient<$Result.GetResult<Prisma.$FloorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Floors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FloorCountArgs} args - Arguments to filter Floors to count.
     * @example
     * // Count the number of Floors
     * const count = await prisma.floor.count({
     *   where: {
     *     // ... the filter for the Floors we want to count
     *   }
     * })
    **/
    count<T extends FloorCountArgs>(
      args?: Subset<T, FloorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FloorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Floor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FloorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FloorAggregateArgs>(args: Subset<T, FloorAggregateArgs>): Prisma.PrismaPromise<GetFloorAggregateType<T>>

    /**
     * Group by Floor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FloorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FloorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FloorGroupByArgs['orderBy'] }
        : { orderBy?: FloorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FloorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFloorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Floor model
   */
  readonly fields: FloorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Floor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FloorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assessment<T extends Floor$assessmentArgs<ExtArgs> = {}>(args?: Subset<T, Floor$assessmentArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Floor model
   */
  interface FloorFieldRefs {
    readonly id: FieldRef<"Floor", 'String'>
    readonly name: FieldRef<"Floor", 'String'>
    readonly level: FieldRef<"Floor", 'Float'>
    readonly description: FieldRef<"Floor", 'String'>
    readonly projectId: FieldRef<"Floor", 'String'>
    readonly createdAt: FieldRef<"Floor", 'DateTime'>
    readonly updatedAt: FieldRef<"Floor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Floor findUnique
   */
  export type FloorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Floor
     */
    select?: FloorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Floor
     */
    omit?: FloorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FloorInclude<ExtArgs> | null
    /**
     * Filter, which Floor to fetch.
     */
    where: FloorWhereUniqueInput
  }

  /**
   * Floor findUniqueOrThrow
   */
  export type FloorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Floor
     */
    select?: FloorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Floor
     */
    omit?: FloorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FloorInclude<ExtArgs> | null
    /**
     * Filter, which Floor to fetch.
     */
    where: FloorWhereUniqueInput
  }

  /**
   * Floor findFirst
   */
  export type FloorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Floor
     */
    select?: FloorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Floor
     */
    omit?: FloorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FloorInclude<ExtArgs> | null
    /**
     * Filter, which Floor to fetch.
     */
    where?: FloorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Floors to fetch.
     */
    orderBy?: FloorOrderByWithRelationInput | FloorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Floors.
     */
    cursor?: FloorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Floors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Floors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Floors.
     */
    distinct?: FloorScalarFieldEnum | FloorScalarFieldEnum[]
  }

  /**
   * Floor findFirstOrThrow
   */
  export type FloorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Floor
     */
    select?: FloorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Floor
     */
    omit?: FloorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FloorInclude<ExtArgs> | null
    /**
     * Filter, which Floor to fetch.
     */
    where?: FloorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Floors to fetch.
     */
    orderBy?: FloorOrderByWithRelationInput | FloorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Floors.
     */
    cursor?: FloorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Floors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Floors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Floors.
     */
    distinct?: FloorScalarFieldEnum | FloorScalarFieldEnum[]
  }

  /**
   * Floor findMany
   */
  export type FloorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Floor
     */
    select?: FloorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Floor
     */
    omit?: FloorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FloorInclude<ExtArgs> | null
    /**
     * Filter, which Floors to fetch.
     */
    where?: FloorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Floors to fetch.
     */
    orderBy?: FloorOrderByWithRelationInput | FloorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Floors.
     */
    cursor?: FloorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Floors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Floors.
     */
    skip?: number
    distinct?: FloorScalarFieldEnum | FloorScalarFieldEnum[]
  }

  /**
   * Floor create
   */
  export type FloorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Floor
     */
    select?: FloorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Floor
     */
    omit?: FloorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FloorInclude<ExtArgs> | null
    /**
     * The data needed to create a Floor.
     */
    data: XOR<FloorCreateInput, FloorUncheckedCreateInput>
  }

  /**
   * Floor createMany
   */
  export type FloorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Floors.
     */
    data: FloorCreateManyInput | FloorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Floor createManyAndReturn
   */
  export type FloorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Floor
     */
    select?: FloorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Floor
     */
    omit?: FloorOmit<ExtArgs> | null
    /**
     * The data used to create many Floors.
     */
    data: FloorCreateManyInput | FloorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FloorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Floor update
   */
  export type FloorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Floor
     */
    select?: FloorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Floor
     */
    omit?: FloorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FloorInclude<ExtArgs> | null
    /**
     * The data needed to update a Floor.
     */
    data: XOR<FloorUpdateInput, FloorUncheckedUpdateInput>
    /**
     * Choose, which Floor to update.
     */
    where: FloorWhereUniqueInput
  }

  /**
   * Floor updateMany
   */
  export type FloorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Floors.
     */
    data: XOR<FloorUpdateManyMutationInput, FloorUncheckedUpdateManyInput>
    /**
     * Filter which Floors to update
     */
    where?: FloorWhereInput
    /**
     * Limit how many Floors to update.
     */
    limit?: number
  }

  /**
   * Floor updateManyAndReturn
   */
  export type FloorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Floor
     */
    select?: FloorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Floor
     */
    omit?: FloorOmit<ExtArgs> | null
    /**
     * The data used to update Floors.
     */
    data: XOR<FloorUpdateManyMutationInput, FloorUncheckedUpdateManyInput>
    /**
     * Filter which Floors to update
     */
    where?: FloorWhereInput
    /**
     * Limit how many Floors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FloorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Floor upsert
   */
  export type FloorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Floor
     */
    select?: FloorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Floor
     */
    omit?: FloorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FloorInclude<ExtArgs> | null
    /**
     * The filter to search for the Floor to update in case it exists.
     */
    where: FloorWhereUniqueInput
    /**
     * In case the Floor found by the `where` argument doesn't exist, create a new Floor with this data.
     */
    create: XOR<FloorCreateInput, FloorUncheckedCreateInput>
    /**
     * In case the Floor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FloorUpdateInput, FloorUncheckedUpdateInput>
  }

  /**
   * Floor delete
   */
  export type FloorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Floor
     */
    select?: FloorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Floor
     */
    omit?: FloorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FloorInclude<ExtArgs> | null
    /**
     * Filter which Floor to delete.
     */
    where: FloorWhereUniqueInput
  }

  /**
   * Floor deleteMany
   */
  export type FloorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Floors to delete
     */
    where?: FloorWhereInput
    /**
     * Limit how many Floors to delete.
     */
    limit?: number
  }

  /**
   * Floor.assessment
   */
  export type Floor$assessmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    where?: AssessmentWhereInput
  }

  /**
   * Floor without action
   */
  export type FloorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Floor
     */
    select?: FloorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Floor
     */
    omit?: FloorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FloorInclude<ExtArgs> | null
  }


  /**
   * Model Assessment
   */

  export type AggregateAssessment = {
    _count: AssessmentCountAggregateOutputType | null
    _min: AssessmentMinAggregateOutputType | null
    _max: AssessmentMaxAggregateOutputType | null
  }

  export type AssessmentMinAggregateOutputType = {
    id: string | null
    floorId: string | null
    updatedAt: Date | null
  }

  export type AssessmentMaxAggregateOutputType = {
    id: string | null
    floorId: string | null
    updatedAt: Date | null
  }

  export type AssessmentCountAggregateOutputType = {
    id: number
    floorId: number
    updatedAt: number
    _all: number
  }


  export type AssessmentMinAggregateInputType = {
    id?: true
    floorId?: true
    updatedAt?: true
  }

  export type AssessmentMaxAggregateInputType = {
    id?: true
    floorId?: true
    updatedAt?: true
  }

  export type AssessmentCountAggregateInputType = {
    id?: true
    floorId?: true
    updatedAt?: true
    _all?: true
  }

  export type AssessmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assessment to aggregate.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assessments
    **/
    _count?: true | AssessmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssessmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssessmentMaxAggregateInputType
  }

  export type GetAssessmentAggregateType<T extends AssessmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAssessment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssessment[P]>
      : GetScalarType<T[P], AggregateAssessment[P]>
  }




  export type AssessmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentWhereInput
    orderBy?: AssessmentOrderByWithAggregationInput | AssessmentOrderByWithAggregationInput[]
    by: AssessmentScalarFieldEnum[] | AssessmentScalarFieldEnum
    having?: AssessmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssessmentCountAggregateInputType | true
    _min?: AssessmentMinAggregateInputType
    _max?: AssessmentMaxAggregateInputType
  }

  export type AssessmentGroupByOutputType = {
    id: string
    floorId: string
    updatedAt: Date
    _count: AssessmentCountAggregateOutputType | null
    _min: AssessmentMinAggregateOutputType | null
    _max: AssessmentMaxAggregateOutputType | null
  }

  type GetAssessmentGroupByPayload<T extends AssessmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssessmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssessmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssessmentGroupByOutputType[P]>
            : GetScalarType<T[P], AssessmentGroupByOutputType[P]>
        }
      >
    >


  export type AssessmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    floorId?: boolean
    updatedAt?: boolean
    floor?: boolean | FloorDefaultArgs<ExtArgs>
    riskFactors?: boolean | Assessment$riskFactorsArgs<ExtArgs>
    acceptanceFactors?: boolean | Assessment$acceptanceFactorsArgs<ExtArgs>
    protectionFactors?: boolean | Assessment$protectionFactorsArgs<ExtArgs>
    finalRisks?: boolean | Assessment$finalRisksArgs<ExtArgs>
  }, ExtArgs["result"]["assessment"]>

  export type AssessmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    floorId?: boolean
    updatedAt?: boolean
    floor?: boolean | FloorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessment"]>

  export type AssessmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    floorId?: boolean
    updatedAt?: boolean
    floor?: boolean | FloorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessment"]>

  export type AssessmentSelectScalar = {
    id?: boolean
    floorId?: boolean
    updatedAt?: boolean
  }

  export type AssessmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "floorId" | "updatedAt", ExtArgs["result"]["assessment"]>
  export type AssessmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    floor?: boolean | FloorDefaultArgs<ExtArgs>
    riskFactors?: boolean | Assessment$riskFactorsArgs<ExtArgs>
    acceptanceFactors?: boolean | Assessment$acceptanceFactorsArgs<ExtArgs>
    protectionFactors?: boolean | Assessment$protectionFactorsArgs<ExtArgs>
    finalRisks?: boolean | Assessment$finalRisksArgs<ExtArgs>
  }
  export type AssessmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    floor?: boolean | FloorDefaultArgs<ExtArgs>
  }
  export type AssessmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    floor?: boolean | FloorDefaultArgs<ExtArgs>
  }

  export type $AssessmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Assessment"
    objects: {
      floor: Prisma.$FloorPayload<ExtArgs>
      riskFactors: Prisma.$AssessmentRiskFactorsPayload<ExtArgs> | null
      acceptanceFactors: Prisma.$AssessmentAcceptanceFactorsPayload<ExtArgs> | null
      protectionFactors: Prisma.$AssessmentProtectionFactorsPayload<ExtArgs> | null
      finalRisks: Prisma.$AssessmentFinalRisksPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      floorId: string
      updatedAt: Date
    }, ExtArgs["result"]["assessment"]>
    composites: {}
  }

  type AssessmentGetPayload<S extends boolean | null | undefined | AssessmentDefaultArgs> = $Result.GetResult<Prisma.$AssessmentPayload, S>

  type AssessmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssessmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssessmentCountAggregateInputType | true
    }

  export interface AssessmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Assessment'], meta: { name: 'Assessment' } }
    /**
     * Find zero or one Assessment that matches the filter.
     * @param {AssessmentFindUniqueArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssessmentFindUniqueArgs>(args: SelectSubset<T, AssessmentFindUniqueArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Assessment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssessmentFindUniqueOrThrowArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssessmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AssessmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assessment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFindFirstArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssessmentFindFirstArgs>(args?: SelectSubset<T, AssessmentFindFirstArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assessment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFindFirstOrThrowArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssessmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AssessmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assessments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assessments
     * const assessments = await prisma.assessment.findMany()
     * 
     * // Get first 10 Assessments
     * const assessments = await prisma.assessment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assessmentWithIdOnly = await prisma.assessment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssessmentFindManyArgs>(args?: SelectSubset<T, AssessmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Assessment.
     * @param {AssessmentCreateArgs} args - Arguments to create a Assessment.
     * @example
     * // Create one Assessment
     * const Assessment = await prisma.assessment.create({
     *   data: {
     *     // ... data to create a Assessment
     *   }
     * })
     * 
     */
    create<T extends AssessmentCreateArgs>(args: SelectSubset<T, AssessmentCreateArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Assessments.
     * @param {AssessmentCreateManyArgs} args - Arguments to create many Assessments.
     * @example
     * // Create many Assessments
     * const assessment = await prisma.assessment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssessmentCreateManyArgs>(args?: SelectSubset<T, AssessmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Assessments and returns the data saved in the database.
     * @param {AssessmentCreateManyAndReturnArgs} args - Arguments to create many Assessments.
     * @example
     * // Create many Assessments
     * const assessment = await prisma.assessment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Assessments and only return the `id`
     * const assessmentWithIdOnly = await prisma.assessment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssessmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AssessmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Assessment.
     * @param {AssessmentDeleteArgs} args - Arguments to delete one Assessment.
     * @example
     * // Delete one Assessment
     * const Assessment = await prisma.assessment.delete({
     *   where: {
     *     // ... filter to delete one Assessment
     *   }
     * })
     * 
     */
    delete<T extends AssessmentDeleteArgs>(args: SelectSubset<T, AssessmentDeleteArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Assessment.
     * @param {AssessmentUpdateArgs} args - Arguments to update one Assessment.
     * @example
     * // Update one Assessment
     * const assessment = await prisma.assessment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssessmentUpdateArgs>(args: SelectSubset<T, AssessmentUpdateArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Assessments.
     * @param {AssessmentDeleteManyArgs} args - Arguments to filter Assessments to delete.
     * @example
     * // Delete a few Assessments
     * const { count } = await prisma.assessment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssessmentDeleteManyArgs>(args?: SelectSubset<T, AssessmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assessments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assessments
     * const assessment = await prisma.assessment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssessmentUpdateManyArgs>(args: SelectSubset<T, AssessmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assessments and returns the data updated in the database.
     * @param {AssessmentUpdateManyAndReturnArgs} args - Arguments to update many Assessments.
     * @example
     * // Update many Assessments
     * const assessment = await prisma.assessment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Assessments and only return the `id`
     * const assessmentWithIdOnly = await prisma.assessment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AssessmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AssessmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Assessment.
     * @param {AssessmentUpsertArgs} args - Arguments to update or create a Assessment.
     * @example
     * // Update or create a Assessment
     * const assessment = await prisma.assessment.upsert({
     *   create: {
     *     // ... data to create a Assessment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assessment we want to update
     *   }
     * })
     */
    upsert<T extends AssessmentUpsertArgs>(args: SelectSubset<T, AssessmentUpsertArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Assessments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentCountArgs} args - Arguments to filter Assessments to count.
     * @example
     * // Count the number of Assessments
     * const count = await prisma.assessment.count({
     *   where: {
     *     // ... the filter for the Assessments we want to count
     *   }
     * })
    **/
    count<T extends AssessmentCountArgs>(
      args?: Subset<T, AssessmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssessmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Assessment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssessmentAggregateArgs>(args: Subset<T, AssessmentAggregateArgs>): Prisma.PrismaPromise<GetAssessmentAggregateType<T>>

    /**
     * Group by Assessment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssessmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssessmentGroupByArgs['orderBy'] }
        : { orderBy?: AssessmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssessmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssessmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Assessment model
   */
  readonly fields: AssessmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Assessment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssessmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    floor<T extends FloorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FloorDefaultArgs<ExtArgs>>): Prisma__FloorClient<$Result.GetResult<Prisma.$FloorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    riskFactors<T extends Assessment$riskFactorsArgs<ExtArgs> = {}>(args?: Subset<T, Assessment$riskFactorsArgs<ExtArgs>>): Prisma__AssessmentRiskFactorsClient<$Result.GetResult<Prisma.$AssessmentRiskFactorsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    acceptanceFactors<T extends Assessment$acceptanceFactorsArgs<ExtArgs> = {}>(args?: Subset<T, Assessment$acceptanceFactorsArgs<ExtArgs>>): Prisma__AssessmentAcceptanceFactorsClient<$Result.GetResult<Prisma.$AssessmentAcceptanceFactorsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    protectionFactors<T extends Assessment$protectionFactorsArgs<ExtArgs> = {}>(args?: Subset<T, Assessment$protectionFactorsArgs<ExtArgs>>): Prisma__AssessmentProtectionFactorsClient<$Result.GetResult<Prisma.$AssessmentProtectionFactorsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    finalRisks<T extends Assessment$finalRisksArgs<ExtArgs> = {}>(args?: Subset<T, Assessment$finalRisksArgs<ExtArgs>>): Prisma__AssessmentFinalRisksClient<$Result.GetResult<Prisma.$AssessmentFinalRisksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Assessment model
   */
  interface AssessmentFieldRefs {
    readonly id: FieldRef<"Assessment", 'String'>
    readonly floorId: FieldRef<"Assessment", 'String'>
    readonly updatedAt: FieldRef<"Assessment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Assessment findUnique
   */
  export type AssessmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment findUniqueOrThrow
   */
  export type AssessmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment findFirst
   */
  export type AssessmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assessments.
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assessments.
     */
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * Assessment findFirstOrThrow
   */
  export type AssessmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assessments.
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assessments.
     */
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * Assessment findMany
   */
  export type AssessmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessments to fetch.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assessments.
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * Assessment create
   */
  export type AssessmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Assessment.
     */
    data: XOR<AssessmentCreateInput, AssessmentUncheckedCreateInput>
  }

  /**
   * Assessment createMany
   */
  export type AssessmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assessments.
     */
    data: AssessmentCreateManyInput | AssessmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Assessment createManyAndReturn
   */
  export type AssessmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * The data used to create many Assessments.
     */
    data: AssessmentCreateManyInput | AssessmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assessment update
   */
  export type AssessmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Assessment.
     */
    data: XOR<AssessmentUpdateInput, AssessmentUncheckedUpdateInput>
    /**
     * Choose, which Assessment to update.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment updateMany
   */
  export type AssessmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assessments.
     */
    data: XOR<AssessmentUpdateManyMutationInput, AssessmentUncheckedUpdateManyInput>
    /**
     * Filter which Assessments to update
     */
    where?: AssessmentWhereInput
    /**
     * Limit how many Assessments to update.
     */
    limit?: number
  }

  /**
   * Assessment updateManyAndReturn
   */
  export type AssessmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * The data used to update Assessments.
     */
    data: XOR<AssessmentUpdateManyMutationInput, AssessmentUncheckedUpdateManyInput>
    /**
     * Filter which Assessments to update
     */
    where?: AssessmentWhereInput
    /**
     * Limit how many Assessments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assessment upsert
   */
  export type AssessmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Assessment to update in case it exists.
     */
    where: AssessmentWhereUniqueInput
    /**
     * In case the Assessment found by the `where` argument doesn't exist, create a new Assessment with this data.
     */
    create: XOR<AssessmentCreateInput, AssessmentUncheckedCreateInput>
    /**
     * In case the Assessment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssessmentUpdateInput, AssessmentUncheckedUpdateInput>
  }

  /**
   * Assessment delete
   */
  export type AssessmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter which Assessment to delete.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment deleteMany
   */
  export type AssessmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assessments to delete
     */
    where?: AssessmentWhereInput
    /**
     * Limit how many Assessments to delete.
     */
    limit?: number
  }

  /**
   * Assessment.riskFactors
   */
  export type Assessment$riskFactorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentRiskFactors
     */
    select?: AssessmentRiskFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentRiskFactors
     */
    omit?: AssessmentRiskFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentRiskFactorsInclude<ExtArgs> | null
    where?: AssessmentRiskFactorsWhereInput
  }

  /**
   * Assessment.acceptanceFactors
   */
  export type Assessment$acceptanceFactorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentAcceptanceFactors
     */
    select?: AssessmentAcceptanceFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentAcceptanceFactors
     */
    omit?: AssessmentAcceptanceFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentAcceptanceFactorsInclude<ExtArgs> | null
    where?: AssessmentAcceptanceFactorsWhereInput
  }

  /**
   * Assessment.protectionFactors
   */
  export type Assessment$protectionFactorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentProtectionFactors
     */
    select?: AssessmentProtectionFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentProtectionFactors
     */
    omit?: AssessmentProtectionFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentProtectionFactorsInclude<ExtArgs> | null
    where?: AssessmentProtectionFactorsWhereInput
  }

  /**
   * Assessment.finalRisks
   */
  export type Assessment$finalRisksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentFinalRisks
     */
    select?: AssessmentFinalRisksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentFinalRisks
     */
    omit?: AssessmentFinalRisksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentFinalRisksInclude<ExtArgs> | null
    where?: AssessmentFinalRisksWhereInput
  }

  /**
   * Assessment without action
   */
  export type AssessmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
  }


  /**
   * Model AssessmentRiskFactors
   */

  export type AggregateAssessmentRiskFactors = {
    _count: AssessmentRiskFactorsCountAggregateOutputType | null
    _avg: AssessmentRiskFactorsAvgAggregateOutputType | null
    _sum: AssessmentRiskFactorsSumAggregateOutputType | null
    _min: AssessmentRiskFactorsMinAggregateOutputType | null
    _max: AssessmentRiskFactorsMaxAggregateOutputType | null
  }

  export type AssessmentRiskFactorsAvgAggregateOutputType = {
    qi: number | null
    qm: number | null
    tempDestruction: number | null
    avgDimension: number | null
    materialClass: number | null
    length: number | null
    width: number | null
    area: number | null
    height: number | null
    windowArea: number | null
    staticVentArea: number | null
    mechVentFlow: number | null
    ventingRatio_k: number | null
    accessSides: number | null
    heightAbove: number | null
    depthBelow: number | null
    floorLevel: number | null
    factor_q: number | null
    factor_i: number | null
    factor_g: number | null
    factor_e: number | null
    factor_v: number | null
    factor_z: number | null
    risk_P: number | null
    risk_P1: number | null
    risk_P2: number | null
  }

  export type AssessmentRiskFactorsSumAggregateOutputType = {
    qi: number | null
    qm: number | null
    tempDestruction: number | null
    avgDimension: number | null
    materialClass: number | null
    length: number | null
    width: number | null
    area: number | null
    height: number | null
    windowArea: number | null
    staticVentArea: number | null
    mechVentFlow: number | null
    ventingRatio_k: number | null
    accessSides: number | null
    heightAbove: number | null
    depthBelow: number | null
    floorLevel: number | null
    factor_q: number | null
    factor_i: number | null
    factor_g: number | null
    factor_e: number | null
    factor_v: number | null
    factor_z: number | null
    risk_P: number | null
    risk_P1: number | null
    risk_P2: number | null
  }

  export type AssessmentRiskFactorsMinAggregateOutputType = {
    id: string | null
    assessmentId: string | null
    qi: number | null
    qm: number | null
    tempDestruction: number | null
    tempDestructionMulti: string | null
    avgDimension: number | null
    materialClass: number | null
    materialClassMulti: string | null
    length: number | null
    width: number | null
    area: number | null
    height: number | null
    accessType: string | null
    windowArea: number | null
    staticVentArea: number | null
    mechVentFlow: number | null
    ventingRatio_k: number | null
    accessSides: number | null
    heightAbove: number | null
    depthBelow: number | null
    floorLevel: number | null
    factor_q: number | null
    factor_i: number | null
    factor_g: number | null
    factor_e: number | null
    factor_v: number | null
    factor_z: number | null
    risk_P: number | null
    risk_P1: number | null
    risk_P2: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssessmentRiskFactorsMaxAggregateOutputType = {
    id: string | null
    assessmentId: string | null
    qi: number | null
    qm: number | null
    tempDestruction: number | null
    tempDestructionMulti: string | null
    avgDimension: number | null
    materialClass: number | null
    materialClassMulti: string | null
    length: number | null
    width: number | null
    area: number | null
    height: number | null
    accessType: string | null
    windowArea: number | null
    staticVentArea: number | null
    mechVentFlow: number | null
    ventingRatio_k: number | null
    accessSides: number | null
    heightAbove: number | null
    depthBelow: number | null
    floorLevel: number | null
    factor_q: number | null
    factor_i: number | null
    factor_g: number | null
    factor_e: number | null
    factor_v: number | null
    factor_z: number | null
    risk_P: number | null
    risk_P1: number | null
    risk_P2: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssessmentRiskFactorsCountAggregateOutputType = {
    id: number
    assessmentId: number
    qi: number
    qm: number
    tempDestruction: number
    tempDestructionMulti: number
    avgDimension: number
    materialClass: number
    materialClassMulti: number
    length: number
    width: number
    area: number
    height: number
    accessType: number
    windowArea: number
    staticVentArea: number
    mechVentFlow: number
    ventingRatio_k: number
    accessSides: number
    heightAbove: number
    depthBelow: number
    floorLevel: number
    factor_q: number
    factor_i: number
    factor_g: number
    factor_e: number
    factor_v: number
    factor_z: number
    risk_P: number
    risk_P1: number
    risk_P2: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AssessmentRiskFactorsAvgAggregateInputType = {
    qi?: true
    qm?: true
    tempDestruction?: true
    avgDimension?: true
    materialClass?: true
    length?: true
    width?: true
    area?: true
    height?: true
    windowArea?: true
    staticVentArea?: true
    mechVentFlow?: true
    ventingRatio_k?: true
    accessSides?: true
    heightAbove?: true
    depthBelow?: true
    floorLevel?: true
    factor_q?: true
    factor_i?: true
    factor_g?: true
    factor_e?: true
    factor_v?: true
    factor_z?: true
    risk_P?: true
    risk_P1?: true
    risk_P2?: true
  }

  export type AssessmentRiskFactorsSumAggregateInputType = {
    qi?: true
    qm?: true
    tempDestruction?: true
    avgDimension?: true
    materialClass?: true
    length?: true
    width?: true
    area?: true
    height?: true
    windowArea?: true
    staticVentArea?: true
    mechVentFlow?: true
    ventingRatio_k?: true
    accessSides?: true
    heightAbove?: true
    depthBelow?: true
    floorLevel?: true
    factor_q?: true
    factor_i?: true
    factor_g?: true
    factor_e?: true
    factor_v?: true
    factor_z?: true
    risk_P?: true
    risk_P1?: true
    risk_P2?: true
  }

  export type AssessmentRiskFactorsMinAggregateInputType = {
    id?: true
    assessmentId?: true
    qi?: true
    qm?: true
    tempDestruction?: true
    tempDestructionMulti?: true
    avgDimension?: true
    materialClass?: true
    materialClassMulti?: true
    length?: true
    width?: true
    area?: true
    height?: true
    accessType?: true
    windowArea?: true
    staticVentArea?: true
    mechVentFlow?: true
    ventingRatio_k?: true
    accessSides?: true
    heightAbove?: true
    depthBelow?: true
    floorLevel?: true
    factor_q?: true
    factor_i?: true
    factor_g?: true
    factor_e?: true
    factor_v?: true
    factor_z?: true
    risk_P?: true
    risk_P1?: true
    risk_P2?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssessmentRiskFactorsMaxAggregateInputType = {
    id?: true
    assessmentId?: true
    qi?: true
    qm?: true
    tempDestruction?: true
    tempDestructionMulti?: true
    avgDimension?: true
    materialClass?: true
    materialClassMulti?: true
    length?: true
    width?: true
    area?: true
    height?: true
    accessType?: true
    windowArea?: true
    staticVentArea?: true
    mechVentFlow?: true
    ventingRatio_k?: true
    accessSides?: true
    heightAbove?: true
    depthBelow?: true
    floorLevel?: true
    factor_q?: true
    factor_i?: true
    factor_g?: true
    factor_e?: true
    factor_v?: true
    factor_z?: true
    risk_P?: true
    risk_P1?: true
    risk_P2?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssessmentRiskFactorsCountAggregateInputType = {
    id?: true
    assessmentId?: true
    qi?: true
    qm?: true
    tempDestruction?: true
    tempDestructionMulti?: true
    avgDimension?: true
    materialClass?: true
    materialClassMulti?: true
    length?: true
    width?: true
    area?: true
    height?: true
    accessType?: true
    windowArea?: true
    staticVentArea?: true
    mechVentFlow?: true
    ventingRatio_k?: true
    accessSides?: true
    heightAbove?: true
    depthBelow?: true
    floorLevel?: true
    factor_q?: true
    factor_i?: true
    factor_g?: true
    factor_e?: true
    factor_v?: true
    factor_z?: true
    risk_P?: true
    risk_P1?: true
    risk_P2?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AssessmentRiskFactorsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssessmentRiskFactors to aggregate.
     */
    where?: AssessmentRiskFactorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentRiskFactors to fetch.
     */
    orderBy?: AssessmentRiskFactorsOrderByWithRelationInput | AssessmentRiskFactorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssessmentRiskFactorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentRiskFactors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentRiskFactors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AssessmentRiskFactors
    **/
    _count?: true | AssessmentRiskFactorsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssessmentRiskFactorsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssessmentRiskFactorsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssessmentRiskFactorsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssessmentRiskFactorsMaxAggregateInputType
  }

  export type GetAssessmentRiskFactorsAggregateType<T extends AssessmentRiskFactorsAggregateArgs> = {
        [P in keyof T & keyof AggregateAssessmentRiskFactors]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssessmentRiskFactors[P]>
      : GetScalarType<T[P], AggregateAssessmentRiskFactors[P]>
  }




  export type AssessmentRiskFactorsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentRiskFactorsWhereInput
    orderBy?: AssessmentRiskFactorsOrderByWithAggregationInput | AssessmentRiskFactorsOrderByWithAggregationInput[]
    by: AssessmentRiskFactorsScalarFieldEnum[] | AssessmentRiskFactorsScalarFieldEnum
    having?: AssessmentRiskFactorsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssessmentRiskFactorsCountAggregateInputType | true
    _avg?: AssessmentRiskFactorsAvgAggregateInputType
    _sum?: AssessmentRiskFactorsSumAggregateInputType
    _min?: AssessmentRiskFactorsMinAggregateInputType
    _max?: AssessmentRiskFactorsMaxAggregateInputType
  }

  export type AssessmentRiskFactorsGroupByOutputType = {
    id: string
    assessmentId: string
    qi: number | null
    qm: number | null
    tempDestruction: number | null
    tempDestructionMulti: string | null
    avgDimension: number | null
    materialClass: number | null
    materialClassMulti: string | null
    length: number | null
    width: number | null
    area: number | null
    height: number | null
    accessType: string | null
    windowArea: number | null
    staticVentArea: number | null
    mechVentFlow: number | null
    ventingRatio_k: number | null
    accessSides: number | null
    heightAbove: number | null
    depthBelow: number | null
    floorLevel: number | null
    factor_q: number | null
    factor_i: number | null
    factor_g: number | null
    factor_e: number | null
    factor_v: number | null
    factor_z: number | null
    risk_P: number | null
    risk_P1: number | null
    risk_P2: number | null
    createdAt: Date
    updatedAt: Date
    _count: AssessmentRiskFactorsCountAggregateOutputType | null
    _avg: AssessmentRiskFactorsAvgAggregateOutputType | null
    _sum: AssessmentRiskFactorsSumAggregateOutputType | null
    _min: AssessmentRiskFactorsMinAggregateOutputType | null
    _max: AssessmentRiskFactorsMaxAggregateOutputType | null
  }

  type GetAssessmentRiskFactorsGroupByPayload<T extends AssessmentRiskFactorsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssessmentRiskFactorsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssessmentRiskFactorsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssessmentRiskFactorsGroupByOutputType[P]>
            : GetScalarType<T[P], AssessmentRiskFactorsGroupByOutputType[P]>
        }
      >
    >


  export type AssessmentRiskFactorsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assessmentId?: boolean
    qi?: boolean
    qm?: boolean
    tempDestruction?: boolean
    tempDestructionMulti?: boolean
    avgDimension?: boolean
    materialClass?: boolean
    materialClassMulti?: boolean
    length?: boolean
    width?: boolean
    area?: boolean
    height?: boolean
    accessType?: boolean
    windowArea?: boolean
    staticVentArea?: boolean
    mechVentFlow?: boolean
    ventingRatio_k?: boolean
    accessSides?: boolean
    heightAbove?: boolean
    depthBelow?: boolean
    floorLevel?: boolean
    factor_q?: boolean
    factor_i?: boolean
    factor_g?: boolean
    factor_e?: boolean
    factor_v?: boolean
    factor_z?: boolean
    risk_P?: boolean
    risk_P1?: boolean
    risk_P2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessmentRiskFactors"]>

  export type AssessmentRiskFactorsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assessmentId?: boolean
    qi?: boolean
    qm?: boolean
    tempDestruction?: boolean
    tempDestructionMulti?: boolean
    avgDimension?: boolean
    materialClass?: boolean
    materialClassMulti?: boolean
    length?: boolean
    width?: boolean
    area?: boolean
    height?: boolean
    accessType?: boolean
    windowArea?: boolean
    staticVentArea?: boolean
    mechVentFlow?: boolean
    ventingRatio_k?: boolean
    accessSides?: boolean
    heightAbove?: boolean
    depthBelow?: boolean
    floorLevel?: boolean
    factor_q?: boolean
    factor_i?: boolean
    factor_g?: boolean
    factor_e?: boolean
    factor_v?: boolean
    factor_z?: boolean
    risk_P?: boolean
    risk_P1?: boolean
    risk_P2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessmentRiskFactors"]>

  export type AssessmentRiskFactorsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assessmentId?: boolean
    qi?: boolean
    qm?: boolean
    tempDestruction?: boolean
    tempDestructionMulti?: boolean
    avgDimension?: boolean
    materialClass?: boolean
    materialClassMulti?: boolean
    length?: boolean
    width?: boolean
    area?: boolean
    height?: boolean
    accessType?: boolean
    windowArea?: boolean
    staticVentArea?: boolean
    mechVentFlow?: boolean
    ventingRatio_k?: boolean
    accessSides?: boolean
    heightAbove?: boolean
    depthBelow?: boolean
    floorLevel?: boolean
    factor_q?: boolean
    factor_i?: boolean
    factor_g?: boolean
    factor_e?: boolean
    factor_v?: boolean
    factor_z?: boolean
    risk_P?: boolean
    risk_P1?: boolean
    risk_P2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessmentRiskFactors"]>

  export type AssessmentRiskFactorsSelectScalar = {
    id?: boolean
    assessmentId?: boolean
    qi?: boolean
    qm?: boolean
    tempDestruction?: boolean
    tempDestructionMulti?: boolean
    avgDimension?: boolean
    materialClass?: boolean
    materialClassMulti?: boolean
    length?: boolean
    width?: boolean
    area?: boolean
    height?: boolean
    accessType?: boolean
    windowArea?: boolean
    staticVentArea?: boolean
    mechVentFlow?: boolean
    ventingRatio_k?: boolean
    accessSides?: boolean
    heightAbove?: boolean
    depthBelow?: boolean
    floorLevel?: boolean
    factor_q?: boolean
    factor_i?: boolean
    factor_g?: boolean
    factor_e?: boolean
    factor_v?: boolean
    factor_z?: boolean
    risk_P?: boolean
    risk_P1?: boolean
    risk_P2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AssessmentRiskFactorsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "assessmentId" | "qi" | "qm" | "tempDestruction" | "tempDestructionMulti" | "avgDimension" | "materialClass" | "materialClassMulti" | "length" | "width" | "area" | "height" | "accessType" | "windowArea" | "staticVentArea" | "mechVentFlow" | "ventingRatio_k" | "accessSides" | "heightAbove" | "depthBelow" | "floorLevel" | "factor_q" | "factor_i" | "factor_g" | "factor_e" | "factor_v" | "factor_z" | "risk_P" | "risk_P1" | "risk_P2" | "createdAt" | "updatedAt", ExtArgs["result"]["assessmentRiskFactors"]>
  export type AssessmentRiskFactorsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }
  export type AssessmentRiskFactorsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }
  export type AssessmentRiskFactorsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }

  export type $AssessmentRiskFactorsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AssessmentRiskFactors"
    objects: {
      assessment: Prisma.$AssessmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      assessmentId: string
      qi: number | null
      qm: number | null
      tempDestruction: number | null
      tempDestructionMulti: string | null
      avgDimension: number | null
      materialClass: number | null
      materialClassMulti: string | null
      length: number | null
      width: number | null
      area: number | null
      height: number | null
      accessType: string | null
      windowArea: number | null
      staticVentArea: number | null
      mechVentFlow: number | null
      ventingRatio_k: number | null
      accessSides: number | null
      heightAbove: number | null
      depthBelow: number | null
      floorLevel: number | null
      factor_q: number | null
      factor_i: number | null
      factor_g: number | null
      factor_e: number | null
      factor_v: number | null
      factor_z: number | null
      risk_P: number | null
      risk_P1: number | null
      risk_P2: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["assessmentRiskFactors"]>
    composites: {}
  }

  type AssessmentRiskFactorsGetPayload<S extends boolean | null | undefined | AssessmentRiskFactorsDefaultArgs> = $Result.GetResult<Prisma.$AssessmentRiskFactorsPayload, S>

  type AssessmentRiskFactorsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssessmentRiskFactorsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssessmentRiskFactorsCountAggregateInputType | true
    }

  export interface AssessmentRiskFactorsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AssessmentRiskFactors'], meta: { name: 'AssessmentRiskFactors' } }
    /**
     * Find zero or one AssessmentRiskFactors that matches the filter.
     * @param {AssessmentRiskFactorsFindUniqueArgs} args - Arguments to find a AssessmentRiskFactors
     * @example
     * // Get one AssessmentRiskFactors
     * const assessmentRiskFactors = await prisma.assessmentRiskFactors.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssessmentRiskFactorsFindUniqueArgs>(args: SelectSubset<T, AssessmentRiskFactorsFindUniqueArgs<ExtArgs>>): Prisma__AssessmentRiskFactorsClient<$Result.GetResult<Prisma.$AssessmentRiskFactorsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AssessmentRiskFactors that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssessmentRiskFactorsFindUniqueOrThrowArgs} args - Arguments to find a AssessmentRiskFactors
     * @example
     * // Get one AssessmentRiskFactors
     * const assessmentRiskFactors = await prisma.assessmentRiskFactors.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssessmentRiskFactorsFindUniqueOrThrowArgs>(args: SelectSubset<T, AssessmentRiskFactorsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssessmentRiskFactorsClient<$Result.GetResult<Prisma.$AssessmentRiskFactorsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssessmentRiskFactors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentRiskFactorsFindFirstArgs} args - Arguments to find a AssessmentRiskFactors
     * @example
     * // Get one AssessmentRiskFactors
     * const assessmentRiskFactors = await prisma.assessmentRiskFactors.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssessmentRiskFactorsFindFirstArgs>(args?: SelectSubset<T, AssessmentRiskFactorsFindFirstArgs<ExtArgs>>): Prisma__AssessmentRiskFactorsClient<$Result.GetResult<Prisma.$AssessmentRiskFactorsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssessmentRiskFactors that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentRiskFactorsFindFirstOrThrowArgs} args - Arguments to find a AssessmentRiskFactors
     * @example
     * // Get one AssessmentRiskFactors
     * const assessmentRiskFactors = await prisma.assessmentRiskFactors.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssessmentRiskFactorsFindFirstOrThrowArgs>(args?: SelectSubset<T, AssessmentRiskFactorsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssessmentRiskFactorsClient<$Result.GetResult<Prisma.$AssessmentRiskFactorsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AssessmentRiskFactors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentRiskFactorsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AssessmentRiskFactors
     * const assessmentRiskFactors = await prisma.assessmentRiskFactors.findMany()
     * 
     * // Get first 10 AssessmentRiskFactors
     * const assessmentRiskFactors = await prisma.assessmentRiskFactors.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assessmentRiskFactorsWithIdOnly = await prisma.assessmentRiskFactors.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssessmentRiskFactorsFindManyArgs>(args?: SelectSubset<T, AssessmentRiskFactorsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentRiskFactorsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AssessmentRiskFactors.
     * @param {AssessmentRiskFactorsCreateArgs} args - Arguments to create a AssessmentRiskFactors.
     * @example
     * // Create one AssessmentRiskFactors
     * const AssessmentRiskFactors = await prisma.assessmentRiskFactors.create({
     *   data: {
     *     // ... data to create a AssessmentRiskFactors
     *   }
     * })
     * 
     */
    create<T extends AssessmentRiskFactorsCreateArgs>(args: SelectSubset<T, AssessmentRiskFactorsCreateArgs<ExtArgs>>): Prisma__AssessmentRiskFactorsClient<$Result.GetResult<Prisma.$AssessmentRiskFactorsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AssessmentRiskFactors.
     * @param {AssessmentRiskFactorsCreateManyArgs} args - Arguments to create many AssessmentRiskFactors.
     * @example
     * // Create many AssessmentRiskFactors
     * const assessmentRiskFactors = await prisma.assessmentRiskFactors.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssessmentRiskFactorsCreateManyArgs>(args?: SelectSubset<T, AssessmentRiskFactorsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AssessmentRiskFactors and returns the data saved in the database.
     * @param {AssessmentRiskFactorsCreateManyAndReturnArgs} args - Arguments to create many AssessmentRiskFactors.
     * @example
     * // Create many AssessmentRiskFactors
     * const assessmentRiskFactors = await prisma.assessmentRiskFactors.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AssessmentRiskFactors and only return the `id`
     * const assessmentRiskFactorsWithIdOnly = await prisma.assessmentRiskFactors.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssessmentRiskFactorsCreateManyAndReturnArgs>(args?: SelectSubset<T, AssessmentRiskFactorsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentRiskFactorsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AssessmentRiskFactors.
     * @param {AssessmentRiskFactorsDeleteArgs} args - Arguments to delete one AssessmentRiskFactors.
     * @example
     * // Delete one AssessmentRiskFactors
     * const AssessmentRiskFactors = await prisma.assessmentRiskFactors.delete({
     *   where: {
     *     // ... filter to delete one AssessmentRiskFactors
     *   }
     * })
     * 
     */
    delete<T extends AssessmentRiskFactorsDeleteArgs>(args: SelectSubset<T, AssessmentRiskFactorsDeleteArgs<ExtArgs>>): Prisma__AssessmentRiskFactorsClient<$Result.GetResult<Prisma.$AssessmentRiskFactorsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AssessmentRiskFactors.
     * @param {AssessmentRiskFactorsUpdateArgs} args - Arguments to update one AssessmentRiskFactors.
     * @example
     * // Update one AssessmentRiskFactors
     * const assessmentRiskFactors = await prisma.assessmentRiskFactors.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssessmentRiskFactorsUpdateArgs>(args: SelectSubset<T, AssessmentRiskFactorsUpdateArgs<ExtArgs>>): Prisma__AssessmentRiskFactorsClient<$Result.GetResult<Prisma.$AssessmentRiskFactorsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AssessmentRiskFactors.
     * @param {AssessmentRiskFactorsDeleteManyArgs} args - Arguments to filter AssessmentRiskFactors to delete.
     * @example
     * // Delete a few AssessmentRiskFactors
     * const { count } = await prisma.assessmentRiskFactors.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssessmentRiskFactorsDeleteManyArgs>(args?: SelectSubset<T, AssessmentRiskFactorsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssessmentRiskFactors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentRiskFactorsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AssessmentRiskFactors
     * const assessmentRiskFactors = await prisma.assessmentRiskFactors.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssessmentRiskFactorsUpdateManyArgs>(args: SelectSubset<T, AssessmentRiskFactorsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssessmentRiskFactors and returns the data updated in the database.
     * @param {AssessmentRiskFactorsUpdateManyAndReturnArgs} args - Arguments to update many AssessmentRiskFactors.
     * @example
     * // Update many AssessmentRiskFactors
     * const assessmentRiskFactors = await prisma.assessmentRiskFactors.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AssessmentRiskFactors and only return the `id`
     * const assessmentRiskFactorsWithIdOnly = await prisma.assessmentRiskFactors.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AssessmentRiskFactorsUpdateManyAndReturnArgs>(args: SelectSubset<T, AssessmentRiskFactorsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentRiskFactorsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AssessmentRiskFactors.
     * @param {AssessmentRiskFactorsUpsertArgs} args - Arguments to update or create a AssessmentRiskFactors.
     * @example
     * // Update or create a AssessmentRiskFactors
     * const assessmentRiskFactors = await prisma.assessmentRiskFactors.upsert({
     *   create: {
     *     // ... data to create a AssessmentRiskFactors
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AssessmentRiskFactors we want to update
     *   }
     * })
     */
    upsert<T extends AssessmentRiskFactorsUpsertArgs>(args: SelectSubset<T, AssessmentRiskFactorsUpsertArgs<ExtArgs>>): Prisma__AssessmentRiskFactorsClient<$Result.GetResult<Prisma.$AssessmentRiskFactorsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AssessmentRiskFactors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentRiskFactorsCountArgs} args - Arguments to filter AssessmentRiskFactors to count.
     * @example
     * // Count the number of AssessmentRiskFactors
     * const count = await prisma.assessmentRiskFactors.count({
     *   where: {
     *     // ... the filter for the AssessmentRiskFactors we want to count
     *   }
     * })
    **/
    count<T extends AssessmentRiskFactorsCountArgs>(
      args?: Subset<T, AssessmentRiskFactorsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssessmentRiskFactorsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AssessmentRiskFactors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentRiskFactorsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssessmentRiskFactorsAggregateArgs>(args: Subset<T, AssessmentRiskFactorsAggregateArgs>): Prisma.PrismaPromise<GetAssessmentRiskFactorsAggregateType<T>>

    /**
     * Group by AssessmentRiskFactors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentRiskFactorsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssessmentRiskFactorsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssessmentRiskFactorsGroupByArgs['orderBy'] }
        : { orderBy?: AssessmentRiskFactorsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssessmentRiskFactorsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssessmentRiskFactorsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AssessmentRiskFactors model
   */
  readonly fields: AssessmentRiskFactorsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AssessmentRiskFactors.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssessmentRiskFactorsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assessment<T extends AssessmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AssessmentDefaultArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AssessmentRiskFactors model
   */
  interface AssessmentRiskFactorsFieldRefs {
    readonly id: FieldRef<"AssessmentRiskFactors", 'String'>
    readonly assessmentId: FieldRef<"AssessmentRiskFactors", 'String'>
    readonly qi: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly qm: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly tempDestruction: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly tempDestructionMulti: FieldRef<"AssessmentRiskFactors", 'String'>
    readonly avgDimension: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly materialClass: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly materialClassMulti: FieldRef<"AssessmentRiskFactors", 'String'>
    readonly length: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly width: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly area: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly height: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly accessType: FieldRef<"AssessmentRiskFactors", 'String'>
    readonly windowArea: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly staticVentArea: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly mechVentFlow: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly ventingRatio_k: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly accessSides: FieldRef<"AssessmentRiskFactors", 'Int'>
    readonly heightAbove: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly depthBelow: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly floorLevel: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly factor_q: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly factor_i: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly factor_g: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly factor_e: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly factor_v: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly factor_z: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly risk_P: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly risk_P1: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly risk_P2: FieldRef<"AssessmentRiskFactors", 'Float'>
    readonly createdAt: FieldRef<"AssessmentRiskFactors", 'DateTime'>
    readonly updatedAt: FieldRef<"AssessmentRiskFactors", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AssessmentRiskFactors findUnique
   */
  export type AssessmentRiskFactorsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentRiskFactors
     */
    select?: AssessmentRiskFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentRiskFactors
     */
    omit?: AssessmentRiskFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentRiskFactorsInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentRiskFactors to fetch.
     */
    where: AssessmentRiskFactorsWhereUniqueInput
  }

  /**
   * AssessmentRiskFactors findUniqueOrThrow
   */
  export type AssessmentRiskFactorsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentRiskFactors
     */
    select?: AssessmentRiskFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentRiskFactors
     */
    omit?: AssessmentRiskFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentRiskFactorsInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentRiskFactors to fetch.
     */
    where: AssessmentRiskFactorsWhereUniqueInput
  }

  /**
   * AssessmentRiskFactors findFirst
   */
  export type AssessmentRiskFactorsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentRiskFactors
     */
    select?: AssessmentRiskFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentRiskFactors
     */
    omit?: AssessmentRiskFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentRiskFactorsInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentRiskFactors to fetch.
     */
    where?: AssessmentRiskFactorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentRiskFactors to fetch.
     */
    orderBy?: AssessmentRiskFactorsOrderByWithRelationInput | AssessmentRiskFactorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssessmentRiskFactors.
     */
    cursor?: AssessmentRiskFactorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentRiskFactors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentRiskFactors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentRiskFactors.
     */
    distinct?: AssessmentRiskFactorsScalarFieldEnum | AssessmentRiskFactorsScalarFieldEnum[]
  }

  /**
   * AssessmentRiskFactors findFirstOrThrow
   */
  export type AssessmentRiskFactorsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentRiskFactors
     */
    select?: AssessmentRiskFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentRiskFactors
     */
    omit?: AssessmentRiskFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentRiskFactorsInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentRiskFactors to fetch.
     */
    where?: AssessmentRiskFactorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentRiskFactors to fetch.
     */
    orderBy?: AssessmentRiskFactorsOrderByWithRelationInput | AssessmentRiskFactorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssessmentRiskFactors.
     */
    cursor?: AssessmentRiskFactorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentRiskFactors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentRiskFactors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentRiskFactors.
     */
    distinct?: AssessmentRiskFactorsScalarFieldEnum | AssessmentRiskFactorsScalarFieldEnum[]
  }

  /**
   * AssessmentRiskFactors findMany
   */
  export type AssessmentRiskFactorsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentRiskFactors
     */
    select?: AssessmentRiskFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentRiskFactors
     */
    omit?: AssessmentRiskFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentRiskFactorsInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentRiskFactors to fetch.
     */
    where?: AssessmentRiskFactorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentRiskFactors to fetch.
     */
    orderBy?: AssessmentRiskFactorsOrderByWithRelationInput | AssessmentRiskFactorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AssessmentRiskFactors.
     */
    cursor?: AssessmentRiskFactorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentRiskFactors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentRiskFactors.
     */
    skip?: number
    distinct?: AssessmentRiskFactorsScalarFieldEnum | AssessmentRiskFactorsScalarFieldEnum[]
  }

  /**
   * AssessmentRiskFactors create
   */
  export type AssessmentRiskFactorsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentRiskFactors
     */
    select?: AssessmentRiskFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentRiskFactors
     */
    omit?: AssessmentRiskFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentRiskFactorsInclude<ExtArgs> | null
    /**
     * The data needed to create a AssessmentRiskFactors.
     */
    data: XOR<AssessmentRiskFactorsCreateInput, AssessmentRiskFactorsUncheckedCreateInput>
  }

  /**
   * AssessmentRiskFactors createMany
   */
  export type AssessmentRiskFactorsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AssessmentRiskFactors.
     */
    data: AssessmentRiskFactorsCreateManyInput | AssessmentRiskFactorsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssessmentRiskFactors createManyAndReturn
   */
  export type AssessmentRiskFactorsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentRiskFactors
     */
    select?: AssessmentRiskFactorsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentRiskFactors
     */
    omit?: AssessmentRiskFactorsOmit<ExtArgs> | null
    /**
     * The data used to create many AssessmentRiskFactors.
     */
    data: AssessmentRiskFactorsCreateManyInput | AssessmentRiskFactorsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentRiskFactorsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AssessmentRiskFactors update
   */
  export type AssessmentRiskFactorsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentRiskFactors
     */
    select?: AssessmentRiskFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentRiskFactors
     */
    omit?: AssessmentRiskFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentRiskFactorsInclude<ExtArgs> | null
    /**
     * The data needed to update a AssessmentRiskFactors.
     */
    data: XOR<AssessmentRiskFactorsUpdateInput, AssessmentRiskFactorsUncheckedUpdateInput>
    /**
     * Choose, which AssessmentRiskFactors to update.
     */
    where: AssessmentRiskFactorsWhereUniqueInput
  }

  /**
   * AssessmentRiskFactors updateMany
   */
  export type AssessmentRiskFactorsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AssessmentRiskFactors.
     */
    data: XOR<AssessmentRiskFactorsUpdateManyMutationInput, AssessmentRiskFactorsUncheckedUpdateManyInput>
    /**
     * Filter which AssessmentRiskFactors to update
     */
    where?: AssessmentRiskFactorsWhereInput
    /**
     * Limit how many AssessmentRiskFactors to update.
     */
    limit?: number
  }

  /**
   * AssessmentRiskFactors updateManyAndReturn
   */
  export type AssessmentRiskFactorsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentRiskFactors
     */
    select?: AssessmentRiskFactorsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentRiskFactors
     */
    omit?: AssessmentRiskFactorsOmit<ExtArgs> | null
    /**
     * The data used to update AssessmentRiskFactors.
     */
    data: XOR<AssessmentRiskFactorsUpdateManyMutationInput, AssessmentRiskFactorsUncheckedUpdateManyInput>
    /**
     * Filter which AssessmentRiskFactors to update
     */
    where?: AssessmentRiskFactorsWhereInput
    /**
     * Limit how many AssessmentRiskFactors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentRiskFactorsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AssessmentRiskFactors upsert
   */
  export type AssessmentRiskFactorsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentRiskFactors
     */
    select?: AssessmentRiskFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentRiskFactors
     */
    omit?: AssessmentRiskFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentRiskFactorsInclude<ExtArgs> | null
    /**
     * The filter to search for the AssessmentRiskFactors to update in case it exists.
     */
    where: AssessmentRiskFactorsWhereUniqueInput
    /**
     * In case the AssessmentRiskFactors found by the `where` argument doesn't exist, create a new AssessmentRiskFactors with this data.
     */
    create: XOR<AssessmentRiskFactorsCreateInput, AssessmentRiskFactorsUncheckedCreateInput>
    /**
     * In case the AssessmentRiskFactors was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssessmentRiskFactorsUpdateInput, AssessmentRiskFactorsUncheckedUpdateInput>
  }

  /**
   * AssessmentRiskFactors delete
   */
  export type AssessmentRiskFactorsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentRiskFactors
     */
    select?: AssessmentRiskFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentRiskFactors
     */
    omit?: AssessmentRiskFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentRiskFactorsInclude<ExtArgs> | null
    /**
     * Filter which AssessmentRiskFactors to delete.
     */
    where: AssessmentRiskFactorsWhereUniqueInput
  }

  /**
   * AssessmentRiskFactors deleteMany
   */
  export type AssessmentRiskFactorsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssessmentRiskFactors to delete
     */
    where?: AssessmentRiskFactorsWhereInput
    /**
     * Limit how many AssessmentRiskFactors to delete.
     */
    limit?: number
  }

  /**
   * AssessmentRiskFactors without action
   */
  export type AssessmentRiskFactorsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentRiskFactors
     */
    select?: AssessmentRiskFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentRiskFactors
     */
    omit?: AssessmentRiskFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentRiskFactorsInclude<ExtArgs> | null
  }


  /**
   * Model AssessmentAcceptanceFactors
   */

  export type AggregateAssessmentAcceptanceFactors = {
    _count: AssessmentAcceptanceFactorsCountAggregateOutputType | null
    _avg: AssessmentAcceptanceFactorsAvgAggregateOutputType | null
    _sum: AssessmentAcceptanceFactorsSumAggregateOutputType | null
    _min: AssessmentAcceptanceFactorsMinAggregateOutputType | null
    _max: AssessmentAcceptanceFactorsMaxAggregateOutputType | null
  }

  export type AssessmentAcceptanceFactorsAvgAggregateOutputType = {
    mainActivity: number | null
    secondaryActivity: number | null
    heatTransferType: number | null
    generatorLocation: number | null
    energySource: number | null
    electricalSystem: number | null
    flammableLiquids: number | null
    combustibleDust: number | null
    weldingOperations: number | null
    additionalCarpentryPlastic: number | null
    specialRisk: number | null
    occupantCount: number | null
    occupantFactor: number | null
    exitWidthTotal: number | null
    exitUnitsX: number | null
    separatePathsK: number | null
    mobilityFactor: number | null
    exitCountToOpenSpace: number | null
    valueTotal: number | null
    valueYear: number | null
    replaceability: number | null
    dependencyManual: number | null
    factor_a: number | null
    factor_t: number | null
    factor_c: number | null
    factor_r: number | null
    factor_d: number | null
    level_A: number | null
    level_A1: number | null
    level_A2: number | null
  }

  export type AssessmentAcceptanceFactorsSumAggregateOutputType = {
    mainActivity: number | null
    secondaryActivity: number | null
    heatTransferType: number | null
    generatorLocation: number | null
    energySource: number | null
    electricalSystem: number | null
    flammableLiquids: number | null
    combustibleDust: number | null
    weldingOperations: number | null
    additionalCarpentryPlastic: number | null
    specialRisk: number | null
    occupantCount: number | null
    occupantFactor: number | null
    exitWidthTotal: number | null
    exitUnitsX: number | null
    separatePathsK: number | null
    mobilityFactor: number | null
    exitCountToOpenSpace: number | null
    valueTotal: number | null
    valueYear: number | null
    replaceability: number | null
    dependencyManual: number | null
    factor_a: number | null
    factor_t: number | null
    factor_c: number | null
    factor_r: number | null
    factor_d: number | null
    level_A: number | null
    level_A1: number | null
    level_A2: number | null
  }

  export type AssessmentAcceptanceFactorsMinAggregateOutputType = {
    id: string | null
    assessmentId: string | null
    mainActivity: number | null
    mainActivityKey: string | null
    secondaryActivity: number | null
    heatTransferType: number | null
    heatTransferTypeKey: string | null
    generatorLocation: number | null
    generatorLocationKey: string | null
    energySource: number | null
    energySourceKey: string | null
    electricalSystem: number | null
    flammableLiquids: number | null
    combustibleDust: number | null
    combustibleDustKey: string | null
    weldingOperations: number | null
    additionalCarpentryPlastic: number | null
    specialRisk: number | null
    occupantCount: number | null
    occupantFactor: number | null
    occupantFactorKey: string | null
    exitWidths: string | null
    exitWidthTotal: number | null
    exitUnitsX: number | null
    separatePathsK: number | null
    mobilityFactor: number | null
    mobilityFactorMulti: string | null
    perceptionAwareness: boolean | null
    evacuationPlanClear: boolean | null
    noPanicRisk: boolean | null
    exitCountToOpenSpace: number | null
    valueTotal: number | null
    valueYear: number | null
    replaceability: number | null
    dependencyType: string | null
    dependencyManual: number | null
    factor_a: number | null
    factor_t: number | null
    factor_c: number | null
    factor_r: number | null
    factor_d: number | null
    level_A: number | null
    level_A1: number | null
    level_A2: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssessmentAcceptanceFactorsMaxAggregateOutputType = {
    id: string | null
    assessmentId: string | null
    mainActivity: number | null
    mainActivityKey: string | null
    secondaryActivity: number | null
    heatTransferType: number | null
    heatTransferTypeKey: string | null
    generatorLocation: number | null
    generatorLocationKey: string | null
    energySource: number | null
    energySourceKey: string | null
    electricalSystem: number | null
    flammableLiquids: number | null
    combustibleDust: number | null
    combustibleDustKey: string | null
    weldingOperations: number | null
    additionalCarpentryPlastic: number | null
    specialRisk: number | null
    occupantCount: number | null
    occupantFactor: number | null
    occupantFactorKey: string | null
    exitWidths: string | null
    exitWidthTotal: number | null
    exitUnitsX: number | null
    separatePathsK: number | null
    mobilityFactor: number | null
    mobilityFactorMulti: string | null
    perceptionAwareness: boolean | null
    evacuationPlanClear: boolean | null
    noPanicRisk: boolean | null
    exitCountToOpenSpace: number | null
    valueTotal: number | null
    valueYear: number | null
    replaceability: number | null
    dependencyType: string | null
    dependencyManual: number | null
    factor_a: number | null
    factor_t: number | null
    factor_c: number | null
    factor_r: number | null
    factor_d: number | null
    level_A: number | null
    level_A1: number | null
    level_A2: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssessmentAcceptanceFactorsCountAggregateOutputType = {
    id: number
    assessmentId: number
    mainActivity: number
    mainActivityKey: number
    secondaryActivity: number
    heatTransferType: number
    heatTransferTypeKey: number
    generatorLocation: number
    generatorLocationKey: number
    energySource: number
    energySourceKey: number
    electricalSystem: number
    flammableLiquids: number
    combustibleDust: number
    combustibleDustKey: number
    weldingOperations: number
    additionalCarpentryPlastic: number
    specialRisk: number
    occupantCount: number
    occupantFactor: number
    occupantFactorKey: number
    exitWidths: number
    exitWidthTotal: number
    exitUnitsX: number
    separatePathsK: number
    mobilityFactor: number
    mobilityFactorMulti: number
    perceptionAwareness: number
    evacuationPlanClear: number
    noPanicRisk: number
    exitCountToOpenSpace: number
    valueTotal: number
    valueYear: number
    replaceability: number
    dependencyType: number
    dependencyManual: number
    factor_a: number
    factor_t: number
    factor_c: number
    factor_r: number
    factor_d: number
    level_A: number
    level_A1: number
    level_A2: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AssessmentAcceptanceFactorsAvgAggregateInputType = {
    mainActivity?: true
    secondaryActivity?: true
    heatTransferType?: true
    generatorLocation?: true
    energySource?: true
    electricalSystem?: true
    flammableLiquids?: true
    combustibleDust?: true
    weldingOperations?: true
    additionalCarpentryPlastic?: true
    specialRisk?: true
    occupantCount?: true
    occupantFactor?: true
    exitWidthTotal?: true
    exitUnitsX?: true
    separatePathsK?: true
    mobilityFactor?: true
    exitCountToOpenSpace?: true
    valueTotal?: true
    valueYear?: true
    replaceability?: true
    dependencyManual?: true
    factor_a?: true
    factor_t?: true
    factor_c?: true
    factor_r?: true
    factor_d?: true
    level_A?: true
    level_A1?: true
    level_A2?: true
  }

  export type AssessmentAcceptanceFactorsSumAggregateInputType = {
    mainActivity?: true
    secondaryActivity?: true
    heatTransferType?: true
    generatorLocation?: true
    energySource?: true
    electricalSystem?: true
    flammableLiquids?: true
    combustibleDust?: true
    weldingOperations?: true
    additionalCarpentryPlastic?: true
    specialRisk?: true
    occupantCount?: true
    occupantFactor?: true
    exitWidthTotal?: true
    exitUnitsX?: true
    separatePathsK?: true
    mobilityFactor?: true
    exitCountToOpenSpace?: true
    valueTotal?: true
    valueYear?: true
    replaceability?: true
    dependencyManual?: true
    factor_a?: true
    factor_t?: true
    factor_c?: true
    factor_r?: true
    factor_d?: true
    level_A?: true
    level_A1?: true
    level_A2?: true
  }

  export type AssessmentAcceptanceFactorsMinAggregateInputType = {
    id?: true
    assessmentId?: true
    mainActivity?: true
    mainActivityKey?: true
    secondaryActivity?: true
    heatTransferType?: true
    heatTransferTypeKey?: true
    generatorLocation?: true
    generatorLocationKey?: true
    energySource?: true
    energySourceKey?: true
    electricalSystem?: true
    flammableLiquids?: true
    combustibleDust?: true
    combustibleDustKey?: true
    weldingOperations?: true
    additionalCarpentryPlastic?: true
    specialRisk?: true
    occupantCount?: true
    occupantFactor?: true
    occupantFactorKey?: true
    exitWidths?: true
    exitWidthTotal?: true
    exitUnitsX?: true
    separatePathsK?: true
    mobilityFactor?: true
    mobilityFactorMulti?: true
    perceptionAwareness?: true
    evacuationPlanClear?: true
    noPanicRisk?: true
    exitCountToOpenSpace?: true
    valueTotal?: true
    valueYear?: true
    replaceability?: true
    dependencyType?: true
    dependencyManual?: true
    factor_a?: true
    factor_t?: true
    factor_c?: true
    factor_r?: true
    factor_d?: true
    level_A?: true
    level_A1?: true
    level_A2?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssessmentAcceptanceFactorsMaxAggregateInputType = {
    id?: true
    assessmentId?: true
    mainActivity?: true
    mainActivityKey?: true
    secondaryActivity?: true
    heatTransferType?: true
    heatTransferTypeKey?: true
    generatorLocation?: true
    generatorLocationKey?: true
    energySource?: true
    energySourceKey?: true
    electricalSystem?: true
    flammableLiquids?: true
    combustibleDust?: true
    combustibleDustKey?: true
    weldingOperations?: true
    additionalCarpentryPlastic?: true
    specialRisk?: true
    occupantCount?: true
    occupantFactor?: true
    occupantFactorKey?: true
    exitWidths?: true
    exitWidthTotal?: true
    exitUnitsX?: true
    separatePathsK?: true
    mobilityFactor?: true
    mobilityFactorMulti?: true
    perceptionAwareness?: true
    evacuationPlanClear?: true
    noPanicRisk?: true
    exitCountToOpenSpace?: true
    valueTotal?: true
    valueYear?: true
    replaceability?: true
    dependencyType?: true
    dependencyManual?: true
    factor_a?: true
    factor_t?: true
    factor_c?: true
    factor_r?: true
    factor_d?: true
    level_A?: true
    level_A1?: true
    level_A2?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssessmentAcceptanceFactorsCountAggregateInputType = {
    id?: true
    assessmentId?: true
    mainActivity?: true
    mainActivityKey?: true
    secondaryActivity?: true
    heatTransferType?: true
    heatTransferTypeKey?: true
    generatorLocation?: true
    generatorLocationKey?: true
    energySource?: true
    energySourceKey?: true
    electricalSystem?: true
    flammableLiquids?: true
    combustibleDust?: true
    combustibleDustKey?: true
    weldingOperations?: true
    additionalCarpentryPlastic?: true
    specialRisk?: true
    occupantCount?: true
    occupantFactor?: true
    occupantFactorKey?: true
    exitWidths?: true
    exitWidthTotal?: true
    exitUnitsX?: true
    separatePathsK?: true
    mobilityFactor?: true
    mobilityFactorMulti?: true
    perceptionAwareness?: true
    evacuationPlanClear?: true
    noPanicRisk?: true
    exitCountToOpenSpace?: true
    valueTotal?: true
    valueYear?: true
    replaceability?: true
    dependencyType?: true
    dependencyManual?: true
    factor_a?: true
    factor_t?: true
    factor_c?: true
    factor_r?: true
    factor_d?: true
    level_A?: true
    level_A1?: true
    level_A2?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AssessmentAcceptanceFactorsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssessmentAcceptanceFactors to aggregate.
     */
    where?: AssessmentAcceptanceFactorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentAcceptanceFactors to fetch.
     */
    orderBy?: AssessmentAcceptanceFactorsOrderByWithRelationInput | AssessmentAcceptanceFactorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssessmentAcceptanceFactorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentAcceptanceFactors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentAcceptanceFactors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AssessmentAcceptanceFactors
    **/
    _count?: true | AssessmentAcceptanceFactorsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssessmentAcceptanceFactorsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssessmentAcceptanceFactorsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssessmentAcceptanceFactorsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssessmentAcceptanceFactorsMaxAggregateInputType
  }

  export type GetAssessmentAcceptanceFactorsAggregateType<T extends AssessmentAcceptanceFactorsAggregateArgs> = {
        [P in keyof T & keyof AggregateAssessmentAcceptanceFactors]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssessmentAcceptanceFactors[P]>
      : GetScalarType<T[P], AggregateAssessmentAcceptanceFactors[P]>
  }




  export type AssessmentAcceptanceFactorsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentAcceptanceFactorsWhereInput
    orderBy?: AssessmentAcceptanceFactorsOrderByWithAggregationInput | AssessmentAcceptanceFactorsOrderByWithAggregationInput[]
    by: AssessmentAcceptanceFactorsScalarFieldEnum[] | AssessmentAcceptanceFactorsScalarFieldEnum
    having?: AssessmentAcceptanceFactorsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssessmentAcceptanceFactorsCountAggregateInputType | true
    _avg?: AssessmentAcceptanceFactorsAvgAggregateInputType
    _sum?: AssessmentAcceptanceFactorsSumAggregateInputType
    _min?: AssessmentAcceptanceFactorsMinAggregateInputType
    _max?: AssessmentAcceptanceFactorsMaxAggregateInputType
  }

  export type AssessmentAcceptanceFactorsGroupByOutputType = {
    id: string
    assessmentId: string
    mainActivity: number | null
    mainActivityKey: string | null
    secondaryActivity: number | null
    heatTransferType: number | null
    heatTransferTypeKey: string | null
    generatorLocation: number | null
    generatorLocationKey: string | null
    energySource: number | null
    energySourceKey: string | null
    electricalSystem: number | null
    flammableLiquids: number | null
    combustibleDust: number | null
    combustibleDustKey: string | null
    weldingOperations: number | null
    additionalCarpentryPlastic: number | null
    specialRisk: number | null
    occupantCount: number | null
    occupantFactor: number | null
    occupantFactorKey: string | null
    exitWidths: string | null
    exitWidthTotal: number | null
    exitUnitsX: number | null
    separatePathsK: number | null
    mobilityFactor: number | null
    mobilityFactorMulti: string | null
    perceptionAwareness: boolean | null
    evacuationPlanClear: boolean | null
    noPanicRisk: boolean | null
    exitCountToOpenSpace: number | null
    valueTotal: number | null
    valueYear: number | null
    replaceability: number | null
    dependencyType: string | null
    dependencyManual: number | null
    factor_a: number | null
    factor_t: number | null
    factor_c: number | null
    factor_r: number | null
    factor_d: number | null
    level_A: number | null
    level_A1: number | null
    level_A2: number | null
    createdAt: Date
    updatedAt: Date
    _count: AssessmentAcceptanceFactorsCountAggregateOutputType | null
    _avg: AssessmentAcceptanceFactorsAvgAggregateOutputType | null
    _sum: AssessmentAcceptanceFactorsSumAggregateOutputType | null
    _min: AssessmentAcceptanceFactorsMinAggregateOutputType | null
    _max: AssessmentAcceptanceFactorsMaxAggregateOutputType | null
  }

  type GetAssessmentAcceptanceFactorsGroupByPayload<T extends AssessmentAcceptanceFactorsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssessmentAcceptanceFactorsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssessmentAcceptanceFactorsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssessmentAcceptanceFactorsGroupByOutputType[P]>
            : GetScalarType<T[P], AssessmentAcceptanceFactorsGroupByOutputType[P]>
        }
      >
    >


  export type AssessmentAcceptanceFactorsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assessmentId?: boolean
    mainActivity?: boolean
    mainActivityKey?: boolean
    secondaryActivity?: boolean
    heatTransferType?: boolean
    heatTransferTypeKey?: boolean
    generatorLocation?: boolean
    generatorLocationKey?: boolean
    energySource?: boolean
    energySourceKey?: boolean
    electricalSystem?: boolean
    flammableLiquids?: boolean
    combustibleDust?: boolean
    combustibleDustKey?: boolean
    weldingOperations?: boolean
    additionalCarpentryPlastic?: boolean
    specialRisk?: boolean
    occupantCount?: boolean
    occupantFactor?: boolean
    occupantFactorKey?: boolean
    exitWidths?: boolean
    exitWidthTotal?: boolean
    exitUnitsX?: boolean
    separatePathsK?: boolean
    mobilityFactor?: boolean
    mobilityFactorMulti?: boolean
    perceptionAwareness?: boolean
    evacuationPlanClear?: boolean
    noPanicRisk?: boolean
    exitCountToOpenSpace?: boolean
    valueTotal?: boolean
    valueYear?: boolean
    replaceability?: boolean
    dependencyType?: boolean
    dependencyManual?: boolean
    factor_a?: boolean
    factor_t?: boolean
    factor_c?: boolean
    factor_r?: boolean
    factor_d?: boolean
    level_A?: boolean
    level_A1?: boolean
    level_A2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessmentAcceptanceFactors"]>

  export type AssessmentAcceptanceFactorsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assessmentId?: boolean
    mainActivity?: boolean
    mainActivityKey?: boolean
    secondaryActivity?: boolean
    heatTransferType?: boolean
    heatTransferTypeKey?: boolean
    generatorLocation?: boolean
    generatorLocationKey?: boolean
    energySource?: boolean
    energySourceKey?: boolean
    electricalSystem?: boolean
    flammableLiquids?: boolean
    combustibleDust?: boolean
    combustibleDustKey?: boolean
    weldingOperations?: boolean
    additionalCarpentryPlastic?: boolean
    specialRisk?: boolean
    occupantCount?: boolean
    occupantFactor?: boolean
    occupantFactorKey?: boolean
    exitWidths?: boolean
    exitWidthTotal?: boolean
    exitUnitsX?: boolean
    separatePathsK?: boolean
    mobilityFactor?: boolean
    mobilityFactorMulti?: boolean
    perceptionAwareness?: boolean
    evacuationPlanClear?: boolean
    noPanicRisk?: boolean
    exitCountToOpenSpace?: boolean
    valueTotal?: boolean
    valueYear?: boolean
    replaceability?: boolean
    dependencyType?: boolean
    dependencyManual?: boolean
    factor_a?: boolean
    factor_t?: boolean
    factor_c?: boolean
    factor_r?: boolean
    factor_d?: boolean
    level_A?: boolean
    level_A1?: boolean
    level_A2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessmentAcceptanceFactors"]>

  export type AssessmentAcceptanceFactorsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assessmentId?: boolean
    mainActivity?: boolean
    mainActivityKey?: boolean
    secondaryActivity?: boolean
    heatTransferType?: boolean
    heatTransferTypeKey?: boolean
    generatorLocation?: boolean
    generatorLocationKey?: boolean
    energySource?: boolean
    energySourceKey?: boolean
    electricalSystem?: boolean
    flammableLiquids?: boolean
    combustibleDust?: boolean
    combustibleDustKey?: boolean
    weldingOperations?: boolean
    additionalCarpentryPlastic?: boolean
    specialRisk?: boolean
    occupantCount?: boolean
    occupantFactor?: boolean
    occupantFactorKey?: boolean
    exitWidths?: boolean
    exitWidthTotal?: boolean
    exitUnitsX?: boolean
    separatePathsK?: boolean
    mobilityFactor?: boolean
    mobilityFactorMulti?: boolean
    perceptionAwareness?: boolean
    evacuationPlanClear?: boolean
    noPanicRisk?: boolean
    exitCountToOpenSpace?: boolean
    valueTotal?: boolean
    valueYear?: boolean
    replaceability?: boolean
    dependencyType?: boolean
    dependencyManual?: boolean
    factor_a?: boolean
    factor_t?: boolean
    factor_c?: boolean
    factor_r?: boolean
    factor_d?: boolean
    level_A?: boolean
    level_A1?: boolean
    level_A2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessmentAcceptanceFactors"]>

  export type AssessmentAcceptanceFactorsSelectScalar = {
    id?: boolean
    assessmentId?: boolean
    mainActivity?: boolean
    mainActivityKey?: boolean
    secondaryActivity?: boolean
    heatTransferType?: boolean
    heatTransferTypeKey?: boolean
    generatorLocation?: boolean
    generatorLocationKey?: boolean
    energySource?: boolean
    energySourceKey?: boolean
    electricalSystem?: boolean
    flammableLiquids?: boolean
    combustibleDust?: boolean
    combustibleDustKey?: boolean
    weldingOperations?: boolean
    additionalCarpentryPlastic?: boolean
    specialRisk?: boolean
    occupantCount?: boolean
    occupantFactor?: boolean
    occupantFactorKey?: boolean
    exitWidths?: boolean
    exitWidthTotal?: boolean
    exitUnitsX?: boolean
    separatePathsK?: boolean
    mobilityFactor?: boolean
    mobilityFactorMulti?: boolean
    perceptionAwareness?: boolean
    evacuationPlanClear?: boolean
    noPanicRisk?: boolean
    exitCountToOpenSpace?: boolean
    valueTotal?: boolean
    valueYear?: boolean
    replaceability?: boolean
    dependencyType?: boolean
    dependencyManual?: boolean
    factor_a?: boolean
    factor_t?: boolean
    factor_c?: boolean
    factor_r?: boolean
    factor_d?: boolean
    level_A?: boolean
    level_A1?: boolean
    level_A2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AssessmentAcceptanceFactorsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "assessmentId" | "mainActivity" | "mainActivityKey" | "secondaryActivity" | "heatTransferType" | "heatTransferTypeKey" | "generatorLocation" | "generatorLocationKey" | "energySource" | "energySourceKey" | "electricalSystem" | "flammableLiquids" | "combustibleDust" | "combustibleDustKey" | "weldingOperations" | "additionalCarpentryPlastic" | "specialRisk" | "occupantCount" | "occupantFactor" | "occupantFactorKey" | "exitWidths" | "exitWidthTotal" | "exitUnitsX" | "separatePathsK" | "mobilityFactor" | "mobilityFactorMulti" | "perceptionAwareness" | "evacuationPlanClear" | "noPanicRisk" | "exitCountToOpenSpace" | "valueTotal" | "valueYear" | "replaceability" | "dependencyType" | "dependencyManual" | "factor_a" | "factor_t" | "factor_c" | "factor_r" | "factor_d" | "level_A" | "level_A1" | "level_A2" | "createdAt" | "updatedAt", ExtArgs["result"]["assessmentAcceptanceFactors"]>
  export type AssessmentAcceptanceFactorsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }
  export type AssessmentAcceptanceFactorsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }
  export type AssessmentAcceptanceFactorsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }

  export type $AssessmentAcceptanceFactorsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AssessmentAcceptanceFactors"
    objects: {
      assessment: Prisma.$AssessmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      assessmentId: string
      mainActivity: number | null
      mainActivityKey: string | null
      secondaryActivity: number | null
      heatTransferType: number | null
      heatTransferTypeKey: string | null
      generatorLocation: number | null
      generatorLocationKey: string | null
      energySource: number | null
      energySourceKey: string | null
      electricalSystem: number | null
      flammableLiquids: number | null
      combustibleDust: number | null
      combustibleDustKey: string | null
      weldingOperations: number | null
      additionalCarpentryPlastic: number | null
      specialRisk: number | null
      occupantCount: number | null
      occupantFactor: number | null
      occupantFactorKey: string | null
      exitWidths: string | null
      exitWidthTotal: number | null
      exitUnitsX: number | null
      separatePathsK: number | null
      mobilityFactor: number | null
      mobilityFactorMulti: string | null
      perceptionAwareness: boolean | null
      evacuationPlanClear: boolean | null
      noPanicRisk: boolean | null
      exitCountToOpenSpace: number | null
      valueTotal: number | null
      valueYear: number | null
      replaceability: number | null
      dependencyType: string | null
      dependencyManual: number | null
      factor_a: number | null
      factor_t: number | null
      factor_c: number | null
      factor_r: number | null
      factor_d: number | null
      level_A: number | null
      level_A1: number | null
      level_A2: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["assessmentAcceptanceFactors"]>
    composites: {}
  }

  type AssessmentAcceptanceFactorsGetPayload<S extends boolean | null | undefined | AssessmentAcceptanceFactorsDefaultArgs> = $Result.GetResult<Prisma.$AssessmentAcceptanceFactorsPayload, S>

  type AssessmentAcceptanceFactorsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssessmentAcceptanceFactorsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssessmentAcceptanceFactorsCountAggregateInputType | true
    }

  export interface AssessmentAcceptanceFactorsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AssessmentAcceptanceFactors'], meta: { name: 'AssessmentAcceptanceFactors' } }
    /**
     * Find zero or one AssessmentAcceptanceFactors that matches the filter.
     * @param {AssessmentAcceptanceFactorsFindUniqueArgs} args - Arguments to find a AssessmentAcceptanceFactors
     * @example
     * // Get one AssessmentAcceptanceFactors
     * const assessmentAcceptanceFactors = await prisma.assessmentAcceptanceFactors.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssessmentAcceptanceFactorsFindUniqueArgs>(args: SelectSubset<T, AssessmentAcceptanceFactorsFindUniqueArgs<ExtArgs>>): Prisma__AssessmentAcceptanceFactorsClient<$Result.GetResult<Prisma.$AssessmentAcceptanceFactorsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AssessmentAcceptanceFactors that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssessmentAcceptanceFactorsFindUniqueOrThrowArgs} args - Arguments to find a AssessmentAcceptanceFactors
     * @example
     * // Get one AssessmentAcceptanceFactors
     * const assessmentAcceptanceFactors = await prisma.assessmentAcceptanceFactors.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssessmentAcceptanceFactorsFindUniqueOrThrowArgs>(args: SelectSubset<T, AssessmentAcceptanceFactorsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssessmentAcceptanceFactorsClient<$Result.GetResult<Prisma.$AssessmentAcceptanceFactorsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssessmentAcceptanceFactors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentAcceptanceFactorsFindFirstArgs} args - Arguments to find a AssessmentAcceptanceFactors
     * @example
     * // Get one AssessmentAcceptanceFactors
     * const assessmentAcceptanceFactors = await prisma.assessmentAcceptanceFactors.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssessmentAcceptanceFactorsFindFirstArgs>(args?: SelectSubset<T, AssessmentAcceptanceFactorsFindFirstArgs<ExtArgs>>): Prisma__AssessmentAcceptanceFactorsClient<$Result.GetResult<Prisma.$AssessmentAcceptanceFactorsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssessmentAcceptanceFactors that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentAcceptanceFactorsFindFirstOrThrowArgs} args - Arguments to find a AssessmentAcceptanceFactors
     * @example
     * // Get one AssessmentAcceptanceFactors
     * const assessmentAcceptanceFactors = await prisma.assessmentAcceptanceFactors.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssessmentAcceptanceFactorsFindFirstOrThrowArgs>(args?: SelectSubset<T, AssessmentAcceptanceFactorsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssessmentAcceptanceFactorsClient<$Result.GetResult<Prisma.$AssessmentAcceptanceFactorsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AssessmentAcceptanceFactors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentAcceptanceFactorsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AssessmentAcceptanceFactors
     * const assessmentAcceptanceFactors = await prisma.assessmentAcceptanceFactors.findMany()
     * 
     * // Get first 10 AssessmentAcceptanceFactors
     * const assessmentAcceptanceFactors = await prisma.assessmentAcceptanceFactors.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assessmentAcceptanceFactorsWithIdOnly = await prisma.assessmentAcceptanceFactors.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssessmentAcceptanceFactorsFindManyArgs>(args?: SelectSubset<T, AssessmentAcceptanceFactorsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentAcceptanceFactorsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AssessmentAcceptanceFactors.
     * @param {AssessmentAcceptanceFactorsCreateArgs} args - Arguments to create a AssessmentAcceptanceFactors.
     * @example
     * // Create one AssessmentAcceptanceFactors
     * const AssessmentAcceptanceFactors = await prisma.assessmentAcceptanceFactors.create({
     *   data: {
     *     // ... data to create a AssessmentAcceptanceFactors
     *   }
     * })
     * 
     */
    create<T extends AssessmentAcceptanceFactorsCreateArgs>(args: SelectSubset<T, AssessmentAcceptanceFactorsCreateArgs<ExtArgs>>): Prisma__AssessmentAcceptanceFactorsClient<$Result.GetResult<Prisma.$AssessmentAcceptanceFactorsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AssessmentAcceptanceFactors.
     * @param {AssessmentAcceptanceFactorsCreateManyArgs} args - Arguments to create many AssessmentAcceptanceFactors.
     * @example
     * // Create many AssessmentAcceptanceFactors
     * const assessmentAcceptanceFactors = await prisma.assessmentAcceptanceFactors.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssessmentAcceptanceFactorsCreateManyArgs>(args?: SelectSubset<T, AssessmentAcceptanceFactorsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AssessmentAcceptanceFactors and returns the data saved in the database.
     * @param {AssessmentAcceptanceFactorsCreateManyAndReturnArgs} args - Arguments to create many AssessmentAcceptanceFactors.
     * @example
     * // Create many AssessmentAcceptanceFactors
     * const assessmentAcceptanceFactors = await prisma.assessmentAcceptanceFactors.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AssessmentAcceptanceFactors and only return the `id`
     * const assessmentAcceptanceFactorsWithIdOnly = await prisma.assessmentAcceptanceFactors.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssessmentAcceptanceFactorsCreateManyAndReturnArgs>(args?: SelectSubset<T, AssessmentAcceptanceFactorsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentAcceptanceFactorsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AssessmentAcceptanceFactors.
     * @param {AssessmentAcceptanceFactorsDeleteArgs} args - Arguments to delete one AssessmentAcceptanceFactors.
     * @example
     * // Delete one AssessmentAcceptanceFactors
     * const AssessmentAcceptanceFactors = await prisma.assessmentAcceptanceFactors.delete({
     *   where: {
     *     // ... filter to delete one AssessmentAcceptanceFactors
     *   }
     * })
     * 
     */
    delete<T extends AssessmentAcceptanceFactorsDeleteArgs>(args: SelectSubset<T, AssessmentAcceptanceFactorsDeleteArgs<ExtArgs>>): Prisma__AssessmentAcceptanceFactorsClient<$Result.GetResult<Prisma.$AssessmentAcceptanceFactorsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AssessmentAcceptanceFactors.
     * @param {AssessmentAcceptanceFactorsUpdateArgs} args - Arguments to update one AssessmentAcceptanceFactors.
     * @example
     * // Update one AssessmentAcceptanceFactors
     * const assessmentAcceptanceFactors = await prisma.assessmentAcceptanceFactors.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssessmentAcceptanceFactorsUpdateArgs>(args: SelectSubset<T, AssessmentAcceptanceFactorsUpdateArgs<ExtArgs>>): Prisma__AssessmentAcceptanceFactorsClient<$Result.GetResult<Prisma.$AssessmentAcceptanceFactorsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AssessmentAcceptanceFactors.
     * @param {AssessmentAcceptanceFactorsDeleteManyArgs} args - Arguments to filter AssessmentAcceptanceFactors to delete.
     * @example
     * // Delete a few AssessmentAcceptanceFactors
     * const { count } = await prisma.assessmentAcceptanceFactors.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssessmentAcceptanceFactorsDeleteManyArgs>(args?: SelectSubset<T, AssessmentAcceptanceFactorsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssessmentAcceptanceFactors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentAcceptanceFactorsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AssessmentAcceptanceFactors
     * const assessmentAcceptanceFactors = await prisma.assessmentAcceptanceFactors.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssessmentAcceptanceFactorsUpdateManyArgs>(args: SelectSubset<T, AssessmentAcceptanceFactorsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssessmentAcceptanceFactors and returns the data updated in the database.
     * @param {AssessmentAcceptanceFactorsUpdateManyAndReturnArgs} args - Arguments to update many AssessmentAcceptanceFactors.
     * @example
     * // Update many AssessmentAcceptanceFactors
     * const assessmentAcceptanceFactors = await prisma.assessmentAcceptanceFactors.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AssessmentAcceptanceFactors and only return the `id`
     * const assessmentAcceptanceFactorsWithIdOnly = await prisma.assessmentAcceptanceFactors.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AssessmentAcceptanceFactorsUpdateManyAndReturnArgs>(args: SelectSubset<T, AssessmentAcceptanceFactorsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentAcceptanceFactorsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AssessmentAcceptanceFactors.
     * @param {AssessmentAcceptanceFactorsUpsertArgs} args - Arguments to update or create a AssessmentAcceptanceFactors.
     * @example
     * // Update or create a AssessmentAcceptanceFactors
     * const assessmentAcceptanceFactors = await prisma.assessmentAcceptanceFactors.upsert({
     *   create: {
     *     // ... data to create a AssessmentAcceptanceFactors
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AssessmentAcceptanceFactors we want to update
     *   }
     * })
     */
    upsert<T extends AssessmentAcceptanceFactorsUpsertArgs>(args: SelectSubset<T, AssessmentAcceptanceFactorsUpsertArgs<ExtArgs>>): Prisma__AssessmentAcceptanceFactorsClient<$Result.GetResult<Prisma.$AssessmentAcceptanceFactorsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AssessmentAcceptanceFactors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentAcceptanceFactorsCountArgs} args - Arguments to filter AssessmentAcceptanceFactors to count.
     * @example
     * // Count the number of AssessmentAcceptanceFactors
     * const count = await prisma.assessmentAcceptanceFactors.count({
     *   where: {
     *     // ... the filter for the AssessmentAcceptanceFactors we want to count
     *   }
     * })
    **/
    count<T extends AssessmentAcceptanceFactorsCountArgs>(
      args?: Subset<T, AssessmentAcceptanceFactorsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssessmentAcceptanceFactorsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AssessmentAcceptanceFactors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentAcceptanceFactorsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssessmentAcceptanceFactorsAggregateArgs>(args: Subset<T, AssessmentAcceptanceFactorsAggregateArgs>): Prisma.PrismaPromise<GetAssessmentAcceptanceFactorsAggregateType<T>>

    /**
     * Group by AssessmentAcceptanceFactors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentAcceptanceFactorsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssessmentAcceptanceFactorsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssessmentAcceptanceFactorsGroupByArgs['orderBy'] }
        : { orderBy?: AssessmentAcceptanceFactorsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssessmentAcceptanceFactorsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssessmentAcceptanceFactorsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AssessmentAcceptanceFactors model
   */
  readonly fields: AssessmentAcceptanceFactorsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AssessmentAcceptanceFactors.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssessmentAcceptanceFactorsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assessment<T extends AssessmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AssessmentDefaultArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AssessmentAcceptanceFactors model
   */
  interface AssessmentAcceptanceFactorsFieldRefs {
    readonly id: FieldRef<"AssessmentAcceptanceFactors", 'String'>
    readonly assessmentId: FieldRef<"AssessmentAcceptanceFactors", 'String'>
    readonly mainActivity: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly mainActivityKey: FieldRef<"AssessmentAcceptanceFactors", 'String'>
    readonly secondaryActivity: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly heatTransferType: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly heatTransferTypeKey: FieldRef<"AssessmentAcceptanceFactors", 'String'>
    readonly generatorLocation: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly generatorLocationKey: FieldRef<"AssessmentAcceptanceFactors", 'String'>
    readonly energySource: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly energySourceKey: FieldRef<"AssessmentAcceptanceFactors", 'String'>
    readonly electricalSystem: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly flammableLiquids: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly combustibleDust: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly combustibleDustKey: FieldRef<"AssessmentAcceptanceFactors", 'String'>
    readonly weldingOperations: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly additionalCarpentryPlastic: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly specialRisk: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly occupantCount: FieldRef<"AssessmentAcceptanceFactors", 'Int'>
    readonly occupantFactor: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly occupantFactorKey: FieldRef<"AssessmentAcceptanceFactors", 'String'>
    readonly exitWidths: FieldRef<"AssessmentAcceptanceFactors", 'String'>
    readonly exitWidthTotal: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly exitUnitsX: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly separatePathsK: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly mobilityFactor: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly mobilityFactorMulti: FieldRef<"AssessmentAcceptanceFactors", 'String'>
    readonly perceptionAwareness: FieldRef<"AssessmentAcceptanceFactors", 'Boolean'>
    readonly evacuationPlanClear: FieldRef<"AssessmentAcceptanceFactors", 'Boolean'>
    readonly noPanicRisk: FieldRef<"AssessmentAcceptanceFactors", 'Boolean'>
    readonly exitCountToOpenSpace: FieldRef<"AssessmentAcceptanceFactors", 'Int'>
    readonly valueTotal: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly valueYear: FieldRef<"AssessmentAcceptanceFactors", 'Int'>
    readonly replaceability: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly dependencyType: FieldRef<"AssessmentAcceptanceFactors", 'String'>
    readonly dependencyManual: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly factor_a: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly factor_t: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly factor_c: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly factor_r: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly factor_d: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly level_A: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly level_A1: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly level_A2: FieldRef<"AssessmentAcceptanceFactors", 'Float'>
    readonly createdAt: FieldRef<"AssessmentAcceptanceFactors", 'DateTime'>
    readonly updatedAt: FieldRef<"AssessmentAcceptanceFactors", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AssessmentAcceptanceFactors findUnique
   */
  export type AssessmentAcceptanceFactorsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentAcceptanceFactors
     */
    select?: AssessmentAcceptanceFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentAcceptanceFactors
     */
    omit?: AssessmentAcceptanceFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentAcceptanceFactorsInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentAcceptanceFactors to fetch.
     */
    where: AssessmentAcceptanceFactorsWhereUniqueInput
  }

  /**
   * AssessmentAcceptanceFactors findUniqueOrThrow
   */
  export type AssessmentAcceptanceFactorsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentAcceptanceFactors
     */
    select?: AssessmentAcceptanceFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentAcceptanceFactors
     */
    omit?: AssessmentAcceptanceFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentAcceptanceFactorsInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentAcceptanceFactors to fetch.
     */
    where: AssessmentAcceptanceFactorsWhereUniqueInput
  }

  /**
   * AssessmentAcceptanceFactors findFirst
   */
  export type AssessmentAcceptanceFactorsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentAcceptanceFactors
     */
    select?: AssessmentAcceptanceFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentAcceptanceFactors
     */
    omit?: AssessmentAcceptanceFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentAcceptanceFactorsInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentAcceptanceFactors to fetch.
     */
    where?: AssessmentAcceptanceFactorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentAcceptanceFactors to fetch.
     */
    orderBy?: AssessmentAcceptanceFactorsOrderByWithRelationInput | AssessmentAcceptanceFactorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssessmentAcceptanceFactors.
     */
    cursor?: AssessmentAcceptanceFactorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentAcceptanceFactors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentAcceptanceFactors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentAcceptanceFactors.
     */
    distinct?: AssessmentAcceptanceFactorsScalarFieldEnum | AssessmentAcceptanceFactorsScalarFieldEnum[]
  }

  /**
   * AssessmentAcceptanceFactors findFirstOrThrow
   */
  export type AssessmentAcceptanceFactorsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentAcceptanceFactors
     */
    select?: AssessmentAcceptanceFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentAcceptanceFactors
     */
    omit?: AssessmentAcceptanceFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentAcceptanceFactorsInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentAcceptanceFactors to fetch.
     */
    where?: AssessmentAcceptanceFactorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentAcceptanceFactors to fetch.
     */
    orderBy?: AssessmentAcceptanceFactorsOrderByWithRelationInput | AssessmentAcceptanceFactorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssessmentAcceptanceFactors.
     */
    cursor?: AssessmentAcceptanceFactorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentAcceptanceFactors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentAcceptanceFactors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentAcceptanceFactors.
     */
    distinct?: AssessmentAcceptanceFactorsScalarFieldEnum | AssessmentAcceptanceFactorsScalarFieldEnum[]
  }

  /**
   * AssessmentAcceptanceFactors findMany
   */
  export type AssessmentAcceptanceFactorsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentAcceptanceFactors
     */
    select?: AssessmentAcceptanceFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentAcceptanceFactors
     */
    omit?: AssessmentAcceptanceFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentAcceptanceFactorsInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentAcceptanceFactors to fetch.
     */
    where?: AssessmentAcceptanceFactorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentAcceptanceFactors to fetch.
     */
    orderBy?: AssessmentAcceptanceFactorsOrderByWithRelationInput | AssessmentAcceptanceFactorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AssessmentAcceptanceFactors.
     */
    cursor?: AssessmentAcceptanceFactorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentAcceptanceFactors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentAcceptanceFactors.
     */
    skip?: number
    distinct?: AssessmentAcceptanceFactorsScalarFieldEnum | AssessmentAcceptanceFactorsScalarFieldEnum[]
  }

  /**
   * AssessmentAcceptanceFactors create
   */
  export type AssessmentAcceptanceFactorsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentAcceptanceFactors
     */
    select?: AssessmentAcceptanceFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentAcceptanceFactors
     */
    omit?: AssessmentAcceptanceFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentAcceptanceFactorsInclude<ExtArgs> | null
    /**
     * The data needed to create a AssessmentAcceptanceFactors.
     */
    data: XOR<AssessmentAcceptanceFactorsCreateInput, AssessmentAcceptanceFactorsUncheckedCreateInput>
  }

  /**
   * AssessmentAcceptanceFactors createMany
   */
  export type AssessmentAcceptanceFactorsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AssessmentAcceptanceFactors.
     */
    data: AssessmentAcceptanceFactorsCreateManyInput | AssessmentAcceptanceFactorsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssessmentAcceptanceFactors createManyAndReturn
   */
  export type AssessmentAcceptanceFactorsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentAcceptanceFactors
     */
    select?: AssessmentAcceptanceFactorsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentAcceptanceFactors
     */
    omit?: AssessmentAcceptanceFactorsOmit<ExtArgs> | null
    /**
     * The data used to create many AssessmentAcceptanceFactors.
     */
    data: AssessmentAcceptanceFactorsCreateManyInput | AssessmentAcceptanceFactorsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentAcceptanceFactorsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AssessmentAcceptanceFactors update
   */
  export type AssessmentAcceptanceFactorsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentAcceptanceFactors
     */
    select?: AssessmentAcceptanceFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentAcceptanceFactors
     */
    omit?: AssessmentAcceptanceFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentAcceptanceFactorsInclude<ExtArgs> | null
    /**
     * The data needed to update a AssessmentAcceptanceFactors.
     */
    data: XOR<AssessmentAcceptanceFactorsUpdateInput, AssessmentAcceptanceFactorsUncheckedUpdateInput>
    /**
     * Choose, which AssessmentAcceptanceFactors to update.
     */
    where: AssessmentAcceptanceFactorsWhereUniqueInput
  }

  /**
   * AssessmentAcceptanceFactors updateMany
   */
  export type AssessmentAcceptanceFactorsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AssessmentAcceptanceFactors.
     */
    data: XOR<AssessmentAcceptanceFactorsUpdateManyMutationInput, AssessmentAcceptanceFactorsUncheckedUpdateManyInput>
    /**
     * Filter which AssessmentAcceptanceFactors to update
     */
    where?: AssessmentAcceptanceFactorsWhereInput
    /**
     * Limit how many AssessmentAcceptanceFactors to update.
     */
    limit?: number
  }

  /**
   * AssessmentAcceptanceFactors updateManyAndReturn
   */
  export type AssessmentAcceptanceFactorsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentAcceptanceFactors
     */
    select?: AssessmentAcceptanceFactorsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentAcceptanceFactors
     */
    omit?: AssessmentAcceptanceFactorsOmit<ExtArgs> | null
    /**
     * The data used to update AssessmentAcceptanceFactors.
     */
    data: XOR<AssessmentAcceptanceFactorsUpdateManyMutationInput, AssessmentAcceptanceFactorsUncheckedUpdateManyInput>
    /**
     * Filter which AssessmentAcceptanceFactors to update
     */
    where?: AssessmentAcceptanceFactorsWhereInput
    /**
     * Limit how many AssessmentAcceptanceFactors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentAcceptanceFactorsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AssessmentAcceptanceFactors upsert
   */
  export type AssessmentAcceptanceFactorsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentAcceptanceFactors
     */
    select?: AssessmentAcceptanceFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentAcceptanceFactors
     */
    omit?: AssessmentAcceptanceFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentAcceptanceFactorsInclude<ExtArgs> | null
    /**
     * The filter to search for the AssessmentAcceptanceFactors to update in case it exists.
     */
    where: AssessmentAcceptanceFactorsWhereUniqueInput
    /**
     * In case the AssessmentAcceptanceFactors found by the `where` argument doesn't exist, create a new AssessmentAcceptanceFactors with this data.
     */
    create: XOR<AssessmentAcceptanceFactorsCreateInput, AssessmentAcceptanceFactorsUncheckedCreateInput>
    /**
     * In case the AssessmentAcceptanceFactors was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssessmentAcceptanceFactorsUpdateInput, AssessmentAcceptanceFactorsUncheckedUpdateInput>
  }

  /**
   * AssessmentAcceptanceFactors delete
   */
  export type AssessmentAcceptanceFactorsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentAcceptanceFactors
     */
    select?: AssessmentAcceptanceFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentAcceptanceFactors
     */
    omit?: AssessmentAcceptanceFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentAcceptanceFactorsInclude<ExtArgs> | null
    /**
     * Filter which AssessmentAcceptanceFactors to delete.
     */
    where: AssessmentAcceptanceFactorsWhereUniqueInput
  }

  /**
   * AssessmentAcceptanceFactors deleteMany
   */
  export type AssessmentAcceptanceFactorsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssessmentAcceptanceFactors to delete
     */
    where?: AssessmentAcceptanceFactorsWhereInput
    /**
     * Limit how many AssessmentAcceptanceFactors to delete.
     */
    limit?: number
  }

  /**
   * AssessmentAcceptanceFactors without action
   */
  export type AssessmentAcceptanceFactorsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentAcceptanceFactors
     */
    select?: AssessmentAcceptanceFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentAcceptanceFactors
     */
    omit?: AssessmentAcceptanceFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentAcceptanceFactorsInclude<ExtArgs> | null
  }


  /**
   * Model AssessmentProtectionFactors
   */

  export type AggregateAssessmentProtectionFactors = {
    _count: AssessmentProtectionFactorsCountAggregateOutputType | null
    _avg: AssessmentProtectionFactorsAvgAggregateOutputType | null
    _sum: AssessmentProtectionFactorsSumAggregateOutputType | null
    _min: AssessmentProtectionFactorsMinAggregateOutputType | null
    _max: AssessmentProtectionFactorsMaxAggregateOutputType | null
  }

  export type AssessmentProtectionFactorsAvgAggregateOutputType = {
    waterCapacity: number | null
    requiredWaterCapacity: number | null
    w2Penalty: number | null
    waterFlowCapacity: number | null
    hydrantCount25: number | null
    hydrantCount3: number | null
    hydrantCount4: number | null
    equivalentHydrant25: number | null
    averageHydrantDistance: number | null
    w4Score: number | null
    staticPressureRequired: number | null
    staticPressureAvailable: number | null
    w5Score: number | null
    detectionType: number | null
    sprinklerType: number | null
    fireStationType: number | null
    waterSupplyType: number | null
    industrialBrigade: number | null
    s6OtherSuppression: number | null
    n1: number | null
    n2: number | null
    n3: number | null
    n4: number | null
    n5: number | null
    structureResist: number | null
    facadeResist: number | null
    roofResist: number | null
    wallResist: number | null
    subcompartment: number | null
    stairways: number | null
    stairwaysIndex: number | null
    horizontalExit: number | null
    sprinklers: number | null
    factor_W: number | null
    factor_N: number | null
    factor_S: number | null
    factor_F: number | null
    factor_U: number | null
    factor_Y: number | null
    level_D: number | null
    level_D1: number | null
    level_D2: number | null
  }

  export type AssessmentProtectionFactorsSumAggregateOutputType = {
    waterCapacity: number | null
    requiredWaterCapacity: number | null
    w2Penalty: number | null
    waterFlowCapacity: number | null
    hydrantCount25: number | null
    hydrantCount3: number | null
    hydrantCount4: number | null
    equivalentHydrant25: number | null
    averageHydrantDistance: number | null
    w4Score: number | null
    staticPressureRequired: number | null
    staticPressureAvailable: number | null
    w5Score: number | null
    detectionType: number | null
    sprinklerType: number | null
    fireStationType: number | null
    waterSupplyType: number | null
    industrialBrigade: number | null
    s6OtherSuppression: number | null
    n1: number | null
    n2: number | null
    n3: number | null
    n4: number | null
    n5: number | null
    structureResist: number | null
    facadeResist: number | null
    roofResist: number | null
    wallResist: number | null
    subcompartment: number | null
    stairways: number | null
    stairwaysIndex: number | null
    horizontalExit: number | null
    sprinklers: number | null
    factor_W: number | null
    factor_N: number | null
    factor_S: number | null
    factor_F: number | null
    factor_U: number | null
    factor_Y: number | null
    level_D: number | null
    level_D1: number | null
    level_D2: number | null
  }

  export type AssessmentProtectionFactorsMinAggregateOutputType = {
    id: string | null
    assessmentId: string | null
    waterStorageType: string | null
    waterCapacity: number | null
    requiredWaterCapacity: number | null
    w2Penalty: number | null
    distributionNetwork: string | null
    pipeDiameter: string | null
    isRingNetwork: boolean | null
    waterFlowCapacity: number | null
    distributionNetworkAdequacy: string | null
    hydrantCount25: number | null
    hydrantCount3: number | null
    hydrantCount4: number | null
    equivalentHydrant25: number | null
    averageHydrantDistance: number | null
    w4Score: number | null
    staticPressureRequired: number | null
    staticPressureAvailable: number | null
    w5Score: number | null
    detectionType: number | null
    s1ElectronicSystem: boolean | null
    s1ZoneIdentification: boolean | null
    sprinklerType: number | null
    fireStationType: number | null
    waterSupplyType: number | null
    industrialBrigade: number | null
    industrialBrigadeLabel: string | null
    s6OtherSuppression: number | null
    s7UnlimitedWater: boolean | null
    s8DedicatedWater: boolean | null
    s9WaterControl: boolean | null
    n1: number | null
    n1ContinuousPresence: boolean | null
    n1ManualWarning: boolean | null
    n1FireDeptNotification: boolean | null
    n1ResidentAlarm: boolean | null
    n2: number | null
    n3: number | null
    n4: number | null
    n5: number | null
    structureResist: number | null
    facadeResist: number | null
    roofResist: number | null
    wallResist: number | null
    hasManyWindows: boolean | null
    noInternalSeparation: boolean | null
    combustibleInsulation: boolean | null
    subcompartment: number | null
    stairways: number | null
    stairwaysIndex: number | null
    horizontalExit: number | null
    sprinklers: number | null
    u1PartialDetection: boolean | null
    u2Max300Occupants: boolean | null
    u3VoiceEvacuation: boolean | null
    u4MarkedExits: boolean | null
    u5SmokeEvacuation: boolean | null
    partialDetection: boolean | null
    partialSprinkler: boolean | null
    otherAutoExtinguish: boolean | null
    financialDataBackup: boolean | null
    sparePartsAccess: boolean | null
    selfRepairCapability: boolean | null
    relocationAgreements: boolean | null
    immediateActivityTransfer: boolean | null
    multipleProduction: boolean | null
    factor_W: number | null
    factor_N: number | null
    factor_S: number | null
    factor_F: number | null
    factor_U: number | null
    factor_Y: number | null
    level_D: number | null
    level_D1: number | null
    level_D2: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssessmentProtectionFactorsMaxAggregateOutputType = {
    id: string | null
    assessmentId: string | null
    waterStorageType: string | null
    waterCapacity: number | null
    requiredWaterCapacity: number | null
    w2Penalty: number | null
    distributionNetwork: string | null
    pipeDiameter: string | null
    isRingNetwork: boolean | null
    waterFlowCapacity: number | null
    distributionNetworkAdequacy: string | null
    hydrantCount25: number | null
    hydrantCount3: number | null
    hydrantCount4: number | null
    equivalentHydrant25: number | null
    averageHydrantDistance: number | null
    w4Score: number | null
    staticPressureRequired: number | null
    staticPressureAvailable: number | null
    w5Score: number | null
    detectionType: number | null
    s1ElectronicSystem: boolean | null
    s1ZoneIdentification: boolean | null
    sprinklerType: number | null
    fireStationType: number | null
    waterSupplyType: number | null
    industrialBrigade: number | null
    industrialBrigadeLabel: string | null
    s6OtherSuppression: number | null
    s7UnlimitedWater: boolean | null
    s8DedicatedWater: boolean | null
    s9WaterControl: boolean | null
    n1: number | null
    n1ContinuousPresence: boolean | null
    n1ManualWarning: boolean | null
    n1FireDeptNotification: boolean | null
    n1ResidentAlarm: boolean | null
    n2: number | null
    n3: number | null
    n4: number | null
    n5: number | null
    structureResist: number | null
    facadeResist: number | null
    roofResist: number | null
    wallResist: number | null
    hasManyWindows: boolean | null
    noInternalSeparation: boolean | null
    combustibleInsulation: boolean | null
    subcompartment: number | null
    stairways: number | null
    stairwaysIndex: number | null
    horizontalExit: number | null
    sprinklers: number | null
    u1PartialDetection: boolean | null
    u2Max300Occupants: boolean | null
    u3VoiceEvacuation: boolean | null
    u4MarkedExits: boolean | null
    u5SmokeEvacuation: boolean | null
    partialDetection: boolean | null
    partialSprinkler: boolean | null
    otherAutoExtinguish: boolean | null
    financialDataBackup: boolean | null
    sparePartsAccess: boolean | null
    selfRepairCapability: boolean | null
    relocationAgreements: boolean | null
    immediateActivityTransfer: boolean | null
    multipleProduction: boolean | null
    factor_W: number | null
    factor_N: number | null
    factor_S: number | null
    factor_F: number | null
    factor_U: number | null
    factor_Y: number | null
    level_D: number | null
    level_D1: number | null
    level_D2: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssessmentProtectionFactorsCountAggregateOutputType = {
    id: number
    assessmentId: number
    waterStorageType: number
    waterCapacity: number
    requiredWaterCapacity: number
    w2Penalty: number
    distributionNetwork: number
    pipeDiameter: number
    isRingNetwork: number
    waterFlowCapacity: number
    distributionNetworkAdequacy: number
    hydrantCount25: number
    hydrantCount3: number
    hydrantCount4: number
    equivalentHydrant25: number
    averageHydrantDistance: number
    w4Score: number
    staticPressureRequired: number
    staticPressureAvailable: number
    w5Score: number
    detectionType: number
    s1ElectronicSystem: number
    s1ZoneIdentification: number
    sprinklerType: number
    fireStationType: number
    waterSupplyType: number
    industrialBrigade: number
    industrialBrigadeLabel: number
    s6OtherSuppression: number
    s7UnlimitedWater: number
    s8DedicatedWater: number
    s9WaterControl: number
    n1: number
    n1ContinuousPresence: number
    n1ManualWarning: number
    n1FireDeptNotification: number
    n1ResidentAlarm: number
    n2: number
    n3: number
    n4: number
    n5: number
    structureResist: number
    facadeResist: number
    roofResist: number
    wallResist: number
    hasManyWindows: number
    noInternalSeparation: number
    combustibleInsulation: number
    subcompartment: number
    stairways: number
    stairwaysIndex: number
    horizontalExit: number
    sprinklers: number
    u1PartialDetection: number
    u2Max300Occupants: number
    u3VoiceEvacuation: number
    u4MarkedExits: number
    u5SmokeEvacuation: number
    partialDetection: number
    partialSprinkler: number
    otherAutoExtinguish: number
    financialDataBackup: number
    sparePartsAccess: number
    selfRepairCapability: number
    relocationAgreements: number
    immediateActivityTransfer: number
    multipleProduction: number
    factor_W: number
    factor_N: number
    factor_S: number
    factor_F: number
    factor_U: number
    factor_Y: number
    level_D: number
    level_D1: number
    level_D2: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AssessmentProtectionFactorsAvgAggregateInputType = {
    waterCapacity?: true
    requiredWaterCapacity?: true
    w2Penalty?: true
    waterFlowCapacity?: true
    hydrantCount25?: true
    hydrantCount3?: true
    hydrantCount4?: true
    equivalentHydrant25?: true
    averageHydrantDistance?: true
    w4Score?: true
    staticPressureRequired?: true
    staticPressureAvailable?: true
    w5Score?: true
    detectionType?: true
    sprinklerType?: true
    fireStationType?: true
    waterSupplyType?: true
    industrialBrigade?: true
    s6OtherSuppression?: true
    n1?: true
    n2?: true
    n3?: true
    n4?: true
    n5?: true
    structureResist?: true
    facadeResist?: true
    roofResist?: true
    wallResist?: true
    subcompartment?: true
    stairways?: true
    stairwaysIndex?: true
    horizontalExit?: true
    sprinklers?: true
    factor_W?: true
    factor_N?: true
    factor_S?: true
    factor_F?: true
    factor_U?: true
    factor_Y?: true
    level_D?: true
    level_D1?: true
    level_D2?: true
  }

  export type AssessmentProtectionFactorsSumAggregateInputType = {
    waterCapacity?: true
    requiredWaterCapacity?: true
    w2Penalty?: true
    waterFlowCapacity?: true
    hydrantCount25?: true
    hydrantCount3?: true
    hydrantCount4?: true
    equivalentHydrant25?: true
    averageHydrantDistance?: true
    w4Score?: true
    staticPressureRequired?: true
    staticPressureAvailable?: true
    w5Score?: true
    detectionType?: true
    sprinklerType?: true
    fireStationType?: true
    waterSupplyType?: true
    industrialBrigade?: true
    s6OtherSuppression?: true
    n1?: true
    n2?: true
    n3?: true
    n4?: true
    n5?: true
    structureResist?: true
    facadeResist?: true
    roofResist?: true
    wallResist?: true
    subcompartment?: true
    stairways?: true
    stairwaysIndex?: true
    horizontalExit?: true
    sprinklers?: true
    factor_W?: true
    factor_N?: true
    factor_S?: true
    factor_F?: true
    factor_U?: true
    factor_Y?: true
    level_D?: true
    level_D1?: true
    level_D2?: true
  }

  export type AssessmentProtectionFactorsMinAggregateInputType = {
    id?: true
    assessmentId?: true
    waterStorageType?: true
    waterCapacity?: true
    requiredWaterCapacity?: true
    w2Penalty?: true
    distributionNetwork?: true
    pipeDiameter?: true
    isRingNetwork?: true
    waterFlowCapacity?: true
    distributionNetworkAdequacy?: true
    hydrantCount25?: true
    hydrantCount3?: true
    hydrantCount4?: true
    equivalentHydrant25?: true
    averageHydrantDistance?: true
    w4Score?: true
    staticPressureRequired?: true
    staticPressureAvailable?: true
    w5Score?: true
    detectionType?: true
    s1ElectronicSystem?: true
    s1ZoneIdentification?: true
    sprinklerType?: true
    fireStationType?: true
    waterSupplyType?: true
    industrialBrigade?: true
    industrialBrigadeLabel?: true
    s6OtherSuppression?: true
    s7UnlimitedWater?: true
    s8DedicatedWater?: true
    s9WaterControl?: true
    n1?: true
    n1ContinuousPresence?: true
    n1ManualWarning?: true
    n1FireDeptNotification?: true
    n1ResidentAlarm?: true
    n2?: true
    n3?: true
    n4?: true
    n5?: true
    structureResist?: true
    facadeResist?: true
    roofResist?: true
    wallResist?: true
    hasManyWindows?: true
    noInternalSeparation?: true
    combustibleInsulation?: true
    subcompartment?: true
    stairways?: true
    stairwaysIndex?: true
    horizontalExit?: true
    sprinklers?: true
    u1PartialDetection?: true
    u2Max300Occupants?: true
    u3VoiceEvacuation?: true
    u4MarkedExits?: true
    u5SmokeEvacuation?: true
    partialDetection?: true
    partialSprinkler?: true
    otherAutoExtinguish?: true
    financialDataBackup?: true
    sparePartsAccess?: true
    selfRepairCapability?: true
    relocationAgreements?: true
    immediateActivityTransfer?: true
    multipleProduction?: true
    factor_W?: true
    factor_N?: true
    factor_S?: true
    factor_F?: true
    factor_U?: true
    factor_Y?: true
    level_D?: true
    level_D1?: true
    level_D2?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssessmentProtectionFactorsMaxAggregateInputType = {
    id?: true
    assessmentId?: true
    waterStorageType?: true
    waterCapacity?: true
    requiredWaterCapacity?: true
    w2Penalty?: true
    distributionNetwork?: true
    pipeDiameter?: true
    isRingNetwork?: true
    waterFlowCapacity?: true
    distributionNetworkAdequacy?: true
    hydrantCount25?: true
    hydrantCount3?: true
    hydrantCount4?: true
    equivalentHydrant25?: true
    averageHydrantDistance?: true
    w4Score?: true
    staticPressureRequired?: true
    staticPressureAvailable?: true
    w5Score?: true
    detectionType?: true
    s1ElectronicSystem?: true
    s1ZoneIdentification?: true
    sprinklerType?: true
    fireStationType?: true
    waterSupplyType?: true
    industrialBrigade?: true
    industrialBrigadeLabel?: true
    s6OtherSuppression?: true
    s7UnlimitedWater?: true
    s8DedicatedWater?: true
    s9WaterControl?: true
    n1?: true
    n1ContinuousPresence?: true
    n1ManualWarning?: true
    n1FireDeptNotification?: true
    n1ResidentAlarm?: true
    n2?: true
    n3?: true
    n4?: true
    n5?: true
    structureResist?: true
    facadeResist?: true
    roofResist?: true
    wallResist?: true
    hasManyWindows?: true
    noInternalSeparation?: true
    combustibleInsulation?: true
    subcompartment?: true
    stairways?: true
    stairwaysIndex?: true
    horizontalExit?: true
    sprinklers?: true
    u1PartialDetection?: true
    u2Max300Occupants?: true
    u3VoiceEvacuation?: true
    u4MarkedExits?: true
    u5SmokeEvacuation?: true
    partialDetection?: true
    partialSprinkler?: true
    otherAutoExtinguish?: true
    financialDataBackup?: true
    sparePartsAccess?: true
    selfRepairCapability?: true
    relocationAgreements?: true
    immediateActivityTransfer?: true
    multipleProduction?: true
    factor_W?: true
    factor_N?: true
    factor_S?: true
    factor_F?: true
    factor_U?: true
    factor_Y?: true
    level_D?: true
    level_D1?: true
    level_D2?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssessmentProtectionFactorsCountAggregateInputType = {
    id?: true
    assessmentId?: true
    waterStorageType?: true
    waterCapacity?: true
    requiredWaterCapacity?: true
    w2Penalty?: true
    distributionNetwork?: true
    pipeDiameter?: true
    isRingNetwork?: true
    waterFlowCapacity?: true
    distributionNetworkAdequacy?: true
    hydrantCount25?: true
    hydrantCount3?: true
    hydrantCount4?: true
    equivalentHydrant25?: true
    averageHydrantDistance?: true
    w4Score?: true
    staticPressureRequired?: true
    staticPressureAvailable?: true
    w5Score?: true
    detectionType?: true
    s1ElectronicSystem?: true
    s1ZoneIdentification?: true
    sprinklerType?: true
    fireStationType?: true
    waterSupplyType?: true
    industrialBrigade?: true
    industrialBrigadeLabel?: true
    s6OtherSuppression?: true
    s7UnlimitedWater?: true
    s8DedicatedWater?: true
    s9WaterControl?: true
    n1?: true
    n1ContinuousPresence?: true
    n1ManualWarning?: true
    n1FireDeptNotification?: true
    n1ResidentAlarm?: true
    n2?: true
    n3?: true
    n4?: true
    n5?: true
    structureResist?: true
    facadeResist?: true
    roofResist?: true
    wallResist?: true
    hasManyWindows?: true
    noInternalSeparation?: true
    combustibleInsulation?: true
    subcompartment?: true
    stairways?: true
    stairwaysIndex?: true
    horizontalExit?: true
    sprinklers?: true
    u1PartialDetection?: true
    u2Max300Occupants?: true
    u3VoiceEvacuation?: true
    u4MarkedExits?: true
    u5SmokeEvacuation?: true
    partialDetection?: true
    partialSprinkler?: true
    otherAutoExtinguish?: true
    financialDataBackup?: true
    sparePartsAccess?: true
    selfRepairCapability?: true
    relocationAgreements?: true
    immediateActivityTransfer?: true
    multipleProduction?: true
    factor_W?: true
    factor_N?: true
    factor_S?: true
    factor_F?: true
    factor_U?: true
    factor_Y?: true
    level_D?: true
    level_D1?: true
    level_D2?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AssessmentProtectionFactorsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssessmentProtectionFactors to aggregate.
     */
    where?: AssessmentProtectionFactorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentProtectionFactors to fetch.
     */
    orderBy?: AssessmentProtectionFactorsOrderByWithRelationInput | AssessmentProtectionFactorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssessmentProtectionFactorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentProtectionFactors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentProtectionFactors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AssessmentProtectionFactors
    **/
    _count?: true | AssessmentProtectionFactorsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssessmentProtectionFactorsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssessmentProtectionFactorsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssessmentProtectionFactorsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssessmentProtectionFactorsMaxAggregateInputType
  }

  export type GetAssessmentProtectionFactorsAggregateType<T extends AssessmentProtectionFactorsAggregateArgs> = {
        [P in keyof T & keyof AggregateAssessmentProtectionFactors]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssessmentProtectionFactors[P]>
      : GetScalarType<T[P], AggregateAssessmentProtectionFactors[P]>
  }




  export type AssessmentProtectionFactorsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentProtectionFactorsWhereInput
    orderBy?: AssessmentProtectionFactorsOrderByWithAggregationInput | AssessmentProtectionFactorsOrderByWithAggregationInput[]
    by: AssessmentProtectionFactorsScalarFieldEnum[] | AssessmentProtectionFactorsScalarFieldEnum
    having?: AssessmentProtectionFactorsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssessmentProtectionFactorsCountAggregateInputType | true
    _avg?: AssessmentProtectionFactorsAvgAggregateInputType
    _sum?: AssessmentProtectionFactorsSumAggregateInputType
    _min?: AssessmentProtectionFactorsMinAggregateInputType
    _max?: AssessmentProtectionFactorsMaxAggregateInputType
  }

  export type AssessmentProtectionFactorsGroupByOutputType = {
    id: string
    assessmentId: string
    waterStorageType: string | null
    waterCapacity: number | null
    requiredWaterCapacity: number | null
    w2Penalty: number | null
    distributionNetwork: string | null
    pipeDiameter: string | null
    isRingNetwork: boolean | null
    waterFlowCapacity: number | null
    distributionNetworkAdequacy: string | null
    hydrantCount25: number | null
    hydrantCount3: number | null
    hydrantCount4: number | null
    equivalentHydrant25: number | null
    averageHydrantDistance: number | null
    w4Score: number | null
    staticPressureRequired: number | null
    staticPressureAvailable: number | null
    w5Score: number | null
    detectionType: number | null
    s1ElectronicSystem: boolean | null
    s1ZoneIdentification: boolean | null
    sprinklerType: number | null
    fireStationType: number | null
    waterSupplyType: number | null
    industrialBrigade: number | null
    industrialBrigadeLabel: string | null
    s6OtherSuppression: number | null
    s7UnlimitedWater: boolean | null
    s8DedicatedWater: boolean | null
    s9WaterControl: boolean | null
    n1: number | null
    n1ContinuousPresence: boolean | null
    n1ManualWarning: boolean | null
    n1FireDeptNotification: boolean | null
    n1ResidentAlarm: boolean | null
    n2: number | null
    n3: number | null
    n4: number | null
    n5: number | null
    structureResist: number | null
    facadeResist: number | null
    roofResist: number | null
    wallResist: number | null
    hasManyWindows: boolean | null
    noInternalSeparation: boolean | null
    combustibleInsulation: boolean | null
    subcompartment: number | null
    stairways: number | null
    stairwaysIndex: number | null
    horizontalExit: number | null
    sprinklers: number | null
    u1PartialDetection: boolean | null
    u2Max300Occupants: boolean | null
    u3VoiceEvacuation: boolean | null
    u4MarkedExits: boolean | null
    u5SmokeEvacuation: boolean | null
    partialDetection: boolean | null
    partialSprinkler: boolean | null
    otherAutoExtinguish: boolean | null
    financialDataBackup: boolean | null
    sparePartsAccess: boolean | null
    selfRepairCapability: boolean | null
    relocationAgreements: boolean | null
    immediateActivityTransfer: boolean | null
    multipleProduction: boolean | null
    factor_W: number | null
    factor_N: number | null
    factor_S: number | null
    factor_F: number | null
    factor_U: number | null
    factor_Y: number | null
    level_D: number | null
    level_D1: number | null
    level_D2: number | null
    createdAt: Date
    updatedAt: Date
    _count: AssessmentProtectionFactorsCountAggregateOutputType | null
    _avg: AssessmentProtectionFactorsAvgAggregateOutputType | null
    _sum: AssessmentProtectionFactorsSumAggregateOutputType | null
    _min: AssessmentProtectionFactorsMinAggregateOutputType | null
    _max: AssessmentProtectionFactorsMaxAggregateOutputType | null
  }

  type GetAssessmentProtectionFactorsGroupByPayload<T extends AssessmentProtectionFactorsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssessmentProtectionFactorsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssessmentProtectionFactorsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssessmentProtectionFactorsGroupByOutputType[P]>
            : GetScalarType<T[P], AssessmentProtectionFactorsGroupByOutputType[P]>
        }
      >
    >


  export type AssessmentProtectionFactorsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assessmentId?: boolean
    waterStorageType?: boolean
    waterCapacity?: boolean
    requiredWaterCapacity?: boolean
    w2Penalty?: boolean
    distributionNetwork?: boolean
    pipeDiameter?: boolean
    isRingNetwork?: boolean
    waterFlowCapacity?: boolean
    distributionNetworkAdequacy?: boolean
    hydrantCount25?: boolean
    hydrantCount3?: boolean
    hydrantCount4?: boolean
    equivalentHydrant25?: boolean
    averageHydrantDistance?: boolean
    w4Score?: boolean
    staticPressureRequired?: boolean
    staticPressureAvailable?: boolean
    w5Score?: boolean
    detectionType?: boolean
    s1ElectronicSystem?: boolean
    s1ZoneIdentification?: boolean
    sprinklerType?: boolean
    fireStationType?: boolean
    waterSupplyType?: boolean
    industrialBrigade?: boolean
    industrialBrigadeLabel?: boolean
    s6OtherSuppression?: boolean
    s7UnlimitedWater?: boolean
    s8DedicatedWater?: boolean
    s9WaterControl?: boolean
    n1?: boolean
    n1ContinuousPresence?: boolean
    n1ManualWarning?: boolean
    n1FireDeptNotification?: boolean
    n1ResidentAlarm?: boolean
    n2?: boolean
    n3?: boolean
    n4?: boolean
    n5?: boolean
    structureResist?: boolean
    facadeResist?: boolean
    roofResist?: boolean
    wallResist?: boolean
    hasManyWindows?: boolean
    noInternalSeparation?: boolean
    combustibleInsulation?: boolean
    subcompartment?: boolean
    stairways?: boolean
    stairwaysIndex?: boolean
    horizontalExit?: boolean
    sprinklers?: boolean
    u1PartialDetection?: boolean
    u2Max300Occupants?: boolean
    u3VoiceEvacuation?: boolean
    u4MarkedExits?: boolean
    u5SmokeEvacuation?: boolean
    partialDetection?: boolean
    partialSprinkler?: boolean
    otherAutoExtinguish?: boolean
    financialDataBackup?: boolean
    sparePartsAccess?: boolean
    selfRepairCapability?: boolean
    relocationAgreements?: boolean
    immediateActivityTransfer?: boolean
    multipleProduction?: boolean
    factor_W?: boolean
    factor_N?: boolean
    factor_S?: boolean
    factor_F?: boolean
    factor_U?: boolean
    factor_Y?: boolean
    level_D?: boolean
    level_D1?: boolean
    level_D2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessmentProtectionFactors"]>

  export type AssessmentProtectionFactorsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assessmentId?: boolean
    waterStorageType?: boolean
    waterCapacity?: boolean
    requiredWaterCapacity?: boolean
    w2Penalty?: boolean
    distributionNetwork?: boolean
    pipeDiameter?: boolean
    isRingNetwork?: boolean
    waterFlowCapacity?: boolean
    distributionNetworkAdequacy?: boolean
    hydrantCount25?: boolean
    hydrantCount3?: boolean
    hydrantCount4?: boolean
    equivalentHydrant25?: boolean
    averageHydrantDistance?: boolean
    w4Score?: boolean
    staticPressureRequired?: boolean
    staticPressureAvailable?: boolean
    w5Score?: boolean
    detectionType?: boolean
    s1ElectronicSystem?: boolean
    s1ZoneIdentification?: boolean
    sprinklerType?: boolean
    fireStationType?: boolean
    waterSupplyType?: boolean
    industrialBrigade?: boolean
    industrialBrigadeLabel?: boolean
    s6OtherSuppression?: boolean
    s7UnlimitedWater?: boolean
    s8DedicatedWater?: boolean
    s9WaterControl?: boolean
    n1?: boolean
    n1ContinuousPresence?: boolean
    n1ManualWarning?: boolean
    n1FireDeptNotification?: boolean
    n1ResidentAlarm?: boolean
    n2?: boolean
    n3?: boolean
    n4?: boolean
    n5?: boolean
    structureResist?: boolean
    facadeResist?: boolean
    roofResist?: boolean
    wallResist?: boolean
    hasManyWindows?: boolean
    noInternalSeparation?: boolean
    combustibleInsulation?: boolean
    subcompartment?: boolean
    stairways?: boolean
    stairwaysIndex?: boolean
    horizontalExit?: boolean
    sprinklers?: boolean
    u1PartialDetection?: boolean
    u2Max300Occupants?: boolean
    u3VoiceEvacuation?: boolean
    u4MarkedExits?: boolean
    u5SmokeEvacuation?: boolean
    partialDetection?: boolean
    partialSprinkler?: boolean
    otherAutoExtinguish?: boolean
    financialDataBackup?: boolean
    sparePartsAccess?: boolean
    selfRepairCapability?: boolean
    relocationAgreements?: boolean
    immediateActivityTransfer?: boolean
    multipleProduction?: boolean
    factor_W?: boolean
    factor_N?: boolean
    factor_S?: boolean
    factor_F?: boolean
    factor_U?: boolean
    factor_Y?: boolean
    level_D?: boolean
    level_D1?: boolean
    level_D2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessmentProtectionFactors"]>

  export type AssessmentProtectionFactorsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assessmentId?: boolean
    waterStorageType?: boolean
    waterCapacity?: boolean
    requiredWaterCapacity?: boolean
    w2Penalty?: boolean
    distributionNetwork?: boolean
    pipeDiameter?: boolean
    isRingNetwork?: boolean
    waterFlowCapacity?: boolean
    distributionNetworkAdequacy?: boolean
    hydrantCount25?: boolean
    hydrantCount3?: boolean
    hydrantCount4?: boolean
    equivalentHydrant25?: boolean
    averageHydrantDistance?: boolean
    w4Score?: boolean
    staticPressureRequired?: boolean
    staticPressureAvailable?: boolean
    w5Score?: boolean
    detectionType?: boolean
    s1ElectronicSystem?: boolean
    s1ZoneIdentification?: boolean
    sprinklerType?: boolean
    fireStationType?: boolean
    waterSupplyType?: boolean
    industrialBrigade?: boolean
    industrialBrigadeLabel?: boolean
    s6OtherSuppression?: boolean
    s7UnlimitedWater?: boolean
    s8DedicatedWater?: boolean
    s9WaterControl?: boolean
    n1?: boolean
    n1ContinuousPresence?: boolean
    n1ManualWarning?: boolean
    n1FireDeptNotification?: boolean
    n1ResidentAlarm?: boolean
    n2?: boolean
    n3?: boolean
    n4?: boolean
    n5?: boolean
    structureResist?: boolean
    facadeResist?: boolean
    roofResist?: boolean
    wallResist?: boolean
    hasManyWindows?: boolean
    noInternalSeparation?: boolean
    combustibleInsulation?: boolean
    subcompartment?: boolean
    stairways?: boolean
    stairwaysIndex?: boolean
    horizontalExit?: boolean
    sprinklers?: boolean
    u1PartialDetection?: boolean
    u2Max300Occupants?: boolean
    u3VoiceEvacuation?: boolean
    u4MarkedExits?: boolean
    u5SmokeEvacuation?: boolean
    partialDetection?: boolean
    partialSprinkler?: boolean
    otherAutoExtinguish?: boolean
    financialDataBackup?: boolean
    sparePartsAccess?: boolean
    selfRepairCapability?: boolean
    relocationAgreements?: boolean
    immediateActivityTransfer?: boolean
    multipleProduction?: boolean
    factor_W?: boolean
    factor_N?: boolean
    factor_S?: boolean
    factor_F?: boolean
    factor_U?: boolean
    factor_Y?: boolean
    level_D?: boolean
    level_D1?: boolean
    level_D2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessmentProtectionFactors"]>

  export type AssessmentProtectionFactorsSelectScalar = {
    id?: boolean
    assessmentId?: boolean
    waterStorageType?: boolean
    waterCapacity?: boolean
    requiredWaterCapacity?: boolean
    w2Penalty?: boolean
    distributionNetwork?: boolean
    pipeDiameter?: boolean
    isRingNetwork?: boolean
    waterFlowCapacity?: boolean
    distributionNetworkAdequacy?: boolean
    hydrantCount25?: boolean
    hydrantCount3?: boolean
    hydrantCount4?: boolean
    equivalentHydrant25?: boolean
    averageHydrantDistance?: boolean
    w4Score?: boolean
    staticPressureRequired?: boolean
    staticPressureAvailable?: boolean
    w5Score?: boolean
    detectionType?: boolean
    s1ElectronicSystem?: boolean
    s1ZoneIdentification?: boolean
    sprinklerType?: boolean
    fireStationType?: boolean
    waterSupplyType?: boolean
    industrialBrigade?: boolean
    industrialBrigadeLabel?: boolean
    s6OtherSuppression?: boolean
    s7UnlimitedWater?: boolean
    s8DedicatedWater?: boolean
    s9WaterControl?: boolean
    n1?: boolean
    n1ContinuousPresence?: boolean
    n1ManualWarning?: boolean
    n1FireDeptNotification?: boolean
    n1ResidentAlarm?: boolean
    n2?: boolean
    n3?: boolean
    n4?: boolean
    n5?: boolean
    structureResist?: boolean
    facadeResist?: boolean
    roofResist?: boolean
    wallResist?: boolean
    hasManyWindows?: boolean
    noInternalSeparation?: boolean
    combustibleInsulation?: boolean
    subcompartment?: boolean
    stairways?: boolean
    stairwaysIndex?: boolean
    horizontalExit?: boolean
    sprinklers?: boolean
    u1PartialDetection?: boolean
    u2Max300Occupants?: boolean
    u3VoiceEvacuation?: boolean
    u4MarkedExits?: boolean
    u5SmokeEvacuation?: boolean
    partialDetection?: boolean
    partialSprinkler?: boolean
    otherAutoExtinguish?: boolean
    financialDataBackup?: boolean
    sparePartsAccess?: boolean
    selfRepairCapability?: boolean
    relocationAgreements?: boolean
    immediateActivityTransfer?: boolean
    multipleProduction?: boolean
    factor_W?: boolean
    factor_N?: boolean
    factor_S?: boolean
    factor_F?: boolean
    factor_U?: boolean
    factor_Y?: boolean
    level_D?: boolean
    level_D1?: boolean
    level_D2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AssessmentProtectionFactorsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "assessmentId" | "waterStorageType" | "waterCapacity" | "requiredWaterCapacity" | "w2Penalty" | "distributionNetwork" | "pipeDiameter" | "isRingNetwork" | "waterFlowCapacity" | "distributionNetworkAdequacy" | "hydrantCount25" | "hydrantCount3" | "hydrantCount4" | "equivalentHydrant25" | "averageHydrantDistance" | "w4Score" | "staticPressureRequired" | "staticPressureAvailable" | "w5Score" | "detectionType" | "s1ElectronicSystem" | "s1ZoneIdentification" | "sprinklerType" | "fireStationType" | "waterSupplyType" | "industrialBrigade" | "industrialBrigadeLabel" | "s6OtherSuppression" | "s7UnlimitedWater" | "s8DedicatedWater" | "s9WaterControl" | "n1" | "n1ContinuousPresence" | "n1ManualWarning" | "n1FireDeptNotification" | "n1ResidentAlarm" | "n2" | "n3" | "n4" | "n5" | "structureResist" | "facadeResist" | "roofResist" | "wallResist" | "hasManyWindows" | "noInternalSeparation" | "combustibleInsulation" | "subcompartment" | "stairways" | "stairwaysIndex" | "horizontalExit" | "sprinklers" | "u1PartialDetection" | "u2Max300Occupants" | "u3VoiceEvacuation" | "u4MarkedExits" | "u5SmokeEvacuation" | "partialDetection" | "partialSprinkler" | "otherAutoExtinguish" | "financialDataBackup" | "sparePartsAccess" | "selfRepairCapability" | "relocationAgreements" | "immediateActivityTransfer" | "multipleProduction" | "factor_W" | "factor_N" | "factor_S" | "factor_F" | "factor_U" | "factor_Y" | "level_D" | "level_D1" | "level_D2" | "createdAt" | "updatedAt", ExtArgs["result"]["assessmentProtectionFactors"]>
  export type AssessmentProtectionFactorsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }
  export type AssessmentProtectionFactorsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }
  export type AssessmentProtectionFactorsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }

  export type $AssessmentProtectionFactorsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AssessmentProtectionFactors"
    objects: {
      assessment: Prisma.$AssessmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      assessmentId: string
      waterStorageType: string | null
      waterCapacity: number | null
      requiredWaterCapacity: number | null
      w2Penalty: number | null
      distributionNetwork: string | null
      pipeDiameter: string | null
      isRingNetwork: boolean | null
      waterFlowCapacity: number | null
      distributionNetworkAdequacy: string | null
      hydrantCount25: number | null
      hydrantCount3: number | null
      hydrantCount4: number | null
      equivalentHydrant25: number | null
      averageHydrantDistance: number | null
      w4Score: number | null
      staticPressureRequired: number | null
      staticPressureAvailable: number | null
      w5Score: number | null
      detectionType: number | null
      s1ElectronicSystem: boolean | null
      s1ZoneIdentification: boolean | null
      sprinklerType: number | null
      fireStationType: number | null
      waterSupplyType: number | null
      industrialBrigade: number | null
      industrialBrigadeLabel: string | null
      s6OtherSuppression: number | null
      s7UnlimitedWater: boolean | null
      s8DedicatedWater: boolean | null
      s9WaterControl: boolean | null
      n1: number | null
      n1ContinuousPresence: boolean | null
      n1ManualWarning: boolean | null
      n1FireDeptNotification: boolean | null
      n1ResidentAlarm: boolean | null
      n2: number | null
      n3: number | null
      n4: number | null
      n5: number | null
      structureResist: number | null
      facadeResist: number | null
      roofResist: number | null
      wallResist: number | null
      hasManyWindows: boolean | null
      noInternalSeparation: boolean | null
      combustibleInsulation: boolean | null
      subcompartment: number | null
      stairways: number | null
      stairwaysIndex: number | null
      horizontalExit: number | null
      sprinklers: number | null
      u1PartialDetection: boolean | null
      u2Max300Occupants: boolean | null
      u3VoiceEvacuation: boolean | null
      u4MarkedExits: boolean | null
      u5SmokeEvacuation: boolean | null
      partialDetection: boolean | null
      partialSprinkler: boolean | null
      otherAutoExtinguish: boolean | null
      financialDataBackup: boolean | null
      sparePartsAccess: boolean | null
      selfRepairCapability: boolean | null
      relocationAgreements: boolean | null
      immediateActivityTransfer: boolean | null
      multipleProduction: boolean | null
      factor_W: number | null
      factor_N: number | null
      factor_S: number | null
      factor_F: number | null
      factor_U: number | null
      factor_Y: number | null
      level_D: number | null
      level_D1: number | null
      level_D2: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["assessmentProtectionFactors"]>
    composites: {}
  }

  type AssessmentProtectionFactorsGetPayload<S extends boolean | null | undefined | AssessmentProtectionFactorsDefaultArgs> = $Result.GetResult<Prisma.$AssessmentProtectionFactorsPayload, S>

  type AssessmentProtectionFactorsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssessmentProtectionFactorsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssessmentProtectionFactorsCountAggregateInputType | true
    }

  export interface AssessmentProtectionFactorsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AssessmentProtectionFactors'], meta: { name: 'AssessmentProtectionFactors' } }
    /**
     * Find zero or one AssessmentProtectionFactors that matches the filter.
     * @param {AssessmentProtectionFactorsFindUniqueArgs} args - Arguments to find a AssessmentProtectionFactors
     * @example
     * // Get one AssessmentProtectionFactors
     * const assessmentProtectionFactors = await prisma.assessmentProtectionFactors.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssessmentProtectionFactorsFindUniqueArgs>(args: SelectSubset<T, AssessmentProtectionFactorsFindUniqueArgs<ExtArgs>>): Prisma__AssessmentProtectionFactorsClient<$Result.GetResult<Prisma.$AssessmentProtectionFactorsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AssessmentProtectionFactors that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssessmentProtectionFactorsFindUniqueOrThrowArgs} args - Arguments to find a AssessmentProtectionFactors
     * @example
     * // Get one AssessmentProtectionFactors
     * const assessmentProtectionFactors = await prisma.assessmentProtectionFactors.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssessmentProtectionFactorsFindUniqueOrThrowArgs>(args: SelectSubset<T, AssessmentProtectionFactorsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssessmentProtectionFactorsClient<$Result.GetResult<Prisma.$AssessmentProtectionFactorsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssessmentProtectionFactors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentProtectionFactorsFindFirstArgs} args - Arguments to find a AssessmentProtectionFactors
     * @example
     * // Get one AssessmentProtectionFactors
     * const assessmentProtectionFactors = await prisma.assessmentProtectionFactors.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssessmentProtectionFactorsFindFirstArgs>(args?: SelectSubset<T, AssessmentProtectionFactorsFindFirstArgs<ExtArgs>>): Prisma__AssessmentProtectionFactorsClient<$Result.GetResult<Prisma.$AssessmentProtectionFactorsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssessmentProtectionFactors that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentProtectionFactorsFindFirstOrThrowArgs} args - Arguments to find a AssessmentProtectionFactors
     * @example
     * // Get one AssessmentProtectionFactors
     * const assessmentProtectionFactors = await prisma.assessmentProtectionFactors.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssessmentProtectionFactorsFindFirstOrThrowArgs>(args?: SelectSubset<T, AssessmentProtectionFactorsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssessmentProtectionFactorsClient<$Result.GetResult<Prisma.$AssessmentProtectionFactorsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AssessmentProtectionFactors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentProtectionFactorsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AssessmentProtectionFactors
     * const assessmentProtectionFactors = await prisma.assessmentProtectionFactors.findMany()
     * 
     * // Get first 10 AssessmentProtectionFactors
     * const assessmentProtectionFactors = await prisma.assessmentProtectionFactors.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assessmentProtectionFactorsWithIdOnly = await prisma.assessmentProtectionFactors.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssessmentProtectionFactorsFindManyArgs>(args?: SelectSubset<T, AssessmentProtectionFactorsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentProtectionFactorsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AssessmentProtectionFactors.
     * @param {AssessmentProtectionFactorsCreateArgs} args - Arguments to create a AssessmentProtectionFactors.
     * @example
     * // Create one AssessmentProtectionFactors
     * const AssessmentProtectionFactors = await prisma.assessmentProtectionFactors.create({
     *   data: {
     *     // ... data to create a AssessmentProtectionFactors
     *   }
     * })
     * 
     */
    create<T extends AssessmentProtectionFactorsCreateArgs>(args: SelectSubset<T, AssessmentProtectionFactorsCreateArgs<ExtArgs>>): Prisma__AssessmentProtectionFactorsClient<$Result.GetResult<Prisma.$AssessmentProtectionFactorsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AssessmentProtectionFactors.
     * @param {AssessmentProtectionFactorsCreateManyArgs} args - Arguments to create many AssessmentProtectionFactors.
     * @example
     * // Create many AssessmentProtectionFactors
     * const assessmentProtectionFactors = await prisma.assessmentProtectionFactors.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssessmentProtectionFactorsCreateManyArgs>(args?: SelectSubset<T, AssessmentProtectionFactorsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AssessmentProtectionFactors and returns the data saved in the database.
     * @param {AssessmentProtectionFactorsCreateManyAndReturnArgs} args - Arguments to create many AssessmentProtectionFactors.
     * @example
     * // Create many AssessmentProtectionFactors
     * const assessmentProtectionFactors = await prisma.assessmentProtectionFactors.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AssessmentProtectionFactors and only return the `id`
     * const assessmentProtectionFactorsWithIdOnly = await prisma.assessmentProtectionFactors.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssessmentProtectionFactorsCreateManyAndReturnArgs>(args?: SelectSubset<T, AssessmentProtectionFactorsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentProtectionFactorsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AssessmentProtectionFactors.
     * @param {AssessmentProtectionFactorsDeleteArgs} args - Arguments to delete one AssessmentProtectionFactors.
     * @example
     * // Delete one AssessmentProtectionFactors
     * const AssessmentProtectionFactors = await prisma.assessmentProtectionFactors.delete({
     *   where: {
     *     // ... filter to delete one AssessmentProtectionFactors
     *   }
     * })
     * 
     */
    delete<T extends AssessmentProtectionFactorsDeleteArgs>(args: SelectSubset<T, AssessmentProtectionFactorsDeleteArgs<ExtArgs>>): Prisma__AssessmentProtectionFactorsClient<$Result.GetResult<Prisma.$AssessmentProtectionFactorsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AssessmentProtectionFactors.
     * @param {AssessmentProtectionFactorsUpdateArgs} args - Arguments to update one AssessmentProtectionFactors.
     * @example
     * // Update one AssessmentProtectionFactors
     * const assessmentProtectionFactors = await prisma.assessmentProtectionFactors.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssessmentProtectionFactorsUpdateArgs>(args: SelectSubset<T, AssessmentProtectionFactorsUpdateArgs<ExtArgs>>): Prisma__AssessmentProtectionFactorsClient<$Result.GetResult<Prisma.$AssessmentProtectionFactorsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AssessmentProtectionFactors.
     * @param {AssessmentProtectionFactorsDeleteManyArgs} args - Arguments to filter AssessmentProtectionFactors to delete.
     * @example
     * // Delete a few AssessmentProtectionFactors
     * const { count } = await prisma.assessmentProtectionFactors.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssessmentProtectionFactorsDeleteManyArgs>(args?: SelectSubset<T, AssessmentProtectionFactorsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssessmentProtectionFactors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentProtectionFactorsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AssessmentProtectionFactors
     * const assessmentProtectionFactors = await prisma.assessmentProtectionFactors.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssessmentProtectionFactorsUpdateManyArgs>(args: SelectSubset<T, AssessmentProtectionFactorsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssessmentProtectionFactors and returns the data updated in the database.
     * @param {AssessmentProtectionFactorsUpdateManyAndReturnArgs} args - Arguments to update many AssessmentProtectionFactors.
     * @example
     * // Update many AssessmentProtectionFactors
     * const assessmentProtectionFactors = await prisma.assessmentProtectionFactors.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AssessmentProtectionFactors and only return the `id`
     * const assessmentProtectionFactorsWithIdOnly = await prisma.assessmentProtectionFactors.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AssessmentProtectionFactorsUpdateManyAndReturnArgs>(args: SelectSubset<T, AssessmentProtectionFactorsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentProtectionFactorsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AssessmentProtectionFactors.
     * @param {AssessmentProtectionFactorsUpsertArgs} args - Arguments to update or create a AssessmentProtectionFactors.
     * @example
     * // Update or create a AssessmentProtectionFactors
     * const assessmentProtectionFactors = await prisma.assessmentProtectionFactors.upsert({
     *   create: {
     *     // ... data to create a AssessmentProtectionFactors
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AssessmentProtectionFactors we want to update
     *   }
     * })
     */
    upsert<T extends AssessmentProtectionFactorsUpsertArgs>(args: SelectSubset<T, AssessmentProtectionFactorsUpsertArgs<ExtArgs>>): Prisma__AssessmentProtectionFactorsClient<$Result.GetResult<Prisma.$AssessmentProtectionFactorsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AssessmentProtectionFactors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentProtectionFactorsCountArgs} args - Arguments to filter AssessmentProtectionFactors to count.
     * @example
     * // Count the number of AssessmentProtectionFactors
     * const count = await prisma.assessmentProtectionFactors.count({
     *   where: {
     *     // ... the filter for the AssessmentProtectionFactors we want to count
     *   }
     * })
    **/
    count<T extends AssessmentProtectionFactorsCountArgs>(
      args?: Subset<T, AssessmentProtectionFactorsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssessmentProtectionFactorsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AssessmentProtectionFactors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentProtectionFactorsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssessmentProtectionFactorsAggregateArgs>(args: Subset<T, AssessmentProtectionFactorsAggregateArgs>): Prisma.PrismaPromise<GetAssessmentProtectionFactorsAggregateType<T>>

    /**
     * Group by AssessmentProtectionFactors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentProtectionFactorsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssessmentProtectionFactorsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssessmentProtectionFactorsGroupByArgs['orderBy'] }
        : { orderBy?: AssessmentProtectionFactorsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssessmentProtectionFactorsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssessmentProtectionFactorsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AssessmentProtectionFactors model
   */
  readonly fields: AssessmentProtectionFactorsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AssessmentProtectionFactors.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssessmentProtectionFactorsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assessment<T extends AssessmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AssessmentDefaultArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AssessmentProtectionFactors model
   */
  interface AssessmentProtectionFactorsFieldRefs {
    readonly id: FieldRef<"AssessmentProtectionFactors", 'String'>
    readonly assessmentId: FieldRef<"AssessmentProtectionFactors", 'String'>
    readonly waterStorageType: FieldRef<"AssessmentProtectionFactors", 'String'>
    readonly waterCapacity: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly requiredWaterCapacity: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly w2Penalty: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly distributionNetwork: FieldRef<"AssessmentProtectionFactors", 'String'>
    readonly pipeDiameter: FieldRef<"AssessmentProtectionFactors", 'String'>
    readonly isRingNetwork: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly waterFlowCapacity: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly distributionNetworkAdequacy: FieldRef<"AssessmentProtectionFactors", 'String'>
    readonly hydrantCount25: FieldRef<"AssessmentProtectionFactors", 'Int'>
    readonly hydrantCount3: FieldRef<"AssessmentProtectionFactors", 'Int'>
    readonly hydrantCount4: FieldRef<"AssessmentProtectionFactors", 'Int'>
    readonly equivalentHydrant25: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly averageHydrantDistance: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly w4Score: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly staticPressureRequired: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly staticPressureAvailable: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly w5Score: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly detectionType: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly s1ElectronicSystem: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly s1ZoneIdentification: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly sprinklerType: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly fireStationType: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly waterSupplyType: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly industrialBrigade: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly industrialBrigadeLabel: FieldRef<"AssessmentProtectionFactors", 'String'>
    readonly s6OtherSuppression: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly s7UnlimitedWater: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly s8DedicatedWater: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly s9WaterControl: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly n1: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly n1ContinuousPresence: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly n1ManualWarning: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly n1FireDeptNotification: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly n1ResidentAlarm: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly n2: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly n3: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly n4: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly n5: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly structureResist: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly facadeResist: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly roofResist: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly wallResist: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly hasManyWindows: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly noInternalSeparation: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly combustibleInsulation: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly subcompartment: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly stairways: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly stairwaysIndex: FieldRef<"AssessmentProtectionFactors", 'Int'>
    readonly horizontalExit: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly sprinklers: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly u1PartialDetection: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly u2Max300Occupants: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly u3VoiceEvacuation: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly u4MarkedExits: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly u5SmokeEvacuation: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly partialDetection: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly partialSprinkler: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly otherAutoExtinguish: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly financialDataBackup: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly sparePartsAccess: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly selfRepairCapability: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly relocationAgreements: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly immediateActivityTransfer: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly multipleProduction: FieldRef<"AssessmentProtectionFactors", 'Boolean'>
    readonly factor_W: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly factor_N: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly factor_S: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly factor_F: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly factor_U: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly factor_Y: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly level_D: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly level_D1: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly level_D2: FieldRef<"AssessmentProtectionFactors", 'Float'>
    readonly createdAt: FieldRef<"AssessmentProtectionFactors", 'DateTime'>
    readonly updatedAt: FieldRef<"AssessmentProtectionFactors", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AssessmentProtectionFactors findUnique
   */
  export type AssessmentProtectionFactorsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentProtectionFactors
     */
    select?: AssessmentProtectionFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentProtectionFactors
     */
    omit?: AssessmentProtectionFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentProtectionFactorsInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentProtectionFactors to fetch.
     */
    where: AssessmentProtectionFactorsWhereUniqueInput
  }

  /**
   * AssessmentProtectionFactors findUniqueOrThrow
   */
  export type AssessmentProtectionFactorsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentProtectionFactors
     */
    select?: AssessmentProtectionFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentProtectionFactors
     */
    omit?: AssessmentProtectionFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentProtectionFactorsInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentProtectionFactors to fetch.
     */
    where: AssessmentProtectionFactorsWhereUniqueInput
  }

  /**
   * AssessmentProtectionFactors findFirst
   */
  export type AssessmentProtectionFactorsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentProtectionFactors
     */
    select?: AssessmentProtectionFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentProtectionFactors
     */
    omit?: AssessmentProtectionFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentProtectionFactorsInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentProtectionFactors to fetch.
     */
    where?: AssessmentProtectionFactorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentProtectionFactors to fetch.
     */
    orderBy?: AssessmentProtectionFactorsOrderByWithRelationInput | AssessmentProtectionFactorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssessmentProtectionFactors.
     */
    cursor?: AssessmentProtectionFactorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentProtectionFactors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentProtectionFactors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentProtectionFactors.
     */
    distinct?: AssessmentProtectionFactorsScalarFieldEnum | AssessmentProtectionFactorsScalarFieldEnum[]
  }

  /**
   * AssessmentProtectionFactors findFirstOrThrow
   */
  export type AssessmentProtectionFactorsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentProtectionFactors
     */
    select?: AssessmentProtectionFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentProtectionFactors
     */
    omit?: AssessmentProtectionFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentProtectionFactorsInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentProtectionFactors to fetch.
     */
    where?: AssessmentProtectionFactorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentProtectionFactors to fetch.
     */
    orderBy?: AssessmentProtectionFactorsOrderByWithRelationInput | AssessmentProtectionFactorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssessmentProtectionFactors.
     */
    cursor?: AssessmentProtectionFactorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentProtectionFactors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentProtectionFactors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentProtectionFactors.
     */
    distinct?: AssessmentProtectionFactorsScalarFieldEnum | AssessmentProtectionFactorsScalarFieldEnum[]
  }

  /**
   * AssessmentProtectionFactors findMany
   */
  export type AssessmentProtectionFactorsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentProtectionFactors
     */
    select?: AssessmentProtectionFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentProtectionFactors
     */
    omit?: AssessmentProtectionFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentProtectionFactorsInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentProtectionFactors to fetch.
     */
    where?: AssessmentProtectionFactorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentProtectionFactors to fetch.
     */
    orderBy?: AssessmentProtectionFactorsOrderByWithRelationInput | AssessmentProtectionFactorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AssessmentProtectionFactors.
     */
    cursor?: AssessmentProtectionFactorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentProtectionFactors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentProtectionFactors.
     */
    skip?: number
    distinct?: AssessmentProtectionFactorsScalarFieldEnum | AssessmentProtectionFactorsScalarFieldEnum[]
  }

  /**
   * AssessmentProtectionFactors create
   */
  export type AssessmentProtectionFactorsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentProtectionFactors
     */
    select?: AssessmentProtectionFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentProtectionFactors
     */
    omit?: AssessmentProtectionFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentProtectionFactorsInclude<ExtArgs> | null
    /**
     * The data needed to create a AssessmentProtectionFactors.
     */
    data: XOR<AssessmentProtectionFactorsCreateInput, AssessmentProtectionFactorsUncheckedCreateInput>
  }

  /**
   * AssessmentProtectionFactors createMany
   */
  export type AssessmentProtectionFactorsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AssessmentProtectionFactors.
     */
    data: AssessmentProtectionFactorsCreateManyInput | AssessmentProtectionFactorsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssessmentProtectionFactors createManyAndReturn
   */
  export type AssessmentProtectionFactorsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentProtectionFactors
     */
    select?: AssessmentProtectionFactorsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentProtectionFactors
     */
    omit?: AssessmentProtectionFactorsOmit<ExtArgs> | null
    /**
     * The data used to create many AssessmentProtectionFactors.
     */
    data: AssessmentProtectionFactorsCreateManyInput | AssessmentProtectionFactorsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentProtectionFactorsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AssessmentProtectionFactors update
   */
  export type AssessmentProtectionFactorsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentProtectionFactors
     */
    select?: AssessmentProtectionFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentProtectionFactors
     */
    omit?: AssessmentProtectionFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentProtectionFactorsInclude<ExtArgs> | null
    /**
     * The data needed to update a AssessmentProtectionFactors.
     */
    data: XOR<AssessmentProtectionFactorsUpdateInput, AssessmentProtectionFactorsUncheckedUpdateInput>
    /**
     * Choose, which AssessmentProtectionFactors to update.
     */
    where: AssessmentProtectionFactorsWhereUniqueInput
  }

  /**
   * AssessmentProtectionFactors updateMany
   */
  export type AssessmentProtectionFactorsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AssessmentProtectionFactors.
     */
    data: XOR<AssessmentProtectionFactorsUpdateManyMutationInput, AssessmentProtectionFactorsUncheckedUpdateManyInput>
    /**
     * Filter which AssessmentProtectionFactors to update
     */
    where?: AssessmentProtectionFactorsWhereInput
    /**
     * Limit how many AssessmentProtectionFactors to update.
     */
    limit?: number
  }

  /**
   * AssessmentProtectionFactors updateManyAndReturn
   */
  export type AssessmentProtectionFactorsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentProtectionFactors
     */
    select?: AssessmentProtectionFactorsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentProtectionFactors
     */
    omit?: AssessmentProtectionFactorsOmit<ExtArgs> | null
    /**
     * The data used to update AssessmentProtectionFactors.
     */
    data: XOR<AssessmentProtectionFactorsUpdateManyMutationInput, AssessmentProtectionFactorsUncheckedUpdateManyInput>
    /**
     * Filter which AssessmentProtectionFactors to update
     */
    where?: AssessmentProtectionFactorsWhereInput
    /**
     * Limit how many AssessmentProtectionFactors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentProtectionFactorsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AssessmentProtectionFactors upsert
   */
  export type AssessmentProtectionFactorsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentProtectionFactors
     */
    select?: AssessmentProtectionFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentProtectionFactors
     */
    omit?: AssessmentProtectionFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentProtectionFactorsInclude<ExtArgs> | null
    /**
     * The filter to search for the AssessmentProtectionFactors to update in case it exists.
     */
    where: AssessmentProtectionFactorsWhereUniqueInput
    /**
     * In case the AssessmentProtectionFactors found by the `where` argument doesn't exist, create a new AssessmentProtectionFactors with this data.
     */
    create: XOR<AssessmentProtectionFactorsCreateInput, AssessmentProtectionFactorsUncheckedCreateInput>
    /**
     * In case the AssessmentProtectionFactors was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssessmentProtectionFactorsUpdateInput, AssessmentProtectionFactorsUncheckedUpdateInput>
  }

  /**
   * AssessmentProtectionFactors delete
   */
  export type AssessmentProtectionFactorsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentProtectionFactors
     */
    select?: AssessmentProtectionFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentProtectionFactors
     */
    omit?: AssessmentProtectionFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentProtectionFactorsInclude<ExtArgs> | null
    /**
     * Filter which AssessmentProtectionFactors to delete.
     */
    where: AssessmentProtectionFactorsWhereUniqueInput
  }

  /**
   * AssessmentProtectionFactors deleteMany
   */
  export type AssessmentProtectionFactorsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssessmentProtectionFactors to delete
     */
    where?: AssessmentProtectionFactorsWhereInput
    /**
     * Limit how many AssessmentProtectionFactors to delete.
     */
    limit?: number
  }

  /**
   * AssessmentProtectionFactors without action
   */
  export type AssessmentProtectionFactorsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentProtectionFactors
     */
    select?: AssessmentProtectionFactorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentProtectionFactors
     */
    omit?: AssessmentProtectionFactorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentProtectionFactorsInclude<ExtArgs> | null
  }


  /**
   * Model AssessmentFinalRisks
   */

  export type AggregateAssessmentFinalRisks = {
    _count: AssessmentFinalRisksCountAggregateOutputType | null
    _avg: AssessmentFinalRisksAvgAggregateOutputType | null
    _sum: AssessmentFinalRisksSumAggregateOutputType | null
    _min: AssessmentFinalRisksMinAggregateOutputType | null
    _max: AssessmentFinalRisksMaxAggregateOutputType | null
  }

  export type AssessmentFinalRisksAvgAggregateOutputType = {
    factor_Fo: number | null
    risk_Ro: number | null
    final_R: number | null
    final_R1: number | null
    final_R2: number | null
  }

  export type AssessmentFinalRisksSumAggregateOutputType = {
    factor_Fo: number | null
    risk_Ro: number | null
    final_R: number | null
    final_R1: number | null
    final_R2: number | null
  }

  export type AssessmentFinalRisksMinAggregateOutputType = {
    id: string | null
    assessmentId: string | null
    factor_Fo: number | null
    risk_Ro: number | null
    final_R: number | null
    final_R1: number | null
    final_R2: number | null
    status_R: string | null
    status_R1: string | null
    status_R2: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssessmentFinalRisksMaxAggregateOutputType = {
    id: string | null
    assessmentId: string | null
    factor_Fo: number | null
    risk_Ro: number | null
    final_R: number | null
    final_R1: number | null
    final_R2: number | null
    status_R: string | null
    status_R1: string | null
    status_R2: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssessmentFinalRisksCountAggregateOutputType = {
    id: number
    assessmentId: number
    factor_Fo: number
    risk_Ro: number
    final_R: number
    final_R1: number
    final_R2: number
    status_R: number
    status_R1: number
    status_R2: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AssessmentFinalRisksAvgAggregateInputType = {
    factor_Fo?: true
    risk_Ro?: true
    final_R?: true
    final_R1?: true
    final_R2?: true
  }

  export type AssessmentFinalRisksSumAggregateInputType = {
    factor_Fo?: true
    risk_Ro?: true
    final_R?: true
    final_R1?: true
    final_R2?: true
  }

  export type AssessmentFinalRisksMinAggregateInputType = {
    id?: true
    assessmentId?: true
    factor_Fo?: true
    risk_Ro?: true
    final_R?: true
    final_R1?: true
    final_R2?: true
    status_R?: true
    status_R1?: true
    status_R2?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssessmentFinalRisksMaxAggregateInputType = {
    id?: true
    assessmentId?: true
    factor_Fo?: true
    risk_Ro?: true
    final_R?: true
    final_R1?: true
    final_R2?: true
    status_R?: true
    status_R1?: true
    status_R2?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssessmentFinalRisksCountAggregateInputType = {
    id?: true
    assessmentId?: true
    factor_Fo?: true
    risk_Ro?: true
    final_R?: true
    final_R1?: true
    final_R2?: true
    status_R?: true
    status_R1?: true
    status_R2?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AssessmentFinalRisksAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssessmentFinalRisks to aggregate.
     */
    where?: AssessmentFinalRisksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentFinalRisks to fetch.
     */
    orderBy?: AssessmentFinalRisksOrderByWithRelationInput | AssessmentFinalRisksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssessmentFinalRisksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentFinalRisks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentFinalRisks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AssessmentFinalRisks
    **/
    _count?: true | AssessmentFinalRisksCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssessmentFinalRisksAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssessmentFinalRisksSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssessmentFinalRisksMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssessmentFinalRisksMaxAggregateInputType
  }

  export type GetAssessmentFinalRisksAggregateType<T extends AssessmentFinalRisksAggregateArgs> = {
        [P in keyof T & keyof AggregateAssessmentFinalRisks]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssessmentFinalRisks[P]>
      : GetScalarType<T[P], AggregateAssessmentFinalRisks[P]>
  }




  export type AssessmentFinalRisksGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentFinalRisksWhereInput
    orderBy?: AssessmentFinalRisksOrderByWithAggregationInput | AssessmentFinalRisksOrderByWithAggregationInput[]
    by: AssessmentFinalRisksScalarFieldEnum[] | AssessmentFinalRisksScalarFieldEnum
    having?: AssessmentFinalRisksScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssessmentFinalRisksCountAggregateInputType | true
    _avg?: AssessmentFinalRisksAvgAggregateInputType
    _sum?: AssessmentFinalRisksSumAggregateInputType
    _min?: AssessmentFinalRisksMinAggregateInputType
    _max?: AssessmentFinalRisksMaxAggregateInputType
  }

  export type AssessmentFinalRisksGroupByOutputType = {
    id: string
    assessmentId: string
    factor_Fo: number | null
    risk_Ro: number | null
    final_R: number | null
    final_R1: number | null
    final_R2: number | null
    status_R: string | null
    status_R1: string | null
    status_R2: string | null
    createdAt: Date
    updatedAt: Date
    _count: AssessmentFinalRisksCountAggregateOutputType | null
    _avg: AssessmentFinalRisksAvgAggregateOutputType | null
    _sum: AssessmentFinalRisksSumAggregateOutputType | null
    _min: AssessmentFinalRisksMinAggregateOutputType | null
    _max: AssessmentFinalRisksMaxAggregateOutputType | null
  }

  type GetAssessmentFinalRisksGroupByPayload<T extends AssessmentFinalRisksGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssessmentFinalRisksGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssessmentFinalRisksGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssessmentFinalRisksGroupByOutputType[P]>
            : GetScalarType<T[P], AssessmentFinalRisksGroupByOutputType[P]>
        }
      >
    >


  export type AssessmentFinalRisksSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assessmentId?: boolean
    factor_Fo?: boolean
    risk_Ro?: boolean
    final_R?: boolean
    final_R1?: boolean
    final_R2?: boolean
    status_R?: boolean
    status_R1?: boolean
    status_R2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessmentFinalRisks"]>

  export type AssessmentFinalRisksSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assessmentId?: boolean
    factor_Fo?: boolean
    risk_Ro?: boolean
    final_R?: boolean
    final_R1?: boolean
    final_R2?: boolean
    status_R?: boolean
    status_R1?: boolean
    status_R2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessmentFinalRisks"]>

  export type AssessmentFinalRisksSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assessmentId?: boolean
    factor_Fo?: boolean
    risk_Ro?: boolean
    final_R?: boolean
    final_R1?: boolean
    final_R2?: boolean
    status_R?: boolean
    status_R1?: boolean
    status_R2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessmentFinalRisks"]>

  export type AssessmentFinalRisksSelectScalar = {
    id?: boolean
    assessmentId?: boolean
    factor_Fo?: boolean
    risk_Ro?: boolean
    final_R?: boolean
    final_R1?: boolean
    final_R2?: boolean
    status_R?: boolean
    status_R1?: boolean
    status_R2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AssessmentFinalRisksOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "assessmentId" | "factor_Fo" | "risk_Ro" | "final_R" | "final_R1" | "final_R2" | "status_R" | "status_R1" | "status_R2" | "createdAt" | "updatedAt", ExtArgs["result"]["assessmentFinalRisks"]>
  export type AssessmentFinalRisksInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }
  export type AssessmentFinalRisksIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }
  export type AssessmentFinalRisksIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessment?: boolean | AssessmentDefaultArgs<ExtArgs>
  }

  export type $AssessmentFinalRisksPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AssessmentFinalRisks"
    objects: {
      assessment: Prisma.$AssessmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      assessmentId: string
      factor_Fo: number | null
      risk_Ro: number | null
      final_R: number | null
      final_R1: number | null
      final_R2: number | null
      status_R: string | null
      status_R1: string | null
      status_R2: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["assessmentFinalRisks"]>
    composites: {}
  }

  type AssessmentFinalRisksGetPayload<S extends boolean | null | undefined | AssessmentFinalRisksDefaultArgs> = $Result.GetResult<Prisma.$AssessmentFinalRisksPayload, S>

  type AssessmentFinalRisksCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssessmentFinalRisksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssessmentFinalRisksCountAggregateInputType | true
    }

  export interface AssessmentFinalRisksDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AssessmentFinalRisks'], meta: { name: 'AssessmentFinalRisks' } }
    /**
     * Find zero or one AssessmentFinalRisks that matches the filter.
     * @param {AssessmentFinalRisksFindUniqueArgs} args - Arguments to find a AssessmentFinalRisks
     * @example
     * // Get one AssessmentFinalRisks
     * const assessmentFinalRisks = await prisma.assessmentFinalRisks.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssessmentFinalRisksFindUniqueArgs>(args: SelectSubset<T, AssessmentFinalRisksFindUniqueArgs<ExtArgs>>): Prisma__AssessmentFinalRisksClient<$Result.GetResult<Prisma.$AssessmentFinalRisksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AssessmentFinalRisks that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssessmentFinalRisksFindUniqueOrThrowArgs} args - Arguments to find a AssessmentFinalRisks
     * @example
     * // Get one AssessmentFinalRisks
     * const assessmentFinalRisks = await prisma.assessmentFinalRisks.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssessmentFinalRisksFindUniqueOrThrowArgs>(args: SelectSubset<T, AssessmentFinalRisksFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssessmentFinalRisksClient<$Result.GetResult<Prisma.$AssessmentFinalRisksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssessmentFinalRisks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFinalRisksFindFirstArgs} args - Arguments to find a AssessmentFinalRisks
     * @example
     * // Get one AssessmentFinalRisks
     * const assessmentFinalRisks = await prisma.assessmentFinalRisks.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssessmentFinalRisksFindFirstArgs>(args?: SelectSubset<T, AssessmentFinalRisksFindFirstArgs<ExtArgs>>): Prisma__AssessmentFinalRisksClient<$Result.GetResult<Prisma.$AssessmentFinalRisksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssessmentFinalRisks that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFinalRisksFindFirstOrThrowArgs} args - Arguments to find a AssessmentFinalRisks
     * @example
     * // Get one AssessmentFinalRisks
     * const assessmentFinalRisks = await prisma.assessmentFinalRisks.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssessmentFinalRisksFindFirstOrThrowArgs>(args?: SelectSubset<T, AssessmentFinalRisksFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssessmentFinalRisksClient<$Result.GetResult<Prisma.$AssessmentFinalRisksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AssessmentFinalRisks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFinalRisksFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AssessmentFinalRisks
     * const assessmentFinalRisks = await prisma.assessmentFinalRisks.findMany()
     * 
     * // Get first 10 AssessmentFinalRisks
     * const assessmentFinalRisks = await prisma.assessmentFinalRisks.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assessmentFinalRisksWithIdOnly = await prisma.assessmentFinalRisks.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssessmentFinalRisksFindManyArgs>(args?: SelectSubset<T, AssessmentFinalRisksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentFinalRisksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AssessmentFinalRisks.
     * @param {AssessmentFinalRisksCreateArgs} args - Arguments to create a AssessmentFinalRisks.
     * @example
     * // Create one AssessmentFinalRisks
     * const AssessmentFinalRisks = await prisma.assessmentFinalRisks.create({
     *   data: {
     *     // ... data to create a AssessmentFinalRisks
     *   }
     * })
     * 
     */
    create<T extends AssessmentFinalRisksCreateArgs>(args: SelectSubset<T, AssessmentFinalRisksCreateArgs<ExtArgs>>): Prisma__AssessmentFinalRisksClient<$Result.GetResult<Prisma.$AssessmentFinalRisksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AssessmentFinalRisks.
     * @param {AssessmentFinalRisksCreateManyArgs} args - Arguments to create many AssessmentFinalRisks.
     * @example
     * // Create many AssessmentFinalRisks
     * const assessmentFinalRisks = await prisma.assessmentFinalRisks.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssessmentFinalRisksCreateManyArgs>(args?: SelectSubset<T, AssessmentFinalRisksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AssessmentFinalRisks and returns the data saved in the database.
     * @param {AssessmentFinalRisksCreateManyAndReturnArgs} args - Arguments to create many AssessmentFinalRisks.
     * @example
     * // Create many AssessmentFinalRisks
     * const assessmentFinalRisks = await prisma.assessmentFinalRisks.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AssessmentFinalRisks and only return the `id`
     * const assessmentFinalRisksWithIdOnly = await prisma.assessmentFinalRisks.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssessmentFinalRisksCreateManyAndReturnArgs>(args?: SelectSubset<T, AssessmentFinalRisksCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentFinalRisksPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AssessmentFinalRisks.
     * @param {AssessmentFinalRisksDeleteArgs} args - Arguments to delete one AssessmentFinalRisks.
     * @example
     * // Delete one AssessmentFinalRisks
     * const AssessmentFinalRisks = await prisma.assessmentFinalRisks.delete({
     *   where: {
     *     // ... filter to delete one AssessmentFinalRisks
     *   }
     * })
     * 
     */
    delete<T extends AssessmentFinalRisksDeleteArgs>(args: SelectSubset<T, AssessmentFinalRisksDeleteArgs<ExtArgs>>): Prisma__AssessmentFinalRisksClient<$Result.GetResult<Prisma.$AssessmentFinalRisksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AssessmentFinalRisks.
     * @param {AssessmentFinalRisksUpdateArgs} args - Arguments to update one AssessmentFinalRisks.
     * @example
     * // Update one AssessmentFinalRisks
     * const assessmentFinalRisks = await prisma.assessmentFinalRisks.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssessmentFinalRisksUpdateArgs>(args: SelectSubset<T, AssessmentFinalRisksUpdateArgs<ExtArgs>>): Prisma__AssessmentFinalRisksClient<$Result.GetResult<Prisma.$AssessmentFinalRisksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AssessmentFinalRisks.
     * @param {AssessmentFinalRisksDeleteManyArgs} args - Arguments to filter AssessmentFinalRisks to delete.
     * @example
     * // Delete a few AssessmentFinalRisks
     * const { count } = await prisma.assessmentFinalRisks.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssessmentFinalRisksDeleteManyArgs>(args?: SelectSubset<T, AssessmentFinalRisksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssessmentFinalRisks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFinalRisksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AssessmentFinalRisks
     * const assessmentFinalRisks = await prisma.assessmentFinalRisks.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssessmentFinalRisksUpdateManyArgs>(args: SelectSubset<T, AssessmentFinalRisksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssessmentFinalRisks and returns the data updated in the database.
     * @param {AssessmentFinalRisksUpdateManyAndReturnArgs} args - Arguments to update many AssessmentFinalRisks.
     * @example
     * // Update many AssessmentFinalRisks
     * const assessmentFinalRisks = await prisma.assessmentFinalRisks.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AssessmentFinalRisks and only return the `id`
     * const assessmentFinalRisksWithIdOnly = await prisma.assessmentFinalRisks.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AssessmentFinalRisksUpdateManyAndReturnArgs>(args: SelectSubset<T, AssessmentFinalRisksUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentFinalRisksPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AssessmentFinalRisks.
     * @param {AssessmentFinalRisksUpsertArgs} args - Arguments to update or create a AssessmentFinalRisks.
     * @example
     * // Update or create a AssessmentFinalRisks
     * const assessmentFinalRisks = await prisma.assessmentFinalRisks.upsert({
     *   create: {
     *     // ... data to create a AssessmentFinalRisks
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AssessmentFinalRisks we want to update
     *   }
     * })
     */
    upsert<T extends AssessmentFinalRisksUpsertArgs>(args: SelectSubset<T, AssessmentFinalRisksUpsertArgs<ExtArgs>>): Prisma__AssessmentFinalRisksClient<$Result.GetResult<Prisma.$AssessmentFinalRisksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AssessmentFinalRisks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFinalRisksCountArgs} args - Arguments to filter AssessmentFinalRisks to count.
     * @example
     * // Count the number of AssessmentFinalRisks
     * const count = await prisma.assessmentFinalRisks.count({
     *   where: {
     *     // ... the filter for the AssessmentFinalRisks we want to count
     *   }
     * })
    **/
    count<T extends AssessmentFinalRisksCountArgs>(
      args?: Subset<T, AssessmentFinalRisksCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssessmentFinalRisksCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AssessmentFinalRisks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFinalRisksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssessmentFinalRisksAggregateArgs>(args: Subset<T, AssessmentFinalRisksAggregateArgs>): Prisma.PrismaPromise<GetAssessmentFinalRisksAggregateType<T>>

    /**
     * Group by AssessmentFinalRisks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFinalRisksGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssessmentFinalRisksGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssessmentFinalRisksGroupByArgs['orderBy'] }
        : { orderBy?: AssessmentFinalRisksGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssessmentFinalRisksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssessmentFinalRisksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AssessmentFinalRisks model
   */
  readonly fields: AssessmentFinalRisksFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AssessmentFinalRisks.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssessmentFinalRisksClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assessment<T extends AssessmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AssessmentDefaultArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AssessmentFinalRisks model
   */
  interface AssessmentFinalRisksFieldRefs {
    readonly id: FieldRef<"AssessmentFinalRisks", 'String'>
    readonly assessmentId: FieldRef<"AssessmentFinalRisks", 'String'>
    readonly factor_Fo: FieldRef<"AssessmentFinalRisks", 'Float'>
    readonly risk_Ro: FieldRef<"AssessmentFinalRisks", 'Float'>
    readonly final_R: FieldRef<"AssessmentFinalRisks", 'Float'>
    readonly final_R1: FieldRef<"AssessmentFinalRisks", 'Float'>
    readonly final_R2: FieldRef<"AssessmentFinalRisks", 'Float'>
    readonly status_R: FieldRef<"AssessmentFinalRisks", 'String'>
    readonly status_R1: FieldRef<"AssessmentFinalRisks", 'String'>
    readonly status_R2: FieldRef<"AssessmentFinalRisks", 'String'>
    readonly createdAt: FieldRef<"AssessmentFinalRisks", 'DateTime'>
    readonly updatedAt: FieldRef<"AssessmentFinalRisks", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AssessmentFinalRisks findUnique
   */
  export type AssessmentFinalRisksFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentFinalRisks
     */
    select?: AssessmentFinalRisksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentFinalRisks
     */
    omit?: AssessmentFinalRisksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentFinalRisksInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentFinalRisks to fetch.
     */
    where: AssessmentFinalRisksWhereUniqueInput
  }

  /**
   * AssessmentFinalRisks findUniqueOrThrow
   */
  export type AssessmentFinalRisksFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentFinalRisks
     */
    select?: AssessmentFinalRisksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentFinalRisks
     */
    omit?: AssessmentFinalRisksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentFinalRisksInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentFinalRisks to fetch.
     */
    where: AssessmentFinalRisksWhereUniqueInput
  }

  /**
   * AssessmentFinalRisks findFirst
   */
  export type AssessmentFinalRisksFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentFinalRisks
     */
    select?: AssessmentFinalRisksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentFinalRisks
     */
    omit?: AssessmentFinalRisksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentFinalRisksInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentFinalRisks to fetch.
     */
    where?: AssessmentFinalRisksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentFinalRisks to fetch.
     */
    orderBy?: AssessmentFinalRisksOrderByWithRelationInput | AssessmentFinalRisksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssessmentFinalRisks.
     */
    cursor?: AssessmentFinalRisksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentFinalRisks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentFinalRisks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentFinalRisks.
     */
    distinct?: AssessmentFinalRisksScalarFieldEnum | AssessmentFinalRisksScalarFieldEnum[]
  }

  /**
   * AssessmentFinalRisks findFirstOrThrow
   */
  export type AssessmentFinalRisksFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentFinalRisks
     */
    select?: AssessmentFinalRisksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentFinalRisks
     */
    omit?: AssessmentFinalRisksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentFinalRisksInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentFinalRisks to fetch.
     */
    where?: AssessmentFinalRisksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentFinalRisks to fetch.
     */
    orderBy?: AssessmentFinalRisksOrderByWithRelationInput | AssessmentFinalRisksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssessmentFinalRisks.
     */
    cursor?: AssessmentFinalRisksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentFinalRisks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentFinalRisks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssessmentFinalRisks.
     */
    distinct?: AssessmentFinalRisksScalarFieldEnum | AssessmentFinalRisksScalarFieldEnum[]
  }

  /**
   * AssessmentFinalRisks findMany
   */
  export type AssessmentFinalRisksFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentFinalRisks
     */
    select?: AssessmentFinalRisksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentFinalRisks
     */
    omit?: AssessmentFinalRisksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentFinalRisksInclude<ExtArgs> | null
    /**
     * Filter, which AssessmentFinalRisks to fetch.
     */
    where?: AssessmentFinalRisksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssessmentFinalRisks to fetch.
     */
    orderBy?: AssessmentFinalRisksOrderByWithRelationInput | AssessmentFinalRisksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AssessmentFinalRisks.
     */
    cursor?: AssessmentFinalRisksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssessmentFinalRisks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssessmentFinalRisks.
     */
    skip?: number
    distinct?: AssessmentFinalRisksScalarFieldEnum | AssessmentFinalRisksScalarFieldEnum[]
  }

  /**
   * AssessmentFinalRisks create
   */
  export type AssessmentFinalRisksCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentFinalRisks
     */
    select?: AssessmentFinalRisksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentFinalRisks
     */
    omit?: AssessmentFinalRisksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentFinalRisksInclude<ExtArgs> | null
    /**
     * The data needed to create a AssessmentFinalRisks.
     */
    data: XOR<AssessmentFinalRisksCreateInput, AssessmentFinalRisksUncheckedCreateInput>
  }

  /**
   * AssessmentFinalRisks createMany
   */
  export type AssessmentFinalRisksCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AssessmentFinalRisks.
     */
    data: AssessmentFinalRisksCreateManyInput | AssessmentFinalRisksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssessmentFinalRisks createManyAndReturn
   */
  export type AssessmentFinalRisksCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentFinalRisks
     */
    select?: AssessmentFinalRisksSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentFinalRisks
     */
    omit?: AssessmentFinalRisksOmit<ExtArgs> | null
    /**
     * The data used to create many AssessmentFinalRisks.
     */
    data: AssessmentFinalRisksCreateManyInput | AssessmentFinalRisksCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentFinalRisksIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AssessmentFinalRisks update
   */
  export type AssessmentFinalRisksUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentFinalRisks
     */
    select?: AssessmentFinalRisksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentFinalRisks
     */
    omit?: AssessmentFinalRisksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentFinalRisksInclude<ExtArgs> | null
    /**
     * The data needed to update a AssessmentFinalRisks.
     */
    data: XOR<AssessmentFinalRisksUpdateInput, AssessmentFinalRisksUncheckedUpdateInput>
    /**
     * Choose, which AssessmentFinalRisks to update.
     */
    where: AssessmentFinalRisksWhereUniqueInput
  }

  /**
   * AssessmentFinalRisks updateMany
   */
  export type AssessmentFinalRisksUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AssessmentFinalRisks.
     */
    data: XOR<AssessmentFinalRisksUpdateManyMutationInput, AssessmentFinalRisksUncheckedUpdateManyInput>
    /**
     * Filter which AssessmentFinalRisks to update
     */
    where?: AssessmentFinalRisksWhereInput
    /**
     * Limit how many AssessmentFinalRisks to update.
     */
    limit?: number
  }

  /**
   * AssessmentFinalRisks updateManyAndReturn
   */
  export type AssessmentFinalRisksUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentFinalRisks
     */
    select?: AssessmentFinalRisksSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentFinalRisks
     */
    omit?: AssessmentFinalRisksOmit<ExtArgs> | null
    /**
     * The data used to update AssessmentFinalRisks.
     */
    data: XOR<AssessmentFinalRisksUpdateManyMutationInput, AssessmentFinalRisksUncheckedUpdateManyInput>
    /**
     * Filter which AssessmentFinalRisks to update
     */
    where?: AssessmentFinalRisksWhereInput
    /**
     * Limit how many AssessmentFinalRisks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentFinalRisksIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AssessmentFinalRisks upsert
   */
  export type AssessmentFinalRisksUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentFinalRisks
     */
    select?: AssessmentFinalRisksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentFinalRisks
     */
    omit?: AssessmentFinalRisksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentFinalRisksInclude<ExtArgs> | null
    /**
     * The filter to search for the AssessmentFinalRisks to update in case it exists.
     */
    where: AssessmentFinalRisksWhereUniqueInput
    /**
     * In case the AssessmentFinalRisks found by the `where` argument doesn't exist, create a new AssessmentFinalRisks with this data.
     */
    create: XOR<AssessmentFinalRisksCreateInput, AssessmentFinalRisksUncheckedCreateInput>
    /**
     * In case the AssessmentFinalRisks was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssessmentFinalRisksUpdateInput, AssessmentFinalRisksUncheckedUpdateInput>
  }

  /**
   * AssessmentFinalRisks delete
   */
  export type AssessmentFinalRisksDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentFinalRisks
     */
    select?: AssessmentFinalRisksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentFinalRisks
     */
    omit?: AssessmentFinalRisksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentFinalRisksInclude<ExtArgs> | null
    /**
     * Filter which AssessmentFinalRisks to delete.
     */
    where: AssessmentFinalRisksWhereUniqueInput
  }

  /**
   * AssessmentFinalRisks deleteMany
   */
  export type AssessmentFinalRisksDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssessmentFinalRisks to delete
     */
    where?: AssessmentFinalRisksWhereInput
    /**
     * Limit how many AssessmentFinalRisks to delete.
     */
    limit?: number
  }

  /**
   * AssessmentFinalRisks without action
   */
  export type AssessmentFinalRisksDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentFinalRisks
     */
    select?: AssessmentFinalRisksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssessmentFinalRisks
     */
    omit?: AssessmentFinalRisksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentFinalRisksInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    role: 'role',
    banned: 'banned',
    banReason: 'banReason',
    banExpires: 'banExpires'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId',
    impersonatedBy: 'impersonatedBy'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const FloorScalarFieldEnum: {
    id: 'id',
    name: 'name',
    level: 'level',
    description: 'description',
    projectId: 'projectId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FloorScalarFieldEnum = (typeof FloorScalarFieldEnum)[keyof typeof FloorScalarFieldEnum]


  export const AssessmentScalarFieldEnum: {
    id: 'id',
    floorId: 'floorId',
    updatedAt: 'updatedAt'
  };

  export type AssessmentScalarFieldEnum = (typeof AssessmentScalarFieldEnum)[keyof typeof AssessmentScalarFieldEnum]


  export const AssessmentRiskFactorsScalarFieldEnum: {
    id: 'id',
    assessmentId: 'assessmentId',
    qi: 'qi',
    qm: 'qm',
    tempDestruction: 'tempDestruction',
    tempDestructionMulti: 'tempDestructionMulti',
    avgDimension: 'avgDimension',
    materialClass: 'materialClass',
    materialClassMulti: 'materialClassMulti',
    length: 'length',
    width: 'width',
    area: 'area',
    height: 'height',
    accessType: 'accessType',
    windowArea: 'windowArea',
    staticVentArea: 'staticVentArea',
    mechVentFlow: 'mechVentFlow',
    ventingRatio_k: 'ventingRatio_k',
    accessSides: 'accessSides',
    heightAbove: 'heightAbove',
    depthBelow: 'depthBelow',
    floorLevel: 'floorLevel',
    factor_q: 'factor_q',
    factor_i: 'factor_i',
    factor_g: 'factor_g',
    factor_e: 'factor_e',
    factor_v: 'factor_v',
    factor_z: 'factor_z',
    risk_P: 'risk_P',
    risk_P1: 'risk_P1',
    risk_P2: 'risk_P2',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AssessmentRiskFactorsScalarFieldEnum = (typeof AssessmentRiskFactorsScalarFieldEnum)[keyof typeof AssessmentRiskFactorsScalarFieldEnum]


  export const AssessmentAcceptanceFactorsScalarFieldEnum: {
    id: 'id',
    assessmentId: 'assessmentId',
    mainActivity: 'mainActivity',
    mainActivityKey: 'mainActivityKey',
    secondaryActivity: 'secondaryActivity',
    heatTransferType: 'heatTransferType',
    heatTransferTypeKey: 'heatTransferTypeKey',
    generatorLocation: 'generatorLocation',
    generatorLocationKey: 'generatorLocationKey',
    energySource: 'energySource',
    energySourceKey: 'energySourceKey',
    electricalSystem: 'electricalSystem',
    flammableLiquids: 'flammableLiquids',
    combustibleDust: 'combustibleDust',
    combustibleDustKey: 'combustibleDustKey',
    weldingOperations: 'weldingOperations',
    additionalCarpentryPlastic: 'additionalCarpentryPlastic',
    specialRisk: 'specialRisk',
    occupantCount: 'occupantCount',
    occupantFactor: 'occupantFactor',
    occupantFactorKey: 'occupantFactorKey',
    exitWidths: 'exitWidths',
    exitWidthTotal: 'exitWidthTotal',
    exitUnitsX: 'exitUnitsX',
    separatePathsK: 'separatePathsK',
    mobilityFactor: 'mobilityFactor',
    mobilityFactorMulti: 'mobilityFactorMulti',
    perceptionAwareness: 'perceptionAwareness',
    evacuationPlanClear: 'evacuationPlanClear',
    noPanicRisk: 'noPanicRisk',
    exitCountToOpenSpace: 'exitCountToOpenSpace',
    valueTotal: 'valueTotal',
    valueYear: 'valueYear',
    replaceability: 'replaceability',
    dependencyType: 'dependencyType',
    dependencyManual: 'dependencyManual',
    factor_a: 'factor_a',
    factor_t: 'factor_t',
    factor_c: 'factor_c',
    factor_r: 'factor_r',
    factor_d: 'factor_d',
    level_A: 'level_A',
    level_A1: 'level_A1',
    level_A2: 'level_A2',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AssessmentAcceptanceFactorsScalarFieldEnum = (typeof AssessmentAcceptanceFactorsScalarFieldEnum)[keyof typeof AssessmentAcceptanceFactorsScalarFieldEnum]


  export const AssessmentProtectionFactorsScalarFieldEnum: {
    id: 'id',
    assessmentId: 'assessmentId',
    waterStorageType: 'waterStorageType',
    waterCapacity: 'waterCapacity',
    requiredWaterCapacity: 'requiredWaterCapacity',
    w2Penalty: 'w2Penalty',
    distributionNetwork: 'distributionNetwork',
    pipeDiameter: 'pipeDiameter',
    isRingNetwork: 'isRingNetwork',
    waterFlowCapacity: 'waterFlowCapacity',
    distributionNetworkAdequacy: 'distributionNetworkAdequacy',
    hydrantCount25: 'hydrantCount25',
    hydrantCount3: 'hydrantCount3',
    hydrantCount4: 'hydrantCount4',
    equivalentHydrant25: 'equivalentHydrant25',
    averageHydrantDistance: 'averageHydrantDistance',
    w4Score: 'w4Score',
    staticPressureRequired: 'staticPressureRequired',
    staticPressureAvailable: 'staticPressureAvailable',
    w5Score: 'w5Score',
    detectionType: 'detectionType',
    s1ElectronicSystem: 's1ElectronicSystem',
    s1ZoneIdentification: 's1ZoneIdentification',
    sprinklerType: 'sprinklerType',
    fireStationType: 'fireStationType',
    waterSupplyType: 'waterSupplyType',
    industrialBrigade: 'industrialBrigade',
    industrialBrigadeLabel: 'industrialBrigadeLabel',
    s6OtherSuppression: 's6OtherSuppression',
    s7UnlimitedWater: 's7UnlimitedWater',
    s8DedicatedWater: 's8DedicatedWater',
    s9WaterControl: 's9WaterControl',
    n1: 'n1',
    n1ContinuousPresence: 'n1ContinuousPresence',
    n1ManualWarning: 'n1ManualWarning',
    n1FireDeptNotification: 'n1FireDeptNotification',
    n1ResidentAlarm: 'n1ResidentAlarm',
    n2: 'n2',
    n3: 'n3',
    n4: 'n4',
    n5: 'n5',
    structureResist: 'structureResist',
    facadeResist: 'facadeResist',
    roofResist: 'roofResist',
    wallResist: 'wallResist',
    hasManyWindows: 'hasManyWindows',
    noInternalSeparation: 'noInternalSeparation',
    combustibleInsulation: 'combustibleInsulation',
    subcompartment: 'subcompartment',
    stairways: 'stairways',
    stairwaysIndex: 'stairwaysIndex',
    horizontalExit: 'horizontalExit',
    sprinklers: 'sprinklers',
    u1PartialDetection: 'u1PartialDetection',
    u2Max300Occupants: 'u2Max300Occupants',
    u3VoiceEvacuation: 'u3VoiceEvacuation',
    u4MarkedExits: 'u4MarkedExits',
    u5SmokeEvacuation: 'u5SmokeEvacuation',
    partialDetection: 'partialDetection',
    partialSprinkler: 'partialSprinkler',
    otherAutoExtinguish: 'otherAutoExtinguish',
    financialDataBackup: 'financialDataBackup',
    sparePartsAccess: 'sparePartsAccess',
    selfRepairCapability: 'selfRepairCapability',
    relocationAgreements: 'relocationAgreements',
    immediateActivityTransfer: 'immediateActivityTransfer',
    multipleProduction: 'multipleProduction',
    factor_W: 'factor_W',
    factor_N: 'factor_N',
    factor_S: 'factor_S',
    factor_F: 'factor_F',
    factor_U: 'factor_U',
    factor_Y: 'factor_Y',
    level_D: 'level_D',
    level_D1: 'level_D1',
    level_D2: 'level_D2',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AssessmentProtectionFactorsScalarFieldEnum = (typeof AssessmentProtectionFactorsScalarFieldEnum)[keyof typeof AssessmentProtectionFactorsScalarFieldEnum]


  export const AssessmentFinalRisksScalarFieldEnum: {
    id: 'id',
    assessmentId: 'assessmentId',
    factor_Fo: 'factor_Fo',
    risk_Ro: 'risk_Ro',
    final_R: 'final_R',
    final_R1: 'final_R1',
    final_R2: 'final_R2',
    status_R: 'status_R',
    status_R1: 'status_R1',
    status_R2: 'status_R2',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AssessmentFinalRisksScalarFieldEnum = (typeof AssessmentFinalRisksScalarFieldEnum)[keyof typeof AssessmentFinalRisksScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    role?: StringNullableFilter<"User"> | string | null
    banned?: BoolNullableFilter<"User"> | boolean | null
    banReason?: StringNullableFilter<"User"> | string | null
    banExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    projects?: ProjectListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrderInput | SortOrder
    banned?: SortOrderInput | SortOrder
    banReason?: SortOrderInput | SortOrder
    banExpires?: SortOrderInput | SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
    projects?: ProjectOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    role?: StringNullableFilter<"User"> | string | null
    banned?: BoolNullableFilter<"User"> | boolean | null
    banReason?: StringNullableFilter<"User"> | string | null
    banExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    projects?: ProjectListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrderInput | SortOrder
    banned?: SortOrderInput | SortOrder
    banReason?: SortOrderInput | SortOrder
    banExpires?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    role?: StringNullableWithAggregatesFilter<"User"> | string | null
    banned?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
    banReason?: StringNullableWithAggregatesFilter<"User"> | string | null
    banExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    impersonatedBy?: StringNullableFilter<"Session"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    impersonatedBy?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    impersonatedBy?: StringNullableFilter<"Session"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    impersonatedBy?: SortOrderInput | SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    token?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userId?: StringWithAggregatesFilter<"Session"> | string
    impersonatedBy?: StringNullableWithAggregatesFilter<"Session"> | string | null
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    address?: StringNullableFilter<"Project"> | string | null
    description?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    userId?: StringFilter<"Project"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    floors?: FloorListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    floors?: FloorOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    name?: StringFilter<"Project"> | string
    address?: StringNullableFilter<"Project"> | string | null
    description?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    userId?: StringFilter<"Project"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    floors?: FloorListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    address?: StringNullableWithAggregatesFilter<"Project"> | string | null
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    userId?: StringWithAggregatesFilter<"Project"> | string
  }

  export type FloorWhereInput = {
    AND?: FloorWhereInput | FloorWhereInput[]
    OR?: FloorWhereInput[]
    NOT?: FloorWhereInput | FloorWhereInput[]
    id?: StringFilter<"Floor"> | string
    name?: StringFilter<"Floor"> | string
    level?: FloatFilter<"Floor"> | number
    description?: StringNullableFilter<"Floor"> | string | null
    projectId?: StringFilter<"Floor"> | string
    createdAt?: DateTimeFilter<"Floor"> | Date | string
    updatedAt?: DateTimeFilter<"Floor"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    assessment?: XOR<AssessmentNullableScalarRelationFilter, AssessmentWhereInput> | null
  }

  export type FloorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    description?: SortOrderInput | SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    assessment?: AssessmentOrderByWithRelationInput
  }

  export type FloorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FloorWhereInput | FloorWhereInput[]
    OR?: FloorWhereInput[]
    NOT?: FloorWhereInput | FloorWhereInput[]
    name?: StringFilter<"Floor"> | string
    level?: FloatFilter<"Floor"> | number
    description?: StringNullableFilter<"Floor"> | string | null
    projectId?: StringFilter<"Floor"> | string
    createdAt?: DateTimeFilter<"Floor"> | Date | string
    updatedAt?: DateTimeFilter<"Floor"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    assessment?: XOR<AssessmentNullableScalarRelationFilter, AssessmentWhereInput> | null
  }, "id">

  export type FloorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    description?: SortOrderInput | SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FloorCountOrderByAggregateInput
    _avg?: FloorAvgOrderByAggregateInput
    _max?: FloorMaxOrderByAggregateInput
    _min?: FloorMinOrderByAggregateInput
    _sum?: FloorSumOrderByAggregateInput
  }

  export type FloorScalarWhereWithAggregatesInput = {
    AND?: FloorScalarWhereWithAggregatesInput | FloorScalarWhereWithAggregatesInput[]
    OR?: FloorScalarWhereWithAggregatesInput[]
    NOT?: FloorScalarWhereWithAggregatesInput | FloorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Floor"> | string
    name?: StringWithAggregatesFilter<"Floor"> | string
    level?: FloatWithAggregatesFilter<"Floor"> | number
    description?: StringNullableWithAggregatesFilter<"Floor"> | string | null
    projectId?: StringWithAggregatesFilter<"Floor"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Floor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Floor"> | Date | string
  }

  export type AssessmentWhereInput = {
    AND?: AssessmentWhereInput | AssessmentWhereInput[]
    OR?: AssessmentWhereInput[]
    NOT?: AssessmentWhereInput | AssessmentWhereInput[]
    id?: StringFilter<"Assessment"> | string
    floorId?: StringFilter<"Assessment"> | string
    updatedAt?: DateTimeFilter<"Assessment"> | Date | string
    floor?: XOR<FloorScalarRelationFilter, FloorWhereInput>
    riskFactors?: XOR<AssessmentRiskFactorsNullableScalarRelationFilter, AssessmentRiskFactorsWhereInput> | null
    acceptanceFactors?: XOR<AssessmentAcceptanceFactorsNullableScalarRelationFilter, AssessmentAcceptanceFactorsWhereInput> | null
    protectionFactors?: XOR<AssessmentProtectionFactorsNullableScalarRelationFilter, AssessmentProtectionFactorsWhereInput> | null
    finalRisks?: XOR<AssessmentFinalRisksNullableScalarRelationFilter, AssessmentFinalRisksWhereInput> | null
  }

  export type AssessmentOrderByWithRelationInput = {
    id?: SortOrder
    floorId?: SortOrder
    updatedAt?: SortOrder
    floor?: FloorOrderByWithRelationInput
    riskFactors?: AssessmentRiskFactorsOrderByWithRelationInput
    acceptanceFactors?: AssessmentAcceptanceFactorsOrderByWithRelationInput
    protectionFactors?: AssessmentProtectionFactorsOrderByWithRelationInput
    finalRisks?: AssessmentFinalRisksOrderByWithRelationInput
  }

  export type AssessmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    floorId?: string
    AND?: AssessmentWhereInput | AssessmentWhereInput[]
    OR?: AssessmentWhereInput[]
    NOT?: AssessmentWhereInput | AssessmentWhereInput[]
    updatedAt?: DateTimeFilter<"Assessment"> | Date | string
    floor?: XOR<FloorScalarRelationFilter, FloorWhereInput>
    riskFactors?: XOR<AssessmentRiskFactorsNullableScalarRelationFilter, AssessmentRiskFactorsWhereInput> | null
    acceptanceFactors?: XOR<AssessmentAcceptanceFactorsNullableScalarRelationFilter, AssessmentAcceptanceFactorsWhereInput> | null
    protectionFactors?: XOR<AssessmentProtectionFactorsNullableScalarRelationFilter, AssessmentProtectionFactorsWhereInput> | null
    finalRisks?: XOR<AssessmentFinalRisksNullableScalarRelationFilter, AssessmentFinalRisksWhereInput> | null
  }, "id" | "floorId">

  export type AssessmentOrderByWithAggregationInput = {
    id?: SortOrder
    floorId?: SortOrder
    updatedAt?: SortOrder
    _count?: AssessmentCountOrderByAggregateInput
    _max?: AssessmentMaxOrderByAggregateInput
    _min?: AssessmentMinOrderByAggregateInput
  }

  export type AssessmentScalarWhereWithAggregatesInput = {
    AND?: AssessmentScalarWhereWithAggregatesInput | AssessmentScalarWhereWithAggregatesInput[]
    OR?: AssessmentScalarWhereWithAggregatesInput[]
    NOT?: AssessmentScalarWhereWithAggregatesInput | AssessmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Assessment"> | string
    floorId?: StringWithAggregatesFilter<"Assessment"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"Assessment"> | Date | string
  }

  export type AssessmentRiskFactorsWhereInput = {
    AND?: AssessmentRiskFactorsWhereInput | AssessmentRiskFactorsWhereInput[]
    OR?: AssessmentRiskFactorsWhereInput[]
    NOT?: AssessmentRiskFactorsWhereInput | AssessmentRiskFactorsWhereInput[]
    id?: StringFilter<"AssessmentRiskFactors"> | string
    assessmentId?: StringFilter<"AssessmentRiskFactors"> | string
    qi?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    qm?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    tempDestruction?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    tempDestructionMulti?: StringNullableFilter<"AssessmentRiskFactors"> | string | null
    avgDimension?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    materialClass?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    materialClassMulti?: StringNullableFilter<"AssessmentRiskFactors"> | string | null
    length?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    width?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    area?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    height?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    accessType?: StringNullableFilter<"AssessmentRiskFactors"> | string | null
    windowArea?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    staticVentArea?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    mechVentFlow?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    ventingRatio_k?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    accessSides?: IntNullableFilter<"AssessmentRiskFactors"> | number | null
    heightAbove?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    depthBelow?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    floorLevel?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    factor_q?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    factor_i?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    factor_g?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    factor_e?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    factor_v?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    factor_z?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    risk_P?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    risk_P1?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    risk_P2?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    createdAt?: DateTimeFilter<"AssessmentRiskFactors"> | Date | string
    updatedAt?: DateTimeFilter<"AssessmentRiskFactors"> | Date | string
    assessment?: XOR<AssessmentScalarRelationFilter, AssessmentWhereInput>
  }

  export type AssessmentRiskFactorsOrderByWithRelationInput = {
    id?: SortOrder
    assessmentId?: SortOrder
    qi?: SortOrderInput | SortOrder
    qm?: SortOrderInput | SortOrder
    tempDestruction?: SortOrderInput | SortOrder
    tempDestructionMulti?: SortOrderInput | SortOrder
    avgDimension?: SortOrderInput | SortOrder
    materialClass?: SortOrderInput | SortOrder
    materialClassMulti?: SortOrderInput | SortOrder
    length?: SortOrderInput | SortOrder
    width?: SortOrderInput | SortOrder
    area?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    accessType?: SortOrderInput | SortOrder
    windowArea?: SortOrderInput | SortOrder
    staticVentArea?: SortOrderInput | SortOrder
    mechVentFlow?: SortOrderInput | SortOrder
    ventingRatio_k?: SortOrderInput | SortOrder
    accessSides?: SortOrderInput | SortOrder
    heightAbove?: SortOrderInput | SortOrder
    depthBelow?: SortOrderInput | SortOrder
    floorLevel?: SortOrderInput | SortOrder
    factor_q?: SortOrderInput | SortOrder
    factor_i?: SortOrderInput | SortOrder
    factor_g?: SortOrderInput | SortOrder
    factor_e?: SortOrderInput | SortOrder
    factor_v?: SortOrderInput | SortOrder
    factor_z?: SortOrderInput | SortOrder
    risk_P?: SortOrderInput | SortOrder
    risk_P1?: SortOrderInput | SortOrder
    risk_P2?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assessment?: AssessmentOrderByWithRelationInput
  }

  export type AssessmentRiskFactorsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    assessmentId?: string
    AND?: AssessmentRiskFactorsWhereInput | AssessmentRiskFactorsWhereInput[]
    OR?: AssessmentRiskFactorsWhereInput[]
    NOT?: AssessmentRiskFactorsWhereInput | AssessmentRiskFactorsWhereInput[]
    qi?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    qm?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    tempDestruction?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    tempDestructionMulti?: StringNullableFilter<"AssessmentRiskFactors"> | string | null
    avgDimension?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    materialClass?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    materialClassMulti?: StringNullableFilter<"AssessmentRiskFactors"> | string | null
    length?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    width?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    area?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    height?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    accessType?: StringNullableFilter<"AssessmentRiskFactors"> | string | null
    windowArea?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    staticVentArea?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    mechVentFlow?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    ventingRatio_k?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    accessSides?: IntNullableFilter<"AssessmentRiskFactors"> | number | null
    heightAbove?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    depthBelow?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    floorLevel?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    factor_q?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    factor_i?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    factor_g?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    factor_e?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    factor_v?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    factor_z?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    risk_P?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    risk_P1?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    risk_P2?: FloatNullableFilter<"AssessmentRiskFactors"> | number | null
    createdAt?: DateTimeFilter<"AssessmentRiskFactors"> | Date | string
    updatedAt?: DateTimeFilter<"AssessmentRiskFactors"> | Date | string
    assessment?: XOR<AssessmentScalarRelationFilter, AssessmentWhereInput>
  }, "id" | "assessmentId">

  export type AssessmentRiskFactorsOrderByWithAggregationInput = {
    id?: SortOrder
    assessmentId?: SortOrder
    qi?: SortOrderInput | SortOrder
    qm?: SortOrderInput | SortOrder
    tempDestruction?: SortOrderInput | SortOrder
    tempDestructionMulti?: SortOrderInput | SortOrder
    avgDimension?: SortOrderInput | SortOrder
    materialClass?: SortOrderInput | SortOrder
    materialClassMulti?: SortOrderInput | SortOrder
    length?: SortOrderInput | SortOrder
    width?: SortOrderInput | SortOrder
    area?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    accessType?: SortOrderInput | SortOrder
    windowArea?: SortOrderInput | SortOrder
    staticVentArea?: SortOrderInput | SortOrder
    mechVentFlow?: SortOrderInput | SortOrder
    ventingRatio_k?: SortOrderInput | SortOrder
    accessSides?: SortOrderInput | SortOrder
    heightAbove?: SortOrderInput | SortOrder
    depthBelow?: SortOrderInput | SortOrder
    floorLevel?: SortOrderInput | SortOrder
    factor_q?: SortOrderInput | SortOrder
    factor_i?: SortOrderInput | SortOrder
    factor_g?: SortOrderInput | SortOrder
    factor_e?: SortOrderInput | SortOrder
    factor_v?: SortOrderInput | SortOrder
    factor_z?: SortOrderInput | SortOrder
    risk_P?: SortOrderInput | SortOrder
    risk_P1?: SortOrderInput | SortOrder
    risk_P2?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AssessmentRiskFactorsCountOrderByAggregateInput
    _avg?: AssessmentRiskFactorsAvgOrderByAggregateInput
    _max?: AssessmentRiskFactorsMaxOrderByAggregateInput
    _min?: AssessmentRiskFactorsMinOrderByAggregateInput
    _sum?: AssessmentRiskFactorsSumOrderByAggregateInput
  }

  export type AssessmentRiskFactorsScalarWhereWithAggregatesInput = {
    AND?: AssessmentRiskFactorsScalarWhereWithAggregatesInput | AssessmentRiskFactorsScalarWhereWithAggregatesInput[]
    OR?: AssessmentRiskFactorsScalarWhereWithAggregatesInput[]
    NOT?: AssessmentRiskFactorsScalarWhereWithAggregatesInput | AssessmentRiskFactorsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AssessmentRiskFactors"> | string
    assessmentId?: StringWithAggregatesFilter<"AssessmentRiskFactors"> | string
    qi?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    qm?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    tempDestruction?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    tempDestructionMulti?: StringNullableWithAggregatesFilter<"AssessmentRiskFactors"> | string | null
    avgDimension?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    materialClass?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    materialClassMulti?: StringNullableWithAggregatesFilter<"AssessmentRiskFactors"> | string | null
    length?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    width?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    area?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    height?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    accessType?: StringNullableWithAggregatesFilter<"AssessmentRiskFactors"> | string | null
    windowArea?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    staticVentArea?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    mechVentFlow?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    ventingRatio_k?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    accessSides?: IntNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    heightAbove?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    depthBelow?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    floorLevel?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    factor_q?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    factor_i?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    factor_g?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    factor_e?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    factor_v?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    factor_z?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    risk_P?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    risk_P1?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    risk_P2?: FloatNullableWithAggregatesFilter<"AssessmentRiskFactors"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"AssessmentRiskFactors"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AssessmentRiskFactors"> | Date | string
  }

  export type AssessmentAcceptanceFactorsWhereInput = {
    AND?: AssessmentAcceptanceFactorsWhereInput | AssessmentAcceptanceFactorsWhereInput[]
    OR?: AssessmentAcceptanceFactorsWhereInput[]
    NOT?: AssessmentAcceptanceFactorsWhereInput | AssessmentAcceptanceFactorsWhereInput[]
    id?: StringFilter<"AssessmentAcceptanceFactors"> | string
    assessmentId?: StringFilter<"AssessmentAcceptanceFactors"> | string
    mainActivity?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    mainActivityKey?: StringNullableFilter<"AssessmentAcceptanceFactors"> | string | null
    secondaryActivity?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    heatTransferType?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    heatTransferTypeKey?: StringNullableFilter<"AssessmentAcceptanceFactors"> | string | null
    generatorLocation?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    generatorLocationKey?: StringNullableFilter<"AssessmentAcceptanceFactors"> | string | null
    energySource?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    energySourceKey?: StringNullableFilter<"AssessmentAcceptanceFactors"> | string | null
    electricalSystem?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    flammableLiquids?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    combustibleDust?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    combustibleDustKey?: StringNullableFilter<"AssessmentAcceptanceFactors"> | string | null
    weldingOperations?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    additionalCarpentryPlastic?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    specialRisk?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    occupantCount?: IntNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    occupantFactor?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    occupantFactorKey?: StringNullableFilter<"AssessmentAcceptanceFactors"> | string | null
    exitWidths?: StringNullableFilter<"AssessmentAcceptanceFactors"> | string | null
    exitWidthTotal?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    exitUnitsX?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    separatePathsK?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    mobilityFactor?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    mobilityFactorMulti?: StringNullableFilter<"AssessmentAcceptanceFactors"> | string | null
    perceptionAwareness?: BoolNullableFilter<"AssessmentAcceptanceFactors"> | boolean | null
    evacuationPlanClear?: BoolNullableFilter<"AssessmentAcceptanceFactors"> | boolean | null
    noPanicRisk?: BoolNullableFilter<"AssessmentAcceptanceFactors"> | boolean | null
    exitCountToOpenSpace?: IntNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    valueTotal?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    valueYear?: IntNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    replaceability?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    dependencyType?: StringNullableFilter<"AssessmentAcceptanceFactors"> | string | null
    dependencyManual?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    factor_a?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    factor_t?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    factor_c?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    factor_r?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    factor_d?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    level_A?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    level_A1?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    level_A2?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    createdAt?: DateTimeFilter<"AssessmentAcceptanceFactors"> | Date | string
    updatedAt?: DateTimeFilter<"AssessmentAcceptanceFactors"> | Date | string
    assessment?: XOR<AssessmentScalarRelationFilter, AssessmentWhereInput>
  }

  export type AssessmentAcceptanceFactorsOrderByWithRelationInput = {
    id?: SortOrder
    assessmentId?: SortOrder
    mainActivity?: SortOrderInput | SortOrder
    mainActivityKey?: SortOrderInput | SortOrder
    secondaryActivity?: SortOrderInput | SortOrder
    heatTransferType?: SortOrderInput | SortOrder
    heatTransferTypeKey?: SortOrderInput | SortOrder
    generatorLocation?: SortOrderInput | SortOrder
    generatorLocationKey?: SortOrderInput | SortOrder
    energySource?: SortOrderInput | SortOrder
    energySourceKey?: SortOrderInput | SortOrder
    electricalSystem?: SortOrderInput | SortOrder
    flammableLiquids?: SortOrderInput | SortOrder
    combustibleDust?: SortOrderInput | SortOrder
    combustibleDustKey?: SortOrderInput | SortOrder
    weldingOperations?: SortOrderInput | SortOrder
    additionalCarpentryPlastic?: SortOrderInput | SortOrder
    specialRisk?: SortOrderInput | SortOrder
    occupantCount?: SortOrderInput | SortOrder
    occupantFactor?: SortOrderInput | SortOrder
    occupantFactorKey?: SortOrderInput | SortOrder
    exitWidths?: SortOrderInput | SortOrder
    exitWidthTotal?: SortOrderInput | SortOrder
    exitUnitsX?: SortOrderInput | SortOrder
    separatePathsK?: SortOrderInput | SortOrder
    mobilityFactor?: SortOrderInput | SortOrder
    mobilityFactorMulti?: SortOrderInput | SortOrder
    perceptionAwareness?: SortOrderInput | SortOrder
    evacuationPlanClear?: SortOrderInput | SortOrder
    noPanicRisk?: SortOrderInput | SortOrder
    exitCountToOpenSpace?: SortOrderInput | SortOrder
    valueTotal?: SortOrderInput | SortOrder
    valueYear?: SortOrderInput | SortOrder
    replaceability?: SortOrderInput | SortOrder
    dependencyType?: SortOrderInput | SortOrder
    dependencyManual?: SortOrderInput | SortOrder
    factor_a?: SortOrderInput | SortOrder
    factor_t?: SortOrderInput | SortOrder
    factor_c?: SortOrderInput | SortOrder
    factor_r?: SortOrderInput | SortOrder
    factor_d?: SortOrderInput | SortOrder
    level_A?: SortOrderInput | SortOrder
    level_A1?: SortOrderInput | SortOrder
    level_A2?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assessment?: AssessmentOrderByWithRelationInput
  }

  export type AssessmentAcceptanceFactorsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    assessmentId?: string
    AND?: AssessmentAcceptanceFactorsWhereInput | AssessmentAcceptanceFactorsWhereInput[]
    OR?: AssessmentAcceptanceFactorsWhereInput[]
    NOT?: AssessmentAcceptanceFactorsWhereInput | AssessmentAcceptanceFactorsWhereInput[]
    mainActivity?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    mainActivityKey?: StringNullableFilter<"AssessmentAcceptanceFactors"> | string | null
    secondaryActivity?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    heatTransferType?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    heatTransferTypeKey?: StringNullableFilter<"AssessmentAcceptanceFactors"> | string | null
    generatorLocation?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    generatorLocationKey?: StringNullableFilter<"AssessmentAcceptanceFactors"> | string | null
    energySource?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    energySourceKey?: StringNullableFilter<"AssessmentAcceptanceFactors"> | string | null
    electricalSystem?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    flammableLiquids?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    combustibleDust?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    combustibleDustKey?: StringNullableFilter<"AssessmentAcceptanceFactors"> | string | null
    weldingOperations?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    additionalCarpentryPlastic?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    specialRisk?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    occupantCount?: IntNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    occupantFactor?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    occupantFactorKey?: StringNullableFilter<"AssessmentAcceptanceFactors"> | string | null
    exitWidths?: StringNullableFilter<"AssessmentAcceptanceFactors"> | string | null
    exitWidthTotal?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    exitUnitsX?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    separatePathsK?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    mobilityFactor?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    mobilityFactorMulti?: StringNullableFilter<"AssessmentAcceptanceFactors"> | string | null
    perceptionAwareness?: BoolNullableFilter<"AssessmentAcceptanceFactors"> | boolean | null
    evacuationPlanClear?: BoolNullableFilter<"AssessmentAcceptanceFactors"> | boolean | null
    noPanicRisk?: BoolNullableFilter<"AssessmentAcceptanceFactors"> | boolean | null
    exitCountToOpenSpace?: IntNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    valueTotal?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    valueYear?: IntNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    replaceability?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    dependencyType?: StringNullableFilter<"AssessmentAcceptanceFactors"> | string | null
    dependencyManual?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    factor_a?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    factor_t?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    factor_c?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    factor_r?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    factor_d?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    level_A?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    level_A1?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    level_A2?: FloatNullableFilter<"AssessmentAcceptanceFactors"> | number | null
    createdAt?: DateTimeFilter<"AssessmentAcceptanceFactors"> | Date | string
    updatedAt?: DateTimeFilter<"AssessmentAcceptanceFactors"> | Date | string
    assessment?: XOR<AssessmentScalarRelationFilter, AssessmentWhereInput>
  }, "id" | "assessmentId">

  export type AssessmentAcceptanceFactorsOrderByWithAggregationInput = {
    id?: SortOrder
    assessmentId?: SortOrder
    mainActivity?: SortOrderInput | SortOrder
    mainActivityKey?: SortOrderInput | SortOrder
    secondaryActivity?: SortOrderInput | SortOrder
    heatTransferType?: SortOrderInput | SortOrder
    heatTransferTypeKey?: SortOrderInput | SortOrder
    generatorLocation?: SortOrderInput | SortOrder
    generatorLocationKey?: SortOrderInput | SortOrder
    energySource?: SortOrderInput | SortOrder
    energySourceKey?: SortOrderInput | SortOrder
    electricalSystem?: SortOrderInput | SortOrder
    flammableLiquids?: SortOrderInput | SortOrder
    combustibleDust?: SortOrderInput | SortOrder
    combustibleDustKey?: SortOrderInput | SortOrder
    weldingOperations?: SortOrderInput | SortOrder
    additionalCarpentryPlastic?: SortOrderInput | SortOrder
    specialRisk?: SortOrderInput | SortOrder
    occupantCount?: SortOrderInput | SortOrder
    occupantFactor?: SortOrderInput | SortOrder
    occupantFactorKey?: SortOrderInput | SortOrder
    exitWidths?: SortOrderInput | SortOrder
    exitWidthTotal?: SortOrderInput | SortOrder
    exitUnitsX?: SortOrderInput | SortOrder
    separatePathsK?: SortOrderInput | SortOrder
    mobilityFactor?: SortOrderInput | SortOrder
    mobilityFactorMulti?: SortOrderInput | SortOrder
    perceptionAwareness?: SortOrderInput | SortOrder
    evacuationPlanClear?: SortOrderInput | SortOrder
    noPanicRisk?: SortOrderInput | SortOrder
    exitCountToOpenSpace?: SortOrderInput | SortOrder
    valueTotal?: SortOrderInput | SortOrder
    valueYear?: SortOrderInput | SortOrder
    replaceability?: SortOrderInput | SortOrder
    dependencyType?: SortOrderInput | SortOrder
    dependencyManual?: SortOrderInput | SortOrder
    factor_a?: SortOrderInput | SortOrder
    factor_t?: SortOrderInput | SortOrder
    factor_c?: SortOrderInput | SortOrder
    factor_r?: SortOrderInput | SortOrder
    factor_d?: SortOrderInput | SortOrder
    level_A?: SortOrderInput | SortOrder
    level_A1?: SortOrderInput | SortOrder
    level_A2?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AssessmentAcceptanceFactorsCountOrderByAggregateInput
    _avg?: AssessmentAcceptanceFactorsAvgOrderByAggregateInput
    _max?: AssessmentAcceptanceFactorsMaxOrderByAggregateInput
    _min?: AssessmentAcceptanceFactorsMinOrderByAggregateInput
    _sum?: AssessmentAcceptanceFactorsSumOrderByAggregateInput
  }

  export type AssessmentAcceptanceFactorsScalarWhereWithAggregatesInput = {
    AND?: AssessmentAcceptanceFactorsScalarWhereWithAggregatesInput | AssessmentAcceptanceFactorsScalarWhereWithAggregatesInput[]
    OR?: AssessmentAcceptanceFactorsScalarWhereWithAggregatesInput[]
    NOT?: AssessmentAcceptanceFactorsScalarWhereWithAggregatesInput | AssessmentAcceptanceFactorsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AssessmentAcceptanceFactors"> | string
    assessmentId?: StringWithAggregatesFilter<"AssessmentAcceptanceFactors"> | string
    mainActivity?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    mainActivityKey?: StringNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | string | null
    secondaryActivity?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    heatTransferType?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    heatTransferTypeKey?: StringNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | string | null
    generatorLocation?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    generatorLocationKey?: StringNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | string | null
    energySource?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    energySourceKey?: StringNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | string | null
    electricalSystem?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    flammableLiquids?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    combustibleDust?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    combustibleDustKey?: StringNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | string | null
    weldingOperations?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    additionalCarpentryPlastic?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    specialRisk?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    occupantCount?: IntNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    occupantFactor?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    occupantFactorKey?: StringNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | string | null
    exitWidths?: StringNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | string | null
    exitWidthTotal?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    exitUnitsX?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    separatePathsK?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    mobilityFactor?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    mobilityFactorMulti?: StringNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | string | null
    perceptionAwareness?: BoolNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | boolean | null
    evacuationPlanClear?: BoolNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | boolean | null
    noPanicRisk?: BoolNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | boolean | null
    exitCountToOpenSpace?: IntNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    valueTotal?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    valueYear?: IntNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    replaceability?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    dependencyType?: StringNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | string | null
    dependencyManual?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    factor_a?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    factor_t?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    factor_c?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    factor_r?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    factor_d?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    level_A?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    level_A1?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    level_A2?: FloatNullableWithAggregatesFilter<"AssessmentAcceptanceFactors"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"AssessmentAcceptanceFactors"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AssessmentAcceptanceFactors"> | Date | string
  }

  export type AssessmentProtectionFactorsWhereInput = {
    AND?: AssessmentProtectionFactorsWhereInput | AssessmentProtectionFactorsWhereInput[]
    OR?: AssessmentProtectionFactorsWhereInput[]
    NOT?: AssessmentProtectionFactorsWhereInput | AssessmentProtectionFactorsWhereInput[]
    id?: StringFilter<"AssessmentProtectionFactors"> | string
    assessmentId?: StringFilter<"AssessmentProtectionFactors"> | string
    waterStorageType?: StringNullableFilter<"AssessmentProtectionFactors"> | string | null
    waterCapacity?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    requiredWaterCapacity?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    w2Penalty?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    distributionNetwork?: StringNullableFilter<"AssessmentProtectionFactors"> | string | null
    pipeDiameter?: StringNullableFilter<"AssessmentProtectionFactors"> | string | null
    isRingNetwork?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    waterFlowCapacity?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    distributionNetworkAdequacy?: StringNullableFilter<"AssessmentProtectionFactors"> | string | null
    hydrantCount25?: IntNullableFilter<"AssessmentProtectionFactors"> | number | null
    hydrantCount3?: IntNullableFilter<"AssessmentProtectionFactors"> | number | null
    hydrantCount4?: IntNullableFilter<"AssessmentProtectionFactors"> | number | null
    equivalentHydrant25?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    averageHydrantDistance?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    w4Score?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    staticPressureRequired?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    staticPressureAvailable?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    w5Score?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    detectionType?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    s1ElectronicSystem?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    s1ZoneIdentification?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    sprinklerType?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    fireStationType?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    waterSupplyType?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    industrialBrigade?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    industrialBrigadeLabel?: StringNullableFilter<"AssessmentProtectionFactors"> | string | null
    s6OtherSuppression?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    s7UnlimitedWater?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    s8DedicatedWater?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    s9WaterControl?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    n1?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    n1ContinuousPresence?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    n1ManualWarning?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    n1FireDeptNotification?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    n1ResidentAlarm?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    n2?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    n3?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    n4?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    n5?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    structureResist?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    facadeResist?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    roofResist?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    wallResist?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    hasManyWindows?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    noInternalSeparation?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    combustibleInsulation?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    subcompartment?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    stairways?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    stairwaysIndex?: IntNullableFilter<"AssessmentProtectionFactors"> | number | null
    horizontalExit?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    sprinklers?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    u1PartialDetection?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    u2Max300Occupants?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    u3VoiceEvacuation?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    u4MarkedExits?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    u5SmokeEvacuation?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    partialDetection?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    partialSprinkler?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    otherAutoExtinguish?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    financialDataBackup?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    sparePartsAccess?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    selfRepairCapability?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    relocationAgreements?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    immediateActivityTransfer?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    multipleProduction?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    factor_W?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    factor_N?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    factor_S?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    factor_F?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    factor_U?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    factor_Y?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    level_D?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    level_D1?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    level_D2?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    createdAt?: DateTimeFilter<"AssessmentProtectionFactors"> | Date | string
    updatedAt?: DateTimeFilter<"AssessmentProtectionFactors"> | Date | string
    assessment?: XOR<AssessmentScalarRelationFilter, AssessmentWhereInput>
  }

  export type AssessmentProtectionFactorsOrderByWithRelationInput = {
    id?: SortOrder
    assessmentId?: SortOrder
    waterStorageType?: SortOrderInput | SortOrder
    waterCapacity?: SortOrderInput | SortOrder
    requiredWaterCapacity?: SortOrderInput | SortOrder
    w2Penalty?: SortOrderInput | SortOrder
    distributionNetwork?: SortOrderInput | SortOrder
    pipeDiameter?: SortOrderInput | SortOrder
    isRingNetwork?: SortOrderInput | SortOrder
    waterFlowCapacity?: SortOrderInput | SortOrder
    distributionNetworkAdequacy?: SortOrderInput | SortOrder
    hydrantCount25?: SortOrderInput | SortOrder
    hydrantCount3?: SortOrderInput | SortOrder
    hydrantCount4?: SortOrderInput | SortOrder
    equivalentHydrant25?: SortOrderInput | SortOrder
    averageHydrantDistance?: SortOrderInput | SortOrder
    w4Score?: SortOrderInput | SortOrder
    staticPressureRequired?: SortOrderInput | SortOrder
    staticPressureAvailable?: SortOrderInput | SortOrder
    w5Score?: SortOrderInput | SortOrder
    detectionType?: SortOrderInput | SortOrder
    s1ElectronicSystem?: SortOrderInput | SortOrder
    s1ZoneIdentification?: SortOrderInput | SortOrder
    sprinklerType?: SortOrderInput | SortOrder
    fireStationType?: SortOrderInput | SortOrder
    waterSupplyType?: SortOrderInput | SortOrder
    industrialBrigade?: SortOrderInput | SortOrder
    industrialBrigadeLabel?: SortOrderInput | SortOrder
    s6OtherSuppression?: SortOrderInput | SortOrder
    s7UnlimitedWater?: SortOrderInput | SortOrder
    s8DedicatedWater?: SortOrderInput | SortOrder
    s9WaterControl?: SortOrderInput | SortOrder
    n1?: SortOrderInput | SortOrder
    n1ContinuousPresence?: SortOrderInput | SortOrder
    n1ManualWarning?: SortOrderInput | SortOrder
    n1FireDeptNotification?: SortOrderInput | SortOrder
    n1ResidentAlarm?: SortOrderInput | SortOrder
    n2?: SortOrderInput | SortOrder
    n3?: SortOrderInput | SortOrder
    n4?: SortOrderInput | SortOrder
    n5?: SortOrderInput | SortOrder
    structureResist?: SortOrderInput | SortOrder
    facadeResist?: SortOrderInput | SortOrder
    roofResist?: SortOrderInput | SortOrder
    wallResist?: SortOrderInput | SortOrder
    hasManyWindows?: SortOrderInput | SortOrder
    noInternalSeparation?: SortOrderInput | SortOrder
    combustibleInsulation?: SortOrderInput | SortOrder
    subcompartment?: SortOrderInput | SortOrder
    stairways?: SortOrderInput | SortOrder
    stairwaysIndex?: SortOrderInput | SortOrder
    horizontalExit?: SortOrderInput | SortOrder
    sprinklers?: SortOrderInput | SortOrder
    u1PartialDetection?: SortOrderInput | SortOrder
    u2Max300Occupants?: SortOrderInput | SortOrder
    u3VoiceEvacuation?: SortOrderInput | SortOrder
    u4MarkedExits?: SortOrderInput | SortOrder
    u5SmokeEvacuation?: SortOrderInput | SortOrder
    partialDetection?: SortOrderInput | SortOrder
    partialSprinkler?: SortOrderInput | SortOrder
    otherAutoExtinguish?: SortOrderInput | SortOrder
    financialDataBackup?: SortOrderInput | SortOrder
    sparePartsAccess?: SortOrderInput | SortOrder
    selfRepairCapability?: SortOrderInput | SortOrder
    relocationAgreements?: SortOrderInput | SortOrder
    immediateActivityTransfer?: SortOrderInput | SortOrder
    multipleProduction?: SortOrderInput | SortOrder
    factor_W?: SortOrderInput | SortOrder
    factor_N?: SortOrderInput | SortOrder
    factor_S?: SortOrderInput | SortOrder
    factor_F?: SortOrderInput | SortOrder
    factor_U?: SortOrderInput | SortOrder
    factor_Y?: SortOrderInput | SortOrder
    level_D?: SortOrderInput | SortOrder
    level_D1?: SortOrderInput | SortOrder
    level_D2?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assessment?: AssessmentOrderByWithRelationInput
  }

  export type AssessmentProtectionFactorsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    assessmentId?: string
    AND?: AssessmentProtectionFactorsWhereInput | AssessmentProtectionFactorsWhereInput[]
    OR?: AssessmentProtectionFactorsWhereInput[]
    NOT?: AssessmentProtectionFactorsWhereInput | AssessmentProtectionFactorsWhereInput[]
    waterStorageType?: StringNullableFilter<"AssessmentProtectionFactors"> | string | null
    waterCapacity?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    requiredWaterCapacity?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    w2Penalty?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    distributionNetwork?: StringNullableFilter<"AssessmentProtectionFactors"> | string | null
    pipeDiameter?: StringNullableFilter<"AssessmentProtectionFactors"> | string | null
    isRingNetwork?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    waterFlowCapacity?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    distributionNetworkAdequacy?: StringNullableFilter<"AssessmentProtectionFactors"> | string | null
    hydrantCount25?: IntNullableFilter<"AssessmentProtectionFactors"> | number | null
    hydrantCount3?: IntNullableFilter<"AssessmentProtectionFactors"> | number | null
    hydrantCount4?: IntNullableFilter<"AssessmentProtectionFactors"> | number | null
    equivalentHydrant25?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    averageHydrantDistance?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    w4Score?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    staticPressureRequired?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    staticPressureAvailable?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    w5Score?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    detectionType?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    s1ElectronicSystem?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    s1ZoneIdentification?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    sprinklerType?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    fireStationType?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    waterSupplyType?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    industrialBrigade?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    industrialBrigadeLabel?: StringNullableFilter<"AssessmentProtectionFactors"> | string | null
    s6OtherSuppression?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    s7UnlimitedWater?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    s8DedicatedWater?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    s9WaterControl?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    n1?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    n1ContinuousPresence?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    n1ManualWarning?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    n1FireDeptNotification?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    n1ResidentAlarm?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    n2?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    n3?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    n4?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    n5?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    structureResist?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    facadeResist?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    roofResist?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    wallResist?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    hasManyWindows?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    noInternalSeparation?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    combustibleInsulation?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    subcompartment?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    stairways?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    stairwaysIndex?: IntNullableFilter<"AssessmentProtectionFactors"> | number | null
    horizontalExit?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    sprinklers?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    u1PartialDetection?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    u2Max300Occupants?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    u3VoiceEvacuation?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    u4MarkedExits?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    u5SmokeEvacuation?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    partialDetection?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    partialSprinkler?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    otherAutoExtinguish?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    financialDataBackup?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    sparePartsAccess?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    selfRepairCapability?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    relocationAgreements?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    immediateActivityTransfer?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    multipleProduction?: BoolNullableFilter<"AssessmentProtectionFactors"> | boolean | null
    factor_W?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    factor_N?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    factor_S?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    factor_F?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    factor_U?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    factor_Y?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    level_D?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    level_D1?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    level_D2?: FloatNullableFilter<"AssessmentProtectionFactors"> | number | null
    createdAt?: DateTimeFilter<"AssessmentProtectionFactors"> | Date | string
    updatedAt?: DateTimeFilter<"AssessmentProtectionFactors"> | Date | string
    assessment?: XOR<AssessmentScalarRelationFilter, AssessmentWhereInput>
  }, "id" | "assessmentId">

  export type AssessmentProtectionFactorsOrderByWithAggregationInput = {
    id?: SortOrder
    assessmentId?: SortOrder
    waterStorageType?: SortOrderInput | SortOrder
    waterCapacity?: SortOrderInput | SortOrder
    requiredWaterCapacity?: SortOrderInput | SortOrder
    w2Penalty?: SortOrderInput | SortOrder
    distributionNetwork?: SortOrderInput | SortOrder
    pipeDiameter?: SortOrderInput | SortOrder
    isRingNetwork?: SortOrderInput | SortOrder
    waterFlowCapacity?: SortOrderInput | SortOrder
    distributionNetworkAdequacy?: SortOrderInput | SortOrder
    hydrantCount25?: SortOrderInput | SortOrder
    hydrantCount3?: SortOrderInput | SortOrder
    hydrantCount4?: SortOrderInput | SortOrder
    equivalentHydrant25?: SortOrderInput | SortOrder
    averageHydrantDistance?: SortOrderInput | SortOrder
    w4Score?: SortOrderInput | SortOrder
    staticPressureRequired?: SortOrderInput | SortOrder
    staticPressureAvailable?: SortOrderInput | SortOrder
    w5Score?: SortOrderInput | SortOrder
    detectionType?: SortOrderInput | SortOrder
    s1ElectronicSystem?: SortOrderInput | SortOrder
    s1ZoneIdentification?: SortOrderInput | SortOrder
    sprinklerType?: SortOrderInput | SortOrder
    fireStationType?: SortOrderInput | SortOrder
    waterSupplyType?: SortOrderInput | SortOrder
    industrialBrigade?: SortOrderInput | SortOrder
    industrialBrigadeLabel?: SortOrderInput | SortOrder
    s6OtherSuppression?: SortOrderInput | SortOrder
    s7UnlimitedWater?: SortOrderInput | SortOrder
    s8DedicatedWater?: SortOrderInput | SortOrder
    s9WaterControl?: SortOrderInput | SortOrder
    n1?: SortOrderInput | SortOrder
    n1ContinuousPresence?: SortOrderInput | SortOrder
    n1ManualWarning?: SortOrderInput | SortOrder
    n1FireDeptNotification?: SortOrderInput | SortOrder
    n1ResidentAlarm?: SortOrderInput | SortOrder
    n2?: SortOrderInput | SortOrder
    n3?: SortOrderInput | SortOrder
    n4?: SortOrderInput | SortOrder
    n5?: SortOrderInput | SortOrder
    structureResist?: SortOrderInput | SortOrder
    facadeResist?: SortOrderInput | SortOrder
    roofResist?: SortOrderInput | SortOrder
    wallResist?: SortOrderInput | SortOrder
    hasManyWindows?: SortOrderInput | SortOrder
    noInternalSeparation?: SortOrderInput | SortOrder
    combustibleInsulation?: SortOrderInput | SortOrder
    subcompartment?: SortOrderInput | SortOrder
    stairways?: SortOrderInput | SortOrder
    stairwaysIndex?: SortOrderInput | SortOrder
    horizontalExit?: SortOrderInput | SortOrder
    sprinklers?: SortOrderInput | SortOrder
    u1PartialDetection?: SortOrderInput | SortOrder
    u2Max300Occupants?: SortOrderInput | SortOrder
    u3VoiceEvacuation?: SortOrderInput | SortOrder
    u4MarkedExits?: SortOrderInput | SortOrder
    u5SmokeEvacuation?: SortOrderInput | SortOrder
    partialDetection?: SortOrderInput | SortOrder
    partialSprinkler?: SortOrderInput | SortOrder
    otherAutoExtinguish?: SortOrderInput | SortOrder
    financialDataBackup?: SortOrderInput | SortOrder
    sparePartsAccess?: SortOrderInput | SortOrder
    selfRepairCapability?: SortOrderInput | SortOrder
    relocationAgreements?: SortOrderInput | SortOrder
    immediateActivityTransfer?: SortOrderInput | SortOrder
    multipleProduction?: SortOrderInput | SortOrder
    factor_W?: SortOrderInput | SortOrder
    factor_N?: SortOrderInput | SortOrder
    factor_S?: SortOrderInput | SortOrder
    factor_F?: SortOrderInput | SortOrder
    factor_U?: SortOrderInput | SortOrder
    factor_Y?: SortOrderInput | SortOrder
    level_D?: SortOrderInput | SortOrder
    level_D1?: SortOrderInput | SortOrder
    level_D2?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AssessmentProtectionFactorsCountOrderByAggregateInput
    _avg?: AssessmentProtectionFactorsAvgOrderByAggregateInput
    _max?: AssessmentProtectionFactorsMaxOrderByAggregateInput
    _min?: AssessmentProtectionFactorsMinOrderByAggregateInput
    _sum?: AssessmentProtectionFactorsSumOrderByAggregateInput
  }

  export type AssessmentProtectionFactorsScalarWhereWithAggregatesInput = {
    AND?: AssessmentProtectionFactorsScalarWhereWithAggregatesInput | AssessmentProtectionFactorsScalarWhereWithAggregatesInput[]
    OR?: AssessmentProtectionFactorsScalarWhereWithAggregatesInput[]
    NOT?: AssessmentProtectionFactorsScalarWhereWithAggregatesInput | AssessmentProtectionFactorsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AssessmentProtectionFactors"> | string
    assessmentId?: StringWithAggregatesFilter<"AssessmentProtectionFactors"> | string
    waterStorageType?: StringNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | string | null
    waterCapacity?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    requiredWaterCapacity?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    w2Penalty?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    distributionNetwork?: StringNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | string | null
    pipeDiameter?: StringNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | string | null
    isRingNetwork?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    waterFlowCapacity?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    distributionNetworkAdequacy?: StringNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | string | null
    hydrantCount25?: IntNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    hydrantCount3?: IntNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    hydrantCount4?: IntNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    equivalentHydrant25?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    averageHydrantDistance?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    w4Score?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    staticPressureRequired?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    staticPressureAvailable?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    w5Score?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    detectionType?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    s1ElectronicSystem?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    s1ZoneIdentification?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    sprinklerType?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    fireStationType?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    waterSupplyType?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    industrialBrigade?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    industrialBrigadeLabel?: StringNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | string | null
    s6OtherSuppression?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    s7UnlimitedWater?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    s8DedicatedWater?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    s9WaterControl?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    n1?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    n1ContinuousPresence?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    n1ManualWarning?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    n1FireDeptNotification?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    n1ResidentAlarm?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    n2?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    n3?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    n4?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    n5?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    structureResist?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    facadeResist?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    roofResist?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    wallResist?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    hasManyWindows?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    noInternalSeparation?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    combustibleInsulation?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    subcompartment?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    stairways?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    stairwaysIndex?: IntNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    horizontalExit?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    sprinklers?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    u1PartialDetection?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    u2Max300Occupants?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    u3VoiceEvacuation?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    u4MarkedExits?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    u5SmokeEvacuation?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    partialDetection?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    partialSprinkler?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    otherAutoExtinguish?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    financialDataBackup?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    sparePartsAccess?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    selfRepairCapability?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    relocationAgreements?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    immediateActivityTransfer?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    multipleProduction?: BoolNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | boolean | null
    factor_W?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    factor_N?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    factor_S?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    factor_F?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    factor_U?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    factor_Y?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    level_D?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    level_D1?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    level_D2?: FloatNullableWithAggregatesFilter<"AssessmentProtectionFactors"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"AssessmentProtectionFactors"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AssessmentProtectionFactors"> | Date | string
  }

  export type AssessmentFinalRisksWhereInput = {
    AND?: AssessmentFinalRisksWhereInput | AssessmentFinalRisksWhereInput[]
    OR?: AssessmentFinalRisksWhereInput[]
    NOT?: AssessmentFinalRisksWhereInput | AssessmentFinalRisksWhereInput[]
    id?: StringFilter<"AssessmentFinalRisks"> | string
    assessmentId?: StringFilter<"AssessmentFinalRisks"> | string
    factor_Fo?: FloatNullableFilter<"AssessmentFinalRisks"> | number | null
    risk_Ro?: FloatNullableFilter<"AssessmentFinalRisks"> | number | null
    final_R?: FloatNullableFilter<"AssessmentFinalRisks"> | number | null
    final_R1?: FloatNullableFilter<"AssessmentFinalRisks"> | number | null
    final_R2?: FloatNullableFilter<"AssessmentFinalRisks"> | number | null
    status_R?: StringNullableFilter<"AssessmentFinalRisks"> | string | null
    status_R1?: StringNullableFilter<"AssessmentFinalRisks"> | string | null
    status_R2?: StringNullableFilter<"AssessmentFinalRisks"> | string | null
    createdAt?: DateTimeFilter<"AssessmentFinalRisks"> | Date | string
    updatedAt?: DateTimeFilter<"AssessmentFinalRisks"> | Date | string
    assessment?: XOR<AssessmentScalarRelationFilter, AssessmentWhereInput>
  }

  export type AssessmentFinalRisksOrderByWithRelationInput = {
    id?: SortOrder
    assessmentId?: SortOrder
    factor_Fo?: SortOrderInput | SortOrder
    risk_Ro?: SortOrderInput | SortOrder
    final_R?: SortOrderInput | SortOrder
    final_R1?: SortOrderInput | SortOrder
    final_R2?: SortOrderInput | SortOrder
    status_R?: SortOrderInput | SortOrder
    status_R1?: SortOrderInput | SortOrder
    status_R2?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assessment?: AssessmentOrderByWithRelationInput
  }

  export type AssessmentFinalRisksWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    assessmentId?: string
    AND?: AssessmentFinalRisksWhereInput | AssessmentFinalRisksWhereInput[]
    OR?: AssessmentFinalRisksWhereInput[]
    NOT?: AssessmentFinalRisksWhereInput | AssessmentFinalRisksWhereInput[]
    factor_Fo?: FloatNullableFilter<"AssessmentFinalRisks"> | number | null
    risk_Ro?: FloatNullableFilter<"AssessmentFinalRisks"> | number | null
    final_R?: FloatNullableFilter<"AssessmentFinalRisks"> | number | null
    final_R1?: FloatNullableFilter<"AssessmentFinalRisks"> | number | null
    final_R2?: FloatNullableFilter<"AssessmentFinalRisks"> | number | null
    status_R?: StringNullableFilter<"AssessmentFinalRisks"> | string | null
    status_R1?: StringNullableFilter<"AssessmentFinalRisks"> | string | null
    status_R2?: StringNullableFilter<"AssessmentFinalRisks"> | string | null
    createdAt?: DateTimeFilter<"AssessmentFinalRisks"> | Date | string
    updatedAt?: DateTimeFilter<"AssessmentFinalRisks"> | Date | string
    assessment?: XOR<AssessmentScalarRelationFilter, AssessmentWhereInput>
  }, "id" | "assessmentId">

  export type AssessmentFinalRisksOrderByWithAggregationInput = {
    id?: SortOrder
    assessmentId?: SortOrder
    factor_Fo?: SortOrderInput | SortOrder
    risk_Ro?: SortOrderInput | SortOrder
    final_R?: SortOrderInput | SortOrder
    final_R1?: SortOrderInput | SortOrder
    final_R2?: SortOrderInput | SortOrder
    status_R?: SortOrderInput | SortOrder
    status_R1?: SortOrderInput | SortOrder
    status_R2?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AssessmentFinalRisksCountOrderByAggregateInput
    _avg?: AssessmentFinalRisksAvgOrderByAggregateInput
    _max?: AssessmentFinalRisksMaxOrderByAggregateInput
    _min?: AssessmentFinalRisksMinOrderByAggregateInput
    _sum?: AssessmentFinalRisksSumOrderByAggregateInput
  }

  export type AssessmentFinalRisksScalarWhereWithAggregatesInput = {
    AND?: AssessmentFinalRisksScalarWhereWithAggregatesInput | AssessmentFinalRisksScalarWhereWithAggregatesInput[]
    OR?: AssessmentFinalRisksScalarWhereWithAggregatesInput[]
    NOT?: AssessmentFinalRisksScalarWhereWithAggregatesInput | AssessmentFinalRisksScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AssessmentFinalRisks"> | string
    assessmentId?: StringWithAggregatesFilter<"AssessmentFinalRisks"> | string
    factor_Fo?: FloatNullableWithAggregatesFilter<"AssessmentFinalRisks"> | number | null
    risk_Ro?: FloatNullableWithAggregatesFilter<"AssessmentFinalRisks"> | number | null
    final_R?: FloatNullableWithAggregatesFilter<"AssessmentFinalRisks"> | number | null
    final_R1?: FloatNullableWithAggregatesFilter<"AssessmentFinalRisks"> | number | null
    final_R2?: FloatNullableWithAggregatesFilter<"AssessmentFinalRisks"> | number | null
    status_R?: StringNullableWithAggregatesFilter<"AssessmentFinalRisks"> | string | null
    status_R1?: StringNullableWithAggregatesFilter<"AssessmentFinalRisks"> | string | null
    status_R2?: StringNullableWithAggregatesFilter<"AssessmentFinalRisks"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AssessmentFinalRisks"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AssessmentFinalRisks"> | Date | string
  }

  export type UserCreateInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: string | null
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: string | null
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: string | null
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    impersonatedBy?: string | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
    impersonatedBy?: string | null
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    impersonatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    impersonatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateManyInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
    impersonatedBy?: string | null
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    impersonatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    impersonatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUncheckedCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateManyInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    name: string
    address?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    floors?: FloorCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    name: string
    address?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    floors?: FloorUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    floors?: FloorUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    floors?: FloorUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    name: string
    address?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type FloorCreateInput = {
    id?: string
    name: string
    level: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutFloorsInput
    assessment?: AssessmentCreateNestedOneWithoutFloorInput
  }

  export type FloorUncheckedCreateInput = {
    id?: string
    name: string
    level: number
    description?: string | null
    projectId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    assessment?: AssessmentUncheckedCreateNestedOneWithoutFloorInput
  }

  export type FloorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutFloorsNestedInput
    assessment?: AssessmentUpdateOneWithoutFloorNestedInput
  }

  export type FloorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assessment?: AssessmentUncheckedUpdateOneWithoutFloorNestedInput
  }

  export type FloorCreateManyInput = {
    id?: string
    name: string
    level: number
    description?: string | null
    projectId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FloorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FloorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentCreateInput = {
    id?: string
    updatedAt?: Date | string
    floor: FloorCreateNestedOneWithoutAssessmentInput
    riskFactors?: AssessmentRiskFactorsCreateNestedOneWithoutAssessmentInput
    acceptanceFactors?: AssessmentAcceptanceFactorsCreateNestedOneWithoutAssessmentInput
    protectionFactors?: AssessmentProtectionFactorsCreateNestedOneWithoutAssessmentInput
    finalRisks?: AssessmentFinalRisksCreateNestedOneWithoutAssessmentInput
  }

  export type AssessmentUncheckedCreateInput = {
    id?: string
    floorId: string
    updatedAt?: Date | string
    riskFactors?: AssessmentRiskFactorsUncheckedCreateNestedOneWithoutAssessmentInput
    acceptanceFactors?: AssessmentAcceptanceFactorsUncheckedCreateNestedOneWithoutAssessmentInput
    protectionFactors?: AssessmentProtectionFactorsUncheckedCreateNestedOneWithoutAssessmentInput
    finalRisks?: AssessmentFinalRisksUncheckedCreateNestedOneWithoutAssessmentInput
  }

  export type AssessmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    floor?: FloorUpdateOneRequiredWithoutAssessmentNestedInput
    riskFactors?: AssessmentRiskFactorsUpdateOneWithoutAssessmentNestedInput
    acceptanceFactors?: AssessmentAcceptanceFactorsUpdateOneWithoutAssessmentNestedInput
    protectionFactors?: AssessmentProtectionFactorsUpdateOneWithoutAssessmentNestedInput
    finalRisks?: AssessmentFinalRisksUpdateOneWithoutAssessmentNestedInput
  }

  export type AssessmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    floorId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    riskFactors?: AssessmentRiskFactorsUncheckedUpdateOneWithoutAssessmentNestedInput
    acceptanceFactors?: AssessmentAcceptanceFactorsUncheckedUpdateOneWithoutAssessmentNestedInput
    protectionFactors?: AssessmentProtectionFactorsUncheckedUpdateOneWithoutAssessmentNestedInput
    finalRisks?: AssessmentFinalRisksUncheckedUpdateOneWithoutAssessmentNestedInput
  }

  export type AssessmentCreateManyInput = {
    id?: string
    floorId: string
    updatedAt?: Date | string
  }

  export type AssessmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    floorId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentRiskFactorsCreateInput = {
    id?: string
    qi?: number | null
    qm?: number | null
    tempDestruction?: number | null
    tempDestructionMulti?: string | null
    avgDimension?: number | null
    materialClass?: number | null
    materialClassMulti?: string | null
    length?: number | null
    width?: number | null
    area?: number | null
    height?: number | null
    accessType?: string | null
    windowArea?: number | null
    staticVentArea?: number | null
    mechVentFlow?: number | null
    ventingRatio_k?: number | null
    accessSides?: number | null
    heightAbove?: number | null
    depthBelow?: number | null
    floorLevel?: number | null
    factor_q?: number | null
    factor_i?: number | null
    factor_g?: number | null
    factor_e?: number | null
    factor_v?: number | null
    factor_z?: number | null
    risk_P?: number | null
    risk_P1?: number | null
    risk_P2?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assessment: AssessmentCreateNestedOneWithoutRiskFactorsInput
  }

  export type AssessmentRiskFactorsUncheckedCreateInput = {
    id?: string
    assessmentId: string
    qi?: number | null
    qm?: number | null
    tempDestruction?: number | null
    tempDestructionMulti?: string | null
    avgDimension?: number | null
    materialClass?: number | null
    materialClassMulti?: string | null
    length?: number | null
    width?: number | null
    area?: number | null
    height?: number | null
    accessType?: string | null
    windowArea?: number | null
    staticVentArea?: number | null
    mechVentFlow?: number | null
    ventingRatio_k?: number | null
    accessSides?: number | null
    heightAbove?: number | null
    depthBelow?: number | null
    floorLevel?: number | null
    factor_q?: number | null
    factor_i?: number | null
    factor_g?: number | null
    factor_e?: number | null
    factor_v?: number | null
    factor_z?: number | null
    risk_P?: number | null
    risk_P1?: number | null
    risk_P2?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentRiskFactorsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    qi?: NullableFloatFieldUpdateOperationsInput | number | null
    qm?: NullableFloatFieldUpdateOperationsInput | number | null
    tempDestruction?: NullableFloatFieldUpdateOperationsInput | number | null
    tempDestructionMulti?: NullableStringFieldUpdateOperationsInput | string | null
    avgDimension?: NullableFloatFieldUpdateOperationsInput | number | null
    materialClass?: NullableFloatFieldUpdateOperationsInput | number | null
    materialClassMulti?: NullableStringFieldUpdateOperationsInput | string | null
    length?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableFloatFieldUpdateOperationsInput | number | null
    area?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    accessType?: NullableStringFieldUpdateOperationsInput | string | null
    windowArea?: NullableFloatFieldUpdateOperationsInput | number | null
    staticVentArea?: NullableFloatFieldUpdateOperationsInput | number | null
    mechVentFlow?: NullableFloatFieldUpdateOperationsInput | number | null
    ventingRatio_k?: NullableFloatFieldUpdateOperationsInput | number | null
    accessSides?: NullableIntFieldUpdateOperationsInput | number | null
    heightAbove?: NullableFloatFieldUpdateOperationsInput | number | null
    depthBelow?: NullableFloatFieldUpdateOperationsInput | number | null
    floorLevel?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_q?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_i?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_g?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_e?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_v?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_z?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_P?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_P1?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_P2?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assessment?: AssessmentUpdateOneRequiredWithoutRiskFactorsNestedInput
  }

  export type AssessmentRiskFactorsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentId?: StringFieldUpdateOperationsInput | string
    qi?: NullableFloatFieldUpdateOperationsInput | number | null
    qm?: NullableFloatFieldUpdateOperationsInput | number | null
    tempDestruction?: NullableFloatFieldUpdateOperationsInput | number | null
    tempDestructionMulti?: NullableStringFieldUpdateOperationsInput | string | null
    avgDimension?: NullableFloatFieldUpdateOperationsInput | number | null
    materialClass?: NullableFloatFieldUpdateOperationsInput | number | null
    materialClassMulti?: NullableStringFieldUpdateOperationsInput | string | null
    length?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableFloatFieldUpdateOperationsInput | number | null
    area?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    accessType?: NullableStringFieldUpdateOperationsInput | string | null
    windowArea?: NullableFloatFieldUpdateOperationsInput | number | null
    staticVentArea?: NullableFloatFieldUpdateOperationsInput | number | null
    mechVentFlow?: NullableFloatFieldUpdateOperationsInput | number | null
    ventingRatio_k?: NullableFloatFieldUpdateOperationsInput | number | null
    accessSides?: NullableIntFieldUpdateOperationsInput | number | null
    heightAbove?: NullableFloatFieldUpdateOperationsInput | number | null
    depthBelow?: NullableFloatFieldUpdateOperationsInput | number | null
    floorLevel?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_q?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_i?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_g?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_e?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_v?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_z?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_P?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_P1?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_P2?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentRiskFactorsCreateManyInput = {
    id?: string
    assessmentId: string
    qi?: number | null
    qm?: number | null
    tempDestruction?: number | null
    tempDestructionMulti?: string | null
    avgDimension?: number | null
    materialClass?: number | null
    materialClassMulti?: string | null
    length?: number | null
    width?: number | null
    area?: number | null
    height?: number | null
    accessType?: string | null
    windowArea?: number | null
    staticVentArea?: number | null
    mechVentFlow?: number | null
    ventingRatio_k?: number | null
    accessSides?: number | null
    heightAbove?: number | null
    depthBelow?: number | null
    floorLevel?: number | null
    factor_q?: number | null
    factor_i?: number | null
    factor_g?: number | null
    factor_e?: number | null
    factor_v?: number | null
    factor_z?: number | null
    risk_P?: number | null
    risk_P1?: number | null
    risk_P2?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentRiskFactorsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    qi?: NullableFloatFieldUpdateOperationsInput | number | null
    qm?: NullableFloatFieldUpdateOperationsInput | number | null
    tempDestruction?: NullableFloatFieldUpdateOperationsInput | number | null
    tempDestructionMulti?: NullableStringFieldUpdateOperationsInput | string | null
    avgDimension?: NullableFloatFieldUpdateOperationsInput | number | null
    materialClass?: NullableFloatFieldUpdateOperationsInput | number | null
    materialClassMulti?: NullableStringFieldUpdateOperationsInput | string | null
    length?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableFloatFieldUpdateOperationsInput | number | null
    area?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    accessType?: NullableStringFieldUpdateOperationsInput | string | null
    windowArea?: NullableFloatFieldUpdateOperationsInput | number | null
    staticVentArea?: NullableFloatFieldUpdateOperationsInput | number | null
    mechVentFlow?: NullableFloatFieldUpdateOperationsInput | number | null
    ventingRatio_k?: NullableFloatFieldUpdateOperationsInput | number | null
    accessSides?: NullableIntFieldUpdateOperationsInput | number | null
    heightAbove?: NullableFloatFieldUpdateOperationsInput | number | null
    depthBelow?: NullableFloatFieldUpdateOperationsInput | number | null
    floorLevel?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_q?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_i?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_g?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_e?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_v?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_z?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_P?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_P1?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_P2?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentRiskFactorsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentId?: StringFieldUpdateOperationsInput | string
    qi?: NullableFloatFieldUpdateOperationsInput | number | null
    qm?: NullableFloatFieldUpdateOperationsInput | number | null
    tempDestruction?: NullableFloatFieldUpdateOperationsInput | number | null
    tempDestructionMulti?: NullableStringFieldUpdateOperationsInput | string | null
    avgDimension?: NullableFloatFieldUpdateOperationsInput | number | null
    materialClass?: NullableFloatFieldUpdateOperationsInput | number | null
    materialClassMulti?: NullableStringFieldUpdateOperationsInput | string | null
    length?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableFloatFieldUpdateOperationsInput | number | null
    area?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    accessType?: NullableStringFieldUpdateOperationsInput | string | null
    windowArea?: NullableFloatFieldUpdateOperationsInput | number | null
    staticVentArea?: NullableFloatFieldUpdateOperationsInput | number | null
    mechVentFlow?: NullableFloatFieldUpdateOperationsInput | number | null
    ventingRatio_k?: NullableFloatFieldUpdateOperationsInput | number | null
    accessSides?: NullableIntFieldUpdateOperationsInput | number | null
    heightAbove?: NullableFloatFieldUpdateOperationsInput | number | null
    depthBelow?: NullableFloatFieldUpdateOperationsInput | number | null
    floorLevel?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_q?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_i?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_g?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_e?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_v?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_z?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_P?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_P1?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_P2?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentAcceptanceFactorsCreateInput = {
    id?: string
    mainActivity?: number | null
    mainActivityKey?: string | null
    secondaryActivity?: number | null
    heatTransferType?: number | null
    heatTransferTypeKey?: string | null
    generatorLocation?: number | null
    generatorLocationKey?: string | null
    energySource?: number | null
    energySourceKey?: string | null
    electricalSystem?: number | null
    flammableLiquids?: number | null
    combustibleDust?: number | null
    combustibleDustKey?: string | null
    weldingOperations?: number | null
    additionalCarpentryPlastic?: number | null
    specialRisk?: number | null
    occupantCount?: number | null
    occupantFactor?: number | null
    occupantFactorKey?: string | null
    exitWidths?: string | null
    exitWidthTotal?: number | null
    exitUnitsX?: number | null
    separatePathsK?: number | null
    mobilityFactor?: number | null
    mobilityFactorMulti?: string | null
    perceptionAwareness?: boolean | null
    evacuationPlanClear?: boolean | null
    noPanicRisk?: boolean | null
    exitCountToOpenSpace?: number | null
    valueTotal?: number | null
    valueYear?: number | null
    replaceability?: number | null
    dependencyType?: string | null
    dependencyManual?: number | null
    factor_a?: number | null
    factor_t?: number | null
    factor_c?: number | null
    factor_r?: number | null
    factor_d?: number | null
    level_A?: number | null
    level_A1?: number | null
    level_A2?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assessment: AssessmentCreateNestedOneWithoutAcceptanceFactorsInput
  }

  export type AssessmentAcceptanceFactorsUncheckedCreateInput = {
    id?: string
    assessmentId: string
    mainActivity?: number | null
    mainActivityKey?: string | null
    secondaryActivity?: number | null
    heatTransferType?: number | null
    heatTransferTypeKey?: string | null
    generatorLocation?: number | null
    generatorLocationKey?: string | null
    energySource?: number | null
    energySourceKey?: string | null
    electricalSystem?: number | null
    flammableLiquids?: number | null
    combustibleDust?: number | null
    combustibleDustKey?: string | null
    weldingOperations?: number | null
    additionalCarpentryPlastic?: number | null
    specialRisk?: number | null
    occupantCount?: number | null
    occupantFactor?: number | null
    occupantFactorKey?: string | null
    exitWidths?: string | null
    exitWidthTotal?: number | null
    exitUnitsX?: number | null
    separatePathsK?: number | null
    mobilityFactor?: number | null
    mobilityFactorMulti?: string | null
    perceptionAwareness?: boolean | null
    evacuationPlanClear?: boolean | null
    noPanicRisk?: boolean | null
    exitCountToOpenSpace?: number | null
    valueTotal?: number | null
    valueYear?: number | null
    replaceability?: number | null
    dependencyType?: string | null
    dependencyManual?: number | null
    factor_a?: number | null
    factor_t?: number | null
    factor_c?: number | null
    factor_r?: number | null
    factor_d?: number | null
    level_A?: number | null
    level_A1?: number | null
    level_A2?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentAcceptanceFactorsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mainActivity?: NullableFloatFieldUpdateOperationsInput | number | null
    mainActivityKey?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryActivity?: NullableFloatFieldUpdateOperationsInput | number | null
    heatTransferType?: NullableFloatFieldUpdateOperationsInput | number | null
    heatTransferTypeKey?: NullableStringFieldUpdateOperationsInput | string | null
    generatorLocation?: NullableFloatFieldUpdateOperationsInput | number | null
    generatorLocationKey?: NullableStringFieldUpdateOperationsInput | string | null
    energySource?: NullableFloatFieldUpdateOperationsInput | number | null
    energySourceKey?: NullableStringFieldUpdateOperationsInput | string | null
    electricalSystem?: NullableFloatFieldUpdateOperationsInput | number | null
    flammableLiquids?: NullableFloatFieldUpdateOperationsInput | number | null
    combustibleDust?: NullableFloatFieldUpdateOperationsInput | number | null
    combustibleDustKey?: NullableStringFieldUpdateOperationsInput | string | null
    weldingOperations?: NullableFloatFieldUpdateOperationsInput | number | null
    additionalCarpentryPlastic?: NullableFloatFieldUpdateOperationsInput | number | null
    specialRisk?: NullableFloatFieldUpdateOperationsInput | number | null
    occupantCount?: NullableIntFieldUpdateOperationsInput | number | null
    occupantFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    occupantFactorKey?: NullableStringFieldUpdateOperationsInput | string | null
    exitWidths?: NullableStringFieldUpdateOperationsInput | string | null
    exitWidthTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    exitUnitsX?: NullableFloatFieldUpdateOperationsInput | number | null
    separatePathsK?: NullableFloatFieldUpdateOperationsInput | number | null
    mobilityFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    mobilityFactorMulti?: NullableStringFieldUpdateOperationsInput | string | null
    perceptionAwareness?: NullableBoolFieldUpdateOperationsInput | boolean | null
    evacuationPlanClear?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noPanicRisk?: NullableBoolFieldUpdateOperationsInput | boolean | null
    exitCountToOpenSpace?: NullableIntFieldUpdateOperationsInput | number | null
    valueTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    valueYear?: NullableIntFieldUpdateOperationsInput | number | null
    replaceability?: NullableFloatFieldUpdateOperationsInput | number | null
    dependencyType?: NullableStringFieldUpdateOperationsInput | string | null
    dependencyManual?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_a?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_t?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_c?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_r?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_d?: NullableFloatFieldUpdateOperationsInput | number | null
    level_A?: NullableFloatFieldUpdateOperationsInput | number | null
    level_A1?: NullableFloatFieldUpdateOperationsInput | number | null
    level_A2?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assessment?: AssessmentUpdateOneRequiredWithoutAcceptanceFactorsNestedInput
  }

  export type AssessmentAcceptanceFactorsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentId?: StringFieldUpdateOperationsInput | string
    mainActivity?: NullableFloatFieldUpdateOperationsInput | number | null
    mainActivityKey?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryActivity?: NullableFloatFieldUpdateOperationsInput | number | null
    heatTransferType?: NullableFloatFieldUpdateOperationsInput | number | null
    heatTransferTypeKey?: NullableStringFieldUpdateOperationsInput | string | null
    generatorLocation?: NullableFloatFieldUpdateOperationsInput | number | null
    generatorLocationKey?: NullableStringFieldUpdateOperationsInput | string | null
    energySource?: NullableFloatFieldUpdateOperationsInput | number | null
    energySourceKey?: NullableStringFieldUpdateOperationsInput | string | null
    electricalSystem?: NullableFloatFieldUpdateOperationsInput | number | null
    flammableLiquids?: NullableFloatFieldUpdateOperationsInput | number | null
    combustibleDust?: NullableFloatFieldUpdateOperationsInput | number | null
    combustibleDustKey?: NullableStringFieldUpdateOperationsInput | string | null
    weldingOperations?: NullableFloatFieldUpdateOperationsInput | number | null
    additionalCarpentryPlastic?: NullableFloatFieldUpdateOperationsInput | number | null
    specialRisk?: NullableFloatFieldUpdateOperationsInput | number | null
    occupantCount?: NullableIntFieldUpdateOperationsInput | number | null
    occupantFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    occupantFactorKey?: NullableStringFieldUpdateOperationsInput | string | null
    exitWidths?: NullableStringFieldUpdateOperationsInput | string | null
    exitWidthTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    exitUnitsX?: NullableFloatFieldUpdateOperationsInput | number | null
    separatePathsK?: NullableFloatFieldUpdateOperationsInput | number | null
    mobilityFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    mobilityFactorMulti?: NullableStringFieldUpdateOperationsInput | string | null
    perceptionAwareness?: NullableBoolFieldUpdateOperationsInput | boolean | null
    evacuationPlanClear?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noPanicRisk?: NullableBoolFieldUpdateOperationsInput | boolean | null
    exitCountToOpenSpace?: NullableIntFieldUpdateOperationsInput | number | null
    valueTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    valueYear?: NullableIntFieldUpdateOperationsInput | number | null
    replaceability?: NullableFloatFieldUpdateOperationsInput | number | null
    dependencyType?: NullableStringFieldUpdateOperationsInput | string | null
    dependencyManual?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_a?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_t?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_c?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_r?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_d?: NullableFloatFieldUpdateOperationsInput | number | null
    level_A?: NullableFloatFieldUpdateOperationsInput | number | null
    level_A1?: NullableFloatFieldUpdateOperationsInput | number | null
    level_A2?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentAcceptanceFactorsCreateManyInput = {
    id?: string
    assessmentId: string
    mainActivity?: number | null
    mainActivityKey?: string | null
    secondaryActivity?: number | null
    heatTransferType?: number | null
    heatTransferTypeKey?: string | null
    generatorLocation?: number | null
    generatorLocationKey?: string | null
    energySource?: number | null
    energySourceKey?: string | null
    electricalSystem?: number | null
    flammableLiquids?: number | null
    combustibleDust?: number | null
    combustibleDustKey?: string | null
    weldingOperations?: number | null
    additionalCarpentryPlastic?: number | null
    specialRisk?: number | null
    occupantCount?: number | null
    occupantFactor?: number | null
    occupantFactorKey?: string | null
    exitWidths?: string | null
    exitWidthTotal?: number | null
    exitUnitsX?: number | null
    separatePathsK?: number | null
    mobilityFactor?: number | null
    mobilityFactorMulti?: string | null
    perceptionAwareness?: boolean | null
    evacuationPlanClear?: boolean | null
    noPanicRisk?: boolean | null
    exitCountToOpenSpace?: number | null
    valueTotal?: number | null
    valueYear?: number | null
    replaceability?: number | null
    dependencyType?: string | null
    dependencyManual?: number | null
    factor_a?: number | null
    factor_t?: number | null
    factor_c?: number | null
    factor_r?: number | null
    factor_d?: number | null
    level_A?: number | null
    level_A1?: number | null
    level_A2?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentAcceptanceFactorsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    mainActivity?: NullableFloatFieldUpdateOperationsInput | number | null
    mainActivityKey?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryActivity?: NullableFloatFieldUpdateOperationsInput | number | null
    heatTransferType?: NullableFloatFieldUpdateOperationsInput | number | null
    heatTransferTypeKey?: NullableStringFieldUpdateOperationsInput | string | null
    generatorLocation?: NullableFloatFieldUpdateOperationsInput | number | null
    generatorLocationKey?: NullableStringFieldUpdateOperationsInput | string | null
    energySource?: NullableFloatFieldUpdateOperationsInput | number | null
    energySourceKey?: NullableStringFieldUpdateOperationsInput | string | null
    electricalSystem?: NullableFloatFieldUpdateOperationsInput | number | null
    flammableLiquids?: NullableFloatFieldUpdateOperationsInput | number | null
    combustibleDust?: NullableFloatFieldUpdateOperationsInput | number | null
    combustibleDustKey?: NullableStringFieldUpdateOperationsInput | string | null
    weldingOperations?: NullableFloatFieldUpdateOperationsInput | number | null
    additionalCarpentryPlastic?: NullableFloatFieldUpdateOperationsInput | number | null
    specialRisk?: NullableFloatFieldUpdateOperationsInput | number | null
    occupantCount?: NullableIntFieldUpdateOperationsInput | number | null
    occupantFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    occupantFactorKey?: NullableStringFieldUpdateOperationsInput | string | null
    exitWidths?: NullableStringFieldUpdateOperationsInput | string | null
    exitWidthTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    exitUnitsX?: NullableFloatFieldUpdateOperationsInput | number | null
    separatePathsK?: NullableFloatFieldUpdateOperationsInput | number | null
    mobilityFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    mobilityFactorMulti?: NullableStringFieldUpdateOperationsInput | string | null
    perceptionAwareness?: NullableBoolFieldUpdateOperationsInput | boolean | null
    evacuationPlanClear?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noPanicRisk?: NullableBoolFieldUpdateOperationsInput | boolean | null
    exitCountToOpenSpace?: NullableIntFieldUpdateOperationsInput | number | null
    valueTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    valueYear?: NullableIntFieldUpdateOperationsInput | number | null
    replaceability?: NullableFloatFieldUpdateOperationsInput | number | null
    dependencyType?: NullableStringFieldUpdateOperationsInput | string | null
    dependencyManual?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_a?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_t?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_c?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_r?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_d?: NullableFloatFieldUpdateOperationsInput | number | null
    level_A?: NullableFloatFieldUpdateOperationsInput | number | null
    level_A1?: NullableFloatFieldUpdateOperationsInput | number | null
    level_A2?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentAcceptanceFactorsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentId?: StringFieldUpdateOperationsInput | string
    mainActivity?: NullableFloatFieldUpdateOperationsInput | number | null
    mainActivityKey?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryActivity?: NullableFloatFieldUpdateOperationsInput | number | null
    heatTransferType?: NullableFloatFieldUpdateOperationsInput | number | null
    heatTransferTypeKey?: NullableStringFieldUpdateOperationsInput | string | null
    generatorLocation?: NullableFloatFieldUpdateOperationsInput | number | null
    generatorLocationKey?: NullableStringFieldUpdateOperationsInput | string | null
    energySource?: NullableFloatFieldUpdateOperationsInput | number | null
    energySourceKey?: NullableStringFieldUpdateOperationsInput | string | null
    electricalSystem?: NullableFloatFieldUpdateOperationsInput | number | null
    flammableLiquids?: NullableFloatFieldUpdateOperationsInput | number | null
    combustibleDust?: NullableFloatFieldUpdateOperationsInput | number | null
    combustibleDustKey?: NullableStringFieldUpdateOperationsInput | string | null
    weldingOperations?: NullableFloatFieldUpdateOperationsInput | number | null
    additionalCarpentryPlastic?: NullableFloatFieldUpdateOperationsInput | number | null
    specialRisk?: NullableFloatFieldUpdateOperationsInput | number | null
    occupantCount?: NullableIntFieldUpdateOperationsInput | number | null
    occupantFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    occupantFactorKey?: NullableStringFieldUpdateOperationsInput | string | null
    exitWidths?: NullableStringFieldUpdateOperationsInput | string | null
    exitWidthTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    exitUnitsX?: NullableFloatFieldUpdateOperationsInput | number | null
    separatePathsK?: NullableFloatFieldUpdateOperationsInput | number | null
    mobilityFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    mobilityFactorMulti?: NullableStringFieldUpdateOperationsInput | string | null
    perceptionAwareness?: NullableBoolFieldUpdateOperationsInput | boolean | null
    evacuationPlanClear?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noPanicRisk?: NullableBoolFieldUpdateOperationsInput | boolean | null
    exitCountToOpenSpace?: NullableIntFieldUpdateOperationsInput | number | null
    valueTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    valueYear?: NullableIntFieldUpdateOperationsInput | number | null
    replaceability?: NullableFloatFieldUpdateOperationsInput | number | null
    dependencyType?: NullableStringFieldUpdateOperationsInput | string | null
    dependencyManual?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_a?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_t?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_c?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_r?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_d?: NullableFloatFieldUpdateOperationsInput | number | null
    level_A?: NullableFloatFieldUpdateOperationsInput | number | null
    level_A1?: NullableFloatFieldUpdateOperationsInput | number | null
    level_A2?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentProtectionFactorsCreateInput = {
    id?: string
    waterStorageType?: string | null
    waterCapacity?: number | null
    requiredWaterCapacity?: number | null
    w2Penalty?: number | null
    distributionNetwork?: string | null
    pipeDiameter?: string | null
    isRingNetwork?: boolean | null
    waterFlowCapacity?: number | null
    distributionNetworkAdequacy?: string | null
    hydrantCount25?: number | null
    hydrantCount3?: number | null
    hydrantCount4?: number | null
    equivalentHydrant25?: number | null
    averageHydrantDistance?: number | null
    w4Score?: number | null
    staticPressureRequired?: number | null
    staticPressureAvailable?: number | null
    w5Score?: number | null
    detectionType?: number | null
    s1ElectronicSystem?: boolean | null
    s1ZoneIdentification?: boolean | null
    sprinklerType?: number | null
    fireStationType?: number | null
    waterSupplyType?: number | null
    industrialBrigade?: number | null
    industrialBrigadeLabel?: string | null
    s6OtherSuppression?: number | null
    s7UnlimitedWater?: boolean | null
    s8DedicatedWater?: boolean | null
    s9WaterControl?: boolean | null
    n1?: number | null
    n1ContinuousPresence?: boolean | null
    n1ManualWarning?: boolean | null
    n1FireDeptNotification?: boolean | null
    n1ResidentAlarm?: boolean | null
    n2?: number | null
    n3?: number | null
    n4?: number | null
    n5?: number | null
    structureResist?: number | null
    facadeResist?: number | null
    roofResist?: number | null
    wallResist?: number | null
    hasManyWindows?: boolean | null
    noInternalSeparation?: boolean | null
    combustibleInsulation?: boolean | null
    subcompartment?: number | null
    stairways?: number | null
    stairwaysIndex?: number | null
    horizontalExit?: number | null
    sprinklers?: number | null
    u1PartialDetection?: boolean | null
    u2Max300Occupants?: boolean | null
    u3VoiceEvacuation?: boolean | null
    u4MarkedExits?: boolean | null
    u5SmokeEvacuation?: boolean | null
    partialDetection?: boolean | null
    partialSprinkler?: boolean | null
    otherAutoExtinguish?: boolean | null
    financialDataBackup?: boolean | null
    sparePartsAccess?: boolean | null
    selfRepairCapability?: boolean | null
    relocationAgreements?: boolean | null
    immediateActivityTransfer?: boolean | null
    multipleProduction?: boolean | null
    factor_W?: number | null
    factor_N?: number | null
    factor_S?: number | null
    factor_F?: number | null
    factor_U?: number | null
    factor_Y?: number | null
    level_D?: number | null
    level_D1?: number | null
    level_D2?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assessment: AssessmentCreateNestedOneWithoutProtectionFactorsInput
  }

  export type AssessmentProtectionFactorsUncheckedCreateInput = {
    id?: string
    assessmentId: string
    waterStorageType?: string | null
    waterCapacity?: number | null
    requiredWaterCapacity?: number | null
    w2Penalty?: number | null
    distributionNetwork?: string | null
    pipeDiameter?: string | null
    isRingNetwork?: boolean | null
    waterFlowCapacity?: number | null
    distributionNetworkAdequacy?: string | null
    hydrantCount25?: number | null
    hydrantCount3?: number | null
    hydrantCount4?: number | null
    equivalentHydrant25?: number | null
    averageHydrantDistance?: number | null
    w4Score?: number | null
    staticPressureRequired?: number | null
    staticPressureAvailable?: number | null
    w5Score?: number | null
    detectionType?: number | null
    s1ElectronicSystem?: boolean | null
    s1ZoneIdentification?: boolean | null
    sprinklerType?: number | null
    fireStationType?: number | null
    waterSupplyType?: number | null
    industrialBrigade?: number | null
    industrialBrigadeLabel?: string | null
    s6OtherSuppression?: number | null
    s7UnlimitedWater?: boolean | null
    s8DedicatedWater?: boolean | null
    s9WaterControl?: boolean | null
    n1?: number | null
    n1ContinuousPresence?: boolean | null
    n1ManualWarning?: boolean | null
    n1FireDeptNotification?: boolean | null
    n1ResidentAlarm?: boolean | null
    n2?: number | null
    n3?: number | null
    n4?: number | null
    n5?: number | null
    structureResist?: number | null
    facadeResist?: number | null
    roofResist?: number | null
    wallResist?: number | null
    hasManyWindows?: boolean | null
    noInternalSeparation?: boolean | null
    combustibleInsulation?: boolean | null
    subcompartment?: number | null
    stairways?: number | null
    stairwaysIndex?: number | null
    horizontalExit?: number | null
    sprinklers?: number | null
    u1PartialDetection?: boolean | null
    u2Max300Occupants?: boolean | null
    u3VoiceEvacuation?: boolean | null
    u4MarkedExits?: boolean | null
    u5SmokeEvacuation?: boolean | null
    partialDetection?: boolean | null
    partialSprinkler?: boolean | null
    otherAutoExtinguish?: boolean | null
    financialDataBackup?: boolean | null
    sparePartsAccess?: boolean | null
    selfRepairCapability?: boolean | null
    relocationAgreements?: boolean | null
    immediateActivityTransfer?: boolean | null
    multipleProduction?: boolean | null
    factor_W?: number | null
    factor_N?: number | null
    factor_S?: number | null
    factor_F?: number | null
    factor_U?: number | null
    factor_Y?: number | null
    level_D?: number | null
    level_D1?: number | null
    level_D2?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentProtectionFactorsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    waterStorageType?: NullableStringFieldUpdateOperationsInput | string | null
    waterCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    requiredWaterCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    w2Penalty?: NullableFloatFieldUpdateOperationsInput | number | null
    distributionNetwork?: NullableStringFieldUpdateOperationsInput | string | null
    pipeDiameter?: NullableStringFieldUpdateOperationsInput | string | null
    isRingNetwork?: NullableBoolFieldUpdateOperationsInput | boolean | null
    waterFlowCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    distributionNetworkAdequacy?: NullableStringFieldUpdateOperationsInput | string | null
    hydrantCount25?: NullableIntFieldUpdateOperationsInput | number | null
    hydrantCount3?: NullableIntFieldUpdateOperationsInput | number | null
    hydrantCount4?: NullableIntFieldUpdateOperationsInput | number | null
    equivalentHydrant25?: NullableFloatFieldUpdateOperationsInput | number | null
    averageHydrantDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    w4Score?: NullableFloatFieldUpdateOperationsInput | number | null
    staticPressureRequired?: NullableFloatFieldUpdateOperationsInput | number | null
    staticPressureAvailable?: NullableFloatFieldUpdateOperationsInput | number | null
    w5Score?: NullableFloatFieldUpdateOperationsInput | number | null
    detectionType?: NullableFloatFieldUpdateOperationsInput | number | null
    s1ElectronicSystem?: NullableBoolFieldUpdateOperationsInput | boolean | null
    s1ZoneIdentification?: NullableBoolFieldUpdateOperationsInput | boolean | null
    sprinklerType?: NullableFloatFieldUpdateOperationsInput | number | null
    fireStationType?: NullableFloatFieldUpdateOperationsInput | number | null
    waterSupplyType?: NullableFloatFieldUpdateOperationsInput | number | null
    industrialBrigade?: NullableFloatFieldUpdateOperationsInput | number | null
    industrialBrigadeLabel?: NullableStringFieldUpdateOperationsInput | string | null
    s6OtherSuppression?: NullableFloatFieldUpdateOperationsInput | number | null
    s7UnlimitedWater?: NullableBoolFieldUpdateOperationsInput | boolean | null
    s8DedicatedWater?: NullableBoolFieldUpdateOperationsInput | boolean | null
    s9WaterControl?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1?: NullableFloatFieldUpdateOperationsInput | number | null
    n1ContinuousPresence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1ManualWarning?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1FireDeptNotification?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1ResidentAlarm?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n2?: NullableFloatFieldUpdateOperationsInput | number | null
    n3?: NullableFloatFieldUpdateOperationsInput | number | null
    n4?: NullableFloatFieldUpdateOperationsInput | number | null
    n5?: NullableFloatFieldUpdateOperationsInput | number | null
    structureResist?: NullableFloatFieldUpdateOperationsInput | number | null
    facadeResist?: NullableFloatFieldUpdateOperationsInput | number | null
    roofResist?: NullableFloatFieldUpdateOperationsInput | number | null
    wallResist?: NullableFloatFieldUpdateOperationsInput | number | null
    hasManyWindows?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noInternalSeparation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    combustibleInsulation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    subcompartment?: NullableFloatFieldUpdateOperationsInput | number | null
    stairways?: NullableFloatFieldUpdateOperationsInput | number | null
    stairwaysIndex?: NullableIntFieldUpdateOperationsInput | number | null
    horizontalExit?: NullableFloatFieldUpdateOperationsInput | number | null
    sprinklers?: NullableFloatFieldUpdateOperationsInput | number | null
    u1PartialDetection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u2Max300Occupants?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u3VoiceEvacuation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u4MarkedExits?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u5SmokeEvacuation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    partialDetection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    partialSprinkler?: NullableBoolFieldUpdateOperationsInput | boolean | null
    otherAutoExtinguish?: NullableBoolFieldUpdateOperationsInput | boolean | null
    financialDataBackup?: NullableBoolFieldUpdateOperationsInput | boolean | null
    sparePartsAccess?: NullableBoolFieldUpdateOperationsInput | boolean | null
    selfRepairCapability?: NullableBoolFieldUpdateOperationsInput | boolean | null
    relocationAgreements?: NullableBoolFieldUpdateOperationsInput | boolean | null
    immediateActivityTransfer?: NullableBoolFieldUpdateOperationsInput | boolean | null
    multipleProduction?: NullableBoolFieldUpdateOperationsInput | boolean | null
    factor_W?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_N?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_S?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_F?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_U?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_Y?: NullableFloatFieldUpdateOperationsInput | number | null
    level_D?: NullableFloatFieldUpdateOperationsInput | number | null
    level_D1?: NullableFloatFieldUpdateOperationsInput | number | null
    level_D2?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assessment?: AssessmentUpdateOneRequiredWithoutProtectionFactorsNestedInput
  }

  export type AssessmentProtectionFactorsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentId?: StringFieldUpdateOperationsInput | string
    waterStorageType?: NullableStringFieldUpdateOperationsInput | string | null
    waterCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    requiredWaterCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    w2Penalty?: NullableFloatFieldUpdateOperationsInput | number | null
    distributionNetwork?: NullableStringFieldUpdateOperationsInput | string | null
    pipeDiameter?: NullableStringFieldUpdateOperationsInput | string | null
    isRingNetwork?: NullableBoolFieldUpdateOperationsInput | boolean | null
    waterFlowCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    distributionNetworkAdequacy?: NullableStringFieldUpdateOperationsInput | string | null
    hydrantCount25?: NullableIntFieldUpdateOperationsInput | number | null
    hydrantCount3?: NullableIntFieldUpdateOperationsInput | number | null
    hydrantCount4?: NullableIntFieldUpdateOperationsInput | number | null
    equivalentHydrant25?: NullableFloatFieldUpdateOperationsInput | number | null
    averageHydrantDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    w4Score?: NullableFloatFieldUpdateOperationsInput | number | null
    staticPressureRequired?: NullableFloatFieldUpdateOperationsInput | number | null
    staticPressureAvailable?: NullableFloatFieldUpdateOperationsInput | number | null
    w5Score?: NullableFloatFieldUpdateOperationsInput | number | null
    detectionType?: NullableFloatFieldUpdateOperationsInput | number | null
    s1ElectronicSystem?: NullableBoolFieldUpdateOperationsInput | boolean | null
    s1ZoneIdentification?: NullableBoolFieldUpdateOperationsInput | boolean | null
    sprinklerType?: NullableFloatFieldUpdateOperationsInput | number | null
    fireStationType?: NullableFloatFieldUpdateOperationsInput | number | null
    waterSupplyType?: NullableFloatFieldUpdateOperationsInput | number | null
    industrialBrigade?: NullableFloatFieldUpdateOperationsInput | number | null
    industrialBrigadeLabel?: NullableStringFieldUpdateOperationsInput | string | null
    s6OtherSuppression?: NullableFloatFieldUpdateOperationsInput | number | null
    s7UnlimitedWater?: NullableBoolFieldUpdateOperationsInput | boolean | null
    s8DedicatedWater?: NullableBoolFieldUpdateOperationsInput | boolean | null
    s9WaterControl?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1?: NullableFloatFieldUpdateOperationsInput | number | null
    n1ContinuousPresence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1ManualWarning?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1FireDeptNotification?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1ResidentAlarm?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n2?: NullableFloatFieldUpdateOperationsInput | number | null
    n3?: NullableFloatFieldUpdateOperationsInput | number | null
    n4?: NullableFloatFieldUpdateOperationsInput | number | null
    n5?: NullableFloatFieldUpdateOperationsInput | number | null
    structureResist?: NullableFloatFieldUpdateOperationsInput | number | null
    facadeResist?: NullableFloatFieldUpdateOperationsInput | number | null
    roofResist?: NullableFloatFieldUpdateOperationsInput | number | null
    wallResist?: NullableFloatFieldUpdateOperationsInput | number | null
    hasManyWindows?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noInternalSeparation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    combustibleInsulation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    subcompartment?: NullableFloatFieldUpdateOperationsInput | number | null
    stairways?: NullableFloatFieldUpdateOperationsInput | number | null
    stairwaysIndex?: NullableIntFieldUpdateOperationsInput | number | null
    horizontalExit?: NullableFloatFieldUpdateOperationsInput | number | null
    sprinklers?: NullableFloatFieldUpdateOperationsInput | number | null
    u1PartialDetection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u2Max300Occupants?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u3VoiceEvacuation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u4MarkedExits?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u5SmokeEvacuation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    partialDetection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    partialSprinkler?: NullableBoolFieldUpdateOperationsInput | boolean | null
    otherAutoExtinguish?: NullableBoolFieldUpdateOperationsInput | boolean | null
    financialDataBackup?: NullableBoolFieldUpdateOperationsInput | boolean | null
    sparePartsAccess?: NullableBoolFieldUpdateOperationsInput | boolean | null
    selfRepairCapability?: NullableBoolFieldUpdateOperationsInput | boolean | null
    relocationAgreements?: NullableBoolFieldUpdateOperationsInput | boolean | null
    immediateActivityTransfer?: NullableBoolFieldUpdateOperationsInput | boolean | null
    multipleProduction?: NullableBoolFieldUpdateOperationsInput | boolean | null
    factor_W?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_N?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_S?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_F?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_U?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_Y?: NullableFloatFieldUpdateOperationsInput | number | null
    level_D?: NullableFloatFieldUpdateOperationsInput | number | null
    level_D1?: NullableFloatFieldUpdateOperationsInput | number | null
    level_D2?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentProtectionFactorsCreateManyInput = {
    id?: string
    assessmentId: string
    waterStorageType?: string | null
    waterCapacity?: number | null
    requiredWaterCapacity?: number | null
    w2Penalty?: number | null
    distributionNetwork?: string | null
    pipeDiameter?: string | null
    isRingNetwork?: boolean | null
    waterFlowCapacity?: number | null
    distributionNetworkAdequacy?: string | null
    hydrantCount25?: number | null
    hydrantCount3?: number | null
    hydrantCount4?: number | null
    equivalentHydrant25?: number | null
    averageHydrantDistance?: number | null
    w4Score?: number | null
    staticPressureRequired?: number | null
    staticPressureAvailable?: number | null
    w5Score?: number | null
    detectionType?: number | null
    s1ElectronicSystem?: boolean | null
    s1ZoneIdentification?: boolean | null
    sprinklerType?: number | null
    fireStationType?: number | null
    waterSupplyType?: number | null
    industrialBrigade?: number | null
    industrialBrigadeLabel?: string | null
    s6OtherSuppression?: number | null
    s7UnlimitedWater?: boolean | null
    s8DedicatedWater?: boolean | null
    s9WaterControl?: boolean | null
    n1?: number | null
    n1ContinuousPresence?: boolean | null
    n1ManualWarning?: boolean | null
    n1FireDeptNotification?: boolean | null
    n1ResidentAlarm?: boolean | null
    n2?: number | null
    n3?: number | null
    n4?: number | null
    n5?: number | null
    structureResist?: number | null
    facadeResist?: number | null
    roofResist?: number | null
    wallResist?: number | null
    hasManyWindows?: boolean | null
    noInternalSeparation?: boolean | null
    combustibleInsulation?: boolean | null
    subcompartment?: number | null
    stairways?: number | null
    stairwaysIndex?: number | null
    horizontalExit?: number | null
    sprinklers?: number | null
    u1PartialDetection?: boolean | null
    u2Max300Occupants?: boolean | null
    u3VoiceEvacuation?: boolean | null
    u4MarkedExits?: boolean | null
    u5SmokeEvacuation?: boolean | null
    partialDetection?: boolean | null
    partialSprinkler?: boolean | null
    otherAutoExtinguish?: boolean | null
    financialDataBackup?: boolean | null
    sparePartsAccess?: boolean | null
    selfRepairCapability?: boolean | null
    relocationAgreements?: boolean | null
    immediateActivityTransfer?: boolean | null
    multipleProduction?: boolean | null
    factor_W?: number | null
    factor_N?: number | null
    factor_S?: number | null
    factor_F?: number | null
    factor_U?: number | null
    factor_Y?: number | null
    level_D?: number | null
    level_D1?: number | null
    level_D2?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentProtectionFactorsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    waterStorageType?: NullableStringFieldUpdateOperationsInput | string | null
    waterCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    requiredWaterCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    w2Penalty?: NullableFloatFieldUpdateOperationsInput | number | null
    distributionNetwork?: NullableStringFieldUpdateOperationsInput | string | null
    pipeDiameter?: NullableStringFieldUpdateOperationsInput | string | null
    isRingNetwork?: NullableBoolFieldUpdateOperationsInput | boolean | null
    waterFlowCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    distributionNetworkAdequacy?: NullableStringFieldUpdateOperationsInput | string | null
    hydrantCount25?: NullableIntFieldUpdateOperationsInput | number | null
    hydrantCount3?: NullableIntFieldUpdateOperationsInput | number | null
    hydrantCount4?: NullableIntFieldUpdateOperationsInput | number | null
    equivalentHydrant25?: NullableFloatFieldUpdateOperationsInput | number | null
    averageHydrantDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    w4Score?: NullableFloatFieldUpdateOperationsInput | number | null
    staticPressureRequired?: NullableFloatFieldUpdateOperationsInput | number | null
    staticPressureAvailable?: NullableFloatFieldUpdateOperationsInput | number | null
    w5Score?: NullableFloatFieldUpdateOperationsInput | number | null
    detectionType?: NullableFloatFieldUpdateOperationsInput | number | null
    s1ElectronicSystem?: NullableBoolFieldUpdateOperationsInput | boolean | null
    s1ZoneIdentification?: NullableBoolFieldUpdateOperationsInput | boolean | null
    sprinklerType?: NullableFloatFieldUpdateOperationsInput | number | null
    fireStationType?: NullableFloatFieldUpdateOperationsInput | number | null
    waterSupplyType?: NullableFloatFieldUpdateOperationsInput | number | null
    industrialBrigade?: NullableFloatFieldUpdateOperationsInput | number | null
    industrialBrigadeLabel?: NullableStringFieldUpdateOperationsInput | string | null
    s6OtherSuppression?: NullableFloatFieldUpdateOperationsInput | number | null
    s7UnlimitedWater?: NullableBoolFieldUpdateOperationsInput | boolean | null
    s8DedicatedWater?: NullableBoolFieldUpdateOperationsInput | boolean | null
    s9WaterControl?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1?: NullableFloatFieldUpdateOperationsInput | number | null
    n1ContinuousPresence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1ManualWarning?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1FireDeptNotification?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1ResidentAlarm?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n2?: NullableFloatFieldUpdateOperationsInput | number | null
    n3?: NullableFloatFieldUpdateOperationsInput | number | null
    n4?: NullableFloatFieldUpdateOperationsInput | number | null
    n5?: NullableFloatFieldUpdateOperationsInput | number | null
    structureResist?: NullableFloatFieldUpdateOperationsInput | number | null
    facadeResist?: NullableFloatFieldUpdateOperationsInput | number | null
    roofResist?: NullableFloatFieldUpdateOperationsInput | number | null
    wallResist?: NullableFloatFieldUpdateOperationsInput | number | null
    hasManyWindows?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noInternalSeparation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    combustibleInsulation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    subcompartment?: NullableFloatFieldUpdateOperationsInput | number | null
    stairways?: NullableFloatFieldUpdateOperationsInput | number | null
    stairwaysIndex?: NullableIntFieldUpdateOperationsInput | number | null
    horizontalExit?: NullableFloatFieldUpdateOperationsInput | number | null
    sprinklers?: NullableFloatFieldUpdateOperationsInput | number | null
    u1PartialDetection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u2Max300Occupants?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u3VoiceEvacuation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u4MarkedExits?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u5SmokeEvacuation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    partialDetection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    partialSprinkler?: NullableBoolFieldUpdateOperationsInput | boolean | null
    otherAutoExtinguish?: NullableBoolFieldUpdateOperationsInput | boolean | null
    financialDataBackup?: NullableBoolFieldUpdateOperationsInput | boolean | null
    sparePartsAccess?: NullableBoolFieldUpdateOperationsInput | boolean | null
    selfRepairCapability?: NullableBoolFieldUpdateOperationsInput | boolean | null
    relocationAgreements?: NullableBoolFieldUpdateOperationsInput | boolean | null
    immediateActivityTransfer?: NullableBoolFieldUpdateOperationsInput | boolean | null
    multipleProduction?: NullableBoolFieldUpdateOperationsInput | boolean | null
    factor_W?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_N?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_S?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_F?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_U?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_Y?: NullableFloatFieldUpdateOperationsInput | number | null
    level_D?: NullableFloatFieldUpdateOperationsInput | number | null
    level_D1?: NullableFloatFieldUpdateOperationsInput | number | null
    level_D2?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentProtectionFactorsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentId?: StringFieldUpdateOperationsInput | string
    waterStorageType?: NullableStringFieldUpdateOperationsInput | string | null
    waterCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    requiredWaterCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    w2Penalty?: NullableFloatFieldUpdateOperationsInput | number | null
    distributionNetwork?: NullableStringFieldUpdateOperationsInput | string | null
    pipeDiameter?: NullableStringFieldUpdateOperationsInput | string | null
    isRingNetwork?: NullableBoolFieldUpdateOperationsInput | boolean | null
    waterFlowCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    distributionNetworkAdequacy?: NullableStringFieldUpdateOperationsInput | string | null
    hydrantCount25?: NullableIntFieldUpdateOperationsInput | number | null
    hydrantCount3?: NullableIntFieldUpdateOperationsInput | number | null
    hydrantCount4?: NullableIntFieldUpdateOperationsInput | number | null
    equivalentHydrant25?: NullableFloatFieldUpdateOperationsInput | number | null
    averageHydrantDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    w4Score?: NullableFloatFieldUpdateOperationsInput | number | null
    staticPressureRequired?: NullableFloatFieldUpdateOperationsInput | number | null
    staticPressureAvailable?: NullableFloatFieldUpdateOperationsInput | number | null
    w5Score?: NullableFloatFieldUpdateOperationsInput | number | null
    detectionType?: NullableFloatFieldUpdateOperationsInput | number | null
    s1ElectronicSystem?: NullableBoolFieldUpdateOperationsInput | boolean | null
    s1ZoneIdentification?: NullableBoolFieldUpdateOperationsInput | boolean | null
    sprinklerType?: NullableFloatFieldUpdateOperationsInput | number | null
    fireStationType?: NullableFloatFieldUpdateOperationsInput | number | null
    waterSupplyType?: NullableFloatFieldUpdateOperationsInput | number | null
    industrialBrigade?: NullableFloatFieldUpdateOperationsInput | number | null
    industrialBrigadeLabel?: NullableStringFieldUpdateOperationsInput | string | null
    s6OtherSuppression?: NullableFloatFieldUpdateOperationsInput | number | null
    s7UnlimitedWater?: NullableBoolFieldUpdateOperationsInput | boolean | null
    s8DedicatedWater?: NullableBoolFieldUpdateOperationsInput | boolean | null
    s9WaterControl?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1?: NullableFloatFieldUpdateOperationsInput | number | null
    n1ContinuousPresence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1ManualWarning?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1FireDeptNotification?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1ResidentAlarm?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n2?: NullableFloatFieldUpdateOperationsInput | number | null
    n3?: NullableFloatFieldUpdateOperationsInput | number | null
    n4?: NullableFloatFieldUpdateOperationsInput | number | null
    n5?: NullableFloatFieldUpdateOperationsInput | number | null
    structureResist?: NullableFloatFieldUpdateOperationsInput | number | null
    facadeResist?: NullableFloatFieldUpdateOperationsInput | number | null
    roofResist?: NullableFloatFieldUpdateOperationsInput | number | null
    wallResist?: NullableFloatFieldUpdateOperationsInput | number | null
    hasManyWindows?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noInternalSeparation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    combustibleInsulation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    subcompartment?: NullableFloatFieldUpdateOperationsInput | number | null
    stairways?: NullableFloatFieldUpdateOperationsInput | number | null
    stairwaysIndex?: NullableIntFieldUpdateOperationsInput | number | null
    horizontalExit?: NullableFloatFieldUpdateOperationsInput | number | null
    sprinklers?: NullableFloatFieldUpdateOperationsInput | number | null
    u1PartialDetection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u2Max300Occupants?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u3VoiceEvacuation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u4MarkedExits?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u5SmokeEvacuation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    partialDetection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    partialSprinkler?: NullableBoolFieldUpdateOperationsInput | boolean | null
    otherAutoExtinguish?: NullableBoolFieldUpdateOperationsInput | boolean | null
    financialDataBackup?: NullableBoolFieldUpdateOperationsInput | boolean | null
    sparePartsAccess?: NullableBoolFieldUpdateOperationsInput | boolean | null
    selfRepairCapability?: NullableBoolFieldUpdateOperationsInput | boolean | null
    relocationAgreements?: NullableBoolFieldUpdateOperationsInput | boolean | null
    immediateActivityTransfer?: NullableBoolFieldUpdateOperationsInput | boolean | null
    multipleProduction?: NullableBoolFieldUpdateOperationsInput | boolean | null
    factor_W?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_N?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_S?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_F?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_U?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_Y?: NullableFloatFieldUpdateOperationsInput | number | null
    level_D?: NullableFloatFieldUpdateOperationsInput | number | null
    level_D1?: NullableFloatFieldUpdateOperationsInput | number | null
    level_D2?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentFinalRisksCreateInput = {
    id?: string
    factor_Fo?: number | null
    risk_Ro?: number | null
    final_R?: number | null
    final_R1?: number | null
    final_R2?: number | null
    status_R?: string | null
    status_R1?: string | null
    status_R2?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assessment: AssessmentCreateNestedOneWithoutFinalRisksInput
  }

  export type AssessmentFinalRisksUncheckedCreateInput = {
    id?: string
    assessmentId: string
    factor_Fo?: number | null
    risk_Ro?: number | null
    final_R?: number | null
    final_R1?: number | null
    final_R2?: number | null
    status_R?: string | null
    status_R1?: string | null
    status_R2?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentFinalRisksUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    factor_Fo?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_Ro?: NullableFloatFieldUpdateOperationsInput | number | null
    final_R?: NullableFloatFieldUpdateOperationsInput | number | null
    final_R1?: NullableFloatFieldUpdateOperationsInput | number | null
    final_R2?: NullableFloatFieldUpdateOperationsInput | number | null
    status_R?: NullableStringFieldUpdateOperationsInput | string | null
    status_R1?: NullableStringFieldUpdateOperationsInput | string | null
    status_R2?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assessment?: AssessmentUpdateOneRequiredWithoutFinalRisksNestedInput
  }

  export type AssessmentFinalRisksUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentId?: StringFieldUpdateOperationsInput | string
    factor_Fo?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_Ro?: NullableFloatFieldUpdateOperationsInput | number | null
    final_R?: NullableFloatFieldUpdateOperationsInput | number | null
    final_R1?: NullableFloatFieldUpdateOperationsInput | number | null
    final_R2?: NullableFloatFieldUpdateOperationsInput | number | null
    status_R?: NullableStringFieldUpdateOperationsInput | string | null
    status_R1?: NullableStringFieldUpdateOperationsInput | string | null
    status_R2?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentFinalRisksCreateManyInput = {
    id?: string
    assessmentId: string
    factor_Fo?: number | null
    risk_Ro?: number | null
    final_R?: number | null
    final_R1?: number | null
    final_R2?: number | null
    status_R?: string | null
    status_R1?: string | null
    status_R2?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentFinalRisksUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    factor_Fo?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_Ro?: NullableFloatFieldUpdateOperationsInput | number | null
    final_R?: NullableFloatFieldUpdateOperationsInput | number | null
    final_R1?: NullableFloatFieldUpdateOperationsInput | number | null
    final_R2?: NullableFloatFieldUpdateOperationsInput | number | null
    status_R?: NullableStringFieldUpdateOperationsInput | string | null
    status_R1?: NullableStringFieldUpdateOperationsInput | string | null
    status_R2?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentFinalRisksUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    assessmentId?: StringFieldUpdateOperationsInput | string
    factor_Fo?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_Ro?: NullableFloatFieldUpdateOperationsInput | number | null
    final_R?: NullableFloatFieldUpdateOperationsInput | number | null
    final_R1?: NullableFloatFieldUpdateOperationsInput | number | null
    final_R2?: NullableFloatFieldUpdateOperationsInput | number | null
    status_R?: NullableStringFieldUpdateOperationsInput | string | null
    status_R1?: NullableStringFieldUpdateOperationsInput | string | null
    status_R2?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
    banned?: SortOrder
    banReason?: SortOrder
    banExpires?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
    banned?: SortOrder
    banReason?: SortOrder
    banExpires?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
    banned?: SortOrder
    banReason?: SortOrder
    banExpires?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
    impersonatedBy?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
    impersonatedBy?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
    impersonatedBy?: SortOrder
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloorListRelationFilter = {
    every?: FloorWhereInput
    some?: FloorWhereInput
    none?: FloorWhereInput
  }

  export type FloorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type AssessmentNullableScalarRelationFilter = {
    is?: AssessmentWhereInput | null
    isNot?: AssessmentWhereInput | null
  }

  export type FloorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    description?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloorAvgOrderByAggregateInput = {
    level?: SortOrder
  }

  export type FloorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    description?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    description?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloorSumOrderByAggregateInput = {
    level?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloorScalarRelationFilter = {
    is?: FloorWhereInput
    isNot?: FloorWhereInput
  }

  export type AssessmentRiskFactorsNullableScalarRelationFilter = {
    is?: AssessmentRiskFactorsWhereInput | null
    isNot?: AssessmentRiskFactorsWhereInput | null
  }

  export type AssessmentAcceptanceFactorsNullableScalarRelationFilter = {
    is?: AssessmentAcceptanceFactorsWhereInput | null
    isNot?: AssessmentAcceptanceFactorsWhereInput | null
  }

  export type AssessmentProtectionFactorsNullableScalarRelationFilter = {
    is?: AssessmentProtectionFactorsWhereInput | null
    isNot?: AssessmentProtectionFactorsWhereInput | null
  }

  export type AssessmentFinalRisksNullableScalarRelationFilter = {
    is?: AssessmentFinalRisksWhereInput | null
    isNot?: AssessmentFinalRisksWhereInput | null
  }

  export type AssessmentCountOrderByAggregateInput = {
    id?: SortOrder
    floorId?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentMaxOrderByAggregateInput = {
    id?: SortOrder
    floorId?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentMinOrderByAggregateInput = {
    id?: SortOrder
    floorId?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type AssessmentScalarRelationFilter = {
    is?: AssessmentWhereInput
    isNot?: AssessmentWhereInput
  }

  export type AssessmentRiskFactorsCountOrderByAggregateInput = {
    id?: SortOrder
    assessmentId?: SortOrder
    qi?: SortOrder
    qm?: SortOrder
    tempDestruction?: SortOrder
    tempDestructionMulti?: SortOrder
    avgDimension?: SortOrder
    materialClass?: SortOrder
    materialClassMulti?: SortOrder
    length?: SortOrder
    width?: SortOrder
    area?: SortOrder
    height?: SortOrder
    accessType?: SortOrder
    windowArea?: SortOrder
    staticVentArea?: SortOrder
    mechVentFlow?: SortOrder
    ventingRatio_k?: SortOrder
    accessSides?: SortOrder
    heightAbove?: SortOrder
    depthBelow?: SortOrder
    floorLevel?: SortOrder
    factor_q?: SortOrder
    factor_i?: SortOrder
    factor_g?: SortOrder
    factor_e?: SortOrder
    factor_v?: SortOrder
    factor_z?: SortOrder
    risk_P?: SortOrder
    risk_P1?: SortOrder
    risk_P2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentRiskFactorsAvgOrderByAggregateInput = {
    qi?: SortOrder
    qm?: SortOrder
    tempDestruction?: SortOrder
    avgDimension?: SortOrder
    materialClass?: SortOrder
    length?: SortOrder
    width?: SortOrder
    area?: SortOrder
    height?: SortOrder
    windowArea?: SortOrder
    staticVentArea?: SortOrder
    mechVentFlow?: SortOrder
    ventingRatio_k?: SortOrder
    accessSides?: SortOrder
    heightAbove?: SortOrder
    depthBelow?: SortOrder
    floorLevel?: SortOrder
    factor_q?: SortOrder
    factor_i?: SortOrder
    factor_g?: SortOrder
    factor_e?: SortOrder
    factor_v?: SortOrder
    factor_z?: SortOrder
    risk_P?: SortOrder
    risk_P1?: SortOrder
    risk_P2?: SortOrder
  }

  export type AssessmentRiskFactorsMaxOrderByAggregateInput = {
    id?: SortOrder
    assessmentId?: SortOrder
    qi?: SortOrder
    qm?: SortOrder
    tempDestruction?: SortOrder
    tempDestructionMulti?: SortOrder
    avgDimension?: SortOrder
    materialClass?: SortOrder
    materialClassMulti?: SortOrder
    length?: SortOrder
    width?: SortOrder
    area?: SortOrder
    height?: SortOrder
    accessType?: SortOrder
    windowArea?: SortOrder
    staticVentArea?: SortOrder
    mechVentFlow?: SortOrder
    ventingRatio_k?: SortOrder
    accessSides?: SortOrder
    heightAbove?: SortOrder
    depthBelow?: SortOrder
    floorLevel?: SortOrder
    factor_q?: SortOrder
    factor_i?: SortOrder
    factor_g?: SortOrder
    factor_e?: SortOrder
    factor_v?: SortOrder
    factor_z?: SortOrder
    risk_P?: SortOrder
    risk_P1?: SortOrder
    risk_P2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentRiskFactorsMinOrderByAggregateInput = {
    id?: SortOrder
    assessmentId?: SortOrder
    qi?: SortOrder
    qm?: SortOrder
    tempDestruction?: SortOrder
    tempDestructionMulti?: SortOrder
    avgDimension?: SortOrder
    materialClass?: SortOrder
    materialClassMulti?: SortOrder
    length?: SortOrder
    width?: SortOrder
    area?: SortOrder
    height?: SortOrder
    accessType?: SortOrder
    windowArea?: SortOrder
    staticVentArea?: SortOrder
    mechVentFlow?: SortOrder
    ventingRatio_k?: SortOrder
    accessSides?: SortOrder
    heightAbove?: SortOrder
    depthBelow?: SortOrder
    floorLevel?: SortOrder
    factor_q?: SortOrder
    factor_i?: SortOrder
    factor_g?: SortOrder
    factor_e?: SortOrder
    factor_v?: SortOrder
    factor_z?: SortOrder
    risk_P?: SortOrder
    risk_P1?: SortOrder
    risk_P2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentRiskFactorsSumOrderByAggregateInput = {
    qi?: SortOrder
    qm?: SortOrder
    tempDestruction?: SortOrder
    avgDimension?: SortOrder
    materialClass?: SortOrder
    length?: SortOrder
    width?: SortOrder
    area?: SortOrder
    height?: SortOrder
    windowArea?: SortOrder
    staticVentArea?: SortOrder
    mechVentFlow?: SortOrder
    ventingRatio_k?: SortOrder
    accessSides?: SortOrder
    heightAbove?: SortOrder
    depthBelow?: SortOrder
    floorLevel?: SortOrder
    factor_q?: SortOrder
    factor_i?: SortOrder
    factor_g?: SortOrder
    factor_e?: SortOrder
    factor_v?: SortOrder
    factor_z?: SortOrder
    risk_P?: SortOrder
    risk_P1?: SortOrder
    risk_P2?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type AssessmentAcceptanceFactorsCountOrderByAggregateInput = {
    id?: SortOrder
    assessmentId?: SortOrder
    mainActivity?: SortOrder
    mainActivityKey?: SortOrder
    secondaryActivity?: SortOrder
    heatTransferType?: SortOrder
    heatTransferTypeKey?: SortOrder
    generatorLocation?: SortOrder
    generatorLocationKey?: SortOrder
    energySource?: SortOrder
    energySourceKey?: SortOrder
    electricalSystem?: SortOrder
    flammableLiquids?: SortOrder
    combustibleDust?: SortOrder
    combustibleDustKey?: SortOrder
    weldingOperations?: SortOrder
    additionalCarpentryPlastic?: SortOrder
    specialRisk?: SortOrder
    occupantCount?: SortOrder
    occupantFactor?: SortOrder
    occupantFactorKey?: SortOrder
    exitWidths?: SortOrder
    exitWidthTotal?: SortOrder
    exitUnitsX?: SortOrder
    separatePathsK?: SortOrder
    mobilityFactor?: SortOrder
    mobilityFactorMulti?: SortOrder
    perceptionAwareness?: SortOrder
    evacuationPlanClear?: SortOrder
    noPanicRisk?: SortOrder
    exitCountToOpenSpace?: SortOrder
    valueTotal?: SortOrder
    valueYear?: SortOrder
    replaceability?: SortOrder
    dependencyType?: SortOrder
    dependencyManual?: SortOrder
    factor_a?: SortOrder
    factor_t?: SortOrder
    factor_c?: SortOrder
    factor_r?: SortOrder
    factor_d?: SortOrder
    level_A?: SortOrder
    level_A1?: SortOrder
    level_A2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentAcceptanceFactorsAvgOrderByAggregateInput = {
    mainActivity?: SortOrder
    secondaryActivity?: SortOrder
    heatTransferType?: SortOrder
    generatorLocation?: SortOrder
    energySource?: SortOrder
    electricalSystem?: SortOrder
    flammableLiquids?: SortOrder
    combustibleDust?: SortOrder
    weldingOperations?: SortOrder
    additionalCarpentryPlastic?: SortOrder
    specialRisk?: SortOrder
    occupantCount?: SortOrder
    occupantFactor?: SortOrder
    exitWidthTotal?: SortOrder
    exitUnitsX?: SortOrder
    separatePathsK?: SortOrder
    mobilityFactor?: SortOrder
    exitCountToOpenSpace?: SortOrder
    valueTotal?: SortOrder
    valueYear?: SortOrder
    replaceability?: SortOrder
    dependencyManual?: SortOrder
    factor_a?: SortOrder
    factor_t?: SortOrder
    factor_c?: SortOrder
    factor_r?: SortOrder
    factor_d?: SortOrder
    level_A?: SortOrder
    level_A1?: SortOrder
    level_A2?: SortOrder
  }

  export type AssessmentAcceptanceFactorsMaxOrderByAggregateInput = {
    id?: SortOrder
    assessmentId?: SortOrder
    mainActivity?: SortOrder
    mainActivityKey?: SortOrder
    secondaryActivity?: SortOrder
    heatTransferType?: SortOrder
    heatTransferTypeKey?: SortOrder
    generatorLocation?: SortOrder
    generatorLocationKey?: SortOrder
    energySource?: SortOrder
    energySourceKey?: SortOrder
    electricalSystem?: SortOrder
    flammableLiquids?: SortOrder
    combustibleDust?: SortOrder
    combustibleDustKey?: SortOrder
    weldingOperations?: SortOrder
    additionalCarpentryPlastic?: SortOrder
    specialRisk?: SortOrder
    occupantCount?: SortOrder
    occupantFactor?: SortOrder
    occupantFactorKey?: SortOrder
    exitWidths?: SortOrder
    exitWidthTotal?: SortOrder
    exitUnitsX?: SortOrder
    separatePathsK?: SortOrder
    mobilityFactor?: SortOrder
    mobilityFactorMulti?: SortOrder
    perceptionAwareness?: SortOrder
    evacuationPlanClear?: SortOrder
    noPanicRisk?: SortOrder
    exitCountToOpenSpace?: SortOrder
    valueTotal?: SortOrder
    valueYear?: SortOrder
    replaceability?: SortOrder
    dependencyType?: SortOrder
    dependencyManual?: SortOrder
    factor_a?: SortOrder
    factor_t?: SortOrder
    factor_c?: SortOrder
    factor_r?: SortOrder
    factor_d?: SortOrder
    level_A?: SortOrder
    level_A1?: SortOrder
    level_A2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentAcceptanceFactorsMinOrderByAggregateInput = {
    id?: SortOrder
    assessmentId?: SortOrder
    mainActivity?: SortOrder
    mainActivityKey?: SortOrder
    secondaryActivity?: SortOrder
    heatTransferType?: SortOrder
    heatTransferTypeKey?: SortOrder
    generatorLocation?: SortOrder
    generatorLocationKey?: SortOrder
    energySource?: SortOrder
    energySourceKey?: SortOrder
    electricalSystem?: SortOrder
    flammableLiquids?: SortOrder
    combustibleDust?: SortOrder
    combustibleDustKey?: SortOrder
    weldingOperations?: SortOrder
    additionalCarpentryPlastic?: SortOrder
    specialRisk?: SortOrder
    occupantCount?: SortOrder
    occupantFactor?: SortOrder
    occupantFactorKey?: SortOrder
    exitWidths?: SortOrder
    exitWidthTotal?: SortOrder
    exitUnitsX?: SortOrder
    separatePathsK?: SortOrder
    mobilityFactor?: SortOrder
    mobilityFactorMulti?: SortOrder
    perceptionAwareness?: SortOrder
    evacuationPlanClear?: SortOrder
    noPanicRisk?: SortOrder
    exitCountToOpenSpace?: SortOrder
    valueTotal?: SortOrder
    valueYear?: SortOrder
    replaceability?: SortOrder
    dependencyType?: SortOrder
    dependencyManual?: SortOrder
    factor_a?: SortOrder
    factor_t?: SortOrder
    factor_c?: SortOrder
    factor_r?: SortOrder
    factor_d?: SortOrder
    level_A?: SortOrder
    level_A1?: SortOrder
    level_A2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentAcceptanceFactorsSumOrderByAggregateInput = {
    mainActivity?: SortOrder
    secondaryActivity?: SortOrder
    heatTransferType?: SortOrder
    generatorLocation?: SortOrder
    energySource?: SortOrder
    electricalSystem?: SortOrder
    flammableLiquids?: SortOrder
    combustibleDust?: SortOrder
    weldingOperations?: SortOrder
    additionalCarpentryPlastic?: SortOrder
    specialRisk?: SortOrder
    occupantCount?: SortOrder
    occupantFactor?: SortOrder
    exitWidthTotal?: SortOrder
    exitUnitsX?: SortOrder
    separatePathsK?: SortOrder
    mobilityFactor?: SortOrder
    exitCountToOpenSpace?: SortOrder
    valueTotal?: SortOrder
    valueYear?: SortOrder
    replaceability?: SortOrder
    dependencyManual?: SortOrder
    factor_a?: SortOrder
    factor_t?: SortOrder
    factor_c?: SortOrder
    factor_r?: SortOrder
    factor_d?: SortOrder
    level_A?: SortOrder
    level_A1?: SortOrder
    level_A2?: SortOrder
  }

  export type AssessmentProtectionFactorsCountOrderByAggregateInput = {
    id?: SortOrder
    assessmentId?: SortOrder
    waterStorageType?: SortOrder
    waterCapacity?: SortOrder
    requiredWaterCapacity?: SortOrder
    w2Penalty?: SortOrder
    distributionNetwork?: SortOrder
    pipeDiameter?: SortOrder
    isRingNetwork?: SortOrder
    waterFlowCapacity?: SortOrder
    distributionNetworkAdequacy?: SortOrder
    hydrantCount25?: SortOrder
    hydrantCount3?: SortOrder
    hydrantCount4?: SortOrder
    equivalentHydrant25?: SortOrder
    averageHydrantDistance?: SortOrder
    w4Score?: SortOrder
    staticPressureRequired?: SortOrder
    staticPressureAvailable?: SortOrder
    w5Score?: SortOrder
    detectionType?: SortOrder
    s1ElectronicSystem?: SortOrder
    s1ZoneIdentification?: SortOrder
    sprinklerType?: SortOrder
    fireStationType?: SortOrder
    waterSupplyType?: SortOrder
    industrialBrigade?: SortOrder
    industrialBrigadeLabel?: SortOrder
    s6OtherSuppression?: SortOrder
    s7UnlimitedWater?: SortOrder
    s8DedicatedWater?: SortOrder
    s9WaterControl?: SortOrder
    n1?: SortOrder
    n1ContinuousPresence?: SortOrder
    n1ManualWarning?: SortOrder
    n1FireDeptNotification?: SortOrder
    n1ResidentAlarm?: SortOrder
    n2?: SortOrder
    n3?: SortOrder
    n4?: SortOrder
    n5?: SortOrder
    structureResist?: SortOrder
    facadeResist?: SortOrder
    roofResist?: SortOrder
    wallResist?: SortOrder
    hasManyWindows?: SortOrder
    noInternalSeparation?: SortOrder
    combustibleInsulation?: SortOrder
    subcompartment?: SortOrder
    stairways?: SortOrder
    stairwaysIndex?: SortOrder
    horizontalExit?: SortOrder
    sprinklers?: SortOrder
    u1PartialDetection?: SortOrder
    u2Max300Occupants?: SortOrder
    u3VoiceEvacuation?: SortOrder
    u4MarkedExits?: SortOrder
    u5SmokeEvacuation?: SortOrder
    partialDetection?: SortOrder
    partialSprinkler?: SortOrder
    otherAutoExtinguish?: SortOrder
    financialDataBackup?: SortOrder
    sparePartsAccess?: SortOrder
    selfRepairCapability?: SortOrder
    relocationAgreements?: SortOrder
    immediateActivityTransfer?: SortOrder
    multipleProduction?: SortOrder
    factor_W?: SortOrder
    factor_N?: SortOrder
    factor_S?: SortOrder
    factor_F?: SortOrder
    factor_U?: SortOrder
    factor_Y?: SortOrder
    level_D?: SortOrder
    level_D1?: SortOrder
    level_D2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentProtectionFactorsAvgOrderByAggregateInput = {
    waterCapacity?: SortOrder
    requiredWaterCapacity?: SortOrder
    w2Penalty?: SortOrder
    waterFlowCapacity?: SortOrder
    hydrantCount25?: SortOrder
    hydrantCount3?: SortOrder
    hydrantCount4?: SortOrder
    equivalentHydrant25?: SortOrder
    averageHydrantDistance?: SortOrder
    w4Score?: SortOrder
    staticPressureRequired?: SortOrder
    staticPressureAvailable?: SortOrder
    w5Score?: SortOrder
    detectionType?: SortOrder
    sprinklerType?: SortOrder
    fireStationType?: SortOrder
    waterSupplyType?: SortOrder
    industrialBrigade?: SortOrder
    s6OtherSuppression?: SortOrder
    n1?: SortOrder
    n2?: SortOrder
    n3?: SortOrder
    n4?: SortOrder
    n5?: SortOrder
    structureResist?: SortOrder
    facadeResist?: SortOrder
    roofResist?: SortOrder
    wallResist?: SortOrder
    subcompartment?: SortOrder
    stairways?: SortOrder
    stairwaysIndex?: SortOrder
    horizontalExit?: SortOrder
    sprinklers?: SortOrder
    factor_W?: SortOrder
    factor_N?: SortOrder
    factor_S?: SortOrder
    factor_F?: SortOrder
    factor_U?: SortOrder
    factor_Y?: SortOrder
    level_D?: SortOrder
    level_D1?: SortOrder
    level_D2?: SortOrder
  }

  export type AssessmentProtectionFactorsMaxOrderByAggregateInput = {
    id?: SortOrder
    assessmentId?: SortOrder
    waterStorageType?: SortOrder
    waterCapacity?: SortOrder
    requiredWaterCapacity?: SortOrder
    w2Penalty?: SortOrder
    distributionNetwork?: SortOrder
    pipeDiameter?: SortOrder
    isRingNetwork?: SortOrder
    waterFlowCapacity?: SortOrder
    distributionNetworkAdequacy?: SortOrder
    hydrantCount25?: SortOrder
    hydrantCount3?: SortOrder
    hydrantCount4?: SortOrder
    equivalentHydrant25?: SortOrder
    averageHydrantDistance?: SortOrder
    w4Score?: SortOrder
    staticPressureRequired?: SortOrder
    staticPressureAvailable?: SortOrder
    w5Score?: SortOrder
    detectionType?: SortOrder
    s1ElectronicSystem?: SortOrder
    s1ZoneIdentification?: SortOrder
    sprinklerType?: SortOrder
    fireStationType?: SortOrder
    waterSupplyType?: SortOrder
    industrialBrigade?: SortOrder
    industrialBrigadeLabel?: SortOrder
    s6OtherSuppression?: SortOrder
    s7UnlimitedWater?: SortOrder
    s8DedicatedWater?: SortOrder
    s9WaterControl?: SortOrder
    n1?: SortOrder
    n1ContinuousPresence?: SortOrder
    n1ManualWarning?: SortOrder
    n1FireDeptNotification?: SortOrder
    n1ResidentAlarm?: SortOrder
    n2?: SortOrder
    n3?: SortOrder
    n4?: SortOrder
    n5?: SortOrder
    structureResist?: SortOrder
    facadeResist?: SortOrder
    roofResist?: SortOrder
    wallResist?: SortOrder
    hasManyWindows?: SortOrder
    noInternalSeparation?: SortOrder
    combustibleInsulation?: SortOrder
    subcompartment?: SortOrder
    stairways?: SortOrder
    stairwaysIndex?: SortOrder
    horizontalExit?: SortOrder
    sprinklers?: SortOrder
    u1PartialDetection?: SortOrder
    u2Max300Occupants?: SortOrder
    u3VoiceEvacuation?: SortOrder
    u4MarkedExits?: SortOrder
    u5SmokeEvacuation?: SortOrder
    partialDetection?: SortOrder
    partialSprinkler?: SortOrder
    otherAutoExtinguish?: SortOrder
    financialDataBackup?: SortOrder
    sparePartsAccess?: SortOrder
    selfRepairCapability?: SortOrder
    relocationAgreements?: SortOrder
    immediateActivityTransfer?: SortOrder
    multipleProduction?: SortOrder
    factor_W?: SortOrder
    factor_N?: SortOrder
    factor_S?: SortOrder
    factor_F?: SortOrder
    factor_U?: SortOrder
    factor_Y?: SortOrder
    level_D?: SortOrder
    level_D1?: SortOrder
    level_D2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentProtectionFactorsMinOrderByAggregateInput = {
    id?: SortOrder
    assessmentId?: SortOrder
    waterStorageType?: SortOrder
    waterCapacity?: SortOrder
    requiredWaterCapacity?: SortOrder
    w2Penalty?: SortOrder
    distributionNetwork?: SortOrder
    pipeDiameter?: SortOrder
    isRingNetwork?: SortOrder
    waterFlowCapacity?: SortOrder
    distributionNetworkAdequacy?: SortOrder
    hydrantCount25?: SortOrder
    hydrantCount3?: SortOrder
    hydrantCount4?: SortOrder
    equivalentHydrant25?: SortOrder
    averageHydrantDistance?: SortOrder
    w4Score?: SortOrder
    staticPressureRequired?: SortOrder
    staticPressureAvailable?: SortOrder
    w5Score?: SortOrder
    detectionType?: SortOrder
    s1ElectronicSystem?: SortOrder
    s1ZoneIdentification?: SortOrder
    sprinklerType?: SortOrder
    fireStationType?: SortOrder
    waterSupplyType?: SortOrder
    industrialBrigade?: SortOrder
    industrialBrigadeLabel?: SortOrder
    s6OtherSuppression?: SortOrder
    s7UnlimitedWater?: SortOrder
    s8DedicatedWater?: SortOrder
    s9WaterControl?: SortOrder
    n1?: SortOrder
    n1ContinuousPresence?: SortOrder
    n1ManualWarning?: SortOrder
    n1FireDeptNotification?: SortOrder
    n1ResidentAlarm?: SortOrder
    n2?: SortOrder
    n3?: SortOrder
    n4?: SortOrder
    n5?: SortOrder
    structureResist?: SortOrder
    facadeResist?: SortOrder
    roofResist?: SortOrder
    wallResist?: SortOrder
    hasManyWindows?: SortOrder
    noInternalSeparation?: SortOrder
    combustibleInsulation?: SortOrder
    subcompartment?: SortOrder
    stairways?: SortOrder
    stairwaysIndex?: SortOrder
    horizontalExit?: SortOrder
    sprinklers?: SortOrder
    u1PartialDetection?: SortOrder
    u2Max300Occupants?: SortOrder
    u3VoiceEvacuation?: SortOrder
    u4MarkedExits?: SortOrder
    u5SmokeEvacuation?: SortOrder
    partialDetection?: SortOrder
    partialSprinkler?: SortOrder
    otherAutoExtinguish?: SortOrder
    financialDataBackup?: SortOrder
    sparePartsAccess?: SortOrder
    selfRepairCapability?: SortOrder
    relocationAgreements?: SortOrder
    immediateActivityTransfer?: SortOrder
    multipleProduction?: SortOrder
    factor_W?: SortOrder
    factor_N?: SortOrder
    factor_S?: SortOrder
    factor_F?: SortOrder
    factor_U?: SortOrder
    factor_Y?: SortOrder
    level_D?: SortOrder
    level_D1?: SortOrder
    level_D2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentProtectionFactorsSumOrderByAggregateInput = {
    waterCapacity?: SortOrder
    requiredWaterCapacity?: SortOrder
    w2Penalty?: SortOrder
    waterFlowCapacity?: SortOrder
    hydrantCount25?: SortOrder
    hydrantCount3?: SortOrder
    hydrantCount4?: SortOrder
    equivalentHydrant25?: SortOrder
    averageHydrantDistance?: SortOrder
    w4Score?: SortOrder
    staticPressureRequired?: SortOrder
    staticPressureAvailable?: SortOrder
    w5Score?: SortOrder
    detectionType?: SortOrder
    sprinklerType?: SortOrder
    fireStationType?: SortOrder
    waterSupplyType?: SortOrder
    industrialBrigade?: SortOrder
    s6OtherSuppression?: SortOrder
    n1?: SortOrder
    n2?: SortOrder
    n3?: SortOrder
    n4?: SortOrder
    n5?: SortOrder
    structureResist?: SortOrder
    facadeResist?: SortOrder
    roofResist?: SortOrder
    wallResist?: SortOrder
    subcompartment?: SortOrder
    stairways?: SortOrder
    stairwaysIndex?: SortOrder
    horizontalExit?: SortOrder
    sprinklers?: SortOrder
    factor_W?: SortOrder
    factor_N?: SortOrder
    factor_S?: SortOrder
    factor_F?: SortOrder
    factor_U?: SortOrder
    factor_Y?: SortOrder
    level_D?: SortOrder
    level_D1?: SortOrder
    level_D2?: SortOrder
  }

  export type AssessmentFinalRisksCountOrderByAggregateInput = {
    id?: SortOrder
    assessmentId?: SortOrder
    factor_Fo?: SortOrder
    risk_Ro?: SortOrder
    final_R?: SortOrder
    final_R1?: SortOrder
    final_R2?: SortOrder
    status_R?: SortOrder
    status_R1?: SortOrder
    status_R2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentFinalRisksAvgOrderByAggregateInput = {
    factor_Fo?: SortOrder
    risk_Ro?: SortOrder
    final_R?: SortOrder
    final_R1?: SortOrder
    final_R2?: SortOrder
  }

  export type AssessmentFinalRisksMaxOrderByAggregateInput = {
    id?: SortOrder
    assessmentId?: SortOrder
    factor_Fo?: SortOrder
    risk_Ro?: SortOrder
    final_R?: SortOrder
    final_R1?: SortOrder
    final_R2?: SortOrder
    status_R?: SortOrder
    status_R1?: SortOrder
    status_R2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentFinalRisksMinOrderByAggregateInput = {
    id?: SortOrder
    assessmentId?: SortOrder
    factor_Fo?: SortOrder
    risk_Ro?: SortOrder
    final_R?: SortOrder
    final_R1?: SortOrder
    final_R2?: SortOrder
    status_R?: SortOrder
    status_R1?: SortOrder
    status_R2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssessmentFinalRisksSumOrderByAggregateInput = {
    factor_Fo?: SortOrder
    risk_Ro?: SortOrder
    final_R?: SortOrder
    final_R1?: SortOrder
    final_R2?: SortOrder
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type FloorCreateNestedManyWithoutProjectInput = {
    create?: XOR<FloorCreateWithoutProjectInput, FloorUncheckedCreateWithoutProjectInput> | FloorCreateWithoutProjectInput[] | FloorUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: FloorCreateOrConnectWithoutProjectInput | FloorCreateOrConnectWithoutProjectInput[]
    createMany?: FloorCreateManyProjectInputEnvelope
    connect?: FloorWhereUniqueInput | FloorWhereUniqueInput[]
  }

  export type FloorUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<FloorCreateWithoutProjectInput, FloorUncheckedCreateWithoutProjectInput> | FloorCreateWithoutProjectInput[] | FloorUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: FloorCreateOrConnectWithoutProjectInput | FloorCreateOrConnectWithoutProjectInput[]
    createMany?: FloorCreateManyProjectInputEnvelope
    connect?: FloorWhereUniqueInput | FloorWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsInput, UserUpdateWithoutProjectsInput>, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type FloorUpdateManyWithoutProjectNestedInput = {
    create?: XOR<FloorCreateWithoutProjectInput, FloorUncheckedCreateWithoutProjectInput> | FloorCreateWithoutProjectInput[] | FloorUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: FloorCreateOrConnectWithoutProjectInput | FloorCreateOrConnectWithoutProjectInput[]
    upsert?: FloorUpsertWithWhereUniqueWithoutProjectInput | FloorUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: FloorCreateManyProjectInputEnvelope
    set?: FloorWhereUniqueInput | FloorWhereUniqueInput[]
    disconnect?: FloorWhereUniqueInput | FloorWhereUniqueInput[]
    delete?: FloorWhereUniqueInput | FloorWhereUniqueInput[]
    connect?: FloorWhereUniqueInput | FloorWhereUniqueInput[]
    update?: FloorUpdateWithWhereUniqueWithoutProjectInput | FloorUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: FloorUpdateManyWithWhereWithoutProjectInput | FloorUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: FloorScalarWhereInput | FloorScalarWhereInput[]
  }

  export type FloorUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<FloorCreateWithoutProjectInput, FloorUncheckedCreateWithoutProjectInput> | FloorCreateWithoutProjectInput[] | FloorUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: FloorCreateOrConnectWithoutProjectInput | FloorCreateOrConnectWithoutProjectInput[]
    upsert?: FloorUpsertWithWhereUniqueWithoutProjectInput | FloorUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: FloorCreateManyProjectInputEnvelope
    set?: FloorWhereUniqueInput | FloorWhereUniqueInput[]
    disconnect?: FloorWhereUniqueInput | FloorWhereUniqueInput[]
    delete?: FloorWhereUniqueInput | FloorWhereUniqueInput[]
    connect?: FloorWhereUniqueInput | FloorWhereUniqueInput[]
    update?: FloorUpdateWithWhereUniqueWithoutProjectInput | FloorUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: FloorUpdateManyWithWhereWithoutProjectInput | FloorUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: FloorScalarWhereInput | FloorScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutFloorsInput = {
    create?: XOR<ProjectCreateWithoutFloorsInput, ProjectUncheckedCreateWithoutFloorsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutFloorsInput
    connect?: ProjectWhereUniqueInput
  }

  export type AssessmentCreateNestedOneWithoutFloorInput = {
    create?: XOR<AssessmentCreateWithoutFloorInput, AssessmentUncheckedCreateWithoutFloorInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutFloorInput
    connect?: AssessmentWhereUniqueInput
  }

  export type AssessmentUncheckedCreateNestedOneWithoutFloorInput = {
    create?: XOR<AssessmentCreateWithoutFloorInput, AssessmentUncheckedCreateWithoutFloorInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutFloorInput
    connect?: AssessmentWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjectUpdateOneRequiredWithoutFloorsNestedInput = {
    create?: XOR<ProjectCreateWithoutFloorsInput, ProjectUncheckedCreateWithoutFloorsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutFloorsInput
    upsert?: ProjectUpsertWithoutFloorsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutFloorsInput, ProjectUpdateWithoutFloorsInput>, ProjectUncheckedUpdateWithoutFloorsInput>
  }

  export type AssessmentUpdateOneWithoutFloorNestedInput = {
    create?: XOR<AssessmentCreateWithoutFloorInput, AssessmentUncheckedCreateWithoutFloorInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutFloorInput
    upsert?: AssessmentUpsertWithoutFloorInput
    disconnect?: AssessmentWhereInput | boolean
    delete?: AssessmentWhereInput | boolean
    connect?: AssessmentWhereUniqueInput
    update?: XOR<XOR<AssessmentUpdateToOneWithWhereWithoutFloorInput, AssessmentUpdateWithoutFloorInput>, AssessmentUncheckedUpdateWithoutFloorInput>
  }

  export type AssessmentUncheckedUpdateOneWithoutFloorNestedInput = {
    create?: XOR<AssessmentCreateWithoutFloorInput, AssessmentUncheckedCreateWithoutFloorInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutFloorInput
    upsert?: AssessmentUpsertWithoutFloorInput
    disconnect?: AssessmentWhereInput | boolean
    delete?: AssessmentWhereInput | boolean
    connect?: AssessmentWhereUniqueInput
    update?: XOR<XOR<AssessmentUpdateToOneWithWhereWithoutFloorInput, AssessmentUpdateWithoutFloorInput>, AssessmentUncheckedUpdateWithoutFloorInput>
  }

  export type FloorCreateNestedOneWithoutAssessmentInput = {
    create?: XOR<FloorCreateWithoutAssessmentInput, FloorUncheckedCreateWithoutAssessmentInput>
    connectOrCreate?: FloorCreateOrConnectWithoutAssessmentInput
    connect?: FloorWhereUniqueInput
  }

  export type AssessmentRiskFactorsCreateNestedOneWithoutAssessmentInput = {
    create?: XOR<AssessmentRiskFactorsCreateWithoutAssessmentInput, AssessmentRiskFactorsUncheckedCreateWithoutAssessmentInput>
    connectOrCreate?: AssessmentRiskFactorsCreateOrConnectWithoutAssessmentInput
    connect?: AssessmentRiskFactorsWhereUniqueInput
  }

  export type AssessmentAcceptanceFactorsCreateNestedOneWithoutAssessmentInput = {
    create?: XOR<AssessmentAcceptanceFactorsCreateWithoutAssessmentInput, AssessmentAcceptanceFactorsUncheckedCreateWithoutAssessmentInput>
    connectOrCreate?: AssessmentAcceptanceFactorsCreateOrConnectWithoutAssessmentInput
    connect?: AssessmentAcceptanceFactorsWhereUniqueInput
  }

  export type AssessmentProtectionFactorsCreateNestedOneWithoutAssessmentInput = {
    create?: XOR<AssessmentProtectionFactorsCreateWithoutAssessmentInput, AssessmentProtectionFactorsUncheckedCreateWithoutAssessmentInput>
    connectOrCreate?: AssessmentProtectionFactorsCreateOrConnectWithoutAssessmentInput
    connect?: AssessmentProtectionFactorsWhereUniqueInput
  }

  export type AssessmentFinalRisksCreateNestedOneWithoutAssessmentInput = {
    create?: XOR<AssessmentFinalRisksCreateWithoutAssessmentInput, AssessmentFinalRisksUncheckedCreateWithoutAssessmentInput>
    connectOrCreate?: AssessmentFinalRisksCreateOrConnectWithoutAssessmentInput
    connect?: AssessmentFinalRisksWhereUniqueInput
  }

  export type AssessmentRiskFactorsUncheckedCreateNestedOneWithoutAssessmentInput = {
    create?: XOR<AssessmentRiskFactorsCreateWithoutAssessmentInput, AssessmentRiskFactorsUncheckedCreateWithoutAssessmentInput>
    connectOrCreate?: AssessmentRiskFactorsCreateOrConnectWithoutAssessmentInput
    connect?: AssessmentRiskFactorsWhereUniqueInput
  }

  export type AssessmentAcceptanceFactorsUncheckedCreateNestedOneWithoutAssessmentInput = {
    create?: XOR<AssessmentAcceptanceFactorsCreateWithoutAssessmentInput, AssessmentAcceptanceFactorsUncheckedCreateWithoutAssessmentInput>
    connectOrCreate?: AssessmentAcceptanceFactorsCreateOrConnectWithoutAssessmentInput
    connect?: AssessmentAcceptanceFactorsWhereUniqueInput
  }

  export type AssessmentProtectionFactorsUncheckedCreateNestedOneWithoutAssessmentInput = {
    create?: XOR<AssessmentProtectionFactorsCreateWithoutAssessmentInput, AssessmentProtectionFactorsUncheckedCreateWithoutAssessmentInput>
    connectOrCreate?: AssessmentProtectionFactorsCreateOrConnectWithoutAssessmentInput
    connect?: AssessmentProtectionFactorsWhereUniqueInput
  }

  export type AssessmentFinalRisksUncheckedCreateNestedOneWithoutAssessmentInput = {
    create?: XOR<AssessmentFinalRisksCreateWithoutAssessmentInput, AssessmentFinalRisksUncheckedCreateWithoutAssessmentInput>
    connectOrCreate?: AssessmentFinalRisksCreateOrConnectWithoutAssessmentInput
    connect?: AssessmentFinalRisksWhereUniqueInput
  }

  export type FloorUpdateOneRequiredWithoutAssessmentNestedInput = {
    create?: XOR<FloorCreateWithoutAssessmentInput, FloorUncheckedCreateWithoutAssessmentInput>
    connectOrCreate?: FloorCreateOrConnectWithoutAssessmentInput
    upsert?: FloorUpsertWithoutAssessmentInput
    connect?: FloorWhereUniqueInput
    update?: XOR<XOR<FloorUpdateToOneWithWhereWithoutAssessmentInput, FloorUpdateWithoutAssessmentInput>, FloorUncheckedUpdateWithoutAssessmentInput>
  }

  export type AssessmentRiskFactorsUpdateOneWithoutAssessmentNestedInput = {
    create?: XOR<AssessmentRiskFactorsCreateWithoutAssessmentInput, AssessmentRiskFactorsUncheckedCreateWithoutAssessmentInput>
    connectOrCreate?: AssessmentRiskFactorsCreateOrConnectWithoutAssessmentInput
    upsert?: AssessmentRiskFactorsUpsertWithoutAssessmentInput
    disconnect?: AssessmentRiskFactorsWhereInput | boolean
    delete?: AssessmentRiskFactorsWhereInput | boolean
    connect?: AssessmentRiskFactorsWhereUniqueInput
    update?: XOR<XOR<AssessmentRiskFactorsUpdateToOneWithWhereWithoutAssessmentInput, AssessmentRiskFactorsUpdateWithoutAssessmentInput>, AssessmentRiskFactorsUncheckedUpdateWithoutAssessmentInput>
  }

  export type AssessmentAcceptanceFactorsUpdateOneWithoutAssessmentNestedInput = {
    create?: XOR<AssessmentAcceptanceFactorsCreateWithoutAssessmentInput, AssessmentAcceptanceFactorsUncheckedCreateWithoutAssessmentInput>
    connectOrCreate?: AssessmentAcceptanceFactorsCreateOrConnectWithoutAssessmentInput
    upsert?: AssessmentAcceptanceFactorsUpsertWithoutAssessmentInput
    disconnect?: AssessmentAcceptanceFactorsWhereInput | boolean
    delete?: AssessmentAcceptanceFactorsWhereInput | boolean
    connect?: AssessmentAcceptanceFactorsWhereUniqueInput
    update?: XOR<XOR<AssessmentAcceptanceFactorsUpdateToOneWithWhereWithoutAssessmentInput, AssessmentAcceptanceFactorsUpdateWithoutAssessmentInput>, AssessmentAcceptanceFactorsUncheckedUpdateWithoutAssessmentInput>
  }

  export type AssessmentProtectionFactorsUpdateOneWithoutAssessmentNestedInput = {
    create?: XOR<AssessmentProtectionFactorsCreateWithoutAssessmentInput, AssessmentProtectionFactorsUncheckedCreateWithoutAssessmentInput>
    connectOrCreate?: AssessmentProtectionFactorsCreateOrConnectWithoutAssessmentInput
    upsert?: AssessmentProtectionFactorsUpsertWithoutAssessmentInput
    disconnect?: AssessmentProtectionFactorsWhereInput | boolean
    delete?: AssessmentProtectionFactorsWhereInput | boolean
    connect?: AssessmentProtectionFactorsWhereUniqueInput
    update?: XOR<XOR<AssessmentProtectionFactorsUpdateToOneWithWhereWithoutAssessmentInput, AssessmentProtectionFactorsUpdateWithoutAssessmentInput>, AssessmentProtectionFactorsUncheckedUpdateWithoutAssessmentInput>
  }

  export type AssessmentFinalRisksUpdateOneWithoutAssessmentNestedInput = {
    create?: XOR<AssessmentFinalRisksCreateWithoutAssessmentInput, AssessmentFinalRisksUncheckedCreateWithoutAssessmentInput>
    connectOrCreate?: AssessmentFinalRisksCreateOrConnectWithoutAssessmentInput
    upsert?: AssessmentFinalRisksUpsertWithoutAssessmentInput
    disconnect?: AssessmentFinalRisksWhereInput | boolean
    delete?: AssessmentFinalRisksWhereInput | boolean
    connect?: AssessmentFinalRisksWhereUniqueInput
    update?: XOR<XOR<AssessmentFinalRisksUpdateToOneWithWhereWithoutAssessmentInput, AssessmentFinalRisksUpdateWithoutAssessmentInput>, AssessmentFinalRisksUncheckedUpdateWithoutAssessmentInput>
  }

  export type AssessmentRiskFactorsUncheckedUpdateOneWithoutAssessmentNestedInput = {
    create?: XOR<AssessmentRiskFactorsCreateWithoutAssessmentInput, AssessmentRiskFactorsUncheckedCreateWithoutAssessmentInput>
    connectOrCreate?: AssessmentRiskFactorsCreateOrConnectWithoutAssessmentInput
    upsert?: AssessmentRiskFactorsUpsertWithoutAssessmentInput
    disconnect?: AssessmentRiskFactorsWhereInput | boolean
    delete?: AssessmentRiskFactorsWhereInput | boolean
    connect?: AssessmentRiskFactorsWhereUniqueInput
    update?: XOR<XOR<AssessmentRiskFactorsUpdateToOneWithWhereWithoutAssessmentInput, AssessmentRiskFactorsUpdateWithoutAssessmentInput>, AssessmentRiskFactorsUncheckedUpdateWithoutAssessmentInput>
  }

  export type AssessmentAcceptanceFactorsUncheckedUpdateOneWithoutAssessmentNestedInput = {
    create?: XOR<AssessmentAcceptanceFactorsCreateWithoutAssessmentInput, AssessmentAcceptanceFactorsUncheckedCreateWithoutAssessmentInput>
    connectOrCreate?: AssessmentAcceptanceFactorsCreateOrConnectWithoutAssessmentInput
    upsert?: AssessmentAcceptanceFactorsUpsertWithoutAssessmentInput
    disconnect?: AssessmentAcceptanceFactorsWhereInput | boolean
    delete?: AssessmentAcceptanceFactorsWhereInput | boolean
    connect?: AssessmentAcceptanceFactorsWhereUniqueInput
    update?: XOR<XOR<AssessmentAcceptanceFactorsUpdateToOneWithWhereWithoutAssessmentInput, AssessmentAcceptanceFactorsUpdateWithoutAssessmentInput>, AssessmentAcceptanceFactorsUncheckedUpdateWithoutAssessmentInput>
  }

  export type AssessmentProtectionFactorsUncheckedUpdateOneWithoutAssessmentNestedInput = {
    create?: XOR<AssessmentProtectionFactorsCreateWithoutAssessmentInput, AssessmentProtectionFactorsUncheckedCreateWithoutAssessmentInput>
    connectOrCreate?: AssessmentProtectionFactorsCreateOrConnectWithoutAssessmentInput
    upsert?: AssessmentProtectionFactorsUpsertWithoutAssessmentInput
    disconnect?: AssessmentProtectionFactorsWhereInput | boolean
    delete?: AssessmentProtectionFactorsWhereInput | boolean
    connect?: AssessmentProtectionFactorsWhereUniqueInput
    update?: XOR<XOR<AssessmentProtectionFactorsUpdateToOneWithWhereWithoutAssessmentInput, AssessmentProtectionFactorsUpdateWithoutAssessmentInput>, AssessmentProtectionFactorsUncheckedUpdateWithoutAssessmentInput>
  }

  export type AssessmentFinalRisksUncheckedUpdateOneWithoutAssessmentNestedInput = {
    create?: XOR<AssessmentFinalRisksCreateWithoutAssessmentInput, AssessmentFinalRisksUncheckedCreateWithoutAssessmentInput>
    connectOrCreate?: AssessmentFinalRisksCreateOrConnectWithoutAssessmentInput
    upsert?: AssessmentFinalRisksUpsertWithoutAssessmentInput
    disconnect?: AssessmentFinalRisksWhereInput | boolean
    delete?: AssessmentFinalRisksWhereInput | boolean
    connect?: AssessmentFinalRisksWhereUniqueInput
    update?: XOR<XOR<AssessmentFinalRisksUpdateToOneWithWhereWithoutAssessmentInput, AssessmentFinalRisksUpdateWithoutAssessmentInput>, AssessmentFinalRisksUncheckedUpdateWithoutAssessmentInput>
  }

  export type AssessmentCreateNestedOneWithoutRiskFactorsInput = {
    create?: XOR<AssessmentCreateWithoutRiskFactorsInput, AssessmentUncheckedCreateWithoutRiskFactorsInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutRiskFactorsInput
    connect?: AssessmentWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AssessmentUpdateOneRequiredWithoutRiskFactorsNestedInput = {
    create?: XOR<AssessmentCreateWithoutRiskFactorsInput, AssessmentUncheckedCreateWithoutRiskFactorsInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutRiskFactorsInput
    upsert?: AssessmentUpsertWithoutRiskFactorsInput
    connect?: AssessmentWhereUniqueInput
    update?: XOR<XOR<AssessmentUpdateToOneWithWhereWithoutRiskFactorsInput, AssessmentUpdateWithoutRiskFactorsInput>, AssessmentUncheckedUpdateWithoutRiskFactorsInput>
  }

  export type AssessmentCreateNestedOneWithoutAcceptanceFactorsInput = {
    create?: XOR<AssessmentCreateWithoutAcceptanceFactorsInput, AssessmentUncheckedCreateWithoutAcceptanceFactorsInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutAcceptanceFactorsInput
    connect?: AssessmentWhereUniqueInput
  }

  export type AssessmentUpdateOneRequiredWithoutAcceptanceFactorsNestedInput = {
    create?: XOR<AssessmentCreateWithoutAcceptanceFactorsInput, AssessmentUncheckedCreateWithoutAcceptanceFactorsInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutAcceptanceFactorsInput
    upsert?: AssessmentUpsertWithoutAcceptanceFactorsInput
    connect?: AssessmentWhereUniqueInput
    update?: XOR<XOR<AssessmentUpdateToOneWithWhereWithoutAcceptanceFactorsInput, AssessmentUpdateWithoutAcceptanceFactorsInput>, AssessmentUncheckedUpdateWithoutAcceptanceFactorsInput>
  }

  export type AssessmentCreateNestedOneWithoutProtectionFactorsInput = {
    create?: XOR<AssessmentCreateWithoutProtectionFactorsInput, AssessmentUncheckedCreateWithoutProtectionFactorsInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutProtectionFactorsInput
    connect?: AssessmentWhereUniqueInput
  }

  export type AssessmentUpdateOneRequiredWithoutProtectionFactorsNestedInput = {
    create?: XOR<AssessmentCreateWithoutProtectionFactorsInput, AssessmentUncheckedCreateWithoutProtectionFactorsInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutProtectionFactorsInput
    upsert?: AssessmentUpsertWithoutProtectionFactorsInput
    connect?: AssessmentWhereUniqueInput
    update?: XOR<XOR<AssessmentUpdateToOneWithWhereWithoutProtectionFactorsInput, AssessmentUpdateWithoutProtectionFactorsInput>, AssessmentUncheckedUpdateWithoutProtectionFactorsInput>
  }

  export type AssessmentCreateNestedOneWithoutFinalRisksInput = {
    create?: XOR<AssessmentCreateWithoutFinalRisksInput, AssessmentUncheckedCreateWithoutFinalRisksInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutFinalRisksInput
    connect?: AssessmentWhereUniqueInput
  }

  export type AssessmentUpdateOneRequiredWithoutFinalRisksNestedInput = {
    create?: XOR<AssessmentCreateWithoutFinalRisksInput, AssessmentUncheckedCreateWithoutFinalRisksInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutFinalRisksInput
    upsert?: AssessmentUpsertWithoutFinalRisksInput
    connect?: AssessmentWhereUniqueInput
    update?: XOR<XOR<AssessmentUpdateToOneWithWhereWithoutFinalRisksInput, AssessmentUpdateWithoutFinalRisksInput>, AssessmentUncheckedUpdateWithoutFinalRisksInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    impersonatedBy?: string | null
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    impersonatedBy?: string | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutUserInput = {
    id?: string
    name: string
    address?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    floors?: FloorCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    address?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    floors?: FloorUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutUserInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectCreateManyUserInputEnvelope = {
    data: ProjectCreateManyUserInput | ProjectCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    impersonatedBy?: StringNullableFilter<"Session"> | string | null
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type ProjectUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
  }

  export type ProjectUpdateManyWithWhereWithoutUserInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    address?: StringNullableFilter<"Project"> | string | null
    description?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    userId?: StringFilter<"Project"> | string
  }

  export type UserCreateWithoutSessionsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: string | null
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: string | null
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: string | null
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: string | null
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutProjectsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: string | null
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: string | null
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type FloorCreateWithoutProjectInput = {
    id?: string
    name: string
    level: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assessment?: AssessmentCreateNestedOneWithoutFloorInput
  }

  export type FloorUncheckedCreateWithoutProjectInput = {
    id?: string
    name: string
    level: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assessment?: AssessmentUncheckedCreateNestedOneWithoutFloorInput
  }

  export type FloorCreateOrConnectWithoutProjectInput = {
    where: FloorWhereUniqueInput
    create: XOR<FloorCreateWithoutProjectInput, FloorUncheckedCreateWithoutProjectInput>
  }

  export type FloorCreateManyProjectInputEnvelope = {
    data: FloorCreateManyProjectInput | FloorCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FloorUpsertWithWhereUniqueWithoutProjectInput = {
    where: FloorWhereUniqueInput
    update: XOR<FloorUpdateWithoutProjectInput, FloorUncheckedUpdateWithoutProjectInput>
    create: XOR<FloorCreateWithoutProjectInput, FloorUncheckedCreateWithoutProjectInput>
  }

  export type FloorUpdateWithWhereUniqueWithoutProjectInput = {
    where: FloorWhereUniqueInput
    data: XOR<FloorUpdateWithoutProjectInput, FloorUncheckedUpdateWithoutProjectInput>
  }

  export type FloorUpdateManyWithWhereWithoutProjectInput = {
    where: FloorScalarWhereInput
    data: XOR<FloorUpdateManyMutationInput, FloorUncheckedUpdateManyWithoutProjectInput>
  }

  export type FloorScalarWhereInput = {
    AND?: FloorScalarWhereInput | FloorScalarWhereInput[]
    OR?: FloorScalarWhereInput[]
    NOT?: FloorScalarWhereInput | FloorScalarWhereInput[]
    id?: StringFilter<"Floor"> | string
    name?: StringFilter<"Floor"> | string
    level?: FloatFilter<"Floor"> | number
    description?: StringNullableFilter<"Floor"> | string | null
    projectId?: StringFilter<"Floor"> | string
    createdAt?: DateTimeFilter<"Floor"> | Date | string
    updatedAt?: DateTimeFilter<"Floor"> | Date | string
  }

  export type ProjectCreateWithoutFloorsInput = {
    id?: string
    name: string
    address?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
  }

  export type ProjectUncheckedCreateWithoutFloorsInput = {
    id?: string
    name: string
    address?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type ProjectCreateOrConnectWithoutFloorsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutFloorsInput, ProjectUncheckedCreateWithoutFloorsInput>
  }

  export type AssessmentCreateWithoutFloorInput = {
    id?: string
    updatedAt?: Date | string
    riskFactors?: AssessmentRiskFactorsCreateNestedOneWithoutAssessmentInput
    acceptanceFactors?: AssessmentAcceptanceFactorsCreateNestedOneWithoutAssessmentInput
    protectionFactors?: AssessmentProtectionFactorsCreateNestedOneWithoutAssessmentInput
    finalRisks?: AssessmentFinalRisksCreateNestedOneWithoutAssessmentInput
  }

  export type AssessmentUncheckedCreateWithoutFloorInput = {
    id?: string
    updatedAt?: Date | string
    riskFactors?: AssessmentRiskFactorsUncheckedCreateNestedOneWithoutAssessmentInput
    acceptanceFactors?: AssessmentAcceptanceFactorsUncheckedCreateNestedOneWithoutAssessmentInput
    protectionFactors?: AssessmentProtectionFactorsUncheckedCreateNestedOneWithoutAssessmentInput
    finalRisks?: AssessmentFinalRisksUncheckedCreateNestedOneWithoutAssessmentInput
  }

  export type AssessmentCreateOrConnectWithoutFloorInput = {
    where: AssessmentWhereUniqueInput
    create: XOR<AssessmentCreateWithoutFloorInput, AssessmentUncheckedCreateWithoutFloorInput>
  }

  export type ProjectUpsertWithoutFloorsInput = {
    update: XOR<ProjectUpdateWithoutFloorsInput, ProjectUncheckedUpdateWithoutFloorsInput>
    create: XOR<ProjectCreateWithoutFloorsInput, ProjectUncheckedCreateWithoutFloorsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutFloorsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutFloorsInput, ProjectUncheckedUpdateWithoutFloorsInput>
  }

  export type ProjectUpdateWithoutFloorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateWithoutFloorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AssessmentUpsertWithoutFloorInput = {
    update: XOR<AssessmentUpdateWithoutFloorInput, AssessmentUncheckedUpdateWithoutFloorInput>
    create: XOR<AssessmentCreateWithoutFloorInput, AssessmentUncheckedCreateWithoutFloorInput>
    where?: AssessmentWhereInput
  }

  export type AssessmentUpdateToOneWithWhereWithoutFloorInput = {
    where?: AssessmentWhereInput
    data: XOR<AssessmentUpdateWithoutFloorInput, AssessmentUncheckedUpdateWithoutFloorInput>
  }

  export type AssessmentUpdateWithoutFloorInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    riskFactors?: AssessmentRiskFactorsUpdateOneWithoutAssessmentNestedInput
    acceptanceFactors?: AssessmentAcceptanceFactorsUpdateOneWithoutAssessmentNestedInput
    protectionFactors?: AssessmentProtectionFactorsUpdateOneWithoutAssessmentNestedInput
    finalRisks?: AssessmentFinalRisksUpdateOneWithoutAssessmentNestedInput
  }

  export type AssessmentUncheckedUpdateWithoutFloorInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    riskFactors?: AssessmentRiskFactorsUncheckedUpdateOneWithoutAssessmentNestedInput
    acceptanceFactors?: AssessmentAcceptanceFactorsUncheckedUpdateOneWithoutAssessmentNestedInput
    protectionFactors?: AssessmentProtectionFactorsUncheckedUpdateOneWithoutAssessmentNestedInput
    finalRisks?: AssessmentFinalRisksUncheckedUpdateOneWithoutAssessmentNestedInput
  }

  export type FloorCreateWithoutAssessmentInput = {
    id?: string
    name: string
    level: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutFloorsInput
  }

  export type FloorUncheckedCreateWithoutAssessmentInput = {
    id?: string
    name: string
    level: number
    description?: string | null
    projectId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FloorCreateOrConnectWithoutAssessmentInput = {
    where: FloorWhereUniqueInput
    create: XOR<FloorCreateWithoutAssessmentInput, FloorUncheckedCreateWithoutAssessmentInput>
  }

  export type AssessmentRiskFactorsCreateWithoutAssessmentInput = {
    id?: string
    qi?: number | null
    qm?: number | null
    tempDestruction?: number | null
    tempDestructionMulti?: string | null
    avgDimension?: number | null
    materialClass?: number | null
    materialClassMulti?: string | null
    length?: number | null
    width?: number | null
    area?: number | null
    height?: number | null
    accessType?: string | null
    windowArea?: number | null
    staticVentArea?: number | null
    mechVentFlow?: number | null
    ventingRatio_k?: number | null
    accessSides?: number | null
    heightAbove?: number | null
    depthBelow?: number | null
    floorLevel?: number | null
    factor_q?: number | null
    factor_i?: number | null
    factor_g?: number | null
    factor_e?: number | null
    factor_v?: number | null
    factor_z?: number | null
    risk_P?: number | null
    risk_P1?: number | null
    risk_P2?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentRiskFactorsUncheckedCreateWithoutAssessmentInput = {
    id?: string
    qi?: number | null
    qm?: number | null
    tempDestruction?: number | null
    tempDestructionMulti?: string | null
    avgDimension?: number | null
    materialClass?: number | null
    materialClassMulti?: string | null
    length?: number | null
    width?: number | null
    area?: number | null
    height?: number | null
    accessType?: string | null
    windowArea?: number | null
    staticVentArea?: number | null
    mechVentFlow?: number | null
    ventingRatio_k?: number | null
    accessSides?: number | null
    heightAbove?: number | null
    depthBelow?: number | null
    floorLevel?: number | null
    factor_q?: number | null
    factor_i?: number | null
    factor_g?: number | null
    factor_e?: number | null
    factor_v?: number | null
    factor_z?: number | null
    risk_P?: number | null
    risk_P1?: number | null
    risk_P2?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentRiskFactorsCreateOrConnectWithoutAssessmentInput = {
    where: AssessmentRiskFactorsWhereUniqueInput
    create: XOR<AssessmentRiskFactorsCreateWithoutAssessmentInput, AssessmentRiskFactorsUncheckedCreateWithoutAssessmentInput>
  }

  export type AssessmentAcceptanceFactorsCreateWithoutAssessmentInput = {
    id?: string
    mainActivity?: number | null
    mainActivityKey?: string | null
    secondaryActivity?: number | null
    heatTransferType?: number | null
    heatTransferTypeKey?: string | null
    generatorLocation?: number | null
    generatorLocationKey?: string | null
    energySource?: number | null
    energySourceKey?: string | null
    electricalSystem?: number | null
    flammableLiquids?: number | null
    combustibleDust?: number | null
    combustibleDustKey?: string | null
    weldingOperations?: number | null
    additionalCarpentryPlastic?: number | null
    specialRisk?: number | null
    occupantCount?: number | null
    occupantFactor?: number | null
    occupantFactorKey?: string | null
    exitWidths?: string | null
    exitWidthTotal?: number | null
    exitUnitsX?: number | null
    separatePathsK?: number | null
    mobilityFactor?: number | null
    mobilityFactorMulti?: string | null
    perceptionAwareness?: boolean | null
    evacuationPlanClear?: boolean | null
    noPanicRisk?: boolean | null
    exitCountToOpenSpace?: number | null
    valueTotal?: number | null
    valueYear?: number | null
    replaceability?: number | null
    dependencyType?: string | null
    dependencyManual?: number | null
    factor_a?: number | null
    factor_t?: number | null
    factor_c?: number | null
    factor_r?: number | null
    factor_d?: number | null
    level_A?: number | null
    level_A1?: number | null
    level_A2?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentAcceptanceFactorsUncheckedCreateWithoutAssessmentInput = {
    id?: string
    mainActivity?: number | null
    mainActivityKey?: string | null
    secondaryActivity?: number | null
    heatTransferType?: number | null
    heatTransferTypeKey?: string | null
    generatorLocation?: number | null
    generatorLocationKey?: string | null
    energySource?: number | null
    energySourceKey?: string | null
    electricalSystem?: number | null
    flammableLiquids?: number | null
    combustibleDust?: number | null
    combustibleDustKey?: string | null
    weldingOperations?: number | null
    additionalCarpentryPlastic?: number | null
    specialRisk?: number | null
    occupantCount?: number | null
    occupantFactor?: number | null
    occupantFactorKey?: string | null
    exitWidths?: string | null
    exitWidthTotal?: number | null
    exitUnitsX?: number | null
    separatePathsK?: number | null
    mobilityFactor?: number | null
    mobilityFactorMulti?: string | null
    perceptionAwareness?: boolean | null
    evacuationPlanClear?: boolean | null
    noPanicRisk?: boolean | null
    exitCountToOpenSpace?: number | null
    valueTotal?: number | null
    valueYear?: number | null
    replaceability?: number | null
    dependencyType?: string | null
    dependencyManual?: number | null
    factor_a?: number | null
    factor_t?: number | null
    factor_c?: number | null
    factor_r?: number | null
    factor_d?: number | null
    level_A?: number | null
    level_A1?: number | null
    level_A2?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentAcceptanceFactorsCreateOrConnectWithoutAssessmentInput = {
    where: AssessmentAcceptanceFactorsWhereUniqueInput
    create: XOR<AssessmentAcceptanceFactorsCreateWithoutAssessmentInput, AssessmentAcceptanceFactorsUncheckedCreateWithoutAssessmentInput>
  }

  export type AssessmentProtectionFactorsCreateWithoutAssessmentInput = {
    id?: string
    waterStorageType?: string | null
    waterCapacity?: number | null
    requiredWaterCapacity?: number | null
    w2Penalty?: number | null
    distributionNetwork?: string | null
    pipeDiameter?: string | null
    isRingNetwork?: boolean | null
    waterFlowCapacity?: number | null
    distributionNetworkAdequacy?: string | null
    hydrantCount25?: number | null
    hydrantCount3?: number | null
    hydrantCount4?: number | null
    equivalentHydrant25?: number | null
    averageHydrantDistance?: number | null
    w4Score?: number | null
    staticPressureRequired?: number | null
    staticPressureAvailable?: number | null
    w5Score?: number | null
    detectionType?: number | null
    s1ElectronicSystem?: boolean | null
    s1ZoneIdentification?: boolean | null
    sprinklerType?: number | null
    fireStationType?: number | null
    waterSupplyType?: number | null
    industrialBrigade?: number | null
    industrialBrigadeLabel?: string | null
    s6OtherSuppression?: number | null
    s7UnlimitedWater?: boolean | null
    s8DedicatedWater?: boolean | null
    s9WaterControl?: boolean | null
    n1?: number | null
    n1ContinuousPresence?: boolean | null
    n1ManualWarning?: boolean | null
    n1FireDeptNotification?: boolean | null
    n1ResidentAlarm?: boolean | null
    n2?: number | null
    n3?: number | null
    n4?: number | null
    n5?: number | null
    structureResist?: number | null
    facadeResist?: number | null
    roofResist?: number | null
    wallResist?: number | null
    hasManyWindows?: boolean | null
    noInternalSeparation?: boolean | null
    combustibleInsulation?: boolean | null
    subcompartment?: number | null
    stairways?: number | null
    stairwaysIndex?: number | null
    horizontalExit?: number | null
    sprinklers?: number | null
    u1PartialDetection?: boolean | null
    u2Max300Occupants?: boolean | null
    u3VoiceEvacuation?: boolean | null
    u4MarkedExits?: boolean | null
    u5SmokeEvacuation?: boolean | null
    partialDetection?: boolean | null
    partialSprinkler?: boolean | null
    otherAutoExtinguish?: boolean | null
    financialDataBackup?: boolean | null
    sparePartsAccess?: boolean | null
    selfRepairCapability?: boolean | null
    relocationAgreements?: boolean | null
    immediateActivityTransfer?: boolean | null
    multipleProduction?: boolean | null
    factor_W?: number | null
    factor_N?: number | null
    factor_S?: number | null
    factor_F?: number | null
    factor_U?: number | null
    factor_Y?: number | null
    level_D?: number | null
    level_D1?: number | null
    level_D2?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentProtectionFactorsUncheckedCreateWithoutAssessmentInput = {
    id?: string
    waterStorageType?: string | null
    waterCapacity?: number | null
    requiredWaterCapacity?: number | null
    w2Penalty?: number | null
    distributionNetwork?: string | null
    pipeDiameter?: string | null
    isRingNetwork?: boolean | null
    waterFlowCapacity?: number | null
    distributionNetworkAdequacy?: string | null
    hydrantCount25?: number | null
    hydrantCount3?: number | null
    hydrantCount4?: number | null
    equivalentHydrant25?: number | null
    averageHydrantDistance?: number | null
    w4Score?: number | null
    staticPressureRequired?: number | null
    staticPressureAvailable?: number | null
    w5Score?: number | null
    detectionType?: number | null
    s1ElectronicSystem?: boolean | null
    s1ZoneIdentification?: boolean | null
    sprinklerType?: number | null
    fireStationType?: number | null
    waterSupplyType?: number | null
    industrialBrigade?: number | null
    industrialBrigadeLabel?: string | null
    s6OtherSuppression?: number | null
    s7UnlimitedWater?: boolean | null
    s8DedicatedWater?: boolean | null
    s9WaterControl?: boolean | null
    n1?: number | null
    n1ContinuousPresence?: boolean | null
    n1ManualWarning?: boolean | null
    n1FireDeptNotification?: boolean | null
    n1ResidentAlarm?: boolean | null
    n2?: number | null
    n3?: number | null
    n4?: number | null
    n5?: number | null
    structureResist?: number | null
    facadeResist?: number | null
    roofResist?: number | null
    wallResist?: number | null
    hasManyWindows?: boolean | null
    noInternalSeparation?: boolean | null
    combustibleInsulation?: boolean | null
    subcompartment?: number | null
    stairways?: number | null
    stairwaysIndex?: number | null
    horizontalExit?: number | null
    sprinklers?: number | null
    u1PartialDetection?: boolean | null
    u2Max300Occupants?: boolean | null
    u3VoiceEvacuation?: boolean | null
    u4MarkedExits?: boolean | null
    u5SmokeEvacuation?: boolean | null
    partialDetection?: boolean | null
    partialSprinkler?: boolean | null
    otherAutoExtinguish?: boolean | null
    financialDataBackup?: boolean | null
    sparePartsAccess?: boolean | null
    selfRepairCapability?: boolean | null
    relocationAgreements?: boolean | null
    immediateActivityTransfer?: boolean | null
    multipleProduction?: boolean | null
    factor_W?: number | null
    factor_N?: number | null
    factor_S?: number | null
    factor_F?: number | null
    factor_U?: number | null
    factor_Y?: number | null
    level_D?: number | null
    level_D1?: number | null
    level_D2?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentProtectionFactorsCreateOrConnectWithoutAssessmentInput = {
    where: AssessmentProtectionFactorsWhereUniqueInput
    create: XOR<AssessmentProtectionFactorsCreateWithoutAssessmentInput, AssessmentProtectionFactorsUncheckedCreateWithoutAssessmentInput>
  }

  export type AssessmentFinalRisksCreateWithoutAssessmentInput = {
    id?: string
    factor_Fo?: number | null
    risk_Ro?: number | null
    final_R?: number | null
    final_R1?: number | null
    final_R2?: number | null
    status_R?: string | null
    status_R1?: string | null
    status_R2?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentFinalRisksUncheckedCreateWithoutAssessmentInput = {
    id?: string
    factor_Fo?: number | null
    risk_Ro?: number | null
    final_R?: number | null
    final_R1?: number | null
    final_R2?: number | null
    status_R?: string | null
    status_R1?: string | null
    status_R2?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssessmentFinalRisksCreateOrConnectWithoutAssessmentInput = {
    where: AssessmentFinalRisksWhereUniqueInput
    create: XOR<AssessmentFinalRisksCreateWithoutAssessmentInput, AssessmentFinalRisksUncheckedCreateWithoutAssessmentInput>
  }

  export type FloorUpsertWithoutAssessmentInput = {
    update: XOR<FloorUpdateWithoutAssessmentInput, FloorUncheckedUpdateWithoutAssessmentInput>
    create: XOR<FloorCreateWithoutAssessmentInput, FloorUncheckedCreateWithoutAssessmentInput>
    where?: FloorWhereInput
  }

  export type FloorUpdateToOneWithWhereWithoutAssessmentInput = {
    where?: FloorWhereInput
    data: XOR<FloorUpdateWithoutAssessmentInput, FloorUncheckedUpdateWithoutAssessmentInput>
  }

  export type FloorUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutFloorsNestedInput
  }

  export type FloorUncheckedUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentRiskFactorsUpsertWithoutAssessmentInput = {
    update: XOR<AssessmentRiskFactorsUpdateWithoutAssessmentInput, AssessmentRiskFactorsUncheckedUpdateWithoutAssessmentInput>
    create: XOR<AssessmentRiskFactorsCreateWithoutAssessmentInput, AssessmentRiskFactorsUncheckedCreateWithoutAssessmentInput>
    where?: AssessmentRiskFactorsWhereInput
  }

  export type AssessmentRiskFactorsUpdateToOneWithWhereWithoutAssessmentInput = {
    where?: AssessmentRiskFactorsWhereInput
    data: XOR<AssessmentRiskFactorsUpdateWithoutAssessmentInput, AssessmentRiskFactorsUncheckedUpdateWithoutAssessmentInput>
  }

  export type AssessmentRiskFactorsUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    qi?: NullableFloatFieldUpdateOperationsInput | number | null
    qm?: NullableFloatFieldUpdateOperationsInput | number | null
    tempDestruction?: NullableFloatFieldUpdateOperationsInput | number | null
    tempDestructionMulti?: NullableStringFieldUpdateOperationsInput | string | null
    avgDimension?: NullableFloatFieldUpdateOperationsInput | number | null
    materialClass?: NullableFloatFieldUpdateOperationsInput | number | null
    materialClassMulti?: NullableStringFieldUpdateOperationsInput | string | null
    length?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableFloatFieldUpdateOperationsInput | number | null
    area?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    accessType?: NullableStringFieldUpdateOperationsInput | string | null
    windowArea?: NullableFloatFieldUpdateOperationsInput | number | null
    staticVentArea?: NullableFloatFieldUpdateOperationsInput | number | null
    mechVentFlow?: NullableFloatFieldUpdateOperationsInput | number | null
    ventingRatio_k?: NullableFloatFieldUpdateOperationsInput | number | null
    accessSides?: NullableIntFieldUpdateOperationsInput | number | null
    heightAbove?: NullableFloatFieldUpdateOperationsInput | number | null
    depthBelow?: NullableFloatFieldUpdateOperationsInput | number | null
    floorLevel?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_q?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_i?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_g?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_e?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_v?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_z?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_P?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_P1?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_P2?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentRiskFactorsUncheckedUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    qi?: NullableFloatFieldUpdateOperationsInput | number | null
    qm?: NullableFloatFieldUpdateOperationsInput | number | null
    tempDestruction?: NullableFloatFieldUpdateOperationsInput | number | null
    tempDestructionMulti?: NullableStringFieldUpdateOperationsInput | string | null
    avgDimension?: NullableFloatFieldUpdateOperationsInput | number | null
    materialClass?: NullableFloatFieldUpdateOperationsInput | number | null
    materialClassMulti?: NullableStringFieldUpdateOperationsInput | string | null
    length?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableFloatFieldUpdateOperationsInput | number | null
    area?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    accessType?: NullableStringFieldUpdateOperationsInput | string | null
    windowArea?: NullableFloatFieldUpdateOperationsInput | number | null
    staticVentArea?: NullableFloatFieldUpdateOperationsInput | number | null
    mechVentFlow?: NullableFloatFieldUpdateOperationsInput | number | null
    ventingRatio_k?: NullableFloatFieldUpdateOperationsInput | number | null
    accessSides?: NullableIntFieldUpdateOperationsInput | number | null
    heightAbove?: NullableFloatFieldUpdateOperationsInput | number | null
    depthBelow?: NullableFloatFieldUpdateOperationsInput | number | null
    floorLevel?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_q?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_i?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_g?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_e?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_v?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_z?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_P?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_P1?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_P2?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentAcceptanceFactorsUpsertWithoutAssessmentInput = {
    update: XOR<AssessmentAcceptanceFactorsUpdateWithoutAssessmentInput, AssessmentAcceptanceFactorsUncheckedUpdateWithoutAssessmentInput>
    create: XOR<AssessmentAcceptanceFactorsCreateWithoutAssessmentInput, AssessmentAcceptanceFactorsUncheckedCreateWithoutAssessmentInput>
    where?: AssessmentAcceptanceFactorsWhereInput
  }

  export type AssessmentAcceptanceFactorsUpdateToOneWithWhereWithoutAssessmentInput = {
    where?: AssessmentAcceptanceFactorsWhereInput
    data: XOR<AssessmentAcceptanceFactorsUpdateWithoutAssessmentInput, AssessmentAcceptanceFactorsUncheckedUpdateWithoutAssessmentInput>
  }

  export type AssessmentAcceptanceFactorsUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    mainActivity?: NullableFloatFieldUpdateOperationsInput | number | null
    mainActivityKey?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryActivity?: NullableFloatFieldUpdateOperationsInput | number | null
    heatTransferType?: NullableFloatFieldUpdateOperationsInput | number | null
    heatTransferTypeKey?: NullableStringFieldUpdateOperationsInput | string | null
    generatorLocation?: NullableFloatFieldUpdateOperationsInput | number | null
    generatorLocationKey?: NullableStringFieldUpdateOperationsInput | string | null
    energySource?: NullableFloatFieldUpdateOperationsInput | number | null
    energySourceKey?: NullableStringFieldUpdateOperationsInput | string | null
    electricalSystem?: NullableFloatFieldUpdateOperationsInput | number | null
    flammableLiquids?: NullableFloatFieldUpdateOperationsInput | number | null
    combustibleDust?: NullableFloatFieldUpdateOperationsInput | number | null
    combustibleDustKey?: NullableStringFieldUpdateOperationsInput | string | null
    weldingOperations?: NullableFloatFieldUpdateOperationsInput | number | null
    additionalCarpentryPlastic?: NullableFloatFieldUpdateOperationsInput | number | null
    specialRisk?: NullableFloatFieldUpdateOperationsInput | number | null
    occupantCount?: NullableIntFieldUpdateOperationsInput | number | null
    occupantFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    occupantFactorKey?: NullableStringFieldUpdateOperationsInput | string | null
    exitWidths?: NullableStringFieldUpdateOperationsInput | string | null
    exitWidthTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    exitUnitsX?: NullableFloatFieldUpdateOperationsInput | number | null
    separatePathsK?: NullableFloatFieldUpdateOperationsInput | number | null
    mobilityFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    mobilityFactorMulti?: NullableStringFieldUpdateOperationsInput | string | null
    perceptionAwareness?: NullableBoolFieldUpdateOperationsInput | boolean | null
    evacuationPlanClear?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noPanicRisk?: NullableBoolFieldUpdateOperationsInput | boolean | null
    exitCountToOpenSpace?: NullableIntFieldUpdateOperationsInput | number | null
    valueTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    valueYear?: NullableIntFieldUpdateOperationsInput | number | null
    replaceability?: NullableFloatFieldUpdateOperationsInput | number | null
    dependencyType?: NullableStringFieldUpdateOperationsInput | string | null
    dependencyManual?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_a?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_t?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_c?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_r?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_d?: NullableFloatFieldUpdateOperationsInput | number | null
    level_A?: NullableFloatFieldUpdateOperationsInput | number | null
    level_A1?: NullableFloatFieldUpdateOperationsInput | number | null
    level_A2?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentAcceptanceFactorsUncheckedUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    mainActivity?: NullableFloatFieldUpdateOperationsInput | number | null
    mainActivityKey?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryActivity?: NullableFloatFieldUpdateOperationsInput | number | null
    heatTransferType?: NullableFloatFieldUpdateOperationsInput | number | null
    heatTransferTypeKey?: NullableStringFieldUpdateOperationsInput | string | null
    generatorLocation?: NullableFloatFieldUpdateOperationsInput | number | null
    generatorLocationKey?: NullableStringFieldUpdateOperationsInput | string | null
    energySource?: NullableFloatFieldUpdateOperationsInput | number | null
    energySourceKey?: NullableStringFieldUpdateOperationsInput | string | null
    electricalSystem?: NullableFloatFieldUpdateOperationsInput | number | null
    flammableLiquids?: NullableFloatFieldUpdateOperationsInput | number | null
    combustibleDust?: NullableFloatFieldUpdateOperationsInput | number | null
    combustibleDustKey?: NullableStringFieldUpdateOperationsInput | string | null
    weldingOperations?: NullableFloatFieldUpdateOperationsInput | number | null
    additionalCarpentryPlastic?: NullableFloatFieldUpdateOperationsInput | number | null
    specialRisk?: NullableFloatFieldUpdateOperationsInput | number | null
    occupantCount?: NullableIntFieldUpdateOperationsInput | number | null
    occupantFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    occupantFactorKey?: NullableStringFieldUpdateOperationsInput | string | null
    exitWidths?: NullableStringFieldUpdateOperationsInput | string | null
    exitWidthTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    exitUnitsX?: NullableFloatFieldUpdateOperationsInput | number | null
    separatePathsK?: NullableFloatFieldUpdateOperationsInput | number | null
    mobilityFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    mobilityFactorMulti?: NullableStringFieldUpdateOperationsInput | string | null
    perceptionAwareness?: NullableBoolFieldUpdateOperationsInput | boolean | null
    evacuationPlanClear?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noPanicRisk?: NullableBoolFieldUpdateOperationsInput | boolean | null
    exitCountToOpenSpace?: NullableIntFieldUpdateOperationsInput | number | null
    valueTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    valueYear?: NullableIntFieldUpdateOperationsInput | number | null
    replaceability?: NullableFloatFieldUpdateOperationsInput | number | null
    dependencyType?: NullableStringFieldUpdateOperationsInput | string | null
    dependencyManual?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_a?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_t?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_c?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_r?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_d?: NullableFloatFieldUpdateOperationsInput | number | null
    level_A?: NullableFloatFieldUpdateOperationsInput | number | null
    level_A1?: NullableFloatFieldUpdateOperationsInput | number | null
    level_A2?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentProtectionFactorsUpsertWithoutAssessmentInput = {
    update: XOR<AssessmentProtectionFactorsUpdateWithoutAssessmentInput, AssessmentProtectionFactorsUncheckedUpdateWithoutAssessmentInput>
    create: XOR<AssessmentProtectionFactorsCreateWithoutAssessmentInput, AssessmentProtectionFactorsUncheckedCreateWithoutAssessmentInput>
    where?: AssessmentProtectionFactorsWhereInput
  }

  export type AssessmentProtectionFactorsUpdateToOneWithWhereWithoutAssessmentInput = {
    where?: AssessmentProtectionFactorsWhereInput
    data: XOR<AssessmentProtectionFactorsUpdateWithoutAssessmentInput, AssessmentProtectionFactorsUncheckedUpdateWithoutAssessmentInput>
  }

  export type AssessmentProtectionFactorsUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    waterStorageType?: NullableStringFieldUpdateOperationsInput | string | null
    waterCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    requiredWaterCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    w2Penalty?: NullableFloatFieldUpdateOperationsInput | number | null
    distributionNetwork?: NullableStringFieldUpdateOperationsInput | string | null
    pipeDiameter?: NullableStringFieldUpdateOperationsInput | string | null
    isRingNetwork?: NullableBoolFieldUpdateOperationsInput | boolean | null
    waterFlowCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    distributionNetworkAdequacy?: NullableStringFieldUpdateOperationsInput | string | null
    hydrantCount25?: NullableIntFieldUpdateOperationsInput | number | null
    hydrantCount3?: NullableIntFieldUpdateOperationsInput | number | null
    hydrantCount4?: NullableIntFieldUpdateOperationsInput | number | null
    equivalentHydrant25?: NullableFloatFieldUpdateOperationsInput | number | null
    averageHydrantDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    w4Score?: NullableFloatFieldUpdateOperationsInput | number | null
    staticPressureRequired?: NullableFloatFieldUpdateOperationsInput | number | null
    staticPressureAvailable?: NullableFloatFieldUpdateOperationsInput | number | null
    w5Score?: NullableFloatFieldUpdateOperationsInput | number | null
    detectionType?: NullableFloatFieldUpdateOperationsInput | number | null
    s1ElectronicSystem?: NullableBoolFieldUpdateOperationsInput | boolean | null
    s1ZoneIdentification?: NullableBoolFieldUpdateOperationsInput | boolean | null
    sprinklerType?: NullableFloatFieldUpdateOperationsInput | number | null
    fireStationType?: NullableFloatFieldUpdateOperationsInput | number | null
    waterSupplyType?: NullableFloatFieldUpdateOperationsInput | number | null
    industrialBrigade?: NullableFloatFieldUpdateOperationsInput | number | null
    industrialBrigadeLabel?: NullableStringFieldUpdateOperationsInput | string | null
    s6OtherSuppression?: NullableFloatFieldUpdateOperationsInput | number | null
    s7UnlimitedWater?: NullableBoolFieldUpdateOperationsInput | boolean | null
    s8DedicatedWater?: NullableBoolFieldUpdateOperationsInput | boolean | null
    s9WaterControl?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1?: NullableFloatFieldUpdateOperationsInput | number | null
    n1ContinuousPresence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1ManualWarning?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1FireDeptNotification?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1ResidentAlarm?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n2?: NullableFloatFieldUpdateOperationsInput | number | null
    n3?: NullableFloatFieldUpdateOperationsInput | number | null
    n4?: NullableFloatFieldUpdateOperationsInput | number | null
    n5?: NullableFloatFieldUpdateOperationsInput | number | null
    structureResist?: NullableFloatFieldUpdateOperationsInput | number | null
    facadeResist?: NullableFloatFieldUpdateOperationsInput | number | null
    roofResist?: NullableFloatFieldUpdateOperationsInput | number | null
    wallResist?: NullableFloatFieldUpdateOperationsInput | number | null
    hasManyWindows?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noInternalSeparation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    combustibleInsulation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    subcompartment?: NullableFloatFieldUpdateOperationsInput | number | null
    stairways?: NullableFloatFieldUpdateOperationsInput | number | null
    stairwaysIndex?: NullableIntFieldUpdateOperationsInput | number | null
    horizontalExit?: NullableFloatFieldUpdateOperationsInput | number | null
    sprinklers?: NullableFloatFieldUpdateOperationsInput | number | null
    u1PartialDetection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u2Max300Occupants?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u3VoiceEvacuation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u4MarkedExits?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u5SmokeEvacuation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    partialDetection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    partialSprinkler?: NullableBoolFieldUpdateOperationsInput | boolean | null
    otherAutoExtinguish?: NullableBoolFieldUpdateOperationsInput | boolean | null
    financialDataBackup?: NullableBoolFieldUpdateOperationsInput | boolean | null
    sparePartsAccess?: NullableBoolFieldUpdateOperationsInput | boolean | null
    selfRepairCapability?: NullableBoolFieldUpdateOperationsInput | boolean | null
    relocationAgreements?: NullableBoolFieldUpdateOperationsInput | boolean | null
    immediateActivityTransfer?: NullableBoolFieldUpdateOperationsInput | boolean | null
    multipleProduction?: NullableBoolFieldUpdateOperationsInput | boolean | null
    factor_W?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_N?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_S?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_F?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_U?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_Y?: NullableFloatFieldUpdateOperationsInput | number | null
    level_D?: NullableFloatFieldUpdateOperationsInput | number | null
    level_D1?: NullableFloatFieldUpdateOperationsInput | number | null
    level_D2?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentProtectionFactorsUncheckedUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    waterStorageType?: NullableStringFieldUpdateOperationsInput | string | null
    waterCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    requiredWaterCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    w2Penalty?: NullableFloatFieldUpdateOperationsInput | number | null
    distributionNetwork?: NullableStringFieldUpdateOperationsInput | string | null
    pipeDiameter?: NullableStringFieldUpdateOperationsInput | string | null
    isRingNetwork?: NullableBoolFieldUpdateOperationsInput | boolean | null
    waterFlowCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    distributionNetworkAdequacy?: NullableStringFieldUpdateOperationsInput | string | null
    hydrantCount25?: NullableIntFieldUpdateOperationsInput | number | null
    hydrantCount3?: NullableIntFieldUpdateOperationsInput | number | null
    hydrantCount4?: NullableIntFieldUpdateOperationsInput | number | null
    equivalentHydrant25?: NullableFloatFieldUpdateOperationsInput | number | null
    averageHydrantDistance?: NullableFloatFieldUpdateOperationsInput | number | null
    w4Score?: NullableFloatFieldUpdateOperationsInput | number | null
    staticPressureRequired?: NullableFloatFieldUpdateOperationsInput | number | null
    staticPressureAvailable?: NullableFloatFieldUpdateOperationsInput | number | null
    w5Score?: NullableFloatFieldUpdateOperationsInput | number | null
    detectionType?: NullableFloatFieldUpdateOperationsInput | number | null
    s1ElectronicSystem?: NullableBoolFieldUpdateOperationsInput | boolean | null
    s1ZoneIdentification?: NullableBoolFieldUpdateOperationsInput | boolean | null
    sprinklerType?: NullableFloatFieldUpdateOperationsInput | number | null
    fireStationType?: NullableFloatFieldUpdateOperationsInput | number | null
    waterSupplyType?: NullableFloatFieldUpdateOperationsInput | number | null
    industrialBrigade?: NullableFloatFieldUpdateOperationsInput | number | null
    industrialBrigadeLabel?: NullableStringFieldUpdateOperationsInput | string | null
    s6OtherSuppression?: NullableFloatFieldUpdateOperationsInput | number | null
    s7UnlimitedWater?: NullableBoolFieldUpdateOperationsInput | boolean | null
    s8DedicatedWater?: NullableBoolFieldUpdateOperationsInput | boolean | null
    s9WaterControl?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1?: NullableFloatFieldUpdateOperationsInput | number | null
    n1ContinuousPresence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1ManualWarning?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1FireDeptNotification?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n1ResidentAlarm?: NullableBoolFieldUpdateOperationsInput | boolean | null
    n2?: NullableFloatFieldUpdateOperationsInput | number | null
    n3?: NullableFloatFieldUpdateOperationsInput | number | null
    n4?: NullableFloatFieldUpdateOperationsInput | number | null
    n5?: NullableFloatFieldUpdateOperationsInput | number | null
    structureResist?: NullableFloatFieldUpdateOperationsInput | number | null
    facadeResist?: NullableFloatFieldUpdateOperationsInput | number | null
    roofResist?: NullableFloatFieldUpdateOperationsInput | number | null
    wallResist?: NullableFloatFieldUpdateOperationsInput | number | null
    hasManyWindows?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noInternalSeparation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    combustibleInsulation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    subcompartment?: NullableFloatFieldUpdateOperationsInput | number | null
    stairways?: NullableFloatFieldUpdateOperationsInput | number | null
    stairwaysIndex?: NullableIntFieldUpdateOperationsInput | number | null
    horizontalExit?: NullableFloatFieldUpdateOperationsInput | number | null
    sprinklers?: NullableFloatFieldUpdateOperationsInput | number | null
    u1PartialDetection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u2Max300Occupants?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u3VoiceEvacuation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u4MarkedExits?: NullableBoolFieldUpdateOperationsInput | boolean | null
    u5SmokeEvacuation?: NullableBoolFieldUpdateOperationsInput | boolean | null
    partialDetection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    partialSprinkler?: NullableBoolFieldUpdateOperationsInput | boolean | null
    otherAutoExtinguish?: NullableBoolFieldUpdateOperationsInput | boolean | null
    financialDataBackup?: NullableBoolFieldUpdateOperationsInput | boolean | null
    sparePartsAccess?: NullableBoolFieldUpdateOperationsInput | boolean | null
    selfRepairCapability?: NullableBoolFieldUpdateOperationsInput | boolean | null
    relocationAgreements?: NullableBoolFieldUpdateOperationsInput | boolean | null
    immediateActivityTransfer?: NullableBoolFieldUpdateOperationsInput | boolean | null
    multipleProduction?: NullableBoolFieldUpdateOperationsInput | boolean | null
    factor_W?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_N?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_S?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_F?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_U?: NullableFloatFieldUpdateOperationsInput | number | null
    factor_Y?: NullableFloatFieldUpdateOperationsInput | number | null
    level_D?: NullableFloatFieldUpdateOperationsInput | number | null
    level_D1?: NullableFloatFieldUpdateOperationsInput | number | null
    level_D2?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentFinalRisksUpsertWithoutAssessmentInput = {
    update: XOR<AssessmentFinalRisksUpdateWithoutAssessmentInput, AssessmentFinalRisksUncheckedUpdateWithoutAssessmentInput>
    create: XOR<AssessmentFinalRisksCreateWithoutAssessmentInput, AssessmentFinalRisksUncheckedCreateWithoutAssessmentInput>
    where?: AssessmentFinalRisksWhereInput
  }

  export type AssessmentFinalRisksUpdateToOneWithWhereWithoutAssessmentInput = {
    where?: AssessmentFinalRisksWhereInput
    data: XOR<AssessmentFinalRisksUpdateWithoutAssessmentInput, AssessmentFinalRisksUncheckedUpdateWithoutAssessmentInput>
  }

  export type AssessmentFinalRisksUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    factor_Fo?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_Ro?: NullableFloatFieldUpdateOperationsInput | number | null
    final_R?: NullableFloatFieldUpdateOperationsInput | number | null
    final_R1?: NullableFloatFieldUpdateOperationsInput | number | null
    final_R2?: NullableFloatFieldUpdateOperationsInput | number | null
    status_R?: NullableStringFieldUpdateOperationsInput | string | null
    status_R1?: NullableStringFieldUpdateOperationsInput | string | null
    status_R2?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentFinalRisksUncheckedUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    factor_Fo?: NullableFloatFieldUpdateOperationsInput | number | null
    risk_Ro?: NullableFloatFieldUpdateOperationsInput | number | null
    final_R?: NullableFloatFieldUpdateOperationsInput | number | null
    final_R1?: NullableFloatFieldUpdateOperationsInput | number | null
    final_R2?: NullableFloatFieldUpdateOperationsInput | number | null
    status_R?: NullableStringFieldUpdateOperationsInput | string | null
    status_R1?: NullableStringFieldUpdateOperationsInput | string | null
    status_R2?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentCreateWithoutRiskFactorsInput = {
    id?: string
    updatedAt?: Date | string
    floor: FloorCreateNestedOneWithoutAssessmentInput
    acceptanceFactors?: AssessmentAcceptanceFactorsCreateNestedOneWithoutAssessmentInput
    protectionFactors?: AssessmentProtectionFactorsCreateNestedOneWithoutAssessmentInput
    finalRisks?: AssessmentFinalRisksCreateNestedOneWithoutAssessmentInput
  }

  export type AssessmentUncheckedCreateWithoutRiskFactorsInput = {
    id?: string
    floorId: string
    updatedAt?: Date | string
    acceptanceFactors?: AssessmentAcceptanceFactorsUncheckedCreateNestedOneWithoutAssessmentInput
    protectionFactors?: AssessmentProtectionFactorsUncheckedCreateNestedOneWithoutAssessmentInput
    finalRisks?: AssessmentFinalRisksUncheckedCreateNestedOneWithoutAssessmentInput
  }

  export type AssessmentCreateOrConnectWithoutRiskFactorsInput = {
    where: AssessmentWhereUniqueInput
    create: XOR<AssessmentCreateWithoutRiskFactorsInput, AssessmentUncheckedCreateWithoutRiskFactorsInput>
  }

  export type AssessmentUpsertWithoutRiskFactorsInput = {
    update: XOR<AssessmentUpdateWithoutRiskFactorsInput, AssessmentUncheckedUpdateWithoutRiskFactorsInput>
    create: XOR<AssessmentCreateWithoutRiskFactorsInput, AssessmentUncheckedCreateWithoutRiskFactorsInput>
    where?: AssessmentWhereInput
  }

  export type AssessmentUpdateToOneWithWhereWithoutRiskFactorsInput = {
    where?: AssessmentWhereInput
    data: XOR<AssessmentUpdateWithoutRiskFactorsInput, AssessmentUncheckedUpdateWithoutRiskFactorsInput>
  }

  export type AssessmentUpdateWithoutRiskFactorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    floor?: FloorUpdateOneRequiredWithoutAssessmentNestedInput
    acceptanceFactors?: AssessmentAcceptanceFactorsUpdateOneWithoutAssessmentNestedInput
    protectionFactors?: AssessmentProtectionFactorsUpdateOneWithoutAssessmentNestedInput
    finalRisks?: AssessmentFinalRisksUpdateOneWithoutAssessmentNestedInput
  }

  export type AssessmentUncheckedUpdateWithoutRiskFactorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    floorId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptanceFactors?: AssessmentAcceptanceFactorsUncheckedUpdateOneWithoutAssessmentNestedInput
    protectionFactors?: AssessmentProtectionFactorsUncheckedUpdateOneWithoutAssessmentNestedInput
    finalRisks?: AssessmentFinalRisksUncheckedUpdateOneWithoutAssessmentNestedInput
  }

  export type AssessmentCreateWithoutAcceptanceFactorsInput = {
    id?: string
    updatedAt?: Date | string
    floor: FloorCreateNestedOneWithoutAssessmentInput
    riskFactors?: AssessmentRiskFactorsCreateNestedOneWithoutAssessmentInput
    protectionFactors?: AssessmentProtectionFactorsCreateNestedOneWithoutAssessmentInput
    finalRisks?: AssessmentFinalRisksCreateNestedOneWithoutAssessmentInput
  }

  export type AssessmentUncheckedCreateWithoutAcceptanceFactorsInput = {
    id?: string
    floorId: string
    updatedAt?: Date | string
    riskFactors?: AssessmentRiskFactorsUncheckedCreateNestedOneWithoutAssessmentInput
    protectionFactors?: AssessmentProtectionFactorsUncheckedCreateNestedOneWithoutAssessmentInput
    finalRisks?: AssessmentFinalRisksUncheckedCreateNestedOneWithoutAssessmentInput
  }

  export type AssessmentCreateOrConnectWithoutAcceptanceFactorsInput = {
    where: AssessmentWhereUniqueInput
    create: XOR<AssessmentCreateWithoutAcceptanceFactorsInput, AssessmentUncheckedCreateWithoutAcceptanceFactorsInput>
  }

  export type AssessmentUpsertWithoutAcceptanceFactorsInput = {
    update: XOR<AssessmentUpdateWithoutAcceptanceFactorsInput, AssessmentUncheckedUpdateWithoutAcceptanceFactorsInput>
    create: XOR<AssessmentCreateWithoutAcceptanceFactorsInput, AssessmentUncheckedCreateWithoutAcceptanceFactorsInput>
    where?: AssessmentWhereInput
  }

  export type AssessmentUpdateToOneWithWhereWithoutAcceptanceFactorsInput = {
    where?: AssessmentWhereInput
    data: XOR<AssessmentUpdateWithoutAcceptanceFactorsInput, AssessmentUncheckedUpdateWithoutAcceptanceFactorsInput>
  }

  export type AssessmentUpdateWithoutAcceptanceFactorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    floor?: FloorUpdateOneRequiredWithoutAssessmentNestedInput
    riskFactors?: AssessmentRiskFactorsUpdateOneWithoutAssessmentNestedInput
    protectionFactors?: AssessmentProtectionFactorsUpdateOneWithoutAssessmentNestedInput
    finalRisks?: AssessmentFinalRisksUpdateOneWithoutAssessmentNestedInput
  }

  export type AssessmentUncheckedUpdateWithoutAcceptanceFactorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    floorId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    riskFactors?: AssessmentRiskFactorsUncheckedUpdateOneWithoutAssessmentNestedInput
    protectionFactors?: AssessmentProtectionFactorsUncheckedUpdateOneWithoutAssessmentNestedInput
    finalRisks?: AssessmentFinalRisksUncheckedUpdateOneWithoutAssessmentNestedInput
  }

  export type AssessmentCreateWithoutProtectionFactorsInput = {
    id?: string
    updatedAt?: Date | string
    floor: FloorCreateNestedOneWithoutAssessmentInput
    riskFactors?: AssessmentRiskFactorsCreateNestedOneWithoutAssessmentInput
    acceptanceFactors?: AssessmentAcceptanceFactorsCreateNestedOneWithoutAssessmentInput
    finalRisks?: AssessmentFinalRisksCreateNestedOneWithoutAssessmentInput
  }

  export type AssessmentUncheckedCreateWithoutProtectionFactorsInput = {
    id?: string
    floorId: string
    updatedAt?: Date | string
    riskFactors?: AssessmentRiskFactorsUncheckedCreateNestedOneWithoutAssessmentInput
    acceptanceFactors?: AssessmentAcceptanceFactorsUncheckedCreateNestedOneWithoutAssessmentInput
    finalRisks?: AssessmentFinalRisksUncheckedCreateNestedOneWithoutAssessmentInput
  }

  export type AssessmentCreateOrConnectWithoutProtectionFactorsInput = {
    where: AssessmentWhereUniqueInput
    create: XOR<AssessmentCreateWithoutProtectionFactorsInput, AssessmentUncheckedCreateWithoutProtectionFactorsInput>
  }

  export type AssessmentUpsertWithoutProtectionFactorsInput = {
    update: XOR<AssessmentUpdateWithoutProtectionFactorsInput, AssessmentUncheckedUpdateWithoutProtectionFactorsInput>
    create: XOR<AssessmentCreateWithoutProtectionFactorsInput, AssessmentUncheckedCreateWithoutProtectionFactorsInput>
    where?: AssessmentWhereInput
  }

  export type AssessmentUpdateToOneWithWhereWithoutProtectionFactorsInput = {
    where?: AssessmentWhereInput
    data: XOR<AssessmentUpdateWithoutProtectionFactorsInput, AssessmentUncheckedUpdateWithoutProtectionFactorsInput>
  }

  export type AssessmentUpdateWithoutProtectionFactorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    floor?: FloorUpdateOneRequiredWithoutAssessmentNestedInput
    riskFactors?: AssessmentRiskFactorsUpdateOneWithoutAssessmentNestedInput
    acceptanceFactors?: AssessmentAcceptanceFactorsUpdateOneWithoutAssessmentNestedInput
    finalRisks?: AssessmentFinalRisksUpdateOneWithoutAssessmentNestedInput
  }

  export type AssessmentUncheckedUpdateWithoutProtectionFactorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    floorId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    riskFactors?: AssessmentRiskFactorsUncheckedUpdateOneWithoutAssessmentNestedInput
    acceptanceFactors?: AssessmentAcceptanceFactorsUncheckedUpdateOneWithoutAssessmentNestedInput
    finalRisks?: AssessmentFinalRisksUncheckedUpdateOneWithoutAssessmentNestedInput
  }

  export type AssessmentCreateWithoutFinalRisksInput = {
    id?: string
    updatedAt?: Date | string
    floor: FloorCreateNestedOneWithoutAssessmentInput
    riskFactors?: AssessmentRiskFactorsCreateNestedOneWithoutAssessmentInput
    acceptanceFactors?: AssessmentAcceptanceFactorsCreateNestedOneWithoutAssessmentInput
    protectionFactors?: AssessmentProtectionFactorsCreateNestedOneWithoutAssessmentInput
  }

  export type AssessmentUncheckedCreateWithoutFinalRisksInput = {
    id?: string
    floorId: string
    updatedAt?: Date | string
    riskFactors?: AssessmentRiskFactorsUncheckedCreateNestedOneWithoutAssessmentInput
    acceptanceFactors?: AssessmentAcceptanceFactorsUncheckedCreateNestedOneWithoutAssessmentInput
    protectionFactors?: AssessmentProtectionFactorsUncheckedCreateNestedOneWithoutAssessmentInput
  }

  export type AssessmentCreateOrConnectWithoutFinalRisksInput = {
    where: AssessmentWhereUniqueInput
    create: XOR<AssessmentCreateWithoutFinalRisksInput, AssessmentUncheckedCreateWithoutFinalRisksInput>
  }

  export type AssessmentUpsertWithoutFinalRisksInput = {
    update: XOR<AssessmentUpdateWithoutFinalRisksInput, AssessmentUncheckedUpdateWithoutFinalRisksInput>
    create: XOR<AssessmentCreateWithoutFinalRisksInput, AssessmentUncheckedCreateWithoutFinalRisksInput>
    where?: AssessmentWhereInput
  }

  export type AssessmentUpdateToOneWithWhereWithoutFinalRisksInput = {
    where?: AssessmentWhereInput
    data: XOR<AssessmentUpdateWithoutFinalRisksInput, AssessmentUncheckedUpdateWithoutFinalRisksInput>
  }

  export type AssessmentUpdateWithoutFinalRisksInput = {
    id?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    floor?: FloorUpdateOneRequiredWithoutAssessmentNestedInput
    riskFactors?: AssessmentRiskFactorsUpdateOneWithoutAssessmentNestedInput
    acceptanceFactors?: AssessmentAcceptanceFactorsUpdateOneWithoutAssessmentNestedInput
    protectionFactors?: AssessmentProtectionFactorsUpdateOneWithoutAssessmentNestedInput
  }

  export type AssessmentUncheckedUpdateWithoutFinalRisksInput = {
    id?: StringFieldUpdateOperationsInput | string
    floorId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    riskFactors?: AssessmentRiskFactorsUncheckedUpdateOneWithoutAssessmentNestedInput
    acceptanceFactors?: AssessmentAcceptanceFactorsUncheckedUpdateOneWithoutAssessmentNestedInput
    protectionFactors?: AssessmentProtectionFactorsUncheckedUpdateOneWithoutAssessmentNestedInput
  }

  export type SessionCreateManyUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    impersonatedBy?: string | null
  }

  export type AccountCreateManyUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectCreateManyUserInput = {
    id?: string
    name: string
    address?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    impersonatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    impersonatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    impersonatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    floors?: FloorUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    floors?: FloorUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FloorCreateManyProjectInput = {
    id?: string
    name: string
    level: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FloorUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assessment?: AssessmentUpdateOneWithoutFloorNestedInput
  }

  export type FloorUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assessment?: AssessmentUncheckedUpdateOneWithoutFloorNestedInput
  }

  export type FloorUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}