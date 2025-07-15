import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { getUser } from '@/actions/user/getUser';

const f = createUploadthing();

const handleAuth = async () => {
    const { user } = await getUser();
    if (!user?.id) throw new Error('unauth');
    return { user };
};

export const ourFileRouter = {
    coverImage: f({ image: { maxFileSize: '2MB', maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
    menuPDF: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;