import {
    ContentProvider,
    ContzaImage,
    ContzaList,
    ContzaText,
    useContzaFields,
} from "@contza/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { Fragment } from "react";

const Home = () => {
    const { boolean } = useContzaFields();

    const isChecked = boolean("isChecked");

    return (
        <div className="space-y-20 pb-20">
            <div className={isChecked ? "bg-purple-800 text-white" : "bg-black text-white"}>
                <div className="section text-center py-40">
                    <h1 className="text-5xl font-bold mb-8">
                        <ContzaText>Heading</ContzaText>
                    </h1>
                    <ContzaText>Heading description</ContzaText>
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
                        <Link
                            href="/blog"
                            className="inline-block text-center bg-black rounded-xl text-white px-4 py-2.5"
                        >
                            Go to page
                        </Link>
                    </div>
                    <div className="col-span-1 space-y-8">
                        <ContzaImage className="shadow-2xl rounded-2xl">Section image</ContzaImage>
                        <ContzaImage name="Section image 2" className="shadow-2xl rounded-2xl" />
                    </div>
                </div>
            </div>
            <div className="section space-y-20">
                <ContzaList name="Sections" as={Fragment}>
                    {(listKey, index) => (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                            <div className="col-span-1">
                                <h1 className="text-4xl font-bold mb-5">
                                    {index + 1}. <ContzaText>Section heading</ContzaText>
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
                    )}
                </ContzaList>
            </div>
        </div>
    );
};

export default function Page() {
    return (
        <ContentProvider slug="home">
            <Home />
        </ContentProvider>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {},
    };
};
