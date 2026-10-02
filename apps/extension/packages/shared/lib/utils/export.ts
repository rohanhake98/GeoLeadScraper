import * as xlsx from 'xlsx';

import { DATA_EXPORT_FIELDS, DATA_EXPORT_FORMATS } from './../../enums';
import { dateformat } from './date';
import { arrayToCSV } from './format';

export const matchExportResults = (entries: string[]): string[] => {
  const values = Object.values(DATA_EXPORT_FIELDS);
  const fields: string[] = [];

  if (!Array.isArray(entries)) return fields;

  for (const entry of entries) {
    if (values.includes(entry)) {
      fields.push(entry);
    } else {
      continue;
    }
  }

  return fields;
};

export const filterExportResults = ({
  data,
  fields,
}: {
  data: Record<string, number | string | boolean | undefined>[];
  fields: string[];
}) => {
  // filter the objects in the list based on the fields
  if (fields.length) {
    data = data.map(item => Object.fromEntries(Object.entries(item).filter(([key]) => fields.includes(key))));
  }

  return data;
};

interface IExportResultsOptions {
  data: Record<string, number | string | boolean | undefined>[];
  format: string;
  fields?: string[];
  prefix?: string;
}

export const exportResults = (options: IExportResultsOptions) => {
  const { format = DATA_EXPORT_FORMATS.CSV, prefix = 'data-export', data, fields } = options;

  const timestamp = dateformat().format('YYYYMMDDHHmmss');
  const filename = `${prefix}-${timestamp}`;

  switch (format) {
    case DATA_EXPORT_FORMATS.CSV:
      return exportCSV({ filename, data, fields });
    case DATA_EXPORT_FORMATS.JSON:
      return exportJSON({ filename, data, fields });
    case DATA_EXPORT_FORMATS.XLSX:
      return exportXLSX({ filename, data, fields });
  }
};

interface IExportResultsFormatBaseOptions {
  filename: string;
  data: Record<string, number | string | boolean | undefined>[];
  fields?: string[];
}

export const exportCSV = ({ filename, data = [], fields = [] }: IExportResultsFormatBaseOptions) => {
  // filter the objects in the list based on the fields
  data = filterExportResults({ data, fields });

  // convert the filtered list to csv
  const csv = arrayToCSV({
    fields,
    data,
  });

  // download the file
  if (csv) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

export const exportJSON = ({ filename, data = [], fields = [] }: IExportResultsFormatBaseOptions) => {
  // filter the objects in the list based on the fields
  data = filterExportResults({ data, fields });

  // convert the filtered data to JSON string
  const json = JSON.stringify(data, null, 2);

  // download the file
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportXLSX = ({ filename, data = [], fields = [] }: IExportResultsFormatBaseOptions) => {
  // filter the objects in the list based on the fields
  data = filterExportResults({ data, fields });

  // create a new workbook and add a worksheet
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(data);

  // add the worksheet to the workbook
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // generate XLSX file and create object URL
  const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);

  // download the file
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.xlsx`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// ---------------------------------------------------------------------------
// Lead Sheet export — fixed 7-column layout
// Columns (in order): Name | Address | Phone | Email | Website | Has Website | Map Link
// ---------------------------------------------------------------------------

/** The ordered column headers for the lead sheet. */
export const LEAD_SHEET_HEADERS = ['Name', 'Address', 'Phone', 'Email', 'Website', 'Has Website', 'Map Link'] as const;

/**
 * Build a lead-sheet row from a raw scrape item.
 * - Phone / Email / Website are left BLANK (empty string) when unavailable.
 * - "Has Website" is the Excel-friendly string "TRUE" or "FALSE".
 * - "Map Link" is the per-listing Google Maps URL (maps_url / cid URL).
 */
const buildLeadRow = (item: Record<string, any>): Record<(typeof LEAD_SHEET_HEADERS)[number], string> => {
  const blank = (v: unknown): string => {
    if (v === null || v === undefined || v === 'N/A' || v === 'null' || v === 'undefined') return '';
    const s = String(v).trim();
    return s === 'N/A' || s === 'null' || s === 'undefined' ? '' : s;
  };

  const name = blank(item['title'] ?? item['name']);
  const address = blank(item['address']);
  const phone = blank(item['phone']);
  const email = blank(item['email']);
  const website = blank(item['website']);
  const hasWebsite = website !== '' ? 'TRUE' : 'FALSE';
  const mapLink = blank(item['maps_url']);

  return {
    Name: name,
    Address: address,
    Phone: phone,
    Email: email,
    Website: website,
    'Has Website': hasWebsite,
    'Map Link': mapLink,
  };
};

/**
 * Build the CSV string for the lead sheet with proper quoting.
 * All values are strings — no type-switching needed.
 */
const leadSheetToCSV = (rows: Record<string, string>[]): string => {
  const headers = [...LEAD_SHEET_HEADERS];
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const headerLine = headers.map(escape).join(',');
  const dataLines = rows.map(row => headers.map(h => escape(row[h] ?? '')).join(','));
  return [headerLine, ...dataLines].join('\n');
};

interface IExportLeadSheetOptions {
  /** Raw scraped data items (IGoogleMapsExtractItem / IYandexMapsExtractItem / etc.) */
  data: Record<string, any>[];
  /** 'csv' | 'xlsx' | 'json' — defaults to 'csv' */
  format?: string;
  /** Filename prefix, e.g. 'geoleadscraper-google_maps' */
  prefix?: string;
}

/**
 * Export the scraped data as a lead sheet with exactly 7 fixed columns.
 * Ignores the user's field-selection settings — the columns are always the same.
 */
export const exportLeadSheet = ({ data = [], format = DATA_EXPORT_FORMATS.CSV, prefix = 'leads' }: IExportLeadSheetOptions) => {
  const timestamp = dateformat().format('YYYYMMDDHHmmss');
  const filename = `${prefix}-${timestamp}`;
  const rows = data.map(buildLeadRow);

  if (format === DATA_EXPORT_FORMATS.XLSX) {
    // Preserve column order by using sheet_add_aoa with explicit headers.
    const headers = [...LEAD_SHEET_HEADERS];
    const aoa: string[][] = [
      headers,
      ...rows.map(row => headers.map(h => row[h] ?? '')),
    ];
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.aoa_to_sheet(aoa);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Leads');
    const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return;
  }

  if (format === DATA_EXPORT_FORMATS.JSON) {
    const json = JSON.stringify(rows, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return;
  }

  // Default: CSV
  const csv = leadSheetToCSV(rows);
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' }); // BOM for Excel
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
