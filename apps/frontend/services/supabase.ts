import {createClient} from "@supabase/supabase-js";

export const Supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);


// automatically authenticated through supabase
// const test = async () => {
//     const { data, error } = await Supabase.auth.getSession()
//     console.log("DAta", data, error)
// }
// useEffect(() => {
//     test().then()
// }, [])

export async function signInWithOAuth(redirectUrl: string = "/") {
    const { data, error } = await Supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
            redirectTo: redirectUrl}
    });
    console.log("signIn res", data, error);

    if (error) throw error;

    return data;
}