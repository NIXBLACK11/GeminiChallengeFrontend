import { useState } from "react";
import { pdfjs } from "react-pdf";
import { getLinks } from "../backendCalls/getLinks";
import { Links } from "../interfaces/linkInterface";
import { LinkResponse } from "../backendCalls/getLinks";
import { RenderLinks } from "./RenderLinks";
import { Alert } from "./Alert";

pdfjs.GlobalWorkerOptions.workerSrc = "/js/pdf.worker.min.mjs";

export const ResumeInput = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [pdfText, setPdfText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [links, setLinks] = useState<Links[] | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const fetchProcessLinks = async () => {
        if(pdfText=="") {
            setShowAlert(true);
            setTimeout(() => {setShowAlert(false)}, 5000);
            return
        }
        setLoading(true);
        const response: LinkResponse = await getLinks(pdfText, tags);
        setLoading(false);

        if (response.success && response.data) {
            setLinks(response.data);
        } else {
            console.error('Error:', response.error);
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = async () => {
                const typedArray = new Uint8Array(fileReader.result as ArrayBuffer);
                const pdf = await pdfjs.getDocument(typedArray).promise;
                let text = "";
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const pageText = await page.getTextContent();
                    pageText.items.forEach((item: any) => {
                        text += item.str + " ";
                    });
                }
                setPdfText(text);
            };
            fileReader.readAsArrayBuffer(file);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
            if (!tags.includes(inputValue.trim())) {
                setTags([...tags, inputValue.trim()]);
                setInputValue("");
            }
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <>
        {showAlert && <Alert/>}
            <div>
                <form className="flex items-center max-w-lg mx-auto">   
                    <label htmlFor="voice-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"/>
                            </svg>
                        </div>

                        <input
                            id="resumeInput"
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter location, skills, and other preferences..." required 
                        />
                        <div className="mt-2 flex flex-wrap">
                            {tags.map((tag, index) => (
                                <div key={index} className="m-1 flex items-center bg-gray-200 rounded-full px-2 py-1 text-xs h-6 text-gray-950">
                                    <span>{tag}</span>
                                    <button className="ml-2 text-gray-700 hover:text-gray-950" onClick={() => removeTag(index)}>
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                        
                        <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"/>
                            </svg>
                        </button>
                    </div>
                    <button 
                        type="submit" 
                        className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={fetchProcessLinks}
                    >
                        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>Search
                    </button>
                </form>
            </div>


            {/* -------------------------------------- */}
            <div className="text-center">
                <div>
                    <div className="m-4 flex flex-col items-center">
                        <label className="block mb-1 text-xs font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                            Upload file
                        </label>
                        <input
                            className="block w-1/3 h-6 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="file_input"
                            type="file"
                            onChange={handleFileUpload}
                            />
                    </div>
                </div>
                <div className="m-4 flex flex-col items-center">
                    <label className="block mb-1 text-xs font-medium text-gray-900 dark:text-white" htmlFor="resumeInput">
                        Enter tags
                    </label>
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
                                <button className="ml-2 text-gray-700 hover:text-gray-950" onClick={() => removeTag(index)}>
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <button 
                    className="text-black myButton w-24" 
                    onClick={fetchProcessLinks}
                    >
                    Search !!
                </button>
                {loading && <div className="text-white">Loading...</div>}
                {links && <RenderLinks links={links} />}
            </div>
        </>
    );
};
