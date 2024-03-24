import {useDispatch, useSelector} from "react-redux";
import {IRootStore} from "@/store";
import SearchResultItem from "@/compotents/Sections/SearchResult/SearchResultItem.tsx";
import {useSearchBooksQuery} from "@/api/notes.ts";
import SearchResultItemSkeleton from "@/compotents/Sections/SearchResult/SearchResultItemSkeleton.tsx";
import {uiActions} from "@/store/reducers/ui-slice.ts";
import {useEffect} from "react";

function SearchResult() {

    const dispatch = useDispatch();
    const searchTerm = useSelector<IRootStore, string | null>(state => state.ui.searchTerm)

    const {data, isLoading, refetch} = useSearchBooksQuery({
        term: `${searchTerm}`,
        page: 1,
        limit: 12
    });

    useEffect(() => {
        if(data){
            dispatch(uiActions.setLoading(false));
        }
    }, [data, dispatch])

    useEffect(() => {
        if(searchTerm === '' && data) {
            refetch().then(r => console.log(r))
        }
    }, [searchTerm, dispatch, data]);

    return (
        <>
            {(isLoading || data) && <>
                <div className="text-2xl font-bold text-gray-900 mb-4">Results</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {isLoading && <SearchResultItemSkeleton/>}
                    {isLoading && <SearchResultItemSkeleton/>}
                    {isLoading && <SearchResultItemSkeleton/>}

                    {data && data.map((item) => (
                        <SearchResultItem key={item.key} book={item}/>
                    ))}

                    {!isLoading && data?.length === 0 && <p className="text-center text-gray-700"> No items found.</p>}
                </div>
            </>}

        </>
    )
}

export default SearchResult
