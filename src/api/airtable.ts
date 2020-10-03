export interface AirtableBinRecord {
    id: string;
    fields: {
        Bin: string;
        DESC: string;
        Description: string;
        ITEM: string;
        'Item Code': string;
    };
}

export interface AirtableFixBinResponse {
    offset?: string;
    records: Array<AirtableBinRecord>;
}

export async function getFixedBinPage(offsetToken?: string): Promise<AirtableFixBinResponse> {
    const nextPageToken = offsetToken ? `&offset=${offsetToken}` : '';
    return await fetch(
        `https://api.airtable.com/v0/appBSDPm29XAY4tNF/Fixed%20Bins?maxRecords=1300&view=Grid%20view${nextPageToken}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer key2IjB3h5YtqaUwc`,
            },
        },
    ).then(r => r.json());
}

export async function getAllFixedBins(): Promise<AirtableBinRecord[]> {
    let paginatedResponse = await getFixedBinPage();
    let allResponses = [...paginatedResponse.records];
    let nextPageExists = !!paginatedResponse.offset;
    while (nextPageExists) {
        const nextPageToken = paginatedResponse.offset ?? '';
        paginatedResponse = await getFixedBinPage(nextPageToken);
        allResponses.push(...paginatedResponse.records);
        nextPageExists = !!paginatedResponse.offset;
    }
    console.log('all resposes: ', allResponses);
    return allResponses;
}

getAllFixedBins();
