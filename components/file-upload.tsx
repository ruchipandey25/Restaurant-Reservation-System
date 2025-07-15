'use client';
import { FC } from 'react';
import { FileIcon, X } from 'lucide-react';
import Image from 'next/image';

import { UploadDropzone } from '@/lib/uploadthing';

import '@uploadthing/react/styles.css';

interface fileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: 'coverImage' | 'menuPDF';
}

const FileUpload: FC<fileUploadProps> = ({ onChange, value, endpoint }) => {
    const fileType = value?.split('.').pop();

    if (value && fileType !== 'pdf') {
        return (
            <div className="relative w-40 h-40">
                <Image fill src={value} alt="Upload" />
                <button
                    onClick={() => onChange('')}
                    className="absolute top-0 right-0 p-1 text-white rounded-full shadow-sm bg-rose-500"
                    type="button"
                >
                    <X className="w-4 h-4"></X>
                </button>
            </div>
        );
    }

    if (value && fileType === 'pdf') {
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-mg bg-background/10">
                <FileIcon className="w-10 h-10 fill-indigo-200 stroke-indigo-400" />
                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                    {value}
                </a>
                <button
                    onClick={() => onChange('')}
                    className="absolute p-1 text-white rounded-full shadow-sm bg-rose-500 -top-2 -right-2"
                    type="button"
                >
                    <X className="w-4 h-4"></X>
                </button>
            </div>
        );
    }
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => console.log(error)}
        />
    );
};

export default FileUpload;