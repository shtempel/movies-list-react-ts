export class LocalStorageService {
    constructor(private localStorage: Storage) {}

    setItem(key: string, value: object) {
        this.localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key: string) {
        const storageData = this.localStorage.getItem(key);

        return storageData ? JSON.parse(storageData) : null;
    }
}

const service = new LocalStorageService(window.localStorage);

export default service;