import { ContentProvider, ContzaText } from "@contza/react";
import { contzaClient } from "../../utils/contzaClient";

const Index = async () => {
    const content = await contzaClient.findOne("home");

    return (
        <ContentProvider slug="home" initialContent={content}>
            <div className="bg-black text-white">
                <div className="section text-center py-40">
                    <h1 className="text-5xl font-bold mb-8">
                        <ContzaText>Heading</ContzaText>
                    </h1>
                    <ContzaText>Heading description</ContzaText>
                </div>
            </div>
        </ContentProvider>
    );
};

export default Index;
