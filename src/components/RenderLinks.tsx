import { Links } from "../interfaces/linkInterface";
import { Card } from "./Card";

interface RenderLinksProps {
    links: Links[];
}

export const RenderLinks: React.FC<RenderLinksProps> = ({ links }) => {
    return (
        <div>
            {links && (
                <div className="mt-4">
                    <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pb-5">
                        {links.map((link, index) => (
                            <Card 
                                key={index} 
                                Title={link.Title} 
                                Link={link.Link} 
                                Image={link.Image} 
                                Description={link.Description}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
