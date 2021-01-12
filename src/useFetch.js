import { useState, useEffect } from "react";
import axios from "axios";

const constantParams = {
    exc: "login",
    results: 5,
    seed: "fabc",
};

let variableParams = {
    gender: "all",
    nat: "",
    page: 1,
};

function parseDataFromAPI(data) {
    const parsedData = data.map(
        (
            {
                location,
                name,
                email,
                cell,
                phone,
                registered,
                picture,
                dob,
                id,
            },
            i
        ) => {
            return {
                name: `${name.first} ${name.last}`,
                title: name.title,
                address: `${location.street.number} ${location.street.name} ${location.city} ${location.state}`,
                mobile: cell,
                age: dob.age,
                registered: registered.date.split("T")[0],
                photo: picture.large,
                // Use current index if value from API is null
                id: `${id.name}${id.value || i}`,
                email,
                phone,
            };
        }
    );
    return parsedData;
}

function buildDownloadLink(url) {
    let downloadLink = `${url}?`;
    const combinedParams = { ...variableParams, ...constantParams };
    for (const param in combinedParams) {
        downloadLink += `${param}=${combinedParams[param]}&`;
    }
    downloadLink += "format=csv&noinfo&dl";
    return downloadLink;
}

function useFetch() {
    const initialUrl = "https://randomuser.me/api";
    const [data, setData] = useState({
        downloadLink: buildDownloadLink(initialUrl),
        users: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function getUsers(axiosParams = variableParams) {
        setLoading(true);
        error !== "" && setError("");
        try {
            const { data: dataFromAPI } = await axios.get(initialUrl, {
                params: { ...axiosParams, ...constantParams },
            });
            if (dataFromAPI.error)
                throw new Error("Server error occurred, try again");
            const users = parseDataFromAPI(dataFromAPI.results);
            variableParams = { ...axiosParams };
            const downloadLink = buildDownloadLink(initialUrl);
            setData({
                ...data,
                users,
                downloadLink,
            });
        } catch (e) {
            console.error(e.message);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function setFilter(field, value) {
        // Clone variable params so the header in DashboardRight changes
        // only after users have been gotten from API
        const variableParamsCopy = { ...variableParams };
        switch (field) {
            case "page":
            case "nat":
            case "gender":
                variableParamsCopy[field] = value;
                // Go back to page 1 if filtering on other fields apart from "page"
                if (field !== "page") variableParamsCopy.page = 1;
                break;
            default:
                variableParamsCopy.page = 1;
                variableParamsCopy.nat = "";
                variableParamsCopy.gender = "all";
                break;
        }
        // Copy passed to getUsers function which updates variable params then sets new state
        getUsers(variableParamsCopy);
    }

    return {
        data: { ...data },
        params: { ...variableParams },
        setFilter,
        loading,
        error,
    };
}

export default useFetch;
