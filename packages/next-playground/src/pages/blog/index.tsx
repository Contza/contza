import { contzaClient } from "../../utils/contzaClient";
import { ContzaText, ContzaContent, ContentProvider } from "@contza/react";
import { GetServerSideProps, NextPage } from "next";

const Blog: NextPage<{ content: ContzaContent; posts: ContzaContent[]; navbar: ContzaContent }> = ({
    content,
    posts,
    navbar,
}) => {
    return (
        <ContentProvider initialContent={content}>
            <ContentProvider initialContent={navbar}>
                <div className="bg-black text-white font-medium text-lg">
                    <div className="section">
                        <div className="flex justify-center items-center space-x-4">
                            <p>
                                <ContzaText>Home</ContzaText>
                            </p>
                            <p>
                                <ContzaText>Blog</ContzaText>
                            </p>
                        </div>
                    </div>
                </div>
            </ContentProvider>
            <div className="bg-black text-white">
                <div className="section text-center py-24">
                    <h1 className="text-5xl font-bold">
                        <ContzaText>Heading</ContzaText>
                    </h1>
                </div>
            </div>
            <div className="section py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {posts.map((post, index) => (
                        <div key={index}>
                            <p>{post.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </ContentProvider>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const locale = context.locale;
    const content = await contzaClient.findOne("blog", { locale });
    const posts = await contzaClient.findMany("blog", { locale });
    const navbar = await contzaClient.findOne("navbar", { locale });

    return {
        props: {
            content,
            posts,
            navbar,
        },
    };
};

export default Blog;
