import { useState, useEffect } from "react";
import axios from "axios";

const axiosParams = {
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

function buildDownloadLink(initialUrl) {
    let downloadLink = `${initialUrl}&`;
    for (const param in axiosParams) {
        downloadLink += `${param}=${axiosParams[param]}&`;
    }
    downloadLink += "format=csv&noinfo&dl";
    return downloadLink;
}

function useFetch() {
    const initialUrl = "https://randomuser.me/api?exc=login&results=5";
    const [data, setData] = useState({
        downloadLink: `${initialUrl}&format=csv&noinfo&dl`,
        users: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function getUsers() {
        setLoading(true);
        error !== "" && setError("");
        try {
            const { data: dataFromAPI } = await axios.get(initialUrl, {
                params: axiosParams,
            });
            const users = parseDataFromAPI(dataFromAPI.results);
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
        switch (field) {
            case "page":
            case "nat":
            case "gender":
                axiosParams[field] = value;
                // Go back to page 1 if filtering on other fields apart from "page"
                if (field !== "page") axiosParams.page = 1;
                break;
            default:
                axiosParams.page = 1;
                axiosParams.nat = "";
                axiosParams.gender = "all";
                break;
        }
        getUsers();
    }

    return { ...data, ...axiosParams, setFilter, loading, error };
}

export default useFetch;
