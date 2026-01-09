import React from "react";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";

const Genimg2 = () => {
    return (
        <IKContext
            publicKey="public_fsnLsKXvUh7akxVAunC53JvbhiQ="
            urlEndpoint="https://ik.imagekit.io/myproducts786"
            transformationPosition="path"
            authenticationEndpoint="http://localhost:5000/auth"
        >
            <IKImage
                path="/default-image.jpg"
                transformation={[
                    {
                        height: "300",
                        width: "400",
                    },
                ]}
            />
            <IKUpload fileName="my-upload" />
        </IKContext>
    );
};

export default Genimg2;
