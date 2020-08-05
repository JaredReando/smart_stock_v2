export const SayHello = () => {
    console.log('Hello');
};
export const airtableFetch = async () => {
    const response = await fetch(
        `https://api.airtable.com/v0/appx9iHN3EuiygEw0/Returns%20(Header)`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            },
        },
    );
    const tables = await response.json();
    console.log('tables?', tables);
};
