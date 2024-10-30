// export const SearchBar = () => {
//     return <div className="flex h-screen w-screen justify-center items-center">
//         <div className="
//     group relative inline-flex h-11 animate-rainbow cursor-pointer items-center justify-center rounded-xl border-0 bg-[length: 200%] px-8 py-2 font-medium text-primary- foreground transition-colors [background-clip: padding-box, border-box, border-box] [background-origin: border-box] [border:calc(0.08*1rem)_solid_transparent] focus- visible:outline-none focus-visible: ring-1 focus-visible: ring-ring disabled: pointer- events-none disabled:opacity-50 before: absolute before:bottom- [-20% ] before:left-1/2 before:z-0 before: h-1/5 before: w-3/5 before: -translate-x-1/2 before: animate-rainbow before: bg-[linear-gradient (90deg, hsl(var (--color-1)), hsl(var(--color-5)), hsl(var(-- color-3)), hsl(var (--color-4)), hsl(var(--color-2)))] before: bg-[length: 200%] before: [filter:blur (calc (0.8*1rem))] bg-[linear-gradient (#121213, #121213), linear- gradient (#121213_50%,rgba(18,18,19,0.6)_80%, rgba(18,18,19,0)), linear-
//     gradient (90deg, hsl(var (--color-1)), hsl(var (--color-5)), hsl(var(--color-3)), hsl(var (-- color-4)), hsl(var (--color-2)))] dark: bg-[linear-gradient(#fff, #fff), linear- gradient(#fff 50%,rgba(255,255,255,0.6)_80%, rgba(0,0,0,0)), linear-
//     gradient (90deg, hsl(var (--color-1)), hsl(var (--color-5)), hsl(var(--color-3)), hsl(var(-- color-4)), hsl(var (--color-2)))]">
//             <div className="absolute  w-full h-full bg-black" style={{borderRadius: 13}}>
//                 scsac
//             </div>
//         </div>
//     </div>
// }

import { useState } from "react";
import { pdfjs } from "react-pdf";
import { getLinks } from "../backendCalls/getLinks";
import { Links } from "../interfaces/linkInterface";
import { LinkResponse } from "../backendCalls/getLinks";
import { RenderLinks } from "./RenderLinks";
import { Alert } from "./Alert";
import { IoSearch } from "react-icons/io5";
import { TbFileTypePdf } from "react-icons/tb";
import { PiFilePdfBold } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";

pdfjs.GlobalWorkerOptions.workerSrc = "/js/pdf.worker.min.mjs";

export const SearchBar = () => {
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
        <div className="flex flex-col justify-center items-center">
            {showAlert && <Alert/>}
            <div className="flex items-center w-full justify-center">
                <div className="relative w-3/5">
                    <div className="absolute inset-y-0 start-0 flex items-center p-3 pointer-events-none">
                        <img src="joblinker.png" width={100} className="absolute" />
                    </div>
                    <input 
                        type="text" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter tags and press enter" 
                        required value={inputValue} 
                        onChange={(e)=> setInputValue(e.target.value)} 
                        onKeyDown={handleKeyDown} 
                    />
                    <label className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer">
                        <input 
                            type="file" 
                            onChange={handleFileUpload} 
                            className="hidden" 
                        />
                        <PiFilePdfBold className="text-2xl text-[#c03535]" />
                    </label>
                </div>
                <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <FaSearch className="lg:mr-2" />
                    <p className="hidden lg:flex" onClick={fetchProcessLinks}>Search</p>
                </button>
            </div>
            <div className="mt-2 flex flex-wrap">
                {tags.map((tag, index) => (
                <div key={index} className="m-1 flex items-center bg-gray-200 rounded-full px-2 py-1 text-xs h-6 text-gray-950">
                    <span>{tag}</span>
                    <button className="ml-2 text-gray-700 hover:text-gray-950" onClick={()=> removeTag(index)}> &times;
                    </button>
                </div>
                ))}
            </div>
            {loading && <div className="text-white">Loading...</div>}
            {links && <RenderLinks links={links} />}
        </div>
    );
};