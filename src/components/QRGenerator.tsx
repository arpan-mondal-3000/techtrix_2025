import React, { useState } from "react";
import { QRCode } from "qrcode.react";

const QRGenerator: React.FC = () => {
  const [text, setText] = useState<string>("");

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 rounded-md"
      />
      <div className="p-4 border rounded-md">
        {text && <QRCode value={text} size={128} />}
      </div>
    </div>
  );
};

export default QRGenerator;
