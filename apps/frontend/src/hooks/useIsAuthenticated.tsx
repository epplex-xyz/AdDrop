import {useEffect, useState} from "react";
import {Supabase} from "@services/supabase";

export function useIsAuthenticated() {
    const [authenticated, setAuthenticated] = useState(false);
    const [data, setData] = useState<any>(null);

    const isAuthenticated = async () => {
        const res = await Supabase.auth.getSession();
        console.log("Res", res)
        if (res?.data?.session === null) {
            setAuthenticated(false)
        } else {
            setAuthenticated(true)
            setData(res.data.session.user)
        }
    }

    useEffect(() => {
        isAuthenticated().then();
    }, []);

    return {authenticated, data};
}
