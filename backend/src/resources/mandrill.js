import config from 'config';
import mandrill from 'mandrill-api/mandrill';

const mandrillClient = new mandrill.Mandrill(config.mandrill.apiKey);

export default mandrillClient;
