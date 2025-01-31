import { useState } from "react";

export default function Rating() {
    const [hoveredIndex, setHoveredIndex] = useState(null); // Tracks the index of the hovered button

    const handleMouseEnter = (index) => setHoveredIndex(index); // Set hovered index on mouse enter
    const handleMouseLeave = () => setHoveredIndex(null); // Reset hovered index on mouse leave

    const handleAddRating = () => {

    }

    return (
        <div className="rating">
            {[0, 1, 2, 3, 4].map((index) => (
                <input
                    key={index}
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                    onMouseEnter={() => handleMouseEnter(index)} // Set hovered state for the specific button
                    onMouseLeave={handleMouseLeave}
                    onClick={handleAddRating}
                    checked={hoveredIndex === index} // Only the hovered radio button should be checked
                />
            ))}
        </div>
    );
}
