import DataProvider from '../../components/providers/DataProvider';
import { generateInitialDataset } from '../../lib/dataGenerator';
import DashboardClient from './pageClient';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
	const initialData = await generateInitialDataset(10000, 100);
	return (
		<DataProvider initialData={initialData}>
			<DashboardClient />
		</DataProvider>
	);
}



