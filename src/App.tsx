import {useDispatch, useSelector} from 'react-redux';
import {IRootStore} from "@/store";
import {uiActions} from "@/store/reducers/ui-slice.ts";
import AddNoteModal from "@/compotents/Modal/variants/AddNoteModal.tsx";
import SearchBooks from "@/compotents/Sections/SearchBooks";
import SearchResult from "@/compotents/Sections/SearchResult";
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css';
import MyBooks from "@/compotents/Sections/MyBooks";
import { ToastContainer } from 'react-toastify';
function App() {

    const dispatch = useDispatch();
    const isAddNoteModalOpen = useSelector<IRootStore, boolean>(state => state.ui.isAddNoteModalOpen)

    const onClose = () => {
        dispatch(uiActions.closeAddNoteModal());
    }

    return (
        <>
            <ToastContainer />
            <AddNoteModal isOpen={isAddNoteModalOpen} onClose={onClose}/>
            <div className="relative min-h-full flex flex-col pb-10">
                <nav className="flex-shrink-0 bg-white">

                    <div className="max-w-7xl mx-auto px-4 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="text-xl font-bold text-gray-900">Book Manager</div>
                        </div>
                    </div>
                </nav>

                <div className="mt-8 flex-grow w-full max-w-7xl mx-auto px-4 lg:px-8 lg:flex gap-4 md:gap-8">

                    <div className="flex-1 min-w-0 flex flex-col gap-4 md:gap-8">
                        <SearchBooks/>
                        <SearchResult/>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col gap-4 md:gap-8 mt-8 lg:mt-0">
                        <MyBooks/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
