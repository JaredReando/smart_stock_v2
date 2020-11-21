import { AirtableBinRecord, AirtableFixBinResponse, FixedBinRecord } from '../constants/types';

export async function getFixedBinPage(offsetToken?: string): Promise<AirtableFixBinResponse> {
    const nextPageToken = offsetToken ? `&offset=${offsetToken}` : '';
    const noMissingItems = "&view=Grid%20view&filterByFormula=NOT(%7BITEM%7D+%3D+'')";
    return await fetch(
        `https://api.airtable.com/v0/appBSDPm29XAY4tNF/Fixed%20Bins?maxRecords=1300${nextPageToken}${noMissingItems}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer key2IjB3h5YtqaUwc`,
            },
        },
    ).then(r => r.json());
}

export async function getAllFixedBinPages(): Promise<AirtableBinRecord[]> {
    let paginatedResponse = await getFixedBinPage();
    let allResponses = [...paginatedResponse.records];
    let nextPageExists = !!paginatedResponse.offset;
    while (nextPageExists) {
        const nextPageToken = paginatedResponse.offset ?? '';
        paginatedResponse = await getFixedBinPage(nextPageToken);
        allResponses.push(...paginatedResponse.records);
        nextPageExists = !!paginatedResponse.offset;
    }
    return allResponses;
}

function formatBinObjects(bins: AirtableBinRecord[]): FixedBinRecord[] {
    return bins.map(bin => {
        return {
            id: bin.id,
            item: bin.fields.ITEM ?? '-',
            description: bin.fields.DESCRIPTION[0] ?? '--',
            bin: bin.fields.Bin,
            lastModified: bin.fields.LAST_MODIFIED,
        };
    });
}

export async function fetchAirtableFixedBins(): Promise<FixedBinRecord[]> {
    const fetchedBins = await getAllFixedBinPages();
    return formatBinObjects(fetchedBins);
}
