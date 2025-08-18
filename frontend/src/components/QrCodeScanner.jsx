import React from "react";
import { useZxing } from "react-zxing";

const QrCodeScanner = ({ onScan }) => {
    const { ref } = useZxing({
        onDecodeResult(result) {
            onScan(result.getText());
        },
    });

    return (
        <div className="flex flex-col justify-center items-center">
            <video ref={ref} className="w-[300px] h-[300px]" />
        </div>
    );
};

export default QrCodeScanner;
