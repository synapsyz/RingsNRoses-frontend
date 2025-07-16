// ItemCardDisplay.js
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CategoryItemCard from '@/components/CategoryItemCard';
import axios from 'axios';

const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_APP_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;
};
const api_url = getApiUrl();
const api = axios.create(
  {
    baseURL: api_url + "/api/v1",
  },
  {
    headers: {
      ...(process.env.NEXT_PUBLIC_APP_ENV === "development" ? false : true && { "ngrok-skip-browser-warning": "true" }),
    },
  }
);

const ItemCardDisplay = ({
  categoryItems,
  fetchMoreData,
  hasMore,
  nextPageUrl,
  isInfiniteScrollActive,
  setIsInfiniteScrollActive,
  setNextPageUrl,
  setHasMore,
  categoryName,
  setCategoryItems
}) => {
  return (
    <>
      {isInfiniteScrollActive ? (
        <InfiniteScroll
          dataLength={categoryItems.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p className="text-center my-4 text-gray-500">Loading more items...</p>}
          endMessage={<p className="text-center my-4 text-gray-500">No more items to show.</p>}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-4">
            {categoryItems.map(item => (
              <CategoryItemCard key={item.id} item={item} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-4">
            {categoryItems.map(item => (
              <CategoryItemCard key={item.id} item={item} />
            ))}
          </div>

          {nextPageUrl && (
            <div className="text-center mt-6">
              <button
                className="bg-[#E91E63] hover:bg-[#d81b60] text-white font-medium py-2 px-4 rounded-full"
                onClick={() => setIsInfiniteScrollActive(true)}
              >
                See More
              </button>
            </div>
          )}
        </>
      )}

      {isInfiniteScrollActive && (
        <div className="text-center mt-6">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-full"
            onClick={() => {
              setIsInfiniteScrollActive(false);
              setNextPageUrl(null);
              setHasMore(true);
              const name = categoryName.toLowerCase().replace(/\s+/g, '_');

              api.get(`/categories/${name}/`)
                .then(response => {
                  setCategoryItems(response.data.results);
                  setNextPageUrl(response.data.next);
                })
                .catch(err => {
                  console.error('Error resetting category items:', err);
                  setCategoryItems([]);
                });

              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            See Less
          </button>
        </div>
      )}
    </>
  );
};

export default ItemCardDisplay;