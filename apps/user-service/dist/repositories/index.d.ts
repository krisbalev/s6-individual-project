/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
export declare function GetUsers(): Promise<
  (import("mongoose").Document<
    unknown,
    {},
    {
      role: string;
      created_at: Date;
      points: number;
      email?: string | undefined;
      username?: string | undefined;
    }
  > &
    Omit<
      {
        role: string;
        created_at: Date;
        points: number;
        email?: string | undefined;
        username?: string | undefined;
      } & {
        _id: import("mongoose").Types.ObjectId;
      },
      never
    >)[]
>;
export declare function GetUserById(id: string): Promise<
  | (import("mongoose").Document<
      unknown,
      {},
      {
        role: string;
        created_at: Date;
        points: number;
        email?: string | undefined;
        username?: string | undefined;
      }
    > &
      Omit<
        {
          role: string;
          created_at: Date;
          points: number;
          email?: string | undefined;
          username?: string | undefined;
        } & {
          _id: import("mongoose").Types.ObjectId;
        },
        never
      >)
  | null
>;
export declare function CreateUser(data: any): Promise<
  | (import("mongoose").Document<
      unknown,
      {},
      {
        role: string;
        created_at: Date;
        points: number;
        email?: string | undefined;
        username?: string | undefined;
      }
    > &
      Omit<
        {
          role: string;
          created_at: Date;
          points: number;
          email?: string | undefined;
          username?: string | undefined;
        } & {
          _id: import("mongoose").Types.ObjectId;
        },
        never
      >)
  | null
>;
export declare function DeleteUser(id: string): Promise<
  | (import("mongoose").Document<
      unknown,
      {},
      {
        role: string;
        created_at: Date;
        points: number;
        email?: string | undefined;
        username?: string | undefined;
      }
    > &
      Omit<
        {
          role: string;
          created_at: Date;
          points: number;
          email?: string | undefined;
          username?: string | undefined;
        } & {
          _id: import("mongoose").Types.ObjectId;
        },
        never
      >)
  | null
>;
export declare function CheckIfUserExists(email: string): Promise<any>;
export declare function GetUsernamesPerId(ids: string[]): Promise<{}[]>;
export declare function ChangeUsername(
  id: string,
  newUsername: string
): Promise<
  | (import("mongoose").Document<
      unknown,
      {},
      {
        role: string;
        created_at: Date;
        points: number;
        email?: string | undefined;
        username?: string | undefined;
      }
    > &
      Omit<
        {
          role: string;
          created_at: Date;
          points: number;
          email?: string | undefined;
          username?: string | undefined;
        } & {
          _id: import("mongoose").Types.ObjectId;
        },
        never
      >)
  | null
>;
//# sourceMappingURL=index.d.ts.map
