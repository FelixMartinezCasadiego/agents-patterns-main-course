import { generateText } from 'ai';
import { model, createTracer } from '../../helpers/index.js';

const QUESTION = '¿cuánto costarian juntos el curso de Typescript y el de Docker' + 'con un 20% de descuento? Dame también las horas totales.?';

async function withoutTools() {

    const tracer = createTracer('sin-herramientas');

    const { text } = await generateText({
        model,
        prompt: QUESTION,
        onStepEnd: tracer.onStepFinish
    })

    console.log('\n Respuesta: ', text.green);
    console.log('\n Verificar los numeros contra el catalogo de cursos');

    return tracer.summary()
}

export async function toolUseMain() {
    const resultA = await withoutTools();

    console.log('\n === Comparativa ===')
    console.table({
        'Sin herramientas': resultA,
    })
}