import { Links } from "../interfaces/linkInterface";

interface RenderLinksProps {
    links: Links[];
}

export const RenderLinks: React.FC<RenderLinksProps> = ({ links }) => {
    return (
        <div>
            {links && (
                <div className="mt-4">
                    <p className="text-gray-900 dark:text-white text-sm">Links:</p>
                    <ul>
                        {links.map((link, index) => (
                            <li key={index}>
                                <a href={link.Link} target="_blank" rel="noopener noreferrer">
                                    {link.Title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
