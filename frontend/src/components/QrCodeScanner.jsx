import React, { useRef } from "react";
import { useZxing } from "react-zxing";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jsQR from "jsqr";

const QrCodeScanner = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const { ref } = useZxing({
        onDecodeResult(result) {
            const id = result.getText();
            if (id) {
                navigate(`/vending-machine/${id}`);
            } else {
                toast.error("Invalid QR code.");
            }
        },
    });

    // Handle image upload and decode QR from image
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new window.Image();
            img.onload = function () {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.width, img.height);
                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                const code = jsQR(imageData.data, img.width, img.height);
                if (code && code.data) {
                    navigate(`/vending-machine/${code.data}`);
                } else {
                    toast.error("No QR code found in the image.");
                }
            };
            img.onerror = function () {
                toast.error("Failed to load image.");
            };
            img.src = e.target.result;
        };
        reader.onerror = function () {
            toast.error("Failed to read file.");
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="h-[88.5vh] flex flex-col justify-center items-center">
            <h1 className="text-3xl text-primary mb-4">Scan the Vending Machine QR</h1>
            <div className="flex flex-col justify-center items-center gap-4">
                <video ref={ref} className="w-[300px] h-[300px]" />
                <div>
                    <label
                        htmlFor="qr-upload"
                        className="bg-primary text-white px-4 py-2 rounded cursor-pointer"
                    >
                        Upload QR Image
                    </label>
                    <input
                        id="qr-upload"
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </div>
            </div>
        </div>
    );
};

export default QrCodeScanner;
