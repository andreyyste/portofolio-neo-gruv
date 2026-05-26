import React from 'react';
import { ClientEntry } from './ClientEntry';
import { DataProvider } from '../context/DataContext';
import { fetchSiteData } from '../services/api';

export default async function Page() {
    // Determine the base URL for the backend
    // In production, this might be a different domain. For now, we hardcode localhost.
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    // Fetch all data concurrently using the new API service
    const siteData = await fetchSiteData(baseUrl);

    return (
        <DataProvider data={siteData}>
            <ClientEntry />
        </DataProvider>
    );
}
