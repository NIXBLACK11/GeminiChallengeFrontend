import { Links } from "../interfaces/linkInterface";
import TiltWrapper from "./TiltWrapper";

export const Card: React.FC<Links> = ({ Title, Link, Image, Description }) => {
    return (
        <TiltWrapper options={{ max: 15, speed: 200 }}>
            <a href={Link} target="_blank" rel="noopener noreferrer">
                <div className="max-w border border-gray-200 rounded-lg bg-transparent">
                    <div className="flex justify-center items-center h-64 overflow-hidden rounded-t-lg m-4">
                        <img className="rounded-lg" style={{ height: "100%", width: "100%", objectFit: "cover" }} src={Image} alt={Title} />
                    </div>
                    <div className="p-1">
                        <a href={Link}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{Title}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{Description}</p>
                    </div>
                </div>
            </a>
        </TiltWrapper>
    );
};

// {/* <a href={Link} target="_blank" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//     Link to Job
//     <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
//     </svg>
// </a> */}