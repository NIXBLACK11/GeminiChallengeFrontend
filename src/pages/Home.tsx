import { About } from "../components/About"
import { ResumeInput } from "../components/ResumeInput"
export const Home = () => {
    return (
        <div className="container mx-auto pt-12">
            <div>
                <div className="" style={{borderRadius: "10px"}}>
                    <About/>
                </div>
                <div className="" style={{borderRadius: "10px"}}>
                    <ResumeInput/>
                </div>
            </div>
        </div>
    )
}