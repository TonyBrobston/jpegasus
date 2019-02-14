const timeout = async (promiseToRun, timeout, timeoutMessage) => {
    const timeoutPromise = new Promise((resolve, reject) => {
        const wait = setTimeout(() => {
            clearTimeout(wait);
            reject(timeoutMessage);
        }, timeout);
    });

    return Promise.race([timeoutPromise, promiseToRun]);
};

export default {
    timeout,
};
