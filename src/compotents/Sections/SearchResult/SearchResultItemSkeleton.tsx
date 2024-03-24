import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';

function SearchResultItemSkeleton() {

    return (
        <SkeletonTheme>
            <div className="cursor-pointer bg-white w-full rounded-xl p-6 border-4 border-transparent block h-48">
                <div className="text-lg font-bold text-gray-900 mb-4"><Skeleton/></div>
                <div className="text-lg text-gray-500 mb-1"><Skeleton/></div>
                <div className="text-lg text-gray-700"><Skeleton/></div>

            </div>
        </SkeletonTheme>
    )
}

export default SearchResultItemSkeleton
