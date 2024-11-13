import { About } from "../components/About"
import { SearchBar } from "../components/SeacrhBar"
export const Home = () => {
    return (
        <div className="container mx-auto pt-12">
            <div>
                <div className="" style={{borderRadius: "10px"}}>
                    <About/>
                </div>
                <div className="" style={{borderRadius: "10px"}}>
                    <SearchBar/>
                </div>
            </div>
        </div>
    )
}