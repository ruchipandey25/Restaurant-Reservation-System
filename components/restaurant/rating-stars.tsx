import { IoStarSharp, IoStarHalfSharp } from "react-icons/io5";

interface RatingStarsProps {
    rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
                if (index < Math.floor(rating)) {
                    return (
                        <IoStarSharp
                            key={index}
                            className="w-6 h-6 text-yellow-500 mr-1"
                        />
                    );
                } else if (index < Math.ceil(rating)) {
                    return (
                        <IoStarHalfSharp
                            key={index}
                            className="w-6 h-6 text-yellow-500 mr-1"
                        />
                    );
                } else {
                    return (
                        <IoStarSharp
                            key={index}
                            className="w-6 h-6 text-gray-300 mr-1"
                        />
                    );
                }
            })}
            <span className="ml-2">{rating} / 5</span>
        </div>
    );
};

export default RatingStars;
