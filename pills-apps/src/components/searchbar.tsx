import React, { useState } from 'react';
import axios from 'axios';
import { User } from '../classes/User';

interface Drug {
    id: string;
    medicineName: string;
    description?: string;
    startDate: Date;
    endDate?: Date;
    frequency: string;
    timeOfTheDay?: string;
    disclaimer?: string;
}

interface SearchBarProps {
    onSearchComplete: () => void;
    user: User;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchComplete, user}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Drug>();

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://api.fda.gov/drug/label.json?search=${query}`);
            const drugs = response.data.results.map((item: any) => ({
                id: item.id,
                medicineName: item.openfda.brand_name[0],
                startDate: new Date(), // Placeholder, replace with actual data if available
                endDate: undefined, // Placeholder, replace with actual data if available
                frequency: 'daily', // Placeholder, replace with actual data if available
                timeOfTheDay: 'morning', // Placeholder, replace with actual data if available
                disclaimer: item.disclaimer,
            }));

            setResults(drugs[0]);
            await postResults(drugs[0]);
            onSearchComplete();

        } catch (error) {
            console.error('Error fetching data from OpenFDA API', error);
        }
    };

    const postResults = async (drug:Drug) => {
        try {
            await fetch('http://localhost:3000/api/medicines', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(drug),
            });
            await fetch('http://localhost:3000/api/clients', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        prescriptionList:[...user.prescriptionList, drug]
                    }
                ),
            });
        } catch (error) {
            console.error('Error posting data to API', error);
        }
    };
    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a drug"
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {/* {results.map((drug) => (
                    <li key={drug.id}>
                        
                        <br />
                        {drug.medicineName} 
                        Frequency: {drug.frequency}, Time of the day: {drug.timeOfTheDay}
                        <br />
                        Disclaimer: {drug.disclaimer}
                    </li>
                ))} */}
            </ul>
        </div>
    );
};

export default SearchBar;