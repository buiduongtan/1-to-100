import fs from 'fs-extra';

const Files = {
    readDir(path) {
        try {
            return fs.readdirSync(path, (err, jsonString) => {
                if (err) {
                    console.log("Directory read failed:", err);
                    return;
                }
                return jsonString;
            });
        } catch (e) {
            console.log('Can not read directory ', path);
            return '[]';
        }
    },
    readJson(filename) {
        try {
            return fs.readFileSync(filename, (err, jsonString) => {
                if (err) {
                    console.log("File read failed:", err);
                    return;
                }
                return jsonString;
            });
        } catch (e) {
            console.log('Can not read file ', filename);
            return '[]';
        }
    },
    writeJson(jsonString, filename) {
        return fs.writeJsonSync(filename, jsonString, { spaces: 2 }, (err) => {
            if (err) {
                console.log("File write failed:", err)
                return;
            }
        })
    },
    addToList(word, internationalPhonetic, meaning) {
        return {
            word,
            internationalPhonetic,
            meaning
        }
    }
}

export { Files };
