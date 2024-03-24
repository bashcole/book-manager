import {useDispatch, useSelector} from "react-redux";
import {IRootStore} from "@/store";
import Modal from "@/compotents/Modal/Modal.tsx";
import {getAllNotes, removeNote} from "@/services/localstorage.ts";
import {uiActions} from "@/store/reducers/ui-slice.ts";
import {toast} from "react-toastify";
import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";
import {Note} from "@/interfaces/note.ts";

export type ModalPropsNew = {
    isOpen: boolean;
    onClose: () => void;
};

function ConfirmDeleteNoteModal({isOpen, onClose}: ModalPropsNew) {

    const dispatch = useDispatch();
    const selectedNote = useSelector<IRootStore, Note | undefined>((state) => state.ui.selectedNote);

    const deleteNote = () => {
        removeNote(`${selectedNote?.id}`)
        dispatch(uiActions.setNotes(getAllNotes()))
        onClose()
        toast.success('Note deleted successfully.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const icon = (
        <div
            className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true"/>
        </div>
    )

    const body = (

        <p className="text-sm text-gray-500">
            Are you sure you want to delete your book note? All of your data will be permanently removed.
            This action cannot be undone.
        </p>
    );

    const footer = (
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
                onClick={deleteNote}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
                Delete
            </button>

            <button
                onClick={onClose}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
                Cancel
            </button>
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Delete book note" icon={icon} body={body} footer={footer}/>
    )
}

export default ConfirmDeleteNoteModal
