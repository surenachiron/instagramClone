'use client';

import { useEffect, useRef, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import Button from '../Button';
import Input from '@/components/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchResultNode } from './SearchResultNode';
import { searchResult } from './action';
import { usePathname } from 'next/navigation';

type Props = { bg: 'Back' | 'Middle' | 'Light'; paddingH: number; preIcon?: string };

const SearchInputSchema: ZodType<SearchInputType> = z.object({
  searchUser: z.string().min(1),
});
export type SearchInputType = { searchUser: string };
export type resultType =
  | { user_id: string; user_name: string | null; full_name: string | null; avatar_url: string | null }[]
  | string
  | null;

const SearchBox = ({ bg, paddingH, preIcon }: Props) => {
  const { register, handleSubmit } = useForm<SearchInputType>({ resolver: zodResolver(SearchInputSchema) });

  const searchRef = useRef<HTMLFormElement | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<resultType>('');
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResult(false);
      }
      if (searchRef.current && searchRef.current.contains(event.target as Node)) {
        setShowResult(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchUser: SubmitHandler<SearchInputType> = async (data) => {
    setLoading(true);
    const result = await searchResult(data);
    setResult(result);
    setLoading(false);
  };

  return (
    <>
      <form
        className={`flex gap-1 w-full rounded-2xl items-center bg-gray${bg} text-grayMiddle px-2 py-1 relative`}
        style={{ padding: `${paddingH}px 0` }}
        ref={searchRef}
        onSubmit={handleSubmit(handleSearchUser)}
      >
        <IoIosSearch
          className={`cursor-pointer text-2xl text-grayMiddle ${showResult ? 'fade-out' : 'fade-in'} ${preIcon}`}
        />
        <Input
          type="text"
          name="searchUser"
          classes="w-full h-full bg-transparent outline-none border-none font-roboto font-regular grayMiddle"
          min={1}
          placeholder="Search a user"
          autoComplete="off"
          register={register}
        />
        <Button
          loading={loading}
          Spinner={{ color: 'black', w: '23px', h: '23px' }}
          type="submit"
          classes={preIcon ?? showResult ? 'fade-in' : 'fade-out'}
        >
          <IoIosSearch
            className={`cursor-pointer text-2xl text-grayMiddle desktop:${showResult ? 'fade-in' : 'fade-out'}`}
          />
        </Button>
        {showResult && (
          <SearchResultNode result={result} classes="hidden desktop:block absolute bottom-0 top-[2.2rem] left-0 p-2" />
        )}
      </form>
      {pathname !== '/' && (
        <div className="block desktop:hidden w-full h-full relative">
          <SearchResultNode result={result} classes="min-h-[50vh] w-3/4 p-0 mt-2 border-0" />
        </div>
      )}
    </>
  );
};

export default SearchBox;
