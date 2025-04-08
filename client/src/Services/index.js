const API_BASE_URL = 'http://localhost:8080';

export const getAllWords = async () => {
    const res = await fetch(`${API_BASE_URL}/api/words`);
    if (!res.ok) {
        throw new Error('Failed to fetch words');
    }
    const data = await res.json();
    return data;
};

export const getWordById = async(id) => {
    const res = await fetch(`${API_BASE_URL}/api/words/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch words');
    }
    const data = await res.json();
    return data;
}

export const updateWordById = async(id, word) => {
    const res = await fetch(`${API_BASE_URL}/api/words/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(word), // Chuyển đổi object `word` thành JSON
    });

    if (!res.ok) {
        throw new Error(`Failed to update word with ID ${id}`);
    }

    return res.status;
}

export const createWord = async(word) => {
    const res = await fetch(`${API_BASE_URL}/api/words`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(word), // Chuyển đổi object `word` thành JSON
    });

    if (!res.ok) {
        throw new Error(`Failed to create word`);
    }

    return res.status;
}