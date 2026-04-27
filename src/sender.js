export default async function send({data,config}) {

    const controller = new AbortController();
    
    const timeout = setTimeout(() => {
        controller.abort();
    }, 3000);

    try {
        
    const res =  await fetch(`${config.endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': config.apiKey
            },
            body: JSON.stringify(data),
            signal: controller.signal
        });



    } catch (error) {
        console.error("Sender error:", error.message);
    } finally {
        clearTimeout(timeout);
    }

}