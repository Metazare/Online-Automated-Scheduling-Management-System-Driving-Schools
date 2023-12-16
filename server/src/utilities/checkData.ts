export interface Data {
    path: string;
    message: string;
}

export interface CheckData {
    errors: Data[];
    checkType(value: unknown, target: string, key: string): void;
    checkArray(value: unknown, min: number, key: string): void;
    checkValue(value: unknown, target: string, key: string): void;
    addError(path: string, message: string): void;
    size(): number;
    list(): Data[];
}

export class CheckData {
    errors: Data[] = [];

    /**
     * Checks the type of a value and adds an error to the errors array if the type doesn't match the target type.
     *
     * @param {unknown} value - The value to check the type of.
     * @param {string} target - The target type to compare against.
     * @param {string} key - The key or path of the value being checked.
     */
    checkType(value: unknown, target: string, key: string) {
        if (typeof value !== target) this.errors.push({ path: key, message: `${key} is ${typeof value}` });
    }

    /**
     * Checks if the given value is an array and performs necessary validations.
     *
     * @param {unknown} value - The value to be checked.
     * @param {string} key - The key associated with the value.
     */
    checkArray(value: unknown, min: number, key: string) {
        if (Array.isArray(value)) {
            if (value.length < min) {
                this.errors.push({ path: key, message: `Must have at least one ${key}` });
            }
        }
        else {
            this.errors.push({ path: key, message: `${key} is ${typeof value}` });
        }
    }

    /**
     * Checks the type of a value and adds an error to the errors array if the type doesn't match the target type.
     *
     * @param {unknown} value - The value to check the type of.
     * @param {string} target - The target type to compare against.
     * @param {string} key - The key or path of the value being checked.
     */
    checkValue(value: unknown, target: string, key: string) {
        if (value === target) this.errors.push({ path: key, message: `${key} is must not be ${target}` });
    }

    /**
     * Adds an error to the errors array with the given path and message.
     *
     * @param {string} path - The path of the error.
     * @param {string} message - The message of the error.
     */
    addError(path: string, message: string) {
        this.errors.push({ path, message });
    }

    /**
     * Returns the size of the errors array.
     *
     * @return {number} The size of the errors array.
     */
    size(): number {
        return this.errors.length;
    }
}
