import { useDispatch, useSelector } from 'react-redux';
import {uiActions} from "@/store/reducers/ui-slice.ts";
import {IRootStore} from "@/store";
import {getFirstAuthor} from "@/utils";
import {Book} from "@/interfaces/book.ts";

type Props = {
    book: Book
}

function SearchResultItem({book}: Props) {
    const dispatch = useDispatch();
    const selectedBook = useSelector<IRootStore, Book | undefined>((state) => state.ui.selectedBook);

    const isSelected = book.key === selectedBook?.key;

    const handleClick = () => {
        dispatch(uiActions.setSelectBookToAdd(book));
    };

    const itemClassName = `cursor-pointer bg-white w-full rounded-xl p-6 border-4 ${
        isSelected ? "border-blue-500" : "border-transparent"
    }`;


    return (
        <>
            <div className={itemClassName} onClick={handleClick}>
                <div className="text-lg font-bold text-gray-900 mb-4">{book.title}</div>
                <div className="text-md text-gray-500 mb-1">Author:</div>
                <div className="text-md text-gray-700">{getFirstAuthor(book.author_name)}</div>
            </div>

        </>

    )
}

export default SearchResultItem
