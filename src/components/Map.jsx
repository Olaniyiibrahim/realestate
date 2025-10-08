import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { propertyDetailsData } from "../pages/properties/propertyData"

export default function Map() {
    // Get all valid locations from property data
    const locations = propertyDetailsData
        .map((property) => property.location)
        .filter((location) => location && Array.isArray(location) && location.length >= 2);
    
    // Use the first valid location as the center, or provide a default
    const centerPosition = locations.length > 0 ? locations[0] : [51.505, -0.09];
    
    // console.log("All locations:", locations);
    // console.log("Center position:", centerPosition);
    // console.log("Property data:", propertyDetailsData);
    
    return (
        <div className="w-[100%] h-[100%] md:h-[700px] md:w-[750px] overflow-hidden border border-gray-300">
            <MapContainer 
                center={centerPosition} 
                zoom={12} 
                scrollWheelZoom={false}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Render a marker for each valid property location */}
                {locations.map((location, index) => (
                    <Marker key={index} position={location}>
                        <Popup>
                            Property {index + 1}<br />
                            Location: {location[0]?.toFixed(4)}, {location[1]?.toFixed(4)}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}