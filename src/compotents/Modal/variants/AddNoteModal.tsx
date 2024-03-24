import {useDispatch, useSelector} from "react-redux";
import {IRootStore} from "@/store";
import Modal from "@/compotents/Modal/Modal.tsx";
import {addNote, getAllNotes} from "@/services/localstorage.ts";
import {uiActions} from "@/store/reducers/ui-slice.ts";
import {getFirstAuthor} from "@/utils";
import {toast} from "react-toastify";
import {Book} from "@/interfaces/book.ts";
import {SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
    content: string
}

 type ModalPropsNew = {
    isOpen: boolean;
    onClose: () => void;
};

function AddNoteModal({isOpen, onClose}: ModalPropsNew) {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputs>()

    const dispatch = useDispatch();
    const selectedBook = useSelector<IRootStore, Book | undefined>((state) => state.ui.selectedBook);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        addNote(`${selectedBook?.title}`, getFirstAuthor(selectedBook?.author_name), `${data.content}`);
        dispatch(uiActions.setNotes(getAllNotes()))
        onClose()
        toast.success('Note added successfully.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const body = (
        <div>

            <div className="text-lg font-bold text-gray-900 mt-4">{selectedBook?.title}</div>
            <div className="text-md font-bold text-gray-500 mt-2 mb-4">Notes:</div>

            <div className="mt-6 mb-4 relative rounded-md shadow-sm">
                <textarea
                    id="content"
                    {...register("content", {
                        required: "This field is required",
                        minLength: {
                            value: 10,
                            message: "Content must be at least 10 characters long",
                        },
                        maxLength: {
                            value: 140,
                            message: "Content cannot exceed 140 characters",
                        },
                    })}
                    rows={6}
                    placeholder="Add notes"
                    className="bg-gray-200 text-gray-500 shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border border-transparent rounded-md p-4"
                />
            </div>
            {errors.content && <p className="mt-2 text-sm text-red-600" id="search-error">{errors.content.message}</p>}

        </div>
    );

    const footer = (
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:ml-3 sm:w-auto sm:text-sm"
            >
                Save
            </button>

            <button
                onClick={onClose}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
                Cancel
            </button>
        </div>
    )

    return (
        <Modal onSubmit={handleSubmit(onSubmit)} isOpen={isOpen} onClose={onClose} title="Add Notes" body={body} footer={footer}/>
    )
}

export default AddNoteModal
