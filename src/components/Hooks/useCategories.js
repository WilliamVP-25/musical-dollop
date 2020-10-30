import React, {useState, useEffect} from 'react';
import axios from "../../config/axios";

const UseGroups = order => {
    const [groups, setGroups] = useState([]);
    const [loadingGroup, setLoadingGroup] = useState(false);

    useEffect(() => {
        const getGroups = async () => {
            setLoadingGroup(true)
            try {
                const response = await axios.get(`/api/groups`);
                if (response.data.groups) {
                    const groups = response.data.groups
                    setGroups(groups)
                }
            } catch (e) {
                setGroups(null)
            }
        }
        getGroups();
    }, []);

    return {
        groups, loadingGroup
    };
};
export default UseGroups;