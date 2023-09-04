import { contzaClient } from "../../utils/contzaClient";
import {
    ContzaText,
    ContentProvider,
    ContzaRichText,
    useContzaFields,
    ContzaContent,
} from "@contza/react";
import { GetServerSideProps, NextPage } from "next";

const BlogPost: NextPage<{ content: ContzaContent }> = ({ content }) => {
    return (
        <ContentProvider initialContent={content}>
            <div className="bg-black text-white">
                <div className="section text-center py-24">
                    <h1 className="text-5xl font-bold">
                        <ContzaText>Title</ContzaText>
                    </h1>
                    <Test />
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

const Test = () => {
    const { text } = useContzaFields();

    return (
        <div>
            <pre>
                <code dangerouslySetInnerHTML={{ __html: text`Hello` }} />
            </pre>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const locale = context.locale;
    const slug = context.params?.slug as string;
    const content = await contzaClient.findOne(`blog/${slug}`, { locale });

    return {
        props: {
            content,
        },
    };
};

export default BlogPost;
