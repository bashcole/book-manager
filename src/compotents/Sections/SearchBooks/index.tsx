import {useForm, SubmitHandler} from "react-hook-form"
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "@/store/reducers/ui-slice.ts";
import {IRootStore} from "@/store";
import Spinner from "@/compotents/Shared/Spinner.tsx";
import {ExclamationCircleIcon} from "@heroicons/react/24/solid";

type Inputs = {
    search: string
}

function SearchBooks() {

    const dispatch = useDispatch();
    const isLoading = useSelector<IRootStore, boolean>((state) => state.ui.isLoading);
    const searchTerm = useSelector<IRootStore, string | null>(state => state.ui.searchTerm)

    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(uiActions.setSearchTerm(data.search));
        dispatch(uiActions.setLoading(true));
    };

    const clearSearch = () => {
        reset({search: ''});
        dispatch(uiActions.setSearchTerm(''));
    }

    return (
        <>
            <div className="text-2xl font-bold text-gray-900">Add a Book</div>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-full rounded-xl p-6 ">
                <div className="mb-4">
                    <label htmlFor="search" className="text-md font-bold text-gray-600">
                        Search
                    </label>
                    <div className="mt-6 mb-4 relative rounded-md shadow-sm">
                        <input
                            {...register("search", {required: true})}
                            type="text"
                            name="search"
                            id="search"
                            className={`block w-full pr-10 py-4 sm:text-sm rounded-lg ${
                                errors.search ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' : 'bg-gray-200 text-gray-500 border-transparent focus:ring-gray-500 focus:border-gray-500'
                            }`}
                            placeholder="Type something..."
                        />

                        {errors.search && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true"/>
                        </div>}

                    </div>
                    {errors.search && <p className="mt-2 text-sm text-red-600" id="search-error">This field is
                        required</p>}
                </div>

                <div className="flex justify-between gap-4 flex-col md:flex-row items-center">
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="w-full md:w-40 h-12 items-center justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-700 focus:outline-none sm:text-sm"
                    >
                        {isLoading ? <Spinner/> : "Search"}
                    </button>
                    {searchTerm && searchTerm.trim().length > 0 && !isLoading && <button
                        type="button"
                        className="w-full md:w-40 h-12 items-center md:ml-4 justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-gray-300 text-base font-medium text-white hover:bg-gray-400 focus:outline-none sm:text-sm"
                        onClick={clearSearch}>Clear
                    </button>}
                </div>

            </form>
        </>
    )
}

export default SearchBooks
