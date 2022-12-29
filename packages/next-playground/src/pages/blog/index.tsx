import { contza } from "../../utils/contza";
import { ContzaText, ContzaContent, ContentProvider } from "@contza/react";
import { GetServerSideProps, NextPage } from "next";

const Blog: NextPage<{ content: ContzaContent; posts: ContzaContent[] }> = ({ content, posts }) => {
    return (
        <ContentProvider content={content}>
            <div className="bg-black text-white">
                <div className="section text-center py-24">
                    <h1 className="text-5xl font-bold">
                        <ContzaText>Heading</ContzaText>
                    </h1>
                </div>
            </div>
            <div className="section py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {posts.map((post) => (
                        <div key={post.originalSlug}>
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
    const content = await contza.findOne("blog", { locale });
    const posts = await contza.findMany("blog", { locale });

    return {
        props: {
            content,
            posts,
        },
    };
};

export default Blog;
