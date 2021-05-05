require('dotenv').config();
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const nlu = new NaturalLanguageUnderstandingV1({
  version: '2020-08-01',
  authenticator: new IamAuthenticator({
    apikey: process.env.APIKEY,
  }),
  serviceUrl: process.env.URL,
});

exports.handler = async (event) => {
    try {
        const dataSend = {
            'text': event.historial_clinico,
            'features': {
              'entities': {
                'emotion': true,
                'sentiment': true,
                'limit': 5,
              },
              'keywords': {
                'emotion': true,
                'sentiment': true,
                'limit': 5,
              },
            },
        };

        const analyze = await nlu.analyze(dataSend);
        const res = analyze.result;

        const finalRes = {
            "lenguaje_texto": res.language,
            "palabras_clave": res.keywords,
            "entidades": res.entities
        };

        return finalRes;
    } catch (err) {
        throw new Error("Error jsjsjs", err);
    }
};