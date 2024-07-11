import { useState } from "react";
import { pdfjs } from "react-pdf";
// import { getLinks } from "../backendCalls/getLinks";
import { Links } from "../interfaces/linkInterface";
// import { LinkResponse } from "../backendCalls/getLinks";
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
        // const response: LinkResponse = await getLinks(pdfText, tags);
        setLoading(false);

        // if (response.success) {
        //     setLinks(response.data || []);
        //     // console.log(response.data)
        // } else {
        //     console.error('Error:', response.error);
        // }

        setLinks([{
            Title:"Intern",
            Link: "https://www.internsg.com/job/galxe-golang-engineer-intern/",
            Image: "https://picsum.photos/350/200",
            Description: "Postion open for a golang developer, remote workk, having a prior interview experience"
        },{
            Title:"Intern",
            Link: "https://www.internsg.com/job/galxe-golang-engineer-intern/",
            Image: "https://picsum.photos/350/200",
            Description: "Postion open for a golang developer, remote workk, having a prior interview experience"
        },{
            Title:"Intern",
            Link: "https://www.internsg.com/job/galxe-golang-engineer-intern/",
            Image: "https://picsum.photos/350/200",
            Description: "Postion open for a golang developer, remote workk, having a prior interview experience"
        },{
            Title:"Intern",
            Link: "https://www.internsg.com/job/galxe-golang-engineer-intern/",
            Image: "https://picsum.photos/350/200",
            Description: "Postion open for a golang developer, remote workk, having a prior interview experience"
        },{
            Title:"Intern",
            Link: "https://www.internsg.com/job/galxe-golang-engineer-intern/",
            Image: "https://picsum.photos/350/200",
            Description: "Postion open for a golang developer, remote workk, having a prior interview experience"
        },{
            Title:"Intern",
            Link: "https://www.internsg.com/job/galxe-golang-engineer-intern/",
            Image: "https://picsum.photos/350/200",
            Description: "Postion open for a golang developer, remote workk, having a prior interview experience"
        },{
            Title:"Intern",
            Link: "https://www.internsg.com/job/galxe-golang-engineer-intern/",
            Image: "https://picsum.photos/350/200",
            Description: "Postion open for a golang developer, remote workk, having a prior interview experience"
        },{
            Title:"Intern",
            Link: "https://www.internsg.com/job/galxe-golang-engineer-intern/",
            Image: "https://picsum.photos/350/200",
            Description: "Postion open for a golang developer, remote workk, having a prior interview experience"
        },{
            Title:"Intern",
            Link: "https://www.internsg.com/job/galxe-golang-engineer-intern/",
            Image: "https://picsum.photos/350/200",
            Description: "Postion open for a golang developer, remote workk, having a prior interview experience"
        }]);
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
                {loading && <div>Loading...</div>}
                {links && <RenderLinks links={links} />}
            </div>
        </>
    );
};
