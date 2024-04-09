import axios from 'axios';
import neo4j from 'neo4j-driver';
const driver = neo4j.driver(
        'neo4j+s://a6c98fd0.databases.neo4j.io', // replace with your Neo4j instance URI
        neo4j.auth.basic('neo4j', 'ij54Is7As_MtvQCHPEbSXWkdQrgiwdEmE46DoAdsYKs') // replace with your username and password
    );

    export const callGraphApi = async () => {
    try {
        const response = await axios.post('https://api.studio.thegraph.com/query/69935/test/v0.01', {
            query: `
                {
                        myEvents(where: {addressFrom_not_in: ["0xeeb4d174ea4d577b6f29124db64790a912bbca3a"]}) {
                        id
                        addressFrom
                        addressTo
                        amount
                        }
                }
            `,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error occurred while calling the external API');
    }
};

export const callNeo4jApi = async () => {
        const session = driver.session();
        try {
            const result = await session.run(
                'MATCH (n: User ) RETURN n LIMIT 25' // replace with your Cypher query
            );
            const records = result.records.map(record => record.toObject());
            return records;
        } catch (error) {
            console.error(error);
            throw new Error('Error occurred while querying Neo4j');
        } finally {
            await session.close();
        }
    };
