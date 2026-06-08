import NodeCache from 'node-cache';

// Initialize cache with 60 seconds Time To Live (TTL)
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

export default cache;
