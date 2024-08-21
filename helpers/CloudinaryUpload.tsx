"use client";

import React, { useState, useRef } from 'react';
const CloudinaryUpload = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageUploading, setImageUploading] = useState(false);

    const [imageRecord, setImageRecord] = useState<any>(null);


    const handleFileinput = async () => {
        const file = fileInputRef.current!.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                setImageUploading(true);
                try {
                    const response = await fetch('/api/image/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ data: reader.result }),
                    });

                    const data = await response.json();

                    setImageRecord(data.image);
                    setImageUploading(false);
                } catch (e) {
                    console.error('Upload failed:', e);
                    setImageUploading(false);
                }
            }
        }
    }

    const invokeFileUpload = () => {
        fileInputRef.current!.click();
    };

    return {
        invokeFileUpload,
        imageUploading,
        imageRecord,
        CloudinaryUploadUI: <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileinput} />
    }
}

export default CloudinaryUpload;



/*

import { NextRequest, NextResponse as res } from 'next/server';
import { v2 as cloudinary } from "cloudinary";
import { insertNewImage } from '@/db/image';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const POST = async (req: NextRequest) => {

    // Parse the request body to get file.
    const json = await req.json();
    
    // If no file, return 400
    if (!json.data) return res.json({ error: "Input file not found" }, { status: 400 });
    
    try {
        const file = json.data;
        const uploadResponse = await cloudinary.uploader.upload(file, {
            // upload_preset: 'your_upload_preset',
            width: 361,
            height: 172,
            crop: 'crop', // Resize to 361x172
        });

        console.log(uploadResponse);
        
        const newImage = await insertNewImage(uploadResponse.public_id, uploadResponse.secure_url);

        return res.json({ message: 'Image successfully created.', image: newImage }, { status: 201 });
        
    } catch (e) {
        console.error('Upload error:', e);
        return res.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}

export { POST }

*/