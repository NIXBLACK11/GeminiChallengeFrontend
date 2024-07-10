import { About } from "../components/About"
import { ResumeInput } from "../components/ResumeInput"

export const Home = () => {
    return (
        <div className="container mx-auto pt-12">
            <div>
                <div className="bg-gray-700" style={{borderRadius: "10px", backgroundColor: "#403F47"}}>
                    <About/>
                </div>
                <div className="bg-gray-700 " style={{borderRadius:"10px"}}>
                    <ResumeInput/>
                </div>
            </div>
        </div>
    )
}