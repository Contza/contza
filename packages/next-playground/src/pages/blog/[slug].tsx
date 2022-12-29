import { contza } from "../../utils/contza";
import { ContzaText, ContzaContent, ContentProvider, ContzaRichText } from "@contza/react";
import { GetServerSideProps, NextPage } from "next";

const BlogPost: NextPage<{ content: ContzaContent }> = ({ content }) => {
    return (
        <ContentProvider content={content}>
            <div className="bg-black text-white">
                <div className="section text-center py-24">
                    <h1 className="text-5xl font-bold">
                        <ContzaText>Title</ContzaText>
                    </h1>
                </div>
            </div>
            <div className="section py-20">
                <div className="prose prose-md max-w-full">
                    <ContzaRichText>Content</ContzaRichText>
                </div>
            </div>
        </ContentProvider>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const locale = context.locale;
    const slug = context.params?.slug as string;
    const content = await contza.findOne(`blog/${slug}`, { locale });

    return {
        props: {
            content,
        },
    };
};

export default BlogPost;
