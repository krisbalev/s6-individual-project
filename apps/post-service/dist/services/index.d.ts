export declare function GetPosts(): Promise<import("database").Post[]>;
export declare function GetPostById(id: string): Promise<import("database").Post | null>;
export declare function CreatePost(data: any): Promise<import("database").Post | null>;
export declare function UpdatePosts(id: string, data: any): Promise<import("database").Post | null>;
export declare function DeletePosts(id: string): Promise<import("database").Post | null>;
//# sourceMappingURL=index.d.ts.map