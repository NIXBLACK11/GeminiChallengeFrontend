import { About } from "../components/About"
import { ResumeInput } from "../components/ResumeInput"

export const Home = () => {
    return (
        <div className="container mx-auto pt-12">
            <div className="grid grid-rows-2 gap-4">
                <div className="bg-gray-700 text-white h-20 p-6 mb-0" style={{borderRadius:"10px"}}>
                    <About/>
                </div>
                <div className="bg-gray-700 text-white" style={{borderRadius:"10px"}}>
                    <ResumeInput/>
                </div>
            </div>
        </div>
    )
}