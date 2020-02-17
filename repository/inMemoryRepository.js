let inMemoryData = [];

class InMemoryRepository {

    save(key, value) {
        inMemoryData.push({ key, value });
    }

    get(key) {
        return inMemoryData.find(data => data.key === key);
    }

    delete(key) {
        inMemoryData = inMemoryData.filter(data => data.key !== key);
    }

    update(key, value) {
        
        const data = inMemoryData.find(data => data.key === key);
        if (!data)
            return;

        data.value = value;
    }
}

module.exports = InMemoryRepository;