export type ResponseMessage = {
    status: string;
    message: string;
};

export type MoviesQuery = {
    actor?: string;
    genre?: string;
    imdbSort?: "ASC" | "DESC";
};