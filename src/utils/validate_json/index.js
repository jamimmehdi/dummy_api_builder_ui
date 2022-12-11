const isValidJsonData = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const parsedData = JSON.parse(data);
            resolve(typeof parsedData === "object");
        } catch (error) {
            reject({ message: "Invalid payload type." });
        }
    });
}

export default isValidJsonData;