import { useState, useEffect } from 'react';
import './Marketplace.css';
import Map from './Map';
import { useUser } from './contexts/UserContext';
import { getListings, getRepairShops } from './services/api';
import { useNavigate } from "react-router-dom";

const Marketplace = () => {
	const navigate = useNavigate();
	const [repairShopLocations, setRepairShopLocations] = useState([]);
	const [listingLocations, setListingLocations] = useState([]);
	const [filter, setFilter] = useState('All');
	const allLocations = [...repairShopLocations, ...listingLocations];
	//for the sake of time and not having the capacity to import every single mobile phone shop, 44.029841175986064, -79.44301575173955 will be where you live lol
    const [userLocation, setUserLocation] = useState([44.029841175986064, -79.44301575173955])
    const { token } = useUser();

    useEffect(() => {
    const loadMapLocations = async () => {
        if (token){
            const repairShops = await getRepairShops(token);
            const listings = await getListings(token);
            console.log(repairShops)
            console.log(listings)
            setRepairShopLocations(repairShops.map(repairShop => ({
                id: repairShop._id,
                title: repairShop.title,
                details: repairShop.details,
                location: repairShop.location,
            })));
            setListingLocations(listings.map(listing => ({
                id: listing._id,
                title: listing.title,
                user: listing.user,
                details: listing.details,
                location: listing.location,
            })));
        }   
    }
    loadMapLocations();
    }, [token]);

		return (
			<div className="marketplace-container">
				<div className='controls'>
					<div className='filter-bar'>
							<button className='hero-button' onClick={() => setFilter('All')}>All</button>
							<button className='hero-button' onClick={() => setFilter('RepairShops')}>Repair Shops</button>
							<button className='hero-button' onClick={() => setFilter('Listings')}>Listings</button>
							<button className='hero-button filter-bar-back-button' onClick={() => navigate('/')}>Back to dashboard</button>
					</div>
					<div className="marketplace">
							<div className="location-grid">
									{(filter === 'All' || filter === 'RepairShops') && repairShopLocations.map((location) => (
													<div className="location-card" key={location.id}>
															<h2 className="location-title">{location.title}</h2>
															<p className="location-description">{location.details}</p>
													</div>
									))}
									{(filter === 'All' || filter === 'Listings') && listingLocations.map((location) => (
													<div className="location-card" key={location.id}>
															<h2 className="location-title">{location.title}</h2>
															<p className="location-user">{location.user}</p>
															<p className="location-description">{location.details}</p>
													</div>
									))}
							</div>
					</div>
				</div>
				<Map 
						className='map'
						repairShopLocations={repairShopLocations}
						listingLocations={listingLocations}
						allLocations={allLocations}
						userLocation={userLocation}
				/>
			</div>
		);
};

export default Marketplace;