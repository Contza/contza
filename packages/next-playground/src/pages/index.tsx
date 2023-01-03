import { contza } from "../utils/contza";
import { ContentProvider, ContzaContent, ContzaImage, ContzaList, ContzaText } from "@contza/react";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { Fragment } from "react";

const Home: NextPage<{ content: ContzaContent }> = ({ content }) => {
    return (
        <ContentProvider content={content}>
            <div className="space-y-20 pb-20">
                <div className="bg-black text-white">
                    <div className="section text-center py-40">
                        <h1 className="text-5xl font-bold mb-8">
                            <ContzaText>Heading</ContzaText>
                        </h1>
                        <p className="text-2xl">
                            <ContzaText>Heading description</ContzaText>
                        </p>
                        <ContzaText isRaw={true}>Heading test</ContzaText>
                    </div>
                </div>
                <div className="section">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <div className="col-span-1">
                            <h1 className="text-4xl font-bold mb-5">
                                <ContzaText>Section heading</ContzaText>
                            </h1>
                            <p className="text-xl mb-5">
                                <ContzaText>Section description</ContzaText>
                            </p>
                            <ContzaList as="ul" name="Section items">
                                <li>
                                    <ContzaText>Section heading</ContzaText>
                                </li>
                            </ContzaList>
                            <Link href="/blog" passHref={true}>
                                <a className="inline-block text-center bg-black rounded-xl text-white px-4 py-2.5">
                                    Go to page
                                </a>
                            </Link>
                        </div>
                        <div className="col-span-1 space-y-8">
                            <ContzaImage name="Section image" className="shadow-2xl rounded-2xl" />
                            <ContzaImage
                                name="Section image 2"
                                className="shadow-2xl rounded-2xl"
                            />
                        </div>
                    </div>
                </div>
                <div className="section space-y-20">
                    <ContzaList name="Sections" as={Fragment}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                            <div className="col-span-1">
                                <h1 className="text-4xl font-bold mb-5">
                                    <ContzaText>Section heading</ContzaText>
                                </h1>
                                <p className="text-xl mb-5">
                                    <ContzaText>Section description</ContzaText>
                                </p>
                                <ContzaList as="ul" name="Section items">
                                    <li>
                                        <ContzaText>Title</ContzaText>
                                        <div className="ml-4">
                                            <ContzaList as="ul" name="Items">
                                                <li>
                                                    <ContzaText>Headline</ContzaText>
                                                </li>
                                            </ContzaList>
                                        </div>
                                    </li>
                                </ContzaList>
                            </div>
                            <div className="col-span-1">
                                <ContzaImage
                                    name="Section image"
                                    className="shadow-2xl rounded-2xl"
                                />
                            </div>
                        </div>
                    </ContzaList>
                </div>
            </div>
        </ContentProvider>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const locale = context.locale;
    const content = await contza.findOne("home", { locale });

    return {
        props: {
            content,
        },
    };
};

export default Home;
