import {useQuery} from '@tanstack/react-query';
import {publicRequest} from "../services/axios";
import {Book} from "@/interfaces/book.ts";

type SearchParams = {
    term: string;
    page: number;
    limit: number;
};
export const searchBooks = async ({term, page, limit}: SearchParams) => {
    const response = await publicRequest.get<{ docs: Book[] }>(`/search.json?q=${term}&page=${page}&limit=${limit}`);
    return response.data.docs;
};
export const useSearchBooksQuery = ({term, page, limit}: SearchParams) => {
    return useQuery<Book[]>({
        queryKey: ['search-books', term, page, limit],
        queryFn: () => searchBooks({term, page, limit}),
        enabled: term.trim().length > 0
    });
};