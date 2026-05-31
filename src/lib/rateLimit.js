const store = new Map();
const LIMIT = 5;
const WINDOW = 86400000;

export async function rateLimit(key) {
    const now = Date.now();
    const record = store.get(key);

    if (!record || now - record.timestamp > WINDOW) {
        store.set(key, { count: 1, timestamp: now });
        return { success: true, remaining: LIMIT - 1 };
    }

    if (record.count >= LIMIT) {
        return { success: false, remaining: 0 };
    }

    record.count++;
    return { success: true, remaining: LIMIT - record.count };
}