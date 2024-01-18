import { OpenAI } from 'openai';
interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openAi: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openAi.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
          Te seran proveidos textos en español con posibles errores ortograficos y gramaticales,
          Las palabras usadas deben existir en el diccionario de la real academia española,
          Debes responder en formato JSON,
          tu tarea es corregirlos y retornar informacion de las solicitudes,
          tambien debes de dar un porcentaje de acierto por el usuario,

          Si no hay errores, debes de retornar un mensaje de felicitaciones     
          Ejemplo de salida:
          {
            userScore: number,
            errors: string[], //['error ->solucion']
            message: string // Usa emojis y texto para felicitar al usuario
          }
      `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0.3,
  });

  const jsonResponse = JSON.parse(completion.choices[0].message.content);
  return jsonResponse;
};
