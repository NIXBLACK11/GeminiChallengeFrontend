import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";

export const ResumeInput = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [pdfText, setPdfText] = useState<string>("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            if (!tags.includes(inputValue.trim())) {
                setTags([...tags, inputValue.trim()]);
                setInputValue("");
            }
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileBuffer = await file.arrayBuffer();
            const pdfText = await extractTextFromPDF(fileBuffer);
            setPdfText(pdfText);
        }
    };

    const extractTextFromPDF = async (fileBuffer: ArrayBuffer) => {
        const pdf = await pdfjsLib.getDocument({ data: fileBuffer }).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            text += textContent.items.map((item: any) => item.str).join(" ") + " ";
        }
        return text;
    };

    return (
        <div className="text-center">
            <div>
                <div className="m-4 flex flex-col items-center">
                    <label className="block mb-1 text-xs font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                    <input
                        className="block w-1/3 h-6 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                        onChange={handleFileUpload}
                    />
                </div>
            </div>
            <div className="m-4 flex flex-col items-center">
                <label className="block mb-1 text-xs font-medium text-gray-900 dark:text-white" htmlFor="resumeInput">Enter tags</label>
                <input
                    id="resumeInput"
                    type="text"
                    className="block w-0.3 h-6 text-xs text-gray-950 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-950 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div className="mt-2 flex flex-wrap">
                    {tags.map((tag, index) => (
                        <div key={index} className="m-1 flex items-center bg-gray-200 rounded-full px-2 py-1 text-xs h-6 text-gray-950">
                            <span>{tag}</span>
                            <button
                                className="ml-2 text-gray-700 hover:text-gray-950"
                                onClick={() => removeTag(index)}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="text-gray-950 bg-slate-800 w-28 h-10 hover:bg-slate-950 hover:text-white"
                style={{ borderRadius: "20px" }}
            >
                Search !!
            </button>
            {pdfText && (
                <div className="mt-4">
                    <h2 className="text-sm font-medium text-gray-900 dark:text-white">Extracted Text:</h2>
                    <p className="text-xs text-gray-900 dark:text-white">{pdfText}</p>
                </div>
            )}
        </div>
    );
};
