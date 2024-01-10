"use client";

// pages/search.tsx
import react, { useState } from "react";
import Button from "../components/Button";

interface SearchResult {
  id: string;
  name: string;
}

interface FrostDateResult {
  prob_90: string;
  prob_80: string;
  prob_70: string;
  prob_60: string;
  prob_50: string;
  prob_40: string;
  prob_30: string;
  prob_20: string;
  prob_10: string;
}

const SearchPage = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [directionLat, setDirectionLat] = useState<"N" | "S">("N");
  const [directionLong, setDirectionLong] = useState<"E" | "W">("E");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null
  );
  const [activeButtonId, setActiveButtonId] = useState<number>(-1);
  const [targetStationId, setTargetStationId] = useState<string | null>(null);
  const [frostDateResults, setFrostDateResults] = useState<
    FrostDateResult[] | null
  >(null);
  const [season, setSeason] = useState<"1" | "2">("1");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    try {
      setFrostDateResults(null);

      // Start loading
      setLoading(true);

      // Determine whether to use positive or negative values based on user input
      const latMultiplier = directionLat === "N" ? 1 : -1;
      const longMultiplier = directionLong === "E" ? 1 : -1;

      // Calculate latitude and longitude with appropriate sign
      const adjustedLatitude = latMultiplier * (latitude || 0);
      const adjustedLongitude = longMultiplier * (longitude || 0);

      // Make the fetch request to the public API
      const response = await fetch(
        `https://api.farmsense.net/v1/frostdates/stations/?lat=${adjustedLatitude}&lon=${adjustedLongitude}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      // Parse the response as JSON
      const data: SearchResult[] = await response.json();

      // Set the search results
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      // Stop loading
      setLoading(false);
    }
    console.log("fetching...");
  };

  const chooseStation = (id: string, i: number) => {
    setFrostDateResults(null);

    setTargetStationId(id);
    setActiveButtonId(i);
  };

  const checkDate = async () => {
    try {
      setFrostDateResults(null);

      // Start loading
      setLoading(true);
      // Make the fetch request to the public API
      const response = await fetch(
        `https://api.farmsense.net/v1/frostdates/probabilities/?station=${targetStationId}&season=${season}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      // Parse the response as JSON
      const data: FrostDateResult[] = await response.json();

      // Set the search results
      setFrostDateResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      // Stop loading
      setLoading(false);
    }
    console.log("fetching...");
  };

  return (
    <>
      <h1 className="text-center text-5xl font-bold my-4">
        First/Last Frost Date
      </h1>

      <div className="px-24 py-12">
        <h2 className="text-3xl font-bold my-4">
          Identify Stations by Location
        </h2>
        <div className="">
          <label>
            <div className="label">
              <span className="label-text">Latitude</span>
            </div>
            <input
              type="number"
              value={latitude || ""}
              onChange={(e) => {
                setFrostDateResults(null);
                setSearchResults(null);

                setLatitude(parseFloat(e.target.value));
              }}
              className="input input-bordered max-w-xs mb-3 mr-3"
            />
            <select
              value={directionLat}
              onChange={(e) => {
                setFrostDateResults(null);
                setSearchResults(null);

                setDirectionLat(e.target.value as "N" | "S");
              }}
              className="select select-bordered"
            >
              <option value="N">N</option>
              <option value="S">S</option>
            </select>
          </label>
        </div>
        <div className="mb-3">
          <label>
            <div className="label">
              <span className="label-text">Longitude</span>
            </div>
            <input
              type="number"
              value={longitude || ""}
              onChange={(e) => {
                setFrostDateResults(null);
                setSearchResults(null);
                setLongitude(parseFloat(e.target.value));
              }}
              className="input input-bordered max-w-xs mb-3 mr-3"
            />
            <select
              value={directionLong}
              onChange={(e) => {
                setFrostDateResults(null);
                setSearchResults(null);

                setDirectionLong(e.target.value as "E" | "W");
              }}
              className="select select-bordered"
            >
              <option value="E">E</option>
              <option value="W">W</option>
            </select>
          </label>
        </div>
        <Button
          onClick={handleSearch}
          disabled={loading}
          text={loading ? "Searching..." : "Search"}
        />

        {/* Display search results */}
        {searchResults && (
          <div className="my-3">
            <h2 className="text-3xl font-bold my-4">
              Choose Your Local Station
            </h2>
            {/* Render your search results here */}
            {/* <pre>{JSON.stringify(searchResults, null, 2)}</pre> */}
            {/* Map each search result to a SearchResultItem component */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {searchResults.map((result, i) => (
                <Button
                  key={result.id}
                  text={result.name}
                  onClick={() => chooseStation(result.id, i)}
                  active={i === activeButtonId}
                />
              ))}
            </div>
            <h2 className="text-3xl font-bold my-4">Choose Season</h2>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <Button
                text="Last Frost Date in Spring"
                onClick={() => {
                  setFrostDateResults(null);
                  setSeason("1");
                }}
                active={season === "1"}
              />
              <Button
                text="First Frost Date in Fall"
                onClick={() => {
                  setFrostDateResults(null);
                  setSeason("2");
                }}
                active={season === "2"}
              />
            </div>

            <Button text="Check" onClick={checkDate} />
          </div>
        )}
        {frostDateResults && (
          <div className="my-3">
            <h2 className="text-3xl font-bold my-4">
              {season === "1" ? "Last" : "First"} Frost Date
            </h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>Probability</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <td>90%</td>
                    <td>
                      {frostDateResults[0].prob_90 === "0000"
                        ? "No Frost"
                        : `${frostDateResults[0].prob_90.slice(
                            0,
                            2
                          )}/${frostDateResults[0].prob_90.slice(2)}`}
                    </td>
                  </tr>
                  <tr>
                    <td>80%</td>
                    <td>
                      {frostDateResults[0].prob_80 === "0000"
                        ? "No Frost"
                        : `${frostDateResults[0].prob_80.slice(
                            0,
                            2
                          )}/${frostDateResults[0].prob_80.slice(2)}`}
                    </td>
                  </tr>
                  <tr>
                    <td>70%</td>
                    <td>
                      {frostDateResults[0].prob_70 === "0000"
                        ? "No Frost"
                        : `${frostDateResults[0].prob_70.slice(
                            0,
                            2
                          )}/${frostDateResults[0].prob_70.slice(2)}`}
                    </td>
                  </tr>
                  <tr>
                    <td>60%</td>
                    <td>
                      {frostDateResults[0].prob_60 === "0000"
                        ? "No Frost"
                        : `${frostDateResults[0].prob_60.slice(
                            0,
                            2
                          )}/${frostDateResults[0].prob_60.slice(2)}`}
                    </td>
                  </tr>
                  <tr>
                    <td>50%</td>
                    <td>
                      {frostDateResults[0].prob_50 === "0000"
                        ? "No Frost"
                        : `${frostDateResults[0].prob_50.slice(
                            2
                          )}/${frostDateResults[0].prob_50.slice(2, 5)}`}
                    </td>
                  </tr>
                  <tr>
                    <td>40%</td>
                    <td>
                      {frostDateResults[0].prob_40 === "0000"
                        ? "No Frost"
                        : `${frostDateResults[0].prob_40.slice(
                            0,
                            2
                          )}/${frostDateResults[0].prob_40.slice(2)}`}
                    </td>
                  </tr>
                  <tr>
                    <td>30%</td>
                    <td>
                      {frostDateResults[0].prob_30 === "0000"
                        ? "No Frost"
                        : `${frostDateResults[0].prob_30.slice(
                            0,
                            2
                          )}/${frostDateResults[0].prob_30.slice(2)}`}
                    </td>
                  </tr>
                  <tr>
                    <td>20%</td>
                    <td>
                      {frostDateResults[0].prob_20 === "0000"
                        ? "No Frost"
                        : `${frostDateResults[0].prob_20.slice(
                            0,
                            2
                          )}/${frostDateResults[0].prob_20.slice(2)}`}
                    </td>
                  </tr>
                  <tr>
                    <td>10%</td>
                    <td>
                      {frostDateResults[0].prob_10 === "0000"
                        ? "No Frost"
                        : `${frostDateResults[0].prob_10.slice(
                            0,
                            2
                          )}/${frostDateResults[0].prob_10.slice(2)}`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
