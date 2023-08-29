import {useEffect, useState} from "react";
import LocationService from "../../Service/LocationService.service";

const Dashboard = () => {

    const [locationList, setLocationList] = useState([])

    useEffect(() => {
        LocationService.getAllLocations().then((response) => {
            setLocationList(response.data)
        });
    }, []);

    return (
        <div className="container">
            <div className="card-body">
                {locationList.length === 0 ? (
                    <p>No trips have been created.</p>
                ) : (
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date Travelled</th>
                            <th scope="col">Start City</th>
                            <th scope="col">Start Country</th>
                            <th scope="col">End City</th>
                            <th scope="col">End Country</th>
                        </tr>
                        </thead>
                        <tbody>

                        {locationList.map((item, index) => (
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.dateTravelled}</td>
                                <td>{item.newStartCity}</td>
                                <td>{item.startCountry}</td>
                                <td>{item.newEndCity}</td>
                                <td>{item.endCountry}</td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
export default Dashboard;