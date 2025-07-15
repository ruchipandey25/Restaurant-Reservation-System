"use client"

import { Button } from "@/components/ui/button"
import {
    CommandDialog,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Home,
    SearchIcon,
    SlidersHorizontal
} from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Restaurant } from "@prisma/client"

export default function SearchBar({ restaurants }: { restaurants: Restaurant[] }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => {
            document.removeEventListener('keydown', down);
        };
    }, []);

    const handleSearch = () => {
    }

    return (

        <>
            <div className="flex max-w-5xl items-center space-x-2 w-full">
                <div className="w-full">
                    <button
                        className="w-full h-14 px-2 flex bg-white items-center justify-between space-x-2 border-2 rounded-md"
                        onClick={() => setOpen(!open)}
                    >
                        <div className="flex gap-2">
                            <SearchIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                            <p className="text-sm font-semibold transition text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
                                What do you want to search?
                            </p>
                        </div>
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
                            <span className="text-xs ">⌘</span>K
                        </kbd>
                    </button>
                    <CommandDialog open={open} onOpenChange={setOpen}>
                        <CommandInput placeholder="Search all channels and members" />
                        <CommandList>
                            <CommandEmpty>No Result Found</CommandEmpty>
                            {restaurants?.map(({ name, coverImage, id, location }) => (
                                <CommandItem
                                    className='cursor-pointer'
                                    key={id}
                                >
                                    <div
                                        className="relative flex mx-3 h-[48px] w-[48px] bg-[#252B2E] items-center justify-center rounded-full overflow-hidden"
                                    >
                                        {coverImage ?
                                            <Image
                                                fill
                                                src={coverImage}
                                                alt="CoverImage" /> :
                                            <Home className="text-slate-400" />}
                                    </div>
                                    <div className='flex flex-col'>
                                        <span>
                                            {name}
                                        </span>
                                        <span className='text-xs text-slate-400'>{location}</span>
                                    </div>

                                </CommandItem>
                            ))
                            }
                        </CommandList>
                    </CommandDialog>
                </div>
                <Button className="text-gray-400 h-14">
                    <SlidersHorizontal />
                </Button>
            </div>
        </>
    )
}