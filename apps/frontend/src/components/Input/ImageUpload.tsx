import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import Box from "@mui/material/Box";
import { Text } from "@components/Text/TextComponent";
import style from "../../styles/style.module.scss";

export function ImageUpload(): {component: React.ReactNode, selectedFile: File} {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileUpload = async (file) => {
        // Optional: Resize and compress the image
        // const resizedFile = await resizeFile(file); // Adjust dimensions as needed

        // Create a FormData object and append the file
        const formData = new FormData();
        // formData.append('image', resizedFile);

        // Send the file to the server (you should have a server endpoint to handle uploads)
        try {
            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle the response from the server (e.g., show a success message)
            console.log('Image upload response:', response.data);
        } catch (error) {
            // Handle errors (e.g., display an error message)
            console.error('Image upload error:', error);
        }
    };

    // const component = <Box
    //     component={"div"}
    //     sx={{
    //         borderRadius: style.borderRadiusMd,
    //         boxShadow: (theme) => `inset 0 0 0 1px ${theme.palette.text.primary}`,
    //     }}
    //     display={"flex"}
    //     flexDirection={"column"}
    //     alignItems={"center"}
    //     justifyContent={"center"}
    //     minHeight={"200px"}
    //     textAlign={"center"}
    //     // marginX={"8px"}
    // >
    //     <Dropzone onDrop={(acceptedFiles) => setSelectedFile(acceptedFiles[0])}>
    //         {({ getRootProps, getInputProps }) => (
    //             <div{...getRootProps()}>
    //                 <input {...getInputProps()} />
    //                 <Text.Subtitle1>
    //                     Drag & drop an image
    //                 </Text.Subtitle1>
    //                 <Text.Subtitle1>
    //                     or
    //                 </Text.Subtitle1>
    //                 <Text.Subtitle1>
    //                     Click to select one
    //                 </Text.Subtitle1>
    //             </div>
    //         )}
    //     </Dropzone>
    //     {selectedFile && (
    //         <div>
    //             <img src={URL.createObjectURL(selectedFile)} alt="Selected" />
    //         </div>
    //     )}
    // </Box>;

    const component = <>
        <Dropzone onDrop={(acceptedFiles) => setSelectedFile(acceptedFiles[0])}>
            { ({ getRootProps, getInputProps }) => (
                <Box
                    component={"div"}
                    sx={{
                        borderRadius: style.borderRadiusMd,
                        boxShadow: (theme) => `inset 0 0 0 1px ${theme.palette.text.primary}`,
                    }}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    height={"150px"}
                    width={"150px"}
                    textAlign={"center"}
                    {...getRootProps()}
                >
                    {selectedFile === null ?
                        <>
                            <input {...getInputProps()} />
                            <Text.Subtitle1>
                                Files: .png, .jpg, .mp4, <br/>
                                Drag & drop <br/>
                                or Click to select
                            </Text.Subtitle1>
                            {/*<Text.Subtitle1>*/}
                            {/*    */}
                            {/*</Text.Subtitle1>*/}
                            {/*<Text.Subtitle1>*/}
                            {/*    */}
                            {/*</Text.Subtitle1>*/}
                        </>
                        : <img
                            style={{
                                width:"inherit",
                                height:"inherit",
                            }}
                            src={URL.createObjectURL(selectedFile)}
                            alt="Selected"
                        />
                    }
                </Box>
            )}
        </Dropzone>
    </>;

    return {component, selectedFile};
}