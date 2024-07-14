import SearchBox from '@/components/search/SearchBox';

const SearchPage = () => {
  return (
    <div className="w-full h-full py-2 flex justify-center">
      <div className="w-3/4">
        <SearchBox bg="Back" paddingH={3} preIcon="hidden" />
      </div>
    </div>
  );
};

export default SearchPage;
