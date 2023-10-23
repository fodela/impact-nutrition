import axios from 'axios';
interface sendSmsProps {
    from: string,
    to: string,
    content: string
}

const sendSms = async ({from, to, content}:sendSmsProps ) => {
    console.log(process.env.CLIENTID, 'sec', process.env.CLIENTSECRET)
    const params = new URLSearchParams({
        clientid: "paxiucym",
        clientsecret: "bcnpebmm",
        from: "KalaIt",
        to: "+233200784008",
        content: 'SOME CONTENT',
    }).toString();

    const apiUrl = `https://smsc.hubtel.com/v1/messages/send?${params}`;

    try {
        const response = await axios.get(apiUrl);
        console.log('SMS sent:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
};

export default sendSms;
