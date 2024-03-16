import React, { useState } from 'react';

const CarbonFootprintCal = () => {
    const [petrolLitres, setPetrolLitres] = useState('');
    const [dieselLitres, setDieselLitres] = useState('');
    const [cngLitres, setCngLitres] = useState('');
    const [electricityUnits, setElectricityUnits] = useState('');
    // const [plasticItemsPerDay, setPlasticItemsPerDay] = useState('');
    // const [fixedPlasticWeight, setFixedPlasticWeight] = useState('');
    const [petrolUsers, setPetrolUsers] = useState(0);
    const [dieselUsers, setDieselUsers] = useState(0);
    const [cngUsers, setCngUsers] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    // const [results, setResults] = useState(null);
    const [plasticWaste, setPlasticWaste] = useState('');
    const [eWaste, setEWaste] = useState('');
    const [textileWaste, setTextileWaste] = useState('');
    const [organicWaste, setOrganicWaste] = useState('');
    const [glassWaste, setGlassWaste] = useState('');
    const [metalWaste, setMetalWaste] = useState('');
    const [hazardousWaste, setHazardousWaste] = useState('');
    const [results, setResults] = useState(null);

    const calculateFootprint = () => {
        let totalCarbonFootprint = 0;

        selectedOptions.forEach(option => {
            switch (option) {
                case 'petrol':
                    const CARBON_PER_LITRE_PETROL = 2.31;
                    const totalCarbonPetrol = (petrolLitres * CARBON_PER_LITRE_PETROL) * petrolUsers;
                    totalCarbonFootprint += totalCarbonPetrol;
                    break;
                case 'diesel':
                    const CARBON_PER_LITRE_DIESEL = 2.68;
                    const totalCarbonDiesel = (dieselLitres * CARBON_PER_LITRE_DIESEL) * dieselUsers;
                    totalCarbonFootprint += totalCarbonDiesel;
                    break;
                case 'cng':
                    const CARBON_PER_LITRE_CNG = 2.00; // Example value for CNG carbon emission per litre
                    const totalCarbonCNG = cngLitres * CARBON_PER_LITRE_CNG * cngUsers;
                    totalCarbonFootprint += totalCarbonCNG;
                    break;
                default:
                    break;
            }
        });

        const CARBON_PER_KWH_ELECTRICITY = 0.494;
        // const AVERAGE_PLASTIC_WEIGHT_PER_ITEM = 0.0025;

        const totalCarbonElectricity = electricityUnits * CARBON_PER_KWH_ELECTRICITY;
        const totalPlasticWeight = (plasticWaste * 6) +
        (eWaste * 8) +
        (textileWaste * 9) +
        (organicWaste * 0.8) +
        (glassWaste * 0.5) +
        (metalWaste * 1.5) +
        (hazardousWaste * 10);

        totalCarbonFootprint += totalCarbonElectricity;

        setResults({
            totalCarbonFootprint,
            totalPlasticWeight
        });
    };

    return (
        <div>
            <h1>Carbon Footprint Calculator</h1>
            <div>
                <label>Petrol</label>
                <input
                    type="checkbox"
                    checked={selectedOptions.includes('petrol')}
                    onChange={() => {
                        if (selectedOptions.includes('petrol')) {
                            setSelectedOptions(selectedOptions.filter(option => option !== 'petrol'));
                        } else {
                            setSelectedOptions([...selectedOptions, 'petrol']);
                        }
                    }}
                />
                {selectedOptions.includes('petrol') && (
                    <div>
                        <label>Petrol Litres Monthly:</label>
                        <input
                            type="number"
                            value={petrolLitres}
                            onChange={(e) => setPetrolLitres(e.target.value)}
                        />
                        <label>Petrol Users:</label>
                        <input
                            type="number"
                            value={petrolUsers}
                            onChange={(e) => setPetrolUsers(e.target.value)}
                        />
                    </div>
                )}
            </div>
            <div>
                <label>Diesel</label>
                <input
                    type="checkbox"
                    checked={selectedOptions.includes('diesel')}
                    onChange={() => {
                        if (selectedOptions.includes('diesel')) {
                            setSelectedOptions(selectedOptions.filter(option => option !== 'diesel'));
                        } else {
                            setSelectedOptions([...selectedOptions, 'diesel']);
                        }
                    }}
                />
                {selectedOptions.includes('diesel') && (
                    <div>
                        <label>Diesel Litres Monthly:</label>
                        <input
                            type="number"
                            value={dieselLitres}
                            onChange={(e) => setDieselLitres(e.target.value)}
                        />
                        <label>Diesel Users:</label>
                        <input
                            type="number"
                            value={dieselUsers}
                            onChange={(e) => setDieselUsers(e.target.value)}
                        />
                    </div>
                )}
            </div>
            <div>
                <label>CNG</label>
                <input
                    type="checkbox"
                    checked={selectedOptions.includes('cng')}
                    onChange={() => {
                        if (selectedOptions.includes('cng')) {
                            setSelectedOptions(selectedOptions.filter(option => option !== 'cng'));
                        } else {
                            setSelectedOptions([...selectedOptions, 'cng']);
                        }
                    }}
                />
                {selectedOptions.includes('cng') && (
                    <div>
                        <label>CNG Litres Monthly:</label>
                        <input
                            type="number"
                            value={cngLitres}
                            onChange={(e) => setCngLitres(e.target.value)}
                        />
                        <label>CNG Users:</label>
                        <input
                            type="number"
                            value={cngUsers}
                            onChange={(e) => setCngUsers(e.target.value)}
                        />
                    </div>
                )}
            </div>
            {/* Additional Fields */}
            <div>
                <label>Electricity Units Monthly (kWh):</label>
                <input
                    type="number"
                    value={electricityUnits}
                    onChange={(e) => setElectricityUnits(e.target.value)}
                />
            </div>
            {/* <div>
                <label>Plastic Items Per Day:</label>
                <input
                    type="number"
                    value={plasticItemsPerDay}
                    onChange={(e) => setPlasticItemsPerDay(e.target.value)}
                />
            </div>
            <div>
                <label>Fixed Plastic Weight Monthly (kg):</label>
                <input
                    type="number"
                    value={fixedPlasticWeight}
                    onChange={(e) => setFixedPlasticWeight(e.target.value)}
                />
            </div> */}
            <div>
                <label>Plastic Waste (kg):</label>
                <input type="number" value={plasticWaste} onChange={(e) => setPlasticWaste(e.target.value)} />
            </div>
            <div>
                <label>E-Waste (kg):</label>
                <input type="number" value={eWaste} onChange={(e) => setEWaste(e.target.value)} />
            </div>
            <div>
                <label>Textile Waste (kg):</label>
                <input type="number" value={textileWaste} onChange={(e) => setTextileWaste(e.target.value)} />
            </div>
            <div>
                <label>Organic Waste (kg):</label>
                <input type="number" value={organicWaste} onChange={(e) => setOrganicWaste(e.target.value)} />
            </div>
            <div>
                <label>Glass Waste (kg):</label>
                <input type="number" value={glassWaste} onChange={(e) => setGlassWaste(e.target.value)} />
            </div>
            <div>
                <label>Metal Waste (kg):</label>
                <input type="number" value={metalWaste} onChange={(e) => setMetalWaste(e.target.value)} />
            </div>
            <div>
                <label>Hazardous Waste (kg):</label>
                <input type="number" value={hazardousWaste} onChange={(e) => setHazardousWaste(e.target.value)} />
            </div>
            <button onClick={calculateFootprint}>Calculate</button>
            {results && (
                <div>
                    <h2>Results:</h2>
                    <p>Total Carbon Footprint: {results.totalCarbonFootprint} kg CO2</p>
                    <p>Suggestion -</p>
                    <p>Electric Vehicle</p>
                    <p>Total Plastic Weight: {results.totalPlasticWeight} kg</p>
                </div>
            )}
        </div>
    );
}

export default CarbonFootprintCal;
