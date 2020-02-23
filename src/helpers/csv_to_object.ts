import Papa from 'papaparse';

export const csvToObject = (csv: any) => Papa.parse(csv, { header: true}).data;